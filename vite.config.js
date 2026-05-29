import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdirSync, existsSync } from 'node:fs'

const root = dirname(fileURLToPath(import.meta.url))
const pagesDir = resolve(root, 'pages')

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

// In the built output, lift each page from /pages/<slug>/ up to /<slug>/ so the
// public URL is a clean /<slug>/ instead of /pages/<slug>/.
function flattenPages() {
  return {
    name: 'flatten-pages',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const key of Object.keys(bundle)) {
        const chunk = bundle[key]
        if (chunk.fileName?.startsWith('pages/') && chunk.fileName.endsWith('.html')) {
          const lifted = chunk.fileName.slice('pages/'.length)
          chunk.fileName = lifted
          delete bundle[key]
          bundle[lifted] = chunk
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), flattenPages()],
  build: {
    rollupOptions: { input: pageEntries() },
  },
})
