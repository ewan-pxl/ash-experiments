<script setup>
import { ref } from 'vue'

const clicks = ref(0)
</script>

<template>
  <main class="wrap">
    <div class="card">
      <h1>It works.</h1>
      <p>
        This is an isolated page. It has its own HTML, its own bundle, and its own
        styles &mdash; nothing it does can affect any other page on this site.
      </p>
      <p class="muted">
        Ask Claude to build something and it&rsquo;ll show up at its own URL, listed
        on the (unlinked) index page.
      </p>
      <button @click="clicks++">clicked {{ clicks }} times</button>
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
:global(body) {
  margin: 0;
}
.wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: radial-gradient(circle at 30% 20%, #1a2238, #0b0d10 70%);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: #e7eaee;
}
.card {
  max-width: 480px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2.25rem;
  backdrop-filter: blur(8px);
}
h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
  letter-spacing: -0.03em;
}
p {
  line-height: 1.6;
  margin: 0 0 1rem;
}
.muted {
  color: #8b94a3;
  font-size: 0.925rem;
}
button {
  margin-top: 0.5rem;
  background: #5b9dff;
  color: #03070f;
  border: 0;
  border-radius: 9px;
  padding: 0.6rem 1.1rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
}
button:hover {
  background: #79b0ff;
}
</style>
