// Reconstruct only independently tested Task83 before earlier named history inverses.
import {beforeTzerraGuide,beforeTzerraRegistry,beforeTzerraHtml,beforeTzerraMetadata} from "./fixtures/tzerra-ace-matic-history.mjs";
const faultGuides=liveFaultGuides.map(beforeTzerraGuide);
const getFaultGuide=slug=>beforeTzerraGuide(liveGetFaultGuide(slug));
const getPageDefinition=path=>beforeTzerraRegistry(liveGetPageDefinition(path));
const renderFaultGuide=async slug=>beforeTzerraHtml(await liveRenderFaultGuide(slug),slug);
// Historical captures remove only the independently tested named Task80 addition.
import { beforeAtagManualsGuide, beforeAtagManualsHtml, beforeAtagManualsMetadata, beforeAtagManualsRegistry } from "./fixtures/atag-manuals-history.mjs";
// Historical contracts subtract only the independently tested Task77 addition.
import { beforeGb172Guide, beforeGb172Registry, beforeGb172Metadata, beforeGb172Html } from "./fixtures/buderus-gb172i2-history.mjs";
import { beforeCalentaGuide, beforeCalentaHtml } from "./fixtures/calenta-legacy-source-safety.mjs";
import { beforeAvantaGuide, beforeAvantaRegistry, beforeAvantaMetadata, beforeAvantaHtml } from "./fixtures/avanta-overview-source-safety.mjs";
import { beforeViessmannGuide, beforeViessmannRegistry, beforeViessmannMetadata, beforeViessmannHtml } from "./fixtures/viessmann-overview-source-safety.mjs";
import { beforeAtagGuide, beforeAtagRegistry, beforeAtagMetadata, beforeAtagHtml } from "./fixtures/atag-overview-source-safety.mjs";
import { beforeIthoGuide, beforeIthoRegistry, beforeIthoMetadata, beforeIthoHtml } from "./fixtures/itho-base-cube-source-safety.mjs";
import { beforeFerroliGuide, beforeFerroliRegistry, beforeFerroliMetadata, beforeFerroliHtml } from "./fixtures/ferroli-bluesense-source-safety.mjs";
import { beforeNefitGuide, beforeNefitRegistry, beforeNefitMetadata, beforeNefitHtml } from "./fixtures/nefit-proline-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { faultGuides as liveFaultGuides, getFaultGuide as liveGetFaultGuide } from "../content/fault-guides.mjs";
import { getPageDefinition as liveGetPageDefinition } from "../content/site-content.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { renderFaultGuide as liveRenderFaultGuide, faultGuideRoute, paramsFor, faultGuideRenderEvents } from "./helpers/fault-guide-runtime.mjs";
import { guideBaseline, modelHelpHtml } from "./fixtures/bulex-model-help-baseline.mjs";
import { beforeThemaABGuide, beforeThemaABHtml } from "./fixtures/bulex-thema-condens-ab.mjs";
import { beforeBoschScopeGuide, beforeBoschScopeRegistry, beforeBoschScopeMetadata, beforeBoschScopeHtml } from "./fixtures/bosch-junkers-source-boundaries.mjs";
import { beforeAcvGuide, beforeAcvRegistry, beforeAcvMetadata, beforeAcvHtml } from "./fixtures/acv-prestige-source-safety.mjs";
import { beforeIntergasGuide, beforeIntergasRegistry, beforeIntergasMetadata, beforeIntergasHtml } from "./fixtures/intergas-prestige-source-context.mjs";
import { beforeFaultReadingHtml } from "./fixtures/fault-reading-clearance.mjs";

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
  assert.equal(guide.codeEntryCount, 74);
  assert.equal((bulexHtml.match(/class="fault-code-card"/g) || []).length, 74);
  const f54 = filterFaultCatalogs(guide.catalogs, "F54", "all");
  assert.equal(f54.length, 1);
  assert.equal(f54[0].id, "bulex-publiek-overzicht");
  assert.equal(guide.catalogs[1].id, "bulex-thema-condens");
  assert.equal(filterFaultCatalogs(guide.catalogs, "F54", "bulex-thema-condens").length, 0);
  assert.equal((bulexHtml.match(/<option /g) || []).length, 4);
});

test("all thirteen complete metadata, registry and guide objects remain exactly the pre-edit captures", async () => {
  assert.deepEqual(faultGuides.map(({ slug }) => slug), guideBaseline.map(([slug]) => slug));
  for (const [slug, , metadata, registry, guide] of guideBaseline) {
    assert.equal(sha(beforeBoschScopeMetadata(beforeAcvMetadata(beforeIntergasMetadata(beforeNefitMetadata(beforeFerroliMetadata(beforeIthoMetadata(beforeAtagMetadata(beforeViessmannMetadata(beforeAvantaMetadata(beforeGb172Metadata(beforeAtagManualsMetadata(beforeTzerraMetadata(await faultGuideRoute.generateMetadata(paramsFor(slug)), slug), slug), slug), slug), slug), slug), slug), slug), slug), slug), slug), slug)), metadata, `${slug} metadata before only separately tested Task49/50/52/59 descriptions`);
    assert.equal(sha(beforeBoschScopeRegistry(beforeAcvRegistry(beforeIntergasRegistry(beforeNefitRegistry(beforeFerroliRegistry(beforeIthoRegistry(beforeAtagRegistry(beforeViessmannRegistry(beforeAvantaRegistry(beforeGb172Registry(beforeAtagManualsRegistry(getPageDefinition(`/foutcodes/${slug}`))))))))))))), registry, `${slug} registry before only Task49/50/52/59 descriptions/date`);
    assert.equal(sha(beforeThemaABGuide(beforeBoschScopeGuide(beforeAcvGuide(beforeIntergasGuide(beforeNefitGuide(beforeFerroliGuide(beforeIthoGuide(beforeAtagGuide(beforeViessmannGuide(beforeAvantaGuide(beforeCalentaGuide(beforeGb172Guide(beforeAtagManualsGuide(getFaultGuide(slug))))))))))))))), guide, `${slug} entire guide before only separately tested Task48/49/50/52/59 changes`);
  }
});

test("all thirteen actual page renders preserve their full original HTML except only the exact Bulex help block", async () => {
  for (const [slug, htmlHash] of guideBaseline) {
    const html = beforeGb172Html(beforeAtagManualsHtml(beforeFaultReadingHtml(await renderFaultGuide(slug)), slug), slug);
    if (slug === "bulex") {
      assert.equal(html.split(modelHelpHtml).length, 2, "exactly one complete new block");
      assert.equal(sha(beforeThemaABHtml(html).replace(modelHelpHtml, "")), htmlHash, "full Bulex HTML before only the separately tested A/B addition");
    } else {
      assert.doesNotMatch(html, /bulex-model-help-title/);
      assert.equal(sha(beforeBoschScopeHtml(beforeAcvHtml(beforeIntergasHtml(beforeNefitHtml(beforeFerroliHtml(beforeIthoHtml(beforeAtagHtml(beforeViessmannHtml(beforeAvantaHtml(beforeCalentaHtml(html, slug), slug), slug), slug), slug), slug), slug), slug), slug), slug)), htmlHash, `${slug} full HTML preservation before only Task49/50/52/59 source-bound leaves and Task53 marker`);
    }
  }
});

test("guide rendering and new static handoff send no analytics or contact request", () => {
  assert.deepEqual(faultGuideRenderEvents, []);
});
