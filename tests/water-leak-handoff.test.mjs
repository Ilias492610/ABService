import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as services from "../content/additional-services.mjs";
import * as sources from "../content/core-sources.mjs";
import * as media from "../content/media.mjs";
import * as business from "../content/business.mjs";
import * as intents from "../content/service-intents.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";
import { getCitedSources } from "../libs/cited-sources.mjs";
import { auditExternalSources } from "../libs/external-source-audit.mjs";
import { readContactContext } from "../libs/contact-context.mjs";

// Render the real async route, renderer, breadcrumbs, hero, CTA, image wrapper,
// intents and contact parser; only image and analytics transport are adapted.
const trackedLink = ({ eventName, eventProperties, children, ...props }) => React.createElement("a", props, children);
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": trackedLink };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const image = await loadContactModule("components/content-image.js", {
  "next/image": ({ priority, sizes, ...props }) => React.createElement("img", props),
});
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema,
});
const renderer = await loadContactModule("components/service-page.js", {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/content-image": image, "@/components/breadcrumbs": breadcrumbs,
  "@/content/service-intents.mjs": intents,
});
const route = await loadContactModule("app/diensten/[slug]/page.js", {
  "@/components/service-page": renderer, "@/content/additional-services.mjs": services,
  "@/content/media.mjs": media, "@/libs/seo-data.mjs": seo,
  "@/content/site-content.mjs": registry,
});
const sitemap = await loadContactModule("app/sitemap.js", {
  "@/content/site-content.mjs": registry, "@/libs/seo-data.mjs": seo,
});
const render = async (slug = "waterlek-herstellen") => renderToStaticMarkup(await route.default({ params: Promise.resolve({ slug }) }));
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const handoff = (html) => {
  const section = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map(([value]) => value)
    .find((value) => /<h2>Gesprongen leiding: wie contacteren en wat doorgeven\?<\/h2>/.test(value));
  assert.ok(section, "The actionable regional handoff and intake must share a section");
  return visible(section);
};
const regionalUrls = [
  "https://www.vlaanderen.be/bouwen-wonen-en-energie/water/een-lek-in-de-waterleiding",
  "https://be.brussels/nl/milieu-afval/waterkwaliteit/leidingwater-brussel",
];

// Catches a merged regional rule, provider-side repair promise or forced enquiry.
test("water-leak route distinguishes Flemish and Brussels provider handoffs from assessed private repair", async () => {
  const text = handoff(await render());
  assert.match(text, /Vlaanderen:[^.]*straat[^.]*hoofdkraan[^.]*watermeter[^.]*waterbedrijf/i);
  assert.match(text, /Brussel:[^.]*drinkwaternet[^.]*dringend technisch[^.]*VIVAQUA[^.]*technische wachtdienst/i);
  assert.match(text, /zichtbare[^.]*veilig bereikbare privéleiding[^.]*AB Service[^.]*beoordeling/i);
  assert.match(text, /bron of plaats onbekend[^.]*onbekend[^.]*geen diagnose/i);
  assert.doesNotMatch(text, /AB Service[^.]*herstelt[^.]*drinkwaternet|altijd eerst[^.]*AB Service/i);
});

// Catches asking readers to investigate, guess or retest an unsafe situation.
test("handoff accepts already-known descriptive observations and unknown closure without reopening", async () => {
  const text = handoff(await render());
  assert.match(text, /alleen[^.]*al weet[^.]*veilig zichtbaar/i);
  assert.match(text, /waar[^.]*sinds wanneer/i);
  assert.match(text, /leiding of bron[^.]*zichtbaar[^.]*onbekend/i);
  assert.match(text, /al veilig afgesloten[^.]*niet afgesloten[^.]*onbekend/i);
  assert.match(text, /waterverlies[^.]*doorging/i);
  assert.match(text, /gebouwbeheerder[^.]*toegang/i);
  assert.match(text, /leidingmateriaal[^.]*zichtbaar[^.]*niet gokken/i);
  assert.match(text, /heropen[^.]*niet[^.]*onderzoek[^.]*niet/i);
});

// Catches losing the emergency boundary or making photos a prerequisite.
test("emergency warning precedes preparation and text alone suffices with safely optional photos", async () => {
  const html = await render();
  const text = handoff(html);
  assert.ok(html.indexOf('class="warning-box"') < html.indexOf("Gesprongen leiding:"));
  assert.match(visible(html), /overstromingsgevaar[^.]*elektriciteit[^.]*online formulier niet als noodkanaal/i);
  assert.match(visible(html), /Sluit[^.]*watertoevoer[^.]*veilig[^.]*zonder elektrische risico/i);
  assert.match(text, /actief lek[^.]*wacht[^.]*niet[^.]*formulier[^.]*lange meterproef/i);
  assert.match(text, /beschrijving[^.]*voldoende/i);
  assert.match(text, /foto[^.]*optioneel[^.]*veilig[^.]*afgesproken contactkanaal/i);
  assert.match(text, /geen[^.]*huisgegevens[^.]*privédocumenten[^.]*klantidentiteit/i);
  assert.match(text, /formulier[^.]*geen upload/i);
  assert.doesNotMatch(visible(html), /stuur foto’s van de bron|ontdooi|soldeer|graaf|demonteer|tijdelijke reparatie/i);
});

// Catches a reordered handoff or lost existing content/media/contact contract.
test("water-leak addition preserves image, original sections, four steps, useful links and both service CTAs", async () => {
  const html = await render();
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.match(html, /<h1>Waterlek laten herstellen<\/h1>/);
  assert.match(html, /src="\/media\/sanitair-leidingwerk.webp"[^>]*alt="Sanitaire installatie en leidingwerk door AB Service"/);
  const ordered = ["content-visual", "Gesprongen leiding:", "Welke waterlekken kunnen worden aangepakt?", "Toegang en materiaal bepalen de aanpak", "Na herstel wordt de werkzone gecontroleerd", "Van aanvraag tot duidelijke afspraak"];
  for (let i = 1; i < ordered.length; i++) assert.ok(html.indexOf(ordered[i - 1]) < html.indexOf(ordered[i]), ordered[i]);
  const steps = html.match(/<ol class="steps-grid">([\s\S]*?)<\/ol>/)?.[1];
  assert.equal((steps?.match(/<li>/g) || []).length, 4);
  for (const title of ["Beperk schade", "Deel beelden", "Herstel", "Controle"]) assert.ok(steps.includes(`<h3>${title}</h3>`), title);
  for (const href of ["/diensten/lekdetectie", "/diensten", "/projecten", "/tarieven", "/contact", "/advies/watermeter-blijft-draaien", "/advies/boiler-veiligheidsgroep-druppelt", "tel:+32484906966"]) assert.ok(html.includes(`href="${href}"`), href);
  assert.match(html, /href="https:\/\/wa.me\/32484906966\?text=Hallo%2C%20ik%20heb%20een%20vraag\."/);
  const hrefs = [...html.matchAll(/href="(\/contact\?[^\"]+)"/g)].map(([, href]) => href);
  assert.deepEqual(hrefs, ["/contact?dienst=Waterlek+herstellen#aanvraagformulier", "/contact?dienst=Waterlek+herstellen#aanvraagformulier"]);
  for (const href of hrefs) {
    const url = new URL(href, "https://www.abservice24.be");
    assert.equal(url.hash, "#aanvraagformulier");
    assert.deepEqual(readContactContext({ search: url.search, hash: url.hash }), { service: "Waterlek herstellen" });
  }
});

// Catches visible citations escaping central monitoring or duplicate audit work.
test("water-leak citations show exact scoped central URLs and audit reused URLs only once", async () => {
  const html = await render();
  const official = html.slice(html.indexOf("<h2>Officiële informatie</h2>"), html.indexOf('class="contact-cta"'));
  const hrefs = [...official.matchAll(/href="([^"]+)"/g)].map(([, href]) => href);
  assert.deepEqual(hrefs, regionalUrls);
  const water = services.getAdditionalService("waterlek-herstellen");
  assert.ok(Object.isFrozen(water.sourceLinks));
  for (const href of regionalUrls) {
    assert.ok(Object.values(sources.coreSources).some((source) => source.href === href));
    assert.ok(getCitedSources().some((source) => source.href === href));
  }
  assert.match(visible(official), /Vlaanderen:[^.]*waterbedrijf/);
  assert.match(visible(official), /Brussels Hoofdstedelijk Gewest:[^.]*drinkwaternet[^.]*VIVAQUA/);
  const requested = [];
  await auditExternalSources(getCitedSources().filter(({ href }) => regionalUrls.includes(href)), async (href) => {
    requested.push(href);
    return { status: 200 };
  });
  assert.deepEqual(requested, regionalUrls);
});

// Catches dates omitted by the route or collectively assigned to other services.
test("only changed water-leak content receives separately labeled editorial dates and actual sitemap modification", async () => {
  const html = await render();
  assert.match(html, /Uitgegeven door <a[^>]*href="\/over-ons"[^>]*>AB Service<\/a>/);
  assert.match(html, /Broninformatie nagekeken op <time dateTime="2026-10-11">11 oktober 2026<\/time>/);
  assert.match(html, /Inhoud gewijzigd op <time dateTime="2026-10-11">11 oktober 2026<\/time>/);
  assert.equal((html.match(/<time /g) || []).length, 2);
  assert.doesNotMatch(html, /article-schema|datePublished|Person/);
  assert.equal(registry.getPageDefinition("/diensten/waterlek-herstellen").lastModified, "2026-10-11");
  const additionalEntries = sitemap.default().filter(({ url }) => /^https:\/\/www.abservice24.be\/diensten\//.test(url));
  assert.deepEqual(Array.from(additionalEntries.filter((entry) => entry.lastModified), ({ url, lastModified }) => ({ url, lastModified })), [
    { url: "https://www.abservice24.be/diensten/waterlek-herstellen", lastModified: "2026-10-11" },
  ]);
});

// Root-supplied pre-task digest protects this bounded task's full five entries.
test("other five service records and their registry/rendered output omit optional editorial and source fields", async () => {
  const other = services.additionalServices.filter(({ slug }) => slug !== "waterlek-herstellen");
  assert.equal(createHash("sha256").update(JSON.stringify(other)).digest("hex"), "012ee6b845d5720ae0f2679e00063576ee23edf66a4bae527a2322bea1eb19a2");
  assert.equal(other.length, 5);
  for (const entry of other) {
    assert.ok(!Object.hasOwn(entry, "sourceLinks"));
    assert.ok(!Object.hasOwn(entry, "editorial"));
    assert.deepEqual(registry.getPageDefinition(entry.path), {
      path: entry.path, status: "published", title: `${entry.title} | AB Service`,
      description: entry.description, changeFrequency: "monthly", priority: 0.75,
    });
    assert.doesNotMatch(await render(entry.slug), /editorial-note|<time |Officiële informatie/);
  }
});

// Catches changed metadata, a new route or unknown slugs becoming public pages.
test("additional-service route preserves static params, water-leak metadata and real notFound boundary", async () => {
  assert.deepEqual(Array.from(route.generateStaticParams(), ({ slug }) => slug), ["lekdetectie", "waterlek-herstellen", "ontstopping", "boiler", "leidingen", "badkamerrenovatie"]);
  assert.equal(route.dynamicParams, false);
  const metadata = await route.generateMetadata({ params: Promise.resolve({ slug: "waterlek-herstellen" }) });
  assert.equal(metadata.title, "Waterlek laten herstellen | AB Service");
  assert.equal(metadata.description, "AB Service herstelt bereikbare waterlekken aan sanitaire leidingen en aansluitingen na beoordeling van bron, toegang en materiaal.");
  assert.equal(metadata.alternates.canonical, "https://www.abservice24.be/diensten/waterlek-herstellen");
  assert.equal(metadata.robots.index, true);
  assert.equal(metadata.openGraph.type, "website");
  assert.ok(!Object.hasOwn(metadata.openGraph, "modifiedTime"));
  await assert.rejects(route.default({ params: Promise.resolve({ slug: "unknown-water-service" }) }), (error) => error.digest === "NEXT_HTTP_ERROR_FALLBACK;404");
  const unknown = await route.generateMetadata({ params: Promise.resolve({ slug: "unknown-water-service" }) });
  assert.equal(unknown.robots.index, false);
  assert.equal(unknown.robots.follow, false);
});
