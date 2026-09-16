import test from "node:test";
import assert from "node:assert/strict";

import { buildAnalyticsEvent } from "../libs/analytics.mjs";

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
