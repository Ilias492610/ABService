import { beforeFaucetRegistry } from "./fixtures/faucet-context-history.mjs";
import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry, beforeSanitaryReferralSitemapEntry } from "./fixtures/sanitary-referral-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { pageRegistry, getPageDefinition } from "../content/site-content.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { renderHome, renderContact, homeRoute, contactRoute, renderEvents } from "./helpers/customer-location-runtime.mjs";
import { beforeCustomerLocationRegistry, beforeCustomerLocationSitemapEntry } from "./fixtures/customer-location-history.mjs";
import { beforeRegisteredSeatSitemapEntry } from "./fixtures/registered-seat-history.mjs";
const f = JSON.parse(await readFile(new URL("./fixtures/customer-location-facts.json", import.meta.url), "utf8"));
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
const copy = "AB Service werkt bij klanten op locatie. Er is geen klantontvangst op het bedrijfsadres.";
const oldContactIntro = "Omschrijf het werk of probleem zo concreet mogelijk. Een timing, prijs of afspraak is pas definitief nadat AB Service de aanvraag heeft beoordeeld en bevestigd.";
const oldAreaIntro = "AB Service neemt passende aanvragen aan uit alle Vlaamse en Brusselse gemeenten. Afstand, technische scope en planning worden vóór de afspraak beoordeeld.";

// This checks actual emitted paragraph ancestry, not the JSX source. A hidden
// wrapper or moving the clarification to an attribute/script must fail.
function visibleParagraph(html, text, className) {
  const stack = [];
  const voids = new Set(["img", "input", "br", "hr", "meta", "link", "area", "base", "embed", "param", "source", "track", "wbr"]);
  let found = 0;
  for (const token of html.matchAll(/<\/?([a-z][\w-]*)\b[^>]*>/gi)) {
    const tag = token[1], raw = token[0];
    if (raw.startsWith("</")) { stack.pop(); continue; }
    if (tag === "p" && html.slice(token.index + raw.length, html.indexOf("</p>", token.index)) === escape(text)) {
      found++;
      assert.equal(raw, `<p class="${className}">`);
      for (const ancestor of [...stack, raw]) {
        assert.doesNotMatch(ancestor, /\bhidden(?:[\s=>])|\binert(?:[\s=>])|aria-hidden="true"|(?:display\s*:\s*none|visibility\s*:\s*hidden)|class="[^"]*\b(?:sr-only|hidden)\b|<(?:script|template|noscript)\b/i);
      }
    }
    if (!voids.has(tag)) stack.push(raw);
  }
  assert.equal(found, 1, "one ordinary visible paragraph must carry customer guidance");
}
const homeBefore = html => html.replace(`<p class="section-lead">${escape(copy)}</p>`, "");
const contactBefore = html => html.replace(`<p class="hero-intro">${escape(oldContactIntro)} ${escape(copy)}</p>`, `<p class="hero-intro">${escape(oldContactIntro)}</p>`);

test("home visitors receive visible no-reception guidance in work area without losing any existing offer safety reviews or actions", async () => {
  const html = await renderHome();
  const area = html.match(/<section\b[\s\S]*?<\/section>/g)?.find(section => section.includes('<p class="eyebrow">Werkgebied</p>'));
  assert.ok(area);
  visibleParagraph(area, copy, "section-lead");
  visibleParagraph(html, copy, "section-lead");
  assert.ok(area.includes(escape(oldAreaIntro)), "conditional scope/planning paragraph survives");
  assert.equal(homeBefore(html), f.before.homeHtml, "all old home HTML, cards, photos, safety, links and real review fallback survive");
  assert.equal(hash(f.before.homeHtml), f.before.homeHtmlSha256);
});

test("contact visitors see no-reception guidance before intake while situation timing price and appointment assessment remain", async () => {
  const html = await renderContact();
  const hero = html.match(/<section class="page-hero">[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero);
  visibleParagraph(hero, `${oldContactIntro} ${copy}`, "hero-intro");
  visibleParagraph(html, `${oldContactIntro} ${copy}`, "hero-intro");
  assert.ok(html.indexOf(escape(copy)) < html.indexOf('id="aanvraagformulier"'));
  assert.equal(contactBefore(html), f.before.contactHtml, "whole form, labels, contacts, 24h, photo, emergency boundary and legal link survive");
  assert.equal(hash(f.before.contactHtml), f.before.contactHtmlSha256);
});

test("contact clarification retains native POST accepted public service prefill blank private fields and unchecked consent", async () => {
  const html = await renderContact({ dienst: "Herstelling verwarming", name: "private-location-marker", address: "private-location-marker", consent: "on" });
  assert.match(html, /<form[^>]*method="post"/);
  assert.match(html, /<form[^>]*action="\/api\/contact"/);
  assert.match(html, /<option selected="">Herstelling verwarming<\/option>/);
  for (const name of ["name", "phone", "email", "address", "city", "postalCode", "brand", "boilerType"]) assert.match(html, new RegExp(`<input[^>]*name="${name}"[^>]*value=""`));
  assert.match(html, /<textarea[^>]*name="message"[^>]*><\/textarea>/);
  assert.doesNotMatch(html.match(/<input[^>]*name="consent"[^>]*>/)[0], /checked/);
  assert.doesNotMatch(html, /private-location-marker/);
  for (const href of ["tel:+32484906966", "mailto:info@abservice24.be", "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."]) assert.ok(html.includes(`href="${href}"`));
  assert.match(html, /Geen noodkanaal/);
  assert.deepEqual(renderEvents, []);
});

test("only home and contact gain actual13October sitemap dates while complete registry metadata source and business leaves survive", async () => {
  for (const { page, metadata } of f.before.pages) {
    const current = getPageDefinition(page.path);
    assert.equal(current.lastModified, "2026-10-13");
    assert.deepEqual(beforeCustomerLocationRegistry(current), page);
    assert.deepEqual(buildPageMetadata(current), metadata);
    assert.deepEqual(page.path === "/" ? homeRoute.metadata : contactRoute.metadata, metadata);
  }
  assert.deepEqual(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeCustomerLocationRegistry), f.before.registry);
  assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeCustomerLocationRegistry)), f.before.allRegistrySha256);
  const sitemap = buildSitemapEntries(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry)).map(beforeSanitaryReferralSitemapEntry);
  assert.equal(sitemap.length, f.before.sitemap.length);
  assert.deepEqual(sitemap.map(beforeCustomerLocationSitemapEntry), f.before.sitemap);
  assert.equal(hash(sitemap.map(beforeCustomerLocationSitemapEntry)), f.before.sitemapSha256);
  assert.deepEqual(sitemap.map(beforeRegisteredSeatSitemapEntry), f.before.sitemap.map(entry => ["https://www.abservice24.be/", "https://www.abservice24.be/contact"].includes(entry.url) ? { ...entry, lastModified: "2026-10-13" } : entry));
  assert.equal(hash(faultGuides), f.before.faultGuidesSha256);
  for (const [file, expected] of [["business", f.before.businessSha256], ["media", f.before.mediaSha256]]) assert.equal(hash(await readFile(new URL(`../content/${file}.mjs`, import.meta.url), "utf8")), expected);
});

test("named customer-location inverse preserves wrong dates title description status priority canonical and unknown drift", () => {
  for (const { page } of f.before.pages) {
    const current = { ...page, lastModified: "2026-10-13" };
    assert.deepEqual(beforeCustomerLocationRegistry(current), page);
    assert.deepEqual(beforeCustomerLocationRegistry({ ...current, lastModified: "2026-10-12" }), { ...page, lastModified: "2026-10-12" });
    for (const [key, value] of [["title", "wrong"], ["description", "wrong"], ["status", "draft"], ["priority", 0], ["canonical", "https://wrong.invalid/"], ["unknown", { drift: true }]]) {
      const restored = beforeCustomerLocationRegistry({ ...current, [key]: value });
      assert.deepEqual(restored, { ...page, [key]: value });
      assert.notEqual(hash(restored), hash(page), "historical capture must still detect " + key);
    }
  }
  const unrelated = { path: "/onderhoud", lastModified: "2026-10-13", unknown: "retain" };
  assert.equal(beforeCustomerLocationRegistry(unrelated), unrelated);
  for (const url of ["https://www.abservice24.be/", "https://www.abservice24.be/contact"]) {
    const before = f.before.sitemap.find(entry => entry.url === url);
    const current = { ...before, lastModified: "2026-10-13" };
    assert.deepEqual(beforeCustomerLocationSitemapEntry(current), before);
    for (const [key, value] of [["lastModified", "2026-10-12"], ["url", "https://wrong.invalid/"], ["priority", 0], ["changeFrequency", "yearly"], ["unknown", { drift: true }]]) {
      const mutated = { ...current, [key]: value };
      assert.deepEqual(beforeCustomerLocationSitemapEntry(mutated), ["lastModified", "url"].includes(key) ? mutated : { ...before, [key]: value });
      assert.notEqual(hash(beforeCustomerLocationSitemapEntry(mutated)), hash(before), "historical sitemap must still detect " + key);
    }
  }
});
