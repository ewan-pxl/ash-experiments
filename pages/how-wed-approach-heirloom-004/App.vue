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
      <div class="meta">Confidential · 01 / 07</div>
    </div>

    <div class="body">
      <h1>How We'd Approach<br /><span class="accent">Heirloom Coffee.</span></h1>
      <p class="lede" style="margin-top: 2cqw; max-width: 50cqw">Not a full proposal. A short read on how we'd work with you: what we see on the site today, where the growth actually is, the moves we'd test first, and the data we'd pull together to get going.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>New Business</span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 2 — THE READ ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 02 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we see.</h2>
        <p class="lede">Heirloom isn't a brand that needs help refining its story. The "Clean Craft" methodology, "Regenerative Organic Certified" sourcing, and 900+ reviews say the fundamentals are in good shape. The constraint is what happens after the landing: the site works as a catalog, not a funnel. Average order value (AOV) and lifetime value (LTV) are where the real scale is.</p>
      </div>

      <div class="cards c3">
        <div class="card">
          <div class="clabel">Five-star-led reviews</div>
          <div class="stat">900+</div>
          <div class="divider"></div>
          <div class="csub">People saying they've never tasted anything like it. The brand fundamentals are solid.</div>
        </div>
        <div class="card">
          <div class="clabel">Subscription on your Sets</div>
          <div class="stat">0</div>
          <div class="divider"></div>
          <div class="csub">"Bold Roast Set" and "Most Popular Set" have no subscribe option. The biggest single gap for a consumable.</div>
        </div>
        <div class="card feature">
          <span class="pill"><span class="dot"></span>The lever</span>
          <div class="clabel">Loyalty member LTV</div>
          <div class="stat">+30%</div>
          <div class="divider"></div>
          <div class="csub">Members consistently carry higher lifetime value. Get people in early and the whole customer curve shifts.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 3 — THE APPROACH ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 03 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>Where we'd focus.</h2>
        <p class="lede">This isn't surface-level, section-by-section conversion lifts. It's funnel and offer architecture, built natively in Shopify Liquid, modular in the backend, with no headless rebuild.</p>
      </div>

      <div class="cards c4">
        <div class="card num-card">
          <div class="top"><span class="badge">01</span></div>
          <div class="ct">Guided<br />selling</div>
          <div class="csub">New visitors get a path, not a catalog. A quiz and starter kits do the steering.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge y">02</span></div>
          <div class="ct">Bundles &amp;<br />starter kits</div>
          <div class="csub">A proper bundle and starter-kit system, sized to raise AOV from the first order.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge">03</span></div>
          <div class="ct">Multi-unit<br />pricing</div>
          <div class="csub">Quantity breaks that make a single bag visibly the worst deal on the site.</div>
        </div>
        <div class="card num-card">
          <div class="top"><span class="badge y">04</span></div>
          <div class="ct">Subscription<br />reframed</div>
          <div class="csub">The obvious choice at every purchase touchpoint, not a checkout afterthought.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 4 — OPERATIONS-DRIVEN ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 04 / 07</div>
    </div>

    <div class="body top">
      <div class="head-split">
        <h2>Bigger lifts.</h2>
        <p class="lede">Higher-impact moves that need a conversation with whoever owns operations, stock, and margin on your side.</p>
      </div>

      <div class="rows two">
        <div class="row">
          <div class="rn">01</div>
          <div><div class="rt">"Passport Rewards" as the front door</div><div class="rd">Make it the primary entry to the brand, not a loyalty afterthought. New customers join on day one for member pricing and early releases. Members carry ~30% higher LTV.</div></div>
        </div>
        <div class="row">
          <div class="rn">02</div>
          <div><div class="rt">Reframe subscription site-wide</div><div class="rd">Not a checkbox and a disclosure. The smarter way to buy coffee: always fresh, always stocked, always cheaper, with Passport perks every few deliveries.</div></div>
        </div>
        <div class="row">
          <div class="rn">03</div>
          <div><div class="rt">Subscriptions on every coffee</div><div class="rd">Especially the "Bold Roast Set" and "Most Popular Set", which have no subscribe option today. The biggest gap for a product with a natural repurchase cycle.</div></div>
        </div>
        <div class="row">
          <div class="rn">04</div>
          <div><div class="rt">A "Heirloom Starter Kit"</div><div class="rd">Two or three best-sellers at a meaningful discount, subscribe baked in, gear on the first order. A low-risk way in that sets a high AOV from day one.</div></div>
        </div>
        <div class="row">
          <div class="rn">05</div>
          <div><div class="rt">A tiered bundle system</div><div class="rd">Pick 3, 6 or 9 bags with escalating discounts and free shipping at the top tier. Stack subscription on volume so both incentives compound.</div></div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 5 — TAG-ON ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 05 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>Start now.</h2>
        <p class="lede">Moves we can run alongside, without changing how you operate. These are the ones that show value early.</p>
      </div>

      <div class="cards c4">
        <div class="card note">
          <div class="ct">Landing page testing programme</div>
          <div class="csub">Pages built around specific hypotheses from the site and ad accounts. What converts there gets tested on-site. The two feed each other.</div>
        </div>
        <div class="card note">
          <div class="ct">A coffee quiz funnel</div>
          <div class="csub">Four or five questions on brew method, taste and volume, ending in a personalised starter kit with subscription pre-selected. On-site and as a landing page.</div>
        </div>
        <div class="card note">
          <div class="ct">Quantity breaks on product pages</div>
          <div class="csub">Make a single bag visibly the worst deal. Four bags on subscription should show the saving right at the point of choice.</div>
        </div>
        <div class="card note">
          <div class="ct">"Notify me" on sold-out gear</div>
          <div class="csub">Replace dead ends on products like the "Atmos Vacuum Storage Canister" and "Fellow Tally Pro Scale" with email capture.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 6 — SKIP ================= -->
  <section class="slide is-light">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 06 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we'd skip.</h2>
        <p class="lede">Most agencies pitch everything. These three aren't worth your focus yet, and being honest about that is the point.</p>
      </div>

      <div class="cards c3">
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">A headless replatform</div>
          <div class="csub">The wins here are offer and funnel architecture, all native to Shopify Liquid. A headless rebuild adds cost and risk without moving AOV or LTV.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">Chasing cheaper acquisition</div>
          <div class="csub">At higher spend, cost to acquire only climbs. The profitable path is making each customer worth more, not finding each one cheaper.</div>
        </div>
        <div class="card skip-card">
          <div class="xmark">&#10005;</div>
          <div class="ct">A/B tests on low-traffic pages</div>
          <div class="csub">Most split tests won't reach significance on-site. That's exactly why the landing page programme matters: a controlled place to test faster.</div>
        </div>
      </div>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span></span><span>How We'd Approach Heirloom</span></div>
  </section>

  <!-- ================= SLIDE 7 — WHAT WE'D NEED / CLOSE ================= -->
  <section class="slide is-dark">
    <div class="rail">
      <svg class="logo-svg"><use href="#pt-logo" /></svg>
      <div class="meta">Confidential · 07 / 07</div>
    </div>

    <div class="body">
      <div class="head-split">
        <h2>What we'd need<br />from you.</h2>
        <p class="lede">Since we're already working together, the next step is a session with your growth team to pull the data that shapes the roadmap. These are the inputs we'd need them to share.</p>
      </div>

      <div class="asks">
        <div class="ask"><div class="an">1</div><div class="ad">P&amp;L, COGS and shipping costs, so we can map AOV and subscription targets to real margin.</div></div>
        <div class="ask"><div class="an">2</div><div class="ad">Current subscription rate and subscriber data: churn, shipments before cancel, and upgrade behaviour.</div></div>
        <div class="ask"><div class="an">3</div><div class="ad">Cohort data, a Lifetimely export or equivalent, especially revenue retention by acquisition month.</div></div>
        <div class="ask"><div class="an">4</div><div class="ad">"Passport Rewards" data: enrollment rate, member versus non-member behaviour, and points redemption.</div></div>
        <div class="ask"><div class="an">5</div><div class="ad">Shopify admin access, to audit the selling-plan setup and build subscription, kits and bundles natively.</div></div>
        <div class="ask"><div class="an">6</div><div class="ad">Paid traffic split and landing page destinations, plus time with whoever owns fulfillment.</div></div>
      </div>

      <p class="close-line">From there we can put together a proper roadmap with sequencing, ownership, and the bigger calls flagged honestly. Happy to chat through any of this whenever works.</p>
    </div>

    <div class="foot"><span>Pixel Theory™ 2026</span><span>Contact</span><span>How We'd Approach Heirloom</span></div>
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

/* ---------- editorial numbered rows (ops ideas) ---------- */
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
