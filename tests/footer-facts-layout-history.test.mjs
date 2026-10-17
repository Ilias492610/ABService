const pageRegistry = beforeLocalizationRegistry(fullLocalizedRegistry);
import { beforeFaucetRegistry } from "./fixtures/faucet-context-history.mjs";
import { beforeLocalizationShellSource } from "./fixtures/localization-shell-history.mjs";
import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry, beforeSanitaryReferralSitemapEntry } from "./fixtures/sanitary-referral-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { pageRegistry as fullLocalizedRegistry } from "../content/site-content.mjs";
import { beforeLocalizationRegistry } from "./fixtures/localization-release-history.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { buildGlobalSchemaGraph } from "../libs/schema-data.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { renderFooterWithDate } from "./helpers/registered-seat-runtime.mjs";
import { beforeFooterFactsCss } from "./fixtures/footer-facts-layout-history.mjs";
import { beforeTariffEntryProtectionCss } from "./fixtures/tariffs-entry-links.mjs";

const bytes = await readFile(new URL("./fixtures/footer-facts-layout-facts.json", import.meta.url));
const f = JSON.parse(bytes);
const hash = value => createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest("hex");
const oldDiv = ".business-facts div { display: grid; grid-template-columns: 6rem 1fr; }";
const newDiv = ".business-facts div { display: grid; grid-template-columns: max-content minmax(0, 1fr); column-gap: .75rem; }";
const oldDd = ".business-facts dd { margin: 0; }";
const newDd = ".business-facts dd { margin: 0; overflow-wrap: anywhere; }";
// Literal forward inputs exercise the historical inverse, never browser geometry.
const approved = f.before.css.replace(oldDiv, newDiv).replace(oldDd, newDd);

test("the captured complete stylesheet and default-clock footer retain independent before hashes", () => {
  assert.equal(hash(bytes), "fe95aa85751bdf2f965fd4fdd81b0969735feea3db7479d0a47177dad06a5818");
  assert.equal(hash(f.before.css), "f3b518a4cae4a7491004b5fc24acb6aa8f664a838e9731fd52162b56eaf26ccb");
  assert.equal(hash(f.before.footerHtml), "dc11f743d150d993b4978088b086ebf93c556586b2c6d3350825115c56be6f05");
});

test("the named inverse restores only both approved complete rules and leaves the complete old stylesheet a no-op", () => {
  assert.equal(beforeFooterFactsCss(approved), f.before.css);
  assert.equal(beforeFooterFactsCss(f.before.css), f.before.css);
  assert.equal(beforeFooterFactsCss(f.before.css.replace(oldDiv, newDiv)), f.before.css);
  assert.equal(beforeFooterFactsCss(f.before.css.replace(oldDd, newDd)), f.before.css);
});

test("actual stylesheet preserves every before byte after the bounded historical inverse", async () => {
  const actual = beforeLocalizationShellSource(await readFile(new URL("../app/globals.css", import.meta.url), "utf8"), "app/globals.css");
  assert.equal(beforeFooterFactsCss(beforeTariffEntryProtectionCss(actual)), f.before.css);
  assert.equal(hash(beforeFooterFactsCss(beforeTariffEntryProtectionCss(actual))), "f3b518a4cae4a7491004b5fc24acb6aa8f664a838e9731fd52162b56eaf26ccb");
});

test("wrong columns gaps wrap and extra properties survive inversion instead of hiding drift", () => {
  const cases = [
    [newDiv, ".business-facts div { display: grid; grid-template-columns: 6rem 1fr; column-gap: .75rem; }", oldDiv],
    [newDiv, ".business-facts div { display: grid; grid-template-columns: max-content 1fr; column-gap: .75rem; }", oldDiv],
    [newDiv, ".business-facts div { display: grid; grid-template-columns: max-content minmax(0, 1fr); column-gap: .5rem; }", oldDiv],
    [newDiv, ".business-facts div { display: grid; grid-template-columns: max-content minmax(0, 1fr); }", oldDiv],
    [newDiv, ".business-facts div { display: grid; grid-template-columns: max-content minmax(0, 1fr); column-gap: .75rem; color: red; }", oldDiv],
    [newDd, ".business-facts dd { margin: 0; overflow-wrap: normal; }", oldDd],
    [newDd, ".business-facts dd { margin: 0; overflow-wrap: anywhere; color: red; }", oldDd],
  ];
  for (const [rule, drift, old] of cases) {
    const restored = beforeFooterFactsCss(approved.replace(rule, drift));
    assert.equal(restored, f.before.css.replace(old, drift));
    assert.notEqual(hash(restored), "f3b518a4cae4a7491004b5fc24acb6aa8f664a838e9731fd52162b56eaf26ccb");
  }
});

test("unrelated changed rules unknown selectors and extra bytes remain detectable across old and approved inputs", () => {
  const changes = [
    ["html { scroll-behavior: smooth; }", "html { scroll-behavior: auto; }"],
    [".business-facts dt { color: white; font-weight: 700; }", ".business-facts dt { color: red; font-weight: 700; }"],
  ];
  for (const [old, drift] of changes) for (const input of [f.before.css, approved]) {
    assert.equal(beforeFooterFactsCss(input.replace(old, drift)), f.before.css.replace(old, drift));
    assert.notEqual(hash(beforeFooterFactsCss(input.replace(old, drift))), f.before.cssSha256);
  }
  const extra = "\n.unknown-footer-rule { display: none; }\n";
  for (const input of [f.before.css, approved]) {
    assert.equal(beforeFooterFactsCss(input + extra), f.before.css + extra);
    assert.notEqual(hash(beforeFooterFactsCss(input + extra)), f.before.cssSha256);
  }
});

test("complete real footer registry metadata sitemap catalog business media and schema preserve the actual before capture", async () => {
  class CapturedDate extends Date {
    constructor(...args) { super(...(args.length ? args : [f.capturedAt])); }
    static now() { return Date.parse(f.capturedAt); }
  }
  const html = await renderFooterWithDate(CapturedDate);
  assert.equal(html, f.before.footerHtml);
  assert.equal(hash(html), "dc11f743d150d993b4978088b086ebf93c556586b2c6d3350825115c56be6f05");
  assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry)), f.before.registrySha256);
  assert.equal(hash(pageRegistry.map(page => ({ path: page.path, metadata: buildPageMetadata(page) }))), f.before.metadataSha256);
  assert.equal(hash(buildSitemapEntries(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry)).map(beforeSanitaryReferralSitemapEntry)), f.before.sitemapSha256);
  assert.equal(hash(faultGuides), f.before.faultGuidesSha256);
  assert.equal(hash(await readFile(new URL("../content/business.mjs", import.meta.url))), f.before.businessSha256);
  assert.equal(hash(await readFile(new URL("../content/media.mjs", import.meta.url))), f.before.mediaSha256);
  assert.equal(hash(buildGlobalSchemaGraph()), f.before.globalSchemaSha256);
});
