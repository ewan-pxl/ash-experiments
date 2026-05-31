<script setup>
import { computed } from 'vue'

const props = defineProps({
  finding: { type: Object, required: true }, // { severity, category, summary, detail, evidence, url, breakpoint }
  cls: { type: String, default: '' },        // regressed | new | unchanged | fixed
  thumb: { type: Object, default: null },    // { name, src } when evidence resolves to an image
})
const emit = defineEmits(['openShot'])

const sev = computed(() => (props.finding.severity || 'low').toLowerCase())
const where = computed(() => {
  const u = props.finding.url ? props.finding.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''
  const bp = props.finding.breakpoint && props.finding.breakpoint !== 'n/a' ? props.finding.breakpoint : ''
  return [u, bp].filter(Boolean).join(' · ')
})
</script>

<template>
  <article class="fc" :class="['sev-' + sev, cls ? 'cls-' + cls : '']">
    <div class="fc-main">
      <div class="fc-head">
        <span class="sev-badge" :class="'sev-' + sev">{{ sev }}</span>
        <span v-if="cls" class="cls-badge" :class="'cls-' + cls">{{ cls }}</span>
        <span v-if="finding.category" class="cat">{{ finding.category }}</span>
      </div>
      <h4 class="fc-title">{{ finding.summary }}</h4>
      <p v-if="where" class="fc-where">{{ where }}</p>
      <p v-if="finding.detail" class="fc-detail">{{ finding.detail }}</p>
      <span v-if="finding.evidence && !thumb" class="evidence">{{ finding.evidence }}</span>
    </div>
    <button v-if="thumb" class="fc-thumb" @click="emit('openShot', thumb)" :title="thumb.name">
      <img :src="thumb.src" :alt="thumb.name" loading="lazy" />
    </button>
  </article>
</template>

<style scoped>
.fc {
  display: flex; gap: 16px; align-items: flex-start;
  padding: 16px 18px; background: var(--panel);
  border: 1px solid var(--border); border-left: 3px solid var(--muted);
  border-radius: var(--radius-sm); box-shadow: var(--shadow);
}
.fc.sev-high { border-left-color: var(--bad); }
.fc.sev-medium { border-left-color: var(--yellow); }
.fc.sev-low { border-left-color: var(--muted); }
.fc-main { flex: 1; min-width: 0; }
.fc-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
.sev-badge, .cls-badge {
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 2px 7px; border-radius: 999px; font-weight: 600;
}
.sev-badge.sev-high { background: var(--bad-soft); color: var(--bad); }
.sev-badge.sev-medium { background: var(--yellow-soft); color: #9a7400; }
.sev-badge.sev-low { background: var(--panel-2); color: var(--muted); }
.cls-badge.cls-regressed { background: var(--bad-soft); color: var(--bad); }
.cls-badge.cls-new { background: var(--accent-soft); color: var(--accent); }
.cls-badge.cls-fixed { background: var(--good-soft); color: var(--good); }
.cls-badge.cls-unchanged { background: var(--panel-2); color: var(--muted); }
.cat { font-family: var(--mono); font-size: 0.62rem; color: var(--muted); }
.fc-title { margin: 0 0 5px; font-size: 0.96rem; font-weight: 600; color: var(--ink); line-height: 1.35; }
.fc-where { margin: 0 0 8px; font-family: var(--mono); font-size: 0.7rem; color: var(--accent); }
.fc-detail { margin: 0 0 8px; font-size: 0.83rem; color: var(--body); line-height: 1.5; }
.evidence {
  display: inline-block; font-family: var(--mono); font-size: 0.66rem; color: var(--muted);
  background: var(--panel-2); padding: 3px 8px; border-radius: 6px;
}
.fc-thumb {
  flex: 0 0 auto; width: 120px; height: 90px; padding: 0; cursor: pointer;
  border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--panel-2);
}
.fc-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.fc-thumb:hover { border-color: var(--accent); }
@media (max-width: 640px) {
  .fc { flex-direction: column; }
  .fc-thumb { width: 100%; height: 140px; }
}
</style>
