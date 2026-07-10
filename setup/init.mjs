#!/usr/bin/env node
/**
 * Selective essentials installer.
 * Copies only chosen layers/components into src/ — do NOT copy the whole essentials folder.
 *
 * Usage:
 *   node essentials/setup/init.mjs --preset dashboard
 *   node essentials/setup/init.mjs --ui button,dialog,tabs --patterns page-header
 *   node essentials/setup/init.mjs --list
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ESSENTIALS_ROOT = resolve(__dirname, "..")
const MANIFEST = JSON.parse(readFileSync(join(__dirname, "manifest.json"), "utf8"))

function parseArgs(argv) {
  const opts = {
    target: process.cwd(),
    dest: "src",
    preset: null,
    layers: [],
    ui: [],
    primitives: [],
    patterns: [],
    motion: [],
    alias: true,
    list: false,
    dryRun: false,
    help: false,
  }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--help" || arg === "-h") opts.help = true
    else if (arg === "--list") opts.list = true
    else if (arg === "--dry-run") opts.dryRun = true
    else if (arg === "--no-alias") opts.alias = false
    else if (arg === "--target" || arg === "-t") opts.target = resolve(argv[++i])
    else if (arg === "--dest" || arg === "-d") opts.dest = argv[++i]
    else if (arg === "--preset" || arg === "-p") opts.preset = argv[++i]
    else if (arg === "--layers" || arg === "-l") opts.layers.push(...argv[++i].split(",").filter(Boolean))
    else if (arg === "--ui" || arg === "-u") opts.ui.push(...argv[++i].split(",").filter(Boolean))
    else if (arg === "--primitives") opts.primitives.push(...argv[++i].split(",").filter(Boolean))
    else if (arg === "--patterns") opts.patterns.push(...argv[++i].split(",").filter(Boolean))
    else if (arg === "--motion" || arg === "-m") opts.motion.push(...argv[++i].split(",").filter(Boolean))
  }

  return opts
}

function expandAll(keys, section) {
  if (keys === "all") {
    return Object.keys(MANIFEST[section]).filter((k) => !k.startsWith("_"))
  }
  return keys ?? []
}

function printHelp() {
  console.log(`
Essentials selective installer — copies only what you need into src/

Usage:
  node essentials/setup/init.mjs --preset <name>
  node essentials/setup/init.mjs [options]

Options:
  --preset, -p <name>     Use a preset (minimal | dashboard | marketing | full-ui | full-motion)
  --layers, -l <a,b>        Layers: core, tokens, motion-lib, hooks
  --ui, -u <a,b>            shadcn components (button, dialog, tabs, …)
  --primitives <a,b>        status-badge, metric-tile
  --patterns <a,b>          page-header, section-card, metric-card, announcement-mic
  --motion, -m <a,b>        Motion primitives (text-scramble, dock, …)
  --target, -t <dir>        Project root (default: cwd)
  --dest, -d <dir>          Destination under target (default: src)
  --no-alias                Keep relative imports instead of @/ aliases
  --list                    List available presets and components
  --dry-run                 Show plan without copying
  --help, -h                This help

Workflow:
  1. Create Vite + React + TS app, run shadcn init
  2. Keep essentials/ as a template source (or point to this repo)
  3. Run: node essentials/setup/init.mjs --preset dashboard
  4. npm install <printed deps>
  5. Remove essentials/ from the new project if you no longer need the template
`)
}

function printList() {
  console.log("\nPresets:")
  for (const [key, preset] of Object.entries(MANIFEST.presets)) {
    console.log(`  ${key.padEnd(14)} ${preset.label}`)
  }
  console.log("\nLayers:", Object.keys(MANIFEST.layers).join(", "))
  console.log("\nUI:", Object.keys(MANIFEST.ui).join(", "))
  console.log("\nPrimitives:", Object.keys(MANIFEST.primitives).join(", "))
  console.log("\nPatterns:", Object.keys(MANIFEST.patterns).join(", "))
  console.log("\nMotion:", Object.keys(MANIFEST.motion).filter((k) => !k.startsWith("_")).join(", "))
  console.log("")
}

function resolveSelection(opts) {
  const selection = {
    layers: new Set(["core"]),
    ui: new Set(),
    primitives: new Set(),
    patterns: new Set(),
    motion: new Set(),
    files: new Map(),
    deps: new Set(),
  }

  const applyPreset = (name) => {
    const preset = MANIFEST.presets[name]
    if (!preset) throw new Error(`Unknown preset: ${name}. Run --list`)
    preset.layers?.forEach((l) => selection.layers.add(l))
    expandAll(preset.ui, "ui").forEach((k) => selection.ui.add(k))
    expandAll(preset.primitives, "primitives").forEach((k) => selection.primitives.add(k))
    expandAll(preset.patterns, "patterns").forEach((k) => selection.patterns.add(k))
    expandAll(preset.motion, "motion").forEach((k) => selection.motion.add(k))
  }

  if (opts.preset) applyPreset(opts.preset)
  opts.layers.forEach((l) => selection.layers.add(l))
  opts.ui.forEach((k) => selection.ui.add(k))
  opts.primitives.forEach((k) => selection.primitives.add(k))
  opts.patterns.forEach((k) => selection.patterns.add(k))
  opts.motion.forEach((k) => selection.motion.add(k))

  if (
    !opts.preset &&
    opts.layers.length === 0 &&
    opts.ui.length === 0 &&
    opts.primitives.length === 0 &&
    opts.patterns.length === 0 &&
    opts.motion.length === 0
  ) {
    applyPreset("dashboard")
  }

  const addFile = (from, to) => {
    const key = to
    if (!selection.files.has(key)) selection.files.set(key, from)
  }

  for (const layerName of selection.layers) {
    const layer = MANIFEST.layers[layerName]
    if (!layer) throw new Error(`Unknown layer: ${layerName}`)
    layer.deps?.forEach((d) => selection.deps.add(d))
    layer.files?.forEach(({ from, to }) => addFile(from, to))
  }

  for (const name of selection.ui) {
    const item = MANIFEST.ui[name]
    if (!item) throw new Error(`Unknown ui component: ${name}`)
    item.deps?.forEach((d) => selection.deps.add(d))
    addFile(item.file, item.file.replace(/^components\//, "components/"))
  }

  for (const name of selection.primitives) {
    const item = MANIFEST.primitives[name]
    if (!item) throw new Error(`Unknown primitive: ${name}`)
    item.requires?.forEach((r) => selection.layers.add(r))
    item.deps?.forEach((d) => selection.deps.add(d))
    addFile(item.file, item.file)
  }

  for (const name of selection.patterns) {
    const item = MANIFEST.patterns[name]
    if (!item) throw new Error(`Unknown pattern: ${name}`)
    item.requires?.forEach((r) => selection.layers.add(r))
    item.deps?.forEach((d) => selection.deps.add(d))
    addFile(item.file, item.file)
  }

  if (selection.motion.size > 0) {
    MANIFEST.motion._baseDeps?.forEach((d) => selection.deps.add(d))
    selection.layers.add("core")
  }

  if (selection.ui.size > 0 || selection.primitives.size > 0 || selection.patterns.size > 0) {
    selection.layers.add("core")
  }

  const helpersNeeded = new Set()
  for (const name of selection.motion) {
    const item = MANIFEST.motion[name]
    if (!item) throw new Error(`Unknown motion component: ${name}`)
    item.deps?.forEach((d) => selection.deps.add(d))
    item.helpers?.forEach((h) => helpersNeeded.add(h))
    addFile(item.file, item.file)
  }

  for (const helper of helpersNeeded) {
    const helperPath = MANIFEST.motion._helpers[helper]
    if (helperPath) addFile(helperPath, helperPath)
  }

  // Re-resolve layers after requires from primitives/patterns
  for (const layerName of selection.layers) {
    const layer = MANIFEST.layers[layerName]
    layer.deps?.forEach((d) => selection.deps.add(d))
    layer.files?.forEach(({ from, to }) => addFile(from, to))
  }

  selection.deps.add("lucide-react")

  return selection
}

function rewriteImports(content, useAlias) {
  if (!useAlias) return content
  return content
    .replace(/from ["']\.\.\/\.\.\/lib\//g, 'from "@/lib/')
    .replace(/from ["']\.\.\/\.\.\/hooks\//g, 'from "@/hooks/')
    .replace(/from ["']\.\.\/\.\.\/types\//g, 'from "@/types/')
}

function install(opts) {
  const selection = resolveSelection(opts)
  const destRoot = join(opts.target, opts.dest)

  console.log("\nEssentials selective install")
  console.log("─".repeat(40))
  console.log(`Target: ${destRoot}`)
  console.log(`Layers: ${[...selection.layers].join(", ")}`)
  if (selection.ui.size) console.log(`UI: ${[...selection.ui].join(", ")}`)
  if (selection.primitives.size) console.log(`Primitives: ${[...selection.primitives].join(", ")}`)
  if (selection.patterns.size) console.log(`Patterns: ${[...selection.patterns].join(", ")}`)
  if (selection.motion.size) console.log(`Motion: ${[...selection.motion].join(", ")}`)
  console.log(`Files: ${selection.files.size}`)
  console.log("")

  if (opts.dryRun) {
    for (const [to, from] of selection.files) console.log(`  ${from} → ${join(destRoot, to)}`)
    console.log("\nDeps:", [...selection.deps].sort().join(" "))
    return
  }

  for (const [to, from] of selection.files) {
    const src = join(ESSENTIALS_ROOT, from)
    const dest = join(destRoot, to)
    if (!existsSync(src)) {
      console.warn(`  skip (missing): ${from}`)
      continue
    }
    mkdirSync(dirname(dest), { recursive: true })
    let content = readFileSync(src, "utf8")
    content = rewriteImports(content, opts.alias)
    writeFileSync(dest, content)
    console.log(`  ✓ ${to}`)
  }

  const deps = [...selection.deps].sort()
  console.log("\n─".repeat(40))
  console.log("Next steps:\n")
  console.log(`  1. npm install ${deps.join(" ")}`)
  console.log("  2. Merge setup/tailwind.snippet.js colors into tailwind.config.js")
  console.log("  3. Ensure vite @ alias → src (see setup/NEW-PROJECT.md)")
  console.log("  4. Import from @/ — e.g. import { Button } from \"@/components/ui/button\"")
  if (selection.motion.size) {
    console.log("  5. Motion: import from \"@/components/motion-primitives/<name>\"")
  }
  console.log("\nYou do NOT need to keep essentials/ in the project after install.")
  console.log("")
}

const opts = parseArgs(process.argv.slice(2))
if (opts.help) printHelp()
else if (opts.list) printList()
else install(opts)
