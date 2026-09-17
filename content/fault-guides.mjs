import {
  boschCatalogs,
  bulexCatalogs,
  getCatalogEntryCount,
  junkersCatalogs,
  vaillantCatalogs,
} from "./fault-catalogs.mjs";

const createGuide = ({
  slug,
  brand,
  modelWarning,
  catalogs,
  documentationLabel,
  documentationUrl,
}) =>
  Object.freeze({
    slug,
    brand,
    status: "published",
    modelWarning,
    catalogs,
    codeEntryCount: getCatalogEntryCount(catalogs),
    codes: Object.freeze(catalogs.flatMap((item) => item.codes)),
    sourceLabel: catalogs[0].sourceLabel,
    sourceUrl: catalogs[0].sourceUrl,
    documentationLabel,
    documentationUrl,
  });

export const faultGuides = Object.freeze([
  createGuide({
    slug: "vaillant",
    brand: "Vaillant",
    modelWarning:
      "Deze catalogus combineert het volledige officiële Belgische consumentenoverzicht met de volledige foutcodetabel voor de genoemde ecoTEC plus CS/1-5-modellen. Een code kan op een andere Vaillant-reeks iets anders betekenen of niet voorkomen.",
    catalogs: vaillantCatalogs,
    documentationLabel: "Alle officiële Vaillant-documentatie",
    documentationUrl: "https://support.vaillant.be/alle-documentatie/",
  }),
  createGuide({
    slug: "bulex",
    brand: "Bulex",
    modelWarning:
      "Deze catalogus bevat alle codes uit het officiële Belgische consumentenoverzicht en de volledige tabel voor het model THEMA Condens 0020124551_02. Controleer het typeplaatje en de handleiding voordat u een betekenis toepast.",
    catalogs: bulexCatalogs,
    documentationLabel: "Officiële Bulex-handleidingen",
    documentationUrl: "https://www.bulex.be/particulier/diensten/handleidingen/",
  }),
  createGuide({
    slug: "bosch",
    brand: "Bosch",
    modelWarning:
      "De catalogus volgt alle ketelcodes uit het officiële Bosch-codeboek voor Serie 7000i, Serie 9000i, Cerapur Maxx en de generaties -4, -3 en -2. Kies altijd eerst de toestelreeks: dezelfde code kan per generatie een andere betekenis hebben.",
    catalogs: boschCatalogs,
    documentationLabel: "Bosch handleidingen en modeldocumentatie",
    documentationUrl:
      "https://www.bosch-homecomfort.com/be/nl/residentieel/service-ondersteuning/bedieningshandleidingen/",
  }),
  createGuide({
    slug: "junkers",
    brand: "Junkers",
    modelWarning:
      "Het officiële Bosch-codeboek behandelt Junkers- en Bosch-condensatieketels samen. Deze catalogus neemt alle ketelcodes uit de zes gedocumenteerde generaties over; controleer daarom altijd toestelreeks, bouwjaar en eventuele subcode.",
    catalogs: junkersCatalogs,
    documentationLabel: "Officiële documentatie voor oudere Bosch/Junkers-toestellen",
    documentationUrl:
      "https://www.bosch-homecomfort.com/be/nl/residentieel/professionals/voor-de-installateurs/technische-documentatie/documentatie-oude-bosch-toestellen/",
  }),
]);

export const getFaultGuide = (slug) => faultGuides.find((guide) => guide.slug === slug);
