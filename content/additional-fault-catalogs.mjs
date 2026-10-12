import { createFaultCatalog } from "./fault-catalogs.mjs";
import { calentaAceMaticCatalogs } from "./remeha-calenta-ace-matic.mjs";
import { calentaAceMatic25LCatalogs } from "./remeha-calenta-ace-matic-25l.mjs";
import { gb172i2Catalogs } from "./buderus-gb172i2.mjs";
import { atagManualCatalogs } from "./atag-historical-manuals.mjs";

const CALENTA_LEGACY_BE_URL = "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta/150708%20IM%20SM%20Calenta%2015s%2025s%2028c%2035s%2040c%20NL.pdf";

const AVANTA_OBSERVATION_ACTION = "Noteer de volledige code, het exacte model en een zonder openen veilig bereikbaar artikel- of serienummer. Dit overzicht geeft geen herstelhandeling; controleer de toepasselijke gebruikershandleiding en laat een blijvende of terugkerende melding professioneel beoordelen. Open geen gesloten onderdelen en wijzig geen instellingen.";
const withAvantaSourceControls = (catalog) => Object.freeze({
  ...catalog,
  codes: Object.freeze(catalog.codes.map((row, index) => Object.freeze({
    ...row,
    userAction: AVANTA_OBSERVATION_ACTION,
    sourcePage: `Online lijstregel ${index + 1}: ${row.code}`,
  }))),
});


const CALENTA_E_OBSERVATION = "Noteer de volledige E-code, het exacte model en een zonder openen veilig bereikbaar artikel- of serienummer. De controle- en oplossingstabel is voor de installateur; laat een blijvende of terugkerende melding professioneel beoordelen. Open geen gesloten onderdelen, wijzig geen instellingen en gebruik deze servicetabel niet als reset- of herstelprocedure.";
const CALENTA_SU_OBSERVATION = "Noteer de volledige St-status, Su-subcode en het exacte model. Dit is een tijdelijke blokkering; de bron beschrijft hervatten nadat de oorzaak verdwijnt, geen gebruikersherstelprocedure. Laat een blijvende of terugkerende melding professioneel beoordelen. Open geen gesloten onderdelen en wijzig geen instellingen.";
const CALENTA_MEMORY_NOTE = "Deze blokkering wordt volgens de handleiding niet in het storingsgeheugen opgeslagen.";
const CALENTA_OPTIONAL_NOTE = "Deze melding geldt alleen bij aanwezigheid van de betrokken uitbreiding of component.";
const CALENTA_SCU_NOTE = "Deze melding kan ook optreden als een verwachte SCU-print ontbreekt. De code bewijst niet dat de uitbreiding aanwezig is.";
const withCalentaSourceControls = (catalog) => Object.freeze({
  ...catalog,
  codes: Object.freeze(catalog.codes.map((row) => {
    const isBlocking = catalog.id === "remeha-calenta-legacy-blocking";
    const number = Number(row.code.split(":")[1]);
    const printedPage = isBlocking ? (number <= 17 ? 83 : 84) : (number <= 3 ? 79 : number <= 12 ? 80 : number <= 37 ? 81 : 82);
    let userAction = isBlocking ? CALENTA_SU_OBSERVATION : CALENTA_E_OBSERVATION;
    if (["E:40", "Su:15"].includes(row.code)) userAction += " " + CALENTA_OPTIONAL_NOTE;
    if (["E:38", "Su:13"].includes(row.code)) userAction += " " + CALENTA_SCU_NOTE;
    if (["Su:16", "Su:17", "Su:18", "Su:19", "Su:20"].includes(row.code)) userAction += " " + CALENTA_MEMORY_NOTE;
    if (row.code === "Su:20") userAction = "Verschijnt Su:20 kort na inschakelen, dan loopt de configuratieprocedure: volgens deze bron is geen actie nodig. Dit is op zichzelf geen defect; wijzig geen instellingen. Laat alleen een aanhoudende of onverwachte melding professioneel beoordelen. Deze blokkering wordt volgens de handleiding niet in het storingsgeheugen opgeslagen.";
    return Object.freeze({
      ...row,
      userAction,
      sourcePage: `${isBlocking ? "§11.2.2" : "§11.1"}, ${row.code}, gedrukte p. ${printedPage} (PDF-pagina ${printedPage + 1})`,
    });
  })),
});

export const remehaCatalogs = Object.freeze([
  withAvantaSourceControls(createFaultCatalog({
    id: "remeha-avanta",
    title: "Avanta",
    scope:
      "De 17 codeverwijzingen uit het officiële Belgische Avanta-overzicht, gelezen op 12 oktober 2026. De aangekondigde tweede archiefpagina herhaalt dezelfde 17 codes. De bron geeft korte meldingen, geen herstelhandelingen of modelvarianten; dit is geen volledige merkcatalogus of toestelhandleiding. Generatie, artikelnummers, toestelbestemming, Belgische compatibiliteit, firmware en nieuwste revisie zijn hier niet vastgesteld.",
    sourceLabel: "Remeha België Storingswijzer - Avanta",
    sourceUrl: "https://storingswijzer.remeha.be/error-codes-products/avanta/",
    sourcePages: "Online productoverzicht: 17 codeverwijzingen",
    rows: [
      ["E:0", "Storing van de aanvoer- of retoursensor."],
      ["E:01", "De aanvoertemperatuur ligt boven de maximale werktemperatuur."],
      ["E:02", "De retourtemperatuur is hoger dan de aanvoertemperatuur."],
      ["E:03", "Er is een storing van het bedieningspaneel."],
      ["E:04", "Na maximaal vijf startpogingen is geen vlam gevormd.", "gas"],
      ["E:05", "Er is een fout in de ionisatie.", "gas"],
      ["E:06", "Het toestel detecteert ongewenste vlamvorming.", "gas"],
      ["E:07", "Er is geen water in de ketel of de pomp draait niet.", "pressure"],
      ["E:08", "De ventilator is defect.", "flue"],
      ["E:09", "Het toestel detecteert geen water in de ketel.", "pressure"],
      ["E:10", "Er is geen water in de ketel of de pomp draait niet.", "pressure"],
      ["E:11", "De temperatuur in de luchtkast is te hoog.", "flue"],
      ["E:12", "Er is een melding van de warmteterugwinunit."],
      ["E:13", "De storingsdetectie meldt een fout."],
      ["E:43", "Melding over de grenzen van de parameters; dit overzicht specificeert de afwijking niet."],
      ["E:44", "Melding over de grenzen van de parameters; dit overzicht specificeert de afwijking niet."],
      ["E:45", "Melding over de grenzen van de parameters; dit overzicht specificeert de afwijking niet."],
    ],
  })),
  withCalentaSourceControls(createFaultCatalog({
    id: "remeha-calenta-legacy",
    title: "Calenta 15s/25s/28c/35s/40c — E-storingscodes",
    scope: "Historische Belgische Calenta 15s/25s/28c/35s/40c: alle 23 E-codes uit §11.1 van installatie- en servicehandleiding 117061-08, met gedrukte voettekst 080715 - 117061-08. Een E-code is een vergrendeling, niet de St:9/Su-blokkeringsstatus. De controle- en oplossingstabel is voor de installateur; dit is geen gebruikersherstelprocedure. SCU- en WTW-meldingen gelden alleen bij de betrokken configuratie. Niet voor Calenta Ace, Ace-Matic of andere revisies; artikelnummers, firmware, huidige toestelcompatibiliteit en nieuwste editie zijn niet vastgesteld.",
    sourceLabel: "Remeha Calenta België — installatie- en servicehandleiding 117061-08",
    sourceUrl: CALENTA_LEGACY_BE_URL,
    sourcePages: "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
    rows: [
      ["E:00", "De regeling vindt de parameteropslagmodule PSU niet."],
      ["E:01", "De veiligheidsparameters zijn niet geldig."],
      ["E:02", "De ketel meldt kortsluiting in de aanvoertemperatuursensor."],
      ["E:03", "Het circuit van de aanvoertemperatuursensor is onderbroken."],
      ["E:04", "De gemeten warmtewisselaartemperatuur ligt te laag."],
      ["E:05", "De gemeten warmtewisselaartemperatuur ligt te hoog."],
      ["E:06", "De ketel meldt kortsluiting in de retourtemperatuursensor."],
      ["E:07", "Het circuit van de retourtemperatuursensor is onderbroken."],
      ["E:08", "De gemeten retourtemperatuur ligt te laag."],
      ["E:09", "De gemeten retourtemperatuur ligt te hoog."],
      ["E:10", "Aanvoer en retour vertonen een te groot temperatuurverschil."],
      ["E:11", "Aanvoer en retour vertonen een te groot temperatuurverschil."],
      ["E:12", "De warmtewisselaartemperatuur ligt boven het normale bereik (maximaalthermostaat STB)."],
      ["E:14", "De brander kon bij vijf opeenvolgende pogingen niet starten.", "gas"],
      ["E:16", "De regeling ontvangt een vlamsignaal terwijl dat niet verwacht wordt.", "gas"],
      ["E:17", "De SU-print meldt een storing bij de gasklep.", "gas"],
      ["E:34", "De ketel meldt een storing bij de ventilator.", "flue"],
      ["E:35", "De ketel meldt een verwisseling van aanvoer en retour."],
      ["E:36", "De vlam is vijfmaal weggevallen.", "gas"],
      ["E:37", "De communicatieverbinding met de SU-print werkt niet correct.", "electrical"],
      ["E:38", "De communicatieverbinding met de SCU-print werkt niet correct.", "electrical"],
      ["E:39", "De externe blokkeeringang heeft een vergrendeling veroorzaakt."],
      ["E:40", "De controle van de aangesloten warmteterugwinunit is mislukt."],
    ],
  })),
  withCalentaSourceControls(createFaultCatalog({
    id: "remeha-calenta-legacy-blocking",
    title: "Calenta 15s/25s/28c/35s/40c — Su-blokkeringssubcodes",
    scope: "Historische Belgische Calenta 15s/25s/28c/35s/40c: alle 19 Su-subcodes uit §11.2.2 van installatie- en servicehandleiding 117061-08. Su is de substatus bij tijdelijke blokkering St:9, niet een E-vergrendeling; na het verdwijnen van de oorzaak hervat het toestel volgens deze bron zelf. Su:16–20 worden niet in het storingsgeheugen opgeslagen. Su:20 kort na inschakelen vraagt geen actie. De professionele tabel is geen gebruikersherstelprocedure. Niet voor Calenta Ace, Ace-Matic of andere revisies; nieuwste editie en uw exacte toestelcompatibiliteit zijn niet vastgesteld.",
    sourceLabel: "Remeha Calenta België — installatie- en servicehandleiding 117061-08",
    sourceUrl: CALENTA_LEGACY_BE_URL,
    sourcePages: "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
    rows: [
      ["Su:0", "De regeling meldt een onjuiste parameter."],
      ["Su:1", "De maximale aanvoertemperatuur is overschreden."],
      ["Su:2", "De aanvoertemperatuur loopt sneller op dan toegestaan."],
      ["Su:7", "Aanvoer en retour vertonen een te groot temperatuurverschil."],
      ["Su:8", "Het toestel ontvangt geen vrijgavesignaal."],
      ["Su:9", "De ketel meldt een verwisseling van fase en nul in de netvoeding.", "electrical"],
      ["Su:10", "Een externe ingang blokkeert de werking."],
      ["Su:11", "De blokkeeringang of vorstbeveiliging onderbreekt de werking."],
      ["Su:13", "De communicatie met de SCU-print werkt niet correct.", "electrical"],
      ["Su:14", "De gemeten waterdruk ligt onder de vereiste grens.", "pressure"],
      ["Su:15", "De ketel meldt onvoldoende gasdruk.", "gas"],
      ["Su:16", "De configuratie is niet correct of de SU-print wordt niet herkend.", "electrical"],
      ["Su:17", "De configuratie of de standaardtabel met parameters is niet geldig."],
      ["Su:18", "De omschrijving noemt een configuratiefout of een niet-herkende PSU-print. Dezelfde bron noemt PCU in de oorzaak- en oplossingkolom; daarmee is geen eenduidige printdiagnose vastgesteld.", "electrical"],
      ["Su:19", "De configuratie of de dF/dU-toestelparameters zijn niet bekend."],
      ["Su:20", "De configuratieprocedure loopt; dit kan kort na het inschakelen een normale status zijn."],
      ["Su:21", "De communicatie met de SU-print werkt niet correct.", "electrical"],
      ["Su:22", "De vlam is tijdens de werking weggevallen.", "gas"],
      ["Su:25", "De SU-print meldt een interne fout.", "electrical"],
    ],
  })),
  ...calentaAceMaticCatalogs,
  ...calentaAceMatic25LCatalogs,
]);

export const buderusCatalogs = Object.freeze([
  createFaultCatalog({
    id: "buderus-logamax-gb162-v2",
    title: "Logamax plus GB162-70/85/100 V2",
    scope:
      "Selectie uit tabel 17, §12.3, p. 33-37 van installatiehandleiding 6720813438 (2021/07), BE Nederlands, uitsluitend voor Logamax plus GB162-70 V2, Logamax plus GB162-85 V2 en Logamax plus GB162-100 V2. De 52 uitlegregels vertegenwoordigen 74 codecombinaties: alle blokkerende en vergrendelende storingsregels, plus 2F 260, 2P 212, 2U 213, 8Y 232 en H07 zonder toegevoegde classificatie waar de bron geen symbool geeft. Gewone bedrijfs-, componenttest- en resetcodes zijn weggelaten. Het schema op p. 8 noemt de rookgastemperatuursensor alleen voor Zwitserland; 1U 317 en 1Y 318 gelden alleen als dit component aanwezig is. Controleer het typeplaatje, de werkelijke configuratie en de gebruikershandleiding van uw exacte toestel. Andere modellen en revisies zijn niet gedekt.",
    sourceLabel: "Buderus Logamax plus GB162-70/85/100 V2 - installatiehandleiding 6720813438 (2021/07), BE Nederlands",
    sourceUrl: "https://buderus-be-fl.boschtt-documents.com/download/pdf/file/6720813438.pdf",
    sourcePages: "Tabel 17, p. 33-37",
    rows: [
      ["0Y 276", "De aanvoertemperatuursensor meet meer dan 95 °C."],
      ["0Y 277", "De veiligheidstemperatuursensor meet meer dan 95 °C."],
      ["0Y 285", "De retourtemperatuursensor meet meer dan 95 °C."],
      ["1C 210", "De rookgasthermostaat meet een te hoge temperatuur en staat open.", "flue"],
      ["1U 317", "De contacten van de rookgastemperatuursensor zijn kortgesloten. De handleiding noemt deze sensor alleen voor Zwitserland; deze betekenis geldt alleen als de sensor aanwezig is.", "flue"],
      ["1Y 318", "De contacten van de rookgastemperatuursensor zijn onderbroken. De handleiding noemt deze sensor alleen voor Zwitserland; deze betekenis geldt alleen als de sensor aanwezig is.", "flue"],
      ["2E 207", "De waterdruk van de verwarmingsinstallatie is te laag.", "pressure"],
      ["2F 260", "De aanvoertemperatuursensor meet na de branderstart geen temperatuurstijging.", "pressure"],
      ["2F 271", "Het temperatuurverschil tussen aanvoer- en veiligheidssensor is te groot."],
      ["2L 266", "De automatische pomptest is mislukt.", "pressure"],
      ["2P 212", "De temperatuur bij aanvoer- of veiligheidssensor stijgt te snel."],
      ["2U 213", "De temperatuur bij aanvoer- of retoursensor stijgt te snel."],
      ["3A 264", "Het stuursignaal of de spanning van de ventilator viel tijdens bedrijf weg.", "flue"],
      ["3C 217", "Het ventilatortoerental is onregelmatig tijdens het opstarten.", "flue"],
      ["3F 273", "Het toestel was maximaal 2 minuten uitgeschakeld na meer dan 24 uur ononderbroken bedrijf: een veiligheidscontrole. Laat een onverwachte melding of een melding die blijft staan technisch beoordelen.", "general"],
      ["3L 214", "De ventilator draait niet tijdens de opstartfase.", "flue"],
      ["3P 216", "Het ventilatortoerental is te laag.", "flue"],
      ["3Y 215", "Het ventilatortoerental is te hoog.", "flue"],
      ["4A 218", "De aanvoertemperatuursensor meet meer dan 105 °C."],
      ["4C 224", "Een toestelthermostaat heeft een te hoge temperatuur gemeten en staat open."],
      ["4E 278", "De sensortest is mislukt."],
      ["4F 219", "De veiligheidstemperatuursensor meet meer dan 105 °C."],
      ["4L 220", "De veiligheidstemperatuursensor is kortgesloten of meet meer dan 130 °C."],
      ["4P 221", "De contacten van de veiligheidstemperatuursensor zijn onderbroken."],
      ["4U 222", "De contacten van de aanvoertemperatuursensor zijn kortgesloten."],
      ["4Y 223", "De contacten van de aanvoertemperatuursensor zijn onderbroken."],
      ["5C 226", "Een diagnosetool was aangesloten. Laat deze melding technisch beoordelen wanneer ze onverwacht verschijnt of blijft staan.", "electrical"],
      ["6A 227", "Na ontsteking is onvoldoende ionisatiestroom gemeten.", "gas"],
      ["6C 228", "Voor de branderstart is al ionisatiestroom gemeten.", "gas"],
      ["6C 306", "Na het doven van de brander is ionisatiestroom gemeten.", "gas"],
      ["6L 229", "Tijdens het branden is onvoldoende ionisatiestroom gemeten.", "gas"],
      ["6P 269", "De ontstekingsunit is te lang aangestuurd.", "gas"],
      ["7C 231", "De netspanning werd tijdens een vergrendelende storing onderbroken."],
      ["7H 328", "Er trad een kortstondige onderbreking van de netspanning op."],
      ["7L 261 / 280", "De branderautomaat is defect.", "electrical"],
      ["8Y 232", "Het externe schakelcontact is geopend."],
      ["9A 235", "De KIM is te nieuw voor de branderautomaat.", "electrical"],
      ["9A 360", "De aangebrachte KIM past niet bij de branderautomaat.", "electrical"],
      ["9A 361", "De aangebrachte branderautomaat past niet bij de KIM.", "electrical"],
      ["9H 237 / 267 / 272", "De branderautomaat of KIM is defect.", "electrical"],
      ["9L 234", "De contacten van het gasblok zijn onderbroken.", "gas"],
      ["9L 238 / 9P 239 / 9U 233", "De branderautomaat of KIM is defect.", "electrical"],
      ["CA 286", "De retourtemperatuursensor meet meer dan 105 °C."],
      ["CU 240", "De contacten van de retourtemperatuursensor zijn kortgesloten."],
      ["CY 241", "De contacten van de retourtemperatuursensor zijn onderbroken."],
      ["E1 242-245 / 247-249 / 255 / 257", "De branderautomaat of KIM is defect.", "electrical"],
      ["EA 246 / 252 / 253", "De branderautomaat of KIM is defect.", "electrical"],
      ["EC 251 / 256", "De branderautomaat of KIM is defect.", "electrical"],
      ["EF 254 / EH 250 / 258 / 262", "De branderautomaat of KIM is defect.", "electrical"],
      ["EL 259 / 279 / 290", "De branderautomaat of KIM is defect.", "electrical"],
      ["EP 287 / EY 263", "De branderautomaat of KIM is defect.", "electrical"],
      ["H07", "De gemeten waterdruk is laag; het vermogen voor zowel verwarming als warmwaterbedrijf wordt beperkt.", "pressure"],
    ],
  }),
  ...gb172i2Catalogs,
]);

// The overview reserves every table measure for authorized professionals.
// Keep these controls local; no shared action/search generator changes.
const viessmannLiteralCodes = ["10","18","19","20","28","30","38","40","44","48","50","58","90","91","92","93","94","98","99","1A","1b","1F","4C","9A","9b","9C","9E","9F","A3","A4","A7","b0","b1","b5","b7","b8","bA","bb","bC","bd","bE","bF","C1","C2","C3","C4","C5","Cd","CF","d6","d7","d8","dA","db","dC","dd","dE","dF","E0","E3","E4","E5","Eb","EC","Ed","F0","F1","F2","F6","F8","FF"];
const viessmannObserveAction = "Noteer code, model en het artikel- of fabricagenummer op een zonder openen bereikbaar typeplaatje. Laat de melding door een bevoegde vakman beoordelen; deze tabel geeft geen gebruikersinstructies voor resetten, instellingen, onderdelen of leidingwerk.";
const withViessmannSourceControls = catalog => Object.freeze({ ...catalog, codes: Object.freeze(catalog.codes.map((row,index) => {
  const action = row.code === "A4" ? "Bij deze melding niet bijvullen of aftappen op basis van het overzicht. Lees alleen de zichtbare drukweergave en noteer code, waarde, model en veilig bereikbaar artikel- of fabricagenummer. Laat de druk en oorzaak professioneel beoordelen; open geen gesloten onderdelen."
    : row.code === "C5" ? "Deze pompcommunicatiemelding bewijst geen te lage waterdruk. Noteer code, model en veilig bereikbaar artikel- of fabricagenummer; vul niet bij op basis van C5. Laat de pompcommunicatie door een bevoegde vakman beoordelen en verander geen bedrading of codering." : viessmannObserveAction;
  return Object.freeze({ ...row, userAction: action, sourcePage: `Online tabelregel ${index+1}: ${viessmannLiteralCodes[index]}` });
})) });

export const viessmannCatalogs = Object.freeze([
  withViessmannSourceControls(createFaultCatalog({
    id: "viessmann-vitodens-200-300-vitotronic",
    title: "Vitodens 200-W en 300-W met Vitotronic",
    scope:
      "De 71 regels uit de officiële Duitse Viessmann-overzichtstabel, gelezen op 12 oktober 2026, geven globale uitleg bij gascondensatieketels met Vitotronic. De tekst noemt Vitodens 200-W, 300-W, 222-W, 222-F en 333-F, maar verdeelt de regels niet per toestel of artikelnummer. Nieuwere modellen en andere systemen kunnen andere codes hebben; de bron claimt geen volledigheid. Alle maatregelen in deze tabel zijn voor bevoegde vakmensen. Duitse website, artikeldata en hoofdletterzoekhulp bewijzen geen toestelbestemming, Belgische compatibiliteit, firmware of nieuwste revisie.",
    sourceLabel: "Viessmann - foutcodes Vitodens 200-W en 300-W",
    sourceUrl: "https://www.viessmann.de/de/wissen/wartung-und-reparatur/fehlercodes.html",
    sourcePages: "Online tabel, regels 1-71 (gelezen 12 oktober 2026)",
    rows: [
      ["10", "De buitentemperatuursensor is kortgesloten."],
      ["18", "De verbinding met de buitentemperatuursensor is onderbroken."],
      ["19", "De communicatie met de buitentemperatuursensor RF is onderbroken."],
      ["20", "De installatiesensor voor de aanvoertemperatuur bij de hydraulische scheiding is kortgesloten."],
      ["28", "De installatiesensor voor de aanvoertemperatuur bij de hydraulische scheiding is onderbroken."],
      ["30", "De keteltemperatuursensor is kortgesloten."],
      ["38", "De verbinding met de keteltemperatuursensor is onderbroken."],
      ["40", "De aanvoertemperatuursensor van verwarmingscircuit 2 met mengklep is kortgesloten."],
      ["44", "De aanvoertemperatuursensor van verwarmingscircuit 3 met mengklep is kortgesloten."],
      ["48", "De brontabel noemt kortsluiting van de aanvoertemperatuursensor van verwarmingscircuit 2 met mengklep, net als bij 40; zij noemt hier geen onderbreking."],
      ["50", "De boilertemperatuursensor is kortgesloten."],
      ["58", "De ketel bereidt volgens de tabel geen warm water. Sensorcontrole staat alleen bij de vakmanmaatregelen; de oorzaakcel stelt geen sensordefect vast."],
      ["90", "Een temperatuursensor op de zonneregelmodule is kortgesloten."],
      ["91", "Een temperatuursensor op de zonneregelmodule is kortgesloten."],
      ["92", "De collectortemperatuursensor is kortgesloten."],
      ["93", "De retourtemperatuursensor van de zonnecollector is kortgesloten."],
      ["94", "De boilertemperatuursensor van het zonnecircuit is kortgesloten."],
      ["98", "Een temperatuursensor op de zonneregelmodule is onderbroken."],
      ["99", "Een temperatuursensor op de zonneregelmodule is onderbroken."],
      ["1A", "Volumestroomsensor 1 aan de linkerzijde is defect."],
      ["1B", "Volumestroomsensor 2 aan de rechterzijde is defect."],
      ["1F", "Het verschil tussen de gemeten volumestromen is te groot."],
      ["4C", "De aanvoertemperatuursensor van verwarmingscircuit 3 met mengklep is onderbroken."],
      ["9A", "De collectortemperatuursensor is onderbroken."],
      ["9B", "De retourtemperatuursensor van de zonnecollector is onderbroken."],
      ["9C", "De boilertemperatuursensor van het zonnecircuit is onderbroken."],
      ["9E", "De volumestroom in het zonnecircuit is te laag of afwezig, of de temperatuurbeveiliging is aangesproken."],
      ["9F", "De zonneregelmodule of Vitosolic-regeling meldt een fout."],
      ["A3", "De rookgastemperatuursensor is niet correct gepositioneerd.", "flue"],
      ["A4", "De maximale installatiedruk is overschreden.", "pressure"],
      ["A7", "De bedieningseenheid is defect."],
      ["B0", "De rookgastemperatuursensor is kortgesloten.", "flue"],
      ["B1", "Er is een communicatiefout met de bedieningseenheid."],
      ["B5", "De regeling meldt een interne fout."],
      ["B7", "De ketelcodeerstekker meldt een fout; de oorzaakcel stelt niet vast of hij ontbreekt of defect is."],
      ["B8", "De rookgastemperatuursensor is onderbroken.", "flue"],
      ["BA", "Communicatiefout met de uitbreidingsset voor verwarmingscircuit 2 met mengklep."],
      ["BB", "Communicatiefout met de uitbreidingsset voor verwarmingscircuit 3 met mengklep."],
      ["BC", "Communicatiefout met de Vitotrol-afstandsbediening van verwarmingscircuit 1 zonder mengklep."],
      ["BD", "Communicatiefout met de Vitotrol-afstandsbediening van verwarmingscircuit 2 met mengklep."],
      ["BE", "Communicatiefout met de Vitotrol-afstandsbediening van verwarmingscircuit 3 met mengklep."],
      ["BF", "De aangesloten LON-communicatiemodule is niet geschikt."],
      ["C1", "Communicatiefout met uitbreiding EA1."],
      ["C2", "Communicatiefout met de zonneregelmodule of Vitosolic."],
      ["C3", "Communicatiefout met uitbreiding AM1."],
      ["C4", "Communicatiefout met de OpenTherm-uitbreiding."],
      ["C5", "Communicatiefout met de toerentalgeregelde pomp.", "pressure"],
      ["CD", "Communicatiefout met Vitocom 100 via KM-BUS."],
      ["CF", "Communicatiefout met de LON-communicatiemodule."],
      ["D6", "Ingang DE1 van uitbreiding EA1 meldt een storing."],
      ["D7", "Ingang DE2 van uitbreiding EA1 meldt een storing."],
      ["D8", "Ingang DE3 van uitbreiding EA1 meldt een storing."],
      ["DA", "De ruimtetemperatuursensor van verwarmingscircuit 1 zonder mengklep is kortgesloten."],
      ["DB", "De ruimtetemperatuursensor van verwarmingscircuit 2 met mengklep is kortgesloten."],
      ["DC", "De ruimtetemperatuursensor van verwarmingscircuit 3 met mengklep is kortgesloten."],
      ["DD", "De ruimtetemperatuursensor van verwarmingscircuit 1 zonder mengklep is onderbroken."],
      ["DE", "De ruimtetemperatuursensor van verwarmingscircuit 2 met mengklep is onderbroken."],
      ["DF", "De ruimtetemperatuursensor van verwarmingscircuit 3 met mengklep is onderbroken."],
      ["E0", "Een externe LON-deelnemer meldt een fout."],
      ["E3", "Tijdens kalibratie was de warmteafname te laag en schakelde de temperatuurbeveiliging uit."],
      ["E4", "De 24V-voedingsspanning van de regeling is fout."],
      ["E5", "De vlamversterker meldt een fout.", "gas"],
      ["EB", "Tijdens kalibratie is de vlam herhaaldelijk weggevallen.", "gas"],
      ["EC", "Tijdens de kalibratie is een parameterfout opgetreden."],
      ["ED", "De regeling meldt een interne fout."],
      ["F0", "De regeling meldt een interne fout."],
      ["F1", "De rookgastemperatuur heeft de grenswaarde overschreden.", "flue"],
      ["F2", "Volgens de brontabel heeft de keteltemperatuursensor aangesproken."],
      ["F6", "De waarden van de keteltemperatuursensoren wijken te sterk af."],
      ["F8", "De brandstofklep sluit vertraagd.", "gas"],
      ["FF", "Er is een interne fout of de ontgrendelingstoets is geblokkeerd."],
    ],
  })),
]);

export const acvCatalogs = Object.freeze([
  createFaultCatalog({
    id: "acv-prestige-mkiii",
    title: "Prestige MKIII met ESYS-regeling",
    scope:
      "De 23 genummerde E-codes en de NTC-melding op p. 42-43 van handleiding 664Y4200, revisie H (03/2011): uitsluitend Prestige Solo 18/32 MkIII en Excellence 18/32 MkIII met ESYS. E03 houdt beide bronbetekenissen samen; NTC gaat over het temperatuurverschil tussen T1 en T2, niet over een vastgesteld waterdrukprobleem. Andere ESYS-schermmeldingen, toestelreeksen en revisies vallen niet onder deze tabel. Controleer het typeplaatje en de gebruikershandleiding van uw exacte toestel.",
    sourceLabel: "ACV Prestige MkIII - handleiding 664Y4200, revisie H (03/2011)",
    sourceUrl: "https://downloads.acv.com/NT_664Y4200_H_Prestige_MkIII_NL.pdf",
    sourcePages: "p. 42-43",
    rows: [
      ["E01", "Na vijf ontstekingspogingen is nog steeds geen vlam gedetecteerd.", "gas"],
      ["E02", "Het toestel heeft een ongewone vlam gedetecteerd.", "gas"],
      ["E03", "De ingang van de maximumthermostaat staat open of T1/T2 overschrijdt 110 °C."],
      ["E05", "De snelheidsmeting van de ventilator geeft geen signaal.", "flue"],
      ["E07", "De temperatuur van de verbrandingsgassen is te hoog.", "flue"],
      ["E08", "De regeling detecteert geen vlam.", "gas"],
      ["E09", "Het relais van de gasklep meldt een fout.", "gas"],
      ["E11", "Temperatuursensor NTC1 of NTC2 is defect."],
      ["E13", "Er is een fout bij de reset op afstand."],
      ["E21", "De analoog-digitaalomzetter meldt een fout."],
      ["E25", "De CRC-controle meldt een gegevensfout."],
      ["E30", "Temperatuursensor NTC1 is kortgesloten."],
      ["E31", "Temperatuursensor NTC1 heeft een open verbinding."],
      ["E32", "Temperatuursensor NTC3 is kortgesloten."],
      ["E33", "Temperatuursensor NTC3 heeft een open verbinding."],
      ["E34", "De netfrequentie wijkt meer dan 1,5 Hz af."],
      ["E37", "De regeling meldt een waterdrukprobleem; deze tabel noemt geen drukrichting of grenswaarde.", "general"],
      ["E41", "Er is geen communicatie met de waterdruksensor.", "electrical"],
      ["E43", "Temperatuursensor NTC2 is kortgesloten."],
      ["E44", "Temperatuursensor NTC2 heeft een open verbinding."],
      ["E45", "Temperatuursensor NTC5 is kortgesloten."],
      ["E46", "Temperatuursensor NTC5 heeft een open verbinding."],
      ["E47", "De waterdruksensor is open of defect.", "electrical"],
      ["NTC", "Het maximale temperatuurverschil tussen T1 en T2 is overschreden.", "general"],
    ],
  }),
]);

export const intergasCatalogs = Object.freeze([
  createFaultCatalog({
    id: "intergas-prestige",
    title: "Prestige",
    scope:
      "De 11 bronregels uit § 8.1, p. 42 van installatievoorschrift 88136803 voor Prestige A CW6, met Nederlandse toestelcontext. De tabel geldt bij een knipperende storingsled en een code op het temperatuurdisplay. Cijfers op het servicedisplay kunnen normale bedrijfstoestanden zijn en zijn geen bewijs van deze storing. De 11 bronregels bevatten samen 20 afzonderlijk doorzoekbare genummerde meldingen. De drie gegroepeerde bronregels blijven samen; die bevatten samen 12 van deze meldingen. Andere modellen en revisies zijn niet gedekt; controleer uw exacte toestel en gebruikershandleiding.",
    sourceLabel: "Intergas Prestige A CW6 - installatievoorschrift 88136803 (NL-toestelcontext)",
    sourceUrl: "https://www.intergas-verwarming.nl/app/uploads/2018/01/Installatievoorschrift-Prestige-88136803.pdf",
    sourcePages: "§ 8.1, p. 42",
    rows: [
      ["10 / 11 / 12 / 13 / 14", "Temperatuursensor S1 meldt een fout."],
      ["20 / 21 / 22 / 23 / 24", "Temperatuursensor S2 meldt een fout."],
      ["0", "Na de automatische zelfcontrole is een sensorfout vastgesteld."],
      ["1", "De gemeten temperatuur is te hoog."],
      ["2", "Temperatuursensor S1 en S2 zijn verwisseld."],
      ["4", "Na de ontstekingspoging is geen vlamsignaal gemeten.", "gas"],
      ["5", "Het gemeten vlamsignaal is onvoldoende.", "gas"],
      ["6", "De vlamdetectie meldt een fout.", "gas"],
      ["8", "Het toerental van de ventilator is niet juist.", "flue"],
      ["27", "De buitentemperatuursensor is kortgesloten."],
      ["29 / 30", "Het relais van de gasklep is defect.", "gas"],
    ],
  }),
]);

// Only these historical states require manufacturer unlocking, not a reset.
// Keep this override local; the shared action generator is unchanged.
const withNefitManufacturerUnlock = catalog => Object.freeze({
  ...catalog,
  codes: Object.freeze(catalog.codes.map(row => ["8C 373", "8C 374"].includes(row.code)
    ? Object.freeze({ ...row, userAction: "Deze melding kan volgens deze handleiding niet door de gebruiker worden herstart: ontgrendeling door de fabrikant is nodig. Reset het toestel niet en laat een bevoegde technicus contact opnemen met de fabrikant. Open geen gesloten onderdelen. Bij gasgeur of een CO-melding verlaat u de onveilige ruimte en neemt u vanuit een veilige plaats contact op met de bevoegde hulpdienst; bij direct gevaar of vermoeden van CO-vergiftiging belt u 112. Bedien bij gasgeur geen elektrische schakelaars of toestellen." })
    : row)),
});

export const nefitBoschCatalogs = Object.freeze([
  withNefitManufacturerUnlock(createFaultCatalog({
    id: "nefit-proline-hrc",
    title: "Nefit ProLine HRC",
    scope:
      "De 54 codeverklaringen volgen 78 afzonderlijke meldingen uit tabel 25, p. 31-34 van installatie-instructie 6720646227 (04/2013, NL), uitsluitend voor ProLine HRC 24/CW3, HRC 24/CW4 en HRC 30/CW5. Gegroepeerde subcodes blijven samen. Normale bedrijfstoestanden, servicetoolmeldingen en reset-in-uitvoering zijn weggelaten. 3F 273 is een geplande veiligheidscontrole, niet automatisch een defect; 8C 373/374 vereisen ontgrendeling door de fabrikant. Andere modellen en revisies zijn niet gedekt; controleer de gebruikershandleiding van uw exacte toestel.",
    sourceLabel: "Nefit ProLine HRC - installatie-instructie 6720646227 (04/2013, NL)",
    sourceUrl: "https://www.nefit-bosch.nl/media/country_pool/professioneel/installateurs/installatie-instructie_proline.pdf",
    sourcePages: "Tabel 25, p. 31-34",
    rows: [
      ["0Y 276", "De aanvoersensor meet een temperatuur hoger dan 95 °C."],
      ["0Y 285", "De retoursensor meet een temperatuur hoger dan 95 °C."],
      ["1A 316", "De rookgassensor meet een te hoge temperatuur.", "flue"],
      ["1C 210", "De rookgassensor meet een te hoge temperatuur en staat open.", "flue"],
      ["1P 346", "De temperatuur van de rookgassensor stijgt te snel.", "flue"],
      ["1U 317", "De contacten van de rookgassensor zijn kortgesloten.", "flue"],
      ["1Y 318", "De contacten van de rookgassensor zijn onderbroken.", "flue"],
      ["2A 343", "Tijdens cv-bedrijf stijgt de rookgastemperatuur maar de aanvoertemperatuur niet."],
      ["2A 344", "Tijdens warmwaterbedrijf stijgt de rookgastemperatuur maar de aanvoertemperatuur niet."],
      ["2C 348", "Tijdens warmwaterbedrijf is de aanvoertemperatuur hoger dan 85 °C."],
      ["2E 207", "De cv-waterdruk is lager dan 0,2 bar.", "pressure"],
      ["2F 345", "De aanvoersensor meet na de branderstart geen temperatuurstijging."],
      ["2L 266","De druksensor meet na vier pogingen onvoldoende drukverhoging aan de cv-zijde (waterstroming); de controle wordt na circa vijf minuten herhaald.","general"],
      ["2L 329","De druksensor meet onvoldoende drukverhoging aan de cv-zijde (waterstroming).","general"],
      ["2P 341", "De aanvoertemperatuur stijgt te snel."],
      ["2P 342", "De aanvoertemperatuur stijgt te snel."],
      ["2U 213", "De aanvoer- of retourtemperatuur stijgt te snel."],
      ["2U 349", "Het temperatuurverschil tussen aanvoer en retour is bij laaglast te groot."],
      ["3A 264", "Het stuursignaal of de ventilatorspanning viel tijdens bedrijf weg.", "flue"],
      ["3C 217", "De ventilator draait onregelmatig tijdens het opstarten.", "flue"],
      ["3F 273","Na 24 uur continu bedrijf onderbreekt het toestel de brander maximaal twee minuten voor een geplande veiligheidscontrole; dit is niet automatisch een defect.","general"],
      ["3L 214", "De ventilator draait niet tijdens de opstartfase.", "flue"],
      ["3P 216", "De ventilator draait te langzaam.", "flue"],
      ["3Y 215", "De ventilator draait te snel.", "flue"],
      ["4C 224", "De maximaal- of branderthermostaat meet een te hoge temperatuur en staat open."],
      ["4E 347","De retoursensor meet een hogere temperatuur dan de aanvoersensor; deze handleiding vermeldt een automatische herstart na tien minuten."],
      ["4U 222 / 350", "De contacten van de aanvoersensor zijn kortgesloten."],
      ["4Y 223 / 351", "De contacten van de aanvoersensor zijn onderbroken."],
      ["6A 227", "Na ontsteking is onvoldoende ionisatiestroom gemeten.", "gas"],
      ["6C 228", "Voor de branderstart is ionisatiestroom gemeten.", "gas"],
      ["6C 306", "Na het doven van de brander is ionisatiestroom gemeten.", "gas"],
      ["6L 229", "Tijdens het branden is onvoldoende ionisatiestroom gemeten.", "gas"],
      ["7C 231", "De netspanning is tijdens een vergrendelende storing onderbroken."],
      ["7H 328", "Er was een kortstondige onderbreking van de netspanning."],
      ["7L 261 / 280","De branderautomaat is defect.","electrical"],
      ["8C 373","De branderthermostaat heeft te vaak een te hoge temperatuur gemeten."],
      ["8C 374","Tijdens het branden is te vaak onvoldoende ionisatiestroom gemeten.","gas"],
      ["8Y 232", "Het externe schakelcontact is geopend."],
      ["9A 235","De KIM is te nieuw voor de branderautomaat.","electrical"],
      ["9H 237 / 272","De branderautomaat of KIM is defect.","electrical"],
      ["9L 234", "De contacten van het gasregelblok zijn onderbroken.", "gas"],
      ["9L 238 / 9P 239 / 9U 233","De branderautomaat of KIM is defect.","electrical"],
      ["9Y","Er is een communicatiefout tussen bedieningspaneel BC10 en branderautomaat.","electrical"],
      ["C0 288","De waterdruk is te hoog (meer dan 5,7 bar) of de contacten van de druksensor zijn onderbroken.","general"],
      ["C0 289","De contacten van de druksensor zijn kortgesloten.","electrical"],
      ["CA 286", "De retoursensor meet een retourtemperatuur hoger dan 105 °C."],
      ["CU 240", "De contacten van de retoursensor zijn kortgesloten."],
      ["CY 241", "De contacten van de retoursensor zijn onderbroken."],
      ["E1 242-245 / 247-249 / 255 / 257","De branderautomaat of KIM is defect.","electrical"],
      ["EA 246 / 252 / 253","De branderautomaat of KIM is defect.","electrical"],
      ["EC 251 / 256 / EF 254","De branderautomaat of KIM is defect.","electrical"],
      ["EH 250 / 258 / 262","De branderautomaat of KIM is defect.","electrical"],
      ["EL 259 / 279 / 290 / EP 287 / EY 263","De branderautomaat of KIM is defect.","electrical"],
      ["H07","De cv-waterdruk is laag en het toestelvermogen voor cv en warm water wordt beperkt.","pressure"],
    ],
  })),
]);

// One online common-occurrence overview, not an exclusive model partition.
// Preserve the publisher's literal spellings and overlapping ECZ/C lists.
const atagCModels = ["i28","i28EC","i28ECZ","i36C","i36EC","i36ECZ","E325","E325ECZ","A203C","A203EC","A244C","A2442EC"];
const atagQModels = ["Q25C","Q25CR","Q38C","Q38CR","Q42C","Q42CR","Q51C","Q51CR"];
const atagEczModels = ["i28ECZ","i36ECZ","E325ECZ"];
const atagHeadings = ["ATAG storingscode c105","ATAG storingscode c117","ATAG storingscode c118","ATAG storingscode c133","ATAG Storingscode c151","ATAG Storingscode BL67","ATAG storingscode BL85","ATAG storingscode FILL","ATAG storingscode 612","ATAG storingscode E02","ATAG storingscode Systeem ontluchten actief","ATAG storingscode 1p4","ATAG storingscode 108","ATAG storingscode 105"];
const withAtagSourceControls = catalog => Object.freeze({
  ...catalog,
  codes: Object.freeze(catalog.codes.map((row,index) => {
    const models = index < 5 ? atagCModels : ["BL67","BL85","FILL","E02"].includes(row.code) ? atagQModels : atagEczModels;
    let action;
    if (["C105","BL67","Systeem ontluchten actief"].includes(row.code)) action = "Wacht het automatische programma af; het overzicht noemt normaal maximaal zeven minuten. Forceer geen reset of spanningsonderbreking om dit programma te omzeilen. Noteer de volledige schermtekst en het model; vraag professionele hulp als de melding blijft staan of terugkeert. Open de mantel niet.";
    else if (["C117","BL85"].includes(row.code)) action = "Lees alleen de zichtbare drukweergave en noteer de waarde, de volledige code en het model. Vul niet bij en tap niet zelf water af om deze melding te wissen. Laat de druk en oorzaak professioneel beoordelen; open geen gesloten onderdelen.";
    else if (["C118","FILL","108"].includes(row.code)) action = "Lees de zichtbare drukweergave en noteer de waarde, de volledige code en het model. Vul niet bij uitsluitend op basis van deze melding. Volg een vulinstructie alleen bij bevestigde lage druk en wanneer de gebruikershandleiding van uw exacte toestel die handeling toestaat; gebruik geen universele drukwaarde of slangprocedure uit een merkoverzicht. Open de mantel niet en laat een terugkerende melding onderzoeken.";
    else if (["C133","E02","105"].includes(row.code)) action = "Bij gasgeur: bedien geen schakelaars, verlaat de onveilige ruimte en bel van buitenaf de bevoegde hulpdienst; bij direct gevaar belt u 112. Zonder gasgeur: noteer de volledige code en het model en volg alleen een reset die de toepasselijke gebruikershandleiding toestaat. Reset niet herhaaldelijk, onderbreek niet zomaar de netspanning en werk niet aan gaskraan, gasleiding, brander of rookgasafvoer. Laat een blijvende melding professioneel beoordelen.";
    else if (row.code === "1P4") action = "Lees alleen de zichtbare drukweergave en noteer de waarde, de volledige code en het exacte model. Kies geen vul- of aftaphandeling op basis van de tegenstrijdige 1P4-passage en gebruik geen universele drukwaarde. Laat eerst professioneel vaststellen wat de melding voor uw toestel betekent. Open de mantel niet en reset niet herhaaldelijk.";
    else action = "Controleer alleen of de zichtbare radiatorkranen geopend zijn en noteer de volledige code en het model. Deze melding bewijst geen lage waterdruk: vul niet bij uitsluitend op basis van de code. Volg alleen de toepasselijke gebruikershandleiding; reset niet herhaaldelijk en werk niet aan pomp, sensoren of gesloten onderdelen. Vraag professionele hulp als de melding blijft staan of terugkeert.";
    return Object.freeze({ ...row, meaning: `${row.meaning} De bron noemt bij deze rubriek: ${models.join(", ")}.`, userAction: action, sourcePage: `Online rubriek ${index+1}: ${atagHeadings[index]}` });
  })),
});

export const atagCatalogs = Object.freeze([
  withAtagSourceControls(createFaultCatalog({
    id: "atag-officieel-overzicht",
    title: "Officieel ATAG-overzicht voor meerdere ketelreeksen",
    scope:
      "De 14 meldingsrubrieken uit het officiële ATAGwarmte-overzicht, gelezen op 11 oktober 2026, bevatten drie automatische ontluchtingsprogramma's en elf andere meldingen. De modelnamen per rubriek zijn letterlijk overgenomen uit de lijsten met veelvoorkomende meldingen, niet als exclusieve toestelcompatibiliteit. ECZ-modellen staan ook bij C-codes; i28 en A2442EC blijven gespeld zoals in de bron. Het Nederlandse servicebereik van de website bewijst geen toestelbestemming of Belgische compatibiliteit. Revisie, artikelnummers, firmware en volledigheid voor alle ATAG-ketels zijn niet vastgesteld.",
    sourceLabel: "ATAGwarmte - cv-ketel storingscodes",
    sourceUrl: "https://www.atagwarmte.nl/atag-cv-ketel-storingscodes",
    sourcePages: "Online overzicht, rubrieken 1-14 (gelezen 11 oktober 2026)",
    rows: [
      ["C105", "Het automatische ontluchtingsprogramma is actief en duurt volgens het overzicht normaal maximaal zeven minuten; dit is een programmawaarneming, geen vastgestelde defectdiagnose."],
      ["C117", "De overzichtspagina beschrijft een te hoge waterdruk in koude toestand; de oorzaak is daarmee niet vastgesteld.", "pressure"],
      ["C118", "De overzichtspagina beschrijft een te lage waterdruk; de melding alleen bewijst niet dat bijvullen de juiste oplossing is.", "pressure"],
      ["C133", "De overzichtspagina geeft gas- en resetadvies, maar stelt voor deze code geen specifieke oorzaak of vlamdiagnose vast.", "gas"],
      ["C151", "De overzichtspagina adviseert de radiatorkranen te controleren en bij een blijvende melding hulp te vragen; zij stelt geen specifieke warmteafgifte- of doorstromingsdiagnose vast."],
      ["BL67", "Het automatische ontluchtingsprogramma is actief en duurt volgens het overzicht normaal maximaal zeven minuten; dit is een programmawaarneming, geen vastgestelde defectdiagnose."],
      ["BL85", "De overzichtspagina beschrijft een te hoge waterdruk in koude toestand; de oorzaak is daarmee niet vastgesteld.", "pressure"],
      ["FILL", "De overzichtspagina beschrijft een te lage waterdruk; de melding alleen bewijst niet dat bijvullen de juiste oplossing is.", "pressure"],
      ["612", "De overzichtspagina adviseert de radiatorkranen te controleren en bij een blijvende melding hulp te vragen; zij stelt geen specifieke warmteafgifte- of doorstromingsdiagnose vast."],
      ["E02", "De overzichtspagina geeft gas- en resetadvies, maar stelt voor deze code geen specifieke oorzaak of vlamdiagnose vast.", "gas"],
      ["Systeem ontluchten actief", "Het automatische ontluchtingsprogramma is actief en duurt volgens het overzicht normaal maximaal zeven minuten; dit is een programmawaarneming, geen vastgestelde defectdiagnose."],
      ["1P4", "De overzichtspagina noemt eerst een te lage waterdruk, maar vervolgt met aftapadvies bij een te hoge druk. Deze tegenstrijdige passage stelt niet vast welke drukafwijking bij dit toestel aanwezig is.", "pressure"],
      ["108", "De overzichtspagina beschrijft een te lage waterdruk; de melding alleen bewijst niet dat bijvullen de juiste oplossing is.", "pressure"],
      ["105", "De overzichtspagina geeft gas- en resetadvies, maar stelt voor deze code geen specifieke oorzaak of vlamdiagnose vast.", "gas"],
    ],
  })),
  ...atagManualCatalogs,
]);

// Original Base Cube 01-04199-001: local W/B/E controls and exact printed
// diagnostic locators. Do not infer these actions from other brands' keywords.
const ithoDiagnosticPages = { W10:83,W20:83,W31:84,B00:85,B01:86,B05:87,B06:87,B09:87,B10:88,B12:88,B14:88,B22:89,B25:89,E00:90,E06:90,E07:91,E08:91,E10:92,E14:92,E15:92,E16:93,E21:93,E22:94,E30:94,E33:95,E35:95 };
const withIthoSourceControls = catalog => Object.freeze({
  ...catalog,
  codes: Object.freeze(catalog.codes.map(row => {
    const control = row.code[0] === "W"
      ? "Volgens deze handleiding blijft het toestel bij een W-waarschuwing in bedrijf; de betrokken functie wordt tijdelijk uitgeschakeld of genegeerd. Laat een blijvende of terugkerende melding door uw installateur beoordelen."
      : row.code[0] === "B"
        ? "Volgens deze handleiding wacht het toestel bij een B-blokkering en hervat het bedrijf wanneer de blokkering verdwijnt. Reset niet herhaaldelijk; een blijvende melding vraagt professionele beoordeling."
        : "Volgens deze handleiding is een E-storing vergrendelend. Ontgrendeling verloopt met de RESET-toets vanuit het statusscherm, niet met een spanningsonderbreking. Volg alleen de toepasselijke gebruikersinstructie; combineer de verschillende resetpassages niet tot extra pogingen. Laat een blijvende of terugkerende storing professioneel onderzoeken.";
    let action = "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.";
    if (["W20","B00","B01","B05","B06","B10","B22","E30","E33"].includes(row.code)) action = "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.";
    if (["B09","E06","E07","E08","E10"].includes(row.code)) action = "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en laat de oorzaak professioneel beoordelen.";
    if (["W31","E00","E22"].includes(row.code)) action = "Bij rookgasgeur, zichtbare rookgaslekkage of een CO-melding: verlaat de onveilige ruimte en neem van buitenaf contact op met de bevoegde hulpdienst; bij direct gevaar belt u 112. Bedien bij gasgeur geen schakelaars. Zonder zulke gevaarsignalen: noteer code en model en laat luchttoevoer, rookgasafvoer en verbranding professioneel beoordelen. Schakel een toestel dat als zonneboiler-naverwarmer werkt niet zomaar uit.";
    if (row.code === "W10") action = "Lees alleen de zichtbare drukweergave en noteer de waarde en het exacte model. Vul het toestel niet bij en tap niet zelf water af om W10 te wissen. Laat de druk en oorzaak professioneel beoordelen; open geen gesloten onderdelen.";
    if (row.code === "B25") action = "Lees de zichtbare drukweergave en noteer de waarde. Een lage displaywaarde alleen bewijst niet dat bijvullen nodig is. Volg een vulinstructie uitsluitend bij een bevestigde lage druk en als de gebruikershandleiding van uw exacte toestel die handeling toestaat. De vulprocedure op p. 76 schrijft voor het toestel niet uit te schakelen. Open geen gesloten onderdelen en laat een terugkerende melding onderzoeken.";
    if (row.code === "E16") action = "Deze doorstromingsmelding bewijst geen lage waterdruk. Controleer alleen de zichtbare drukweergave en of de radiatorkranen geopend zijn; noteer de waarden en het model. Vul niet bij uitsluitend op basis van E16 en werk niet aan pomp, drukverschilregelaar, sensoren of thermische beveiligingen. Laat een blijvende melding technisch beoordelen.";
    if (row.code === "B12") action = "Wacht bij B12 enige minuten zonder opnieuw op RESET te drukken; de handleiding noemt hiervoor geen verdere gebruikershandeling. Onderbreek niet de netspanning om deze blokkering te omzeilen. Blijft de melding staan of keert ze terug, neem contact op met uw installateur.";
    return Object.freeze({ ...row, userAction: `${control} ${action}`, sourcePage: `§ 7.4.${row.code[0] === "W" ? 1 : row.code[0] === "B" ? 2 : 3}, p. ${ithoDiagnosticPages[row.code]}` });
  })),
});

export const ithoDaalderopCatalogs = Object.freeze([
  withIthoSourceControls(createFaultCatalog({
    id: "itho-base-cube",
    title: "Base Cube",
    scope:
      "De 26 W/B/E-codegroepen volgen 30 diagnostische vermeldingen uit § 7.4, p. 83-95 van handleiding 01-04199-001, met imprint ID 2020-07-20-1100. De bron noemt Base Cube 24/30 13L, 24/35 16L en 30/35 16L, met land van bestemming NL. B00 en B01 hebben elk drie sensorvarianten binnen één codegroep. Deze handleiding is uitdrukkelijk niet voor een combinatie met HP (COOL) Cube. Gewone statusmeldingen en pomp-ledmeldingen zijn geen extra W/B/E-codes. Andere modellen, actuele Belgische compatibiliteit, artikelnummers, firmware en nieuwste revisie zijn niet vastgesteld.",
    sourceLabel: "Itho Daalderop Base Cube - handleiding 01-04199-001 (imprint ID 2020-07-20-1100, NL)",
    sourceUrl: "https://ithodaalderop.compano.com/Data/Environments/000001/Attachment/Bijlage/A01_CV-Ketels/A01_01_Doorstroom/A01_01_01_Cube%20Solo/B01_05_MAN/01-04199-001%20%20Handleiding%20Base%20Cube%20NL.pdf",
    sourcePages: "§ 7.2-7.4, p. 78-95",
    rows: [
      ["W10", "De waterdruk van de cv-installatie is te hoog.", "pressure"],
      ["W20", "Het systeem detecteert geen buitenvoeler; aansluiting, sensor en configuratie zijn mogelijke controlepunten, geen vastgestelde oorzaak."],
      ["W31", "De rookgastemperatuur is te hoog.", "flue"],
      ["B00", "De handleiding noemt drie sensorvarianten met de aanduiding Sensor open: cv-aanvoer of warm water hoger dan 118 °C, of rookgas hoger dan 138 °C. Noteer ook de sensoromschrijving op het display; dit bewijst geen defect aan één specifiek onderdeel."],
      ["B01", "De handleiding noemt drie varianten met de aanduiding Sensor kortgesloten: cv-aanvoer of warm water lager dan -10 °C, of rookgas lager dan 10 °C. Die rookgaswaarde staat zonder minteken in de bron. Noteer ook de sensoromschrijving; de oorzaak vraagt technische controle."],
      ["B05", "Er is een fout in het elektrische systeem gedetecteerd; de overzichtstabel noemt dit een netfrequentiefout, zonder gemeten frequentiewaarde."],
      ["B06", "De cv-regelunit meldt een interne fout."],
      ["B09", "De regeling meldt een fout in het vlamsignaal.", "gas"],
      ["B10", "De fase-aansluiting is onjuist; laat de elektrische aansluiting controleren."],
      ["B12", "De resettoets is te snel of te vaak achter elkaar ingedrukt."],
      ["B14", "De warmwatertemperatuur stijgt niet tijdens de toestelbewaking."],
      ["B22", "Het ingestelde toesteltype is onjuist of wordt niet herkend."],
      ["B25", "De waterdruk is volgens deze handleiding tijdens bedrijf 0,5 bar of lager, of bij het opstarten 1 bar of lager; het toestel wordt geblokkeerd en brandt niet. Een lage weergave stelt de oorzaak niet vast.", "pressure"],
      ["E00", "De ventilator van het cv-toestel meldt een fout.", "flue"],
      ["E06", "Tijdens de start is geen ionisatiesignaal gemeten.", "gas"],
      ["E07", "Het ionisatiesignaal is tijdens warmtelevering weggevallen.", "gas"],
      ["E08", "Na de warmtelevering blijft het ionisatiesignaal te lang aanwezig.", "gas"],
      ["E10", "De aansturing van de gasklep krijgt ten onrechte spanning.", "gas"],
      ["E14", "De warmwatertemperatuur stijgt na drie pogingen niet."],
      ["E15", "Bij warmwatervraag is onvoldoende doorstroming."],
      ["E16", "Bij cv-vraag is onvoldoende doorstroming; lage waterdruk is één mogelijke oorzaak, niet de vastgestelde diagnose.", "pressure"],
      ["E21", "De maximaalthermostaat schakelt het toestel uit nadat de cv-temperatuursensor meer dan 105 °C aangaf."],
      ["E22", "De rookgastemperatuur is te hoog geworden.", "flue"],
      ["E30", "De cv-regelunit meldt een veiligheidsstoring."],
      ["E33", "De cv-regelunit meldt een interne storing."],
      ["E35", "Een blokkerende melding blijft langer dan twintig uur actief."],
    ],
  })),
]);

// DRS9100 v9 restart constraints are local, not a shared classifier change.
const withFerroliSourceControls = catalog => Object.freeze({
  ...catalog,
  codes: Object.freeze(catalog.codes.map(row => {
    let action = row.userAction;
    if (["A26", "F21", "F40"].includes(row.code)) {
      action = "Lees alleen de zichtbare manometer of drukweergave en noteer de waarde en het exacte model. Vul het toestel niet bij en tap niet zelf water af om deze hogedrukmelding te wissen. Laat de druk en oorzaak door een bevoegde technicus beoordelen; open geen gesloten onderdelen.";
    }
    if (["F20", "F37"].includes(row.code)) action += " Een lage displaywaarde alleen bewijst niet dat bijvullen nodig is; een verschil met de zichtbare manometer kan technische beoordeling vragen.";
    if (row.code === "F64") action += " Onderbreek niet zelf de netspanning om deze melding te wissen.";
    if (row.code.startsWith("A")) {
      action = action.replace("Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.", "Zonder gasgeur: noteer de volledige code en laat de oorzaak professioneel beoordelen.");
      action = "Bij een A-code moet de oorzaak zijn verholpen vóór een reset. Keert de melding terug, neem contact op met uw installateur; omzeil de resetbegrenzing niet. " + action;
    } else {
      action = "Bij deze F-code heeft de resettoets geen effect. Laat een terugkerende melding door uw installateur onderzoeken; noteer het exacte toesteltype en de code. " + action;
    }
    return Object.freeze({ ...row, userAction: action });
  })),
});

export const ferroliCatalogs = Object.freeze([
  withFerroliSourceControls(createFaultCatalog({
    id: "ferroli-bluesense",
    title: "BlueSense 3, 4 en 5",
    scope:
      "De 37 uitlegblokken uit § 9, S12-S13 van servicehandleiding DRS9100, versie 9 (augustus 2015), volgen 38 afzonderlijke A- en F-codes. De handleiding noemt BlueSense 3, 4 en 5 zonder toevoeging en met toevoeging 12, 22 of 32; controleer de aanduiding op uw toestel. A23/A24 delen één uitleg; A63 en A65 blijven afzonderlijk. FH en d1/d2/d3 zijn normale programma- of wachttijdmeldingen, geen foutcodes. Andere modellen, latere software en revisies zijn niet gedekt.",
    sourceLabel: "Ferroli BlueSense - servicehandleiding DRS9100, versie 9 (augustus 2015)",
    sourceUrl: "https://www.ferroli.com/media/1547640352.pdf",
    sourcePages: "§ 9, p. S12-S13",
    rows: [
      ["A01", "Tijdens de ontsteking is geen ionisatiesignaal gemeten.", "gas"],
      ["A02", "De regeling detecteert een vlamsignaal terwijl de gasklep gesloten is.", "gas"],
      ["A03", "De cv-aanvoertemperatuur is te hoog geworden."],
      ["A04", "De rookgastemperatuurmelding F07 is drie keer voorgekomen in de laatste 24 uur.", "flue"],
      ["A05", "De ventilator geeft niet tijdig een frequentiesignaal terug.", "flue"],
      ["A06", "Binnen vier minuten is vijf keer het vlamsignaal weggevallen.", "gas"],
      ["A23 / A24", "Er is een instelprobleem; de handleiding noemt parametercontrole en een mogelijk printprobleem, geen vastgestelde oorzaak.", "electrical"],
      ["A26", "Binnen één uur is drie keer de hogedrukmelding F40 opgetreden.", "general"],
      ["A41", "Na ontsteking is drie keer geen stijging van de cv-aanvoertemperatuur van minstens 1 °C na 15 seconden gemeten; dit wijst op onvoldoende watercirculatie, niet automatisch op lage waterdruk.", "general"],
      ["A42", "Het temperatuurverschil tussen de twee aanvoersensoren is te groot."],
      ["A44", "De meting van de tapwatertemperatuur is onjuist."],
      ["A61", "De regeling meldt een fout in het vlamsignaal.", "gas"],
      ["A62", "De gasklep of de aansturing ervan meldt een fout.", "gas"],
      ["A63", "De regelprint meldt een probleem.", "electrical"],
      ["A65", "De regelprint meldt een probleem.", "electrical"],
      ["F07", "De warmtewisselaarsensor meet langer dan twee minuten een te hoge rookgastemperatuur.", "flue"],
      ["F08", "De cv-aanvoertemperatuur is hoger dan 99 °C. Volgens deze handleiding ontsteekt het toestel weer onder 89 °C, alleen als er warmtevraag is."],
      ["F09", "De cv-retourtemperatuur is hoger dan 99 °C. Volgens deze handleiding ontsteekt het toestel weer onder 89 °C, alleen als er warmtevraag is."],
      ["F10", "Aanvoersensor 1 van de dubbelsensor is niet aangesloten of defect."],
      ["F11", "De cv-retourtemperatuursensor is niet aangesloten of defect."],
      ["F12", "De tapwatertemperatuursensor meldt een fout; de precieze oorzaak vraagt technische controle."],
      ["F13", "De rookgastemperatuursensor meldt een fout; aansluiting, kortsluiting en printverbinding zijn controlepunten, geen vastgestelde oorzaak.", "flue"],
      ["F14", "Aanvoersensor 2 van de dubbelsensor is niet aangesloten of defect."],
      ["F15", "De ventilator meldt een fout.", "flue"],
      ["F20", "De waterdruk ligt tussen 0,4 en 0,7 bar. Volgens deze handleiding blijft het toestel bij deze melding functioneren.", "pressure"],
      ["F21", "De waterdruk ligt tussen 2,5 en 2,8 bar. Volgens deze handleiding blijft het toestel bij deze melding functioneren.", "general"],
      ["F34", "De voedingsspanning is te laag.", "electrical"],
      ["F35", "Er is een frequentiefout gemeld; de handleiding noemt een mogelijk printprobleem.", "electrical"],
      ["F37", "De waterdruk is lager dan 0,4 bar.", "pressure"],
      ["F39", "De buitentemperatuursensor meldt een fout."],
      ["F40", "De waterdruk is hoger dan 2,8 bar; volgens deze handleiding schakelt het toestel uit.", "general"],
      ["F43", "De cv-aanvoertemperatuur stijgt te snel."],
      ["F47", "De cv-waterdruksensor is niet aangesloten of defect.", "electrical"],
      ["F50", "De regelprint meldt een fout.", "electrical"],
      ["F52", "Het temperatuurverschil tussen de twee aanvoersensoren is te groot."],
      ["F64", "De resetfunctie meldt een fout.", "electrical"],
      ["F66", "De regelprint meldt een programmeerfout.", "electrical"],
    ],
  })),
]);
