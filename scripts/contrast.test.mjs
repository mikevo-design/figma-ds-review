#!/usr/bin/env node
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const script = path.join(path.dirname(fileURLToPath(import.meta.url)), "contrast.mjs");

function run(...args) {
  return spawnSync(process.execPath, [script, ...args], { encoding: "utf8" });
}

function parse(proc) {
  assert.equal(proc.error, undefined, proc.error && proc.error.message);
  const line = proc.stdout.trim();
  assert.ok(line, proc.stderr);
  return JSON.parse(line);
}

function assertInputError(proc, pattern) {
  assert.equal(proc.status, 2, proc.stderr);
  assert.equal(proc.stdout, "");
  assert.match(proc.stderr, pattern);
  assert.equal(proc.stderr.includes("    at "), false, proc.stderr);
  assert.equal(proc.stderr.includes("InputError"), false, proc.stderr);
}

const pass = run("#111111", "#ffffff");
assert.equal(pass.status, 0);
assert.equal(pass.stderr, "");
const passBody = parse(pass);
assert.equal(passBody.ratio, 18.88);
assert.equal(passBody.status, "pass");
assert.equal(passBody.compositedFg, undefined);
assert.equal(passBody.fg, "#111111");

const gray = run("6b7280", "ffffff");
assert.equal(gray.status, 0);
assert.equal(parse(gray).ratio, 4.83);

const fail = run("#777777", "#888888");
assert.equal(fail.status, 1);
assert.equal(fail.stderr, "");
assert.equal(parse(fail).status, "fail");

const usage = run();
assertInputError(usage, /Usage: node scripts\/contrast\.mjs/);

const badKind = run("#111111", "#ffffff", "huge");
assertInputError(badKind, /Kind must be normal, large, or ui/);

const badHex = run("#zzzzzz", "#ffffff");
assertInputError(badHex, /Invalid hex color: #zzzzzz/);

const shortHex = run("#12345", "#ffffff");
assertInputError(shortHex, /Invalid hex color: #12345/);

const translucentBg = run("#111111", "#ffffff80");
assertInputError(translucentBg, /Background must be opaque: #ffffff80/);

// #00000080 over white is straight-alpha source-over → rgb(127, 127, 127), 4:1.
const halfBlack = run("#00000080", "#ffffff");
assert.equal(halfBlack.status, 1);
const halfBlackBody = parse(halfBlack);
assert.equal(halfBlackBody.fg, "#00000080");
assert.equal(halfBlackBody.bg, "#ffffff");
assert.equal(halfBlackBody.compositedFg, "#7f7f7f");
assert.equal(halfBlackBody.ratio, 4);
assert.equal(halfBlackBody.status, "fail");

// #11111180 over white → unrounded rgb(135.533…), ratio 3.57 (nearest hex is #888888).
const overlay = run("#11111180", "#ffffff");
assert.equal(overlay.status, 1);
const overlayBody = parse(overlay);
assert.equal(overlayBody.compositedFg, "#888888");
assert.equal(overlayBody.ratio, 3.57);
assert.equal(overlayBody.status, "fail");

const overlayLarge = run("#11111180", "#ffffff", "large");
assert.equal(overlayLarge.status, 0);
assert.equal(parse(overlayLarge).status, "pass");
assert.equal(parse(overlayLarge).threshold, 3);

// #RGBA expands per channel. #0008 → #00000088, not #00000080.
const shorthand = run("#0008", "#fff");
const longhand = run("#00000088", "#ffffff");
assert.equal(shorthand.status, longhand.status);
const shorthandBody = parse(shorthand);
const longhandBody = parse(longhand);
assert.equal(shorthandBody.fg, "#00000088");
assert.equal(shorthandBody.ratio, longhandBody.ratio);
assert.equal(shorthandBody.compositedFg, longhandBody.compositedFg);
assert.equal(shorthandBody.ratio, 4.48);

// Opaque alpha is the same pair as a 6-digit color, with no composite step.
const opaqueAlpha = run("#111111ff", "#ffffff");
assert.equal(opaqueAlpha.status, 0);
const opaqueAlphaBody = parse(opaqueAlpha);
assert.equal(opaqueAlphaBody.fg, "#111111");
assert.equal(opaqueAlphaBody.ratio, 18.88);
assert.equal(opaqueAlphaBody.compositedFg, undefined);

// Fully transparent foreground composites to the background: a measured 1:1 fail.
const clear = run("#11111100", "#ffffff");
assert.equal(clear.status, 1);
const clearBody = parse(clear);
assert.equal(clearBody.ratio, 1);
assert.equal(clearBody.compositedFg, "#ffffff");
assert.equal(clearBody.status, "fail");

console.log("ok");
