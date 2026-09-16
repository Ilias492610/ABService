import test from "node:test";
import assert from "node:assert/strict";

import {
  buildBreadcrumbSchema,
  buildGlobalSchemaGraph,
} from "../libs/schema-data.mjs";

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
  assert.ok(!("address" in business));
  assert.ok(!("aggregateRating" in business));
  assert.ok(!("openingHours" in business));
  assert.ok(!("priceRange" in business));
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
