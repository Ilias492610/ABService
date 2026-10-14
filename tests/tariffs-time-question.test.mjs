import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import { beforeTariffEntryLinks } from "./fixtures/tariffs-entry-links.mjs";
import * as business from "../content/business.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";

const question = "Geldt voor het gewenste tijdstip, bijvoorbeeld ’s avonds of in het weekend, een ander tarief of een toeslag? Laat dit vooraf verduidelijken.";
const originalQuestions = [
  "Zijn verplaatsing, diagnose en werkuren afzonderlijk of samen opgenomen?",
  "Welke materialen en hoeveelheden zijn inbegrepen?",
  "Is het toepasselijke btw-tarief vermeld en onder welke voorwaarden?",
  "Welke werken, afwerking en documenten vallen buiten de scope?",
  "Hoe worden onverwachte gebreken en meerwerk eerst gemeld en goedgekeurd?",
  "Wanneer zijn planning en prijs bindend bevestigd?",
];
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const events = [];
const tracked = await loadContactModule("components/tracked-link.js", { "@vercel/analytics": { track: (...args) => events.push(args) } });
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": tracked };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", { "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema });
const dependencies = { "@/components/page-hero": hero, "@/components/contact-cta": cta, "@/components/breadcrumbs": breadcrumbs, "@/content/site-content.mjs": registry, "@/libs/seo-data.mjs": seo };
const route = await loadContactModule("app/tarieven/page.js", dependencies);
const sitemap = await loadContactModule("app/sitemap.js", { "@/content/site-content.mjs": registry, "@/libs/seo-data.mjs": seo });
const htmlFor = () => renderToStaticMarkup(route.default());

// Missing/misplaced/duplicated preparation, or a removed original question fails.
test("the real offer checklist asks about possible time-dependent costs once and keeps the six original questions", () => {
  const html = htmlFor();
  const list = html.match(/<ul class="check-list">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(list);
  const questions = [...list.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, text]) => text);
  assert.deepEqual(questions, [originalQuestions[0], question, ...originalQuestions.slice(1)]);
  assert.equal(html.split(question).length - 1, 1);
  assert.doesNotMatch(questions[1], /€|\d|gratis|geen toeslag|vast tarief|onmiddellijk/i);
});

// Literal full-route fixture captured on c506f47 before any tariffs edits.
// Only this question and Task120's four exact anchors are removed; old hash retained.
test("tariffs retains the full original rendered route outside the one new preparation question", () => {
  const html = htmlFor();
  assert.equal(hash(beforeTariffEntryLinks(html).replace(`<li>${question}</li>`, "")), "cbf09382ffe05c6d0d06c28a0fb9f53d70b102bf0a853d4dac497bbd0e0e4749");
  assert.equal([...html.matchAll(/<article class="card">/g)].length, 6);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /Op deze pagina staat geen vaste prijslijst\./);
  assert.match(html, /Een foto vervangt geen plaatsbezoek/);
  assert.equal([...html.matchAll(/href="\/contact#aanvraagformulier"/g)].length, 2);
  assert.ok(html.includes('href="tel:+32484906966"'));
  assert.ok(html.includes('href="https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."'));
  assert.deepEqual(events, []);
});

test("the actual tariffs edit reaches sitemap lastModified without turning the page into a dated article", () => {
  const definition = registry.getPageDefinition("/tarieven");
  assert.equal(definition.lastModified, "2026-10-11");
  assert.equal(sitemap.default().find(entry => entry.url === "https://www.abservice24.be/tarieven").lastModified, "2026-10-11");
  assert.equal(route.metadata.openGraph.type, "website");
  assert.equal(Object.hasOwn(route.metadata.openGraph, "modifiedTime"), false);
  assert.equal(Object.hasOwn(route.metadata, "authors"), false);
});

test("tariffs metadata and all registry fields outside its new actual modification date stay unchanged", () => {
  assert.equal(hash(route.metadata), "475a13e46d8e7a6083ae262229f178035915b059b2c564cfc746f55c84545499");
  const { lastModified, ...retained } = registry.getPageDefinition("/tarieven");
  void lastModified;
  assert.equal(hash(retained), "9b5e86e5387b09fcac9f14fd193772cc7a5ceb46e5224fb40975095f04512cd6");
  assert.equal(route.metadata.alternates.canonical, "https://www.abservice24.be/tarieven");
  assert.equal(route.metadata.robots.index, true);
});
