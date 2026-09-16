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

Quality bar: [references/design-system-rules.md](references/design-system-rules.md) (v2.3). Load sections by task below. Do not ingest the whole file before every score. The file under review wins over every exemplar.

## Evidence, not taste

A finding needs live inspect plus a measurement or a named node. Taste, another UI kit, and “this would look better” are not findings. Unmeasured contrast or hit area is `unverified`, never a pass.

One root cause is one row. A broken alias or missing focus outranks a page-name nit.

Severity:

- `HIGH` — blocks a task, broken alias, missing focus, contrast fail, primary hit-area fail
- `MEDIUM` — composition, API, or token naming that harms consistency or migration
- `LOW` — isolated polish with little task impact

## Hard stops

- No Figma plugin/MCP (or equivalent live inspect): stop. Ask for file access. Do not review from memory, another UI kit, or screenshots alone.
- Never recreate the file from scratch because it looks messy.
- Default is read-only **Gate A**. Repair (Gates B–E) only if the owner sets `repairRequested: true` after the audit.
- Do not invent Base / Product / Marketing shelves or native platform modes. Do not require Code Connect.
- Do not interview for facts visible in the file. Fill YAML from inspection. Do not paste fonts, frame widths, or color scales from this skill. Empty fields mean not yet inspected.
- Do not pass contrast or hit-area by eye. Unmeasured pairs/frames are `unverified`.
- Do not fail the library on APCA, missing Code Connect, missing screenshots, or unknown external consumers.
- Do not claim a license was verified.
- Do not delete or replace a published asset until instances in **this file** are searched, or the owner approves.

## Load by task

| Task | Load |
| --- | --- |
| YAML and policy questions | Standard §3 and §2.2 |
| Variables and naming | §7. Mapping table: current → layer/name → consumers → risk. Font, frames, and scale come from the file |
| Composition | §11.1 `Primitive → Atom → Compound → Section → Template → Page`. Not Atomic Design. Do not assemble a new DS |
| One family | [references/family-exemplar-action.md](references/family-exemplar-action.md) as a decision pattern, not a Button spec |
| Contrast | [scripts/contrast.mjs](scripts/contrast.mjs) or Figma’s WCAG checker. AA: 4.5:1 normal, 3:1 large and UI |
| Gate A done | §17.2. Shape: [references/audit-output.example.md](references/audit-output.example.md) |
| Repair | §15.2–15.6 only after `repairRequested: true` |

## Workflow

1. Confirm the Figma file. Inspect via plugin/MCP.
2. Fill the project YAML in the standard from the file (`workflowMode: review-existing`, `platform: web`).
3. Ask only policy questions in standard §2.2. Default `repairRequested: false`.
4. Run Gate A. Score against §17.2. Open findings are a valid review, not a failed review.
5. Contrast: extract token (and sampled component) pairs in Light and Dark. Measure. Unmeasured pairs stay `unverified`.
6. Hit area: measure the **component frame**, not the glyph. Below 24×24 px = fail. Primary mobile-web controls should be 44×44 px. Documented desktop-only density may stay at 24×24.
7. Optional plugin screenshot only when layout, clipping, or Dark appearance is in dispute.
8. Deliver the audit. Stop unless the owner asks for repair.

If repair is approved, follow Gates B–E in the standard. One family at a time. Foundations before dependents. Last validated system must stay usable.

## Audit output

Shape only: [references/audit-output.example.md](references/audit-output.example.md). Copy the sections, not the fake findings.

```text
File / library
YAML (from inspection)
Findings (family or foundation, HIGH/MEDIUM/LOW, evidence: node and/or measurement, standard section)
Contrast table (pair, ratio, threshold, pass/fail/unverified)
Hit-area notes
Unverified checks
Policy questions still open
Repair recommended? (yes/no — do not start it)
```

Each finding names the family or foundation, severity, evidence (Figma node and/or measurement), and the standard section.

## Before you finish

| Mistake | Fix |
| --- | --- |
| Recreated the file because it looked messy | Stop. Review the existing file. Repair only after `repairRequested: true` |
| Pasted a font, frame width, or color scale from this skill | Inspect the file. Empty YAML means not yet inspected |
| Passed contrast or hit area by eye | Measure, or mark `unverified` |
| Used Molecule / Organism or built a blank atomic library | Classify with §11.1. Recommend splits. Do not assemble a new DS |
| Started Gates B–E without an explicit repair ask | Deliver Gate A. Stop |
| Finding with no node and no measurement | Drop it, or mark `unverified` |
| Copied a third-party kit API into the file | Diff against the file. The file wins |

## Do not load

Do not copy a third-party kit’s APIs, paddings, or variant matrices into the reviewed file. Do not run a prose-writing skill as part of Definition of Done.
