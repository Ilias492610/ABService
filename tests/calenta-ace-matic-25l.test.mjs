import { beforeCalentaCatalog } from "./fixtures/calenta-legacy-source-safety.mjs";
import test from "node:test";
import { beforeAvantaCatalog } from "./fixtures/avanta-overview-source-safety.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { faultGuides } from "../content/fault-guides.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { sourceFacts, sourceTables, previousCatalogDigest } from "./fixtures/remeha-calenta-ace-matic-25l.mjs";

const guide = faultGuides.find(({ slug }) => slug === "remeha");
const newCatalogs = guide.catalogs.filter(({ id }) => id.startsWith("remeha-calenta-ace-matic-25l-"));
const bySuffix = (suffix) => newCatalogs.find(({ id }) => id.endsWith(`-${suffix}`));
const row = (suffix, code) => bySuffix(suffix)?.codes.find((entry) => entry.code === code);
const digest = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

test("25L addition preserves all eight original catalogs completely", () => {
  assert.equal(digest(guide.catalogs.slice(0, 8).map(beforeCalentaCatalog).map(beforeAvantaCatalog)), previousCatalogDigest);
});

test("25L public guide exposes its five independently inventoried tables with own source attribution", async () => {
  assert.equal(newCatalogs.length, 5, "missing independently documented 25L catalogs");
  const { calentaAceMatic25LSource } = await import("../content/remeha-calenta-ace-matic-25l.mjs");
  assert.deepEqual(calentaAceMatic25LSource, sourceFacts);
  assert.ok(Object.isFrozen(calentaAceMatic25LSource));
  assert.ok(Object.isFrozen(calentaAceMatic25LSource.models));
  assert.deepEqual(newCatalogs.map(({ id }) => id), sourceTables.map(({ id }) => id));
  for (const expected of sourceTables) {
    const catalog = newCatalogs.find(({ id }) => id === expected.id);
    assert.ok(Object.isFrozen(catalog));
    assert.ok(Object.isFrozen(catalog.codes));
    assert.equal(catalog.codes.length, expected.count);
    assert.deepEqual(catalog.codes.map(({ code }) => code), expected.codes);
    assert.equal(new Set(catalog.codes.map(({ code }) => code)).size, expected.count);
    assert.equal(catalog.sourceUrl, sourceFacts.sourceUrl);
    assert.equal(catalog.sourcePages, `NL tabel ${expected.table}, p. ${expected.pages}`);
    assert.match(catalog.sourceLabel, /25L.*7871254-04-04072025/);
    assert.match(catalog.title, /25L/);
    assert.ok(catalog.title.includes(expected.component));
    assert.ok(catalog.scope.includes(sourceFacts.revision));
    assert.ok(catalog.scope.includes(expected.component));
    assert.ok(catalog.scope.includes(`tabel ${expected.table}`));
    assert.match(catalog.scope, /uitsluitend.*25L/);
    assert.match(catalog.scope, /België en Luxemburg/);
    assert.match(catalog.scope, /Niet voor.*25s.*35s.*30c.*40c/);
    assert.match(catalog.scope, /andere revisies/);
    if (expected.component === "SCB-10") assert.match(catalog.scope, /aanwezige SCB-10.*betrokken.*componenten/);
    // Pin already reviewed interpretations, not merely presence of a code.
    assert.equal(digest(catalog.codes.map(({ code, meaning, userAction, searchTerms }) => ({ code, meaning, userAction, searchTerms }))), expected.explanationDigest);
    for (const entry of catalog.codes) {
      assert.ok(Object.isFrozen(entry));
      assert.equal(entry.sourcePage, catalog.sourcePages);
      assert.doesNotMatch(`${entry.meaning} ${entry.userAction}`, /GP\d{3}|CP\d{3}|DP\d{3}|AP\d{3}|stroomtoevoer afsluiten|vervang de|ontlucht de gasleiding/i);
    }
  }
});

test("public coverage distinguishes the 25L revision from other Ace-Matic models without universal promises", () => {
  assert.equal(guide.catalogs.length, 13);
  assert.equal(guide.codeEntryCount, 659);
  assert.match(guide.modelWarning, /25L.*7871254-04-04072025/);
  assert.match(guide.modelWarning, /25s\/35s\/30c\/40c.*7871265-05-04072025/);
  assert.match(guide.modelWarning, /Calenta Ace, Tzerra, Quinta en andere revisies vallen niet/);
});

test("25L component collisions retain different meanings and manufacturer uncertainties", () => {
  assert.match(row("cu-warnings", "A02.18")?.meaning ?? "", /configuratie/i);
  assert.match(row("scb-warnings", "A.02.18")?.meaning ?? "", /woordenboekobject/i);
  assert.match(row("cu-blocking", "H02.38")?.meaning ?? "", /vulcycli/i);
  assert.match(row("scb-blocking", "H.02.38")?.meaning ?? "", /waterhardheid/i);
  assert.match(row("cu-blocking", "H01.18")?.meaning ?? "", /waterdoorstroming/i);
  assert.match(row("scb-blocking", "H.01.18")?.meaning ?? "", /aanvoertemperatuurstijging/i);
  assert.match(row("cu-blocking", "H03.254")?.meaning ?? "", /onbepaalde.*geen specifieke diagnose/i);
  for (const [suffix, code] of [["scb-warnings", "A.00.109"], ["scb-warnings", "A.00.111"], ["scb-warnings", "A.00.113"], ["scb-blocking", "H.00.107"], ["scb-blocking", "H.00.108"]]) {
    const entry = row(suffix, code);
    assert.match(entry?.meaning ?? "", /bronbeschrijvingen.*verschillen.*technische diagnose/i);
    assert.doesNotMatch(entry.meaning, /kortsluit|onderbroken|beneden|boven|verwijderd/i);
    assert.match(entry.userAction, /werk niet aan sensoren/i);
  }
});

test("25L hazardous and exhausted-reset codes never inherit installer repairs or bypass advice", () => {
  assert.match(row("cu-locking", "E04.29")?.meaning ?? "", /resetlimiet.*Stop verdere pogingen/i);
  assert.match(row("cu-locking", "E04.29")?.userAction ?? "", /reset niet herhaaldelijk/i);
  for (const code of ["E04.50", "E04.250"]) assert.match(row("cu-locking", code)?.userAction ?? "", /gasgeur/i);
  assert.match(row("cu-locking", "E04.04")?.userAction ?? "", /Schakel het toestel uit/i);
  assert.match(row("cu-blocking", "H08.07")?.userAction ?? "", /netspanning/i);
  assert.match(row("scb-blocking", "H.03.33")?.userAction ?? "", /netspanning/i);
});

test("25L search selects exact subcodes and components without merging model results", () => {
  const cu = "remeha-calenta-ace-matic-25l-cu-locking";
  for (const [query, want] of [["E04.50", "E04.50"], ["E04 250", "E04.250"], ["E0425", "E04.25"], ["E04.254", "E04.254"]]) {
    const results = filterFaultCatalogs(guide.catalogs, query, cu);
    assert.deepEqual(results.flatMap(({ codes }) => codes.map(({ code }) => code)), [want]);
    assert.equal(results[0].id, cu);
  }
  assert.deepEqual(filterFaultCatalogs(guide.catalogs, "H02.38", "remeha-calenta-ace-matic-25l-cu-blocking").map(({ codes }) => codes.map(({ code }) => code)), [["H02.38"]]);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs, "H.02.38", "remeha-calenta-ace-matic-25l-scb-blocking").map(({ codes }) => codes.map(({ code }) => code)), [["H.02.38"]]);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs, "E04.50").map(({ id }) => id), ["remeha-calenta-ace-matic-cu-locking", cu]);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs, "E04.999", cu), []);
  assert.equal(filterFaultCatalogs(guide.catalogs, "", cu)[0].codes.length, 47);
});
