import { beforeSanitaryReferralRegistry, beforeSanitaryReferralSitemapEntry, beforeSanitaryReferralSource } from "./fixtures/sanitary-referral-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { pageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { buildGlobalSchemaGraph } from "../libs/schema-data.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { renderFooter, renderFooterWithDate, renderPrivacy, renderTerms, renderGlobalSchema, privacyRoute, termsRoute, renderEvents } from "./helpers/registered-seat-runtime.mjs";
import { beforeRegisteredSeatRegistry, beforeRegisteredSeatSitemapEntry, beforeRegisteredSeatHtml } from "./fixtures/registered-seat-history.mjs";
import { beforeFooterFactsCss } from "./fixtures/footer-facts-layout-history.mjs";
import { beforeMaintenanceResetSource } from "./fixtures/maintenance-reset-history.mjs";
import { beforeMaintenanceSubmitFocusSource } from "./fixtures/maintenance-submit-focus-history.mjs";
import { beforeMaintenanceReadinessSource } from "./fixtures/maintenance-readiness-history.mjs";
const bytes = await readFile(new URL("./fixtures/registered-seat-facts.json", import.meta.url));
const f = JSON.parse(bytes);
const hash = value => createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest("hex");
const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const expectedBlock = '<div data-registered-seat=""><p><strong>Maatschappelijke zetel (juridisch adres):</strong> Voorzorgstraat 12A bus 1, 2660 Antwerpen</p><p>Geen klantontvangst op dit adres. AB Service werkt bij klanten op locatie.</p></div>';
const consumers = [
  { name: "footer", path: "footer", render: renderFooter },
  { name: "privacy", path: "/privacy-policy", render: renderPrivacy },
  { name: "terms", path: "/algemene-voorwaarden", render: renderTerms },
];

// Missing/wrong bus, lost adjacent guidance and hidden/inert ancestors must fail
// in each complete real consumer, before its exact old HTML preservation check.
for (const { name, path, render } of consumers) test(`${name} visibly renders exact registered seat and adjacent no reception while preserving complete old consumer`, () => {
  const html = render(), dom = parse(html);
  const blocks = dom.querySelectorAll("[data-registered-seat]");
  assert.equal(blocks.length, 1, "one visible normal-flow registered-seat block in the real consumer");
  const block = blocks[0];
  assert.equal(block.tagName, "DIV");
  assert.equal(block.outerHTML, expectedBlock, "exact juridical label, bus1 address and immediately adjacent no-reception guidance");
  for (let element = block; element?.tagName; element = element.parentNode) {
    assert.equal(element.hasAttribute("hidden"), false, "seat ancestry must not be hidden");
    assert.equal(element.hasAttribute("inert"), false, "seat ancestry must not be inert");
    assert.notEqual(element.getAttribute("aria-hidden"), "true");
    assert.doesNotMatch(element.getAttribute("class") ?? "", /(?:^|\s)(?:sr-only|hidden|invisible)(?:\s|$)/);
    assert.doesNotMatch(element.getAttribute("style") ?? "", /display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0(?:[;.\s]|$)|position\s*:\s*(?:absolute|fixed)/i);
    assert.ok(!["SCRIPT", "TEMPLATE", "NOSCRIPT"].includes(element.tagName));
  }
  if (name === "footer") {
    assert.equal(block.parentNode.parentNode.getAttribute("class"), "shell footer-grid");
    assert.equal(block.previousElementSibling.tagName, "DL");
    assert.equal(block.previousElementSibling.getAttribute("class"), "business-facts");
  } else {
    assert.equal(block.parentNode.getAttribute("class"), "shell legal-copy");
    assert.equal(block.previousElementSibling.tagName, "P");
    if (name === "privacy") {
      assert.match(block.previousElementSibling.textContent, /AB Service, ondernemingsnummer BE0792\.534\.639, is het aanspreekpunt/);
      assert.equal(block.nextElementSibling.textContent, "2. Contactaanvragen");
    } else {
      assert.match(block.previousElementSibling.textContent, /AB Service · BE0792\.534\.639 · 0484 90 69 66 · info@abservice24\.be/);
      assert.match(block.nextElementSibling.textContent, /^Publicatiecontrole:/);
    }
  }
  assert.equal(beforeRegisteredSeatHtml(html, path), f.before.renders[name], "complete old text, headings, links, contact labels and legal clauses survive");
  assert.equal(hash(f.before.renders[name]), f.before.renderHashes[name]);
});

test("footer capture clock is deterministic while a future clock still renders the complete real footer and preserves every other leaf", async () => {
  const current = renderFooter();
  assert.match(current, /© 2026 AB Service/);
  class FutureDate extends Date {
    constructor(...args) { super(...(args.length ? args : ["2037-10-13T19:40:51.885Z"])); }
  }
  const future = await renderFooterWithDate(FutureDate);
  assert.match(future, /© 2037 AB Service/);
  assert.equal(beforeRegisteredSeatHtml(future, "footer"), f.before.renders.footer.replace("© 2026 AB Service", "© 2037 AB Service"));
  assert.equal(beforeRegisteredSeatHtml(current, "footer"), f.before.renders.footer);
});

test("only the two legal routes publish true13October dates with all registry metadata sitemap and existing source leaves preserved", async () => {
  assert.equal(hash(bytes), "58a3d7b8097fa446854c730132ad0bc6a6b63e8e6b14d8aaa9ed4f07f75eff6e");
  const targetPaths = new Set(["/privacy-policy", "/algemene-voorwaarden"]);
  assert.deepEqual(pageRegistry.map(beforeSanitaryReferralRegistry), f.before.registry.map(page => targetPaths.has(page.path) ? { ...page, lastModified: "2026-10-13" } : page));
  assert.deepEqual(pageRegistry.map(beforeSanitaryReferralRegistry).map(beforeRegisteredSeatRegistry), f.before.registry);
  assert.equal(hash(pageRegistry.map(beforeSanitaryReferralRegistry).map(beforeRegisteredSeatRegistry)), f.before.allRegistrySha256);
  assert.deepEqual(pageRegistry.map(page => ({ path: page.path, metadata: buildPageMetadata(page) })), f.before.allMetadata);
  assert.deepEqual(privacyRoute.metadata, f.before.routeMetadata.privacy);
  assert.deepEqual(termsRoute.metadata, f.before.routeMetadata.terms);
  const sitemap = buildSitemapEntries(pageRegistry).map(beforeSanitaryReferralSitemapEntry);
  assert.equal(sitemap.length, 80);
  const targetUrls = new Set(["https://www.abservice24.be/privacy-policy", "https://www.abservice24.be/algemene-voorwaarden"]);
  assert.deepEqual(sitemap, f.before.sitemap.map(entry => targetUrls.has(entry.url) ? { ...entry, lastModified: "2026-10-13" } : entry));
  assert.equal(hash(sitemap.map(beforeRegisteredSeatSitemapEntry)), f.before.sitemapSha256);
  const privacy = parse(renderPrivacy()).querySelector("time");
  assert.equal(privacy.getAttribute("dateTime"), "2026-10-13");
  assert.equal(privacy.textContent, "13 oktober 2026");
  assert.match(renderTerms(), /Publicatiecontrole:<\/strong> bijgewerkt op 13 oktober 2026\./);
  assert.deepEqual(buildGlobalSchemaGraph(), f.before.globalSchema);
  assert.equal(hash(buildGlobalSchemaGraph()), f.before.globalSchemaSha256);
  assert.equal(renderGlobalSchema(), f.before.renders.globalSchema);
  assert.equal(hash(faultGuides), f.before.faultGuidesSha256);
  for (const file of f.before.protectedFiles) {
    const actual = await readFile(new URL(`../${file.path}`, import.meta.url));
    assert.equal(hash(file.path === "app/globals.css" ? beforeFooterFactsCss(actual.toString("utf8")) : file.path === "components/maintenance-check.js" ? beforeMaintenanceResetSource(beforeMaintenanceSubmitFocusSource(beforeMaintenanceReadinessSource(actual.toString("utf8")))) : ["app/installaties/sanitair/page.js", "content/core-sources.mjs"].includes(file.path) ? beforeSanitaryReferralSource(actual.toString("utf8"), file.path) : actual), file.sha256, file.path);
  }
  assert.deepEqual(renderEvents, []);
});

test("named registered-seat inverses preserve wrong dates URLs metadata and unknown leaves without widening HTML date restoration", () => {
  for (const { page } of f.before.pages) {
    const current = { ...page, lastModified: "2026-10-13" };
    assert.deepEqual(beforeRegisteredSeatRegistry(current), page);
    assert.equal(beforeRegisteredSeatRegistry(page), page);
    for (const [key, value] of [["lastModified", "2026-10-12"], ["path", "/wrong"], ["title", "wrong"], ["description", "wrong"], ["canonical", "https://wrong.invalid/"], ["status", "draft"], ["priority", 0], ["unknown", { drift: true }]]) {
      const mutated = { ...current, [key]: value };
      const restored = beforeRegisteredSeatRegistry(mutated);
      assert.deepEqual(restored, ["lastModified", "path"].includes(key) ? mutated : { ...page, [key]: value });
      assert.notEqual(hash(restored), hash(page));
    }
  }
  const unrelated = { path: "/", lastModified: "2026-10-13", unknown: true };
  assert.equal(beforeRegisteredSeatRegistry(unrelated), unrelated);
  for (const { sitemap: old } of f.before.pages) {
    const current = { ...old, lastModified: "2026-10-13" };
    assert.deepEqual(beforeRegisteredSeatSitemapEntry(current), old);
    for (const [key, value] of [["lastModified", "2026-10-12"], ["url", "https://wrong.invalid/"], ["priority", 0], ["changeFrequency", "monthly"], ["unknown", { drift: true }]]) {
      const mutated = { ...current, [key]: value };
      const restored = beforeRegisteredSeatSitemapEntry(mutated);
      assert.deepEqual(restored, ["lastModified", "url"].includes(key) ? mutated : { ...old, [key]: value });
      assert.notEqual(hash(restored), hash(old));
    }
  }
  const unrelatedEntry = { url: "https://www.abservice24.be/", lastModified: "2026-10-13" };
  assert.equal(beforeRegisteredSeatSitemapEntry(unrelatedEntry), unrelatedEntry);
  for (const { name, path } of consumers) {
    const old = f.before.renders[name];
    const withBlock = old + expectedBlock;
    assert.equal(beforeRegisteredSeatHtml(withBlock, path), old);
    assert.equal(beforeRegisteredSeatHtml(withBlock, "/unknown"), withBlock);
    const drift = withBlock.replace("bus 1", "bus 2");
    assert.equal(beforeRegisteredSeatHtml(drift, path), drift);
    assert.equal(beforeRegisteredSeatHtml(old + "<p>13 oktober 2026</p>", path), old + "<p>13 oktober 2026</p>");
    const wrongDate = old.replace('dateTime="2026-10-11">11 oktober 2026', 'dateTime="2026-10-12">12 oktober 2026').replace("bijgewerkt op 17 september 2026.", "bijgewerkt op 12 oktober 2026.");
    assert.equal(beforeRegisteredSeatHtml(wrongDate, path), wrongDate);
  }
});
