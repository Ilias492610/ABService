import test from "node:test";
import assert from "node:assert/strict";

import { faultGuides } from "../content/fault-guides.mjs";

test("published fault guides use official sources and actionable model caveats", () => {
  const published = faultGuides.filter((guide) => guide.status === "published");

  assert.deepEqual(published.map((guide) => guide.slug), ["vaillant", "bulex"]);
  assert.ok(published.every((guide) => guide.sourceUrl.startsWith("https://www.")));
  assert.ok(published.every((guide) => guide.codes.length >= 3));
  assert.ok(published.every((guide) => guide.modelWarning.includes("model")));
});

test("unverified Bosch and Junkers guides remain noindex and contain no code claims", () => {
  const withheld = faultGuides.filter((guide) => ["bosch", "junkers"].includes(guide.slug));

  assert.ok(withheld.every((guide) => guide.status === "noindex"));
  assert.ok(withheld.every((guide) => guide.codes.length === 0));
});
