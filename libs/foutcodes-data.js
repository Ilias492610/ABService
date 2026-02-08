const vaillantRanges = [
  { label: "Foutcodes F0 - F20", start: 0, end: 20 },
  { label: "Foutcodes F22 - F36", start: 22, end: 36 },
  { label: "Foutcodes F42 - F58", start: 42, end: 58 },
  { label: "Foutcodes F61 - F70", start: 61, end: 70 },
  { label: "Foutcodes F71 - F82", start: 71, end: 82 },
  { label: "Foutcodes F83 - F93", start: 83, end: 93 },
];

const bulexRanges = [
  { label: "Foutcodes F00 - F19", start: 0, end: 19 },
  { label: "Foutcodes F20 - F33", start: 20, end: 33 },
  { label: "Foutcodes F34 - F49", start: 34, end: 49 },
  { label: "Foutcodes F54 - F73", start: 54, end: 73 },
  { label: "Foutcodes F74 - F86", start: 74, end: 86 },
];

const boschRanges = [
  { label: "Foutcodes 1010 - 204" },
  { label: "Foutcodes 207 - 222" },
  { label: "Foutcodes 224 - 235" },
  { label: "Foutcodes 238 - 273" },
  { label: "Foutcodes 280 - 331" },
  { label: "Foutcodes 341 - 358" },
  { label: "Foutcodes 360 - AF" },
  { label: "Foutcodes B1 - C9" },
  { label: "Foutcodes CA - DF" },
  { label: "Foutcodes E0 - EB" },
  { label: "Foutcodes EC - FD" },
  { label: "Foutcodes F0 - H13" },
  { label: "Foutcodes OY - __°C" },
];

const junkersRanges = [
  { label: "Foutcodes % - A4" },
  { label: "Foutcodes A5 - B4" },
  { label: "Foutcodes C1 - CC" },
  { label: "Foutcodes D1 - D9" },
  { label: "Foutcodes E0 - EF" },
  { label: "Foutcodes F0 - F7" },
  { label: "Foutcodes FC - P3" },
];

export const foutcodesBrands = [
  {
    slug: "vaillant",
    brand: "Vaillant",
    summary:
      "Uitgebreide Vaillant foutcodes met gecontroleerde codebetekenissen en eerste stappen.",
    intro:
      "Deze Vaillant codes zijn samengebracht uit officiele Vaillant servicedocumentatie. Niet elke code is beschikbaar op elk toesteltype of bouwjaar.",
    keywords: [
      "Vaillant foutcodes",
      "Vaillant F22",
      "Vaillant F28",
      "Vaillant F75",
      "Vaillant F83",
      "Vaillant F90",
      "ketel storing Antwerpen",
    ],
    rangeMode: "numeric-f",
    ranges: vaillantRanges,
    codes: [
      { code: "F.00", issue: "Aanvoertemperatuursensor onderbroken", action: "Controleer aanvoersensor en bekabeling." },
      { code: "F.01", issue: "Retourtemperatuursensor onderbroken", action: "Controleer retoursensor en bekabeling." },
      { code: "F.02", issue: "Boilersensor onderbroken", action: "Controleer boilersensor en connectoren." },
      { code: "F.03", issue: "Laadsensor boiler onderbroken", action: "Controleer laadsensor en bekabeling." },
      { code: "F.10", issue: "Kortsluiting aanvoersensor", action: "Controleer sensor op kortsluiting en vervang indien nodig." },
      { code: "F.11", issue: "Kortsluiting retoursensor", action: "Controleer sensor en kabeltraject." },
      { code: "F.12", issue: "Kortsluiting boilersensor", action: "Controleer boilersensor en stekkerverbinding." },
      { code: "F.13", issue: "Kortsluiting laadsensor boiler", action: "Controleer laadsensor en bedrading." },
      { code: "F.20", issue: "Veiligheidsuitschakeling door oververhitting", action: "Controleer doorstroming, pomp en ontlucht het systeem." },
      { code: "F.22", issue: "Te weinig water / droogkookbeveiliging", action: "Controleer cv-druk en vul installatie bij indien nodig." },
      { code: "F.23", issue: "Te groot temperatuurverschil aanvoer-retour", action: "Controleer circulatie, pomp en lucht in installatie." },
      { code: "F.24", issue: "Temperatuurstijging te snel", action: "Controleer waterdoorstroming en pompwerking." },
      { code: "F.25", issue: "Rookgastemperatuur stijgt te snel", action: "Controleer verbranding, rookgastraject en sensor." },
      { code: "F.26", issue: "Gasventiel-stappenmotor niet aangestuurd", action: "Laat gasventiel en printsturing controleren." },
      { code: "F.27", issue: "Onterechte vlamdetectie", action: "Controleer ionisatie-elektrode en elektronica." },
      { code: "F.28", issue: "Ontsteking mislukt", action: "Controleer gasaanvoer en reset eenmalig." },
      { code: "F.29", issue: "Vlam valt weg tijdens werking", action: "Controleer gasstabiliteit en ionisatiecircuit." },
      { code: "F.32", issue: "Ventilatortoerental buiten bereik", action: "Controleer ventilator, voeding en rookgas/luchtkanalen." },
      { code: "F.42", issue: "Coderingsweerstand onderbroken of kortgesloten", action: "Controleer codering en connectoren op de print." },
      { code: "F.49", issue: "eBUS onderspanning", action: "Controleer eBUS-bekabeling en aangesloten componenten." },
      { code: "F.52", issue: "Mass Flow Sensor werkt niet correct", action: "Controleer sensor en verbrandingsregeling." },
      { code: "F.53", issue: "Gas/luchtregeling buiten bereik", action: "Laat verbrandingsafstelling professioneel controleren." },
      { code: "F.54", issue: "Probleem met gastoevoer", action: "Controleer gaskraan en gasdruk." },
      { code: "F.55", issue: "Fout in elektronica", action: "Diagnose van printplaat en elektrische sturing uitvoeren." },
      { code: "F.56", issue: "Mass Flow Sensor geeft geen geldig signaal", action: "Controleer sensorbedrading en sensorsignaal." },
      { code: "F.57", issue: "Comfortbeveiliging actief door verbrandingsprobleem", action: "Controleer verbranding en toestelinstellingen." },
      { code: "F.61", issue: "Aansturing gasventiel defect", action: "Laat gasventiel en printuitgang testen." },
      { code: "F.62", issue: "Gasventiel sluit vertraagd", action: "Controleer gasventiel en veiligheidsketen." },
      { code: "F.63", issue: "Interne elektronicafout (EEPROM)", action: "Technische diagnose van hoofdprint is nodig." },
      { code: "F.64", issue: "Elektronica/sensorsignaal fout", action: "Controleer sensoren en printplaat." },
      { code: "F.65", issue: "Elektronica oververhit", action: "Controleer ventilatie en temperatuurbelasting rond toestel." },
      { code: "F.67", issue: "Fout in vlamdetectie aan einde ontstekingsfase", action: "Controleer ionisatie-elektrode en ontstekingscircuit." },
      { code: "F.68", issue: "Instabiel vlamsignaal", action: "Controleer gasdruk, ionisatie en verbranding." },
      { code: "F.70", issue: "Ongeldige toestelcodering", action: "Controleer toestel-ID/codering en compatibiliteit onderdelen." },
      { code: "F.71", issue: "Aanvoersensorwaarde verandert niet", action: "Controleer sensorplaatsing en sensorwerking." },
      { code: "F.72", issue: "Aanvoer- en retoursensorwaarden inconsistent", action: "Controleer beide NTC-sensoren en bekabeling." },
      { code: "F.73", issue: "Druksensorsignaal te laag", action: "Controleer systeemdruk en druksensor." },
      { code: "F.74", issue: "Druksensorsignaal te hoog", action: "Controleer druksensor en bedrading." },
      { code: "F.75", issue: "Geen drukstijging bij pompstart", action: "Controleer pomp, sensor en vulling van de installatie." },
      { code: "F.77", issue: "Condensaatpomp of accessoire blokkeert bedrijf", action: "Controleer condensafvoer en accessoires." },
      { code: "F.78", issue: "Storing in multi-circuit module / temperatuursensor", action: "Controleer modules, sensoren en parameterinstellingen." },
      { code: "F.80", issue: "Inlaattemperatuursensor defect (modelafhankelijk)", action: "Controleer sensor en connector." },
      { code: "F.81", issue: "Laadpompfout boiler (modelafhankelijk)", action: "Controleer laadpomp en elektrische sturing." },
      { code: "F.82", issue: "Boilerlaadsensor waardeverschuiving", action: "Controleer sensor, montage en kalibratie." },
      { code: "F.83", issue: "Geen/te kleine temperatuursprong bij start", action: "Controleer sensoren, pomp en circulatie bij branderstart." },
      { code: "F.84", issue: "Onlogische sensorwaarden aanvoer-retour", action: "Controleer sensormontage en temperatuursensoren." },
      { code: "F.85", issue: "Aanvoer/retoursensoren onjuist gemonteerd", action: "Controleer plaatsing en aansluiting van beide sensoren." },
      { code: "F.86", issue: "Kortsluiting buitentemperatuursensor", action: "Controleer externe sensor en kabel." },
      { code: "F.87", issue: "Onderbreking buitentemperatuursensor", action: "Controleer bedrading en sensorcontinuiteit." },
      { code: "F.88", issue: "Kortsluiting rookgassensor", action: "Controleer rookgassensor en kabelboom." },
      { code: "F.89", issue: "Onderbreking rookgassensor", action: "Controleer rookgassensor en aansluitingen." },
      { code: "F.90", issue: "Communicatie met boilermodule onderbroken", action: "Controleer databus, modulevoeding en connectoren." },
      { code: "F.91", issue: "Communicatie met boilersensor onderbroken", action: "Controleer sensorleiding en moduleverbinding." },
      { code: "F.92", issue: "Coderingsweerstand mismatch", action: "Controleer codering van toestel en componenten." },
      { code: "F.93", issue: "Gasgroepvariant niet geldig", action: "Controleer gasinstelling en toestelparametrering." },
    ],
    faq: [
      {
        question: "Waarom zie ik soms F.28 of F.29 na elkaar?",
        answer:
          "Dat wijst vaak op een ontstekings- of gastoevoerprobleem. Eenmalig resetten kan, maar herhaling vraagt diagnose.",
      },
      {
        question: "Is F.22 altijd alleen bijvullen?",
        answer:
          "Niet altijd. Komt F.22 terug, dan kan er een lek, expansievatprobleem of sensordefect zijn.",
      },
    ],
  },
  {
    slug: "bosch",
    brand: "Bosch",
    summary:
      "Bosch storingscodes per codebereik, geordend zoals in service-overzichten voor snelle triage.",
    intro:
      "Bosch gebruikt verschillende foutcodefamilies afhankelijk van platform en regeling. Gebruik deze reeksen om snel de juiste codegroep te vinden.",
    keywords: [
      "Bosch foutcodes",
      "Bosch ketel storing",
      "Bosch error codes cv ketel",
      "Bosch codebereiken",
    ],
    rangeMode: "label-only",
    ranges: boschRanges,
    codes: [],
    faq: [
      {
        question: "Waarom werkt niet elke Bosch-code op elk toestel?",
        answer:
          "Bosch gebruikt meerdere regelplatformen. De exacte betekenis hangt af van model en generatie.",
      },
      {
        question: "Welke info heb ik nodig voor diagnose?",
        answer:
          "Noteer de exacte code, ketelmodel, serienummer en wanneer de storing optreedt.",
      },
    ],
  },
  {
    slug: "junkers",
    brand: "Junkers",
    summary:
      "Junkers storingscodes per codegroep, handig om de juiste foutfamilie snel te bepalen.",
    intro:
      "Junkers-codes verschillen per toestelreeks. Onderstaande reeksen helpen om de fout in de juiste categorie te plaatsen.",
    keywords: [
      "Junkers foutcodes",
      "Junkers cv storing",
      "Junkers error codes",
      "Junkers codegroepen",
    ],
    rangeMode: "label-only",
    ranges: junkersRanges,
    codes: [],
    faq: [
      {
        question: "Zijn Junkers en Bosch foutcodes gelijk?",
        answer:
          "Sommige platforms overlappen, maar de interpretatie blijft model- en softwareafhankelijk.",
      },
      {
        question: "Wat doe ik bij een terugkerende Junkers-code?",
        answer:
          "Reset niet onbeperkt. Noteer de code en laat het toestel gericht diagnosticeren.",
      },
    ],
  },
  {
    slug: "bulex",
    brand: "Bulex",
    summary:
      "Bulex foutcodes gegroepeerd per codebereik, met eerste acties voor snelle interventie.",
    intro:
      "Deze Bulex codes zijn gebaseerd op officiele Bulex documentatie. Exact gedrag kan verschillen per modelreeks.",
    keywords: [
      "Bulex foutcodes",
      "Bulex F28",
      "Bulex F75",
      "Bulex ketel storing",
      "gasketel herstelling Antwerpen",
    ],
    rangeMode: "numeric-f",
    ranges: bulexRanges,
    codes: [
      { code: "F1", issue: "Retourtemperatuursensor onderbroken", action: "Controleer retoursensor en bekabeling." },
      { code: "F4", issue: "Vlam uitgevallen tijdens werking", action: "Controleer gasaanvoer en ionisatiecircuit." },
      { code: "F5", issue: "Oververhittingsbeveiliging actief", action: "Controleer circulatie en laat pomp/sensoren nakijken." },
      { code: "F13", issue: "Storing in printplaat", action: "Elektronica laten diagnosticeren door technicus." },
      { code: "F14", issue: "Aanvoertemperatuur boven 95C", action: "Controleer doorstroming, pomp en ontlucht systeem." },
      { code: "F20", issue: "Veiligheidsuitschakeling door temperatuurbegrenzer", action: "Controleer oververhittingsoorzaak en sensorwaardes." },
      { code: "F23", issue: "Temperatuurverschil aanvoer/retour te groot", action: "Controleer circulatie en lucht in circuit." },
      { code: "F24", issue: "Temperatuur stijgt te snel", action: "Controleer waterdoorstroming en pompwerking." },
      { code: "F28", issue: "Ontsteking niet gelukt", action: "Controleer gasaanvoer en probeer eenmalige reset." },
      { code: "F29", issue: "Vlam valt weg tijdens bedrijf", action: "Controleer gasstabiliteit en verbrandingsonderdelen." },
      { code: "F54", issue: "Mass Flow Sensor fout", action: "Laat sensor en verbrandingsregeling controleren." },
      { code: "F72", issue: "Aanvoer/retour sensoren inconsistent", action: "Controleer beide temperatuursensoren en bedrading." },
      { code: "F75", issue: "Drukstijging bij pompstart te laag", action: "Controleer druksensor, pomp en systeemdruk." },
    ],
    faq: [
      {
        question: "Welke Bulex foutcodes komen het vaakst voor?",
        answer:
          "In de praktijk zijn F28, F29, F72 en F75 vaak geziene codes bij storingsmeldingen.",
      },
      {
        question: "Wanneer moet ik direct hulp vragen?",
        answer:
          "Bij terugkerende codes, uitval van verwarming of warm water, of bij vermoedens van gas- of rookgasproblemen.",
      },
    ],
  },
];

export const getFoutcodeBrand = (slug) =>
  foutcodesBrands.find((brand) => brand.slug === slug);
