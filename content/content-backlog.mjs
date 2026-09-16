import { serviceAreas } from "./service-areas.mjs";

const asDraft = (slug, label, missingEvidence) => ({
  slug,
  label,
  status: "draft",
  missingEvidence,
});

export const areaDrafts = Object.freeze(
  serviceAreas
    .filter(
      (area) =>
        !(area.slug === "antwerpen" && area.province === "Antwerpen") &&
        !(area.slug === "brussel" && area.region === "Brussel")
    )
    .map((area) =>
      asDraft(area.slug, area.name, [
        "search demand or Search Console opportunity",
        "genuine project/review evidence or sufficiently unique local value",
        "similarity review and editorial approval",
      ])
    )
);

export const brandDrafts = Object.freeze([
  "vaillant", "bulex", "bosch", "junkers", "buderus", "viessmann",
].map((slug) => asDraft(slug, slug[0].toUpperCase() + slug.slice(1), [
  "current proof that AB Service works on this brand",
  "brand-specific service scope",
  "genuine brand project evidence",
])));

export const serviceDrafts = Object.freeze([
  ["lekdetectie", "Lekdetectie"],
  ["waterlek-herstellen", "Waterlek herstellen"],
  ["ontstopping", "Ontstopping"],
  ["boiler", "Boiler"],
  ["leidingen", "Leidingen"],
  ["badkamerrenovatie", "Badkamerrenovatie"],
].map(([slug, label]) => asDraft(slug, label, [
  "owner-confirmed active service",
  "operational scope and limitations",
  "authentic work evidence",
])));
