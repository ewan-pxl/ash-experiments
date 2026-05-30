<script setup>
// Two-column section header (title + lede). title allows <br>.
defineProps({ title: String, lede: String })
</script>

<template>
  <div class="head-split">
    <h2 v-html="title"></h2>
    <p class="lede">{{ lede }}</p>
  </div>
</template>

<style scoped>
.head-split {
  display: grid;
  grid-template-columns: 1.04fr 0.96fr;
  gap: 3cqw;
  align-items: center;
}
.head-split .lede {
  max-width: none;
  padding-bottom: 0.4cqw;
}
</style>
