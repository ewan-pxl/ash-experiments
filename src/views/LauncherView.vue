<script setup>
import { pages } from '../pages.js'
import { wiki, branding } from 'virtual:postclick-data'
import PtLogo from '../components/PtLogo.vue'

// The three areas of the OS, with a live count pulled from each source.
const experiments = pages.length
const docs = wiki.docs.length
const brands = branding.brands.length

const cards = [
  {
    key: 'experiments',
    title: 'Experiments',
    href: '/home/experiments',
    icon: 'science',
    desc: 'Every Ash experiment page — browse by folder, project or tag.',
    meta: `${experiments} ${experiments === 1 ? 'page' : 'pages'}`,
  },
  {
    key: 'wiki',
    title: 'Wiki',
    href: '/home/wiki',
    icon: 'menu_book',
    desc: 'The Post-Click knowledge base: positioning, methodology, delivery, sales.',
    meta: wiki.present ? `${docs} ${docs === 1 ? 'doc' : 'docs'}` : 'source not found',
  },
  {
    key: 'branding',
    title: 'Branding',
    href: '/home/branding',
    icon: 'palette',
    desc: 'Brand assets on file — logos, colours, type and imagery, per client.',
    meta: branding.present ? `${brands} ${brands === 1 ? 'brand' : 'brands'}` : 'source not found',
  },
]
</script>

<template>
  <main class="launch">
    <header class="launch-head">
      <PtLogo class="launch-logo" />
      <h1>Post-Click OS</h1>
      <p class="tagline">Pixel Theory's internal home — experiments, the wiki, and brand assets, all in one place.</p>
    </header>

    <ul class="launch-grid">
      <li v-for="c in cards" :key="c.key">
        <a :href="c.href" class="launch-card" :class="c.key">
          <span class="material-symbols-outlined launch-icon" aria-hidden="true">{{ c.icon }}</span>
          <span class="launch-title">{{ c.title }}</span>
          <span class="launch-desc">{{ c.desc }}</span>
          <span class="launch-meta">{{ c.meta }}</span>
        </a>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.launch {
  max-width: 960px;
  margin: 0 auto;
  padding: 6rem 1.25rem 6rem;
}
.launch-head {
  margin-bottom: 3rem;
}
.launch-logo {
  height: 1.65rem;
  margin-bottom: 1.5rem;
  color: var(--ink);
}
.launch-head h1 {
  margin: 0 0 0.7rem;
  font-family: var(--display);
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--ink);
}
.tagline {
  margin: 0;
  color: var(--body);
  font-size: 1.05rem;
  line-height: 1.55;
  max-width: 38rem;
}
.launch-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.1rem;
}
.launch-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  padding: 1.7rem 1.6rem 1.5rem;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}
.launch-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}
/* pastel icon-chip (rounded square) — one tint per area, per the reference */
.launch-icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 14px;
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
}
.launch-card.experiments .launch-icon {
  background: var(--accent-soft);
  color: var(--accent);
}
.launch-card.wiki .launch-icon {
  background: var(--good-soft);
  color: var(--good);
}
.launch-card.branding .launch-icon {
  background: rgba(254, 194, 0, 0.18);
  color: #b58800;
}
.launch-title {
  font-family: var(--display);
  font-size: 1.3rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.launch-desc {
  color: var(--body);
  font-size: 0.92rem;
  line-height: 1.5;
  flex: 1;
}
.launch-meta {
  margin-top: 0.7rem;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}
</style>
