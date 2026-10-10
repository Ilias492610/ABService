import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as intents from "../content/service-intents.mjs";
import * as services from "../content/additional-services.mjs";
import * as media from "../content/media.mjs";
import * as sources from "../content/core-sources.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as registry from "../content/site-content.mjs";
import * as business from "../content/business.mjs";

// Only tracking and framework image boundaries are replaced; production hero/CTA
// and the complete ServicePage, data and contact context are rendered unchanged.
const trackedLink = ({ eventName, eventProperties, children, ...props }) => React.createElement("a", props, children);
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": trackedLink };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const image = await loadContactModule("components/content-image.js", {
  "next/image": ({ priority, sizes, ...props }) => React.createElement("img", props),
});
const { default: ServicePage } = await loadContactModule("components/service-page.js", {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/content-image": image,
  "@/components/breadcrumbs": () => null,
  "@/content/service-intents.mjs": intents,
});
const pageDependencies = {
  "@/components/service-page": ServicePage,
  "@/content/media.mjs": media, "@/content/core-sources.mjs": sources,
  "@/libs/seo-data.mjs": seo, "@/content/site-content.mjs": registry,
  "@/content/additional-services.mjs": services,
};
const page = async (path, props) => (await loadContactModule(path, pageDependencies)).default(props);
const render = (props) => renderToStaticMarkup(React.createElement(ServicePage, props));
const fixture = {
  breadcrumb: [{ name: "Herstelling", path: "/herstelling" }], title: "Test service",
  intro: "Intro", answer: "Answer", warning: "Keep safe",
  image: { src: "/fixture.jpg", alt: "Fixture photo", width: 80, height: 60 },
  sections: [{ title: "Existing section", paragraphs: ["Existing paragraph"], items: ["Existing item"] }],
  steps: [{ title: "Existing step", text: "Existing process" }],
  relatedLinks: [{ label: "Existing related", href: "/tarieven" }],
  sourceLinks: [{ label: "Existing official source", href: "https://example.invalid/source" }],
};

// Catches a missing FAQ branch, unsafe HTML insertion or misplaced FAQ section.
test("supplied FAQ renders native escaped disclosure before related links and CTA", () => {
  const html = render({ ...fixture, faq: [["Question <script>", "Answer <b> & text"], ["Second question", "Second answer"]] });
  assert.equal((html.match(/<h2>Veelgestelde vragen<\/h2>/g) || []).length, 1);
  assert.equal((html.match(/<details>/g) || []).length, 2);
  assert.match(html, /<summary>Question &lt;script&gt;<\/summary><p>Answer &lt;b&gt; &amp; text<\/p>/);
  assert.ok(html.indexOf("Veelgestelde vragen") < html.indexOf("Lees ook"));
  assert.ok(html.indexOf("Veelgestelde vragen") < html.indexOf('class="contact-cta"'));
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.doesNotMatch(html, /FAQPage/);
});

test("default and empty FAQ preserve existing content and service-prefilled CTA without FAQ containers", () => {
  for (const faq of [undefined, []]) {
    const html = render({ ...fixture, faq });
    assert.doesNotMatch(html, /Veelgestelde vragen|faq-list|<details/);
    for (const text of ["Keep safe", "Existing section", "Existing paragraph", "Existing item", "Existing step", "Existing process", "Existing related", "Existing official source", "Fixture photo"]) assert.ok(html.includes(text), text);
    assert.match(html, /href="\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier"/);
    assert.match(html, /href="https:\/\/example.invalid\/source"/);
  }
});

test("section links appear after section content only when supplied", () => {
  assert.doesNotMatch(render({ ...fixture, relatedLinks: [], sourceLinks: [], breadcrumb: [] }), /class="link-list"/);
  const html = render({ ...fixture, sections: [{ ...fixture.sections[0], links: [{ label: "Assess replacement", href: "/installaties/gasketels" }] }] });
  assert.match(html, /href="\/installaties\/gasketels">Assess replacement/);
  assert.ok(html.indexOf("Existing item") < html.indexOf("Assess replacement"));
  assert.doesNotMatch(render({ ...fixture, sections: [{ ...fixture.sections[0], links: [] }], relatedLinks: [], sourceLinks: [], breadcrumb: [] }), /class="link-list"/);
});

test("existing intent advice deduplication retains a supplied label once", () => {
  const html = render({ ...fixture, relatedLinks: [{ label: "Supplied pressure context", href: "/advies/drukverlies-cv-ketel" }] });
  assert.equal((html.match(/href="\/advies\/drukverlies-cv-ketel"/g) || []).length, 1);
  assert.ok(html.includes("Supplied pressure context"));
  assert.ok(html.includes('href="/advies/geen-warm-water"'));
});

test("maintenance supplies three regional, distinct-inspection and preparation FAQ answers with official sources", async () => {
  const element = await page("app/onderhoud/page.js");
  assert.equal(element.props.faq?.length, 3);
  const [interval, inspection, preparation] = element.props.faq.map(([, answer]) => answer);
  assert.match(interval, /Vlaanderen/); assert.match(interval, /20 kW/); assert.match(interval, /onder.*aanbevolen/);
  assert.match(interval, /Brussel/); assert.match(interval, /twee jaar/); assert.match(interval, /zonder.*vermogensgrens/);
  assert.match(inspection, /afzonderlijke controle/); assert.match(inspection, /ingebruikname|plaatsing/);
  for (const term of [/model/, /gewest/, /vermogen/, /attest/]) assert.match(preparation, term);
  assert.ok(`${interval} ${inspection}`.split(/\s+/).length <= 140);
  const html = renderToStaticMarkup(element);
  assert.equal((html.match(/<details>/g) || []).length, 3);
  for (const href of ["/merken", "/tools/onderhoudscheck", "/keuring", "https://leefmilieu.brussels/verwarmingsketel"]) assert.ok(html.includes(`href="${href}"`), href);
});

test("repair exposes maintenance and assessed replacement choices while retaining intake, warning and reset limits", async () => {
  const element = await page("app/herstelling/page.js");
  const decision = element.props.sections.find((section) => section.links?.length);
  assert.ok(decision, "customer decision section");
  assert.deepEqual(Array.from(decision.links, ({ href }) => href), ["/onderhoud", "/installaties/gasketels"]);
  const text = decision.paragraphs.join(" ");
  assert.match(text, /zonder.*storing/); assert.match(text, /diagnose/); assert.match(text, /vervanging.*beoordeling/);
  const html = renderToStaticMarkup(element);
  for (const text of ["Veiligheid eerst", "Wat u veilig kunt noteren", "Vermijd herhaald resetten", "Waarom een herstelling", "Risicocheck"]) assert.ok(html.includes(text), text);
  assert.match(html, /Ruikt u gas, vermoedt u koolstofmonoxide/);
  assert.match(html, /Gebruik het toestel niet opnieuw tot de situatie veilig is verklaard/);
  assert.match(html, /Een enkele reset volgens de gebruikershandleiding/);
  assert.match(html, /Blijft de code terugkomen, stop dan/);
  assert.ok(html.includes('href="/merken"'));
});

test("sanitary keeps current entrances and adds pipework and water-leak repair", async () => {
  const html = renderToStaticMarkup(await page("app/installaties/sanitair/page.js"));
  for (const href of ["/diensten/leidingen", "/diensten/waterlek-herstellen", "/installaties", "/diensten/badkamerrenovatie", "/projecten/sanitair-vernieuwd", "/tarieven", "/contact"]) assert.ok(html.includes(`href="${href}"`), href);
});

test("additional-service consumer retains reciprocal, common and advice links once without draft or self links", async () => {
  for (const [slug, reciprocal, advice] of [["lekdetectie", "/diensten/waterlek-herstellen", "/advies/drukverlies-cv-ketel"], ["waterlek-herstellen", "/diensten/lekdetectie", "/advies/boiler-veiligheidsgroep-druppelt"]]) {
    const service = services.getAdditionalService(slug);
    assert.equal(service.relatedLinks?.length, 1);
    assert.ok(Object.isFrozen(service.relatedLinks));
    const element = await page("app/diensten/[slug]/page.js", { params: Promise.resolve({ slug }) });
    const html = renderToStaticMarkup(element);
    const related = html.slice(html.indexOf("<h2>Lees ook</h2>"), html.indexOf('class="contact-cta"'));
    const hrefs = Array.from(related.matchAll(/href="([^"]+)"/g), ([, href]) => href);
    for (const href of [reciprocal, "/diensten", "/projecten", "/tarieven", "/contact", "/advies/watermeter-blijft-draaien", advice]) assert.ok(hrefs.includes(href), href);
    assert.equal(new Set(hrefs).size, hrefs.length);
    assert.ok(!hrefs.includes(service.path));
    for (const href of hrefs) assert.equal(registry.getPageDefinition(href)?.status, "published", href);
  }
  for (const service of services.additionalServices.filter(({ slug }) => !["lekdetectie", "waterlek-herstellen"].includes(slug))) assert.equal(service.relatedLinks?.length, 0);
});
