import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseCsv, parseGscCsv, isBrandQuery, buildGscAnalysis } from "../libs/gsc-analysis.mjs";

const queries = 'Top queries,Clicks,Impressions,CTR,Position\nloodgieter wilrijk,2,100,2%,12\nAB Service,5,100,5%,1\nkleine vraag,0,9,0%,15\nketel onderhoud,0,50,0%,25\n';
const pages = 'Top pages,Clicks,Impressions,CTR,Position\nhttps://www.abservice24.be/loodgieter-wilrijk,10,1000,1%,13\nhttps://www.abservice24.be/onderhoud,3,300,1%,25\n';

test("CSV preserves BOM, quoted commas, escaped quotes, multiline cells and CRLF", () => {
  assert.deepEqual(parseCsv('\uFEFFQuery,Note\r\n"druk, laag","regel 1\nregel ""2"""\r\n'), [
    ["Query", "Note"], ["druk, laag", 'regel 1\nregel "2"'],
  ]);
});

test("CSV rejects unclosed quotes, stray quotes and inconsistent rows", () => {
  assert.throws(() => parseCsv('a,b\n"open,b'), /quote/i);
  assert.throws(() => parseCsv('a,b\nx"y,z'), /quote/i);
  assert.throws(() => parseGscCsv('Query,Clicks,Impressions,CTR,Position\na,1,10,10%\n', { kind: "queries" }), /column|field/i);
});

test("Dutch headings and localized decimal percentages preserve observed metrics", () => {
  const csv = 'Meest uitgevoerde zoekopdrachten,Aantal klikken,Vertoningen,CTR,Positie\n"ketel, koud",12,"1.234","0,97%","12,5"\n';
  const [row] = parseGscCsv(csv, { kind: "queries" });
  assert.equal(row.query, "ketel, koud");
  assert.equal(row.clicks, 12);
  assert.equal(row.impressions, 1234);
  assert.equal(row.exportedCtr, 0.0097);
  assert.equal(row.observedCtr, 12 / 1234);
  assert.equal(row.position, 12.5);
  assert.equal(parseGscCsv('Pagina,Aantal klikken,Vertoningen,CTR,Positie\nhttps://www.abservice24.be/,0,0,0%,0\n', { kind: "pages" })[0].observedCtr, 0);
  assert.equal(parseGscCsv('Zoekopdracht,Clicks,Impressions,CTR,Position\ncv,1,100,0.01,9\n', { kind: "queries" })[0].exportedCtr, 0.01);
});

test("native Dutch GSC Toppagina's heading identifies page rows", () => {
  // Exact observed export header; the row metrics below are synthetic regression data.
  const csv = "Toppagina's,Aantal klikken,Vertoningen,CTR,Positie\nhttps://www.abservice24.be/onderhoud,3,250,\"1,2%\",\"12,5\"\n";
  assert.deepEqual(parseGscCsv(csv, { kind: "pages" }), [{
    page: "https://www.abservice24.be/onderhoud",
    clicks: 3,
    impressions: 250,
    exportedCtr: 0.012,
    position: 12.5,
    observedCtr: 0.012,
  }]);
});

test("invalid schemas and impossible metrics cannot become opportunities", () => {
  for (const csv of [
    'Query,Clicks,CTR,Position\nx,1,1%,8\n',
    'Query,Clicks,Impressions,CTR,Position\nx,-1,10,0%,8\n',
    'Query,Clicks,Impressions,CTR,Position\nx,11,10,10%,8\n',
    'Query,Clicks,Impressions,CTR,Position\nx,1,10,101%,8\n',
    'Query,Clicks,Impressions,CTR,Position\nx,1,10,10%,NaN\n',
    'Query,Clicks,Impressions,CTR,Position\nx,1,10,10%,0\n',
    'Query,Clicks,Impressions,CTR,Position\nx,1.5,10,10%,8\n',
  ]) assert.throws(() => parseGscCsv(csv, { kind: "queries" }));
  assert.throws(() => parseGscCsv('Query,Clicks,Impressions,CTR,Position\nx,1,10,10%,8\nx,1,10,10%,9\n', { kind: "queries" }), /duplicate/i);
  assert.throws(() => parseGscCsv('Query,Clicks,Impressions,CTR,Position\nx,1,10,10%,8\n', { kind: "pairs" }), /page|pagina/i);
});

test("brand matching is case insensitive and respects whole-word boundaries", () => {
  for (const query of ["AB SERVICE Antwerpen", "abservice", "abservice24.be", "ab-service onderhoud", "bel ab service24"])
    assert.equal(isBrandQuery(query), true, query);
  for (const query of ["abcservice", "lab service", "ab serviceloos", "slabservice24", "loodgieter service"])
    assert.equal(isBrandQuery(query), false, query);
});

test("analysis filters low-impression and branded queries and labels the heuristic", () => {
  const analysis = buildGscAnalysis({ queriesCsv: queries, pagesCsv: pages });
  assert.deepEqual(analysis.queryCandidates.map((row) => row.query), ["loodgieter wilrijk", "ketel onderhoud"]);
  assert.equal(analysis.queryCandidates[0].strikingDistance, true);
  assert.equal(analysis.queryCandidates[0].impressions, 100);
  assert.equal(analysis.queryCandidates[0].observedCtr, 0.02);
  assert.equal(analysis.queryCandidates[1].strikingDistance, false);
  assert.match(analysis.method.priority, /heuristic/i);
  assert.equal(analysis.pairedCandidates.length, 0);
  assert.throws(() => buildGscAnalysis({ queriesCsv: queries, pagesCsv: pages, minImpressions: -1 }));
});

test("independent query/page matches remain inferred and never borrow page totals", () => {
  const analysis = buildGscAnalysis({ queriesCsv: queries, pagesCsv: pages });
  const match = analysis.inferredMatches.find((row) => row.query === "loodgieter wilrijk");
  assert.equal(match.certainty, "inferred");
  assert.match(match.warning, /not.*observed|uncertain/i);
  assert.equal(match.page, "https://www.abservice24.be/loodgieter-wilrijk");
  assert.equal(analysis.queryCandidates.find((row) => row.query === match.query).impressions, 100);
  assert.equal(analysis.pageCandidates.find((row) => row.page === match.page).impressions, 1000);
  assert.equal(match.impressions, undefined);
});

test("valid paired dimensions retain exact metrics distinct from independent totals", () => {
  const pairsCsv = 'Zoekopdracht,Pagina,Aantal klikken,Vertoningen,CTR,Positie\nloodgieter wilrijk,https://www.abservice24.be/loodgieter-wilrijk,1,40,"2,5%","10,5"\n';
  const analysis = buildGscAnalysis({ queriesCsv: queries, pagesCsv: pages, pairsCsv });
  assert.equal(analysis.pairedCandidates.length, 1);
  assert.equal(analysis.pairedCandidates[0].certainty, "observed-pair");
  assert.equal(analysis.pairedCandidates[0].impressions, 40);
  assert.equal(analysis.pairedCandidates[0].observedCtr, 0.025);
  assert.equal(analysis.queryCandidates[0].impressions, 100);
  assert.equal(analysis.pageCandidates[0].impressions, 1000);
  assert.equal(analysis.inferredMatches.some((row) => row.query === "loodgieter wilrijk" && row.page.includes("wilrijk")), false);
});

// Synthetic boundaries exercise selection, never represent AB account observations.
// Catches merged presets, exclusive boundaries and loss of nonbrand/minimum filters.
test("separate position presets select inclusive observed query boundaries after eligibility filters", () => {
  const queriesCsv = 'Query,Clicks,Impressions,CTR,Position\n' + [
    'below,0,10,0%,3.99', 'four,0,10,0%,4', 'eight,0,10,0%,8',
    'eleven,0,10,0%,11', 'fifteen,0,10,0%,15', 'above fifteen,0,10,0%,15.01',
    'twenty,0,10,0%,20', 'above twenty,0,10,0%,20.01', 'thirty,0,10,0%,30',
    'above thirty,0,10,0%,30.01', 'AB Service,0,100,0%,12', 'too few,0,9,0%,12',
  ].join('\n');
  const analysis = buildGscAnalysis({ queriesCsv, pagesCsv: pages });
  assert.ok(Array.isArray(analysis.positionPresets), "separate selection presets are exposed");
  const observed = Object.fromEntries(analysis.positionPresets.map((preset) => [
    preset.id, preset.queryCandidates.map((row) => row.query).sort(),
  ]));
  assert.deepEqual(observed, {
    'positions-8-20': ['above fifteen', 'eight', 'eleven', 'fifteen', 'twenty'],
    'positions-4-15': ['eight', 'eleven', 'fifteen', 'four'],
    'positions-11-20': ['above fifteen', 'eleven', 'fifteen', 'twenty'],
    'phase-e-4-30': ['above fifteen', 'above twenty', 'eight', 'eleven', 'fifteen', 'four', 'thirty', 'twenty'],
  });
  assert.equal(analysis.queryCandidates.length, 10, "legacy overall candidates retain out-of-range rows");
});

// Catches borrowing independent query/page metrics or selecting a pair from query position.
test("presets retain only observed pairs using each pair's own position and impression count", () => {
  const pairsCsv = 'Query,Page,Clicks,Impressions,CTR,Position\n' + [
    'loodgieter wilrijk,https://www.abservice24.be/loodgieter-wilrijk,1,20,5%,25',
    'ketel onderhoud,https://www.abservice24.be/onderhoud,1,15,6.67%,8',
    'AB Service,https://www.abservice24.be/,1,50,2%,12',
    'kleine vraag,https://www.abservice24.be/onderhoud,0,9,0%,12',
  ].join('\n');
  const analysis = buildGscAnalysis({ queriesCsv: queries, pagesCsv: pages, pairsCsv, minImpressions: 15 });
  assert.ok(Array.isArray(analysis.positionPresets), "separate selection presets are exposed");
  const preset = analysis.positionPresets.find((row) => row.id === 'positions-8-20');
  assert.deepEqual(preset.pairedCandidates.map((row) => [row.query, row.impressions, row.position, row.certainty]), [
    ['ketel onderhoud', 15, 8, 'observed-pair'],
  ]);
  assert.equal(preset.minImpressions, 15);
  assert.equal(preset.pageCandidates, undefined);
  assert.equal(analysis.pageCandidates[0].impressions, 1000);
  assert.deepEqual(analysis.positionPresets.find((row) => row.id === 'phase-e-4-30').pairedCandidates.map((row) => row.query), [
    'ketel onderhoud', 'loodgieter wilrijk',
  ]);
  const stricter = buildGscAnalysis({ queriesCsv: queries, pagesCsv: pages, pairsCsv, minImpressions: 21 });
  assert.equal(stricter.positionPresets.find((row) => row.id === 'positions-8-20').pairedCandidates.length, 0);
});

test("paired data rejects invalid URLs and duplicated query/page dimensions", () => {
  assert.throws(() => parseGscCsv('Query,Page,Clicks,Impressions,CTR,Position\nx,javascript:alert(1),1,10,10%,8\n', { kind: "pairs" }), /url/i);
  assert.throws(() => parseGscCsv('Query,Page,Clicks,Impressions,CTR,Position\nx,https://www.abservice24.be/,1,10,10%,8\nx,https://www.abservice24.be/,1,10,10%,8\n', { kind: "pairs" }), /duplicate/i);
});

test("CLI imports real files, writes JSON and rejects missing flags without success", () => {
  const dir = mkdtempSync(join(tmpdir(), "abservice-gsc-test-"));
  try {
    const queryFile = join(dir, "queries.csv");
    const pageFile = join(dir, "pages.csv");
    const output = join(dir, "analysis.json");
    writeFileSync(queryFile, queries);
    writeFileSync(pageFile, pages);
    execFileSync(process.execPath, ["scripts/gsc-analysis.mjs", "--queries", queryFile, "--pages", pageFile, "--output", output]);
    const report = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(report.queryCandidates[0].impressions, 100);
    assert.equal(report.inputFiles.queries, queryFile);
    assert.match(report.limitations.join(" "), /search volume/i);
    assert.ok(Array.isArray(report.positionPresets), "CLI exposes independent position selections");
    assert.match(report.limitations.join(" "), /aggregate impressions.*monthly demand/i);
    assert.notEqual(spawnSync(process.execPath, ["scripts/gsc-analysis.mjs", "--queries", queryFile]).status, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
