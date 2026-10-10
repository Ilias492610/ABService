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
