import test from "node:test";
import assert from "node:assert/strict";
import { CONTACT_SERVICES } from "../libs/contact-validation.mjs";
import { adviceGuides, getAdviceGuide } from "../content/advice-guides.mjs";

const visibleText = (guide) => JSON.stringify(guide);

test("advice lookup supplies six distinct routable guides and rejects unknown slugs", () => {
  assert.equal(adviceGuides.length, 6);
  assert.equal(new Set(adviceGuides.map((guide) => guide.path)).size, 6);
  assert.equal(new Set(adviceGuides.map((guide) => guide.title)).size, 6);
  assert.equal(new Set(adviceGuides.map((guide) => guide.description)).size, 6);
  for (const guide of adviceGuides) {
    assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(guide.path, `/advies/${guide.slug}`);
    assert.equal(getAdviceGuide(guide.slug).path, guide.path);
  }
  assert.equal(getAdviceGuide("onbekend"), undefined);
  assert.equal(getAdviceGuide("../../contact"), undefined);
});

test("published guide data can render sections and hand off to an accepted contact service", () => {
  assert.ok(adviceGuides.length > 0);
  const categories = ["Verwarming", "Warm water", "Waterlekken", "Afvoer", "Documenten"];
  for (const guide of adviceGuides) {
    for (const field of ["title", "description", "eyebrow", "intro", "answer", "warning"]) {
      assert.ok(typeof guide[field] === "string" && guide[field].trim(), `${guide.slug}: ${field}`);
    }
    assert.match(guide.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(categories.includes(guide.category));
    assert.ok(CONTACT_SERVICES.includes(guide.contactService));
    assert.ok(guide.sections.length >= 4);
    for (const section of guide.sections) {
      assert.ok(section.title && section.eyebrow);
      assert.ok(section.paragraphs?.length || section.items?.length);
    }
    assert.ok(guide.steps.length >= 3);
    assert.ok(guide.steps.every((step) => step.title && step.text));
  }
});

test("guides cite primary sources and expose useful internal links", () => {
  assert.ok(adviceGuides.length > 0);
  const officialHosts = new Set([
    "www.pidpa.be", "www.dewatergroep.be", "www.bosch-homecomfort.com",
    "www.vaillant.be", "www.atlantic.fr", "www.antigifcentrum.be",
    "www.vlaanderen.be", "leefmilieu.brussels", "be.brussels", "www.fluvius.be", "www.sibelga.be",
  ]);
  for (const guide of adviceGuides) {
    assert.ok(guide.sourceLinks.length > 0, guide.slug);
    for (const source of guide.sourceLinks) {
      assert.ok(source.label);
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(officialHosts.has(url.hostname), source.href);
    }
    assert.ok(guide.relatedLinks.length >= 3, guide.slug);
    assert.ok(guide.relatedLinks.every((link) => link.label && /^\/(?!\/)/.test(link.href)));
    assert.ok(guide.relatedLinks.every((link) => link.href !== guide.path));
  }
});

test("water tool link and attest revisions advance modification independently from source checks", () => {
  for (const guide of adviceGuides) {
    const expected = guide.slug === "onderhoudsattest-cv-ketel" ? "2026-10-11" : "2026-10-10";
    const modified = guide.slug === "watermeter-blijft-draaien" ? "2026-10-11" : expected;
    assert.equal(guide.modifiedAt, modified, `${guide.slug}: content modification`);
    assert.equal(guide.checkedAt, expected, `${guide.slug}: source check`);
  }
});

test("safety guidance preserves discharge, avoids chemical mixtures and limits meter inference", () => {
  const boiler = getAdviceGuide("boiler-veiligheidsgroep-druppelt");
  const drain = getAdviceGuide("afvoer-verstopt-wat-doen");
  const meter = getAdviceGuide("watermeter-blijft-draaien");
  assert.ok(boiler && drain && meter);
  assert.match(visibleText(boiler), /(?:blokkeer|sluit).*?(?:afvoer|uitlaat)/i);
  assert.match(visibleText(boiler), /(?:nooit|niet).*?(?:afdoppen|dichtstoppen|afsluiten)/i);
  assert.match(visibleText(drain), /Meng nooit/i);
  assert.match(visibleText(drain), /(?:chemische|bijtende).*?(?:middelen|ontstopper|product)/i);
  assert.match(visibleText(meter), /(?:stilstaande|stationaire).*?meter.*?(?:sluit|betekent).*?niet/i);
  assert.match(visibleText(meter), /automatisch/i);
});

test("heating advice sends hazards to emergency help before ordinary enquiry preparation", () => {
  for (const slug of ["radiator-blijft-koud", "geen-warm-water"]) {
    const guide = getAdviceGuide(slug);
    assert.ok(guide);
    assert.match(guide.warning, /gasgeur/i);
    assert.match(guide.warning, /112/);
    assert.match(guide.warning, /0800 65 0 65/);
    assert.match(guide.warning, /0800 19 400/);
    assert.match(guide.warning, /(?:verlaat|buiten)/i);
    assert.match(visibleText(guide), /(?:geen|niet).*?(?:behuizing|afscherming)/i);
  }
});

test("document guidance distinguishes regional attestations without claiming AB Service recognition", () => {
  const guide = getAdviceGuide("onderhoudsattest-cv-ketel");
  assert.ok(guide);
  assert.match(visibleText(guide), /Vlaanderen/);
  assert.match(visibleText(guide), /Brussel/);
  assert.match(visibleText(guide), /reinigingsattest/);
  assert.match(visibleText(guide), /EPB-periodieke controle/);
  assert.match(visibleText(guide), /(?:laatste twee|laatste 2) attesten/);
  assert.doesNotMatch(visibleText(guide), /AB Service is (?:een )?erkend/i);
  assert.ok(guide.relatedLinks.some((link) => link.href === "/tools/onderhoudscheck"));
});
