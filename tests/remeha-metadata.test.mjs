import test from "node:test";
import assert from "node:assert/strict";
import { getPageDefinition, pageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";

test("Remeha metadata includes the documented Ace-Matic family and no universal scope", () => {
  const entry = getPageDefinition("/foutcodes/remeha");
  assert.equal(entry.title, "Remeha foutcodes: Avanta, Calenta en Ace-Matic | AB Service");
  assert.equal(entry.description, "Zoek Remeha Avanta-, Calenta- en Calenta Ace-Matic-codes. Kies toestelreeks en component, controleer de officiële bron en lees veilige eerste stappen.");
  assert.equal(entry.status, "published");
  const metadata = buildPageMetadata(entry);
  assert.equal(metadata.alternates.canonical, "https://www.abservice24.be/foutcodes/remeha");
  assert.equal(metadata.openGraph.title, entry.title);
  assert.equal(metadata.openGraph.description, entry.description);
  assert.equal(metadata.twitter.title, entry.title);
  assert.equal(metadata.robots.index, true);
});

test("Remeha sitemap records the actual substantive catalog change without dating unrelated guides", () => {
  const entries = buildSitemapEntries(pageRegistry);
  assert.equal(entries.find(e => e.url === "https://www.abservice24.be/foutcodes/remeha").lastModified, "2026-10-11");
  for (const path of ["/foutcodes/vaillant", "/foutcodes/acv", "/foutcodes/bulex"]) {
    assert.equal(getPageDefinition(path).lastModified, undefined);
  }
});
