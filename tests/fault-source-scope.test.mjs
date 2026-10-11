import test from "node:test";
import assert from "node:assert/strict";
import { vaillantCatalogs, bulexCatalogs } from "../content/fault-catalogs.mjs";
import { getFaultGuide } from "../content/fault-guides.mjs";
import { getPageDefinition, pageRegistry } from "../content/site-content.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { sourceFacts } from "./fixtures/vaillant-bulex-source-facts.mjs";

const catalogsByBrand = { vaillant: vaillantCatalogs, bulex: bulexCatalogs };
const ecoTEC = vaillantCatalogs[1];
const thema = bulexCatalogs[1];
const row = (catalog, code) => catalog.codes.find((entry) => entry.code === code);
const searchResult = (catalogs, query, id) => filterFaultCatalogs(catalogs, query, id)
  .map((catalog) => [catalog.id, catalog.codes.map((entry) => entry.code)]);

// Catches deleted/added/mis-punctuated source rows, source substitution and
// search normalization that strips significant zeroes or merges model meanings.
for (const fact of sourceFacts) {
  test(`${fact.id} exposes the independent literal inventory and exact source`, () => {
    const result = filterFaultCatalogs(catalogsByBrand[fact.brand], "", fact.id);
    assert.equal(result.length, 1);
    assert.equal(result[0].sourceUrl, fact.url);
    assert.equal(result[0].sourcePages, fact.pages);
    assert.deepEqual(result[0].codes.map((entry) => entry.code), fact.codes);
    assert.ok(result[0].codes.every((entry) => entry.sourcePage === fact.pages));
    for (const code of fact.codes) {
      for (const query of [code, code.replaceAll(".", ""), code.replaceAll(".", " ")]) {
        assert.deepEqual(searchResult(catalogsByBrand[fact.brand], query, fact.id), [[fact.id, [code]]], query);
      }
    }
  });
}

test("Vaillant visible scope preserves all nine exact Belgian model/article mappings", () => {
  const fact = sourceFacts[1];
  const visiblePairs = [...ecoTEC.scope.matchAll(/((?:VC|VCW) \d+CS\/1-5 \([NP]-BE\))\s*[:–-]\s*(\d{10})/g)]
    .map(([, model, article]) => [model, article]);
  assert.deepEqual(visiblePairs, fact.models);
  assert.ok(ecoTEC.scope.includes(fact.revision));
  assert.ok(ecoTEC.scope.includes(fact.printedDate));
  assert.match(ecoTEC.scope, /uitsluitend.*België/i);
  assert.match(ecoTEC.scope, /niet elke code.*elk product/i);
  assert.match(ecoTEC.scope, /andere.*varianten.*revisies.*niet gedekt/i);
  assert.match(ecoTEC.scope, /typeplaatje.*gebruikershandleiding/i);
  assert.match(getFaultGuide("vaillant").modelWarning, /negen.*Belgische.*modellen/i);
  assert.match(getFaultGuide("vaillant").modelWarning, /typeplaatje.*gebruikershandleiding/i);
});

test("Bulex visible labels and warning limit the appendix to FAS 65 and its article", () => {
  const fact = sourceFacts[3];
  const [model, article] = fact.models[0];
  assert.equal(thema.title, model);
  for (const text of [thema.scope, thema.sourceLabel, getFaultGuide("bulex").modelWarning]) {
    assert.ok(text.includes(model));
    assert.ok(text.includes(fact.revision));
  }
  assert.ok(thema.scope.includes(article));
  assert.ok(thema.scope.includes(fact.marketLanguage));
  assert.ok(thema.scope.includes(fact.printedDate));
  assert.match(thema.scope, /uitsluitend.*THEMA Condens FAS 65/i);
  assert.match(thema.scope, /andere THEMA.*niet gedekt/i);
  assert.match(getFaultGuide("bulex").modelWarning, /andere THEMA.*niet gedekt/i);
  assert.match(getFaultGuide("bulex").modelWarning, /typeplaatje.*gebruikershandleiding/i);
});

test("guide totals and shared Bulex F13 retain separate source-bound meanings", () => {
  assert.equal(getFaultGuide("vaillant").codeEntryCount, 90);
  const bulex = getFaultGuide("bulex");
  assert.equal(bulex.codeEntryCount, 74);
  assert.equal(new Set(bulex.codes.map((entry) => entry.code)).size, 65);
  for (const query of ["F.13", "F13", " F 13 "]) {
    const result = filterFaultCatalogs(bulex.catalogs, query);
    assert.deepEqual(result.map((catalog) => catalog.id), ["bulex-publiek-overzicht", "bulex-thema-condens"]);
    assert.match(result[0].codes[0].meaning, /moederbord/i);
    assert.match(result[1].codes[0].meaning, /kortsluiting.*boilertemperatuurvoeler/i);
  }
});

test("source padding remains significant and unknown padded variants never match", () => {
  assert.deepEqual(searchResult(vaillantCatalogs, "F13"), [["vaillant-publiek-overzicht", ["F.13"]]]);
  assert.deepEqual(searchResult(vaillantCatalogs, "F013"), [["vaillant-ecotec-plus-cs", ["F.013"]]]);
  assert.deepEqual(filterFaultCatalogs(vaillantCatalogs, "F13", ecoTEC.id), []);
  // Newly sourced A/B has literal F00/F01; still absent from old source tables.
  assert.deepEqual(searchResult(bulexCatalogs, "F.00"), [["bulex-thema-condens-ab", ["F00"]]]);
  assert.deepEqual(searchResult(bulexCatalogs, "F.01"), [["bulex-thema-condens-ab", ["F01"]]]);
  for (const query of ["F.001", "F.013"]) {
    assert.deepEqual(filterFaultCatalogs(bulexCatalogs, query), [], query);
  }
  for (const query of ["F.01", "F.00"]) for (const id of ["bulex-publiek-overzicht", "bulex-thema-condens"]) {
    assert.deepEqual(filterFaultCatalogs(bulexCatalogs, query, id), [], `${id}/${query}`);
  }
  for (const query of ["F.0013", "F.280", "F.1050"]) {
    assert.deepEqual(filterFaultCatalogs(vaillantCatalogs, query), [], query);
  }
  assert.deepEqual(searchResult(bulexCatalogs, "CON"), [["bulex-thema-condens", ["con"]]]);
});

test("F105 describes a professional configuration condition with the source conjunction", () => {
  const entry = row(ecoTEC, "F.105");
  assert.match(entry.meaning, /gasblokconfiguratie.*offset/i);
  assert.match(entry.meaning, /vervanging.*gasklep.*of.*printplaat en productinterface/i);
  assert.match(entry.meaning, /professionele.*bevoegde technicus/i);
  assert.doesNotMatch(entry.meaning, /printplaat of|(?:offset|gasblokconfiguratie|gasklep).*(?:instel|ingesteld|afstel|afgesteld|aanpas|aangepast)|(?:instel|afstel|aanpas|stel\b|pas\b).*(?:offset|gasblokconfiguratie)/i);
  assert.equal(entry.userAction, row(ecoTEC, "F.028").userAction);
  assert.match(entry.userAction, /gasgeur.*geen schakelaars.*exacte toestel.*toestaat/i);
});

for (const [code, signal] of [["F.73", "laag"], ["F.74", "hoog"]]) {
  test(`Bulex ${code} keeps its signal meaning and gives the actual electrical action`, () => {
    const entry = filterFaultCatalogs(bulexCatalogs, code, thema.id)[0].codes[0];
    assert.equal(entry.meaning, `Signaal van de waterdruksensor is te ${signal}.`);
    assert.equal(entry.userAction, row(thema, "F.71").userAction);
    assert.match(entry.userAction, /mantel niet.*sensoren, bekabeling, printplaat of netspanning.*technische diagnose/i);
    assert.doesNotMatch(entry.userAction, /vul|ontlucht|zichtbare installatiedruk/i);
  });
}

test("Bulex F22 and both F75 rows retain bounded pressure observations", () => {
  const pressureRows = [row(thema, "F.22"), row(thema, "F.75"), row(bulexCatalogs[0], "F.75")];
  for (const entry of pressureRows) {
    assert.match(entry.userAction, /uitsluitend de zichtbare installatiedruk/i);
    assert.match(entry.userAction, /volg alleen.*gebruikershandleiding.*exacte toestel/i);
    assert.match(entry.userAction, /mantel niet.*terugkerende melding onderzoeken/i);
  }
});

for (const [brand, model] of [["vaillant", /ecoTEC plus CS\/1-5.*0020282230_00.*negen.*modellen/i], ["bulex", /THEMA Condens FAS 65.*0010010389/i]]) {
  test(`${brand} metadata and sitemap expose the corrected scope and substantive date`, () => {
    const page = getPageDefinition(`/foutcodes/${brand}`);
    const metadata = buildPageMetadata(page);
    assert.match(metadata.description, /Belgische.*consumentenoverzicht/i);
    assert.match(metadata.description, model);
    assert.doesNotMatch(metadata.description, /alle modellen|alle.*merkcodes|nieuwste/i);
    assert.equal(metadata.openGraph.description, metadata.description);
    assert.equal(metadata.twitter.description, metadata.description);
    assert.equal(metadata.alternates.canonical, `https://www.abservice24.be/foutcodes/${brand}`);
    assert.equal(metadata.robots.index, true);
    assert.equal(page.lastModified, "2026-10-11");
    assert.equal(buildSitemapEntries(pageRegistry).find((entry) => entry.url === metadata.alternates.canonical).lastModified, "2026-10-11");
  });
}
