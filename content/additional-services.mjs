const service = ({ slug, title, description, intro, answer, warning, imageKey, sections, steps }) =>
  Object.freeze({
    slug,
    path: `/diensten/${slug}`,
    status: "published",
    title,
    description,
    intro,
    answer,
    warning,
    imageKey,
    sections: Object.freeze(sections),
    steps: Object.freeze(steps),
  });

export const additionalServices = Object.freeze([
  service({
    slug: "lekdetectie",
    title: "Lekdetectie in Antwerpen",
    description: "Laat een vermoedelijk waterlek gericht onderzoeken door AB Service. Deel zichtbare signalen, foto’s en de plaats van vocht of drukverlies.",
    intro: "Vochtplekken, drukverlies of onverwacht waterverbruik vragen eerst om een gerichte diagnose. AB Service onderzoekt bereikbare leidingen en aansluitingen en bespreekt welke vervolgstap technisch zinvol is.",
    answer: "Noteer waar en wanneer het probleem zichtbaar wordt, controleer indien mogelijk de watermeter zonder waterverbruik en bezorg overzichts- en detailfoto’s. Zo kan de eerste beoordeling gerichter gebeuren.",
    warning: "Komt water in de buurt van stopcontacten, de zekeringkast of andere elektrische onderdelen? Blijf uit de natte zone en schakel bevoegde noodhulp in. Sluit de hoofdwaterkraan alleen als u die veilig kunt bereiken.",
    imageKey: "diagnosticsMarketing",
    sections: [
      {
        eyebrow: "Signalen",
        title: "Wanneer lekonderzoek aangewezen is",
        items: [
          "Een vochtplek die terugkomt of zichtbaar groter wordt",
          "Onverklaard waterverbruik terwijl kranen en toestellen dicht staan",
          "Drukverlies in een gesloten verwarmingscircuit",
          "Druppels of corrosiesporen rond bereikbare koppelingen en leidingen",
        ],
      },
      {
        eyebrow: "Onderzoek",
        title: "Eerst lokaliseren, daarna pas openmaken",
        paragraphs: [
          "De juiste onderzoeksmethode hangt af van het leidingtype, de bereikbaarheid en de zichtbare symptomen. Niet elke vochtplek ligt rechtstreeks onder de bron; water kan zich via vloeren, kokers en wanden verplaatsen.",
          "AB Service begint daarom met de beschikbare aanwijzingen en spreekt vóór bijkomend breek- of herstelwerk af wat binnen de opdracht valt.",
        ],
      },
      {
        eyebrow: "Vervolg",
        title: "Rapportage en herstel zijn aparte stappen",
        paragraphs: [
          "Een lokalisatie kan leiden tot rechtstreeks herstel, bijkomend onderzoek of een voorstel voor toegang tot de leiding. De werkbon vermeldt de uitgevoerde controles en de afgesproken vervolgstap.",
        ],
      },
    ],
    steps: [
      { title: "Melding", text: "Deel locatie, signalen en duidelijke foto’s." },
      { title: "Afbakening", text: "Bepaal welk circuit of welke aansluiting verdacht is." },
      { title: "Onderzoek", text: "Controleer gericht zonder onnodig open te breken." },
      { title: "Vervolg", text: "Bespreek herstel, toegang en eventuele rapportage." },
    ],
  }),
  service({
    slug: "waterlek-herstellen",
    title: "Waterlek laten herstellen",
    description: "AB Service herstelt bereikbare waterlekken aan sanitaire leidingen en aansluitingen na beoordeling van bron, toegang en materiaal.",
    intro: "Een waterlek vraagt snelle maar veilige actie. AB Service beoordeelt de vermoedelijke bron, sluit het betrokken deel waar mogelijk af en bespreekt het herstel op basis van leidingmateriaal en bereikbaarheid.",
    answer: "Sluit bij een actief lek de watertoevoer af als dat veilig kan, vang water op zonder elektrische risico’s te nemen en stuur foto’s van de bron en de omliggende ruimte.",
    warning: "Bij overstromingsgevaar of water rond elektriciteit gebruikt u het online formulier niet als noodkanaal. Verlaat een onveilige zone en contacteer de bevoegde hulpdienst.",
    imageKey: "sanitary",
    sections: [
      {
        eyebrow: "Herstel",
        title: "Welke waterlekken kunnen worden aangepakt?",
        items: [
          "Lekkende zichtbare koppelingen en afsluiters",
          "Problemen aan toevoerleidingen en sanitaire aansluitingen",
          "Lekkage onder een lavabo, spoelbak of sanitair toestel",
          "Beschadigde bereikbare leidingdelen na technische beoordeling",
        ],
      },
      {
        eyebrow: "Vooraf",
        title: "Toegang en materiaal bepalen de aanpak",
        paragraphs: [
          "Een zichtbare lekkende koppeling is een andere opdracht dan een leiding achter tegelwerk of onder een vloer. Vermeld daarom waar de leiding loopt, welk materiaal zichtbaar is en of de watertoevoer afzonderlijk kan worden afgesloten.",
        ],
      },
      {
        eyebrow: "Controle",
        title: "Na herstel wordt de werkzone gecontroleerd",
        paragraphs: [
          "Na het afgesproken herstel wordt de bereikbare verbinding gecontroleerd. Bouwkundig droogwerk, schilderwerk of tegelherstel valt alleen binnen de opdracht wanneer dit uitdrukkelijk in de offerte staat.",
        ],
      },
    ],
    steps: [
      { title: "Beperk schade", text: "Sluit veilig af en houd elektriciteit uit de natte zone." },
      { title: "Deel beelden", text: "Toon bron, omgeving, afsluiters en leidingmateriaal." },
      { title: "Herstel", text: "De afgesproken leiding of aansluiting wordt aangepakt." },
      { title: "Controle", text: "De herstelde werkzone wordt op zichtbare lekkage gecontroleerd." },
    ],
  }),
  service({
    slug: "ontstopping",
    title: "Ontstopping van afvoer en sanitair",
    description: "Afvoer verstopt? AB Service beoordeelt en ontstopt bereikbare sanitaire afvoeren in Antwerpen en bespreekt vervolgonderzoek bij terugkerende problemen.",
    intro: "Een traag lopende of volledig verstopte afvoer kan lokaal zijn of wijzen op een probleem verder in het traject. AB Service beoordeelt de bereikbare afvoer en stemt de methode af op het toestel en leidingverloop.",
    answer: "Geef aan welke afvoer problemen geeft, of andere toestellen tegelijk borrelen en welke middelen al zijn gebruikt. Gebruik geen extra chemische ontstoppers voordat iemand aan de leiding werkt.",
    warning: "Meng nooit verschillende ontstoppingsmiddelen. Vermeld altijd welk product al in de afvoer zit, zodat contact met agressieve stoffen kan worden vermeden.",
    imageKey: "sanitaryMarketing",
    sections: [
      {
        eyebrow: "Problemen",
        title: "Signalen die helpen bij de diagnose",
        items: [
          "Water loopt traag weg uit lavabo, douche, bad of spoelbak",
          "Eén afvoer is volledig geblokkeerd",
          "Meerdere toestellen borrelen of beïnvloeden elkaar",
          "De verstopping keert kort na een eerdere reiniging terug",
        ],
      },
      {
        eyebrow: "Afbakening",
        title: "Lokale sifon of verder in het leidingtraject",
        paragraphs: [
          "De gekozen aanpak hangt af van de vermoedelijke locatie, de bereikbaarheid en het materiaal van de afvoer. Een probleem in een gemeenschappelijke leiding of riolering kan andere apparatuur of een gespecialiseerde partner vereisen.",
        ],
      },
      {
        eyebrow: "Preventie",
        title: "Terugkerende verstopping verdient verder onderzoek",
        paragraphs: [
          "Regelmatig terugkerende problemen kunnen samenhangen met afschot, leidingdiameter, beschadiging of verkeerd gebruik. AB Service bespreekt na de eerste interventie of een aanvullende controle nodig is.",
        ],
      },
    ],
    steps: [
      { title: "Inventarisatie", text: "Bepaal welke afvoeren getroffen zijn." },
      { title: "Veiligheid", text: "Meld eerder gebruikte chemische producten." },
      { title: "Ontstopping", text: "Werk vanuit een geschikte bereikbare toegang." },
      { title: "Doorstroming", text: "Controleer werking en bespreek terugkeerpreventie." },
    ],
  }),
  service({
    slug: "boiler",
    title: "Boiler plaatsen, onderhouden of herstellen",
    description: "AB Service helpt met elektrische boilers en warmwatertoestellen: diagnose, vervanging en aansluiting op basis van toestel en bestaande installatie.",
    intro: "Geen of onvoldoende warm water, lekkage of een boiler die vervangen moet worden? AB Service beoordeelt toestelgegevens, inhoud, aansluitingen en beschikbare ruimte voordat werk wordt ingepland.",
    answer: "Stuur een foto van het volledige toestel, het typeplaatje, de aansluitingen en de beschikbare ruimte. Vermeld of het probleem temperatuur, capaciteit, lekkage of stroomvoorziening betreft.",
    warning: "Raak geen natte elektrische onderdelen aan. Schakel bij lekkage rond elektriciteit de installatie alleen uit als dit veilig kan en gebruik het toestel niet opnieuw vóór controle.",
    imageKey: "boilerServiceMarketing",
    sections: [
      {
        eyebrow: "Diensten",
        title: "Van diagnose tot vervanging",
        items: [
          "Onderzoek bij onvoldoende of geen warm water",
          "Controle van bereikbare aansluitingen en veiligheidscomponenten",
          "Vervanging van een bestaand warmwatertoestel",
          "Plaatsing na controle van vermogen, inhoud, ruimte en aansluiting",
        ],
      },
      {
        eyebrow: "Keuze",
        title: "Inhoud en vermogen moeten bij het gebruik passen",
        paragraphs: [
          "Het aantal gebruikers, tappatroon, beschikbare elektrische aansluiting, montageruimte en afstand tot tappunten beïnvloeden de toestelkeuze. Alleen een literinhoud vergelijken is daarom niet voldoende.",
        ],
      },
      {
        eyebrow: "Offerte",
        title: "Vermeld ook demontage en afvoer",
        paragraphs: [
          "Geef aan of het bestaande toestel moet worden verwijderd en afgevoerd en of leidingen, bevestiging of elektrische voeding moeten worden aangepast. Zo blijft de offerte afgebakend.",
        ],
      },
    ],
    steps: [
      { title: "Toestelgegevens", text: "Deel typeplaatje, inhoud en foutverschijnsel." },
      { title: "Situatie", text: "Toon aansluitingen, bevestiging en vrije werkruimte." },
      { title: "Voorstel", text: "Stem herstel of vervanging af op het gebruik." },
      { title: "Uitvoering", text: "Voer de overeengekomen plaatsing en controle uit." },
    ],
  }),
  service({
    slug: "leidingen",
    title: "Water- en verwarmingsleidingen plaatsen of aanpassen",
    description: "AB Service plaatst en wijzigt bereikbare water- en verwarmingsleidingen voor renovatie, sanitair en cv-installaties.",
    intro: "Nieuwe sanitaire toestellen, een gewijzigde indeling of een verwarmingsaanpassing kan nieuw leidingwerk vragen. AB Service stemt materiaal, tracé, diameter, afsluitbaarheid en afwerking af op de situatie.",
    answer: "Bezorg een plan of foto’s met de bestaande aansluitingen, gewenste tappunten of radiatoren en het beoogde leidingtracé. Vermeld welke wanden en vloeren open of afgewerkt zijn.",
    warning: "Gasleidingen en werken aan verbrandingstoestellen vragen een afzonderlijke technische beoordeling. Voer daar zelf geen wijzigingen aan uit.",
    imageKey: "installation",
    sections: [
      {
        eyebrow: "Toepassingen",
        title: "Leidingwerk voor sanitair en verwarming",
        items: [
          "Toevoer- en afvoerleidingen voor sanitaire toestellen",
          "Aanpassing van bereikbare warm- en koudwaterleidingen",
          "Leidingwerk voor radiatoren en cv-circuits",
          "Vervanging van plaatselijk beschadigde of verouderde leidingdelen",
        ],
      },
      {
        eyebrow: "Ontwerp",
        title: "Een logisch tracé voorkomt onnodig materiaal en warmteverlies",
        paragraphs: [
          "De route van een leiding beïnvloedt drukverlies, wachttijd op warm water, isolatie en bereikbaarheid voor toekomstig onderhoud. De definitieve uitvoering wordt daarom pas na beoordeling vastgelegd.",
        ],
      },
      {
        eyebrow: "Afwerking",
        title: "Spreek bouwkundig herstel vooraf af",
        paragraphs: [
          "Sleuven, kokers, tegelwerk, schilderwerk en vloerherstel zijn niet automatisch onderdeel van leidingwerk. De offerte vermeldt welke openingen en afwerking wel of niet inbegrepen zijn.",
        ],
      },
    ],
    steps: [
      { title: "Plan", text: "Leg bestaande en gewenste aansluitpunten vast." },
      { title: "Tracé", text: "Bepaal bereikbaarheid, materiaal en diameter." },
      { title: "Plaatsing", text: "Voer het afgesproken leidingwerk uit." },
      { title: "Controle", text: "Controleer het bereikbare traject vóór afwerking." },
    ],
  }),
  service({
    slug: "badkamerrenovatie",
    title: "Badkamerrenovatie en sanitair vernieuwen",
    description: "AB Service verzorgt het loodgieters- en sanitaire deel van badkamerrenovaties, van leidingwerk tot plaatsing van toestellen volgens afgesproken scope.",
    intro: "Bij een badkamerrenovatie verzorgt AB Service het afgesproken loodgieters- en sanitaire werk. De offerte maakt duidelijk welke toestellen, leidingen, afwerking en eventuele samenwerking met andere vakmensen inbegrepen zijn.",
    answer: "Deel een maatplan, foto’s van de bestaande badkamer, de gewenste indeling en productfiches van de toestellen. Zo kunnen aansluitingen en praktische beperkingen vóór de start worden beoordeeld.",
    warning: "Een badkamer combineert water en elektriciteit. Elektrische zones, ventilatie, waterdichting en constructieve wijzigingen moeten door de juiste vakmensen worden beoordeeld en uitgevoerd.",
    imageKey: "sanitaryMarketing",
    sections: [
      {
        eyebrow: "Scope",
        title: "Loodgieterswerk binnen een duidelijke renovatiescope",
        items: [
          "Aanpassen of vernieuwen van sanitaire toevoer en afvoer",
          "Plaatsing en aansluiting van overeengekomen sanitaire toestellen",
          "Voorbereiding van aansluitpunten volgens het maatplan",
          "Controle van het bereikbare leidingwerk vóór definitieve afwerking",
        ],
      },
      {
        eyebrow: "Coördinatie",
        title: "Bepaal vooraf wie elk onderdeel uitvoert",
        paragraphs: [
          "Sloop, elektriciteit, ventilatie, chape, waterdichting, tegelwerk, schrijnwerk en schilderwerk zijn afzonderlijke disciplines. AB Service legt vóór de start vast welke onderdelen zelf worden uitgevoerd en welke door andere vakmensen gebeuren.",
        ],
      },
      {
        eyebrow: "Voorbereiding",
        title: "Productkeuzes moeten technisch passen",
        paragraphs: [
          "Inbouwmaten, debiet, afvoerpositie, bevestiging en onderhoudsruimte kunnen de plaatsing beïnvloeden. Bestel definitieve toestellen daarom pas wanneer de technische maten en aansluitingen zijn gecontroleerd.",
        ],
      },
    ],
    steps: [
      { title: "Wensen", text: "Leg indeling, toestellen en afwerkingsniveau vast." },
      { title: "Opname", text: "Controleer maten, leidingen en technische grenzen." },
      { title: "Planning", text: "Stem loodgieterswerk en andere disciplines op elkaar af." },
      { title: "Uitvoering", text: "Plaats en controleer volgens de overeengekomen scope." },
    ],
  }),
]);

export const getAdditionalService = (slug) =>
  additionalServices.find((entry) => entry.slug === slug);
