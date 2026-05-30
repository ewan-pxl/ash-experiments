<script setup>
import { onMounted, onUnmounted } from 'vue'
import ptLogo from '@projects/PXL decks/logo.svg?raw'
import '@projects/PXL decks/brand.css'

let onKeydown = null

onMounted(() => {
  const slides = [...document.querySelectorAll('.slide')]
  const current = () => {
    const mid = window.scrollY + window.innerHeight / 2
    let best = 0,
      bd = Infinity
    slides.forEach((s, i) => {
      const c = s.offsetTop + s.offsetHeight / 2
      const d = Math.abs(c - mid)
      if (d < bd) {
        bd = d
        best = i
      }
    })
    return best
  }
  onKeydown = (e) => {
    if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault()
      const n = Math.min(current() + 1, slides.length - 1)
      slides[n].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
      e.preventDefault()
      const n = Math.max(current() - 1, 0)
      slides[n].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (onKeydown) removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <!-- Pixel Theory logo sprite (shared from the project) -->
  <div aria-hidden="true" v-html="ptLogo"></div>

  <!-- ================= SLIDE 1 — COVER ================= -->
  <section class="slide is-dark">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 01 / 08</div>
    </div>

    <div class="body">
      <h1>Green Garden<br /><span class="accent">Statement of Work.</span></h1>
      <p class="lede" style="margin-top: 2cqw; max-width: 52cqw">A working SOW for your review before we put a signable version in place. Scope, timeline and numbers are below. Flag anything you want adjusted.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>New Business</span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 2 — THE SETUP ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 02 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>The setup.</h2>
        <p class="lede">This isn't a retainer. We come in as a SWAT team, hit clear deliverables across a defined window, and leave you with assets that compound. Everything is built for Ferry Morse (US) first, then extrapolated to McKenzie Seeds (Canada).</p>
      </div>

      <div class="cards c3">
        <div class="card">
          <div class="clabel">Onboarding sprint</div>
          <div class="stat">6 wks</div>
          <div class="divider"></div>
          <div class="csub">Research and UI kits in place for both brands before any build starts.</div>
        </div>
        <div class="card">
          <div class="clabel">Execution window</div>
          <div class="stat">3 mo</div>
          <div class="divider"></div>
          <div class="csub">Navigation, landing pages and the quiz funnel, shipped for Ferry Morse.</div>
        </div>
        <div class="card feature">
          <span class="pill"><span class="dot"></span>End to end</span>
          <div class="clabel">Total engagement</div>
          <div class="stat">~4.5 mo</div>
          <div class="divider"></div>
          <div class="csub">Onboarding plus execution, from kickoff to the McKenzie carbon copy.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 3 — WHAT YOU GET ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 03 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What you get.</h2>
        <p class="lede">Four deliverables across the engagement, each built to be reused and scaled by your team without dev support.</p>
      </div>

      <div class="cards c4">
        <div class="card num-card">
          <div class="top"><span class="badge">01</span></div>
          <div class="ct">Nav + cart<br />overhaul</div>
          <div class="csub">Guided paths for undecided shoppers, and a cart re-engineered to lift average order value (AOV).</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge y">02</span></div>
          <div class="ct">Three<br />landing pages</div>
          <div class="csub">A video sales letter, a long-form sales letter, and a product page template, each also a reusable meta object.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge">03</span></div>
          <div class="ct">15–20 modular<br />blocks</div>
          <div class="csub">Section blocks across the pages, recombined sitewide so you're never locked to one layout.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge y">04</span></div>
          <div class="ct">Quiz funnel<br />+ lead magnet</div>
          <div class="csub">Built on the Hume quiz model, paired with a refreshed lead magnet.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 4 — WHAT WE'RE NOT DOING ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 04 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we're not doing.</h2>
        <p class="lede">Two things deliberately out of scope, so the boundaries are clear from day one.</p>
      </div>

      <div class="cards c3">
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Asset generation</div>
          <div class="csub">We brief your illustrators and graphic designers. The visual production lands on your side, not ours.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">McKenzie before Ferry Morse</div>
          <div class="csub">No McKenzie Seeds build until Ferry Morse is shipped. Canada gets the carbon copy after.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 5 — TIMELINE ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 05 / 08</div>
    </div>

    <div class="body top">
      <div class="head-split">
        <h2>The timeline.</h2>
        <p class="lede">Two phases across roughly four and a half months, Ferry Morse first and McKenzie ported after.</p>
      </div>

      <div class="rows">
        <div class="row">
          <div class="rn">01</div>
          <div><div class="rt">Onboarding · 6 weeks</div><div class="rd">Customer surveys, on-site analysis and message mining. UI kits built for both brands, which is why this runs six weeks instead of our standard four.</div></div>
        </div>
        <div class="row">
          <div class="rn">02</div>
          <div><div class="rt">Execution · 3 months</div><div class="rd">Navigation and cart, three landing pages with their meta object versions, and the quiz funnel with its lead magnet. All for Ferry Morse, then ported to McKenzie Seeds.</div></div>
        </div>
        <div class="row">
          <div class="rn">03</div>
          <div><div class="rt">End to end · ~4.5 months</div><div class="rd">From kickoff to the McKenzie carbon copy, you keep every asset built along the way.</div></div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 6 — INVESTMENT ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 06 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>The investment.</h2>
        <p class="lede">A flat monthly rate across the engagement window. No retainer tail, no surprises.</p>
      </div>

      <div class="cards c3">
        <div class="card">
          <div class="clabel">Both brands covered</div>
          <div class="stat">2</div>
          <div class="divider"></div>
          <div class="csub">Ferry Morse and McKenzie Seeds, one engagement, one rate.</div>
        </div>
        <div class="card">
          <div class="clabel">Billing window</div>
          <div class="stat">4 mo</div>
          <div class="divider"></div>
          <div class="csub">The window the flat rate applies across.</div>
        </div>
        <div class="card feature">
          <span class="pill"><span class="dot"></span>Monthly</span>
          <div class="clabel">Flat monthly rate</div>
          <div class="stat">$8,000</div>
          <div class="divider"></div>
          <div class="csub">Covers the whole team and every deliverable, billed monthly.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 7 — WHO'S IN THE ROOM ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 07 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>Who's in the room.</h2>
        <p class="lede">A senior team, lean by design. Everyone here is hands-on across the engagement.</p>
      </div>

      <div class="cards c4">
        <div class="card note">
          <div class="ct">Ash</div>
          <div class="csub">Post-Click Director. Owns the engagement.</div>
        </div>
        <div class="card note">
          <div class="ct">Lucas</div>
          <div class="csub">Strategy.</div>
        </div>
        <div class="card note">
          <div class="ct">Ewan</div>
          <div class="csub">Technical and development.</div>
        </div>
        <div class="card note">
          <div class="ct">CRO design lead</div>
          <div class="csub">Supporting execution across both brands.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>Green Garden · SOW</span></div>
  </section>

  <!-- ================= SLIDE 8 — WHAT WE NEED / NEXT STEPS ================= -->
  <section class="slide is-dark">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 08 / 08</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we'd need<br />from you.</h2>
        <p class="lede">A few inputs from your side to keep onboarding on schedule.</p>
      </div>

      <div class="asks">
        <div class="ask"><div class="an">1</div><div class="ad">A point of contact for research access.</div></div>
        <div class="ask"><div class="an">2</div><div class="ad">Brand assets for Ferry Morse and McKenzie Seeds: logos, fonts, UI patterns, any existing style guide.</div></div>
        <div class="ask"><div class="an">3</div><div class="ad">Access to your designer and illustrator for asset briefs.</div></div>
        <div class="ask"><div class="an">4</div><div class="ad">A bi-weekly 30-minute check-in slot during execution.</div></div>
      </div>

      <p class="close-line">Next: you review this and flag anything to adjust, we turn it into a signable SOW, and onboarding kicks off.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>Next steps</span><span>Green Garden · SOW</span></div>
  </section>
</template>

<style>
/* Brand tokens (palette + fonts) come from @projects/PXL decks/brand.css */

* {
  box-sizing: border-box;
}
html {
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
}
body {
  margin: 0;
  background: #160823;
  font-family: var(--body);
  padding: 28px 20px 60px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* ---------- slide shell ---------- */
.slide {
  position: relative;
  width: min(100%, 1180px);
  margin: 0 auto 22px;
  aspect-ratio: 16/9;
  container-type: size;
  overflow: hidden;
  border-radius: 14px;
  box-shadow: 0 36px 90px -46px rgba(0, 0, 0, 0.75);
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  padding: 4.7cqw 4.9cqw 4cqw;
}

.is-light {
  background-color: var(--cream);
  color: var(--ink);
}
.is-dark {
  color: #fff;
  background-color: #2c0f44;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.06) 1px, transparent 0),
    radial-gradient(88% 72% at 74% 14%, rgba(208, 121, 66, 0.5), rgba(158, 68, 84, 0.16) 41%, transparent 65%),
    radial-gradient(135% 125% at 20% 104%, var(--ink-2) 0%, var(--ink) 52%);
  background-size: 24px 24px, 100% 100%, 100% 100%;
}

/* ---------- header / footer rails ---------- */
.rail {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2cqw;
}
.logo-svg {
  height: 2.55cqw;
  width: 15cqw;
  display: block;
}
.is-dark .logo-svg {
  color: #fff;
}
.is-light .logo-svg {
  color: var(--ink);
}

.meta {
  font-family: var(--mono);
  font-size: 1.02cqw;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.is-dark .meta {
  color: var(--mut-d);
}
.is-light .meta {
  color: var(--mut-l);
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2cqw;
  font-family: var(--mono);
  font-size: 0.86cqw;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.is-dark .foot {
  color: rgba(207, 174, 237, 0.5);
}
.is-light .foot {
  color: rgba(44, 15, 68, 0.4);
}
.foot span:nth-child(2) {
  flex: 1;
  text-align: center;
}
.foot span:last-child {
  text-align: right;
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}
.body.top {
  justify-content: flex-start;
}

/* ---------- type ---------- */
.eyebrow {
  font-family: var(--mono);
  font-size: 1.04cqw;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.eyebrow .y {
  color: var(--yellow);
}
.eyebrow .l {
  color: var(--lilac);
}
.is-light .eyebrow {
  color: var(--mut-l);
}

h1,
h2 {
  font-family: var(--display);
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.01em;
}
h1 {
  font-size: 7.4cqw;
  line-height: 0.95;
}
h2 {
  font-size: 5.55cqw;
  line-height: 0.99;
}
.accent {
  color: var(--yellow);
}

.lede {
  font-size: 1.55cqw;
  line-height: 1.5;
  font-weight: 400;
  max-width: 42cqw;
}
.is-light .lede {
  color: var(--body-l);
}
.is-dark .lede {
  color: var(--mut-d);
}

/* split header used on content slides */
.head-split {
  display: grid;
  grid-template-columns: 1.04fr 0.96fr;
  gap: 3cqw;
  align-items: center;
}
.head-split .lede {
  max-width: none;
  padding-bottom: 0.4cqw;
}

/* ---------- cards ---------- */
.cards {
  display: grid;
  gap: 1.5cqw;
  margin-top: 3.2cqw;
}
.c3 {
  grid-template-columns: repeat(3, 1fr);
}
.c4 {
  grid-template-columns: repeat(4, 1fr);
}

.card {
  background: var(--card);
  border-radius: 1.5cqw;
  padding: 1.95cqw 1.8cqw;
  border: 1px solid var(--line-l);
  box-shadow: 0 1px 0 rgba(44, 15, 68, 0.03), 0 20px 42px -30px rgba(44, 15, 68, 0.35);
  display: flex;
  flex-direction: column;
}
.card.feature {
  background: var(--ink);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 30px 60px -28px rgba(44, 15, 68, 0.6);
}

.clabel {
  font-family: var(--mono);
  font-size: 0.92cqw;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--mut-l);
  line-height: 1.35;
}
.feature .clabel {
  color: var(--yellow);
}

.stat {
  font-family: var(--display);
  font-weight: 600;
  font-size: 5.2cqw;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0.2cqw 0 1.2cqw;
}
.feature .stat {
  color: var(--yellow);
}
.csub {
  font-size: 1.12cqw;
  line-height: 1.42;
  color: var(--body-l);
  margin-top: auto;
}
.feature .csub {
  color: rgba(255, 255, 255, 0.82);
}

.divider {
  height: 1px;
  background: var(--line-l);
  margin: 1.3cqw 0;
}
.feature .divider {
  background: rgba(255, 255, 255, 0.16);
}

.pill {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5cqw;
  background: var(--yellow);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.86cqw;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.5cqw 0.9cqw;
  border-radius: 5cqw;
  margin-bottom: 1.1cqw;
}
.pill .dot {
  width: 0.6cqw;
  height: 0.6cqw;
  border-radius: 50%;
  background: var(--ink);
}

.card.note .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.85cqw;
  line-height: 1.08;
  margin-bottom: 0.8cqw;
}
.card.note .csub {
  margin-top: 0;
}

/* numbered cards (approach) */
.num-card .top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.6cqw;
}
.num-card .kicker {
  font-family: var(--mono);
  font-size: 0.92cqw;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mut-l);
}
.badge {
  width: 2.7cqw;
  height: 2.7cqw;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mono);
  font-weight: 600;
  font-size: 1.05cqw;
  background: var(--ink);
  color: #fff;
}
.badge.y {
  background: var(--yellow);
  color: var(--ink);
}
.num-card .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.95cqw;
  line-height: 1.05;
  margin-bottom: 0.9cqw;
}
.num-card .csub {
  margin-top: 0;
}

/* skip cards */
.skip-card {
  border-style: dashed;
  border-color: rgba(44, 15, 68, 0.18);
  background: rgba(255, 255, 255, 0.55);
  box-shadow: none;
}
.skip-card .xmark {
  width: 2.5cqw;
  height: 2.5cqw;
  border-radius: 50%;
  border: 1.4px solid rgba(44, 15, 68, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mut-l);
  font-size: 1.3cqw;
  margin-bottom: 1.6cqw;
}
.skip-card .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.85cqw;
  line-height: 1.08;
  margin-bottom: 0.8cqw;
  color: rgba(44, 15, 68, 0.78);
}
.skip-card .csub {
  margin-top: 0;
}

/* ---------- editorial numbered rows ---------- */
.rows {
  margin-top: 1.5cqw;
  display: flex;
  flex-direction: column;
}
.rows.two {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, auto);
  column-gap: 5.5cqw;
  align-content: start;
  margin-top: 1.9cqw;
}
.rows.two .row {
  border-bottom: none;
}
.rows.two .rd {
  max-width: none;
}
.row {
  display: grid;
  grid-template-columns: 5cqw 1fr;
  gap: 2.4cqw;
  align-items: baseline;
  padding: 0.98cqw 0;
  border-top: 1px solid var(--line-l);
}
.row:last-child {
  border-bottom: 1px solid var(--line-l);
}
.row .rn {
  font-family: var(--display);
  font-weight: 600;
  font-size: 2.6cqw;
  line-height: 1;
  color: rgba(44, 15, 68, 0.22);
}
.row.lead .rn {
  color: var(--yellow);
}
.row .rt {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.78cqw;
  line-height: 1.05;
  margin-bottom: 0.45cqw;
}
.row .rd {
  font-size: 1.18cqw;
  line-height: 1.45;
  color: var(--body-l);
  max-width: 64cqw;
}
.row .grid2 {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0;
}

/* ---------- dark checklist (close) ---------- */
.asks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1cqw 3.4cqw;
  margin-top: 3cqw;
}
.ask {
  display: grid;
  grid-template-columns: 2.5cqw 1fr;
  gap: 1.4cqw;
  align-items: start;
  padding: 0.7cqw 0;
}
.ask .an {
  width: 2.5cqw;
  height: 2.5cqw;
  border-radius: 50%;
  background: var(--yellow);
  color: var(--ink);
  font-family: var(--mono);
  font-weight: 700;
  font-size: 1cqw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.ask .ad {
  font-size: 1.28cqw;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  padding-top: 0.35cqw;
}
.ask .ad b {
  color: #fff;
  font-weight: 600;
}
.close-line {
  margin-top: 3cqw;
  font-size: 1.5cqw;
  line-height: 1.5;
  color: var(--lilac);
  max-width: 62cqw;
}

/* ---------- print ---------- */
@media print {
  body {
    background: #fff;
    padding: 0;
  }
  .slide {
    width: 100%;
    max-width: none;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    break-after: page;
    page-break-after: always;
  }
  @page {
    size: landscape;
    margin: 0;
  }
}
</style>
