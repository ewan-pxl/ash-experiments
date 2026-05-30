import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname, relative, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'

const root = dirname(fileURLToPath(import.meta.url))
const pagesDir = resolve(root, 'pages')

// The two sibling content repos this front-end reads from (browse-only).
// Locally they live next to ash-experiments in ~/Documents/GitHub/, and we read
// them directly so edits show instantly. On the deploy server (Cloudflare) the
// siblings don't exist, so we fall back to the committed snapshot in ./content
// (produced by `npm run sync-content`). Set PXL_CONTENT=vendored to force the
// snapshot locally (used to test the deploy path). Nothing is ever written back
// to the source repos — they stay fully independent.
const forceVendored = process.env.PXL_CONTENT === 'vendored'
const pickSource = (sibling, vendored) =>
  !forceVendored && existsSync(sibling) ? sibling : vendored
const wikiDir = pickSource(resolve(root, '..', 'pxl-postclick-os'), resolve(root, 'content', 'wiki'))
const brandingDir = pickSource(resolve(root, '..', 'branding'), resolve(root, 'content', 'branding'))

// A page's URL folder comes from its meta.json `folder` field (virtual — the
// pages/ dir stays flat). Slugged to lowercase-dashes so the public path is clean:
// "Statement of Works" → "statement-of-works", "Games/Arcade" → "games/arcade".
function normalizeFolder(f) {
  if (typeof f !== 'string') return ''
  return f
    .split('/')
    .map((s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
    .filter(Boolean)
    .join('/')
}

// Map of page slug (folder name in /pages) → its virtual URL folder.
function pageFolders() {
  const map = {}
  if (existsSync(pagesDir)) {
    for (const dir of readdirSync(pagesDir, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue
      const metaPath = resolve(pagesDir, dir.name, 'meta.json')
      let folder = ''
      if (existsSync(metaPath)) {
        try {
          folder = normalizeFolder(JSON.parse(readFileSync(metaPath, 'utf8')).folder)
        } catch {
          folder = ''
        }
      }
      map[dir.name] = folder
    }
  }
  return map
}

// Every folder in /pages becomes its own isolated build entry — its own HTML,
// its own JS bundle, its own Vue app. Pages cannot affect each other.
function pageEntries() {
  const entries = { shell: resolve(root, 'index.html') }
  if (existsSync(pagesDir)) {
    for (const dir of readdirSync(pagesDir, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue
      const html = resolve(pagesDir, dir.name, 'index.html')
      if (existsSync(html)) entries[dir.name] = html
    }
  }
  return entries
}

// In the built output, lift each page from /pages/<slug>/ to its public path
// /<folder>/<slug>/ (folder from meta.json; root if empty). Assets are absolute
// (/assets/*) so moving the HTML to any depth keeps every reference valid.
function flattenPages() {
  const folders = pageFolders()
  return {
    name: 'flatten-pages',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const key of Object.keys(bundle)) {
        const chunk = bundle[key]
        const fn = chunk.fileName
        if (fn?.startsWith('pages/') && fn.endsWith('.html')) {
          const remainder = fn.slice('pages/'.length) // <slug>/index.html
          const slug = remainder.split('/')[0]
          const folder = folders[slug] || ''
          const lifted = folder ? `${folder}/${remainder}` : remainder
          chunk.fileName = lifted
          delete bundle[key]
          bundle[lifted] = chunk
        }
      }
    },
  }
}

// In dev there's no flatten step, so map the clean public URL (/<folder>/<slug>/)
// to the on-disk /pages/<slug>/ path. Result: dev serves the exact same URLs as
// the built site. The page slug (…-NNN) is the routing key; the folder is cosmetic.
function devCleanUrls() {
  return {
    name: 'dev-clean-urls',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url || '/'
        if (
          url[1] === '@' ||
          url.startsWith('/node_modules') ||
          url.startsWith('/src/') ||
          url.startsWith('/pages/') ||
          url.startsWith('/home')
        ) {
          return next()
        }
        const [pathPart, q] = url.split('?')
        const segs = pathPart
          .split('/')
          .filter(Boolean)
          .map((s) => {
            try {
              return decodeURIComponent(s)
            } catch {
              return s
            }
          })
        let idx = -1
        for (let i = segs.length - 1; i >= 0; i--) {
          if (/-\d{3}$/.test(segs[i]) && existsSync(resolve(pagesDir, segs[i]))) {
            idx = i
            break
          }
        }
        if (idx === -1) return next()
        const slug = segs[idx]
        const rest = segs.slice(idx + 1).join('/')
        req.url = (rest ? `/pages/${slug}/${rest}` : `/pages/${slug}/index.html`) + (q ? `?${q}` : '')
        next()
      })
    },
  }
}

// ---------------------------------------------------------------------------
// Post-Click OS data: read the two sibling content repos at build/serve time
// and expose them to the shell as a single virtual module, `virtual:postclick-data`.
// Text (markdown, token JSON) is inlined; brand assets are inlined as data URIs.
// This works identically in dev and in the production build, needs no file-
// serving config, and reads the repos as-is without modifying them.
// ---------------------------------------------------------------------------

// `_intake` is the wiki repo's raw, non-canonical Notion/Slack dump (gitignored
// there) — never show it. The rest is normal VCS/OS noise.
const SKIP_DIRS = new Set(['.git', 'node_modules', '.DS_Store', '_intake'])
const IMAGE_MIME = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
}
const MAX_INLINE_BYTES = 3 * 1024 * 1024 // skip anything huge so the bundle stays sane

// Recursively collect files under `dir` matching `match(name)`; returns absolute paths.
function walkFiles(dir, match, out = []) {
  if (!existsSync(dir)) return out
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue
    const full = resolve(dir, e.name)
    if (e.isDirectory()) walkFiles(full, match, out)
    else if (match(e.name)) out.push(full)
  }
  return out
}

const relPath = (base, full) => relative(base, full).split(sep).join('/')

function inlineImage(full) {
  try {
    if (statSync(full).size > MAX_INLINE_BYTES) return null
    const ext = extname(full).toLowerCase()
    const mime = IMAGE_MIME[ext]
    if (!mime) return null
    if (ext === '.svg') return { kind: 'svg', markup: readFileSync(full, 'utf8') }
    const b64 = readFileSync(full).toString('base64')
    return { kind: 'img', src: `data:${mime};base64,${b64}` }
  } catch {
    return null
  }
}

// Flatten a DTCG token tree into { 'dotted.path': {value, type, description} } at each $value leaf.
function flattenTokens(node, prefix = [], out = {}) {
  if (node && typeof node === 'object') {
    if ('$value' in node) {
      out[prefix.join('.')] = { value: node.$value, type: node.$type, description: node.$description }
      return out
    }
    for (const k of Object.keys(node)) flattenTokens(node[k], [...prefix, k], out)
  }
  return out
}

// Resolve a DTCG alias like "{color.neutral.white}" to its concrete value.
function resolveToken(value, map, depth = 0) {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}') && depth < 12) {
    const ref = map[value.slice(1, -1)]
    if (ref) return resolveToken(ref.value, map, depth + 1)
  }
  return value
}

function readJson(full) {
  try {
    return JSON.parse(readFileSync(full, 'utf8'))
  } catch {
    return null
  }
}

// --- Wiki: every .md in pxl-postclick-os, grouped by its top-level folder. ---
function readWiki() {
  const docs = walkFiles(wikiDir, (n) => n.toLowerCase().endsWith('.md')).map((full) => {
    const rel = relPath(wikiDir, full)
    const segs = rel.split('/')
    return {
      rel,
      section: segs.length > 1 ? segs[0] : '',
      file: segs[segs.length - 1],
      content: readFileSync(full, 'utf8'),
    }
  })
  docs.sort((a, b) => a.rel.localeCompare(b.rel))
  return { present: existsSync(wikiDir), docs }
}

// --- Branding: one entry per brand (clients/* plus top-level brand folders). ---
function readBrandDir(brandDir) {
  const logos = walkFiles(resolve(brandDir, 'logos'), (n) => IMAGE_MIME[extname(n).toLowerCase()])
    .map((full) => ({ name: relPath(resolve(brandDir, 'logos'), full), ...(inlineImage(full) || {}) }))
    .filter((l) => l.kind)

  const colorTokens = readJson(resolve(brandDir, 'tokens', 'color.tokens.json'))
  const colorMap = colorTokens ? flattenTokens(colorTokens) : {}
  const colors = Object.entries(colorMap)
    .filter(([, t]) => t.type === 'color')
    .map(([name, t]) => ({
      name: name.replace(/^color\./, ''),
      value: resolveToken(t.value, colorMap),
      raw: t.value,
      description: t.description || '',
    }))

  const typeTokens = readJson(resolve(brandDir, 'tokens', 'typography.tokens.json'))
  const typeMap = typeTokens ? flattenTokens(typeTokens) : {}
  const typography = Object.entries(typeMap).map(([name, t]) => ({
    name,
    value: resolveToken(t.value, typeMap),
    type: t.type,
    description: t.description || '',
  }))

  const spacingTokens = readJson(resolve(brandDir, 'tokens', 'spacing.tokens.json'))
  const spacingMap = spacingTokens ? flattenTokens(spacingTokens) : {}
  const spacing = Object.entries(spacingMap).map(([name, t]) => ({
    name: name.replace(/^(spacing|space)\./, ''),
    value: resolveToken(t.value, spacingMap),
  }))

  const assetsDir = resolve(brandDir, 'assets')
  const images = walkFiles(assetsDir, (n) => {
    const ext = extname(n).toLowerCase()
    return ext in IMAGE_MIME && ext !== '.svg'
  })
    .map((full) => ({ name: relPath(assetsDir, full), ...(inlineImage(full) || {}) }))
    .filter((i) => i.src)

  const readmePath = resolve(brandDir, 'README.md')
  const fontsPath = resolve(brandDir, 'fonts', 'FONTS.md')
  return {
    logos,
    colors,
    typography,
    spacing,
    images,
    readme: existsSync(readmePath) ? readFileSync(readmePath, 'utf8') : '',
    fonts: existsSync(fontsPath) ? readFileSync(fontsPath, 'utf8') : '',
  }
}

function readBranding() {
  if (!existsSync(brandingDir)) return { present: false, brands: [] }
  const brands = []
  const clientsDir = resolve(brandingDir, 'clients')
  if (existsSync(clientsDir)) {
    for (const e of readdirSync(clientsDir, { withFileTypes: true })) {
      // Skip `_`-prefixed scaffolds like clients/_template — not a real brand.
      if (e.isDirectory() && !SKIP_DIRS.has(e.name) && !e.name.startsWith('_')) {
        brands.push({ name: e.name, group: 'clients', ...readBrandDir(resolve(clientsDir, e.name)) })
      }
    }
  }
  // Top-level brand folders that aren't `clients` (e.g. pixel-theory).
  for (const e of readdirSync(brandingDir, { withFileTypes: true })) {
    if (e.isDirectory() && !SKIP_DIRS.has(e.name) && e.name !== 'clients') {
      brands.push({ name: e.name, group: 'house', ...readBrandDir(resolve(brandingDir, e.name)) })
    }
  }
  brands.sort((a, b) => (a.group === b.group ? a.name.localeCompare(b.name) : a.group === 'house' ? -1 : 1))
  return { present: true, brands }
}

function postclickData() {
  const VID = 'virtual:postclick-data'
  const RESOLVED = '\0' + VID
  return {
    name: 'postclick-data',
    resolveId(id) {
      if (id === VID) return RESOLVED
    },
    load(id) {
      if (id !== RESOLVED) return
      const wiki = readWiki()
      const branding = readBranding()
      return `export const wiki = ${JSON.stringify(wiki)}\nexport const branding = ${JSON.stringify(branding)}\n`
    },
    // Live-refresh the browser when the sibling repos change in dev.
    configureServer(server) {
      server.watcher.add([wikiDir, brandingDir])
      const invalidate = (file) => {
        if (!file.startsWith(wikiDir) && !file.startsWith(brandingDir)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', invalidate)
      server.watcher.on('change', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}

export default defineConfig({
  plugins: [vue(), flattenPages(), devCleanUrls(), postclickData()],
  resolve: {
    // Pages in a project import shared assets/code via @projects/<name>/...
    alias: { '@projects': resolve(root, 'projects') },
  },
  build: {
    rollupOptions: { input: pageEntries() },
  },
})
