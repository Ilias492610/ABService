import { deriveAreaEvidence, projects } from "./projects.mjs";
import { calculateAreaPriorityScore } from "./service-area-scoring.mjs";

export { calculateAreaPriorityScore } from "./service-area-scoring.mjs";

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const antwerpMetroPriority = new Set([
  "Antwerpen", "Aartselaar", "Boechout", "Brasschaat", "Edegem", "Hemiksem",
  "Hove", "Kapellen", "Kontich", "Lint", "Mortsel", "Niel", "Ranst", "Rumst",
  "Schelle", "Schilde", "Schoten", "Stabroek", "Wijnegem", "Wommelgem",
]);

const majorCityPriority = new Set([
  "Mechelen", "Turnhout", "Geel", "Lier", "Herentals", "Hasselt", "Genk",
  "Beringen", "Sint-Truiden", "Lommel", "Maasmechelen", "Tongeren-Borgloon",
  "Gent", "Aalst", "Sint-Niklaas", "Dendermonde", "Lokeren", "Oudenaarde",
  "Geraardsbergen", "Leuven", "Vilvoorde", "Halle", "Zaventem", "Dilbeek",
  "Asse", "Grimbergen", "Brugge", "Kortrijk", "Oostende", "Roeselare",
  "Waregem", "Ieper", "Brussel", "Anderlecht", "Schaarbeek", "Ukkel",
  "Sint-Jans-Molenbeek", "Elsene", "Etterbeek", "Jette", "Evere",
]);

const priorityTierFor = (name) =>
  antwerpMetroPriority.has(name) ? 1 : majorCityPriority.has(name) ? 2 : 3;

const unresearchedPrioritySignals = Object.freeze({
  searchDemand: null,
  searchConsoleOpportunity: null,
  projectEvidence: 0,
  reviewEvidence: 0,
  commercialValue: null,
  operationalAttractiveness: null,
  organicCompetitionOpportunity: null,
});

const antwerpNeighborhoodSource = Object.freeze({
  label: "Stad in Cijfers: officiële gebieds- en wijkindeling Antwerpen",
  href: "https://stadincijfers.antwerpen.be/viewer/JiveEmbedded.aspx?favorite=ggw7_11002bez02&geolevel=ggw7&presel_code=introkaart_eengebied_new",
});

const makeArea = (name, province, region = "Vlaanderen") =>
  Object.freeze({
    name,
    slug: slugify(name),
    region,
    province,
    type: "municipality",
    served: true,
    priority: priorityTierFor(name),
    priorityScore: calculateAreaPriorityScore(unresearchedPrioritySignals),
    prioritySignals: unresearchedPrioritySignals,
    indexable: false,
    searchIntent: `loodgieter ${name}`,
    hasProjectEvidence: false,
    hasLocalReview: false,
    hasUniqueContent: false,
    notes: "Dekking bevestigd door eigenaar; geen afzonderlijke pagina zonder extra lokale waarde.",
  });

const province = (name, slug, region, names) =>
  Object.freeze({
    name,
    slug,
    region,
    areas: Object.freeze(names.map((areaName) => makeArea(areaName, name, region))),
  });

export const provinceGroups = Object.freeze([
  province("Antwerpen", "antwerpen", "Vlaanderen", [
    "Aartselaar", "Antwerpen", "Arendonk", "Baarle-Hertog", "Balen", "Beerse",
    "Berlaar", "Boechout", "Bonheiden", "Boom", "Bornem", "Brasschaat", "Brecht",
    "Dessel", "Duffel", "Edegem", "Essen", "Geel", "Grobbendonk", "Heist-op-den-Berg",
    "Hemiksem", "Herentals", "Herenthout", "Herselt", "Hoogstraten", "Hove", "Hulshout",
    "Kalmthout", "Kapellen", "Kasterlee", "Kontich", "Laakdal", "Lier", "Lille", "Lint",
    "Malle", "Mechelen", "Meerhout", "Merksplas", "Mol", "Mortsel", "Niel", "Nijlen",
    "Olen", "Oud-Turnhout", "Putte", "Puurs-Sint-Amands", "Ranst", "Ravels", "Retie",
    "Rijkevorsel", "Rumst", "Schelle", "Schilde", "Schoten", "Sint-Katelijne-Waver",
    "Stabroek", "Turnhout", "Vorselaar", "Vosselaar", "Westerlo", "Wijnegem", "Willebroek",
    "Wommelgem", "Wuustwezel", "Zandhoven", "Zoersel",
  ]),
  province("Limburg", "limburg", "Vlaanderen", [
    "Alken", "As", "Beringen", "Bilzen-Hoeselt", "Bocholt", "Bree", "Diepenbeek",
    "Dilsen-Stokkem", "Genk", "Gingelom", "Halen", "Hamont-Achel", "Hasselt",
    "Hechtel-Eksel", "Heers", "Herk-de-Stad", "Herstappe", "Heusden-Zolder",
    "Houthalen-Helchteren", "Kinrooi", "Lanaken", "Leopoldsburg", "Lommel", "Lummen",
    "Maaseik", "Maasmechelen", "Nieuwerkerken", "Oudsbergen", "Peer", "Pelt", "Riemst",
    "Sint-Truiden", "Tessenderlo-Ham", "Tongeren-Borgloon", "Voeren", "Wellen", "Zonhoven",
    "Zutendaal",
  ]),
  province("Oost-Vlaanderen", "oost-vlaanderen", "Vlaanderen", [
    "Aalst", "Aalter", "Assenede", "Berlare", "Beveren-Kruibeke-Zwijndrecht", "Brakel",
    "Buggenhout", "Deinze", "Denderleeuw", "Dendermonde", "Destelbergen", "Eeklo",
    "Erpe-Mere", "Evergem", "Gavere", "Gent", "Geraardsbergen", "Haaltert", "Hamme",
    "Herzele", "Horebeke", "Kaprijke", "Kluisbergen", "Kruisem", "Laarne", "Lebbeke",
    "Lede", "Lierde", "Lievegem", "Lochristi", "Lokeren", "Maarkedal", "Maldegem",
    "Merelbeke-Melle", "Nazareth-De Pinte", "Ninove", "Oosterzele", "Oudenaarde", "Ronse",
    "Sint-Gillis-Waas", "Sint-Laureins", "Sint-Lievens-Houtem", "Sint-Martens-Latem",
    "Sint-Niklaas", "Stekene", "Temse", "Waasmunster", "Wetteren", "Wichelen",
    "Wortegem-Petegem", "Zele", "Zelzate", "Zottegem", "Zulte", "Zwalm",
  ]),
  province("Vlaams-Brabant", "vlaams-brabant", "Vlaanderen", [
    "Aarschot", "Affligem", "Asse", "Beersel", "Begijnendijk", "Bekkevoort", "Bertem",
    "Bever", "Bierbeek", "Boortmeerbeek", "Boutersem", "Diest", "Dilbeek", "Drogenbos",
    "Geetbets", "Glabbeek", "Grimbergen", "Haacht", "Halle", "Herent", "Hoegaarden",
    "Hoeilaart", "Holsbeek", "Huldenberg", "Kampenhout", "Kapelle-op-den-Bos", "Keerbergen",
    "Kortenaken", "Kortenberg", "Kraainem", "Landen", "Lennik", "Leuven", "Liedekerke",
    "Linkebeek", "Linter", "Londerzeel", "Lubbeek", "Machelen", "Meise", "Merchtem",
    "Opwijk", "Oud-Heverlee", "Overijse", "Pajottegem", "Pepingen", "Roosdaal", "Rotselaar",
    "Scherpenheuvel-Zichem", "Sint-Genesius-Rode", "Sint-Pieters-Leeuw", "Steenokkerzeel",
    "Ternat", "Tervuren", "Tielt-Winge", "Tienen", "Tremelo", "Vilvoorde", "Wemmel",
    "Wezembeek-Oppem", "Zaventem", "Zemst", "Zoutleeuw",
  ]),
  province("West-Vlaanderen", "west-vlaanderen", "Vlaanderen", [
    "Alveringem", "Anzegem", "Ardooie", "Avelgem", "Beernem", "Blankenberge", "Bredene",
    "Brugge", "Damme", "De Haan", "De Panne", "Deerlijk", "Dentergem", "Diksmuide",
    "Gistel", "Harelbeke", "Heuvelland", "Hooglede", "Houthulst", "Ichtegem", "Ieper",
    "Ingelmunster", "Izegem", "Jabbeke", "Knokke-Heist", "Koekelare", "Koksijde", "Kortemark",
    "Kortrijk", "Kuurne", "Langemark-Poelkapelle", "Ledegem", "Lendelede", "Lichtervelde",
    "Lo-Reninge", "Menen", "Mesen", "Middelkerke", "Moorslede", "Nieuwpoort", "Oostende",
    "Oostkamp", "Oostrozebeke", "Oudenburg", "Pittem", "Poperinge", "Roeselare",
    "Spiere-Helkijn", "Staden", "Tielt", "Torhout", "Veurne", "Vleteren", "Waregem",
    "Wervik", "Wevelgem", "Wielsbeke", "Wingene", "Zedelgem", "Zonnebeke", "Zuienkerke",
    "Zwevegem",
  ]),
  province("Brussels Hoofdstedelijk Gewest", "brussel", "Brussel", [
    "Anderlecht", "Brussel", "Elsene", "Etterbeek", "Evere", "Ganshoren", "Jette",
    "Koekelberg", "Oudergem", "Schaarbeek", "Sint-Agatha-Berchem", "Sint-Gillis",
    "Sint-Jans-Molenbeek", "Sint-Joost-ten-Node", "Sint-Lambrechts-Woluwe",
    "Sint-Pieters-Woluwe", "Ukkel", "Vorst", "Watermaal-Bosvoorde",
  ]),
]);

export const serviceAreas = Object.freeze(provinceGroups.flatMap((group) => group.areas));

export const isDistrictPublishable = (area) =>
  area.slug !== "antwerpen" &&
  area.keywordPriorityConfirmed === true &&
  area.hasUniqueContent === true &&
  area.localSource?.href?.startsWith("https://") &&
  Array.isArray(area.faq) &&
  area.faq.length >= 2 &&
  area.faq.every(
    (entry) => Array.isArray(entry) && entry.length === 2 && entry[1].length >= 80
  );

const district = (name, data) => {
  const entry = {
    name,
    slug: slugify(name),
    region: "Vlaanderen",
    province: "Antwerpen",
    municipality: "Antwerpen",
    type: "district",
    served: true,
    priority: data.priority,
    keywordPriorityConfirmed: data.keywordPriorityConfirmed,
    canonicalPath: data.canonicalPath,
    title: data.title,
    heading: data.heading,
    description: data.description,
    intro: data.intro,
    localContext: data.localContext,
    preparation: data.preparation,
    faq: data.faq,
    nearby: data.nearby,
    localSource: data.localSource ?? antwerpNeighborhoodSource,
    hasProjectEvidence: false,
    hasLocalReview: false,
    hasUniqueContent: true,
  };
  return Object.freeze({ ...entry, indexable: isDistrictPublishable(entry) });
};

export const antwerpDistricts = Object.freeze([
  district("Antwerpen", {
    priority: 1,
    keywordPriorityConfirmed: false,
    canonicalPath: "/",
    title: "Loodgieter Antwerpen | AB Service",
    heading: "Loodgieter in Antwerpen voor verwarming en sanitair",
    description: "De homepage blijft de centrale pagina voor loodgieterswerk in Antwerpen.",
    intro: "De homepage bedient de zoekintentie loodgieter Antwerpen.",
    localContext: "Antwerpen heeft een eigen centrale landingspagina om cannibalisatie te vermijden.",
    preparation: "Gebruik de homepage voor aanvragen binnen district Antwerpen.",
    faq: [],
    nearby: ["berchem", "borgerhout", "deurne"],
  }),
  district("Berchem", {
    priority: 1,
    keywordPriorityConfirmed: true,
    canonicalPath: "/loodgieter-berchem",
    title: "Loodgieter Berchem | Verwarming en sanitair | AB Service",
    heading: "Loodgieter in Berchem voor verwarming en sanitair",
    description: "AB Service helpt klanten in Berchem met verwarming, cv-ketels, sanitair en gerichte loodgieterswerken. Leg uw situatie voor.",
    intro: "Van Oud-Berchem en Groenenhoek tot de Nieuw-Kwartier-wijken: vermeld bij uw aanvraag het gebouwtype, de verdieping en de bereikbaarheid van toestel en leidingen.",
    localContext: "Berchem combineert compacte stadswijken met appartementsgebouwen en residentiële buurten. Daardoor verschillen leidingtracés, gemeenschappelijke installaties en toegang sterk per adres.",
    preparation: "Geef aan of het om een individuele installatie of een gedeelde gebouwinstallatie gaat en wie toegang kan geven tot technische lokalen.",
    faq: [
      ["Werkt AB Service in alle wijken van Berchem?", "Ja. Oud-Berchem, Groenenhoek, Nieuw Kwartier en de andere Berchemse buurten behoren tot het bevestigde werkgebied. Een afspraak volgt na beoordeling van de concrete aanvraag."],
      ["Welke informatie is nuttig bij een appartement in Berchem?", "Vermeld verdieping, lift- en parkeermogelijkheid, individuele of gemeenschappelijke installatie en wie toegang kan geven tot tellers, afsluiters en technische lokalen."],
    ],
    nearby: ["borgerhout", "wilrijk", "deurne"],
  }),
  district("Berendrecht-Zandvliet-Lillo", {
    priority: 2,
    keywordPriorityConfirmed: false,
    canonicalPath: "/loodgieter-berendrecht-zandvliet-lillo",
    title: "Loodgieter Berendrecht, Zandvliet en Lillo | AB Service",
    heading: "Loodgieter voor Berendrecht, Zandvliet en Lillo",
    description: "Verwarming of sanitair laten beoordelen in Berendrecht, Zandvliet of Lillo? AB Service plant opdrachten op basis van locatie en technische informatie.",
    intro: "Berendrecht, Zandvliet en Lillo vormen samen één noordelijk Antwerps district. Een correcte locatie en duidelijke toestelfoto’s helpen om verplaatsing en benodigd materiaal vooraf beter in te schatten.",
    localContext: "De drie kernen en het omliggende haven- en poldergebied liggen verspreider dan de centrale stadsdistricten. Daarom is een volledige aanvraag vóór de afspraak hier extra belangrijk.",
    preparation: "Vermeld de kern, het volledige probleem, parkeertoegang en of onderdelen of technische ruimtes moeilijk bereikbaar zijn.",
    faq: [
      ["Komt AB Service naar alle drie de kernen?", "Berendrecht, Zandvliet en Lillo liggen allemaal in het bevestigde werkgebied. Deze route blijft voorlopig noindex tot de afzonderlijke zoekintentie voldoende onderzocht is."],
      ["Waarom vraagt AB Service vooraf extra locatiegegevens?", "De drie kernen liggen verspreid. Een volledig adres, informatie over parking en toegang en duidelijke toestelfoto’s helpen de verplaatsing en benodigdheden vooraf beoordelen."],
    ],
    nearby: ["ekeren", "merksem"],
  }),
  district("Borgerhout", {
    priority: 1,
    keywordPriorityConfirmed: true,
    canonicalPath: "/loodgieter-borgerhout",
    title: "Loodgieter Borgerhout | Cv-ketel en sanitair | AB Service",
    heading: "Loodgieter in Borgerhout voor cv-ketel en sanitair",
    description: "AB Service behandelt aanvragen voor cv-ketels, verwarming en sanitair in Borgerhout. Deel foutcode, toestelgegevens en toegangssituatie.",
    intro: "Borgerhout omvat zowel intra-muroswijken als Extra Muros. In compacte gebouwen is het belangrijk om vooraf te weten waar afsluiters, ketel en gemeenschappelijke leidingen bereikbaar zijn.",
    localContext: "De officiële wijkindeling onderscheidt Borgerhout Extra Muros en twee intra-muroszones. De technische situatie kan daardoor variëren van individuele woningen tot gestapelde installaties.",
    preparation: "Stuur foto’s van het toestel, de aansluiting en de zichtbare schade zonder kasten of toestelpanelen te openen.",
    faq: [
      ["Kan ik een storing in Borgerhout met foto’s aanmelden?", "Ja. Stuur een overzicht van het toestel, het typeplaatje, de zichtbare foutcode en de aansluiting. Open geen toestelpanelen en voer geen onveilige controles uit."],
      ["Wat als de hoofdkraan of technische ruimte gemeenschappelijk is?", "Meld dit vooraf en controleer wie toegang kan verlenen. In gestapelde gebouwen kan de bereikbaarheid van gemeenschappelijke afsluiters de diagnose en planning beïnvloeden."],
    ],
    nearby: ["berchem", "deurne", "antwerpen"],
  }),
  district("Borsbeek", {
    priority: 1,
    keywordPriorityConfirmed: true,
    canonicalPath: "/loodgieter-borsbeek",
    title: "Loodgieter Borsbeek | Sanitair en verwarming | AB Service",
    heading: "Loodgieter in Borsbeek voor sanitair en verwarming",
    description: "Loodgieters- of verwarmingsvraag in Borsbeek? AB Service beoordeelt onderhoud, herstelling, sanitair en installatiewerk op basis van uw situatie.",
    intro: "Borsbeek is sinds 1 januari 2025 het tiende district van Antwerpen en bestaat in de stedelijke wijkdata uit Borsbeek Oost, West en Groen.",
    localContext: "De overgang tussen dichtere woonzones en de groene rand betekent dat woningtype, leidingverloop en bereikbaarheid per buurt sterk kunnen verschillen.",
    preparation: "Vermeld Borsbeek Oost, West of Groen indien bekend, samen met toesteltype, bouwsituatie en duidelijke foto’s.",
    faq: [
      ["Bedient AB Service Borsbeek sinds het een Antwerps district is?", "Ja. Borsbeek behoort tot het bevestigde werkgebied en wordt als tiende district correct in de gebiedsarchitectuur opgenomen, zonder een afzonderlijke vestiging te suggereren."],
      ["Welke locatiegegevens helpen bij de planning?", "Vermeld indien bekend Borsbeek Oost, West of Groen, samen met woningtype, parkeersituatie, verdieping, toestelgegevens en bereikbaarheid van leidingen of technische ruimte."],
    ],
    nearby: ["deurne", "berchem", "wilrijk"],
  }),
  district("Deurne", {
    priority: 1,
    keywordPriorityConfirmed: true,
    canonicalPath: "/loodgieter-deurne",
    title: "Loodgieter Deurne | Herstelling en onderhoud | AB Service",
    heading: "Loodgieter in Deurne voor herstelling en onderhoud",
    description: "AB Service helpt in Deurne met cv-ketelonderhoud, verwarmingsproblemen, sanitair en installaties. Vraag een beoordeling aan.",
    intro: "Deurne is een groot district met onder meer Deurne-Noord, Dorp-Gallifort, Oost en verschillende zuidelijke wijken. Geef daarom altijd de exacte locatie en installatiesituatie door.",
    localContext: "De omvang en uiteenlopende wijkstructuur maken een gerichte technische intake belangrijk: een appartement, rijwoning of vrijstaande woning vraagt vaak een andere voorbereiding.",
    preparation: "Noteer merk, model, foutcode, zichtbare druk en of verwarming, warm water of sanitair het probleem vormt.",
    faq: [
      ["In welke delen van Deurne komt AB Service?", "Deurne-Noord, Dorp-Gallifort, Deurne-Oost en de zuidelijke buurten behoren tot het werkgebied. De exacte locatie helpt om de verplaatsing praktisch te plannen."],
      ["Wat moet ik doorgeven bij een cv-storing in Deurne?", "Noteer merk, model, foutcode, zichtbare waterdruk en of verwarming, warm water of beide uitvallen. Voeg veilige overzichtsfoto’s toe en meld terugkerende resets."],
    ],
    nearby: ["borgerhout", "borsbeek", "merksem"],
  }),
  district("Ekeren", {
    priority: 1,
    keywordPriorityConfirmed: true,
    canonicalPath: "/loodgieter-ekeren",
    title: "Loodgieter Ekeren | Verwarming en sanitair | AB Service",
    heading: "Loodgieter in Ekeren voor verwarming en sanitair",
    description: "Voor verwarming, gasketels en sanitaire werken in Ekeren kunt u uw aanvraag met foto’s en toestelgegevens aan AB Service bezorgen.",
    intro: "Ekeren omvat onder meer Ekeren-Centrum, Donk, Leugenberg, Mariaburg en Schoonbroek-Rozemaai. Vermeld uw buurt en bereikbaarheid voor een gerichte planning.",
    localContext: "De verschillende woonkernen liggen niet allemaal rond hetzelfde centrum. Een precieze aanvraag voorkomt dat locatie, toegang of het benodigde materiaal pas bij aankomst duidelijk wordt.",
    preparation: "Deel de zichtbare aansluiting, het toestelplaatje en informatie over eventuele gemeenschappelijke delen van het gebouw.",
    faq: [
      ["Is heel Ekeren onderdeel van het werkgebied?", "Ja. Ekeren-Centrum, Donk, Leugenberg, Mariaburg, Schoonbroek-Rozemaai en de overige buurten vallen binnen het bevestigde werkgebied."],
      ["Welke foto’s zijn nuttig voor een sanitaire aanvraag?", "Stuur één overzichtsfoto van de ruimte en detailfoto’s van het toestel, aansluitpunten, afvoer en zichtbare schade. Voeg maten toe als een toestel vervangen moet worden."],
    ],
    nearby: ["merksem", "berendrecht-zandvliet-lillo"],
  }),
  district("Hoboken", {
    priority: 1,
    keywordPriorityConfirmed: true,
    canonicalPath: "/loodgieter-hoboken",
    title: "Loodgieter Hoboken | Cv-ketel en sanitair | AB Service",
    heading: "Loodgieter in Hoboken voor cv-ketel en sanitair",
    description: "AB Service behandelt loodgieters-, verwarmings- en sanitaire aanvragen in Hoboken. Deel uw toestelgegevens en gewenste werkzaamheden.",
    intro: "Hoboken is in de stedelijke wijkdata verdeeld in Centrum, Noord, West en Zuidoost. Geef bij uw aanvraag aan waar het werk zich bevindt en wat veilig zichtbaar is.",
    localContext: "Woningen, appartementen en andere gebouwen hebben uiteenlopende afsluiters, afvoeren en technische ruimtes. De feitelijke installatie bepaalt daarom de aanpak en prijs.",
    preparation: "Omschrijf of het om onderhoud, storing, sanitair of installatie gaat en voeg overzichts- én detailfoto’s toe.",
    faq: [
      ["Welke diensten zijn beschikbaar in Hoboken?", "AB Service beoordeelt in Hoboken aanvragen voor cv-ketelonderhoud, verwarmingsherstelling, gasketelinstallatie en sanitaire of gerichte loodgieterswerken."],
      ["Kan AB Service vooraf een prijs geven op basis van één foto?", "Meestal niet betrouwbaar. Materiaal, leidingverloop, bereikbaarheid, aansluitingen en eventuele vervolgdiagnose bepalen de scope; meerdere duidelijke foto’s maken een eerste beoordeling wel beter."],
    ],
    nearby: ["wilrijk", "antwerpen"],
  }),
  district("Merksem", {
    priority: 1,
    keywordPriorityConfirmed: true,
    canonicalPath: "/loodgieter-merksem",
    title: "Loodgieter Merksem | Verwarming en sanitair | AB Service",
    heading: "Loodgieter in Merksem voor verwarming en sanitair",
    description: "Cv-ketel, verwarming of sanitair laten beoordelen in Merksem? Bezorg AB Service de relevante toestel- en locatiegegevens.",
    intro: "Merksem omvat onder meer Lambrechtshoeken, Heide, Nieuwdreef en Oud-Merksem. De juiste wijk en toegangssituatie helpen een afspraak praktisch voorbereiden.",
    localContext: "In stedelijke woonstraten en appartementsgebouwen kunnen afsluitbaarheid, verdieping en gemeenschappelijke leidingen de opdracht beïnvloeden.",
    preparation: "Controleer vooraf wie toegang heeft tot eventuele tellers, technische lokalen en gemeenschappelijke afsluiters.",
    faq: [
      ["Komt AB Service in alle wijken van Merksem?", "Ja. Lambrechtshoeken, Heide, Nieuwdreef, Oud-Merksem en de andere Merksemse buurten liggen binnen het bevestigde werkgebied van AB Service."],
      ["Wat als een installatie gedeeld wordt met andere bewoners?", "Geef dit bij de aanvraag aan en regel zo nodig toegang via syndicus of gebouwbeheerder. Gemeenschappelijke leidingen en afsluiters kunnen de diagnose en uitvoering beïnvloeden."],
    ],
    nearby: ["deurne", "ekeren", "antwerpen"],
  }),
  district("Wilrijk", {
    priority: 1,
    keywordPriorityConfirmed: true,
    canonicalPath: "/loodgieter-wilrijk",
    title: "Loodgieter Wilrijk | Sanitair en gasketels | AB Service",
    heading: "Loodgieter in Wilrijk voor sanitair en gasketels",
    description: "AB Service helpt klanten in Wilrijk met sanitair, cv-ketelonderhoud, herstellingen en installaties. Bespreek uw concrete situatie.",
    intro: "Wilrijk telt uiteenlopende wijken zoals Centrum, Valaar, Neerland, Koornbloem en Oosterveld-Elsdonk. Woningtype en bereikbaarheid bepalen welke voorbereiding nodig is.",
    localContext: "De mix van appartementen, rijwoningen en residentiële buurten maakt het onverstandig om op basis van alleen een postcode een vaste werkomvang te beloven.",
    preparation: "Deel productgegevens, maten en foto’s van de bestaande aansluitingen en benoem duidelijk welk resultaat u verwacht.",
    faq: [
      ["Welke aanvragen behandelt AB Service in Wilrijk?", "AB Service beoordeelt in Wilrijk aanvragen voor sanitair, cv-ketelonderhoud, verwarmingsherstellingen en gasketelinstallaties op basis van de concrete technische situatie."],
      ["Waarom is een offerte afhankelijk van de bestaande aansluiting?", "Leidingmateriaal, maten, bereikbaarheid, afvoer, rookgastraject en noodzakelijke aanpassingen verschillen per gebouw. Daarom volgt een betrouwbare prijs pas na voldoende inventarisatie."],
    ],
    nearby: ["hoboken", "berchem", "borsbeek"],
  }),
]);

export const indexableDistricts = Object.freeze(
  antwerpDistricts.filter((area) => area.indexable)
);

export const serviceAreasWithEvidence = Object.freeze(
  serviceAreas.map((area) => deriveAreaEvidence(area, projects))
);

export const antwerpDistrictsWithEvidence = Object.freeze(
  antwerpDistricts.map((area) => deriveAreaEvidence(area, projects))
);

export const routableDistricts = Object.freeze(
  antwerpDistricts.filter((area) => area.slug !== "antwerpen")
);

const hub = (slug, data) =>
  Object.freeze({
    slug,
    path: `/werkgebied/${slug}`,
    status: "published",
    ...data,
  });

export const serviceRegionHubs = Object.freeze([
  hub("antwerpen", {
    name: "Provincie Antwerpen",
    heading: "Loodgieter en verwarmingsservice in provincie Antwerpen",
    groupName: "Antwerpen",
    title: "Loodgieter en verwarmingsservice in provincie Antwerpen | AB Service",
    description: "Bekijk het werkgebied van AB Service in provincie Antwerpen, inclusief alle gemeenten en de afzonderlijke Antwerpse districten.",
    summary: "Provincie Antwerpen is het sterkste geografische vertrekpunt van AB Service. De dekking loopt van de stad en haar tien districten via de zuidrand en Mechelse regio tot de Kempen. Afzonderlijke districtspagina’s geven alleen aanvullende lokale informatie waar die echt nuttig is.",
    details: "De centrale servicepagina’s blijven leidend voor onderhoud, herstelling, keuring, gasketels en sanitair. Deze provinciepagina helpt vooral om het werkgebied en de juiste vervolglink te vinden.",
    planningTip: "Vermeld gemeente of district, toesteltype, foutcode en bereikbaarheid. Zo kan een verplaatsing binnen de provincie gericht worden beoordeeld.",
    majorCities: ["Antwerpen", "Mechelen", "Turnhout", "Geel", "Lier", "Herentals"],
    faq: [
      ["Is elke gemeente in provincie Antwerpen bediend?", "Ja. Alle 67 gemeenten staan in het bevestigde werkgebied. De concrete opdracht en timing worden afzonderlijk beoordeeld."],
      ["Heeft AB Service een vestiging in elke gemeente?", "Nee. Dit is het werkgebied van één servicebedrijf; de pagina suggereert geen bijkomende vestigingen."],
    ],
  }),
  hub("limburg", {
    name: "Limburg",
    heading: "Loodgieter en verwarmingsservice in Limburg",
    groupName: "Limburg",
    title: "Loodgieter en verwarmingsservice in Limburg | AB Service",
    description: "AB Service bedient alle 38 Limburgse gemeenten voor passende verwarmings-, sanitaire en loodgietersaanvragen na beoordeling.",
    summary: "AB Service neemt aanvragen aan uit alle 38 Limburgse gemeenten. Omdat afstanden en installaties uiteenlopen, wordt vóór bevestiging nagegaan welke dienst nodig is, welke technische informatie beschikbaar is en hoe de afspraak praktisch kan worden gepland.",
    details: "Van stedelijke omgevingen rond Hasselt en Genk tot verspreide gemeenten in Noord- en Zuid-Limburg: de pagina belooft geen vaste aankomsttijd, maar maakt de volledige dekking controleerbaar.",
    planningTip: "Stuur merk, model, probleemomschrijving en foto’s meteen mee. Dat is bij een langere verplaatsing extra belangrijk om onvolledige afspraken te vermijden.",
    majorCities: ["Hasselt", "Genk", "Beringen", "Sint-Truiden", "Lommel", "Maasmechelen", "Tongeren-Borgloon"],
    faq: [
      ["Komt AB Service naar alle Limburgse gemeenten?", "Ja. Alle 38 Limburgse gemeenten behoren tot het werkgebied, na beoordeling van dienst, afstand en planning."],
      ["Is een afspraak in Limburg onmiddellijk bevestigd?", "Nee. AB Service controleert eerst de technische informatie en praktische verplaatsing en bevestigt daarna de afspraak."],
    ],
  }),
  hub("oost-vlaanderen", {
    name: "Oost-Vlaanderen",
    heading: "Loodgieter en verwarmingsservice in Oost-Vlaanderen",
    groupName: "Oost-Vlaanderen",
    title: "Loodgieter en verwarmingsservice in Oost-Vlaanderen | AB Service",
    description: "Van Gent en Aalst tot het Waasland en de Vlaamse Ardennen: bekijk waar AB Service in Oost-Vlaanderen actief is.",
    summary: "Oost-Vlaanderen omvat 55 gemeenten met zeer verschillende stedelijke en landelijke situaties. AB Service behandelt er passende aanvragen voor verwarming, cv-ketels, sanitair en loodgieterswerk, telkens na controle van scope en planning.",
    details: "De gebiedslijst loopt van Gent en het Waasland tot de Denderstreek en Vlaamse Ardennen. Gemeenten zonder eigen landingspagina blijven bewust gewone tekst en veroorzaken geen reeks dunne SEO-pagina’s.",
    planningTip: "Beschrijf eerst het technische probleem en geef daarna gemeente, bereikbaarheid en gewenste timing door. Een afspraak is pas bevestigd na beoordeling.",
    majorCities: ["Gent", "Aalst", "Sint-Niklaas", "Dendermonde", "Lokeren", "Oudenaarde", "Geraardsbergen"],
    faq: [
      ["Wordt heel Oost-Vlaanderen bediend?", "Ja. De 55 gemeenten zijn geregistreerd als werkgebied; aanvaarding en planning blijven afhankelijk van de concrete aanvraag."],
      ["Waarom heeft niet elke Oost-Vlaamse gemeente een eigen pagina?", "Een eigen pagina volgt alleen wanneer zoekdata of echte lokale evidence voldoende unieke klantwaarde ondersteunt."],
    ],
  }),
  hub("vlaams-brabant", {
    name: "Vlaams-Brabant",
    heading: "Loodgieter en verwarmingsservice in Vlaams-Brabant",
    groupName: "Vlaams-Brabant",
    title: "Loodgieter en verwarmingsservice in Vlaams-Brabant | AB Service",
    description: "Bekijk de volledige dekking van AB Service in de 63 gemeenten van Vlaams-Brabant, van Leuven tot de Vlaamse Rand.",
    summary: "AB Service bedient de 63 gemeenten van Vlaams-Brabant. De Vlaamse Rand, de Leuvense regio en het westen en oosten van de provincie kennen elk andere verplaatsings- en gebouwcontexten; daarom wordt elke aanvraag afzonderlijk ingepland.",
    details: "Deze hub verduidelijkt de provinciale dekking zonder voor elke gemeente een bijna identieke pagina te publiceren. De inhoudelijke uitleg over de dienst zelf blijft op de centrale servicepagina staan.",
    planningTip: "Vermeld of toegang, parking of een gemeenschappelijke technische ruimte vooraf moet worden geregeld en voeg de exacte toestelgegevens toe.",
    majorCities: ["Leuven", "Vilvoorde", "Halle", "Zaventem", "Dilbeek", "Asse", "Grimbergen"],
    faq: [
      ["Is de volledige Vlaamse Rand opgenomen?", "Alle gemeenten van Vlaams-Brabant staan in de lijst. Een opdracht wordt nog steeds technisch en praktisch beoordeeld vóór bevestiging."],
      ["Kan ik vanuit een appartementsgebouw aanvragen?", "Ja. Vermeld verdieping, gemeenschappelijke afsluiters, technische lokalen en wie toegang kan verlenen."],
    ],
  }),
  hub("west-vlaanderen", {
    name: "West-Vlaanderen",
    heading: "Loodgieter en verwarmingsservice in West-Vlaanderen",
    groupName: "West-Vlaanderen",
    title: "Loodgieter en verwarmingsservice in West-Vlaanderen | AB Service",
    description: "AB Service behandelt passende aanvragen in alle 62 West-Vlaamse gemeenten, aan de kust en in het binnenland.",
    summary: "Het werkgebied in West-Vlaanderen omvat 62 gemeenten, van kustgemeenten en Brugge tot de Westhoek en de regio Kortrijk-Roeselare. De verplaatsing en technische scope worden vooraf beoordeeld; de website belooft geen uniforme responstijd voor de hele provincie.",
    details: "De volledige lijst helpt klanten controleren of hun gemeente wordt bediend. Alleen gebieden met voldoende unieke lokale waarde krijgen later eventueel een eigen indexeerbare pagina.",
    planningTip: "Bezorg een volledige omschrijving met foto’s en gewenste afspraakcontext, zodat dienst en verplaatsing samen kunnen worden beoordeeld.",
    majorCities: ["Brugge", "Kortrijk", "Oostende", "Roeselare", "Waregem", "Ieper"],
    faq: [
      ["Bedient AB Service zowel de kust als het binnenland?", "Ja. Alle 62 West-Vlaamse gemeenten zijn opgenomen; de afstand en timing worden per aanvraag gepland."],
      ["Waarom zijn duidelijke foto’s vooraf belangrijk?", "Ze helpen de technische scope en benodigdheden samen met de langere verplaatsing beter te beoordelen."],
    ],
  }),
  hub("brussel", {
    name: "Brussels Hoofdstedelijk Gewest",
    heading: "Loodgieter en verwarmingsservice in Brussel",
    groupName: "Brussels Hoofdstedelijk Gewest",
    title: "Loodgieter en verwarmingsservice in Brussel | AB Service",
    description: "AB Service bedient de 19 gemeenten van het Brussels Hoofdstedelijk Gewest voor passende verwarmings- en sanitaire aanvragen.",
    summary: "AB Service neemt aanvragen aan uit alle 19 Brusselse gemeenten. Brussel vraagt extra aandacht voor bereikbaarheid, appartementsgebouwen, gemeenschappelijke installaties en praktische toegang; vermeld die context daarom meteen bij uw aanvraag.",
    details: "Deze Nederlandstalige hub bedient de Brusselse zoek- en klantvraag zonder onbevestigde Franstalige dienstverlening te suggereren. Een aparte Franse sectie volgt alleen wanneer AB Service die taal operationeel kan ondersteunen.",
    planningTip: "Geef gemeente, verdieping, toegang tot technische lokalen, parkeercontext en eventuele gebouwbeheerder door voordat een afspraak wordt bevestigd.",
    majorCities: ["Brussel", "Anderlecht", "Schaarbeek", "Ukkel", "Sint-Jans-Molenbeek", "Elsene", "Etterbeek", "Jette", "Evere"],
    faq: [
      ["Zijn alle 19 Brusselse gemeenten opgenomen?", "Ja. De volledige officiële lijst staat hieronder; een afspraak volgt na technische en praktische beoordeling."],
      ["Biedt de website al Franstalige dienstverlening aan?", "Nee. Een Franse sectie wordt pas toegevoegd wanneer AB Service professioneel en operationeel Franstalige klanten kan ondersteunen."],
    ],
  }),
]);

export const getProvinceGroup = (slug) =>
  provinceGroups.find((group) => group.slug === slug);

export const getServiceRegionHub = (slug) =>
  serviceRegionHubs.find((hubEntry) => hubEntry.slug === slug);

export const getDistrict = (slug) =>
  antwerpDistricts.find((area) => area.slug === slug);

export const getDistrictPublicHref = (area) =>
  area && (area.slug === "antwerpen" || area.indexable) ? area.canonicalPath : null;

export const coverageSources = Object.freeze([
  {
    label: "Vlaanderen: overzicht van 285 steden en gemeenten",
    href: "https://www.vlaanderen.be/gemeenten-en-provincies/overzicht-van-vlaamse-steden-en-gemeenten",
  },
  {
    label: "Brussels Hoofdstedelijk Gewest: de 19 gemeenten",
    href: "https://be.brussels/nl/over-het-gewest/structuur-en-organisatie/plaatselijke-besturen-en-gemeenten/gemeenten",
  },
  {
    label: "Stad Antwerpen: de 10 districten",
    href: "https://www.antwerpen.be/info/waarom-een-apart-bestuur-per-district",
  },
  antwerpNeighborhoodSource,
]);

export const buildCoverageDirectoryGroups = () =>
  Object.freeze([
    ...provinceGroups.map((group) => ({
      name: group.name,
      slug: group.slug,
      hubPath: `/werkgebied/${group.slug}`,
      areas: group.areas.map((area) => ({
        name: area.name,
        slug: area.slug,
        href:
          area.name === "Antwerpen"
            ? "/"
            : area.name === "Brussel"
              ? "/werkgebied/brussel"
              : null,
      })),
    })),
    {
      name: "Districten van Antwerpen",
      slug: "antwerp-districts",
      hubPath: "/werkgebied/antwerpen",
      areas: antwerpDistricts.map((area) => ({
        name: area.name,
        slug: area.slug,
        href: getDistrictPublicHref(area),
      })),
    },
  ]);
