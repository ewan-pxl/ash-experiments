<script setup>
import IndexView from './views/IndexView.vue'
import NotFound from './views/NotFound.vue'

// The shell renders the hidden index for /list and /list/<folder>, and a 404 for
// everything else. There is no homepage. Pages themselves are separate documents.
const path = window.location.pathname.replace(/\/+$/, '')
const isIndex = path === '/list' || path.startsWith('/list/')
if (!isIndex) document.title = '404'
</script>

<template>
  <IndexView v-if="isIndex" />
  <NotFound v-else />
</template>
