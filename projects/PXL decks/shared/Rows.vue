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

<style scoped>
.rows {
  margin-top: 1.5cqw;
  display: flex;
  flex-direction: column;
}
.rows.two {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, auto);
  column-gap: 5.5cqw;
  align-content: start;
  margin-top: 1.9cqw;
}
.rows.two .row {
  border-bottom: none;
}
.rows.two .rd {
  max-width: none;
}
.row {
  display: grid;
  grid-template-columns: 5cqw 1fr;
  gap: 2.4cqw;
  align-items: baseline;
  padding: 0.98cqw 0;
  border-top: 1px solid var(--line-l);
}
.row:last-child {
  border-bottom: 1px solid var(--line-l);
}
.row .rn {
  font-family: var(--display);
  font-weight: 600;
  font-size: 2.6cqw;
  line-height: 1;
  color: rgba(44, 15, 68, 0.22);
}
.row.lead .rn {
  color: var(--yellow);
}
.row .rt {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.78cqw;
  line-height: 1.05;
  margin-bottom: 0.45cqw;
}
.row .rd {
  font-size: 1.18cqw;
  line-height: 1.45;
  color: var(--body-l);
  max-width: 64cqw;
}
.row .grid2 {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0;
}
</style>
