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
