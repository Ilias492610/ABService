import { coreSources } from "./core-sources.mjs";
import { maintenanceSources } from "../libs/maintenance-check.mjs";

const sources = Object.freeze({
  meter: {
    label: "Pidpa: waterverbruik en vermoedelijke lekken",
    href: "https://www.pidpa.be/veelgestelde-vragen",
  },
  radiators: {
    label: "Bosch België: vragen over radiatoren en cv-installaties",
    href: "https://www.bosch-homecomfort.com/be/nl/residentieel/service-ondersteuning/faq/",
  },
  vaillantUser: {
    label: "Vaillant België: gebruikershandleiding ecoTEC plus/exclusive, 0020282232_06",
    href: "https://www.vaillant.be/downloads/documenten/gebruikshandleiding/0020282232-04-2763671.pdf",
  },
  boilerDischarge: {
    label: "Atlantic: water uit de veiligheidsgroep van een elektrische voorraadboiler",
    href: "https://www.atlantic.fr/aide/chauffe-eau-electrique/fonctionnement-utilisation/de-l-eau-coule-du-groupe-de-securite-de-mon-chauffe-eau-que-faire",
  },
  drainChemicals: {
    label: "Belgisch Antigifcentrum: risico’s van chemische ontstoppers",
    href: "https://www.antigifcentrum.be/Toxinfos/ontstoppers-2/",
  },
  flemishMaintenance: {
    label: "Vlaanderen: onderhoud, attesten en erkende technici",
    href: "https://www.vlaanderen.be/verplicht-onderhoud-van-uw-cv-installatie-centrale-verwarming",
  },
  brusselsMaintenance: {
    label: "Leefmilieu Brussel: EPB-periodieke controle en het attest",
    href: "https://leefmilieu.brussels/verwarmingsketel",
  },
  flemishInspection: {
    label: "Vlaanderen: keuring van een nieuwe of gewijzigde cv-installatie",
    href: "https://www.vlaanderen.be/verplichte-keuring-van-een-nieuwe-of-gewijzigde-cv-installatie",
  },
  brusselsInspection: {
    label: "Leefmilieu Brussel: EPB-oplevering en controle bij plaatsing",
    href: maintenanceSources.brusselsInspection,
  },
  gasFlanders: {
    label: "Fluvius: gasgeur of gaslek melden",
    href: "https://www.fluvius.be/nl/storingen-en-werken/storing-aardgas",
  },
  gasBrussels: {
    label: "Sibelga: contact en noodnummer bij gasgeur",
    href: "https://www.sibelga.be/nl/contact?_country=BE",
  },
  co: {
    label: "Belgisch Antigifcentrum: handelen bij vermoedelijke CO-vergiftiging",
    href: "https://www.antigifcentrum.be/Toxinfos/co-vergiftiging/",
  },
});

const combustionWarning = "Bij gasgeur verlaat u het gebouw en belt u van buiten: Fluvius 0800 65 0 65 in Vlaanderen, Sibelga 0800 19 400 in Brussel. Bedien in de betrokken ruimte geen elektrische schakelaars of toestellen. Bij vermoeden van CO-vergiftiging of direct gevaar belt u 112 vanuit een veilige plaats. Ga niet terug naar binnen om foto’s of toestelgegevens te verzamelen.";

const guide = (entry) => Object.freeze({
  ...entry,
  path: `/advies/${entry.slug}`,
  sections: Object.freeze(entry.sections),
  steps: Object.freeze(entry.steps),
  relatedLinks: Object.freeze(entry.relatedLinks),
  sourceLinks: Object.freeze(entry.sourceLinks),
});

export const adviceGuides = Object.freeze([
  guide({
    slug: "watermeter-blijft-draaien",
    checkedAt: "2026-10-10",
    modifiedAt: "2026-10-11",
    title: "Watermeter blijft draaien zonder watergebruik: wat controleren?",
    description: "Lees hoe u onverwacht waterverbruik veilig vastlegt, automatische verbruikers herkent en een vermoedelijk waterlek gericht laat onderzoeken.",
    eyebrow: "Onverwacht waterverbruik",
    category: "Waterlekken",
    contactService: "Lekdetectie",
    intro: "De meterstand verandert terwijl niemand bewust water gebruikt. Noteer eerst wanneer dat gebeurt en welke toestellen automatisch water kunnen nemen. De meter toont verbruik, maar lokaliseert de oorzaak niet.",
    answer: "Vergelijk twee meterstanden tijdens een periode zonder waterafname en noteer de tijdstippen. Blijft er onverklaard verbruik, laat de binneninstallatie onderzoeken. Een stilstaande meter sluit een onderbroken lek of een andere oorzaak van vocht niet uit.",
    warning: "Wacht bij een actief waterlek of overstroming niet op een lange meting. Blijf uit een natte zone met elektriciteit. Sluit de hoofdwaterkraan alleen wanneer u die veilig kunt bereiken; schakel bij direct gevaar de bevoegde noodhulp in.",
    sections: [
      {
        eyebrow: "Eerst uitsluiten",
        title: "Welke toestellen nemen misschien toch water?",
        paragraphs: ["Een periode zonder bewust watergebruik is alleen bruikbaar wanneer u ook automatische afname kunt uitsluiten. Een gezamenlijke meter kan bovendien verbruik van andere bewoners registreren."],
        items: [
          "Controleer of wasmachine, vaatwasser of beregening actief is",
          "Houd rekening met een waterontharder of andere automatische spoelcyclus",
          "Noteer of een toilet blijft doorlopen of een kraan zichtbaar druppelt",
          "Ga na of de meter alleen uw woning of meerdere gebruikers meet",
        ],
      },
      {
        eyebrow: "Meting",
        title: "Maak twee vergelijkbare notities",
        items: [
          "Noteer de volledige meterstand, eenheid en tijd van de eerste aflezing",
          "Gebruik in de gekozen periode geen water en noteer onverwachte afname",
          "Lees dezelfde meter opnieuw af en noteer het tweede tijdstip",
          "Bewaar eventueel foto’s van het display als de meter veilig bereikbaar is",
        ],
        paragraphs: ["Pidpa beschrijft een controle tussen avond en ochtend zonder watergebruik. De uitkomst vergt uitleg wanneer automatische toestellen actief waren of de aflezing onduidelijk is; een kort stilstaand display geeft geen zekerheid over de hele dag."],
      },
      {
        eyebrow: "Afbakening",
        title: "Waterverbruik en cv-druk zijn verschillende gegevens",
        paragraphs: [
          "Vermeld apart of de drinkwatermeter verandert, de cv-druk daalt of een vochtplek groter wordt. Die observaties zijn niet onderling uitwisselbaar en wijzen op zichzelf geen defect onderdeel aan.",
          "Een stilstaande watermeter betekent niet dat alle leidingen of afvoeren lekvrij zijn. Noteer bij vochtproblemen ook het verband met douchen, afvoer, regen of een verwarmingscyclus.",
        ],
      },
      {
        eyebrow: "Veilige observatie",
        title: "Kijk alleen naar bereikbare plekken",
        items: [
          "Zichtbare aansluitingen onder lavabo of spoelbak",
          "Vochtsporen rond toilet, kraan en bereikbare leiding",
          "Plaats en verandering van een vochtplek op wand of plafond",
          "Water rond het toestel zonder afscherming te verwijderen",
        ],
        paragraphs: ["Maak geen wand of vloer open om een vermoeden te bevestigen. Ligt het probleem aan de watermeter of het openbare netwerk, neem dan contact op met uw watermaatschappij. Een vermoedelijk lek in de binneninstallatie vraagt een andere beoordeling."],
      },
      {
        eyebrow: "Aanvraag",
        title: "Geef de meetomstandigheden mee",
        paragraphs: ["Bezorg de twee standen, tijdstippen, bekende verbruikers en plaats van eventuele vochtsporen. Meld of u al hebt afgesloten en of het waterverlies aanhoudt. Zo kan worden besproken of eerst lokalisatie of rechtstreeks herstel aangewezen is."],
      },
    ],
    steps: [
      { title: "Veiligheid", text: "Beperk direct gevaar vóór u een meting overweegt." },
      { title: "Verbruikers", text: "Controleer gewone en automatische waterafname." },
      { title: "Noteren", text: "Leg twee volledige standen en tijdstippen vast." },
      { title: "Onderzoek", text: "Laat onverklaard verbruik gericht beoordelen." },
    ],
    relatedLinks: [
      { label: "Vergelijk twee totale standen met de lokale watermetercheck", href: "/tools/watermetercheck" },
      { label: "Vermoedelijk waterlek laten lokaliseren", href: "/diensten/lekdetectie" },
      { label: "Bereikbaar waterlek laten herstellen", href: "/diensten/waterlek-herstellen" },
      { label: "Terugkerend drukverlies van de cv-ketel", href: "/advies/drukverlies-cv-ketel" },
      { label: "Water bij de veiligheidsgroep van een boiler", href: "/advies/boiler-veiligheidsgroep-druppelt" },
    ],
    sourceLinks: [sources.meter],
  }),
  guide({
    slug: "radiator-blijft-koud",
    checkedAt: "2026-10-10",
    modifiedAt: "2026-10-10",
    title: "Radiator blijft koud terwijl andere radiatoren warm worden",
    description: "Eén koude radiator of helemaal geen verwarming? Noteer de verschillen, controleer gewone gebruikersinstellingen en lees wanneer onderzoek nodig is.",
    eyebrow: "Ongelijkmatige verwarming",
    category: "Verwarming",
    contactService: "Herstelling verwarming",
    intro: "Eén kamer die koud blijft vraagt andere informatie dan een volledige woning zonder verwarming. Noteer hoeveel radiatoren getroffen zijn en of er nog warm water uit de kraan komt.",
    answer: "Controleer de gewone thermostaatinstelling en het verwarmingsprogramma volgens hun gebruikershandleiding. Noteer druk, geluiden en welke radiatoren warm worden. Een koude radiator bewijst op zichzelf geen luchtprobleem, defecte kraan of ketelstoring.",
    warning: combustionWarning,
    sections: [
      {
        eyebrow: "Vergelijken",
        title: "Eén radiator, meerdere kamers of de hele woning?",
        items: [
          "Eén radiator: welke andere radiatoren worden op hetzelfde moment warm?",
          "Meerdere kamers: treedt het probleem tegelijk of op verschillende momenten op?",
          "Hele woning: vraagt de thermostaat volgens zijn display om warmte?",
          "Warm water: werkt dat wel, minder goed of helemaal niet?",
        ],
        paragraphs: ["Beschrijf alleen wat u vaststelt. Het patroon helpt bij de beoordeling, maar bepaalt zonder onderzoek niet de oorzaak."],
      },
      {
        eyebrow: "Gebruikersinstellingen",
        title: "Controleer het normale programma",
        paragraphs: [
          "Kijk of het gebruikersdisplay een verwarmingsprogramma, tijdelijke afwezigheid of uitgeschakelde verwarmingsfunctie toont. Volg de handleiding van de regeling; wijzig geen installateursinstellingen.",
          "De geraadpleegde Vaillant-gebruikershandleiding noemt bij werkend warm water en ontbrekende verwarming een onjuiste externe thermostaatinstelling als mogelijke oorzaak. Dat is een modelspecifieke aanwijzing, geen diagnose voor iedere installatie.",
        ],
      },
      {
        eyebrow: "Zichtbare gegevens",
        title: "Druk en geluiden helpen de vraag verduidelijken",
        items: [
          "Lees de getoonde cv-druk af zonder het toestel te openen",
          "Noteer borrelen, tikken of andere terugkerende geluiden",
          "Vermeld of de klacht na ontluchten of een recente wijziging begon",
          "Maak alleen vanuit een veilige, bereikbare plek een foto van het display",
        ],
        paragraphs: ["Bosch beschrijft lucht, een probleem met de doorstroming of een thermostatische kraan als mogelijke verklaringen voor ongelijkmatige warmte. De juiste druk hangt af van het toestel en de installatie; volg uw eigen handleiding."],
      },
      {
        eyebrow: "Grens",
        title: "Ontluchten alleen met de juiste gebruikersprocedure",
        paragraphs: [
          "Ontlucht alleen wanneer de gebruikershandleiding van uw installatie die handeling duidelijk beschrijft en u die veilig kunt uitvoeren. Laat hete onderdelen afkoelen en vraag hulp wanneer de werkwijze onduidelijk is.",
          "Open geen toestelbehuizing, verwijder geen kraanonderdelen en verstel geen inregelventielen op basis van deze gids. Blijft het probleem terugkomen, laat dan beoordelen of doorstroming, regeling of een ander onderdeel onderzoek vraagt.",
        ],
      },
      {
        eyebrow: "Voorbereiding",
        title: "Maak een kort overzicht per kamer",
        paragraphs: ["Vermeld de getroffen kamers, wanneer de klacht voorkomt, de thermostaatinstelling, merk en model, druk en eventuele code. Voor een onderzoek naar verdeling van warmte is dat nuttiger dan meteen een onderdeel te bestellen."],
      },
    ],
    steps: [
      { title: "Patroon", text: "Vergelijk radiatoren en beschikbaar warm water." },
      { title: "Regeling", text: "Controleer uitsluitend normale gebruikersinstellingen." },
      { title: "Gegevens", text: "Noteer display, druk en terugkerende geluiden." },
      { title: "Beoordeling", text: "Laat aanhoudende of onduidelijke klachten onderzoeken." },
    ],
    relatedLinks: [
      { label: "Verwarming laten herstellen", href: "/herstelling" },
      { label: "Wat noteren wanneer warm water ontbreekt?", href: "/advies/geen-warm-water" },
      { label: "Drukverlies en veilig controleren", href: "/advies/drukverlies-cv-ketel" },
      { label: "Modelgebonden foutcodes opzoeken", href: "/foutcodes" },
    ],
    sourceLinks: [sources.radiators, sources.vaillantUser, sources.gasFlanders, sources.gasBrussels, sources.co],
  }),
  guide({
    slug: "geen-warm-water",
    checkedAt: "2026-10-10",
    modifiedAt: "2026-10-10",
    title: "Geen warm water: welke gegevens helpen bij de diagnose?",
    description: "Geen warm water aan één kraan of in de hele woning? Vergelijk tappunten, herken het toesteltype en bereid een gerichte herstellingsaanvraag voor.",
    eyebrow: "Warm water valt uit",
    category: "Warm water",
    contactService: "Herstelling verwarming",
    intro: "Geen warm water kan een klacht aan één tappunt zijn of de hele woning treffen. Vertel ook of uw woning nog verwarmd wordt en welk toestel normaal het warme water levert.",
    answer: "Noteer of koud water wel stroomt, welke tappunten getroffen zijn en of de verwarming werkt. Lees het display en controleer alleen gewone gebruikersinstellingen volgens de exacte handleiding. Het symptoom alleen wijst geen defect onderdeel aan.",
    warning: `${combustionWarning} Bij een elektrische boiler met water rond elektrische delen blijft u uit de natte zone en laat u de situatie veilig beoordelen.`,
    sections: [
      {
        eyebrow: "Toesteltype",
        title: "Waar komt uw warme water normaal vandaan?",
        items: [
          "Een combiketel die ook de woning verwarmt",
          "Een afzonderlijk gas-waterverwarmingstoestel",
          "Een elektrische voorraadboiler",
          "Een voorraadvat dat door een ander systeem wordt verwarmd",
        ],
        paragraphs: ["Bezorg merk en model als u die veilig kunt aflezen. Weet u het type niet, omschrijf dan wat zichtbaar is; verwijder geen afscherming om het te achterhalen."],
      },
      {
        eyebrow: "Tappunten",
        title: "Leg het verschil tussen één kraan en alle kranen vast",
        items: [
          "Vermeld of de klacht aan één of meerdere tappunten voorkomt",
          "Noteer of koud water daar normaal stroomt",
          "Beschrijf of het warme water volledig koud blijft of tijdelijk afkoelt",
          "Vermeld wanneer de klacht begon en of ze telkens terugkomt",
        ],
        paragraphs: ["Laat geen kranen langdurig lopen om een storing te bewijzen. Deze vergelijking levert informatie voor de beoordeling; ze bewijst niet dat een kraan, sensor of warmtewisselaar defect is."],
      },
      {
        eyebrow: "Verwarming en regeling",
        title: "Noteer welke functies nog werken",
        paragraphs: [
          "Schrijf op of verwarming, warm water of beide uitvallen. Kijk op het normale gebruikersdisplay of het toestel uitgeschakeld is of het warmwaterprogramma gewijzigd werd, en raadpleeg de bijbehorende handleiding.",
          "De Vaillant-handleiding voor de genoemde ecoTEC-modellen onderscheidt uitval van beide functies van ontbrekende verwarming bij werkend warm water. Bedieningsstappen uit die handleiding gelden niet automatisch voor een ander toestel.",
        ],
      },
      {
        eyebrow: "Veilig handelen",
        title: "Stop bij een terugkerende storing",
        paragraphs: [
          "Voer geen herhaalde resets uit om het toestel toch te laten werken. Een eventuele gebruikersreset gebeurt uitsluitend volgens de exacte handleiding en nooit bij gasgeur, CO-vermoeden of een ander gevaar.",
          "Open geen behuizing, raak geen bedrading aan en verander geen gas-, verbrandings- of beveiligingsonderdelen. Laat de oorzaak beoordelen wanneer de storing terugkeert of de procedure onduidelijk is.",
        ],
      },
      {
        eyebrow: "Aanvraag",
        title: "Kies de dienst op basis van het echte toestel",
        paragraphs: ["Voor een verwarmingsketel geeft u merk, model, volledige foutcode en beschikbare functies mee. Voor een afzonderlijke boiler helpen ook inhoud, zichtbaar aansluitingswerk en eventuele lekkage. Gebruik de passende dienstlink hieronder; een foto of foutcode vervangt geen technische diagnose."],
      },
    ],
    steps: [
      { title: "Veiligheid", text: "Sluit direct gevaar uit vóór gewone gebruikerscontroles." },
      { title: "Vergelijken", text: "Noteer tappunten en beschikbare verwarmingsfuncties." },
      { title: "Handleiding", text: "Controleer alleen toegestane gebruikersinstellingen." },
      { title: "Aanvraag", text: "Deel toestelgegevens en het verloop van de klacht." },
    ],
    relatedLinks: [
      { label: "Cv-ketel of verwarming laten herstellen", href: "/herstelling" },
      { label: "Afzonderlijke boiler laten beoordelen", href: "/diensten/boiler" },
      { label: "Water uit de veiligheidsgroep van uw boiler", href: "/advies/boiler-veiligheidsgroep-druppelt" },
      { label: "Radiator blijft koud", href: "/advies/radiator-blijft-koud" },
      { label: "Foutcode en modelgebonden bron zoeken", href: "/foutcodes" },
    ],
    sourceLinks: [sources.vaillantUser, sources.gasFlanders, sources.gasBrussels, sources.co],
  }),
  guide({
    slug: "boiler-veiligheidsgroep-druppelt",
    checkedAt: "2026-10-10",
    modifiedAt: "2026-10-10",
    title: "Veiligheidsgroep van uw boiler druppelt: wanneer controleren?",
    description: "Water bij een voorraadboiler? Noteer waar en wanneer het vrijkomt, onderscheid afvoer van lekkage en laat aanhoudend waterverlies beoordelen.",
    eyebrow: "Water bij de voorraadboiler",
    category: "Warm water",
    contactService: "Boiler plaatsen of herstellen",
    intro: "Druppels uit een bedoelde veiligheidsafvoer zijn iets anders dan water uit de mantel of een koppeling. Noteer eerst de plaats en het moment van het waterverlies zonder aan de veiligheidscomponenten te werken.",
    answer: "Bij de elektrische voorraadboilers die Atlantic beschrijft kan licht druppelen via de veiligheidsgroep tijdens opwarming normaal zijn. Aanhoudend of ruim waterverlies, ook buiten opwarming, vraagt beoordeling. De exacte handleiding en uw echte installatie blijven bepalend.",
    warning: "Blokkeer of sluit de afvoer of uitlaat van de veiligheidsgroep nooit af. Ga niet afdoppen of dichtstoppen om druppels te laten verdwijnen. Het afgevoerde water kan heet zijn. Blijf bij water rond elektrische onderdelen uit de natte zone en laat het toestel veilig beoordelen.",
    sections: [
      {
        eyebrow: "Plaats",
        title: "Waar verschijnt het water precies?",
        items: [
          "Uit de zichtbare veiligheidsafvoer of het bijbehorende afvoertraject",
          "Rond een warm- of koudwaterkoppeling",
          "Uit de mantel of onderzijde van het toestel",
          "Op een plaats die zonder demontage niet duidelijk is",
        ],
        paragraphs: ["Raak de afvoer niet aan om temperatuur te testen. Een overzicht van toestel en bereikbare aansluitingen is alleen zinvol als u dat vanuit een veilige plek kunt vastleggen."],
      },
      {
        eyebrow: "Moment",
        title: "Alleen bij opwarming of ook daarbuiten?",
        paragraphs: [
          "Atlantic legt uit dat de veiligheidsgroep water kan afvoeren wanneer water in de voorraadboiler opwarmt en uitzet. Dat verklaart waarom enkele druppels tijdens die cyclus niet altijd een lekkage betekenen.",
          "Dezelfde fabrikant vraagt aandacht voor ruim of blijvend waterverlies buiten die cyclus. Deze uitleg gaat over een voorraadboiler met de bedoelde veiligheidsgroep, niet automatisch over een cv-veiligheidsventiel of condensafvoer.",
        ],
      },
      {
        eyebrow: "Beveiliging",
        title: "Verhelp een vermoeden niet door de uitlaat te sluiten",
        paragraphs: [
          "Laat de veiligheidsafvoer vrij en voer geen wijziging aan de veiligheidsgroep uit. Een onderliggende oorzaak wordt niet opgelost door het zichtbare water tegen te houden.",
          "Bedien geen onbekende ventielen en wijzig geen drukinstellingen op basis van deze gids. Noteer het gedrag en vraag welke controle voor dit toestel nodig is.",
        ],
      },
      {
        eyebrow: "Beoordeling",
        title: "Welke observaties geeft u mee?",
        items: [
          "Merk, exact model en inhoud indien zichtbaar",
          "Plaats van het waterverlies en het verband met opwarming",
          "Druppels, een straaltje of groter waterverlies als beschrijving",
          "Eventuele foutmelding, veranderd warmwatercomfort of recente werkzaamheden",
        ],
        paragraphs: ["Deze gegevens helpen de aanvraag afbakenen. Ze bepalen zonder onderzoek niet of een ventiel, aansluiting of het toestel vervangen moet worden."],
      },
      {
        eyebrow: "Vervolg",
        title: "Afvoerwater en herstelvraag apart bespreken",
        paragraphs: ["Meld of de afvoer het water opvangt of dat het op vloer en andere onderdelen terechtkomt. Spreek vóór werkzaamheden af welke controle en eventueel herstel nodig zijn, en welke toegang beschikbaar is. Gebruik bij direct gevaar geen online aanvraag als noodkanaal."],
      },
    ],
    steps: [
      { title: "Veilige afstand", text: "Vermijd heet water en natte elektrische onderdelen." },
      { title: "Plaats", text: "Omschrijf de bron zonder iets te demonteren." },
      { title: "Moment", text: "Noteer of het water alleen tijdens opwarming verschijnt." },
      { title: "Controle", text: "Laat aanhoudend of onduidelijk waterverlies beoordelen." },
    ],
    relatedLinks: [
      { label: "Boiler laten controleren of herstellen", href: "/diensten/boiler" },
      { label: "Geen warm water: informatie voor de diagnose", href: "/advies/geen-warm-water" },
      { label: "Watermeter verandert zonder bewust verbruik", href: "/advies/watermeter-blijft-draaien" },
      { label: "Waterlek aan een aansluiting laten herstellen", href: "/diensten/waterlek-herstellen" },
    ],
    sourceLinks: [sources.boilerDischarge],
  }),
  guide({
    slug: "afvoer-verstopt-wat-doen",
    checkedAt: "2026-10-10",
    modifiedAt: "2026-10-10",
    title: "Afvoer verstopt: wat geeft u door vóór een ontstopping?",
    description: "Bereid een veilige ontstopping voor: vermeld getroffen afvoeren, terugkerende klachten, bereikbaarheid en eerder gebruikte chemische producten.",
    eyebrow: "Afvoer en doorstroming",
    category: "Afvoer",
    contactService: "Ontstopping",
    intro: "Water dat traag wegloopt of terugkomt vraagt eerst een duidelijke beschrijving. Meld welke afvoeren getroffen zijn en welke middelen al in de leiding zitten voordat iemand ze opent of behandelt.",
    answer: "Stop met extra water toevoeren wanneer de afvoer overloopt. Vermeld één of meerdere getroffen toestellen, het verloop van de klacht en eerder gebruikte producten. Meng nooit verschillende ontstoppers of andere chemicaliën.",
    warning: "Chemische ontstoppers kunnen ernstige brandwonden veroorzaken. Voeg geen ander product toe en meng nooit met javel. Gebruik geen plopper en open geen sifon wanneer een bijtende ontstopper aanwezig kan zijn; meld het product aan de uitvoerder. Verlaat bij direct gevaar de onveilige zone en schakel noodhulp in.",
    sections: [
      {
        eyebrow: "Inventarisatie",
        title: "Welke afvoeren zijn betrokken?",
        items: [
          "Lavabo, douche, bad, spoelbak of toilet: benoem het toestel",
          "Noteer of één afvoer of verschillende afvoeren tegelijk problemen geven",
          "Vermeld borrelen, terugstromen of overlopen zonder extra water te laten lopen",
          "Geef aan of het probleem voortdurend of bij een bepaalde handeling optreedt",
        ],
        paragraphs: ["Deze observaties geven context. Ze bewijzen niet waar de blokkering zit of welke methode geschikt is; dat hangt ook af van het werkelijke leidingtraject."],
      },
      {
        eyebrow: "Producten",
        title: "Vertel wat al in de leiding is gebruikt",
        items: [
          "Naam of foto van het etiket van een gebruikte ontstopper",
          "Wanneer het product werd toegevoegd",
          "Of u sindsdien iets anders hebt toegevoegd of de afvoer hebt geopend",
          "Of de verpakking nog beschikbaar is voor de uitvoerder",
        ],
        paragraphs: ["Het Belgisch Antigifcentrum waarschuwt voor bijtende stoffen in ontstoppers en voor mengen met andere chemicaliën. Een gebruikte ontstopper blijft daarom relevante veiligheidsinformatie, ook als het water nog slecht wegloopt."],
      },
      {
        eyebrow: "Toegang",
        title: "Beschrijf bereikbaarheid en gedeelde leidingen",
        paragraphs: [
          "Vermeld of de aansluiting zichtbaar en bereikbaar is en of er recente werkzaamheden waren. Verwijder geen vaste afwerking en open geen onbekende leiding om een foto te maken.",
          "In een appartement kan een gedeeld leidingtraject betrokken zijn. Geef aan welke andere bewoners klachten melden en wie het gebouw beheert; spreek af wie toegang en toestemming voor gemeenschappelijke delen regelt.",
        ],
      },
      {
        eyebrow: "Terugkerende klacht",
        title: "Een eerdere ontstopping is nuttige informatie",
        items: [
          "Wanneer een eerdere interventie plaatsvond",
          "Welke methode of werkzone op de werkbon staat",
          "Hoe lang de afvoer daarna normaal werkte",
          "Of het patroon nu hetzelfde of veranderd is",
        ],
        paragraphs: ["Terugkeer betekent niet automatisch dat dezelfde aanpak opnieuw geschikt is. Bespreek of verdere beoordeling nodig is voordat bijkomend werk wordt uitgevoerd."],
      },
      {
        eyebrow: "Afspraak",
        title: "Leg de opdracht vóór uitvoering vast",
        paragraphs: ["Bezorg de observaties, gebruikte producten en toegangssituatie. Vraag welke eerste aanpak binnen de opdracht valt, hoe vervolgonderzoek wordt besproken en wie eventueel herstel van afwerking uitvoert. Een tekstbeschrijving voorspelt niet of de volledige afvoer bereikbaar is."],
      },
    ],
    steps: [
      { title: "Stop afname", text: "Voeg bij overlopen geen extra water toe." },
      { title: "Meld producten", text: "Geef chemische middelen en gebruikstijd door." },
      { title: "Omschrijf", text: "Noem getroffen afvoeren, patroon en beschikbare toegang." },
      { title: "Stem af", text: "Bespreek ontstopping en mogelijk vervolgonderzoek." },
    ],
    relatedLinks: [
      { label: "Bereikbare sanitaire afvoer laten ontstoppen", href: "/diensten/ontstopping" },
      { label: "Leidingwerk laten beoordelen", href: "/diensten/leidingen" },
      { label: "Waterlek aan sanitair laten herstellen", href: "/diensten/waterlek-herstellen" },
      { label: "Prijzen en afbakening van de opdracht", href: "/tarieven" },
    ],
    sourceLinks: [sources.drainChemicals],
  }),
  guide({
    slug: "onderhoudsattest-cv-ketel",
    checkedAt: "2026-10-11",
    modifiedAt: "2026-10-11",
    title: "Onderhoudsattest cv-ketel: wat bewaren en doorgeven?",
    description: "Welke cv-documenten bewaart u in Vlaanderen of Brussel? Lees het verschil tussen onderhoudsattesten, EPB-controle en een rapport bij ingebruikname.",
    eyebrow: "Documenten bij uw installatie",
    category: "Documenten",
    contactService: "Onderhoud cv-ketel",
    intro: "Een onderhoudsfactuur, onderhoudsattest en rapport bij ingebruikname hebben niet dezelfde functie. Leg de documenten bij het juiste toestel en kijk na welke handeling werkelijk werd uitgevoerd.",
    answer: "In Vlaanderen krijgt u bij verplicht onderhoud van een centrale gas- of stookolieketel een reinigingsattest en verbrandingsattest; bewaar minstens de laatste twee attesten. Brussel gebruikt voor de periodieke controle een EPB-attest. Een factuur alleen vervangt die documenten niet.",
    warning: "Een datum of attest op papier is geen beoordeling van de huidige veiligheid. Volg aanwijzingen in het verslag en vraag verduidelijking bij tekortkomingen. Gebruik deze gids of de onderhoudscheck niet als bewijs dat uw toestel goedgekeurd is.",
    sections: [
      {
        eyebrow: "Vlaanderen",
        title: "Reinigings- en verbrandingsattesten bij onderhoud",
        paragraphs: [
          "Bij verplicht onderhoud van een centrale gas- of stookolieketel moeten naam, erkenningsnummer en handtekening van de uitvoerende technicus op de attesten staan. Een huurder bezorgt een kopie aan de eigenaar. Bewaar minstens de laatste twee attesten.",
          "De erkenning is persoonsgebonden. Controleer of de uitvoerder de juiste erkenning voor het gewest en de handeling heeft; een bedrijfsnaam alleen toont dat niet aan.",
        ],
      },
      {
        eyebrow: "Nieuwe huurder",
        title: "Welke documenten geeft de eigenaar door in Vlaanderen?",
        paragraphs: [
          "In Vlaanderen bezorgt de eigenaar kopieën van de laatste twee onderhoudsattesten aan de nieuwe huurder. Leg bij de overdracht vast bij welk toestel die horen en welke documenten nog ontbreken.",
          "De eigenaar bezorgt ook een kopie van het keuringsrapport bij ingebruikname aan de huurder. De huurder geeft op zijn beurt kopieën van de onderhoudsattesten aan de eigenaar, zodat beiden het dossier kunnen bijhouden.",
        ],
      },
      {
        eyebrow: "Brussel",
        title: "EPB-periodieke controle en het bijbehorende attest",
        paragraphs: [
          "Bij de Brusselse EPB-periodieke controle controleert een erkende EPB-verwarmingsketeltechnicus de installatie en ontvangt u het bijbehorende attest. Bewaar het bij de installatiedocumenten en kijk welke uitkomst of vervolgstappen zijn vermeld.",
          "Leefmilieu Brussel legt de periodieke controle bij een huurpand in beginsel bij de huurder, tenzij het huurcontract iemand anders aanwijst. Dat zegt niet automatisch wie iedere herstelling betaalt. Laat de concrete afspraken verduidelijken bij twijfel.",
          "Spreek vooraf af wie het digitale attest als PDF ontvangt en bewaart. Wilt u dat de eigenaar of een contactpersoon het ook ontvangt, geef dan diens e-mailadres aan de technicus voor de digitale bezorging.",
        ],
      },
      {
        eyebrow: "Andere handeling",
        title: "Een onderhoudsattest is geen rapport bij ingebruikname",
        paragraphs: [
          "In Vlaanderen hoort bij een nieuw of gewijzigd centraal stooktoestel in de toepasselijke situaties een keuring vóór ingebruikname. In Brussel bestaat bij plaatsing of vervanging van een verwarmingsketel de afzonderlijke EPB-oplevering.",
          "Een afzonderlijke gaswaterverwarmer krijgt bij plaatsing in Brussel een eerste EPB-periodieke controle. Verwar die handeling niet met de EPB-oplevering van een centrale verwarmingsketel.",
          "Vermeld bij een aanvraag of u een onderhoud, een controle na wijziging of ontbrekende ingebruiknamedocumenten bedoelt. De term ‘keuring’ alleen kan voor verschillende vragen worden gebruikt.",
        ],
      },
      {
        eyebrow: "Dossier",
        title: "Welke gegevens maken een document bruikbaar?",
        items: [
          "Toestel en installatie waarop het document betrekking heeft",
          "Datum en omschrijving van de uitgevoerde handeling",
          "Gegevens en vereiste erkenning van de uitvoerende persoon",
          "Uitkomst, opmerkingen en eventuele volgende datum",
          "Andere beschikbare rapporten, handleiding en plaatsingsgegevens",
        ],
        paragraphs: ["Gebruik de onderhoudscheck als hulp bij uw planning. Een volgende datum of oorspronkelijke onderhoudscyclus op het bestaande attest blijft relevante informatie; een berekening met alleen de laatste bezoekdatum kan daarvan afwijken."],
      },
      {
        eyebrow: "Huurwoning",
        title: "Houd documentoverdracht en herstellingskosten uit elkaar",
        paragraphs: [
          "Voor de verdeling van onderhoud en herstellingen raadpleegt u de officiële wooninformatie voor Vlaanderen of Brussel. Welke verplichting geldt, hangt af van het gewest en de concrete situatie; documentoverdracht bepaalt op zichzelf niet wie een herstelling betaalt.",
          "Een afspraak over de organisatie van de controle geeft geen vrijstelling van de wettelijke regels voor herstellingen aan huurwoningen. In Brussel kunnen de partijen niet van de wettelijke verdeling van herstellingen afwijken.",
        ],
      },
      {
        eyebrow: "Ontbrekend document",
        title: "Vraag eerst het bestaande verslag op",
        paragraphs: [
          "Vraag de eerdere uitvoerder, eigenaar of gebouwbeheerder of een kopie beschikbaar is. Meld welke documenten ontbreken en vul geen onbekende onderhoudsdatum in om een aanvraag compleet te maken.",
          "Blijft een document of datum onbekend, kies dan niet automatisch een controle op basis van een vermoeden. Laat eerst verduidelijken welk toestel, welke handeling en welke bestaande documenten van toepassing zijn.",
          "Een foto of factuur kan het toestel en eerdere opdracht helpen identificeren, maar bewijst niet zelfstandig dat alle vereiste controles uitgevoerd zijn. Bespreek wat moet worden nagekeken voordat een nieuwe afspraak wordt vastgelegd.",
        ],
      },
    ],
    steps: [
      { title: "Verzamelen", text: "Leg facturen, attesten en ingebruiknamerapporten samen." },
      { title: "Herkennen", text: "Controleer toestel, handeling, gewest en uitvoerder." },
      { title: "Aanvullen", text: "Vraag ontbrekende documenten bij de eerdere betrokkenen op." },
      { title: "Plannen", text: "Bespreek de passende controle met uw dossier erbij." },
    ],
    relatedLinks: [
      { label: "Gratis onderhoudscheck voor Vlaanderen en Brussel", href: "/tools/onderhoudscheck" },
      { label: "Periodiek cv-ketelonderhoud bespreken", href: "/onderhoud" },
      { label: "Keuring bij plaatsing of wijziging", href: "/keuring" },
      { label: "Gasketelinstallatie en oplevering", href: "/installaties/gasketels" },
    ],
    sourceLinks: [
      sources.flemishMaintenance, sources.brusselsMaintenance, sources.flemishInspection,
      coreSources.rentalHeatingFlanders, coreSources.rentalRepairsFlanders,
      coreSources.rentalRepairsBrussels, sources.brusselsInspection,
    ],
  }),
]);

export const getAdviceGuide = (slug) => adviceGuides.find((entry) => entry.slug === slug);
