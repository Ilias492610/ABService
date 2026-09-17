const ACTIONS = Object.freeze({
  gas: "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
  pressure: "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.",
  flue: "Schakel het toestel uit en laat rookgasafvoer, luchttoevoer en verbrandingsonderdelen professioneel controleren. Gebruik het toestel niet verder bij rookgasgeur, een CO-melding of zichtbare roetvorming.",
  electrical: "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
  service: "Noteer de code en controleer de gebruikershandleiding van het exacte model. Plan onderhoud of diagnose wanneer de melding blijft staan of terugkomt; wis een servicemelding niet zonder de bijbehorende controle.",
  general: "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
});

const actionFor = (meaning, explicitAction) => {
  if (explicitAction && ACTIONS[explicitAction]) return ACTIONS[explicitAction];
  const text = meaning.toLowerCase();
  if (/vlam|gasblok|gasdruk|gasklep|ontsteking|ionisatie|brander/.test(text)) return ACTIONS.gas;
  if (/rookgas|luchttoevoer|ventilator|schoorsteen|co\b|drukdoos/.test(text)) return ACTIONS.flue;
  if (/waterdruk|installatiedruk|pomp|watergebrek|drukverlies|droog|circulatie/.test(text)) return ACTIONS.pressure;
  if (/inspectie|onderhoud|service/.test(text)) return ACTIONS.service;
  if (/sensor|voeler|elektr|printplaat|eeprom|communicatie|ebus|codeerstekker|kim|interne fout|datafout/.test(text)) return ACTIONS.electrical;
  return ACTIONS.general;
};

const expandCodeRange = (value) => {
  const numeric = value.match(/^(\d+)-(\d+)$/);
  if (numeric) {
    const start = Number(numeric[1]);
    const end = Number(numeric[2]);
    if (end >= start && end - start <= 50) {
      return Array.from({ length: end - start + 1 }, (_, index) => String(start + index));
    }
  }

  const prefixed = value.match(/^([A-Za-z]+)(\d+)-(?:([A-Za-z]+))?(\d+)$/i);
  if (prefixed && (!prefixed[3] || prefixed[1].toLowerCase() === prefixed[3].toLowerCase())) {
    const [, prefix, startText, , endText] = prefixed;
    const start = Number(startText);
    const end = Number(endText);
    if (end >= start && end - start <= 50) {
      return Array.from({ length: end - start + 1 }, (_, index) => `${prefix}${start + index}`);
    }
  }

  return [value];
};

const buildCodeSearchTerms = (code) => {
  const aliases = new Set([code]);
  let activePrefix = "";

  for (const part of code.split("/").map((item) => item.trim())) {
    const prefixed = part.match(/^([A-Za-z0-9]+)\s+(.+)$/);
    if (prefixed) {
      activePrefix = prefixed[1];
      for (const value of expandCodeRange(prefixed[2])) aliases.add(`${activePrefix} ${value}`);
      continue;
    }

    if (activePrefix && /^\d+(?:-\d+)?$/.test(part)) {
      for (const value of expandCodeRange(part)) aliases.add(`${activePrefix} ${value}`);
      continue;
    }

    for (const value of expandCodeRange(part)) aliases.add(value);
  }

  return [...aliases].join(" ");
};

const codeRows = (rows, sourcePage) =>
  Object.freeze(
    rows.map(([code, meaning, action]) =>
      Object.freeze({
        code,
        meaning,
        userAction: actionFor(meaning, action),
        sourcePage,
        searchTerms: buildCodeSearchTerms(code),
      })
    )
  );

const catalog = ({ id, title, scope, sourceLabel, sourceUrl, sourcePages, rows }) =>
  Object.freeze({
    id,
    title,
    scope,
    sourceLabel,
    sourceUrl,
    sourcePages,
    codes: codeRows(rows, sourcePages),
  });

const VAILLANT_PUBLIC_URL = "https://www.vaillant.be/nl/advies/helpcentrum/foutcodes-ketel/";
const VAILLANT_ECOTEC_URL =
  "https://support.vaillant.be/downloads/documenten/installatievoorschrift/0020282230-00-2764886.pdf";
const BULEX_PUBLIC_URL = "https://www.bulex.be/particulier/diensten/foutcodes/";
const BULEX_THEMA_URL = "https://www.bulex.be/themacondens/0020124551-02-1746869.pdf";
const BOSCH_CODEBOOK_URL =
  "https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf";

export const vaillantCatalogs = Object.freeze([
  catalog({
    id: "vaillant-publiek-overzicht",
    title: "Officieel Vaillant-overzicht",
    scope:
      "Alle foutcodes die Vaillant op de Belgische consumentenpagina publiceert. De precieze oorzaak blijft model- en bouwjaarafhankelijk.",
    sourceLabel: "Vaillant België - overzicht foutcodes ketels",
    sourceUrl: VAILLANT_PUBLIC_URL,
    sourcePages: "Online overzicht",
    rows: [
      ["F.13", "De boilertemperatuursensor is kortgesloten."],
      ["F.20", "De veiligheidstemperatuurbegrenzer heeft de gasklepbesturing onderbroken omdat de maximale temperatuurgrens is overschreden."],
      ["F.22", "Er is geen of onvoldoende water in het toestel, of de waterdruk is te laag."],
      ["F.23", "Het temperatuurverschil tussen aanvoer en retour is te groot."],
      ["F.25", "De rookgastemperatuur is te hoog.", "flue"],
      ["F.27", "Er is een vlamsignaal gedetecteerd terwijl de brander uit staat.", "gas"],
      ["F.28", "Het vlamsignaal werd tijdens de ontstekingsfase niet gedetecteerd.", "gas"],
      ["F.29", "De ontsteking na een vlamuitval tijdens het gebruik was niet succesvol.", "gas"],
      ["F.33", "Er is een fout in de luchtdrukschakelaar (pressostaat).", "flue"],
      ["F.61", "De ASIC of microcontroller werkt niet binnen de gedefinieerde tijden."],
      ["F.62", "De vlamuitschakeling werd na enige vertraging gedetecteerd.", "gas"],
      ["F.75", "De drukverandering is te laag wanneer de verwarmingspomp wordt opgestart.", "pressure"],
    ],
  }),
  catalog({
    id: "vaillant-ecotec-plus-cs",
    title: "ecoTEC plus CS/1-5",
    scope:
      "Volledige foutcodetabel uit installatie- en onderhoudshandleiding 0020282230_00 voor 15CS/1-5, 25CS/1-5, 35CS/1-5, 32CS/1-5, 36CS/1-5 en 40CS/1-5. Vaillant vermeldt dat niet elke code op elk product zichtbaar is.",
    sourceLabel: "Vaillant ecoTEC plus - installatie- en onderhoudshandleiding 0020282230_00",
    sourceUrl: VAILLANT_ECOTEC_URL,
    sourcePages: "Bijlage D, p. 225-236",
    rows: [
      ["F.000", "Het signaal van de aanvoertemperatuursensor is onderbroken."],
      ["F.001", "Het signaal van de retourtemperatuursensor is onderbroken."],
      ["F.002", "Het signaal van de temperatuursensor van de warmwateraansluiting is onderbroken."],
      ["F.003", "Het signaal van de boilertemperatuursensor is onderbroken."],
      ["F.010", "De aanvoertemperatuursensor is kortgesloten."],
      ["F.011", "De retourtemperatuursensor is kortgesloten."],
      ["F.012", "De temperatuursensor van de warmwateraansluiting is kortgesloten."],
      ["F.013", "De boilertemperatuursensor is kortgesloten."],
      ["F.020", "De veiligheidstemperatuurbegrenzer heeft de gasklep gesloten omdat de aanvoer- of retourtemperatuur de maximale grenswaarde overschreed."],
      ["F.022", "Er is geen of te weinig water in het toestel of de waterdruk is te laag."],
      ["F.023", "De temperatuurspreiding tussen aanvoer en retour is te groot."],
      ["F.024", "De temperatuurstijging gaat te snel."],
      ["F.025", "De verbrandingsgastemperatuur is te hoog.", "flue"],
      ["F.027", "Een vlamsignaal is herkend terwijl de brander uit is.", "gas"],
      ["F.028", "Het vlamsignaal is tijdens de ontstekingsfase niet herkend.", "gas"],
      ["F.029", "De ontsteking na een vlamuitval tijdens het bedrijf is mislukt.", "gas"],
      ["F.032", "Het ventilatortoerental ligt buiten de tolerantie.", "flue"],
      ["F.035", "De verbrandingsluchttoevoer of verbrandingsgasafvoer is geblokkeerd.", "flue"],
      ["F.040", "De hoeveelheid lucht is te gering.", "flue"],
      ["F.042", "De codeerweerstand of gasgroepweerstand is ongeldig."],
      ["F.044", "Het ionisatiesignaal van de regelingselektrode is te laag en de driftadaptatie is mislukt.", "gas"],
      ["F.047", "Het signaal van de warmwatertemperatuursensor aan de uitgang van de interne boiler is niet plausibel."],
      ["F.049", "De eBUS is kortgesloten of twee actieve eBUS-bronnen hebben een verwisselde polariteit."],
      ["F.057", "De verbrandingsregeling is uitgevallen en het bijbehorende noodbedrijf is mislukt.", "gas"],
      ["F.061", "De ASIC of microcontroller werkt niet binnen de gedefinieerde tijdsinstellingen."],
      ["F.062", "De uitschakeling van de vlam wordt vertraagd gedetecteerd.", "gas"],
      ["F.063", "De EEPROM meldt een fout bij de lees- of schrijftest."],
      ["F.064", "Het sensorsignaal kon niet correct worden omgevormd."],
      ["F.065", "Het toegestane bedrijfstemperatuurbereik van een elektronicacomponent is overschreden."],
      ["F.067", "De vlambeveiliging is defect.", "gas"],
      ["F.068", "De vlambeveiliging meldt een instabiel signaal.", "gas"],
      ["F.070", "De toestelherkenning (DSN) is foutief, ontbreekt of past niet bij de codeerweerstand."],
      ["F.071", "De aanvoertemperatuursensor levert onwaarschijnlijke waarden."],
      ["F.072", "De temperatuurspreiding tussen aanvoer- en retourtemperatuursensor is ongeldig."],
      ["F.074", "Het signaal van de waterdruksensor is onderbroken.", "pressure"],
      ["F.075", "De druksprong bij het starten van de cv-pomp is te laag.", "pressure"],
      ["F.076", "De oververhittingsbescherming van de primaire warmtewisselaar is actief."],
      ["F.077", "Een condenspomp of externe verbrandingsgasklep blokkeert het branderbedrijf.", "flue"],
      ["F.078", "De regelmodule wordt door het toestel niet ondersteund."],
      ["F.080", "De koudwater-inlaattemperatuursensor in de interne boiler is defect."],
      ["F.081", "De boilerlading is mislukt."],
      ["F.083", "Bij de branderstart wordt geen of een te langzame temperatuurtoename gemeten."],
      ["F.084", "Het temperatuurverschil van aanvoer- en retourtemperatuursensor geeft niet-plausibele waarden."],
      ["F.085", "De NTC-sensoren zijn verkeerd gemonteerd."],
      ["F.087", "De ontstekingstransformator is niet op de printplaat aangesloten.", "gas"],
      ["F.088", "De elektrische verbinding met de gasklep is onderbroken.", "gas"],
      ["F.089", "De ingebouwde cv-pomp past niet bij het toesteltype."],
      ["F.090", "De communicatie met de interne boiler is onderbroken."],
      ["F.092", "De omstelling van de gassoort is niet correct afgesloten.", "gas"],
      ["F.095", "De gasklepstappenmotor heeft het minimaal toegestane aantal stappen bereikt.", "gas"],
      ["F.096", "De gasklepstappenmotor heeft het maximaal toegestane aantal stappen bereikt.", "gas"],
      ["F.097", "De zelftest van de hoofdprintplaat is mislukt."],
      ["F.105", "Na vervanging van gasklep, printplaat of productinterface moet de gasklep-offset opnieuw passend worden ingesteld.", "gas"],
      ["F.194", "De netadapter van de printplaat is defect."],
      ["F.195", "Het toestel heeft een significante onderspanning in de voedingsspanning gedetecteerd."],
      ["F.196", "Het toestel heeft een significante overspanning in de voedingsspanning gedetecteerd."],
      ["F.317", "Het signaal van de volumesensor in het warmwatercircuit is onwaarschijnlijk."],
      ["F.318", "Het 3-weg motorventiel beweegt niet."],
      ["F.320", "De cv-pomp is geblokkeerd en de vrijgavefunctie was niet succesvol.", "pressure"],
      ["F.321", "De pompelektronica is defect."],
      ["F.322", "De cv-pomp is oververhit; de temperatuur kon niet via het noodbedrijf worden verlaagd."],
      ["F.323", "De cv-pomp loopt droog.", "pressure"],
      ["F.324", "De elektrische verbinding van de pomp is onderbroken."],
      ["F.325", "De cv-pomp heeft een fout."],
      ["F.326", "De hydraulische sensor- en actortest heeft minimaal twee niet-functionerende hydraulische componenten vastgesteld."],
      ["F.327", "Door een niet aangesloten warmwatercircuit is de minimale verwarmingsvolumestroom beperkt."],
      ["F.330", "De pomp reageert niet op commando's tijdens de hydraulische testen."],
      ["F.334", "De configuratie van het verbrandingsgasafvoersysteem is niet afgesloten.", "flue"],
      ["F.336", "Het toestel is niet toegelaten in de ingestelde configuratie.", "flue"],
      ["F.337", "De ombouwset voor meervoudige bezetting past niet bij de warmtecel.", "flue"],
      ["F.338", "De instelling voor meervoudige bezetting is foutief.", "flue"],
      ["F.342", "De luchtmassastroom bevindt zich niet binnen de toegestane grenswaarden.", "flue"],
      ["F.343", "Het signaal van de luchtmassastroomsensor is niet plausibel.", "flue"],
      ["F.344", "De regelingselektrode kan niet worden gebruikt.", "gas"],
      ["F.347", "Er is condensaat in de verbrandingskamer vastgesteld; het branderbedrijf is onderbroken.", "flue"],
      ["F.363", "De EEPROM van het display meldt een fout bij de lees- of schrijftest."],
      ["F.707", "Tussen display en printplaat is geen communicatie mogelijk."],
      ["F.905", "De communicatie-interface is door een te hoge stroom uitgeschakeld."],
    ],
  }),
]);

export const bulexCatalogs = Object.freeze([
  catalog({
    id: "bulex-publiek-overzicht",
    title: "Officieel Bulex-overzicht",
    scope:
      "Alle foutcodes die Bulex op de Belgische consumentenpagina publiceert. De precieze betekenis en herstelprocedure blijven toestelafhankelijk.",
    sourceLabel: "Bulex België - meest voorkomende foutcodes",
    sourceUrl: BULEX_PUBLIC_URL,
    sourcePages: "Online overzicht",
    rows: [
      ["F.1", "Onderbreking van de retourtemperatuurvoeler."],
      ["F.4", "De vlam dooft tijdens de werking.", "gas"],
      ["F.5", "De oververhittingsbeveiliging is geactiveerd."],
      ["F.13", "Storing van het moederbord."],
      ["F.14", "De verwarmingstemperatuur is hoger dan 95 °C."],
      ["F.20", "De veiligheidstemperatuurbegrenzer heeft de gasklepbesturing onderbroken."],
      ["F.23", "Veiligheidsuitschakeling omdat de temperatuurspreiding te groot is."],
      ["F.24", "Veiligheidsuitschakeling omdat de temperatuur te snel stijgt."],
      ["F.28", "De ontsteking is niet succesvol verlopen.", "gas"],
      ["F.29", "De vlam doofde tijdens werking en de controle bleef in fout.", "gas"],
      ["F.54", "Fout van de mass flow sensor; geen gasstroom gedetecteerd.", "gas"],
      ["F.72", "Fout van de aanvoer- en/of retourtemperatuurvoeler."],
      ["F.75", "De druksprong bij het starten van de cv-pomp is te laag.", "pressure"],
      ["F.76", "Storing van de thermische zekering."],
    ],
  }),
  catalog({
    id: "bulex-thema-condens",
    title: "THEMA Condens",
    scope:
      "Volledige foutcodetabel uit installatie- en onderhoudshandleiding 0020124551_02. Gebruik deze tabel alleen voor een THEMA Condens waarop dit document van toepassing is.",
    sourceLabel: "Bulex THEMA Condens - installatie- en onderhoudshandleiding 0020124551_02",
    sourceUrl: BULEX_THEMA_URL,
    sourcePages: "Bijlage D, p. 37-38",
    rows: [
      ["F.0", "Onderbreking van de aanvoertemperatuurvoeler."],
      ["F.1", "Onderbreking van de retourtemperatuurvoeler."],
      ["F.10", "Kortsluiting van de aanvoertemperatuurvoeler."],
      ["F.11", "Kortsluiting van de retourtemperatuurvoeler."],
      ["F.13", "Kortsluiting van de boilertemperatuurvoeler."],
      ["F.20", "Veiligheidsuitschakeling door de temperatuurbegrenzer."],
      ["F.22", "Veiligheidsuitschakeling door watergebrek.", "pressure"],
      ["F.23", "Veiligheidsuitschakeling omdat de temperatuurspreiding te groot is."],
      ["F.24", "Veiligheidsuitschakeling omdat de temperatuur te snel stijgt."],
      ["F.25", "Veiligheidsuitschakeling omdat de rookgastemperatuur te hoog is.", "flue"],
      ["F.27", "Veiligheidsuitschakeling door vlamsimulatie.", "gas"],
      ["F.28", "Uitval bij aanloop doordat de ontsteking is mislukt.", "gas"],
      ["F.29", "Uitval tijdens werking; opnieuw ontsteken is niet gelukt.", "gas"],
      ["F.32", "Fout van de ventilator.", "flue"],
      ["F.49", "Fout op de eBUS."],
      ["F.61", "Aansturingsfout van het gasblok.", "gas"],
      ["F.62", "Uitschakelvertraging van het gasblok.", "gas"],
      ["F.63", "Fout van de EEPROM."],
      ["F.64", "Fout van elektronica of NTC-sensor."],
      ["F.65", "Storing door de temperatuur van de elektronica."],
      ["F.67", "Storing van elektronica of vlambewaking.", "gas"],
      ["F.70", "Ongeldige toestel-ID (DSN)."],
      ["F.71", "Fout van de aanvoertemperatuurvoeler."],
      ["F.72", "Fout van de aanvoer- en/of retourtemperatuurvoeler."],
      ["F.73", "Signaal van de waterdruksensor is te laag.", "pressure"],
      ["F.74", "Signaal van de waterdruksensor is te hoog.", "pressure"],
      ["F.75", "Geen druksprong herkend bij het starten van de pomp.", "pressure"],
      ["F.77", "Fout van de rookgasklep of condenspomp.", "flue"],
      ["con", "Geen communicatie met de printplaat."],
    ],
  }),
]);

const boschJunkersRows = Object.freeze([
  catalog({
    id: "bosch-serie-7000i",
    title: "Serie 7000i vanaf bouwjaar 2017",
    scope:
      "Alle blokkerende, vergrendelende en niet-blokkerende storingsregels uit het officiële codeboek. Hoofdcode en subcode horen samen.",
    sourceLabel: "Bosch gids voor de installateur - foutcodeboek",
    sourceUrl: BOSCH_CODEBOOK_URL,
    sourcePages: "p. 27-30",
    rows: [
      ["0Y 276", "De temperatuur aan de aanvoertemperatuursensor is hoger dan 95 °C."],
      ["9A 235 / 360 / 361 / 362", "Verkeerde codeerstekker."],
      ["9U 233", "Codeerstekker niet herkend."],
      ["A1 281", "De cv-pomp genereert geen druk.", "pressure"],
      ["A8 323", "De BUS-communicatie is onderbroken."],
      ["C1 264", "De ventilator is uitgevallen.", "flue"],
      ["C4 273", "Brander en ventilator worden na 24 uur ononderbroken bedrijf kort uitgeschakeld voor een veiligheidscontrole."],
      ["C6 215", "Het ventilatortoerental is te hoog.", "flue"],
      ["C6 216", "Het ventilatortoerental is te laag.", "flue"],
      ["C7 214", "De ventilator wordt tijdens de veiligheidstijd uitgeschakeld.", "flue"],
      ["C7 217", "De ventilator draait niet.", "flue"],
      ["D3 232", "De externe temperatuurbewaking is actief, defect of vergrendeld, de aansluitbrug ontbreekt of de condenspomp is uitgevallen; variantafhankelijk."],
      ["D4 341", "Gradiëntbegrenzing door een te snelle temperatuurtoename in cv-bedrijf."],
      ["D5 330", "De externe aanvoertemperatuursensor is kortgesloten."],
      ["D5 331", "De externe aanvoertemperatuursensor is onderbroken."],
      ["E2 350 / 222", "De aanvoertemperatuursensor is kortgesloten."],
      ["E2 351 / 223", "De aanvoertemperatuursensor is onderbroken."],
      ["E9 224", "De temperatuurbegrenzer van warmteblok, rookgas of drukverschilcontrole is geactiveerd."],
      ["EA 227", "De vlam wordt niet herkend.", "gas"],
      ["EA 261", "Tijdfout tijdens de eerste veiligheidstijd.", "gas"],
      ["F0 238", "Aansluitkabel van het gasblok, gasblok of besturing is defect.", "gas"],
      ["F0 239 / 259", "Interne storing van codeerstekker of besturing."],
      ["F0 280", "Tijdfout bij een herstartpoging."],
      ["F0 290", "Interne storing."],
      ["F0 356 / F7 328 / Fd 231", "De netspanning werd tijdens een vergrendelende storing onderbroken."],
      ["F7 228", "Er wordt een vlam herkend terwijl de brander uitgeschakeld is.", "gas"],
      ["FA 306", "Na gasuitschakeling wordt een vlam herkend.", "gas"],
      ["FA 364 / Fb 365", "Na gasuitschakeling wordt een vlam herkend.", "gas"],
      ["H11", "Warmwatertemperatuursensor defect."],
      ["H12", "Boilertemperatuursensor defect."],
      ["H13", "Het inspectie-interval is bereikt.", "service"],
    ],
  }),
  catalog({
    id: "bosch-serie-9000i",
    title: "Serie 9000i vanaf bouwjaar 2015",
    scope:
      "Alle fout- en servicemeldingen uit de officiële tabel; normale bedrijfscodes met storingsklasse O zijn niet als fout opgenomen.",
    sourceLabel: "Bosch gids voor de installateur - foutcodeboek",
    sourceUrl: BOSCH_CODEBOOK_URL,
    sourcePages: "p. 45-53",
    rows: [
      ["207", "De bedrijfsdruk is lager dan 0,2 bar.", "pressure"],
      ["214", "De ventilator wordt tijdens de veiligheidstijd uitgeschakeld.", "flue"],
      ["215", "De ventilator draait te snel.", "flue"],
      ["216", "De ventilator draait te langzaam.", "flue"],
      ["217", "De ventilator draait onregelmatig tijdens de startfase.", "flue"],
      ["218", "De aanvoertemperatuursensor meet meer dan 105 °C."],
      ["219", "De veiligheidstemperatuursensor meet meer dan 105 °C."],
      ["220", "De veiligheidstemperatuursensor is kortgesloten of meet meer dan 130 °C."],
      ["221", "De contacten van de veiligheidstemperatuursensor zijn onderbroken."],
      ["222", "De contacten van de aanvoertemperatuursensor zijn kortgesloten."],
      ["224", "De temperatuurbegrenzer van warmtewisselaar of rookgas is geactiveerd."],
      ["227", "Onvoldoende ionisatiestroom tijdens de ontstekingspoging.", "gas"],
      ["228", "Ionisatiestroom gemeten vóór de branderstart.", "gas"],
      ["229", "Onvoldoende ionisatiestroom tijdens branderbedrijf.", "gas"],
      ["231 / 328 / 356", "De netspanning werd tijdens een vergrendelende storing onderbroken."],
      ["232", "Het externe schakelcontact is geopend of de condenspomp is uitgevallen."],
      ["233", "Codeerstekker niet herkend."],
      ["234", "De contacten van het gasblok zijn onderbroken.", "gas"],
      ["235 / 360 / 361 / 362", "Verkeerde codeerstekker (KIM)."],
      ["238", "Aansluitkabel van gasblok, gasblok of besturing is defect.", "gas"],
      ["239 / 259", "Interne storing."],
      ["260", "De aanvoertemperatuursensor meet na de branderstart geen temperatuurstijging."],
      ["261", "Tijdfout tijdens de eerste veiligheidstijd.", "gas"],
      ["264", "De ventilator is uitgevallen.", "flue"],
      ["273", "Brander en ventilator worden na 24 uur ononderbroken bedrijf kort uitgeschakeld voor een veiligheidscontrole."],
      ["280", "Tijdfout bij een herstartpoging."],
      ["281", "De cv-pomp genereert geen druk.", "pressure"],
      ["290", "Interne storing."],
      ["306", "Na gasuitschakeling wordt een vlam herkend.", "gas"],
      ["323", "De BUS-communicatie is onderbroken."],
      ["330", "De externe aanvoertemperatuursensor is kortgesloten."],
      ["331", "De externe aanvoertemperatuursensor is onderbroken."],
      ["350 / 222", "De aanvoertemperatuursensor is kortgesloten."],
      ["351 / 223", "De aanvoertemperatuursensor is onderbroken."],
      ["364 / 365", "Na gasuitschakeling wordt een vlam herkend.", "gas"],
      ["1010", "Geen communicatie met BUS."],
      ["1011", "Warmwatertemperatuursensor defect."],
      ["1012", "Boilertemperatuursensor defect."],
      ["1013", "Het inspectie-interval is bereikt.", "service"],
      ["1017", "De bedrijfsdruk is laag.", "pressure"],
      ["1022", "Boilertemperatuursensor defect of contactproblemen."],
    ],
  }),
  catalog({
    id: "bosch-cerapur-maxx",
    title: "Cerapur Maxx",
    scope:
      "Alle fout- en waarschuwingscodes uit de Cerapur Maxx-tabellen; gewone bedrijfscodes zijn weggelaten.",
    sourceLabel: "Bosch gids voor de installateur - foutcodeboek",
    sourceUrl: BOSCH_CODEBOOK_URL,
    sourcePages: "p. 64-75",
    rows: [
      ["9A 235", "De KIM is te nieuw voor de branderautomaat."],
      ["9A 360", "De KIM past niet bij de branderautomaat."],
      ["9A 361", "De branderautomaat past niet bij de KIM."],
      ["9U 233", "De branderautomaat of KIM is defect."],
      ["A3 317", "De contacten van de rookgastemperatuursensor zijn kortgesloten.", "flue"],
      ["b7 257", "De branderautomaat of KIM is defect."],
      ["C1 264", "Stuursignaal of spanning van de ventilator viel tijdens bedrijf weg.", "flue"],
      ["C4 273", "Het toestel werd na 24 uur ononderbroken bedrijf kort uitgeschakeld voor een veiligheidscontrole."],
      ["C6 215", "Het ventilatortoerental is te hoog.", "flue"],
      ["C6 216", "Het ventilatortoerental is te laag.", "flue"],
      ["C7 214", "De ventilator draait niet tijdens de opstartfase.", "flue"],
      ["C7 217", "Het ventilatortoerental is onregelmatig tijdens het opstarten.", "flue"],
      ["CE 207", "De waterdruk is te laag.", "pressure"],
      ["CE 266", "De pomptest is mislukt.", "pressure"],
      ["d1 240", "De retourtemperatuursensor is kortgesloten."],
      ["d1 241", "De retourtemperatuursensor is onderbroken."],
      ["d3 232", "Het externe schakelcontact is geopend."],
      ["d4 213", "De gemeten temperatuur stijgt te snel."],
      ["d4 271", "Het temperatuurverschil tussen aanvoer- en veiligheidstemperatuursensor is te groot."],
      ["d4 286", "De retourtemperatuursensor meet meer dan 105 °C."],
      ["E2 222", "De aanvoertemperatuursensor is kortgesloten."],
      ["E2 223", "De aanvoertemperatuursensor is onderbroken."],
      ["d4 218", "De aanvoertemperatuursensor meet meer dan 105 °C."],
      ["E9 210", "De rookgasthermostaat heeft een te hoge temperatuur gemeten en is geopend.", "flue"],
      ["E9 219", "De veiligheidstemperatuursensor meet meer dan 105 °C."],
      ["E9 220", "De veiligheidstemperatuursensor is kortgesloten of meet meer dan 120 °C."],
      ["E9 221", "De contacten van de veiligheidstemperatuursensor zijn onderbroken."],
      ["E9 224", "Een toestelthermostaat heeft een te hoge temperatuur gemeten en is geopend."],
      ["E9 276", "De aanvoertemperatuursensor meet meer dan 95 °C."],
      ["E9 277", "De veiligheidstemperatuursensor meet meer dan 95 °C."],
      ["E9 285", "De retourtemperatuursensor meet meer dan 95 °C."],
      ["E9 318", "De contacten van de rookgastemperatuursensor zijn onderbroken.", "flue"],
      ["EA 227", "Na ontsteking van de brander is onvoldoende ionisatiestroom gemeten.", "gas"],
      ["EA 229", "Tijdens het branden is onvoldoende ionisatiestroom gemeten.", "gas"],
      ["EA 234", "De contacten van het gasblok zijn onderbroken.", "gas"],
      ["EA 261", "De branderautomaat is defect.", "gas"],
      ["EA 269", "De ontstekingsunit is te lang aangestuurd.", "gas"],
      ["F0 237 / 238 / 239 / 242-253 / 255 / 259 / 263 / 267 / 272 / 279 / 287 / 290", "De branderautomaat of KIM is defect."],
      ["F0 278", "De sensortest is mislukt."],
      ["F0 280", "De branderautomaat is defect."],
      ["F7 228", "Ionisatiestroom gemeten voordat de brander is gestart.", "gas"],
      ["F7 328", "Er trad een kortstondige onderbreking van de netspanning op."],
      ["FA 306", "Na het doven van de brander werd ionisatiestroom gemeten.", "gas"],
      ["Fd 231", "De netspanning is tijdens een vergrendelende storing onderbroken."],
      ["EC 256 / EH 258", "De branderautomaat of KIM is defect."],
      ["H07", "De gemeten waterdruk is te laag; het toestelvermogen wordt beperkt.", "pressure"],
      ["HrE / rE", "Het toestel wordt gereset."],
    ],
  }),
  catalog({
    id: "bosch-serie-4",
    title: "Serie -4 vanaf bouwjaar 2013",
    scope:
      "Alle storingscodes en H-meldingen uit de officiële Serie -4-tabellen. Codes voor CerapurAero zijn als zodanig benoemd.",
    sourceLabel: "Bosch gids voor de installateur - foutcodeboek",
    sourceUrl: BOSCH_CODEBOOK_URL,
    sourcePages: "p. 103-109",
    rows: [
      ["276", "De aanvoertemperatuursensor meet meer dan 95 °C."],
      ["370", "Het koudemiddelcircuit is lek (alleen CerapurAero)."],
      ["_ _°C", "De aanvoertemperatuursensor is defect."],
      ["9U 233", "Codeerstekker niet herkend."],
      ["A1 281", "De cv-pomp genereert geen druk.", "pressure"],
      ["C1 264", "De ventilator is uitgevallen.", "flue"],
      ["C4 273", "Brander en ventilator worden na 24 uur ononderbroken bedrijf kort uitgeschakeld voor een veiligheidscontrole."],
      ["C6 215", "Het ventilatortoerental is te hoog.", "flue"],
      ["C6 216", "Het ventilatortoerental is te laag.", "flue"],
      ["C7 214", "De ventilator wordt tijdens de veiligheidstijd uitgeschakeld.", "flue"],
      ["C7 217", "De ventilator draait niet.", "flue"],
      ["d3 232", "De temperatuurbewaking is actief, defect of vergrendeld, de brug ontbreekt of de condenspomp is uitgevallen; variantafhankelijk."],
      ["d4 341", "Gradiëntbegrenzing door een te snelle temperatuurtoename in cv-bedrijf."],
      ["E2 222 / 350", "De aanvoertemperatuursensor is kortgesloten."],
      ["E2 223 / 351", "De aanvoertemperatuursensor is onderbroken."],
      ["E9 224 / 372 / 276", "De temperatuurbegrenzer van warmtewisselaar of rookgas is geactiveerd."],
      ["EA 227", "De vlam wordt niet herkend.", "gas"],
      ["EA 229", "Geen ionisatiesignaal tijdens branderbedrijf.", "gas"],
      ["EA 234", "Aansluitkabel van gasblok, gasblok of besturing is defect.", "gas"],
      ["EA 261", "Tijdfout tijdens de eerste veiligheidstijd.", "gas"],
      ["F0 238", "Aansluitkabel van gasblok, gasblok of besturing is defect.", "gas"],
      ["F0 259", "Interne storing."],
      ["F0 280", "Tijdfout bij een herstartpoging."],
      ["F0 290", "Interne storing."],
      ["F7 228", "Er wordt een vlam herkend terwijl de brander uitgeschakeld is.", "gas"],
      ["FA 306", "Na gasuitschakeling wordt een vlam herkend.", "gas"],
      ["Fb 364 / 365", "Na gasuitschakeling wordt een vlam herkend.", "gas"],
      ["Fd 231", "Melding na het verhelpen van storing E9."],
      ["H5", "Warmwatertemperatuursensor defect."],
      ["H11", "Warmwatertemperatuursensor defect."],
      ["H12", "Boilertemperatuursensor defect."],
      ["H13", "Het inspectie-interval is bereikt.", "service"],
      ["H20", "De compressor start niet (alleen CerapurAero)."],
      ["H21", "Verkeerde druk in het warmtedragercircuit (alleen CerapurAero).", "pressure"],
      ["H22", "De ventilator start niet (alleen CerapurAero).", "flue"],
      ["H23", "De luchtweg is verstopt (alleen CerapurAero).", "flue"],
      ["H24", "Een temperatuur- of buitentemperatuursensor van de warmtepomp is defect of verkeerd aangesloten."],
    ],
  }),
  catalog({
    id: "bosch-serie-3",
    title: "Serie -3 vanaf bouwjaar 2007",
    scope: "De volledige storingscodelijst voor Serie -3 in het officiële Bosch/Junkers-codeboek.",
    sourceLabel: "Bosch gids voor de installateur - foutcodeboek",
    sourceUrl: BOSCH_CODEBOOK_URL,
    sourcePages: "p. 132-133",
    rows: [
      ["A1", "De cv-pomp is drooggelopen.", "pressure"],
      ["A5", "Boilertemperatuursensor 2 defect."],
      ["A7", "Warmwatertemperatuursensor defect."],
      ["A8", "Communicatie onderbroken."],
      ["A9", "Overtemperatuur bij CerapurModul of CerapurModul-Smart."],
      ["Ad", "Boilertemperatuursensor niet herkend."],
      ["b1", "Codeerstekker niet herkend."],
      ["b2-b6", "Interne datafout."],
      ["C6", "Ventilatortoerental te laag.", "flue"],
      ["CC", "Buitentemperatuursensor niet herkend."],
      ["CE", "Installatiedruk te laag.", "pressure"],
      ["CF", "Fout van de druksensor.", "pressure"],
      ["d1", "Fout van de retourtemperatuursensor."],
      ["d3", "Externe bewaking is geactiveerd."],
      ["d5", "Fout van de externe aanvoertemperatuursensor bij de evenwichtsfles."],
      ["E2", "Fout van de aanvoertemperatuursensor."],
      ["E4", "Fout van de koudwatertemperatuursensor."],
      ["E9", "De temperatuurbegrenzer (STB) is geactiveerd."],
      ["EA", "De vlam wordt niet herkend.", "gas"],
      ["F0", "Interne fout."],
      ["F1", "Interne datafout."],
      ["F7", "Er wordt een vlam herkend terwijl de ketel uitgeschakeld is.", "gas"],
      ["FA", "Na gasuitschakeling wordt een vlam herkend.", "gas"],
      ["Fd", "De resettoets werd onbedoeld ingedrukt."],
      ["H1", "Mengtemperatuursensor defect."],
      ["H2", "Fout van solartemperatuursensor 6."],
      ["H3", "Menger defect."],
      ["H4", "Boilertemperatuursensor TS3 van het buffervat niet herkend."],
      ["H5", "Cv-pomp niet herkend.", "pressure"],
    ],
  }),
  catalog({
    id: "bosch-serie-2",
    title: "Serie -2, bouwjaar 1997-2006",
    scope:
      "Alle benoemde foutcodes uit de historische Serie -2-tabel. Sommige codes hebben meerdere betekenissen naargelang het concrete toestel; die varianten staan samen bij dezelfde code.",
    sourceLabel: "Bosch gids voor de installateur - foutcodeboek",
    sourceUrl: BOSCH_CODEBOOK_URL,
    sourcePages: "p. 160-163",
    rows: [
      ["A0", "Interne fout."],
      ["A1", "Rookgastemperatuursensor onder -8 °C of karakteristiekpomp drooggelopen; modelafhankelijk."],
      ["A2", "Storing van de rookgasafvoer bij stromingsbeveiliging of verbrandingskamer; modelafhankelijk.", "flue"],
      ["A3", "Fout van de rookgastemperatuursensor.", "flue"],
      ["A4", "Storing van de rookgasafvoer of rookgastemperatuur boven 120 °C.", "flue"],
      ["A5", "Rookgastemperatuur boven 120 °C of fout van warmhoud- of boilertemperatuursensor; modelafhankelijk."],
      ["A6", "Fout van de rookgastemperatuursensor in de verbrandingskamer.", "flue"],
      ["A7", "Fout van rookgas- of warmwatertemperatuursensor, of interne fout; modelafhankelijk."],
      ["A8", "CAN-busfout of defect/niet aangesloten tekstdisplay."],
      ["A9", "De begrenzer is geactiveerd."],
      ["AA", "Ontstekingsstoring of te groot temperatuurverschil; modelafhankelijk.", "gas"],
      ["Ab", "De warmwaterboilertemperatuursensor is kortgesloten."],
      ["AC", "Geen signaal van de basismodule van TA 210 E/TA 211 E."],
      ["Ad", "Fout van boilertemperatuursensor -1."],
      ["AE", "De grenswaarde van de rookgastemperatuursensor is overschreden.", "flue"],
      ["AF", "De rookgastemperatuursensor is defect.", "flue"],
      ["b1", "Codeerstekker niet herkend."],
      ["b2", "Los contact van de codeerstekker."],
      ["b3", "Interne fout."],
      ["b4", "Contactfout van de codeerstekker."],
      ["b5", "De temperatuur aan de aanvoer stijgt te snel."],
      ["b7 / b8 / b9 / bA", "Interne fout."],
      ["C1", "Drukdoos open tijdens bedrijf of toerental te laag.", "flue"],
      ["C2", "Drukdoos opent tijdens bedrijf.", "flue"],
      ["C3", "Drukdooscontact is open.", "flue"],
      ["C4", "Drukdoos opent niet.", "flue"],
      ["C5", "Drukdooscontact blijft gesloten.", "flue"],
      ["C6 / C7", "Drukdoos open; luchtweg, ventilator of drukslangen controleren.", "flue"],
      ["C9", "Gegevensstroom tussen basismodule en TA 210 E/TA 211 E is onderbroken, of drukdooscontact is open."],
      ["CA", "Verkeerd signaal van de bedrijfsmodusschakelaar of turbinetoerental te hoog; modelafhankelijk."],
      ["Cb", "Interne fout van TA 210 E."],
      ["CC", "Onderbreking van de buitentemperatuursensor."],
      ["Cd", "Fout van de rookgastemperatuursensor.", "flue"],
      ["d1", "Blokkering door LSM."],
      ["d2", "Verkeerd pompschakeltype op TA 210 E."],
      ["d3", "Klem 8-9 is open."],
      ["d4", "Uitschakeling door temperatuurbewaking."],
      ["d7", "De ontstekingsduur is langer dan vier seconden.", "gas"],
      ["d8", "Interne fout."],
      ["d9", "Verkeerde adapter of ontbrekend ventilatorrelais."],
      ["dF", "Boilertemperatuur overschreden of wisselende weergave; modelafhankelijk."],
      ["Ed", "Fout van referentiespanning, rookgasbeveiliging of zelftest, voeding van het magneetventiel vóór ontsteking of te hoge rookgastemperatuur; modelafhankelijk."],
      ["E0", "Interne fout."],
      ["E2", "Onderbreking van de aanvoertemperatuursensor."],
      ["E3", "De magneetklep van het gasblok wordt niet door LSM geblokkeerd.", "gas"],
      ["E4", "De ionisatiestroom is te klein.", "gas"],
      ["E5", "Ionisatiestroom te groot of branderaanvoertemperatuursensor heeft uitgeschakeld; modelafhankelijk."],
      ["E6", "Verkeerd ionisatiesignaal.", "gas"],
      ["E7", "Verkeerd ionisatiesignaal of fout van de branderaanvoertemperatuursensor; modelafhankelijk."],
      ["E8", "Voeding van magneetventiel zonder warmtevraag of minimumdrukbewaking open; modelafhankelijk."],
      ["E9", "Temperatuurbegrenzer uitgeschakeld/defect of minimumdrukwachter open; modelafhankelijk."],
      ["EA", "Geen ionisatiestroom.", "gas"],
      ["Eb", "De vlam dooft tijdens bedrijf.", "gas"],
      ["EC", "Temperatuurbegrenzer uitgeschakeld/defect of minimumdrukbewaking open; modelafhankelijk."],
      ["EE", "Voeding van magneetventiel of regelventiel blijft aanwezig na uitschakeling.", "gas"],
      ["F0", "Voeding van magneetventiel of regelventiel blijft aanwezig na uitschakeling, of interne fout; modelafhankelijk."],
      ["F1-F6", "Interne fout."],
    ],
  }),
]);

export const boschCatalogs = boschJunkersRows;
export const junkersCatalogs = boschJunkersRows;

export const getCatalogEntryCount = (catalogs) =>
  catalogs.reduce((total, item) => total + item.codes.length, 0);
