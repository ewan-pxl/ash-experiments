<script setup>
// 3-up stat cards. item: { label, stat, sub, feature?, pill? }
defineProps({ items: { type: Array, default: () => [] } })
</script>

<template>
  <div class="cards c3">
    <div v-for="(c, i) in items" :key="i" class="card" :class="{ feature: c.feature }">
      <span v-if="c.pill" class="pill"><span class="dot"></span>{{ c.pill }}</span>
      <div class="clabel">{{ c.label }}</div>
      <div class="stat">{{ c.stat }}</div>
      <div class="divider"></div>
      <div class="csub">{{ c.sub }}</div>
    </div>
  </div>
</template>
