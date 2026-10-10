import { coverageSources } from "../content/service-areas.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { adviceGuides } from "../content/advice-guides.mjs";
import { maintenanceSources } from "../libs/maintenance-check.mjs";
import { auditExternalSources } from "../libs/external-source-audit.mjs";

const faultCodeSources = faultGuides.flatMap((guide) => [
  ...guide.catalogs.map((catalog) => ({
    label: `${guide.brand}: ${catalog.title}`,
    href: catalog.sourceUrl,
  })),
  ...(guide.documentationUrl ? [{ label: `${guide.brand}: documentatie`, href: guide.documentationUrl }] : []),
]);
const adviceSources = adviceGuides.flatMap((guide) => guide.sourceLinks);
const toolSources = Object.entries(maintenanceSources).map(([label, href]) => ({ label, href }));
const results = await auditExternalSources([...coverageSources, ...faultCodeSources, ...adviceSources, ...toolSources]);
const failures = results.filter((result) => !result.ok);

for (const result of results) {
  console.log(`${result.ok ? "PASS" : "FAIL"} ${result.status} ${result.href}`);
}

if (failures.length) {
  console.error(`${failures.length} externe bron(nen) zijn niet bereikbaar.`);
  process.exitCode = 1;
} else {
  console.log(`${results.length} unieke externe gebieds-, fabrikant-, advies- en onderhoudsbronnen gecontroleerd.`);
}
