import { existsSync, rmSync, cpSync, mkdirSync } from "node:fs"
import { spawnSync } from "node:child_process"
import { join } from "node:path"

const mode = process.argv.includes("--serve") ? "serve" : "build"
const root = process.cwd()
const quartzDir = join(root, ".quartz-preview")

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32", ...options })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

if (!existsSync(quartzDir)) {
  run("git", ["clone", "--depth", "1", "--branch", "v5", "https://github.com/jackyzha0/quartz.git", quartzDir])
}

rmSync(join(quartzDir, "content"), { recursive: true, force: true })
cpSync(join(root, "content"), join(quartzDir, "content"), { recursive: true })
cpSync(join(root, "quartz.config.yaml"), join(quartzDir, "quartz.config.yaml"))

mkdirSync(join(quartzDir, "public"), { recursive: true })

run("npm", ["ci"], { cwd: quartzDir })
run("npx", ["quartz", "plugin", "install", "--from-config"], { cwd: quartzDir })

if (mode === "serve") {
  run("npx", ["quartz", "build", "--serve"], { cwd: quartzDir })
} else {
  run("npx", ["quartz", "build"], { cwd: quartzDir })
}
