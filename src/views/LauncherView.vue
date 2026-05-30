<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { pagesOf } from '../pages.js'
import { wiki, branding } from 'virtual:postclick-data'
import PtLogo from '../components/PtLogo.vue'
// The Claude "burst" mark on its terracotta tile, inlined so it bundles with the shell.
// Used on the cheat-sheet button and modal header so it instantly reads as a Claude thing.
import claudeMark from '../claude-mark.svg?raw'

// Live counts per area.
const experiments = pagesOf('experiment').length
const agency = pagesOf('agency').length
const docs = wiki.docs.length
const brands = branding.brands.length
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

// Two work areas (where work happens), then two reference areas (what you pull from).
const cards = [
  {
    key: 'experiments',
    title: 'Experiments',
    href: '/home/experiments',
    icon: 'science',
    desc: 'In the business. The delivery workbench: ideate concepts against a brand, hand designers something real.',
    meta: plural(experiments, 'page', 'pages'),
  },
  {
    key: 'agency',
    title: 'Agency',
    href: '/home/agency',
    icon: 'corporate_fare',
    desc: 'On the business: proposals, reporting, internal decks and marketing material.',
    meta: plural(agency, 'page', 'pages'),
  },
  {
    key: 'wiki',
    title: 'Wiki',
    href: '/home/wiki',
    icon: 'menu_book',
    desc: 'The Post-Click knowledge base: positioning, methodology, delivery, sales.',
    meta: wiki.present ? plural(docs, 'doc', 'docs') : 'source not found',
  },
  {
    key: 'assets',
    title: 'Assets',
    href: '/home/assets',
    icon: 'palette',
    desc: 'The asset library: logos, colours, type, fonts and imagery, per brand.',
    meta: branding.present ? plural(brands, 'brand', 'brands') : 'source not found',
  },
]

// ---- Claude Code cheat sheet (mirrors the Notion doc) ----------------------
// Each tab is a section the user clicks through inside the modal. Rows are
// [key/command, what it does] pairs; the first cell renders in the mono font.
const cheatTabs = [
  {
    key: 'start',
    label: 'Start here',
    intro: 'The three you will use every single day. When in doubt, type /help. It always shows what is available right now.',
    rows: [
      ['Esc', 'Stop Claude when it is heading the wrong way. It keeps the work done so far, so you can type a correction like "actually, do X instead." Your most-used key.'],
      ['/clear', 'Wipe the current conversation and start fresh.'],
      ['/exit', 'Close Claude Code.'],
      ['@file', 'Point Claude at a specific file or folder (e.g. @notes.txt).'],
      ['/btw', 'Drop a side note or quick question without interrupting the main task.'],
    ],
  },
  {
    key: 'keys',
    label: 'Keyboard',
    intro: 'Shortcuts you press inside a session. The ones you reach for most are at the top.',
    rows: [
      ['Esc', 'Stop Claude mid-task without quitting.'],
      ['Esc Esc', 'Rewind / edit one of your earlier messages and go back to that point.'],
      ['Ctrl + C', 'Clear the text you have typed. Press twice to quit Claude Code.'],
      ['Ctrl + D', 'Quit Claude Code (exit the session).'],
      ['Ctrl + L', 'Clear the screen (tidies the view; does not erase the conversation).'],
      ['Up / Down', 'Scroll back through your previous messages.'],
      ['Shift + Tab', 'Switch permission modes (normal → auto-accept → plan).'],
      ['Tab', 'Autocomplete a file name or command.'],
      ['Ctrl + R', 'Search back through your command history.'],
      ['Esc then Enter', 'Add a new line without sending (also Shift+Enter, or Option+Enter on Mac).'],
      ['Ctrl + V', 'Paste an image from your clipboard into the chat.'],
      ['Ctrl + O', 'Show / hide Claude’s thinking and the tool steps it is running.'],
      ['Option + T', 'Toggle extended thinking on or off for the session (Alt+T on Windows).'],
    ],
  },
  {
    key: 'starters',
    label: 'Line starters',
    intro: 'Type one of these at the start of a line to change what happens before you even hit Return.',
    rows: [
      ['/', 'Opens the slash command menu.'],
      ['@', 'Mention a file or folder so Claude looks at it (e.g. @notes.txt).'],
      ['#', 'Save something to memory. Adds a note to the project’s CLAUDE.md.'],
      ['!', 'Run a normal terminal command yourself and drop its result into the chat (e.g. !ls).'],
    ],
  },
  {
    key: 'slash',
    label: 'Slash commands',
    intro: 'Type these inside Claude Code. /help always shows the full list for your version.',
    rows: [
      ['/help', 'Show the full list of commands for your version.'],
      ['/clear', 'Wipe the conversation and start fresh.'],
      ['/compact', 'Summarise the conversation so far to free up space (keeps the gist).'],
      ['/model', 'Switch which Claude model you are using.'],
      ['/config', 'Open settings (theme, model, and more).'],
      ['/fast', 'Faster responses on Opus. Toggle off when you want it more careful.'],
      ['/effort', 'Set how hard Claude reasons for the session (low → max).'],
      ['/btw', 'Drop a quick side note without interrupting the main task.'],
      ['/rewind', 'Open the checkpoint menu to roll back (same as Esc Esc).'],
      ['/cost', 'See how many tokens you have used and the cost.'],
      ['/status', 'Show current session info (account, model, directory).'],
      ['/memory', 'Open and edit the memory files Claude keeps.'],
      ['/init', 'Create a CLAUDE.md that documents the current project.'],
      ['/mcp', 'Manage connected tools (Notion, Slack, Google Drive, etc.).'],
      ['/permissions', 'View and change what Claude can do without asking.'],
      ['/agents', 'Manage sub-agents.'],
      ['/resume', 'Reopen and continue an earlier conversation.'],
      ['/doctor', 'Run a health check if something seems broken.'],
    ],
  },
  {
    key: 'modes',
    label: 'Permission modes',
    intro: 'Claude normally asks before it edits or runs commands. How often it asks depends on the mode. Tap Shift+Tab to cycle; the current mode shows at the bottom of the screen.',
    rows: [
      ['Normal', 'Asks before every edit, command, or web request. The safe default.'],
      ['Auto-accept edits', 'Applies file edits automatically; still pauses for riskier commands. The "auto mode" most people mean.'],
      ['Plan mode', 'Reads and thinks but will not touch your files. It hands you a plan first.'],
      ['Auto (full)', 'Approves almost everything automatically, with guardrails. Only if your account and model support it.'],
      ['Bypass all', 'Skips every prompt. Throwaway or sandboxed setups only. Start with claude --dangerously-skip-permissions.'],
    ],
  },
  {
    key: 'think',
    label: 'Steering & thinking',
    intro: 'Two things: nudging Claude while it works, and telling it how hard to think.',
    rows: [
      ['Esc', 'Stop it, then redirect. Keeps the work done so you can correct it mid-task.'],
      ['/btw <note>', 'Add a side note or question without stopping the main task.'],
      ['Esc Esc', 'Rewind to an earlier point if it has gone too far.'],
      ['ultrathink', 'Type it in your message to make Claude reason more deeply on that one task.'],
      ['/effort', 'Set the reasoning depth for the whole session (low → max).'],
      ['/fast', 'Faster, lighter responses on Opus. Flip off when you want thoroughness.'],
    ],
  },
  {
    key: 'launch',
    label: 'Starting up',
    intro: 'Typed in your terminal, not inside Claude.',
    rows: [
      ['claude', 'Start a new Claude Code session.'],
      ['claude --resume', 'Start and pick a past conversation to continue.'],
      ['claude --help', 'List all startup options.'],
      ['claude --version', 'Show which version you have installed.'],
    ],
  },
]

const sheetOpen = ref(false)
const activeTab = ref('start')
function openSheet() {
  sheetOpen.value = true
  activeTab.value = 'start'
}
function closeSheet() {
  sheetOpen.value = false
}
function onKey(e) {
  if (e.key === 'Escape') closeSheet()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

// Render a key cell into chips with the real Mac glyphs, so nobody has to guess
// whether a modifier is Command, Control, Shift, etc. Commands (/foo, @file, claude…)
// and mode labels stay as a single plain chip.
const KEY_GLYPH = {
  Ctrl: '⌃ Ctrl',
  Cmd: '⌘ Cmd',
  Command: '⌘ Cmd',
  Shift: '⇧ Shift',
  Tab: '⇥ Tab',
  Option: '⌥ Option',
  Alt: '⌥ Alt',
  Esc: '⎋ Esc',
  Enter: '↩ Enter',
  Up: '↑ Up',
  Down: '↓ Down',
}
const isSep = (t) => t === '+' || t === '/' || t === 'then'
function renderKey(s) {
  if (/^[/@#!]/.test(s) || /^claude\b/.test(s)) return [{ t: 'chip', v: s }]
  const tokens = s.split(/\s+/)
  const keyish = tokens.every((t) => isSep(t) || t in KEY_GLYPH || t.length <= 2)
  if (!keyish) return [{ t: 'chip', v: s }]
  return tokens.map((t) =>
    isSep(t) ? { t: 'sep', v: t } : { t: 'key', v: KEY_GLYPH[t] || t },
  )
}
</script>

<template>
  <main class="launch">
    <header class="launch-head">
      <PtLogo class="launch-logo" />
      <h1>Post-Click <span class="os">OS</span></h1>
      <p class="tagline">The Post-Click team's internal home for experiments, agency work, the wiki, and assets, all in one place.</p>
    </header>

    <ul class="launch-grid">
      <li v-for="c in cards" :key="c.key">
        <a :href="c.href" class="launch-card" :class="c.key">
          <span class="material-symbols-outlined launch-icon" aria-hidden="true">{{ c.icon }}</span>
          <span class="launch-title">{{ c.title }}</span>
          <span class="launch-desc">{{ c.desc }}</span>
          <span class="launch-meta">{{ c.meta }}</span>
        </a>
      </li>
    </ul>

    <!-- Johnson box: compact footer banner. New starters open the cheat sheet here. -->
    <section class="jbox">
      <span class="claude-mark jbox-mark" aria-hidden="true" v-html="claudeMark"></span>
      <p class="jbox-text">
        <strong>New here?</strong> The cheat sheet covers every key and command you need to drive this.
      </p>
      <button type="button" class="jbox-btn" @click="openSheet">Open The Cheat Sheet</button>
    </section>

    <!-- Cheat-sheet modal: tabs down the side, click through each section -->
    <Teleport to="body">
      <div v-if="sheetOpen" class="sheet-backdrop" @click.self="closeSheet">
        <div class="sheet" role="dialog" aria-modal="true" aria-label="Claude Code cheat sheet">
          <header class="sheet-head">
            <div class="sheet-head-main">
              <span class="claude-mark sheet-mark" aria-hidden="true" v-html="claudeMark"></span>
              <div>
                <p class="sheet-eyebrow">Cheat sheet</p>
                <h2 class="sheet-title">Driving Claude Code</h2>
              </div>
            </div>
            <button type="button" class="sheet-close" aria-label="Close" @click="closeSheet">
              <span class="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
          </header>

          <div class="sheet-body">
            <nav class="sheet-tabs">
              <button
                v-for="t in cheatTabs"
                :key="t.key"
                type="button"
                class="sheet-tab"
                :class="{ active: t.key === activeTab }"
                @click="activeTab = t.key"
              >
                {{ t.label }}
              </button>
            </nav>

            <div class="sheet-panel">
              <template v-for="t in cheatTabs" :key="t.key">
                <div v-if="t.key === activeTab">
                  <p class="sheet-intro">{{ t.intro }}</p>
                  <dl class="sheet-rows">
                    <div v-for="(row, i) in t.rows" :key="i" class="sheet-row">
                      <dt>
                        <span class="keys">
                          <template v-for="(p, j) in renderKey(row[0])" :key="j">
                            <kbd v-if="p.t === 'key'" class="kbd">{{ p.v }}</kbd>
                            <code v-else-if="p.t === 'chip'" class="cmd">{{ p.v }}</code>
                            <span v-else class="key-sep">{{ p.v }}</span>
                          </template>
                        </span>
                      </dt>
                      <dd>{{ row[1] }}</dd>
                    </div>
                  </dl>
                </div>
              </template>
            </div>
          </div>

          <footer class="sheet-foot">
            Different in your version? Type <code>/help</code> inside Claude Code for the live list.
          </footer>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
.launch {
  /* Dark-surface token overrides, scoped to the home launcher. The cards and text below
     read these variables, so re-tinting them here flips the whole launcher to the purple
     theme without affecting any inner page. */
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.26);
  --ink: #ffffff;
  --body: rgba(207, 174, 237, 0.84);
  --muted: rgba(207, 174, 237, 0.62);
  --accent: #cfaeed;
  --accent-soft: rgba(146, 36, 233, 0.32);
  --good: #84d6a3;
  --good-soft: rgba(132, 214, 163, 0.16);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.25), 0 18px 40px -24px rgba(0, 0, 0, 0.6);
  --shadow-hover: 0 2px 8px rgba(0, 0, 0, 0.32), 0 26px 60px -28px rgba(0, 0, 0, 0.72);

  min-height: 100vh;
  max-width: 960px;
  margin: 0 auto;
  padding: 6rem 1.25rem 6rem;
}
.launch-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
}
.launch-logo {
  height: 1.85rem;
  margin-bottom: 1.6rem;
  color: var(--ink);
}
.launch-head h1 {
  margin: 0 0 0.9rem;
  font-family: var(--display);
  font-size: clamp(2.8rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.035em;
  color: var(--ink);
}
.launch-head h1 .os {
  color: var(--yellow);
}
.tagline {
  margin: 0;
  color: var(--body);
  font-size: 1.1rem;
  line-height: 1.55;
  max-width: 40rem;
}
.launch-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.1rem;
}
.launch-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  padding: 1.7rem 1.6rem 1.5rem;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}
.launch-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}
/* pastel icon-chip (rounded square), one tint per area, per the reference */
.launch-icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 14px;
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
}
.launch-card.experiments .launch-icon {
  background: var(--accent-soft);
  color: var(--accent);
}
.launch-card.agency .launch-icon {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ink);
}
.launch-card.wiki .launch-icon {
  background: var(--good-soft);
  color: var(--good);
}
.launch-card.assets .launch-icon {
  background: rgba(254, 194, 0, 0.18);
  color: var(--yellow);
}
.launch-title {
  font-family: var(--display);
  font-size: 1.3rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.launch-desc {
  color: var(--body);
  font-size: 0.92rem;
  line-height: 1.5;
  flex: 1;
}
.launch-meta {
  margin-top: 0.7rem;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}

/* ---- Johnson box (grounding overview + cheat-sheet button) ---- */
.jbox {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(254, 194, 0, 0.4);
  background: linear-gradient(180deg, rgba(254, 194, 0, 0.1), rgba(254, 194, 0, 0.03));
  box-shadow: var(--shadow);
}
.jbox-mark {
  display: inline-flex;
  flex-shrink: 0;
}
.jbox-mark :deep(svg) {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 6px;
}
.jbox-text {
  margin: 0;
  flex: 1;
  min-width: 12rem;
  color: var(--body);
  font-size: 0.88rem;
  line-height: 1.5;
}
.jbox-text strong {
  color: var(--ink);
  font-weight: 650;
}
.jbox-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  appearance: none;
  border: 0;
  cursor: pointer;
  padding: 0.85rem 1.3rem;
  border-radius: var(--radius-sm);
  background: var(--yellow);
  color: #2c0f44;
  font-family: var(--mono);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: 0 10px 26px -12px rgba(254, 194, 0, 0.7);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}
.jbox-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 14px 32px -12px rgba(254, 194, 0, 0.8);
}
/* The Claude tile: small rounded mark that keeps its own terracotta + white. */
.claude-mark {
  display: inline-flex;
  flex-shrink: 0;
}
.claude-mark :deep(svg) {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 6px;
}
.sheet-head-main {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.sheet-mark :deep(svg) {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 9px;
}

/* ---- Cheat-sheet modal (teleported to body, so it carries its own dark palette) ---- */
.sheet-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(11, 5, 20, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: sheet-fade 0.15s ease;
}
.sheet {
  display: flex;
  flex-direction: column;
  width: min(100%, 880px);
  max-height: min(88vh, 760px);
  border-radius: 18px;
  border: 1px solid rgba(207, 174, 237, 0.18);
  background: #1c0b30;
  background-image: radial-gradient(120% 120% at 85% 0%, rgba(146, 36, 233, 0.22), transparent 55%);
  box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.8);
  color: #fff;
  overflow: hidden;
  animation: sheet-rise 0.18s ease;
}
.sheet-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem 1.6rem 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.sheet-eyebrow {
  margin: 0 0 0.25rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--yellow);
}
.sheet-title {
  margin: 0;
  font-family: var(--display);
  font-size: 1.45rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: #fff;
}
.sheet-close {
  display: grid;
  place-items: center;
  width: 2.2rem;
  height: 2.2rem;
  flex-shrink: 0;
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(207, 174, 237, 0.85);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.sheet-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.sheet-body {
  display: grid;
  grid-template-columns: 168px 1fr;
  min-height: 0;
  flex: 1;
}
.sheet-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 1rem 0.7rem;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  overflow-y: auto;
}
.sheet-tab {
  appearance: none;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: rgba(207, 174, 237, 0.72);
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  transition: background 0.15s ease, color 0.15s ease;
}
.sheet-tab:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}
.sheet-tab.active {
  color: #2c0f44;
  background: var(--yellow);
  font-weight: 650;
}
.sheet-panel {
  padding: 1.3rem 1.6rem 1.6rem;
  overflow-y: auto;
}
.sheet-intro {
  margin: 0 0 1.1rem;
  color: rgba(207, 174, 237, 0.84);
  font-size: 0.9rem;
  line-height: 1.55;
}
.sheet-rows {
  margin: 0;
  display: flex;
  flex-direction: column;
}
.sheet-row {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 1rem;
  padding: 0.7rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.sheet-row:first-child {
  border-top: 0;
}
.sheet-row dt {
  margin: 0;
}
.keys {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
}
/* A physical key cap (modifiers shown with their real Mac glyph). */
.kbd {
  display: inline-flex;
  align-items: center;
  font-family: var(--mono);
  font-size: 0.76rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 0.16rem 0.42rem;
  white-space: nowrap;
}
/* A typed command / mode label (not a keypress). */
.cmd {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--yellow);
  background: rgba(254, 194, 0, 0.1);
  border: 1px solid rgba(254, 194, 0, 0.22);
  border-radius: 7px;
  padding: 0.18rem 0.5rem;
  white-space: nowrap;
}
.key-sep {
  color: rgba(207, 174, 237, 0.5);
  font-size: 0.75rem;
}
.sheet-row dd {
  margin: 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.9rem;
  line-height: 1.5;
}
.sheet-foot {
  padding: 0.95rem 1.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(207, 174, 237, 0.66);
  font-size: 0.8rem;
}
.sheet-foot code {
  font-family: var(--mono);
  color: var(--yellow);
}
@keyframes sheet-fade {
  from {
    opacity: 0;
  }
}
@keyframes sheet-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}
@media (max-width: 620px) {
  .sheet-body {
    grid-template-columns: 1fr;
  }
  .sheet-tabs {
    flex-direction: row;
    flex-wrap: wrap;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .sheet-row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
