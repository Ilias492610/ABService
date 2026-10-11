// Independent reading of the original ATAGwarmte HTML, 11 October 2026.
// These are common-occurrence model lists, not exclusive device certification.
const cModels = ["i28","i28EC","i28ECZ","i36C","i36EC","i36ECZ","E325","E325ECZ","A203C","A203EC","A244C","A2442EC"];
const qModels = ["Q25C","Q25CR","Q38C","Q38CR","Q42C","Q42CR","Q51C","Q51CR"];
const eczModels = ["i28ECZ","i36ECZ","E325ECZ"];
const ids = ["C105","C117","C118","C133","C151","BL67","BL85","FILL","612","E02","Systeem ontluchten actief","1P4","108","105"];
const headings = ["ATAG storingscode c105","ATAG storingscode c117","ATAG storingscode c118","ATAG storingscode c133","ATAG Storingscode c151","ATAG Storingscode BL67","ATAG storingscode BL85","ATAG storingscode FILL","ATAG storingscode 612","ATAG storingscode E02","ATAG storingscode Systeem ontluchten actief","ATAG storingscode 1p4","ATAG storingscode 108","ATAG storingscode 105"];
const oldPressure = "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.";
const oldGas = "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.";
const oldGeneral = "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.";
const beforeMeanings = [
  "Het automatische ontluchtingsprogramma is actief; dit is normaal maximaal zeven minuten.",
  "De waterdruk is in koude toestand te hoog.","De waterdruk van de cv-installatie is te laag.",
  "De brander vormt geen vlam; controleer uitsluitend of de gaskraan open staat.",
  "De warmteafgifte of doorstroming is onvoldoende.",
  "Bij Q-serie toestellen is het automatische ontluchtingsprogramma actief.",
  "Bij Q-serie toestellen is de waterdruk te hoog.","Bij Q-serie toestellen is de waterdruk te laag.",
  "Bij ECZ-toestellen is de warmteafgifte of doorstroming onvoldoende.",
  "Bij Q-serie toestellen is geen correcte vlamvorming vastgesteld.",
  "Bij ECZ-toestellen is het automatische ontluchtingsprogramma actief.",
  "Bij ECZ-toestellen meldt de ketel een afwijkende waterdruk.","Bij ECZ-toestellen is de waterdruk te laag.",
  "Bij ECZ-toestellen is geen correcte vlamvorming vastgesteld.",
];
const program = "Het automatische ontluchtingsprogramma is actief en duurt volgens het overzicht normaal maximaal zeven minuten; dit is een programmawaarneming, geen vastgestelde defectdiagnose.";
const high = "De overzichtspagina beschrijft een te hoge waterdruk in koude toestand; de oorzaak is daarmee niet vastgesteld.";
const low = "De overzichtspagina beschrijft een te lage waterdruk; de melding alleen bewijst niet dat bijvullen de juiste oplossing is.";
const gas = "De overzichtspagina geeft gas- en resetadvies, maar stelt voor deze code geen specifieke oorzaak of vlamdiagnose vast.";
const radiator = "De overzichtspagina adviseert de radiatorkranen te controleren en bij een blijvende melding hulp te vragen; zij stelt geen specifieke warmteafgifte- of doorstromingsdiagnose vast.";
const conflict = "De overzichtspagina noemt eerst een te lage waterdruk, maar vervolgt met aftapadvies bij een te hoge druk. Deze tegenstrijdige passage stelt niet vast welke drukafwijking bij dit toestel aanwezig is.";
const programAction = "Wacht het automatische programma af; het overzicht noemt normaal maximaal zeven minuten. Forceer geen reset of spanningsonderbreking om dit programma te omzeilen. Noteer de volledige schermtekst en het model; vraag professionele hulp als de melding blijft staan of terugkeert. Open de mantel niet.";
const highAction = "Lees alleen de zichtbare drukweergave en noteer de waarde, de volledige code en het model. Vul niet bij en tap niet zelf water af om deze melding te wissen. Laat de druk en oorzaak professioneel beoordelen; open geen gesloten onderdelen.";
const lowAction = "Lees de zichtbare drukweergave en noteer de waarde, de volledige code en het model. Vul niet bij uitsluitend op basis van deze melding. Volg een vulinstructie alleen bij bevestigde lage druk en wanneer de gebruikershandleiding van uw exacte toestel die handeling toestaat; gebruik geen universele drukwaarde of slangprocedure uit een merkoverzicht. Open de mantel niet en laat een terugkerende melding onderzoeken.";
const gasAction = "Bij gasgeur: bedien geen schakelaars, verlaat de onveilige ruimte en bel van buitenaf de bevoegde hulpdienst; bij direct gevaar belt u 112. Zonder gasgeur: noteer de volledige code en het model en volg alleen een reset die de toepasselijke gebruikershandleiding toestaat. Reset niet herhaaldelijk, onderbreek niet zomaar de netspanning en werk niet aan gaskraan, gasleiding, brander of rookgasafvoer. Laat een blijvende melding professioneel beoordelen.";
const radiatorAction = "Controleer alleen of de zichtbare radiatorkranen geopend zijn en noteer de volledige code en het model. Deze melding bewijst geen lage waterdruk: vul niet bij uitsluitend op basis van de code. Volg alleen de toepasselijke gebruikershandleiding; reset niet herhaaldelijk en werk niet aan pomp, sensoren of gesloten onderdelen. Vraag professionele hulp als de melding blijft staan of terugkeert.";
const conflictAction = "Lees alleen de zichtbare drukweergave en noteer de waarde, de volledige code en het exacte model. Kies geen vul- of aftaphandeling op basis van de tegenstrijdige 1P4-passage en gebruik geen universele drukwaarde. Laat eerst professioneel vaststellen wat de melding voor uw toestel betekent. Open de mantel niet en reset niet herhaaldelijk.";
const meanings = [program,high,low,gas,radiator,program,high,low,radiator,gas,program,conflict,low,gas];
const actions = [programAction,highAction,lowAction,gasAction,radiatorAction,programAction,highAction,lowAction,radiatorAction,gasAction,programAction,conflictAction,lowAction,gasAction];
const models = ids.map((_,i) => i < 5 ? cModels : [5,6,7,9].includes(i) ? qModels : eczModels);
export const atagFacts = {
  id:"atag-officieel-overzicht", url:"https://www.atagwarmte.nl/atag-cv-ketel-storingscodes",
  sha256:"0ea5ca93e27f9ba8146b2fe30409b2efaa0613ce8c50de8361284bbc6730fc1c", bytes:35515,
  scope:"De 14 meldingsrubrieken uit het officiële ATAGwarmte-overzicht, gelezen op 11 oktober 2026, bevatten drie automatische ontluchtingsprogramma's en elf andere meldingen. De modelnamen per rubriek zijn letterlijk overgenomen uit de lijsten met veelvoorkomende meldingen, niet als exclusieve toestelcompatibiliteit. ECZ-modellen staan ook bij C-codes; i28 en A2442EC blijven gespeld zoals in de bron. Het Nederlandse servicebereik van de website bewijst geen toestelbestemming of Belgische compatibiliteit. Revisie, artikelnummers, firmware en volledigheid voor alle ATAG-ketels zijn niet vastgesteld.",
  warning:"Deze gids volgt de 14 rubrieken van één ATAGwarmte-overzicht, gelezen op 11 oktober 2026; niet alle ATAG-modellen of revisies zijn gedekt. Controleer het exacte toestelmodel, de volledige schermtekst en de toepasselijke gebruikershandleiding. De bron noemt overlappende modelgroepen en schrijft i28 en A2442EC; die spelling bewijst geen exacte toestelcompatibiliteit. C105 is een automatisch programma en is niet dezelfde melding als 105. Bij 1P4 zijn de drukinstructies tegenstrijdig; kies niet zelf tussen bijvullen en aftappen. Herhaald resetten, spanningsonderbreking en gas- of leidingwerk zijn geen algemeen gebruikersadvies. Actuele Belgische compatibiliteit, artikelnummers, firmware en nieuwste revisie zijn onbekend.",
  label:"ATAGwarmte - cv-ketel storingscodes", pages:"Online overzicht, rubrieken 1-14 (gelezen 11 oktober 2026)",
  description:"Zoek 14 ATAG-meldingen uit het officiële overzicht. Vergelijk de genoemde modellen, automatische programma's, bron en veilige eerste stappen.",
  groupIdentifiers:ids, headings, modelsBySection:models, allModels:[...new Set(models.flat())],
  before:{scope:"Alle afzonderlijke storings- en statuscodes die ATAGwarmte op de officiële Nederlandse overzichtspagina publiceert; controleer de genoemde toestelreeks bij iedere code.",warning:"Deze catalogus bevat alle meldingen uit het officiële online ATAG-overzicht, dat meerdere genoemde toestelreeksen combineert. Controleer toestelmodel, schermtekst en eventuele subcode voordat u een verklaring toepast.",pages:"Online merkoverzicht",description:"Doorzoek alle meldingen uit het officiële ATAG-foutcodeoverzicht, met modelcontrole en veilige eerste stappen."},
  rowChanges:ids.map((code,i) => ({beforeCode:code,models:models[i],heading:headings[i],before:{meaning:beforeMeanings[i],userAction:["C117","C118","BL85","FILL","1P4","108"].includes(code)?oldPressure:["C133","E02","105"].includes(code)?oldGas:oldGeneral,sourcePage:"Online merkoverzicht"},after:{meaning:`${meanings[i]} De bron noemt bij deze rubriek: ${models[i].join(", ")}.`,userAction:actions[i],sourcePage:`Online rubriek ${i+1}: ${headings[i]}`}})),
  preservation:{allGuides:"c686b2014f422a925681f0d7775fb005337c11b55f352352c6263f3595f69ffd",allRegistry:"6c23ce0d9ffc498a03b4311586c878f22dc67cdfd31e33c6233e66087cba6286",guide:"da8fec189c21cdf10128c8274bbc9ed21891570953c7c2e5be29c21a2dfe5c79",codes:"3d9f53d8c20b95390078899b20dc66274a9448e3b00ddc25a17f635a690b0b6e",html:"a12bb9bc7db2da788f494edbd3a2a6f6b9c4ff8bf27f23d64e0190cd974e484d",metadata:"0b5c4d3775af50f64767d7bdaa40074bbcc01a69203e866c9ec9004e13550e1b",otherTwelveGuides:"8c748a7f666db814d51ec04fcf2a54872543a350b4328b6c67837aebba9e6b11",oldSnapshots:"d13da05b0785f8c78f07722a31ad5f8f74da7dac7b2ebdec7bde1886be5666b1",otherEntries:"3fb92bcc1d20fc7c8334a3fb10fc1b2dd7b363b7ad910586009125f23171fea2",otherMirrors:"0aa46fc96f2f9799d52f4f3d5b46ee6c4edcfd45fe72773ce7a87ac759f6c3ae"},
};
const restoreRow = row => ({...row,...atagFacts.rowChanges.find(c=>c.beforeCode===row.code)?.before});
export const beforeAtagGuide = guide => guide.slug!=="atag"?guide:{...guide,modelWarning:atagFacts.before.warning,catalogs:guide.catalogs.map(c=>({...c,scope:atagFacts.before.scope,sourcePages:atagFacts.before.pages,codes:c.codes.map(restoreRow)})),codes:guide.codes.map(restoreRow)};
export const beforeAtagRegistry = page => {if(page.path!=="/foutcodes/atag")return page;const p={...page,description:atagFacts.before.description};delete p.lastModified;return p;};
export const beforeAtagMetadata = (meta,slug) => slug!=="atag"?meta:{...meta,description:atagFacts.before.description,openGraph:{...meta.openGraph,description:atagFacts.before.description},twitter:{...meta.twitter,description:atagFacts.before.description}};
const escape = v=>v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");
export const beforeAtagHtml = (html,slug) => {
  if(slug!=="atag")return html;
  const restored=html.replace(/<article class="fault-code-card">[\s\S]*?<\/article>/g,card=>{const code=card.match(/<code>(.*?)<\/code>/)?.[1],c=atagFacts.rowChanges.find(c=>c.beforeCode===code);if(!c)return card;for(const field of ["meaning","userAction","sourcePage"])card=card.replace(escape(c.after[field]),escape(c.before[field]));return card;});
  return restored.replace(escape(atagFacts.warning),escape(atagFacts.before.warning)).replace(escape(atagFacts.scope),escape(atagFacts.before.scope)).replace(escape(atagFacts.pages),escape(atagFacts.before.pages));
};
