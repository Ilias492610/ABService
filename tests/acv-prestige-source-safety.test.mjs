import { beforeAvantaGuide, beforeAvantaRegistry } from "./fixtures/avanta-overview-source-safety.mjs";
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
import { acvFacts as facts, beforeAcvGuide, beforeAcvRegistry, beforeAcvMetadata, beforeAcvHtml } from "./fixtures/acv-prestige-source-safety.mjs";
import { beforeIntergasGuide, beforeIntergasRegistry } from "./fixtures/intergas-prestige-source-context.mjs";
import { beforeFaultReadingHtml } from "./fixtures/fault-reading-clearance.mjs";

const guide = getFaultGuide("acv"), catalog = guide.catalogs[0];
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");

// A wrong/omitted model or universal-fit wording in actual consumer output fails.
test("ACV scope and warning bound the selected table to four historical MkIII models and revision", () => {
  assert.equal(catalog.scope, facts.scope);
  assert.equal(guide.modelWarning, facts.warning);
  assert.equal(catalog.sourceLabel, facts.label);
  assert.equal(guide.sourceLabel, facts.label);
  assert.equal(catalog.sourceUrl, facts.url);
  assert.equal(catalog.sourcePages, facts.pages);
  assert.match(guide.modelWarning, /historische.*meerdere landen/);
  assert.match(guide.modelWarning, /artikelnummers en firmwarecompatibiliteit.*niet vastgesteld/);
  assert.doesNotMatch(catalog.scope, /debietmelding|Alle foutcodes/);
});

// Misclassifying sensor/temperature faults as refill advice fails per real row.
test("ACV sensor and temperature-difference faults no longer suggest filling or diagnose pressure direction", () => {
  for (const [code, action] of Object.entries(facts.actions)) {
    const row = catalog.codes.find(r => r.code === code);
    assert.equal(row.userAction, action, code);
    assert.doesNotMatch(row.userAction, /vul-|ontluchtingsinstructie|bijvullen/, code);
  }
  assert.equal(catalog.codes.find(r => r.code === "E37").meaning, facts.e37Meaning);
  assert.doesNotMatch(catalog.codes.find(r => r.code === "E37").meaning, /te laag|te hoog|\d.*bar|buiten.*bereik/);
});

// Literal printed identifiers/merged E03, not generated range or LOP import.
test("the selected ACV table retains exactly23 E identifiers plus NTC and preserves exact search boundaries", () => {
  assert.deepEqual(catalog.codes.map(r => r.code), facts.codes);
  assert.equal(guide.codeEntryCount, 24);
  assert.match(catalog.codes.find(r => r.code === "E03").meaning, /maximumthermostaat.*of T1\/T2.*110/);
  assert.equal(catalog.codes.find(r => r.code === "NTC").meaning, "Het maximale temperatuurverschil tussen T1 en T2 is overschreden.");
  const search = q => filterFaultCatalogs(guide.catalogs, q, "all").flatMap(c => c.codes.map(r => r.code));
  assert.deepEqual(search("E01"), ["E01"]);
  assert.deepEqual(search("E1"), []);
  assert.deepEqual(search("NTC1"), ["E11", "E30", "E31"]);
  assert.deepEqual(search("LOP"), []);
  assert.deepEqual(search("UNKNOWN50"), []);
});

// Real metadata/OG/Twitter/sitemap cannot overpromise all-brand/newest coverage.
test("ACV metadata and sitemap expose historical coverage with only its genuine modification date", () => {
  const page = getPageDefinition("/foutcodes/acv"), meta = buildPageMetadata(page);
  assert.equal(meta.description, facts.description);
  assert.equal(meta.openGraph.description, facts.description);
  assert.equal(meta.twitter.description, facts.description);
  assert.equal(meta.alternates.canonical, "https://www.abservice24.be/foutcodes/acv");
  assert.equal(meta.robots.index, true);
  assert.equal(page.lastModified, "2026-10-11");
  assert.equal(buildSitemapEntries(pageRegistry).find(e => e.url === meta.alternates.canonical).lastModified, "2026-10-11");
  assert.equal(hash(beforeAcvMetadata(meta, "acv")), facts.preservation.metadata);
});

// Actual complete route subtree must render safe corrected copy and old CTA.
test("ACV real SSR exposes every selected row, safe action, source scope and native context CTA", async () => {
  const html = await renderFaultGuide("acv");
  assert.equal((html.match(/class="fault-code-card"/g) || []).length, 24);
  assert.equal((html.match(/class="fault-group"/g) || []).length, 1);
  assert.equal((html.match(/<option /g) || []).length, 2);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.ok(html.includes(facts.warning));
  assert.ok(html.includes(facts.scope));
  assert.ok(html.includes(facts.label));
  for (const [code, action] of Object.entries(facts.actions)) {
    const article = html.match(new RegExp(`<article class="fault-code-card">(?:(?!<article)[\\s\\S])*?<code>${code}<\\/code>[\\s\\S]*?<\\/article>`))?.[0];
    assert.ok(article?.includes(action), code);
  }
  assert.match(html, /\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
  assert.equal(hash(beforeAcvHtml(beforeFaultReadingHtml(html), "acv")), facts.preservation.html);
});

// Integrity only: full genuine baseline, no source completeness certification.
test("all other12 full guides and all registry fields preserve the genuine64 captures", () => {
  assert.equal(hash(faultGuides.filter(g => g.slug !== "acv").map(beforeAvantaGuide).map(beforeViessmannGuide).map(beforeAtagGuide).map(beforeIthoGuide).map(beforeFerroliGuide).map(beforeNefitGuide).map(beforeIntergasGuide)), facts.preservation.otherTwelveGuides);
  assert.equal(hash(pageRegistry.map(beforeAvantaRegistry).map(beforeViessmannRegistry).map(beforeAtagRegistry).map(beforeIthoRegistry).map(beforeFerroliRegistry).map(beforeNefitRegistry).map(beforeIntergasRegistry).map(beforeAcvRegistry)), facts.preservation.allRegistry);
  assert.equal(hash(beforeAcvGuide(guide)), facts.preservation.guide);
  assert.equal(hash(beforeAcvGuide(guide).codes), facts.preservation.codes);
  assert.equal(faultGuides.reduce((n,g) => n + g.codeEntryCount, 0), 1596);
});
