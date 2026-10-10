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
    assert.notEqual(spawnSync(process.execPath, ["scripts/gsc-analysis.mjs", "--queries", queryFile]).status, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
