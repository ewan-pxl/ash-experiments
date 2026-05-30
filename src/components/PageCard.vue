<script setup>
import { pageHref, pagePath, folderCrumbs, projectHref, tagHue } from '../pages.js'

const props = defineProps({
  page: { type: Object, required: true },
  showFolder: { type: Boolean, default: true },
  showProject: { type: Boolean, default: true },
})
const emit = defineEmits(['openFolder', 'openProject', 'openTag'])

// Plain left-clicks navigate in-app; modified clicks open a new tab normally.
function modified(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0
}
function navFolder(e, folder) {
  if (modified(e)) return
  e.preventDefault()
  emit('openFolder', folder)
}
function navProject(e) {
  if (modified(e)) return
  e.preventDefault()
  emit('openProject', props.page.project)
}
</script>

<template>
  <li class="card">
    <p v-if="showFolder && page.folder" class="crumb">
      <span v-for="(c, i) in folderCrumbs(page.kind, page.folder)" :key="c.href">
        <a :href="c.href" @click="navFolder($event, c.folder)">{{ c.label }}</a
        ><span v-if="i < page.folder.split('/').length - 1" class="sep"> / </span>
      </span>
    </p>
    <div class="card-top">
      <a :href="pageHref(page)" class="name name-link">{{ page.name }}</a>
      <span class="id">#{{ String(page.id).padStart(3, '0') }}</span>
    </div>
    <p class="desc">{{ page.description }}</p>
    <p v-if="page.tags.length" class="card-tags">
      <button
        v-for="t in page.tags"
        :key="t"
        type="button"
        class="tag"
        :style="{ '--tag-h': tagHue(t) }"
        @click="emit('openTag', t)"
      >
        {{ t }}
      </button>
    </p>
    <div class="card-bottom">
      <code class="slug">{{ pagePath(page) }}</code>
      <span class="card-meta">
        <a
          v-if="showProject && page.project"
          :href="projectHref(page.kind, page.project)"
          class="project-badge"
          @click="navProject"
          >{{ page.project }}</a
        >
        <span v-if="page.created" class="date">{{ page.created }}</span>
      </span>
    </div>
  </li>
</template>
