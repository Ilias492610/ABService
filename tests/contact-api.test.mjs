import test from "node:test";
import assert from "node:assert/strict";
import { loadContactModule, syntheticInput } from "./helpers/contact-runtime.mjs";

async function route(sendEmail = async () => ({ id: "synthetic-id" })) {
  return loadContactModule("app/api/contact/route.js", {
    "@/config": { mailgun: { supportEmail: "recipient@example.invalid" } },
    "@/libs/mailgun": { sendEmail },
  }, { process: { env: {} }, console: { info() {}, error() {} } });
}

const request = (body, headers = {}) => new Request("https://qa.example.invalid/api/contact", {
  method: "POST", headers: { "Content-Type": "application/json", ...headers }, body,
});

for (const [label, body] of [["null", "null"], ["string", '"hello"'], ["number", "5"], ["boolean", "true"], ["array", "[]"], ["malformed", "{bad"]]) {
  test(`${label} JSON returns validation 400 and cannot invoke mail`, async () => {
    let calls = 0;
    const { POST } = await route(async () => { calls++; });
    const response = await POST(request(body));
    assert.equal(response.status, 400);
    assert.equal(calls, 0);
    assert.equal((await response.json()).ok, undefined);
  });
}

test("valid JSON submits the normalized contact details once", async () => {
  const sent = [];
  const { POST } = await route(async (message) => { sent.push(message); return { id: "synthetic-id" }; });
  const response = await POST(request(JSON.stringify({ ...syntheticInput, email: " WP01@EXAMPLE.INVALID ", secret: "must not forward" })));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].replyTo, "wp01@example.invalid");
  assert.doesNotMatch(sent[0].text, /must not forward/);
});

test("provider failure remains 500 without exposing provider internals", async () => {
  const { POST } = await route(async () => { throw new Error("secret vendor response"); });
  const response = await POST(request(JSON.stringify(syntheticInput)));
  assert.equal(response.status, 500);
  assert.doesNotMatch(await response.text(), /secret vendor/);
});

for (const outcome of ["success", "error"]) {
  test(`native ${outcome} redirects only to the same-origin allowlisted status and form anchor`, async () => {
    const { POST } = await route();
    for (const referer of ["https://qa.example.invalid/contact?email=private@example.invalid#extra", "https://qa.example.invalid/other?message=private", "https://other.example.invalid/contact?email=private"]) {
      const data = outcome === "success" ? syntheticInput : {};
      const body = new URLSearchParams({ ...data, consent: data.consent ? "on" : "" });
      const response = await POST(request(body, { "Content-Type": "application/x-www-form-urlencoded", "sec-fetch-mode": "navigate", referer }));
      assert.equal(response.status, 303);
      assert.equal(response.headers.get("location"), `https://qa.example.invalid/contact?contact=${outcome}#aanvraagformulier`);
    }
  });
}
