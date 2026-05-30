<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { marked } from 'marked'
import { wiki } from 'virtual:postclick-data'

// Turn a folder/file stem into a readable label: strip the leading NN- ordering
// prefix and the extension, swap separators for spaces, Title Case it.
function prettify(s) {
  return s
    .replace(/\.md$/i, '')
    .replace(/^\d+[-_]/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// Group docs by their top-level section. '' (repo-root docs like README) → "Overview".
const sections = computed(() => {
  const bySection = new Map()
  for (const d of wiki.docs) {
    const key = d.section || ''
    if (!bySection.has(key)) bySection.set(key, [])
    bySection.get(key).push({ ...d, label: prettify(d.file) })
  }
  const keys = [...bySection.keys()].sort((a, b) => {
    if (a === '') return -1 // Overview first
    if (b === '') return 1
    return a.localeCompare(b)
  })
  return keys.map((k) => ({
    key: k,
    label: k ? prettify(k) : 'Overview',
    docs: bySection.get(k),
  }))
})

const allDocs = computed(() => sections.value.flatMap((s) => s.docs))

// Selected doc is tracked in the URL hash (#<rel>) so it's shareable/back-button-able.
function readHash() {
  const h = decodeURIComponent((window.location.hash || '').replace(/^#/, ''))
  return h || null
}
function pickDefault() {
  const docs = allDocs.value
  if (!docs.length) return null
  const readme = docs.find((d) => /readme\.md$/i.test(d.rel))
  return (readme || docs[0]).rel
}

const selectedRel = ref(readHash() || pickDefault())
const selected = computed(() => allDocs.value.find((d) => d.rel === selectedRel.value) || null)
const rendered = computed(() => (selected.value ? marked.parse(selected.value.content) : ''))

function open(rel, e) {
  if (e) e.preventDefault()
  selectedRel.value = rel
  history.pushState(null, '', '#' + encodeURIComponent(rel))
  window.scrollTo(0, 0)
}
function onHash() {
  selectedRel.value = readHash() || pickDefault()
}
onMounted(() => {
  if (!readHash() && selectedRel.value) {
    history.replaceState(null, '', '#' + encodeURIComponent(selectedRel.value))
  }
  window.addEventListener('hashchange', onHash)
  window.addEventListener('popstate', onHash)
})
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', onHash)
  window.removeEventListener('popstate', onHash)
})
</script>

<template>
  <div class="wiki">
    <aside class="wiki-nav">
      <a href="/home" class="os-back">← Post-Click OS</a>
      <h2 class="wiki-brand">Wiki</h2>
      <p v-if="!wiki.present" class="empty">Knowledge base not found on disk.</p>
      <p v-else-if="!allDocs.length" class="empty">Nothing written yet.</p>
      <nav v-else class="wiki-sections">
        <div v-for="s in sections" :key="s.key" class="wiki-section">
          <p class="wiki-section-label">{{ s.label }}</p>
          <ul>
            <li v-for="d in s.docs" :key="d.rel">
              <a
                :href="'#' + encodeURIComponent(d.rel)"
                class="wiki-link"
                :class="{ active: d.rel === selectedRel }"
                @click="open(d.rel, $event)"
                >{{ d.label }}</a
              >
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <main class="wiki-main">
      <article v-if="selected" class="wiki-body" v-html="rendered" />
      <p v-else class="empty wiki-placeholder">Select a document from the left.</p>
    </main>
  </div>
</template>

<style scoped>
.wiki {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  align-items: start;
}
.wiki-nav {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  overflow-y: auto;
  padding: 1.75rem 1.25rem 2rem;
  border-right: 1px solid var(--border);
  background: var(--panel);
}
.wiki-brand {
  margin: 0.75rem 0 1.5rem;
  font-family: var(--display);
  font-size: 1.3rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.wiki-section {
  margin-bottom: 1.5rem;
}
.wiki-section-label {
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.wiki-section ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.wiki-link {
  display: block;
  padding: 0.35rem 0.6rem;
  border-radius: 7px;
  font-size: 0.9rem;
  color: var(--text);
  transition: background 0.12s ease, color 0.12s ease;
}
.wiki-link:hover {
  background: rgba(44, 15, 68, 0.06);
}
.wiki-link.active {
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 600;
}
.wiki-main {
  padding: 3.5rem 3rem 6rem;
  max-width: 820px;
}
.wiki-placeholder {
  padding-top: 1rem;
}
.empty {
  color: var(--muted);
  font-size: 0.9rem;
}

/* rendered markdown */
.wiki-body {
  line-height: 1.7;
  font-size: 1rem;
  color: var(--text);
}
.wiki-body :deep(h1),
.wiki-body :deep(h2),
.wiki-body :deep(h3) {
  font-family: var(--display);
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 2rem 0 0.75rem;
}
.wiki-body :deep(h1) {
  font-size: 1.9rem;
  margin-top: 0;
}
.wiki-body :deep(h2) {
  font-size: 1.4rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}
.wiki-body :deep(h3) {
  font-size: 1.15rem;
}
.wiki-body :deep(p),
.wiki-body :deep(li) {
  color: var(--body);
}
.wiki-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.wiki-body :deep(code) {
  background: rgba(44, 15, 68, 0.07);
  color: var(--ink);
  font-family: var(--mono);
  padding: 0.12rem 0.4rem;
  border-radius: 5px;
  font-size: 0.86em;
}
.wiki-body :deep(pre) {
  background: #241a39;
  color: #ece7f5;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  overflow-x: auto;
}
.wiki-body :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
}
.wiki-body :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.4rem 1rem;
  border-left: 3px solid var(--border);
  color: var(--muted);
}
.wiki-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
  font-size: 0.92rem;
}
.wiki-body :deep(th),
.wiki-body :deep(td) {
  border: 1px solid var(--border);
  padding: 0.5rem 0.7rem;
  text-align: left;
}
.wiki-body :deep(th) {
  background: var(--panel-2);
  font-family: var(--display);
}
.wiki-body :deep(hr) {
  border: 0;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}
.wiki-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}

@media (max-width: 720px) {
  .wiki {
    grid-template-columns: 1fr;
  }
  .wiki-nav {
    position: static;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }
  .wiki-main {
    padding: 2rem 1.25rem 4rem;
  }
}
</style>
