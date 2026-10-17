import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule, syntheticInput } from "./helpers/contact-runtime.mjs";
import { analyticsCookie } from "./helpers/consent-browser.mjs";
import * as business from "../content/business.mjs";
import * as media from "../content/media.mjs";
import * as seo from "../libs/seo-data.mjs";
import * as site from "../content/site-content.mjs";
import * as schema from "../libs/schema-data.mjs";

// Literal expectations catch missing categories or incorrect category selection.
const services = [
  "Onderhoud cv-ketel", "Herstelling verwarming", "Keuring cv-installatie",
  "Installatie gasketel", "Sanitair of loodgieterswerk", "Lekdetectie",
  "Waterlek herstellen", "Ontstopping", "Boiler plaatsen of herstellen",
  "Leidingen plaatsen of aanpassen", "Badkamerrenovatie", "Andere vraag",
];
const events = [];
const tracking = { track: (name, props) => events.push({ name, props }) };
const { default: ContactForm } = await loadContactModule("components/sections/contact-form.js", {
  "@vercel/analytics": tracking,
});
const { default: TrackedLink } = await loadContactModule("components/tracked-link.js", {
  "@vercel/analytics": tracking,
});
const { default: JsonLd } = await loadContactModule("components/json-ld.js");
const { default: Breadcrumbs } = await loadContactModule("components/breadcrumbs.js", {
  "@/components/json-ld": JsonLd, "@/libs/schema-data.mjs": schema,
});
const { default: ContentImage } = await loadContactModule("components/content-image.js", {
  "next/image": ({ priority: _priority, ...props }) => React.createElement("img", props),
});
const { default: PageHero } = await loadContactModule("components/page-hero.js", {
  "@/components/tracked-link": TrackedLink, "@/content/business.mjs": business,
});
const { default: ContactPage, metadata } = await loadContactModule("app/contact/page.js", {
  "@/components/breadcrumbs": Breadcrumbs,
  "@/components/content-image": ContentImage,
  "@/components/sections/contact-form": ContactForm,
  "@/components/page-hero": PageHero,
  "@/components/tracked-link": TrackedLink,
  "@/content/business.mjs": business, "@/content/media.mjs": media,
  "@/libs/seo-data.mjs": seo, "@/content/site-content.mjs": site,
});

const pageTree = (params) => ContactPage({ searchParams: Promise.resolve(params) });
const pageHtml = async (params) => renderToStaticMarkup(await pageTree(params));
const formHtml = (props) => renderToStaticMarkup(React.createElement(ContactForm, props));
const selected = (html) => {
  const select = html.match(/<select[^>]*name="service"[^>]*>([\s\S]*?)<\/select>/)?.[1];
  assert.ok(select, "real service select must render");
  const option = select.match(/<option([^>]*selected=""[^>]*)>([^<]*)<\/option>/);
  assert.ok(option, "one initial option must be selected");
  return /value=""/.test(option[1]) ? "" : option[2];
};
const find = (node, predicate) => {
  if (!React.isValidElement(node)) return undefined;
  if (predicate(node)) return node;
  for (const child of React.Children.toArray(node.props.children)) {
    const found = find(child, predicate);
    if (found) return found;
  }
};
const blankPrivateFields = (html) => {
  for (const name of ["name", "phone", "email", "address", "city", "postalCode", "brand", "boilerType"]) {
    assert.match(html, new RegExp(`<input[^>]*name="${name}"[^>]*value=""`), name);
  }
  assert.match(html, /<textarea[^>]*name="message"[^>]*><\/textarea>/);
  assert.doesNotMatch(html.match(/<input[^>]*name="consent"[^>]*>/)[0], /checked/);
};

for (const service of services) {
  test(`async contact page selects ${service} in initial HTML`, async () => {
    const html = await pageHtml({ dienst: service });
    assert.equal(selected(html), service);
    blankPrivateFields(html);
    assert.match(html, /<form[^>]*method="post"/);
    assert.match(html, /<form[^>]*action="\/api\/contact"/);
    assert.match(html, /id="aanvraagformulier"/);
  });
}

test("URL-decoded categories select once without normalizing or decoding again", async () => {
  for (const encoded of ["Onderhoud+cv-ketel", "Herstelling%20verwarming", "Sanitair%20of%20loodgieterswerk"]) {
    const params = Object.fromEntries(new URLSearchParams(`dienst=${encoded}`));
    const expected = { "Onderhoud+cv-ketel": "Onderhoud cv-ketel", "Herstelling%20verwarming": "Herstelling verwarming", "Sanitair%20of%20loodgieterswerk": "Sanitair of loodgieterswerk" }[encoded];
    assert.equal(selected(await pageHtml(params)), expected);
  }
  for (const dienst of [" Onderhoud cv-ketel", "Onderhoud cv-ketel ", "Onderhoud%20cv-ketel", "onderhoud cv-ketel"]) {
    assert.equal(selected(await pageHtml({ dienst })), "");
  }
});

test("absent, hostile, nonstring and duplicate categories remain blank without echo", async () => {
  for (const dienst of [undefined, "", "Unknown-private-marker", "constructor", "toString", "__proto__", "<script>private-marker</script>", "�%A", null, 2, true, { toString: () => "Lekdetectie" }, ["Lekdetectie"], ["Lekdetectie", "Lekdetectie"], ["Lekdetectie", "Andere vraag"]]) {
    const html = await pageHtml({ dienst });
    assert.equal(selected(html), "");
    assert.doesNotMatch(html, /private-marker|�%A/);
  }
  assert.equal(selected(await pageHtml(undefined)), "");
});

test("forged form props cannot seed or reflect an untrusted category", () => {
  for (const initialService of ["<private-marker>", "constructor", " Lekdetectie", ["Lekdetectie"], { toString: () => "Lekdetectie" }, null]) {
    const html = formHtml({ initialService });
    assert.equal(selected(html), "");
    assert.doesNotMatch(html, /private-marker/);
  }
  assert.equal(selected(formHtml({ initialService: "Lekdetectie" })), "Lekdetectie");
});

test("query intake data stays blank and only the public category crosses the page boundary", async () => {
  const params = { dienst: "Herstelling verwarming", name: "private-marker", email: "private-marker@example.invalid", phone: "private-marker", address: "private-marker", city: "private-marker", postalCode: "private-marker", brand: "private-marker", boilerType: "private-marker", message: "private-marker", lastDate: "2024-02-29", readings: "private-marker", context: "onderhoudscheck", region: "brussel", consent: "on" };
  const tree = await pageTree(params);
  const form = find(tree, (element) => element.type === ContactForm);
  assert.deepEqual(Object.keys(form.props).sort(), ["initialService", "nativeStatus"]);
  assert.equal(form.props.initialService, "Herstelling verwarming");
  const html = renderToStaticMarkup(tree);
  assert.equal(selected(html), "Herstelling verwarming");
  blankPrivateFields(html);
  assert.doesNotMatch(html, /private-marker|2024-02-29/);
  assert.deepEqual(events, []);
  assert.equal(metadata.alternates.canonical, "https://www.abservice24.be/contact");
});

test("native safe success and error retain the seeded category while other statuses are ignored", async () => {
  for (const [contact, expected] of [["success", /Uw aanvraag is verzonden/], ["error", /De aanvraag kon niet worden verzonden/]]) {
    const html = await pageHtml({ contact, dienst: "Lekdetectie" });
    assert.equal(selected(html), "Lekdetectie");
    assert.match(html, /role="status"/);
    assert.match(html, expected);
  }
  assert.match(await pageHtml({ contact: "success", dienst: "Lekdetectie" }), /pas bevestigd na rechtstreeks contact/);
  for (const contact of ["private-marker", ["success"], ["success", "success"], ["success", "error"]]) {
    const html = await pageHtml({ contact, dienst: "Lekdetectie" });
    assert.equal(selected(html), "Lekdetectie");
    assert.doesNotMatch(html, /role="status"|private-marker/);
  }
});

// Real form/module/parser/update handlers, with explicit hook/effect/queue controls.
// This tests initialization and races; it is not browser hydration evidence.
async function effectHarness(props = {}, href = "/contact", fetchResponse) {
  const states = [], refs = [], effects = [], microtasks = [], frames = [], intakeEvents = [], requests = [], replacements = [], scrolls = [];
  let stateIndex = 0, refIndex = 0, effectIndex = 0, currentProps = props;
  const hooks = {
    ...React,
    useState(initial) {
      const index = stateIndex++;
      if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial;
      return [states[index], (next) => { states[index] = typeof next === "function" ? next(states[index]) : next; }];
    },
    useRef(initial) { return refs[refIndex++] ||= { current: initial }; },
    useEffect(callback) {
      const index = effectIndex++;
      if (!(index in effects)) effects[index] = { callback };
    },
  };
  const location = new URL(href, "https://qa.example.invalid");
  const { default: Form } = await loadContactModule("components/sections/contact-form.js", {
    react: hooks, "@vercel/analytics": { track: (name, properties) => intakeEvents.push({ name, properties }) },
  }, {
    window: { location, history: { replaceState: (...args) => { replacements.push(args); location.href = new URL(args[2], location).href; } } },
    document: { cookie: analyticsCookie(), getElementById: (id) => id === "aanvraagformulier" ? { scrollIntoView: (options) => scrolls.push(options) } : null },
    queueMicrotask: (callback) => microtasks.push(callback), requestAnimationFrame: (callback) => frames.push(callback),
    fetch: (...args) => { requests.push(args); return fetchResponse?.(...args); },
  });
  const render = (nextProps = currentProps) => {
    currentProps = nextProps; stateIndex = 0; refIndex = 0; effectIndex = 0;
    return Form(currentProps);
  };
  const edit = (name, value) => {
    const control = find(render(), (element) => element.props.name === name);
    assert.ok(control, `real ${name} control exists`);
    control.props.onChange({ target: { name, type: name === "consent" ? "checkbox" : "text", checked: value, value } });
  };
  render();
  return {
    render, edit, states, intakeEvents, requests, replacements, scrolls,
    mount: () => { for (const effect of effects) effect.cleanup = effect.callback(); },
    cleanup: () => { for (const effect of effects) effect.cleanup?.(); },
    flushQueue: () => { while (microtasks.length) microtasks.shift()(); },
    flushFrames: () => { while (frames.length) frames.shift()(); },
  };
}

test("initial interactive state matches SSR and later props never reset manual choices", async () => {
  const harness = await effectHarness({ initialService: "Herstelling verwarming" }, "/contact?dienst=Herstelling+verwarming#aanvraagformulier");
  assert.equal(harness.states[0].service, "Herstelling verwarming");
  assert.equal(harness.states[0].service, selected(formHtml({ initialService: "Herstelling verwarming" })));
  harness.mount(); harness.flushQueue(); harness.flushFrames();
  harness.edit("service", "Andere vraag");
  harness.render({ initialService: "Lekdetectie" });
  assert.equal(harness.states[0].service, "Andere vraag");
  harness.edit("service", ""); harness.render({ initialService: "Onderhoud cv-ketel" });
  assert.equal(harness.states[0].service, "");
  assert.deepEqual(harness.intakeEvents, []);
  assert.deepEqual(harness.requests, []);
  assert.deepEqual(harness.replacements, []);
  assert.deepEqual(harness.scrolls, []);
});

test("ordinary query effects cannot resurrect rejected duplicates or overwrite an edit", async () => {
  for (const query of ["dienst=Lekdetectie&dienst=Lekdetectie", "dienst=Lekdetectie&dienst=Andere+vraag", "dienst=Lekdetectie"]) {
    const harness = await effectHarness({ initialService: "" }, `/contact?${query}#aanvraagformulier`);
    harness.mount(); harness.edit("service", ""); harness.flushQueue(); harness.flushFrames();
    assert.equal(harness.states[0].service, "");
    assert.deepEqual(harness.scrolls, []);
    assert.deepEqual(harness.intakeEvents, []);
    assert.deepEqual(harness.requests, []);
  }
});

const waterFragment = "#aanvraagformulier?dienst=Lekdetectie&context=watermetercheck&result=positive";
const waterMessage = "Watermetercheck: tijdens mijn gekozen periode is een verandering geregistreerd. Dit is een meterobservatie, geen bevestigd lek. Ik wil mogelijke verbruikers en een onverklaard verschil laten beoordelen.";

test("tool-only initial server HTML stays blank before client fragment processing", async () => {
  const url = new URL(`/contact${waterFragment}`, "https://qa.example.invalid");
  const html = await pageHtml(Object.fromEntries(url.searchParams));
  assert.equal(selected(html), "");
  blankPrivateFields(html);
  assert.doesNotMatch(html, /Watermetercheck:/);
});

test("untouched queued fragment overrides a query seed, cleans its fragment and scrolls", async () => {
  const harness = await effectHarness({ initialService: "Herstelling verwarming" }, `/contact?dienst=Herstelling+verwarming${waterFragment}`);
  harness.mount();
  harness.render().props.onFocus(); // Focus is not an edit.
  harness.flushQueue(); harness.flushFrames();
  assert.equal(harness.states[0].service, "Lekdetectie");
  assert.equal(harness.states[0].message, waterMessage);
  assert.equal(harness.states[0].name, "");
  assert.equal(harness.states[0].consent, false);
  assert.deepEqual(harness.replacements.map((args) => args[2]), ["/contact?dienst=Herstelling+verwarming#aanvraagformulier"]);
  assert.equal(harness.scrolls.length, 1);
  assert.equal(harness.scrolls[0].block, "start");
  assert.deepEqual(harness.intakeEvents.map(({ name }) => name), ["contact_form_start"]);
  assert.deepEqual(harness.requests, []);
});

for (const [label, edits, expectedService, expectedMessage] of [
  ["service edit", { service: "Andere vraag" }, "Andere vraag", waterMessage],
  ["deliberate blank service", { service: "" }, "", waterMessage],
  ["message edit", { message: "My own question" }, "Lekdetectie", "My own question"],
  ["deliberate blank message", { message: "" }, "Lekdetectie", ""],
  ["both edits", { service: "Andere vraag", message: "My own question" }, "Andere vraag", "My own question"],
  ["both deliberately blank", { service: "", message: "" }, "", ""],
]) {
  test(`queued fragment preserves ${label} individually using current state`, async () => {
    const harness = await effectHarness({ initialService: "Herstelling verwarming" }, `/contact${waterFragment}`);
    harness.mount();
    for (const [name, value] of Object.entries(edits)) harness.edit(name, value);
    harness.edit("name", "Manual name");
    harness.flushQueue(); harness.flushFrames();
    assert.equal(harness.states[0].service, expectedService);
    assert.equal(harness.states[0].message, expectedMessage);
    assert.equal(harness.states[0].name, "Manual name");
    assert.deepEqual(harness.intakeEvents, []);
    assert.deepEqual(harness.requests, []);
  });
}

test("fragment cleanup aborts queued work and StrictMode replacement runs only the active effect", async () => {
  const harness = await effectHarness({}, `/contact${waterFragment}`);
  harness.mount(); harness.cleanup(); harness.flushQueue(); harness.flushFrames();
  assert.equal(harness.states[0].service, "");
  assert.equal(harness.states[0].message, "");
  assert.deepEqual(harness.replacements, []); assert.deepEqual(harness.scrolls, []);
  harness.mount(); harness.cleanup(); harness.mount(); harness.flushQueue(); harness.flushFrames();
  assert.equal(harness.states[0].service, "Lekdetectie");
  assert.equal(harness.replacements.length, 1); assert.equal(harness.scrolls.length, 1);
  assert.deepEqual(harness.intakeEvents, []); assert.deepEqual(harness.requests, []);
});

test("cleanup after prefill cancels its scheduled scroll", async () => {
  const harness = await effectHarness({}, `/contact${waterFragment}`);
  harness.mount(); harness.flushQueue(); harness.cleanup(); harness.flushFrames();
  assert.equal(harness.states[0].service, "Lekdetectie");
  assert.deepEqual(harness.scrolls, []);
});

test("maintenance fragment retains safe message and never maps unknown or private fields", async () => {
  const harness = await effectHarness({}, "/contact#aanvraagformulier?dienst=Onderhoud+cv-ketel&context=onderhoudscheck&region=brussel&device=central&fuel=gas&power=unknown&changed=no&lastDate=2024-02-29&email=private-marker&message=private-marker&readings=private-marker&consent=true");
  harness.mount(); harness.flushQueue();
  assert.equal(harness.states[0].service, "Onderhoud cv-ketel");
  assert.equal(harness.states[0].message, "Ik wil mijn onderhoud bespreken. Onderhoudscheck: Brussel; Centrale verwarmingsketel; Gas; Vermogen onbekend; Geen recente wijziging gemeld. Laatste onderhoud volgens mijn invoer: 2024-02-29. Graag de vereisten en planning aan mijn installatie toetsen.");
  assert.equal(harness.states[0].email, ""); assert.equal(harness.states[0].consent, false);
  assert.doesNotMatch(JSON.stringify(harness.states[0]), /private-marker|readings/);
  assert.deepEqual(harness.intakeEvents, []); assert.deepEqual(harness.requests, []);
});

test("successful submission sends the seed then resets every field to blank without reseeding", async () => {
  const harness = await effectHarness({ initialService: "Herstelling verwarming" }, "/contact?dienst=Herstelling+verwarming", async () => new Response('{"ok":true}', { headers: { "Content-Type": "application/json" } }));
  harness.mount(); harness.flushQueue();
  for (const [name, value] of Object.entries({ ...syntheticInput, service: "Herstelling verwarming" })) harness.edit(name, value);
  await harness.render().props.onSubmit({ preventDefault() {} });
  assert.equal(harness.requests.length, 1);
  assert.equal(JSON.parse(harness.requests[0][1].body).service, "Herstelling verwarming");
  assert.equal(harness.states[2].type, "success");
  harness.render({ initialService: "Herstelling verwarming" });
  for (const [name, value] of Object.entries(harness.states[0])) assert.equal(value, name === "consent" ? false : "", name);
  assert.deepEqual(harness.intakeEvents.map(({ name }) => name), ["contact_form_success"]);
});
