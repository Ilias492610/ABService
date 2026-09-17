import { routableDistricts, serviceRegionHubs } from "./service-areas.mjs";

export const CONTENT_STATUS = Object.freeze({
  PUBLISHED: "published",
  NOINDEX: "noindex",
  DRAFT: "draft",
});

export const getIndexableEntries = (entries) =>
  entries.filter((entry) => entry.status === CONTENT_STATUS.PUBLISHED);

export const pageRegistry = Object.freeze([
  {
    path: "/",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Loodgieter en verwarmingsservice in Antwerpen | AB Service",
    description:
      "AB Service helpt in Antwerpen met sanitair, onderhoud, herstellingen, keuringen en gasketelinstallaties. Neem contact op voor een gerichte aanvraag.",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/onderhoud",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Onderhoud van uw cv-ketel in Antwerpen | AB Service",
    description:
      "Lees wanneer cv-ketelonderhoud verplicht is, wat een onderhoud inhoudt en welke gegevens AB Service nodig heeft voor uw aanvraag.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/herstelling",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Herstelling van verwarming en cv-ketel | AB Service",
    description:
      "Problemen met verwarming of warm water? Bekijk veilige eerste stappen en bezorg AB Service de juiste informatie voor een herstellingsaanvraag.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/keuring",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Keuring van een cv-installatie in Antwerpen | AB Service",
    description:
      "Informatie over de keuring bij eerste ingebruikname of wijziging van een cv-installatie, los van het periodieke onderhoud.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/installaties",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Installaties voor verwarming en sanitair | AB Service",
    description:
      "Ontdek hoe AB Service aanvragen voor gasketel- en sanitaire installaties beoordeelt, van plaatsbezoek en offerte tot oplevering.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/installaties/gasketels",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Gasketel laten installeren in Antwerpen | AB Service",
    description:
      "Vraag een beoordeling en duidelijke offerte aan voor de vervanging of plaatsing van een gasketel in Antwerpen.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/installaties/sanitair",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Sanitaire installatie en loodgieterswerk | AB Service",
    description:
      "Voor sanitaire installaties en loodgieterswerk in Antwerpen: leg uw situatie voor en ontvang een voorstel op basis van de werkelijke omvang.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/tarieven",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Tarieven en offertes voor loodgieterswerk | AB Service",
    description:
      "Bekijk welke factoren de prijs van onderhoud, herstelling en installatie bepalen en welke informatie nodig is voor een duidelijke offerte.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Contact opnemen met AB Service",
    description:
      "Neem contact op met AB Service over sanitair, verwarming, onderhoud, herstelling, keuring of een gasketelinstallatie in Antwerpen.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/faq",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Veelgestelde vragen over verwarming en sanitair | AB Service",
    description:
      "Heldere antwoorden over onderhoud, keuring, herstellingen, installaties, offertes en contact met AB Service.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/over-ons",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Over AB Service | Loodgieter en verwarming Antwerpen",
    description:
      "Lees waarvoor u bij AB Service terechtkunt en hoe aanvragen voor loodgieterswerk, verwarming en sanitair worden behandeld.",
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    path: "/foutcodes",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Foutcodes van cv-ketels: veilige eerste stappen | AB Service",
    description:
      "Doorzoek 13 modelgebonden foutcodecatalogi voor courante cv-ketelmerken, met officiële fabrikantbronnen en veilige eerste stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/vaillant",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Vaillant foutcodes: betekenis en veilig handelen | AB Service",
    description:
      "Doorzoek alle codes uit het officiële Vaillant-overzicht en de volledige ecoTEC plus CS/1-5-tabel, met modelwaarschuwingen en veilige eerste stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/bulex",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Bulex foutcodes: betekenis en veilig handelen | AB Service",
    description:
      "Doorzoek alle codes uit het officiële Bulex-overzicht en de volledige THEMA Condens-tabel, met bronvermelding en veilige eerste stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/bosch",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Bosch foutcodes: officiële bron en veilige stappen | AB Service",
    description:
      "Doorzoek alle ketelcodes uit het officiële Bosch-codeboek voor 7000i, 9000i, Cerapur Maxx en de generaties -4, -3 en -2.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/junkers",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Junkers foutcodes: officiële bron en veilige stappen | AB Service",
    description:
      "Doorzoek alle Junkers-ketelcodes uit het officiële Bosch/Junkers-codeboek per toestelreeks, bouwjaar en subcode.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/remeha",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Remeha Avanta foutcodes: betekenis en stappen | AB Service",
    description:
      "Doorzoek alle Remeha Avanta-codes uit de officiële Storingswijzer, met toestelwaarschuwing en veilige eerste stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/buderus",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Buderus GB162 foutcodes: officiële bron | AB Service",
    description:
      "Doorzoek de volledige Buderus Logamax plus GB162 V2-foutcodetabel, met officiële bron en veilige eerste stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/viessmann",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Viessmann foutcodes: Vitodens en Vitotronic | AB Service",
    description:
      "Zoek in de officiële Viessmann-tabel voor Vitodens 200-W en 300-W met Vitotronic, inclusief duidelijke modelafbakening.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/acv",
    status: CONTENT_STATUS.PUBLISHED,
    title: "ACV Prestige foutcodes: betekenis en stappen | AB Service",
    description:
      "Doorzoek de volledige ESYS-foutcodetabel voor ACV Prestige MKIII, met officiële handleiding en veilige eerste stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/intergas",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Intergas Prestige foutcodes: officiële bron | AB Service",
    description:
      "Doorzoek de volledige Intergas Prestige-storingstabel, met modelwaarschuwing, officiële bron en veilige eerste stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/nefit-bosch",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Nefit Bosch ProLine foutcodes | AB Service",
    description:
      "Doorzoek de blokkerende en vergrendelende codes voor Nefit Bosch ProLine HRC, met officiële bron en veilig advies.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/atag",
    status: CONTENT_STATUS.PUBLISHED,
    title: "ATAG cv-ketel foutcodes: betekenis en stappen | AB Service",
    description:
      "Doorzoek alle meldingen uit het officiële ATAG-foutcodeoverzicht, met modelcontrole en veilige eerste stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/itho-daalderop",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Itho Daalderop Base Cube foutcodes | AB Service",
    description:
      "Doorzoek de volledige codetabel voor de Itho Daalderop Base Cube, met officiële handleiding en veilig advies.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/foutcodes/ferroli",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Ferroli BlueSense foutcodes: officiële bron | AB Service",
    description:
      "Doorzoek de volledige A- en F-foutcodetabel voor Ferroli BlueSense, met modelwaarschuwing en veilige stappen.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/advies/drukverlies-cv-ketel",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Drukverlies bij uw cv-ketel: oorzaken en veilige controle | AB Service",
    description:
      "Daalt de druk van uw cv-installatie? Lees wat u veilig kunt controleren, waarom de juiste druk modelafhankelijk is en wanneer technisch onderzoek nodig is.",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/werkgebied",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Werkgebied AB Service | Heel Vlaanderen en Brussel",
    description:
      "Controleer in welke gemeenten AB Service actief is voor verwarming, sanitair en loodgieterswerk: alle 285 Vlaamse en 19 Brusselse gemeenten.",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  ...serviceRegionHubs.map((hub) => ({
    path: hub.path,
    status: CONTENT_STATUS.PUBLISHED,
    title: hub.title,
    description: hub.description,
    changeFrequency: "monthly",
    priority: hub.slug === "antwerpen" ? 0.75 : 0.65,
  })),
  ...routableDistricts.map((districtEntry) => ({
    path: districtEntry.canonicalPath,
    status: districtEntry.indexable ? CONTENT_STATUS.PUBLISHED : CONTENT_STATUS.NOINDEX,
    title: districtEntry.title,
    description: districtEntry.description,
    changeFrequency: "monthly",
    priority: districtEntry.priority === 1 ? 0.7 : 0.6,
  })),
  {
    path: "/privacy-policy",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Privacybeleid | AB Service",
    description:
      "Lees hoe AB Service persoonsgegevens uit contactaanvragen en websitegebruik verwerkt en welke rechten u heeft.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/algemene-voorwaarden",
    status: CONTENT_STATUS.PUBLISHED,
    title: "Algemene voorwaarden | AB Service",
    description:
      "Lees de algemene voorwaarden die van toepassing zijn op offertes en werkzaamheden van AB Service.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/installaties/airconditioning",
    status: CONTENT_STATUS.NOINDEX,
    title: "Airconditioning | AB Service",
    description:
      "Deze dienst is momenteel niet opgenomen in het actieve dienstenaanbod van de website.",
  },
]);

export const indexablePages = Object.freeze(getIndexableEntries(pageRegistry));

export const getPageDefinition = (path) =>
  pageRegistry.find((entry) => entry.path === path);

export const navigation = Object.freeze([
  { label: "Home", href: "/" },
  {
    label: "Diensten",
    href: "/installaties",
    children: [
      { label: "Onderhoud", href: "/onderhoud" },
      { label: "Herstelling", href: "/herstelling" },
      { label: "Keuring", href: "/keuring" },
      { label: "Gasketels", href: "/installaties/gasketels" },
      { label: "Sanitair", href: "/installaties/sanitair" },
    ],
  },
  { label: "Tarieven", href: "/tarieven" },
  { label: "Foutcodes", href: "/foutcodes" },
  { label: "Advies", href: "/advies/drukverlies-cv-ketel" },
  { label: "Werkgebied", href: "/werkgebied" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]);
