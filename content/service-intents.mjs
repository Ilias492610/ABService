const advice = {
  pressure: { label: "Drukverlies van uw cv-ketel", href: "/advies/drukverlies-cv-ketel" },
  radiator: { label: "Radiator blijft koud", href: "/advies/radiator-blijft-koud" },
  hotWater: { label: "Geen warm water: wat noteren?", href: "/advies/geen-warm-water" },
  meter: { label: "Watermeter blijft draaien", href: "/advies/watermeter-blijft-draaien" },
  boiler: { label: "Veiligheidsgroep van uw boiler druppelt", href: "/advies/boiler-veiligheidsgroep-druppelt" },
  drain: { label: "Verstopte afvoer veilig laten beoordelen", href: "/advies/afvoer-verstopt-wat-doen" },
  attest: { label: "Welke onderhoudsattesten bewaart u?", href: "/advies/onderhoudsattest-cv-ketel" },
  check: { label: "Gratis onderhoudscheck voor Vlaanderen en Brussel", href: "/tools/onderhoudscheck" },
};

export const serviceIntents = Object.freeze({
  "/onderhoud": { service: "Onderhoud cv-ketel", links: [advice.check, advice.attest] },
  "/herstelling": { service: "Herstelling verwarming", links: [advice.hotWater, advice.radiator, advice.pressure] },
  "/keuring": { service: "Keuring cv-installatie", links: [advice.attest, advice.check] },
  "/installaties/gasketels": { service: "Installatie gasketel", links: [advice.attest, advice.check] },
  "/installaties/sanitair": { service: "Sanitair of loodgieterswerk", links: [advice.meter, advice.drain] },
  "/diensten/lekdetectie": { service: "Lekdetectie", links: [advice.meter, advice.pressure] },
  "/diensten/waterlek-herstellen": { service: "Waterlek herstellen", links: [advice.meter, advice.boiler] },
  "/diensten/ontstopping": { service: "Ontstopping", links: [advice.drain] },
  "/diensten/boiler": { service: "Boiler plaatsen of herstellen", links: [advice.boiler, advice.hotWater] },
  "/diensten/leidingen": { service: "Leidingen plaatsen of aanpassen", links: [advice.meter, advice.drain] },
  "/diensten/badkamerrenovatie": { service: "Badkamerrenovatie", links: [advice.drain, advice.meter] },
  "/advies/drukverlies-cv-ketel": { service: "Herstelling verwarming", links: [advice.radiator, advice.meter] },
});
