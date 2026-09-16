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

const pass = run("#111111", "#ffffff");
assert.equal(pass.status, 0);
const passBody = parse(pass);
assert.equal(passBody.ratio, 18.88);
assert.equal(passBody.status, "pass");

const gray = run("6b7280", "ffffff");
assert.equal(gray.status, 0);
assert.equal(parse(gray).ratio, 4.83);

const fail = run("#777777", "#888888");
assert.equal(fail.status, 1);
assert.equal(parse(fail).status, "fail");

const usage = run();
assert.equal(usage.status, 2);

console.log("ok");
