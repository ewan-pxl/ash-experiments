<script setup>
// One 16:9 slide: logo+meta rail, body slot, footer. Styling comes from deck.css.
defineProps({
  tone: { type: String, default: 'light' }, // 'light' | 'dark'
  n: { type: [Number, String], default: '' },
  total: { type: [Number, String], default: '' },
  mid: { type: String, default: '' },
  right: { type: String, default: '' },
  top: { type: Boolean, default: false }, // top-align the body
})
const pad = (x) => String(x).padStart(2, '0')
</script>

<template>
  <section class="slide" :class="tone === 'dark' ? 'is-dark' : 'is-light'">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · {{ pad(n) }} / {{ pad(total) }}</div>
    </div>

    <div class="body" :class="{ top }">
      <slot />
    </div>

    <div class="foot">
      <span>Pixel Theory™ 2026</span><span>{{ mid }}</span><span>{{ right }}</span>
    </div>
  </section>
</template>
