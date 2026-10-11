import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { faultGuides, getFaultGuide } from "../content/fault-guides.mjs";
import { getPageDefinition } from "../content/site-content.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { renderFaultGuide, faultGuideRoute, paramsFor, faultGuideRenderEvents } from "./helpers/fault-guide-runtime.mjs";
import { guideBaseline, modelHelpHtml } from "./fixtures/bulex-model-help-baseline.mjs";

const sha = (value) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const bulexHtml = await renderFaultGuide("bulex");

test("Bulex renders the literal safely unknown or unlisted model handoff before its real catalog", () => {
  assert.ok(bulexHtml.includes(modelHelpHtml), "missing complete, source-bounded model handoff");
  assert.ok(bulexHtml.indexOf(modelHelpHtml) < bulexHtml.indexOf('class="fault-catalog"'));
  assert.equal((bulexHtml.match(/id="bulex-model-help-title"/g) || []).length, 1);
  assert.equal((bulexHtml.match(/<h1[ >]/g) || []).length, 1);
});

test("the model help has native official-document and context-preserving contact anchors, no new required model field", () => {
  const help = bulexHtml.match(/<section class="answer-box" aria-labelledby="bulex-model-help-title">[\s\S]*?<\/section>/)?.[0];
  assert.ok(help, "missing rendered model help");
  assert.match(help, /<a href="https:\/\/www\.bulex\.be\/particulier\/documentatie\/technische-documentaties\/handleidingen\/" class="underline" target="_blank" rel="noreferrer">/);
  assert.match(help, /<a href="\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier" class="underline">vraag hulp/);
  assert.doesNotMatch(help, /<(button|input|select|form|script)\b|class="button"/);
  assert.match(help, /model nog onbekend is/);
});

test("Bulex retains every real catalog row and the F54 general-overview versus FAS65 boundary", () => {
  const guide = getFaultGuide("bulex");
  assert.equal(guide.codeEntryCount, 43);
  assert.equal((bulexHtml.match(/class="fault-code-card"/g) || []).length, 43);
  const f54 = filterFaultCatalogs(guide.catalogs, "F54", "all");
  assert.equal(f54.length, 1);
  assert.equal(f54[0].id, "bulex-publiek-overzicht");
  assert.equal(guide.catalogs[1].id, "bulex-thema-condens");
  assert.equal(filterFaultCatalogs(guide.catalogs, "F54", "bulex-thema-condens").length, 0);
  assert.equal((bulexHtml.match(/<option /g) || []).length, 3);
});

test("all thirteen complete metadata, registry and guide objects remain exactly the pre-edit captures", async () => {
  assert.deepEqual(faultGuides.map(({ slug }) => slug), guideBaseline.map(([slug]) => slug));
  for (const [slug, , metadata, registry, guide] of guideBaseline) {
    assert.equal(sha(await faultGuideRoute.generateMetadata(paramsFor(slug))), metadata, `${slug} metadata`);
    assert.equal(sha(getPageDefinition(`/foutcodes/${slug}`)), registry, `${slug} registry`);
    assert.equal(sha(getFaultGuide(slug)), guide, `${slug} entire guide`);
  }
});

test("all thirteen actual page renders preserve their full original HTML except only the exact Bulex help block", async () => {
  for (const [slug, htmlHash] of guideBaseline) {
    const html = await renderFaultGuide(slug);
    if (slug === "bulex") {
      assert.equal(html.split(modelHelpHtml).length, 2, "exactly one complete new block");
      assert.equal(sha(html.replace(modelHelpHtml, "")), htmlHash, "full Bulex HTML preservation");
    } else {
      assert.doesNotMatch(html, /bulex-model-help-title/);
      assert.equal(sha(html), htmlHash, `${slug} full HTML preservation`);
    }
  }
});

test("guide rendering and new static handoff send no analytics or contact request", () => {
  assert.deepEqual(faultGuideRenderEvents, []);
});
