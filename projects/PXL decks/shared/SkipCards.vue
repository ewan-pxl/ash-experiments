<script setup>
// 3-up dashed "what we'd skip" cards. item: { title, sub }
defineProps({ items: { type: Array, default: () => [] } })
</script>

<template>
  <div class="cards c3">
    <div v-for="(c, i) in items" :key="i" class="card skip-card">
      <div class="xmark">✕</div>
      <div class="ct">{{ c.title }}</div>
      <div class="csub">{{ c.sub }}</div>
    </div>
  </div>
</template>
