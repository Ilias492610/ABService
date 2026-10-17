import test from "node:test";
import assert from "node:assert/strict";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { buildCoverageDirectoryGroups } from "../content/service-areas.mjs";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { beforeMunicipalitySearchSource } from "./fixtures/municipality-filter-history.mjs";

function findInput(element) {
  if (!React.isValidElement(element)) return undefined;
  if (element.type === "input") return element;
  return React.Children.toArray(element.props.children).map(findInput).find(Boolean);
}

async function directory() {
  let query = "";
  const { default: MunicipalityFilter } = await loadContactModule("components/municipality-filter.js", {
    react: { ...React, useState: () => [query, (next) => { query = next; }], useMemo: (compute) => compute() },
  });
  const render = () => MunicipalityFilter({ groups: buildCoverageDirectoryGroups() });
  return {
    html: () => renderToStaticMarkup(render()),
    search(value) {
      findInput(render()).props.onChange({ target: { value } });
      return renderToStaticMarkup(render());
    },
  };
}

test("directory initially retains all 314 entries and existing district links", async () => {
  const page = await directory();
  const html = page.html();
  assert.match(html, /314 gebieden gevonden/);
  assert.match(html, /href="\/loodgieter-wilrijk"[^>]*>Wilrijk<\/a>/);
  assert.match(html, /<span>Sint-Jans-Molenbeek<\/span>/);
  assert.doesNotMatch(html, /href="[^"]*loodgieter-sint-jans-molenbeek/);
});

test("space-separated municipality search returns its official hyphenated name", async () => {
  const page = await directory();
  for (const query of ["Sint Jans Molenbeek", "Beveren Kruibeke Zwijndrecht"]) {
    const html = page.search(query);
    assert.match(html, /1 gebied gevonden/, query);
    assert.match(html, query.startsWith("Sint") ? /<span>Sint-Jans-Molenbeek<\/span>/ : /<span>Beveren-Kruibeke-Zwijndrecht<\/span>/);
    assert.doesNotMatch(html, /Geen gebied gevonden/);
  }
});

test("copied nonbreaking hyphens, mixed dashes and repeated whitespace also match", async () => {
  const page = await directory();
  for (const query of ["Sint\u2011Jans\u2011Molenbeek", "  SINT \t JANS\u00a0 MOLENBEEK  ", "Beveren\u2013Kruibeke Zwijndrecht"]) {
    assert.match(page.search(query), /1 gebied gevonden/, query);
  }
});

test("official spelling, case, accents and partial district search retain matching behavior", async () => {
  const page = await directory();
  assert.match(page.search("Sint-Jans-Molenbeek"), /1 gebied gevonden/);
  assert.match(page.search("wÍlrIjK"), /href="\/loodgieter-wilrijk"[^>]*>Wilrijk<\/a>/);
  assert.match(page.search("Molenbeek"), /<span>Sint-Jans-Molenbeek<\/span>/);
  assert.match(page.search("Berendrecht Zandvliet Lillo"), /<span>Berendrecht-Zandvliet-Lillo<\/span>/);
});

test("no match announces zero and clearing restores identical complete directory", async () => {
  const page = await directory();
  const before = page.html();
  const missing = page.search("zzzz-test-geen-gemeente");
  assert.match(missing, /0 gebieden gevonden/);
  assert.match(missing, /Geen gebied gevonden\. Controleer de spelling of neem contact op\./);
  assert.equal(page.search(""), before);
  assert.match(page.search(" \t\u00a0"), /314 gebieden gevonden/);
});

test("historical byte guard admits only the exact search normalization addition", async () => {
  const source = await readFile(new URL("../components/municipality-filter.js", import.meta.url), "utf8");
  const restored = beforeMunicipalitySearchSource(source);
  assert.equal(createHash("sha256").update(restored).digest("hex"), "316964e1438a18375d0dfa707e043acfb0179f907e7eaf5ea5f906fe51c5c8f4");
  const wrongPattern = source.replace("u2015", "u2016");
  assert.equal(beforeMunicipalitySearchSource(wrongPattern), wrongPattern);
  const wrongMarkup = source.replace("Zoek uw gemeente of district", "Onbekende gewijzigde tekst");
  assert.match(beforeMunicipalitySearchSource(wrongMarkup), /Onbekende gewijzigde tekst/);
  assert.notEqual(createHash("sha256").update(beforeMunicipalitySearchSource(wrongMarkup)).digest("hex"), "316964e1438a18375d0dfa707e043acfb0179f907e7eaf5ea5f906fe51c5c8f4");
});
