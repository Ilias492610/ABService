import { CONSENT_MAX_AGE, parseConsentCookie, serializeConsentCookie } from "./cookie-consent.mjs";

const subscriptions = new Set();
let temporaryDeny = false;
let hadAnalytics = false;
let snapshot = "loading";
let timer;
const inBrowser = () => typeof window !== "undefined" && typeof document !== "undefined";

export function readConsent() {
  let consent = null;
  if (inBrowser() && !temporaryDeny) {
    try { consent = parseConsentCookie(document.cookie, Date.now()); } catch { /* Unreadable is not permission. */ }
  }
  const analytics = consent?.analytics === true;
  if (hadAnalytics && !analytics) {
    // Deny is effective before touching only the SDK's known attribution key.
    hadAnalytics = false;
    try { window.localStorage.removeItem("__va_attribution"); } catch { /* Storage may be unavailable. */ }
  }
  hadAnalytics = analytics;
  return consent;
}

export function hasConsent(purpose) {
  if (purpose !== "analytics" && purpose !== "googlePhotos") return false;
  return readConsent()?.[purpose] === true;
}

export function getConsentSnapshot() {
  const consent = readConsent();
  if (!consent) return "unknown";
  if (consent.analytics && consent.googlePhotos) return "both";
  if (consent.analytics) return "analytics";
  if (consent.googlePhotos) return "googlePhotos";
  return "necessary";
}

export const getServerConsentSnapshot = () => "loading";

function refresh() {
  const next = getConsentSnapshot();
  const changed = next !== snapshot;
  snapshot = next;
  if (timer !== undefined) clearTimeout(timer);
  timer = undefined;
  const consent = readConsent();
  if (subscriptions.size && consent) {
    timer = setTimeout(refresh, Math.min(2147483647, Math.max(1, consent.decidedAt + CONSENT_MAX_AGE * 1000 - Date.now())));
  }
  if (changed) for (const subscription of [...subscriptions]) subscription.listener();
}

function onVisible() {
  if (document.visibilityState === "visible") refresh();
}

export function subscribeConsent(listener) {
  if (!inBrowser()) return () => {};
  if (!subscriptions.size) {
    snapshot = getConsentSnapshot();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", onVisible);
  }
  const subscription = {listener};
  subscriptions.add(subscription);
  refresh();
  return () => {
    subscriptions.delete(subscription);
    if (!subscriptions.size) {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVisible);
      if (timer !== undefined) clearTimeout(timer);
      timer = undefined;
    }
  };
}

export function saveConsent(preference) {
  if (!inBrowser()) return false;
  readConsent();
  temporaryDeny = true;
  let saved = false;
  try {
    const now = Date.now();
    const cookie = serializeConsentCookie(preference, now);
    document.cookie = cookie;
    const actual = parseConsentCookie(document.cookie, now);
    saved = actual?.decidedAt === now && actual.analytics === preference.analytics && actual.googlePhotos === preference.googlePhotos;
  } catch { /* A previous opt-in cannot rescue a failed save. */ }
  temporaryDeny = !saved;
  refresh();
  return saved;
}

export function requestConsentSettings() {
  if (!inBrowser()) return false;
  return !window.dispatchEvent(new Event("abservice:open-cookie-preferences", {cancelable:true}));
}
