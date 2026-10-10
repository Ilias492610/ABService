export const maintenanceSources = Object.freeze({
  vlaanderen: "https://www.vlaanderen.be/verplicht-onderhoud-van-uw-cv-installatie-centrale-verwarming",
  brussel: "https://leefmilieu.brussels/verwarmingsketel",
  inspection: "https://www.vlaanderen.be/verplichte-keuring-van-een-nieuwe-of-gewijzigde-cv-installatie",
  brusselsInspection: "https://leefmilieu.brussels/pro/regelgeving-en-inspectie/verplichtingen-en-vergunningen/technische-installaties-epb-controles-en-onderhoud",
});

const selections = {
  region: ["vlaanderen", "brussel", "other", "unknown"],
  device: ["central", "gas-water-heater", "electric", "unknown"],
  fuel: ["gas", "liquid", "solid", "unknown"],
  power: ["below20", "atleast20", "unknown"],
  changed: ["yes", "no", "unknown"],
};

const parseDate = (value) => {
  if (typeof value !== "string" || !/^[1-9]\d{3}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
};

const anniversary = (date, years) => {
  const year = date.getUTCFullYear() + years;
  const month = date.getUTCMonth();
  const monthEnd = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(date.getUTCDate(), monthEnd))).toISOString().slice(0, 10);
};

const makeResult = (kind, title, summary, extra = {}) => ({
  kind, title, summary, intervalYears: null, planningDate: null, source: null,
  notes: [], service: "Andere vraag", ...extra,
});

/** Informational planning aid. It cannot establish conformity or an attested legal deadline. */
export function getMaintenanceResult(input = {}, today) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return makeResult("invalid", "Controleer uw keuze", "Gebruik de beschikbare toestel- en regiokeuzes.");
  }
  const normalized = {};
  for (const [name, choices] of Object.entries(selections)) {
    normalized[name] = input[name] ?? "unknown";
    if (!choices.includes(normalized[name])) {
      return makeResult("invalid", "Controleer uw keuze", "Gebruik de beschikbare toestel- en regiokeuzes.");
    }
  }
  const { region, device, fuel, power, changed } = normalized;
  const current = parseDate(today);
  const lastDate = input.lastDate ?? "";
  const last = lastDate ? parseDate(lastDate) : null;
  if (!current || (lastDate && (!last || last > current))) {
    return makeResult("invalid", "Controleer de onderhoudsdatum", "Vul een bestaande datum in die niet in de toekomst ligt, of kies dat de datum onbekend is.");
  }
  if (region !== "vlaanderen" && region !== "brussel") {
    return makeResult("unknown", "Welk gewest geldt voor uw woning?", "Deze check behandelt Vlaanderen en het Brussels Hoofdstedelijk Gewest. Controleer eerst in welk gewest de installatie staat.");
  }
  const source = maintenanceSources[region];
  if (device === "electric") {
    return makeResult("outside-scope", "Volg de toestelspecifieke onderhoudsinstructies", "Een elektrische boiler of warmtepomp valt niet onder deze berekening voor verbrandingstoestellen. Gebruik de onderhoudsinstructies van de fabrikant.", { source });
  }
  if (device === "unknown") {
    return makeResult("unknown", "Welk toestel maakt uw warmte?", "Controleer of het om een centrale verwarmingsketel, een afzonderlijke gaswaterverwarmer of een elektrisch toestel gaat.", { source });
  }
  if (device === "gas-water-heater" && fuel !== "gas" && fuel !== "unknown") {
    return makeResult("invalid", "Controleer het toestel en de brandstof", "Een afzonderlijke gaswaterverwarmer gebruikt gas. Pas de toestelkeuze of brandstof aan.", { source });
  }
  if (fuel === "unknown") {
    return makeResult("unknown", "Controleer de brandstof", "De juiste onderhoudsregel hangt af van de brandstof. Kijk op het typeplaatje of in de toesteldocumenten.", { source });
  }
  if (device === "gas-water-heater" && region === "vlaanderen") {
    return makeResult("outside-scope", "Afzonderlijke gaswaterverwarmer", "De Vlaamse regels voor centrale verwarmingsketels mogen niet zomaar worden toegepast op een afzonderlijke gasgeiser. Bekijk de aparte overheidsinformatie en de fabrikantinstructies.", { source, service: "Boiler plaatsen of herstellen" });
  }
  if (changed === "yes") {
    return makeResult("inspection", "Controleer eerst de ingebruikname of wijziging", region === "brussel"
      ? device === "gas-water-heater"
        ? "Bij een nieuwe of vervangen afzonderlijke gaswaterverwarmer is een eerste EPB-periodieke controle bij de plaatsing nodig. Laat bij andere wijzigingen bepalen welke controle geldt."
        : "Bij een nieuwe of vervangen centrale gas- of stookolieketel geldt EPB-oplevering binnen een maand. Bij andere wijzigingen, zoals een ingreep die de verbranding beïnvloedt, kan een periodieke controle nodig zijn. Laat de juiste verplichting bepalen."
      : "Na plaatsing, vervanging, verplaatsing of een relevante wijziging kan een afzonderlijke keuring nodig zijn. Een gewone onderhoudsdatum vervangt die controle niet.", {
      source: region === "brussel" ? maintenanceSources.brusselsInspection : maintenanceSources.inspection,
      service: device === "gas-water-heater" ? "Boiler plaatsen of herstellen" : fuel === "gas" ? "Keuring cv-installatie" : "Andere vraag",
      notes: ["Bezorg de installatiegegevens en bestaande rapporten aan een bevoegde uitvoerder voor uw gewest."],
    });
  }
  if (changed === "unknown") {
    return makeResult("unknown", "Controleer de installatiegeschiedenis", "Ga na of het toestel recent werd geplaatst, vervangen, verplaatst of gewijzigd. Een eventuele ingebruiknamecontrole staat los van het periodieke onderhoud.", { source });
  }
  if (region === "vlaanderen" && fuel !== "solid" && power === "unknown") {
    return makeResult("unknown", "Controleer het maximumvermogen", "Voor deze Vlaamse regel is het maximumvermogen nodig. Kijk op het typeplaatje of in de toesteldocumenten of het onder 20 kW of vanaf 20 kW is.", { source });
  }
  if (region === "vlaanderen" && fuel !== "solid" && power === "below20") {
    return makeResult("recommended", "Onderhoud blijft aanbevolen", "Voor dit centrale gas- of stookolietoestel onder 20 kW legt deze Vlaamse regel geen vaste verplichte onderhoudstermijn op. Volg de fabrikantinstructies en laat de onderhoudsbehoefte beoordelen.", {
      source, service: fuel === "gas" ? "Onderhoud cv-ketel" : "Andere vraag",
    });
  }
  const intervalYears = fuel === "gas" ? 2 : 1;
  const notes = [
    "Controleer de volgende datum op uw attest. Een eerdere vertraging of afwijkende attestedatum kan niet uit één bezoekdatum worden afgeleid.",
    "Deze check beoordeelt geen veilige werking, conformiteit of erkenning. Vraag de bevoegde uitvoerder voor uw toestel en gewest naar de vereiste documenten.",
  ];
  if (region === "vlaanderen") notes.push("Vlaanderen vermeldt een mogelijke verlenging van maximaal 3 maanden. De volgende cyclus blijft gebaseerd op de oorspronkelijke datum; deze check verschuift die wettelijke planning niet.");
  if (fuel !== "gas") notes.push("Voor stookolie of vaste brandstof: bespreek de uitvoering met een bevoegde uitvoerder. De onderhoudscheck bevestigt niet dat AB Service dit brandstoftype onderhoudt.");
  if (!last) notes.push("Datum onbekend? Zoek uw laatste attest op of vraag het bij de vorige uitvoerder. Er wordt geen datum verzonnen.");
  return makeResult("periodic", intervalYears === 2 ? "Doorgaans om de twee jaar" : "Doorgaans elk jaar", last
    ? "Op basis van uw invoer staat hieronder een richtdatum voor uw planning. Vergelijk die altijd met uw attest en de oorspronkelijke onderhoudscyclus."
    : "Voor deze combinatie geldt doorgaans een periodieke controle. Zonder de vorige onderhoudsdatum kan deze check geen richtdatum berekenen.", {
    intervalYears, planningDate: last ? anniversary(last, intervalYears) : null,
    source, notes, service: fuel === "gas" ? "Onderhoud cv-ketel" : "Andere vraag",
  });
}
