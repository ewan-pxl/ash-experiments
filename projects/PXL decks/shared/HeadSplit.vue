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
