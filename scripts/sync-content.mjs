// Sync content from the two sibling source repos into ./content so the deployed
// build (Cloudflare, where the siblings don't exist) can serve the Wiki and
// Branding areas. The sibling repos remain the source of truth; this just copies
// a snapshot. Run `npm run sync-content` whenever pxl-postclick-os or branding
// changes, then commit the updated ./content.
//
// Locally (siblings present) the Vite plugin reads the live repos directly, so
// you only need to re-sync before a deploy.
import { existsSync, rmSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// `_intake` is the wiki repo's raw, non-canonical dump (gitignored there) — never vendor it.
// Skip the source repos' VCS meta too (esp. branding's .gitattributes LFS rules,
// which must not bleed into ash-experiments).
const SKIP = new Set(['.git', 'node_modules', '.DS_Store', '_intake', '.gitattributes', '.gitignore'])

const sources = [
  { name: 'wiki', from: resolve(root, '..', 'pxl-postclick-os'), to: resolve(root, 'content', 'wiki') },
  { name: 'branding', from: resolve(root, '..', 'branding'), to: resolve(root, 'content', 'branding') },
]

function copyDir(from, to) {
  mkdirSync(to, { recursive: true })
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue
    const src = join(from, entry.name)
    const dest = join(to, entry.name)
    if (entry.isDirectory()) copyDir(src, dest)
    else if (entry.isFile()) copyFileSync(src, dest)
  }
}

let synced = 0
for (const { name, from, to } of sources) {
  if (!existsSync(from)) {
    console.warn(`⚠  ${name}: source not found at ${from} — skipped`)
    continue
  }
  rmSync(to, { recursive: true, force: true })
  copyDir(from, to)
  console.log(`✓ ${name}: ${from} → ${to}`)
  synced++
}

if (synced === 0) {
  console.warn('Nothing synced — neither sibling repo was found.')
  process.exit(1)
}
console.log(`Done. Synced ${synced} source(s). Commit ./content to include it in the deploy.`)
