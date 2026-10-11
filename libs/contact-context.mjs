import { CONTACT_SERVICES } from "./contact-validation.mjs";

const labels = Object.freeze({
  region: { vlaanderen: "Vlaanderen", brussel: "Brussel", other: "Ander gewest", unknown: "Onbekend gewest" },
  device: { central: "Centrale verwarmingsketel", "gas-water-heater": "Afzonderlijke gaswaterverwarmer", electric: "Elektrisch toestel of warmtepomp", unknown: "Toestel onbekend" },
  fuel: { gas: "Gas", liquid: "Vloeibare brandstof", solid: "Vaste brandstof", unknown: "Brandstof onbekend" },
  power: { below20: "Onder 20 kW", atleast20: "Vanaf 20 kW", unknown: "Vermogen onbekend" },
  changed: { yes: "Recent geplaatst of gewijzigd", no: "Geen recente wijziging gemeld", unknown: "Installatiegeschiedenis onbekend" },
});

const isCalendarDate = (value) => {
  if (typeof value !== "string" || !/^[1-9]\d{3}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const isWaterContext = (result, service) =>
  (result === "positive" && service === "Lekdetectie") || (result === "zero" && service === "Andere vraag");

export function buildContactHref({ service, toolInput, waterMeterContext } = {}) {
  if (!CONTACT_SERVICES.includes(service)) return "/contact#aanvraagformulier";
  const params = new URLSearchParams({ dienst: service });
  if (!toolInput) {
    if (isWaterContext(waterMeterContext, service)) {
      params.set("context", "watermetercheck");
      params.set("result", waterMeterContext);
      return `/contact#aanvraagformulier?${params}`;
    }
    return `/contact?${params}#aanvraagformulier`;
  }
  params.set("context", "onderhoudscheck");
  for (const [key, values] of Object.entries(labels)) {
    if (Object.hasOwn(values, toolInput[key])) params.set(key, toolInput[key]);
  }
  if (isCalendarDate(toolInput.lastDate)) params.set("lastDate", toolInput.lastDate);
  return `/contact#aanvraagformulier?${params}`;
}

export function readContactContext({ search = "", hash = "" } = {}) {
  if (hash.length > 1500 || search.length > 1500) return {};
  const fromTool = hash.startsWith("#aanvraagformulier?");
  const params = new URLSearchParams(fromTool ? hash.slice("#aanvraagformulier?".length) : search);
  const service = params.get("dienst");
  if (!CONTACT_SERVICES.includes(service)) return {};
  const context = { service };
  if (fromTool && params.get("context") === "watermetercheck") {
    const keys = [...params.keys()];
    // Exact, unique keys prevent duplicate, malformed or private additions from
    // becoming trusted tool context. The ordinary service allowlist still applies.
    if (keys.length === 3 && new Set(keys).size === 3
      && keys.every((key) => ["dienst", "context", "result"].includes(key))
      && isWaterContext(params.get("result"), service)) {
      context.message = params.get("result") === "positive"
        ? "Watermetercheck: tijdens mijn gekozen periode is een verandering geregistreerd. Dit is een meterobservatie, geen bevestigd lek. Ik wil mogelijke verbruikers en een onverklaard verschil laten beoordelen."
        : "Watermetercheck: tijdens mijn gekozen periode was er geen verschil. Dit sluit niet elk lek uit, bijvoorbeeld een tijdelijk lek of een lek in een ander circuit. Ik wil deze meterobservatie laten beoordelen.";
    }
  }
  if (fromTool && params.get("context") === "onderhoudscheck") {
    const choices = Object.entries(labels).map(([key, values]) => Object.hasOwn(values, params.get(key)) ? values[params.get(key)] : null).filter(Boolean);
    const date = params.get("lastDate");
    if (choices.length === Object.keys(labels).length) {
      context.message = `Ik wil mijn onderhoud bespreken. Onderhoudscheck: ${choices.join("; ")}.${isCalendarDate(date) ? ` Laatste onderhoud volgens mijn invoer: ${date}.` : " Laatste onderhoudsdatum onbekend."} Graag de vereisten en planning aan mijn installatie toetsen.`;
    }
  }
  return context;
}
