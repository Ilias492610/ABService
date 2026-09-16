import test from "node:test";
import assert from "node:assert/strict";

import { auditExternalSources } from "../libs/external-source-audit.mjs";

test("external source audit reports non-success responses and deduplicates URLs", async () => {
  const requested = [];
  const results = await auditExternalSources(
    [
      { label: "Live", href: "https://example.test/live" },
      { label: "Duplicate", href: "https://example.test/live" },
      { label: "Broken", href: "https://example.test/broken" },
    ],
    async (href) => {
      requested.push(href);
      return { status: href.endsWith("/live") ? 200 : 404 };
    }
  );

  assert.deepEqual(requested, ["https://example.test/live", "https://example.test/broken"]);
  assert.deepEqual(results, [
    { label: "Live", href: "https://example.test/live", status: 200, ok: true },
    { label: "Broken", href: "https://example.test/broken", status: 404, ok: false },
  ]);
});
