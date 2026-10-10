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
