<script setup>
// One 16:9 slide: logo+meta rail, body slot, footer.
// Slide surface / tone / typography / card base are standardised → deck.css.
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

<style scoped>
.rail {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2cqw;
}
.logo-svg {
  height: 2.55cqw;
  width: 15cqw;
  display: block;
}
.is-dark .logo-svg {
  color: #fff;
}
.is-light .logo-svg {
  color: var(--ink);
}
.meta {
  font-family: var(--mono);
  font-size: 1.02cqw;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.is-dark .meta {
  color: var(--mut-d);
}
.is-light .meta {
  color: var(--mut-l);
}
.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2cqw;
  font-family: var(--mono);
  font-size: 0.86cqw;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.is-dark .foot {
  color: rgba(207, 174, 237, 0.5);
}
.is-light .foot {
  color: rgba(44, 15, 68, 0.4);
}
.foot span:nth-child(2) {
  flex: 1;
  text-align: center;
}
.foot span:last-child {
  text-align: right;
}
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}
.body.top {
  justify-content: flex-start;
}
</style>
