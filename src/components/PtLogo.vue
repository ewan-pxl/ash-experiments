<script setup>
// The Pixel Theory wordmark. The SVG sprite (#pt-logo) is injected once at the
// app root in App.vue; this just references it. It uses currentColor, so set
// `color` on the element (or a parent) to recolour it.
defineProps({ label: { type: String, default: 'Pixel Theory' } })
</script>

<template>
  <svg class="pt-logo" viewBox="0 0 890 151" role="img" :aria-label="label">
    <use href="#pt-logo" />
  </svg>
</template>

<style scoped>
.pt-logo {
  display: block;
  height: 1.75rem;
  width: auto;
  color: var(--ink);
}
</style>
