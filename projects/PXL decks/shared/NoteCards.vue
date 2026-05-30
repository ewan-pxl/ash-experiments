<script setup>
// "note" cards — idea text or team members. item: { title, sub, photo?, role? }
// Styling (sizes, photo) lives in each deck's local <style> so it can differ.
defineProps({
  items: { type: Array, default: () => [] },
  cols: { type: Number, default: 4 }, // 3 or 4
})
</script>

<template>
  <div class="cards" :class="cols === 3 ? 'c3' : 'c4'">
    <div v-for="(c, i) in items" :key="i" class="card note">
      <img v-if="c.photo" class="team-photo" :src="c.photo" :alt="c.title" />
      <div class="ct">{{ c.title }}</div>
      <div v-if="c.role" class="crole">{{ c.role }}</div>
      <div class="csub">{{ c.sub }}</div>
    </div>
  </div>
</template>
