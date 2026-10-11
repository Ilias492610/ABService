import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { createHarness } from "./helpers/wp12-runtime.mjs";

const visible = (h) => [h.all(".whatsapp-button").length, h.all(".google-rating-popup").length];
for (const selector of ["form", ".warning-box", ".site-footer", ".maintenance-check-result", ".page-hero .button-row"]) {
  test(`initial visible ${selector} clears both widgets and viewport leave restores them`, async () => {
    const h = await createHarness("floating", { zones: [{ selector, visible: true }] });
    try {
      assert.deepEqual(visible(h), [0, 0]);
      const zone = h.zoneNodes[0]; zone.rect.top = 1600; zone.rect.bottom = 1800;
      h.observers.at(-1).emit(zone, false); h.render();
      assert.deepEqual(visible(h), [1, 1]);
    } finally { h.dispose(); }
  });
}

test("hero CTA viewport entry hands off owned focus and restores only when all protected zones leave", async () => {
  const h = await createHarness("floating", { zones: [{ selector: ".page-hero .button-row", visible: false }, { selector: "form", visible: false }] });
  try {
    const [row, form] = h.zoneNodes;
    assert.deepEqual(visible(h), [1, 1]);
    h.query(".google-rating-link").focus();
    h.observers.at(-1).emit(row, true); h.render();
    assert.deepEqual(visible(h), [0, 0]);
    assert.equal(h.document.activeElement, h.brand);
    assert.equal(h.brand.focusOptions.preventScroll, true);
    h.observers.at(-1).emit(form, true); h.render();
    h.observers.at(-1).emit(row, false); h.render();
    assert.deepEqual(visible(h), [0, 0]);
    h.observers.at(-1).emit(form, false); h.render();
    assert.deepEqual(visible(h), [1, 1]);
  } finally { h.dispose(); }
});

test("dynamic wrapped PageHero CTA is protected after route arrival and removed descendants release clearance", async () => {
  const h = await createHarness("floating");
  try {
    h.navigate("/tools/onderhoudscheck");
    const wrapper = h.addZone(".route-wrapper");
    const row = h.addZone(".page-hero .button-row", true, wrapper);
    h.mutations.at(-1).emit([wrapper]); h.render();
    assert.deepEqual(visible(h), [0, 0]);
    assert.equal(h.observers.at(-1).targets.has(row), true);
    h.main.children = h.main.children.filter((node) => node !== wrapper);
    h.mutations.at(-1).emit([], [wrapper]); h.render();
    assert.deepEqual(visible(h), [1, 1]);
    h.observers.at(-1).emit(row, true); h.render();
    assert.deepEqual(visible(h), [1, 1]);
  } finally { h.dispose(); }
});

test("detached hero action row releases clearance after losing its PageHero ancestor", async () => {
  const h = await createHarness("floating", { zones: [{ selector: ".page-hero .button-row", visible: true }] });
  try {
    const row = h.zoneNodes[0], hero = row.parentElement;
    assert.deepEqual(visible(h), [0, 0]);
    hero.children = hero.children.filter((node) => node !== row);
    row.parentElement = null; row.isConnected = false;
    h.mutations.at(-1).emit([], [row]); h.render();
    assert.deepEqual(visible(h), [1, 1]);
    assert.equal(h.observers.at(-1).targets.has(row), false);
    h.observers.at(-1).emit(row, true); h.render();
    assert.deepEqual(visible(h), [1, 1]);
  } finally { h.dispose(); }
});

test("hero CTA pathname refresh disconnects old observers and preserves an explicit Google dismissal", async () => {
  const h = await createHarness("floating", { zones: [{ selector: ".page-hero .button-row", visible: false }] });
  try {
    h.brand.focus(); h.click(h.query(".google-rating-close"));
    const row = h.zoneNodes[0], observer = h.observers.at(-1), mutation = h.mutations.at(-1);
    observer.emit(row, true); h.render();
    assert.deepEqual(visible(h), [0, 0]);
    h.navigate("/contact");
    assert.equal(observer.disconnected, true); assert.equal(mutation.disconnected, true);
    assert.deepEqual(visible(h), [1, 0]);
    observer.emit(row, true); h.render(); assert.deepEqual(visible(h), [1, 0]);
    h.observers.at(-1).emit(row, true); h.render(); assert.deepEqual(visible(h), [0, 0]);
    h.observers.at(-1).emit(row, false); h.render(); assert.deepEqual(visible(h), [1, 0]);
  } finally { h.dispose(); }
  assert.ok(h.observers.every((observer) => observer.disconnected));
  assert.ok(h.mutations.every((observer) => observer.disconnected));
});

test("ordinary button rows outside PageHero do not permanently suppress controls", async () => {
  const h = await createHarness("floating", { zones: [{ selector: ".button-row", visible: true }] });
  try {
    assert.deepEqual(visible(h), [1, 1]);
    assert.equal(h.observers.at(-1).targets.has(h.zoneNodes[0]), false);
  } finally { h.dispose(); }
});

test("any intersecting zone clears controls, including dynamic warning insertion and removal", async () => {
  const h = await createHarness("floating", { zones: [{ selector: "form", visible: false }] });
  try {
    assert.deepEqual(visible(h), [1, 1]);
    const form = h.zoneNodes[0];
    h.observers.at(-1)?.emit(form, true); h.render();
    assert.deepEqual(visible(h), [0, 0]);
    const warning = h.addZone(".warning-box", true);
    h.mutations.at(-1).emit([warning]); h.render();
    h.observers.at(-1).emit(form, false); h.render();
    assert.deepEqual(visible(h), [0, 0]);
    h.main.children = h.main.children.filter((node) => node !== warning); warning.isConnected = false;
    h.mutations.at(-1).emit([], [warning]); h.render();
    assert.deepEqual(visible(h), [1, 1]);
    assert.equal(h.observers.at(-1).targets.has(warning), false);
  } finally { h.dispose(); }
});

test("new wrapped form/tool results are observed after route content arrives; removed descendants stop clearing", async () => {
  const h = await createHarness("floating");
  try {
    h.navigate("/tools/watermetercheck");
    const wrapper = h.addZone(".tool-wrapper");
    const result = h.addZone(".maintenance-check-result", true, wrapper);
    const form = h.addZone("form", false, wrapper);
    h.mutations.at(-1).emit([wrapper]); h.render();
    assert.deepEqual(visible(h), [0, 0]);
    assert.equal(h.observers.at(-1).targets.has(result), true);
    assert.equal(h.observers.at(-1).targets.has(form), true);
    h.main.children = h.main.children.filter((node) => node !== wrapper);
    h.mutations.at(-1).emit([], [wrapper]); h.render();
    assert.deepEqual(visible(h), [1, 1]);
    h.observers.at(-1).emit(result, true); h.render();
    assert.deepEqual(visible(h), [1, 1]);
  } finally { h.dispose(); }
});

test("pathname replaces observations and refreshes initial geometry; stale callbacks and cleanup are safe", async () => {
  const h = await createHarness("floating", { zones: [{ selector: "form", visible: false }] });
  try {
    const zone = h.zoneNodes[0];
    h.observers.at(-1)?.emit(zone, true); h.render();
    assert.deepEqual(visible(h), [0, 0]);
    const previous = h.observers.at(-1), mutation = h.mutations.at(-1);
    h.navigate("/contact");
    assert.equal(previous.disconnected, true); assert.equal(mutation.disconnected, true);
    assert.deepEqual(visible(h), [1, 1]);
    previous.emit(zone, true); h.render(); assert.deepEqual(visible(h), [1, 1]);
    assert.ok(h.mutations.at(-1).targets.every(({ target, options }) => target === h.main && options.childList && options.subtree && !options.attributes));
  } finally { h.dispose(); }
  assert.ok(h.observers.every((observer) => observer.disconnected));
  assert.ok(h.mutations.every((observer) => observer.disconnected));
  assert.ok(h.resizeObservers.every((observer) => observer.disconnected));
});

test("focused close hands focus to WhatsApp; dismissed Google stays closed after viewport leave and navigation", async () => {
  const h = await createHarness("floating", { zones: [{ selector: "form", visible: false }] });
  try {
    const close = h.query(".google-rating-close"); close.focus(); h.click(close);
    assert.equal(h.document.activeElement, h.query(".whatsapp-button"));
    assert.deepEqual(visible(h), [1, 0]);
    h.observers.at(-1).emit(h.zoneNodes[0], true); h.render();
    assert.deepEqual(visible(h), [0, 0]); assert.equal(h.document.activeElement, h.brand);
    h.observers.at(-1).emit(h.zoneNodes[0], false); h.render();
    assert.deepEqual(visible(h), [1, 0]);
    h.navigate("/diensten"); assert.deepEqual(visible(h), [1, 0]);
  } finally { h.dispose(); }
});

for (const focusClass of [".whatsapp-button", ".google-rating-link", ".google-rating-close"]) {
  test(`clearance hands focus from ${focusClass} to the visible header home link`, async () => {
    const h = await createHarness("floating", { zones: [{ selector: "form", visible: false }] });
    try {
      h.query(focusClass).focus();
      h.observers.at(-1)?.emit(h.zoneNodes[0], true); h.render();
      assert.equal(h.document.activeElement, h.brand);
      assert.equal(h.brand.focusOptions.preventScroll, true);
      assert.deepEqual(visible(h), [0, 0]);
    } finally { h.dispose(); }
  });
}

test("pointer dismissal and clearance with unrelated page focus do not move it", async () => {
  const h = await createHarness("floating", { zones: [{ selector: "form", visible: false }] });
  try {
    h.brand.focus(); h.click(h.query(".google-rating-close")); assert.equal(h.document.activeElement, h.brand);
    h.zoneNodes[0].focus(); h.observers.at(-1)?.emit(h.zoneNodes[0], true); h.render();
    assert.equal(h.document.activeElement, h.zoneNodes[0]);
  } finally { h.dispose(); }
});

test("focused explicit dismissal uses the header fallback when WhatsApp is unavailable", async () => {
  const h = await createHarness("floating");
  try {
    h.query(".whatsapp-button").getClientRects = () => [];
    const close = h.query(".google-rating-close"); close.focus(); h.click(close);
    assert.equal(h.document.activeElement, h.brand);
  } finally { h.dispose(); }
});

test("original contact events and neutral Google fallback survive", async () => {
  const h = await createHarness("floating");
  try {
    const whatsapp = h.query(".whatsapp-button"), google = h.query(".google-rating-link");
    assert.equal(whatsapp.props.href, "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag.");
    assert.equal(whatsapp.props["aria-label"], "Contacteer AB Service via WhatsApp");
    assert.equal(google.props.href, "https://maps.google.com/?cid=4063521367014109489");
    assert.equal(whatsapp.props.target, "_blank"); assert.equal(google.props.rel, "noopener noreferrer");
    h.click(whatsapp); h.click(google);
    assert.deepEqual(h.events, [{ name: "whatsapp_click", props: { location: "floating_button" } }, { name: "google_profile_click", props: { location: "floating_rating" } }]);
    await h.loadRating(); assert.equal(h.requests[0][0], "/api/google-rating"); assert.equal(h.requests[0][1].cache, "no-store");
    assert.equal(h.query(".google-rating-link").props.href, google.props.href);
    const html = renderToStaticMarkup(h.render());
    assert.match(html, /Bekijk ons profiel/);
    assert.doesNotMatch(html, /google-rating-row|[0-9]+ beoordelingen/);
  } finally { h.dispose(); }
});

test("idle live rating retains stars, attribution, verified live link and abort cleanup", async () => {
  const h = await createHarness("floating", { fetchResponse: async () => ({ ok: true, json: async () => ({ rating: { rating: 4.7, googleMapsUri: "https://maps.google.com/?cid=4063521367014109489" } }) }) });
  try {
    assert.equal(h.requests.length, 0); await h.loadRating();
    assert.equal(h.query(".google-stars-filled").props.style.width, "94%");
    assert.equal(h.query(".google-maps-attribution").props.translate, "no");
    assert.equal(h.query(".google-rating-link").props.href, "https://maps.google.com/?cid=4063521367014109489");
    assert.match(renderToStaticMarkup(h.render()), /<b>4,7<\/b>/);
  } finally { h.dispose(); }
  assert.equal(h.requests[0][1].signal.aborted, true);
});
