import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";

import { auditExternalSources } from "../libs/external-source-audit.mjs";
import { getCitedSources } from "../libs/cited-sources.mjs";
import { getAdviceGuide } from "../content/advice-guides.mjs";

test("attest handoff cites the exact regional heating and housing pages and monitors them", () => {
  const guideHrefs = new Set(getAdviceGuide("onderhoudsattest-cv-ketel").sourceLinks.map(({ href }) => href));
  const monitoredHrefs = new Set(getCitedSources().map(({ href }) => href));
  for (const href of [
    "https://www.vlaanderen.be/bouwen-wonen-en-energie/verwarming-koeling-en-ventilatie/keuring-en-onderhoud-van-uw-verwarming/verplichtingen-voor-centrale-verwarming-en-stookolietank-voor-verhuurder-en-huurder",
    "https://www.vlaanderen.be/bouwen-wonen-en-energie/huren-en-verhuren/onderhoud-en-herstellingen-aan-huurwoningen",
    "https://be.brussels/nl/huisvesting/huren-en-verhuren/huurovereenkomst/verdeling-van-de-herstellingen-tussen-de-huurder-en-de-verhuurder",
    "https://leefmilieu.brussels/pro/regelgeving-en-inspectie/verplichtingen-en-vergunningen/technische-installaties-epb-controles-en-onderhoud",
  ]) {
    assert.ok(guideHrefs.has(href), `Missing guide citation: ${href}`);
    assert.ok(monitoredHrefs.has(href), `Unmonitored citation: ${href}`);
  }
});

test("the source inventory includes the consumer pages' pressure, recognition and current support citations", async () => {
  const inventory = await import("../libs/cited-sources.mjs").catch(() => ({}));
  const sources = inventory.getCitedSources?.() || [];
  const hrefs = new Set(sources.map((source) => source.href));
  for (const href of [
    "https://www.bosch-homecomfort.com/be/nl/residentieel/info-advies/je-bosch-oplossing-uitgelegd!/verwarming-op-gas/cv-ketel-bijvullen/",
    "https://www.vlaanderen.be/natuur-milieu-en-klimaat/informatie-voor-de-technicus-vloeibare-en-technicus-gasvormige-brandstof-cv-ketel",
    "https://www.vlaanderen.be/bouwen-wonen-en-energie/bouwen-en-verbouwen/premies-voor-renovatie/mijn-verbouwpremie",
    "https://www.vlaanderen.be/bouwen-wonen-en-energie/lenen-voor-een-woning/mijn-verbouwlening/werken-die-in-aanmerking-komen-voor-mijn-verbouwlening",
  ]) assert.ok(hrefs.has(href), `Unmonitored consumer citation: ${href}`);
  assert.ok(sources.every((source) => source.label && source.href.startsWith("https://")));
});

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
