<script setup>
// Editorial numbered rows. item: { n, title, desc, lead? }. `two` = 2-column layout.
defineProps({ items: { type: Array, default: () => [] }, two: Boolean })
</script>

<template>
  <div class="rows" :class="{ two }">
    <div v-for="(r, i) in items" :key="i" class="row" :class="{ lead: r.lead }">
      <div class="rn">{{ r.n }}</div>
      <div>
        <div class="rt">{{ r.title }}</div>
        <div class="rd">{{ r.desc }}</div>
      </div>
    </div>
  </div>
</template>
