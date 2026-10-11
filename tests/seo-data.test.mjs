import test from "node:test";
import assert from "node:assert/strict";

import { pageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { adviceGuides } from "../content/advice-guides.mjs";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as areas from "../content/service-areas.mjs";
import * as services from "../content/additional-services.mjs";
import * as brands from "../content/brand-services.mjs";
import * as projects from "../content/projects.mjs";

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

test("editorial metadata uses the explicit registry modification date without inventing a publication date", () => {
  const metadata = buildPageMetadata({ path: "/advies/voorbeeld", title: "Voorbeeld", description: "Uitleg", status: "published", kind: "article", lastModified: "2026-10-10" });
  assert.equal(metadata.openGraph.type, "article");
  assert.equal(metadata.openGraph.modifiedTime, "2026-10-10");
  assert.ok(!metadata.openGraph.publishedTime);
  assert.equal(metadata.authors[0].name, "AB Service");
  const plain = buildSitemapEntries([{ path: "/", status: "published" }]);
  assert.ok(!Object.hasOwn(plain[0], "lastModified"));
});

test("registry, OG and sitemap derive article modification only from modifiedAt", async () => {
  const original = adviceGuides[0];
  // Only input data changes: the complete production registry and SEO builders run.
  for (const modifiedAt of [undefined, "2026-10-10", "2026-10-11"]) {
    const { pageRegistry: isolated } = await loadContactModule("content/site-content.mjs", {
      "./service-areas.mjs": areas,
      "./additional-services.mjs": services,
      "./brand-services.mjs": brands,
      "./projects.mjs": projects,
      "./advice-guides.mjs": { adviceGuides: [{ ...original, checkedAt: "2026-10-12", modifiedAt }] },
    });
    const page = isolated.find(({ path }) => path === original.path);
    const metadata = buildPageMetadata(page);
    const sitemap = buildSitemapEntries(isolated).find(({ url }) => url.endsWith(original.path));
    assert.equal(page.lastModified, modifiedAt);
    assert.equal(metadata.openGraph.modifiedTime, modifiedAt);
    assert.equal(sitemap.lastModified, modifiedAt);
    if (!modifiedAt) {
      assert.ok(!Object.hasOwn(metadata.openGraph, "modifiedTime"));
      assert.ok(!Object.hasOwn(sitemap, "lastModified"));
    }
  }
});

test("actual guide registry, OG and sitemap retain five dates and advance the attest revision", () => {
  const sitemap = buildSitemapEntries(pageRegistry);
  for (const guide of adviceGuides) {
    const expected = guide.slug === "onderhoudsattest-cv-ketel" ? "2026-10-11" : "2026-10-10";
    const page = pageRegistry.find(({ path }) => path === guide.path);
    assert.equal(page.lastModified, expected, guide.path);
    assert.equal(buildPageMetadata(page).openGraph.modifiedTime, expected, guide.path);
    assert.equal(sitemap.find(({ url }) => url.endsWith(guide.path)).lastModified, expected, guide.path);
  }
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
