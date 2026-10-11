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
      "Deze catalogus bevat het officiële Belgische consumentenoverzicht, de aparte tabel uit 0020124551_02 voor uitsluitend THEMA Condens FAS 65, artikelnummer 0010010389, BEnl, en de 31 genummerde codes uit historische handleiding 0020109430_06 (06/13) voor de acht hieronder genoemde THEMA Condens A/B-varianten. Andere THEMA-varianten en revisies zijn niet gedekt. F54 staat alleen in het algemene consumentenoverzicht, niet in deze twee modeltabellen. Dezelfde code kan per bron een andere betekenis hebben. Controleer het typeplaatje en de gebruikershandleiding van uw exacte toestel voordat u een betekenis toepast.",
    catalogs: bulexCatalogs,
    documentationLabel: "Officiële Bulex-gebruikshandleidingen",
    documentationUrl: "https://www.bulex.be/particulier/documentatie/technische-documentaties/handleidingen/",
  }),
  createGuide({
    slug: "bosch",
    brand: "Bosch",
    modelWarning:
      "Deze pagina gebruikt zes geselecteerde hoofdstukken uit de Nederlandstalige Bosch/Junkers Gids voor de installateur, niet alle codes of toestelvarianten van het merk. Publicatiedatum en revisie van dit codeboek zijn hier niet vastgesteld; de genoemde bouwjaren zijn hoofdstukgrenzen, geen garantie van geldigheid voor ieder toestel. Kies de juiste reeks en controleer typeplaatje, bouwjaar, volledige code en eventuele subcode in de gebruikershandleiding van uw exacte toestel. Het professionele codeboek vervangt die handleiding niet; werkzaamheden aan gesloten onderdelen horen bij een bevoegde technicus.",
    catalogs: boschCatalogs,
    documentationLabel: "Bosch handleidingen en modeldocumentatie",
    documentationUrl:
      "https://www.bosch-homecomfort.com/be/nl/residentieel/service-ondersteuning/bedieningshandleidingen/",
  }),
  createGuide({
    slug: "junkers",
    brand: "Junkers",
    modelWarning:
      "Deze pagina gebruikt zes geselecteerde hoofdstukken uit de Nederlandstalige Bosch/Junkers Gids voor de installateur, niet alle codes of toestelvarianten van het merk. Publicatiedatum en revisie van dit codeboek zijn hier niet vastgesteld; de genoemde bouwjaren zijn hoofdstukgrenzen, geen garantie van geldigheid voor ieder toestel. Kies de juiste reeks en controleer typeplaatje, bouwjaar, volledige code en eventuele subcode in de gebruikershandleiding van uw exacte toestel. Het professionele codeboek vervangt die handleiding niet; werkzaamheden aan gesloten onderdelen horen bij een bevoegde technicus.",
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
      "Deze gids gebruikt de 24 codegroepen op p. 42-43 van ACV-handleiding 664Y4200, revisie H (03/2011), voor Prestige Solo 18/32 MkIII en Excellence 18/32 MkIII met ESYS. Dit is een historische handleiding voor meerdere landen, geen lijst voor alle ACV-ketels of iedere ESYS-schermmelding. Nieuwere revisies, HeatMaster en andere reeksen zijn niet gedekt. Controleer typeplaatje, gasvariant en de gebruikershandleiding van uw exacte toestel; artikelnummers en firmwarecompatibiliteit zijn hier niet vastgesteld. Werkzaamheden aan gesloten onderdelen horen bij een bevoegde technicus.",
    catalogs: acvCatalogs,
    documentationLabel: "Officiële ACV-handleidingen en documentatie",
    documentationUrl: "https://www.acv.com/belgie/documentation",
  }),
  createGuide({
    slug: "intergas",
    brand: "Intergas",
    modelWarning:
      "Deze gids gebruikt de 11 codegroepen uit § 8.1, p. 42 van Intergas-installatievoorschrift 88136803 voor Prestige A CW6, met Nederlandse toestelcontext. Er moet een knipperende storingsled zijn met een code op het temperatuurdisplay; dezelfde cijfers op het servicedisplay kunnen een normale bedrijfstoestand aanduiden. Controleer dus het display én uw exacte model. Publicatiedatum, revisie, artikelnummer en firmwarecompatibiliteit zijn hier niet vastgesteld; dit is geen bevestiging van Belgische toestelcompatibiliteit. Andere Intergas-reeksen zijn niet gedekt en gesloten onderdelen horen bij een bevoegde technicus.",
    catalogs: intergasCatalogs,
    documentationLabel: "Officiële Intergas-storingshulp",
    documentationUrl: "https://www.intergas-verwarming.nl/consument/klantenservice/cv-ketel/",
  }),
  createGuide({
    slug: "nefit-bosch",
    brand: "Nefit Bosch",
    modelWarning:
      "Deze gids gebruikt 54 codegroepen uit tabel 25, p. 31-34 van Nefit-installatie-instructie 6720646227 (04/2013, NL) voor ProLine HRC 24/CW3, HRC 24/CW4 en HRC 30/CW5. Dit is een historische Nederlandse handleiding, geen overzicht voor alle Nefit Bosch-ketels of bevestiging van Belgische toestelcompatibiliteit. Een afzonderlijke revisie, artikelnummers en firmwarecompatibiliteit zijn hier niet vastgesteld. Noteer de volledige hoofd- en subcode: een classificatiesymbool is geen subcode. Bij 8C 373/374 is een gebruikersreset niet toegestaan; ontgrendeling door de fabrikant is nodig. Andere reeksen en revisies vallen buiten deze gids; gesloten onderdelen horen bij een bevoegde technicus.",
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
      "Deze gids gebruikt uitsluitend de 26 W/B/E-codegroepen voor Base Cube 24/30 13L, 24/35 16L en 30/35 16L uit handleiding 01-04199-001 (imprint ID 2020-07-20-1100), met Nederlandse toestelbestemming. Niet voor HP (COOL) Cube-combinaties of alle Itho Daalderop-ketels. De imprintdatum is geen afzonderlijk vastgestelde revisie of uitgiftedatum; actuele Belgische toestelcompatibiliteit, artikelnummers, firmware en nieuwste revisie zijn onbekend. W is een waarschuwing, B een automatisch herstellende blokkering en E een vergrendelende storing. De resetpassage op p. 80 noemt circa 15 seconden; p. 82 noemt vijf minuten in een ander diagnoseverloop. Combineer deze niet tot extra resetpogingen. Noteer ook de sensoromschrijving bij B00/B01 en volg de gebruikershandleiding van uw exacte toestel; open de mantel niet.",
    catalogs: ithoDaalderopCatalogs,
    documentationLabel: "Officiële Itho Daalderop-handleidingen",
    documentationUrl: "https://www.ithodaalderop.nl/nl-NL/consument/handleiding-vinden",
  }),
  createGuide({
    slug: "ferroli",
    brand: "Ferroli",
    modelWarning:
      "Deze gids gebruikt uitsluitend de 37 A/F-codegroepen uit § 9, S12-S13 van Ferroli BlueSense-servicehandleiding DRS9100, versie 9 (augustus 2015). De bron noemt BlueSense 3/4/5 zonder toevoeging en met toevoeging 12/22/32. Dit is historische Nederlandse servicedocumentatie, geen overzicht voor alle Ferroli-ketels of bevestiging van Belgische toestelcompatibiliteit. Artikelnummers, actuele firmware en de nieuwste revisie zijn hier niet vastgesteld. Noteer het exacte type, de toevoeging en volledige code en controleer de gebruikershandleiding van uw toestel. Bij A moet de oorzaak vóór een reset zijn verholpen; bij F heeft de resettoets geen effect. F20/F21 zijn de genoemde uitzonderingen waarbij het toestel blijft functioneren. Gesloten onderdelen en terugkerende meldingen vragen een bevoegde technicus.",
    catalogs: ferroliCatalogs,
    documentationLabel: "Officiële Ferroli-documentatie",
    documentationUrl: "https://www.ferroli.com/nl/installateurs/toolbox/documentatie",
  }),
]);

export const getFaultGuide = (slug) => faultGuides.find((guide) => guide.slug === slug);
