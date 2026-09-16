import { coverageSources } from "../content/service-areas.mjs";
import { auditExternalSources } from "../libs/external-source-audit.mjs";

const results = await auditExternalSources(coverageSources);
const failures = results.filter((result) => !result.ok);

for (const result of results) {
  console.log(`${result.ok ? "PASS" : "FAIL"} ${result.status} ${result.href}`);
}

if (failures.length) {
  console.error(`${failures.length} externe bron(nen) zijn niet bereikbaar.`);
  process.exitCode = 1;
} else {
  console.log(`${results.length} unieke externe gebiedsbronnen gecontroleerd.`);
}
