# Changelog

## 2.3 — 2026-09-16

First public release of the skill pack.

- Drop named third-party kit citations. The no-copy rule stays: inspect the file; do not import another kit’s API.

- Review-existing workflow only. No blank-file bootstrap.
- Web-only quality bar. 390 px is mobile web, not iOS.
- Live Figma inspect is required. Screenshots are optional.
- Contrast gate is WCAG 2.2 AA (Figma luminance method). APCA is extra, not a fail.
- Hit-area tiers: 24×24 fail, 44×44 primary mobile web, documented desktop-only density may stay at 24.
- Repair (Gates B–E) only after `repairRequested: true`.
