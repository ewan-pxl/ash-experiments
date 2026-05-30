<script setup>
// Root of a deck: loads the shared brand tokens + standardised deck styles, and
// injects the Pixel Theory logo sprite once. Slides go in the slot.
import '@projects/PXL decks/brand.css'
import '@projects/PXL decks/deck.css'
import ptLogo from '@projects/PXL decks/logo.svg?raw'
</script>

<template>
  <div aria-hidden="true" v-html="ptLogo"></div>
  <slot />
</template>
