import test from "node:test";
import assert from "node:assert/strict";
import * as reviews from "../libs/google-reviews.mjs";

const placeId = "ChIJ38_PKjPxw0cRMfEVYieHZDg";
const fixture = {
  id: placeId, displayName: { text: "AB SERVICE" }, rating: 4.7, userRatingCount: 44,
  googleMapsUri: "https://maps.google.com/?cid=4063521367014109489",
  reviews: [{ text: { text: "Not part of the small rating payload" } }],
};

test("rating payload uses the verified place score without review or credential data", () => {
  const normalize = reviews.normalizeGoogleRating || (() => undefined);
  assert.deepEqual(normalize(fixture, placeId), {
    rating: 4.7, userRatingCount: 44,
    googleMapsUri: "https://maps.google.com/?cid=4063521367014109489",
  });
});

test("rating payload rejects mismatched places and invalid scores instead of supplying a fallback score", () => {
  const normalize = reviews.normalizeGoogleRating || (() => undefined);
  for (const change of [{ id: "another-place" }, { rating: 9 }, { rating: null }, { rating: "4.7" }, { userRatingCount: null }, { userRatingCount: -1 }, { googleMapsUri: "javascript:alert(1)" }]) {
    assert.equal(normalize({ ...fixture, ...change }, placeId), null);
  }
});

test("rating requests coalesce in flight, retain no old score and enforce an instance request limit", async () => {
  const ratingModule = await import("../libs/google-rating.mjs").catch(() => ({}));
  assert.equal(typeof ratingModule.createRatingLoader, "function");
  let release;
  let calls = 0;
  const pending = new Promise((resolve) => { release = resolve; });
  const load = ratingModule.createRatingLoader({
    apiKey: "server-key", placeId, maxRequests: 1, windowMs: 60_000, now: () => 1_000,
    fetcher: async (_url, options) => {
      calls += 1;
      assert.equal(options.cache, "no-store");
      await pending;
      return { ok: true, json: async () => fixture };
    },
  });
  const first = load();
  const second = load();
  release();
  assert.deepEqual(await first, { rating: 4.7, userRatingCount: 44, googleMapsUri: fixture.googleMapsUri });
  assert.deepEqual(await second, await first);
  assert.equal(calls, 1);
  assert.equal(await load(), null);
});

test("rating loader recovers after upstream failure without returning an invented rating", async () => {
  const ratingModule = await import("../libs/google-rating.mjs").catch(() => ({}));
  assert.equal(typeof ratingModule.createRatingLoader, "function");
  let calls = 0;
  const load = ratingModule.createRatingLoader({ apiKey: "server-key", placeId,
    fetcher: async () => { calls += 1; return { ok: calls > 1, json: async () => fixture }; },
  });
  assert.equal(await load(), null);
  assert.equal((await load()).rating, 4.7);
  const missingKey = ratingModule.createRatingLoader({ placeId, fetcher: async () => { throw new Error("Must not call Google"); } });
  assert.equal(await missingKey(), null);
});
