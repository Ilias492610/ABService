import test from "node:test";
import assert from "node:assert/strict";

import { faultGuides } from "../content/fault-guides.mjs";

test("published fault guides use official sources and actionable model caveats", () => {
  const published = faultGuides.filter((guide) => guide.status === "published");

  assert.deepEqual(published.map((guide) => guide.slug), [
    "vaillant",
    "bulex",
    "bosch",
    "junkers",
  ]);
  assert.ok(published.every((guide) => guide.sourceUrl.startsWith("https://www.")));
  assert.ok(published.every((guide) => guide.codes.length >= 3));
  assert.ok(published.every((guide) => guide.modelWarning.includes("model")));
});

test("Bosch and Junkers guides cite official Bosch documentation and name their scope", () => {
  const guides = faultGuides.filter((guide) => ["bosch", "junkers"].includes(guide.slug));

  assert.ok(guides.every((guide) => guide.status === "published"));
  assert.ok(
    guides.every((guide) =>
      guide.sourceUrl.startsWith("https://www.bosch-homecomfort.com/")
    )
  );
  assert.ok(guides.every((guide) => guide.documentationUrl));
  assert.ok(guides.every((guide) => guide.modelWarning.includes("Serie -4")));
});
