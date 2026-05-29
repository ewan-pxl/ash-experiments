<script setup>
import ListView from './views/ListView.vue'
import NotFound from './views/NotFound.vue'

// The shell only renders two things: the hidden index at /list, and a 404 for
// everything else. There is no homepage. Pages themselves are separate
// documents, so no in-app navigation happens here.
const path = window.location.pathname.replace(/\/+$/, '')
const isList = path === '/list'
</script>

<template>
  <ListView v-if="isList" />
  <NotFound v-else />
</template>
