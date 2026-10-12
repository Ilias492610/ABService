import { createFaultCatalog } from "./fault-catalogs.mjs";

// Historical source-local rows; never export professional remedies to consumers.
const actions = {
  "general": "Noteer de volledige code, schermtekst, het exacte model en een zonder openen veilig bereikbaar artikel- of serienummer. Deze installateurstabel is geen gebruikersherstelprocedure. Laat een blijvende of terugkerende melding professioneel beoordelen. Open de mantel niet, wijzig geen instellingen, voer geen herhaalde resets of spanningsonderbreking uit en werk niet aan gas-, rookgas- of elektrische onderdelen.",
  "pressure": "Lees alleen de zichtbare drukwaarde en noteer die met de volledige code en het exacte model. De bronwaarden zijn geen universele vuldoelen: vul niet bij en tap niet af uitsluitend op basis van deze tabel. Laat druk en oorzaak professioneel beoordelen; open geen gesloten onderdelen, forceer geen reset of spanningsonderbreking en werk niet aan pomp of sensoren.",
  "program": "Laat het automatische programma verlopen volgens de toepasselijke gebruikershandleiding van uw exacte toestel. Forceer geen reset of spanningsonderbreking om het programma te omzeilen. Deze bedrijfstoestand bewijst niet dat het toestel probleemloos werkt. Noteer bij klachten de volledige schermtekst en het model en vraag professionele hulp als de melding blijft staan of terugkeert.",
  "ordinary": "Deze melding wordt in deze handleiding als geen storing beschreven, maar bewijst niet dat het toestel probleemloos werkt. Noteer bij klachten de volledige schermtekst en het exacte model en laat een onverwachte of aanhoudende melding professioneel beoordelen. Start zelf geen servicetest of instellingenprocedure en open de mantel niet.",
  "pump": "Noteer de volledige code, schermtekst en het exacte model. De gemarkeerde pomp-ingreep in de bron is alleen voor de erkende installateur, geen gebruikershandeling. Open de mantel niet en werk niet aan pomp, zekeringen, bedrading of veiligheidscontacten. Laat de oorzaak professioneel beoordelen; voer geen herhaalde resets of spanningsonderbreking uit.",
  "resets": "Deze bron noemt te veel resets. Probeer niet opnieuw te resetten of de netspanning te onderbreken om de melding te wissen. Noteer de volledige code, schermtekst en het exacte model en laat de onderliggende oorzaak professioneel onderzoeken. Open de mantel niet en wijzig geen instellingen."
};

const definitions = [
  {
    "id": "atag-izone-2019-be",
    "title": "i Zone-Serie — zes Belgische varianten (06.19)",
    "scope": "Alle 17 veelvoorkomende meldingsrijen uit §13, p. 86 van historische handleiding 8H.51.47.00 / 06.19. De technische tabel op p. 151 noemt i24SZ, i35SZ, i20CZ, i22ECZ, i30CZ en i32ECZ met bestemming B; niet andere i Zone-generaties. Dit is geen volledige merk- of foutcodetabel. De algemene blokkering/foutbeschrijving wijst geen individuele klasse aan iedere rij toe. Combi bij 201 en Solo bij 203 blijven van belang. De ster bij 140 verwijst naar een professionele pomp-ingreep, niet een extra code. De CE-PIN is geen individueel artikelnummer. Actuele toestel- en gasvariantfit, artikelnummers, serials, firmware, controllerdekking en nieuwste editie zijn niet vastgesteld. Werkzaamheden uit deze installateurstabel zijn geen gebruikersprocedure.",
    "sourceLabel": "ATAG i Zone-Serie — installatie- en servicemanual 8H.51.47.00 / 06.19",
    "sourceUrl": "https://atag.compano.com/Data/Environments/000001/Attachment/Bijlage/ATAG%20Belgie/installatievoorschriften/8H514700%20INST%20MANUAL%20i%20Zone-SERIE%20NL-%20light.pdf",
    "sourcePages": "§13, gedrukte p. 86 (PDF-pagina 71); modelscope p. 151 (PDF-pagina 76)",
    "rows": [
      [
        "101",
        "De ketel meldt oververhitting.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 101"
      ],
      [
        "102",
        "De drukmeting meldt een druksensorfout.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 102"
      ],
      [
        "104",
        "Het gemelde debiet is onvoldoende.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 104"
      ],
      [
        "108",
        "De druk ligt volgens deze bron onder Pmin: minder dan 0,7 bar. De bron noemt bijvullen vereist; dit is geen bijvulinstructie.",
        "pressure",
        "§13, gedrukte p. 86 (PDF-pagina 71); 108"
      ],
      [
        "1P4",
        "De druk ligt volgens deze bron onder Pmin: tussen 0,7 en 1,0 bar. De bron noemt bijvullen vereist; dit is geen bijvulinstructie.",
        "pressure",
        "§13, gedrukte p. 86 (PDF-pagina 71); 1P4"
      ],
      [
        "109",
        "De druk ligt volgens deze bron boven Pmax; de rij noemt geen numerieke bovengrens.",
        "pressure",
        "§13, gedrukte p. 86 (PDF-pagina 71); 109"
      ],
      [
        "110",
        "De aanvoersensor meldt een fout, bijvoorbeeld een onderbreking, kortsluiting of waarde buiten bereik.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 110"
      ],
      [
        "112",
        "De retoursensor meldt een fout, bijvoorbeeld een onderbreking, kortsluiting of waarde buiten bereik.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 112"
      ],
      [
        "114",
        "De buitenvoeler meldt een fout, bijvoorbeeld een onderbreking, kortsluiting of waarde buiten bereik.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 114"
      ],
      [
        "1P9",
        "De dynamische drukverhoging is eenmaal mislukt.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 1P9"
      ],
      [
        "140",
        "De dynamische drukverhoging is tweemaal mislukt; de bron noemt geen pompdetectie. De ster bij 140 is een professionele voetnoot, geen extra displaycode.",
        "pump",
        "§13, gedrukte p. 86 (PDF-pagina 71); 140* — professionele voetnoot"
      ],
      [
        "201",
        "De warmwatersensor is volgens deze rij defect; de bron beperkt deze melding tot Combi.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 201"
      ],
      [
        "203",
        "Het circuit van de boilersensor is onderbroken; de bron beperkt deze melding tot Solo.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 203"
      ],
      [
        "303",
        "De printplaat meldt een PCB-kaartfout.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 303"
      ],
      [
        "304",
        "De bron meldt te veel resets.",
        "resets",
        "§13, gedrukte p. 86 (PDF-pagina 71); 304"
      ],
      [
        "501",
        "Er is geen vlam gedetecteerd.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 501"
      ],
      [
        "612",
        "De ventilator meldt een fout en start volgens deze rij niet op.",
        "general",
        "§13, gedrukte p. 86 (PDF-pagina 71); 612"
      ]
    ]
  },
  {
    "id": "atag-i32ec-2017-be",
    "title": "i32EC — Belgische i-Serie (09.17)",
    "scope": "Alle 19 meldingsrijen uit §14, p. 68 van historische handleiding 8H.51.92.00 / 09.17, hier uitsluitend voor i32EC: alleen dit model heeft in de gelezen technische tabel op p. 112 bestemming B. Andere namen in de conformiteitsverklaring bewijzen geen aanvullende Belgische modeldekking. 105 is een ontluchtingsprogramma; 180 en 181 zijn expliciet geen storing. Dit is geen volledige merkcatalogus. Sleutel-/belsymbolen worden algemeen verklaard, niet per rij toegewezen. Bij 118 noemt gebruikersp. 13 minder dan 1 bar en installateursp. 68 minder dan 0,7 bar; geen universeel vuldoel of gekozen herstelhandeling. De CE-PIN is geen individueel artikelnummer. Actuele toestel- en gasvariantfit, artikelnummers, serials, firmware, controllerdekking en nieuwste editie zijn niet vastgesteld. Pomp-/zekering-/jumper- en resetpassages zijn geen gebruikersprocedure.",
    "sourceLabel": "ATAG i-Serie i32EC — installatie- en servicemanual 8H.51.92.00 / 09.17",
    "sourceUrl": "https://atag.compano.com/Data/Environments/000001/Attachment/Bijlage/Pictures/Overzicht%20Productgroepen/8H519200%20INST%20MANUAL%20i-%20SERIE%20COMFORT%20NL-F%20A5%20V0917.pdf",
    "sourcePages": "§14, p. 68 (PDF-pagina 68); modelscope p. 112; afwijkende gebruikersdrempel p. 13",
    "rows": [
      [
        "10",
        "De buitenvoeler meldt een fout, bijvoorbeeld een onderbreking, kortsluiting of waarde buiten bereik.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 10"
      ],
      [
        "20",
        "De aanvoersensor meldt een fout, bijvoorbeeld een onderbreking, kortsluiting of waarde buiten bereik.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 20"
      ],
      [
        "40",
        "De retoursensor meldt een fout, bijvoorbeeld een onderbreking, kortsluiting of waarde buiten bereik.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 40"
      ],
      [
        "50",
        "De warmwatersensor meldt een fout, bijvoorbeeld een onderbreking, kortsluiting of waarde buiten bereik.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 50"
      ],
      [
        "61",
        "Er is geen communicatie via de Z-bus. De resetpassage in de installateursbron is geen gebruikersinstructie.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 61"
      ],
      [
        "78",
        "De waterdruksensorwaarde ligt buiten bereik of de sensor is niet aangesloten; bij correcte waterdruk noemt de bron een pompdefect. Dit is geen vaststelling van lage waterdruk.",
        "pressure",
        "§14, p. 68 (PDF-pagina 68); 78"
      ],
      [
        "105",
        "Het ontluchtingsprogramma is actief. Deze editie noemt ongeveer zeven minuten; dit is een bedrijfstoestand, geen vastgestelde storing.",
        "program",
        "§14, p. 68 (PDF-pagina 68); 105"
      ],
      [
        "110",
        "De veiligheidstemperatuur is overschreden.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 110"
      ],
      [
        "111",
        "De maximale temperatuur is overschreden.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 111"
      ],
      [
        "117",
        "De druk is volgens deze bron hoger dan 3 bar, of de pompdrukverhoging is te hoog.",
        "pressure",
        "§14, p. 68 (PDF-pagina 68); 117"
      ],
      [
        "118",
        "De installateurspagina noemt druk lager dan 0,7 bar of te lage pompdrukverhoging zonder pompdetectie. Gebruikerspagina 13 noemt bij dezelfde code minder dan 1 bar; die drempels worden hier niet tot een vuldoel samengevoegd. De ster is een professionele voetnoot, geen extra displaycode.",
        "pump",
        "§14, p. 68 (PDF-pagina 68); 118* — professionele voetnoot; afwijkende gebruikersdrempel p. 13"
      ],
      [
        "119",
        "De doorverbinding op X2, posities 4 en 5, ontbreekt of is onderbroken.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 119"
      ],
      [
        "129",
        "De ventilator meldt een fout en start volgens deze rij niet op.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 129"
      ],
      [
        "133",
        "Na vijf ontstekingspogingen is geen vlam gevormd.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 133"
      ],
      [
        "151",
        "De ventilatorregeling bereikt het toerental niet of het toerental ligt buiten bereik, of de stuurautomaat is defect.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 151"
      ],
      [
        "154",
        "De bron noemt bij deze melding een te snelle stijging van de aanvoertemperatuur, een te groot temperatuurverschil en retour hoger dan aanvoer.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 154"
      ],
      [
        "180",
        "Geen storing volgens deze bron: kort zichtbaar bij het verlaten van de schoorsteenvegerfunctie.",
        "ordinary",
        "§14, p. 68 (PDF-pagina 68); 180"
      ],
      [
        "181",
        "Geen storing volgens deze bron: kort zichtbaar bij het verlaten van de gaspedaalfunctie.",
        "ordinary",
        "§14, p. 68 (PDF-pagina 68); 181"
      ],
      [
        "197",
        "De doorverbinding op het externe beveiligingscontact ontbreekt of is onderbroken.",
        "general",
        "§14, p. 68 (PDF-pagina 68); 197"
      ]
    ]
  }
];

export const atagManualCatalogs = Object.freeze(definitions.map(({ rows, ...definition }) => {
  const catalog = createFaultCatalog({
    ...definition,
    rows: rows.map(([code, meaning]) => [code, meaning]),
  });
  return Object.freeze({
    ...catalog,
    codes: Object.freeze(catalog.codes.map((row, index) => Object.freeze({
      ...row,
      userAction: actions[rows[index][2]],
      sourcePage: rows[index][3],
      sourceClass: null,
    }))),
  });
}));
