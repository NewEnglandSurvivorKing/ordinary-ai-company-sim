import { readFileSync } from "node:fs"
import { globSync } from "node:fs"

const NODE_PADDING = 10
const LABEL_PADDING_X = 8
const LABEL_PADDING_Y = 5

function wrapLineCount(text, maxChars) {
  const value = String(text || "")
  return Math.max(1, Math.ceil(value.length / maxChars))
}

function nodeSize(node) {
  const base = node.kind && node.kind.startsWith("ending") ? 128 : 118
  return {
    width: Math.min(168, Math.max(base, String(node.label || node.id).length * 12)),
    height: String(node.label || node.id).length > 8 ? 58 : 48,
  }
}

function labelSize(label) {
  const lines = wrapLineCount(label, 10)
  const lineLengths = []
  const value = String(label || "")
  for (let i = 0; i < value.length; i += 10) lineLengths.push(value.slice(i, i + 10).length)
  return {
    width: Math.max(28, Math.max(...lineLengths, 1) * 11 + LABEL_PADDING_X * 2),
    height: lines * 14 + LABEL_PADDING_Y * 2,
  }
}

function rectForNode(node) {
  const size = nodeSize(node)
  return {
    id: node.id,
    left: node.x - size.width / 2 - NODE_PADDING,
    right: node.x + size.width / 2 + NODE_PADDING,
    top: node.y - size.height / 2 - NODE_PADDING,
    bottom: node.y + size.height / 2 + NODE_PADDING,
  }
}

function overlaps(a, b) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom)
}

function autoLayout(graph, nodes, edges) {
  const layout = graph.layout || {}
  const rankSpacing = Number.isFinite(layout.rankSpacing) ? layout.rankSpacing : 180
  const nodeSpacing = Number.isFinite(layout.nodeSpacing) ? layout.nodeSpacing : 112
  const indegree = new Map(nodes.map((node) => [node.id, 0]))
  const outgoing = new Map(nodes.map((node) => [node.id, []]))
  for (const edge of edges) {
    outgoing.get(edge.from)?.push(edge.to)
    indegree.set(edge.to, (indegree.get(edge.to) || 0) + 1)
  }

  const rank = new Map(nodes.map((node) => [node.id, 0]))
  const queue = nodes.filter((node) => (indegree.get(node.id) || 0) === 0).map((node) => node.id)
  if (!queue.length && nodes.length) queue.push(nodes[0].id)
  const seen = new Set(queue)

  for (let i = 0; i < queue.length; i++) {
    const id = queue[i]
    for (const target of outgoing.get(id) || []) {
      rank.set(target, Math.max(rank.get(target) || 0, (rank.get(id) || 0) + 1))
      if (!seen.has(target)) {
        seen.add(target)
        queue.push(target)
      }
    }
  }

  for (const node of nodes) {
    if (!seen.has(node.id)) {
      rank.set(node.id, Math.max(0, ...rank.values()) + 1)
    }
  }

  const groups = new Map()
  nodes.forEach((node, index) => {
    const r = rank.get(node.id) || 0
    if (!groups.has(r)) groups.set(r, [])
    groups.get(r).push({ node, index })
  })

  const ranks = Array.from(groups.keys()).sort((a, b) => a - b)
  const maxRank = ranks.length ? ranks[ranks.length - 1] : 0
  for (const r of ranks) {
    const group = groups.get(r).sort((a, b) => a.index - b.index)
    const totalHeight = (group.length - 1) * nodeSpacing
    group.forEach((item, index) => {
      item.node.x = (r - maxRank / 2) * rankSpacing
      item.node.y = index * nodeSpacing - totalHeight / 2
    })
  }
}

function labelRectForEdge(edge, source, target, t, offset) {
  const sourceSize = nodeSize(source)
  const targetSize = nodeSize(target)
  const dx = target.x - source.x
  const dy = target.y - source.y
  const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))
  const sourcePad = Math.min(sourceSize.width, sourceSize.height) * 0.44
  const targetPad = Math.min(targetSize.width, targetSize.height) * 0.58
  const x1 = source.x + dx / distance * sourcePad
  const y1 = source.y + dy / distance * sourcePad
  const x2 = target.x - dx / distance * targetPad
  const y2 = target.y - dy / distance * targetPad
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const normalX = -Math.sin(angle)
  const normalY = Math.cos(angle)
  const size = labelSize(edge.label)
  const x = x1 + (x2 - x1) * t + normalX * offset
  const y = y1 + (y2 - y1) * t + normalY * offset - 8
  return {
    id: `${edge.from}->${edge.to}`,
    label: edge.label,
    left: x - size.width / 2,
    right: x + size.width / 2,
    top: y - size.height / 2,
    bottom: y + size.height / 2,
  }
}

function chooseLabelRect(edge, source, target, nodeRects, placedLabelRects) {
  const tCandidates = [0.5, 0.38, 0.62, 0.28, 0.72, 0.18, 0.82, 0.1, 0.9]
  const offsetCandidates = [0, 22, -22, 40, -40, 60, -60, 84, -84, 112, -112]
  for (const t of tCandidates) {
    for (const offset of offsetCandidates) {
      const rect = labelRectForEdge(edge, source, target, t, offset)
      const blockedByNode = nodeRects.some((nodeRect) => overlaps(rect, nodeRect))
      const blockedByLabel = placedLabelRects.some((labelRect) => overlaps(rect, labelRect))
      if (!blockedByNode && !blockedByLabel) return rect
    }
  }
  return labelRectForEdge(edge, source, target, 0.5, 0)
}

function checkGraph(path) {
  const graph = JSON.parse(readFileSync(path, "utf8"))
  const errors = []
  const nodes = new Map()
  for (const node of graph.nodes || []) {
    if (!node.id) errors.push(`${path}: node is missing id`)
    if (nodes.has(node.id)) errors.push(`${path}: duplicate node id ${node.id}`)
    nodes.set(node.id, { ...node, x: 0, y: 0 })
  }

  autoLayout(graph, Array.from(nodes.values()), graph.edges || [])

  const nodeRects = Array.from(nodes.values()).map(rectForNode)
  for (let i = 0; i < nodeRects.length; i++) {
    for (let j = i + 1; j < nodeRects.length; j++) {
      if (overlaps(nodeRects[i], nodeRects[j])) {
        errors.push(`${path}: node overlap ${nodeRects[i].id} <-> ${nodeRects[j].id}`)
      }
    }
  }

  const labelRects = []
  for (const edge of graph.edges || []) {
    const source = nodes.get(edge.from)
    const target = nodes.get(edge.to)
    if (!source || !target) {
      errors.push(`${path}: edge ${edge.from || "?"}->${edge.to || "?"} references missing node`)
      continue
    }
    if (!edge.label) continue
    const rect = chooseLabelRect(edge, source, target, nodeRects, labelRects)
    const blockingNodes = nodeRects.filter((nodeRect) => overlaps(rect, nodeRect)).map((nodeRect) => nodeRect.id)
    if (blockingNodes.length) {
      errors.push(`${path}: edge label "${edge.label}" overlaps node(s): ${blockingNodes.join(", ")}`)
    }
    labelRects.push(rect)
  }

  for (let i = 0; i < labelRects.length; i++) {
    for (let j = i + 1; j < labelRects.length; j++) {
      if (overlaps(labelRects[i], labelRects[j])) {
        errors.push(`${path}: edge label overlap "${labelRects[i].label}" <-> "${labelRects[j].label}"`)
      }
    }
  }

  return errors
}

const files = globSync("content/graphs/*.json")
const errors = files.flatMap(checkGraph)

if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log(`Checked ${files.length} graph file(s).`)
