import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as areas from "../content/service-areas.mjs";
import * as projects from "../content/projects.mjs";
import * as business from "../content/business.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";

const tip = "Vermeld uw exacte adres, probleemomschrijving, eventuele toestelgegevens en wie toegang kan geven. Voeg alleen foto’s toe die u veilig kunt nemen zonder panelen te openen. Werkzaamheden en verplaatsing worden besproken voordat de afspraak wordt bevestigd.";
const old = "Stuur merk, model, probleemomschrijving en foto’s meteen mee. Dat is bij een langere verplaatsing extra belangrijk om onvolledige afspraken te vermijden.";
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
// Literal preservation fixtures captured on ae417d3 before product edits.
// Only Limburg planningTip/modifiedAt and its two rendered tip occurrences
// are excluded; no retained fixture is regenerated from changed production.
const fixtures = [
  ["antwerpen", "863bdbe7126c4c482e05a178fa44de3ad277f812276207bf294cfe9ddb84f411", "fbe0e01f0f1577f82b313592a7b97789e23abc88b61f667e5f9433a793f4fe3e", "419da00b694ee8fc2ccf6770c6cbe8cc0ae598db07e6ffd1c5aa81bf4e612291", "6dffcb2f7eb5f3342efd04677c3df8771f2330b92e112f631e39006044be573d"],
  ["limburg", "c397e4bf3140a92fd3ee92c9c2ff5acda99590848d804d6208fee0ca3887908e", "748f056a6b7a58d2897b57a0404534dbb00363e16b128cea5f3c93d77b182872", "8d4e28da8b26b1cbe7c660227b4babfb0b49d68ec4b5615cb2dfd218fd7d58da", "d3462f364a27ef1b10eebcc1f26ef14b24bd7935b3d6d3ede3168df4872fa733"],
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
const dependencies = {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/breadcrumbs": breadcrumbs, "@/content/service-areas.mjs": areas,
  "@/content/projects.mjs": projects, "@/content/site-content.mjs": registry,
  "@/libs/seo-data.mjs": seo,
};
const route = await loadContactModule("app/werkgebied/[regio]/page.js", dependencies);
const sitemap = await loadContactModule("app/sitemap.js", dependencies);
const paramsFor = regio => ({ params: Promise.resolve({ regio }) });
const htmlFor = async regio => renderToStaticMarkup(await route.default(paramsFor(regio)));

// A stale/shared tip, removed safe-photo limit or missing native FAQ fails.
test("Limburg renders safe concrete preparation in the answer box and native FAQ without a travel guarantee", async () => {
  const html = await htmlFor("limburg");
  assert.equal(areas.getServiceRegionHub("limburg").planningTip, tip);
  assert.ok(html.includes(`<p class="answer-box">${tip}</p>`));
  assert.ok(html.includes(`<details><summary>Welke gegevens helpen bij de planning?</summary><p>${tip}</p></details>`));
  assert.equal(html.split(tip).length - 1, 2);
  assert.ok(!html.includes(old));
  assert.deepEqual(events, []);
});

test("the planning correction retains all other hub records and real rendered content", async () => {
  for (const [slug, recordHash, renderedHash] of fixtures) {
    const hub = areas.getServiceRegionHub(slug);
    let record = hub;
    let html = await htmlFor(slug);
    if (slug === "limburg") {
      const { planningTip, modifiedAt, ...retained } = hub;
      void planningTip; void modifiedAt;
      record = retained;
      // Both allowed occurrences are normalized, not arbitrary page sections.
      html = html.split(tip).join("__PLANNING_TIP__");
    }
    assert.equal(hash(record), recordHash, `${slug}: retained record`);
    assert.equal(hash(html), renderedHash, `${slug}: retained rendered route`);
  }
});

// Missing transfer to the sitemap or globally refreshed dates fails here.
test("only the genuinely changed regional hub transfers its actual date to sitemap output", () => {
  assert.deepEqual(Object.fromEntries(areas.serviceRegionHubs.filter(hub => Object.hasOwn(hub, "modifiedAt")).map(hub => [hub.slug, hub.modifiedAt])), { limburg: "2026-10-11" });
  const definitions = registry.pageRegistry.filter(page => page.path.startsWith("/werkgebied/"));
  assert.deepEqual(Object.fromEntries(definitions.filter(page => Object.hasOwn(page, "lastModified")).map(page => [page.path, page.lastModified])), { "/werkgebied/limburg": "2026-10-11" });
  assert.deepEqual(Object.fromEntries(sitemap.default().filter(entry => entry.url.includes("/werkgebied/") && Object.hasOwn(entry, "lastModified")).map(entry => [entry.url, entry.lastModified])), { "https://www.abservice24.be/werkgebied/limburg": "2026-10-11" });
  assert.equal(Object.hasOwn(registry.getPageDefinition("/werkgebied"), "lastModified"), false);
});

test("all hub metadata and registry fields remain unchanged outside the allowed Limburg date", async () => {
  for (const [slug, , , metadataHash, definitionHash] of fixtures) {
    const metadata = await route.generateMetadata(paramsFor(slug));
    assert.equal(hash(metadata), metadataHash, `${slug}: full metadata`);
    let definition = registry.getPageDefinition(`/werkgebied/${slug}`);
    if (slug === "limburg") {
      const { lastModified, ...retained } = definition;
      void lastModified;
      definition = retained;
    }
    assert.equal(hash(definition), definitionHash, `${slug}: retained definition`);
    assert.equal(metadata.openGraph.type, "website");
    assert.equal(Object.hasOwn(metadata.openGraph, "modifiedTime"), false);
    assert.equal(Object.hasOwn(metadata, "authors"), false);
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.alternates.canonical, `https://www.abservice24.be/werkgebied/${slug}`);
  }
});

test("Limburg retains its 38 unlinked municipalities and useful service, tool and contact destinations", async () => {
  const html = await htmlFor("limburg");
  const list = html.match(/<ul class="area-name-grid area-name-grid-large">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(list);
  assert.equal([...list.matchAll(/<li>/g)].length, 38);
  assert.doesNotMatch(list, /<a\b/);
  for (const name of ["Hasselt", "Genk", "Tongeren-Borgloon"]) assert.ok(list.includes(`<span>${name}</span>`));
  for (const href of ["/onderhoud", "/herstelling", "/keuring", "/installaties/sanitair", "/installaties/gasketels", "/diensten/lekdetectie", "/diensten/ontstopping", "/tools/onderhoudscheck", "/contact#aanvraagformulier", "tel:+32484906966"]) assert.ok(html.includes(`href="${href}"`), href);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /Loodgieter en verwarmingsservice in Limburg<\/h1>/);
  assert.doesNotMatch(html, /reviewRating|datePublished|dateModified|Echte projecten|Uitgevoerde werkzaamheden in deze regio/);
});
