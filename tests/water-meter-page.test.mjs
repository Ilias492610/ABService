import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { createRequire } from "node:module";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as water from "../libs/water-meter-check.mjs";
import * as registry from "../content/site-content.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as business from "../content/business.mjs";
import * as schema from "../libs/schema-data.mjs";
import * as advice from "../content/advice-guides.mjs";
import * as citations from "../libs/cited-sources.mjs";
import { readContactContext } from "../libs/contact-context.mjs";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const tracked = await loadContactModule("components/tracked-link.js", { "@vercel/analytics": { track() {} } });
const hero = await loadContactModule("components/page-hero.js", { "@/components/tracked-link": tracked, "@/content/business.mjs": business });
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", { "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema });
const cta = await loadContactModule("components/contact-cta.js", { "@/components/tracked-link": tracked, "@/content/business.mjs": business });
const shared = { "@/components/page-hero": hero, "@/components/breadcrumbs": breadcrumbs, "@/components/contact-cta": cta, "@/content/site-content.mjs": registry, "@/libs/seo-data.mjs": seo, "@/content/business.mjs": business, "@/content/advice-guides.mjs": advice, "@/libs/water-meter-check.mjs": water, "@/libs/cited-sources.mjs": citations };
const component = await loadContactModule("components/water-meter-check.js", { "@/libs/water-meter-check.mjs": water, "@vercel/analytics": { track() {} } });
const page = await loadContactModule("app/tools/watermetercheck/page.js", { ...shared, "@/components/water-meter-check": component });
const pageDom = () => parse(renderToStaticMarkup(React.createElement(page.default)));
const dom = (element) => parse(renderToStaticMarkup(element));
const nodes = (element, predicate) => {
  if (!element || typeof element !== "object") return [];
  if (Array.isArray(element)) return element.flatMap((child) => nodes(child, predicate));
  return [...(predicate(element) ? [element] : []), ...nodes(element.props?.children, predicate)];
};

async function harness() {
  const states = [], refs = [], events = [], frames = [], focuses = [];
  let stateIndex = 0, refIndex = 0;
  const hooks = { ...React,
    useSyncExternalStore: () => true,
    useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = initial; return [states[index], (next) => { states[index] = typeof next === "function" ? next(states[index]) : next; }]; },
    useRef(initial) { const index = refIndex++; return refs[index] ||= { current: initial }; },
  };
  const compiled = await loadContactModule("components/water-meter-check.js", { react: hooks, "@/libs/water-meter-check.mjs": water, "@vercel/analytics": { track: (name, props) => events.push({ name, props }) } }, { requestAnimationFrame: (callback) => frames.push(callback) });
  const render = () => {
    stateIndex = 0; refIndex = 0;
    const element = compiled.default();
    for (const node of nodes(element, (node) => node.props?.ref)) node.props.ref.current = { focus: () => focuses.push(node.props.id) };
    return element;
  };
  const update = (values) => {
    for (const [name, value] of Object.entries(values)) {
      const field = nodes(render(), (node) => node.props?.id === `water-${name}`)[0];
      assert.ok(field, `Missing field ${name}`);
      field.props.onChange({ target: { name, value } });
    }
    return render();
  };
  const submit = () => {
    const form = nodes(render(), (node) => node.type === "form")[0];
    assert.ok(form, "Missing local calculator form");
    form.props.onSubmit({ preventDefault() {} });
    const element = render();
    while (frames.length) frames.shift()();
    return element;
  };
  return { render, update, submit, events, focuses, frames };
}
const valid = { safeAccess: "yes", waterNearElectricity: "no", meterScope: "own", waterUse: "none", unit: "m3", firstReading: "123,456", secondReading: "123,457", minutes: "30" };

test("server page has one H1, useful safe preparation, real sources, issuer and separate dates", () => {
  const document = pageDom();
  assert.equal(document.querySelectorAll("h1").length, 1);
  assert.equal(document.querySelector('a[href="#watermetercheck"]')?.textContent, "Start de watermetercheck");
  assert.ok(document.querySelector("#watermetercheck"));
  assert.match(document.textContent, /geen.*lekdiagnose/i);
  assert.match(document.textContent, /geen.*schakelaars/i);
  assert.match(document.textContent, /waterontharder.*bijvull/i);
  assert.ok(document.querySelector('a[href="/over-ons"]'));
  assert.match(document.textContent, /Broninformatie nagekeken op 11 oktober 2026/);
  assert.match(document.textContent, /Inhoud gewijzigd op 11 oktober 2026/);
  assert.equal(page.metadata?.alternates?.canonical, "https://www.abservice24.be/tools/watermetercheck");
  for (const href of Object.values(water.waterMeterSources)) assert.ok(document.querySelectorAll("a").some((a) => a.getAttribute("href") === href && a.textContent.length > 20), href);
  const schemas = document.querySelectorAll('script[type="application/ld+json"]').map((script) => JSON.parse(script.textContent));
  assert.ok(!schemas.some((value) => ["FAQPage", "Review", "SoftwareApplication"].includes(value["@type"])));
  assert.deepEqual(schemas.find((value) => value["@type"] === "BreadcrumbList")?.itemListElement.map((value) => value.name), ["Home", "Advies", "Watermetercheck"]);
});

test("server form has optional native labels, unknown choices, decimal guidance and cannot submit without JS", () => {
  const document = pageDom();
  assert.equal(document.querySelectorAll("select").length, 5);
  for (const select of document.querySelectorAll("select")) {
    assert.ok(document.querySelectorAll("label").some((label) => label.getAttribute("for") === select.id));
    assert.equal(select.querySelector("option[selected]")?.getAttribute("value"), "unknown");
    assert.equal(select.hasAttribute("required"), false);
  }
  const inputs = document.querySelectorAll("input");
  assert.equal(inputs.length, 3);
  assert.ok(inputs.every((input) => input.getAttribute("type") === "text" && input.getAttribute("inputMode") === "decimal" && !input.hasAttribute("required")));
  assert.ok(document.querySelector("fieldset[disabled]"));
  assert.ok(document.querySelector('button[type="submit"][disabled]'));
  assert.match(document.querySelector("noscript")?.textContent || "", /JavaScript.*browser/i);
  assert.match(document.textContent, /totale.*dezelfde eenheid/i);
  assert.match(document.textContent, /duizendtalscheiding.*3 decimalen/i);
  assert.match(document.textContent, /1.*10080.*invoer/i);
  assert.match(document.querySelector('option[value="none"]')?.textContent || "", /kranen.*toiletten.*toestellen.*automatisch/i);
});

test("real submit shows correctly formatted quantities and every limitation before its only coded service CTA", async () => {
  const h = await harness(); h.update(valid);
  const element = h.submit(), document = dom(element), panel = document.querySelector("#watermeterresultaat");
  assert.ok(panel);
  assert.equal(panel.getAttribute("role"), "status");
  assert.equal(panel.getAttribute("aria-live"), "polite");
  assert.equal(panel.getAttribute("aria-atomic"), "true");
  assert.equal(panel.getAttribute("tabindex"), "-1");
  assert.match(panel.textContent, /1 liter.*2 liter\/uur/);
  const links = panel.querySelectorAll('a[href^="/contact"]');
  assert.equal(links.length, 1);
  for (const limitation of water.getWaterMeterObservation(valid).limitations) {
    assert.ok(panel.textContent.includes(limitation));
    assert.ok(panel.textContent.indexOf(limitation) < panel.textContent.indexOf(links[0].textContent));
  }
  assert.equal(links[0].getAttribute("href"), "/contact#aanvraagformulier?dienst=Lekdetectie&context=watermetercheck&result=positive");
  assert.match(readContactContext(new URL(links[0].getAttribute("href"), "https://qa.example.invalid")).message, /beoordel/i);
  assert.deepEqual(h.events, [{ name: "water_meter_check_complete", props: { location: "water_meter_check", result: "observation" } }]);
  nodes(element, (node) => node.props?.href?.startsWith("/contact"))[0].props.onClick();
  assert.deepEqual(h.events[1], { name: "service_cta_click", props: { location: "water_meter_check", result: "observation", service: "Lekdetectie" } });
  assert.deepEqual(h.focuses, ["watermeterresultaat"]);
});

test("zero observation explains remaining uncertainty and offers the other-question category", async () => {
  const h = await harness(); h.update({ ...valid, secondReading: "123,456" });
  const panel = dom(h.submit()).querySelector("#watermeterresultaat");
  assert.ok(panel);
  assert.match(panel.textContent, /0 liter.*0 liter\/uur/);
  assert.match(panel.textContent, /tijdelijk lek.*ander circuit.*niet uit/);
  assert.equal(panel.querySelector('a[href^="/contact"]')?.getAttribute("href"), "/contact#aanvraagformulier?dienst=Andere+vraag&context=watermetercheck&result=zero");
});

test("litre inputs render Belgian decimals and round the period average to at most three decimals", async () => {
  const h = await harness(); h.update({ ...valid, unit: "litres", firstReading: "0", secondReading: "1.234", minutes: "11" });
  const panel = dom(h.submit()).querySelector("#watermeterresultaat");
  assert.ok(panel);
  assert.match(panel.textContent, /1,234 liter.*6,731 liter\/uur/);
});

test("unsafe, invalid and unknown results show guidance without quantities or contact pressure", async () => {
  for (const [input, status, text] of [[{}, "unknown", /veilige toegang/i], [{ ...valid, firstReading: "1e3" }, "invalid", /Controleer de getallen/], [{ ...valid, safeAccess: "no", firstReading: "bad" }, "unsafe", /Houd afstand/], [{ ...valid, meterScope: "shared" }, "unknown", /gedeelde meter/i], [{ ...valid, waterUse: "possible" }, "unknown", /automatisch watergebruik/]]) {
    const h = await harness(); h.update(input);
    const panel = dom(h.submit()).querySelector("#watermeterresultaat");
    assert.ok(panel);
    assert.match(panel.textContent, text);
    assert.equal(panel.querySelectorAll("dl").length, 0);
    assert.equal(panel.querySelectorAll('a[href^="/contact"]').length, 0);
    assert.deepEqual(h.events[0], { name: "water_meter_check_complete", props: { location: "water_meter_check", result: status } });
    if (status === "unsafe") assert.match(panel.querySelector(".warning-box")?.textContent || "", /Houd afstand/);
    assert.deepEqual(h.focuses, ["watermeterresultaat"]);
  }
});

test("every changed input clears the stale result and reset clears inputs and returns first-field focus", async () => {
  const h = await harness();
  for (const [name, value] of Object.entries(valid)) {
    h.update(valid); h.submit();
    const panel = dom(h.update({ [name]: value })).querySelector("#watermeterresultaat");
    assert.ok(panel);
    assert.equal(panel.querySelectorAll("dl").length, 0);
    assert.equal(panel.querySelectorAll('a[href^="/contact"]').length, 0);
  }
  h.update(valid); h.submit();
  const reset = nodes(h.render(), (node) => node.type === "button" && node.props.type === "button")[0];
  assert.ok(reset, "Missing reset control"); reset.props.onClick();
  const document = dom(h.render()); while (h.frames.length) h.frames.shift()();
  assert.ok(document.querySelectorAll("input").every((input) => input.getAttribute("value") === ""));
  assert.ok(document.querySelectorAll("select").every((select) => select.querySelector("option[selected]")?.getAttribute("value") === "unknown"));
  assert.equal(h.focuses.at(-1), "water-safeAccess");
  assert.equal(document.querySelectorAll('a[href^="/contact"]').length, 0);
});

test("hub and water advice expose the useful tool entrance while preserving existing links and history", async () => {
  const compiled = await loadContactModule("app/advies/page.js", shared);
  const document = dom(React.createElement(compiled.default));
  for (const href of ["/tools/watermetercheck", "/tools/onderhoudscheck", "/foutcodes"]) assert.ok(document.querySelectorAll("a").some((node) => node.getAttribute("href") === href), href);
  const guide = advice.getAdviceGuide("watermeter-blijft-draaien");
  assert.ok(guide.relatedLinks.some(({ href }) => href === "/tools/watermetercheck"));
  assert.equal(guide.checkedAt, "2026-10-10"); assert.equal(guide.modifiedAt, "2026-10-11");
  assert.equal(guide.sections.length, 5); assert.equal(guide.steps.length, 4);
  assert.ok(guide.sourceLinks.some(({ href }) => href === "https://www.pidpa.be/veelgestelde-vragen"));
});

test("rendered privacy explains local water amounts and coded optional handoff while retaining existing processing", async () => {
  const compiled = await loadContactModule("app/privacy-policy/page.js", shared);
  const text = dom(React.createElement(compiled.default)).textContent;
  assert.match(text, /watermetercheck/i);
  assert.match(text, /meterstanden.*meetduur.*hoeveelheden.*browser/i);
  assert.match(text, /positief.*nul.*dienst/i);
  assert.match(text, /ontvangst.*(?:niet|nog).*bevestigd/i);
  assert.match(text, /11 oktober 2026/);
  for (const term of ["Mailgun", "Google Places", "Uw rechten", "Technische verwerking", "onderhoudsdatum"]) assert.ok(text.includes(term), term);
});

test("the actual contact effect prefills coded water observations and cleans the fragment without submitting", async () => {
  for (const [category, service] of [["positive", "Lekdetectie"], ["zero", "Andere vraag"]]) {
    const states = [], effects = [], frames = [], cleanups = [], scrolls = [];
    let stateIndex = 0;
    const hooks = { ...React,
      useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial; return [states[index], (next) => { states[index] = typeof next === "function" ? next(states[index]) : next; }]; },
      useRef(initial) { return { current: initial }; },
      useEffect(effect) { effects.push(effect); },
    };
    const compiled = await loadContactModule("components/sections/contact-form.js", { react: hooks, "@vercel/analytics": { track() { assert.fail("Prefill must not emit an interaction event"); } } }, {
      window: { location: new URL(`https://qa.example.invalid/contact#aanvraagformulier?dienst=${encodeURIComponent(service)}&context=watermetercheck&result=${category}`), history: { replaceState: (...args) => cleanups.push(args) } },
      requestAnimationFrame: (callback) => frames.push(callback),
      document: { getElementById: (id) => ({ scrollIntoView: ({ behavior, block }) => scrolls.push({ id, behavior, block }) }) },
      fetch() { assert.fail("Prefill must not submit a contact request"); },
    });
    compiled.default(); effects[0](); await Promise.resolve();
    stateIndex = 0;
    const document = dom(compiled.default());
    assert.equal(document.querySelector("#service option[selected]").textContent, service);
    assert.match(document.querySelector("#message").textContent, /Watermetercheck.*beoordel/);
    assert.doesNotMatch(document.querySelector("#message").textContent, /liter|minuten|\d/);
    assert.deepEqual(cleanups, [[null, "", "/contact#aanvraagformulier"]]);
    frames.forEach((callback) => callback());
    assert.deepEqual(scrolls, [{ id: "aanvraagformulier", behavior: "instant", block: "start" }]);
    assert.equal(document.querySelector("form").getAttribute("method"), "post");
    assert.equal(document.querySelector("#email").getAttribute("value"), "");
  }
});
