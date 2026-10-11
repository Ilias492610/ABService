import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as intents from "../content/service-intents.mjs";
import * as media from "../content/media.mjs";
import * as sources from "../content/core-sources.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as registry from "../content/site-content.mjs";
import * as business from "../content/business.mjs";
import * as schema from "../libs/schema-data.mjs";
import { readContactContext } from "../libs/contact-context.mjs";
import { getCitedSources } from "../libs/cited-sources.mjs";

// Render the real route, ServicePage, hero, CTA and breadcrumbs. Only image and
// click-tracking boundaries are adapted; no requests or tracking are performed.
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
const { default: ServicePage } = await loadContactModule("components/service-page.js", {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/content-image": image, "@/components/breadcrumbs": breadcrumbs,
  "@/content/service-intents.mjs": intents,
});
const route = await loadContactModule("app/installaties/gasketels/page.js", {
  "@/components/service-page": ServicePage, "@/content/media.mjs": media,
  "@/content/core-sources.mjs": sources, "@/libs/seo-data.mjs": seo,
  "@/content/site-content.mjs": registry,
});
const element = await route.default();
const html = renderToStaticMarkup(element);
const text = value => value.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const handoff = () => {
  const section = element.props.sections.find(section => section.title === "Controle en documenten afspreken");
  assert.ok(section, "missing installation control/document handoff");
  const rendered = Array.from(html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g), ([section]) => section)
    .find(section => section.includes("<h2>Controle en documenten afspreken</h2>"));
  assert.ok(rendered, "handoff is not rendered by ServicePage");
  return { section, rendered, explanation: text(rendered) };
};

// Removing a question or moving the block out of the offer-to-premium position
// must fail on both route data and the visible consumer output.
test("installation offer explains control organizer, document scope and recipients before agreement", () => {
  const { section, rendered, explanation } = handoff();
  assert.equal(element.props.sections.indexOf(section), 2);
  assert.ok(html.indexOf("Leg de volledige scope schriftelijk vast") < html.indexOf("Controle en documenten afspreken"));
  assert.ok(html.indexOf("Controle en documenten afspreken") < html.indexOf("Controleer actuele steun rechtstreeks bij de overheid"));
  for (const requirement of [
    /vóór[^.]*akkoord/i, /welke[^.]*controle[^.]*installatie[^.]*gewest/i,
    /wie[^.]*controle[^.]*organiseert/i, /welk[^.]*rapport[^.]*attest[^.]*documenten[^.]*inbegrepen/i,
    /wie[^.]*documenten[^.]*ontvangt[^.]*bewaart/i,
  ]) assert.match(explanation, requirement);
  assert.match(rendered, /<ul class="check-list">/);
});

// A company credential, bundled approval or universal timing must not silently
// replace the individual recognition and separate-control explanation.
test("handoff keeps personal recognition and installation control distinct from periodic care", () => {
  const { explanation } = handoff();
  assert.match(explanation, /individuele[^.]*professional[^.]*erkenning[^.]*gewest[^.]*handeling/i);
  assert.match(explanation, /AB Service[^.]*werk[^.]*bewijst geen[^.]*erkenning/i);
  assert.match(explanation, /controle[^.]*afzonderlijke[^.]*plaatsing[^.]*periodiek onderhoud/i);
  assert.match(explanation, /afspraak[^.]*geen[^.]*goedkeuring/i);
  assert.doesNotMatch(text(html), /AB Service is (?:een )?erkend|AB Service[^.]*erkend bedrijf|altijd vóór (?:de )?(?:eerste )?ingebruikname|alle controles[^.]*inbegrepen|gratis keuring|garandeert[^.]*goedkeuring/i);
  assert.doesNotMatch(explanation, /\d+\s*(?:kW|dagen|maand|jaar)|recht op[^.]*steun/i);
});

test("handoff links follow the explanation in the same section and sources are visible and monitored", () => {
  const { section, rendered } = handoff();
  assert.deepEqual(Array.from(section.links, ({ href }) => href), ["/keuring", "/advies/onderhoudsattest-cv-ketel"]);
  for (const href of ["/keuring", "/advies/onderhoudsattest-cv-ketel"]) {
    assert.ok(rendered.includes(`href="${href}"`), href);
    assert.ok(rendered.lastIndexOf("</p>") < rendered.indexOf(`href="${href}"`));
    assert.equal(registry.getPageDefinition(href)?.status, "published");
  }
  assert.doesNotMatch(rendered, /href="\/onderhoud"/);
  const official = html.slice(html.indexOf("<h2>Officiële informatie</h2>"), html.indexOf('<section class="contact-cta"'));
  for (const href of [
    "https://www.vlaanderen.be/verplichte-keuring-van-een-nieuwe-of-gewijzigde-cv-installatie",
    "https://leefmilieu.brussels/pro/regelgeving-en-inspectie/verplichtingen-en-vergunningen/technische-installaties-epb-controles-en-onderhoud",
    "https://www.vlaanderen.be/bouwen-wonen-en-energie/bouwen-en-verbouwen/premies-voor-renovatie/mijn-verbouwpremie",
    "https://www.vlaanderen.be/bouwen-wonen-en-energie/lenen-voor-een-woning/mijn-verbouwlening/werken-die-in-aanmerking-komen-voor-mijn-verbouwlening",
  ]) {
    assert.ok(official.includes(`href="${href}" target="_blank" rel="noreferrer"`), href);
    assert.ok(getCitedSources().some(source => source.href === href), `unmonitored: ${href}`);
  }
});

test("installation consumer preserves assessment, offer, premium, steps, image, entrances and contact selection", () => {
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(html.includes("Een gasketel laten plaatsen of vervangen in Antwerpen"));
  for (const phrase of [
    "De juiste oplossing hangt af van de woning, warmte- en warmwaterbehoefte, bestaande leidingen, regeling en rookgasafvoer. Daarom volgt een betrouwbare prijs pas na voldoende technische informatie.",
    "Vraag een beoordeling aan met foto’s en toestelgegevens. Na controle ontvangt u een voorstel waarin de gekozen oplossing, materialen, werk, uitsluitingen, btw en afspraken duidelijk worden omschreven.",
    "Warmteverlies, gebruikspatroon en gewenste warmwatercapaciteit",
    "Staat van leidingen, radiatoren, regeling en condensafvoer",
    "Mogelijkheden voor luchttoevoer en rookgasafvoer",
    "Bereikbaarheid, bescherming en afvoer van oud materiaal",
    "Een offerte hoort duidelijk te maken welke materialen, aansluitingen, aanpassingen, werkuren en documenten inbegrepen zijn. Ook uitsluitingen en mogelijke meerwerken verdienen een heldere beschrijving.",
    "AB Service onderhoudt en herstelt meerdere courante ketelmerken als onafhankelijke dienstverlener. Een merkvermelding is geen claim van officiële fabrikant- of dealerstatus. De geschikte oplossing wordt per installatie besproken.",
    "In Vlaanderen is Mijn VerbouwPremie voor gascondensatieketels stopgezet. Controleer vóór uw investering de actuele voorwaarden voor renovatiesteun en financiering bij de Vlaamse overheid en uw Energiehuis. Een offerte houdt geen toezegging van financiële steun in.",
    "Deel woning- en installatiegegevens.", "Technische randvoorwaarden worden beoordeeld.",
    "Oplossing en scope worden schriftelijk vastgelegd.", "Uitvoering en oplevering volgen de afspraak.",
  ]) assert.ok(text(html).includes(phrase), phrase);
  assert.equal(element.props.steps.length, 4);
  assert.ok(html.includes('src="/media/marketing-ketelservice.webp"'));
  assert.ok(html.includes('alt="AB Service werkt aan een wandketel"'));
  const related = html.slice(html.indexOf("<h2>Lees ook</h2>"), html.indexOf("<h2>Officiële informatie</h2>"));
  for (const href of ["/installaties", "/keuring", "/tarieven", "/merken", "/projecten/gasketel-vervangen", "/advies/onderhoudsattest-cv-ketel", "/tools/onderhoudscheck"]) assert.ok(related.includes(`href="${href}"`), href);
  for (const block of [html.slice(html.indexOf('<section class="page-hero"'), html.indexOf('<section class="section section-compact"')), html.slice(html.indexOf('<section class="contact-cta"'))]) {
    const href = block.match(/href="(\/contact[^"]+)"/)[1];
    assert.equal(href, "/contact?dienst=Installatie+gasketel#aanvraagformulier");
    const url = new URL(href, "https://www.abservice24.be");
    assert.deepEqual(readContactContext(url), { service: "Installatie gasketel" });
  }
  assert.ok(html.includes('href="tel:+32484906966"'));
  assert.ok(html.includes('href="https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."'));
  assert.doesNotMatch(html, /<details>|FAQPage/);
});

test("real route metadata and sitemap use the published installation registry with its substantive date", async () => {
  assert.equal(registry.getPageDefinition("/installaties/gasketels").lastModified, "2026-10-11");
  assert.equal(route.metadata.alternates.canonical, "https://www.abservice24.be/installaties/gasketels");
  assert.equal(route.metadata.title, "Gasketel laten installeren in Antwerpen | AB Service");
  assert.equal(route.metadata.robots.index, true);
  assert.equal(route.metadata.openGraph.type, "website");
  assert.ok(!Object.hasOwn(route.metadata.openGraph, "modifiedTime"), "website metadata must not invent article dates");
  const { default: sitemap } = await loadContactModule("app/sitemap.js", {
    "@/content/site-content.mjs": registry, "@/libs/seo-data.mjs": seo,
  });
  assert.equal(sitemap().find(entry => entry.url === "https://www.abservice24.be/installaties/gasketels").lastModified, "2026-10-11");
});
