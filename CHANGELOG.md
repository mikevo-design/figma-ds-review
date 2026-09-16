# Changelog

## 2.3 — 2026-09-16

First public release of the skill pack.

- 2.3 wins over leftover 2.2 hybrid domain classification.
- Hard stops no longer name vendors or sample-file numbers. Inspect the file; do not paste fonts, frames, or scales from this skill.
- Removed the example-only Inter / 1440 / 50–950 list from the YAML section.
- Added `references/audit-output.example.md` for Gate A report shape.

- Review-existing workflow only. No blank-file bootstrap.
- Web-only quality bar. 390 px is mobile web, not iOS.
- Live Figma inspect is required. Screenshots are optional.
- Contrast gate is WCAG 2.2 AA (Figma luminance method). APCA is extra, not a fail.
- Hit-area tiers: 24×24 fail, 44×44 primary mobile web, documented desktop-only density may stay at 24.
- Repair (Gates B–E) only after `repairRequested: true`.
