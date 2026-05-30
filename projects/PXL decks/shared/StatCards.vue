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

<style scoped>
.card.feature {
  background: var(--ink);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 30px 60px -28px rgba(44, 15, 68, 0.6);
}
.clabel {
  font-family: var(--mono);
  font-size: 0.92cqw;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--mut-l);
  line-height: 1.35;
}
.feature .clabel {
  color: var(--yellow);
}
.stat {
  font-family: var(--display);
  font-weight: 600;
  font-size: 5.2cqw;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0.2cqw 0 1.2cqw;
}
.feature .stat {
  color: var(--yellow);
}
.feature .csub {
  color: rgba(255, 255, 255, 0.82);
}
.divider {
  height: 1px;
  background: var(--line-l);
  margin: 1.3cqw 0;
}
.feature .divider {
  background: rgba(255, 255, 255, 0.16);
}
.pill {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5cqw;
  background: var(--yellow);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.86cqw;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.5cqw 0.9cqw;
  border-radius: 5cqw;
  margin-bottom: 1.1cqw;
}
.pill .dot {
  width: 0.6cqw;
  height: 0.6cqw;
  border-radius: 50%;
  background: var(--ink);
}
</style>
