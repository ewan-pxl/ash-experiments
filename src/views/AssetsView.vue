<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { marked } from 'marked'
import { branding } from 'virtual:postclick-data'

function prettify(s) {
  return s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const brands = computed(() => branding.brands)

// Selected brand tracked in the URL hash so it's shareable / back-button friendly.
function readHash() {
  const h = decodeURIComponent((window.location.hash || '').replace(/^#/, ''))
  return h || null
}
function pickDefault() {
  return brands.value.length ? brands.value[0].name : null
}
const selectedName = ref(readHash() || pickDefault())
const brand = computed(() => brands.value.find((b) => b.name === selectedName.value) || null)

const readmeHtml = computed(() => (brand.value && brand.value.readme ? marked.parse(brand.value.readme) : ''))
const fontsHtml = computed(() => (brand.value && brand.value.fonts ? marked.parse(brand.value.fonts) : ''))

// Is a resolved token value a usable CSS colour (so we can render a real swatch)?
function isColor(v) {
  return typeof v === 'string' && /^(#|rgb|hsl)/i.test(v)
}

function open(name, e) {
  if (e) e.preventDefault()
  selectedName.value = name
  history.pushState(null, '', '#' + encodeURIComponent(name))
  window.scrollTo(0, 0)
}
function onHash() {
  selectedName.value = readHash() || pickDefault()
}
onMounted(() => {
  if (!readHash() && selectedName.value) {
    history.replaceState(null, '', '#' + encodeURIComponent(selectedName.value))
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
  <div class="brand-page">
    <aside class="brand-nav">
      <a href="/home" class="os-back">← Post-Click OS</a>
      <h2 class="brand-brand">Assets</h2>
      <p v-if="!branding.present" class="empty">Asset library not found on disk.</p>
      <p v-else-if="!brands.length" class="empty">No brands yet.</p>
      <nav v-else class="brand-list">
        <button
          v-for="b in brands"
          :key="b.name"
          type="button"
          class="brand-link"
          :class="{ active: b.name === selectedName }"
          @click="open(b.name)"
        >
          {{ prettify(b.name) }}
          <span v-if="b.group === 'house'" class="brand-tag">house</span>
        </button>
      </nav>
    </aside>

    <main class="brand-main">
      <template v-if="brand">
        <h1 class="brand-title">{{ prettify(brand.name) }}</h1>

        <!-- Logos -->
        <section v-if="brand.logos.length" class="brand-section">
          <h3 class="brand-h">Logos</h3>
          <div class="logo-grid">
            <figure v-for="l in brand.logos" :key="l.name" class="logo-cell">
              <div class="logo-art" v-if="l.kind === 'svg'" v-html="l.markup" />
              <img v-else class="logo-art" :src="l.src" :alt="l.name" />
              <figcaption>{{ l.name }}</figcaption>
            </figure>
          </div>
        </section>

        <!-- Colours -->
        <section v-if="brand.colors.length" class="brand-section">
          <h3 class="brand-h">Colours</h3>
          <div class="swatch-grid">
            <div v-for="c in brand.colors" :key="c.name" class="swatch">
              <span
                class="swatch-chip"
                :style="{ background: isColor(c.value) ? c.value : 'transparent' }"
                :class="{ unknown: !isColor(c.value) }"
              />
              <span class="swatch-name">{{ c.name }}</span>
              <span class="swatch-val">{{ c.value }}</span>
              <span v-if="c.description" class="swatch-note">{{ c.description }}</span>
            </div>
          </div>
        </section>

        <!-- Typography -->
        <section v-if="brand.typography.length" class="brand-section">
          <h3 class="brand-h">Typography</h3>
          <ul class="token-list">
            <li v-for="t in brand.typography" :key="t.name">
              <code class="token-name">{{ t.name }}</code>
              <span class="token-val">{{ typeof t.value === 'object' ? JSON.stringify(t.value) : t.value }}</span>
            </li>
          </ul>
        </section>

        <!-- Spacing -->
        <section v-if="brand.spacing.length" class="brand-section">
          <h3 class="brand-h">Spacing</h3>
          <ul class="token-list">
            <li v-for="s in brand.spacing" :key="s.name">
              <code class="token-name">{{ s.name }}</code>
              <span class="token-val">{{ s.value }}</span>
            </li>
          </ul>
        </section>

        <!-- Imagery -->
        <section v-if="brand.images.length" class="brand-section">
          <h3 class="brand-h">Imagery</h3>
          <div class="img-grid">
            <figure v-for="im in brand.images" :key="im.name" class="img-cell">
              <img :src="im.src" :alt="im.name" loading="lazy" />
              <figcaption>{{ im.name }}</figcaption>
            </figure>
          </div>
        </section>

        <!-- Fonts notes -->
        <section v-if="fontsHtml" class="brand-section">
          <h3 class="brand-h">Fonts</h3>
          <div class="md-body" v-html="fontsHtml" />
        </section>

        <!-- Brand README -->
        <section v-if="readmeHtml" class="brand-section">
          <h3 class="brand-h">Notes</h3>
          <div class="md-body" v-html="readmeHtml" />
        </section>

        <p
          v-if="
            !brand.logos.length &&
            !brand.colors.length &&
            !brand.typography.length &&
            !brand.images.length &&
            !readmeHtml &&
            !fontsHtml
          "
          class="empty"
        >
          Nothing on file for this brand yet.
        </p>
      </template>
      <p v-else class="empty">Select a brand from the left.</p>
    </main>
  </div>
</template>

<style scoped>
.brand-page {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  align-items: start;
}
.brand-nav {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  overflow-y: auto;
  padding: 1.75rem 1.1rem 2rem;
  border-right: 1px solid var(--border);
  background: var(--panel);
}
.brand-brand {
  margin: 0.75rem 0 1.5rem;
  font-family: var(--display);
  font-size: 1.3rem;
  font-weight: 650;
  color: var(--ink);
}
.brand-list {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.brand-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 0.92rem;
  padding: 0.4rem 0.6rem;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}
.brand-link:hover {
  background: rgba(44, 15, 68, 0.06);
}
.brand-link.active {
  background: var(--project);
  color: var(--accent-ink);
  font-weight: 600;
}
.brand-tag {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}
.brand-main {
  padding: 3.5rem 3rem 6rem;
  max-width: 880px;
}
.brand-title {
  margin: 0 0 2rem;
  font-family: var(--display);
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.brand-section {
  margin-bottom: 2.5rem;
}
.brand-h {
  margin: 0 0 1rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.empty {
  color: var(--muted);
  font-size: 0.9rem;
}

/* logos */
.logo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}
.logo-cell {
  margin: 0;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.logo-art {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  padding: 1rem;
}
.logo-art :deep(svg),
.logo-art {
  max-width: 100%;
  max-height: 120px;
}
.logo-cell figcaption {
  padding: 0.5rem 0.7rem;
  font-size: 0.75rem;
  color: var(--muted);
  background: var(--panel);
  border-top: 1px solid var(--border);
}

/* colours */
.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.85rem;
}
.swatch {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'chip name' 'chip val' 'note note';
  align-items: center;
  gap: 0.1rem 0.7rem;
  padding: 0.7rem;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
}
.swatch-chip {
  grid-area: chip;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid var(--border-strong);
}
.swatch-chip.unknown {
  background: repeating-linear-gradient(45deg, #ece8e0, #ece8e0 6px, #f6f4ef 6px, #f6f4ef 12px);
}
.swatch-name {
  grid-area: name;
  font-size: 0.85rem;
  font-weight: 600;
}
.swatch-val {
  grid-area: val;
  font-size: 0.78rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.swatch-note {
  grid-area: note;
  margin-top: 0.35rem;
  font-size: 0.72rem;
  color: var(--muted);
  line-height: 1.4;
}

/* token lists */
.token-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.3rem;
}
.token-list li {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.4rem 0.7rem;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.token-name {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.82rem;
  min-width: 12rem;
}
.token-val {
  color: var(--text);
  font-size: 0.85rem;
}

/* imagery */
.img-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}
.img-cell {
  margin: 0;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.img-cell img {
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.img-cell figcaption {
  padding: 0.5rem 0.7rem;
  font-size: 0.75rem;
  color: var(--muted);
}

/* markdown blocks (notes / fonts) */
.md-body {
  line-height: 1.6;
  font-size: 0.95rem;
  color: var(--body);
}
.md-body :deep(h1),
.md-body :deep(h2),
.md-body :deep(h3) {
  font-family: var(--display);
  color: var(--ink);
  margin: 1.2rem 0 0.6rem;
  font-size: 1.05rem;
}
.md-body :deep(a) {
  color: var(--accent);
}
.md-body :deep(code) {
  background: rgba(44, 15, 68, 0.07);
  color: var(--ink);
  font-family: var(--mono);
  padding: 0.1rem 0.35rem;
  border-radius: 5px;
  font-size: 0.85em;
}
.md-body :deep(table) {
  border-collapse: collapse;
  margin: 0.75rem 0;
  font-size: 0.88rem;
}
.md-body :deep(th),
.md-body :deep(td) {
  border: 1px solid var(--border);
  padding: 0.4rem 0.6rem;
  text-align: left;
}

@media (max-width: 720px) {
  .brand-page {
    grid-template-columns: 1fr;
  }
  .brand-nav {
    position: static;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }
  .brand-main {
    padding: 2rem 1.25rem 4rem;
  }
}
</style>
