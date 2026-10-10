import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createFormHarness, loadContactModule, syntheticInput } from "./helpers/contact-runtime.mjs";

const submitEvent = () => ({ preventDefault() {} });
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

test("server-rendered form sends native submissions by POST to the contact API", async () => {
  const { default: ContactForm } = await loadContactModule("components/sections/contact-form.js", {
    "next/link": ({ children }) => children,
    "@vercel/analytics": { track() {} },
  });
  const html = renderToStaticMarkup(React.createElement(ContactForm));
  assert.match(html, /<form[^>]*method="[Pp][Oo][Ss][Tt]"/);
  assert.match(html, /<form[^>]*action="\/api\/contact"/);
});

test("native status renders only allowlisted safe feedback before hydration", async () => {
  const { default: ContactForm } = await loadContactModule("components/sections/contact-form.js", {
    "next/link": ({ children }) => children,
    "@vercel/analytics": { track() {} },
  });
  const render = (nativeStatus) => renderToStaticMarkup(React.createElement(ContactForm, { nativeStatus }));
  assert.match(render("success"), /role="status"[^>]*>Uw aanvraag is verzonden/);
  assert.match(render("success"), /pas bevestigd na rechtstreeks contact/);
  assert.match(render("error"), /role="status"[^>]*>De aanvraag kon niet worden verzonden/);
  assert.doesNotMatch(render("private-marker"), /role="status"|private-marker/);
});

test("concurrent real submit-handler calls send one request and one success event", async () => {
  let resolveRequest;
  const requests = [];
  const harness = await createFormHarness((...args) => {
    requests.push(args);
    return new Promise((resolve) => { resolveRequest = resolve; });
  });
  const form = harness.fill(syntheticInput);
  const first = form.props.onSubmit(submitEvent());
  const second = form.props.onSubmit(submitEvent());
  assert.equal(requests.length, 1);
  resolveRequest(json({ ok: true }));
  await Promise.all([first, second]);
  assert.deepEqual(harness.events.map(({ name }) => name), ["contact_form_success"]);
  assert.equal(requests[0][0], "/api/contact");
  assert.equal(requests[0][1].method, "POST");
  assert.equal(JSON.parse(requests[0][1].body).email, "wp01@example.invalid");
});

for (const [label, fetchResponse] of [
  ["missing explicit acceptance", () => Promise.resolve(json({}))],
  ["false acceptance", () => Promise.resolve(json({ ok: false }))],
  ["non-JSON", () => Promise.resolve(new Response("not JSON"))],
  ["network failure", () => Promise.reject(new Error("provider-secret synthetic"))],
  ["HTTP failure", () => Promise.resolve(json({ error: "provider-secret synthetic" }, 500))],
]) {
  test(`${label} produces only a safe failure and releases the lock for retry`, async () => {
    let attempts = 0;
    const harness = await createFormHarness(() => ++attempts === 1 ? fetchResponse() : Promise.resolve(json({ ok: true })));
    await harness.fill(syntheticInput).props.onSubmit(submitEvent());
    assert.deepEqual(harness.events.map(({ name }) => name), ["contact_form_failure"]);
    assert.equal(harness.events[0].props.reason, "transport");
    assert.equal(harness.states[2].type, "error");
    assert.doesNotMatch(harness.states[2].message, /provider-secret|JSON|Unexpected/);
    assert.equal(harness.states[3], false);
    await harness.render().props.onSubmit(submitEvent());
    assert.equal(attempts, 2);
    assert.deepEqual(harness.events.map(({ name }) => name), ["contact_form_failure", "contact_form_success"]);
  });
}
