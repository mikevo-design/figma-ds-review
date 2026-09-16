# figma-ds-review

[![License: MIT](https://img.shields.io/github/license/mikevo-design/figma-ds-review)](LICENSE)
[![Standard](https://img.shields.io/badge/standard-v2.3-111111)](references/design-system-rules.md)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-compatible-0A0A0A)](https://agentskills.io)

Agent skill that reviews an existing design system in Figma against a migration-safe quality bar. One pack for Cursor, Codex, and Claude.

## What it does

1. Inspects the connected Figma file.
2. Fills project YAML from the file (`workflowMode: review-existing`, `platform: web`).
3. Runs **Gate A** (read-only audit) against [references/design-system-rules.md](references/design-system-rules.md).
4. Measures contrast with [scripts/contrast.mjs](scripts/contrast.mjs) or Figma’s built-in WCAG checker.
5. Stops. Repair (Gates B–E) starts only after an explicit request.

## Install

Clone this repository and copy — or symlink — the folder into the agent’s skill root. Keep `SKILL.md`, `references/`, `scripts/`, and `agents/` together.

| Agent | Path |
| --- | --- |
| Cursor | `~/.cursor/skills/figma-ds-review/` |
| Codex | `~/.codex/skills/figma-ds-review/` |
| Claude | `~/.claude/skills/figma-ds-review/` |

Do not install into `~/.cursor/skills-cursor/` — that directory is reserved for Cursor’s built-in skills.

Restart the agent if the skill does not appear.

## Use

Ask the agent to audit the open Figma design-system file. Typical prompt:

```text
Review this Figma design-system file with figma-ds-review.
Inspect via Figma MCP. Gate A only unless I ask to repair.
```

Hard stops and load map are in [`SKILL.md`](SKILL.md). On Gate A the agent classifies composition (`Primitive` → `Page`) and can recommend Variable naming; it does not assemble a new library. Before scoring a family, the agent should read [`references/family-exemplar-action.md`](references/family-exemplar-action.md) as a *decision pattern*, not as a Button spec. The file under review wins.

## Contrast

WCAG 2.2 AA, same relative-luminance method as Figma’s color picker. Unmeasured pairs are `unverified`. APCA does not fail a review.

| Kind | Threshold |
| --- | --- |
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Non-text UI | 3:1 |

```bash
node scripts/contrast.mjs '#6b7280' '#ffffff'
node scripts/contrast.mjs 6b7280 ffffff large
node scripts/contrast.mjs 6b7280 ffffff ui
```

Requires Node.js 18+.

## Layout

```text
figma-ds-review/
├── SKILL.md                              Agent contract and load map
├── AGENTS.md                             How to edit this pack
├── agents/openai.yaml                    Codex display metadata
├── references/design-system-rules.md     Quality bar (v2.3)
├── references/family-exemplar-action.md  Worked decision card
├── references/audit-output.example.md    Gate A report shape
└── scripts/contrast.mjs                  WCAG 2 contrast CLI
```

## Policy

- Review the file that exists. Do not recreate it from scratch because it looks messy.
- Web only. A 390 px frame is mobile web, not iOS.
- Do not pass contrast or hit area by eye.
- Hit area is the **component frame**, not the glyph: below 24×24 px fails; primary mobile-web controls should be 44×44 px.
- Unknown external consumers are not a finding.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security reports: [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE). Figma is a trademark of Figma, Inc. This project is not affiliated with Figma.
