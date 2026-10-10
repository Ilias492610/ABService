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
  assert.ok(urls.includes("https://www.abservice24.be/diensten/lekdetectie"));
  assert.ok(urls.includes("https://www.abservice24.be/merken/vaillant"));
  assert.ok(urls.includes("https://www.abservice24.be/projecten/gasketel-vervangen"));
  assert.ok(urls.includes("https://www.abservice24.be/advies/drukverlies-cv-ketel"));
  assert.ok(urls.includes("https://www.abservice24.be/foutcodes/bosch"));
  assert.ok(urls.includes("https://www.abservice24.be/foutcodes/junkers"));
  assert.ok(!urls.includes("https://www.abservice24.be/installaties/airconditioning"));
  const tool = sitemap.find((entry) => entry.url.endsWith("/tools/onderhoudscheck"));
  assert.equal(tool?.lastModified, "2026-10-10");
  assert.ok(urls.includes("https://www.abservice24.be/advies"));
  assert.ok(urls.includes("https://www.abservice24.be/advies/geen-warm-water"));
  for (const entry of sitemap) {
    const definition = pageRegistry.find((page) => `https://www.abservice24.be${page.path === "/" ? "/" : page.path}` === entry.url);
    assert.equal(entry.lastModified, definition.lastModified);
  }
});

test("editorial metadata uses the checked article date without inventing a publication date", () => {
  const metadata = buildPageMetadata({ path: "/advies/voorbeeld", title: "Voorbeeld", description: "Uitleg", status: "published", kind: "article", lastModified: "2026-10-10" });
  assert.equal(metadata.openGraph.type, "article");
  assert.equal(metadata.openGraph.modifiedTime, "2026-10-10");
  assert.ok(!metadata.openGraph.publishedTime);
  assert.equal(metadata.authors[0].name, "AB Service");
  const plain = buildSitemapEntries([{ path: "/", status: "published" }]);
  assert.ok(!Object.hasOwn(plain[0], "lastModified"));
});

test("published pages have distinct topic previews without changing the homepage or noindex fallback", () => {
  const project = pageRegistry.find((page) => page.path === "/projecten/gasketel-vervangen");
  const metadata = buildPageMetadata(project);
  assert.equal(metadata.openGraph.images[0].url, "https://www.abservice24.be/social/projecten/gasketel-vervangen");
  assert.equal(metadata.twitter.images[0], metadata.openGraph.images[0].url);
  assert.equal(metadata.openGraph.images[0].alt, "Verouderde gasketel vervangen en installatie ingeregeld — AB Service");
  assert.equal(metadata.openGraph.images[0].width, 1200);
  assert.equal(metadata.openGraph.images[0].height, 630);
  const published = pageRegistry.filter((page) => page.status === "published");
  assert.equal(new Set(published.map((page) => buildPageMetadata(page).openGraph.images[0].url)).size, published.length);
  for (const path of ["/", "/installaties/airconditioning"]) {
    assert.equal(buildPageMetadata(pageRegistry.find((page) => page.path === path)).openGraph.images[0].url, "https://www.abservice24.be/opengraph-image");
  }
});
