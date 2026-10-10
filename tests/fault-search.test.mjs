import test from "node:test";
import assert from "node:assert/strict";
import { faultGuides } from "../content/fault-guides.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { buildFaultCodeAliases } from "../libs/fault-code-aliases.mjs";

// These characterization tests retain their original 59-row legacy scope.
const legacyIds = ["remeha-avanta", "remeha-calenta-legacy", "remeha-calenta-legacy-blocking"];
const catalogs = faultGuides.find((guide) => guide.slug === "remeha").catalogs
  .filter(({ id }) => legacyIds.includes(id));

test("code punctuation variants find both source-bound meanings without blending models", () => {
  for (const query of ["E02", " E:02 ", "e.02", "E 02"]) {
    const result = filterFaultCatalogs(catalogs, query, "all");
    assert.deepEqual(result.map((catalog) => catalog.id), ["remeha-avanta", "remeha-calenta-legacy"]);
    assert.match(result[0].codes[0].meaning, /retourtemperatuur.*hoger/i);
    assert.match(result[1].codes[0].meaning, /kortsluiting.*aanvoer/i);
  }
});

test("model selection and preserved digits prevent cross-model and shortened-code matches", () => {
  const avanta = filterFaultCatalogs(catalogs, "E02", "remeha-avanta");
  assert.equal(avanta.length, 1);
  assert.equal(avanta[0].id, "remeha-avanta");
  assert.deepEqual(avanta[0].codes.map((row) => row.code), ["E:02"]);
  assert.deepEqual(filterFaultCatalogs(catalogs, "Su14", "all")[0].codes.map((row) => row.code), ["Su:14"]);
  assert.equal(filterFaultCatalogs(catalogs, "E00", "remeha-avanta").length, 0);
  assert.equal(filterFaultCatalogs(catalogs, "niet-bestaand", "all").length, 0);
  assert.equal(filterFaultCatalogs(catalogs, "", "geen-model").length, 0);
});

test("empty input restores all records and filtering never mutates the source catalog", () => {
  const result = filterFaultCatalogs(catalogs, " ", "all");
  assert.equal(result.reduce((count, catalog) => count + catalog.codes.length, 0), 59);
  filterFaultCatalogs(catalogs, "Su14", "all");
  assert.equal(catalogs[2].codes.length, 19);
  assert.equal(filterFaultCatalogs(catalogs, "sensor", "remeha-calenta-legacy")[0].codes.length, 4);
});

const guideCatalogs = (slug) => faultGuides.find((guide) => guide.slug === slug).catalogs;
const remeha = guideCatalogs("remeha");
const matches = (result) => result.map(({ id, codes }) => [id, codes.map(({ code }) => code)]);
const cuLocking = "remeha-calenta-ace-matic-cu-locking";
const cuBlocking = "remeha-calenta-ace-matic-cu-blocking";
const scbBlocking = "remeha-calenta-ace-matic-scb-blocking";
const cuWarnings = "remeha-calenta-ace-matic-cu-warnings";
const scbWarnings = "remeha-calenta-ace-matic-scb-warnings";

test("actual Ace-Matic full subcodes never select longer subcodes", () => {
  for (const [code, queries] of [
    ["E04.25", ["E04.25", "e04:25", " E 04 25 ", "E_04/25"]],
    ["E04.250", ["E04.250", "e04:250", "E 04 250"]],
    ["E04.50", ["E04.50", "e04:50", "E 04 50"]],
    ["E04.254", ["E04.254", "e04:254", "E 04 254"]],
  ]) {
    for (const query of queries) {
      assert.deepEqual(matches(filterFaultCatalogs(remeha, query)), [[cuLocking, [code]]], query);
    }
  }
});

test("actual E02 preserves both legacy meanings without selecting Ace-Matic E02 subcodes", () => {
  assert.deepEqual(matches(filterFaultCatalogs(remeha, "E02")), [
    ["remeha-avanta", ["E:02"]], ["remeha-calenta-legacy", ["E:02"]],
  ]);
  for (const query of ["E04.2", "E04.999", "H03.999", "999999", "6A999"]) {
    assert.deepEqual(filterFaultCatalogs(remeha, query), [], query);
  }
  assert.deepEqual(filterFaultCatalogs(remeha, "E04.25", "geen-model"), []);
});

test("identical complete codes preserve distinct CU and SCB meanings and selected components", () => {
  assert.deepEqual(matches(filterFaultCatalogs(remeha, "H03.54")), [[cuBlocking, ["H03.54"]]]);
  const h254 = filterFaultCatalogs(remeha, "H03.254");
  assert.deepEqual(matches(h254), [[cuBlocking, ["H03.254"]], [scbBlocking, ["H.03.254"]]]);
  assert.match(h254[0].codes[0].meaning, /geen specifieke diagnose/i);
  assert.notEqual(h254[0].codes[0].meaning, h254[1].codes[0].meaning);
  const a18 = filterFaultCatalogs(remeha, "a:02:18");
  assert.deepEqual(matches(a18), [[cuWarnings, ["A02.18"]], [scbWarnings, ["A.02.18"]]]);
  assert.match(a18[0].codes[0].meaning, /configuratie/i);
  assert.match(a18[1].codes[0].meaning, /woordenboekobject/i);
  for (const [id, code] of [[cuWarnings, "A02.18"], [scbWarnings, "A.02.18"]]) {
    assert.deepEqual(matches(filterFaultCatalogs(remeha, "A02.18", id)), [[id, [code]]]);
  }
});

test("Vaillant complete codes preserve leading zeros and never match longer codes", () => {
  const vaillant = guideCatalogs("vaillant");
  assert.deepEqual(matches(filterFaultCatalogs(vaillant, "F28")), [["vaillant-publiek-overzicht", ["F.28"]]]);
  assert.deepEqual(matches(filterFaultCatalogs(vaillant, "F028")), [["vaillant-ecotec-plus-cs", ["F.028"]]]);
  assert.deepEqual(filterFaultCatalogs(vaillant, "F280"), []);
  assert.deepEqual(filterFaultCatalogs(vaillant, "F28", "vaillant-ecotec-plus-cs"), []);
});

test("actual grouped Bosch codes remain searchable through complete expanded aliases", () => {
  const bosch = guideCatalogs("bosch");
  assert.deepEqual(matches(filterFaultCatalogs(bosch, "F0 244", "bosch-cerapur-maxx")), [[
    "bosch-cerapur-maxx", ["F0 237 / 238 / 239 / 242-253 / 255 / 259 / 263 / 267 / 272 / 279 / 287 / 290"],
  ]]);
  assert.deepEqual(matches(filterFaultCatalogs(bosch, "b4", "bosch-serie-3")), [["bosch-serie-3", ["b2-b6"]]]);
  assert.deepEqual(matches(filterFaultCatalogs(bosch, "F5", "bosch-serie-2")), [["bosch-serie-2", ["F1-F6"]]]);
  assert.deepEqual(matches(filterFaultCatalogs(bosch, "9A360", "bosch-serie-7000i")), [["bosch-serie-7000i", ["9A 235 / 360 / 361 / 362"]]]);
  assert.deepEqual(matches(filterFaultCatalogs(bosch, "207")), [["bosch-serie-9000i", ["207"]]]);
  assert.deepEqual(filterFaultCatalogs(bosch, "2070"), []);
  assert.deepEqual(filterFaultCatalogs(bosch, "207", "bosch-cerapur-maxx"), []);
});

test("mixed digit-letter manufacturer codes match whole aliases including original zeros", () => {
  const buderus = guideCatalogs("buderus");
  for (const [query, code] of [["6A227", "6A 227"], ["0y:276", "0Y 276"], ["9A360", "9A 360"]]) {
    assert.deepEqual(matches(filterFaultCatalogs(buderus, query)), [["buderus-logamax-gb162-v2", [code]]]);
  }
  assert.deepEqual(filterFaultCatalogs(buderus, "0Y27"), []);
  assert.deepEqual(filterFaultCatalogs(buderus, "24"), []);
});

test("known no-digit aliases match codes without leaking into diagnosis text", () => {
  assert.deepEqual(matches(filterFaultCatalogs(guideCatalogs("bulex"), " CON ")), [["bulex-thema-condens", ["con"]]]);
  assert.deepEqual(matches(filterFaultCatalogs(guideCatalogs("bosch"), "rE")), [["bosch-cerapur-maxx", ["HrE / rE"]]]);
  // Alias detection must use only the selected catalog: con remains a description here.
  assert.deepEqual(matches(filterFaultCatalogs(guideCatalogs("bulex"), "con", "bulex-publiek-overzicht")), [["bulex-publiek-overzicht", ["F.29"]]]);
});

test("descriptions, accents, natural phrases and incomplete EA family browsing stay useful", () => {
  assert.equal(filterFaultCatalogs(remeha, "sensor", "remeha-calenta-legacy")[0].codes.length, 4);
  for (const [query, variant] of [["waterdruk", " WÁTÉR DRUK "], ["communicatie", " COMMUNICÁTIE "]]) {
    const result = filterFaultCatalogs(remeha, query);
    assert.ok(result.some(({ codes }) => codes.length > 0));
    assert.deepEqual(filterFaultCatalogs(remeha, variant), result);
  }
  assert.deepEqual(matches(filterFaultCatalogs(guideCatalogs("viessmann"), "sensor 2")), [["viessmann-vitodens-200-300-vitotronic", ["1B"]]]);
  const ea = filterFaultCatalogs(guideCatalogs("bosch"), "EA", "bosch-serie-7000i")[0].codes;
  assert.ok(ea.some(({ code }) => code === "EA 227"));
  assert.ok(ea.some(({ code }) => code === "EA 261"));
  assert.equal(ea.length, 9);
  assert.deepEqual(filterFaultCatalogs(guideCatalogs("bosch"), " ea ", "bosch-serie-7000i")[0].codes, ea);
  assert.ok(filterFaultCatalogs(guideCatalogs("bosch"), "EA").some(({ codes }) => codes.some(({ code }) => code === "EA 227")));
  assert.deepEqual(matches(filterFaultCatalogs(guideCatalogs("bosch"), "EA", "bosch-serie-3")), [["bosch-serie-3", ["d3", "d5", "E2", "E9", "EA"]]]);
});

test("empty current-catalog queries restore 359 rows without changing metadata or source records", () => {
  const snapshot = JSON.stringify(remeha);
  filterFaultCatalogs(remeha, "E04.25");
  const restored = filterFaultCatalogs(remeha, " \t ");
  assert.equal(restored.reduce((total, catalog) => total + catalog.codes.length, 0), 359);
  assert.equal(JSON.stringify(remeha), snapshot);
  assert.deepEqual(restored, remeha);
  assert.notEqual(restored, remeha);
  assert.notEqual(restored[0], remeha[0]);
  assert.equal(restored[0].codes[0], remeha[0].codes[0]);
});

test("shared source alias expansion retains ordered prefix inheritance and bounded ranges", () => {
  assert.deepEqual(buildFaultCodeAliases("9A 235 / 360 / 361 / 362"), [
    "9A 235 / 360 / 361 / 362", "9A 235", "9A 360", "9A 361", "9A 362",
  ]);
  assert.deepEqual(buildFaultCodeAliases("b2-b6"), ["b2-b6", "b2", "b3", "b4", "b5", "b6"]);
  assert.deepEqual(buildFaultCodeAliases("HrE / rE"), ["HrE / rE", "HrE", "rE"]);
  assert.deepEqual(buildFaultCodeAliases("F0 242-244 / 255 / F7 328 / 329"), [
    "F0 242-244 / 255 / F7 328 / 329", "F0 242", "F0 243", "F0 244", "F0 255", "F7 328", "F7 329",
  ]);
  assert.deepEqual(buildFaultCodeAliases("B2-b4"), ["B2-b4", "B2", "B3", "B4"]);
  assert.deepEqual(buildFaultCodeAliases("b2-c6"), ["b2-c6"]);
  assert.deepEqual(buildFaultCodeAliases("F6-F1"), ["F6-F1"]);
  assert.deepEqual(buildFaultCodeAliases("1-52"), ["1-52"]);
  assert.deepEqual(buildFaultCodeAliases("F1-F52"), ["F1-F52"]);
  const numericBoundary = buildFaultCodeAliases("1-51");
  assert.equal(numericBoundary.length, 52);
  assert.equal(numericBoundary[1], "1");
  assert.equal(numericBoundary.at(-1), "51");
  const prefixedBoundary = buildFaultCodeAliases("F1-F51");
  assert.equal(prefixedBoundary.length, 52);
  assert.equal(prefixedBoundary[1], "F1");
  assert.equal(prefixedBoundary.at(-1), "F51");
});
