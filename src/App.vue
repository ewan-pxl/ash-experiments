<script setup>
import IndexView from './views/IndexView.vue'
import NotFound from './views/NotFound.vue'

// The shell renders the hidden index for /home and /home/<folder>, and a 404 for
// everything else. There is no homepage. Pages themselves are separate documents.
const path = window.location.pathname.replace(/\/+$/, '')
const isIndex = path === '/home' || path.startsWith('/home/')
if (!isIndex) document.title = '404'
</script>

<template>
  <IndexView v-if="isIndex" />
  <NotFound v-else />
</template>
