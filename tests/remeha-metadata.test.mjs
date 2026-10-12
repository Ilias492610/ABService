// Reconstruct only independently tested Task83 before earlier named history inverses.
import {beforeTzerraRegistry} from "./fixtures/tzerra-ace-matic-history.mjs";
const getPageDefinition=path=>beforeTzerraRegistry(liveGetPageDefinition(path));
const pageRegistry=livePageRegistry.map(beforeTzerraRegistry);
import test from "node:test";
import { avantaFacts } from "./fixtures/avanta-overview-source-safety.mjs";
import assert from "node:assert/strict";
import { getPageDefinition as liveGetPageDefinition, pageRegistry as livePageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { beforeAcvRegistry } from "./fixtures/acv-prestige-source-safety.mjs";

test("Remeha metadata includes the documented Ace-Matic family and no universal scope", () => {
  const entry = getPageDefinition("/foutcodes/remeha");
  assert.equal(entry.title, "Remeha foutcodes: Avanta, Calenta en Ace-Matic | AB Service");
  assert.equal(entry.description, avantaFacts.description);
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
  assert.equal(entries.find(e => e.url === "https://www.abservice24.be/foutcodes/remeha").lastModified, "2026-10-12");
  for (const path of ["/foutcodes/acv"]) {
    // Only independently tested Task50's real ACV modification is projected;
    // the original unrelated-page capture remains unchanged.
    assert.equal(beforeAcvRegistry(getPageDefinition(path)).lastModified, undefined);
  }
});
