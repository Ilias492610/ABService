import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { faultGuides } from "../content/fault-guides.mjs";

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
  assert.equal(manifest.entries.filter(e => e.primarySnapshot?.endsWith("-pdf")).length, 14);
  assert.equal(manifest.entries.filter(e => !e.primarySnapshot).length, 16);
  assert.equal(manifest.snapshots.filter(s => s.hashMatchesPriorRecord === true).length, 7);
  assert.equal(manifest.snapshots.find(s => s.id === "vaillant-public-html").expectedSha256, null);
  for (const e of manifest.entries) {
    assert.match(e.sourceURL, /^https:\/\//);
    assert.ok(e.verificationBasis && e.fieldBoundary && e.sourceEvidencePath.length);
    if (e.id.startsWith("bosch-")) {
      for (const field of ["models", "articleNumbers", "revision", "market", "language"]) assert.equal(e[field], null);
    }
  }
  assert.match(manifest.purpose, /not source re-audit/);
  assert.equal(manifest.entries.find(e => e.id === "bulex-thema-condens").articleNumbers[0], "0010010389");
  assert.equal(manifest.entries.find(e => e.id === "buderus-logamax-gb162-v2").literalCombinationCount, 74);
});
