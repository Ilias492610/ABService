import {buildFaultCodeAliases} from "../libs/fault-code-aliases.mjs";

// Literal May2018 BE/nl CU-GH08 tables85/86/87:17A24H30E.
// Separate user book supplies general context, never a second per-row locator.
const definitions = [
  {
    "id": "remeha-calenta-ace-cu-warnings",
    "title": "Calenta Ace (2018) — CU-GH08 — waarschuwingen",
    "scope": "Alleen Calenta Ace 15ds, 25ds, 25/28, 35ds en 35/39 voor België, Nederlandstalige editie 7688047-v.01-08052018, CU-GH08 met HMI T-control. Tabel 85 bevat 17 meldingen. A is een waarschuwing: de ketel kan volgens de bron blijven werken, maar de oorzaak vraagt onderzoek en de melding kan escaleren. Het afzonderlijke gebruikersboek 7688050-v.01-08052018, § 8, p. 31–32 geeft algemene meldings-, klasse- en probleemcontext, geen overeenkomende volledige tabel van deze codes. De handleiding bespreekt SCB-printen en aangesloten apparaten; welke uitbreiding of software uw toestel gebruikt is hier niet vastgesteld. Automatische bijvulling geldt alleen als die aanwezig en daarvoor ingesteld is. Niet voor historische Calenta 117061, Ace-Matic, 25L of andere edities. Exacte product- en serienummers, de toepasbaarheid op uw eigen toestel en de nieuwste handleiding zijn niet vastgesteld. Lees de volledige zichtbare code en vergelijk uw eigen gebruikershandleiding. Technische remedies zijn voor de installateur; deze tabel geeft geen reset-, stroomonderbrekings-, vul-, ontluchtings- of instelhandeling.",
    "sourceLabel": "Remeha België — Calenta Ace installatie- en servicehandleiding 7688047-v.01-08052018",
    "sourceUrl": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta%20Ace/180508_IM_SM_Calenta_Ace_NL.pdf",
    "sourcePages": "tabel 85, p. 121–123",
    "companionSourceLabel": "Remeha België — Calenta Ace gebruikershandleiding 7688050-v.01-08052018 — algemene context, geen volledige codetabel",
    "companionSourceUrl": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta%20Ace/180508_UM_Calenta_Ace_NL.pdf",
    "table": 85,
    "sourceClass": "A",
    "rows": [
      [
        "A00.34",
        "De regeling verwacht een buitentemperatuursensor, maar detecteert die niet.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        121
      ],
      [
        "A00.42",
        "De regeling verwacht een waterdruksensor, maar detecteert die niet. Dit zegt niets over een gemeten drukwaarde.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        121
      ],
      [
        "A01.23",
        "Er is slechte verbranding gemeld. De advieskolom behandelt vlamwegval tijdens bedrijf en ontbrekende ionisatiestroom; de code bewijst geen afzonderlijk defect onderdeel.",
        "Lees de volledige zichtbare code. Bij gasgeur, rookgasgeur of een CO-alarm: volg eerst de veiligheidsmelding boven de codezoeker en blijf uit de gevarenzone. Geef zonder zulke signalen de code en reeds opgemerkte uitval door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Zoek niet naar vonk of vlam en voer geen gascontrole, reset of stroomonderbreking uit.",
        122
      ],
      [
        "A02.06",
        "De waterdruk ligt volgens de waarschuwing onder de minimale waterdruk. Deze rij geeft geen numerieke drukgrens.",
        "Lees de volledige zichtbare code. Noteer alleen een reeds veilig zichtbare drukwaarde en bekende verwarmingsklachten. Laat een aanhoudende of terugkerende melding, drukverlies of lekkage door een bevoegde installateur beoordelen. Vul niet bij, ontlucht niet en activeer geen vulprogramma op basis van deze tabel.",
        122
      ],
      [
        "A02.18",
        "Er is een fout in de Object Dictionary gemeld; de bron behandelt dit als een configuratiefout.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        122
      ],
      [
        "A02.33",
        "Automatisch bijvullen duurt te lang en wordt gestopt. De bron noemt verschillende mogelijke oorzaken, geen vastgestelde lekkage. Het gebruikersboek bespreekt deze melding alleen als automatische bijvulling aanwezig en daarvoor ingesteld is.",
        "Lees de volledige zichtbare code. Noteer alleen een reeds veilig zichtbare drukwaarde en bekende verwarmingsklachten. Laat een aanhoudende of terugkerende melding, drukverlies of lekkage door een bevoegde installateur beoordelen. Vul niet bij, ontlucht niet en activeer geen vulprogramma op basis van deze tabel.",
        122
      ],
      [
        "A02.34",
        "Automatisch vullen start niet omdat de tijd sinds de vorige vulpoging te kort is. De bron noemt onder meer lekkage of een vorige vulling die net boven het minimum eindigde; geen van deze oorzaken staat daarmee vast.",
        "Lees de volledige zichtbare code. Noteer alleen een reeds veilig zichtbare drukwaarde en bekende verwarmingsklachten. Laat een aanhoudende of terugkerende melding, drukverlies of lekkage door een bevoegde installateur beoordelen. Vul niet bij, ontlucht niet en activeer geen vulprogramma op basis van deze tabel.",
        122
      ],
      [
        "A02.36",
        "De communicatie met een functioneel component is weggevallen; de advieskolom behandelt een niet gevonden SCB-print. De beschrijving noemt dit een blokkering, maar de rij staat in de A-waarschuwingstabel.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        122
      ],
      [
        "A02.37",
        "De communicatie met een niet-kritisch component is weggevallen. De advieskolom behandelt een niet gevonden SCB-print; de aanwezige print is hiermee niet vastgesteld.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        122
      ],
      [
        "A02.45",
        "De CAN-verbindingsmatrix is vol. De advieskolom behandelt daarnaast een niet gevonden SCB-print.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        122
      ],
      [
        "A02.46",
        "De CAN-administratie in het toestel is vol. De advieskolom behandelt daarnaast een niet gevonden SCB-print.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        122
      ],
      [
        "A02.48",
        "De configuratie van een functiegroep is mislukt. De advieskolom behandelt een niet gevonden SCB-print.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        122
      ],
      [
        "A02.49",
        "De initialisatie is mislukt. De advieskolom behandelt een niet gevonden SCB-print.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        122
      ],
      [
        "A02.55",
        "Het toestel heeft een ongeldig of ontbrekend serienummer volgens de melding. De bron verwijst naar de leverancier.",
        "Lees de volledige zichtbare code. Geef de melding en veilig reeds beschikbare modelgegevens aan uw leverancier door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en verander geen instellingen; voer geen reset of stroomonderbreking uit.",
        123
      ],
      [
        "A02.69",
        "De demomodus is actief. Dat is een genoemde bedrijfsmodus, geen bewezen defect; de bron verwijst naar de leverancier.",
        "Lees de volledige zichtbare code. Geef de melding en veilig reeds beschikbare modelgegevens aan uw leverancier door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en verander geen instellingen; voer geen reset of stroomonderbreking uit.",
        123
      ],
      [
        "A02.76",
        "De gereserveerde geheugenruimte voor aangepaste parameters is vol; verdere veranderingen zijn niet mogelijk. Dit gaat niet over het geheugen voor de laatste 32 storingen of een vastgesteld RAM-defect.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        123
      ],
      [
        "A08.02",
        "De voor het douchen gereserveerde tijd is verstreken. De bron noemt een kortere douche of een professionele parameterwijziging; de rij bewijst geen defect.",
        "Lees de volledige zichtbare code. Noteer of de melding tijdens het douchen verscheen en geef de bekende gebruikscontext door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Wijzig geen doucheprogramma of parameter en voer geen reset of stroomonderbreking uit.",
        123
      ]
    ]
  },
  {
    "id": "remeha-calenta-ace-cu-blocking",
    "title": "Calenta Ace (2018) — CU-GH08 — blokkeringen",
    "scope": "Alleen Calenta Ace 15ds, 25ds, 25/28, 35ds en 35/39 voor België, Nederlandstalige editie 7688047-v.01-08052018, CU-GH08 met HMI T-control. Tabel 86 bevat 24 meldingen. H is een blokkering: hervatting volgt volgens de bron pas als de oorzaak is verdwenen. H02.00 is een actieve reset en H03.17 een lopende controle; er is geen vaste wachttijd beloofd. Het afzonderlijke gebruikersboek 7688050-v.01-08052018, § 8, p. 31–32 geeft algemene meldings-, klasse- en probleemcontext, geen overeenkomende volledige tabel van deze codes. De handleiding bespreekt SCB-printen en aangesloten apparaten; welke uitbreiding of software uw toestel gebruikt is hier niet vastgesteld. Automatische bijvulling geldt alleen als die aanwezig en daarvoor ingesteld is. Niet voor historische Calenta 117061, Ace-Matic, 25L of andere edities. Exacte product- en serienummers, de toepasbaarheid op uw eigen toestel en de nieuwste handleiding zijn niet vastgesteld. Lees de volledige zichtbare code en vergelijk uw eigen gebruikershandleiding. Technische remedies zijn voor de installateur; deze tabel geeft geen reset-, stroomonderbrekings-, vul-, ontluchtings- of instelhandeling.",
    "sourceLabel": "Remeha België — Calenta Ace installatie- en servicehandleiding 7688047-v.01-08052018",
    "sourceUrl": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta%20Ace/180508_IM_SM_Calenta_Ace_NL.pdf",
    "sourcePages": "tabel 86, p. 123–125",
    "companionSourceLabel": "Remeha België — Calenta Ace gebruikershandleiding 7688050-v.01-08052018 — algemene context, geen volledige codetabel",
    "companionSourceUrl": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta%20Ace/180508_UM_Calenta_Ace_NL.pdf",
    "table": 86,
    "sourceClass": "H",
    "rows": [
      [
        "H00.81",
        "De regeling verwacht een ruimtetemperatuursensor, maar detecteert die niet.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        123
      ],
      [
        "H01.00",
        "Er is een communicatiefout opgetreden; de advieskolom noemt communicatie met de veiligheidskern en een professionele herstart. Deze rij belooft geen automatisch herstel en noemt geen vervanging van de besturing.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        123
      ],
      [
        "H01.05",
        "Het maximale verschil tussen aanvoer- en retourtemperatuur is overschreden. De bron noemt doorstroming en sensoren als professionele onderzoekspunten, geen vastgestelde oorzaak.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        123
      ],
      [
        "H01.08",
        "De advieskolom meldt een overschrijding van de maximale stijging van de warmtewisselaartemperatuur bij de korte omschrijving Delta T Max 3. Deze rij noemt geen tijds- of stijgsnelheidseenheid.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        123
      ],
      [
        "H01.09",
        "De melding betreft de gasdrukschakelaar; de advieskolom behandelt te lage gasdruk en de afstelling van die schakelaar. Daarmee is geen afzonderlijke oorzaak bewezen.",
        "Lees de volledige zichtbare code. Bij gasgeur, rookgasgeur of een CO-alarm: volg eerst de veiligheidsmelding boven de codezoeker en blijf uit de gevarenzone. Geef zonder zulke signalen de code en reeds opgemerkte uitval door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Zoek niet naar vonk of vlam en voer geen gascontrole, reset of stroomonderbreking uit.",
        123
      ],
      [
        "H01.14",
        "De aanvoertemperatuur heeft de maximale bedrijfswaarde overschreden.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        124
      ],
      [
        "H01.15",
        "De rookgastemperatuur heeft de maximale bedrijfswaarde overschreden. De advieskolom bevat alleen een streepje en geeft hier geen herstelhandeling.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        124
      ],
      [
        "H01.21",
        "De warmtewisselaartemperatuur stijgt te snel; de advieskolom spreekt over te snel gestegen aanvoertemperatuur. De korte schermtekst bewijst geen uitsluitend warmwaterprobleem.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        124
      ],
      [
        "H02.00",
        "Het toestel wordt al gereset. De bron noemt een actieve resetprocedure en geen actie; dit is geen verzoek om opnieuw te resetten.",
        "Lees de volledige zichtbare code. De resetprocedure loopt al; start geen extra reset en onderbreek de stroom niet. Noteer de melding en bekende context. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen; de procedurestatus bewijst geen verholpen oorzaak.",
        124
      ],
      [
        "H02.02",
        "Het toestel wacht op een configuratienummer; de advieskolom noemt een onbekend configuratienummer.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        124
      ],
      [
        "H02.03",
        "De ingevoerde configuratiecode bestaat niet volgens de melding en veroorzaakt een blokkering.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        124
      ],
      [
        "H02.04",
        "Een fout in de parameterlijst veroorzaakt een blokkering. De bron behandelt niet-correcte fabrieksinstellingen of parameters.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        124
      ],
      [
        "H02.05",
        "Een verkeerd aangesloten configuratieopslageenheid veroorzaakt een blokkering.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        124
      ],
      [
        "H02.09",
        "Het verbreken van de externe blokkeeringang blokkeert cv- en warmwaterbedrijf. De advieskolom noemt de blokkerende ingang of actieve vorstbeveiliging; dit is niet de volledige blokkering zonder vorstbeveiliging van H02.10.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        124
      ],
      [
        "H02.10",
        "Het toestel is geblokkeerd door het verbreken van de externe blokkeeringang. De advieskolom noemt een actieve blokkerende ingang zonder vorstbeveiliging.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        124
      ],
      [
        "H02.12",
        "Het externe vrijgavecontact voor de branderstart sluit niet. De advieskolom noemt een verlopen wachttijd voor het vrijgavesignaal, zonder numerieke duur.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        124
      ],
      [
        "H02.31",
        "Na spanningsuitval is een blokkering gemeld omdat de waterdruk lager is dan de gewenste vuldruk. De bron bespreekt vrijgave van automatisch vullen; dit is geen opdracht om zelf een vulprogramma te starten.",
        "Lees de volledige zichtbare code. Noteer alleen een reeds veilig zichtbare drukwaarde en bekende verwarmingsklachten. Laat een aanhoudende of terugkerende melding, drukverlies of lekkage door een bevoegde installateur beoordelen. Vul niet bij, ontlucht niet en activeer geen vulprogramma op basis van deze tabel.",
        124
      ],
      [
        "H02.38",
        "De bron vermeldt geen waterhardheid. De advieskolom bevat alleen een streepje; een oorzaak, hardheidswaarde of parameter is hier niet uitgewerkt.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        124
      ],
      [
        "H02.70",
        "Een test van de externe warmteterugwinunit is mislukt. De code stelt niet vast welke externe apparatuur op uw toestel aanwezig is.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        125
      ],
      [
        "H03.00",
        "De beschrijving zegt letterlijk dat veiligheidsparameters van niveau 2, 3 en 4 ‘niet fout of ontbreken’. De advieskolom behandelt een parameterfout in de veiligheidskern. De onduidelijke beschrijving blijft zichtbaar voor beoordeling door de installateur.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        125
      ],
      [
        "H03.01",
        "Een interne communicatiefout veroorzaakt een blokkering; de advieskolom noemt communicatie met de CU-GH-print.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        125
      ],
      [
        "H03.02",
        "Een te laag vlamsignaal veroorzaakt een blokkering. De advieskolom behandelt vlamwegval tijdens bedrijf en ontbrekende ionisatiestroom; de oorzaak is niet vastgesteld.",
        "Lees de volledige zichtbare code. Bij gasgeur, rookgasgeur of een CO-alarm: volg eerst de veiligheidsmelding boven de codezoeker en blijf uit de gevarenzone. Geef zonder zulke signalen de code en reeds opgemerkte uitval door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Zoek niet naar vonk of vlam en voer geen gascontrole, reset of stroomonderbreking uit.",
        125
      ],
      [
        "H03.05",
        "Een interne fout van de veiligheidsunit veroorzaakt een blokkering. De advieskolom spreekt over de veiligheidskern.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        125
      ],
      [
        "H03.17",
        "De interne veiligheidscontrole wordt uitgevoerd. De advieskolom bevat alleen een streepje; deze lopende controle bewijst geen defect en heeft hier geen duurgrens of herstartadvies.",
        "Lees de volledige zichtbare code. Noteer de lopende controle en bekende context; onderbreek de controle niet en voer geen reset of stroomonderbreking uit. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. De bron geeft geen wachttijd of herstelhandeling voor deze rij.",
        125
      ]
    ]
  },
  {
    "id": "remeha-calenta-ace-cu-locking",
    "title": "Calenta Ace (2018) — CU-GH08 — vergrendelingen",
    "scope": "Alleen Calenta Ace 15ds, 25ds, 25/28, 35ds en 35/39 voor België, Nederlandstalige editie 7688047-v.01-08052018, CU-GH08 met HMI T-control. Tabel 87 bevat 30 meldingen. E is een vergrendeling, ook waar een beschrijving het woord blokkering gebruikt. De bron beschrijft herstel na het wegnemen van de oorzaak en reset; dit is hier geen gebruikersprocedure. Het afzonderlijke gebruikersboek 7688050-v.01-08052018, § 8, p. 31–32 geeft algemene meldings-, klasse- en probleemcontext, geen overeenkomende volledige tabel van deze codes. De handleiding bespreekt SCB-printen en aangesloten apparaten; welke uitbreiding of software uw toestel gebruikt is hier niet vastgesteld. Automatische bijvulling geldt alleen als die aanwezig en daarvoor ingesteld is. Niet voor historische Calenta 117061, Ace-Matic, 25L of andere edities. Exacte product- en serienummers, de toepasbaarheid op uw eigen toestel en de nieuwste handleiding zijn niet vastgesteld. Lees de volledige zichtbare code en vergelijk uw eigen gebruikershandleiding. Technische remedies zijn voor de installateur; deze tabel geeft geen reset-, stroomonderbrekings-, vul-, ontluchtings- of instelhandeling.",
    "sourceLabel": "Remeha België — Calenta Ace installatie- en servicehandleiding 7688047-v.01-08052018",
    "sourceUrl": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta%20Ace/180508_IM_SM_Calenta_Ace_NL.pdf",
    "sourcePages": "tabel 87, p. 125–129",
    "companionSourceLabel": "Remeha België — Calenta Ace gebruikershandleiding 7688050-v.01-08052018 — algemene context, geen volledige codetabel",
    "companionSourceUrl": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta%20Ace/180508_UM_Calenta_Ace_NL.pdf",
    "table": 87,
    "sourceClass": "E",
    "rows": [
      [
        "E00.04",
        "De retourtemperatuursensor is verwijderd of meet onder zijn bereik; de advieskolom behandelt een open sensorcircuit.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        125
      ],
      [
        "E00.05",
        "De retourtemperatuursensor is kortgesloten of meet boven zijn bereik.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        125
      ],
      [
        "E00.06",
        "De regeling verwacht de retourtemperatuursensor, maar detecteert die niet. De advieskolom noemt ontbrekende verbinding.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        125
      ],
      [
        "E00.07",
        "De beschrijving noemt een te groot verschil in retourtemperatuur, terwijl de advieskolom een te groot verschil tussen aanvoer en retour behandelt. Laat de installateur beoordelen wat deze verschillende omschrijvingen bij uw toestel betekenen.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        126
      ],
      [
        "E00.16",
        "De temperatuursensor van de sanitair-warmwatertank is verwijderd of meet onder zijn bereik; de advieskolom behandelt een open boilersensor. Dit is niet de uittredesensor van E00.44.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        126
      ],
      [
        "E00.17",
        "De temperatuursensor van de sanitair-warmwatertank is kortgesloten of meet boven zijn bereik; dit is de boilersensor, niet de uittredesensor van E00.45.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        126
      ],
      [
        "E00.44",
        "De uittredetemperatuursensor voor sanitair warm water ontbreekt of meet onder zijn bereik; de advieskolom behandelt een open SWW-sensor.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        126
      ],
      [
        "E00.45",
        "De uittredetemperatuursensor voor sanitair warm water is kortgesloten of meet boven zijn bereik.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        126
      ],
      [
        "E01.04",
        "Er is onbedoeld vlamverlies opgetreden; de schermtekst en advieskolom noemen vijf keer vlamverlies. Dit is niet de vijf mislukte branderstarts van E04.10.",
        "Lees de volledige zichtbare code. Bij gasgeur, rookgasgeur of een CO-alarm: volg eerst de veiligheidsmelding boven de codezoeker en blijf uit de gevarenzone. Geef zonder zulke signalen de code en reeds opgemerkte uitval door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Zoek niet naar vonk of vlam en voer geen gascontrole, reset of stroomonderbreking uit.",
        126
      ],
      [
        "E01.11",
        "Het ventilatortoerental heeft het normale werkbereik overschreden. De code bewijst niet welke oorzaak uit de professionele onderzoekskolom van toepassing is.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        126
      ],
      [
        "E01.12",
        "De retourtemperatuur is hoger dan de aanvoertemperatuur. De advieskolom behandelt verwisselde aanvoer en retour en meerdere onderzoekspunten; de code bewijst geen bepaalde verkeerde aansluiting.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        126
      ],
      [
        "E01.24",
        "De beschrijving noemt meerdere verbrandingsfouten ‘met 24 uur’, terwijl de advieskolom te veel geresette fouten behandelt. De schermtekst over een branderverschil verklaart dit niet eenduidig; deze verschillen bewijzen geen specifieke oorzaak.",
        "Lees de volledige zichtbare code. Bij gasgeur, rookgasgeur of een CO-alarm: volg eerst de veiligheidsmelding boven de codezoeker en blijf uit de gevarenzone. Geef zonder zulke signalen de code en reeds opgemerkte uitval door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Zoek niet naar vonk of vlam en voer geen gascontrole, reset of stroomonderbreking uit.",
        126
      ],
      [
        "E02.13",
        "De besturing meldt een blokkerende ingang door een externe toestand rond het toestel. Ondanks de woorden over blokkering staat deze rij in de E-vergrendelingstabel.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        127
      ],
      [
        "E02.15",
        "De beschrijving noemt blokkering door een defecte of niet aangesloten configuratieopslageenheid; de advieskolom noemt een CSU-time-out. De rij staat in de E-vergrendelingstabel en noemt geen minimale duur of vastgestelde fout in de CU-GH08.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        127
      ],
      [
        "E02.17",
        "Er is een communicatietime-out van de veiligheidsunit. De advieskolom noemt de veiligheidskern; dit is niet de CSU-melding van E02.15.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        127
      ],
      [
        "E02.32",
        "Het automatisch vullen of bijvullen duurt te lang en veroorzaakt een vergrendeling. Dit heeft een andere klasse dan de waarschuwing A02.33; de code bewijst geen lekkage.",
        "Lees de volledige zichtbare code. Noteer alleen een reeds veilig zichtbare drukwaarde en bekende verwarmingsklachten. Laat een aanhoudende of terugkerende melding, drukverlies of lekkage door een bevoegde installateur beoordelen. Vul niet bij, ontlucht niet en activeer geen vulprogramma op basis van deze tabel.",
        127
      ],
      [
        "E02.35",
        "De communicatie met een veiligheidskritisch component is weggevallen en veroorzaakt een vergrendeling. Het betrokken component is niet nader vastgesteld.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        127
      ],
      [
        "E02.39",
        "De waterdruk stijgt onvoldoende tijdens automatisch vullen en veroorzaakt een vergrendeling. De verschillende professionele onderzoekspunten bewijzen geen lekkage of defecte druksensor.",
        "Lees de volledige zichtbare code. Noteer alleen een reeds veilig zichtbare drukwaarde en bekende verwarmingsklachten. Laat een aanhoudende of terugkerende melding, drukverlies of lekkage door een bevoegde installateur beoordelen. Vul niet bij, ontlucht niet en activeer geen vulprogramma op basis van deze tabel.",
        127
      ],
      [
        "E02.47",
        "Het koppelen van een functiegroep is mislukt; de advieskolom noemt een niet gevonden functiegroep.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        127
      ],
      [
        "E02.78",
        "De beschrijving meldt verwisselde aansluitingen van sanitair warm en koud water. De advieskolom spreekt daarentegen over cv- en SWW-leidingen; dat is een ander leidingpaar en vraagt beoordeling door de installateur.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        127
      ],
      [
        "E04.00",
        "Een fout in de veiligheidsparameters veroorzaakt een vergrendeling. De bron specificeert in deze rij geen parameterniveau.",
        "Lees de volledige zichtbare code. Geef het model en bekende installatie- of onderhoudswijzigingen door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Open geen onderdelen en wijzig geen configuratie, veiligheidscontacten of instellingen; voer geen reset of stroomonderbreking uit.",
        127
      ],
      [
        "E04.01",
        "De schermtekst zegt ‘Vergr T aanv Laag’, maar de beschrijving en advieskolom behandelen een kortgesloten aanvoertemperatuursensor of een waarde boven het meetbereik. Deze verschillende omschrijvingen blijven zichtbaar; wissel de betekenis niet met E04.02.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        127
      ],
      [
        "E04.02",
        "De schermtekst zegt ‘Vergr T aanv kortsl’, maar de beschrijving behandelt een verwijderde aanvoertemperatuursensor of een waarde beneden het bereik en het advies een open sensorcircuit. Deze verschillende omschrijvingen blijven zichtbaar; wissel de betekenis niet met E04.01.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        127
      ],
      [
        "E04.03",
        "De beschrijving meldt een aanvoertemperatuur boven de maximale veiligheidswaarde. De advieskolom begint daarentegen bij een overschreden maximale stijging van de warmtewisselaartemperatuur. Een te hoge temperatuur en een te snelle stijging zijn verschillende omschrijvingen die de installateur moet beoordelen.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        128
      ],
      [
        "E04.07",
        "Er is een te groot temperatuurverschil tussen twee aanvoertemperatuursensoren. Ondanks de korte schermtekst ‘a-r’ gaat de beschrijving niet over aanvoer tegenover retour.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        128
      ],
      [
        "E04.10",
        "Er is een vergrendeling na vijf mislukte branderstarts. De bron onderscheidt professionele onderzoeken bij geen vonk, bij vonk zonder vlam en bij vlam met geen of te weinig ionisatie; de code bewijst niet welk geval speelt.",
        "Lees de volledige zichtbare code. Bij gasgeur, rookgasgeur of een CO-alarm: volg eerst de veiligheidsmelding boven de codezoeker en blijf uit de gevarenzone. Geef zonder zulke signalen de code en reeds opgemerkte uitval door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Zoek niet naar vonk of vlam en voer geen gascontrole, reset of stroomonderbreking uit.",
        128
      ],
      [
        "E04.12",
        "Er is een vals vlamsignaal vóór de branderstart gemeld. Dit bewijst niet dat u een werkelijke vlam kunt of moet waarnemen.",
        "Lees de volledige zichtbare code. Bij gasgeur, rookgasgeur of een CO-alarm: volg eerst de veiligheidsmelding boven de codezoeker en blijf uit de gevarenzone. Geef zonder zulke signalen de code en reeds opgemerkte uitval door. Laat een aanhoudende of terugkerende melding door een bevoegde installateur beoordelen. Zoek niet naar vonk of vlam en voer geen gascontrole, reset of stroomonderbreking uit.",
        128
      ],
      [
        "E04.13",
        "Het ventilatortoerental wijkt af van het verwachte toerental en veroorzaakt een vergrendeling.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        128
      ],
      [
        "E04.17",
        "Een defect in de gasblokaansturing veroorzaakt een vergrendeling. De professionele advieskolom noemt vervanging van de besturing, geen bewezen noodzaak om het gasblok te vervangen.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        129
      ],
      [
        "E04.23",
        "Een interne fout van de veiligheidsunit veroorzaakt een vergrendeling. De professionele advieskolom noemt vervanging van de besturing; er is hier geen herstartadvies.",
        "Lees de volledige zichtbare code. Noteer het model uit veilig beschikbare documentatie en reeds opgemerkte gebruiksklachten. Laat een aanhoudende of terugkerende melding door een bevoegde installateur of leverancier beoordelen. Open geen onderdelen en voer geen reset, stroomonderbreking of technische controle uit.",
        129
      ]
    ]
  }
];

export const calentaAceCatalogs = Object.freeze(definitions.map(({rows,sourceClass,table,...catalog}) => Object.freeze({
  ...catalog,
  companionSource: Object.freeze({
    sourceLabel:catalog.companionSourceLabel,
    sourceUrl:catalog.companionSourceUrl,
    sourcePages:"§ 8, p. 31–32 — algemene klasse-, meldings- en probleemcontext; geen volledige codetabel",
  }),
  codes: Object.freeze(rows.map(([code,meaning,userAction,page]) => Object.freeze({
    code,meaning,userAction,sourceClass,sourcePage:`tabel ${table}, p. ${page}`,
    searchTerms:buildFaultCodeAliases(code).join(" "),
  }))),
})));
