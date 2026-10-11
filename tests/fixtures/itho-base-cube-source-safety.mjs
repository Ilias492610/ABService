// Independent primary-reading inputs: 01-04199-001, observed ID2020-07-20-1100,
// NL p12 / diagnostic pp83–95 / controls pp79–82. Original fixed c7b44be
// whole-guide/SSR/registry captures predate both Task57/58 tracked edits.
const gas = "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.";
const pressure = "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.";
const flue = "Schakel het toestel uit en laat rookgasafvoer, luchttoevoer en verbrandingsonderdelen professioneel controleren. Gebruik het toestel niet verder bij rookgasgeur, een CO-melding of zichtbare roetvorming.";
const electrical = "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.";
const general = "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.";
const wControl = "Volgens deze handleiding blijft het toestel bij een W-waarschuwing in bedrijf; de betrokken functie wordt tijdelijk uitgeschakeld of genegeerd. Laat een blijvende of terugkerende melding door uw installateur beoordelen.";
const bControl = "Volgens deze handleiding wacht het toestel bij een B-blokkering en hervat het bedrijf wanneer de blokkering verdwijnt. Reset niet herhaaldelijk; een blijvende melding vraagt professionele beoordeling.";
const eControl = "Volgens deze handleiding is een E-storing vergrendelend. Ontgrendeling verloopt met de RESET-toets vanuit het statusscherm, niet met een spanningsonderbreking. Volg alleen de toepasselijke gebruikersinstructie; combineer de verschillende resetpassages niet tot extra pogingen. Laat een blijvende of terugkerende storing professioneel onderzoeken.";
const gasWithoutReset = "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en laat de oorzaak professioneel beoordelen.";
const flueContext = "Bij rookgasgeur, zichtbare rookgaslekkage of een CO-melding: verlaat de onveilige ruimte en neem van buitenaf contact op met de bevoegde hulpdienst; bij direct gevaar belt u 112. Bedien bij gasgeur geen schakelaars. Zonder zulke gevaarsignalen: noteer code en model en laat luchttoevoer, rookgasafvoer en verbranding professioneel beoordelen. Schakel een toestel dat als zonneboiler-naverwarmer werkt niet zomaar uit.";
const highPressure = "Lees alleen de zichtbare drukweergave en noteer de waarde en het exacte model. Vul het toestel niet bij en tap niet zelf water af om W10 te wissen. Laat de druk en oorzaak professioneel beoordelen; open geen gesloten onderdelen.";
const lowPressure = "Lees de zichtbare drukweergave en noteer de waarde. Een lage displaywaarde alleen bewijst niet dat bijvullen nodig is. Volg een vulinstructie uitsluitend bij een bevestigde lage druk en als de gebruikershandleiding van uw exacte toestel die handeling toestaat. De vulprocedure op p. 76 schrijft voor het toestel niet uit te schakelen. Open geen gesloten onderdelen en laat een terugkerende melding onderzoeken.";
const flow = "Deze doorstromingsmelding bewijst geen lage waterdruk. Controleer alleen de zichtbare drukweergave en of de radiatorkranen geopend zijn; noteer de waarden en het model. Vul niet bij uitsluitend op basis van E16 en werk niet aan pomp, drukverschilregelaar, sensoren of thermische beveiligingen. Laat een blijvende melding technisch beoordelen.";
const wait = "Wacht bij B12 enige minuten zonder opnieuw op RESET te drukken; de handleiding noemt hiervoor geen verdere gebruikershandeling. Onderbreek niet de netspanning om deze blokkering te omzeilen. Blijft de melding staan of keert ze terug, neem contact op met uw installateur.";
const ids = ["W10","W20","W31","B00","B01","B05","B06","B09","B10","B12","B14","B22","B25","E00","E06","E07","E08","E10","E14","E15","E16","E21","E22","E30","E33","E35"];
const pages = [83,83,84,85,86,87,87,87,88,88,88,89,89,90,90,91,91,92,92,92,93,93,94,94,95,95];
const beforeMeanings = {
  W20: "De buitentemperatuursensor meldt een fout.",
  B00: "Een sensor voor cv-aanvoer, rookgas of warm water meet een te hoge temperatuur.",
  B01: "Een sensor voor cv-aanvoer, rookgas of warm water is kortgesloten.",
  B05: "De gemeten netfrequentie is onjuist.",
  B25: "De waterdruk van de cv-installatie is te laag.",
  E08: "Na de warmtelevering blijft ten onrechte ionisatie aanwezig.",
  E16: "Bij cv-vraag is onvoldoende doorstroming.",
  E21: "De maximumthermostaat meldt dat het cv-water te warm is.",
};
const meanings = {
  W20: "Het systeem detecteert geen buitenvoeler; aansluiting, sensor en configuratie zijn mogelijke controlepunten, geen vastgestelde oorzaak.",
  B00: "De handleiding noemt drie sensorvarianten met de aanduiding Sensor open: cv-aanvoer of warm water hoger dan 118 °C, of rookgas hoger dan 138 °C. Noteer ook de sensoromschrijving op het display; dit bewijst geen defect aan één specifiek onderdeel.",
  B01: "De handleiding noemt drie varianten met de aanduiding Sensor kortgesloten: cv-aanvoer of warm water lager dan -10 °C, of rookgas lager dan 10 °C. Die rookgaswaarde staat zonder minteken in de bron. Noteer ook de sensoromschrijving; de oorzaak vraagt technische controle.",
  B05: "Er is een fout in het elektrische systeem gedetecteerd; de overzichtstabel noemt dit een netfrequentiefout, zonder gemeten frequentiewaarde.",
  B25: "De waterdruk is volgens deze handleiding tijdens bedrijf 0,5 bar of lager, of bij het opstarten 1 bar of lager; het toestel wordt geblokkeerd en brandt niet. Een lage weergave stelt de oorzaak niet vast.",
  E08: "Na de warmtelevering blijft het ionisatiesignaal te lang aanwezig.",
  E16: "Bij cv-vraag is onvoldoende doorstroming; lage waterdruk is één mogelijke oorzaak, niet de vastgestelde diagnose.",
  E21: "De maximaalthermostaat schakelt het toestel uit nadat de cv-temperatuursensor meer dan 105 °C aangaf.",
};
const oldGas = ["B09","E06","E07","E08","E10"], oldFlue = ["W31","B00","B01","E00","E22"], oldPressure = ["W10","B25","E16"], oldElectrical = ["W20","B06","B10"];
const beforeAction = code => oldGas.includes(code) ? gas : oldFlue.includes(code) ? flue : oldPressure.includes(code) ? pressure : oldElectrical.includes(code) ? electrical : general;
const action = code => {
  const base = code === "W10" ? highPressure : code === "B25" ? lowPressure : code === "E16" ? flow : code === "B12" ? wait
    : ["W20","B00","B01","B05","B06","B10","B22","E30","E33"].includes(code) ? electrical
      : ["W31","E00","E22"].includes(code) ? flueContext : oldGas.includes(code) ? gasWithoutReset : general;
  return `${code[0] === "W" ? wControl : code[0] === "B" ? bControl : eControl} ${base}`;
};
export const ithoFacts = {
  id: "itho-base-cube", document: "01-04199-001", imprint: "01-04199-001 | ID 2020-07-20-1100", imprintDate: "2020-07-20",
  url: "https://ithodaalderop.compano.com/Data/Environments/000001/Attachment/Bijlage/A01_CV-Ketels/A01_01_Doorstroom/A01_01_01_Cube%20Solo/B01_05_MAN/01-04199-001%20%20Handleiding%20Base%20Cube%20NL.pdf",
  sha256: "ad5b3378ba0d35df03d58e3ce66a3c04df702c87f604bc7b1b8e77b7717b0bba", bytes: 4061075, pageCount: 114,
  models: ["Base Cube 24/30 13L","Base Cube 24/35 16L","Base Cube 30/35 16L"],
  scope: "De 26 W/B/E-codegroepen volgen 30 diagnostische vermeldingen uit § 7.4, p. 83-95 van handleiding 01-04199-001, met imprint ID 2020-07-20-1100. De bron noemt Base Cube 24/30 13L, 24/35 16L en 30/35 16L, met land van bestemming NL. B00 en B01 hebben elk drie sensorvarianten binnen één codegroep. Deze handleiding is uitdrukkelijk niet voor een combinatie met HP (COOL) Cube. Gewone statusmeldingen en pomp-ledmeldingen zijn geen extra W/B/E-codes. Andere modellen, actuele Belgische compatibiliteit, artikelnummers, firmware en nieuwste revisie zijn niet vastgesteld.",
  warning: "Deze gids gebruikt uitsluitend de 26 W/B/E-codegroepen voor Base Cube 24/30 13L, 24/35 16L en 30/35 16L uit handleiding 01-04199-001 (imprint ID 2020-07-20-1100), met Nederlandse toestelbestemming. Niet voor HP (COOL) Cube-combinaties of alle Itho Daalderop-ketels. De imprintdatum is geen afzonderlijk vastgestelde revisie of uitgiftedatum; actuele Belgische toestelcompatibiliteit, artikelnummers, firmware en nieuwste revisie zijn onbekend. W is een waarschuwing, B een automatisch herstellende blokkering en E een vergrendelende storing. De resetpassage op p. 80 noemt circa 15 seconden; p. 82 noemt vijf minuten in een ander diagnoseverloop. Combineer deze niet tot extra resetpogingen. Noteer ook de sensoromschrijving bij B00/B01 en volg de gebruikershandleiding van uw exacte toestel; open de mantel niet.",
  label: "Itho Daalderop Base Cube - handleiding 01-04199-001 (imprint ID 2020-07-20-1100, NL)", pages: "§ 7.2-7.4, p. 78-95",
  description: "Zoek 26 Itho Daalderop Base Cube W/B/E-codegroepen uit handleiding 01-04199-001. Lees de drie modelvarianten, bron en veilige eerste stappen.",
  groupIdentifiers: ids, diagnosticPages: pages,
  before: {
    scope: "Alle waarschuwingen, blokkeringen en storingen uit de overzichtstabel van de officiële Base Cube-handleiding 01-04199-001; varianten met dezelfde code zijn in één doorzoekbare regel samengevoegd.",
    warning: "Deze catalogus bevat de volledige waarschuwing-, blokkering- en foutcodetabel voor de Itho Daalderop Base Cube. Een code van een ander toestelmodel kan een andere betekenis of procedure hebben.",
    label: "Itho Daalderop Base Cube - officiële handleiding", pages: "§ 7.2-7.4, p. 79-95",
    description: "Doorzoek de volledige codetabel voor de Itho Daalderop Base Cube, met officiële handleiding en veilig advies.",
  },
  rowChanges: ids.map((beforeCode, index) => ({ beforeCode, before: { userAction: beforeAction(beforeCode), sourcePage: "§ 7.2-7.4, p. 79-95", ...(Object.hasOwn(beforeMeanings,beforeCode) ? { meaning: beforeMeanings[beforeCode] } : {}) }, after: { userAction: action(beforeCode), sourcePage: `§ 7.4.${beforeCode[0] === "W" ? 1 : beforeCode[0] === "B" ? 2 : 3}, p. ${pages[index]}`, ...(Object.hasOwn(meanings,beforeCode) ? { meaning: meanings[beforeCode] } : {}) } })),
  preservation: {
    otherTwelveGuides: "4eda167088b0d2ec7695c58b859bbd6de648116fe25bdff6412c43560f90da78",
    allGuides: "4b389008f15c873d665dd03baf81b7755efa4645e6bb9fb365b7fa7bacfe42cf",
    allRegistry: "35086940440543c357a784caf9d6416cda6e0d58e4eed4a7c7b824bb482b6c88",
    guide: "8fe6bdb3426ebaebaf1fe59f03ecc2e0a94b2272f787f86f165393bb8ed04082",
    codes: "56ac60ccb75258b0b05eafbc047ef4f2150663582ab050234a5df75bd7982d68",
    html: "abbd6a8b59f3399d6c8b4ff96fd3b003ed7ce0c4fedcaecf681181ca7aca10ea",
    metadata: "70648fba4ab82fd95cd5f57c8510b460cd46e8e28d26ac6705e82448e71776e3",
  },
};
const restoreRow = row => ({ ...row, ...ithoFacts.rowChanges.find(c => c.beforeCode === row.code)?.before });
export const beforeIthoGuide = guide => guide.slug !== "itho-daalderop" ? guide : { ...guide, modelWarning: ithoFacts.before.warning, sourceLabel: ithoFacts.before.label, catalogs: guide.catalogs.map(c => ({ ...c, scope: ithoFacts.before.scope, sourceLabel: ithoFacts.before.label, sourcePages: ithoFacts.before.pages, codes: c.codes.map(restoreRow) })), codes: guide.codes.map(restoreRow) };
export const beforeIthoRegistry = page => { if (page.path !== "/foutcodes/itho-daalderop") return page; const p = { ...page, description: ithoFacts.before.description }; delete p.lastModified; return p; };
export const beforeIthoMetadata = (meta, slug) => slug !== "itho-daalderop" ? meta : { ...meta, description: ithoFacts.before.description, openGraph: { ...meta.openGraph, description: ithoFacts.before.description }, twitter: { ...meta.twitter, description: ithoFacts.before.description } };
const escape = v => v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");
export const beforeIthoHtml = (html, slug) => {
  if (slug !== "itho-daalderop") return html;
  const restored = html.replace(/<article class="fault-code-card">[\s\S]*?<\/article>/g, card => {
    const code = card.match(/<code>(.*?)<\/code>/)?.[1], c = ithoFacts.rowChanges.find(c => c.beforeCode === code);
    if (!c) return card;
    for (const field of ["meaning","userAction","sourcePage"]) if (Object.hasOwn(c.after,field)) card = card.replace(escape(c.after[field]),escape(c.before[field]));
    return card;
  });
  return restored.replace(escape(ithoFacts.warning),escape(ithoFacts.before.warning)).replace(escape(ithoFacts.scope),escape(ithoFacts.before.scope)).replaceAll(escape(ithoFacts.label),escape(ithoFacts.before.label)).replace(escape(ithoFacts.pages),escape(ithoFacts.before.pages));
};
