import test from "node:test";
import assert from "node:assert/strict";
import { loadContactModule } from "./helpers/contact-runtime.mjs";

const epoch = 1800000000000;
const until = 1815552000000;
const allow = "ab_service_consent=1.1800000000000.1.0";
const plain = value => JSON.parse(JSON.stringify(value));

async function browser(cookie = "") {
  let now = epoch;
  let value = cookie;
  let readError = false;
  let writeError = false;
  let normalize = false;
  let nextTimer = 0;
  const timers = new Map();
  const removed = [];
  const window = new EventTarget();
  window.localStorage = { removeItem: key => removed.push(key) };
  const document = new EventTarget();
  document.visibilityState = "visible";
  Object.defineProperty(document, "cookie", {
    get() { if (readError) throw Error("blocked read"); return value; },
    set(next) { if (writeError) throw Error("blocked write"); value = normalize ? allow : next.split(";")[0]; },
  });
  const store = await loadContactModule("libs/cookie-consent-store.mjs", {}, {
    document, window, Event,
    Date: { now: () => now },
    setTimeout: (callback, delay) => { const id = ++nextTimer; timers.set(id, {callback, delay}); return id; },
    clearTimeout: id => timers.delete(id),
  });
  return {store, window, document, removed, timers,
    cookie: next => { value = next; },
    errors: (read, write, normalization = false) => { readError = read; writeError = write; normalize = normalization; },
    time: next => { now = next; },
    tick() { const [id, timer] = timers.entries().next().value; timers.delete(id); timer.callback(); },
  };
}

test("analytics-only preference expires at exactly 180 days", async () => {
  const { parseConsentCookie } = await import("../libs/cookie-consent.mjs");
  assert.deepEqual(parseConsentCookie(allow, epoch), {version:1, decidedAt:epoch, analytics:true, googlePhotos:false});
  assert.equal(parseConsentCookie(allow, until), null);
  assert.equal(parseConsentCookie(allow, until - 1).analytics, true);
});

test("cookie parser fails closed on malformed, duplicate, future and unsafe times", async () => {
  const { parseConsentCookie } = await import("../libs/cookie-consent.mjs");
  for (const input of [undefined, null, "", "other=1", allow + "; " + allow,
    "ab_service_consent=2.1800000000000.1.0", "ab_service_consent=1.1800000000001.1.0",
    "ab_service_consent=1.-1.1.0", "ab_service_consent=1.1.5.1.0",
    "ab_service_consent=1.9007199254740992.1.0", "ab_service_consent=1.1800000000000.true.0",
    "ab_service_consent=1.1800000000000.1.0.extra", "ab_service_consent=1.01800000000000.1.0"]) {
    assert.equal(parseConsentCookie(input, epoch), null, String(input));
  }
  assert.equal(parseConsentCookie(allow, NaN), null);
  assert.equal(parseConsentCookie("irrelevant=a=b; " + allow, epoch).analytics, true);
});

test("serializer preserves two independent purposes and bounded host-only attributes", async () => {
  const { serializeConsentCookie, parseConsentCookie } = await import("../libs/cookie-consent.mjs");
  const serialized = serializeConsentCookie({analytics:false, googlePhotos:true}, epoch);
  assert.equal(serialized, "ab_service_consent=1.1800000000000.0.1; Max-Age=15552000; Path=/; SameSite=Lax; Secure");
  assert.deepEqual(parseConsentCookie(serialized, epoch), {version:1, decidedAt:epoch, analytics:false, googlePhotos:true});
  for (const preference of [{}, {analytics:1,googlePhotos:false}, {analytics:false,googlePhotos:"yes"}]) {
    assert.throws(() => serializeConsentCookie(preference, epoch), TypeError);
  }
  assert.throws(() => serializeConsentCookie({analytics:true,googlePhotos:false}, Infinity), TypeError);
});

test("SSR has no permissions or browser side effects", async () => {
  const store = await loadContactModule("libs/cookie-consent-store.mjs");
  assert.equal(store.getServerConsentSnapshot(), "loading");
  assert.equal(store.readConsent(), null);
  assert.equal(store.hasConsent("analytics"), false);
  assert.equal(store.saveConsent({analytics:true,googlePhotos:true}), false);
  assert.equal(store.requestConsentSettings(), false);
  store.subscribeConsent(() => {})();
});

test("save verifies exact read-back and photo permission does not imply analytics", async () => {
  const b = await browser();
  assert.equal(b.store.getConsentSnapshot(), "unknown");
  assert.equal(b.store.saveConsent({analytics:false,googlePhotos:true}), true);
  assert.equal(b.store.getConsentSnapshot(), "googlePhotos");
  assert.equal(b.store.hasConsent("analytics"), false);
  assert.equal(b.store.hasConsent("googlePhotos"), true);
  assert.equal(b.store.hasConsent("unknown"), false);
  assert.deepEqual(plain(b.store.readConsent()), {version:1,decidedAt:epoch,analytics:false,googlePhotos:true});
});

for (const mode of ["throw", "wrong-readback"]) {
  test("failed save blocks an old opt-in for this document: " + mode, async () => {
    const b = await browser(allow);
    assert.equal(b.store.hasConsent("analytics"), true);
    b.errors(false, mode === "throw", mode === "wrong-readback");
    assert.equal(b.store.saveConsent({analytics:false,googlePhotos:false}), false);
    assert.equal(b.store.hasConsent("analytics"), false);
    assert.equal(b.store.readConsent(), null);
    assert.deepEqual(b.removed, ["__va_attribution"]);
    b.errors(false, false);
    assert.equal(b.store.saveConsent({analytics:true,googlePhotos:false}), true);
    assert.equal(b.store.hasConsent("analytics"), true);
  });
}

test("read failures deny, and expiration closes synchronous gates without a render", async () => {
  const b = await browser(allow);
  assert.equal(b.store.hasConsent("analytics"), true);
  b.errors(true, false);
  assert.equal(b.store.hasConsent("analytics"), false);
  b.errors(false, false);
  assert.equal(b.store.hasConsent("analytics"), true);
  b.time(until);
  assert.equal(b.store.hasConsent("analytics"), false);
  assert.deepEqual(b.removed, ["__va_attribution", "__va_attribution"]);
});

test("subscription splits long expiry timers, publishes expiry and releases listeners", async () => {
  const b = await browser(allow);
  const seen = [];
  const stop = b.store.subscribeConsent(() => seen.push(b.store.getConsentSnapshot()));
  assert.equal(b.timers.size, 1);
  assert.equal([...b.timers.values()][0].delay, 2147483647);
  b.time(until);
  b.tick();
  assert.deepEqual(seen, ["unknown"]);
  assert.equal(b.timers.size, 0);
  stop();
  b.cookie(allow);
  b.time(epoch);
  b.window.dispatchEvent(new Event("focus"));
  assert.deepEqual(seen, ["unknown"]);
});

test("focus and visible return observe other-tab changes, with duplicate subscriptions cleaned", async () => {
  const b = await browser(allow);
  let calls = 0;
  const handler = () => calls++;
  const first = b.store.subscribeConsent(handler);
  const second = b.store.subscribeConsent(handler);
  b.cookie("ab_service_consent=1.1800000000000.0.1");
  b.window.dispatchEvent(new Event("focus"));
  assert.equal(calls, 2);
  assert.equal(b.store.getConsentSnapshot(), "googlePhotos");
  first();
  b.cookie("ab_service_consent=1.1800000000000.0.0");
  b.document.dispatchEvent(new Event("visibilitychange"));
  assert.equal(calls, 3);
  second();
  assert.equal(b.timers.size, 0);
  b.cookie(allow);
  b.window.dispatchEvent(new Event("focus"));
  assert.equal(calls, 3);
});

test("settings request reports handled only when a cancelable event is accepted", async () => {
  const b = await browser();
  assert.equal(b.store.requestConsentSettings(), false);
  b.window.addEventListener("abservice:open-cookie-preferences", event => event.preventDefault());
  assert.equal(b.store.requestConsentSettings(), true);
});
