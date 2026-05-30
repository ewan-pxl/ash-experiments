<script setup>
// 4-up numbered cards. item: { badge, badgeY?, kicker?, title, sub?, feats? }
// title allows <br>; pass feats (array) for a ticked list instead of sub.
defineProps({ items: { type: Array, default: () => [] } })
</script>

<template>
  <div class="cards c4">
    <div v-for="(c, i) in items" :key="i" class="card num-card">
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
