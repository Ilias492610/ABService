import test from "node:test";
import assert from "node:assert/strict";
import { faultGuides } from "../content/fault-guides.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";

// These characterization tests retain their original 59-row legacy scope.
// Full Ace-Matic code/component collision coverage belongs to the dependent search task.
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
