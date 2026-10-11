import { beforeViessmannGuide, beforeViessmannRegistry } from "./fixtures/viessmann-overview-source-safety.mjs";
import { beforeAtagGuide, beforeAtagRegistry } from "./fixtures/atag-overview-source-safety.mjs";
import { beforeIthoGuide, beforeIthoRegistry } from "./fixtures/itho-base-cube-source-safety.mjs";
import { beforeFerroliGuide, beforeFerroliRegistry } from "./fixtures/ferroli-bluesense-source-safety.mjs";
import { beforeNefitGuide, beforeNefitRegistry } from "./fixtures/nefit-proline-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { faultGuides, getFaultGuide } from "../content/fault-guides.mjs";
import { pageRegistry, getPageDefinition } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import { intergasFacts as facts, beforeIntergasGuide, beforeIntergasRegistry, beforeIntergasMetadata, beforeIntergasHtml } from "./fixtures/intergas-prestige-source-context.mjs";
import { beforeFaultReadingHtml } from "./fixtures/fault-reading-clearance.mjs";
const guide = getFaultGuide("intergas"), catalog = guide.catalogs[0];
const hash = v => createHash("sha256").update(typeof v === "string" ? v : JSON.stringify(v)).digest("hex");

test("Intergas scope requires the actual Prestige A CW6 fault LED and temperature display, not normal service states", () => {
  assert.equal(catalog.scope, facts.scope);
  assert.equal(guide.modelWarning, facts.warning);
  assert.equal(catalog.sourceLabel, facts.label);
  assert.equal(guide.sourceLabel, facts.label);
  assert.equal(catalog.sourceUrl, facts.url);
  assert.match(guide.modelWarning, /knipperende storingsled.*temperatuurdisplay.*servicedisplay.*normale bedrijfstoestand/);
  assert.match(guide.modelWarning, /revisie, artikelnummer en firmwarecompatibiliteit.*niet vastgesteld/);
  assert.match(guide.modelWarning, /geen bevestiging van Belgische toestelcompatibiliteit/);
});
test("Intergas code2 drops an unsupported alternative diagnosis while every existing safe action remains unchanged", () => {
  assert.equal(catalog.codes.find(r => r.code === "2").meaning, facts.meaning2);
  assert.doesNotMatch(catalog.codes.find(r => r.code === "2").meaning, /onlogische waarden/);
  assert.equal(hash(beforeIntergasGuide(guide).codes), facts.preservation.codes);
  for (const r of catalog.codes) assert.doesNotMatch(r.userAction, /\bvervang\b|\bstel de gas|\bkortsluit\b|\boverbrug\b|\bopen.*mantel.*wel/);
});
test("all20 literal Intergas numbers search their11 original groups without inventing normal or padded codes", () => {
  assert.deepEqual(catalog.codes.map(r => r.code), facts.codes);
  assert.equal(guide.codeEntryCount, 11);
  const search = q => filterFaultCatalogs(guide.catalogs,q,facts.id).flatMap(c=>c.codes.map(r=>r.code));
  for (const number of facts.numericIdentifiers) assert.deepEqual(search(number), [facts.codes.find(c=>c.split(" / ").includes(number))], number);
  for (const q of ["3", "7", "01", "04", "UNKNOWN52"]) assert.deepEqual(search(q), [], q);
  assert.deepEqual(search("S1"), [facts.codes[0], "2"]);
  assert.deepEqual(search("S2"), [facts.codes[1], "2"]);
  assert.deepEqual(search("onlogische waarden"), []);
  assert.deepEqual(search(""), facts.codes);
});
test("real Intergas metadata and sitemap expose selected model context and only its genuine new date", () => {
  const page=getPageDefinition("/foutcodes/intergas"),meta=buildPageMetadata(page);
  assert.equal(meta.description,facts.description);
  assert.equal(meta.openGraph.description,facts.description);
  assert.equal(meta.twitter.description,facts.description);
  assert.equal(meta.alternates.canonical,"https://www.abservice24.be/foutcodes/intergas");
  assert.equal(meta.robots.index,true);
  assert.equal(page.lastModified,"2026-10-11");
  assert.equal(buildSitemapEntries(pageRegistry).find(e=>e.url===meta.alternates.canonical).lastModified,"2026-10-11");
  assert.equal(hash(beforeIntergasMetadata(meta,"intergas")),facts.preservation.metadata);
});
test("actual Intergas SSR retains all11 groups and source/contact while exposing the display context", async () => {
  const html=await renderFaultGuide("intergas");
  assert.equal((html.match(/class="fault-code-card"/g)||[]).length,11);
  assert.equal((html.match(/class="fault-group"/g)||[]).length,1);
  assert.equal((html.match(/<option /g)||[]).length,2);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  for(const value of [facts.warning,facts.scope,facts.label,facts.meaning2])assert.ok(html.includes(value));
  assert.ok(!html.includes(facts.before.meaning2));
  assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
  assert.equal(hash(beforeIntergasHtml(beforeFaultReadingHtml(html),"intergas")),facts.preservation.html);
});
test("allother12 complete guides and82registry preserve genuine64d7 captures outside the exact Intergas leaves", () => {
  assert.equal(hash(faultGuides.filter(g=>g.slug!=="intergas").map(beforeViessmannGuide).map(beforeAtagGuide).map(beforeIthoGuide).map(beforeFerroliGuide).map(beforeNefitGuide)),facts.preservation.otherTwelveGuides);
  assert.equal(hash(beforeIntergasGuide(guide)),facts.preservation.guide);
  assert.equal(hash(pageRegistry.map(beforeViessmannRegistry).map(beforeAtagRegistry).map(beforeIthoRegistry).map(beforeFerroliRegistry).map(beforeNefitRegistry).map(beforeIntergasRegistry)),facts.preservation.allRegistry);
  assert.equal(faultGuides.reduce((n,g)=>n+g.codeEntryCount,0),1596);
});
