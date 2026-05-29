// Shared page index for the shell's list + folder views. Pages are discovered
// from their meta.json at build time; folder is virtual (URL-only).
const modules = import.meta.glob('/pages/*/meta.json', { eager: true })

// Per-page latest file mtime, injected by vite.config `define` (0 if unavailable).
// eslint-disable-next-line no-undef
const mtimes = typeof __PAGE_MTIMES__ !== 'undefined' ? __PAGE_MTIMES__ : {}

export function normalizeFolder(f) {
  return typeof f === 'string'
    ? f
        .split('/')
        .map((s) => s.trim())
        .filter(Boolean)
        .join('/')
    : ''
}

// All pages, newest first.
export const pages = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/')[2] // /pages/<slug>/meta.json
    const meta = mod.default ?? mod
    return {
      slug,
      id: meta.id ?? 0,
      name: meta.name ?? slug,
      description: meta.description ?? '',
      folder: normalizeFolder(meta.folder),
      created: meta.created ?? '',
      mtime: mtimes[slug] ?? 0,
    }
  })
  .sort((a, b) => b.id - a.id)

// Canonical public path of a page, e.g. /games/arcade/snake-007.
export const pagePath = (p) => '/' + [p.folder, p.slug].filter(Boolean).join('/')

// Live href: dev serves pages flat at /pages/<slug>/; the build lifts to pagePath().
export const pageHref = (p) =>
  import.meta.env.DEV ? `/pages/${p.slug}/index.html` : pagePath(p) + '/'

// Index link to a folder view (root list when folder is empty).
export const folderHref = (folder) => '/list' + (folder ? '/' + folder : '')

// Clickable breadcrumb segments for a folder path.
export const folderCrumbs = (folder) =>
  folder
    ? folder.split('/').map((seg, i, arr) => {
        const f = arr.slice(0, i + 1).join('/')
        return { label: seg, folder: f, href: folderHref(f) }
      })
    : []

// Direct child folders within `folder` (next path segment), with subtree counts.
export function subfolders(folder) {
  const prefix = folder ? folder + '/' : ''
  const names = new Set()
  for (const p of pages) {
    if (!p.folder) continue
    if (folder && !p.folder.startsWith(prefix)) continue
    const next = (folder ? p.folder.slice(prefix.length) : p.folder).split('/')[0]
    if (next) names.add(next)
  }
  return [...names]
    .map((name) => {
      const full = prefix + name
      const inside = pages.filter(
        (p) => p.folder === full || p.folder.startsWith(full + '/'),
      )
      const mtime = inside.reduce((m, p) => Math.max(m, p.mtime || 0), 0)
      return { name, full, count: inside.length, mtime, href: folderHref(full) }
    })
    .sort((a, b) => b.mtime - a.mtime) // most recently modified first
}

// Pages located directly in `folder` (not in its subfolders).
export const pagesInFolder = (folder) => pages.filter((p) => p.folder === folder)
