<script setup>
import LauncherView from './views/LauncherView.vue'
import IndexView from './views/IndexView.vue'
import WikiView from './views/WikiView.vue'
import AssetsView from './views/AssetsView.vue'
import QAView from './views/QAView.vue'
import NotFound from './views/NotFound.vue'
// The Pixel Theory logo ships as an SVG sprite (an invisible <symbol id="pt-logo">).
// Inject it once here so any <PtLogo> in any area can reference it via <use>.
import ptLogoSprite from '@projects/PXL decks/logo.svg?raw'

// The shell is the "Post-Click OS". One front door at /home, four areas beneath it:
//   /home                 → launcher (the cards)
//   /home/experiments...  → Experiments — in the business (delivery workbench)
//   /home/agency...       → Agency — on the business (proposals, reporting, decks)
//   /home/wiki...         → Wiki — the knowledge base (pxl-postclick-os)
//   /home/assets...       → Assets — the brand/asset library (branding repo)
//   /home/qa...           → QA — website QA runs (findings + screenshots per project)
// Everything else is a 404. In prod, _redirects serves this shell for any path;
// in dev the /home* middleware passthrough does the same — routing is client-side.
const path = window.location.pathname.replace(/\/+$/, '') || '/'

// Root has no public homepage of its own — send it to the OS front door at /home.
// (Prod also does this at the edge via _redirects; this covers dev and is a fallback.)
if (path === '/') window.location.replace('/home')

function pick() {
  if (path === '/home') return 'launcher'
  if (path === '/home/experiments' || path.startsWith('/home/experiments/')) return 'experiments'
  if (path === '/home/agency' || path.startsWith('/home/agency/')) return 'agency'
  if (path === '/home/wiki' || path.startsWith('/home/wiki/')) return 'wiki'
  if (path === '/home/assets' || path.startsWith('/home/assets/')) return 'assets'
  if (path === '/home/qa' || path.startsWith('/home/qa/')) return 'qa'
  return 'notfound'
}
const area = pick()

// The launcher (home) runs the deck's dark purple theme; inner areas stay light.
// Gate it on a body class so the full-bleed background only applies to /home.
if (area === 'launcher') document.body.classList.add('home')

const titles = {
  launcher: 'Post-Click OS',
  experiments: 'Experiments',
  agency: 'Agency',
  wiki: 'Wiki',
  assets: 'Assets',
  qa: 'QA',
  notfound: '404',
}
document.title = titles[area]
</script>

<template>
  <div class="pt-sprite" aria-hidden="true" v-html="ptLogoSprite" />
  <LauncherView v-if="area === 'launcher'" />
  <IndexView v-else-if="area === 'experiments'" kind="experiment" />
  <IndexView v-else-if="area === 'agency'" kind="agency" />
  <WikiView v-else-if="area === 'wiki'" />
  <AssetsView v-else-if="area === 'assets'" />
  <QAView v-else-if="area === 'qa'" />
  <NotFound v-else />
</template>
