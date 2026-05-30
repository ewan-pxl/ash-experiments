<script setup>
import LauncherView from './views/LauncherView.vue'
import IndexView from './views/IndexView.vue'
import WikiView from './views/WikiView.vue'
import BrandingView from './views/BrandingView.vue'
import NotFound from './views/NotFound.vue'
// The Pixel Theory logo ships as an SVG sprite (an invisible <symbol id="pt-logo">).
// Inject it once here so any <PtLogo> in any area can reference it via <use>.
import ptLogoSprite from '@projects/PXL decks/logo.svg?raw'

// The shell is the "Post-Click OS". One front door at /home, three areas beneath it:
//   /home                 → launcher (the three cards)
//   /home/experiments...  → the experiments index (folders / projects / tags)
//   /home/wiki...         → the knowledge base (pxl-postclick-os)
//   /home/branding...     → the brand asset gallery (branding)
// Everything else is a 404. In prod, _redirects serves this shell for any path;
// in dev the /home* middleware passthrough does the same — routing is client-side.
const path = window.location.pathname.replace(/\/+$/, '') || '/'

function pick() {
  if (path === '/home') return 'launcher'
  if (path === '/home/experiments' || path.startsWith('/home/experiments/')) return 'experiments'
  if (path === '/home/wiki' || path.startsWith('/home/wiki/')) return 'wiki'
  if (path === '/home/branding' || path.startsWith('/home/branding/')) return 'branding'
  return 'notfound'
}
const area = pick()

const titles = {
  launcher: 'Post-Click OS',
  experiments: 'Experiments',
  wiki: 'Wiki',
  branding: 'Branding',
  notfound: '404',
}
document.title = titles[area]
</script>

<template>
  <div class="pt-sprite" aria-hidden="true" v-html="ptLogoSprite" />
  <LauncherView v-if="area === 'launcher'" />
  <IndexView v-else-if="area === 'experiments'" />
  <WikiView v-else-if="area === 'wiki'" />
  <BrandingView v-else-if="area === 'branding'" />
  <NotFound v-else />
</template>
