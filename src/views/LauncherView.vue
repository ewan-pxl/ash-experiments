<script setup>
import { pagesOf } from '../pages.js'
import { wiki, branding } from 'virtual:postclick-data'
import PtLogo from '../components/PtLogo.vue'

// Live counts per area.
const experiments = pagesOf('experiment').length
const agency = pagesOf('agency').length
const docs = wiki.docs.length
const brands = branding.brands.length
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

// Two work areas (where work happens), then two reference areas (what you pull from).
const cards = [
  {
    key: 'experiments',
    title: 'Experiments',
    href: '/home/experiments',
    icon: 'science',
    desc: 'In the business — the delivery workbench. Ideate concepts against a brand, hand designers something real.',
    meta: plural(experiments, 'page', 'pages'),
  },
  {
    key: 'agency',
    title: 'Agency',
    href: '/home/agency',
    icon: 'corporate_fare',
    desc: 'On the business — proposals, reporting, internal decks and marketing material.',
    meta: plural(agency, 'page', 'pages'),
  },
  {
    key: 'wiki',
    title: 'Wiki',
    href: '/home/wiki',
    icon: 'menu_book',
    desc: 'The Post-Click knowledge base: positioning, methodology, delivery, sales.',
    meta: wiki.present ? plural(docs, 'doc', 'docs') : 'source not found',
  },
  {
    key: 'assets',
    title: 'Assets',
    href: '/home/assets',
    icon: 'palette',
    desc: 'The asset library — logos, colours, type, fonts and imagery, per brand.',
    meta: branding.present ? plural(brands, 'brand', 'brands') : 'source not found',
  },
]
</script>

<template>
  <main class="launch">
    <header class="launch-head">
      <PtLogo class="launch-logo" />
      <h1>Post-Click <span class="os">OS</span></h1>
      <p class="tagline">Pixel Theory's internal home — experiments, agency work, the wiki, and assets, all in one place.</p>
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
  /* Dark-surface token overrides, scoped to the home launcher. The cards and text below
     read these variables, so re-tinting them here flips the whole launcher to the purple
     theme without affecting any inner page. */
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.26);
  --ink: #ffffff;
  --body: rgba(207, 174, 237, 0.84);
  --muted: rgba(207, 174, 237, 0.62);
  --accent: #cfaeed;
  --accent-soft: rgba(146, 36, 233, 0.32);
  --good: #84d6a3;
  --good-soft: rgba(132, 214, 163, 0.16);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.25), 0 18px 40px -24px rgba(0, 0, 0, 0.6);
  --shadow-hover: 0 2px 8px rgba(0, 0, 0, 0.32), 0 26px 60px -28px rgba(0, 0, 0, 0.72);

  min-height: 100vh;
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
.launch-head h1 .os {
  color: var(--yellow);
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
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
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
.launch-card.agency .launch-icon {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ink);
}
.launch-card.wiki .launch-icon {
  background: var(--good-soft);
  color: var(--good);
}
.launch-card.assets .launch-icon {
  background: rgba(254, 194, 0, 0.18);
  color: var(--yellow);
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
