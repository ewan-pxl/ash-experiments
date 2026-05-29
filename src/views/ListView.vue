<script setup>
import { ref, computed } from 'vue'

// Pages are discovered automatically from their meta.json files at build time.
// Nothing here ever needs manual editing when a page is added or removed.
const modules = import.meta.glob('/pages/*/meta.json', { eager: true })

// Newest first.
const allPages = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/')[2] // /pages/<slug>/meta.json
    const meta = mod.default ?? mod
    return {
      slug,
      id: meta.id ?? 0,
      name: meta.name ?? slug,
      description: meta.description ?? '',
      created: meta.created ?? '',
    }
  })
  .sort((a, b) => b.id - a.id)

const query = ref('')
const pages = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return allPages
  return allPages.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q),
  )
})

// In dev, pages live at /pages/<slug>/; the build lifts them to /<slug>/.
const href = (slug) =>
  import.meta.env.DEV ? `/pages/${slug}/index.html` : `/${slug}/`
</script>

<template>
  <main class="list">
    <header class="head">
      <h1>Index</h1>
      <span class="count">{{ allPages.length }} {{ allPages.length === 1 ? 'page' : 'pages' }}</span>
    </header>

    <input
      v-if="allPages.length"
      v-model="query"
      type="search"
      class="search"
      placeholder="Search…"
      autofocus
    />

    <p v-if="!allPages.length" class="empty">Nothing here yet.</p>
    <p v-else-if="!pages.length" class="empty">No matches.</p>

    <ul v-else class="grid">
      <li v-for="p in pages" :key="p.slug">
        <a :href="href(p.slug)" class="card">
          <div class="card-top">
            <span class="name">{{ p.name }}</span>
            <span class="id">#{{ String(p.id).padStart(3, '0') }}</span>
          </div>
          <p class="desc">{{ p.description }}</p>
          <div class="card-bottom">
            <code class="slug">/{{ p.slug }}</code>
            <span v-if="p.created" class="date">{{ p.created }}</span>
          </div>
        </a>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.list {
  max-width: 880px;
  margin: 0 auto;
  padding: 4rem 1.25rem 6rem;
}
.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2rem;
}
h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.count {
  color: var(--muted);
  font-size: 0.875rem;
}
.search {
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 0.7rem 0.95rem;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  font-size: 0.95rem;
  font-family: inherit;
}
.search::placeholder {
  color: var(--muted);
}
.search:focus {
  outline: none;
  border-color: var(--accent);
}
.empty {
  color: var(--muted);
}
.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}
.card {
  display: block;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem 1.25rem;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.card:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}
.card-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}
.name {
  font-weight: 600;
  font-size: 1.05rem;
}
.id {
  color: var(--muted);
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
}
.desc {
  color: var(--muted);
  margin: 0.4rem 0 0.9rem;
  line-height: 1.5;
  font-size: 0.925rem;
}
.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.slug {
  color: var(--accent);
  font-size: 0.8rem;
}
.date {
  color: var(--muted);
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}
</style>
