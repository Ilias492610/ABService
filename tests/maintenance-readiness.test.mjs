import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import { beforeCookieConsentSource } from "./fixtures/cookie-consent-history.mjs";
import * as maintenance from "../libs/maintenance-check.mjs";
import { beforeMaintenanceReadinessSource, beforeMaintenanceReadinessHtml } from "./fixtures/maintenance-readiness-history.mjs";

const bytes = await readFile(new URL("./fixtures/maintenance-readiness-facts.json", import.meta.url));
const f = JSON.parse(bytes);
const hash = value => createHash("sha256").update(value).digest("hex");
const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/node-html-parser");
const nodes = (tree, predicate) => Array.isArray(tree) ? tree.flatMap(child => nodes(child, predicate))
  : !React.isValidElement(tree) ? [] : [...(predicate(tree) ? [tree] : []), ...nodes(tree.props.children, predicate)];
const html = tree => renderToStaticMarkup(tree);
const gas = { region: "vlaanderen", device: "central", fuel: "gas", power: "atleast20", changed: "no", lastDate: "2024-05-12" };

// Complete production module, React elements, Next Link and real kernel/context/
// analytics builder. Hosted hooks expose supplied callbacks; transport and frames
// are boundaries. This is not real hydration, event replay, native pixels or JS-off.
async function hosted(mode) {
  const states = [], refs = [], snapshots = [];
  let stateIndex = 0, refIndex = 0;
  const hooks = { ...React,
    useState(initial) {
      const index = stateIndex++;
      if (!(index in states)) states[index] = initial;
      return [states[index], next => { states[index] = typeof next === "function" ? next(states[index]) : next; }];
    },
    useRef(initial) { return refs[refIndex++] ||= { current: initial }; },
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
      snapshots.push({ subscribe, getSnapshot, getServerSnapshot });
      return mode === "pending" ? getServerSnapshot() : getSnapshot();
    },
  };
  const compiled = await loadContactModule("components/maintenance-check.js", {
    react: hooks, "@/libs/maintenance-check.mjs": maintenance,
    "@vercel/analytics": { track() {} },
  }, { requestAnimationFrame() {} });
  const render = () => { stateIndex = 0; refIndex = 0; return compiled.default(); };
  return { render, states, snapshots };
}

function availability(output, disabled, selects) {
  const dom = parse(output), form = dom.querySelector("form");
  const fieldsets = form.querySelectorAll("fieldset");
  assert.equal(fieldsets.length, 1, "one readiness barrier");
  const fieldset = fieldsets[0];
  assert.equal(fieldset.getAttribute("aria-label"), "Gegevens van de onderhoudscheck");
  assert.equal(fieldset.hasAttribute("disabled"), disabled, "actual consumer readiness");
  assert.equal(fieldset.querySelectorAll("legend input, legend select, legend button").length, 0);
  assert.equal(fieldset.querySelectorAll("select").length, selects);
  assert.equal(fieldset.querySelectorAll('input[type="date"]').length, 1);
  assert.equal(fieldset.querySelectorAll("button").length, 2);
  const controls = form.querySelectorAll("input, select, button");
  assert.equal(controls.length, selects + 3);
  for (const control of controls) {
    assert.ok(fieldset.querySelectorAll("input, select, button").includes(control), "every native control is contained");
    for (let element = control; element?.tagName; element = element.parentNode) {
      assert.equal(element.hasAttribute("hidden"), false);
      assert.equal(element.hasAttribute("inert"), false);
      assert.notEqual(element.getAttribute("aria-hidden"), "true");
    }
  }
  for (const button of fieldset.querySelectorAll("button")) assert.equal(button.hasAttribute("disabled"), disabled, "explicit button readiness");
  assert.deepEqual(fieldset.querySelectorAll("button").map(button => [button.getAttribute("type"), button.textContent]),
    [["submit", "Bekijk mijn onderhoudsregel"], ["button", "Wis mijn invoer"]]);
  assert.equal(form.querySelectorAll("noscript").length, 1);
  assert.equal(fieldset.querySelectorAll("noscript").length, 0);
  const fallback = form.querySelector("noscript");
  const fallbackContent = parse(fallback.innerHTML);
  assert.equal(fallbackContent.textContent, "JavaScript is nodig voor de lokale berekening in uw browser. De invoer en beide knoppen zijn uitgeschakeld. Lees hieronder de onderhoudsregels, voorbereiding en officiële bronnen.");
  assert.equal(fallbackContent.querySelector("p").getAttribute("class"), "warning-box");
  return dom;
}

// Mutation: serverReady=true, missing/wrong wrapper or disabled buttons/fallback.
test("initial actual SSR supplies the local calculation noscript guidance", async () => {
  // Mutation: removing the useful fallback while leaving the barrier intact.
  const compiled = await loadContactModule("components/maintenance-check.js", { "@/libs/maintenance-check.mjs": maintenance });
  const dom = parse(html(React.createElement(compiled.default)));
  assert.equal(dom.querySelectorAll("noscript").length, 1, "useful no-script fallback exists");
  assert.match(dom.querySelector("noscript").textContent, /JavaScript is nodig voor de lokale berekening in uw browser/);
});

test("initial real React SSR disables every native control and supplies useful fallback without result CTA", async () => {
  const compiled = await loadContactModule("components/maintenance-check.js", { "@/libs/maintenance-check.mjs": maintenance });
  const output = html(React.createElement(compiled.default));
  const dom = availability(output, true, 3);
  assert.equal(dom.querySelectorAll('a[href^="/contact"], time, #check-date-error').length, 0);
  assert.equal(beforeMaintenanceReadinessHtml(output), f.before.defaultHtml, "entire initial SSR preserved");
});

// Mutation: serverReady=true or false barrier props during the pending host.
test("pending hosted server snapshot keeps the same complete initial barrier", async () => {
  const h = await hosted("pending");
  const output = html(h.render());
  availability(output, true, 3);
  assert.equal(beforeMaintenanceReadinessHtml(output), f.before.defaultHtml);
});

// Mutation: clientReady=false, always-disabled props or controls outside wrapper.
test("ready hosted actual client snapshot enables default and all conditional gas controls", async () => {
  const h = await hosted("ready");
  let tree = h.render(); availability(html(tree), false, 3);
  assert.equal(beforeMaintenanceReadinessHtml(html(tree)), f.before.defaultHtml);
  for (const [name, value] of Object.entries(gas)) {
    tree = h.render(); availability(html(tree), false, ["fuel", "power"].every(key => nodes(tree, n => n.props.name === key).length) ? 5 : 3);
    const field = nodes(tree, n => n.props.name === name)[0];
    assert.ok(field, name); field.props.onChange({ target: { name, value } });
  }
  tree = h.render(); availability(html(tree), false, 5);
  nodes(tree, n => n.type === "form")[0].props.onSubmit({ preventDefault() {} });
  assert.equal(h.states[1].kind, "periodic", "actual real kernel remains usable");
  assert.match(html(h.render()), /datetime="2026-05-12"/i);
});

// Mutation: wrong supplied callbacks or per-render callback recreation.
test("supplied client and server snapshots are independent and subscription is stable with callable cleanup", async () => {
  const h = await hosted("ready"); h.render(); h.render();
  assert.equal(h.snapshots.length, 2, "actual component invokes readiness hook once per render");
  const [first, second] = h.snapshots;
  assert.equal(first.getSnapshot(), true); assert.equal(first.getServerSnapshot(), false);
  for (const key of ["subscribe", "getSnapshot", "getServerSnapshot"]) assert.equal(first[key], second[key]);
  let notifications = 0;
  const unsubscribe = first.subscribe(() => notifications++);
  assert.equal(typeof unsubscribe, "function");
  assert.doesNotThrow(() => { unsubscribe(); unsubscribe(); });
  assert.equal(notifications, 0);
});

// Mutation: unrelated source/HTML drift hidden by over-broad historical inverse.
test("exact immutable actual-before source and HTML recover while unknown mutations survive", async () => {
  assert.equal(bytes.length, 11286);
  assert.equal(hash(bytes), "39517e61dec105776aefcd800ac4bf4d19c75bd3cd457a3852648c5b0c85dd2a");
  assert.equal(hash(f.before.source), "70736cfd17e9db59276f54db61af9addcf9042299972c35b47c226e757ab1b56");
  assert.equal(hash(f.before.defaultHtml), "d1f533c50127382aeb89cd81daa1cca6397a8bb91440099c685378450256f0eb");
  const source = beforeCookieConsentSource(await readFile(new URL("../components/maintenance-check.js", import.meta.url), "utf8"), "components/maintenance-check.js");
  assert.equal(beforeMaintenanceReadinessSource(source), f.before.source);
  assert.equal(beforeMaintenanceReadinessSource(f.before.source), f.before.source);
  assert.equal(beforeMaintenanceReadinessHtml(f.before.defaultHtml), f.before.defaultHtml);
  for (const [from, to] of [
    ["const serverReady = () => false;", "const serverReady = () => true;"],
    ["const clientReady = () => true;", "const clientReady = () => false;"],
    ["const subscribe = () => () => {};", "const subscribe = () => () => { console.log(1); };"],
    ['aria-label="Gegevens van de onderhoudscheck"', 'aria-label="Wrong name"'],
    ["<fieldset disabled={!ready}", "<fieldset disabled={!ready} data-extra=\"drift\""],
    ["onClick={reset}", "onClick={submit}"],
    ["Kies een gewest", "Wrong choice"],
    ["setInput(initialInput);", "setInput(input);"],
    ['timeZone: "Europe/Brussels"', 'timeZone: "UTC"'],
    ["const ready = useSyncExternalStore", "console.log(1);\n  const ready = useSyncExternalStore"],
  ]) {
    assert.ok(source.includes(from), from);
    assert.notEqual(beforeMaintenanceReadinessSource(source.replace(from, to)), f.before.source, from);
  }
  const compiled = await loadContactModule("components/maintenance-check.js", { "@/libs/maintenance-check.mjs": maintenance });
  const output = html(React.createElement(compiled.default));
  assert.equal(beforeMaintenanceReadinessHtml(output), f.before.defaultHtml);
  for (const [from, to] of [
    ['<fieldset disabled=""', '<fieldset disabled="" data-extra="drift"'],
    ['aria-label="Gegevens van de onderhoudscheck"', 'aria-label="Wrong name"'],
    ['class="button" disabled=""', 'class="button" disabled="" data-extra="drift"'],
    ["type=\"button\"", "type=\"submit\""],
    ["Kies een gewest", "Wrong choice"],
    ["Lees hieronder de onderhoudsregels", "Wrong guidance"],
  ]) {
    assert.ok(output.includes(from), from);
    assert.notEqual(beforeMaintenanceReadinessHtml(output.replace(from, to)), f.before.defaultHtml, from);
  }
});
