import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
// Reconstruct only independently tested Task83 before earlier named history inverses.
import {beforeTzerraGuide,beforeTzerraRegistry,beforeTzerraHtml} from "./fixtures/tzerra-ace-matic-history.mjs";
const faultGuides=liveFaultGuides.map(beforeTzerraGuide);
const getFaultGuide=slug=>beforeTzerraGuide(liveGetFaultGuide(slug));
const getPageDefinition=path=>beforeTzerraRegistry(liveGetPageDefinition(path));
const pageRegistry=livePageRegistry.map(beforeTzerraRegistry);
const renderFaultGuide=async slug=>beforeTzerraHtml(await liveRenderFaultGuide(slug),slug);
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
import { beforeNefitGuide, beforeNefitRegistry } from "./fixtures/nefit-proline-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { boschCatalogs, junkersCatalogs } from "../content/fault-catalogs.mjs";
import { faultGuides as liveFaultGuides, getFaultGuide as liveGetFaultGuide } from "../content/fault-guides.mjs";
import { getPageDefinition as liveGetPageDefinition, pageRegistry as livePageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { renderFaultGuide as liveRenderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
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
    assert.equal(buildSitemapEntries(pageRegistry.map(beforeFaqRecognitionRegistry)).find(e => e.url === meta.alternates.canonical).lastModified, "2026-10-11");
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
  assert.equal(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).reduce((n,g) => n + g.codeEntryCount, 0), 1596);
});

test("complete242 code objects, other eleven guides and all registry fields preserve genuine e71 captures", async () => {
  const digest = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
  assert.equal(digest(boschCatalogs.map(c => c.codes)), facts.preservation.catalogCodeArrays);
  assert.equal(digest(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).filter(g => !["bosch", "junkers"].includes(g.slug)).map(beforeCalentaGuide).map(beforeAvantaGuide).map(beforeViessmannGuide).map(beforeAtagGuide).map(beforeIthoGuide).map(beforeFerroliGuide).map(beforeNefitGuide).map(beforeIntergasGuide).map(beforeAcvGuide)), facts.preservation.otherElevenGuides);
  assert.equal(digest(pageRegistry.map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeAtagManualsRegistry).map(beforeGb172Registry).map(beforeAvantaRegistry).map(beforeViessmannRegistry).map(beforeAtagRegistry).map(beforeIthoRegistry).map(beforeFerroliRegistry).map(beforeNefitRegistry).map(beforeIntergasRegistry).map(beforeAcvRegistry).map(beforeBoschScopeRegistry)), facts.preservation.allRegistry);
  for (const slug of ["bosch", "junkers"]) {
    assert.equal(digest(beforeBoschScopeGuide(getFaultGuide(slug))), facts.preservation[slug].guide);
    assert.equal(digest(beforeBoschScopeHtml(beforeFaultReadingHtml(await renderFaultGuide(slug)), slug)), facts.preservation[slug].html);
  }
});
