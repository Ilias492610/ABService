import {
  boschCatalogs,
  bulexCatalogs,
  getCatalogEntryCount,
  junkersCatalogs,
  vaillantCatalogs,
} from "./fault-catalogs.mjs";
import {
  acvCatalogs,
  atagCatalogs,
  buderusCatalogs,
  ferroliCatalogs,
  intergasCatalogs,
  ithoDaalderopCatalogs,
  nefitBoschCatalogs,
  remehaCatalogs,
  viessmannCatalogs,
} from "./additional-fault-catalogs.mjs";

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
      "Deze catalogus combineert het officiële Belgische consumentenoverzicht met de volledige foutcodetabel uit 0020282230_00 voor de negen hieronder genoemde Belgische ecoTEC plus CS/1-5-modellen en artikelnummers. Niet elke code komt op elk product voor; andere varianten en revisies zijn niet gedekt. Controleer het typeplaatje en de gebruikershandleiding van uw exacte toestel voordat u een betekenis toepast.",
    catalogs: vaillantCatalogs,
    documentationLabel: "Alle officiële Vaillant-documentatie",
    documentationUrl: "https://support.vaillant.be/alle-documentatie/",
  }),
  createGuide({
    slug: "bulex",
    brand: "Bulex",
    modelWarning:
      "Deze catalogus bevat alle codes uit het officiële Belgische consumentenoverzicht en de volledige tabel uit 0020124551_02 voor uitsluitend THEMA Condens FAS 65, artikelnummer 0010010389, BEnl. Andere THEMA-varianten en revisies zijn niet gedekt. Dezelfde code kan per bron een andere betekenis hebben. Controleer het typeplaatje en de gebruikershandleiding van uw exacte toestel voordat u een betekenis toepast.",
    catalogs: bulexCatalogs,
    documentationLabel: "Officiële Bulex-gebruikshandleidingen",
    documentationUrl: "https://www.bulex.be/particulier/documentatie/technische-documentaties/handleidingen/",
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
  createGuide({
    slug: "remeha",
    brand: "Remeha",
    modelWarning:
      "Kies uw toestelreeks en generatie: Avanta volgt de officiële Belgische Storingswijzer; legacy Calenta 15s/25s/28c/35s/40c volgt de E- en Su-tabellen van handleiding 117061-08. Calenta Ace-Matic 25s/35s/30c/40c volgt revisie 7871265-05-04072025. Calenta Ace-Matic 25L heeft eigen tabellen uit de afzonderlijke handleiding 7871254-04-04072025. Kies hieronder het juiste model en de component CU-GH-21 of SCB-10; SCB-10-tabellen gelden alleen als de uitbreiding en betrokken componenten aanwezig zijn. De betekenis hangt af van model, generatie en configuratie. Calenta Ace, Tzerra, Quinta en andere revisies vallen niet onder deze dekking.",
    catalogs: remehaCatalogs,
    documentationLabel: "Officiële Remeha Storingswijzer",
    documentationUrl: "https://storingswijzer.remeha.be/",
  }),
  createGuide({
    slug: "buderus",
    brand: "Buderus",
    modelWarning:
      "Deze selectie uit tabel 17, §12.3, p. 33-37 van installatiehandleiding 6720813438 (2021/07), BE Nederlands, geldt uitsluitend voor Logamax plus GB162-70/85/100 V2: 52 uitlegregels voor 74 codecombinaties. Gewone bedrijfs-, componenttest- en resetcodes zijn weggelaten; ontbrekende bronsymbolen krijgen geen storingsclassificatie. De rookgastemperatuursensor is in het schema alleen voor Zwitserland genoemd; controleer bij 1U 317 en 1Y 318 of deze aanwezig is. Controleer het typeplaatje, de configuratie en de gebruikershandleiding van uw exacte toestel. Andere Buderus-reeksen en revisies zijn niet gedekt.",
    catalogs: buderusCatalogs,
    documentationLabel: "Officiële Buderus-handleidingen",
    documentationUrl: "https://www.buderus.com/be/nl/partners/informatie-documentatie/handleidingen/",
  }),
  createGuide({
    slug: "viessmann",
    brand: "Viessmann",
    modelWarning:
      "De officiële tabel is een oriëntatieoverzicht voor Vitodens 200-W en 300-W met Vitotronic-regeling en is volgens Viessmann niet universeel of volledig voor nieuwere toestelgeneraties. Controleer daarom altijd model en productcode.",
    catalogs: viessmannCatalogs,
    documentationLabel: "Officiële Viessmann-productdocumentatie",
    documentationUrl: "https://www.viessmann.be/nl/services/downloads/gegevens-product-viessmann.html",
  }),
  createGuide({
    slug: "acv",
    brand: "ACV",
    modelWarning:
      "Deze catalogus bevat de volledige ESYS-foutcodetabel van de genoemde ACV Prestige MKIII-handleiding. Gebruik de code niet voor een andere ACV-reeks zonder het toestelmodel en de bijbehorende handleiding te controleren.",
    catalogs: acvCatalogs,
    documentationLabel: "Officiële ACV-handleidingen en documentatie",
    documentationUrl: "https://www.acv.com/belgie/documentation",
  }),
  createGuide({
    slug: "intergas",
    brand: "Intergas",
    modelWarning:
      "Deze catalogus volgt de volledige storingstabel van de genoemde Intergas Prestige-handleiding. Andere Intergas-toestelreeksen kunnen andere codes, knipperpatronen en modelgebonden controles gebruiken.",
    catalogs: intergasCatalogs,
    documentationLabel: "Officiële Intergas-storingshulp",
    documentationUrl: "https://www.intergas-verwarming.nl/consument/klantenservice/cv-ketel/",
  }),
  createGuide({
    slug: "nefit-bosch",
    brand: "Nefit Bosch",
    modelWarning:
      "Deze catalogus bevat alle blokkerende en vergrendelende codes uit de genoemde Nefit ProLine HRC-handleiding. Codes voor andere Nefit Bosch-toestellen en generaties moeten in hun eigen modeldocumentatie worden opgezocht.",
    catalogs: nefitBoschCatalogs,
    documentationLabel: "Officiële Nefit Bosch-storingshulp",
    documentationUrl: "https://www.nefit-bosch.nl/service-consument/service-en-onderhoud/storing-oplossen/",
  }),
  createGuide({
    slug: "atag",
    brand: "ATAG",
    modelWarning:
      "Deze catalogus bevat alle meldingen uit het officiële online ATAG-overzicht, dat meerdere genoemde toestelreeksen combineert. Controleer toestelmodel, schermtekst en eventuele subcode voordat u een verklaring toepast.",
    catalogs: atagCatalogs,
    documentationLabel: "Officiële ATAG-downloads",
    documentationUrl: "https://www.atagwarmte.nl/downloads",
  }),
  createGuide({
    slug: "itho-daalderop",
    brand: "Itho Daalderop",
    modelWarning:
      "Deze catalogus bevat de volledige waarschuwing-, blokkering- en foutcodetabel voor de Itho Daalderop Base Cube. Een code van een ander toestelmodel kan een andere betekenis of procedure hebben.",
    catalogs: ithoDaalderopCatalogs,
    documentationLabel: "Officiële Itho Daalderop-handleidingen",
    documentationUrl: "https://www.ithodaalderop.nl/nl-NL/consument/handleiding-vinden",
  }),
  createGuide({
    slug: "ferroli",
    brand: "Ferroli",
    modelWarning:
      "Deze catalogus volgt de volledige A- en F-foutcodetabel uit de genoemde Ferroli BlueSense-servicehandleiding. Raadpleeg voor andere Ferroli-toestelreeksen altijd de modelgebonden documentatie.",
    catalogs: ferroliCatalogs,
    documentationLabel: "Officiële Ferroli-documentatie",
    documentationUrl: "https://www.ferroli.com/nl/installateurs/toolbox/documentatie",
  }),
]);

export const getFaultGuide = (slug) => faultGuides.find((guide) => guide.slug === slug);
