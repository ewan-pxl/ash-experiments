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

<style scoped>
.skip-card {
  border-style: dashed;
  border-color: rgba(44, 15, 68, 0.18);
  background: rgba(255, 255, 255, 0.55);
  box-shadow: none;
}
.skip-card .xmark {
  width: 2.5cqw;
  height: 2.5cqw;
  border-radius: 50%;
  border: 1.4px solid rgba(44, 15, 68, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mut-l);
  font-size: 1.3cqw;
  margin-bottom: 1.6cqw;
}
.skip-card .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.85cqw;
  line-height: 1.08;
  margin-bottom: 0.8cqw;
  color: rgba(44, 15, 68, 0.78);
}
.skip-card .csub {
  margin-top: 0;
}
</style>
