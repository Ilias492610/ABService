import test from "node:test";
import assert from "node:assert/strict";

import { buildAuditTargets } from "../libs/seo-audit-targets.mjs";

test("audit targets separate the local fetch origin from the production canonical", () => {
  assert.deepEqual(buildAuditTargets("http://localhost:3100", "/onderhoud"), {
    fetchUrl: "http://localhost:3100/onderhoud",
    canonicalUrl: "https://www.abservice24.be/onderhoud",
  });
});
