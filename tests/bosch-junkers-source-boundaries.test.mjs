import { beforeFerroliGuide, beforeFerroliRegistry } from "./fixtures/ferroli-bluesense-source-safety.mjs";
import { beforeNefitGuide, beforeNefitRegistry } from "./fixtures/nefit-proline-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { boschCatalogs, junkersCatalogs } from "../content/fault-catalogs.mjs";
import { faultGuides, getFaultGuide } from "../content/fault-guides.mjs";
import { getPageDefinition, pageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import { boschBoundaryFacts as facts, beforeBoschScopeGuide, beforeBoschScopeRegistry, beforeBoschScopeHtml } from "./fixtures/bosch-junkers-source-boundaries.mjs";
import { beforeAcvGuide, beforeAcvRegistry } from "./fixtures/acv-prestige-source-safety.mjs";
import { beforeIntergasGuide, beforeIntergasRegistry } from "./fixtures/intergas-prestige-source-context.mjs";
import { beforeFaultReadingHtml } from "./fixtures/fault-reading-clearance.mjs";

test("six shared scopes identify actual chapter selections rather than all brand or table coverage", () => {
  assert.strictEqual(boschCatalogs, junkersCatalogs);
  assert.deepEqual(boschCatalogs.map(c => c.id), facts.entries.map(e => e.id));
  for (const fact of facts.entries) {
    const c = boschCatalogs.find(c => c.id === fact.id);
    assert.equal(c.title, fact.title);
    assert.equal(c.sourcePages, fact.pages);
    assert.equal(c.sourceUrl, facts.url);
    assert.equal(c.codes.length, fact.rows);
    assert.equal(c.scope, fact.scope);
    assert.doesNotMatch(c.scope, /^Alle |De volledige storingscodelijst/);
  }
});

test("both visible warnings disclose unknown edition and exact device manual rather than universal fit", () => {
  for (const slug of ["bosch", "junkers"]) {
    const warning = getFaultGuide(slug).modelWarning;
    assert.equal(warning, facts.newWarning);
    assert.match(warning, /Nederlandstalige.*Gids voor de installateur/);
    assert.match(warning, /Publicatiedatum en revisie.*niet vastgesteld/);
    assert.match(warning, /typeplaatje, bouwjaar, volledige code en eventuele subcode.*gebruikershandleiding/);
    assert.match(warning, /gesloten onderdelen.*bevoegde technicus/);
    assert.doesNotMatch(warning, /nieuwste|Belgische modellen|volgt alle|neemt alle/);
  }
});

test("2013/2015 generations, graphic omissions and actual conditional families remain visible", () => {
  const byId = id => boschCatalogs.find(c => c.id === id);
  assert.match(byId("bosch-serie-4").scope, /2013.*afzonderlijke HMI.*2015.*geen uitwisselbaarheid/);
  assert.match(byId("bosch-serie-4").scope, /CerapurAero.*alleen.*modelvoorwaarde/);
  assert.match(byId("bosch-serie-4").scope, /276 en 370.*geen verzonnen hoofdcode/);
  assert.match(byId("bosch-serie-3").scope, /29.*Twee grafische displaymeldingen na H5.*niet.*volledige brontabel/);
  assert.match(byId("bosch-serie-3").scope, /A9.*CerapurModul en CerapurModul-Smart.*niet iedere/);
  assert.match(byId("bosch-serie-2").scope, /1997-2006.*meerdere betekenissen.*concrete toestel/);
});

test("real metadata and sitemap lose all-code claims and receive only actual two-page dates", () => {
  for (const slug of ["bosch", "junkers"]) {
    const page = getPageDefinition(`/foutcodes/${slug}`), meta = buildPageMetadata(page);
    assert.equal(meta.description, facts.descriptions[slug].after);
    assert.equal(meta.openGraph.description, meta.description);
    assert.equal(meta.twitter.description, meta.description);
    assert.doesNotMatch(meta.description, /alle.*codes|nieuwste|volledige/i);
    assert.equal(meta.alternates.canonical, `https://www.abservice24.be/foutcodes/${slug}`);
    assert.equal(meta.robots.index, true);
    assert.equal(page.lastModified, "2026-10-11");
    assert.equal(buildSitemapEntries(pageRegistry).find(e => e.url === meta.alternates.canonical).lastModified, "2026-10-11");
  }
});

test("real SSR exposes all existing rows/scopes/options/source/contact without synthetic codes", async () => {
  for (const slug of ["bosch", "junkers"]) {
    const guide = getFaultGuide(slug), html = await renderFaultGuide(slug);
    assert.equal(guide.codeEntryCount, 242);
    assert.equal((html.match(/class="fault-code-card"/g) || []).length, 242);
    assert.equal((html.match(/class="fault-group"/g) || []).length, 6);
    assert.equal((html.match(/<option /g) || []).length, 7);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert.ok(html.includes(facts.newWarning));
    for (const fact of facts.entries) assert.ok(html.includes(fact.scope), fact.id);
    assert.match(html, /\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
    const search = (q, id = "all") => filterFaultCatalogs(guide.catalogs, q, id).map(c => [c.id, c.codes.map(r => r.code)]);
    assert.deepEqual(search("0Y276"), [["bosch-serie-7000i", ["0Y 276"]]]);
    assert.deepEqual(search("OY276"), []);
    assert.deepEqual(search("276", "bosch-serie-4"), [["bosch-serie-4", ["276"]]]);
    assert.deepEqual(search("0Y370", "bosch-serie-4"), []);
    assert.deepEqual(search("A9", "bosch-serie-3"), [["bosch-serie-3", ["A9"]]]);
    assert.deepEqual(search("UNKNOWN49"), []);
  }
  assert.equal(faultGuides.reduce((n,g) => n + g.codeEntryCount, 0), 1596);
});

test("complete242 code objects, other eleven guides and all registry fields preserve genuine e71 captures", async () => {
  const digest = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
  assert.equal(digest(boschCatalogs.map(c => c.codes)), facts.preservation.catalogCodeArrays);
  assert.equal(digest(faultGuides.filter(g => !["bosch", "junkers"].includes(g.slug)).map(beforeFerroliGuide).map(beforeNefitGuide).map(beforeIntergasGuide).map(beforeAcvGuide)), facts.preservation.otherElevenGuides);
  assert.equal(digest(pageRegistry.map(beforeFerroliRegistry).map(beforeNefitRegistry).map(beforeIntergasRegistry).map(beforeAcvRegistry).map(beforeBoschScopeRegistry)), facts.preservation.allRegistry);
  for (const slug of ["bosch", "junkers"]) {
    assert.equal(digest(beforeBoschScopeGuide(getFaultGuide(slug))), facts.preservation[slug].guide);
    assert.equal(digest(beforeBoschScopeHtml(beforeFaultReadingHtml(await renderFaultGuide(slug)), slug)), facts.preservation[slug].html);
  }
});
