<script setup>
// Closing checklist: numbered "asks" + a closing line. items: string[]
defineProps({ items: { type: Array, default: () => [] }, closeLine: String })
</script>

<template>
  <div class="asks">
    <div v-for="(a, i) in items" :key="i" class="ask">
      <div class="an">{{ i + 1 }}</div>
      <div class="ad">{{ a }}</div>
    </div>
  </div>
  <p v-if="closeLine" class="close-line">{{ closeLine }}</p>
</template>

<style scoped>
.asks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1cqw 3.4cqw;
  margin-top: 3cqw;
}
.ask {
  display: grid;
  grid-template-columns: 2.5cqw 1fr;
  gap: 1.4cqw;
  align-items: start;
  padding: 0.7cqw 0;
}
.ask .an {
  width: 2.5cqw;
  height: 2.5cqw;
  border-radius: 50%;
  background: var(--yellow);
  color: var(--ink);
  font-family: var(--mono);
  font-weight: 700;
  font-size: 1cqw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.ask .ad {
  font-size: 1.28cqw;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  padding-top: 0.35cqw;
}
.ask .ad b {
  color: #fff;
  font-weight: 600;
}
.close-line {
  margin-top: 3cqw;
  font-size: 1.5cqw;
  line-height: 1.5;
  color: var(--lilac);
  max-width: 62cqw;
}
</style>
