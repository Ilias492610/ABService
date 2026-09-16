export const ANALYTICS_EVENTS = Object.freeze([
  "phone_click",
  "email_click",
  "whatsapp_click",
  "contact_form_start",
  "contact_form_success",
  "contact_form_failure",
  "service_cta_click",
  "google_profile_click",
]);

const allowedProperties = new Set(["service", "location", "destination", "reason"]);

export const buildAnalyticsEvent = (name, properties = {}) => {
  if (!ANALYTICS_EVENTS.includes(name)) {
    throw new Error(`Unsupported analytics event: ${name}`);
  }

  const props = Object.fromEntries(
    Object.entries(properties).filter(
      ([key, value]) => allowedProperties.has(key) && typeof value === "string" && value
    )
  );

  return { name, props };
};
