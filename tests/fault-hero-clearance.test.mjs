import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHarness } from "./helpers/wp12-runtime.mjs";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import { getFaultGuide } from "../content/fault-guides.mjs";
import { heroMarker, intergasCountAfter } from "./fixtures/fault-hero-clearance.mjs";
const visible = h => [h.all(".whatsapp-button").length, h.all(".google-rating-popup").length];

test("complete fault hero clears initially visible controls without stealing existing reader focus", async () => {
  const h = await createHarness("floating", { deferEffects: true, zones: [{ selector: ".fault-guide-hero", visible: true }] });
  try { assert.deepEqual(visible(h), [1, 1]); const text = h.addZone("a", true, h.zoneNodes[0]); text.focus(); h.flushEffects(); assert.deepEqual(visible(h), [0, 0]); assert.equal(h.document.activeElement, text); } finally { h.dispose(); }
});
for (const selector of [".whatsapp-button", ".google-rating-link", ".google-rating-close"]) {
  test(`fault hero transfers owned ${selector} focus preventScroll and honors all other protected regions`, async () => {
    const h = await createHarness("floating", { zones: [{ selector: ".fault-guide-hero", visible: false }, { selector: ".fault-guide-reading", visible: false }] });
    try { const [hero, reading] = h.zoneNodes; h.query(selector).focus(); h.observers.at(-1).emit(hero, true); h.render(); assert.deepEqual(visible(h), [0, 0]); assert.equal(h.document.activeElement, h.brand); assert.equal(h.brand.focusOptions.preventScroll, true); h.observers.at(-1).emit(reading, true); h.render(); h.observers.at(-1).emit(hero, false); h.render(); assert.deepEqual(visible(h), [0, 0]); h.observers.at(-1).emit(reading, false); h.render(); assert.deepEqual(visible(h), [1, 1]); } finally { h.dispose(); }
  });
}
test("fault hero mounting inside a route wrapper is observed and detached or stale hero callbacks are harmless", async () => {
  const h = await createHarness("floating");
  try { h.navigate("/foutcodes/acv"); const wrapper = h.addZone(".route-wrapper"), hero = h.addZone(".fault-guide-hero", true, wrapper); h.mutations.at(-1).emit([wrapper]); h.render(); assert.deepEqual(visible(h), [0, 0]); h.main.children = h.main.children.filter(n => n !== wrapper); h.mutations.at(-1).emit([], [wrapper]); h.render(); assert.deepEqual(visible(h), [1, 1]); h.observers.at(-1).emit(hero, true); h.render(); assert.deepEqual(visible(h), [1, 1]); } finally { h.dispose(); }
});
test("fault hero navigation retains explicit dismissal and unrelated source focus", async () => {
  const h = await createHarness("floating", { zones: [{ selector: ".fault-guide-hero", visible: false }] });
  try { h.brand.focus(); h.click(h.query(".google-rating-close")); const old = h.observers.at(-1), hero = h.zoneNodes[0], link = h.addZone("a", true, hero); link.focus(); old.emit(hero, true); h.render(); assert.deepEqual(visible(h), [0, 0]); assert.equal(h.document.activeElement, link); h.navigate("/foutcodes/bulex"); assert.equal(old.disconnected, true); old.emit(hero, true); h.render(); assert.deepEqual(visible(h), [1, 0]); h.observers.at(-1).emit(hero, true); h.render(); assert.deepEqual(visible(h), [0, 0]); h.observers.at(-1).emit(hero, false); h.render(); assert.deepEqual(visible(h), [1, 0]); } finally { h.dispose(); }
});
test("every13 real fault route marks only its existing whole hero, not global PageHero defaults", async () => {
  const slugs = ["vaillant", "bulex", "bosch", "junkers", "remeha", "buderus", "viessmann", "acv", "intergas", "nefit-bosch", "atag", "itho-daalderop", "ferroli"];
  for (const slug of slugs) { const html = await renderFaultGuide(slug); assert.equal(html.split(heroMarker).length, 2, slug); assert.ok(html.indexOf(heroMarker) < html.indexOf('class="hero-intro"')); assert.ok(html.indexOf(heroMarker) < html.indexOf('class="hero-aside"')); }
  const { default: Hero } = await loadContactModule("components/page-hero.js", { "next/link": ({ children, ...p }) => createElement("a", p, children), "@/components/tracked-link": ({ children, eventName, eventProperties, ...p }) => createElement("a", p, children), "@/content/business.mjs": await import("../content/business.mjs") });
  const props = { title: "Preserved default", intro: "Preserved intro" };
  const a = renderToStaticMarkup(createElement(Hero, props)), b = renderToStaticMarkup(createElement(Hero, { ...props, protectReading: false }));
  assert.equal(a, b); assert.match(a, /<section class="page-hero">/); assert.ok(!a.includes("fault-guide-hero"));
});
test("Intergas total20 identifiers are not attributed to the three grouped cells containing12", () => {
  const scope = getFaultGuide("intergas").catalogs[0].scope;
  assert.ok(scope.includes(intergasCountAfter));
  assert.doesNotMatch(scope, /hun 20 genummerde/);
});
