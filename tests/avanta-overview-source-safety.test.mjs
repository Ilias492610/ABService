// Reconstruct only independently tested Task83 before earlier named history inverses.
import {beforeTzerraGuide,beforeTzerraRegistry,beforeTzerraHtml,beforeTzerraManifest} from "./fixtures/tzerra-ace-matic-history.mjs";
const faultGuides=liveFaultGuides.map(beforeTzerraGuide);
const getFaultGuide=slug=>beforeTzerraGuide(liveGetFaultGuide(slug));
const pageRegistry=livePageRegistry.map(beforeTzerraRegistry);
const renderFaultGuide=async slug=>beforeTzerraHtml(await liveRenderFaultGuide(slug),slug);
// Historical captures remove only the independently tested named Task80 addition.
import { beforeAtagManualsGuide, beforeAtagManualsManifest, beforeAtagManualsRegistry } from "./fixtures/atag-manuals-history.mjs";
// Reconstruct only the separately verified Task77 addition for historical hashes.
import { beforeGb172Guide, beforeGb172Registry, beforeGb172Manifest } from "./fixtures/buderus-gb172i2-history.mjs";
import { beforeCalentaGuide, beforeCalentaCatalog, beforeCalentaHtml, beforeCalentaManifestEntry, beforeCalentaManifestMirror } from "./fixtures/calenta-legacy-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { faultGuides as liveFaultGuides, getFaultGuide as liveGetFaultGuide } from "../content/fault-guides.mjs";
import { pageRegistry as livePageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { renderFaultGuide as liveRenderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import {
  avantaFacts as f, expectedAvantaRows, beforeAvantaGuide,
  beforeAvantaRegistry, beforeAvantaMetadata, beforeAvantaHtml,
} from "./fixtures/avanta-overview-source-safety.mjs";

const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const guide = getFaultGuide("remeha"), catalog = guide.catalogs.find(c => c.id === f.id);

// Break caught: invented signal/internal/parameter direction or absent-source remedy
// reaches an Avanta customer through the real catalog and server-rendered route.
test("Avanta retains literal17 identifiers and six source-bounded meanings", () => {
  assert.deepEqual(catalog.codes.map(r => r.code), f.literalCodes);
  assert.deepEqual(catalog.codes, expectedAvantaRows);
  assert.equal(catalog.codes.filter((r, i) => r.meaning !== f.before.catalog.codes[i].meaning).length, 6);
  assert.equal(catalog.codes.find(r => r.code === "E:04").meaning, "Na maximaal vijf startpogingen is geen vlam gevormd.");
  for (const code of ["E:07", "E:10"]) assert.equal(catalog.codes.find(r => r.code === code).meaning, "Er is geen water in de ketel of de pomp draait niet.");
  assert.ok(!catalog.codes.some(r => r.code === "E:00" || r.code === "E:14"));
});

test("every Avanta card gives observation rather than unsourced reset filling or shutdown", () => {
  for (const [i, row] of catalog.codes.entries()) {
    assert.equal(row.userAction, f.action, row.code);
    assert.equal(row.sourcePage, `Online lijstregel ${i + 1}: ${f.literalCodes[i]}`);
    assert.equal(row.searchTerms, f.before.catalog.codes[i].searchTerms);
    assert.doesNotMatch(row.userAction, /reset|bijvul|ontlucht|schakel.*uit|vervang|bedrading|uitsluitend voor bevoegde/i);
  }
});

test("Avanta scope distinguishes an observed overview from device fit and instructions", () => {
  assert.equal(catalog.scope, f.scope); assert.equal(catalog.sourcePages, f.pages);
  assert.equal(catalog.sourceUrl, f.url); assert.equal(catalog.sourceLabel, f.label);
  assert.equal(beforeCalentaGuide(guide).modelWarning, f.warning); assert.equal(catalog.title, "Avanta");
  assert.equal(hash(guide.catalogs.filter(c => c.id !== f.id).map(beforeCalentaCatalog)), f.preservation.remeha.otherTwelveCatalogs);
  assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).filter(g => g.slug !== "remeha")), f.preservation.remeha.otherTwelveGuides);
});

test("real source-code searches preserve selected Avanta and cross-catalog distinctions", () => {
  for (const code of f.literalCodes) for (const query of [code, ` ${code.toLowerCase().split("").join(" : ")} `]) {
    const result = filterFaultCatalogs(guide.catalogs, query, f.id);
    assert.deepEqual(result.map(c => c.id), [f.id]);
    assert.deepEqual(result[0].codes.map(r => r.code), [code]);
  }
  for (const query of ["UNKNOWN61", "ZZ99", "Avanta24c", "Avanta 24c", "CalentaAce", "Calenta Ace"]) assert.deepEqual(filterFaultCatalogs(guide.catalogs, query, f.id), []);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs, "", f.id)[0].codes, expectedAvantaRows);
  const e04 = filterFaultCatalogs(guide.catalogs, "E:04", "all");
  assert.ok(e04.some(c => c.id === f.id)); assert.ok(e04.some(c => c.id === "remeha-calenta-legacy"));
});

test("Remeha metadata and substantive sitemap date change without other registry drift", () => {
  const p = pageRegistry.find(p => p.path === "/foutcodes/remeha"), m = buildPageMetadata(p);
  assert.equal(p.description, f.description); assert.equal(p.lastModified, "2026-10-12");
  assert.equal(m.description, f.description); assert.equal(m.openGraph.description, f.description); assert.equal(m.twitter.description, f.description);
  assert.equal(m.alternates.canonical, "https://www.abservice24.be/foutcodes/remeha"); assert.equal(m.robots.index, true);
  assert.equal(buildSitemapEntries(pageRegistry).find(p => p.url === m.alternates.canonical).lastModified, "2026-10-12");
  assert.equal(hash(beforeAvantaMetadata(m, "remeha")), f.preservation.remeha.metadata);
  assert.equal(hash(pageRegistry.map(beforeAtagManualsRegistry).map(beforeGb172Registry).map(beforeAvantaRegistry)), f.preservation.allRegistry);
});

test("all659 Remeha SSR cards preserve original leaves outside exact Avanta changes", async () => {
  const html = await renderFaultGuide("remeha");
  assert.equal((html.match(/class="fault-code-card"/g) || []).length, 659);
  assert.match(html, /\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
  assert.match(html, /gasgeur/i);
  assert.equal(hash(beforeAvantaHtml(beforeCalentaHtml(html, "remeha"), "remeha")), f.preservation.remeha.html);
  assert.equal(hash(beforeAvantaGuide(beforeCalentaGuide(guide))), f.preservation.remeha.guide);
  assert.equal(hash(beforeAvantaGuide(beforeCalentaGuide(guide)).codes), f.preservation.remeha.codes);
  assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).map(beforeCalentaGuide).map(beforeAvantaGuide)), f.preservation.allGuides);
});

test("Avanta manifest retains two original responses but only17 distinct codes", async () => {
  const m = beforeGb172Manifest(beforeAtagManualsManifest(beforeTzerraManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json", import.meta.url), "utf8")))));
  const e = m.entries.find(e => e.id === f.id);
  assert.equal(e.modelScope, f.scope); assert.equal(e.sourcePages, f.pages);
  assert.equal(e.language, "nl-BE"); assert.equal(e.sourceServiceMarket, "België");
  assert.equal(e.literalListEntryCount, 17); assert.deepEqual(e.literalCodes, f.literalCodes);
  assert.equal(e.documentAnchorCount, 24); assert.equal(e.paginationDocumentAnchorCount, 25);
  assert.equal(e.codeLinkControlCount, 17); assert.equal(e.visiblePaginationControlCount, 0);
  assert.equal(e.paginationDuplicateObserved, true); assert.equal(e.literalHtmlTableCount, 0);
  assert.equal(e.primarySnapshot, "remeha-avanta-overview-html"); assert.equal(e.paginationSnapshot, "remeha-avanta-pagination-html");
  for (const k of ["models", "articleNumbers", "market", "documentNumber", "revision", "issueDate", "component", "firmwareCompatibility", "currentBelgianVariantCompatibility", "newestEdition", "audienceRestriction", "resetRule", "boilerDestinationMarket"]) assert.equal(e[k], null, k);
  for (const [id, sha256, bytes] of [["remeha-avanta-overview-html", f.sha256, f.bytes], ["remeha-avanta-pagination-html", f.paginationSha256, f.paginationBytes]]) {
    const s = m.snapshots.find(s => s.id === id); assert.equal(s?.sha256, sha256); assert.equal(s?.bytes, bytes);
    for (const k of ["pageCount", "expectedSha256", "hashMatchesPriorRecord"]) assert.equal(s?.[k], null, k);
  }
  assert.equal(hash(m.entries.filter(e => e.id !== f.id).map(beforeCalentaManifestEntry)), f.preservation.remeha.otherEntries);
  assert.equal(hash(m.guides.filter(g => g.slug !== "remeha").map(beforeCalentaManifestMirror)), f.preservation.remeha.otherMirrors);
  assert.equal(hash(m.snapshots.filter(s => !["remeha-calenta-legacy-pdf","remeha-avanta-overview-html", "remeha-avanta-pagination-html"].includes(s.id))), f.preservation.oldSnapshots);
});
