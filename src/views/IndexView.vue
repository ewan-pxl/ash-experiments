<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import PageCard from '../components/PageCard.vue'
import PtLogo from '../components/PtLogo.vue'
import {
  pagesOf,
  subfolders,
  pagesInFolder,
  folderCrumbs,
  folderHref,
  projectList,
  pagesInProject,
  projectHref,
  pagesInSubtree,
  resolveFolder,
  resolveProject,
  tagHue,
  AREAS,
  baseForKind,
} from '../pages.js'

// This view renders one work area (Experiments or Agency). All browsing is
// scoped to the area's `kind`, and links sit under the area's base path.
const props = defineProps({
  kind: { type: String, default: 'experiment' },
})
const base = baseForKind(props.kind)
const areaLabel = (AREAS[props.kind] || AREAS.experiment).label
// Pages in this area only.
const areaPages = computed(() => pagesOf(props.kind))

// Decode the URL into {tab, folder, project}, relative to this area's base.
//   <base>                  → folder browser at root (default)
//   <base>/<folder>         → folder browser at that folder
//   <base>?project          → projects browser (root = list of projects)
//   <base>?project=<name>   → that project's pages
function parseLocation() {
  const params = new URLSearchParams(window.location.search)
  if (params.has('tags')) {
    return { tab: 'tags', folder: '', project: '' }
  }
  if (params.has('project')) {
    return {
      tab: 'projects',
      folder: '',
      project: resolveProject(props.kind, (params.get('project') || '').trim()),
    }
  }
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path.startsWith(base + '/')) {
    const urlFolder = path
      .slice((base + '/').length)
      .split('/')
      .map((s) => {
        try {
          return decodeURIComponent(s)
        } catch {
          return s
        }
      })
      .map((s) => s.trim())
      .filter(Boolean)
      .join('/')
    // URL may be slugged or cased differently — map back to the real folder.
    return { tab: 'folder', folder: resolveFolder(props.kind, urlFolder), project: '' }
  }
  return { tab: 'folder', folder: '', project: '' }
}

const init = parseLocation()
const tab = ref(init.tab)
const folder = ref(init.folder)
const project = ref(init.project)
const query = ref('')

const searching = computed(() => query.value.trim() !== '')

// A `tag:<name>` query filters by that exact tag across ALL pages (ignores folder/project scope).
const tagQuery = computed(() => {
  const m = query.value.trim().match(/^tag:(.+)$/i)
  return m ? m[1].trim().toLowerCase() : null
})

// Flat list/search is scoped to the current folder subtree or project (within the area).
const scope = computed(() => {
  if (tab.value === 'projects' && project.value) return pagesInProject(props.kind, project.value)
  if (tab.value === 'folder' && folder.value) return pagesInSubtree(props.kind, folder.value)
  return areaPages.value
})
const filtered = computed(() => {
  if (tagQuery.value !== null) {
    const tg = tagQuery.value
    return areaPages.value.filter((p) => p.tags.includes(tg)) // exact tag, across this area
  }
  const q = query.value.trim().toLowerCase()
  if (!q) return scope.value
  return scope.value.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.folder.toLowerCase().includes(q) ||
      p.project.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)),
  )
})
const scopeLabel = computed(() => project.value || folder.value || '')

// Tag frequencies within the current scope (root = everything; folder = its subtree; project = its pages).
const scopeTags = computed(() => {
  const counts = new Map()
  for (const p of scope.value) for (const t of p.tags) counts.set(t, (counts.get(t) || 0) + 1)
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }))
})
const topTags = computed(() => scopeTags.value.slice(0, 5))
const hasMoreTags = computed(() => scopeTags.value.length > 5)

// Every tag across this area (for the Tags tab).
const allTags = computed(() => {
  const counts = new Map()
  for (const p of areaPages.value) for (const t of p.tags) counts.set(t, (counts.get(t) || 0) + 1)
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }))
})

const subs = computed(() => subfolders(props.kind, folder.value))
const here = computed(() => pagesInFolder(props.kind, folder.value))
const crumbs = computed(() => folderCrumbs(props.kind, folder.value))
const allProjects = computed(() => projectList(props.kind))
const projectPages = computed(() => pagesInProject(props.kind, project.value))

// "Drilled in" = inside a specific folder or project (a breadcrumb is shown to get back out).
const drilledIn = computed(
  () => (tab.value === 'folder' && !!folder.value) || (tab.value === 'projects' && !!project.value),
)

function setTitle() {
  document.title =
    tab.value === 'tags'
      ? 'Tags'
      : tab.value === 'projects'
        ? project.value || 'Projects'
        : tab.value === 'folder' && folder.value
          ? folder.value
          : areaLabel
}

// --- client-side nav (page links stay real full-page loads) ---
const stateFor = (t, f, p) => ({ idx: true, tab: t, folder: f, project: p })
const urlFor = (t, f, p) => {
  // Only the "drilled-in" states get a query/path; tab roots are just the area base.
  if (t === 'projects' && p) return projectHref(props.kind, p)
  if (t === 'folder' && f) return folderHref(props.kind, f)
  return base
}
function go(t, f = '', p = '') {
  tab.value = t
  folder.value = f
  project.value = p
  query.value = ''
  history.pushState(stateFor(t, f, p), '', urlFor(t, f, p))
  setTitle()
  window.scrollTo(0, 0)
}
function clickNav(e, t, f = '', p = '') {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  e.preventDefault()
  go(t, f, p)
}

// Clicking a tag puts `tag:<name>` in the search — an exact filter across all pages.
function openTag(tag) {
  query.value = `tag:${tag}`
  window.scrollTo(0, 0)
}

function onPop(e) {
  const s = e.state
  if (s && s.idx) {
    tab.value = s.tab
    folder.value = s.folder
    project.value = s.project || ''
  } else {
    const p = parseLocation()
    tab.value = p.tab
    folder.value = p.folder
    project.value = p.project
  }
  query.value = ''
  setTitle()
}

onMounted(() => {
  history.replaceState(
    stateFor(tab.value, folder.value, project.value),
    '',
    urlFor(tab.value, folder.value, project.value),
  )
  setTitle()
  window.addEventListener('popstate', onPop)
})
onBeforeUnmount(() => window.removeEventListener('popstate', onPop))
</script>

<template>
  <main class="index">
    <PtLogo class="os-logo" />
    <a href="/home" class="os-back">← Post-Click OS</a>
    <header class="index-head">
      <h1>{{ areaLabel }}</h1>
      <span class="count">{{ areaPages.length }} {{ areaPages.length === 1 ? 'page' : 'pages' }}</span>
    </header>

    <div v-if="areaPages.length" class="search-wrap">
      <input
        v-model="query"
        type="search"
        class="search"
        :placeholder="scopeLabel ? `Search ${scopeLabel}…` : 'Search…'"
        autofocus
      />
      <button
        v-if="query"
        type="button"
        class="search-clear"
        aria-label="Clear search"
        @click="query = ''"
      >
        ×
      </button>
    </div>

    <div v-if="areaPages.length && !searching && tab !== 'tags' && topTags.length" class="tag-row">
      <button
        v-for="t in topTags"
        :key="t.tag"
        type="button"
        class="tag"
        :style="{ '--tag-h': tagHue(t.tag) }"
        @click="openTag(t.tag)"
      >
        {{ t.tag }}
      </button>
      <button
        v-if="hasMoreTags"
        type="button"
        class="tag tag-more"
        title="All tags"
        @click="go('tags')"
      >
        …
      </button>
    </div>

    <div v-if="areaPages.length && !searching && !drilledIn" class="tabs">
      <button type="button" class="tab" :class="{ active: tab === 'folder' }" @click="go('folder')">
        Folder
      </button>
      <button
        type="button"
        class="tab"
        :class="{ active: tab === 'projects' }"
        @click="go('projects')"
      >
        Projects
      </button>
      <button type="button" class="tab" :class="{ active: tab === 'list' }" @click="go('list')">
        List
      </button>
      <button type="button" class="tab" :class="{ active: tab === 'tags' }" @click="go('tags')">
        Tags
      </button>
    </div>

    <p v-if="!areaPages.length" class="empty">Nothing here yet.</p>

    <!-- FLAT LIST (List tab, or any active search) -->
    <template v-else-if="searching || tab === 'list'">
      <p v-if="tagQuery !== null" class="section-label">tagged {{ tagQuery }}</p>
      <p v-else-if="searching && scopeLabel" class="section-label">in {{ scopeLabel }}</p>
      <p v-if="!filtered.length" class="empty">No matches.</p>
      <ul v-else class="grid">
        <PageCard
          v-for="p in filtered"
          :key="p.slug"
          :page="p"
          @open-folder="(f) => go('folder', f)"
          @open-project="(name) => go('projects', '', name)"
          @open-tag="openTag"
        />
      </ul>
    </template>

    <!-- FOLDER BROWSER -->
    <template v-else-if="tab === 'folder'">
      <nav v-if="folder" class="breadcrumb">
        <a :href="base" @click="clickNav($event, 'folder', '')">root</a>
        <template v-for="(c, i) in crumbs" :key="c.href">
          <span class="sep">/</span>
          <a v-if="i < crumbs.length - 1" :href="c.href" @click="clickNav($event, 'folder', c.folder)">{{
            c.label
          }}</a>
          <span v-else class="current">{{ c.label }}</span>
        </template>
      </nav>

      <template v-if="subs.length">
        <p class="section-label">Folders</p>
        <ul class="grid folder-grid">
          <li v-for="f in subs" :key="f.full">
            <a :href="f.href" class="card folder-card" @click="clickNav($event, 'folder', f.full)">
              <span class="folder-head">
                <span class="material-symbols-outlined folder-icon" aria-hidden="true">folder</span>
                <span class="folder-name">{{ f.name }}</span>
              </span>
              <span class="folder-count"
                >{{ f.count }} {{ f.count === 1 ? 'item' : 'items'
                }}<template v-if="f.updated"> · {{ f.updated }}</template></span
              >
            </a>
          </li>
        </ul>
      </template>

      <template v-if="here.length">
        <p class="section-label">Pages</p>
        <ul class="grid">
          <PageCard
            v-for="p in here"
            :key="p.slug"
            :page="p"
            :show-folder="false"
            @open-folder="(f) => go('folder', f)"
            @open-project="(name) => go('projects', '', name)"
            @open-tag="openTag"
          />
        </ul>
      </template>

      <p v-if="!subs.length && !here.length" class="empty">Nothing in this folder.</p>
    </template>

    <!-- PROJECTS BROWSER -->
    <template v-else-if="tab === 'projects'">
      <!-- a specific project: just its pages -->
      <template v-if="project">
        <nav class="breadcrumb">
          <a :href="base" @click="clickNav($event, 'projects', '', '')">projects</a>
          <span class="sep">/</span>
          <span class="current">{{ project }}</span>
        </nav>
        <p v-if="!projectPages.length" class="empty">Nothing in this project.</p>
        <ul v-else class="grid">
          <PageCard
            v-for="p in projectPages"
            :key="p.slug"
            :page="p"
            :show-project="false"
            @open-folder="(f) => go('folder', f)"
            @open-tag="openTag"
          />
        </ul>
      </template>

      <!-- projects root: list every project -->
      <template v-else>
        <p v-if="!allProjects.length" class="empty">No projects yet.</p>
        <ul v-else class="grid folder-grid">
          <li v-for="pr in allProjects" :key="pr.name">
            <a
              :href="pr.href"
              class="card folder-card project-card"
              @click="clickNav($event, 'projects', '', pr.name)"
            >
              <span class="folder-head">
                <span class="material-symbols-outlined folder-icon" aria-hidden="true">category</span>
                <span class="folder-name">{{ pr.name }}</span>
              </span>
              <span class="folder-count"
                >{{ pr.count }} {{ pr.count === 1 ? 'page' : 'pages'
                }}<template v-if="pr.updated"> · {{ pr.updated }}</template></span
              >
            </a>
          </li>
        </ul>
      </template>
    </template>

    <!-- TAGS: every tag, click to filter -->
    <template v-else-if="tab === 'tags'">
      <p v-if="!allTags.length" class="empty">No tags yet.</p>
      <div v-else class="tag-cloud">
        <button
          v-for="t in allTags"
          :key="t.tag"
          type="button"
          class="tag"
          :style="{ '--tag-h': tagHue(t.tag) }"
          @click="openTag(t.tag)"
        >
          {{ t.tag }} <span class="tag-count">{{ t.count }}</span>
        </button>
      </div>
    </template>
  </main>
</template>
