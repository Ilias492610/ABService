import { coverageSources } from "../content/service-areas.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { auditExternalSources } from "../libs/external-source-audit.mjs";

const addedFaultGuideSlugs = new Set([
  "remeha",
  "buderus",
  "viessmann",
  "acv",
  "intergas",
  "nefit-bosch",
  "atag",
  "itho-daalderop",
  "ferroli",
]);
const faultCodeSources = faultGuides
  .filter((guide) => addedFaultGuideSlugs.has(guide.slug))
  .flatMap((guide) =>
  guide.catalogs.map((catalog) => ({
    label: `${guide.brand}: ${catalog.title}`,
    href: catalog.sourceUrl,
  }))
  );
const results = await auditExternalSources([...coverageSources, ...faultCodeSources]);
const failures = results.filter((result) => !result.ok);

for (const result of results) {
  console.log(`${result.ok ? "PASS" : "FAIL"} ${result.status} ${result.href}`);
}

if (failures.length) {
  console.error(`${failures.length} externe bron(nen) zijn niet bereikbaar.`);
  process.exitCode = 1;
} else {
  console.log(`${results.length} unieke externe gebieds- en fabrikantbronnen gecontroleerd.`);
}
