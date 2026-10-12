import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { faultGuides } from "../content/fault-guides.mjs";
import { boschBoundaryFacts } from "./fixtures/bosch-junkers-source-boundaries.mjs";
import { acvFacts } from "./fixtures/acv-prestige-source-safety.mjs";
import { intergasFacts } from "./fixtures/intergas-prestige-source-context.mjs";
import { nefitFacts } from "./fixtures/nefit-proline-source-safety.mjs";

const manifest = JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json", import.meta.url), "utf8"));
const catalogs = [...new Map(faultGuides.flatMap(g => g.catalogs.map(c => [c.id, c]))).values()];

test("the bounded model inventory matches every real guide assignment, scope, source and row count", () => {
  assert.deepEqual(manifest.counts, {
    guides: faultGuides.length,
    catalogAssignments: faultGuides.reduce((n,g) => n + g.catalogs.length, 0),
    distinctCatalogs: catalogs.length,
    displayedExplanationRows: faultGuides.reduce((n,g) => n + g.codeEntryCount, 0),
    distinctCatalogExplanationRows: catalogs.reduce((n,c) => n + c.codes.length, 0),
    distinctCatalogSourceURLs: new Set(catalogs.map(c => c.sourceUrl)).size,
  });
  assert.deepEqual(manifest.entries.map(e => e.id), catalogs.map(c => c.id));
  assert.deepEqual(manifest.guides.map(g => g.slug), faultGuides.map(g => g.slug));
  for (const g of faultGuides) {
    const entry = manifest.guides.find(e => e.slug === g.slug);
    assert.equal(entry.brand, g.brand);
    assert.equal(entry.modelWarning, g.modelWarning);
    assert.equal(entry.explanationRowCount, g.codeEntryCount);
    assert.deepEqual(entry.catalogIds, g.catalogs.map(c => c.id));
    assert.equal(entry.documentationURL, g.documentationUrl);
    assert.equal(entry.documentationLabel, g.documentationLabel);
  }
  for (const c of catalogs) {
    const e = manifest.entries.find(e => e.id === c.id);
    assert.equal(e.title, c.title);
    assert.equal(e.modelScope, c.scope);
    assert.equal(e.sourceURL, c.sourceUrl);
    assert.equal(e.sourceLabel, c.sourceLabel);
    assert.equal(e.sourcePages, c.sourcePages);
    assert.equal(e.explanationRowCount, c.codes.length);
    assert.deepEqual(e.usedBy, faultGuides.filter(g => g.catalogs.some(x => x.id === c.id)).map(g => g.slug));
  }
});

test("the inventory keeps unknown fields and retained evidence distinct rather than declaring a fresh audit", () => {
  // One actual Task62 PDF now supports both previously declared legacy tables.
  assert.equal(manifest.entries.filter(e => e.primarySnapshot?.endsWith("-pdf")).length, 33);
  assert.equal(manifest.entries.filter(e => !e.primarySnapshot).length, 0);
  assert.equal(manifest.snapshots.filter(s => s.hashMatchesPriorRecord === true).length, 7);
  assert.equal(manifest.snapshots.find(s => s.id === "vaillant-public-html").expectedSha256, null);
  for (const e of manifest.entries) {
    assert.match(e.sourceURL, /^https:\/\//);
    assert.ok(e.verificationBasis && e.fieldBoundary && e.sourceEvidencePath.length);
    if (e.id.startsWith("bosch-")) {
      for (const field of ["models", "articleNumbers", "documentNumber", "revision", "issueDate", "market"]) assert.equal(e[field], null);
      assert.equal(e.language, "nl");
      assert.equal(e.primarySnapshot, "bosch-junkers-codebook-pdf");
      const facts = boschBoundaryFacts.entries.find(f => f.id === e.id);
      assert.equal(e.sourceChapterPage, facts.chapterPage);
      assert.equal(e.sourceChapterGeneration, facts.chapterGeneration);
      assert.equal(e.sourceAudience, "professional-installer-guide");
      assert.match(e.verificationBasis, /not.*242.*row.*audit/i);
    }
  }
  assert.match(manifest.purpose, /not source re-audit/);
  assert.equal(manifest.entries.find(e => e.id === "bulex-thema-condens").articleNumbers[0], "0010010389");
  assert.equal(manifest.entries.find(e => e.id === "buderus-logamax-gb162-v2").literalCombinationCount, 74);
  const snapshot = manifest.snapshots.find(s => s.id === "bosch-junkers-codebook-pdf");
  assert.equal(snapshot.sha256, boschBoundaryFacts.sha256);
  assert.equal(snapshot.expectedSha256, null);
  assert.equal(snapshot.hashMatchesPriorRecord, null);
  assert.equal(snapshot.pageCount, boschBoundaryFacts.pageCount);
  const acv = manifest.entries.find(e => e.id === acvFacts.id);
  assert.deepEqual(acv.models, acvFacts.models);
  assert.equal(acv.documentNumber, acvFacts.document);
  assert.equal(acv.revision, acvFacts.revision);
  assert.equal(acv.issueDate, acvFacts.issueMonth);
  assert.equal(acv.issueDatePrecision, "month");
  assert.equal(acv.language, "nl");
  assert.equal(acv.controller, "ESYS");
  assert.equal(acv.literalCodeGroupCount, 24);
  assert.equal(acv.literalDescriptionSubrowCount, 25);
  for (const field of ["articleNumbers", "market", "component", "tableIds"]) assert.equal(acv[field], null);
  const acvSnapshot = manifest.snapshots.find(s => s.id === "acv-prestige-mkiii-pdf");
  assert.equal(acvSnapshot.sha256, acvFacts.sha256);
  assert.equal(acvSnapshot.expectedSha256, null);
  assert.equal(acvSnapshot.hashMatchesPriorRecord, null);
  assert.equal(acvSnapshot.pageCount, acvFacts.pageCount);
  const intergas = manifest.entries.find(e => e.id === intergasFacts.id);
  assert.deepEqual(intergas.models, intergasFacts.models);
  assert.equal(intergas.documentNumber, intergasFacts.document);
  assert.equal(intergas.language, "nl");
  assert.equal(intergas.literalCodeGroupCount, 11);
  assert.equal(intergas.literalNumericIdentifierCount, 20);
  assert.equal(intergas.literalGroupedCellCount, 3);
  assert.match(intergas.displayContext, /Blinking fault LED.*temperature display.*service-display/);
  for (const field of ["revision", "issueDate", "articleNumbers", "market", "component", "tableIds"]) assert.equal(intergas[field], null);
  const intergasSnapshot = manifest.snapshots.find(s => s.id === "intergas-prestige-pdf");
  assert.equal(intergasSnapshot.sha256, intergasFacts.sha256);
  assert.equal(intergasSnapshot.expectedSha256, null);
  assert.equal(intergasSnapshot.hashMatchesPriorRecord, null);
  assert.equal(intergasSnapshot.pageCount, intergasFacts.pageCount);
  const nefit = manifest.entries.find(e => e.id === nefitFacts.id);
  assert.deepEqual(nefit.models, nefitFacts.models);
  assert.equal(nefit.documentNumber, nefitFacts.document);
  assert.equal(nefit.issueDate, nefitFacts.issueMonth);
  assert.equal(nefit.issueDatePrecision, "month");
  assert.equal(nefit.language, "nl");
  assert.deepEqual(nefit.market, ["Nederland"]);
  assert.equal(nefit.literalPhysicalRowCount, 95);
  assert.equal(nefit.literalCombinationCount, 78);
  assert.equal(nefit.selectedMeaningCellCount, 52);
  assert.equal(nefit.excludedStateRowCount, 17);
  assert.match(nefit.displayContext, /9Y.*blank subcode.*padlock/);
  for (const field of ["revision", "articleNumbers", "controllerSku", "firmwareCompatibility", "currentBelgianVariantCompatibility", "newestEdition"]) assert.equal(nefit[field], null);
  const nefitSnapshot = manifest.snapshots.find(s => s.id === "nefit-proline-pdf");
  assert.equal(nefitSnapshot.sha256, nefitFacts.sha256);
  assert.equal(nefitSnapshot.pageCount, nefitFacts.pageCount);
  assert.equal(nefitSnapshot.expectedSha256, null);
  assert.equal(nefitSnapshot.hashMatchesPriorRecord, null);
  // Task83 adds two paired Tzerra originals, preserving all22 prior originals.
  assert.equal(manifest.snapshots.length, 24);
});
