#!/usr/bin/env node
// sync-qa.mjs — publish website-QA runs from ~/.claude/QA into content/qa so the
// shell's QA area can render them. Cloudflare's build box can't see ~/.claude, so
// every run we want live must be committed here.
//
// Usage:
//   node scripts/sync-qa.mjs            # sync all projects, all runs (skip already-synced)
//   node scripts/sync-qa.mjs <project>  # one project only
//   node scripts/sync-qa.mjs --force    # re-sync (recompress) runs even if present
//
// Screenshots are recompressed with macOS `sips` (no extra dependency): JPEG q70,
// capped at 900px wide (only downscaled, never upscaled). Originals stay in
// ~/.claude/QA. Heavy artifacts/ (console/network logs) are intentionally skipped.

import { execFileSync } from 'node:child_process'
import {
  existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync, rmSync,
} from 'node:fs'
import { homedir } from 'node:os'
import { dirname, resolve, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC_ROOT = resolve(homedir(), '.claude', 'QA')
const DEST_ROOT = resolve(REPO, 'content', 'qa')

const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const projectFilter = args.find((a) => !a.startsWith('--')) || null

const JPEG_QUALITY = 70
const MAX_WIDTH = 900
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'])

const log = (...m) => console.log(...m)
const readJson = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')) } catch { return null } }
const isDir = (p) => { try { return statSync(p).isDirectory() } catch { return false } }
const listDirs = (p) => (isDir(p) ? readdirSync(p, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith('.')).map((e) => e.name) : [])
const listImages = (p) => (isDir(p) ? readdirSync(p).filter((n) => !n.startsWith('.') && IMG_EXT.has(extname(n).toLowerCase())) : [])

// --- image compression via sips (downscale-only, reformat to jpeg) -----------
function compressImage(src, destDir) {
  const out = resolve(destDir, basename(src).replace(/\.[^.]+$/, '') + '.jpeg')
  let width = 0
  try { width = parseInt(execFileSync('sips', ['-g', 'pixelWidth', src], { encoding: 'utf8' }).match(/pixelWidth:\s*(\d+)/)?.[1] || '0', 10) } catch { /* ignore */ }
  const flags = ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(JPEG_QUALITY)]
  if (width > MAX_WIDTH) flags.push('--resampleWidth', String(MAX_WIDTH))
  execFileSync('sips', [...flags, src, '--out', out], { stdio: 'ignore' })
  return basename(out)
}

// --- baseline diff classification (ported from the skill's diff logic) -------
function ackMatcher(acknowledged) {
  const entries = acknowledged?.entries || []
  return (sig, url, sliceKey) => entries.some((a) => {
    if (a.signature !== sig) return false
    if (a.scope === 'store') return true
    if (a.scope === 'url') return a.url === url
    if (a.scope === 'slice') return (a.slice_key || a.sliceKey) === sliceKey
    return false
  })
}

function classify(runState, baselineState, acknowledged) {
  const isAck = ackMatcher(acknowledged)
  const base = baselineState?.entries || {}
  const run = runState?.entries || {}
  const counts = { high: 0, medium: 0, low: 0, total: 0, regressions: 0, new: 0, fixed: 0, unchanged: 0, suppressed: 0 }
  const classifications = [] // { key, signature, class }
  const fixed = []           // findings gone since baseline

  for (const [key, entry] of Object.entries(run)) {
    const baseSlice = base[key]
    const baseSigs = new Set((baseSlice?.findings || []).map((f) => f.signature))
    for (const f of entry.findings || []) {
      if (isAck(f.signature, entry.url, key)) { counts.suppressed++; continue }
      let cls
      if (!baseSlice) cls = 'new'
      else if (baseSigs.has(f.signature)) cls = 'unchanged'
      else cls = 'regressed'
      counts[cls === 'regressed' ? 'regressions' : cls]++
      const sev = (f.severity || 'low').toLowerCase()
      if (sev in counts) counts[sev]++
      counts.total++
      classifications.push({ key, signature: f.signature, class: cls })
    }
  }
  // Fixed: baseline findings in a covered slice that are no longer present.
  for (const [key, baseSlice] of Object.entries(base)) {
    const runSlice = run[key]
    if (!runSlice) continue
    const runSigs = new Set((runSlice.findings || []).map((f) => f.signature))
    for (const f of baseSlice.findings || []) {
      if (isAck(f.signature, baseSlice.url, key)) continue
      if (!runSigs.has(f.signature)) {
        counts.fixed++
        fixed.push({ signature: f.signature, summary: f.summary, severity: f.severity, key, url: baseSlice.url, breakpoint: baseSlice.breakpoint })
      }
    }
  }
  return { counts, classifications, fixed, comparedToBaseline: Object.keys(base).length > 0 }
}

// --- light report.md parsing for environment / served-from lines -------------
function parseReportMeta(md) {
  const grab = (label) => md.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([^\\n]+)`, 'i'))?.[1]?.trim() || null
  return { environment: grab('Environment match'), servedFrom: grab('Served from') }
}

// --- per-run sync ------------------------------------------------------------
function syncRun(project, runId, srcRun, destRun) {
  const statePath = resolve(srcRun, 'state.json')
  const snagsPath = resolve(srcRun, 'snags.json')
  const reportPath = resolve(srcRun, 'report.md')
  const state = existsSync(statePath) ? readJson(statePath) : null
  const snags = existsSync(snagsPath) ? readJson(snagsPath) : null
  const report = existsSync(reportPath) ? readFileSync(reportPath, 'utf8') : ''
  const shots = listImages(resolve(srcRun, 'screenshots'))
  const refs = listImages(resolve(srcRun, 'doc-reference'))

  // Skip clearly-empty runs (nothing to show).
  const thinReport = report.trim().length < 200
  if (!state && !snags && thinReport && shots.length === 0) {
    log(`  · skip ${runId} (empty)`)
    return null
  }

  // Idempotent: leave already-synced runs alone unless --force.
  if (existsSync(destRun) && !FORCE) { log(`  · skip ${runId} (exists)`); return 'exists' }
  if (existsSync(destRun)) rmSync(destRun, { recursive: true, force: true })

  const destShots = resolve(destRun, 'screenshots')
  const destRefs = resolve(destRun, 'doc-reference')
  mkdirSync(destRun, { recursive: true })

  const outShots = []
  if (shots.length) {
    mkdirSync(destShots, { recursive: true })
    for (const s of shots) outShots.push(compressImage(resolve(srcRun, 'screenshots', s), destShots))
  }
  const outRefs = []
  if (refs.length) {
    mkdirSync(destRefs, { recursive: true })
    for (const r of refs) outRefs.push(compressImage(resolve(srcRun, 'doc-reference', r), destRefs))
  }

  // Copy text verbatim (skip heavy artifacts/).
  if (report) writeFileSync(resolve(destRun, 'report.md'), report)
  if (state) writeFileSync(resolve(destRun, 'state.json'), JSON.stringify(state, null, 2))
  if (snags) writeFileSync(resolve(destRun, 'snags.json'), JSON.stringify(snags, null, 2))

  // Map original screenshot names (referenced in state/snags) to compressed names,
  // so the viewer can resolve `evidence`/`before`/`after` after the .jpeg rewrite.
  const remap = {}
  for (const s of [...shots, ...refs]) remap[s] = s.replace(/\.[^.]+$/, '') + '.jpeg'

  const type = state ? 'audit' : snags ? 'snag' : 'markdown'
  const baseline = readJson(resolve(SRC_ROOT, project, 'baseline', 'state.json'))
  const acknowledged = readJson(resolve(SRC_ROOT, project, 'acknowledged.json'))

  const meta = {
    project,
    runId,
    date: runId.slice(0, 10),
    created: state?.created || snags?.created || null,
    purpose: state?.purpose || snags?.title || prettyPurpose(runId),
    type,
    scope: state?.scope || [],
    urls: state?.urls || [],
    locale: state?.locale || null,
    currency: state?.currency || null,
    ...parseReportMeta(report),
    screenshots: outShots.sort(),
    docReference: outRefs.sort(),
    shotRemap: remap,
    hasState: !!state,
    hasSnags: !!snags,
    hasReport: !!report,
    incomplete: thinReport && !state && !snags,
  }

  if (state) {
    const { counts, classifications, fixed, comparedToBaseline } = classify(state, baseline, acknowledged)
    meta.counts = counts
    meta.classifications = classifications
    meta.fixed = fixed
    meta.baseline = { compared: comparedToBaseline }
  }
  if (snags) {
    meta.snagCounts = snags.summary || summariseSnags(snags)
    meta.baseline = { compared: false }
  }

  writeFileSync(resolve(destRun, 'meta.json'), JSON.stringify(meta, null, 2))
  log(`  ✓ ${runId} [${type}] — ${outShots.length} shots${outRefs.length ? `, ${outRefs.length} refs` : ''}`)
  return meta
}

function summariseSnags(snags) {
  const c = { done: 0, not_done: 0, partial: 0, decision: 0, unverified: 0, total: 0 }
  for (const it of snags.items || []) { c.total++; if (it.status in c) c[it.status]++ }
  return c
}

function prettyPurpose(runId) {
  return runId.replace(/^\d{4}-\d{2}-\d{2}_\d{6}_/, '').replace(/-/g, ' ').trim() || runId
}

// --- project sync ------------------------------------------------------------
function syncProject(project) {
  const srcRuns = resolve(SRC_ROOT, project, 'runs')
  if (!isDir(srcRuns)) { log(`(${project}: no runs/)`); return null }
  log(`\n${project}`)
  const destProj = resolve(DEST_ROOT, project)
  const runIds = listDirs(srcRuns).sort()
  const synced = []
  for (const runId of runIds) {
    const meta = syncRun(project, runId, resolve(srcRuns, runId), resolve(destProj, 'runs', runId))
    if (meta && meta !== 'exists') synced.push(meta)
  }

  // Thin baseline marker for the viewer.
  const baseline = readJson(resolve(SRC_ROOT, project, 'baseline', 'state.json'))
  mkdirSync(destProj, { recursive: true })
  writeFileSync(resolve(destProj, 'baseline-meta.json'), JSON.stringify({
    hasBaseline: !!baseline,
    sliceCount: baseline ? Object.keys(baseline.entries || {}).length : 0,
    created: baseline?.created || null,
  }, null, 2))

  // Count all runs present on disk (synced this pass + previously synced).
  const allRuns = listDirs(resolve(destProj, 'runs'))
  return { name: project, runCount: allRuns.length, runs: allRuns.sort().reverse() }
}

// --- main --------------------------------------------------------------------
if (!isDir(SRC_ROOT)) { console.error(`No QA source at ${SRC_ROOT}`); process.exit(1) }
mkdirSync(DEST_ROOT, { recursive: true })

const projects = (projectFilter ? [projectFilter] : listDirs(SRC_ROOT)).filter((p) => p !== 'dump')
const indexProjects = []
for (const p of projects) {
  const r = syncProject(p)
  if (r && r.runCount) indexProjects.push({ name: r.name, runCount: r.runCount, latestRunId: r.runs[0], latestDate: r.runs[0]?.slice(0, 10) })
}
indexProjects.sort((a, b) => (b.latestRunId || '').localeCompare(a.latestRunId || ''))

writeFileSync(resolve(DEST_ROOT, 'index.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  projects: indexProjects,
}, null, 2))

log(`\nDone. ${indexProjects.length} project(s), ${indexProjects.reduce((n, p) => n + p.runCount, 0)} run(s) in content/qa.`)
