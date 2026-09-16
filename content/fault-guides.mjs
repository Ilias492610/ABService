export const faultGuides = Object.freeze([
  {
    slug: "vaillant",
    brand: "Vaillant",
    status: "published",
    modelWarning:
      "De betekenis en toegestane handelingen kunnen per model en bouwjaar verschillen. Controleer altijd de gebruikershandleiding van uw exacte toestel.",
    sourceLabel: "Officiële Vaillant-foutcodepagina",
    sourceUrl: "https://www.vaillant.be/nl/advies/helpcentrum/foutcodes-ketel/",
    codes: [
      {
        code: "F.22",
        meaning: "Geen of onvoldoende water in het toestel, of een te lage waterdruk.",
        userAction:
          "Controleer alleen de zichtbare druk en volg de vulinstructie uit uw eigen handleiding. Daalt de druk opnieuw, laat de oorzaak onderzoeken.",
      },
      {
        code: "F.28",
        meaning: "Tijdens de ontstekingsfase werd geen vlamsignaal gedetecteerd.",
        userAction:
          "Controleer volgens de handleiding of de gaskraan openstaat. Reset hoogstens één keer; laat een terugkerende storing onderzoeken.",
      },
      {
        code: "F.29",
        meaning: "De vlam viel tijdens werking weg en opnieuw ontsteken lukte niet.",
        userAction:
          "Stop bij gasgeur onmiddellijk met bedienen. Zonder gasgeur: noteer de code en laat de storing beoordelen als ze terugkomt.",
      },
      {
        code: "F.75",
        meaning: "Bij de start van de pomp werd onvoldoende drukverandering gemeten.",
        userAction:
          "Controleer de zichtbare systeemdruk. Open het toestel niet; pomp en druksensor vragen technische diagnose.",
      },
    ],
  },
  {
    slug: "bulex",
    brand: "Bulex",
    status: "published",
    modelWarning:
      "Bulex gebruikt modelafhankelijke foutcodes en oorzaken. Controleer de handleiding van uw exacte model voordat u een gebruikershandeling uitvoert.",
    sourceLabel: "Officiële Bulex-foutcodepagina",
    sourceUrl: "https://www.bulex.be/particulier/diensten/foutcodes/",
    codes: [
      {
        code: "F.23",
        meaning: "Veiligheidsuitschakeling doordat het temperatuurverschil te groot is.",
        userAction:
          "Noteer de code. Pomp, sensoren en circulatie vragen doorgaans technische controle; open het toestel niet.",
      },
      {
        code: "F.24",
        meaning: "Veiligheidsuitschakeling doordat de temperatuur te snel stijgt.",
        userAction:
          "Controleer alleen de zichtbare installatiedruk. Laat pomp, doorstroming en installatie professioneel beoordelen.",
      },
      {
        code: "F.28",
        meaning: "De ontsteking is niet succesvol verlopen.",
        userAction:
          "Controleer volgens de handleiding of de gaskraan openstaat. Reset hoogstens één keer en stop onmiddellijk bij gasgeur.",
      },
      {
        code: "F.29",
        meaning: "De vlam doofde tijdens werking en de controle bleef in fout.",
        userAction:
          "Noteer de code en laat een terugkerende storing onderzoeken. Voer zelf geen werk uit aan gasblok, elektrodes of elektronica.",
      },
      {
        code: "F.75",
        meaning: "De gemeten druksprong bij het starten van de cv-pomp is te laag.",
        userAction:
          "Controleer de zichtbare druk en volg alleen uw gebruikershandleiding. Laat pomp of sensor technisch controleren.",
      },
    ],
  },
  {
    slug: "bosch",
    brand: "Bosch",
    status: "published",
    modelWarning:
      "Deze codes komen uit het officiële Bosch-codeboek voor de vermelde Serie -4 vanaf 2013. Controleer altijd het exacte model, bouwjaar, subcode en de eigen handleiding: dezelfde hoofdcode kan elders iets anders betekenen.",
    sourceLabel: "Officieel Bosch-codeboek voor storingscodes",
    sourceUrl:
      "https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf",
    documentationLabel: "Bosch handleidingen en modeldocumentatie",
    documentationUrl:
      "https://www.bosch-homecomfort.com/be/nl/residentieel/service-ondersteuning/bedieningshandleidingen/",
    codes: [
      {
        code: "E2 222/223",
        meaning:
          "Volgens het Bosch-codeboek is er bij deze Serie -4 een kortsluiting of onderbreking in de aanvoertemperatuursensor.",
        userAction:
          "Noteer hoofdcode, subcode en exact model. Open het toestel niet; sensor, bekabeling en regeling vragen technische diagnose.",
      },
      {
        code: "E9 224/372/276",
        meaning:
          "De veiligheidstemperatuurbegrenzer is volgens het codeboek geactiveerd.",
        userAction:
          "Laat het toestel afkoelen en volg alleen de gebruikershandleiding. Reset hoogstens één keer wanneer de handleiding dat toestaat; laat een terugkerende melding onderzoeken.",
      },
      {
        code: "EA 227",
        meaning:
          "Tijdens een ontstekingspoging werd volgens het codeboek geen vlam herkend.",
        userAction:
          "Stop onmiddellijk bij gasgeur. Zonder gasgeur: controleer uitsluitend wat de handleiding voor gebruikers toestaat en laat een terugkerende storing technisch beoordelen.",
      },
      {
        code: "F7 228",
        meaning:
          "Er werd volgens het codeboek een vlamsignaal gemeten terwijl de brander uitgeschakeld hoort te zijn.",
        userAction:
          "Schakel het toestel niet herhaald aan en uit. Noteer de code en laat de verbrandings- en meetcomponenten professioneel controleren.",
      },
    ],
  },
  {
    slug: "junkers",
    brand: "Junkers",
    status: "published",
    modelWarning:
      "Deze codes komen uit het officiële Bosch-codeboek voor Junkers/Bosch-toestellen uit de vermelde Serie -4 vanaf 2013. Controleer het exacte model en de eigen handleiding; gebruik deze selectie niet voor andere modelreeksen.",
    sourceLabel: "Officieel Bosch-codeboek voor storingscodes",
    sourceUrl:
      "https://www.bosch-homecomfort.com/be/media/country_pool/professionals/toolbox/bosch_codeboek_nl_lr.pdf",
    documentationLabel: "Officiële documentatie voor oudere Bosch/Junkers-toestellen",
    documentationUrl:
      "https://www.bosch-homecomfort.com/be/nl/residentieel/professionals/voor-de-installateurs/technische-documentatie/documentatie-oude-bosch-toestellen/",
    codes: [
      {
        code: "E2 222/223",
        meaning:
          "Volgens het officiële codeboek is er bij deze Serie -4 een kortsluiting of onderbreking in de aanvoertemperatuursensor.",
        userAction:
          "Noteer hoofdcode, subcode en model. Verwijder geen mantel; sensor, bedrading en regeling zijn werk voor een technicus.",
      },
      {
        code: "E9 224/372/276",
        meaning:
          "De veiligheidstemperatuurbegrenzer is volgens het codeboek geactiveerd.",
        userAction:
          "Volg de gebruikershandleiding en reset niet herhaald. Laat de oorzaak beoordelen wanneer de melding blijft of terugkomt.",
      },
      {
        code: "EA 227",
        meaning:
          "Volgens het codeboek werd tijdens de ontstekingspoging geen vlam herkend.",
        userAction:
          "Bij gasgeur: niet verder bedienen. Zonder gasgeur mag u alleen de gebruikerscontroles uit de exacte handleiding uitvoeren.",
      },
      {
        code: "F7 228",
        meaning:
          "Er werd een vlamsignaal gemeten terwijl de brander uitgeschakeld hoort te zijn.",
        userAction:
          "Stop met resetten, noteer de volledige code en laat de verbrandings- en meetcomponenten professioneel controleren.",
      },
    ],
  },
]);

export const getFaultGuide = (slug) => faultGuides.find((guide) => guide.slug === slug);
