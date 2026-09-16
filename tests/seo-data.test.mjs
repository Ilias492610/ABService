import test from "node:test";
import assert from "node:assert/strict";

import { pageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";

test("published page metadata is unique and uses the canonical host", () => {
  const published = pageRegistry.filter((page) => page.status === "published");
  const metadata = published.map((page) => buildPageMetadata(page));

  assert.equal(new Set(metadata.map((item) => item.title)).size, metadata.length);
  assert.equal(new Set(metadata.map((item) => item.description)).size, metadata.length);
  assert.ok(
    metadata.every((item) =>
      item.alternates.canonical.startsWith("https://www.abservice24.be/")
    )
  );
  assert.ok(metadata.every((item) => item.robots.index === true));
});

test("noindex metadata stays canonical but cannot be indexed", () => {
  const airConditioning = pageRegistry.find(
    (page) => page.path === "/installaties/airconditioning"
  );
  const metadata = buildPageMetadata(airConditioning);

  assert.equal(
    metadata.alternates.canonical,
    "https://www.abservice24.be/installaties/airconditioning"
  );
  assert.deepEqual(metadata.robots, { index: false, follow: true });
});

test("sitemap entries contain only published pages and no fabricated dates", () => {
  const sitemap = buildSitemapEntries(pageRegistry);
  const urls = sitemap.map((entry) => entry.url);

  assert.ok(urls.includes("https://www.abservice24.be/tarieven"));
  assert.ok(!urls.includes("https://www.abservice24.be/installaties/airconditioning"));
  assert.ok(!urls.includes("https://www.abservice24.be/foutcodes/bosch"));
  assert.ok(sitemap.every((entry) => !("lastModified" in entry)));
});
