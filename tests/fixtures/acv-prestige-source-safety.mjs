// Main read actual primary cover/control/model/safety/table pages, including
// full pixels42–43. These selected-table facts are independent of production.
// They do NOT establish all ACV/ESYS states, latest edition or SKU/firmware fit.
export const acvFacts = {
  id: "acv-prestige-mkiii",
  url: "https://downloads.acv.com/NT_664Y4200_H_Prestige_MkIII_NL.pdf",
  sha256: "eda557c6086ab17148973eafea4127ce4fda38147ac9569f0b3b188dbf9b61b3",
  pages: "p. 42-43",
  document: "664Y4200", revision: "H", issueMonth: "2011-03", pageCount: 44,
  models: ["Prestige Solo 18 MkIII", "Prestige Solo 32 MkIII", "Prestige Excellence 18 MkIII", "Prestige Excellence 32 MkIII"],
  codes: ["E01", "E02", "E03", "E05", "E07", "E08", "E09", "E11", "E13", "E21", "E25", "E30", "E31", "E32", "E33", "E34", "E37", "E41", "E43", "E44", "E45", "E46", "E47", "NTC"],
  scope: "De 23 genummerde E-codes en de NTC-melding op p. 42-43 van handleiding 664Y4200, revisie H (03/2011): uitsluitend Prestige Solo 18/32 MkIII en Excellence 18/32 MkIII met ESYS. E03 houdt beide bronbetekenissen samen; NTC gaat over het temperatuurverschil tussen T1 en T2, niet over een vastgesteld waterdrukprobleem. Andere ESYS-schermmeldingen, toestelreeksen en revisies vallen niet onder deze tabel. Controleer het typeplaatje en de gebruikershandleiding van uw exacte toestel.",
  warning: "Deze gids gebruikt de 24 codegroepen op p. 42-43 van ACV-handleiding 664Y4200, revisie H (03/2011), voor Prestige Solo 18/32 MkIII en Excellence 18/32 MkIII met ESYS. Dit is een historische handleiding voor meerdere landen, geen lijst voor alle ACV-ketels of iedere ESYS-schermmelding. Nieuwere revisies, HeatMaster en andere reeksen zijn niet gedekt. Controleer typeplaatje, gasvariant en de gebruikershandleiding van uw exacte toestel; artikelnummers en firmwarecompatibiliteit zijn hier niet vastgesteld. Werkzaamheden aan gesloten onderdelen horen bij een bevoegde technicus.",
  label: "ACV Prestige MkIII - handleiding 664Y4200, revisie H (03/2011)",
  description: "Zoek 24 ACV-codegroepen voor Prestige Solo en Excellence 18/32 MkIII met ESYS, bron 664Y4200 H (03/2011). Lees betekenis en veilige eerste stappen.",
  e37Meaning: "De regeling meldt een waterdrukprobleem; deze tabel noemt geen drukrichting of grenswaarde.",
  actions: {
    E37: "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
    E41: "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
    E47: "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
    NTC: "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
  },
  before: {
    scope: "Alle foutcodes uit het officiële ACV-overzicht voor Prestige MKIII met ESYS-regeling, inclusief de NTC-debietmelding zonder nummer.",
    warning: "Deze catalogus bevat de volledige ESYS-foutcodetabel van de genoemde ACV Prestige MKIII-handleiding. Gebruik de code niet voor een andere ACV-reeks zonder het toestelmodel en de bijbehorende handleiding te controleren.",
    label: "ACV Prestige MKIII - installatie-, gebruiks- en onderhoudsvoorschriften",
    description: "Doorzoek de volledige ESYS-foutcodetabel voor ACV Prestige MKIII, met officiële handleiding en veilige eerste stappen.",
    e37Meaning: "De gemeten waterdruk valt buiten het toegestane bereik.",
    pressureAction: "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.",
  },
  // Genuine captured64 full real exports/SSR, root independently compared
  // all13 exports/renders/metadata/82registry/35sourcefiles before any edit.
  preservation: {
    otherTwelveGuides: "065e1e4fe5ca28375e9b37fcd5b9a9af58fda574989f0d16593c2e2cf2a69be5",
    allRegistry: "5c8edcf4a2ae52f65640b37b1e2ae3270b2b047dcba55b0d3273331aa883507d",
    guide: "70e48192bd6f0ab57bb5afb285e02ba3eb9f48456a44f573d9d0d488d344dc44",
    codes: "f51d53dad1a6b52024bc383293008abcdd1461b3556db0d936f05bdc91799311",
    html: "baa2526f695ee89b1d7e4f8707f6a1e9ee64361bc31668f4f2bd483ee84ba1ec",
    metadata: "80e9ff3a17b48c7a62787575db2c8203d2203458bad3fae0cc986385134205ba",
  },
};

// Project ONLY the separately approved Task50 leaves for historical guards;
// preserve every original digest and unrelated field/row instead of rebasing.
const beforeRow = row => !Object.hasOwn(acvFacts.actions, row.code) ? row : {
  ...row, ...(row.code === "E37" ? { meaning: acvFacts.before.e37Meaning } : {}),
  userAction: acvFacts.before.pressureAction,
};
export const beforeAcvGuide = guide => guide.slug !== "acv" ? guide : {
  ...guide, modelWarning: acvFacts.before.warning, sourceLabel: acvFacts.before.label,
  catalogs: guide.catalogs.map(c => c.id !== acvFacts.id ? c : {
    ...c, scope: acvFacts.before.scope, sourceLabel: acvFacts.before.label,
    codes: c.codes.map(beforeRow),
  }),
  codes: guide.codes.map(beforeRow),
};
export const beforeAcvRegistry = page => {
  if (page.path !== "/foutcodes/acv") return page;
  const result = { ...page, description: acvFacts.before.description };
  delete result.lastModified;
  return result;
};
export const beforeAcvMetadata = (metadata, slug) => slug !== "acv" ? metadata : {
  ...metadata, description: acvFacts.before.description,
  openGraph: { ...metadata.openGraph, description: acvFacts.before.description },
  twitter: { ...metadata.twitter, description: acvFacts.before.description },
};
export const beforeAcvHtml = (html, slug) => {
  if (slug !== "acv") return html;
  return html.replace(acvFacts.warning, acvFacts.before.warning)
    .replace(acvFacts.scope, acvFacts.before.scope)
    .replaceAll(acvFacts.label, acvFacts.before.label)
    .replace(/<article class="fault-code-card">[\s\S]*?<\/article>/g, article => {
      const code = article.match(/<code>([^<]+)<\/code>/)?.[1];
      if (!Object.hasOwn(acvFacts.actions, code)) return article;
      return article.replace(acvFacts.e37Meaning, acvFacts.before.e37Meaning)
        .replace(acvFacts.actions[code], acvFacts.before.pressureAction);
    });
};
