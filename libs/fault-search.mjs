import { buildFaultCodeAliases } from "./fault-code-aliases.mjs";

const normalize = (value) => value
  .toLocaleLowerCase("nl-BE")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[:.\s/_-]+/g, "");

// Original ProLine HRC 6720646227 (04/2013, NL), table25 p34: rE
// means a reset is being executed. It is not a prose search for "re".
// This exception belongs only to that historical catalog, not all brands.
const nefitResetNotice = Object.freeze({
  title: "rE: reset wordt uitgevoerd",
  text: "De historische ProLine HRC-handleiding 6720646227 (04/2013, NL), tabel 25 op p. 34, vermeldt bij rE: “Een reset van het cv-toestel wordt uitgevoerd.” Deze melding bewijst niet dat de oorzaak van een storing verholpen is. Noteer bij een aanhoudende of terugkerende storing het exacte toesteltype en de volledige displaymelding; voer geen herhaalde resets uit.",
  sourceUrl: "https://www.nefit-bosch.nl/media/country_pool/professioneel/installateurs/installatie-instructie_proline.pdf",
  sourceLabel: "Nefit ProLine HRC - installatie-instructie 6720646227 (04/2013, NL)",
  sourcePage: "tabel 25, p. 34",
});

const isNefitResetState = (catalog, query) => catalog.id === "nefit-proline-hrc" && query === "re";

// Base Cube 01-04199-001, §7.2.1 p79: these literal display states
// are outside the W/B/E diagnostic groups, not searches through their prose.
const ithoNormalStates = new Set([
  "Stand-by", "Starten", "Verwarmen Warm water", "Verwarmen CV", "Stoppen",
  "Antipendel", "Nadraaien Warm water", "Pompen CV", "Vorstbeveiliging",
  "ECO", "ECO COMFORT", "WARM WATER UIT",
].map(normalize));
const isIthoNormalState = (catalog, query) => catalog.id === "itho-base-cube" && ithoNormalStates.has(query);
const ithoStateNotice = Object.freeze({
  title: "Bedrijfstoestand, geen W/B/E-code",
  text: "§ 7.2.1, p. 79 van handleiding 01-04199-001 vermeldt deze aanduiding als normale display- of bedrijfstoestand, geen waarschuwing, blokkering of storing uit de W/B/E-tabellen. ECO en ECO COMFORT betreffen de warmhoudfunctie; WARM WATER UIT meldt dat de warmwaterfunctie uitgeschakeld is. Dit geldt uitsluitend voor de drie genoemde Base Cube-modellen met bestemming NL, niet voor HP (COOL) Cube-combinaties. Een normale melding bewijst niet dat het toestel probleemloos werkt: noteer bij klachten het exacte model, de volledige displaytekst en eventuele W/B/E-code en raadpleeg de toepasselijke gebruikershandleiding of uw installateur.",
  sourceUrl: "https://ithodaalderop.compano.com/Data/Environments/000001/Attachment/Bijlage/A01_CV-Ketels/A01_01_Doorstroom/A01_01_01_Cube%20Solo/B01_05_MAN/01-04199-001%20%20Handleiding%20Base%20Cube%20NL.pdf",
  sourceLabel: "Itho Daalderop Base Cube - handleiding 01-04199-001 (imprint ID 2020-07-20-1100, NL)",
  sourcePage: "§ 7.2.1, p. 79",
});

export const getFaultDisplayStateNotice = (catalogs, query, catalogId = "all") => {
  const normalizedQuery = normalize(query.trim());
  const selected = catalogs.filter(catalog => catalogId === "all" || catalog.id === catalogId);
  if (selected.some(catalog => isNefitResetState(catalog, normalizedQuery))) return nefitResetNotice;
  return selected.some(catalog => isIthoNormalState(catalog, normalizedQuery)) ? ithoStateNotice : null;
};

const matchesNumberedIdentifier = (meaning, query) => {
  const identifiers = meaning.match(/\b(?:[a-z]{1,3}[\s:._-]*\d+|\d+[a-z]{1,3}(?:[\s:._-]*\d+)?)(?:[.:_-]\d+)*\b/gi) || [];
  return identifiers.some((identifier) => normalize(identifier) === query);
};

export const filterFaultCatalogs = (catalogs, query, catalogId = "all") => {
  const normalizedQuery = normalize(query.trim());
  const selectedCatalogs = catalogs.filter((catalog) => catalogId === "all" || catalog.id === catalogId);
  // Short manufacturer prefixes cover spaced codes without treating "sensor 2" as a code.
  const isCodeShaped = /^(?:[a-z]{1,3})?\d+(?:[a-z]{1,3}\d*)?$/.test(normalizedQuery);
  // EA also names a browsable letter family, even in catalogs with a standalone EA row.
  const isKnownAlias = normalizedQuery && normalizedQuery !== "ea" && selectedCatalogs.some((catalog) =>
    catalog.codes.some((entry) => buildFaultCodeAliases(entry.code).some((alias) => normalize(alias) === normalizedQuery))
  );

  return selectedCatalogs
    .map((catalog) => ({
      ...catalog,
      codes: isNefitResetState(catalog, normalizedQuery) || isIthoNormalState(catalog, normalizedQuery) ? [] : catalog.codes.filter((entry) => !normalizedQuery || (isKnownAlias
        ? buildFaultCodeAliases(entry.code).some((alias) => normalize(alias) === normalizedQuery)
        : isCodeShaped
          ? matchesNumberedIdentifier(entry.meaning, normalizedQuery)
          : normalize(`${entry.searchTerms} ${entry.meaning}`).includes(normalizedQuery))),
    }))
    .filter((catalog) => catalog.codes.length > 0);
};
