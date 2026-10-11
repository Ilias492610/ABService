// Shared by the future renderer and its source monitor; provider guidance is not universal.
export const waterMeterSources = Object.freeze({
  test: "https://www.farys.be/nl/hoe-spoor-ik-zelf-lekken-op-de-lektest",
  meterReading: "https://www.farys.be/nl/hoe-lees-ik-de-meterstand",
  digitalMeter: "https://www.farys.be/nl/welke-gegevens-kan-ik-aflezen-van-de-digitale-watermeter",
  vlaanderen: "https://www.vlaanderen.be/bouwen-wonen-en-energie/water/een-lek-in-de-waterleiding",
});

const selections = {
  safeAccess: ["yes", "no", "unknown"],
  waterNearElectricity: ["yes", "no", "unknown"],
  meterScope: ["own", "shared", "unknown"],
  waterUse: ["none", "possible", "unknown"],
  unit: ["m3", "litres", "unknown"],
};
const labels = {
  safeAccess: "veilige toegang", waterNearElectricity: "water bij elektriciteit",
  meterScope: "eigen of gedeelde meter", waterUse: "watergebruik", unit: "eenheid",
  firstReading: "eerste totale meterstand", secondReading: "tweede totale meterstand",
  minutes: "meetduur",
};
const observationLimitations = [
  "Vergelijk de totale stand van dezelfde eigen meter in dezelfde eenheid; een debietweergave is geen totale meterstand. 1 m³ is 1000 liter.",
  "Onopgemerkt gewoon of automatisch verbruik kan het verschil verklaren. Alleen gesloten kranen bewijzen niet dat er tijdens de hele periode geen verbruik was.",
  "Dit is geen bevestigd lek en bepaalt geen oorzaak of locatie. De hoeveelheid per uur is het gemiddelde over de gekozen periode, geen jaarverlies.",
  "Deze observatie bepaalt geen herstelkosten, verzekering of juridische kostenverdeling.",
  "Bij een probleem aan straat, meter of hoofdkraan: neem contact op met uw eigen waterbedrijf.",
];

const result = (status, title, summary, limitations = []) => ({
  status, title, summary, differenceLitres: null, litresPerHour: null,
  limitations: [...limitations], nextService: null,
});

// Operational input bounds, not legal limits or water-company requirements.
const numericFields = {
  firstReading: { minimum: 0n, maximum: 9999999999n },
  secondReading: { minimum: 0n, maximum: 9999999999n },
  minutes: { minimum: 1000n, maximum: 10080000n },
};

const parseScaled = (raw, { minimum, maximum }) => {
  if (typeof raw !== "string") return { status: "invalid" };
  const value = raw.trim();
  if (!value) return { status: "unknown" };
  if (raw.length > 32 || !/^\d+(?:[.,]\d{1,3})?$/.test(value)) return { status: "invalid" };
  const [whole, fraction = ""] = value.split(/[.,]/);
  const scaled = BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, "0"));
  return scaled < minimum || scaled > maximum
    ? { status: "invalid" }
    : { status: "valid", scaled };
};

/** Pure period observation: no diagnosis, storage, clock, API or private contact context. */
export function getWaterMeterObservation(input = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return result("invalid", "Controleer de invoer", "Gebruik de beschikbare keuzes en vul de totale meterstanden en meetduur als tekst in.");
  }
  // A confirmed danger stops the observation before unrelated input validation.
  if ((Object.hasOwn(input, "safeAccess") && input.safeAccess === "no")
    || (Object.hasOwn(input, "waterNearElectricity") && input.waterNearElectricity === "yes")) {
    return result("unsafe", "Stop de watermetercheck", "Houd afstand en raak de elektrische installatie niet aan. Zoek bij onmiddellijk gevaar passende noodhulp.", [
      "Lees de meter alleen af wanneer u er veilig bij kunt. Ga niet in het water en raak geen installatie aan om de check uit te voeren.",
      "Bij een probleem aan straat, meter of hoofdkraan: neem contact op met uw eigen waterbedrijf.",
    ]);
  }

  const normalized = {};
  for (const [field, choices] of Object.entries(selections)) {
    const value = Object.hasOwn(input, field) ? input[field] : "unknown";
    if (typeof value !== "string" || !choices.includes(value)) {
      return result("invalid", "Controleer uw keuze", `Kies een beschikbare optie voor ${labels[field]}.`);
    }
    normalized[field] = value;
  }

  const quantities = {};
  for (const [field, bounds] of Object.entries(numericFields)) {
    const parsed = Object.hasOwn(input, field) ? parseScaled(input[field], bounds) : { status: "unknown" };
    if (parsed.status === "invalid") {
      return result("invalid", "Controleer de getallen", field === "minutes"
        ? "Vul de meetduur in van 1 tot en met 10080 minuten, met maximaal 3 decimalen en een punt of komma. Deze grenzen zijn invoerkeuzes voor de check."
        : `Vul de ${labels[field]} in van 0 tot en met 9999999,999, met maximaal 3 decimalen en een punt of komma. Gebruik geen duizendtalscheiding of teken. Deze grenzen zijn invoerkeuzes voor de check.`);
    }
    quantities[field] = parsed;
  }

  if (normalized.safeAccess === "unknown") {
    return result("unknown", "Controleer de veilige toegang", "Ga eerst na of de meter veilig afleesbaar is. Lees hem niet af als de toegang onzeker is.");
  }
  if (normalized.waterNearElectricity === "unknown") {
    return result("unknown", "Controleer water bij elektriciteit", "Ga alleen verder als u zeker weet dat er geen water bij elektriciteit is. Bij twijfel: houd afstand.");
  }
  if (normalized.meterScope !== "own") {
    return result("unknown", "Is dit uw eigen watermeter?", normalized.meterScope === "shared"
      ? "Een gedeelde meter kan ook het verbruik van anderen registreren. Daarmee kunt u geen observatie voor alleen uw eigen watercircuit maken."
      : "Controleer of dit de eigen meter is voor het watercircuit dat u wilt vergelijken.");
  }
  if (normalized.waterUse !== "none") {
    return result("unknown", "Sluit werkelijk watergebruik uit", "Voor een vergelijking moet gewoon en automatisch watergebruik tijdens de hele periode uitgesloten zijn. Denk ook aan toestellen die vanzelf water gebruiken.");
  }
  if (normalized.unit === "unknown") {
    return result("unknown", "Controleer de eenheid", "Lees op beide totale standen dezelfde eenheid af: m³ of liter. Gebruik geen debiet in m³/uur als totale stand.");
  }
  if (quantities.firstReading.status === "unknown" || quantities.secondReading.status === "unknown") {
    return result("unknown", "Vul beide totale standen in", "Er ontbreekt een totale meterstand. Gebruik twee aflezingen van dezelfde meter in dezelfde eenheid; een leeg veld is geen nul.");
  }
  if (quantities.minutes.status === "unknown") {
    return result("unknown", "Vul de meetduur in", "Vul het aantal minuten tussen beide aflezingen in. Zonder bekende periode kan de check geen hoeveelheid per uur berekenen.");
  }
  if (quantities.secondReading.scaled < quantities.firstReading.scaled) {
    return result("unknown", "Controleer de dalende stand", "De tweede stand is lager dan de eerste. Controleer de aflezing, dezelfde meter en de eenheid. De check kan een telleromloop of vervanging niet vaststellen.");
  }

  // Thousandths of the selected unit -> thousandths of a litre. Integer division
  // rounds the hourly rate half up to 3 decimals before conversion to Number.
  const milliLitres = (quantities.secondReading.scaled - quantities.firstReading.scaled)
    * (normalized.unit === "m3" ? 1000n : 1n);
  const duration = quantities.minutes.scaled;
  const hourlyMilliLitres = (milliLitres * 60000n + duration / 2n) / duration;
  const positive = milliLitres > 0n;
  return {
    ...result("observation", positive ? "Water geregistreerd tijdens uw meetperiode" : "Geen verschil tijdens uw meetperiode", positive
      ? "De meter heeft water geregistreerd tijdens de gekozen periode. Controleer mogelijke verbruikers en laat een onverklaard verschil onderzoeken."
      : "Er is geen verschil tussen de ingevoerde standen. Dit sluit een tijdelijk lek of een lek in een ander circuit niet uit.", observationLimitations),
    differenceLitres: Number(milliLitres) / 1000,
    litresPerHour: Number(hourlyMilliLitres) / 1000,
    nextService: positive ? "Lekdetectie" : "Andere vraag",
  };
}
