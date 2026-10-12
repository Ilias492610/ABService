import { beforeAvantaRegistry } from "./fixtures/avanta-overview-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as areas from "../content/service-areas.mjs";
import * as projects from "../content/projects.mjs";
import * as business from "../content/business.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";
import { areaDrafts } from "../content/content-backlog.mjs";

// Literal copy from the approved brief. Hashes were captured and reviewed on
// BASE 80a6fa9 before any product edit, never regenerated from corrected data.
// Record hashes omit ONLY localContext/modifiedAt; rendered hashes omit ONLY
// the first context paragraph. They protect all retained intake/FAQ/source/
// nearby/CTA/schema output as well as properties not individually listed here.
const corrections = [
  {
    slug: "berchem", name: "Berchem", heading: "Loodgieter in Berchem voor verwarming en sanitair",
    context: "Vermeld bij een aanvraag in Berchem wat u weet over het leidingverloop en de toegang tot het toestel. Gaat het om een gemeenschappelijke installatie, meld dit dan vooraf.",
    old: "Berchem combineert compacte stadswijken met appartementsgebouwen en residentiële buurten. Daardoor verschillen leidingtracés, gemeenschappelijke installaties en toegang sterk per adres.",
    record: "25f1b10aaaece43b282d9d984ee0ce83e76cb37d17a3d15ea66f4725851ea72b",
    rendered: "a7d8717444052dfff854b4721ca7894ffc21f562cd7e621db7d6d31392bb44da",
    metadata: "bdcad6ae940faebd3fce3174b27306f5473a12df6fdbd14dc9475b4dd56ab08f",
    definition: "859044ded014d9fbc461c3383a09aec036387bcbcea57f942cf92991ad53406a",
  },
  {
    slug: "borgerhout", name: "Borgerhout", heading: "Loodgieter in Borgerhout voor cv-ketel en sanitair",
    context: "De officiële wijkindeling onderscheidt Borgerhout Extra Muros en twee intra-muroszones. Vermeld bij uw aanvraag of de installatie individueel of gemeenschappelijk is, als u dit weet.",
    old: "De officiële wijkindeling onderscheidt Borgerhout Extra Muros en twee intra-muroszones. De technische situatie kan daardoor variëren van individuele woningen tot gestapelde installaties.",
    record: "acfb40c1e8f0e7241bc670afedda99c607f9d2c8aca7c6fddc24172560afff00",
    rendered: "ddca7b0c4733e7aa29d4bde6bb55706c92aeb8ff3df0e03ad6d4e53983665ece",
    metadata: "d313ef675bf28ae3e15502515e78a74563b04c3c2bef27ee5a6096768c296a21",
    definition: "30d524c840e1517dcd147eb10bb896c96dd5e3af9e8a136a1600b15348a58843",
  },
  {
    slug: "deurne", name: "Deurne", heading: "Loodgieter in Deurne voor herstelling en onderhoud",
    context: "Omschrijf bij uw aanvraag het gebouwtype, bijvoorbeeld een appartement, rijwoning of vrijstaande woning, en de bereikbaarheid van de installatie.",
    old: "De omvang en uiteenlopende wijkstructuur maken een gerichte technische intake belangrijk: een appartement, rijwoning of vrijstaande woning vraagt vaak een andere voorbereiding.",
    record: "fa508cb0647c1bb3796c241ecafec394c763bfe704a721739a7cbbf2ef370a82",
    rendered: "f210b610b8e46cc7c962400fa154c16b7f180bb578205db761c0622d0db694ab",
    metadata: "9dd48baa39fd22d077d5c29ef0bd32126711cfa50bb222a2a7eea6405399538e",
    definition: "0d0cf553991d7ce49d59f02e74b77cd778102d3d6321c96419836e764cdad3f2",
  },
  {
    slug: "ekeren", name: "Ekeren", heading: "Loodgieter in Ekeren voor verwarming en sanitair",
    context: "Vermeld bij uw aanvraag de exacte locatie, de toegangssituatie en eventuele toestel- of materiaalgegevens die u al kent.",
    old: "De verschillende woonkernen liggen niet allemaal rond hetzelfde centrum. Een precieze aanvraag voorkomt dat locatie, toegang of het benodigde materiaal pas bij aankomst duidelijk wordt.",
    record: "c37684b21a6953be6ccd6e2faf7d18b3ec65b3a6f5e47754b3f7ab51fe50b2cf",
    rendered: "bbfdcfbd431a86dd991bd61fbb300cff4869915240204eb5018ab90bda33957d",
    metadata: "012ae8d06279b419ae2e7fe658f32f674016aa37d7768c7d26f2e2847ea8180e",
    definition: "48349e0ad12d96ed329d47500ff3cbbf589a5886f6728c152237e14a397dd8fd",
  },
  {
    slug: "wilrijk", name: "Wilrijk", heading: "Loodgieter in Wilrijk voor sanitair en gasketels",
    context: "Vermeld naast uw postcode welke werkzaamheden u aanvraagt en wat u weet over de bestaande aansluiting.",
    old: "De mix van appartementen, rijwoningen en residentiële buurten maakt het onverstandig om op basis van alleen een postcode een vaste werkomvang te beloven.",
    record: "fffaaff8566ca9825b6e0de1cd3be6959ffe916427ad4585fa6bc4241b650421",
    rendered: "750511695b94f9aa60b7fd5e0948546fefdbafa6099a49e77fce830bacdc14df",
    metadata: "2b4607b807a29bb1ac2f4545953ef6acc5eb347e5936ae751b5ef4b4d078c154",
    definition: "c84a68077674956eb0a9f8fe50b1496316e1071c353aecbd3c613edb8149d9fb",
  },
];
const hash = (value) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const decode = (html) => html.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, (entity) => {
  const named = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" };
  return named[entity] ?? String.fromCodePoint(Number(entity.startsWith("&#x") ? `0x${entity.slice(3, -1)}` : entity.slice(2, -1)));
});
const visible = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const linksOf = (html) => Array.from(html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g), ([, href, label]) => ({ href: decode(href), label: visible(label) }));
const contextPattern = /(<div class="prose-block">[\s\S]*?<\/h2><p>)([\s\S]*?)(<\/p>)/;
const originalBorgerhoutIntro = "Borgerhout omvat zowel intra-muroswijken als Extra Muros. In compacte gebouwen is het belangrijk om vooraf te weten waar afsluiters, ketel en gemeenschappelijke leidingen bereikbaar zijn.";

// Complete production modules, real React/Next links and navigation. Only
// analytics transport is adapted, so rendering causes no provider write.
const events = [];
const tracked = await loadContactModule("components/tracked-link.js", { "@vercel/analytics": { track: (...args) => events.push(args) } });
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": tracked };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", { "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema });
const dependencies = {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/breadcrumbs": breadcrumbs, "@/content/service-areas.mjs": areas,
  "@/content/projects.mjs": projects, "@/content/site-content.mjs": registry,
  "@/libs/seo-data.mjs": seo,
};
const districtPage = await loadContactModule("components/district-page.js", dependencies);
const routeDependencies = { ...dependencies, "@/components/district-page": districtPage };
const sitemap = await loadContactModule("app/sitemap.js", dependencies);
const regionRoute = await loadContactModule("app/werkgebied/[regio]/page.js", dependencies);

for (const fixture of corrections) {
  const { slug, name } = fixture;
  const route = await loadContactModule(`app/loodgieter-${slug}/page.js`, routeDependencies);
  // Catch a wrong record, an unreplaced claim or a route displaying stale data.
  test(`${name} removes the unsupported context from the real route and record`, () => {
    const html = renderToStaticMarkup(route.default());
    const match = html.match(contextPattern);
    assert.ok(match, "actual local-context paragraph");
    assert.equal(visible(match[2]), fixture.context);
    assert.ok(!visible(html).includes(fixture.old), "old claim absent from visible output");
    assert.equal(areas.getDistrict(slug).localContext, fixture.context);
    assert.equal(projects.deriveAreaEvidence(areas.getDistrict(slug)).localContext, fixture.context);
  });

  // Catch incidental record or rendered-content loss outside the correction.
  test(`${name} retains every other record property and rendered intake element`, () => {
    const { localContext, modifiedAt, ...retained } = areas.getDistrict(slug);
    // Task43 changes only this hero intro, separately asserted in its real-route
    // tests. Restore the exact original value; never regenerate approved hashes.
    if (slug === "borgerhout") retained.intro = originalBorgerhoutIntro;
    assert.equal(hash(retained), fixture.record);
    const html = renderToStaticMarkup(route.default());
    let preservedHtml = html.replace(contextPattern, "$1__LOCAL_CONTEXT__$3");
    if (slug === "borgerhout") preservedHtml = preservedHtml.replace(`<p class="hero-intro">${areas.getDistrict(slug).intro}</p>`, `<p class="hero-intro">${originalBorgerhoutIntro}</p>`);
    assert.equal(hash(preservedHtml), fixture.rendered);
    assert.deepEqual([...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(([, value]) => visible(value)), [fixture.heading]);
    const links = linksOf(html);
    for (const [label, href] of [
      ["Cv-ketelonderhoud", "/onderhoud"], ["Herstelling van verwarming", "/herstelling"],
      ["Sanitair en loodgieterswerk", "/installaties/sanitair"], ["Gasketelinstallatie", "/installaties/gasketels"],
      ["Hoe prijs en offerte worden bepaald →", "/tarieven"],
      [`Aanvraag uit ${name}`, "/contact#aanvraagformulier"], ["Naar het contactformulier", "/contact#aanvraagformulier"],
      ["Bel 0484 90 69 66", "tel:+32484906966"], ["WhatsApp", "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."],
    ]) assert.ok(links.some((link) => link.href === href && link.label === label), `${label}: ${href}`);
    assert.ok(visible(html).includes(`AB Service bedient ${name}. Een afspraak en timing worden pas bevestigd nadat de locatie, technische vraag en praktische bereikbaarheid zijn beoordeeld.`));
    assert.doesNotMatch(html, /Districtsindeling:|Bron geraadpleegd op|<time\b|Echte projecten|Gecontroleerde projecten|reviewRating|datePublished|dateModified/);
    assert.deepEqual(events, []);
  });

  // Catch changed metadata, status, route ownership or false article dates.
  test(`${name} retains route metadata and registry fields except its actual modification`, () => {
    assert.equal(hash(route.metadata), fixture.metadata);
    const { lastModified, ...retained } = registry.getPageDefinition(`/loodgieter-${slug}`);
    assert.equal(hash(retained), fixture.definition);
    assert.equal(lastModified, "2026-10-11");
    assert.equal(route.metadata.robots.index, true);
    assert.equal(route.metadata.robots.follow, true);
    assert.equal(route.metadata.alternates.canonical, `https://www.abservice24.be/loodgieter-${slug}`);
    assert.equal(route.metadata.openGraph.type, "website");
    assert.equal(Object.hasOwn(route.metadata.openGraph, "modifiedTime"), false);
    assert.equal(Object.hasOwn(route.metadata.openGraph, "publishedTime"), false);
    assert.equal(Object.hasOwn(route.metadata, "authors"), false);
  });
}

// Catch accidental edits to the accepted Borsbeek record or any other district.
test("the other five complete district records are unchanged from accepted Task30", () => {
  for (const [slug, expected] of [
    ["antwerpen", "d57b618792bd596d8b0e8141369c0b6351aed520f4de3f2f819ff18bb58cdbe4"],
    ["berendrecht-zandvliet-lillo", "8b4b0954cdd30199aa0b5bdd677af0019e805b1d24807c7965cdc745b2072676"],
    ["borsbeek", "d8ac547b73d7ce8815ff35eed52fd79875dae45129a3e90615c927e6051b8b7f"],
    ["hoboken", "389ced3f3a55fd63595f2244339568111013e0f7ab373a99f473089e211b3932"],
    ["merksem", "6f36aa07eabd0a17436d78cb90ba168135d1ee57d25f59168762a7e30847ca0c"],
  ]) assert.equal(hash(areas.getDistrict(slug)), expected, slug);
});

// Catch a global current-date assignment, missing dates or provenance leakage.
test("only the six genuinely modified districts have dates and only Borsbeek has contextual provenance", () => {
  const expected = {
    berchem: "2026-10-11", borgerhout: "2026-10-11", borsbeek: "2026-10-11",
    deurne: "2026-10-11", ekeren: "2026-10-11", wilrijk: "2026-10-11",
  };
  assert.deepEqual(Object.fromEntries(areas.antwerpDistricts.filter((area) => Object.hasOwn(area, "modifiedAt")).map((area) => [area.slug, area.modifiedAt])), expected);
  for (const area of areas.antwerpDistricts) {
    const derived = projects.deriveAreaEvidence(area);
    assert.equal(derived.modifiedAt, expected[area.slug], area.slug);
    assert.equal(Object.hasOwn(area, "contextSource"), area.slug === "borsbeek", area.slug);
    assert.equal(Object.hasOwn(derived, "contextSource"), area.slug === "borsbeek", area.slug);
    assert.deepEqual(area.localSource, {
      label: "Stad Antwerpen: officiële wijkgegevens en clusterindeling 2026",
      href: "https://www.antwerpen.be/assets-proxy/b6b7cf63-3c94-4413-9374-4a36f88fd401",
      verifiedStatus: 200, verifiedAt: "2026-09-16",
    });
  }
  for (const slug of ["antwerpen", "berendrecht-zandvliet-lillo", "hoboken", "merksem"]) {
    assert.equal(Object.hasOwn(areas.getDistrict(slug), "modifiedAt"), false, slug);
    assert.equal(Object.hasOwn(registry.getPageDefinition(areas.getDistrict(slug).canonicalPath), "lastModified"), false, slug);
  }
  const entries = sitemap.default();
  assert.equal(entries.length, 80);
  assert.equal(registry.pageRegistry.length, 82);
  assert.deepEqual(Object.fromEntries(entries.filter((entry) => entry.url.includes("/loodgieter-") && Object.hasOwn(entry, "lastModified")).map((entry) => [entry.url.split("/loodgieter-")[1], entry.lastModified])), expected);
  const retained = entries.map((entry) => {
    if (entry.url === "https://www.abservice24.be/foutcodes/remeha") return { ...entry, lastModified: beforeAvantaRegistry({ path: "/foutcodes/remeha", lastModified: entry.lastModified }).lastModified };
    // Tasks40/41/44/49/50/52/54/56/58/59/60 permit only these genuinely edited pages' new dates.
    // Preserve the original independently captured whole-sitemap hash.
    const correctedPage = ["https://www.abservice24.be/werkgebied/limburg", "https://www.abservice24.be/tarieven", "https://www.abservice24.be/werkgebied/brussel", "https://www.abservice24.be/foutcodes/bosch", "https://www.abservice24.be/foutcodes/junkers", "https://www.abservice24.be/foutcodes/acv", "https://www.abservice24.be/foutcodes/intergas", "https://www.abservice24.be/foutcodes/nefit-bosch", "https://www.abservice24.be/foutcodes/ferroli", "https://www.abservice24.be/foutcodes/itho-daalderop", "https://www.abservice24.be/foutcodes/atag", "https://www.abservice24.be/foutcodes/viessmann"].includes(entry.url);
    if (!correctedPage && !corrections.some(({ slug }) => entry.url.endsWith(`/loodgieter-${slug}`))) return entry;
    const { lastModified, ...rest } = entry;
    return rest;
  });
  assert.equal(hash(retained), "be9c9ee6859ef97ddae1c836ede15524ca332b6524dcb34b38b0dd4923498361");
});

// Catch status changes, new locality pages, invented local evidence or scores.
test("coverage and publication boundaries stay unchanged after the accuracy correction", async () => {
  assert.equal(areas.antwerpDistricts.length, 10);
  assert.equal(areas.indexableDistricts.length, 8);
  assert.equal(areas.serviceAreas.length, 304);
  assert.equal(areaDrafts.length, 302);
  assert.equal(areas.serviceRegionHubs.length, 6);
  assert.equal(areas.getDistrictPublicHref(areas.getDistrict("antwerpen")), "/");
  const withheld = areas.getDistrict("berendrecht-zandvliet-lillo");
  assert.equal(areas.getDistrictPublicHref(withheld), null);
  assert.equal(registry.getPageDefinition(withheld.canonicalPath).status, "noindex");
  const withheldRoute = await loadContactModule("app/loodgieter-berendrecht-zandvliet-lillo/page.js", routeDependencies);
  assert.equal(withheldRoute.metadata.robots.index, false);
  assert.equal(withheldRoute.metadata.robots.follow, true);
  const ekeren = renderToStaticMarkup(districtPage.default({ slug: "ekeren" }));
  assert.match(ekeren, /<span>Berendrecht-Zandvliet-Lillo<\/span>/);
  assert.ok(!linksOf(ekeren).some(({ href }) => href === withheld.canonicalPath));
  for (const area of areas.antwerpDistricts) {
    const derived = projects.deriveAreaEvidence(area);
    assert.equal(derived.hasProjectEvidence, false);
    assert.equal(derived.hasLocalReview, false);
    assert.equal(derived.projectCount, 0);
    assert.deepEqual(derived.matchingProjects, []);
  }
  assert.ok(areas.serviceAreas.every((area) => area.served && !area.indexable && area.priorityScore === null));
  const entries = sitemap.default();
  const hrefs = areas.buildCoverageDirectoryGroups().flatMap(({ areas: group }) => group.map(({ href }) => href));
  assert.ok(!entries.some(({ url }) => url.endsWith(withheld.canonicalPath)));
  for (const draft of areaDrafts) {
    assert.equal(draft.status, "draft");
    assert.equal(registry.getPageDefinition(`/loodgieter-${draft.slug}`), undefined);
    assert.ok(!entries.some(({ url }) => url.endsWith(`/loodgieter-${draft.slug}`)));
    assert.ok(!hrefs.includes(`/loodgieter-${draft.slug}`));
    await assert.rejects(access(new URL(`../app/loodgieter-${draft.slug}/page.js`, import.meta.url)), { code: "ENOENT" });
  }
  assert.equal(areas.getDistrict("synthetic-unknown-district"), undefined);
  assert.equal(registry.getPageDefinition("/loodgieter-synthetic-unknown-district"), undefined);
  await assert.rejects(access(new URL("../app/loodgieter-synthetic-unknown-district/page.js", import.meta.url)), { code: "ENOENT" });
  await assert.rejects(regionRoute.default({ params: Promise.resolve({ regio: "synthetic-unknown-region" }) }), (error) => error.digest === "NEXT_HTTP_ERROR_FALLBACK;404");
});
