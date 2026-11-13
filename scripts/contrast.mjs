#!/usr/bin/env node
/**
 * WCAG 2 contrast ratio (relative luminance).
 * Same method as Figma's built-in color-picker checker.
 *
 * Usage:
 *   node scripts/contrast.mjs '#111111' '#ffffff'
 *   node scripts/contrast.mjs '#11111180' '#ffffff'
 *   node scripts/contrast.mjs 111111 ffffff large
 *   node scripts/contrast.mjs 111111 ffffff ui
 *
 * Colors: #RGB, #RGBA, #RRGGBB, #RRGGBBAA (leading # optional).
 * Alpha is the last byte, not Android #AARRGGBB.
 * A translucent foreground is composited (straight-alpha source-over)
 * onto the background before the ratio. The background must be opaque.
 * `ratio` uses the unrounded composite. `compositedFg` is the nearest
 * #rrggbb and can differ in the second decimal; do not re-measure it.
 *
 * Kind: normal (default, 4.5:1) | large (3:1) | ui (3:1)
 * Large text, when the caller chooses `large`, is ≥24 px regular
 * (18 pt) or ≥18.66 px bold (14 pt). This script does not read font size.
 *
 * Exit codes:
 *   0  measured pair meets the threshold
 *   1  measured pair is below the threshold (a contrast fail)
 *   2  input error (usage, kind, hex, or a translucent background).
 *      Not a contrast finding. Message on stderr, no stack trace.
 */

const THRESHOLD = {
  normal: 4.5,
  large: 3,
  ui: 3,
};

class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = "InputError";
  }
}

function parseHex(input) {
  const raw = String(input).trim();
  const body = raw.startsWith("#") ? raw.slice(1) : raw;
  if (
    !/^([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(
      body,
    )
  ) {
    throw new InputError(`Invalid hex color: ${raw}`);
  }
  const expanded =
    body.length === 3 || body.length === 4
      ? body
          .split("")
          .map((c) => c + c)
          .join("")
      : body;
  const hasAlpha = expanded.length === 8;
  const r = parseInt(expanded.slice(0, 2), 16);
  const g = parseInt(expanded.slice(2, 4), 16);
  const b = parseInt(expanded.slice(4, 6), 16);
  const a = hasAlpha ? parseInt(expanded.slice(6, 8), 16) : 255;
  const rgb = expanded.slice(0, 6).toLowerCase();
  const alpha = expanded.slice(6, 8).toLowerCase();
  const hex = a === 255 ? `#${rgb}` : `#${rgb}${alpha}`;
  return { hex, r, g, b, a };
}

function channel(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance({ r, g, b }) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function byteHex(c) {
  return Math.max(0, Math.min(255, Math.round(c)))
    .toString(16)
    .padStart(2, "0");
}

function composite(fg, bg) {
  if (bg.a !== 255) {
    throw new InputError(
      `Background must be opaque: ${bg.hex}. Flatten a translucent surface over the next opaque layer first.`,
    );
  }
  if (fg.a === 255) {
    return { r: fg.r, g: fg.g, b: fg.b, hex: null };
  }
  const a = fg.a / 255;
  const r = fg.r * a + bg.r * (1 - a);
  const g = fg.g * a + bg.g * (1 - a);
  const b = fg.b * a + bg.b * (1 - a);
  return {
    r,
    g,
    b,
    hex: `#${byteHex(r)}${byteHex(g)}${byteHex(b)}`,
  };
}

function round(n) {
  return Math.round(n * 100) / 100;
}

function main() {
  const [, , fgArg, bgArg, kindArg] = process.argv;
  if (!fgArg || !bgArg) {
    console.error(
      "Usage: node scripts/contrast.mjs <fgHex> <bgHex> [normal|large|ui]",
    );
    process.exit(2);
  }
  const kind = (kindArg || "normal").toLowerCase();
  if (!THRESHOLD[kind]) {
    console.error("Kind must be normal, large, or ui");
    process.exit(2);
  }

  let fg;
  let bg;
  let blended;
  try {
    fg = parseHex(fgArg);
    bg = parseHex(bgArg);
    blended = composite(fg, bg);
  } catch (err) {
    if (err instanceof InputError) {
      console.error(err.message);
      process.exit(2);
    }
    throw err;
  }

  const ratio = contrastRatio(blended, bg);
  const threshold = THRESHOLD[kind];
  const pass = ratio + 1e-9 >= threshold;
  const result = {
    fg: fg.hex,
    bg: bg.hex,
    ...(blended.hex ? { compositedFg: blended.hex } : {}),
    kind,
    ratio: round(ratio),
    threshold,
    pass,
    status: pass ? "pass" : "fail",
    method: "WCAG 2 relative luminance",
  };
  console.log(JSON.stringify(result, null, 2));
  process.exit(pass ? 0 : 1);
}

main();
