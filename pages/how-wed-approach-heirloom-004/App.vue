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

useDeckNav()

const stats = [
  { label: 'Five-star-led reviews', stat: '900+', sub: `People saying they've never tasted anything like it. The brand fundamentals are solid.` },
  { label: 'Subscription on your Sets', stat: '0', sub: '"Bold Roast Set" and "Most Popular Set" have no subscribe option. The biggest single gap for a consumable.' },
  { feature: true, pill: 'The lever', label: 'Loyalty member LTV', stat: '+30%', sub: 'Members consistently carry higher lifetime value. Get people in early and the whole customer curve shifts.' },
]
const pillars = [
  { badge: '01', title: 'Guided<br />selling', sub: 'New visitors get a path, not a catalog. A quiz and starter kits do the steering.' },
  { badge: '02', badgeY: true, title: 'Bundles &<br />starter kits', sub: 'A proper bundle and starter-kit system, sized to raise AOV from the first order.' },
  { badge: '03', title: 'Multi-unit<br />pricing', sub: 'Quantity breaks that make a single bag visibly the worst deal on the site.' },
  { badge: '04', badgeY: true, title: 'Subscription<br />reframed', sub: 'The obvious choice at every purchase touchpoint, not a checkout afterthought.' },
]
const lifts = [
  { n: '01', title: '"Passport Rewards" as the front door', desc: 'Make it the primary entry to the brand, not a loyalty afterthought. New customers join on day one for member pricing and early releases. Members carry ~30% higher LTV.' },
  { n: '02', title: 'Reframe subscription site-wide', desc: 'Not a checkbox and a disclosure. The smarter way to buy coffee: always fresh, always stocked, always cheaper, with Passport perks every few deliveries.' },
  { n: '03', title: 'Subscriptions on every coffee', desc: 'Especially the "Bold Roast Set" and "Most Popular Set", which have no subscribe option today. The biggest gap for a product with a natural repurchase cycle.' },
  { n: '04', title: 'A "Heirloom Starter Kit"', desc: 'Two or three best-sellers at a meaningful discount, subscribe baked in, gear on the first order. A low-risk way in that sets a high AOV from day one.' },
  { n: '05', title: 'A tiered bundle system', desc: 'Pick 3, 6 or 9 bags with escalating discounts and free shipping at the top tier. Stack subscription on volume so both incentives compound.' },
]
const startNow = [
  { title: 'Landing page testing programme', sub: 'Pages built around specific hypotheses from the site and ad accounts. What converts there gets tested on-site. The two feed each other.' },
  { title: 'A coffee quiz funnel', sub: 'Four or five questions on brew method, taste and volume, ending in a personalised starter kit with subscription pre-selected. On-site and as a landing page.' },
  { title: 'Quantity breaks on product pages', sub: 'Make a single bag visibly the worst deal. Four bags on subscription should show the saving right at the point of choice.' },
  { title: '"Notify me" on sold-out gear', sub: 'Replace dead ends on products like the "Atmos Vacuum Storage Canister" and "Fellow Tally Pro Scale" with email capture.' },
]
const skip = [
  { title: 'A headless replatform', sub: 'The wins here are offer and funnel architecture, all native to Shopify Liquid. A headless rebuild adds cost and risk without moving AOV or LTV.' },
  { title: 'Chasing cheaper acquisition', sub: 'At higher spend, cost to acquire only climbs. The profitable path is making each customer worth more, not finding each one cheaper.' },
  { title: 'A/B tests on low-traffic pages', sub: `Most split tests won't reach significance on-site. That's exactly why the landing page programme matters: a controlled place to test faster.` },
]
const asks = [
  'P&L, COGS and shipping costs, so we can map AOV and subscription targets to real margin.',
  'Current subscription rate and subscriber data: churn, shipments before cancel, and upgrade behaviour.',
  'Cohort data, a Lifetimely export or equivalent, especially revenue retention by acquisition month.',
  '"Passport Rewards" data: enrollment rate, member versus non-member behaviour, and points redemption.',
  'Shopify admin access, to audit the selling-plan setup and build subscription, kits and bundles natively.',
  'Paid traffic split and landing page destinations, plus time with whoever owns fulfillment.',
]
</script>

<template>
  <DeckPage>
    <!-- 1 — cover -->
    <DeckSlide tone="dark" :n="1" :total="7" mid="New Business" right="How We'd Approach Heirloom">
      <h1>How We'd Approach<br /><span class="accent">Heirloom Coffee.</span></h1>
      <p class="lede" style="margin-top: 2cqw; max-width: 50cqw">
        Not a full proposal. A short read on how we'd work with you: what we see on the site today,
        where the growth actually is, the moves we'd test first, and the data we'd pull together to
        get going.
      </p>
    </DeckSlide>

    <!-- 2 — what we see -->
    <DeckSlide tone="light" :n="2" :total="7" right="How We'd Approach Heirloom">
      <HeadSplit
        title="What we see."
        lede='Heirloom isn&#39;t a brand that needs help refining its story. The "Clean Craft" methodology, "Regenerative Organic Certified" sourcing, and 900+ reviews say the fundamentals are in good shape. The constraint is what happens after the landing: the site works as a catalog, not a funnel. Average order value (AOV) and lifetime value (LTV) are where the real scale is.'
      />
      <StatCards :items="stats" />
    </DeckSlide>

    <!-- 3 — where we'd focus -->
    <DeckSlide tone="light" :n="3" :total="7" right="How We'd Approach Heirloom">
      <HeadSplit
        title="Where we'd focus."
        lede="This isn't surface-level, section-by-section conversion lifts. It's funnel and offer architecture, built natively in Shopify Liquid, modular in the backend, with no headless rebuild."
      />
      <Pillars :items="pillars" />
    </DeckSlide>

    <!-- 4 — bigger lifts -->
    <DeckSlide tone="light" :n="4" :total="7" right="How We'd Approach Heirloom" top>
      <HeadSplit
        title="Bigger lifts."
        lede="Higher-impact moves that need a conversation with whoever owns operations, stock, and margin on your side."
      />
      <Rows :items="lifts" two />
    </DeckSlide>

    <!-- 5 — start now -->
    <DeckSlide tone="light" :n="5" :total="7" right="How We'd Approach Heirloom">
      <HeadSplit
        title="Start now."
        lede="Moves we can run alongside, without changing how you operate. These are the ones that show value early."
      />
      <NoteCards :items="startNow" :cols="4" />
    </DeckSlide>

    <!-- 6 — skip -->
    <DeckSlide tone="light" :n="6" :total="7" right="How We'd Approach Heirloom">
      <HeadSplit
        title="What we'd skip."
        lede="Most agencies pitch everything. These three aren't worth your focus yet, and being honest about that is the point."
      />
      <SkipCards :items="skip" />
    </DeckSlide>

    <!-- 7 — what we'd need / close -->
    <DeckSlide tone="dark" :n="7" :total="7" mid="Contact" right="How We'd Approach Heirloom">
      <HeadSplit
        title="What we'd need<br />from you."
        lede="Since we're already working together, the next step is a session with your growth team to pull the data that shapes the roadmap. These are the inputs we'd need them to share."
      />
      <Asks
        :items="asks"
        close-line="From there we can put together a proper roadmap with sequencing, ownership, and the bigger calls flagged honestly. Happy to chat through any of this whenever works."
      />
    </DeckSlide>
  </DeckPage>
</template>

<style>
/* Heirloom-only: idea "note" cards */
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
</style>
