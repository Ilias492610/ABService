// Historical captures remove only the independently tested named Task80 addition.
import { beforeAtagManualsGuide } from "./fixtures/atag-manuals-history.mjs";
// Reconstruct only the separately verified Task77 addition for historical hashes.
import { beforeGb172Guide } from "./fixtures/buderus-gb172i2-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { faultGuides, getFaultGuide } from "../content/fault-guides.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import { modelHelpHtml } from "./fixtures/bulex-model-help-baseline.mjs";
import { themaABFacts as facts, themaABScope, themaABWarning } from "./fixtures/bulex-thema-condens-ab.mjs";

const bulex = getFaultGuide("bulex");
const findAB = () => {
  const ab = bulex.catalogs.find(c => c.id === facts.id);
  assert.ok(ab, "missing separately attributed historical A/B catalog");
  return ab;
};
const results = (query, id = "all") => filterFaultCatalogs(bulex.catalogs, query, id).map(c => [c.id, c.codes.map(r => r.code)]);

// Catches an invented/omitted/repunctuated source code or another manual URL.
test("the exact31 source identifiers remain independently searchable in the own A/B filter", () => {
  const ab = findAB();
  assert.deepEqual(ab.codes.map(r => r.code), facts.codes);
  assert.equal(ab.sourceUrl, facts.url);
  assert.equal(ab.sourcePages, facts.pages);
  for (const code of facts.codes) {
    for (const query of [code, code.replaceAll(" ", ""), code.replace(/^F\s*/, "F.")]) {
      assert.deepEqual(results(query, facts.id), [[facts.id, [code]]], query);
    }
  }
  for (const query of ["F54", "F67", "F75", "F13", "F001", "F000", "ABUNKNOWN48"]) assert.deepEqual(results(query, facts.id), [], query);
  // CON is a real alias in the FAS65 selection; without that alias in A/B,
  // the existing text search legitimately matches connector/condensaat/contact.
  assert.deepEqual(results("CON"), [["bulex-thema-condens", ["con"]]]);
  assert.deepEqual(results("CON", facts.id), [[facts.id, ["F49", "F77", "F86"]]]);
});

test("scope exposes the historical eight-model gas-market boundaries without inferring blank codes", () => {
  const ab = findAB();
  assert.equal(ab.scope, themaABScope);
  assert.equal(bulex.modelWarning, themaABWarning);
  for (const model of facts.models) assert.ok(ab.scope.includes(model), model);
  assert.match(ab.sourceLabel, /0020109430_06/);
  assert.doesNotMatch(ab.codes.map(r => r.code).join("|"), /F54|F67|\|\-|con/);
});

test("significant zeroes and F54 F67 remain separate across three actual source tables", () => {
  findAB();
  for (const query of ["F00", "F.00", " F 00 "]) assert.deepEqual(results(query), [[facts.id, ["F00"]]]);
  for (const query of ["F0", "F.0"]) assert.deepEqual(results(query), [["bulex-thema-condens", ["F.0"]]]);
  assert.deepEqual(results("F01"), [[facts.id, ["F01"]]]);
  assert.deepEqual(results("F1"), [["bulex-publiek-overzicht", ["F.1"]], ["bulex-thema-condens", ["F.1"]]]);
  assert.deepEqual(results("F54"), [["bulex-publiek-overzicht", ["F.54"]]]);
  assert.deepEqual(results("F67"), [["bulex-thema-condens", ["F.67"]]]);
});

test("A/B F73 F74 and F77 retain their own source meaning rather than borrowing FAS65", () => {
  const ab = findAB(), row = code => ab.codes.find(r => r.code === code);
  assert.match(row("F73").meaning, /drukvoeler.*kortgesloten of.*ontkoppeld/i);
  assert.match(row("F74").meaning, /drukvoeler.*defect/i);
  for (const code of ["F73", "F74"]) {
    assert.match(row(code).userAction, /mantel niet.*sensoren, bekabeling, printplaat of netspanning/i);
    assert.doesNotMatch(row(code).userAction, /zichtbare installatiedruk|vul|ontlucht/i);
  }
  assert.match(row("F77").meaning, /gasmechanisme.*condensaatpomp.*indien aanwezig/i);
  assert.doesNotMatch(row("F77").meaning, /rookgasklep/);
  assert.match(row("F77").userAction, /gasgeur.*geen schakelaars/i);
  assert.match(bulex.catalogs[1].codes.find(r => r.code === "F.77").meaning, /rookgasklep/);
  assert.match(row("F76").meaning, /smeltzekering.*ontkoppeld of defect/i);
  assert.match(row("F70").meaning, /productcode.*gebruikersinterface.*moederbord/i);
  assert.match(row("F64").meaning, /snelle.*temperatuur.*aanvoer.*retour/i);
  assert.doesNotMatch(row("F65").meaning, /vlamsignaal/);
});

test("all31 new rows offer observation only rather than professional repairs or bypasses", () => {
  const ab = findAB();
  assert.equal(ab.codes.length, 31);
  for (const row of ab.codes) {
    assert.ok(row.meaning.length >= 10);
    assert.equal(row.sourcePage, facts.pages);
    assert.ok(row.userAction.length >= 80);
    assert.doesNotMatch(row.userAction, /(?:vervang|demonteer|overbrug|d\.93|gaskraan|gasdebiet|gasmechanisme.*afstel|\b(?:vul|ontlucht)\s+(?:de|het|uw))/i);
    assert.doesNotMatch(row.meaning, /^(?:controleer|vervang|open|overbrug)/i);
  }
  for (const code of ["F22", "F83", "F20", "F24", "F23"]) {
    assert.match(ab.codes.find(r => r.code === code).userAction, /uitsluitend de zichtbare installatiedruk.*alleen.*gebruikershandleiding van uw exacte toestel.*mantel niet/i);
  }
});

test("real SSR shows all74 rows three sources and unchanged unknown-model/contact help", async () => {
  findAB();
  const html = await renderFaultGuide("bulex");
  assert.equal(bulex.codeEntryCount, 74);
  assert.equal(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).reduce((n,g) => n+g.codeEntryCount,0), 1596);
  assert.equal((html.match(/class="fault-code-card"/g)||[]).length, 74);
  assert.equal((html.match(/class="fault-group"/g)||[]).length, 3);
  assert.equal((html.match(/<option /g)||[]).length, 4);
  assert.equal((html.match(/<h1[ >]/g)||[]).length, 1);
  assert.ok(html.includes(themaABScope));
  assert.ok(html.includes(modelHelpHtml));
  assert.match(html, /<a href="https:\/\/www\.bulex\.be\/themacondens\/0020109430-06-1746866\.pdf" target="_blank" rel="noreferrer">Officiële bron/);
  assert.match(html, /\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
});
