import {buildFaultCodeAliases} from "../libs/fault-code-aliases.mjs";

// Literal June2024 CU-GH16 rows from the two linked BE/Lux books.
// Meanings paraphrase reported conditions; actions are explicit per row.
// No Calenta copying, format-range inference or installer remedies for users.
export const tzerraAceMaticSources = Object.freeze({
  "installer": {
    "sourceUrl": "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Tzerra-Ace-Matic/NL/Tzerra-Ace-Matic-Installatie--en-servicehandleiding-NL.pdf",
    "printedIdentifier": "7875188 - 01 - 20062024",
    "sha256": "5527f0e4a6ff599cd4339fe8ee8845231de53d1f88b3004200bf26ccbda8eb91",
    "models": [
      "28c",
      "28c G31",
      "35c",
      "25s"
    ],
    "market": [
      "België",
      "Luxemburg"
    ],
    "language": "nl"
  },
  "user": {
    "sourceUrl": "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Tzerra-Ace-Matic/NL/Tzerra-Ace-Matic-Gebruikershandleiding-NL.pdf",
    "printedIdentifier": "7875187 - 01 - 20062024",
    "sha256": "6e04692b8531db3b9a0fad012a29c9d496cbc41c057bc745458b7691a595e4a6",
    "models": [
      "28c",
      "28c G31",
      "35c",
      "25s"
    ],
    "market": [
      "België",
      "Luxemburg"
    ],
    "language": "nl"
  }
});

const actions = Object.freeze({
  "observe": "Noteer de volledige displaycode, het exacte model en de omstandigheden. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen gesloten onderdelen, werk niet aan sensoren, bedrading of printplaten en gebruik de professionele tabel niet als reset- of herstelprocedure.",
  "pressure": "Lees alleen de veilig zichtbare installatiedruk af en noteer de volledige code en het exacte model. Deze rij geeft geen universeel vuldoel: vul niet bij, tap niet af en activeer geen vul- of ontluchtingsprogramma op basis van deze servicetabel. Laat drukverlies, herhaalde vulmeldingen of lekkage professioneel beoordelen.",
  "configuration": "Noteer de volledige code en het exacte model. Configuratie, CN1/CN2, CSU, busverbindingen en kalibratie zijn voor de installateur; open geen onderdelen en wijzig geen instellingen. Laat een blijvende of terugkerende melding professioneel beoordelen.",
  "combustion": "Bij gasgeur, rookgasgeur, een CO-alarm of zichtbare roetvorming: blijf uit de gevarenzone en volg de veiligheidsmelding boven deze tabel; gebruik het toestel niet verder. Zonder zulke signalen: noteer de volledige code en laat verbranding, gastoevoer en rookgasafvoer professioneel beoordelen. Open geen onderdelen, verander geen gasinstellingen en gebruik deze tabel niet voor resets of spanningsonderbreking.",
  "recovery": "Deze tijdelijke communicatiemelding wordt volgens de bron automatisch opgelost. Dat bewijst niet dat de installatie probleemloos werkt. Noteer bij aanhouden, herhaling of klachten de volledige code en het exacte model; laat die beoordelen. Start geen extra reset en open geen onderdelen.",
  "resetState": "Volgens de bron loopt al een resetprocedure die zichzelf afhandelt; dit is geen verzoek om een nieuwe reset. Een procedurestatus bewijst niet dat de oorzaak verholpen is. Laat een aanhoudende of terugkerende melding beoordelen; wijzig geen instellingen en onderbreek de netspanning niet als herstelpoging.",
  "external": "Noteer de volledige code, het exacte model en de bekende configuratie. De bron noemt het SCB-09-accessoire en het apparaat op X9, maar bewijst niet dat die aanwezig zijn. Laat de installateur de werkelijke uitbreiding en aansluitingen beoordelen; open geen onderdelen en wijzig geen configuratie of veiligheidscontacten.",
  "unknown": "Noteer de volledige code met alle cijfers en het exacte model. De bron specificeert hier geen nadere diagnose; kort de code niet in en verwissel geen twee- en driecijferige suffixen. Laat de melding professioneel beoordelen; open geen onderdelen en start geen reset of spanningsonderbreking op basis van deze tabel.",
  "resetLimit": "Het toegestane aantal resets is bereikt: voer geen verdere resets of spanningsonderbreking uit als herstelpoging. Noteer de volledige code en het exacte model en laat de onderliggende oorzaak professioneel onderzoeken. De professionele oplossingskolom is geen gebruikersinstructie."
});

const definitions = [
  {
    "id": "remeha-tzerra-ace-matic-cu-warnings",
    "title": "Tzerra Ace-Matic — CU-GH16 — waarschuwingen",
    "scope": "Uitsluitend Tzerra Ace-Matic 28c, 28c G31, 35c en 25s voor België en Luxemburg, CU-GH16, installatieboek 7875188-01-20062024 tabel 59, gecontroleerd tegen gebruikersboek 7875187-01-20062024 tabel 16. De installatiebron noemt A een waarschuwing; volgens de gebruikersbron kan het toestel daarbij blijven werken. Deze editie bevat 18 letterlijke bronrijen, niet alle merkcodes. De aanwezige opties en aansluitingen moeten worden vastgesteld, waaronder bij H02.70 het SCB-09-accessoire; dit is geen SCB-09-, SCB-10- of CU-GH-21-catalogus. Niet voor legacy Tzerra, Tzerra Ace, Calenta, Avanta, Quinta of andere revisies. Artikelnummers, serials, firmware, actuele toestelcompatibiliteit en nieuwste editie zijn niet vastgesteld. Lees de volledige toestelcode: generiek OpenTherm 254 is geen alias. Geen universele druk-, vul- of resethandeling afgeleid uit verschillende bronpassages.",
    "sourceLabel": "Remeha België — Tzerra Ace-Matic installatie- en servicehandleiding 7875188-01-20062024",
    "sourceUrl": "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Tzerra-Ace-Matic/NL/Tzerra-Ace-Matic-Installatie--en-servicehandleiding-NL.pdf",
    "sourcePages": "installatie tabel 59, p. 82–83; gebruiker tabel 16, p. 20",
    "sourceClass": "A",
    "installerTable": 59,
    "userTable": 16,
    "userPages": "20",
    "rows": [
      [
        "A00.34",
        "De regeling vindt de buitentemperatuursensor niet.",
        "observe",
        82,
        20
      ],
      [
        "A02.06",
        "Het verwarmingscircuit meldt een lage waterdruk.",
        "pressure",
        82,
        20
      ],
      [
        "A02.18",
        "De toestelconfiguratie is niet juist ingesteld; de professionele controle betreft CN1/CN2.",
        "configuration",
        82,
        20
      ],
      [
        "A02.33",
        "De toegestane duur voor het bijvullen is overschreden.",
        "pressure",
        82,
        20
      ],
      [
        "A02.34",
        "Het minimale interval tussen twee aanvragen voor automatisch vullen is nog niet verstreken.",
        "pressure",
        82,
        20
      ],
      [
        "A02.36",
        "Een functioneel apparaat is niet meer verbonden.",
        "configuration",
        82,
        20
      ],
      [
        "A02.37",
        "Een passief functioneel apparaat is niet meer verbonden.",
        "configuration",
        82,
        20
      ],
      [
        "A02.45",
        "De regeling meldt een verbindingsfout.",
        "configuration",
        82,
        20
      ],
      [
        "A02.46",
        "De regeling meldt een fout in de prioriteit van een apparaat.",
        "configuration",
        82,
        20
      ],
      [
        "A02.48",
        "De functie van een unit is niet correct geconfigureerd; de professionele controle omvat externe elektrische aansluitingen.",
        "configuration",
        82,
        20
      ],
      [
        "A02.49",
        "Een knooppunt kon niet worden geïnitialiseerd; de professionele controle omvat externe elektrische aansluitingen.",
        "configuration",
        82,
        20
      ],
      [
        "A02.55",
        "Het serienummer ontbreekt of wordt niet als correct herkend.",
        "observe",
        82,
        20
      ],
      [
        "A02.76",
        "Het interne geheugen is gereserveerd voor volledige aanpassing van instellingen; verdere wijzigingen zijn niet mogelijk. De bron noemt dit niet een vastgesteld geheugendefect.",
        "configuration",
        82,
        20
      ],
      [
        "A02.80",
        "De communicatiebus mist de vereiste afsluitweerstand.",
        "configuration",
        82,
        20
      ],
      [
        "A05.29",
        "De gasdruk ligt onder de toegestane grens; deze rij noemt geen numerieke gasdrukwaarde.",
        "combustion",
        82,
        20
      ],
      [
        "A05.30",
        "De controle van de gasdruk is niet geslaagd.",
        "combustion",
        82,
        20
      ],
      [
        "A05.95",
        "Het vlamsignaal is kort onderbroken. De oplossingscel van deze bronrij is leeg; daaruit volgt geen herstelhandeling.",
        "combustion",
        83,
        20
      ],
      [
        "A08.02",
        "De regeling meldt dat de douchetijd voorbij is; deze rij geeft geen diagnose van oververhitting of een defecte flowsensor.",
        "observe",
        83,
        20
      ]
    ]
  },
  {
    "id": "remeha-tzerra-ace-matic-cu-temporary",
    "title": "Tzerra Ace-Matic — CU-GH16 — tijdelijke stops",
    "scope": "Uitsluitend Tzerra Ace-Matic 28c, 28c G31, 35c en 25s voor België en Luxemburg, CU-GH16, installatieboek 7875188-01-20062024 tabel 60, gecontroleerd tegen gebruikersboek 7875187-01-20062024 tabel 17. De installatiebron noemt H een tijdelijke stop; automatische hervatting of een procedurestatus is geen bewijs dat de installatie probleemloos werkt. Deze editie bevat 33 letterlijke bronrijen, niet alle merkcodes. De aanwezige opties en aansluitingen moeten worden vastgesteld, waaronder bij H02.70 het SCB-09-accessoire; dit is geen SCB-09-, SCB-10- of CU-GH-21-catalogus. Niet voor legacy Tzerra, Tzerra Ace, Calenta, Avanta, Quinta of andere revisies. Artikelnummers, serials, firmware, actuele toestelcompatibiliteit en nieuwste editie zijn niet vastgesteld. Lees de volledige toestelcode: generiek OpenTherm 254 is geen alias. Geen universele druk-, vul- of resethandeling afgeleid uit verschillende bronpassages.",
    "sourceLabel": "Remeha België — Tzerra Ace-Matic installatie- en servicehandleiding 7875188-01-20062024",
    "sourceUrl": "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Tzerra-Ace-Matic/NL/Tzerra-Ace-Matic-Installatie--en-servicehandleiding-NL.pdf",
    "sourcePages": "installatie tabel 60, p. 83–86; gebruiker tabel 17, p. 21–23",
    "sourceClass": "H",
    "installerTable": 60,
    "userTable": 17,
    "userPages": "21–23",
    "rows": [
      [
        "H00.42",
        "De waterdruksensor is onderbroken of defect, of de waterdruk is te hoog. De code alleen onderscheidt deze mogelijkheden niet.",
        "observe",
        83,
        21
      ],
      [
        "H00.81",
        "De sensor voor de omgevingstemperatuur wordt niet gevonden.",
        "observe",
        83,
        21
      ],
      [
        "H01.00",
        "De printplaat meldt een tijdelijke communicatiefout die volgens de bron automatisch wordt opgelost.",
        "recovery",
        83,
        21
      ],
      [
        "H01.05",
        "Het verschil tussen aanvoer- en retourtemperatuur heeft de toegestane grens bereikt.",
        "observe",
        83,
        21
      ],
      [
        "H01.08",
        "De aanvoertemperatuur in het verwarmingscircuit stijgt sneller dan toegestaan.",
        "observe",
        83,
        21
      ],
      [
        "H01.14",
        "Aanvoer of retour heeft de maximale temperatuur bereikt.",
        "observe",
        83,
        21
      ],
      [
        "H01.18",
        "De regeling meldt tijdelijk ontbrekende waterdoorstroming; de code bevestigt op zichzelf geen pompdefect.",
        "observe",
        83,
        21
      ],
      [
        "H01.21",
        "Tijdens sanitair-warmwaterbedrijf stijgt de aanvoertemperatuur te snel.",
        "observe",
        83,
        21
      ],
      [
        "H02.00",
        "Er loopt een resetprocedure; dit is een procedurestatus die volgens de bron zichzelf afhandelt, geen instructie om opnieuw te resetten.",
        "resetState",
        83,
        21
      ],
      [
        "H02.02",
        "De regeling wacht op invoer van de configuratiegegevens CN1/CN2.",
        "configuration",
        84,
        21
      ],
      [
        "H02.03",
        "De configuratiegegevens CN1/CN2 zijn niet correct ingevoerd.",
        "configuration",
        84,
        21
      ],
      [
        "H02.04",
        "De instellingen van de printplaat zijn niet leesbaar; de professionele controle noemt ook CSU, het externe configuratiegeheugen.",
        "configuration",
        84,
        22
      ],
      [
        "H02.05",
        "Het instelgeheugen past niet bij het printplaattype van de ketel.",
        "configuration",
        84,
        22
      ],
      [
        "H02.07",
        "De waterdruk in het verwarmingscircuit is laag; deze rij geeft geen numeriek bijvuldoel.",
        "pressure",
        84,
        22
      ],
      [
        "H02.12",
        "Een ingang blokkeert de vrijgave van de ketel; de professionele controle betreft het RL-vrijgavecontact en het externe sturende apparaat.",
        "configuration",
        84,
        22
      ],
      [
        "H02.31",
        "Door lage druk vraagt het toestel om automatisch vullen van het systeem. Dat bewijst niet dat elke installatie automatisch vullen ondersteunt.",
        "pressure",
        84,
        22
      ],
      [
        "H02.38",
        "Het toegestane aantal automatische vulcycli is bereikt; dit verschilt van de maximale vultijd en het minimale vulinterval.",
        "pressure",
        84,
        22
      ],
      [
        "H02.70",
        "De test van de externe warmteterugwinunit is niet geslaagd; de professionele controle noemt het SCB-09-accessoire en het apparaat op X9.",
        "external",
        84,
        22
      ],
      [
        "H03.00",
        "Identificatiegegevens voor het veiligheidsapparaat van de ketel ontbreken.",
        "configuration",
        84,
        22
      ],
      [
        "H03.01",
        "De comfortsoftware meldt een interne communicatiefout op de besturingsprint.",
        "observe",
        84,
        22
      ],
      [
        "H03.02",
        "De vlam is tijdelijk weggevallen.",
        "combustion",
        84,
        22
      ],
      [
        "H03.05",
        "De regeling meldt een interne stop.",
        "observe",
        85,
        22
      ],
      [
        "H03.08",
        "De regeling detecteert een vlamsignaal dat op dat moment niet hoort op te treden.",
        "combustion",
        85,
        23
      ],
      [
        "H03.09",
        "De voedingsspanning is te laag.",
        "observe",
        85,
        23
      ],
      [
        "H03.17",
        "Het gasregelsysteem meldt een storing.",
        "combustion",
        85,
        23
      ],
      [
        "H03.26",
        "De ketel vraagt om kalibratie; dit is een professionele instellingshandeling.",
        "configuration",
        85,
        23
      ],
      [
        "H03.28",
        "De regeling meldt een synchronisatiefout; de professionele controle betreft de voedingsfrequentie.",
        "observe",
        85,
        23
      ],
      [
        "H03.31",
        "De regeling meldt een storing bij een geblokkeerde schoorsteen; de code alleen bevestigt geen fysieke obstructie.",
        "combustion",
        85,
        23
      ],
      [
        "H03.254",
        "De bron omschrijft deze volledige code als een niet nader bepaalde fout. H03.54 staat als afzonderlijke bronrij vermeld, niet als bewezen alias.",
        "unknown",
        85,
        23
      ],
      [
        "H03.54",
        "De bron omschrijft deze volledige code als een niet nader bepaalde fout. H03.254 staat als afzonderlijke bronrij vermeld, niet als bewezen alias.",
        "unknown",
        85,
        23
      ],
      [
        "H20.36",
        "De handmatige kalibratie is niet geslaagd; de rij geeft geen gebruikersprocedure om die opnieuw te starten.",
        "configuration",
        85,
        23
      ],
      [
        "H20.39",
        "De primaire kalibratie ontbreekt of is niet voltooid; verdere kalibratie is voor de installateur.",
        "configuration",
        86,
        23
      ],
      [
        "H20.40",
        "De gasconfiguratie ontbreekt. Dit bewijst niet dat het toestel met een verkeerd gastype wordt gevoed.",
        "configuration",
        86,
        23
      ]
    ]
  },
  {
    "id": "remeha-tzerra-ace-matic-cu-locking",
    "title": "Tzerra Ace-Matic — CU-GH16 — vergrendelingen",
    "scope": "Uitsluitend Tzerra Ace-Matic 28c, 28c G31, 35c en 25s voor België en Luxemburg, CU-GH16, installatieboek 7875188-01-20062024 tabel 61, gecontroleerd tegen gebruikersboek 7875187-01-20062024 tabel 18. De installatiebron noemt E een vergrendeling; de professionele reset- en herstelkolommen zijn geen gebruikersprocedure. Deze editie bevat 46 letterlijke bronrijen, niet alle merkcodes. De aanwezige opties en aansluitingen moeten worden vastgesteld, waaronder bij H02.70 het SCB-09-accessoire; dit is geen SCB-09-, SCB-10- of CU-GH-21-catalogus. Niet voor legacy Tzerra, Tzerra Ace, Calenta, Avanta, Quinta of andere revisies. Artikelnummers, serials, firmware, actuele toestelcompatibiliteit en nieuwste editie zijn niet vastgesteld. Lees de volledige toestelcode: generiek OpenTherm 254 is geen alias. Geen universele druk-, vul- of resethandeling afgeleid uit verschillende bronpassages.",
    "sourceLabel": "Remeha België — Tzerra Ace-Matic installatie- en servicehandleiding 7875188-01-20062024",
    "sourceUrl": "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Tzerra-Ace-Matic/NL/Tzerra-Ace-Matic-Installatie--en-servicehandleiding-NL.pdf",
    "sourcePages": "installatie tabel 61, p. 86–90; gebruiker tabel 18, p. 24–28",
    "sourceClass": "E",
    "installerTable": 61,
    "userTable": 18,
    "userPages": "24–28",
    "rows": [
      [
        "E00.04",
        "De retourtemperatuursensor wordt bij inschakeling of ontsteking niet als aangesloten herkend; dit is de opstartcontrole, niet de melding tijdens bedrijf.",
        "observe",
        86,
        24
      ],
      [
        "E00.05",
        "De ketel meldt kortsluiting in de retourtemperatuursensor.",
        "observe",
        86,
        24
      ],
      [
        "E00.06",
        "De retoursensor wordt tijdens ketelbedrijf niet als aangesloten herkend; dit verschilt van de opstartcontrole E00.04.",
        "observe",
        86,
        24
      ],
      [
        "E00.07",
        "De door de retoursensor gemeten temperatuur is te hoog.",
        "observe",
        86,
        24
      ],
      [
        "E00.16",
        "De temperatuursensor van de sanitair-warmwaterboiler is niet aangesloten; de toepasselijkheid hangt af van de werkelijke boilerconfiguratie.",
        "configuration",
        86,
        24
      ],
      [
        "E00.17",
        "De temperatuursensor van de sanitair-warmwaterboiler is kortgesloten; de toepasselijkheid hangt af van de werkelijke boilerconfiguratie.",
        "observe",
        86,
        24
      ],
      [
        "E00.40",
        "De ingang van de waterdruksensor is open; dit is geen zelfstandige melding van te lage waterdruk.",
        "observe",
        86,
        24
      ],
      [
        "E00.41",
        "De ingang van de waterdruksensor is gesloten; dit is geen zelfstandige melding van te hoge waterdruk.",
        "observe",
        86,
        24
      ],
      [
        "E00.44",
        "Het circuit van de sanitair-warmwatertemperatuursensor is open; de rij is niet gelijkgesteld aan de afzonderlijke boilersensorcode E00.16.",
        "observe",
        86,
        24
      ],
      [
        "E00.45",
        "De sanitair-warmwatertemperatuursensor is kortgesloten; de rij is niet gelijkgesteld aan de afzonderlijke boilersensorcode E00.17.",
        "observe",
        86,
        24
      ],
      [
        "E01.12",
        "De retourtemperatuur wordt hoger gemeten dan de aanvoertemperatuur.",
        "observe",
        87,
        24
      ],
      [
        "E01.17",
        "De regeling meldt ontbrekende waterdoorstroming als permanente storing; dit verschilt van de tijdelijke melding H01.18.",
        "observe",
        87,
        25
      ],
      [
        "E01.20",
        "De rookgastemperatuur heeft de maximale grens bereikt.",
        "combustion",
        87,
        25
      ],
      [
        "E02.15",
        "De bron meldt overschrijding van de minimumtijd voor herkenning van de CSU-sleutel en noemt een time-out of niet-herkende sleutel; dit is niet als maximumtijd herschreven.",
        "configuration",
        87,
        25
      ],
      [
        "E02.17",
        "De printplaat meldt een permanente communicatiefout.",
        "observe",
        87,
        25
      ],
      [
        "E02.32",
        "De tijd voor automatisch vullen is verstreken; dit bewijst op zichzelf geen printplaatdefect.",
        "pressure",
        87,
        25
      ],
      [
        "E02.35",
        "Een kritiek veiligheidsapparaat is niet meer verbonden.",
        "configuration",
        87,
        25
      ],
      [
        "E02.39",
        "Na automatisch vullen is de druk onvoldoende toegenomen; de code bevestigt op zichzelf geen lekkage of defect onderdeel.",
        "pressure",
        87,
        25
      ],
      [
        "E02.47",
        "De verbinding met een extern apparaat is niet geslaagd; de daadwerkelijke aansluiting en configuratie moeten worden vastgesteld.",
        "configuration",
        87,
        25
      ],
      [
        "E04.00",
        "De veiligheidsinstellingen zijn niet geldig.",
        "configuration",
        87,
        25
      ],
      [
        "E04.01",
        "De aanvoertemperatuursensor is kortgesloten.",
        "observe",
        87,
        25
      ],
      [
        "E04.02",
        "De aanvoertemperatuursensor wordt niet als aangesloten herkend.",
        "observe",
        87,
        25
      ],
      [
        "E04.03",
        "De aanvoertemperatuur heeft de maximale grens overschreden.",
        "observe",
        87,
        25
      ],
      [
        "E04.04",
        "De rookgastemperatuursensor is kortgesloten.",
        "observe",
        87,
        25
      ],
      [
        "E04.05",
        "De rookgastemperatuursensor wordt niet als aangesloten herkend.",
        "observe",
        87,
        25
      ],
      [
        "E04.06",
        "De rookgastemperatuur heeft een kritische grens bereikt; schoorsteenblokkade en sensorcontrole zijn onderzoekspunten, geen bewezen oorzaak.",
        "combustion",
        88,
        25
      ],
      [
        "E04.07",
        "Het maximale verschil tussen aanvoertemperaturen is bereikt. De bron zegt hier niet dat dit het verschil tussen aanvoer en retour is.",
        "observe",
        88,
        26
      ],
      [
        "E04.10",
        "Na vijf pogingen is de branderontsteking niet geslaagd.",
        "combustion",
        88,
        26
      ],
      [
        "E04.11",
        "De VPS-test van de gasklep is niet geslaagd.",
        "combustion",
        88,
        26
      ],
      [
        "E04.12",
        "De regeling meldt een ontstekingsfout bij detectie van een ongewenst vlamsignaal.",
        "combustion",
        88,
        26
      ],
      [
        "E04.13",
        "De regeling meldt een geblokkeerd ventilatorblad.",
        "combustion",
        88,
        26
      ],
      [
        "E04.14",
        "De ketel meldt een verbrandingsstoring.",
        "combustion",
        88,
        26
      ],
      [
        "E04.15",
        "De ketel meldt een storing bij geblokkeerde rookgasafvoer; de code alleen bevestigt geen fysieke blokkade.",
        "combustion",
        88,
        26
      ],
      [
        "E04.17",
        "Het regelcircuit van de gasklep meldt een fout.",
        "combustion",
        88,
        26
      ],
      [
        "E04.18",
        "De aanvoertemperatuur ligt onder de minimale grens.",
        "observe",
        88,
        26
      ],
      [
        "E04.23",
        "De bron noemt een interne stop bij communicatie; zij specificeert in deze beschrijving geen protocol of bewezen defect onderdeel.",
        "observe",
        89,
        26
      ],
      [
        "E04.24",
        "De regeling kan het gastype niet vaststellen; dit is niet gelijkgesteld aan ontbrekende gastoevoer.",
        "configuration",
        89,
        27
      ],
      [
        "E04.25",
        "Tijdens de veiligheidstijd is de vlam weggevallen.",
        "combustion",
        89,
        27
      ],
      [
        "E04.26",
        "De regeling meldt een ontstekingsfout.",
        "combustion",
        89,
        27
      ],
      [
        "E04.27",
        "De regeling meldt een fout waarbij de gasklep open staat bij vlamdetectie.",
        "combustion",
        89,
        27
      ],
      [
        "E04.28",
        "De terugmelding van de gasklep is niet correct.",
        "combustion",
        89,
        27
      ],
      [
        "E04.29",
        "Het maximaal toegestane aantal resets is bereikt; dit is geen verzoek om een volgende reset.",
        "resetLimit",
        90,
        27
      ],
      [
        "E04.50",
        "De regeling meldt een gasklepstoring. E04.250 is een aparte letterlijke bronrij; gelijkwaardige actuele codes zijn niet vastgesteld.",
        "combustion",
        90,
        27
      ],
      [
        "E04.54",
        "De regeling meldt een niet nader bepaalde fout. E04.254 is een aparte letterlijke bronrij, niet als bewezen alias samengevoegd.",
        "unknown",
        90,
        27
      ],
      [
        "E04.250",
        "De regeling meldt een gasklepstoring. E04.50 is een aparte letterlijke bronrij; gelijkwaardige actuele codes zijn niet vastgesteld.",
        "combustion",
        90,
        28
      ],
      [
        "E04.254",
        "De regeling meldt een niet nader bepaalde fout. E04.54 is een aparte letterlijke bronrij, niet als bewezen alias samengevoegd.",
        "unknown",
        90,
        28
      ]
    ]
  }
];

export const tzerraAceMaticCatalogs = Object.freeze(definitions.map(({rows,installerTable,userTable,userPages,sourceClass,...catalog}) => Object.freeze({
  ...catalog,
  companionSource: Object.freeze({
    sourceUrl:tzerraAceMaticSources.user.sourceUrl,
    sourceLabel:"Remeha België — Tzerra Ace-Matic gebruikershandleiding 7875187-01-20062024",
    sourcePages:`tabel ${userTable}, p. ${userPages}`,
  }),
  codes: Object.freeze(rows.map(([code,meaning,action,installerPage,userPage]) => Object.freeze({
    code,meaning,sourceClass,userAction:actions[action],
    sourcePage:`installatie tabel ${installerTable}, p. ${installerPage}; gebruiker tabel ${userTable}, p. ${userPage}`,
    searchTerms:buildFaultCodeAliases(code).join(" "),
  }))),
})));
