// Selected primary pages were read independently, not inferred from production
// or a filename. Identity/display context is not current BE/SKU/firmware fit.
export const intergasFacts = {
  id: "intergas-prestige",
  url: "https://www.intergas-verwarming.nl/app/uploads/2018/01/Installatievoorschrift-Prestige-88136803.pdf",
  sha256: "28996b1b8237b8dd778d860321b1fea2b08a106b2712a9176594f000eaf66d7a",
  document: "88136803", pageCount: 56, pages: "§ 8.1, p. 42",
  models: ["Prestige A CW6"],
  codes: ["10 / 11 / 12 / 13 / 14", "20 / 21 / 22 / 23 / 24", "0", "1", "2", "4", "5", "6", "8", "27", "29 / 30"],
  numericIdentifiers: ["10", "11", "12", "13", "14", "20", "21", "22", "23", "24", "0", "1", "2", "4", "5", "6", "8", "27", "29", "30"],
  scope: "De 11 bronregels uit § 8.1, p. 42 van installatievoorschrift 88136803 voor Prestige A CW6, met Nederlandse toestelcontext. De tabel geldt bij een knipperende storingsled en een code op het temperatuurdisplay. Cijfers op het servicedisplay kunnen normale bedrijfstoestanden zijn en zijn geen bewijs van deze storing. De 11 bronregels bevatten samen 20 afzonderlijk doorzoekbare genummerde meldingen. De drie gegroepeerde bronregels blijven samen; die bevatten samen 12 van deze meldingen. Andere modellen en revisies zijn niet gedekt; controleer uw exacte toestel en gebruikershandleiding.",
  warning: "Deze gids gebruikt de 11 codegroepen uit § 8.1, p. 42 van Intergas-installatievoorschrift 88136803 voor Prestige A CW6, met Nederlandse toestelcontext. Er moet een knipperende storingsled zijn met een code op het temperatuurdisplay; dezelfde cijfers op het servicedisplay kunnen een normale bedrijfstoestand aanduiden. Controleer dus het display én uw exacte model. Publicatiedatum, revisie, artikelnummer en firmwarecompatibiliteit zijn hier niet vastgesteld; dit is geen bevestiging van Belgische toestelcompatibiliteit. Andere Intergas-reeksen zijn niet gedekt en gesloten onderdelen horen bij een bevoegde technicus.",
  label: "Intergas Prestige A CW6 - installatievoorschrift 88136803 (NL-toestelcontext)",
  description: "Zoek 11 Intergas Prestige A CW6-codegroepen uit 88136803. Controleer storingsled en temperatuurdisplay; lees de bron en veilige eerste stappen.",
  meaning2: "Temperatuursensor S1 en S2 zijn verwisseld.",
  before: {
    scope: "Alle storingscoderegels uit hoofdstuk 8.1 van het officiële installatievoorschrift voor Intergas Prestige; gegroepeerde sensorcodes blijven als één bronregel staan en zijn afzonderlijk doorzoekbaar.",
    warning: "Deze catalogus volgt de volledige storingstabel van de genoemde Intergas Prestige-handleiding. Andere Intergas-toestelreeksen kunnen andere codes, knipperpatronen en modelgebonden controles gebruiken.",
    label: "Intergas Prestige - installatievoorschrift",
    description: "Doorzoek de volledige Intergas Prestige-storingstabel, met modelwaarschuwing, officiële bron en veilige eerste stappen.",
    meaning2: "Temperatuursensor S1 en S2 zijn verwisseld of leveren onlogische waarden.",
  },
  // Complete genuine64d7f56 captures, checked against all41 BASE blobs and
  // every real guide/render/metadata/registry before either task's edits.
  preservation: {
    otherTwelveGuides: "03aec831295362b63f513c78d9564ec04a897172393b29fa229730c3c0c9e5fd",
    allRegistry: "168914ba1dc0450fc17e345d46cbf663688fbafb20d4584629a68907ce7e3235",
    guide: "cc60c47cfedf5e7932558c3173ef3dee0620c1fa3ab56c294c52e2ebef513996",
    codes: "322869e08c455dbd4254677a56d11f8f1ac58f0ec22702f67ace80f3384e90e0",
    html: "788e17bdbc002195ebfe93e7ca53677f7aeea7e9579be07a184a957ca119e570",
    metadata: "044b025cf130456066c7847913e5194b0fd838a9af18ed38242dd46eff6e4002",
  },
};
const beforeRow = row => row.code !== "2" ? row : { ...row, meaning: intergasFacts.before.meaning2 };
export const beforeIntergasGuide = guide => guide.slug !== "intergas" ? guide : {
  ...guide, modelWarning: intergasFacts.before.warning, sourceLabel: intergasFacts.before.label,
  catalogs: guide.catalogs.map(c => c.id !== intergasFacts.id ? c : {
    ...c, scope: intergasFacts.before.scope, sourceLabel: intergasFacts.before.label, codes: c.codes.map(beforeRow),
  }), codes: guide.codes.map(beforeRow),
};
export const beforeIntergasRegistry = page => {
  if (page.path !== "/foutcodes/intergas") return page;
  const result = { ...page, description: intergasFacts.before.description };
  delete result.lastModified;
  return result;
};
export const beforeIntergasMetadata = (meta, slug) => slug !== "intergas" ? meta : {
  ...meta, description: intergasFacts.before.description,
  openGraph: { ...meta.openGraph, description: intergasFacts.before.description },
  twitter: { ...meta.twitter, description: intergasFacts.before.description },
};
export const beforeIntergasHtml = (html, slug) => slug !== "intergas" ? html : html
  .replace(intergasFacts.warning, intergasFacts.before.warning)
  .replace(intergasFacts.scope, intergasFacts.before.scope)
  .replaceAll(intergasFacts.label, intergasFacts.before.label)
  .replace(intergasFacts.meaning2, intergasFacts.before.meaning2);
