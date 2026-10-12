import test from "node:test";
import { beforeAvantaCatalog } from "./fixtures/avanta-overview-source-safety.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { faultGuides } from "../content/fault-guides.mjs";
import { sourceFacts, sourceTables, legacyCatalogDigest } from "./fixtures/remeha-calenta-ace-matic.mjs";

const guide = faultGuides.find(({ slug }) => slug === "remeha");
const catalogById = (id) => guide.catalogs.find((catalog) => catalog.id === id);
const row = (suffix, code) => catalogById(`remeha-calenta-ace-matic-${suffix}`)?.codes.find((entry) => entry.code === code);

test("Remeha retains the original five component-bound Ace-Matic source tables after unchanged legacy catalogs", async () => {
  assert.deepEqual(guide.catalogs.slice(3, 8).map(({ id }) => id), sourceTables.map(({ id }) => id));
  assert.equal(guide.catalogs.slice(0, 8).flatMap(({ codes }) => codes).length, 359);
  assert.deepEqual(guide.catalogs.slice(0, 3).map(({ id, codes }) => [id, codes.length]), [
    ["remeha-avanta", 17], ["remeha-calenta-legacy", 23], ["remeha-calenta-legacy-blocking", 19],
  ]);
  assert.equal(createHash("sha256").update(JSON.stringify(guide.catalogs.slice(0, 3).map(beforeAvantaCatalog))).digest("hex"), legacyCatalogDigest);

  // Import only after the public guide assertion so RED proves missing behavior.
  const { calentaAceMaticSource, calentaAceMaticCatalogs } = await import("../content/remeha-calenta-ace-matic.mjs");
  assert.deepEqual(calentaAceMaticSource, sourceFacts);
  assert.ok(Object.isFrozen(calentaAceMaticSource));
  assert.ok(Object.isFrozen(calentaAceMaticSource.models));
  assert.ok(Object.isFrozen(calentaAceMaticCatalogs));
  assert.deepEqual(calentaAceMaticCatalogs, guide.catalogs.slice(3, 8));

  for (const expected of sourceTables) {
    const catalog = catalogById(expected.id);
    assert.deepEqual(catalog.codes.map(({ code }) => code), expected.codes);
    assert.equal(catalog.codes.length, expected.count);
    assert.equal(new Set(catalog.codes.map(({ code }) => code)).size, expected.count);
    assert.ok(Object.isFrozen(catalog));
    assert.ok(Object.isFrozen(catalog.codes));
    assert.match(catalog.title, /Calenta Ace-Matic/);
    assert.ok(catalog.title.includes(expected.component));
    assert.match(catalog.title, expected.status);
    assert.equal(catalog.sourceUrl, sourceFacts.sourceUrl);
    assert.equal(catalog.sourcePages, `NL tabel ${expected.table}, p. ${expected.pages}`);
    assert.ok(catalog.scope.includes(sourceFacts.revision));
    assert.ok(catalog.scope.includes(`tabel ${expected.table}`));
    assert.ok(catalog.scope.includes(expected.component));
    for (const model of sourceFacts.models) assert.ok(catalog.scope.includes(model));
    for (const excluded of ["25L", "Calenta Ace", "Avanta", "Tzerra", "Quinta", "andere revisies"]) assert.ok(catalog.scope.includes(excluded));
    if (expected.component === "SCB-10") assert.match(catalog.scope, /aanwezige SCB-10-uitbreiding/);
    for (const entry of catalog.codes) {
      assert.ok(Object.isFrozen(entry));
      assert.ok(entry.meaning.length > 15);
      assert.ok(entry.userAction.length >= 80);
      assert.equal(entry.sourcePage, catalog.sourcePages);
      assert.ok(entry.searchTerms.includes(entry.code));
      assert.doesNotMatch(`${entry.meaning} ${entry.userAction}`, /GP\d{3}|CP\d{3}|DP\d{3}|AP\d{3}|stroomtoevoer afsluiten|schakel de stroomvoorziening uit en weer in|vervang de|ontlucht de gasleiding/i);
    }
  }
});

test("Ace-Matic meanings retain real component differences, states and distinct three-digit subcodes", () => {
  assert.match(row("cu-warnings", "A02.18")?.meaning ?? "", /configuratie/i);
  assert.match(row("scb-warnings", "A.02.18")?.meaning ?? "", /woordenboekobject/i);
  assert.match(row("cu-warnings", "A02.80")?.meaning ?? "", /afsluitweerstand/i);
  assert.match(row("scb-warnings", "A.02.80")?.meaning ?? "", /cascaderegelaar/i);
  assert.match(row("cu-blocking", "H02.38")?.meaning ?? "", /vulcycli/i);
  assert.match(row("scb-blocking", "H.02.38")?.meaning ?? "", /waterhardheid/i);
  assert.match(row("cu-blocking", "H01.18")?.meaning ?? "", /waterdoorstroming/i);
  assert.match(row("scb-blocking", "H.01.18")?.meaning ?? "", /temperatuur.*stijgt|temperatuurstijging/i);
  assert.match(row("cu-blocking", "H01.09")?.meaning ?? "", /gasdrukschakelaar/i);
  assert.match(row("scb-blocking", "H.01.09")?.meaning ?? "", /gasdrukschakelaar/i);
  assert.match(row("scb-warnings", "A.02.69")?.meaning ?? "", /demonstratiemodus/i);
  assert.match(row("scb-warnings", "A.03.17")?.meaning ?? "", /veiligheidscontrole.*uitgevoerd/i);
  assert.match(row("scb-blocking", "H.03.17")?.meaning ?? "", /veiligheidscontrole.*uitgevoerd/i);
  assert.match(row("cu-blocking", "H02.00")?.meaning ?? "", /resetprocedure.*loopt/i);
  assert.match(row("cu-blocking", "H03.45")?.meaning ?? "", /lambda.*uitgeschakeld/i);
  assert.match(row("scb-warnings", "A.21.02")?.meaning ?? "", /voorkeur.*niet-voorkeur/i);
  for (const code of ["H03.54", "H03.254"]) assert.ok(row("cu-blocking", code));
  for (const code of ["E04.50", "E04.250", "E04.25", "E04.254"]) assert.ok(row("cu-locking", code));
  assert.match(row("cu-locking", "E04.25").meaning, /vlam.*veiligheidstijd/i);
  assert.match(row("cu-locking", "E04.254").meaning, /onbekende/i);
});

test("manufacturer ambiguities remain visible without invented sensor diagnoses", () => {
  for (const code of ["A.00.109", "A.00.111", "A.00.113"]) {
    const meaning = row("scb-warnings", code)?.meaning ?? "";
    assert.match(meaning, /sensor/i);
    assert.match(meaning, /bronbeschrijvingen.*verschillen/i);
    assert.match(meaning, /technische diagnose/i);
    assert.doesNotMatch(meaning, /kortsluit|onderbroken|beneden|boven|verwijderd/i);
  }
  for (const code of ["H.00.107", "H.00.108"]) {
    const meaning = row("scb-blocking", code)?.meaning ?? "";
    assert.match(meaning, /bronbeschrijvingen.*verschillen/i);
    assert.match(meaning, /technische diagnose/i);
    assert.doesNotMatch(meaning, /bodem|menging|kortsluit|onderbroken|beneden|boven/i);
  }
  assert.match(row("cu-blocking", "H03.254")?.meaning ?? "", /onbepaalde.*geen specifieke diagnose/i);
});

test("hazardous faults use safe categories and exhausted resets never encourage another retry", () => {
  for (const [suffix, code, action] of [
    ["cu-warnings", "A05.29", /gasgeur/i],
    ["cu-blocking", "H03.31", /Schakel het toestel uit/i],
    ["cu-locking", "E04.04", /Schakel het toestel uit/i],
    ["cu-locking", "E04.50", /gasgeur/i],
    ["cu-locking", "E04.250", /gasgeur/i],
    ["scb-warnings", "A.00.109", /werk niet aan sensoren/i],
    ["scb-blocking", "H.00.105", /werk niet aan sensoren/i],
    ["scb-blocking", "H.03.33", /netspanning/i],
  ]) assert.match(row(suffix, code)?.userAction ?? "", action);
  const exhausted = row("cu-locking", "E04.29");
  assert.match(exhausted?.meaning ?? "", /reset.*bereikt.*Stop.*pogingen/i);
  assert.match(exhausted?.userAction ?? "", /reset niet herhaaldelijk/i);
  assert.doesNotMatch(exhausted.userAction, /reset alleen wanneer/i);
  for (const model of sourceFacts.models) assert.ok(guide.modelWarning.includes(model));
  assert.match(guide.modelWarning, /CU-GH-21.*SCB-10/);
  assert.match(guide.modelWarning, /generatie/i);
  for (const excluded of ["25L", "Calenta Ace", "Tzerra", "Quinta"]) assert.ok(guide.modelWarning.includes(excluded));
});
