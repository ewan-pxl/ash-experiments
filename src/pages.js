// Shared page index for the shell's list + folder views. Pages are discovered
// from their meta.json at build time; folder is virtual (URL-only).
//
// Pages belong to one of two work areas, set by their meta.json `kind`:
//   experiment → Experiments (in the business: the delivery workbench)
//   agency     → Agency (on the business: proposals, reporting, internal decks)
// The folder / project / tag browser is identical in both; it's just scoped to
// the area's pages and links under the area's base path. The scoped helpers take
// `kind` as their first argument so the two areas never bleed into each other.
const modules = import.meta.glob('/pages/*/meta.json', { eager: true })

// The two work areas. base = URL prefix; label = heading.
export const AREAS = {
  experiment: { base: '/home/experiments', label: 'Experiments' },
  agency: { base: '/home/agency', label: 'Agency' },
}
export const baseForKind = (kind) => (AREAS[kind] || AREAS.experiment).base

// Raw folder path kept for display ("Statement of Works"); whitespace tidied,
// case/spaces preserved.
export function normalizeFolder(f) {
  return typeof f === 'string'
    ? f
        .split('/')
        .map((s) => s.trim())
        .filter(Boolean)
        .join('/')
    : ''
}

// Slug form used for URLs and for matching — lowercase, dashes. So "Statement of
// Works", "statement-of-works" and "STATEMENT OF WORKS" all resolve to the same
// thing, and the public URL is always clean.
const slugifySeg = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
const slugifyPath = (folder) => (folder || '').split('/').map(slugifySeg).filter(Boolean).join('/')

const directlyIn = (p, folder) => slugifyPath(p.folder) === slugifyPath(folder)
const inSubtree = (p, folder) => {
  const f = slugifyPath(folder)
  if (!f) return true
  const pf = slugifyPath(p.folder)
  return pf === f || pf.startsWith(f + '/')
}

// All pages, newest first.
export const pages = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/')[2] // /pages/<slug>/meta.json
    const meta = mod.default ?? mod
    return {
      slug,
      id: meta.id ?? 0,
      // Which work area this page belongs to. Defaults to experiment.
      kind: meta.kind === 'agency' ? 'agency' : 'experiment',
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

// Pages in a given work area (kind), newest first.
export const pagesOf = (kind) => pages.filter((p) => p.kind === kind)

// Canonical public path of a page (slugged folder), e.g. /games/arcade/snake-007.
// Unaffected by area — live page URLs are flat and never under /home.
export const pagePath = (p) => '/' + [slugifyPath(p.folder), p.slug].filter(Boolean).join('/')

// Live href — the clean public path, identical in dev and prod (a dev middleware
// maps these URLs onto the on-disk /pages/<slug>/ files).
export const pageHref = (p) => pagePath(p) + '/'

// Index link to a folder view within an area (root list when folder is empty).
export const folderHref = (kind, folder) =>
  baseForKind(kind) + (folder ? '/' + slugifyPath(folder) : '')

// Clickable breadcrumb segments for a folder path — raw label, slugged href.
export const folderCrumbs = (kind, folder) =>
  folder
    ? folder.split('/').map((seg, i, arr) => {
        const raw = arr.slice(0, i + 1).join('/')
        return { label: seg, folder: raw, href: folderHref(kind, raw) }
      })
    : []

// Direct child folders within `folder` for an area (next path segment), with
// subtree counts. Grouped by slug (so casing/spacing variants merge), shown raw.
export function subfolders(kind, folder) {
  const scope = pagesOf(kind)
  const baseDepth = slugifyPath(folder) ? slugifyPath(folder).split('/').length : 0
  const rawBySlug = new Map()
  const fullBySlug = new Map()
  for (const p of scope) {
    if (!p.folder || !inSubtree(p, folder)) continue
    const rawSegs = p.folder.split('/')
    if (rawSegs.length <= baseDepth) continue
    const childRaw = rawSegs[baseDepth]
    const childSlug = slugifySeg(childRaw)
    if (!childSlug || rawBySlug.has(childSlug)) continue
    rawBySlug.set(childSlug, childRaw)
    fullBySlug.set(childSlug, rawSegs.slice(0, baseDepth + 1).join('/'))
  }
  return [...rawBySlug.keys()]
    .map((cs) => {
      const name = rawBySlug.get(cs)
      const full = fullBySlug.get(cs)
      const inside = scope.filter((p) => inSubtree(p, full))
      const updated = inside.reduce((m, p) => (p.updated > m ? p.updated : m), '')
      return { name, full, count: inside.length, updated, href: folderHref(kind, full) }
    })
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.name.localeCompare(b.name))
}

// Pages directly in `folder`; and the whole subtree (for scope/search) — within an area.
export const pagesInFolder = (kind, folder) => pagesOf(kind).filter((p) => directlyIn(p, folder))
export const pagesInSubtree = (kind, folder) => pagesOf(kind).filter((p) => inSubtree(p, folder))

// Map a (possibly slugged/cased) URL folder back to a real raw folder path, within an area.
export function resolveFolder(kind, slugPath) {
  const target = slugifyPath(slugPath)
  if (!target) return ''
  const depth = target.split('/').length
  for (const p of pagesOf(kind)) {
    if (!p.folder) continue
    const sp = slugifyPath(p.folder)
    if (sp === target || sp.startsWith(target + '/')) {
      return p.folder.split('/').slice(0, depth).join('/')
    }
  }
  return slugPath
}

// ---- projects (sharing groups; orthogonal to folders) ----
export const projectHref = (kind, name) =>
  baseForKind(kind) + '?project=' + (name ? encodeURIComponent(slugifySeg(name)) : '')

export const pagesInProject = (kind, name) =>
  pagesOf(kind).filter((p) => p.project && slugifySeg(p.project) === slugifySeg(name))

// All projects in an area, most recently updated first (grouped by slug, raw name shown).
export function projectList(kind) {
  const rawBySlug = new Map()
  for (const p of pagesOf(kind)) {
    if (!p.project) continue
    const ps = slugifySeg(p.project)
    if (!rawBySlug.has(ps)) rawBySlug.set(ps, p.project)
  }
  return [...rawBySlug.values()]
    .map((name) => {
      const inside = pagesInProject(kind, name)
      const updated = inside.reduce((m, p) => (p.updated > m ? p.updated : m), '')
      return { name, count: inside.length, updated, href: projectHref(kind, name) }
    })
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.name.localeCompare(b.name))
}

// Map a (slugged/cased) URL project back to its real raw name, within an area.
export function resolveProject(kind, slug) {
  const target = slugifySeg(slug)
  for (const p of pagesOf(kind)) if (p.project && slugifySeg(p.project) === target) return p.project
  return slug
}

// Deterministic hue (0–359) per tag, so each tag keeps a stable, distinct colour.
export function tagHue(tag) {
  let h = 0
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0
  return h % 360
}
