import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("production, lock metadata, CI and developer hint use the same pinned LTS major", async () => {
  const manifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const lock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
  assert.equal(manifest.engines.node, "24.x", "Avoid implicit future production major upgrades");
  assert.equal(lock.packages[""].engines.node, manifest.engines.node);
  const ci = await readFile(new URL("../.github/workflows/seo-quality.yml", import.meta.url), "utf8");
  assert.match(ci, /^\s+node-version: ["']?24["']?\s*$/m);
  assert.equal((await readFile(new URL("../.nvmrc", import.meta.url), "utf8")).trim(), "24");
});

test("CI pins reviewed native Node24 actions without broadening privileges or dropping gates", async () => {
  const ci = await readFile(new URL("../.github/workflows/seo-quality.yml", import.meta.url), "utf8");
  const actions = [...ci.matchAll(/^\s+- uses: (\S+)\s*(?:#.*)?$/gm)].map(([, action]) => action);
  assert.deepEqual(actions, [
    "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
    "actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1",
  ]);
  assert.match(ci, /^\s+contents: read\s*$/m);
  assert.doesNotMatch(ci, /pull_request_target|workflow_run|allow-unsafe-pr-checkout|write-all|contents: write|registry-url/);
  assert.match(ci, /^\s+cache: npm\s*$/m);
  for (const gate of ["npm ci", "npm run lint", "npm test", "npm audit --omit=dev", "npm run build", "npm run seo:audit -- http://localhost:3100"]) {
    assert.ok(ci.includes(gate), gate);
  }
});
