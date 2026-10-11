// Main independently read the actual visible primary chapter headers and
// boundaries; hidden legacy/German PDF text is not applicability evidence.
// Counts below describe preserved pre-edit explanation rows, not a fresh
// literal 242-row manufacturer audit or an exhaustive model/SKU inventory.
export const boschBoundaryFacts = {
  url: "https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf",
  sha256: "442ccaafddd34a27a6e2a26e37a5c062414140cc19c20e19fb83c7b4776278c3",
  pageCount: 268,
  entries: [
    { id: "bosch-serie-7000i", title: "Serie 7000i vanaf bouwjaar 2017", chapterPage: 10, chapterGeneration: "vanaf bouwjaar 2017", pages: "p. 27-30", rows: 31,
      scope: "Selectie van 31 bestaande codeverklaringen uit p. 27-30 van het hoofdstuk Serie 7000i vanaf bouwjaar 2017. Hoofdcode en subcode horen samen. Dit is geen volledige lijst van bedrijfs-, service- en storingsmeldingen of bewijs van geldigheid voor iedere 7000i-variant." },
    { id: "bosch-serie-9000i", title: "Serie 9000i vanaf bouwjaar 2015", chapterPage: 32, chapterGeneration: "vanaf bouwjaar 2015", pages: "p. 45-53", rows: 41,
      scope: "Selectie van 41 bestaande codeverklaringen uit p. 45-53 van het hoofdstuk Serie 9000i vanaf bouwjaar 2015. De bron bevat ook bedrijfs- en servicemeldingen; dit is geen volledige weergave van die tabel of bewijs van geldigheid voor iedere 9000i-variant." },
    { id: "bosch-cerapur-maxx", title: "Cerapur Maxx", chapterPage: 56, chapterGeneration: null, pages: "p. 64-75", rows: 47,
      scope: "Selectie van 47 bestaande codeverklaringen uit de Cerapur Maxx-tabellen op p. 64-75. Dit is geen volledige bedrijfs- of servicelijst. De exacte vermogens-, gas- en toestelvarianten waarvoor iedere regel geldt, zijn hier niet vastgesteld; controleer de handleiding van uw eigen toestel." },
    { id: "bosch-serie-4", title: "Serie -4 vanaf bouwjaar 2013", chapterPage: 84, chapterGeneration: "vanaf bouwjaar 2013", pages: "p. 103-109", rows: 37,
      scope: "Selectie van 37 bestaande codeverklaringen uit p. 103-109 voor Serie -4 vanaf bouwjaar 2013. Het afzonderlijke HMI-hoofdstuk vanaf bouwjaar 2015 op p. 76 bewijst geen uitwisselbaarheid. Meldingen die specifiek CerapurAero noemen, gelden alleen binnen die modelvoorwaarde. De numerieke meldingen 276 en 370 krijgen geen verzonnen hoofdcode." },
    { id: "bosch-serie-3", title: "Serie -3 vanaf bouwjaar 2007", chapterPage: 111, chapterGeneration: "vanaf bouwjaar 2007", pages: "p. 132-133", rows: 29,
      scope: "De 29 benoemde codegroepen uit de storingscodelijst op p. 132-133 voor Serie -3 vanaf bouwjaar 2007. Twee grafische displaymeldingen na H5 zijn hier niet als alfanumerieke code opgenomen; dit is dus niet de volledige brontabel. A9 noemt specifiek CerapurModul en CerapurModul-Smart, niet iedere Serie -3-variant." },
    { id: "bosch-serie-2", title: "Serie -2, bouwjaar 1997-2006", chapterPage: 134, chapterGeneration: "bouwjaar 1997-2006", pages: "p. 160-163", rows: 57,
      scope: "Selectie van 57 bestaande codeverklaringen uit de historische tabel op p. 160-163 voor bouwjaar 1997-2006. Sommige codes hebben meerdere betekenissen naargelang het concrete toestel; die varianten blijven samen bij dezelfde code. Dit is geen bewijs dat één betekenis voor iedere Serie -2-variant geldt." },
  ],
  newWarning: "Deze pagina gebruikt zes geselecteerde hoofdstukken uit de Nederlandstalige Bosch/Junkers Gids voor de installateur, niet alle codes of toestelvarianten van het merk. Publicatiedatum en revisie van dit codeboek zijn hier niet vastgesteld; de genoemde bouwjaren zijn hoofdstukgrenzen, geen garantie van geldigheid voor ieder toestel. Kies de juiste reeks en controleer typeplaatje, bouwjaar, volledige code en eventuele subcode in de gebruikershandleiding van uw exacte toestel. Het professionele codeboek vervangt die handleiding niet; werkzaamheden aan gesloten onderdelen horen bij een bevoegde technicus.",
  obsoleteWarnings: {
    bosch: "De catalogus volgt alle ketelcodes uit het officiële Bosch-codeboek voor Serie 7000i, Serie 9000i, Cerapur Maxx en de generaties -4, -3 en -2. Kies altijd eerst de toestelreeks: dezelfde code kan per generatie een andere betekenis hebben.",
    junkers: "Het officiële Bosch-codeboek behandelt Junkers- en Bosch-condensatieketels samen. Deze catalogus neemt alle ketelcodes uit de zes gedocumenteerde generaties over; controleer daarom altijd toestelreeks, bouwjaar en eventuele subcode.",
  },
  descriptions: {
    bosch: { before: "Doorzoek alle ketelcodes uit het officiële Bosch-codeboek voor 7000i, 9000i, Cerapur Maxx en de generaties -4, -3 en -2.", after: "Zoek Bosch-foutcodes binnen zes gedocumenteerde ketelreeksen. Lees model- en bouwjaargrenzen, officiële bronnen en veilige eerste stappen." },
    junkers: { before: "Doorzoek alle Junkers-ketelcodes uit het officiële Bosch/Junkers-codeboek per toestelreeks, bouwjaar en subcode.", after: "Zoek Junkers-foutcodes binnen zes hoofdstukken van het Bosch/Junkers-codeboek. Controleer toestelreeks, bouwjaar en subcode vóór toepassing." },
  },
  // Genuine e71 product snapshots, root independently compared every capture
  // with complete pre-edit exports/SSR. These are integrity, NOT source facts.
  preservation: {
    catalogCodeArrays: "b0999056dae21c6232081ec55f1628dcd2d6d07746b54b3ce02732730435737a",
    otherElevenGuides: "4c6b052042504948bb176e74f37816277bd0d21482406dd392ca514d525ed44b",
    allRegistry: "82b5bde1ba6979e990a73bd161a85810784bad760f9bcd8a26cb5d5fc1dc5c56",
    bosch: { guide: "446242ea2d074b7db9853be5a28ccad54d396e2b05b10a2def36656468ef3571", html: "24b3a9649b3f2ea3fdd605a6ccda21c03825ea1c884edf2eefcde353eb381048" },
    junkers: { guide: "35acf0f8d880f55f3bf166d299adafaa94f3fa337c625916ff40ef3e66cd25bf", html: "c3e600432ab656dc80be0a5bdcb2d7505ed0666887651b84ce275e0886acf8ee" },
  },
};

// Genuine pre-edit literals, not newly generated expectations from production.
export const beforeBoschScopes = {
  "bosch-serie-7000i": "Alle blokkerende, vergrendelende en niet-blokkerende storingsregels uit het officiële codeboek. Hoofdcode en subcode horen samen.",
  "bosch-serie-9000i": "Alle fout- en servicemeldingen uit de officiële tabel; normale bedrijfscodes met storingsklasse O zijn niet als fout opgenomen.",
  "bosch-cerapur-maxx": "Alle fout- en waarschuwingscodes uit de Cerapur Maxx-tabellen; gewone bedrijfscodes zijn weggelaten.",
  "bosch-serie-4": "Alle storingscodes en H-meldingen uit de officiële Serie -4-tabellen. Codes voor CerapurAero zijn als zodanig benoemd.",
  "bosch-serie-3": "De volledige storingscodelijst voor Serie -3 in het officiële Bosch/Junkers-codeboek.",
  "bosch-serie-2": "Alle benoemde foutcodes uit de historische Serie -2-tabel. Sommige codes hebben meerdere betekenissen naargelang het concrete toestel; die varianten staan samen bij dezelfde code.",
};
const isTarget = (slug) => Object.hasOwn(boschBoundaryFacts.obsoleteWarnings, slug);

// Project ONLY the exact Task49 scopes/warnings/description/date leaves out of
// historical hashes. Catalog identities, rows, links and every other field stay.
export const beforeBoschScopeGuide = (guide) => !isTarget(guide.slug) ? guide : {
  ...guide,
  modelWarning: boschBoundaryFacts.obsoleteWarnings[guide.slug],
  catalogs: guide.catalogs.map(c => Object.hasOwn(beforeBoschScopes, c.id) ? { ...c, scope: beforeBoschScopes[c.id] } : c),
};
export const beforeBoschScopeRegistry = (page) => {
  const slug = page.path.replace("/foutcodes/", "");
  if (!isTarget(slug)) return page;
  const result = { ...page, description: boschBoundaryFacts.descriptions[slug].before };
  delete result.lastModified;
  return result;
};
export const beforeBoschScopeMetadata = (metadata, slug) => !isTarget(slug) ? metadata : {
  ...metadata, description: boschBoundaryFacts.descriptions[slug].before,
  openGraph: { ...metadata.openGraph, description: boschBoundaryFacts.descriptions[slug].before },
  twitter: { ...metadata.twitter, description: boschBoundaryFacts.descriptions[slug].before },
};
export const beforeBoschScopeHtml = (html, slug) => {
  if (!isTarget(slug)) return html;
  let result = html.replace(boschBoundaryFacts.newWarning, boschBoundaryFacts.obsoleteWarnings[slug]);
  for (const fact of boschBoundaryFacts.entries) result = result.replace(
    `<h2 id="${fact.id}-title">${fact.title}</h2><p>${fact.scope}</p>`,
    `<h2 id="${fact.id}-title">${fact.title}</h2><p>${beforeBoschScopes[fact.id]}</p>`
  );
  return result;
};
