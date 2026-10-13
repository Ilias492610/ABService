import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as maintenance from "../libs/maintenance-check.mjs";
import { readContactContext } from "../libs/contact-context.mjs";
import { pageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { buildGlobalSchemaGraph } from "../libs/schema-data.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { beforeMaintenanceResetSource, beforeMaintenanceResetHtml } from "./fixtures/maintenance-reset-history.mjs";

const fixtureBytes = await readFile(new URL("./fixtures/maintenance-reset-facts.json", import.meta.url));
const f = JSON.parse(fixtureBytes);
const hash = value => createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest("hex");
const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const defaults = { region: "unknown", device: "unknown", fuel: "unknown", power: "unknown", lastDate: "", changed: "unknown" };
const gas = { region: "vlaanderen", device: "central", fuel: "gas", power: "atleast20", changed: "no", lastDate: "2024-05-12" };
const nodes = (tree, predicate) => Array.isArray(tree) ? tree.flatMap(child => nodes(child, predicate))
  : !React.isValidElement(tree) ? [] : [...(predicate(tree) ? [tree] : []), ...nodes(tree.props.children, predicate)];
const html = tree => renderToStaticMarkup(tree);

// Entire SWC-compiled production component, kernel, context parser, analytics
// builder and Next Link are real. Adapters host hooks and observe external
// analytics/focus boundaries. This does not model native browser geometry/AT.
async function harness() {
  const states = [], refs = [], pending = [], frames = [], focuses = [], events = [], movements = [];
  let stateIndex = 0, refIndex = 0, committedTree;
  const hooks = { ...React,
    useState(initial) {
      const index = stateIndex++;
      if (!(index in states)) states[index] = initial;
      return [states[index], next => pending.push(() => { states[index] = typeof next === "function" ? next(states[index]) : next; })];
    },
    useRef(initial) { const index = refIndex++; return refs[index] ||= { current: initial }; },
  };
  const forbid = () => { throw new Error("reset must not perform external writes or navigation"); };
  const compiled = await loadContactModule("components/maintenance-check.js", {
    react: hooks,
    "@/libs/maintenance-check.mjs": maintenance,
    "@vercel/analytics": { track: (name, props) => events.push({ name, props }) },
  }, {
    requestAnimationFrame: callback => frames.push(callback), fetch: forbid,
    localStorage: { setItem: forbid }, sessionStorage: { setItem: forbid },
    window: { location: { assign: forbid, replace: forbid }, localStorage: { setItem: forbid } },
    document: { getElementById: id => nodes(committedTree, node => node.props.id === id).length ? { focus: () => focuses.push(id) } : null },
  });
  const render = () => {
    while (pending.length) pending.shift()();
    stateIndex = 0; refIndex = 0;
    committedTree = compiled.default();
    for (const node of nodes(committedTree, node => node.props.ref)) node.props.ref.current = {
      focus: options => { focuses.push(node.props.id); movements.push({ action: "focus", id: node.props.id, preventScroll: options?.preventScroll }); },
      scrollIntoView: options => movements.push({ action: "scroll", id: node.props.id, block: options?.block, behavior: options?.behavior }),
    };
    return committedTree;
  };
  const field = name => {
    const node = nodes(render(), n => n.props.id === `check-${name}`)[0];
    assert.ok(node, `real visible field ${name}`);
    return node;
  };
  const update = values => {
    for (const [name, value] of Object.entries(values)) field(name).props.onChange({ target: { name, value } });
    return render();
  };
  const flush = () => { while (frames.length) frames.shift()(); };
  const submit = (flushFrames = true) => {
    let prevented = false;
    nodes(render(), n => n.type === "form")[0].props.onSubmit({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
    const tree = render(); if (flushFrames) flush(); return tree;
  };
  const reset = (flushFrames = true) => {
    const controls = nodes(render(), n => n.type === "button" && n.props.children === "Wis mijn invoer");
    assert.equal(controls.length, 1, "one real reset control must exist");
    assert.equal(controls[0].props.type, "button", "reset must not submit the form");
    assert.equal(typeof controls[0].props.onClick, "function");
    controls[0].props.onClick();
    const tree = render(); if (flushFrames) flush(); return tree;
  };
  render();
  return { render, field, update, submit, reset, flush, states, frames, focuses, events, movements };
}

test("real reset focuses without native scrolling then centers the committed first question instantly", async () => {
  // Native-only focus, wrong ordering/options or missing scroll must fail.
  // The host observes real DOM-method arguments, never positions or header pixels.
  for (const input of [gas, { ...gas, lastDate: "9999-01-01" }, { region: "vlaanderen" }]) {
    const h = await harness(); h.update(input); h.submit(); h.movements.length = 0;
    const eventsBefore = structuredClone(h.events);
    for (let repeat = 0; repeat < 2; repeat++) {
      const tree = h.reset(false);
      assert.deepEqual({ ...h.states[0] }, defaults);
      assert.equal(h.states[1], null);
      assert.equal(beforeMaintenanceResetHtml(html(tree)), f.before.defaultHtml);
      assert.deepEqual(h.movements, [], "focus and alignment wait until the committed reset frame");
      assert.equal(h.frames.length, 1);
      h.flush();
      assert.deepEqual(h.movements, [
        { action: "focus", id: "check-region", preventScroll: true },
        { action: "scroll", id: "check-region", block: "center", behavior: "instant" },
      ]);
      assert.deepEqual(h.events, eventsBefore);
      h.movements.length = 0;
    }
  }
});

test("real default SSR exposes one native reset beside submit without adding result or contact", async () => {
  // Missing button, default submit type, disabled/hidden control or extra CTA fail.
  const compiled = await loadContactModule("components/maintenance-check.js", { "@/libs/maintenance-check.mjs": maintenance });
  const output = html(React.createElement(compiled.default)), dom = parse(output);
  const buttons = dom.querySelectorAll("button");
  assert.equal(buttons.length, 2, "native submit and reset controls");
  assert.equal(buttons[1].textContent, "Wis mijn invoer");
  assert.equal(buttons[1].getAttribute("type"), "button");
  assert.equal(buttons[1].getAttribute("class"), "button button-secondary");
  assert.equal(buttons[1].hasAttribute("disabled"), false);
  assert.equal(buttons[1].parentNode.getAttribute("class"), "button-row");
  assert.equal(buttons[1].previousElementSibling, buttons[0]);
  for (let element = buttons[1]; element?.tagName; element = element.parentNode) {
    assert.equal(element.hasAttribute("hidden"), false);
    assert.equal(element.hasAttribute("inert"), false);
    assert.notEqual(element.getAttribute("aria-hidden"), "true");
  }
  assert.equal(beforeMaintenanceResetHtml(output), f.before.defaultHtml);
  assert.equal(dom.querySelectorAll('a[href^="/contact"]').length, 0);
  assert.equal(dom.querySelectorAll("time, #check-date-error").length, 0);
  assert.equal(dom.querySelector("#check-lastDate").getAttribute("aria-invalid"), "false");
});

const cases = [
  ["periodic planning", gas, "periodic"],
  ["new-installation inspection", { ...gas, changed: "yes" }, "inspection"],
  ["invalid date", { ...gas, lastDate: "9999-01-01" }, "invalid"],
  ["incomplete unknown input", { region: "vlaanderen" }, "unknown"],
  ["unknown installation history", { ...gas, changed: "unknown" }, "unknown"],
  ["below-threshold recommendation", { ...gas, power: "below20" }, "recommended"],
  ["other region", { ...gas, region: "other" }, "unknown"],
  ["electric device", { region: "vlaanderen", device: "electric", changed: "no", lastDate: "2024-05-12" }, "outside-scope"],
  ["separate Flemish gaswaterheater", { region: "vlaanderen", device: "gas-water-heater", changed: "no", lastDate: "2024-05-12" }, "outside-scope"],
];
for (const [label, input, kind] of cases) test(`real reset clears all six fields and ${label} result, repeats and allows fresh reuse`, async () => {
  // No-op setInput/setResult, missing focus and stale hidden values must fail.
  const h = await harness(); h.update(input); const result = h.submit();
  assert.equal(h.states[1].kind, kind, "existing real calculation retained");
  assert.match(html(result), /Uw resultaat/);
  if (kind === "periodic") assert.match(html(result), /datetime="2026-05-12"/i);
  if (kind === "invalid") assert.match(html(result), /aria-invalid="true"/);
  const eventsBefore = structuredClone(h.events), focusCount = h.focuses.length;
  const resetTree = h.reset(false);
  assert.deepEqual({ ...h.states[0] }, defaults, "all six state values including hidden fuel/power return to defaults");
  assert.deepEqual(f.expectedDefaults, defaults);
  assert.equal(h.states[1], null, "old result must disappear");
  assert.equal(beforeMaintenanceResetHtml(html(resetTree)), f.before.defaultHtml, "entire default result restores with no old planning, notes, CTA or invalid error");
  assert.deepEqual(h.events, eventsBefore, "reset emits no extra analytics");
  assert.equal(h.focuses.length, focusCount, "focus waits for commit/frame");
  assert.equal(h.frames.length, 1);
  h.flush(); assert.equal(h.focuses.at(-1), "check-region");
  assert.equal(beforeMaintenanceResetHtml(html(h.reset())), f.before.defaultHtml, "repeated reset stays clear");
  assert.equal(h.focuses.at(-1), "check-region"); assert.deepEqual(h.events, eventsBefore);
  h.update(gas); const reused = h.submit();
  assert.equal(h.states[1].kind, "periodic");
  assert.match(html(reused), /datetime="2026-05-12"/i);
  const link = nodes(reused, node => node.props.href?.startsWith("/contact"))[0];
  assert.ok(link, "unchanged optional real Link handoff");
  assert.match(link.props.href, /^\/contact#aanvraagformulier\?/);
  const url = new URL(link.props.href, "https://www.abservice24.be");
  assert.equal(url.search, "", "private date stays out of query");
  const context = readContactContext({ hash: url.hash });
  assert.equal(context.service, "Onderhoud cv-ketel");
  assert.match(context.message, /2024-05-12/);
  link.props.onClick();
  assert.deepEqual(h.events.at(-1), { name: "tool_enquiry_click", props: { location: "maintenance_check", region: "vlaanderen", result: "periodic", service: "Onderhoud cv-ketel" } });
  for (const event of h.events) assert.ok(!JSON.stringify(event).includes("2024-05-12"), "no private date in analytics");
});

test("reset clears formerly visible then hidden fuel/power and automatic gaswaterheater fuel before revealing them", async () => {
  const h = await harness(); h.update(gas);
  h.update({ region: "brussel", device: "gas-water-heater" });
  assert.equal(h.states[0].fuel, "gas", "existing automatic gas rule retained");
  assert.equal(nodes(h.render(), n => ["check-fuel", "check-power"].includes(n.props.id)).length, 0);
  h.submit(); assert.equal(h.states[1].kind, "periodic"); h.reset();
  h.update({ region: "vlaanderen", device: "central" });
  assert.equal(h.field("fuel").props.value, "unknown");
  assert.equal(h.field("power").props.value, "unknown");
  h.update({ device: "gas-water-heater" }); assert.equal(h.states[0].fuel, "gas");
  h.reset(); h.update({ device: "central" });
  assert.equal(h.field("fuel").props.value, "unknown");
});

for (const [label, input, firstFocus] of [["valid", gas, "onderhoudsresultaat"], ["invalid", { ...gas, lastDate: "9999-01-01" }, "check-lastDate"]]) {
  test(`queued ${label} submit followed by reset finishes with committed empty state and first-field focus`, async () => {
    const h = await harness(); h.update(input); h.submit(false);
    assert.deepEqual(h.focuses, []); assert.equal(h.frames.length, 1);
    const eventsBefore = structuredClone(h.events); h.reset(false);
    assert.equal(h.frames.length, 2); assert.deepEqual(h.focuses, []);
    h.flush(); assert.deepEqual(h.focuses, [firstFocus, "check-region"]);
    assert.deepEqual({ ...h.states[0] }, defaults); assert.equal(h.states[1], null);
    assert.deepEqual(h.events, eventsBefore);
    assert.equal(beforeMaintenanceResetHtml(html(h.render())), f.before.defaultHtml);
  });
}

test("untouched frozen before capture and named reset inverses preserve complete source, SSR and source facts", async () => {
  assert.equal(hash(fixtureBytes), "3eb117da5c198eea35f0293c0e3d52f796bed3400c51acb955b6e09890ee6f17");
  assert.equal(hash(f.before.source), "5d51bb60e958dbdfe8414d2dd8f5e27e28cc2ddb28ef82479d729c462d71bec2");
  assert.equal(hash(f.before.defaultHtml), "31fd3dd50081b59bf2f672db48ae79613a7fdf811a9afa0f119332d2b3ffa450");
  const source = await readFile(new URL("../components/maintenance-check.js", import.meta.url), "utf8");
  assert.equal(beforeMaintenanceResetSource(source), f.before.source, "every byte of original calculate, update, source wording and handoff retained");
  assert.equal(beforeMaintenanceResetSource(f.before.source), f.before.source);
  assert.equal(beforeMaintenanceResetHtml(f.before.defaultHtml), f.before.defaultHtml);
  assert.equal(hash(pageRegistry), f.before.registrySha256);
  assert.equal(hash(pageRegistry.map(page => ({ path: page.path, metadata: buildPageMetadata(page) }))), f.before.metadataSha256);
  assert.equal(hash(buildSitemapEntries(pageRegistry)), f.before.sitemapSha256);
  assert.equal(hash(buildGlobalSchemaGraph()), f.before.globalSchemaSha256);
  assert.equal(hash(faultGuides), f.before.faultGuidesSha256);
  assert.equal(hash(await readFile(new URL("../content/business.mjs", import.meta.url))), f.before.businessSha256);
  assert.equal(hash(await readFile(new URL("../content/media.mjs", import.meta.url))), f.before.mediaSha256);
});

test("named inverses cannot hide wrong reset handlers, extra statements or unknown source/HTML changes", async () => {
  const source = await readFile(new URL("../components/maintenance-check.js", import.meta.url), "utf8");
  const compiled = await loadContactModule("components/maintenance-check.js", { "@/libs/maintenance-check.mjs": maintenance });
  const output = html(React.createElement(compiled.default));
  for (const [from, to] of [
    ["setInput(initialInput);", "setInput(input);"],
    ["    setInput(initialInput);", "    emit(\"maintenance_check_complete\", {});\n    setInput(initialInput);"],
    ["field?.focus({ preventScroll: true })", "field?.focus()"],
    ['block: "center"', 'block: "start"'],
    ["onClick={reset}", "onClick={submit}"],
    ["Wis mijn invoer", "Wrong reset"],
    ["noValidate>", "noValidate data-extra=\"drift\">"],
    ["Uw resultaat", "Unexpected result"],
  ]) {
    assert.ok(source.includes(from), from);
    assert.notEqual(hash(beforeMaintenanceResetSource(source.replace(from, to))), f.before.sourceSha256, from);
  }
  const alignedFrame = '    requestAnimationFrame(() => {\n      const field = firstField.current;\n      field?.focus({ preventScroll: true });\n      field?.scrollIntoView({ block: "center", behavior: "instant" });\n    });';
  assert.ok(source.includes(alignedFrame));
  const supersededNativeOnly = source.replace(alignedFrame, '    requestAnimationFrame(() => firstField.current?.focus());');
  assert.equal(hash(supersededNativeOnly), "003e32c8098c4a5f3b6c38ab522dfcfd37dc678be895b6459ebd0083b3087c7f");
  assert.notEqual(hash(beforeMaintenanceResetSource(supersededNativeOnly)), f.before.sourceSha256, "superseded native-only callback must survive the narrowed inverse");
  for (const [from, to] of [
    ['type="button"', 'type="submit"'], ['button button-secondary', 'button button-secondary extra'],
    ['Wis mijn invoer', 'Wrong reset'], ['class="button-row"', 'class="button-row" hidden=""'],
    ['Wis mijn invoer</button>', 'Wis mijn invoer<span>drift</span></button>'],
    ['Uw regel en planning verschijnen hier', 'Unexpected old heading'],
  ]) {
    assert.ok(output.includes(from), from);
    assert.notEqual(hash(beforeMaintenanceResetHtml(output.replace(from, to))), f.before.defaultHtmlSha256, from);
  }
});
