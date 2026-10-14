import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import * as maintenance from "../libs/maintenance-check.mjs";
import { readContactContext } from "../libs/contact-context.mjs";
import { pageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { buildGlobalSchemaGraph } from "../libs/schema-data.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { beforeMaintenanceSubmitFocusSource } from "./fixtures/maintenance-submit-focus-history.mjs";

const bytes = await readFile(new URL("./fixtures/maintenance-submit-focus-facts.json", import.meta.url));
const f = JSON.parse(bytes);
const hash = value => createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest("hex");
const defaults = { region: "unknown", device: "unknown", fuel: "unknown", power: "unknown", lastDate: "", changed: "unknown" };
const gas = { region: "vlaanderen", device: "central", fuel: "gas", power: "atleast20", changed: "no", lastDate: "2024-05-12" };
const nodes = (tree, predicate) => Array.isArray(tree) ? tree.flatMap(child => nodes(child, predicate))
  : !React.isValidElement(tree) ? [] : [...(predicate(tree) ? [tree] : []), ...nodes(tree.props.children, predicate)];
const html = tree => renderToStaticMarkup(tree);

// Complete real SWC component, React elements, Next Link, kernel, contact
// builder/parser and analytics builder. Hooks host committed state and refs;
// frame/DOM-method/transport boundaries record calls, never browser geometry/AT.
async function harness() {
  const states = [], refs = [], pending = [], frames = [], movements = [], events = [];
  let stateIndex = 0, refIndex = 0, tree;
  const hooks = { ...React,
    useState(initial) {
      const index = stateIndex++;
      if (!(index in states)) states[index] = initial;
      return [states[index], next => pending.push(() => { states[index] = typeof next === "function" ? next(states[index]) : next; })];
    },
    useRef(initial) { const index = refIndex++; return refs[index] ||= { current: initial }; },
  };
  const forbid = () => { throw new Error("submit focus must not write externally or navigate"); };
  const target = id => ({
    focus: options => movements.push({ action: "focus", id, options: options === undefined ? undefined : { ...options } }),
    scrollIntoView: options => movements.push({ action: "scroll", id, options: { ...options } }),
  });
  const compiled = await loadContactModule("components/maintenance-check.js", {
    react: hooks, "@/libs/maintenance-check.mjs": maintenance,
    "@vercel/analytics": { track: (name, props) => events.push({ name, props: { ...props } }) },
  }, {
    requestAnimationFrame: callback => frames.push(callback), fetch: forbid,
    localStorage: { setItem: forbid, removeItem: forbid, clear: forbid },
    sessionStorage: { setItem: forbid, removeItem: forbid, clear: forbid },
    window: { location: { assign: forbid, replace: forbid }, localStorage: { setItem: forbid }, sessionStorage: { setItem: forbid } },
    document: { getElementById: id => nodes(tree, node => node.props.id === id).length ? target(id) : null },
  });
  const render = () => {
    while (pending.length) pending.shift()();
    stateIndex = 0; refIndex = 0;
    tree = compiled.default();
    for (const node of nodes(tree, node => node.props.ref)) node.props.ref.current = target(node.props.id);
    return tree;
  };
  const field = name => {
    const node = nodes(render(), n => n.props.id === `check-${name}`)[0];
    assert.ok(node, `real visible ${name} field`); return node;
  };
  const update = values => {
    for (const [name, value] of Object.entries(values)) field(name).props.onChange({ target: { name, value } });
    return render();
  };
  const flush = () => { while (frames.length) frames.shift()(); };
  const submit = () => {
    let prevented = false;
    nodes(render(), node => node.type === "form")[0].props.onSubmit({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true); return render();
  };
  const reset = () => {
    const button = nodes(render(), node => node.type === "button" && node.props.children === "Wis mijn invoer")[0];
    assert.equal(button.props.type, "button"); button.props.onClick(); return render();
  };
  render();
  return { render, update, submit, reset, flush, states, frames, refs, movements, events, target };
}

const cases = [
  ["periodic", gas, "Doorgaans om de twee jaar", "Onderhoud cv-ketel"],
  ["unknown", {}, "Welk gewest geldt voor uw woning?", "Andere vraag"],
  ["inspection", { ...gas, changed: "yes" }, "Controleer eerst de ingebruikname of wijziging", "Keuring cv-installatie"],
  ["recommended", { ...gas, power: "below20" }, "Onderhoud blijft aanbevolen", "Onderhoud cv-ketel"],
  ["outside-scope", { region: "vlaanderen", device: "electric", changed: "no", lastDate: "2024-05-12" }, "Volg de toestelspecifieke onderhoudsinstructies", "Andere vraag"],
];
for (const [kind, input, title, service] of cases) test(`real ${kind} submit focuses committed result without native scroll then aligns start instantly, resets and repeats`, async () => {
  // Wrong target, no focus/scroll, native options, wrong ordering/block/behavior fail.
  const h = await harness();
  for (let repeat = 0; repeat < 2; repeat++) {
    h.update(input); const tree = h.submit();
    assert.equal(h.states[1].kind, kind);
    const panel = nodes(tree, node => node.props.id === "onderhoudsresultaat")[0];
    assert.equal(nodes(panel, node => node.type === "h2")[0].props.children, title);
    assert.equal(panel.props.tabIndex, -1); assert.equal(panel.props.role, "status");
    assert.equal(panel.props["aria-live"], "polite"); assert.equal(panel.props["aria-atomic"], "true");
    assert.deepEqual(h.movements, [], "no movement before committed frame");
    assert.equal(h.frames.length, 1);
    assert.deepEqual(h.events.at(-1), { name: "maintenance_check_complete", props: { location: "maintenance_check", region: input.region ?? "unknown", result: kind } });
    assert.equal(h.events.length, repeat * 2 + 1, "one completion per submission; reset adds none");
    h.flush();
    assert.deepEqual(h.movements, [
      { action: "focus", id: "onderhoudsresultaat", options: { preventScroll: true } },
      { action: "scroll", id: "onderhoudsresultaat", options: { block: "start", behavior: "instant" } },
    ]);
    assert.equal(nodes(tree, node => node.type === "time").length, kind === "periodic" ? 1 : 0);
    if (kind === "periodic") assert.match(html(tree), /dateTime="2026-05-12"/i);
    const links = nodes(tree, node => node.props.href?.startsWith("/contact"));
    assert.equal(links.length, 1);
    const url = new URL(links[0].props.href, "https://www.abservice24.be");
    assert.equal(url.pathname, "/contact"); assert.equal(url.search, "");
    const context = readContactContext({ hash: url.hash });
    assert.equal(context.service, service);
    if (input.lastDate) assert.match(context.message, /2024-05-12/);
    links[0].props.onClick();
    assert.deepEqual(h.events.at(-1), { name: "tool_enquiry_click", props: { location: "maintenance_check", region: input.region ?? "unknown", result: kind, service } });
    h.movements.length = 0;
    const eventsBeforeReset = structuredClone(h.events);
    assert.equal(html(h.reset()), f.before.defaultHtml);
    assert.deepEqual({ ...h.states[0] }, defaults); assert.equal(h.states[1], null);
    assert.deepEqual(h.movements, []); h.flush();
    assert.deepEqual(h.movements, [
      { action: "focus", id: "check-region", options: { preventScroll: true } },
      { action: "scroll", id: "check-region", options: { block: "center", behavior: "instant" } },
    ]);
    assert.deepEqual(h.events, eventsBeforeReset); h.movements.length = 0;
  }
  for (const event of h.events) assert.doesNotMatch(JSON.stringify(event), /2024-05-12|lastDate/);
});

test("real invalid date keeps scheduled native date focus, descriptions and no forced result scroll", async () => {
  const h = await harness(); h.update({ ...gas, lastDate: "9999-01-01" }); const tree = h.submit();
  assert.equal(h.states[1].kind, "invalid"); assert.deepEqual(h.movements, []);
  const date = nodes(tree, node => node.props.id === "check-lastDate")[0];
  assert.equal(date.props["aria-invalid"], true);
  assert.equal(date.props["aria-describedby"], "check-date-note check-date-error");
  assert.equal(nodes(tree, node => node.props.id === "check-date-error").length, 1);
  assert.equal(nodes(tree, node => node.props.href?.startsWith("/contact") || node.type === "time").length, 0);
  h.flush(); assert.deepEqual(h.movements, [{ action: "focus", id: "check-lastDate", options: undefined }]);
  assert.deepEqual(h.events, [{ name: "maintenance_check_complete", props: { location: "maintenance_check", region: "vlaanderen", result: "invalid" } }]);
});

for (const [label, input] of [["periodic", gas], ["invalid", { ...gas, lastDate: "9999-01-01" }]]) test(`queued ${label} submit then reset retains final empty state and first-field alignment`, async () => {
  const h = await harness(); h.update(input); h.submit(); h.reset();
  assert.deepEqual(h.movements, []); assert.equal(h.frames.length, 2); h.flush();
  assert.deepEqual(h.movements, label === "invalid" ? [
    { action: "focus", id: "check-lastDate", options: undefined },
    { action: "focus", id: "check-region", options: { preventScroll: true } },
    { action: "scroll", id: "check-region", options: { block: "center", behavior: "instant" } },
  ] : [
    { action: "focus", id: "onderhoudsresultaat", options: { preventScroll: true } },
    { action: "scroll", id: "onderhoudsresultaat", options: { block: "start", behavior: "instant" } },
    { action: "focus", id: "check-region", options: { preventScroll: true } },
    { action: "scroll", id: "check-region", options: { block: "center", behavior: "instant" } },
  ]);
  assert.deepEqual({ ...h.states[0] }, defaults); assert.equal(h.states[1], null);
  assert.equal(html(h.render()), f.before.defaultHtml); assert.equal(h.events.length, 1);
});

test("scheduled result reads the current committed ref and safely ignores a detached null ref", async () => {
  // Capturing the pre-frame target or dropping optional guards fails.
  for (const detached of [false, true]) {
    const h = await harness(); h.update(gas); h.submit();
    h.refs[0].current = detached ? null : h.target("replacement-result");
    assert.doesNotThrow(h.flush);
    assert.deepEqual(h.movements, detached ? [] : [
      { action: "focus", id: "replacement-result", options: { preventScroll: true } },
      { action: "scroll", id: "replacement-result", options: { block: "start", behavior: "instant" } },
    ]);
  }
});

test("independent frozen actual before preserves complete source and raw default SSR plus source and publication facts", async () => {
  assert.equal(hash(bytes), "60f5e9840c727bca1b894bdceb9d8c13641a628410e6dc146b782555aa17d196");
  assert.equal(hash(f.before.source), "00807b345ffc829eb10f5f1245c510106149a7df7696d0f556c94fda57bc075e");
  assert.equal(hash(f.before.defaultHtml), "d1f533c50127382aeb89cd81daa1cca6397a8bb91440099c685378450256f0eb");
  const source = await readFile(new URL("../components/maintenance-check.js", import.meta.url), "utf8");
  assert.equal(beforeMaintenanceSubmitFocusSource(source), f.before.source);
  assert.equal(beforeMaintenanceSubmitFocusSource(f.before.source), f.before.source);
  const compiled = await loadContactModule("components/maintenance-check.js", { "@/libs/maintenance-check.mjs": maintenance });
  assert.equal(html(React.createElement(compiled.default)), f.before.defaultHtml);
  assert.equal(hash(pageRegistry), f.before.registrySha256);
  assert.equal(hash(pageRegistry.map(page => ({ path: page.path, metadata: buildPageMetadata(page) }))), f.before.metadataSha256);
  assert.equal(hash(buildSitemapEntries(pageRegistry)), f.before.sitemapSha256);
  assert.equal(hash(buildGlobalSchemaGraph()), f.before.globalSchemaSha256);
  assert.equal(hash(faultGuides), f.before.faultGuidesSha256);
  for (const [path, key] of [["content/business.mjs", "businessSha256"], ["content/media.mjs", "mediaSha256"], ["libs/maintenance-check.mjs", "maintenanceKernelSha256"], ["app/globals.css", "cssSha256"]]) {
    assert.equal(hash(await readFile(new URL(`../${path}`, import.meta.url))), f.before[key], path);
  }
});

test("exact submit inverse leaves wrong options, missing actions, extra statements, branches and unrelated reset drift intact", async () => {
  const source = await readFile(new URL("../components/maintenance-check.js", import.meta.url), "utf8");
  for (const [from, to] of [
    ['panel?.focus({ preventScroll: true });', 'panel?.focus();'],
    ['panel?.focus({ preventScroll: true });', ''],
    ['panel?.scrollIntoView({ block: "start", behavior: "instant" });', ''],
    ['block: "start", behavior: "instant"', 'block: "center", behavior: "instant"'],
    ['block: "start", behavior: "instant"', 'block: "start", behavior: "smooth"'],
    ['const panel = resultPanel.current;', 'const panel = firstField.current;'],
    ['if (next.kind === "invalid")', 'if (next.kind !== "invalid")'],
    ['const panel = resultPanel.current;', 'emit("unexpected", {});\n        const panel = resultPanel.current;'],
    ['setInput(initialInput);', 'setInput(input);'],
    ['field?.focus({ preventScroll: true });', 'field?.focus();'],
    ['Uw resultaat', 'Unexpected result'],
  ]) {
    assert.ok(source.includes(from), from);
    assert.notEqual(hash(beforeMaintenanceSubmitFocusSource(source.replace(from, to))), f.before.sourceSha256, from);
  }
});
