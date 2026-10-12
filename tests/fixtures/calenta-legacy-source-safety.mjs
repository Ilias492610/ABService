// Source-reviewed Task62 expectations and genuine accepted f24 preservation.
export const calentaFacts = {
  "ids": [
    "remeha-calenta-legacy",
    "remeha-calenta-legacy-blocking"
  ],
  "url": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta/150708%20IM%20SM%20Calenta%2015s%2025s%2028c%2035s%2040c%20NL.pdf",
  "snapshotId": "remeha-calenta-legacy-pdf",
  "sha256": "56d0dd28673e87f02263fa9886b2f3f1a556b36a58ec1819e5cca73fe2ec332d",
  "bytes": 5989822,
  "pages": 108,
  "scopeE": "Historische Belgische Calenta 15s/25s/28c/35s/40c: alle 23 E-codes uit §11.1 van installatie- en servicehandleiding 117061-08, met gedrukte voettekst 080715 - 117061-08. Een E-code is een vergrendeling, niet de St:9/Su-blokkeringsstatus. De controle- en oplossingstabel is voor de installateur; dit is geen gebruikersherstelprocedure. SCU- en WTW-meldingen gelden alleen bij de betrokken configuratie. Niet voor Calenta Ace, Ace-Matic of andere revisies; artikelnummers, firmware, huidige toestelcompatibiliteit en nieuwste editie zijn niet vastgesteld.",
  "scopeSu": "Historische Belgische Calenta 15s/25s/28c/35s/40c: alle 19 Su-subcodes uit §11.2.2 van installatie- en servicehandleiding 117061-08. Su is de substatus bij tijdelijke blokkering St:9, niet een E-vergrendeling; na het verdwijnen van de oorzaak hervat het toestel volgens deze bron zelf. Su:16–20 worden niet in het storingsgeheugen opgeslagen. Su:20 kort na inschakelen vraagt geen actie. De professionele tabel is geen gebruikersherstelprocedure. Niet voor Calenta Ace, Ace-Matic of andere revisies; nieuwste editie en uw exacte toestelcompatibiliteit zijn niet vastgesteld.",
  "eAction": "Noteer de volledige E-code, het exacte model en een zonder openen veilig bereikbaar artikel- of serienummer. De controle- en oplossingstabel is voor de installateur; laat een blijvende of terugkerende melding professioneel beoordelen. Open geen gesloten onderdelen, wijzig geen instellingen en gebruik deze servicetabel niet als reset- of herstelprocedure.",
  "suAction": "Noteer de volledige St-status, Su-subcode en het exacte model. Dit is een tijdelijke blokkering; de bron beschrijft hervatten nadat de oorzaak verdwijnt, geen gebruikersherstelprocedure. Laat een blijvende of terugkerende melding professioneel beoordelen. Open geen gesloten onderdelen en wijzig geen instellingen.",
  "memoryNote": "Deze blokkering wordt volgens de handleiding niet in het storingsgeheugen opgeslagen.",
  "normalAction": "Verschijnt Su:20 kort na inschakelen, dan loopt de configuratieprocedure: volgens deze bron is geen actie nodig. Dit is op zichzelf geen defect; wijzig geen instellingen. Laat alleen een aanhoudende of onverwachte melding professioneel beoordelen. Deze blokkering wordt volgens de handleiding niet in het storingsgeheugen opgeslagen.",
  "optionalNote": "Deze melding geldt alleen bij aanwezigheid van de betrokken uitbreiding of component.",
  "scuNote": "Deze melding kan ook optreden als een verwachte SCU-print ontbreekt. De code bewijst niet dat de uitbreiding aanwezig is.",
  "warning": "Kies uw toestelreeks en generatie: Avanta gebruikt 17 korte meldingen uit de Belgische Storingswijzer, gelezen op 12 oktober 2026. De tweede archiefpagina herhaalt deze lijst; exact model, generatie en revisie zijn niet vastgesteld en het overzicht geeft geen herstelhandelingen. Controleer de volledige displaycode en het veilig bereikbare typeplaatje zonder onderdelen te openen; historische Calenta 15s/25s/28c/35s/40c volgt installatie- en servicehandleiding 117061-08: E is een vergrendeling, Su hoort bij tijdelijke blokkering St:9. De professionele herstelkolommen zijn geen gebruikersinstructies; Su:20 kort na inschakelen vraagt geen actie. Calenta Ace-Matic 25s/35s/30c/40c volgt revisie 7871265-05-04072025. Calenta Ace-Matic 25L heeft eigen tabellen uit de afzonderlijke handleiding 7871254-04-04072025. Kies hieronder het juiste model en de component CU-GH-21 of SCB-10; SCB-10-tabellen gelden alleen als de uitbreiding en betrokken componenten aanwezig zijn. De betekenis hangt af van model, generatie en configuratie. Calenta Ace, Tzerra, Quinta en andere revisies vallen niet onder deze dekking.",
  "meaningChanges": {
    "E:12": "De warmtewisselaartemperatuur ligt boven het normale bereik (maximaalthermostaat STB).",
    "Su:1": "De maximale aanvoertemperatuur is overschreden.",
    "Su:18": "De omschrijving noemt een configuratiefout of een niet-herkende PSU-print. Dezelfde bron noemt PCU in de oorzaak- en oplossingkolom; daarmee is geen eenduidige printdiagnose vastgesteld."
  },
  "ePages": [
    [
      "E:00",
      79
    ],
    [
      "E:01",
      79
    ],
    [
      "E:02",
      79
    ],
    [
      "E:03",
      79
    ],
    [
      "E:04",
      80
    ],
    [
      "E:05",
      80
    ],
    [
      "E:06",
      80
    ],
    [
      "E:07",
      80
    ],
    [
      "E:08",
      80
    ],
    [
      "E:09",
      80
    ],
    [
      "E:10",
      80
    ],
    [
      "E:11",
      80
    ],
    [
      "E:12",
      80
    ],
    [
      "E:14",
      81
    ],
    [
      "E:16",
      81
    ],
    [
      "E:17",
      81
    ],
    [
      "E:34",
      81
    ],
    [
      "E:35",
      81
    ],
    [
      "E:36",
      81
    ],
    [
      "E:37",
      81
    ],
    [
      "E:38",
      82
    ],
    [
      "E:39",
      82
    ],
    [
      "E:40",
      82
    ]
  ],
  "suPages": [
    [
      "Su:0",
      83
    ],
    [
      "Su:1",
      83
    ],
    [
      "Su:2",
      83
    ],
    [
      "Su:7",
      83
    ],
    [
      "Su:8",
      83
    ],
    [
      "Su:9",
      83
    ],
    [
      "Su:10",
      83
    ],
    [
      "Su:11",
      83
    ],
    [
      "Su:13",
      83
    ],
    [
      "Su:14",
      83
    ],
    [
      "Su:15",
      83
    ],
    [
      "Su:16",
      83
    ],
    [
      "Su:17",
      83
    ],
    [
      "Su:18",
      84
    ],
    [
      "Su:19",
      84
    ],
    [
      "Su:20",
      84
    ],
    [
      "Su:21",
      84
    ],
    [
      "Su:22",
      84
    ],
    [
      "Su:25",
      84
    ]
  ],
  "memoryCodes": [
    "Su:16",
    "Su:17",
    "Su:18",
    "Su:19",
    "Su:20"
  ],
  "optionalCodes": [
    "E:40",
    "Su:15"
  ],
  "scuCodes": ["E:38", "Su:13"],
  "before": {
    "catalogs": [
      {
        "id": "remeha-calenta-legacy",
        "title": "Calenta 15s/25s/28c/35s/40c — E-storingscodes",
        "scope": "Alle 23 afzonderlijke E-codes uit §11.1 van de Belgische Calenta-handleiding, revisie 080715–117061-08. Niet voor Calenta Ace of Ace-Matic. Dit is een historische modelrevisie; de Su-blokkeringssubcodes staan in een aparte tabel hieronder.",
        "sourceLabel": "Remeha Calenta België — installatie- en servicehandleiding 117061-08",
        "sourceUrl": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta/150708%20IM%20SM%20Calenta%2015s%2025s%2028c%2035s%2040c%20NL.pdf",
        "sourcePages": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
        "codes": [
          {
            "code": "E:00",
            "meaning": "De regeling vindt de parameteropslagmodule PSU niet.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:00"
          },
          {
            "code": "E:01",
            "meaning": "De veiligheidsparameters zijn niet geldig.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:01"
          },
          {
            "code": "E:02",
            "meaning": "De ketel meldt kortsluiting in de aanvoertemperatuursensor.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:02"
          },
          {
            "code": "E:03",
            "meaning": "Het circuit van de aanvoertemperatuursensor is onderbroken.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:03"
          },
          {
            "code": "E:04",
            "meaning": "De gemeten warmtewisselaartemperatuur ligt te laag.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:04"
          },
          {
            "code": "E:05",
            "meaning": "De gemeten warmtewisselaartemperatuur ligt te hoog.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:05"
          },
          {
            "code": "E:06",
            "meaning": "De ketel meldt kortsluiting in de retourtemperatuursensor.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:06"
          },
          {
            "code": "E:07",
            "meaning": "Het circuit van de retourtemperatuursensor is onderbroken.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:07"
          },
          {
            "code": "E:08",
            "meaning": "De gemeten retourtemperatuur ligt te laag.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:08"
          },
          {
            "code": "E:09",
            "meaning": "De gemeten retourtemperatuur ligt te hoog.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:09"
          },
          {
            "code": "E:10",
            "meaning": "Aanvoer en retour vertonen een te groot temperatuurverschil.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:10"
          },
          {
            "code": "E:11",
            "meaning": "Aanvoer en retour vertonen een te groot temperatuurverschil.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:11"
          },
          {
            "code": "E:12",
            "meaning": "De warmtewisselaar heeft de beveiligde temperatuurgrens overschreden.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:12"
          },
          {
            "code": "E:14",
            "meaning": "De brander kon bij vijf opeenvolgende pogingen niet starten.",
            "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:14"
          },
          {
            "code": "E:16",
            "meaning": "De regeling ontvangt een vlamsignaal terwijl dat niet verwacht wordt.",
            "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:16"
          },
          {
            "code": "E:17",
            "meaning": "De SU-print meldt een storing bij de gasklep.",
            "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:17"
          },
          {
            "code": "E:34",
            "meaning": "De ketel meldt een storing bij de ventilator.",
            "userAction": "Schakel het toestel uit en laat rookgasafvoer, luchttoevoer en verbrandingsonderdelen professioneel controleren. Gebruik het toestel niet verder bij rookgasgeur, een CO-melding of zichtbare roetvorming.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:34"
          },
          {
            "code": "E:35",
            "meaning": "De ketel meldt een verwisseling van aanvoer en retour.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:35"
          },
          {
            "code": "E:36",
            "meaning": "De vlam is vijfmaal weggevallen.",
            "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:36"
          },
          {
            "code": "E:37",
            "meaning": "De communicatieverbinding met de SU-print werkt niet correct.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:37"
          },
          {
            "code": "E:38",
            "meaning": "De communicatieverbinding met de SCU-print werkt niet correct.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:38"
          },
          {
            "code": "E:39",
            "meaning": "De externe blokkeeringang heeft een vergrendeling veroorzaakt.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:39"
          },
          {
            "code": "E:40",
            "meaning": "De controle van de aangesloten warmteterugwinunit is mislukt.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
            "searchTerms": "E:40"
          }
        ]
      },
      {
        "id": "remeha-calenta-legacy-blocking",
        "title": "Calenta 15s/25s/28c/35s/40c — Su-blokkeringssubcodes",
        "scope": "Alle 19 Su-blokkeringssubcodes uit §11.2.2 van dezelfde Belgische handleiding 117061-08. Su is een subcode bij de blokkeringsstatus, niet dezelfde melding als een E-vergrendeling. Niet voor Calenta Ace of Ace-Matic; Su:20 kan kort bij het inschakelen verschijnen zonder defect.",
        "sourceLabel": "Remeha Calenta België — installatie- en servicehandleiding 117061-08",
        "sourceUrl": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta/150708%20IM%20SM%20Calenta%2015s%2025s%2028c%2035s%2040c%20NL.pdf",
        "sourcePages": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
        "codes": [
          {
            "code": "Su:0",
            "meaning": "De regeling meldt een onjuiste parameter.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:0"
          },
          {
            "code": "Su:1",
            "meaning": "De aanvoertemperatuur heeft de ingestelde bovengrens overschreden.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:1"
          },
          {
            "code": "Su:2",
            "meaning": "De aanvoertemperatuur loopt sneller op dan toegestaan.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:2"
          },
          {
            "code": "Su:7",
            "meaning": "Aanvoer en retour vertonen een te groot temperatuurverschil.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:7"
          },
          {
            "code": "Su:8",
            "meaning": "Het toestel ontvangt geen vrijgavesignaal.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:8"
          },
          {
            "code": "Su:9",
            "meaning": "De ketel meldt een verwisseling van fase en nul in de netvoeding.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:9"
          },
          {
            "code": "Su:10",
            "meaning": "Een externe ingang blokkeert de werking.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:10"
          },
          {
            "code": "Su:11",
            "meaning": "De blokkeeringang of vorstbeveiliging onderbreekt de werking.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:11"
          },
          {
            "code": "Su:13",
            "meaning": "De communicatie met de SCU-print werkt niet correct.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:13"
          },
          {
            "code": "Su:14",
            "meaning": "De gemeten waterdruk ligt onder de vereiste grens.",
            "userAction": "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:14"
          },
          {
            "code": "Su:15",
            "meaning": "De ketel meldt onvoldoende gasdruk.",
            "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:15"
          },
          {
            "code": "Su:16",
            "meaning": "De configuratie is niet correct of de SU-print wordt niet herkend.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:16"
          },
          {
            "code": "Su:17",
            "meaning": "De configuratie of de standaardtabel met parameters is niet geldig.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:17"
          },
          {
            "code": "Su:18",
            "meaning": "De configuratie is niet correct of de PSU-print wordt niet herkend.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:18"
          },
          {
            "code": "Su:19",
            "meaning": "De configuratie of de dF/dU-toestelparameters zijn niet bekend.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:19"
          },
          {
            "code": "Su:20",
            "meaning": "De configuratieprocedure loopt; dit kan kort na het inschakelen een normale status zijn.",
            "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:20"
          },
          {
            "code": "Su:21",
            "meaning": "De communicatie met de SU-print werkt niet correct.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:21"
          },
          {
            "code": "Su:22",
            "meaning": "De vlam is tijdens de werking weggevallen.",
            "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:22"
          },
          {
            "code": "Su:25",
            "meaning": "De SU-print meldt een interne fout.",
            "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
            "sourcePage": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
            "searchTerms": "Su:25"
          }
        ]
      }
    ],
    "warning": "Kies uw toestelreeks en generatie: Avanta gebruikt 17 korte meldingen uit de Belgische Storingswijzer, gelezen op 12 oktober 2026. De tweede archiefpagina herhaalt deze lijst; exact model, generatie en revisie zijn niet vastgesteld en het overzicht geeft geen herstelhandelingen. Controleer de volledige displaycode en het veilig bereikbare typeplaatje zonder onderdelen te openen; legacy Calenta 15s/25s/28c/35s/40c volgt de E- en Su-tabellen van handleiding 117061-08. Calenta Ace-Matic 25s/35s/30c/40c volgt revisie 7871265-05-04072025. Calenta Ace-Matic 25L heeft eigen tabellen uit de afzonderlijke handleiding 7871254-04-04072025. Kies hieronder het juiste model en de component CU-GH-21 of SCB-10; SCB-10-tabellen gelden alleen als de uitbreiding en betrokken componenten aanwezig zijn. De betekenis hangt af van model, generatie en configuratie. Calenta Ace, Tzerra, Quinta en andere revisies vallen niet onder deze dekking.",
    "entries": [
      {
        "id": "remeha-calenta-legacy",
        "usedBy": [
          "remeha"
        ],
        "title": "Calenta 15s/25s/28c/35s/40c — E-storingscodes",
        "modelScope": "Alle 23 afzonderlijke E-codes uit §11.1 van de Belgische Calenta-handleiding, revisie 080715–117061-08. Niet voor Calenta Ace of Ace-Matic. Dit is een historische modelrevisie; de Su-blokkeringssubcodes staan in een aparte tabel hieronder.",
        "sourceLabel": "Remeha Calenta België — installatie- en servicehandleiding 117061-08",
        "sourceURL": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta/150708%20IM%20SM%20Calenta%2015s%2025s%2028c%2035s%2040c%20NL.pdf",
        "sourcePages": "§11.1, gedrukte p. 79–82 (PDF-pagina 80–83)",
        "explanationRowCount": 23,
        "modelFamily": "Calenta (legacy)",
        "models": [
          "Calenta 15s",
          "Calenta 25s",
          "Calenta 28c",
          "Calenta 35s",
          "Calenta 40c"
        ],
        "articleNumbers": null,
        "documentNumber": "117061-08",
        "revision": "080715–117061-08",
        "issueDate": null,
        "market": [
          "België"
        ],
        "language": null,
        "component": null,
        "tableIds": null,
        "primarySnapshot": null,
        "sourceEvidencePath": [
          "docs/seo/evidence-register.md"
        ],
        "verificationBasis": "Current explicit declared scope/title plus historical source-reading record; no retained original legacy PDF existence/hash verified in this bounded Task47.",
        "declaredScopePath": "content/additional-fault-catalogs.mjs",
        "fieldBoundary": "Structured fields are explicit current declarations or cited prior source observations; null means not established in this bounded manifest, not absence or failure. No newest-revision/universal/device-specific fit claim."
      },
      {
        "id": "remeha-calenta-legacy-blocking",
        "usedBy": [
          "remeha"
        ],
        "title": "Calenta 15s/25s/28c/35s/40c — Su-blokkeringssubcodes",
        "modelScope": "Alle 19 Su-blokkeringssubcodes uit §11.2.2 van dezelfde Belgische handleiding 117061-08. Su is een subcode bij de blokkeringsstatus, niet dezelfde melding als een E-vergrendeling. Niet voor Calenta Ace of Ace-Matic; Su:20 kan kort bij het inschakelen verschijnen zonder defect.",
        "sourceLabel": "Remeha Calenta België — installatie- en servicehandleiding 117061-08",
        "sourceURL": "https://remehatools.be/wp-content/uploads/documents/archive/REMEHA/Gas/Calenta/150708%20IM%20SM%20Calenta%2015s%2025s%2028c%2035s%2040c%20NL.pdf",
        "sourcePages": "§11.2.2, gedrukte p. 83–84 (PDF-pagina 84–85)",
        "explanationRowCount": 19,
        "modelFamily": "Calenta (legacy)",
        "models": [
          "Calenta 15s",
          "Calenta 25s",
          "Calenta 28c",
          "Calenta 35s",
          "Calenta 40c"
        ],
        "articleNumbers": null,
        "documentNumber": "117061-08",
        "revision": "080715–117061-08",
        "issueDate": null,
        "market": [
          "België"
        ],
        "language": null,
        "component": null,
        "tableIds": null,
        "primarySnapshot": null,
        "sourceEvidencePath": [
          "docs/seo/evidence-register.md"
        ],
        "verificationBasis": "Same explicitly linked legacy document/current scope and historical source record; actual legacy footer/date not independently reread here. Su subcodes remain separate from E faults.",
        "declaredScopePath": "content/additional-fault-catalogs.mjs",
        "fieldBoundary": "Structured fields are explicit current declarations or cited prior source observations; null means not established in this bounded manifest, not absence or failure. No newest-revision/universal/device-specific fit claim."
      }
    ],
    "preservation": {
      "allGuides": "93e71fc717870ca84791187f1ac6300f19d8e71c18bf1e23f5638af62c759efd",
      "allRegistry": "05ccbde33e6a65de06dcadf13472f01fd68584c33d92986fdcfb503b2b6a5c85",
      "manifest": "1a941cd05449752a88d41323ef0b272ec88c2c544e6117b960b3933c2568f8a4",
      "oldSnapshots": "fd8abb4bfcf9c0f7f61a20d5318ee805e912af92c7aad87abe96810161d7fd26",
      "remeha": {
        "guide": "35ce5d319ab683f408543b81df434b595ec345b70a52eb0712107affbc9a2817",
        "codes": "71b471dcb0d3ac56ae6c73b9240178cddd949b8358c0c5f52851bbafd0ae44d4",
        "selected": "a2d9f2a41396d80dccbc057e9180bf695f1d92d2ba3d5ebfd2766829d624292c",
        "html": "beea8fdcd852fbb70c58fc0d12bbe0e86daa9924e39aa1653f39d83f8be2af6f",
        "metadata": "0f48c3e97518af402f87dbb72d8b3db36801196fe876527dd5fa01b8b05780bc",
        "otherElevenCatalogs": "961e7455434d9eb216a69a7c52dafdcf8ce39d9cc959d0637aa643a1351fcd56",
        "otherTwelveGuides": "111f75b7b15082b370c3879b98d7f83b97b2bf26939b37772ca599a8ec9a5687",
        "otherEntries": "1eebbc2ce1f1656370fb0706ebca97f8a98786bce3d6404f1506750a7a7cae23",
        "otherMirrors": "52607bed6fe752d4e3795ddc0b4b8ee8b83c34fa03a2f91aa3baaea646d02b5d"
      }
    }
  }
};

const f=calentaFacts;
const clone=v=>JSON.parse(JSON.stringify(v));
// Literal pages/code identities and advice are hand-derived from the source;
// unchanged leaves are genuine accepted f24 BEFORE values, not a product oracle.
export const expectedCalentaCatalogs=f.before.catalogs.map(c=>({...c,scope:c.id===f.ids[0]?f.scopeE:f.scopeSu,codes:c.codes.map(r=>{
 const printed=(c.id===f.ids[0]?f.ePages:f.suPages).find(([code])=>code===r.code)[1];
 let userAction=c.id===f.ids[0]?f.eAction:f.suAction;
 if(f.optionalCodes.includes(r.code))userAction+=' '+f.optionalNote;
 if(f.scuCodes.includes(r.code))userAction+=' '+f.scuNote;
 if(f.memoryCodes.includes(r.code))userAction+=' '+f.memoryNote;
 if(r.code==='Su:20')userAction=f.normalAction;
 return {...r,meaning:f.meaningChanges[r.code]||r.meaning,userAction,sourcePage:`${c.id===f.ids[0]?'§11.1':'§11.2.2'}, ${r.code}, gedrukte p. ${printed} (PDF-pagina ${printed+1})`};
})}));
export function beforeCalentaCatalog(c){
 if(!f.ids.includes(c.id))return c;
 const old=f.before.catalogs.find(x=>x.id===c.id);
 return {...c,scope:old.scope,codes:c.codes.map(r=>{
 const b=old.codes.find(x=>x.code===r.code);if(!b)throw Error('Unexpected historical Calenta row');
 return {...r,meaning:b.meaning,userAction:b.userAction,sourcePage:b.sourcePage};
 })};
}
export function beforeCalentaGuide(g){
 if(g.slug!=='remeha')return g;
 const r=clone(g);r.modelWarning=f.before.warning;r.catalogs=r.catalogs.map(beforeCalentaCatalog);r.codes=r.catalogs.flatMap(c=>c.codes);return r;
}
const escape=v=>v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
export function beforeCalentaHtml(html,slug){
 if(slug!=='remeha')return html;
 for(const id of f.ids){
 const marker=`<section class="fault-group" aria-labelledby="${id}-title">`;
 const start=html.indexOf(marker),end=html.indexOf('</section>',start)+10;
 if(start<0||end<start)throw Error('Missing historical Calenta group');
 const old=f.before.catalogs.find(c=>c.id===id),next=expectedCalentaCatalogs.find(c=>c.id===id);
 let group=html.slice(start,end).replace(/<article class="fault-code-card">[\s\S]*?<\/article>/g,card=>{
 const code=card.match(/<code>(.*?)<\/code>/)?.[1],b=old.codes.find(r=>r.code===code),n=next.codes.find(r=>r.code===code);
 if(!b||!n)throw Error('Unexpected historical Calenta card');
 for(const field of ['meaning','userAction','sourcePage'])card=card.replace(escape(n[field]),escape(b[field]));return card;
 });
 group=group.replace(escape(next.scope),escape(old.scope));html=html.slice(0,start)+group+html.slice(end);
 }
 return html.replace(escape(f.warning),escape(f.before.warning));
}
export function beforeCalentaManifestEntry(e){
 if(!f.ids.includes(e.id))return e;
 const before=f.before.entries.find(b=>b.id===e.id),restored={...e};
 // Undo only the declared Task62 leaves; preserve unrelated/unknown drift.
 for(const key of ['modelScope','revision','language','primarySnapshot','verificationBasis','fieldBoundary'])restored[key]=clone(before[key]);
 for(const key of ['observedFooter','audienceRestriction','literalCodes','firmwareCompatibility','currentBelgianVariantCompatibility','newestEdition'])delete restored[key];
 return restored;
}
export function beforeCalentaManifestMirror(g){return g.slug==='remeha'?{...g,modelWarning:f.before.warning}:g;}
