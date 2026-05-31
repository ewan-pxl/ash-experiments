<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  images: { type: Array, required: true }, // [{ name, src }]
  start: { type: Number, default: 0 },
})
const emit = defineEmits(['close'])

const i = ref(props.start)
watch(() => props.start, (v) => { i.value = v })

const prev = () => { i.value = (i.value - 1 + props.images.length) % props.images.length }
const next = () => { i.value = (i.value + 1) % props.images.length }

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="lb" @click.self="emit('close')">
    <button class="lb-close" aria-label="Close" @click="emit('close')">✕</button>
    <button v-if="images.length > 1" class="lb-nav prev" aria-label="Previous" @click.stop="prev">‹</button>
    <figure class="lb-stage">
      <img :src="images[i].src" :alt="images[i].name" />
      <figcaption>{{ images[i].name }} <span class="lb-count">{{ i + 1 }} / {{ images.length }}</span></figcaption>
    </figure>
    <button v-if="images.length > 1" class="lb-nav next" aria-label="Next" @click.stop="next">›</button>
  </div>
</template>

<style scoped>
.lb {
  position: fixed; inset: 0; z-index: 2147483647;
  display: flex; align-items: center; justify-content: center;
  background: rgba(20, 6, 32, 0.88); backdrop-filter: blur(6px);
  padding: 40px 64px;
}
.lb-stage {
  margin: 0; max-width: 100%; max-height: 100%;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  overflow: auto;
}
.lb-stage img {
  max-width: min(900px, 100%); border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); background: #fff;
}
.lb-stage figcaption {
  font-family: var(--mono); font-size: 0.72rem; color: rgba(255, 255, 255, 0.7);
  text-align: center;
}
.lb-count { color: rgba(255, 255, 255, 0.45); margin-left: 8px; }
.lb-close {
  position: fixed; top: 18px; right: 22px;
  width: 40px; height: 40px; border-radius: 50%; border: 0; cursor: pointer;
  background: rgba(255, 255, 255, 0.12); color: #fff; font-size: 1rem;
}
.lb-close:hover { background: rgba(255, 255, 255, 0.22); }
.lb-nav {
  position: fixed; top: 50%; transform: translateY(-50%);
  width: 48px; height: 48px; border-radius: 50%; border: 0; cursor: pointer;
  background: rgba(255, 255, 255, 0.12); color: #fff; font-size: 1.6rem; line-height: 1;
}
.lb-nav:hover { background: rgba(255, 255, 255, 0.22); }
.lb-nav.prev { left: 18px; }
.lb-nav.next { right: 18px; }
</style>
