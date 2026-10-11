import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as areas from "../content/service-areas.mjs";
import * as projects from "../content/projects.mjs";
import * as business from "../content/business.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";
import { getCitedSources } from "../libs/cited-sources.mjs";
import { areaDrafts } from "../content/content-backlog.mjs";

// Execute complete production modules, real Next links and notFound. Only the
// analytics transport is adapted; static rendering never sends an enquiry.
const events = [];
const tracked = await loadContactModule("components/tracked-link.js", {
  "@vercel/analytics": { track: (...args) => events.push(args) },
});
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": tracked };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema,
});
const dependencies = {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/breadcrumbs": breadcrumbs, "@/content/service-areas.mjs": areas,
  "@/content/projects.mjs": projects, "@/content/site-content.mjs": registry,
  "@/libs/seo-data.mjs": seo,
};
const districtPage = await loadContactModule("components/district-page.js", dependencies);
const routeDependencies = { ...dependencies, "@/components/district-page": districtPage };
const route = await loadContactModule("app/loodgieter-borsbeek/page.js", routeDependencies);
const sitemap = await loadContactModule("app/sitemap.js", dependencies);
const regionRoute = await loadContactModule("app/werkgebied/[regio]/page.js", dependencies);

const districtUrl = "https://www.antwerpen.be/info/waarom-een-apart-bestuur-per-district";
const wijkUrl = "https://www.antwerpen.be/assets-proxy/b6b7cf63-3c94-4413-9374-4a36f88fd401";
const decode = (html) => html.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, (entity) => {
  const named = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" };
  return named[entity] ?? String.fromCodePoint(Number(entity.startsWith("&#x") ? `0x${entity.slice(3, -1)}` : entity.slice(2, -1)));
});
const visible = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const linksOf = (html) => Array.from(html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g), ([, href, label]) => ({ href: decode(href), label: visible(label) }));
const render = () => renderToStaticMarkup(route.default());

// Catches the unsupported geography-to-pipes inference surviving the rewrite,
// or a transition being presented as a branch, expertise or appointment claim.
test("Borsbeek's rendered context explains the transition within confirmed coverage", () => {
  const html = render();
  const context = visible(html.match(/<div class="prose-block">([\s\S]*?)<\/div>/)[1]);
  assert.match(context, /1 januari 2025.*tiende district van Antwerpen/);
  assert.match(context, /blijft binnen het bevestigde werkgebied van AB Service/);
  assert.match(context, /geen nieuwe vestiging/);
  assert.match(context, /zegt niets over het leidingverloop of bijzondere technische kennis/);
  assert.match(context, /via het aanvraagformulier uw locatie en concrete situatie/);
  assert.match(context, /aanpak en planning volgen na beoordeling/);
  const firstFaq = visible(html.match(/<details[^>]*>([\s\S]*?)<\/details>/)[1]);
  assert.match(firstFaq, /1 januari 2025.*tiende district van Antwerpen/);
  assert.match(firstFaq, /bevestigde werkgebied van AB Service/);
  assert.match(firstFaq, /geen nieuwe vestiging, vaste aankomsttijd of automatische afspraak/);
  assert.match(firstFaq, /afspraak en timing worden pas na beoordeling bevestigd/);
  assert.doesNotMatch(visible(html), /gebiedsarchitectuur|dichtere woonzones|groene rand|per buurt sterk kunnen verschillen/);
});

// Catches citing the wijk table as proof of the transition, an invisible source
// check, a mutable provenance object or a new URL escaping source monitoring.
test("Borsbeek displays separate administrative and original wijk citations", () => {
  const html = render();
  const notes = [...html.matchAll(/<p class="source-note">([\s\S]*?)<\/p>/g)].map(([, value]) => value);
  assert.equal(notes.length, 2);
  const administrative = notes.find((note) => note.includes(districtUrl));
  assert.ok(administrative, "visible administrative citation");
  assert.deepEqual(linksOf(administrative), [{ href: districtUrl, label: "Stad Antwerpen: de 10 districten ↗" }]);
  assert.match(visible(administrative), /Districtsindeling:.*Bron geraadpleegd op 2026-10-11/);
  assert.match(administrative, /<time dateTime="2026-10-11">2026-10-11<\/time>/);
  assert.doesNotMatch(administrative, /publicatie|herzien|review|goedgekeurd/i);
  const wijk = notes.find((note) => note.includes(wijkUrl));
  assert.deepEqual(linksOf(wijk), [{ href: wijkUrl, label: "Stad Antwerpen: officiële wijkgegevens en clusterindeling 2026 ↗" }]);
  assert.match(visible(wijk), /Lokale benamingen zijn gebaseerd op/);
  assert.match(visible(wijk), /geen bewering over uitgevoerde projecten of lokale reviews/);
  assert.doesNotMatch(wijk, /2025|2026-10-11/);
  const district = areas.getDistrict("borsbeek");
  assert.deepEqual(district.contextSource, { label: "Stad Antwerpen: de 10 districten", href: districtUrl, checkedAt: "2026-10-11" });
  assert.ok(Object.isFrozen(district.contextSource));
  assert.equal(getCitedSources().filter(({ href }) => href === districtUrl).length, 1);
});

// Catches factory/registry dates being lost or a global clock/date being added.
test("the six genuinely modified districts carry their dates into the sitemap", () => {
  const district = areas.getDistrict("borsbeek");
  assert.equal(district.modifiedAt, "2026-10-11");
  const derived = projects.deriveAreaEvidence(district, projects.projects);
  assert.equal(derived.modifiedAt, "2026-10-11");
  assert.deepEqual(derived.contextSource, { label: "Stad Antwerpen: de 10 districten", href: districtUrl, checkedAt: "2026-10-11" });
  assert.equal(registry.getPageDefinition("/loodgieter-borsbeek").lastModified, "2026-10-11");
  const entries = sitemap.default().filter(({ url }) => url.includes("/loodgieter-"));
  assert.equal(entries.length, 8);
  assert.deepEqual(entries.filter((entry) => Object.hasOwn(entry, "lastModified")), [{
    url: "https://www.abservice24.be/loodgieter-berchem", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-10-11",
  }, {
    url: "https://www.abservice24.be/loodgieter-borgerhout", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-10-11",
  }, {
    url: "https://www.abservice24.be/loodgieter-borsbeek", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-10-11",
  }, {
    url: "https://www.abservice24.be/loodgieter-deurne", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-10-11",
  }, {
    url: "https://www.abservice24.be/loodgieter-ekeren", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-10-11",
  }, {
    url: "https://www.abservice24.be/loodgieter-wilrijk", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-10-11",
  }]);
});

// Literal preservation expectations come from the approved prior page, not a
// second builder. Catches lost preparation, links, facts, structure or schema.
test("the Borsbeek route retains its useful content, order and neutral intake", () => {
  const html = render();
  const text = visible(html);
  assert.deepEqual([...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(([, value]) => visible(value)), ["Loodgieter in Borsbeek voor sanitair en verwarming"]);
  for (const phrase of [
    "Borsbeek is sinds 1 januari 2025 het tiende district van Antwerpen en bestaat in de stedelijke wijkdata uit Borsbeek Oost, West en Groen.",
    "Vermeld Borsbeek Oost, West of Groen indien bekend, samen met toesteltype, bouwsituatie en duidelijke foto’s.",
    "Welke locatiegegevens helpen bij de planning?",
    "Vermeld indien bekend Borsbeek Oost, West of Groen, samen met woningtype, parkeersituatie, verdieping, toestelgegevens en bereikbaarheid van leidingen of technische ruimte.",
    "AB Service bedient Borsbeek. Een afspraak en timing worden pas bevestigd nadat de locatie, technische vraag en praktische bereikbaarheid zijn beoordeeld.",
    "Een afspraak of prijs is pas bevestigd na beoordeling van uw aanvraag.",
    "Bel 0484 90 69 66",
  ]) assert.ok(text.includes(phrase), phrase);
  assert.deepEqual([...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(([, value]) => visible(value)), [
    "Wat bij een aanvraag in Borsbeek telt", "Veelgestelde vragen over Borsbeek", "Andere Antwerpse districten", "Wilt u uw situatie bespreken?",
  ]);
  const markers = ['aria-label="Kruimelpad"', 'class="page-hero"', 'class="answer-box"', 'class="prose-block"', "Beschikbare diensten", 'class="faq-list"', 'class="inline-links"', 'class="contact-cta"'];
  const positions = markers.map((marker) => html.indexOf(marker));
  assert.ok(positions.every((position, index) => position >= 0 && (!index || position > positions[index - 1])));
  const links = linksOf(html);
  for (const [label, href] of [
    ["Cv-ketelonderhoud", "/onderhoud"], ["Herstelling van verwarming", "/herstelling"],
    ["Sanitair en loodgieterswerk", "/installaties/sanitair"], ["Gasketelinstallatie", "/installaties/gasketels"],
    ["Hoe prijs en offerte worden bepaald →", "/tarieven"],
    ["Deurne", "/loodgieter-deurne"], ["Berchem", "/loodgieter-berchem"], ["Wilrijk", "/loodgieter-wilrijk"],
    ["Heel provincie Antwerpen", "/werkgebied/antwerpen"],
    ["Aanvraag uit Borsbeek", "/contact#aanvraagformulier"], ["Naar het contactformulier", "/contact#aanvraagformulier"],
    ["Bel 0484 90 69 66", "tel:+32484906966"], ["WhatsApp", "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."],
  ]) assert.ok(links.some((link) => link.href === href && link.label === label), `${label}: ${href}`);
  const breadcrumb = JSON.parse(html.match(/<script[^>]*id="breadcrumb-schema"[^>]*>(.*?)<\/script>/)[1]);
  assert.deepEqual(breadcrumb.itemListElement.map(({ name, item }) => [name, item]), [
    ["Home", "https://www.abservice24.be/"], ["Werkgebied", "https://www.abservice24.be/werkgebied"],
    ["Provincie Antwerpen", "https://www.abservice24.be/werkgebied/antwerpen"], ["Borsbeek", "https://www.abservice24.be/loodgieter-borsbeek"],
  ]);
  assert.equal([...html.matchAll(/<script[^>]*type="application\/ld\+json"/g)].length, 1);
  assert.doesNotMatch(html, /<img\b|Echte projecten|Gecontroleerde projecten|article-schema|datePublished|dateModified|reviewRating/);
  assert.deepEqual(events, []);
});

test("Borsbeek retains published metadata without article or reviewer claims", () => {
  assert.equal(route.metadata.title, "Loodgieter Borsbeek | Sanitair en verwarming | AB Service");
  assert.equal(route.metadata.description, "Loodgieters- of verwarmingsvraag in Borsbeek? AB Service beoordeelt onderhoud, herstelling, sanitair en installatiewerk op basis van uw situatie.");
  assert.equal(route.metadata.alternates.canonical, "https://www.abservice24.be/loodgieter-borsbeek");
  assert.equal(route.metadata.robots.index, true);
  assert.equal(route.metadata.robots.follow, true);
  assert.equal(route.metadata.openGraph.type, "website");
  assert.equal(Object.hasOwn(route.metadata.openGraph, "modifiedTime"), false);
  assert.equal(Object.hasOwn(route.metadata, "authors"), false);
  const derived = projects.deriveAreaEvidence(areas.getDistrict("borsbeek"));
  assert.equal(derived.hasProjectEvidence, false);
  assert.equal(derived.hasLocalReview, false);
  assert.equal(derived.projectCount, 0);
  assert.deepEqual(derived.matchingProjects, []);
});

// Catches optional source/date leakage or accidental adoption of the seven
// separate noindex recommendations. Expectations are explicit prior states.
test("all other nine districts retain source and public status with five genuine corrections dated", async () => {
  const modified = { berchem: "2026-10-11", borgerhout: "2026-10-11", deurne: "2026-10-11", ekeren: "2026-10-11", wilrijk: "2026-10-11" };
  for (const [slug, publicHref, status] of [
    ["antwerpen", "/", "published"], ["berchem", "/loodgieter-berchem", "published"],
    ["berendrecht-zandvliet-lillo", null, "noindex"], ["borgerhout", "/loodgieter-borgerhout", "published"],
    ["deurne", "/loodgieter-deurne", "published"], ["ekeren", "/loodgieter-ekeren", "published"],
    ["hoboken", "/loodgieter-hoboken", "published"], ["merksem", "/loodgieter-merksem", "published"],
    ["wilrijk", "/loodgieter-wilrijk", "published"],
  ]) {
    const district = areas.getDistrict(slug);
    for (const record of [district, projects.deriveAreaEvidence(district)]) {
      assert.equal(Object.hasOwn(record, "contextSource"), false, slug);
      assert.equal(Object.hasOwn(record, "modifiedAt"), Object.hasOwn(modified, slug), slug);
      assert.equal(record.modifiedAt, modified[slug], slug);
      assert.deepEqual(record.localSource, { label: "Stad Antwerpen: officiële wijkgegevens en clusterindeling 2026", href: wijkUrl, verifiedStatus: 200, verifiedAt: "2026-09-16" });
    }
    assert.equal(areas.getDistrictPublicHref(district), publicHref);
    const definition = registry.getPageDefinition(district.canonicalPath);
    assert.equal(definition.status, status);
    assert.equal(Object.hasOwn(definition, "lastModified"), Object.hasOwn(modified, slug), slug);
    assert.equal(definition.lastModified, modified[slug], slug);
    const html = renderToStaticMarkup(districtPage.default({ slug }));
    assert.doesNotMatch(html, /Districtsindeling:|Bron geraadpleegd op|<time\b/);
    if (slug !== "antwerpen") {
      const otherRoute = await loadContactModule(`app/loodgieter-${slug}/page.js`, routeDependencies);
      assert.equal(otherRoute.metadata.robots.index, status === "published");
      assert.equal(otherRoute.metadata.robots.follow, true);
      assert.equal(otherRoute.metadata.alternates.canonical, `https://www.abservice24.be/loodgieter-${slug}`);
    }
  }
});

test("coverage remains 304 municipalities, 302 data-only drafts, six hubs and ten districts", async () => {
  assert.equal(areas.serviceAreas.length, 304);
  assert.equal(areaDrafts.length, 302);
  assert.equal(areas.serviceRegionHubs.length, 6);
  assert.equal(areas.antwerpDistricts.length, 10);
  assert.equal(areas.indexableDistricts.length, 8);
  assert.deepEqual(Array.from(regionRoute.generateStaticParams(), ({ regio }) => regio), ["antwerpen", "limburg", "oost-vlaanderen", "vlaams-brabant", "west-vlaanderen", "brussel"]);
  assert.equal(regionRoute.dynamicParams, false);
  const entries = sitemap.default();
  const hrefs = areas.buildCoverageDirectoryGroups().flatMap(({ areas: group }) => group.map(({ href }) => href));
  for (const draft of areaDrafts) {
    assert.equal(draft.status, "draft");
    assert.equal(registry.getPageDefinition(`/loodgieter-${draft.slug}`), undefined);
    assert.ok(!entries.some(({ url }) => url === `https://www.abservice24.be/loodgieter-${draft.slug}`));
    assert.ok(!hrefs.includes(`/loodgieter-${draft.slug}`));
    await assert.rejects(access(new URL(`../app/loodgieter-${draft.slug}/page.js`, import.meta.url)), { code: "ENOENT" });
  }
  assert.equal(areas.getDistrict("synthetic-unknown-district"), undefined);
  assert.equal(registry.getPageDefinition("/loodgieter-synthetic-unknown-district"), undefined);
  await assert.rejects(regionRoute.default({ params: Promise.resolve({ regio: "synthetic-unknown-region" }) }), (error) => error.digest === "NEXT_HTTP_ERROR_FALLBACK;404");
});
