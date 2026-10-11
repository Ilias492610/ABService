import { coverageSources } from "../content/service-areas.mjs";
import { faultGuides } from "../content/fault-guides.mjs";
import { adviceGuides } from "../content/advice-guides.mjs";
import { coreSources } from "../content/core-sources.mjs";
import { maintenanceSources } from "./maintenance-check.mjs";
import { waterMeterSources } from "./water-meter-check.mjs";

export const waterMeterCitations = Object.freeze([
  { label: "Farys: vergelijken tijdens een periode zonder watergebruik", href: waterMeterSources.test },
  { label: "Farys: de totale meterstand aflezen", href: waterMeterSources.meterReading },
  { label: "Farys: totale stand en debiet op een digitale meter", href: waterMeterSources.digitalMeter },
  { label: "Vlaanderen: waterlekken en de rol van uw waterbedrijf", href: waterMeterSources.vlaanderen },
]);

export function getCitedSources() {
  return [
    ...coverageSources,
    ...faultGuides.flatMap((guide) => [
      ...guide.catalogs.map((catalog) => ({ label: `${guide.brand}: ${catalog.title}`, href: catalog.sourceUrl })),
      ...(guide.documentationUrl ? [{ label: `${guide.brand}: documentatie`, href: guide.documentationUrl }] : []),
    ]),
    ...adviceGuides.flatMap((guide) => guide.sourceLinks),
    ...Object.entries(maintenanceSources).map(([label, href]) => ({ label, href })),
    ...waterMeterCitations,
    ...Object.values(coreSources),
  ];
}
