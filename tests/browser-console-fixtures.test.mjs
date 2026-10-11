import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";

const moduleUrl = new URL("../scripts/lib/browser-console-fixtures.mjs", import.meta.url);
// Missing implementation is a feature assertion, not a masked import failure:
// once the file exists, any actual parse/import error must still fail the suite.
const exists = await access(moduleUrl).then(() => true, () => false);
const implementation = exists ? await import(moduleUrl) : {};
const expectedText = "Failed to load resource: the server responded with a status of 503 (Service Unavailable)";
const fixtureUrl = "https://www.abservice24.be/api/google-rating";
const guard = () => {
  assert.equal(typeof implementation.assertRatingFixtureConsole, "function", "Missing console-fixture guard");
  return implementation.assertRatingFixtureConsole;
};

test("an empty warning/error capture passes without inventing a provider result", () => {
  assert.doesNotThrow(() => guard()([], fixtureUrl));
});

for (const source of [fixtureUrl, "http://127.0.0.1:3186/api/google-rating"]) {
  test(`only the exact intercepted 503 resource diagnostic is allowed: ${source}`, () => {
    assert.doesNotThrow(() => guard()([
      { type: "error", source, text: expectedText },
      { type: "error", source, text: expectedText },
    ], source));
  });
}

for (const [name, message] of [
  ["console-only hydration error", { type: "error", source: fixtureUrl, text: "Hydration failed because the server rendered HTML did not match the client" }],
  ["recoverable warning", { type: "warning", source: fixtureUrl, text: expectedText }],
  ["another resource", { type: "error", source: "https://www.abservice24.be/_next/static/chunks/app.js", text: expectedText }],
  ["another origin", { type: "error", source: "https://example.org/api/google-rating", text: expectedText }],
  ["unintercepted query variant", { type: "error", source: `${fixtureUrl}?unexpected=1`, text: expectedText }],
  ["unknown diagnostic source", { type: "error", source: "", text: expectedText }],
  ["different status", { type: "error", source: fixtureUrl, text: expectedText.replace("503", "500") }],
  ["an incomplete diagnostic", { source: fixtureUrl }],
  ["a null diagnostic", null],
]) {
  test(`${name} fails rather than being silently recorded`, () => {
    assert.throws(() => guard()([message], fixtureUrl), /Unexpected browser console diagnostic/);
  });
}

test("a malformed diagnostic list cannot masquerade as an empty capture", () => {
  assert.throws(() => guard()(null, fixtureUrl), /Console diagnostic list must be an array/);
});
