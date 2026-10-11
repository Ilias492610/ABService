// Independently transcribed from original DRS9100 v9 (aug2015) S1/S2/S3/S12/S13;
// exact accepted ab6ecdd before captures fixed BEFORE tests/product edits.
const gas = "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.";
const pressure = "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.";
const flue = "Schakel het toestel uit en laat rookgasafvoer, luchttoevoer en verbrandingsonderdelen professioneel controleren. Gebruik het toestel niet verder bij rookgasgeur, een CO-melding of zichtbare roetvorming.";
const electrical = "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.";
const general = "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.";
const highPressure = "Lees alleen de zichtbare manometer of drukweergave en noteer de waarde en het exacte model. Vul het toestel niet bij en tap niet zelf water af om deze hogedrukmelding te wissen. Laat de druk en oorzaak door een bevoegde technicus beoordelen; open geen gesloten onderdelen.";
const aControl = "Bij een A-code moet de oorzaak zijn verholpen vóór een reset. Keert de melding terug, neem contact op met uw installateur; omzeil de resetbegrenzing niet.";
const fControl = "Bij deze F-code heeft de resettoets geen effect. Laat een terugkerende melding door uw installateur onderzoeken; noteer het exacte toesteltype en de code.";
const gasWithoutReset = gas.replace("Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.", "Zonder gasgeur: noteer de volledige code en laat de oorzaak professioneel beoordelen.");
const ids = ["A01","A02","A03","A04","A05","A06","A23 / A24","A26","A41","A42","A44","A61","A62","A63","A65","F07","F08","F09","F10","F11","F12","F13","F14","F15","F20","F21","F34","F35","F37","F39","F40","F43","F47","F50","F52","F64","F66"];
const beforeGas = ["A01","A02","A06","A61","A62"], beforeFlue = ["A04","A05","F07","F13","F15"], beforePressure = ["A26","A41","F20","F21","F37","F40","F47"], beforeElectrical = ["A42","F10","F11","F12","F14","F39","F52"];
const beforeAction = code => beforeGas.includes(code) ? gas : beforeFlue.includes(code) ? flue : beforePressure.includes(code) ? pressure : beforeElectrical.includes(code) ? electrical : general;
const beforeMeanings = {
  A04: "De temperatuur van de rookgassen is te hoog geworden.",
  "A23 / A24": "Een parameterinstelling is ongeldig of de regelprint meldt een probleem.",
  A26: "Binnen één uur is drie keer een te hoge waterdruk gemeten.",
  A41: "Na ontsteking is onvoldoende watercirculatie in het cv-circuit gemeten.",
  A63: "De regelprint meldt een intern probleem.", A65: "De regelprint meldt een intern probleem.",
  F08: "De cv-aanvoertemperatuur is hoger dan 99 °C.", F09: "De cv-retourtemperatuur is hoger dan 99 °C.",
  F12: "De tapwatertemperatuursensor is niet aangesloten of defect.", F13: "De rookgastemperatuursensor is niet aangesloten of kortgesloten.",
  F20: "De waterdruk ligt tussen 0,4 en 0,7 bar.", F21: "De waterdruk ligt tussen 2,5 en 2,8 bar.",
  F35: "De gemeten netfrequentie is onjuist.", F40: "De waterdruk is hoger dan 2,8 bar.", F66: "De programmering van de regelprint is ongeldig.",
};
const meanings = {
  A04: "De rookgastemperatuurmelding F07 is drie keer voorgekomen in de laatste 24 uur.",
  "A23 / A24": "Er is een instelprobleem; de handleiding noemt parametercontrole en een mogelijk printprobleem, geen vastgestelde oorzaak.",
  A26: "Binnen één uur is drie keer de hogedrukmelding F40 opgetreden.",
  A41: "Na ontsteking is drie keer geen stijging van de cv-aanvoertemperatuur van minstens 1 °C na 15 seconden gemeten; dit wijst op onvoldoende watercirculatie, niet automatisch op lage waterdruk.",
  A63: "De regelprint meldt een probleem.", A65: "De regelprint meldt een probleem.",
  F08: "De cv-aanvoertemperatuur is hoger dan 99 °C. Volgens deze handleiding ontsteekt het toestel weer onder 89 °C, alleen als er warmtevraag is.",
  F09: "De cv-retourtemperatuur is hoger dan 99 °C. Volgens deze handleiding ontsteekt het toestel weer onder 89 °C, alleen als er warmtevraag is.",
  F12: "De tapwatertemperatuursensor meldt een fout; de precieze oorzaak vraagt technische controle.",
  F13: "De rookgastemperatuursensor meldt een fout; aansluiting, kortsluiting en printverbinding zijn controlepunten, geen vastgestelde oorzaak.",
  F20: "De waterdruk ligt tussen 0,4 en 0,7 bar. Volgens deze handleiding blijft het toestel bij deze melding functioneren.",
  F21: "De waterdruk ligt tussen 2,5 en 2,8 bar. Volgens deze handleiding blijft het toestel bij deze melding functioneren.",
  F35: "Er is een frequentiefout gemeld; de handleiding noemt een mogelijk printprobleem.",
  F40: "De waterdruk is hoger dan 2,8 bar; volgens deze handleiding schakelt het toestel uit.",
  F66: "De regelprint meldt een programmeerfout.",
};
const explicitElectrical = ["A23 / A24","A63","A65","F34","F35","F47","F50","F64","F66"];
const expectedAction = code => {
  let base = ["A26","F21","F40"].includes(code) ? highPressure : explicitElectrical.includes(code) ? electrical : code === "A41" ? general : beforeGas.includes(code) ? gasWithoutReset : beforeAction(code);
  if (["F20","F37"].includes(code)) base += " Een lage displaywaarde alleen bewijst niet dat bijvullen nodig is; een verschil met de zichtbare manometer kan technische beoordeling vragen.";
  if (code === "F64") base += " Onderbreek niet zelf de netspanning om deze melding te wissen.";
  return `${code.startsWith("A") ? aControl : fControl} ${base}`;
};
export const ferroliFacts = {
  id: "ferroli-bluesense", url: "https://www.ferroli.com/media/1547640352.pdf",
  sha256: "6d18f84f4061f9126e5df5a5d505a4732dedb4c7fa7662239ba59d10a73c1224", pageCount: 16,
  document: "DRS9100", revision: "versie 9", issueMonth: "2015-08", pages: "§ 9, p. S12-S13",
  models: ["BlueSense 3","BlueSense 4","BlueSense 5","BlueSense 3 (toevoeging 12)","BlueSense 4 (toevoeging 12)","BlueSense 5 (toevoeging 12)","BlueSense 3 (toevoeging 22)","BlueSense 4 (toevoeging 22)","BlueSense 5 (toevoeging 22)","BlueSense 3 (toevoeging 32)","BlueSense 4 (toevoeging 32)","BlueSense 5 (toevoeging 32)"],
  scope: "De 37 uitlegblokken uit § 9, S12-S13 van servicehandleiding DRS9100, versie 9 (augustus 2015), volgen 38 afzonderlijke A- en F-codes. De handleiding noemt BlueSense 3, 4 en 5 zonder toevoeging en met toevoeging 12, 22 of 32; controleer de aanduiding op uw toestel. A23/A24 delen één uitleg; A63 en A65 blijven afzonderlijk. FH en d1/d2/d3 zijn normale programma- of wachttijdmeldingen, geen foutcodes. Andere modellen, latere software en revisies zijn niet gedekt.",
  warning: "Deze gids gebruikt uitsluitend de 37 A/F-codegroepen uit § 9, S12-S13 van Ferroli BlueSense-servicehandleiding DRS9100, versie 9 (augustus 2015). De bron noemt BlueSense 3/4/5 zonder toevoeging en met toevoeging 12/22/32. Dit is historische Nederlandse servicedocumentatie, geen overzicht voor alle Ferroli-ketels of bevestiging van Belgische toestelcompatibiliteit. Artikelnummers, actuele firmware en de nieuwste revisie zijn hier niet vastgesteld. Noteer het exacte type, de toevoeging en volledige code en controleer de gebruikershandleiding van uw toestel. Bij A moet de oorzaak vóór een reset zijn verholpen; bij F heeft de resettoets geen effect. F20/F21 zijn de genoemde uitzonderingen waarbij het toestel blijft functioneren. Gesloten onderdelen en terugkerende meldingen vragen een bevoegde technicus.",
  label: "Ferroli BlueSense - servicehandleiding DRS9100, versie 9 (augustus 2015)",
  description: "Zoek 37 Ferroli BlueSense-codegroepen uit DRS9100 versie 9 (augustus 2015). Lees de modelgrenzen, A/F-resetregels en veilige eerste stappen.",
  before: {
    scope: "Alle alarm- en foutcodes uit de officiële BlueSense-servicehandleiding DRS9100 versie 9; FH en d1-d3 zijn normale programma- of wachttijdmeldingen en staan daarom niet in deze foutlijst.",
    warning: "Deze catalogus volgt de volledige A- en F-foutcodetabel uit de genoemde Ferroli BlueSense-servicehandleiding. Raadpleeg voor andere Ferroli-toestelreeksen altijd de modelgebonden documentatie.",
    label: "Ferroli BlueSense - servicehandleiding",
    description: "Doorzoek de volledige A- en F-foutcodetabel voor Ferroli BlueSense, met modelwaarschuwing en veilige stappen.",
  },
  groupIdentifiers: ids,
  sourceIdentifiers: ["A01","A02","A03","A04","A05","A06","A23","A24","A26","A41","A42","A44","A61","A62","A63","A65","F07","F08","F09","F10","F11","F12","F13","F14","F15","F20","F21","F34","F35","F37","F39","F40","F43","F47","F50","F52","F64","F66"],
  excluded: ["FH","d1","d2","d3"],
  rowChanges: ids.map(beforeCode => ({beforeCode,before:{userAction:beforeAction(beforeCode),...(Object.hasOwn(beforeMeanings,beforeCode)?{meaning:beforeMeanings[beforeCode]}:{})},after:{userAction:expectedAction(beforeCode),...(Object.hasOwn(meanings,beforeCode)?{meaning:meanings[beforeCode]}:{})}})),
  preservation: {
    otherTwelveGuides: "c05b5d22c2ad637b033eb7a59eaa6f7dd5bcdac4bd53b9e31e19262493befaa7",
    allGuides: "150f2adb6a33578030c05e022b41367f120c89383d250272497048ed48275b16",
    allRegistry: "d53e6f19695117eb247abf4d549c92fa5dcd62141bd150734d366c4bbce9a606",
    guide: "9fb974cddb6fb9a6d297f234c1a907a8d0ade54d5c6195de9b6ea8119ea7fe0a",
    codes: "6c0cb3ebb570d9fabdc3d74bd6fb9f248c323827b8673d0130f6bad79e100823",
    html: "302def166c7a14158067e0c51dac88d68483213d6b764ad435eb84489f034b4a",
    metadata: "bfec027ff93800f440b93eaa840d4b7448f371930b443232f354c022fa9b725e",
  },
};
const restoreRow = row => ({...row,...ferroliFacts.rowChanges.find(c=>c.beforeCode===row.code)?.before});
export const beforeFerroliGuide = guide => guide.slug !== "ferroli" ? guide : {...guide,modelWarning:ferroliFacts.before.warning,sourceLabel:ferroliFacts.before.label,catalogs:guide.catalogs.map(c=>({...c,scope:ferroliFacts.before.scope,sourceLabel:ferroliFacts.before.label,codes:c.codes.map(restoreRow)})),codes:guide.codes.map(restoreRow)};
export const beforeFerroliRegistry = page => {if(page.path!=="/foutcodes/ferroli")return page;const result={...page,description:ferroliFacts.before.description};delete result.lastModified;return result;};
export const beforeFerroliMetadata = (meta,slug) => slug!=="ferroli"?meta:{...meta,description:ferroliFacts.before.description,openGraph:{...meta.openGraph,description:ferroliFacts.before.description},twitter:{...meta.twitter,description:ferroliFacts.before.description}};
const escape = value => value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");
export const beforeFerroliHtml = (html,slug) => {
  if(slug!=="ferroli")return html;
  const restored=html.replace(/<article class="fault-code-card">[\s\S]*?<\/article>/g,card=>{const code=card.match(/<code>(.*?)<\/code>/)?.[1];const change=ferroliFacts.rowChanges.find(c=>escape(c.beforeCode)===code);if(!change)return card;for(const field of ["meaning","userAction"])if(Object.hasOwn(change.after,field))card=card.replace(escape(change.after[field]),escape(change.before[field]));return card;});
  return restored.replace(escape(ferroliFacts.warning),escape(ferroliFacts.before.warning)).replace(escape(ferroliFacts.scope),escape(ferroliFacts.before.scope)).replaceAll(escape(ferroliFacts.label),escape(ferroliFacts.before.label));
};
