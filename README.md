# figma-ds-review

Одно ядро правил для ревью **существующей веб** design system в Figma. Не три разных skill под Cursor / Codex / Claude: одни и те же файлы, разные папки установки.

Канон: [`references/design-system-rules.md`](references/design-system-rules.md) (v2.3).  
Вход в файл — Figma plugin / MCP. Скриншоты не обязательны.

## Установка

Склонируйте репозиторий и скопируйте папку (или сделайте symlink) в skill-root агента.

**Cursor** — личный skill:

```text
~/.cursor/skills/figma-ds-review/
```

**Codex:**

```text
~/.codex/skills/figma-ds-review/
```

**Claude:** каталог skills вашего Claude-окружения, например:

```text
~/.claude/skills/figma-ds-review/
```

Внутри должны быть `SKILL.md`, `references/`, `scripts/`, `agents/`. Не кладите копию в `~/.cursor/skills-cursor/` — это служебная папка Cursor.

После копирования перезапустите агент / Codex, если skill не подхватился.

## Что внутри

| Файл | Зачем |
|---|---|
| `SKILL.md` | Контракт агента: hard stops, Gate A, формат аудита |
| `references/design-system-rules.md` | Полный quality bar |
| `references/family-exemplar-action.md` | Образец *решения* на семье Action, не спецификация кнопки |
| `scripts/contrast.mjs` | WCAG 2 contrast ratio, тот же метод, что у Figma color picker |
| `agents/openai.yaml` | Подписи для Codex |

## Контраст

```bash
node scripts/contrast.mjs '#6b7280' '#ffffff'
node scripts/contrast.mjs 6b7280 ffffff large
node scripts/contrast.mjs 6b7280 ffffff ui
```

Пороги AA: обычный текст 4.5:1, крупный текст и UI 3:1. Не измеряли — `unverified`. APCA не валит ревью.

## Поведение

- Только review существующего файла. С нуля не собираем.
- Repair — только после явной просьбы.
- Web only. 390 px — mobile web, не iOS.
