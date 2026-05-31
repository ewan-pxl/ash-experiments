<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { qa } from 'virtual:postclick-data'
import PtLogo from '../components/PtLogo.vue'
import RunReport from '../components/qa/RunReport.vue'

const projects = qa.projects || []

// Intra-area nav via hash (matches Wiki/Assets): '' = timeline, '#proj/runId' = run.
const sel = ref({ project: null, runId: null })
function readHash() {
  const h = decodeURIComponent((location.hash || '').replace(/^#/, ''))
  if (!h) { sel.value = { project: null, runId: null }; return }
  const slash = h.indexOf('/')
  sel.value = slash === -1
    ? { project: h, runId: null }
    : { project: h.slice(0, slash), runId: h.slice(slash + 1) }
}
onMounted(() => { readHash(); window.addEventListener('hashchange', readHash) })
onBeforeUnmount(() => window.removeEventListener('hashchange', readHash))

const activeRun = computed(() => {
  if (!sel.value.project || !sel.value.runId) return null
  const p = projects.find((x) => x.name === sel.value.project)
  return p ? { project: p.name, run: p.runs.find((rn) => rn.runId === sel.value.runId) || null } : null
})

const totalRuns = projects.reduce((n, p) => n + p.runs.length, 0)

function open(project, runId) { location.hash = `${project}/${runId}` }
function goProject(name) { location.hash = name }

// timeline row helpers
const sevDots = (run) => {
  const c = run.counts || {}
  return [
    { k: 'high', n: c.high || 0 },
    { k: 'medium', n: c.medium || 0 },
    { k: 'low', n: c.low || 0 },
  ]
}
const niceDate = (d) => {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m - 1]
  return `${+day} ${mon} ${y}`
}
</script>

<template>
  <div class="qa">
    <aside class="side">
      <a class="brand" href="/home"><PtLogo /></a>
      <p class="side-label">QA</p>
      <nav>
        <button
          v-for="p in projects"
          :key="p.name"
          :class="['proj-link', { active: sel.project === p.name }]"
          @click="goProject(p.name)"
        >
          {{ p.name }}
          <span class="count">{{ p.runs.length }}</span>
        </button>
      </nav>
    </aside>

    <main class="main">
      <!-- DETAIL -->
      <RunReport v-if="activeRun && activeRun.run" :key="sel.project + '/' + sel.runId" :run="activeRun.run" :project="activeRun.project" />

      <!-- TIMELINE -->
      <div v-else class="timeline">
        <header class="tl-head">
          <h1>QA</h1>
          <p class="lede">{{ totalRuns }} run{{ totalRuns === 1 ? '' : 's' }} across {{ projects.length }} project{{ projects.length === 1 ? '' : 's' }}. Each run is a website QA pass — findings, regressions and screenshots.</p>
        </header>

        <p v-if="!projects.length" class="empty">No QA runs published yet. Run <code>npm run sync-qa</code> to pull them in from <code>~/.claude/QA</code>.</p>

        <section v-for="p in projects" :key="p.name" class="proj" :class="{ dim: sel.project && sel.project !== p.name }">
          <h2 class="proj-title">{{ p.name }}</h2>
          <ul class="runs">
            <li v-for="run in p.runs" :key="run.runId">
              <button class="run-row" @click="open(p.name, run.runId)">
                <span class="r-date">{{ niceDate(run.date) }}</span>
                <span class="r-purpose">{{ run.purpose }}</span>
                <span class="r-type" :class="'type-' + run.type">{{ run.type }}</span>

                <span v-if="run.type === 'audit'" class="r-tallies">
                  <span v-for="d in sevDots(run)" :key="d.k" class="dot" :class="'sev-' + d.k" :title="d.k">{{ d.n }}</span>
                </span>
                <span v-else-if="run.type === 'snag'" class="r-tallies">
                  <span class="dot sev-low" title="total">{{ run.snagCounts?.total || 0 }} items</span>
                </span>
                <span v-else class="r-tallies">
                  <span class="dot sev-low">{{ (run.screenshots || []).length }} shots</span>
                </span>

                <span v-if="run.type === 'audit'" class="r-flag" :class="(run.counts?.regressions || 0) > 0 ? 'bad' : 'good'">
                  {{ (run.counts?.regressions || 0) > 0 ? '⚠ ' + run.counts.regressions : '✓' }}
                </span>
                <span v-else-if="run.type === 'snag'" class="r-flag" :class="(run.snagCounts?.not_done || 0) > 0 ? 'bad' : 'good'">
                  {{ (run.snagCounts?.not_done || 0) > 0 ? '⚠ ' + run.snagCounts.not_done : '✓' }}
                </span>
                <span v-else class="r-flag" />
              </button>
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.qa { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }
.side {
  position: sticky; top: 0; align-self: start; height: 100vh; overflow-y: auto;
  padding: 22px 18px; border-right: 1px solid var(--border); background: var(--panel);
}
.brand { display: block; margin-bottom: 16px; }
.brand :deep(svg) { height: 22px; width: auto; }
.side-label { margin: 0 0 14px; font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.proj-link {
  display: flex; align-items: center; justify-content: space-between; width: 100%;
  padding: 8px 10px; border: 0; border-radius: 8px; background: transparent; color: var(--body);
  font: inherit; font-size: 0.9rem; text-align: left; cursor: pointer;
}
.proj-link:hover { background: var(--panel-2); color: var(--ink); }
.proj-link.active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
.count { font-family: var(--mono); font-size: 0.66rem; color: var(--muted); }

.main { min-width: 0; }
.timeline { max-width: 880px; margin: 0 auto; padding: 36px 32px 80px; }
.tl-head h1 { font-family: var(--display); font-size: 1.9rem; margin: 0 0 8px; color: var(--ink); }
.lede { margin: 0 0 28px; color: var(--body); font-size: 0.92rem; max-width: 620px; line-height: 1.55; }
.empty { color: var(--muted); font-size: 0.88rem; }
.empty code { font-family: var(--mono); background: var(--panel-2); padding: 2px 6px; border-radius: 5px; font-size: 0.85em; }

.proj { margin-bottom: 30px; transition: opacity 0.15s; }
.proj.dim { opacity: 0.4; }
.proj-title { font-family: var(--display); font-size: 1.15rem; color: var(--ink); margin: 0 0 12px; }
.runs { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.run-row {
  display: grid; grid-template-columns: 96px 1fr auto auto auto; align-items: center; gap: 14px;
  width: 100%; padding: 13px 16px; cursor: pointer;
  background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius-sm);
  box-shadow: var(--shadow); font: inherit; text-align: left;
  transition: transform 0.12s, box-shadow 0.12s, border-color 0.12s;
}
.run-row:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); border-color: var(--border-strong); }
.r-date { font-family: var(--mono); font-size: 0.72rem; color: var(--muted); }
.r-purpose { font-size: 0.92rem; color: var(--ink); font-weight: 500; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.r-type { font-family: var(--mono); font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 7px; border-radius: 999px; background: var(--panel-2); color: var(--muted); }
.r-type.type-audit { background: var(--accent-soft); color: var(--accent); }
.r-type.type-snag { background: var(--yellow-soft); color: #9a7400; }
.r-tallies { display: flex; gap: 5px; }
.dot { font-family: var(--mono); font-size: 0.66rem; font-weight: 600; padding: 2px 7px; border-radius: 999px; background: var(--panel-2); color: var(--muted); }
.dot.sev-high { background: var(--bad-soft); color: var(--bad); }
.dot.sev-medium { background: var(--yellow-soft); color: #9a7400; }
.dot.sev-low { background: var(--panel-2); color: var(--muted); }
.r-flag { font-family: var(--mono); font-size: 0.74rem; font-weight: 600; min-width: 28px; text-align: right; }
.r-flag.bad { color: var(--bad); }
.r-flag.good { color: var(--good); }

@media (max-width: 720px) {
  .qa { grid-template-columns: 1fr; }
  .side { position: static; height: auto; }
  .run-row { grid-template-columns: 1fr auto; row-gap: 8px; }
  .r-date { grid-column: 1; }
  .r-purpose { grid-column: 1 / -1; white-space: normal; }
}
</style>
