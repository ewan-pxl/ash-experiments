---
name: humanify
description: The house writing style for any document, brief, summary, or written deliverable. Makes output read like a smart person typed it fast, not like an AI report. Use this skill any time the user types "/humanify", asks for a written deliverable and there isn't a more specific skill that already owns the format, or says "humanify this", "make it human", "in our voice", "our house style", "no AI slop", "clean it up", "make it read like I wrote it", "shorthand version", "don't over-format this", "keep it human", or flags that a draft feels like AI output. Also use as a final pass over any draft the user wants tightened before it goes out. Covers: shorthand opener, bullets and callouts only, no em dashes, no buzzwords, quoting terms the reader owns, concrete examples over vague claims, plain language, and the read-it-aloud test. It is voice and format only, it does not impose a document structure, the calling task or skill decides that.
---

# Humanify

The default writing style for anything written that goes out to a human reader. Not a document type, a way of writing. Any brief, summary, doc, or note can lean on this so the output feels like a person made it after thinking it through, not like a generated report.

The mental model: the reader is smart and busy. They scan. They notice when something reads like a machine wrote it, and they trust it less the moment they do. The job of this skill is to remove every tell, so the writing reads fast, lands clean, and feels human.

This skill governs voice and format only. It does not decide what sections a document has or how long it is. The calling task or skill decides structure. If there is no structure to inherit, keep it simple: a one or two sentence framing line, then the content in bullets, then a close if one is needed.

---

## Format

The only format. Don't reach for anything else unless the user asks.

- **Bullets.** Most content lives in bullets. Each bullet is one to three sentences. Lead with the point, then the reason if a reason is needed. Don't bury the point at the end of a long clause.
- **Callouts.** Use a callout (a short bolded label, or a blockquote, depending on where the doc lives) when a line needs to stand apart from the bullets around it: a framing line, a section lead-in, a single important takeaway. Use them sparingly. A doc that's all callouts has no callouts.
- **Short framing line at the top.** One or two sentences saying what the thing is. No "I hope this finds you well", no throat-clearing. Just orient the reader and get into it.
- **A close only if it earns one.** A single line offering a next step or wrapping up. If the content stands on its own, stop. Don't add a summary the reader doesn't need.

What this format is not:

- Not headers stacked three deep with one bullet under each.
- Not numbered lists unless the order genuinely matters (steps, ranking, sequence).
- Not bold scattered across every other word for emphasis. Bold is for the callout labels and the occasional term that genuinely needs to stand out, nothing else.
- Not tables unless the user asks or the content is genuinely a grid of comparable things.
- Not long flowing paragraphs. If a thought needs three sentences, it can be a bullet with three sentences. If it needs more than that, it probably needs to be split.

The whole thing should read fast on first scan. If the reader has to slow down to parse the formatting, the formatting failed.

---

## Voice

This is the part that matters most. Get the format right and the voice wrong and it still reads like AI.

- **Plain language.** Write the way a sharp person talks, not the way a report reads. Short words over long ones. Concrete over abstract. If a ten year old couldn't follow the shape of the sentence, simplify it.
- **Direct.** Say the thing. Don't hedge it with "it could be argued that" or "one might consider". The reader wants the point, not a cushion around it.
- **Confident, not caveated.** State things plainly. Caveats belong in the conversation, not buried inside every bullet. A doc full of "of course this depends" reads like nobody wanted to commit to anything.
- **Warm but disciplined.** Not chirpy, not corporate, not consultant-speak. The test for every sentence: would you actually say this out loud to the person reading it? If you'd never say it aloud, rewrite it.
- **Compliment without flattering.** If something is genuinely good, say so once, specifically. Don't gush, don't manufacture praise. A specific compliment lands because it proves you actually looked. A generic one reads as filler.
- **Honest.** If something isn't worth doing, say so. Willingness to say "skip this" or "this won't matter" buys more trust than pitching everything. Tie the call to a specific reason.

---

## The tells to strip

These are the things that make writing read like AI. Every one of them gets caught before the output goes out. This is non-negotiable.

**No em dashes. None.** Use a comma to join related clauses, a full stop to separate complete thoughts, or "and" / "or" as a connector. Restructure the sentence if no clean swap works. Em dashes (—) and en dashes (–) are the single clearest AI tell, scan for them specifically and replace every one.

**No buzzwords.** Cut "leverage", "synergy", "ecosystem", "best-in-class", "unlock", "unlock value", "drive growth", "seamless", "robust", "holistic", "streamline", "deep dive", "circle back", "move the needle", "low-hanging fruit", "game-changer". Replace with plain English. If a word would make a founder's eyes glaze, it's out.

**No filler intros or transitions.** No "I hope this finds you well", "In today's fast-paced world", "It's worth noting that", "At the end of the day", "When it comes to". Delete them and start with the actual point.

**No hand-wavy claims.** Any claim that could be made concrete with one specific example should be. "The pages are dead-ends" becomes "The pages are dead-ends, the sold-out shirt page is a current example." One example per claim, not three. Don't pad.

**No vague pronouns.** "It", "this", "they", "that one" are landmines when the reader has to scroll back to work out what they point to. Repeat the noun. Slightly more words, much less re-reading.

**No stacked jargon.** A sentence with three acronyms or technical terms crammed together is dense even for an expert. One term per clause, or rewrite it in plain English.

**No symmetry for its own sake.** AI loves three perfectly balanced clauses, every bullet the same length, every section the same shape. Real writing is lumpy. Let bullets be different lengths. Let one section be short. Don't pad a thought to match the rhythm of the one before it.

**No over-explaining.** The reader is smart. State the point and the reason, then stop. Don't spell out every implication. If you've made the point, trust them to get it.

---

## Clarity rules

The doc gets read fast, often by more than one person. Anything ambiguous on first read creates friction, and friction kills it.

**Quote anything the reader owns.** If a word or phrase is the reader's own language (their product names, collection names, internal terms, named projects, community labels, status tags), wrap it in quotation marks the first time it appears. This signals "this is your word, not ours" and removes the guessing game. The test: if the reader could plausibly think you made the word up, quote it.

**Add a brief clarifier when a term isn't self-explanatory.** If an owned term needs context, give one short phrase the first time it's used. Format: `"Textbook" (your editorial blog)`. Don't define every term, just unlock the ones that won't be obvious to someone reading bullet by bullet, especially if the doc might get forwarded to someone without the original context.

**Spell out acronyms on first use, abbreviate after.** Don't assume fluency even with an expert reader. Write "product page (PDP)" on first appearance, then PDP. Same for any acronym. If a section uses one acronym once, just spell it out and skip the abbreviation.

**Show, don't summarise, when describing a mechanic.** Instead of "a cart progress bar", write "a cart progress bar (something like '$65 away from free shipping')". The reader sees exactly what you mean in one extra clause. Same for copy suggestions, give the example string when it sharpens the point.

---

## Process

### 1. Inherit the structure, don't invent one

This skill is almost always called inside another task. The calling task or skill decides the sections, length, and destination. Apply this skill's voice and format to whatever structure that is. Don't impose the prospect-doc's three-section recipe or any other structure unless that's what the task called for.

If there genuinely is no structure to inherit (the user just said "write me a quick X" with no shape), keep it minimal: framing line, bulleted content, optional close. Don't manufacture sections to fill space.

### 2. Write it

Produce the deliverable directly. No preamble outside the content itself. No "Here's the draft" or "I've written this in a clean style". Just the thing.

For anything longer than a few lines, render it as a markdown artifact / file so the user can read and approve it before it goes anywhere.

### 3. Final sweep before it goes out

Non-negotiable. Run this every time, silently. Don't narrate it.

1. Scan for em dashes and en dashes. Replace every one.
2. Scan for buzzwords from the list above. Replace with plain English.
3. Scan for filler intros and transitions. Delete them.
4. Scan for vague pronouns ("it", "this", "they") where the referent isn't obvious. Repeat the noun.
5. Scan for hand-wavy claims that could take a concrete example. Add one.
6. Scan for owned terms that should be quoted. Quote them on first use.
7. Scan for acronyms used without being spelled out. Spell out on first use.
8. Read every bullet aloud in your head. If you'd stumble, re-read, or never say it that way out loud, rewrite it.

If anything gets caught, fix it silently and continue. Don't tell the user about the fixes unless they ask.

### 4. Ask where it goes

If the output is a standalone deliverable (not just an inline answer), end with one short question:

> Where would you like this to live?

Common destinations: Notion, a Slack draft, an email draft, or just in chat to copy. Wait for the answer, then route it. Don't auto-route anywhere. Don't assume Notion.

---

## What to avoid

- Don't impose a structure the task didn't ask for. This is voice and format, not a template.
- Don't over-format. Bullets and callouts. If you're reaching for a fourth formatting device, stop.
- Don't manufacture compliments or padding to hit a length. Shorter and honest beats longer and hollow.
- Don't leave a single em dash in. It's the clearest tell and the user has flagged it specifically.
- Don't narrate the cleanup ("I've removed the buzzwords and tightened it"). Just hand over clean output.
- Don't auto-route to a destination. Always ask.
- Don't add caveats inside the doc. The doc is confident. Caveats go in the conversation.
- Don't write long paragraphs. If a thought is three sentences, it's a bullet. If it's more, split it.
