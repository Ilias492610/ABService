import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as areas from "../content/service-areas.mjs";
import * as projects from "../content/projects.mjs";
import * as business from "../content/business.mjs";
import * as fullLocalizedSite from "../content/site-content.mjs";
import { beforeLocalizationRegistry } from "./fixtures/localization-release-history.mjs";
const registry = {...fullLocalizedSite, pageRegistry:beforeLocalizationRegistry(fullLocalizedSite.pageRegistry)};
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";

const intro = "Borgerhout omvat zowel intra-muroswijken als Extra Muros. Heeft uw gebouw een compacte indeling? Vermeld dan wat u weet over de bereikbaarheid van afsluiters, ketel en eventuele gemeenschappelijke leidingen.";
const oldIntro = "Borgerhout omvat zowel intra-muroswijken als Extra Muros. In compacte gebouwen is het belangrijk om vooraf te weten waar afsluiters, ketel en gemeenschappelijke leidingen bereikbaar zijn.";
const inline = ' Bekijk de <a class="underline" href="/tools/onderhoudscheck">regionale onderhoudscheck</a> voor uw onderhoudsvraag.';
const details = "Geef de Brusselse gemeente, parkeer- en toegangssituatie en toestelgegevens mee. Voor ketelonderhoud en controles gelden Brusselse EPB-regels; de juiste handeling hangt onder meer af van het toestel en de installatiegeschiedenis.";
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
// Literal full-output preservation fixtures captured on eb0bf76 BEFORE edits.
// Exclude only the changed intro; Brussels otherwise uses its complete baseline.
const fixtures = [
  ["antwerpen", "863bdbe7126c4c482e05a178fa44de3ad277f812276207bf294cfe9ddb84f411", "fbe0e01f0f1577f82b313592a7b97789e23abc88b61f667e5f9433a793f4fe3e", "419da00b694ee8fc2ccf6770c6cbe8cc0ae598db07e6ffd1c5aa81bf4e612291", "6dffcb2f7eb5f3342efd04677c3df8771f2330b92e112f631e39006044be573d"],
  ["limburg", "65fc9e242bcb17c0c45180f9b8e7be0618f780fd74786a4e543696e86eac9b2f", "83f140c55e2473ab6d9a8be8da46b2796fbb2b5922563350b38331e686ca2ddd", "8d4e28da8b26b1cbe7c660227b4babfb0b49d68ec4b5615cb2dfd218fd7d58da", "873d0d23fece970ea2080cb0bcd90a7eba3a88ce8899d60d9f2bb7b0605124cb"],
  ["oost-vlaanderen", "722242830c390ef70dfa881841e05d6197461a16c93a54e2e501d57d7472409c", "5d6da957253127d93a2b63900fe222db340acf4c1a184a06f7ad289a445e4c1b", "c3a9aa0c852ab42ed8c08962f97ce89f95246969fb056047d366c388ad5d9d43", "b1ab2614d7b9575caf08229dc66f92aaebf0be86f277ddf4ef25aeb28e510181"],
  ["vlaams-brabant", "e222ea9b2921fd039d06d508ec00ff976e1c10be416206926b0b376c07908978", "bde0a57ef37969d8a4f32c1733acac145bba676b5705c1af388d1335d9bfe118", "8a94ff8d335384ed97df887a26868ec38e4caae40e68152ec6eb1b4702cd39bb", "612f1984ad7aae9567b2cfd845231477150e66352389a175fb69466def69ea97"],
  ["west-vlaanderen", "33b02744e267d9adc9666b1164213efc21d7967db4aad98b391865fa624ae409", "413ac09afa6799ab8cca4c0745c744de814ffafbb98b0164dc2ed6921db3ae31", "c0ec20c9938af61afd1b828740ea9d94bd493dd93260c4c1c05c4f0a63237dda", "ec6670aa7383bb97a147f641043746e389807da1dd6bf86364b925bb12c20ff8"],
  ["brussel", "fd6d3b37ceb50902c4466b31ebf7dbd411c9a6996062cc0c0c1e21b753600ddb", "6ed00e391d832a44c5564c16ffb35a4e871bcb5fd083d9115f73dc833ab3437d", "eda26d3042f9d6069859699bfe9133144362fa424713be2bce5b014b139dfa74", "7996e57133cafa3fd549b0d86c5a4376cdc1822b59ca3bfd2e426262ddecd4fd"],
];
const events = [];
const tracked = await loadContactModule("components/tracked-link.js", { "@vercel/analytics": { track: (...args) => events.push(args) } });
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": tracked };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", { "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema });
const deps = { "@/components/page-hero": hero, "@/components/contact-cta": cta, "@/components/breadcrumbs": breadcrumbs, "@/content/service-areas.mjs": areas, "@/content/projects.mjs": projects, "@/content/site-content.mjs": registry, "@/libs/seo-data.mjs": seo };
const district = await loadContactModule("components/district-page.js", deps);
const borgerhoutRoute = await loadContactModule("app/loodgieter-borgerhout/page.js", { ...deps, "@/components/district-page": district });
const region = await loadContactModule("app/werkgebied/[regio]/page.js", deps);
const sitemap = await loadContactModule("app/sitemap.js", deps);
const paramsFor = slug => ({ params: Promise.resolve({ regio: slug }) });
const htmlFor = async slug => renderToStaticMarkup(await region.default(paramsFor(slug)));

test("Borgerhout's actual hero makes compact-building advice conditional rather than geographic", () => {
  const html = renderToStaticMarkup(borgerhoutRoute.default());
  assert.equal(areas.getDistrict("borgerhout").intro, intro);
  assert.equal(projects.deriveAreaEvidence(areas.getDistrict("borgerhout")).intro, intro);
  assert.ok(html.includes(`<p class="hero-intro">${intro}</p>`));
  assert.equal(html.split(intro).length - 1, 1);
  assert.ok(!html.includes(oldIntro));
});

test("Borgerhout retains the complete record and rendered safety/intake/contact output outside its intro", () => {
  const { intro: removed, ...retained } = areas.getDistrict("borgerhout");
  void removed;
  assert.equal(hash(retained), "fd72b9abbc129a1e27d0f1fe640c0d904db95ab2c336b114be4b797926ec9d01");
  const html = renderToStaticMarkup(borgerhoutRoute.default());
  assert.equal(hash(html.replace(`<p class="hero-intro">${intro}</p>`, '<p class="hero-intro">__INTRO__</p>')), "3344fba6753ff465de4fe6626113fcb5abe4ba9577f6d528a4aaac37ad8fd546");
  assert.ok(html.includes("zonder kasten of toestelpanelen te openen"));
  assert.ok(html.includes("Meld dit vooraf en controleer wie toegang kan verlenen."));
  assert.equal(hash(borgerhoutRoute.metadata), "d313ef675bf28ae3e15502515e78a74563b04c3c2bef27ee5a6096768c296a21");
  assert.equal(hash(registry.getPageDefinition("/loodgieter-borgerhout")), "d37f12f7cdb11ff8dcc7114fb8011d64eb29994d5ae1aad5a5310789393e4fda");
  assert.deepEqual(events, []);
});

test("Brussels links the unchanged actual EPB planning signal directly to the existing maintenance tool", async () => {
  for (const [slug] of fixtures) {
    const html = await htmlFor(slug);
    const paragraph = html.match(/<div class="prose-block">[\s\S]*?<\/h2><p>([\s\S]*?)<\/p>/)?.[1];
    assert.ok(paragraph, `${slug}: actual planning paragraph`);
    assert.equal(html.split('href="/tools/onderhoudscheck"').length - 1, slug === "brussel" ? 2 : 1);
    if (slug === "brussel") {
      assert.equal(paragraph, details + inline);
      assert.equal(html.split(inline).length - 1, 1);
    } else assert.ok(!html.includes(inline), slug);
  }
});

test("the new Brussels contextual link opts into a persistent underline rather than inheriting plain body styling", async () => {
  const html = await htmlFor("brussel");
  const anchor = html.match(/<a\b(?=[^>]*href="\/tools\/onderhoudscheck")[^>]*>regionale onderhoudscheck<\/a>/)?.[0];
  assert.ok(anchor, "actual contextual anchor, not the service-card link");
  assert.match(anchor, /class="underline"/);
});

test("the Brussels follow-up preserves every other complete hub record and real rendered region output", async () => {
  for (const [slug, recordHash, renderedHash] of fixtures) {
    let record = areas.getServiceRegionHub(slug);
    let html = await htmlFor(slug);
    if (slug === "brussel") {
      const { modifiedAt, ...retained } = record;
      void modifiedAt;
      record = retained;
      html = html.replace(inline, "");
    }
    assert.equal(hash(record), recordHash, `${slug}: full retained record`);
    assert.equal(hash(html), renderedHash, `${slug}: full retained route`);
  }
});

test("all region metadata and registry fields remain unchanged outside the actual Brussels modification date", async () => {
  for (const [slug, , , metadataHash, definitionHash] of fixtures) {
    const metadata = await region.generateMetadata(paramsFor(slug));
    let definition = registry.getPageDefinition(`/werkgebied/${slug}`);
    if (slug === "brussel") { const { lastModified, ...rest } = definition; void lastModified; definition = rest; }
    assert.equal(hash(metadata), metadataHash, slug);
    assert.equal(hash(definition), definitionHash, slug);
    assert.equal(metadata.openGraph.type, "website");
    assert.equal(Object.hasOwn(metadata.openGraph, "modifiedTime"), false);
    assert.equal(Object.hasOwn(metadata, "authors"), false);
    assert.equal(metadata.alternates.canonical, `https://www.abservice24.be/werkgebied/${slug}`);
  }
});

test("only genuinely edited hubs carry dates, without refreshing source checks or the directory", () => {
  assert.equal(areas.getServiceRegionHub("brussel").modifiedAt, "2026-10-11");
  assert.deepEqual(Object.fromEntries(areas.serviceRegionHubs.filter(hub => Object.hasOwn(hub, "modifiedAt")).map(hub => [hub.slug, hub.modifiedAt])), { limburg: "2026-10-11", brussel: "2026-10-11" });
  assert.equal(registry.getPageDefinition("/werkgebied/brussel").lastModified, "2026-10-11");
  assert.equal(sitemap.default().find(entry => entry.url === "https://www.abservice24.be/werkgebied/brussel").lastModified, "2026-10-11");
  assert.equal(Object.hasOwn(registry.getPageDefinition("/werkgebied"), "lastModified"), false);
});

test("Brussels retains its plain-text municipalities, service contacts and publication/evidence boundaries", async () => {
  const html = await htmlFor("brussel");
  const list = html.match(/<ul class="area-name-grid area-name-grid-large">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(list);
  assert.equal([...list.matchAll(/<li>/g)].length, 19);
  assert.doesNotMatch(list, /<a\b/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  for (const href of ["/onderhoud", "/herstelling", "/keuring", "/installaties/sanitair", "/installaties/gasketels", "/diensten/lekdetectie", "/diensten/ontstopping", "/contact#aanvraagformulier", "tel:+32484906966"]) assert.ok(html.includes(`href="${href}"`), href);
  assert.equal(registry.pageRegistry.length, 82);
  assert.equal(sitemap.default().length, 80);
  assert.equal(areas.serviceAreas.length, 304);
  assert.equal(areas.indexableDistricts.length, 8);
  assert.ok(areas.serviceAreas.every(area => !area.indexable && area.priorityScore === null));
  assert.deepEqual(projects.getPublishedProjectsForHub("Brussels Hoofdstedelijk Gewest", projects.projects), []);
  assert.doesNotMatch(html, /reviewRating|datePublished|dateModified|Echte projecten|Uitgevoerde werkzaamheden in deze regio|hreflang|\/fr\//);
  assert.deepEqual(events, []);
});
