---
name: family-exemplar-action
description: Pedagogical decision chain for one Atom family. Not a privileged Button spec.
---

# Family exemplar: Action

Use this to see how the standard’s decisions sit on one family. Then write the same card for the family in the **reviewed file**. Do not copy names, axes, or values from a third-party kit or from this example into that file.

## Decision card (pattern)

```text
Family: Action
Composition: Atom
Public sets: Action, Icon Action
Why split: Icon Action has a different accessible name and hit-area contract
Private base: _Action Base only if it removes real duplication

Property routing
- Style, Size: VARIANT
- Show icon: BOOLEAN (hidden icon layer is allowed; do not explode into With icon variants)
- Icon: INSTANCE_SWAP + Preferred instances (icons only, not logos)
- Label: TEXT
- Theme: Variable mode (Light/Dark). No Theme= variant

Token decision: component namespace
- component/action-control/{style}/{state}/background
- No direct Primitive bindings
- Document: component namespace

States (only what this Atom needs)
- Interaction: default | hover | focus | pressed
- Availability: enabled | disabled
- Progress: idle | loading (geometry preserved, visible name kept)
- Do not use a universal active
- focus is not a restyle of hover

Hit area
- Measure the root frame
- Icon Action on mobile web: 44×44
- Dense desktop toolbar: 24×24 only if documented

Contrast
- Measure label, icon, border, focus ring vs actual background in Light and Dark
- WCAG 2.2 AA via scripts/contrast.mjs
```

## Antipatterns this exemplar is meant to stop

- Hidden Hover/Pressed trees inside Default
- `Type` variant that switches composition level
- `Theme=Light|Dark` on the component when Variable modes exist
- Cartesian `Size × Style × State × Icon × Theme`
- Unhiding Boolean layers to satisfy “zero hidden frames”
- Treating this card as the visual spec for every button in the file

## How to use during review

1. Read this card.
2. Inspect the real family in Figma.
3. Write an equivalent card from **that** API.
4. Diff the card against [design-system-rules.md](design-system-rules.md) §§6, 7.3, 11, 13.
5. Record gaps as findings. Do not “fix” the file toward this example unless repair is approved.
