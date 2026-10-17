import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolveRouteSourcePath } from "./helpers/route-source-path.mjs";

test("work-area customer copy explains coverage without editorial SEO jargon", () => {
  const source = readFileSync(
    new URL("../" + resolveRouteSourcePath("app/werkgebied/page.js"), import.meta.url), "utf8"
  );
  for (const phrase of [
    "zonder dubbele Antwerpen-pagina", "hoofdlanding",
    "indexeerbare pagina", "onderzoeksroute", "zonder JavaScript leesbaar"
  ]) {
    assert.ok(!source.includes(phrase), `customer copy contains: ${phrase}`);
  }
  assert.match(source, /304 gemeenten/);
  assert.ok(source.includes("MunicipalityFilter groups={directoryGroups}"));
});
