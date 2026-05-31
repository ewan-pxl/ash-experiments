import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname, relative, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, readFileSync, existsSync } from 'node:fs'

const root = dirname(fileURLToPath(import.meta.url))
const pagesDir = resolve(root, 'pages')

// The Wiki and Assets content lives in-repo under content/ and IS the source of
// truth — there are no external repos. content/wiki holds the knowledge-base
// markdown; content/branding holds the brand assets (logos, DTCG tokens, imagery).
const wikiDir = resolve(root, 'content', 'wiki')
const brandingDir = resolve(root, 'content', 'branding')

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
// Post-Click OS data: read the in-repo Wiki + Assets content (content/wiki and
// content/branding) at build/serve time and expose it to the shell as a single
// virtual module, `virtual:postclick-data`. Text (markdown, token JSON) is
// inlined; brand assets are inlined as data URIs. content/ is the source of
// truth — there are no external repos.
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

// Resolve a brand image. SVGs come back as raw markup (rendered via v-html for
// theming). Raster images are NOT inlined — we return the absolute file path and
// the virtual module imports it, so Vite emits a real, hashed file (routed under
// /home/assets by assetFileNames) instead of a base64 data URI in the JS bundle.
function loadImage(full) {
  try {
    const ext = extname(full).toLowerCase()
    if (!IMAGE_MIME[ext]) return null
    if (ext === '.svg') return { kind: 'svg', markup: readFileSync(full, 'utf8') }
    return { kind: 'img', file: full }
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

// --- Wiki: every .md in content/wiki, grouped by its top-level folder. ---
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
    .map((full) => ({ name: relPath(resolve(brandDir, 'logos'), full), ...(loadImage(full) || {}) }))
    .filter((l) => l.kind)

  // Merge EVERY token file under tokens/ (any depth) into one map, so the reader is
  // robust to how the branding repo nests them — flat, foundation/ + web/, or the
  // deeper Figma-export layout (e.g. tokens/foundation/colors/base.tokens.json).
  const tokenMap = {}
  for (const f of walkFiles(resolve(brandDir, 'tokens'), (n) => n.toLowerCase().endsWith('.json'))) {
    const json = readJson(f)
    if (json) flattenTokens(json, [], tokenMap)
  }
  // Resolve aliases and surface a display value. Colour `$value` may be a plain hex
  // string or a Figma object ({ hex, components, … }) — show the hex either way.
  const display = (raw) => {
    const v = resolveToken(raw, tokenMap)
    if (v && typeof v === 'object') return v.hex || v.value || JSON.stringify(v)
    return v
  }
  // Colours: anything typed `color`, wherever it lives (theme/button/icon/… included).
  const colors = Object.entries(tokenMap)
    .filter(([, t]) => t.type === 'color')
    .map(([name, t]) => ({ name: name.replace(/^color\./, ''), value: display(t.value), description: t.description || '' }))
  // Typography: the font/* and textStyle/* groups (and any font-typed token).
  const typography = Object.entries(tokenMap)
    .filter(([p, t]) => t.type !== 'color' && (/^font(\.|$)/.test(p) || /^textStyle(\.|$)/.test(p) || ['fontFamily', 'fontWeight', 'typography'].includes(t.type)))
    .map(([name, t]) => ({ name, value: display(t.value), type: t.type }))
  // Spacing & radius scales.
  const spacing = Object.entries(tokenMap)
    .filter(([p, t]) => t.type !== 'color' && /^(spacing|space|radius)(\.|$)/.test(p))
    .map(([name, t]) => ({ name: name.replace(/^(spacing|space)\./, ''), value: display(t.value) }))

  const assetsDir = resolve(brandDir, 'assets')
  const images = walkFiles(assetsDir, (n) => {
    const ext = extname(n).toLowerCase()
    return ext in IMAGE_MIME && ext !== '.svg'
  })
    .map((full) => ({ name: relPath(assetsDir, full), ...(loadImage(full) || {}) }))
    .filter((i) => i.file)

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

      // Replace each image's `file` (absolute path) with an `import` so Vite emits
      // it as a real hashed asset. We stash a sentinel in the JSON, then splice the
      // import identifier back in (unquoted) after stringifying.
      const imports = []
      const fileToId = new Map()
      const refFor = (full) => {
        if (!fileToId.has(full)) {
          const ident = `__img${fileToId.size}`
          fileToId.set(full, ident)
          // Forward-slash specifier so Vite resolves it on Windows dev too.
          imports.push(`import ${ident} from ${JSON.stringify(full.split(sep).join('/'))}`)
        }
        return fileToId.get(full)
      }
      for (const b of branding.brands || []) {
        for (const l of b.logos || []) if (l.file) { l.src = ` ${refFor(l.file)} `; delete l.file }
        for (const im of b.images || []) if (im.file) { im.src = ` ${refFor(im.file)} `; delete im.file }
      }
      const brandingCode = JSON.stringify(branding).replace(/" (__img\d+) "/g, '$1')

      return `${imports.join('\n')}\nexport const wiki = ${JSON.stringify(wiki)}\nexport const branding = ${brandingCode}\n`
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
    // Never inline assets as base64 data URIs — emit real files so internal images
    // can be routed under /home (behind the Access gate), not baked into a bundle.
    assetsInlineLimit: 0,
    rollupOptions: {
      input: pageEntries(),
      // Asset routing for the Cloudflare Access gate (which protects /home*):
      // everything the OS shell needs (its JS chunk, its CSS, and the Wiki/Assets
      // content images) lives UNDER /home/assets so Access covers it. Deck pages +
      // shared vendor chunks stay public in /assets so the client decks keep loading
      // without a login.
      output: {
        entryFileNames: (info) => `${chunkDir(info)}/[name]-[hash].js`,
        chunkFileNames: (info) => `${chunkDir(info)}/[name]-[hash].js`,
        assetFileNames: (info) => `${assetDir(info)}/[name]-[hash][extname]`,
      },
    },
  },
})

// A chunk is "private" (→ /home/assets) if it's the shell entry, or if it bundles
// any of the secret-bearing modules (the postclick-data virtual module or the Wiki/
// Assets views that import it). Everything else is public (→ /assets). Deck pages
// never import those modules, so this never gates a public deck.
function chunkDir(info) {
  const ids = info.moduleIds || []
  const isShellEntry = info.isEntry && info.name === 'shell'
  const hasSecret = ids.some(
    (id) =>
      id.includes('postclick-data') ||
      /[\\/]views[\\/](WikiView|AssetsView)\.vue/.test(id),
  )
  return isShellEntry || hasSecret ? 'home/assets' : 'assets'
}

// Companion to chunkDir for emitted assets (CSS, images). Internal assets go under
// /home/assets (gated); public deck assets stay in /assets.
//
// An asset is internal if it comes from the in-repo content/ (branding + wiki
// imagery), or it's the shell's own CSS (sourced only from src/). BUT if the same
// bytes are also imported by a public deck (Vite dedupes identical files into one),
// it must stay public so the deck keeps loading — such an image is public via the
// deck anyway. Rollup gives root-relative paths (e.g. "content/branding/…"), so we
// match with an optional leading slash.
function assetDir(info) {
  const srcs = info.originalFileNames || (info.originalFileName ? [info.originalFileName] : [])
  const names = info.names || (info.name ? [info.name] : [])
  const norm = (s) => s.split(sep).join('/')
  const fromContent = srcs.some((s) => /(^|\/)content\/(branding|wiki)\//.test(norm(s)))
  const sharedWithDeck = srcs.some((s) => /(^|\/)(pages|projects)\//.test(norm(s)))
  const isCss = names.some((n) => n.endsWith('.css'))
  const fromShellCss =
    isCss &&
    (names.some((n) => n.startsWith('shell')) ||
      (srcs.some((s) => /(^|\/)src\//.test(norm(s))) && !sharedWithDeck))
  if ((fromContent && !sharedWithDeck) || fromShellCss) return 'home/assets'
  return 'assets'
}
