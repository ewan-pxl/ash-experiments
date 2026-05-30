<script setup>
import '@projects/PXL decks/brand.css'
import '@projects/PXL decks/deck.css'
import { useDeckNav } from '@projects/PXL decks/shared/useDeckNav.js'
import DeckPage from '@projects/PXL decks/shared/DeckPage.vue'
import DeckSlide from '@projects/PXL decks/shared/DeckSlide.vue'
import HeadSplit from '@projects/PXL decks/shared/HeadSplit.vue'
import StatCards from '@projects/PXL decks/shared/StatCards.vue'
import Pillars from '@projects/PXL decks/shared/Pillars.vue'
import Rows from '@projects/PXL decks/shared/Rows.vue'
import NoteCards from '@projects/PXL decks/shared/NoteCards.vue'
import SkipCards from '@projects/PXL decks/shared/SkipCards.vue'
import Asks from '@projects/PXL decks/shared/Asks.vue'
import ashPhoto from '@projects/PXL decks/assets/team/ash.webp'
import lucasPhoto from '@projects/PXL decks/assets/team/lucas.webp'
import ewanPhoto from '@projects/PXL decks/assets/team/ewan.webp'
import ashtonPhoto from '@projects/PXL decks/assets/team/ashton.webp'

useDeckNav()

const setup = [
  { label: 'Onboarding sprint', stat: '4–6 wks', sub: 'Customer surveys, on-site analysis and message mining across both markets, feeding the UI kits the entire build runs on.' },
  { label: 'Execution window', stat: '3 mo', sub: 'Nav and cart, three landing pages with reusable meta objects, and the quiz funnel — built custom for each brand off the research.' },
  { feature: true, pill: 'End to end', label: 'Total engagement', stat: '4–4.5 mo', sub: 'Onboarding plus execution, end to end — two bespoke builds, every asset yours to keep and scale.' },
]
const deliverables = [
  { badge: '01', title: 'Nav + cart<br />overhaul', feats: ['Guided selling paths for undecided shoppers', 'Cart rebuilt with merchandising and recommendations', 'Engineered to lift average order value (AOV)'] },
  { badge: '02', badgeY: true, title: 'Three<br />landing pages', feats: ['Video sales letter, long-form letter, product page', 'Each a standalone landing page', 'Plus a reusable meta object, no dev needed'] },
  { badge: '03', title: '15–20 modular<br />blocks', feats: ['Reusable section blocks across the pages', 'Recombine across the site, never one layout', 'Built natively in Shopify Liquid'] },
  { badge: '04', badgeY: true, title: 'Custom quiz<br />funnel', feats: ['Built from scratch for your catalog, not a template', 'Bespoke logic and a fully custom tech stack', 'Personalised bundle output, plus a fresh lead magnet'] },
]
const notDoing = [
  { title: 'Asset generation', sub: 'We brief your illustrators and graphic designers, but the visual production itself lands on your side, not ours.' },
  { title: 'Paid media', sub: 'Already owned by your Pixel Theory growth team. They run the traffic and spend, and this squad owns the rest.' },
  { title: 'Brand identity', sub: 'No logo or rebrand work. We design within your existing brand and sharpen it, rather than replace it.' },
]
const timeline = [
  { n: '01', title: 'Onboarding · 4–6 weeks', desc: `Customer surveys, on-site analysis and message mining across both markets, building on what the growth side already knows about your buyers. We set the UI kits the whole build runs on, and it's this research that makes each build its own rather than a copy.` },
  { n: '02', title: 'Execution · 3 months', desc: 'Navigation and cart, three landing pages with their meta object versions, and the quiz funnel with its lead magnet — built as two custom storefronts, Ferry Morse and McKenzie Seeds, each tuned to its own research.' },
  { n: '03', title: 'End to end · 4–4.5 months', desc: 'From kickoff to two finished builds, you keep every asset created along the way — yours to reuse and scale.' },
]
const investment = [
  { label: 'Both brands covered', stat: '2', sub: 'Ferry Morse and McKenzie Seeds, one engagement, one rate.' },
  { label: 'Billing window', stat: '4 mo', sub: 'The window the flat rate applies across.' },
  { feature: true, pill: 'Monthly', label: 'Flat monthly rate', stat: '$8,000', sub: 'Covers the post-click squad and every deliverable, billed monthly alongside your growth retainer.' },
]
const team = [
  { photo: ashPhoto, title: 'Ash', role: 'Post-Click', sub: 'Runs the program end to end and holds quality at every touchpoint, and is your first port of call.' },
  { photo: lucasPhoto, title: 'Lucas Mondora', role: 'Strategy', sub: 'Owns the roadmap and testing prioritisation, with full autonomy over what we run and in what order.' },
  { photo: ewanPhoto, title: 'Ewan Howell', role: 'Technical', sub: 'Owns all technical implementation across both brands. Anything technical routes straight through him.' },
  { photo: ashtonPhoto, title: 'Ashton Dunn', role: 'Design', sub: 'Works hand in hand with Ash on design, carrying the visual system across every page and every block.' },
]
const asks = [
  'A point of contact for research access.',
  `Any brand assets we don't already hold from the growth side: fonts, UI patterns, any existing style guide for both brands.`,
  'Access to your designer and illustrator for asset briefs.',
  'A bi-weekly 30-minute check-in slot during execution.',
]
</script>

<template>
  <DeckPage>
    <!-- 1 — cover -->
    <DeckSlide tone="dark" :n="1" :total="8" mid="Post-Click expansion" right="Green Garden · SOW">
      <h1>Green Garden<br /><span class="accent">Statement of Work.</span></h1>
      <p class="lede" style="margin-top: 2cqw; max-width: 52cqw">
        This scopes the post-click build we'd bolt onto the growth work we already run for Green
        Garden. Scope, timeline and numbers are below, so flag anything you want adjusted.
      </p>
    </DeckSlide>

    <!-- 2 — the setup -->
    <DeckSlide tone="light" :n="2" :total="8" right="Green Garden · SOW">
      <HeadSplit
        title="The setup."
        lede="You already know us — we run Green Garden's growth. This bolts our post-click squad onto that engagement: a fixed-window SWAT build that owns everything after the click. Two custom builds, Ferry Morse (US) and McKenzie Seeds (Canada), share one system but are each shaped by their own research."
      />
      <StatCards :items="setup" />
    </DeckSlide>

    <!-- 3 — what you get -->
    <DeckSlide tone="light" :n="3" :total="8" right="Green Garden · SOW">
      <HeadSplit
        title="What you get."
        lede="Four deliverables on the post-click side, each built to be reused and scaled by your team without dev support."
      />
      <Pillars :items="deliverables" />
    </DeckSlide>

    <!-- 4 — what we're not doing -->
    <DeckSlide tone="light" :n="4" :total="8" right="Green Garden · SOW">
      <HeadSplit
        title="What we're not doing."
        lede="A few things deliberately out of scope, so the boundaries are clear from day one."
      />
      <SkipCards :items="notDoing" />
    </DeckSlide>

    <!-- 5 — the timeline -->
    <DeckSlide tone="light" :n="5" :total="8" right="Green Garden · SOW" top>
      <HeadSplit
        title="The timeline."
        lede="Two phases across roughly four to four and a half months, both brands built custom off the research."
      />
      <Rows :items="timeline" />
    </DeckSlide>

    <!-- 6 — the investment -->
    <DeckSlide tone="light" :n="6" :total="8" right="Green Garden · SOW">
      <HeadSplit
        title="The investment."
        lede="A flat monthly rate across the engagement window. No retainer tail, no surprises."
      />
      <StatCards :items="investment" />
    </DeckSlide>

    <!-- 7 — who's in the room -->
    <DeckSlide tone="light" :n="7" :total="8" right="Green Garden · SOW">
      <HeadSplit
        title="Who's in the room."
        lede="Your post-click squad at Pixel Theory — the same shop already running Green Garden's growth. Senior, lean, and hands-on across the build."
      />
      <NoteCards :items="team" :cols="4" />
    </DeckSlide>

    <!-- 8 — what we'd need / next steps -->
    <DeckSlide tone="dark" :n="8" :total="8" mid="Next steps" right="Green Garden · SOW">
      <HeadSplit
        title="What we'd need<br />from you."
        lede="A few inputs from your side to keep onboarding on schedule."
      />
      <Asks
        :items="asks"
        close-line="Next: you review this and flag anything to adjust, we turn it into a signable SOW, and onboarding kicks off."
      />
    </DeckSlide>
  </DeckPage>
</template>

<style>
/* Green Garden-only: team "note" cards, ticked feature lists, tighter num-card */
.card.note .team-photo {
  width: 5.4cqw;
  height: 5.4cqw;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.4cqw;
  background: var(--line-l);
  border: 1px solid var(--line-l);
}
.card.note .ct {
  font-family: var(--display);
  font-weight: 600;
  font-size: 1.7cqw;
  line-height: 1.06;
  margin-bottom: 0.35cqw;
  white-space: nowrap;
}
.card.note .crole {
  font-family: var(--mono);
  font-size: 0.9cqw;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mut-l);
  margin-bottom: 0.85cqw;
  white-space: nowrap;
}
.card.note .csub {
  margin-top: 0;
}
.feats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.95cqw;
}
.feats li {
  position: relative;
  padding-left: 2cqw;
  font-size: 1.12cqw;
  line-height: 1.34;
  color: var(--body-l);
}
.feats li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--ink);
  font-weight: 700;
  font-size: 1.12cqw;
}
.cards .num-card .top {
  margin-bottom: 1.6cqw;
}
</style>
