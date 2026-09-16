import test from "node:test";
import assert from "node:assert/strict";

import { auditHtml } from "../libs/html-audit.mjs";

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
