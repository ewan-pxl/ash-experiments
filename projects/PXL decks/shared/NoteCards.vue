<script setup>
// "note" cards in two variants:
//   idea (default) — title + sub
//   team           — photo + title + role + sub
// item: { title, sub, photo?, role? }
defineProps({
  items: { type: Array, default: () => [] },
  cols: { type: Number, default: 4 }, // 3 or 4
  variant: { type: String, default: 'idea' }, // 'idea' | 'team'
})
</script>

<template>
  <div class="cards" :class="cols === 3 ? 'c3' : 'c4'">
    <div v-for="(c, i) in items" :key="i" class="card note" :class="variant">
      <img v-if="c.photo" class="team-photo" :src="c.photo" :alt="c.title" />
      <div class="ct">{{ c.title }}</div>
      <div v-if="c.role" class="crole">{{ c.role }}</div>
      <div class="csub">{{ c.sub }}</div>
    </div>
  </div>
</template>

<style scoped>
/* idea cards */
.note.idea .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.85cqw;
  line-height: 1.08;
  margin-bottom: 0.8cqw;
}
.note.idea .csub {
  margin-top: 0;
}

/* team cards */
.note.team .team-photo {
  width: 5.4cqw;
  height: 5.4cqw;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.4cqw;
  background: var(--line-l);
  border: 1px solid var(--line-l);
}
.note.team .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.7cqw;
  line-height: 1.06;
  margin-bottom: 0.35cqw;
  white-space: nowrap;
}
.note.team .crole {
  font-family: var(--mono);
  font-size: 0.9cqw;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mut-l);
  margin-bottom: 0.85cqw;
  white-space: nowrap;
}
.note.team .csub {
  margin-top: 0;
}
</style>
