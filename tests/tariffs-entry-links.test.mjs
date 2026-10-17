const pageRegistry = beforeLocalizationRegistry(fullLocalizedRegistry);
import { beforeFaucetRegistry } from "./fixtures/faucet-context-history.mjs";
import { beforeLocalizationShellSource } from "./fixtures/localization-shell-history.mjs";
import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolveRouteSourcePath } from "./helpers/route-source-path.mjs";
import { renderTariffs, tariffsRoute } from "./helpers/tariffs-runtime.mjs";
import { beforeTariffEntryLinks, beforeTariffEntrySource, beforeTariffEntryProtectionSource, beforeTariffEntryProtectionCss, tariffEntryAnchors } from "./fixtures/tariffs-entry-links.mjs";
import { getPageDefinition, pageRegistry as fullLocalizedRegistry } from "../content/site-content.mjs";
import { beforeLocalizationRegistry } from "./fixtures/localization-release-history.mjs";

const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const beforeHash = "6a3ec570305f50eba6575609e5976e6a9f926ed6444c478b1292188b73fbecf9";

// Missing/wrong-destination/misplaced card link breaks the user's context path.
test("each matching pricefactor gives one ordinary link to its existing service context", () => {
  const html = renderTariffs();
  const cards = [...html.matchAll(/<article class="card">([\s\S]*?)<\/article>/g)].map(([, body]) => body);
  assert.equal(cards.length, 6);
  assert.equal(html.split('class="section tariff-service-context"').length - 1, 1);
  const expected = [
    ["Onderhoud", "/onderhoud", "Voorbereiding op cv-ketelonderhoud"],
    ["Herstelling", "/herstelling", "Hoe een herstelling wordt beoordeeld"],
    ["Installatie", "/installaties/gasketels", "Gasketel plaatsen of vervangen"],
    ["Sanitair", "/installaties/sanitair", "Scope en voorbereiding van sanitairwerk"],
  ];
  for (const [index, [title, href, label]] of expected.entries()) {
    assert.ok(cards[index].startsWith(`<h3>${title}</h3>`));
    const anchors = [...cards[index].matchAll(/<a\b([^>]*)>([^<]+)<\/a>/g)];
    assert.equal(anchors.length, 1, `${title}: one context entry`);
    assert.ok(anchors[0][1].includes(`href="${href}"`));
    assert.ok(anchors[0][1].includes('class="underline"'));
    assert.equal(anchors[0][2], `${label} →`);
    assert.doesNotMatch(anchors[0][1], /target=|download=|onclick=|\?|#/);
    assert.equal(getPageDefinition(href).status, "published");
  }
  for (const card of cards.slice(4)) assert.doesNotMatch(card, /<a\b/);
});

test("navigation additions preserve every prior tariffs element and meaningful-content date", () => {
  const html = renderTariffs();
  for (const anchor of tariffEntryAnchors) assert.equal(html.split(anchor).length - 1, 1);
  assert.equal(hash(beforeTariffEntryLinks(html)), beforeHash);
  assert.equal(hash(tariffsRoute.metadata), "475a13e46d8e7a6083ae262229f178035915b059b2c564cfc746f55c84545499");
  assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry)), "f63dfda5e2a5d1f0f0a2d80cb2de9617997433e23d6736945545db1d3f0bd5e9");
  assert.equal(getPageDefinition("/tarieven").lastModified, "2026-10-11");
});

test("the exact historic inverse never hides wrong links, duplicates or unrelated pricefactor drift", () => {
  const html = renderTariffs();
  const mutations = [
    html.replace('href="/onderhoud"', 'href="/herstelling"'),
    html.replace("Voorbereiding op cv-ketelonderhoud", "Gratis onderhoud"),
    html.replace(tariffEntryAnchors[0], tariffEntryAnchors[0] + tariffEntryAnchors[0]),
    html.replace("Toesteltype, vermogen", "Toesteltype, vaste prijs"),
  ];
  for (const mutation of mutations) assert.notEqual(hash(beforeTariffEntryLinks(mutation)), beforeHash);
});

test("the whole-site source pin survives only the eight exact navigation and protection edits", () => {
  const source = readFileSync(new URL("../" + resolveRouteSourcePath("app/tarieven/page.js"), import.meta.url), "utf8");
  const oldSourceHash = "ba1dedbaadeed1687cde1e52b3e9ff24df0c821dbd71cdd30b1200e3885883ea";
  assert.equal(hash(beforeTariffEntrySource(source)), oldSourceHash);
  for (const mutation of [
    source.replace('"/onderhoud", "Voorbereiding', '"/keuring", "Voorbereiding'),
    source.replace('className="underline"', 'className="no-underline"'),
    source.replace("href && <Link", "label && <Link"),
    source.replace("scope?", "scope en vaste prijs?"),
    source + "\n// unrelated drift\n",
  ]) assert.notEqual(hash(beforeTariffEntrySource(mutation)), oldSourceHash);
});

test("tariffs protection preserves every old widget and style source leaf outside its named additions", () => {
  const widget = beforeLocalizationShellSource(readFileSync(new URL("../components/floating-trust-signals.js", import.meta.url), "utf8"), "components/floating-trust-signals.js");
  const css = beforeLocalizationShellSource(readFileSync(new URL("../app/globals.css", import.meta.url), "utf8"), "app/globals.css");
  assert.equal(hash(beforeTariffEntryProtectionSource(widget)), "87b7740f97bbcf56d535be7f7e86ff018b799d32076c0ec52843e4d7c702361a");
  assert.equal(hash(beforeTariffEntryProtectionCss(css)), "453d502783be287b84e65512e63d7cdecd6ef1b58b9b1cdc3b19e34061fc468b");
  assert.notEqual(hash(beforeTariffEntryProtectionSource(widget.replace('"/api/google-rating"', '"/wrong"'))), "87b7740f97bbcf56d535be7f7e86ff018b799d32076c0ec52843e4d7c702361a");
  assert.notEqual(hash(beforeTariffEntryProtectionCss(css.replace("3px solid var(--gold)", "0 solid var(--gold)"))), "453d502783be287b84e65512e63d7cdecd6ef1b58b9b1cdc3b19e34061fc468b");
  assert.notEqual(hash(beforeTariffEntryProtectionCss(css.replace("scroll-margin-block: calc(var(--header-offset) + 1rem) 1rem", "scroll-margin-block: 0"))), "453d502783be287b84e65512e63d7cdecd6ef1b58b9b1cdc3b19e34061fc468b");
  assert.notEqual(hash(beforeTariffEntryProtectionCss(css.replace(".tariff-service-context a {", ".card a {"))), "453d502783be287b84e65512e63d7cdecd6ef1b58b9b1cdc3b19e34061fc468b");
});
