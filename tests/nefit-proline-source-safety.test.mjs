// Historical captures remove only the independently tested named Task80 addition.
import { beforeAtagManualsGuide, beforeAtagManualsRegistry } from "./fixtures/atag-manuals-history.mjs";
// Reconstruct only the separately verified Task77 addition for historical hashes.
import { beforeGb172Guide, beforeGb172Registry } from "./fixtures/buderus-gb172i2-history.mjs";
import { beforeCalentaGuide } from "./fixtures/calenta-legacy-source-safety.mjs";
import { beforeAvantaGuide, beforeAvantaRegistry } from "./fixtures/avanta-overview-source-safety.mjs";
import { beforeViessmannGuide, beforeViessmannRegistry } from "./fixtures/viessmann-overview-source-safety.mjs";
import { beforeAtagGuide, beforeAtagRegistry } from "./fixtures/atag-overview-source-safety.mjs";
import { beforeIthoGuide, beforeIthoRegistry } from "./fixtures/itho-base-cube-source-safety.mjs";
import { beforeFerroliGuide, beforeFerroliRegistry } from "./fixtures/ferroli-bluesense-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { faultGuides, getFaultGuide } from "../content/fault-guides.mjs";
import { pageRegistry, getPageDefinition } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { buildFaultCodeAliases } from "../libs/fault-code-aliases.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import { nefitFacts as facts, beforeNefitGuide, beforeNefitRegistry, beforeNefitMetadata, beforeNefitHtml } from "./fixtures/nefit-proline-source-safety.mjs";
import { beforeFaultHeroHtml, beforeIntergasCountGuide } from "./fixtures/fault-hero-clearance.mjs";
const guide = getFaultGuide("nefit-bosch"), catalog = guide.catalogs[0];
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");

test("Nefit historical source identity, exact three-model scope and unknown device-fit limits are explicit", () => {
  assert.equal(catalog.scope, facts.scope);
  assert.equal(guide.modelWarning, facts.warning);
  assert.equal(catalog.sourceLabel, facts.label);
  assert.equal(guide.sourceLabel, facts.label);
  assert.equal(catalog.sourceUrl, facts.url);
  assert.equal(catalog.sourcePages, facts.pages);
  assert.match(guide.modelWarning, /historische Nederlandse.*geen overzicht voor alle/);
  assert.match(guide.modelWarning, /revisie, artikelnummers en firmwarecompatibiliteit.*niet vastgesteld/);
});
test("Nefit source glyph is not a subcode: exactly78 literal identifiers retain54 explanation groups", () => {
  assert.equal(guide.codeEntryCount, 54);
  assert.equal(facts.sourceIdentifiers.length, 78);
  assert.deepEqual(catalog.codes.flatMap(r => buildFaultCodeAliases(r.code).filter(a => !a.includes(" / ") && !a.includes("-"))), facts.sourceIdentifiers);
  const search = q => filterFaultCatalogs(guide.catalogs, q, facts.id).flatMap(c => c.codes.map(r => r.code));
  for (const code of facts.sourceIdentifiers) assert.equal(search(code).length, 1, code);
  assert.deepEqual(search("9Y"), ["9Y"]);
  for (const q of ["9Y3", "9Y03", ...facts.excluded.filter(c => c !== "rE"), "UNKNOWN54"]) assert.deepEqual(search(q), [], q);
  // Task57 now handles this source's reset-in-progress display state explicitly;
  // it remains absent as a fault card, rather than matching unrelated prose.
  assert.ok(!catalog.codes.some(r => r.code === "rE"));
  assert.deepEqual(search("rE"), []);
  assert.equal(search("").length, 54);
});
test("all19 exact source-bound row changes, including alias correction, are independently asserted", () => {
  assert.equal(facts.rowChanges.length, 19);
  for (const change of facts.rowChanges) {
    const row = catalog.codes.find(r => r.code === (change.after.code || change.beforeCode));
    assert.ok(row, change.beforeCode);
    for (const [key, expected] of Object.entries(change.after)) assert.equal(row[key], expected, `${row.code} ${key}`);
  }
});
test("8C373/374 explicitly forbid user reset and retain manufacturer unlock plus gas/CO emergency boundaries", () => {
  for (const code of ["8C 373", "8C 374"]) {
    const action = catalog.codes.find(r => r.code === code).userAction;
    assert.match(action, /Reset het toestel niet/);
    assert.match(action, /ontgrendeling door de fabrikant/);
    assert.match(action, /gasgeur.*CO-melding.*veilige plaats.*112/);
    assert.doesNotMatch(action, /reset alleen wanneer|vul-|ontluchtingsinstructie/);
  }
});
test("pressure increase, high pressure and sensor faults never imply fill-first or controller gas-reset advice", () => {
  for (const code of ["2L 266", "2L 329", "C0 288", "C0 289", "7L 261 / 280", "9A 235", "9H 237 / 272", "9L 238 / 9P 239 / 9U 233", "9Y", "E1 242-245 / 247-249 / 255 / 257", "EA 246 / 252 / 253", "EC 251 / 256 / EF 254", "EH 250 / 258 / 262", "EL 259 / 279 / 290 / EP 287 / EY 263"]) {
    assert.doesNotMatch(catalog.codes.find(r => r.code === code)?.userAction || "MISSING", /vul-|ontluchtingsinstructie|Zonder gasgeur|reset alleen wanneer/);
  }
  assert.match(catalog.codes.find(r => r.code === "C0 288").meaning, /meer dan 5,7 bar.*of.*onderbroken/);
  assert.match(catalog.codes.find(r => r.code === "3F 273").meaning, /24 uur.*maximaal twee minuten.*niet automatisch een defect/);
  assert.match(catalog.codes.find(r => r.code === "4E 347").meaning, /automatische herstart na tien minuten/);
});
test("real Nefit metadata and sitemap date only the genuine changed model-bound page", () => {
  const page = getPageDefinition("/foutcodes/nefit-bosch"), meta = buildPageMetadata(page);
  assert.equal(meta.description, facts.description);
  assert.equal(meta.openGraph.description, facts.description);
  assert.equal(meta.twitter.description, facts.description);
  assert.equal(meta.alternates.canonical, "https://www.abservice24.be/foutcodes/nefit-bosch");
  assert.equal(page.lastModified, "2026-10-11");
  assert.equal(meta.robots.index, true);
  assert.equal(buildSitemapEntries(pageRegistry).find(e => e.url === meta.alternates.canonical).lastModified, "2026-10-11");
  assert.equal(hash(beforeNefitMetadata(meta, "nefit-bosch")), facts.preservation.metadata);
});
test("full54-row SSR, unchanged cards and each source/contact element preserve genuine pre-edit HTML", async () => {
  const html = await renderFaultGuide("nefit-bosch");
  assert.equal((html.match(/class="fault-code-card"/g) || []).length, 54);
  assert.equal((html.match(/<option /g) || []).length, 2);
  for (const value of [facts.warning, facts.scope, facts.label]) assert.ok(html.includes(value));
  assert.match(html, /\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
  assert.equal(hash(beforeNefitHtml(beforeFaultHeroHtml(html), "nefit-bosch")), facts.preservation.html);
});
test("full genuine13guides/82registry preserve every leaf except declared Nefit changes and Intergas count clarity", () => {
  assert.equal(hash(beforeNefitGuide(guide)), facts.preservation.guide);
  assert.equal(hash(beforeNefitGuide(guide).codes), facts.preservation.codes);
  assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).filter(g => g.slug !== "nefit-bosch").map(beforeIntergasCountGuide).map(beforeCalentaGuide).map(beforeAvantaGuide).map(beforeViessmannGuide).map(beforeAtagGuide).map(beforeIthoGuide).map(beforeFerroliGuide)), facts.preservation.otherTwelveGuides);
  assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).map(beforeCalentaGuide).map(beforeAvantaGuide).map(beforeViessmannGuide).map(beforeAtagGuide).map(beforeIthoGuide).map(beforeFerroliGuide).map(beforeNefitGuide).map(beforeIntergasCountGuide)), facts.preservation.allGuides);
  assert.equal(hash(pageRegistry.map(beforeAtagManualsRegistry).map(beforeGb172Registry).map(beforeAvantaRegistry).map(beforeViessmannRegistry).map(beforeAtagRegistry).map(beforeIthoRegistry).map(beforeFerroliRegistry).map(beforeNefitRegistry)), facts.preservation.allRegistry);
  assert.equal(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).reduce((n, g) => n + g.codeEntryCount, 0), 1596);
});
