# Contributing

This repository is a single Agent Skill plus its quality bar. Keep that shape.

Rules live in [`references/design-system-rules.md`](references/design-system-rules.md). [`SKILL.md`](SKILL.md) only routes: hard stops, load-by-task, and report shape. Do not copy §7 or §11 into `SKILL.md`.

## Before you open a PR

1. Read [`SKILL.md`](SKILL.md) and [`references/design-system-rules.md`](references/design-system-rules.md).
2. Do not fork the standard into Cursor-only, Codex-only, or Claude-only variants.
3. Do not add vendor kits, screenshot gates, or native iOS/Android rules.
4. If you change contrast math, update `scripts/contrast.mjs` and `scripts/contrast.test.mjs` together.

## Tests

```bash
node scripts/contrast.test.mjs
```

## Pull requests

- One concern per PR.
- Say *why* the quality bar should move, not only what you edited.
- A change to `references/design-system-rules.md` needs a `CHANGELOG.md` entry and a version bump in that file and in `SKILL.md` metadata.
