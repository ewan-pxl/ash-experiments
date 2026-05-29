<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  pages,
  pageHref,
  pagePath,
  folderCrumbs,
  subfolders,
  pagesInFolder,
  folderHref,
} from '../pages.js'

// Decode the current URL into {tab, folder}. /list defaults to the folder
// browser at root; /list/<folder> opens that folder.
function parseLocation() {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path.startsWith('/list/')) {
    const folder = path
      .slice('/list/'.length)
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
    return { tab: 'folder', folder }
  }
  return { tab: 'folder', folder: '' }
}

const init = parseLocation()
const tab = ref(init.tab)
const folder = ref(init.folder)
const query = ref('')

const searching = computed(() => query.value.trim() !== '')
// Search always overrides to the flat list and hides the tabs.
const mode = computed(() => (searching.value ? 'list' : tab.value))

// Search/list is scoped to the current folder (its whole subtree), not root.
const scope = computed(() => {
  const f = folder.value
  if (!f) return pages
  return pages.filter((p) => p.folder === f || p.folder.startsWith(f + '/'))
})
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return scope.value
  return scope.value.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.folder.toLowerCase().includes(q),
  )
})

const subs = computed(() => subfolders(folder.value))
const here = computed(() => pagesInFolder(folder.value))
const crumbs = computed(() => folderCrumbs(folder.value))

function setTitle() {
  document.title = mode.value === 'folder' ? folder.value || 'Folders' : 'Index'
}

// --- client-side nav (page links stay real full-page loads) ---
const stateFor = (t, f) => ({ idx: true, tab: t, folder: f })
const urlFor = (t, f) => (t === 'folder' && f ? folderHref(f) : '/list')

function go(t, f) {
  tab.value = t
  folder.value = f
  query.value = ''
  history.pushState(stateFor(t, f), '', urlFor(t, f))
  setTitle()
  window.scrollTo(0, 0)
}

// Intercept plain left-clicks; let ctrl/cmd/middle-click open a new tab normally.
function nav(e, t, f) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  e.preventDefault()
  go(t, f)
}

function onPop(e) {
  const s = e.state
  if (s && s.idx) {
    tab.value = s.tab
    folder.value = s.folder
  } else {
    const p = parseLocation()
    tab.value = p.tab
    folder.value = p.folder
  }
  query.value = ''
  setTitle()
}

onMounted(() => {
  history.replaceState(stateFor(tab.value, folder.value), '', urlFor(tab.value, folder.value))
  setTitle()
  window.addEventListener('popstate', onPop)
})
onBeforeUnmount(() => window.removeEventListener('popstate', onPop))
</script>

<template>
  <main class="index">
    <header class="index-head">
      <h1>Index</h1>
      <span class="count">{{ pages.length }} {{ pages.length === 1 ? 'page' : 'pages' }}</span>
    </header>

    <input
      v-if="pages.length"
      v-model="query"
      type="search"
      class="search"
      :placeholder="folder ? `Search ${folder}…` : 'Search…'"
      autofocus
    />

    <div v-if="pages.length && !searching" class="tabs">
      <button
        type="button"
        class="tab"
        :class="{ active: mode === 'folder' }"
        @click="go('folder', '')"
      >
        Folder
      </button>
      <button
        type="button"
        class="tab"
        :class="{ active: mode === 'list' }"
        :disabled="!!folder"
        title="Go to root to switch to list view"
        @click="go('list', '')"
      >
        List
      </button>
    </div>

    <p v-if="!pages.length" class="empty">Nothing here yet.</p>

    <!-- LIST MODE (and any active search) -->
    <template v-else-if="mode === 'list'">
      <p v-if="searching && folder" class="section-label">in {{ folder }}</p>
      <p v-if="!filtered.length" class="empty">No matches.</p>
      <ul v-else class="grid">
        <li v-for="p in filtered" :key="p.slug" class="card">
          <p v-if="p.folder" class="crumb">
            <span v-for="(c, i) in folderCrumbs(p.folder)" :key="c.href">
              <a :href="c.href" @click="nav($event, 'folder', c.folder)">{{ c.label }}</a
              ><span v-if="i < p.folder.split('/').length - 1" class="sep"> / </span>
            </span>
          </p>
          <div class="card-top">
            <a :href="pageHref(p)" class="name name-link">{{ p.name }}</a>
            <span class="id">#{{ String(p.id).padStart(3, '0') }}</span>
          </div>
          <p class="desc">{{ p.description }}</p>
          <div class="card-bottom">
            <code class="slug">{{ pagePath(p) }}</code>
            <span v-if="p.created" class="date">{{ p.created }}</span>
          </div>
        </li>
      </ul>
    </template>

    <!-- FOLDER MODE (root is just a folder) -->
    <template v-else>
      <nav v-if="folder" class="breadcrumb">
        <a href="/list" @click="nav($event, 'folder', '')">root</a>
        <template v-for="(c, i) in crumbs" :key="c.href">
          <span class="sep">/</span>
          <a v-if="i < crumbs.length - 1" :href="c.href" @click="nav($event, 'folder', c.folder)">{{
            c.label
          }}</a>
          <span v-else class="current">{{ c.label }}</span>
        </template>
      </nav>

      <template v-if="subs.length">
        <p class="section-label">Folders</p>
        <ul class="grid folder-grid">
          <li v-for="f in subs" :key="f.full">
            <a :href="f.href" class="card folder-card" @click="nav($event, 'folder', f.full)">
              <span class="folder-head">
                <span class="material-symbols-outlined folder-icon" aria-hidden="true">folder</span>
                <span class="folder-name">{{ f.name }}</span>
              </span>
              <span class="folder-count">{{ f.count }} {{ f.count === 1 ? 'item' : 'items' }}</span>
            </a>
          </li>
        </ul>
      </template>

      <template v-if="here.length">
        <p class="section-label">Pages</p>
        <ul class="grid">
          <li v-for="p in here" :key="p.slug">
            <a :href="pageHref(p)" class="card">
              <div class="card-top">
                <span class="name">{{ p.name }}</span>
                <span class="id">#{{ String(p.id).padStart(3, '0') }}</span>
              </div>
              <p class="desc">{{ p.description }}</p>
              <div class="card-bottom">
                <code class="slug">{{ pagePath(p) }}</code>
                <span v-if="p.created" class="date">{{ p.created }}</span>
              </div>
            </a>
          </li>
        </ul>
      </template>

      <p v-if="!subs.length && !here.length" class="empty">Nothing in this folder.</p>
    </template>
  </main>
</template>
