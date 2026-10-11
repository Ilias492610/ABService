import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as brands from "../content/brand-services.mjs";
import * as business from "../content/business.mjs";
import * as media from "../content/media.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";
import { readContactContext } from "../libs/contact-context.mjs";

// Adapt only tracking and framework image boundaries. The async route, Next
// links/notFound, hero, CTA, breadcrumbs, data and contact builder stay real.
const shared = {
  "@/content/business.mjs": business,
  "@/components/tracked-link": ({ eventName, eventProperties, children, ...props }) => React.createElement("a", props, children),
};
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const image = await loadContactModule("components/content-image.js", {
  "next/image": ({ priority, sizes, ...props }) => React.createElement("img", props),
});
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  "@/components/json-ld": jsonLd,
  "@/libs/schema-data.mjs": schema,
});
const route = await loadContactModule("app/merken/[merk]/page.js", {
  "@/components/page-hero": hero,
  "@/components/contact-cta": cta,
  "@/components/content-image": image,
  "@/components/breadcrumbs": breadcrumbs,
  "@/content/brand-services.mjs": brands,
  "@/content/media.mjs": media,
  "@/content/site-content.mjs": registry,
  "@/libs/seo-data.mjs": seo,
});

const decodeHtml = (value) => value.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, (entity) => {
  const named = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" };
  return named[entity] ?? String.fromCodePoint(Number(entity.startsWith("&#x") ? `0x${entity.slice(3, -1)}` : entity.slice(2, -1)));
});
const textOf = (html) => decodeHtml(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const linksOf = (html) => Array.from(html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g), ([, href, label]) => ({ href: decodeHtml(href), label: textOf(label) }));
const pages = await Promise.all(brands.brandServices.map(async (entry) => {
  const params = Promise.resolve({ merk: entry.slug });
  const html = renderToStaticMarkup(await route.default({ params }));
  return { entry, html, text: textOf(html), links: linksOf(html) };
}));

// Catches a general hero or final CTA silently selecting a repair service.
test("all brand pages keep general hero and final contact actions neutral", () => {
  for (const { entry, links } of pages) {
    for (const label of ["Bespreek uw toestel", "Naar het contactformulier"]) {
      const matches = links.filter((link) => link.label === label);
      assert.equal(matches.length, 1, `${entry.slug}: ${label}`);
      assert.equal(matches[0].href, "/contact#aanvraagformulier", entry.slug);
      assert.deepEqual(readContactContext(new URL(matches[0].href, "https://example.invalid")), {}, entry.slug);
    }
  }
});

// Catches missing or misclassified planned-maintenance requests.
test("all brand pages explicitly hand maintenance requests to the maintenance service", () => {
  for (const { entry, links } of pages) {
    const matches = links.filter(({ label }) => label === "Onderhoud aanvragen");
    assert.equal(matches.length, 1, entry.slug);
    assert.equal(matches[0].href, "/contact?dienst=Onderhoud+cv-ketel#aanvraagformulier", entry.slug);
    const url = new URL(matches[0].href, "https://example.invalid");
    assert.equal(url.hash, "#aanvraagformulier");
    assert.deepEqual([...url.searchParams.keys()], ["dienst"]);
    assert.deepEqual(readContactContext(url), { service: "Onderhoud cv-ketel" }, entry.slug);
  }
});

// Catches missing or misclassified fault-assessment requests.
test("all brand pages explicitly hand fault assessment to the repair service", () => {
  for (const { entry, links } of pages) {
    const matches = links.filter(({ label }) => label === "Storing laten beoordelen");
    assert.equal(matches.length, 1, entry.slug);
    assert.equal(matches[0].href, "/contact?dienst=Herstelling+verwarming#aanvraagformulier", entry.slug);
    const url = new URL(matches[0].href, "https://example.invalid");
    assert.equal(url.hash, "#aanvraagformulier");
    assert.deepEqual([...url.searchParams.keys()], ["dienst"]);
    assert.deepEqual(readContactContext(url), { service: "Herstelling verwarming" }, entry.slug);
  }
});

// Catches an outage-only opening or choices detached from practical preparation.
test("brand intake distinguishes planned maintenance from faults before model scope", () => {
  for (const { entry, html } of pages) {
    const intake = html.match(/<section class="section section-compact">([\s\S]*?)<\/section>/)?.[1];
    assert.ok(intake, entry.slug);
    const answer = textOf(intake.match(/<p class="answer-box">([\s\S]*?)<\/p>/)?.[1] || "");
    assert.match(answer, /exacte.*model/i, entry.slug);
    assert.match(answer, /productcode/i, entry.slug);
    assert.match(answer, /typeplaatje.*display|display.*typeplaatje/i, entry.slug);
    assert.match(answer, /veilig bereikbaar.*zonder.*demonteren/i, entry.slug);
    assert.doesNotMatch(answer, /uitvallen|uitval/, entry.slug);
    const cards = Array.from(intake.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g), ([, card]) => textOf(card));
    const maintenance = cards.find((card) => card.includes("Onderhoud aanvragen"));
    const repair = cards.find((card) => card.includes("Storing laten beoordelen"));
    assert.ok(maintenance, `${entry.slug}: maintenance preparation`);
    assert.match(maintenance, /laatste attest/i);
    assert.match(maintenance, /geschiedenis/i);
    assert.ok(repair, `${entry.slug}: fault preparation`);
    assert.match(repair, /volledige.*code/i);
    assert.match(repair, /symptomen|symptoom/i);
    assert.match(repair, /verwarming.*warm water.*beide.*uitvallen/i);
    assert.ok(html.indexOf("Onderhoud aanvragen") < html.indexOf("Mogelijke opdrachten"), entry.slug);
  }
});

// Catches lost brand-specific guidance, independent scope or model/parts limits.
test("every real brand retains its product focus, request note and service limits", () => {
  assert.equal(pages.length, 13);
  for (const { entry, text } of pages) {
    assert.ok(text.includes(entry.productFocus), entry.slug);
    assert.ok(text.includes(entry.requestNote), entry.slug);
    assert.match(text, /onafhankelijke dienstverlener/i, entry.slug);
    assert.match(text, /documentatie en onderdelen.*per toestel beoordeeld/i, entry.slug);
    assert.match(text, /Periodiek onderhoud.*controle van type, vermogen en installatie/i, entry.slug);
    assert.match(text, /Herstelling.*onderdelen na technische diagnose/i, entry.slug);
  }
});

// Catches removed useful destinations, phone/WhatsApp, imagery or breadcrumbs.
test("all brand pages retain catalog and core destinations with media and contact channels", () => {
  for (const { entry, html, links } of pages) {
    for (const href of ["/onderhoud", "/herstelling", "/tools/onderhoudscheck", "/advies/onderhoudsattest-cv-ketel", "/advies/geen-warm-water", "/merken", `/foutcodes/${entry.slug}`]) {
      assert.ok(links.some((link) => link.href === href && link.label), `${entry.slug}: ${href}`);
      assert.equal(registry.getPageDefinition(href)?.status, "published", href);
    }
    assert.ok(links.some(({ href }) => href === "tel:+32484906966"), entry.slug);
    assert.ok(links.some(({ href }) => href === "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."), entry.slug);
    assert.ok(html.includes(`src="${media.contentImages.boilerServiceMarketing.src}"`), entry.slug);
    const imageAlt = html.match(/<img\b[^>]*alt="([^"]*)"/)?.[1];
    assert.equal(decodeHtml(imageAlt || ""), media.contentImages.boilerServiceMarketing.alt, entry.slug);
    assert.match(html, /aria-label="Kruimelpad"/, entry.slug);
    const breadcrumb = JSON.parse(html.match(/<script[^>]*id="breadcrumb-schema"[^>]*>(.*?)<\/script>/)[1]);
    assert.equal(breadcrumb.itemListElement.at(-1).item, `https://www.abservice24.be/merken/${entry.slug}`);
  }
});

// Catches a duplicate/missing H1 or accidental title/canonical regression.
test("all brand pages preserve one brand-specific H1 and canonical metadata", async () => {
  for (const { entry, html } of pages) {
    const headings = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g), ([, heading]) => textOf(heading));
    assert.deepEqual(headings, [`${entry.brand} onderhoud en herstelling`], entry.slug);
    const metadata = await route.generateMetadata({ params: Promise.resolve({ merk: entry.slug }) });
    assert.equal(metadata.alternates.canonical, `https://www.abservice24.be/merken/${entry.slug}`);
  }
});

// Catches an unknown slug rendering instead of reaching the real notFound boundary.
test("unknown brand slugs reach notFound while the thirteen routes stay statically enumerated", async () => {
  assert.equal(route.dynamicParams, false);
  assert.deepEqual(Array.from(route.generateStaticParams(), ({ merk }) => merk), brands.brandServices.map(({ slug }) => slug));
  await assert.rejects(route.default({ params: Promise.resolve({ merk: "unknown-brand" }) }), (error) => error.digest === "NEXT_HTTP_ERROR_FALLBACK;404");
});
