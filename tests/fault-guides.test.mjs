import test from "node:test";
import assert from "node:assert/strict";

import { faultGuides } from "../content/fault-guides.mjs";

const bySlug = (slug) => faultGuides.find((guide) => guide.slug === slug);

test("all published fault guides use official sources and explicit model caveats", () => {
  assert.deepEqual(
    faultGuides.map((guide) => guide.slug),
    [
      "vaillant",
      "bulex",
      "bosch",
      "junkers",
      "remeha",
      "buderus",
      "viessmann",
      "acv",
      "intergas",
      "nefit-bosch",
      "atag",
      "itho-daalderop",
      "ferroli",
    ]
  );

  for (const guide of faultGuides) {
    assert.equal(guide.status, "published");
    assert.match(guide.modelWarning, /model|toestel|reeks|generatie/i);
    assert.equal(guide.codeEntryCount, guide.codes.length);
    assert.ok(guide.catalogs.length >= 1);
    assert.ok(guide.documentationUrl.startsWith("https://"));

    for (const catalog of guide.catalogs) {
      assert.ok(catalog.sourceUrl.startsWith("https://"));
      assert.match(
        new URL(catalog.sourceUrl).hostname,
        /(^|\.)(vaillant\.be|bulex\.be|bosch-homecomfort\.com|remeha\.be|boschtt-documents\.com|viessmann\.de|acv\.com|intergas-verwarming\.nl|nefit-bosch\.nl|atagwarmte\.nl|compano\.com|ferroli\.com)$/
      );
      assert.ok(catalog.scope.length >= 60);
      assert.ok(catalog.sourcePages.length > 0);
      assert.ok(catalog.codes.length > 0);
    }
  }
});

test("catalog coverage matches every row in the cited manufacturer tables", () => {
  assert.equal(bySlug("vaillant").codeEntryCount, 90);
  assert.equal(bySlug("bulex").codeEntryCount, 43);
  assert.equal(bySlug("bosch").codeEntryCount, 242);
  assert.equal(bySlug("junkers").codeEntryCount, 242);
  assert.equal(bySlug("remeha").codeEntryCount, 17);
  assert.equal(bySlug("buderus").codeEntryCount, 51);
  assert.equal(bySlug("viessmann").codeEntryCount, 71);
  assert.equal(bySlug("acv").codeEntryCount, 24);
  assert.equal(bySlug("intergas").codeEntryCount, 11);
  assert.equal(bySlug("nefit-bosch").codeEntryCount, 54);
  assert.equal(bySlug("atag").codeEntryCount, 14);
  assert.equal(bySlug("itho-daalderop").codeEntryCount, 26);
  assert.equal(bySlug("ferroli").codeEntryCount, 37);

  assert.deepEqual(
    bySlug("bosch").catalogs.map(({ id, codes }) => [id, codes.length]),
    [
      ["bosch-serie-7000i", 31],
      ["bosch-serie-9000i", 41],
      ["bosch-cerapur-maxx", 47],
      ["bosch-serie-4", 37],
      ["bosch-serie-3", 29],
      ["bosch-serie-2", 57],
    ]
  );
});

test("every code row is complete, safely worded and unique within its model table", () => {
  for (const guide of faultGuides) {
    for (const catalog of guide.catalogs) {
      const keys = catalog.codes.map((entry) => entry.code.toLocaleLowerCase("nl-BE"));
      assert.equal(new Set(keys).size, keys.length, `${catalog.id} contains duplicate code rows`);

      for (const entry of catalog.codes) {
        assert.ok(entry.code.trim().length > 0);
        assert.ok(entry.meaning.trim().length >= 10);
        assert.ok(entry.userAction.trim().length >= 80);
        assert.equal(entry.sourcePage, catalog.sourcePages);
        assert.ok(entry.searchTerms.includes(entry.code));
        assert.doesNotMatch(entry.userAction, /vervang de printplaat|demonteer|open de mantel(?! niet)/i);
      }
    }
  }
});

test("representative current and historical code families stay searchable", () => {
  const vaillantCodes = bySlug("vaillant").codes.map((entry) => entry.code);
  const bulexCodes = bySlug("bulex").codes.map((entry) => entry.code);
  const boschCodes = bySlug("bosch").codes.map((entry) => entry.code);

  for (const code of ["F.000", "F.028", "F.095", "F.347", "F.905"]) {
    assert.ok(vaillantCodes.includes(code));
  }
  for (const code of ["F.0", "F.28", "F.75", "F.77", "con"]) {
    assert.ok(bulexCodes.includes(code));
  }
  for (const fragment of ["EA 227", "F0 280", "H24", "b2-b6", "F1-F6"]) {
    assert.ok(boschCodes.some((code) => code.includes(fragment)));
  }

  const representativeCodes = {
    remeha: "E:10",
    buderus: "6A 227",
    viessmann: "F2",
    acv: "E02",
    intergas: "5",
    "nefit-bosch": "6A 227",
    atag: "C105",
    "itho-daalderop": "E35",
    ferroli: "A01",
  };

  for (const [slug, code] of Object.entries(representativeCodes)) {
    assert.ok(bySlug(slug).codes.some((entry) => entry.code === code), `${slug} mist ${code}`);
  }
});

test("grouped manufacturer ranges expand into individually searchable aliases", () => {
  const maxx = bySlug("bosch").catalogs.find((catalog) => catalog.id === "bosch-cerapur-maxx");
  const internalFault = maxx.codes.find((entry) => entry.code.startsWith("F0 237"));
  const series3 = bySlug("bosch").catalogs.find((catalog) => catalog.id === "bosch-serie-3");
  const series2 = bySlug("bosch").catalogs.find((catalog) => catalog.id === "bosch-serie-2");

  assert.match(internalFault.searchTerms, /F0 238/);
  assert.match(internalFault.searchTerms, /F0 244/);
  assert.match(internalFault.searchTerms, /F0 253/);
  assert.match(series3.codes.find((entry) => entry.code === "b2-b6").searchTerms, /b4/);
  assert.match(series2.codes.find((entry) => entry.code === "F1-F6").searchTerms, /F5/);
});
