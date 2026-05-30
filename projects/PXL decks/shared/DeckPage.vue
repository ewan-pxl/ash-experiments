<script setup>
// Injects the shared Pixel Theory logo sprite once, then renders the slides.
import ptLogo from '@projects/PXL decks/logo.svg?raw'
</script>

<template>
  <div aria-hidden="true" v-html="ptLogo"></div>
  <slot />
</template>
