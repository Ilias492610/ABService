import { CONTACT_SERVICES } from "./contact-validation.mjs";

export const ANALYTICS_EVENTS = Object.freeze([
  "phone_click",
  "email_click",
  "whatsapp_click",
  "contact_form_start",
  "contact_form_success",
  "contact_form_failure",
  "service_cta_click",
  "google_profile_click",
  "maintenance_check_complete",
  "water_meter_check_complete",
  "tool_enquiry_click",
]);

const allowedValues = {
  service: new Set([...CONTACT_SERVICES, "Onderhoud", "Herstelling"]),
  location: new Set(["header", "navigation", "hero", "footer", "cta", "contact_aside", "contact_page", "floating_button", "floating_rating", "homepage_reviews", "maintenance_check", "water_meter_check", "advice_page", "service_page", "fault_guide"]),
  reason: new Set(["validation", "transport"]),
  region: new Set(["vlaanderen", "brussel", "other", "unknown"]),
  result: new Set(["periodic", "recommended", "unknown", "outside-scope", "inspection", "invalid", "observation", "unsafe"]),
};
const waterValues = {
  location: new Set(["water_meter_check"]),
  result: new Set(["observation", "unknown", "unsafe", "invalid"]),
};

export const sanitizeAnalyticsEvent = (event) => {
  try {
    const url = new URL(event.url);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
};

export const buildAnalyticsEvent = (name, properties = {}) => {
  if (!ANALYTICS_EVENTS.includes(name)) {
    throw new Error(`Unsupported analytics event: ${name}`);
  }

  const values = name === "water_meter_check_complete" ? waterValues : allowedValues;
  const props = Object.fromEntries(
    Object.entries(properties).filter(
      ([key, value]) => typeof value === "string" && Object.hasOwn(values, key) && values[key].has(value)
    )
  );

  return { name, props };
};
