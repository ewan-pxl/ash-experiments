<script setup>
// 4-up numbered cards. item: { badge, badgeY?, kicker?, title, sub?, feats? }
// title allows <br>; pass feats (array) for a ticked list instead of sub.
defineProps({ items: { type: Array, default: () => [] } })
</script>

<template>
  <div class="cards c4">
    <div v-for="(c, i) in items" :key="i" class="card num-card" :class="{ 'has-feats': c.feats }">
      <div class="top">
        <span v-if="c.kicker" class="kicker">{{ c.kicker }}</span>
        <span class="badge" :class="{ y: c.badgeY }">{{ c.badge }}</span>
      </div>
      <div class="ct" v-html="c.title"></div>
      <ul v-if="c.feats" class="feats">
        <li v-for="(f, j) in c.feats" :key="j">{{ f }}</li>
      </ul>
      <div v-else class="csub">{{ c.sub }}</div>
    </div>
  </div>
</template>

<style scoped>
.num-card .top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.6cqw;
}
.num-card.has-feats .top {
  margin-bottom: 1.6cqw;
}
.num-card .kicker {
  font-family: var(--mono);
  font-size: 0.92cqw;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mut-l);
}
.badge {
  width: 2.7cqw;
  height: 2.7cqw;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mono);
  font-weight: 600;
  font-size: 1.05cqw;
  background: var(--ink);
  color: #fff;
}
.badge.y {
  background: var(--yellow);
  color: var(--ink);
}
.num-card .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.95cqw;
  line-height: 1.05;
  margin-bottom: 0.9cqw;
}
.num-card .csub {
  margin-top: 0;
}
.feats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.95cqw;
}
.feats li {
  position: relative;
  padding-left: 2cqw;
  font-size: 1.12cqw;
  line-height: 1.34;
  color: var(--body-l);
}
.feats li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--ink);
  font-weight: 700;
  font-size: 1.12cqw;
}
</style>
