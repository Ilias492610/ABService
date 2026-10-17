import { track } from "@vercel/analytics";
import { buildAnalyticsEvent, sanitizeAnalyticsEvent } from "@/libs/analytics.mjs";
import { hasConsent } from "@/libs/cookie-consent-store.mjs";

export function trackWithConsent(name, properties = {}) {
  if (!hasConsent("analytics")) return false;
  const event = buildAnalyticsEvent(name, properties);
  track(event.name, event.props);
  return true;
}

export function beforeSendWithConsent(event) {
  if (!hasConsent("analytics")) return null;
  return sanitizeAnalyticsEvent(event);
}
