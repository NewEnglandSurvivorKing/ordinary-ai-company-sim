import { readdirSync, readFileSync } from "node:fs"
import { basename, dirname, join, relative, sep } from "node:path"

const root = process.cwd()
const contentRoot = join(root, "content")
const configPath = join(root, "quartz.config.yaml")

const requiredBaseFields = ["title", "type", "status", "source", "contributors", "tags"]
const requiredDatedTypes = new Set([
  "design-node",
  "discussion-issue",
  "ending",
  "ending-map",
  "guide",
  "meta",
  "narrative-node",
  "overview",
  "setting",
])
const relationshipFields = ["depends_on", "conflicts_with", "related_endings"]

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return walk(path)
    return entry.isFile() && path.endsWith(".md") ? [path] : []
  })
}

function readIgnorePatterns() {
  const config = readFileSync(configPath, "utf8")
  const lines = config.split(/\r?\n/)
  const start = lines.findIndex((line) => line.match(/^\s*ignorePatterns:\s*$/))
  if (start === -1) return []

  const patterns = []
  for (const line of lines.slice(start + 1)) {
    const match = line.match(/^\s*-\s+(.+?)\s*$/)
    if (match) {
      patterns.push(match[1].replace(/^["']|["']$/g, "").replace(/\/+$/, ""))
      continue
    }
    if (line.match(/^\s*[A-Za-z0-9_-]+:/)) break
  }
  return patterns
}

function contentRel(path) {
  return relative(contentRoot, path).split(sep).join("/")
}

function withoutMd(path) {
  return path.replace(/\.md$/, "")
}

function isIgnored(relPath, ignorePatterns) {
  const rel = relPath.replace(/^\.\//, "").replace(/\.md$/, "")
  return ignorePatterns.some((pattern) => rel === pattern || rel.startsWith(`${pattern}/`))
}

function parseFrontmatter(path, text, errors) {
  const match = text.match(/^---\n([\s\S]*?)\n---/)
  if (!match) {
    errors.push(`${path}: missing YAML frontmatter`)
    return null
  }

  const fields = new Map()
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (field) fields.set(field[1], field[2].trim())
  }
  return fields
}

function parseInlineList(raw) {
  if (!raw || raw === "[]") return []
  if (!raw.startsWith("[") || !raw.endsWith("]")) return null

  const body = raw.slice(1, -1)
  const values = []
  let current = ""
  let quote = null
  for (let i = 0; i < body.length; i++) {
    const char = body[i]
    if ((char === '"' || char === "'") && body[i - 1] !== "\\") {
      quote = quote === char ? null : quote || char
      current += char
      continue
    }
    if (char === "," && !quote) {
      values.push(cleanListValue(current))
      current = ""
      continue
    }
    current += char
  }
  if (current.trim()) values.push(cleanListValue(current))
  return values.filter(Boolean)
}

function cleanListValue(value) {
  return value.trim().replace(/^["']|["']$/g, "")
}

function validateFrontmatter(file, fields, errors) {
  const rel = contentRel(file)
  const type = fields.get("type")

  if (rel !== "index.md" && !fields.get("id")) {
    errors.push(`${rel}: missing required frontmatter field "id"`)
  }

  for (const field of requiredBaseFields) {
    if (!fields.get(field)) errors.push(`${rel}: missing required frontmatter field "${field}"`)
  }

  if (requiredDatedTypes.has(type)) {
    for (const field of ["created", "updated"]) {
      if (!fields.get(field)) errors.push(`${rel}: missing required frontmatter field "${field}"`)
    }
  }

  for (const field of ["source", "contributors", "tags", ...relationshipFields]) {
    const raw = fields.get(field)
    if (!raw) continue
    if (parseInlineList(raw) === null) {
      errors.push(`${rel}: frontmatter field "${field}" must use inline list syntax, e.g. [A, B]`)
    }
  }
}

function wikilinks(text) {
  return Array.from(text.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]*)?\]\]/g), (match) => ({
    raw: match[0],
    target: match[1],
  }))
}

function resolveWikilink(target, sourceRel, publicRelNoExt, publicBaseToRels, errors) {
  const normalized = target.replace(/^content\//, "").replace(/\.md$/, "")
  if (normalized.includes("/")) {
    const relativeTarget = `${dirname(sourceRel)}/${normalized}`.replace(/^\.\//, "")
    if (publicRelNoExt.has(normalized)) return normalized
    if (publicRelNoExt.has(relativeTarget)) return relativeTarget
    return null
  }

  const matches = publicBaseToRels.get(normalized) || []
  if (matches.length > 1) {
    errors.push(`${sourceRel}.md: wikilink target "${target}" is ambiguous: ${matches.join(", ")}`)
    return "__ambiguous__"
  }
  return matches[0] || null
}

function targetHitsIgnored(target, ignoredRelNoExt, ignoredBaseNames, ignorePatterns) {
  const normalized = target.replace(/^content\//, "").replace(/\.md$/, "")
  const firstSegment = normalized.split("/")[0]
  if (ignorePatterns.includes(firstSegment)) return true
  if (normalized.includes("/")) return ignoredRelNoExt.has(normalized)
  return ignoredBaseNames.has(normalized)
}

const ignorePatterns = readIgnorePatterns()
const allFiles = walk(contentRoot)
const publicFiles = allFiles.filter((file) => !isIgnored(contentRel(file), ignorePatterns))
const ignoredFiles = allFiles.filter((file) => isIgnored(contentRel(file), ignorePatterns))
const publicRelNoExt = new Set(publicFiles.map((file) => withoutMd(contentRel(file))))
const ignoredRelNoExt = new Set(ignoredFiles.map((file) => withoutMd(contentRel(file))))
const publicBaseToRels = new Map()
const ignoredBaseNames = new Set(ignoredFiles.map((file) => basename(file, ".md")))
const errors = []
const ids = new Map()
const parsed = []
const inboundLinks = new Map()

for (const file of publicFiles) {
  const relNoExt = withoutMd(contentRel(file))
  const base = basename(file, ".md")
  if (!publicBaseToRels.has(base)) publicBaseToRels.set(base, [])
  publicBaseToRels.get(base).push(relNoExt)
  inboundLinks.set(relNoExt, 0)
}

for (const file of publicFiles) {
  const rel = contentRel(file)
  const text = readFileSync(file, "utf8")
  const fields = parseFrontmatter(rel, text, errors)
  if (!fields) continue

  validateFrontmatter(file, fields, errors)

  const id = fields.get("id")
  if (id) {
    if (ids.has(id)) errors.push(`${rel}: duplicate id "${id}", first seen in ${ids.get(id)}`)
    else ids.set(id, rel)
  }

  parsed.push({ file, rel, text, fields })
}

for (const { rel, text, fields } of parsed) {
  for (const field of relationshipFields) {
    const values = parseInlineList(fields.get(field))
    if (!values) continue
    for (const value of values) {
      if (!ids.has(value)) errors.push(`${rel}: ${field} references missing id "${value}"`)
    }
  }

  for (const link of wikilinks(text)) {
    if (targetHitsIgnored(link.target, ignoredRelNoExt, ignoredBaseNames, ignorePatterns)) {
      errors.push(`${rel}: wikilink ${link.raw} points into ignored content`)
      continue
    }
    const sourceRelNoExt = withoutMd(rel)
    const resolved = resolveWikilink(link.target, sourceRelNoExt, publicRelNoExt, publicBaseToRels, errors)
    if (!resolved) {
      errors.push(`${rel}: wikilink ${link.raw} does not resolve to a public markdown file`)
    } else if (resolved !== "__ambiguous__" && resolved !== sourceRelNoExt) {
      inboundLinks.set(resolved, (inboundLinks.get(resolved) || 0) + 1)
    }
  }
}

for (const file of publicFiles) {
  const rel = contentRel(file)
  const relNoExt = withoutMd(rel)
  if (basename(file) === "index.md") continue
  if ((inboundLinks.get(relNoExt) || 0) === 0) {
    errors.push(`${rel}: public non-index page has no inbound wikilink`)
  }
}

if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log(`Validated ${publicFiles.length} public Markdown file(s), ${ids.size} id(s), ${ignorePatterns.length} ignore pattern(s).`)
