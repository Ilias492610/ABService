import test from "node:test";
import assert from "node:assert/strict";

import { auditHtml } from "../libs/html-audit.mjs";
import * as htmlAudit from "../libs/html-audit.mjs";

test("HTML audit accepts a complete indexable page and extracts internal links", () => {
  const html = `<!doctype html><html lang="nl-BE"><head>
    <title>Unieke paginatitel</title>
    <meta name="description" content="Een nuttige beschrijving.">
    <link rel="canonical" href="https://www.abservice24.be/test">
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage"}</script>
  </head><body><h1>Een duidelijke H1</h1><a href="/contact">Contact</a><img src="/beeld.webp" alt="Cv-ketel"></body></html>`;

  const result = auditHtml({ html, url: "https://www.abservice24.be/test", indexable: true });

  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.internalLinks, ["https://www.abservice24.be/contact"]);
  assert.equal(result.title, "Unieke paginatitel");
});

test("HTML audit reports missing SEO fields, duplicate H1s, bad images and invalid schema", () => {
  const html = `<!doctype html><html><head><script type="application/ld+json">{bad}</script></head>
    <body><h1>Eerste</h1><h1>Tweede</h1><img src="/beeld.png"></body></html>`;

  const result = auditHtml({ html, url: "https://www.abservice24.be/bad", indexable: true });

  assert.deepEqual(result.issues.sort(), [
    "canonical ontbreekt",
    "description ontbreekt",
    "html lang ontbreekt of is niet nl-BE",
    "image zonder alt-attribuut",
    "ongeldig JSON-LD",
    "pagina heeft 2 H1-elementen",
    "title ontbreekt",
  ].sort());
});

test("HTML audit requires noindex for withheld pages", () => {
  const html = `<!doctype html><html lang="nl-BE"><head><title>Concept</title><meta name="description" content="Conceptpagina"><link rel="canonical" href="https://www.abservice24.be/concept"></head><body><h1>Concept</h1></body></html>`;
  const result = auditHtml({ html, url: "https://www.abservice24.be/concept", indexable: false });

  assert.deepEqual(result.issues, ["noindex ontbreekt"]);
});

test("HTML audit reports duplicated JSON-LD payloads", () => {
  const schema = '{"@context":"https://schema.org","@type":"Organization","name":"AB Service"}';
  const html = `<!doctype html><html lang="nl-BE"><head>
    <title>Test</title><meta name="description" content="Testbeschrijving">
    <link rel="canonical" href="https://www.abservice24.be/test">
    <script type="application/ld+json">${schema}</script>
    <script type="application/ld+json">${schema}</script>
  </head><body><h1>Test</h1></body></html>`;

  const result = auditHtml({ html, url: "https://www.abservice24.be/test", indexable: true });

  assert.deepEqual(result.issues, ["dubbele JSON-LD"]);
});

test("HTML audit reports a same-page link whose fragment target is missing", () => {
  const html = `<!doctype html><html lang="nl-BE"><head>
    <title>Contact</title><meta name="description" content="Contacteer AB Service">
    <link rel="canonical" href="https://www.abservice24.be/contact">
  </head><body><h1>Contact</h1><a href="#aanvraagformulier">Ga naar het formulier</a></body></html>`;

  const result = auditHtml({ html, url: "https://www.abservice24.be/contact", indexable: true });

  assert.deepEqual(result.issues, ["anker #aanvraagformulier ontbreekt"]);
});

test("HTML audit discovers referenced icons, images, social previews and cross-page fragments", () => {
  const html = `<html lang="nl-BE"><head><title>Contact</title><meta name="description" content="Contact"><link rel="canonical" href="https://www.abservice24.be/contact"><link rel="manifest" href="/manifest.webmanifest"><link rel="icon" href="/missing-icon.png"><meta property="og:image" content="https://www.abservice24.be/opengraph-image"></head><body><h1>Contact</h1><img alt="" src="/photo.webp"><a href="/onderhoud#documenten">Documenten</a></body></html>`;
  const result = auditHtml({ html, url: "https://www.abservice24.be/contact", indexable: true });
  assert.deepEqual(result.assets, [
    "https://www.abservice24.be/manifest.webmanifest", "https://www.abservice24.be/missing-icon.png",
    "https://www.abservice24.be/opengraph-image", "https://www.abservice24.be/photo.webp",
  ]);
  assert.deepEqual(result.fragmentLinks, [{ url: "https://www.abservice24.be/onderhoud", fragment: "documenten" }]);
});

test("HTML audit decodes escaped image query parameters before checking the asset", () => {
  const result = auditHtml({ html: '<img alt="" src="/_next/image?url=%2Fphoto.webp&amp;w=384&amp;q=75">', url: "https://www.abservice24.be/contact", indexable: true });
  assert.deepEqual(result.assets, ["https://www.abservice24.be/_next/image?url=%2Fphoto.webp&w=384&q=75"]);
});

test("crawl graph reports an orphan page even when it has valid SEO fields", () => {
  const findUnreachable = htmlAudit.findUnreachablePages || (() => undefined);
  assert.deepEqual(findUnreachable([
    { url: "https://www.abservice24.be/", internalLinks: ["https://www.abservice24.be/contact"] },
    { url: "https://www.abservice24.be/contact", internalLinks: [] },
    { url: "https://www.abservice24.be/orphan", internalLinks: [] },
  ], "https://www.abservice24.be/"), ["https://www.abservice24.be/orphan"]);
});

test("crawl checks a validated contact-tool handoff against the form anchor", () => {
  const result = auditHtml({
    html: '<html lang="nl-BE"><h1>Contact</h1><div id="aanvraagformulier"></div><a href="#aanvraagformulier?dienst=Onderhoud%20cv-ketel&amp;context=onderhoudscheck">Formulier</a>',
    url: "https://www.abservice24.be/contact", indexable: true,
  });
  assert.ok(!result.issues.some((issue) => issue.includes("anker")));
  assert.deepEqual(result.fragmentLinks, [{ url: "https://www.abservice24.be/contact", fragment: "aanvraagformulier" }]);
});
