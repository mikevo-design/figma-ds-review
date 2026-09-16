---
name: figma-ds-review
description: >-
  Review an existing web product design system in Figma against a migration-safe
  quality bar. Use when the user asks to audit, review, or score a Figma library,
  Variables, components, tokens, Auto Layout, or design-system file — not when
  creating a blank design system from scratch.
license: MIT
compatibility: Requires live Figma inspect (plugin or MCP). Node.js 18+ for scripts/contrast.mjs.
metadata:
  version: "2.3"
  author: mikevo-design
  standard: references/design-system-rules.md
---

# Figma DS review

Review one existing **web** product design system in Figma. Do not bootstrap a new file. Do not apply iOS HIG or Android Material rules.

Full quality bar: [references/design-system-rules.md](references/design-system-rules.md) (v2.3). Read it before scoring. Before scoring any component family, read [references/family-exemplar-action.md](references/family-exemplar-action.md). That file is a decision pattern, not a Button spec. The file under review wins over the exemplar.

## Hard stops

- No Figma plugin/MCP (or equivalent live inspect): stop. Ask for file access. Do not review from memory, Untitled UI, or screenshots alone.
- Never recreate the file from scratch because it looks messy.
- Default is read-only **Gate A**. Repair (Gates B–E) only if the owner sets `repairRequested: true` after the audit.
- Do not invent Marketing / Base / Product shelves, `Platform=iOS`, Code Connect, 21st.dev, Sepia, Inter, 1440, or `50–950`.
- Do not interview for facts visible in the file. Fill YAML from inspection. Empty fields mean not yet inspected.
- Do not pass contrast or hit-area by eye. Unmeasured pairs/frames are `unverified`.
- Do not fail the library on APCA, missing Code Connect, missing screenshots, or unknown external consumers.
- Do not claim a license was verified.
- Do not delete or replace a published asset until instances in **this file** are searched, or the owner approves.

## Workflow

1. Confirm the Figma file. Inspect via plugin/MCP.
2. Fill the project YAML in the standard from the file (`workflowMode: review-existing`, `platform: web`).
3. Ask only policy questions in standard §2.2. Default `repairRequested: false`.
4. Run Gate A. Score against §17.2. Open findings are a valid review, not a failed review.
5. Contrast: extract token (and sampled component) pairs in Light and Dark. Measure with [scripts/contrast.mjs](scripts/contrast.mjs) or Figma’s built-in WCAG checker. Gate is WCAG 2.2 AA: 4.5:1 normal text, 3:1 large text, 3:1 non-text UI.
6. Hit area: measure the **component frame**, not the glyph. Below 24×24 px = fail. Primary mobile-web controls should be 44×44 px. Documented desktop-only density may stay at 24×24.
7. Optional plugin screenshot only when layout, clipping, or Dark appearance is in dispute.
8. Deliver the audit. Stop unless the owner asks for repair.

If repair is approved, follow Gates B–E in the standard. One family at a time. Foundations before dependents. Last validated system must stay usable.

## Audit output

```text
File / library
YAML (from inspection)
Findings (family or foundation, severity, evidence, standard section)
Contrast table (pair, ratio, threshold, pass/fail/unverified)
Hit-area notes
Unverified checks
Policy questions still open
Repair recommended? (yes/no — do not start it)
```

Severity: use evidence. A broken alias or missing focus state outranks a page-name nit.

## Do not load

Do not copy Untitled UI APIs, paddings, or variant matrices into the reviewed file. Do not run a prose-writing skill as part of Definition of Done.
