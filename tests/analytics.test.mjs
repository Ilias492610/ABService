import test from "node:test";
import assert from "node:assert/strict";

import { buildAnalyticsEvent } from "../libs/analytics.mjs";
import * as analytics from "../libs/analytics.mjs";

test("analytics events retain context but discard personal data", () => {
  const event = buildAnalyticsEvent("contact_form_success", {
    service: "Herstelling",
    location: "contact_page",
    email: "jan@example.be",
    name: "Jan",
    phone: "0484906966",
    message: "Privébericht",
  });

  assert.deepEqual(event, {
    name: "contact_form_success",
    props: { service: "Herstelling", location: "contact_page" },
  });
});

test("analytics rejects unknown event names", () => {
  assert.throws(
    () => buildAnalyticsEvent("customer_email", { location: "footer" }),
    /Unsupported analytics event/
  );
});

test("analytics strips private query and fragment values from page views and custom events", () => {
  const redact = analytics.sanitizeAnalyticsEvent || (() => undefined);
  for (const type of ["pageview", "event"]) {
    assert.deepEqual(redact({ type, url: "https://www.abservice24.be/contact?email=jan%40example.be&token=secret#name=Jan" }), {
      type, url: "https://www.abservice24.be/contact",
    });
  }
  assert.equal(redact({ type: "pageview", url: "not a URL" }), null);
});

test("analytics accepts known tool codes while rejecting personal data in permitted property names", () => {
  assert.deepEqual(buildAnalyticsEvent("maintenance_check_complete", {
    location: "maintenance_check", region: "vlaanderen", service: "Onderhoud", result: "periodic",
    email: "jan@example.be", destination: "https://example.be/?token=secret",
  }), { name: "maintenance_check_complete", props: {
    location: "maintenance_check", region: "vlaanderen", service: "Onderhoud", result: "periodic",
  } });
  assert.deepEqual(buildAnalyticsEvent("contact_form_start", {
    location: "jan@example.be", service: "Jan's private situation", reason: "0484906966",
  }).props, {});
  assert.deepEqual(buildAnalyticsEvent("contact_form_start", JSON.parse('{"constructor":"jan@example.be","__proto__":"secret"}')).props, {});
});

test("water analytics permits only coded statuses and never quantities or private inputs", () => {
  for (const result of ["observation", "unknown", "unsafe", "invalid"]) {
    assert.ok(analytics.ANALYTICS_EVENTS.includes("water_meter_check_complete"));
    assert.deepEqual(buildAnalyticsEvent("water_meter_check_complete", {
      location: "water_meter_check", result, firstReading: "123.456", secondReading: "123.457", minutes: "60", unit: "m3", differenceLitres: 1, litresPerHour: 1, service: "Lekdetectie", region: "vlaanderen",
    }), { name: "water_meter_check_complete", props: { location: "water_meter_check", result } });
  }
  assert.deepEqual(buildAnalyticsEvent("water_meter_check_complete", { location: "private@example.invalid", result: "periodic", email: "private@example.invalid" }).props, {});
  assert.deepEqual(buildAnalyticsEvent("service_cta_click", { location: "water_meter_check", service: "Lekdetectie", result: "observation", minutes: "60" }).props, { location: "water_meter_check", service: "Lekdetectie", result: "observation" });
});
