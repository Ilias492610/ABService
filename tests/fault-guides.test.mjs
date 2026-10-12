import { viessmannFacts } from "./fixtures/viessmann-overview-source-safety.mjs";
import { avantaFacts } from "./fixtures/avanta-overview-source-safety.mjs";
import {calentaFacts,expectedCalentaCatalogs} from "./fixtures/calenta-legacy-source-safety.mjs";
import test from "node:test";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

import { faultGuides } from "../content/fault-guides.mjs";
import { sourceFacts } from "./fixtures/remeha-calenta-ace-matic.mjs";
import { sourceFacts as source25L } from "./fixtures/remeha-calenta-ace-matic-25l.mjs";
import { ithoFacts } from "./fixtures/itho-base-cube-source-safety.mjs";
import { atagFacts } from "./fixtures/atag-overview-source-safety.mjs";

const bySlug = (slug) => faultGuides.find((guide) => guide.slug === slug);
const gb172 = JSON.parse(readFileSync(new URL("./fixtures/buderus-gb172i2-source-facts.json", import.meta.url), "utf8"));
const atagManuals = JSON.parse(readFileSync(new URL("./fixtures/atag-manuals-source-facts.json", import.meta.url), "utf8"));
const tzerra = JSON.parse(readFileSync(new URL("./fixtures/tzerra-ace-matic-source-facts.json", import.meta.url), "utf8"));

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
      const hostname = new URL(catalog.sourceUrl).hostname;
      if (hostname === "edge.sitecorecloud.io") {
        assert.ok([sourceFacts.sourceUrl, source25L.sourceUrl, tzerra.sources.installer.URL].includes(catalog.sourceUrl));
      } else assert.match(
        hostname,
        /(^|\.)(vaillant\.be|bulex\.be|bosch-homecomfort\.com|remeha\.be|remehatools\.be|boschtt-documents\.com|boschhc-documents\.com|viessmann\.de|acv\.com|intergas-verwarming\.nl|nefit-bosch\.nl|atagwarmte\.nl|compano\.com|ferroli\.com)$/
      );
      assert.ok(catalog.scope.length >= 60);
      assert.ok(catalog.sourcePages.length > 0);
      assert.ok(catalog.codes.length > 0);
    }
  }
});

test("catalog coverage matches every row in the cited manufacturer tables", () => {
  assert.equal(bySlug("vaillant").codeEntryCount, 90);
  assert.equal(bySlug("bulex").codeEntryCount, 74);
  assert.equal(bySlug("bosch").codeEntryCount, 242);
  assert.equal(bySlug("junkers").codeEntryCount, 242);
  assert.equal(bySlug("remeha").codeEntryCount, 756);
  assert.equal(bySlug("buderus").codeEntryCount, 121);
  assert.equal(bySlug("viessmann").codeEntryCount, 71);
  assert.equal(bySlug("acv").codeEntryCount, 24);
  assert.equal(bySlug("intergas").codeEntryCount, 11);
  assert.equal(bySlug("nefit-bosch").codeEntryCount, 54);
  assert.equal(bySlug("atag").codeEntryCount, 50);
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
        // Itho/ATAG's independently read diagnostic locators are narrower than the
        // whole display/control chapter; the other catalogs keep their contract.
        const sourcePage = tzerra.catalogs.some(c => c.id === catalog.id)
          ? tzerra.catalogs.find(c => c.id === catalog.id).rows.find(r => r.code === entry.code)?.sourcePage
          : catalog.id === ithoFacts.id
          ? ithoFacts.rowChanges.find(row => row.beforeCode === entry.code)?.after.sourcePage
          : atagManuals.catalogs.some(c => c.id === catalog.id)
            ? atagManuals.catalogs.find(c => c.id === catalog.id).rows.find(row => row.code === entry.code)?.sourcePage
          : catalog.id === atagFacts.id
            ? atagFacts.rowChanges.find(row => row.beforeCode === entry.code)?.after.sourcePage
            : catalog.id === viessmannFacts.id
              ? viessmannFacts.rowChanges.find(row => row.beforeCode === entry.code)?.after.sourcePage
              : catalog.id === avantaFacts.id
                ? `Online lijstregel ${avantaFacts.literalCodes.indexOf(entry.code) + 1}: ${entry.code}`
              : calentaFacts.ids.includes(catalog.id)
                ? expectedCalentaCatalogs.find(c=>c.id===catalog.id).codes.find(r=>r.code===entry.code)?.sourcePage
              : catalog.id === gb172.id
                ? (() => { const [page, , kind] = gb172.source.groups.find(([, code]) => code === entry.code); return `Tabel 69, p. ${page}; klasse ${gb172.classLabels[String(kind)]}`; })()
              : catalog.sourcePages;
        assert.equal(entry.sourcePage, sourcePage);
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

test("Calenta legacy keeps every cited locking and blocking code separate from Avanta meanings", () => {
  const guide = bySlug("remeha");
  const locking = guide.catalogs.find((catalog) => catalog.id === "remeha-calenta-legacy");
  const blocking = guide.catalogs.find((catalog) => catalog.id === "remeha-calenta-legacy-blocking");
  assert.deepEqual(locking?.codes.map((row) => row.code), ["E:00", "E:01", "E:02", "E:03", "E:04", "E:05", "E:06", "E:07", "E:08", "E:09", "E:10", "E:11", "E:12", "E:14", "E:16", "E:17", "E:34", "E:35", "E:36", "E:37", "E:38", "E:39", "E:40"]);
  assert.deepEqual(blocking?.codes.map((row) => row.code), ["Su:0", "Su:1", "Su:2", "Su:7", "Su:8", "Su:9", "Su:10", "Su:11", "Su:13", "Su:14", "Su:15", "Su:16", "Su:17", "Su:18", "Su:19", "Su:20", "Su:21", "Su:22", "Su:25"]);
  assert.match(locking.codes.find((row) => row.code === "E:02").meaning, /kortsluiting.*aanvoer/i);
  assert.match(guide.catalogs.find((catalog) => catalog.id === "remeha-avanta").codes.find((row) => row.code === "E:02").meaning, /retourtemperatuur.*hoger/i);
  assert.match(locking.scope, /Niet voor Calenta Ace/i);
  assert.match(blocking.scope, /Su/);
  assert.equal(guide.catalogs.find((catalog) => catalog.id === "remeha-avanta").codes.length, 17);
});
