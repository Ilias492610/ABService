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

// De eigenaar bevestigde op 17 september 2026 dat AB Service alle opgenomen
// ketelmerken onderhoudt en de aanvullende loodgietersdiensten actief uitvoert.
export const brandDrafts = Object.freeze([]);
export const serviceDrafts = Object.freeze([]);
