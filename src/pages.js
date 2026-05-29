// Shared page index for the shell's list + folder views. Pages are discovered
// from their meta.json at build time; folder is virtual (URL-only).
const modules = import.meta.glob('/pages/*/meta.json', { eager: true })

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
      project: typeof meta.project === 'string' ? meta.project.trim() : '',
      tags: Array.isArray(meta.tags)
        ? meta.tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean)
        : [],
      created: meta.created ?? '',
      updated: (typeof meta.updated === 'string' && meta.updated) || meta.created || '',
    }
  })
  .sort((a, b) => b.id - a.id)

// Canonical public path of a page, e.g. /games/arcade/snake-007.
export const pagePath = (p) => '/' + [p.folder, p.slug].filter(Boolean).join('/')

// Live href: dev serves pages flat at /pages/<slug>/ (trailing slash required —
// without it Vite falls back to the shell); the build lifts to pagePath().
export const pageHref = (p) =>
  import.meta.env.DEV ? `/pages/${p.slug}/` : pagePath(p) + '/'

// Index link to a folder view (root list when folder is empty).
export const folderHref = (folder) => '/home' + (folder ? '/' + folder : '')

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
      const updated = inside.reduce((m, p) => (p.updated > m ? p.updated : m), '')
      return { name, full, count: inside.length, updated, href: folderHref(full) }
    })
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.name.localeCompare(b.name))
}

// Pages located directly in `folder` (not in its subfolders).
export const pagesInFolder = (folder) => pages.filter((p) => p.folder === folder)

// ---- projects (sharing groups; orthogonal to folders) ----
export const projectHref = (name) => '/home?project=' + (name ? encodeURIComponent(name) : '')

// All projects, most recently modified first.
export function projectList() {
  const names = new Set()
  for (const p of pages) if (p.project) names.add(p.project)
  return [...names]
    .map((name) => {
      const inside = pages.filter((p) => p.project === name)
      const updated = inside.reduce((m, p) => (p.updated > m ? p.updated : m), '')
      return { name, count: inside.length, updated, href: projectHref(name) }
    })
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.name.localeCompare(b.name))
}

export const pagesInProject = (name) => pages.filter((p) => p.project === name)

// Deterministic hue (0–359) per tag, so each tag keeps a stable, distinct colour.
export function tagHue(tag) {
  let h = 0
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0
  return h % 360
}
