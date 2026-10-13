import {buildFaultCodeAliases} from "../libs/fault-code-aliases.mjs";

// Literal combined2019 BE/nl CU-GH08 tables43/44/45,14A21H25E.
// Source-specific paraphrases and explicit safe observations, no inferred ranges.
const definitions = [
  {
    "id": "remeha-quinta-ace-cu-warnings",
    "title": "Quinta Ace — CU-GH08 — waarschuwingen",
    "scope": "Uitsluitend Quinta Ace 45, 65, 90 en 115 voor België, CU-GH08, gecombineerd installatie- en gebruikersboek 7684362-v.05-10012019, tabel 43. A is een waarschuwing waarbij de ketel volgens tabel 42 kan blijven werken; de oorzaak vraagt beoordeling en de melding kan escaleren. Deze tabel bevat 14 meldingen; dat is geen volledige merkdekking. De handleiding is gebaseerd op CU-GH08 software 1.4, HMI T-control/MK3 software 1.29 en SCB-10 software 0.5 (tabel 1, p. 12); dit bewijst niet welke software uw toestel gebruikt. Een SCB-10-uitbreiding hangt af van de installatie (p. 33; Performance-uitvoering p. 76), dit is geen volledige afzonderlijke lijst voor SCB-10. Niet voor Quinta Ace 160, andere revisies of Luxemburg. Exacte product- en serienummers, toepassing op uw eigen toestel en bediening en de nieuwste handleiding zijn hier niet vastgesteld. Vergelijk uw eigen model- en bedieningshandleiding; lees de volledige displaycode. Professionele remedies zijn geen gebruikersprocedure: deze tabellen geven geen druk-, vul-, ontluchtings-, reset-, stroomonderbrekings- of instelhandeling.",
    "sourceLabel": "Remeha België — Quinta Ace 45–115 installatie- en gebruikershandleiding 7684362-v.05-10012019",
    "sourceUrl": "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Quinta-Ace/NL/190110_IM_UM_Quinta-Ace-45-115-T-Control_NL.pdf",
    "sourcePages": "tabel 43, p. 60–61",
    "sourceClass": "A",
    "table": 43,
    "rows": [
      [
        "A00.34",
        "De regeling verwacht een buitentemperatuursensor, maar vindt die sensor niet. De code bewijst niet welke aansluiting of sensor defect is.",
        "Lees de volledige zichtbare code. Noteer de volledige code en of ze na een bekende installatie- of onderhoudswijziging verscheen; geef dit door zonder de sensor of bedrading te onderzoeken. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        60
      ],
      [
        "A00.42",
        "De regeling verwacht de waterdruksensor, maar krijgt geen detectie daarvan. Dit is een detectiemelding, geen bewijs van een bepaalde werkelijke waterdruk.",
        "Lees de volledige zichtbare code. Fotografeer de zichtbare melding en meld wanneer ze begon; verricht zelf geen drukmeting, bijvulling of aansluitingscontrole. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        60
      ],
      [
        "A01.23",
        "De bron meldt een ongunstige verbranding. De oplossingskolom behandelt hierbij vlamwegval tijdens werking en ontbrekende ionisatiestroom.",
        "Lees de volledige zichtbare code. Meld de exacte code en of verwarming of warm water merkbaar wegviel; zoek zelf niet naar een vlam en raak gas- of rookgasdelen niet aan. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        60
      ],
      [
        "A02.06",
        "Een waarschuwing over waterdruk is actief. De oplossingskolom noemt een te lage druk als te onderzoeken toestand.",
        "Lees de volledige zichtbare code. Geef code, tijdstip en eventueel merkbaar verminderde verwarming door; verander niets aan de waterinstallatie. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        60
      ],
      [
        "A02.36",
        "Een functioneel apparaat is losgekoppeld; de tabel behandelt een SCB die niet wordt gevonden.",
        "Lees de volledige zichtbare code. Meld de code en welke gewone verwarmingsfunctie niet meer beschikbaar lijkt; maak de behuizing niet open. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        60
      ],
      [
        "A02.37",
        "Een niet-kritisch apparaat is losgekoppeld; ook hier behandelt de tabel een niet gevonden SCB. Niet-kritisch betekent niet dat de oorzaak al bekend is.",
        "Lees de volledige zichtbare code. Noteer de code en of ze volgde op een bekende wijziging aan de installatie; geef dat aan de installateur door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "A02.45",
        "De CAN-verbindingsmatrix is vol. De bron koppelt haar oplossingskolom aan het niet vinden van een SCB.",
        "Lees de volledige zichtbare code. Bewaar een foto van de melding en meld recente bekende installatiewijzigingen; laat detectie of instellingen aan de installateur. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "A02.46",
        "De CAN-administratie voor apparaten is vol. De oplossingskolom verwijst naar een niet gevonden SCB.",
        "Lees de volledige zichtbare code. Geef de volledige code en bekende voorgeschiedenis door; wijzig geen aangesloten apparatuur of configuratie. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "A02.48",
        "Er is een configuratiefout in een functiegroep. De bron behandelt daarbij een niet gevonden SCB.",
        "Lees de volledige zichtbare code. Meld de code en of een zone of warmwaterfunctie anders werkt dan voordien; herstel geen instellingen zelf. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "A02.49",
        "Het initialiseren van een node is mislukt. De oplossingskolom behandelt een niet gevonden SCB.",
        "Lees de volledige zichtbare code. Noteer of de melding bij een gewone start of na recent bekend onderhoud verscheen en geef dit door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "A02.55",
        "Het serienummer van het apparaat ontbreekt of wordt als ongeldig gezien.",
        "Lees de volledige zichtbare code. Stuur de code en alleen veilig reeds beschikbare toestelgegevens of bestaande documentatie naar de leverancier. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "A02.69",
        "De demomodus is actief. De rij noemt een bedrijfsmodus, niet een bewezen defect.",
        "Lees de volledige zichtbare code. Geef de melding aan de leverancier door. Voer geen reset, stroomonderbreking of configuratiewijziging uit. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "A02.76",
        "De gereserveerde opslagruimte voor aangepaste parameters is vol; gebruikerswijzigingen zijn daardoor niet meer mogelijk. Dit is geen bewering van een RAM-defect.",
        "Lees de volledige zichtbare code. Meld de code en welke wijziging niet meer kon worden opgeslagen; herhaal geen instelwijzigingen en laat de configuratie beoordelen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "A08.02",
        "De voor het douchen gereserveerde tijd is verstreken.",
        "Lees de volledige zichtbare code. Meld of de waarschuwing na een langere douche verscheen en geef de volledige code door; pas geen parameter aan. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ]
    ]
  },
  {
    "id": "remeha-quinta-ace-cu-blocking",
    "title": "Quinta Ace — CU-GH08 — blokkeringen",
    "scope": "Uitsluitend Quinta Ace 45, 65, 90 en 115 voor België, CU-GH08, gecombineerd installatie- en gebruikersboek 7684362-v.05-10012019, tabel 44. H is een blokkering; tabel 42 beschrijft hervatting als de blokkerende oorzaak is verdwenen, geen gegarandeerd automatisch herstel voor elke rij. H01.00 heeft een eigen communicatiebetekenis; H02.00 is een al actieve reset en H03.17 een lopende veiligheidscontrole. Deze tabel bevat 21 meldingen; dat is geen volledige merkdekking. De handleiding is gebaseerd op CU-GH08 software 1.4, HMI T-control/MK3 software 1.29 en SCB-10 software 0.5 (tabel 1, p. 12); dit bewijst niet welke software uw toestel gebruikt. Een SCB-10-uitbreiding hangt af van de installatie (p. 33; Performance-uitvoering p. 76), dit is geen volledige afzonderlijke lijst voor SCB-10. Niet voor Quinta Ace 160, andere revisies of Luxemburg. Exacte product- en serienummers, toepassing op uw eigen toestel en bediening en de nieuwste handleiding zijn hier niet vastgesteld. Vergelijk uw eigen model- en bedieningshandleiding; lees de volledige displaycode. Professionele remedies zijn geen gebruikersprocedure: deze tabellen geven geen druk-, vul-, ontluchtings-, reset-, stroomonderbrekings- of instelhandeling.",
    "sourceLabel": "Remeha België — Quinta Ace 45–115 installatie- en gebruikershandleiding 7684362-v.05-10012019",
    "sourceUrl": "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Quinta-Ace/NL/190110_IM_UM_Quinta-Ace-45-115-T-Control_NL.pdf",
    "sourcePages": "tabel 44, p. 61–63",
    "sourceClass": "H",
    "table": 44,
    "rows": [
      [
        "H00.81",
        "Een verwachte kamertemperatuursensor is niet gedetecteerd.",
        "Lees de volledige zichtbare code. Noteer de code en of een kamerregeling recent door een professional is gewijzigd; onderzoek de aansluiting niet zelf. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "H01.00",
        "Er is een communicatiefout opgetreden; de oplossingskolom lokaliseert die bij de veiligheidskern en noemt professionele herstart en mogelijke CU-GH-vervanging. De algemene H-klasse bewijst niet dat deze specifieke melding vanzelf herstelt.",
        "Lees de volledige zichtbare code. Leg de zichtbare code vast en meld duur en eventuele uitval; start, reset of onderbreek de voeding niet op basis van deze inventaris. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "H01.05",
        "Het maximaal toegelaten temperatuurverschil tussen aanvoer en retour is bereikt of overschreden.",
        "Lees de volledige zichtbare code. Geef code en merkbare verwarmingsuitval door; manipuleer geen pomp, kleppen, sensoren of druk. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        61
      ],
      [
        "H01.08",
        "De maximale temperatuurstijging van de warmtewisselaar is overschreden. De korte beschrijving luidt Delta T Max 3; deze nadere betekenis komt uit de oplossingskolom. De bron geeft geen tijds- of stijgsnelheidseenheid.",
        "Lees de volledige zichtbare code. Meld wanneer de code in gewone verwarmingswerking verscheen en of de warmteafgifte verminderde; laat de technische oorzaak beoordelen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H01.14",
        "De aanvoertemperatuur is boven de maximale bedrijfswaarde gekomen.",
        "Lees de volledige zichtbare code. Noteer de code en het gewone gebruiksmoment waarop de verwarming wegviel; ga niet zelf temperatuurinstellingen of watercirculatie veranderen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H01.15",
        "De rookgastemperatuur heeft de maximale bedrijfswaarde overschreden.",
        "Lees de volledige zichtbare code. Geef code en tijdstip door; raak geen rookgasdelen aan en inspecteer ze niet. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.00",
        "Er wordt een reset uitgevoerd; de resetprocedure is actief.",
        "Lees de volledige zichtbare code. Bewaar alleen de zichtbare melding. Voer geen extra reset of stroomonderbreking uit; meld aan de installateur als deze toestand langdurig blijft staan. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.02",
        "De regeling wacht op het configuratienummer. De bron behandelt een onbekend nummer of configuratiefout.",
        "Lees de volledige zichtbare code. Meld de code en of de melding begon na bekend onderhoud; voer geen configuratienummer in. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.03",
        "Er is een configuratiefout, met een onbekend configuratienummer als genoemde onderzoeksrichting.",
        "Lees de volledige zichtbare code. Geef de exacte code en bekende toestel-/regelaarinformatie uit bestaande documentatie door; wijzig niets in het installateursmenu. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.04",
        "Er is een parameterfout; de tabel zegt dat de fabrieksinstellingen niet in orde zijn.",
        "Lees de volledige zichtbare code. Noteer de code en bekende voorafgaande onderhouds- of instelwerkzaamheden; laat de parametercontrole aan de installateur. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.05",
        "De CSU past niet bij het type CU. Dit is een configuratiemismatch, niet automatisch een bewezen kapotte CSU.",
        "Lees de volledige zichtbare code. Geef de code en gegevens uit al beschikbare onderhoudsdocumenten door; open de ketel niet om printtypes vast te stellen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.09",
        "Er is een gedeeltelijke blokkering van het apparaat. De bron noemt een blokkerende ingang of actieve vorstbeveiliging.",
        "Lees de volledige zichtbare code. Meld welke normale functie nog wel of niet werkt en wanneer de code begon; verander geen externe schakeling of beveiliging. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.10",
        "Er is een volledige blokkering. De blokkerende ingang is actief, in deze rij expliciet zonder vorstbeveiliging.",
        "Lees de volledige zichtbare code. Geef de volledige code en merkbare uitval door; laat de blokkerende ingang beoordelen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.12",
        "Het verwachte vrijgavesignaal uit de externe apparaatomgeving is niet tijdig beschikbaar; de oplossingskolom zegt dat de wachttijd is verstreken.",
        "Lees de volledige zichtbare code. Noteer tijdstip en zichtbare code, en meld welke normale verwarmingsvraag er toen was; test of overbrug de externe vrijgave niet. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        62
      ],
      [
        "H02.38",
        "De rij meldt dat er geen waterhardheid is. De remediekolom bevat alleen een streepje; de bron geeft geen verdere oorzaak, hardheidswaarde of herstelhandeling.",
        "Lees de volledige zichtbare code. Geef de exacte melding en het passende toesteltype door aan de installateur; verricht geen meting of instelling op basis van deze onuitgewerkte rij. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "H02.70",
        "Een test van het externe warmteterugwinningssysteem is mislukt.",
        "Lees de volledige zichtbare code. Geef de code door en meld alleen wat al bekend is over een aangesloten extern warmteterugwinningssysteem; open of test het systeem niet. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "H03.00",
        "Veiligheidsparameters van niveaus 2, 3 en 4 ontbreken of kloppen niet.",
        "Lees de volledige zichtbare code. Leg de code vast en meld uitval of recente bekende werkzaamheden; geen veiligheidsparameter wijzigen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "H03.01",
        "De gasklepregeling heeft geen geldige gegevens van de CU ontvangen.",
        "Lees de volledige zichtbare code. Noteer de code en het moment waarop ze verscheen; geef dit aan de installateur zonder communicatieverbindingen te onderzoeken. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "H03.02",
        "De gemeten ionisatiestroom ligt onder de grens. De oplossingskolom behandelt vlamwegval tijdens werking.",
        "Lees de volledige zichtbare code. Meld de code en eventueel opgemerkte onderbreking van warmte of warm water; probeer de vlam niet te observeren of te herstellen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "H03.05",
        "De gasklepregeling heeft een interne blokkering vastgesteld. De tabel koppelt dit aan een fout in de veiligheidskern.",
        "Lees de volledige zichtbare code. Bewaar de code en meld merkbare uitval; raak geen gas- of elektrische delen aan. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "H03.17",
        "Er wordt een periodieke veiligheidscontrole uitgevoerd; de betekenis beschrijft een controletoestand, geen bewezen defect. Dezelfde bron noemt tegelijk professionele herstart en CU-GH-vervanging in de remediekolom. Alleen de professional beoordeelt een aanhoudende of terugkerende melding; de bron noemt geen duurgrens.",
        "Lees de volledige zichtbare code. Observeer alleen of de zichtbare melding kortstondig of aanhoudend is en geef dat zo nodig door; onderbreek de controle niet en voer geen reset uit. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ]
    ]
  },
  {
    "id": "remeha-quinta-ace-cu-locking",
    "title": "Quinta Ace — CU-GH08 — vergrendelingen",
    "scope": "Uitsluitend Quinta Ace 45, 65, 90 en 115 voor België, CU-GH08, gecombineerd installatie- en gebruikersboek 7684362-v.05-10012019, tabel 45. E is een vergrendeling. Tabel 42 beschrijft herstel van de oorzaak en handmatige reset als professionele context, geen klantstap. Deze tabel bevat 25 meldingen; dat is geen volledige merkdekking. De handleiding is gebaseerd op CU-GH08 software 1.4, HMI T-control/MK3 software 1.29 en SCB-10 software 0.5 (tabel 1, p. 12); dit bewijst niet welke software uw toestel gebruikt. Een SCB-10-uitbreiding hangt af van de installatie (p. 33; Performance-uitvoering p. 76), dit is geen volledige afzonderlijke lijst voor SCB-10. Niet voor Quinta Ace 160, andere revisies of Luxemburg. Exacte product- en serienummers, toepassing op uw eigen toestel en bediening en de nieuwste handleiding zijn hier niet vastgesteld. Vergelijk uw eigen model- en bedieningshandleiding; lees de volledige displaycode. Professionele remedies zijn geen gebruikersprocedure: deze tabellen geven geen druk-, vul-, ontluchtings-, reset-, stroomonderbrekings- of instelhandeling.",
    "sourceLabel": "Remeha België — Quinta Ace 45–115 installatie- en gebruikershandleiding 7684362-v.05-10012019",
    "sourceUrl": "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Quinta-Ace/NL/190110_IM_UM_Quinta-Ace-45-115-T-Control_NL.pdf",
    "sourcePages": "tabel 45, p. 63–66",
    "sourceClass": "E",
    "table": 45,
    "rows": [
      [
        "E00.04",
        "De retourtemperatuursensor is weggenomen of geeft een waarde onder het meetbereik. De oplossingskolom noemt een open sensorcircuit.",
        "Lees de volledige zichtbare code. Geef de code en datum/tijd door; controleer of verplaats de sensor niet zelf. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "E00.05",
        "De retourtemperatuursensor heeft een kortsluiting of geeft een waarde boven het meetbereik.",
        "Lees de volledige zichtbare code. Fotografeer de melding en meld de uitval; neem geen sensor- of elektrische meting. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "E00.06",
        "Een retourtemperatuursensor wordt verwacht, maar niet gedetecteerd. Dit is geen beschrijving van normaal opstartgedrag.",
        "Lees de volledige zichtbare code. Noteer de volledige code en bekende voorafgaande onderhoudswerkzaamheden; open het toestel niet. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        63
      ],
      [
        "E00.07",
        "De handleiding omschrijft het temperatuurverschil op twee manieren: in de beschrijving gaat het om een te groot verschil in retourtemperatuur, terwijl de oplossingskolom een te groot verschil tussen aanvoer en retour noemt. Laat de installateur beoordelen wat deze melding bij uw toestel betekent.",
        "Lees de volledige zichtbare code. Geef de code en eventuele verwarmingsuitval door; presenteer niet zelf een berekend aanvoer-/retourverschil of een zekere oorzaak. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        64
      ],
      [
        "E00.16",
        "De temperatuursensor van de sanitair-warmwatertank is weggenomen of geeft een waarde onder het meetbereik; de bron behandelt een open boilersensor.",
        "Lees de volledige zichtbare code. Meld de code en of de warmwatervoorziening merkbaar veranderde; open de boiler/sensoraansluiting niet. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        64
      ],
      [
        "E00.17",
        "De temperatuursensor van de sanitair-warmwatertank is kortgesloten of geeft een waarde boven het meetbereik.",
        "Lees de volledige zichtbare code. Geef de volledige code en gewone gebruikscontext door; geen weerstand-, aansluitings- of temperatuurtest uitvoeren. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        64
      ],
      [
        "E01.04",
        "Er zijn vijf ongewenste gevallen van vlamverlies opgetreden volgens displaytekst en remediekolom. De beschrijvingskolom bevat de afwijkende bronformulering ‘5x fout onbedoeld foutverlies opgetreden’; de kolommen stemmen niet letterlijk overeen.",
        "Lees de volledige zichtbare code. Meld de code en opgemerkte onderbrekingen van warmte; lok geen nieuwe start of vlamtest uit. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        64
      ],
      [
        "E01.11",
        "Het ventilatortoerental ligt buiten het normale werkingsbereik.",
        "Lees de volledige zichtbare code. Geef de code en eventuele reeds opgemerkte ongewone geluiden door; raak ventilator of rookgasdelen niet aan. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        64
      ],
      [
        "E01.12",
        "De gemeten retourtemperatuur is hoger dan de gemeten aanvoertemperatuur. De remediekolom noemt verwisselde aanvoer/retour als onderzoeksrichting, niet als al bewezen oorzaak.",
        "Lees de volledige zichtbare code. Noteer de code en wanneer de verwarming uitviel; verwissel zelf geen aansluitingen en verander geen circulatie. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        64
      ],
      [
        "E01.24",
        "Binnen 24 uur zijn meerdere verbrandingsfouten geregistreerd. De oplossingskolom behandelt een lage ionisatiestroom.",
        "Lees de volledige zichtbare code. Meld de code en de ongeveer waargenomen begin- en herhalingsmomenten; probeer de storing niet door herstarten te reproduceren. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        64
      ],
      [
        "E02.13",
        "Een ingang van de besturingsautomaat wordt door een externe toestand geblokkeerd.",
        "Lees de volledige zichtbare code. Geef de code en bekende recente veranderingen aan externe regeling door; wijzig die regeling of aansluiting niet zelf. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E02.15",
        "De bron meldt een time-out voor/met de externe CSU; daarmee is niet vastgesteld dat de CSU zelf de melding uitzendt. De rij noemt geen minimale duur of andere numerieke grens.",
        "Lees de volledige zichtbare code. Noteer de volledige code en tijdstip; geef bekende onderhoudscontext door zonder een tijdsgrens of defecte CSU te veronderstellen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E02.17",
        "De gasklepregeling heeft de toegestane terugmeldingstijd overschreden.",
        "Lees de volledige zichtbare code. Leg de zichtbare code vast en meld de uitval; voer geen reset, voedingstest of gascontrole uit. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E02.35",
        "Een kritisch veiligheidsapparaat is losgekoppeld.",
        "Lees de volledige zichtbare code. Geef de code en bekende voorafgaande werkzaamheden door; blijf uit de behuizing en laat het veiligheidsapparaat beoordelen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E02.47",
        "De verbinding met een functiegroep is niet gelukt.",
        "Lees de volledige zichtbare code. Meld de code en welke gewone installatie-/zonefunctie niet meer beschikbaar lijkt; wijzig geen functiegroep of printconfiguratie. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E04.00",
        "Veiligheidsparameters van niveau 5 ontbreken of zijn onjuist.",
        "Lees de volledige zichtbare code. Geef de code en bestaande toestel-/onderhoudsdocumentatie aan de installateur; verander geen veiligheidsinstellingen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E04.01",
        "De aanvoertemperatuursensor is kortgesloten of geeft een waarde boven het meetbereik.",
        "Lees de volledige zichtbare code. Noteer de code en opgemerkte verwarmingsuitval; onderzoek of meet de sensor niet. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E04.02",
        "De aanvoertemperatuursensor is weggenomen of geeft een waarde onder het meetbereik; de bron behandelt een open sensorcircuit.",
        "Lees de volledige zichtbare code. Bewaar de zichtbare melding en meld het beginmoment; geen sensoraansluiting losnemen of herstellen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E04.03",
        "Een gemeten temperatuur is boven de veiligheidslimiet gekomen. De bronbeschrijving benoemt hier niet expliciet welk meetpunt.",
        "Lees de volledige zichtbare code. Geef de code en merkbare uitval door; maak geen temperatuur-, druk- of circulatie-ingreep. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E04.07",
        "Er is een afwijking tussen aanvoersensor 1 en aanvoersensor 2 vastgesteld. Dit gaat niet om aanvoer tegenover retour.",
        "Lees de volledige zichtbare code. Meld de exacte code en tijdstip; verplaats of vergelijk zelf geen sensoren. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        65
      ],
      [
        "E04.10",
        "Er zijn vijf mislukte branderstarts gedetecteerd. De bron splitst professionele diagnose op in geen vonk, wel vonk zonder vlam, en wel vlam met geen of te weinig ionisatie.",
        "Lees de volledige zichtbare code. Meld de code en of de gewone warmteaanvraag niet meer werd beantwoord; probeer geen extra start en zoek niet naar vonk of vlam. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        66
      ],
      [
        "E04.12",
        "Voor de branderstart is een vals vlamsignaal vastgesteld. Dat bewijst niet dat de klant een werkelijke vlam kan of moet zien.",
        "Lees de volledige zichtbare code. Geef de code en tijdstip door; geen verbrandingstest of inspectie van de brander uitvoeren. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        66
      ],
      [
        "E04.13",
        "Het ventilatortoerental valt buiten het normale werkingsbereik.",
        "Lees de volledige zichtbare code. Meld code en reeds opgemerkte geluiden of uitval; raak geen ventilator of rookgasdelen aan. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        66
      ],
      [
        "E04.17",
        "De aansturing van de gasklep is defect volgens de gemelde toestand. De code alleen bewijst niet welk fysiek onderdeel vervangen moet worden.",
        "Lees de volledige zichtbare code. Bewaar de melding en meld uitval; geen gas- of elektrische handeling uitvoeren. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        66
      ],
      [
        "E04.23",
        "De gasklepregeling heeft intern vergrendeld.",
        "Lees de volledige zichtbare code. Geef de code en begin-/herhalingsmomenten door; laat de interne vergrendeling door de installateur beoordelen. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen.",
        66
      ]
    ]
  }
];

export const quintaAceCatalogs = Object.freeze(definitions.map(({rows,sourceClass,table,...catalog}) => Object.freeze({
  ...catalog,
  codes: Object.freeze(rows.map(([code,meaning,userAction,page]) => Object.freeze({
    code,meaning,userAction,sourceClass,sourcePage:`tabel ${table}, p. ${page}`,
    searchTerms:buildFaultCodeAliases(code).join(" "),
  }))),
})));
