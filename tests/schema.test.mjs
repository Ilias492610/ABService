import test from "node:test";
import assert from "node:assert/strict";
import { adviceGuides } from "../content/advice-guides.mjs";

import {
  buildBreadcrumbSchema,
  buildGlobalSchemaGraph,
  buildArticleSchema,
} from "../libs/schema-data.mjs";

// Catches a second URL introduced for the same issuer identity when Google
// combines the global Organization graph with an Article's embedded author.
test("real advice issuers share the global organization's single canonical URL", () => {
  const graph = buildGlobalSchemaGraph();
  const organization = graph["@graph"].find((node) => node["@id"] === "https://www.abservice24.be/#organization");
  assert.equal(organization.url, "https://www.abservice24.be");
  for (const guide of adviceGuides) {
    const article = buildArticleSchema(guide);
    assert.equal(article.author["@id"], "https://www.abservice24.be/#organization", guide.path);
    assert.equal(article.publisher["@id"], "https://www.abservice24.be/#organization", guide.path);
    assert.deepEqual([...new Set([organization.url, article.author.url])], ["https://www.abservice24.be"], guide.path);
  }
});

test("article issuer URL uses the explicit caller origin without appending a biography route", () => {
  const article = buildArticleSchema({ path: "/advies/test", title: "Heldere uitleg", description: "Een antwoord" }, "https://example.test");
  assert.equal(article.author.url, "https://example.test");
  assert.equal(article.author["@id"], "https://example.test/#organization");
});

test("global schema contains only verified business facts", () => {
  const schema = buildGlobalSchemaGraph("https://www.abservice24.be");
  const business = schema["@graph"].find((item) => item["@id"].endsWith("#business"));

  assert.equal(schema["@context"], "https://schema.org");
  assert.deepEqual(business["@type"], ["Plumber", "HVACBusiness"]);
  assert.deepEqual(business.areaServed, [
    { "@type": "AdministrativeArea", name: "Vlaams Gewest" },
    { "@type": "AdministrativeArea", name: "Brussels Hoofdstedelijk Gewest" },
  ]);
  assert.equal(business.telephone, "+32484906966");
  assert.equal(business.openingHours, "Mo-Su 00:00-23:59");
  assert.ok(!("address" in business));
  assert.ok(!("aggregateRating" in business));
  assert.ok(!("priceRange" in business));
});

test("article schema uses content modification independently of source checking", () => {
  const schema = buildArticleSchema({ path: "/advies/test", title: "Heldere uitleg", description: "Een antwoord", checkedAt: "2026-10-11", modifiedAt: "2026-10-10", sourceLinks: [{ href: "https://www.vlaanderen.be/voorbeeld" }] });
  assert.equal(schema["@type"], "Article");
  assert.equal(schema.headline, "Heldere uitleg");
  assert.equal(schema.mainEntityOfPage["@id"], "https://www.abservice24.be/advies/test");
  assert.equal(schema.author["@id"], "https://www.abservice24.be/#organization");
  assert.equal(schema.dateModified, "2026-10-10");
  assert.deepEqual(schema.citation, ["https://www.vlaanderen.be/voorbeeld"]);
  assert.ok(!schema.datePublished);
  assert.ok(!schema.reviewedBy);
  assert.ok(!schema.aggregateRating);
});

test("source checking alone never creates an article modification or publication date", () => {
  for (const checkedAt of [undefined, "2026-10-11"]) {
    const schema = buildArticleSchema({ path: "/advies/test", title: "Heldere uitleg", description: "Een antwoord", checkedAt });
    assert.ok(!Object.hasOwn(schema, "dateModified"));
    assert.ok(!Object.hasOwn(schema, "datePublished"));
  }
  const schema = buildArticleSchema({ path: "/advies/test", title: "Heldere uitleg", description: "Een antwoord", modifiedAt: "2026-10-11" });
  assert.equal(schema.dateModified, "2026-10-11");
});

test("breadcrumb schema uses canonical URLs in visible order", () => {
  const schema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Installaties", path: "/installaties" },
    { name: "Gasketels", path: "/installaties/gasketels" },
  ]);

  assert.deepEqual(schema.itemListElement, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.abservice24.be/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Installaties",
      item: "https://www.abservice24.be/installaties",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Gasketels",
      item: "https://www.abservice24.be/installaties/gasketels",
    },
  ]);
});
