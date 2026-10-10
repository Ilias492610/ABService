import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";

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

test("source audit accepts real vendor-sized headers and follows bounded redirects", async (t) => {
  const server = createServer((request, response) => {
    if (request.url === "/redirect") {
      response.writeHead(302, { Location: "/source" }).end();
    } else {
      response.writeHead(200, { "X-Vendor-Metadata": "x".repeat(24_000), "Content-Type": "application/pdf" }).end("%PDF-1.7");
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => server.close());
  const href = `http://127.0.0.1:${server.address().port}/redirect`;
  assert.deepEqual(await auditExternalSources([{ href, label: "Vendor source" }]), [
    { href, label: "Vendor source", status: 200, ok: true },
  ]);
});
