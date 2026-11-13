# Changelog

## 2.4 — 2026-11-13

- Contrast CLI accepts `#RRGGBBAA` and `#RGBA`. A translucent foreground is composited (straight-alpha source-over) over the background. The background must be opaque; a translucent background is an input error. The ratio uses the unrounded composite.
- Input errors exit 2 with a one-line message and no stack trace. Exit 1 stays a measured contrast fail. Exit 0 is a pass. An input error is not a HIGH contrast finding.
- Large text is ≥24 px regular (18 pt) or ≥18.66 px bold (14 pt). The previous ≥18.5 px bold cutoff was wrong. The 3:1 AA gate is unchanged.
- Target size follows WCAG 2.2 SC 2.5.8. Under 24×24 px is not an automatic HIGH fail. Spacing (24 px-diameter circles must not intersect), inline, essential, and equivalent are exceptions. A 20×20 icon button with confirmed spacing is not HIGH. Unconfirmed spacing is `unverified` and at most MEDIUM.
- Contrast CI runs on Node.js 18, 20, and 22.

## 2.3 — 2026-09-16

First public release of the skill pack.

- 2.3 wins over leftover 2.2 hybrid domain classification.
- Hard stops no longer name vendors or sample-file numbers. Inspect the file; do not paste fonts, frames, or scales from this skill.
- Removed the example-only Inter / 1440 / 50–950 list from the YAML section.
- SKILL.md is a load map, not a second copy of the standard. Evidence over taste. HIGH / MEDIUM / LOW.

- Review-existing workflow only. No blank-file bootstrap.
- Web-only quality bar. 390 px is mobile web, not iOS.
- Live Figma inspect is required. Screenshots are optional.
- Contrast gate is WCAG 2.2 AA (Figma luminance method). APCA is extra, not a fail.
- Hit-area tiers: 24×24 fail, 44×44 primary mobile web, documented desktop-only density may stay at 24.
- Repair (Gates B–E) only after `repairRequested: true`.
