// Independent selected-table transcription: original manufacturer PDF, cover
// and table25 pp31–34 personally read. Glyphs in Soort are NOT subcodes.
const gas = "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.";
const pressure = "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.";
const electrical = "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.";
const general = "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.";
const unlock = "Deze melding kan volgens deze handleiding niet door de gebruiker worden herstart: ontgrendeling door de fabrikant is nodig. Reset het toestel niet en laat een bevoegde technicus contact opnemen met de fabrikant. Open geen gesloten onderdelen. Bij gasgeur of een CO-melding verlaat u de onveilige ruimte en neemt u vanuit een veilige plaats contact op met de bevoegde hulpdienst; bij direct gevaar of vermoeden van CO-vergiftiging belt u 112. Bedien bij gasgeur geen elektrische schakelaars of toestellen.";
const controllerGroups = ["7L 261 / 280", "9A 235", "9H 237 / 272", "9L 238 / 9P 239 / 9U 233", "E1 242-245 / 247-249 / 255 / 257", "EA 246 / 252 / 253", "EC 251 / 256 / EF 254", "EH 250 / 258 / 262", "EL 259 / 279 / 290 / EP 287 / EY 263"];

export const nefitFacts = {
  id: "nefit-proline-hrc",
  url: "https://www.nefit-bosch.nl/media/country_pool/professioneel/installateurs/installatie-instructie_proline.pdf",
  sha256: "c1ddc9a7a93c4823f72d9f720f9a1e115b0df9140c89efd0b02c2484302cd81a",
  document: "6720646227", issueMonth: "2013-04", pageCount: 36, pages: "Tabel 25, p. 31-34",
  models: ["ProLine HRC 24/CW3", "ProLine HRC 24/CW4", "ProLine HRC 30/CW5"],
  scope: "De 54 codeverklaringen volgen 78 afzonderlijke meldingen uit tabel 25, p. 31-34 van installatie-instructie 6720646227 (04/2013, NL), uitsluitend voor ProLine HRC 24/CW3, HRC 24/CW4 en HRC 30/CW5. Gegroepeerde subcodes blijven samen. Normale bedrijfstoestanden, servicetoolmeldingen en reset-in-uitvoering zijn weggelaten. 3F 273 is een geplande veiligheidscontrole, niet automatisch een defect; 8C 373/374 vereisen ontgrendeling door de fabrikant. Andere modellen en revisies zijn niet gedekt; controleer de gebruikershandleiding van uw exacte toestel.",
  warning: "Deze gids gebruikt 54 codegroepen uit tabel 25, p. 31-34 van Nefit-installatie-instructie 6720646227 (04/2013, NL) voor ProLine HRC 24/CW3, HRC 24/CW4 en HRC 30/CW5. Dit is een historische Nederlandse handleiding, geen overzicht voor alle Nefit Bosch-ketels of bevestiging van Belgische toestelcompatibiliteit. Een afzonderlijke revisie, artikelnummers en firmwarecompatibiliteit zijn hier niet vastgesteld. Noteer de volledige hoofd- en subcode: een classificatiesymbool is geen subcode. Bij 8C 373/374 is een gebruikersreset niet toegestaan; ontgrendeling door de fabrikant is nodig. Andere reeksen en revisies vallen buiten deze gids; gesloten onderdelen horen bij een bevoegde technicus.",
  label: "Nefit ProLine HRC - installatie-instructie 6720646227 (04/2013, NL)",
  description: "Zoek 54 Nefit ProLine HRC-codegroepen voor 24/CW3, 24/CW4 en 30/CW5 uit 6720646227 (04/2013, NL). Lees de bron en veilige eerste stappen.",
  before: {
    scope: "Alle blokkerende en vergrendelende codes plus de H07-drukmelding uit tabel 25 voor ProLine HRC 24/CW3, HRC 24/CW4 en HRC 30/CW5; normale bedrijfscodes zijn weggelaten.",
    warning: "Deze catalogus bevat alle blokkerende en vergrendelende codes uit de genoemde Nefit ProLine HRC-handleiding. Codes voor andere Nefit Bosch-toestellen en generaties moeten in hun eigen modeldocumentatie worden opgezocht.",
    label: "Nefit ProLine - installatie-instructie",
    description: "Doorzoek de blokkerende en vergrendelende codes voor Nefit Bosch ProLine HRC, met officiële bron en veilig advies.",
  },
  // Literal resolved main+subcode pairs, not expanded guessed ranges.
  sourceIdentifiers: ["0Y 276", "0Y 285", "1A 316", "1C 210", "1P 346", "1U 317", "1Y 318", "2A 343", "2A 344", "2C 348", "2E 207", "2F 345", "2L 266", "2L 329", "2P 341", "2P 342", "2U 213", "2U 349", "3A 264", "3C 217", "3F 273", "3L 214", "3P 216", "3Y 215", "4C 224", "4E 347", "4U 222", "4U 350", "4Y 223", "4Y 351", "6A 227", "6C 228", "6C 306", "6L 229", "7C 231", "7H 328", "7L 261", "7L 280", "8C 373", "8C 374", "8Y 232", "9A 235", "9H 237", "9H 272", "9L 234", "9L 238", "9P 239", "9U 233", "9Y", "C0 288", "C0 289", "CA 286", "CU 240", "CY 241", "E1 242", "E1 243", "E1 244", "E1 245", "E1 247", "E1 248", "E1 249", "E1 255", "E1 257", "EA 246", "EA 252", "EA 253", "EC 251", "EC 256", "EF 254", "EH 250", "EH 258", "EH 262", "EL 259", "EL 279", "EL 290", "EP 287", "EY 263", "H07"],
  excluded: ["-A 208", "-H 200", "=H 201", "0A 202", "0A 305", "0A 353", "0C 283", "0E 265", "0H 203", "0L 284", "0U 270", "0Y 204", "5C 226", "5F", "5H 268", "5Y", "rE"],
  rowChanges: [
    { beforeCode: "2L 266", before: { meaning: "De druksensor meet na vier pogingen onvoldoende drukverhoging.", userAction: pressure }, after: { meaning: "De druksensor meet na vier pogingen onvoldoende drukverhoging aan de cv-zijde (waterstroming); de controle wordt na circa vijf minuten herhaald.", userAction: general } },
    { beforeCode: "2L 329", before: { meaning: "De druksensor meet onvoldoende drukverhoging.", userAction: pressure }, after: { meaning: "De druksensor meet onvoldoende drukverhoging aan de cv-zijde (waterstroming).", userAction: general } },
    { beforeCode: "3F 273", before: { meaning: "Het toestel voert na 24 uur continu bedrijf een veiligheidscontrole uit." }, after: { meaning: "Na 24 uur continu bedrijf onderbreekt het toestel de brander maximaal twee minuten voor een geplande veiligheidscontrole; dit is niet automatisch een defect." } },
    { beforeCode: "4E 347", before: { meaning: "De retoursensor meet een hogere temperatuur dan de aanvoersensor." }, after: { meaning: "De retoursensor meet een hogere temperatuur dan de aanvoersensor; deze handleiding vermeldt een automatische herstart na tien minuten." } },
    ...controllerGroups.map(beforeCode => ({ beforeCode, before: { userAction: gas }, after: { userAction: electrical } })),
    ...["8C 373", "8C 374"].map(beforeCode => ({ beforeCode, before: { userAction: gas }, after: { userAction: unlock } })),
    { beforeCode: "9Y 3", before: { code: "9Y 3", meaning: "Er is een communicatiefout tussen bedieningspaneel en branderautomaat.", userAction: gas, searchTerms: "9Y 3" }, after: { code: "9Y", meaning: "Er is een communicatiefout tussen bedieningspaneel BC10 en branderautomaat.", userAction: electrical, searchTerms: "9Y" } },
    { beforeCode: "C0 288", before: { meaning: "De waterdruk is te hoog of de druksensor is onderbroken.", userAction: pressure }, after: { meaning: "De waterdruk is te hoog (meer dan 5,7 bar) of de contacten van de druksensor zijn onderbroken.", userAction: general } },
    { beforeCode: "C0 289", before: { userAction: pressure }, after: { userAction: electrical } },
    { beforeCode: "H07", before: { meaning: "De cv-waterdruk is laag en het toestelvermogen wordt beperkt." }, after: { meaning: "De cv-waterdruk is laag en het toestelvermogen voor cv en warm water wordt beperkt." } },
  ],
  // Genuine BEFORE 1f10 captured before tracked tests/product edits. Do not rebase.
  preservation: {
    otherTwelveGuides: "31d664a4425096c926bae2a59729981601718ec565dd664eea0bf1f671b3d50f",
    allGuides: "f23620bf95900a9e8bc731974f680868406811d8a3f4010a63255493f383c246",
    allRegistry: "f53512e935268d12dd3cf9abe77877e07d486f68a97a79cfaf7689b62064f3e7",
    guide: "12a9ca6f4ec0b06a52bdcbb7b7500b75b701667ff1a6cefb1ad365add12faa2a",
    codes: "aef6141a84276add30195004534c983fbfec14fb12ac0e1a1178026f4d494541",
    html: "86fd1602faab652afa779a421c723d86810a03435511e65d61b2f20648c4726d",
    metadata: "f4ddcb8dbfa5a91d5aa2b04cc9bf55931acd506ab3739189267449aada4dd22d",
  },
};
const beforeRow = row => {
  const change = nefitFacts.rowChanges.find(c => (c.after.code || c.beforeCode) === row.code);
  return change ? { ...row, ...change.before } : row;
};
export const beforeNefitGuide = guide => guide.slug !== "nefit-bosch" ? guide : {
  ...guide, modelWarning: nefitFacts.before.warning, sourceLabel: nefitFacts.before.label,
  catalogs: guide.catalogs.map(c => c.id !== nefitFacts.id ? c : { ...c, scope: nefitFacts.before.scope, sourceLabel: nefitFacts.before.label, codes: c.codes.map(beforeRow) }),
  codes: guide.codes.map(beforeRow),
};
export const beforeNefitRegistry = page => {
  if (page.path !== "/foutcodes/nefit-bosch") return page;
  const result = { ...page, description: nefitFacts.before.description };
  delete result.lastModified;
  return result;
};
export const beforeNefitMetadata = (meta, slug) => slug !== "nefit-bosch" ? meta : {
  ...meta, description: nefitFacts.before.description,
  openGraph: { ...meta.openGraph, description: nefitFacts.before.description },
  twitter: { ...meta.twitter, description: nefitFacts.before.description },
};
const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
export const beforeNefitHtml = (html, slug) => {
  if (slug !== "nefit-bosch") return html;
  // Match each actual card first: a shared action string must not rewrite an
  // unchanged gas/pressure card elsewhere or another manufacturer's content.
  const restored = html.replace(/<article class="fault-code-card">[\s\S]*?<\/article>/g, card => {
    const code = card.match(/<code>(.*?)<\/code>/)?.[1];
    const change = nefitFacts.rowChanges.find(c => escape(c.after.code || c.beforeCode) === code);
    if (!change) return card;
    for (const field of ["code", "meaning", "userAction"]) {
      if (Object.hasOwn(change.after, field)) card = card.replace(escape(change.after[field]), escape(change.before[field]));
    }
    return card;
  });
  return restored.replace(escape(nefitFacts.warning), escape(nefitFacts.before.warning))
    .replace(escape(nefitFacts.scope), escape(nefitFacts.before.scope))
    .replaceAll(escape(nefitFacts.label), escape(nefitFacts.before.label));
};
