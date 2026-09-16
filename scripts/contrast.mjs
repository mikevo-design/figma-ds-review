#!/usr/bin/env node
/**
 * WCAG 2 contrast ratio (relative luminance).
 * Same method as Figma's built-in color-picker checker.
 *
 * Usage:
 *   node scripts/contrast.mjs '#111111' '#ffffff'
 *   node scripts/contrast.mjs 111111 ffffff large
 *   node scripts/contrast.mjs 111111 ffffff ui
 *
 * Kind: normal (default, 4.5:1) | large (3:1) | ui (3:1)
 */

const THRESHOLD = {
  normal: 4.5,
  large: 3,
  ui: 3,
};

function parseHex(input) {
  let h = String(input).trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    throw new Error(`Invalid hex color: ${input}`);
  }
  return {
    hex: `#${h.toLowerCase()}`,
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
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
  const fg = parseHex(fgArg);
  const bg = parseHex(bgArg);
  const ratio = contrastRatio(fg, bg);
  const threshold = THRESHOLD[kind];
  const pass = ratio + 1e-9 >= threshold;
  const result = {
    fg: fg.hex,
    bg: bg.hex,
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
