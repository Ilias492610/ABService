import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as sources from "../content/core-sources.mjs";
import * as media from "../content/media.mjs";
import * as business from "../content/business.mjs";
import * as intents from "../content/service-intents.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";
import { getCitedSources } from "../libs/cited-sources.mjs";
import { auditExternalSources } from "../libs/external-source-audit.mjs";
import { beforeSanitaryReferralRegistry, beforeSanitaryReferralSitemapEntry, beforeSanitaryReferralSource } from "./fixtures/sanitary-referral-history.mjs";

const f = JSON.parse(await readFile(new URL("./fixtures/sanitary-referral-facts.json", import.meta.url), "utf8"));
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const trackedLink = ({ eventName, eventProperties, children, ...props }) => React.createElement("a", props, children);
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": trackedLink };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const image = await loadContactModule("components/content-image.js", { "next/image": ({ priority, sizes, ...props }) => React.createElement("img", props) });
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", { "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema });
const renderer = await loadContactModule("components/service-page.js", {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/content-image": image, "@/components/breadcrumbs": breadcrumbs,
  "@/content/service-intents.mjs": intents,
});
const route = await loadContactModule("app/installaties/sanitair/page.js", {
  "@/components/service-page": renderer, "@/content/core-sources.mjs": sources,
  "@/content/media.mjs": media, "@/libs/seo-data.mjs": seo, "@/content/site-content.mjs": registry,
});
const render = () => renderToStaticMarkup(route.default());
const visible = html => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const section = html => {
  const result = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map(([value]) => value).find(value => value.includes("Geur bij sanitair: wat doorgeven en wie contacteren?"));
  assert.ok(result, "One visible sanitary geur intake/referral section is required");
  return result;
};
const urls = ["https://aquafin.be/nl/veelgestelde-vragen-infrastructuur-aquafin", "https://www.aquaflanders.be/mijn-drinkwaterbedrijf-en-rioolbeheerder"];

// Catches an additive source adapter hiding any old leaf or a changed new claim/citation.
test("exact approved source inverse recovers frozen bytes while old title new paragraph URL label import and extra drift survive", async () => {
  for (const [path, digest, mutations] of [
    ["app/installaties/sanitair/page.js", "e7317f9abb4ce1612693c77b67dd44c2b7ef0ca7fd538453a1d526e09df2dcad", [
      source => source.replace('title="Sanitaire installatie en loodgieterswerk in Antwerpen"', 'title="DRIFT"'),
      source => source.replace("Aquafin behandelt geurklachten", "DRIFT behandelt geurklachten"),
      source => source.replace('import { coreSources }', 'import { wrongSources }'),
      source => source + "\nexport const unknown = true;\n",
    ]],
    ["content/core-sources.mjs", "75ade10847125cdd924b017ee512a963a3d5010c436df5a029007f9e94b15df3", [
      source => source.replace(urls[0], "https://wrong.invalid/"),
      source => source.replace("AquaFlanders: uw rioolbeheerder", "DRIFT: uw rioolbeheerder"),
      source => source.replace('  sanitaryOdourAquafin: {', '  sanitaryOdourAquafin: {\n    unknown: true,'),
      source => source.replace("waterLeakFlanders:", "wrongOldSource:"),
      source => source + "\nexport const unknown = true;\n",
    ]],
  ]) {
    const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
    assert.equal(beforeSanitaryReferralSource(source, path), f.before.sources[path]);
    assert.equal(hash(beforeSanitaryReferralSource(source, path)), digest);
    assert.equal(beforeSanitaryReferralSource(f.before.sources[path], path), f.before.sources[path]);
    assert.equal(beforeSanitaryReferralSource(source, "wrong/path.js"), source);
    for (const mutate of mutations) {
      const drift = mutate(source);
      assert.notEqual(drift, source, "mutation must actually change a protected source leaf");
      assert.notEqual(hash(beforeSanitaryReferralSource(drift, path)), digest);
    }
  }
});

// Catches replacing observation/unknown intake with a blockage diagnosis or DIY investigation.
test("real sanitary route accepts already-known observations and unknown context without diagnosing a blockage", () => {
  const text = visible(section(render()));
  assert.match(text, /alleen[^.]*al weet/i);
  assert.match(text, /waar[^.]*wanneer[^.]*toestel/i);
  assert.match(text, /afvoer[^.]*normaal[^.]*traag/i);
  assert.match(text, /recente werken/i);
  assert.match(text, /onbekend[^.]*niet gokken/i);
  assert.match(text, /geur[^.]*geen[^.]*verstopping/i);
  assert.match(text, /AB Service[^.]*beoordelen[^.]*sanitaire/i);
  assert.match(text, /direct gevaar[^.]*bevoegde noodhulp[^.]*wacht[^.]*niet[^.]*online formulier/i);
  assert.doesNotMatch(text, /giet|spoel|chemische|demonteer|open[^.]*put|droge sifon|gasdiagnose/i);
});

// Catches indoor location being treated as proof or Aquafin being universal operator.
test("real route attributes smell context and conditions public referral on the actual regional operator", () => {
  const html = section(render()), text = visible(html);
  assert.match(text, /Aquafin[^.]*binnenshuis[^.]*buitenshuis[^.]*afzonderlijk/i);
  assert.match(text, /waar[^.]*geur[^.]*geen oorzaak of verantwoordelijke/i);
  assert.match(text, /openbare riolering[^.]*Vlaanderen[^.]*AquaFlanders[^.]*rioolbeheerder/i);
  assert.match(text, /Aquafin[^.]*alleen[^.]*bevestigde beheerder/i);
  assert.match(text, /Vlaamse[^.]*Brussel/i);
  assert.match(text, /geen[^.]*werk[^.]*openbare riool/i);
  for (const href of urls) assert.ok(html.includes(`href="${href}"`), "useful operator/source link in intake section");
});

// Catches citation omission and repeated requests by the real central collector/audit.
test("both scoped visible sources reach central monitoring and duplicate URLs are audited once", async () => {
  const html = render();
  const official = html.slice(html.indexOf("<h2>Officiële informatie</h2>"), html.indexOf('class="contact-cta"'));
  assert.deepEqual([...official.matchAll(/href="([^"]+)"/g)].map(([, href]) => href), urls);
  const cited = getCitedSources().filter(({ href }) => urls.includes(href));
  assert.deepEqual(cited.map(({ href }) => href), urls);
  const requested = [];
  const results = await auditExternalSources([...cited, ...cited], async href => { requested.push(href); return { status: 200 }; });
  assert.deepEqual(requested, urls);
  assert.deepEqual(results.map(({ href, status, ok }) => ({ href, status, ok })), urls.map(href => ({ href, status: 200, ok: true })));
  const { sanitaryOdourAquafin, sewerOperatorFlanders, ...oldSources } = sources.coreSources;
  assert.deepEqual(oldSources, f.before.coreSources);
});

// Exact full real SSR capture catches loss of all old content, breadcrumbs, media, CTA and link leaves.
test("removing only the additive referral and its source list restores complete frozen sanitary SSR and metadata", () => {
  const html = render();
  const added = section(html);
  const restored = html.replace(added, "").replace(/<div><h2>Officiële informatie<\/h2><ul class="link-list">[\s\S]*?<\/ul><\/div>/, "");
  assert.equal(restored, f.before.sanitaryHtml);
  assert.equal(hash(restored), "dab2f1a977e77a167eb8af1d5384337621124f9b08df0be9febc444480e4efd6");
  assert.deepEqual(route.metadata, f.before.sanitaryMetadata);
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.doesNotMatch(html, /editorial-note|datePublished|article-schema|FAQPage/);
});

// Catches marking unrelated pages reviewed/modified and exact inverse hiding a second leaf.
test("only sanitary gets an actual modification date and exact inverse preserves every other registry and sitemap leaf", () => {
  assert.equal(registry.getPageDefinition("/installaties/sanitair").lastModified, "2026-10-14");
  assert.deepEqual(registry.pageRegistry.map(beforeSanitaryReferralRegistry), f.before.registry);
  const sitemap = seo.buildSitemapEntries(registry.pageRegistry);
  assert.equal(sitemap.find(entry => entry.url === "https://www.abservice24.be/installaties/sanitair").lastModified, "2026-10-14");
  assert.deepEqual(sitemap.map(beforeSanitaryReferralSitemapEntry), f.before.sitemap);
  for (const mutate of [
    pages => pages.find(page => page.path === "/installaties/sanitair").title = "DRIFT",
    pages => pages.find(page => page.path === "/installaties/sanitair").lastModified = "2026-10-15",
    pages => pages.find(page => page.path === "/installaties/sanitair").path = "/wrong",
    pages => pages.find(page => page.path === "/installaties/sanitair").unknown = true,
    pages => pages.find(page => page.path === "/installaties").lastModified = "2026-10-14",
    pages => pages.push({ ...pages.find(page => page.path === "/installaties/sanitair") }),
  ]) {
    const pages = structuredClone(registry.pageRegistry);
    mutate(pages);
    assert.notDeepEqual(pages.map(beforeSanitaryReferralRegistry), f.before.registry, "full history must expose extra, duplicate, identity or date drift");
  }
  for (const mutate of [
    entries => entries.find(entry => entry.url.endsWith("/installaties/sanitair")).lastModified = "2026-10-15",
    entries => entries.find(entry => entry.url.endsWith("/installaties/sanitair")).url = "https://wrong.invalid/",
    entries => entries.find(entry => entry.url.endsWith("/installaties/sanitair")).unknown = true,
    entries => entries.find(entry => entry.url.endsWith("/installaties")).lastModified = "2026-10-14",
    entries => entries.push({ ...entries.find(entry => entry.url.endsWith("/installaties/sanitair")) }),
  ]) {
    const entries = structuredClone(sitemap);
    mutate(entries);
    assert.notDeepEqual(entries.map(beforeSanitaryReferralSitemapEntry), f.before.sitemap);
  }
  for (const [before, inverse, key, identity] of [
    [f.before.sanitaryRecord, beforeSanitaryReferralRegistry, "path", "/installaties/sanitair"],
    [f.before.sitemap.find(entry => entry.url.endsWith("/installaties/sanitair")), beforeSanitaryReferralSitemapEntry, "url", "https://www.abservice24.be/installaties/sanitair"],
  ]) {
    const current = { ...before, lastModified: "2026-10-14" };
    assert.deepEqual(inverse(current), before);
    assert.equal(inverse(before), before);
    for (const [leaf, value] of [["lastModified", "2026-10-15"], [key, identity + "-wrong"], ["priority", 0], ["description", "DRIFT"], ["unknown", true]]) {
      const changed = { ...current, [leaf]: value };
      assert.notDeepEqual(inverse(changed), before);
      assert.deepEqual(inverse(changed), ["lastModified", key].includes(leaf) ? changed : { ...before, [leaf]: value });
    }
  }
});
