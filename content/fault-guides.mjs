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
    status: "noindex",
    modelWarning:
      "Bosch-codes zijn modelafhankelijk. Deze pagina publiceert geen codebetekenissen zonder een gekoppelde officiële bron voor het exacte model.",
    sourceLabel: "",
    sourceUrl: "",
    codes: [],
  },
  {
    slug: "junkers",
    brand: "Junkers",
    status: "noindex",
    modelWarning:
      "Junkers-codes zijn modelafhankelijk. Deze pagina publiceert geen codebetekenissen zonder een gekoppelde officiële bron voor het exacte model.",
    sourceLabel: "",
    sourceUrl: "",
    codes: [],
  },
]);

export const getFaultGuide = (slug) => faultGuides.find((guide) => guide.slug === slug);
