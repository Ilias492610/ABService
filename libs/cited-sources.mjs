import { coverageSources } from "../content/service-areas.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { adviceGuides } from "../content/advice-guides.mjs";
import { coreSources } from "../content/core-sources.mjs";
import { maintenanceSources } from "./maintenance-check.mjs";

export function getCitedSources() {
  return [
    ...coverageSources,
    ...faultGuides.flatMap((guide) => [
      ...guide.catalogs.map((catalog) => ({ label: `${guide.brand}: ${catalog.title}`, href: catalog.sourceUrl })),
      ...(guide.documentationUrl ? [{ label: `${guide.brand}: documentatie`, href: guide.documentationUrl }] : []),
    ]),
    ...adviceGuides.flatMap((guide) => guide.sourceLinks),
    ...Object.entries(maintenanceSources).map(([label, href]) => ({ label, href })),
    ...Object.values(coreSources),
  ];
}
