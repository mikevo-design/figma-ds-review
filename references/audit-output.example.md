---
name: audit-output-example
description: >-
  Shape of a Gate A audit. Fake library. Copy the sections, not the findings.
---

# Audit output example

Format only. Do not score a real file toward these rows, and do not copy the YAML values into another review.

## File / library

- File: Example Product DS (fake)
- Published library: yes
- `workflowMode: review-existing`
- `platform: web`
- `repairRequested: false`

## YAML (from inspection)

```yaml
projectName: Example Product
figmaFile: figma.com/design/fake/Example-Product-DS
publishedLibrary: true
repairRequested: false
platform: web
variableModes: [Light, Dark]
fontFamily: ""
desktopFrame: 1280
mobileFrame: 390
colorScale: []
```

Empty fields mean not yet inspected.

## Findings

| Family / foundation | Severity | Evidence | Standard |
| --- | --- | --- | --- |
| Color / `text-muted` on `surface` | fail | `scripts/contrast.mjs '#9ca3af' '#ffffff'` → 2.54:1, threshold 4.5:1 | §13.0 |
| Action | high | Hover and Pressed exist only as hidden trees inside Default | §7.3 / §11 |
| Spacing | medium | Several Auto Layout gaps are raw `18`; no spacing token | §5 |

## Contrast table

| Pair | Ratio | Kind | Threshold | Status |
| --- | --- | --- | --- | --- |
| `#9ca3af` on `#ffffff` (Light, body) | 2.54:1 | normal | 4.5:1 | fail |
| `#111111` on `#ffffff` (Light, body) | 18.88:1 | normal | 4.5:1 | pass |
| Dark `text-muted` on `surface` | — | normal | 4.5:1 | unverified |

## Hit-area notes

- Action (label): 40×40 on the 390 frame — fail vs 44×44 primary mobile web.
- Icon-only toolbar on desktop page: 24×24 — allowed only if documented as desktop-only density.

## Unverified checks

- Dark mode muted-text pair not measured (mode exists; samples not extracted).
- Icon Action frame size not measured.

## Policy questions still open

- If code tokens exist, which source wins for this review?
- After the audit, repair or stay read-only? Default: read-only.

## Repair recommended?

No. Gate A only. Do not start repair.
