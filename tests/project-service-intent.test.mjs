import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as projects from "../content/projects.mjs";
import * as intents from "../content/service-intents.mjs";
import * as areas from "../content/service-areas.mjs";
import * as business from "../content/business.mjs";
import * as media from "../content/media.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as schema from "../libs/schema-data.mjs";
import { CONTACT_SERVICES } from "../libs/contact-validation.mjs";
import { readContactContext } from "../libs/contact-context.mjs";

// Actual async routes and renderers, Next links/notFound, data and helpers.
// Only framework image optimization and analytics transport are adapted.
const events = [];
const tracking = { track: (...args) => events.push(args) };
const tracked = await loadContactModule("components/tracked-link.js", { "@vercel/analytics": tracking });
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": tracked };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const image = await loadContactModule("components/content-image.js", {
  "next/image": ({ priority, ...props }) => React.createElement("img", props),
});
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema,
});
const dependencies = {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/content-image": image, "@/components/breadcrumbs": breadcrumbs,
  "@/content/projects.mjs": projects, "@/content/service-intents.mjs": intents,
  "@/content/service-areas.mjs": areas, "@/content/site-content.mjs": registry,
  "@/libs/seo-data.mjs": seo,
};
const route = await loadContactModule("app/projecten/[slug]/page.js", dependencies);
const form = await loadContactModule("components/sections/contact-form.js", { "@vercel/analytics": tracking });
const contact = await loadContactModule("app/contact/page.js", {
  ...dependencies, ...shared, "@/components/sections/contact-form": form,
  "@/content/media.mjs": media,
});

// Hand-derived URLs/categories, independent of serviceIntents and the builder.
const expected = [
  ["cv-ketel-storing-gediagnosticeerd", "Herstelling verwarming", "/contact?dienst=Herstelling+verwarming#aanvraagformulier"],
  ["gasketel-vervangen", "Installatie gasketel", "/contact?dienst=Installatie+gasketel#aanvraagformulier"],
  ["waterlek-leiding-herstellen", "Lekdetectie", "/contact?dienst=Lekdetectie#aanvraagformulier"],
  ["sanitair-vernieuwd", "Sanitair of loodgieterswerk", "/contact?dienst=Sanitair+of+loodgieterswerk#aanvraagformulier"],
  ["afvoer-ontstopt", "Ontstopping", "/contact?dienst=Ontstopping#aanvraagformulier"],
  ["badkamer-leidingwerk", "Badkamerrenovatie", "/contact?dienst=Badkamerrenovatie#aanvraagformulier"],
];
const decode = (html) => html.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, (entity) => {
  const named = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" };
  return named[entity] ?? String.fromCodePoint(Number(entity.startsWith("&#x") ? `0x${entity.slice(3, -1)}` : entity.slice(2, -1)));
});
const visible = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const linksOf = (html) => Array.from(html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g), ([, href, label]) => ({ href: decode(href), label: visible(label) }));
const render = async (slug, module = route) => renderToStaticMarkup(await module.default({ params: Promise.resolve({ slug }) }));
const enquiryLinks = (html) => {
  const links = linksOf(html);
  return ["Bespreek uw aanvraag", "Naar het contactformulier"].map((label) => {
    const matches = links.filter((link) => link.label === label);
    assert.equal(matches.length, 1, label);
    return matches[0];
  });
};

// Removing either prop or choosing the descriptive project.service label fails.
for (const [slug, service, href] of expected) {
  test(`${slug}: both native enquiry links retain the allowed service and anchor`, async () => {
    for (const link of enquiryLinks(await render(slug))) {
      assert.equal(link.href, href, link.label);
      const url = new URL(link.href, "https://www.abservice24.be");
      assert.equal(url.pathname, "/contact");
      assert.equal(url.hash, "#aanvraagformulier");
      assert.deepEqual([...url.searchParams], [["dienst", service]]);
      assert.ok(CONTACT_SERVICES.includes(url.searchParams.get("dienst")));
      assert.deepEqual(readContactContext(url), { service });
      const html = renderToStaticMarkup(await contact.default({ searchParams: Promise.resolve(Object.fromEntries(url.searchParams)) }));
      const select = html.match(/<select[^>]*name="service"[^>]*>([\s\S]*?)<\/select>/)?.[1];
      assert.ok(select, "actual contact form service control");
      const selected = [...select.matchAll(/<option[^>]*selected=""[^>]*>([^<]*)<\/option>/g)];
      assert.deepEqual(selected.map(([, value]) => decode(value)), [service]);
      assert.match(html, /id="aanvraagformulier"[^>]*tabindex="-1"/);
      for (const name of ["name", "phone", "email", "address", "city", "postalCode", "brand", "boilerType"]) {
        assert.match(html, new RegExp(`<input[^>]*name="${name}"[^>]*value=""`), name);
      }
      assert.match(html, /<textarea[^>]*name="message"[^>]*><\/textarea>/);
      assert.doesNotMatch(html.match(/<input[^>]*name="consent"[^>]*>/)[0], /checked/);
    }
    assert.deepEqual(events, []);
  });
}

// Catches dropped facts/body sections, image context, useful links or contact copy.
test("all six project pages retain their published content, media and contact channels", async () => {
  for (const [slug] of expected) {
    const project = projects.getProject(slug);
    assert.ok(projects.validateProjectForPublication(project).ok);
    const html = await render(slug);
    const text = visible(html);
    assert.deepEqual([...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(([, value]) => visible(value)), [project.title]);
    for (const phrase of [project.service, project.situation, project.problem, ...project.workPerformed, project.solution, project.outcome]) {
      assert.ok(text.includes(phrase), `${slug}: ${phrase}`);
    }
    const facts = html.match(/<dl class="project-facts">([\s\S]*?)<\/dl>/)?.[1];
    assert.ok(facts, slug);
    assert.deepEqual([...facts.matchAll(/<dt>(.*?)<\/dt>/g)].map(([, value]) => visible(value)), ["Werkgebied", "Periode", "Merk"]);
    assert.deepEqual([...facts.matchAll(/<dd>(.*?)<\/dd>/g)].map(([, value]) => visible(value)), [`${project.city}, provincie ${project.province}`, project.approximateDate, project.brand]);
    assert.deepEqual([...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(([, value]) => visible(value)), [
      "Het gemelde probleem", "Welke werken zijn uitgevoerd?", "Controle bij oplevering", "Wilt u een vergelijkbare opdracht bespreken?",
    ]);
    const photo = project.authenticPhotos[0];
    const renderedImage = html.match(/<img\b[^>]*>/)?.[0];
    assert.ok(renderedImage, slug);
    for (const [name, value] of Object.entries({ src: photo.src, alt: photo.alt, width: photo.width, height: photo.height })) {
      assert.equal(decode(renderedImage.match(new RegExp(`${name}="([^"]*)"`))?.[1] || ""), String(value), `${slug}: image ${name}`);
    }
    const links = linksOf(html);
    for (const href of ["/", "/projecten", project.servicePath, "/werkgebied/antwerpen", "/tarieven", "tel:+32484906966", "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."]) {
      assert.ok(links.some((link) => link.href === href && link.label), `${slug}: ${href}`);
    }
    assert.match(html, /aria-label="Kruimelpad"/);
    const breadcrumb = JSON.parse(html.match(/<script[^>]*id="breadcrumb-schema"[^>]*>(.*?)<\/script>/)[1]);
    assert.deepEqual(breadcrumb.itemListElement.map(({ item }) => item), ["https://www.abservice24.be/", "https://www.abservice24.be/projecten", `https://www.abservice24.be/projecten/${slug}`]);
    assert.match(text, /De case is geanonimiseerd\. Klantnaam, exact adres, exacte datum en herkenbare toestelgegevens zijn bewust niet gepubliceerd\./);
    assert.match(text, /Bel 0484 90 69 66/);
    assert.match(text, /Een afspraak of prijs is pas bevestigd na beoordeling van uw aanvraag\./);
    assert.doesNotMatch(html, /article-schema|datePublished|<time /);
  }
});

// Catches route/SEO drift or bypassing the real publication/notFound boundary.
test("the six static routes retain published metadata and unknown slugs reach notFound", async () => {
  assert.equal(route.dynamicParams, false);
  assert.deepEqual(Array.from(route.generateStaticParams(), ({ slug }) => slug), expected.map(([slug]) => slug));
  for (const [slug] of expected) {
    const project = projects.getProject(slug);
    const metadata = await route.generateMetadata({ params: Promise.resolve({ slug }) });
    assert.equal(metadata.title, `${project.title} | AB Service`);
    assert.equal(metadata.description, `${project.problem} Lees welke werken AB Service uitvoerde en wat bij de oplevercontrole werd vastgesteld.`);
    assert.equal(metadata.alternates.canonical, `https://www.abservice24.be/projecten/${slug}`);
    assert.equal(metadata.robots.index, true);
    assert.equal(registry.getPageDefinition(project.path).status, "published");
  }
  await assert.rejects(route.default({ params: Promise.resolve({ slug: "synthetic-unknown-project" }) }), (error) => error.digest === "NEXT_HTTP_ERROR_FALLBACK;404");
  const unknownMetadata = await route.generateMetadata({ params: Promise.resolve({ slug: "synthetic-unknown-project" }) });
  assert.equal(unknownMetadata.robots.index, false);
  assert.equal(unknownMetadata.robots.follow, false);
});

// Synthetic getProject boundary only: never adds/changes a public case fixture.
// A supported descriptive label must not override an unsupported servicePath.
test("unmapped project paths keep both enquiry actions generic without URL context", async () => {
  for (const servicePath of ["/synthetic-unsupported-service", "constructor", "__proto__"]) {
    const synthetic = { ...projects.getProject("cv-ketel-storing-gediagnosticeerd"), slug: "synthetic-unmapped-project", path: "/projecten/synthetic-unmapped-project", title: "Synthetic route boundary only", servicePath };
    const boundary = await loadContactModule("app/projecten/[slug]/page.js", {
      ...dependencies, "@/content/projects.mjs": { ...projects, getProject: (slug) => slug === synthetic.slug ? synthetic : projects.getProject(slug) },
    });
    for (const link of enquiryLinks(await render(synthetic.slug, boundary))) {
      assert.equal(link.href, "/contact#aanvraagformulier");
      assert.deepEqual(readContactContext(new URL(link.href, "https://www.abservice24.be")), {});
    }
  }
});
