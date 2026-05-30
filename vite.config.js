import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, readFileSync, existsSync } from 'node:fs'

const root = dirname(fileURLToPath(import.meta.url))
const pagesDir = resolve(root, 'pages')

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

export default defineConfig({
  plugins: [vue(), flattenPages(), devCleanUrls()],
  resolve: {
    // Pages in a project import shared assets/code via @projects/<name>/...
    alias: { '@projects': resolve(root, 'projects') },
  },
  build: {
    rollupOptions: { input: pageEntries() },
  },
})
