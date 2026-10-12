import { createFaultCatalog } from "./fault-catalogs.mjs";

// Table 69 descriptions only; installer remedies are not consumer procedures.
// Blank printed class cells remain null. Numeric ranges stay model-specific.
const rows = [
  [
    "200",
    "De warmtebron werkt voor de centrale verwarming.",
    "O",
    46
  ],
  [
    "201",
    "De warmtebron werkt voor warmwaterbereiding.",
    "O",
    46
  ],
  [
    "202",
    "Het schakeloptimalisatieprogramma is actief.",
    "O",
    46
  ],
  [
    "203",
    "Het toestel is gereed; er is geen warmtevraag.",
    "O",
    46
  ],
  [
    "204",
    "De actuele cv-watertemperatuur ligt boven de gewenste waarde.",
    "O",
    46
  ],
  [
    "208",
    "Er is warmtevraag door een rookgastest.",
    "O",
    46
  ],
  [
    "214",
    "De ventilator wordt tijdens de veiligheidstijd uitgeschakeld.",
    "V",
    46
  ],
  [
    "224",
    "De veiligheidstemperatuurbegrenzer is geactiveerd.",
    "V",
    46
  ],
  [
    "227",
    "Na ontsteking wordt geen vlamsignaal waargenomen.",
    "V",
    47
  ],
  [
    "228",
    "Er is een vlamsignaal terwijl geen vlam aanwezig is.",
    "V",
    47
  ],
  [
    "229",
    "De vlam is tijdens het branderbedrijf uitgevallen.",
    "B",
    47
  ],
  [
    "232",
    "Een extern schakelcontact blokkeert de warmtebron.",
    "B",
    47
  ],
  [
    "233",
    "Er is een storing van de toestelidentificatiemodule of toestelelektronica.",
    "V",
    47
  ],
  [
    "234",
    "Het gasregelblok heeft een elektrische storing.",
    "V",
    47
  ],
  [
    "235",
    "Er is een versieconflict tussen toestelelektronica en toestelidentificatiemodule.",
    "V",
    47
  ],
  [
    "237",
    "Er is een installatiestoring; de beschrijving specificeert die niet verder.",
    "V",
    47
  ],
  [
    "238",
    "De toestelelektronica wordt als defect gemeld.",
    "V",
    47
  ],
  [
    "242-263",
    "Er is een installatiestoring van toestelelektronica of bedieningspaneel.",
    "V",
    48
  ],
  [
    "265",
    "De warmtevraag is kleiner dan de geleverde energie.",
    "B",
    48
  ],
  [
    "268",
    "De relaistest is geactiveerd.",
    "O",
    48
  ],
  [
    "269",
    "De beschrijving noemt alleen vlambewaking; zij geeft geen preciezere storingsoorzaak.",
    "V",
    48
  ],
  [
    "273",
    "Het bedrijf van brander en ventilator is onderbroken.",
    "B",
    48
  ],
  [
    "281",
    "De cv-pomp is geblokkeerd of er bevindt zich lucht in de cv-pomp.",
    "B",
    48
  ],
  [
    "306",
    "Er is een vlamsignaal na het sluiten van de brandstoftoevoer.",
    "V",
    48
  ],
  [
    "358",
    "Het pomptestprogramma is actief.",
    "O",
    48
  ],
  [
    "360",
    "Er is een installatiestoring van toestelelektronica of bedieningspaneel.",
    "V",
    48
  ],
  [
    "362",
    "Er is een storing van de toestelidentificatiemodule of toestelelektronica.",
    "V",
    48
  ],
  [
    "363",
    "Er is een installatiestoring van toestelelektronica of bedieningspaneel.",
    "V",
    48
  ],
  [
    "815",
    "De temperatuursensor van de open verdeler is defect.",
    "W",
    48
  ],
  [
    "1010",
    "Er is geen communicatie via de EMS-BUS-verbinding.",
    "O",
    48
  ],
  [
    "1013",
    "Het maximale aantal branduren is bereikt.",
    "W",
    48
  ],
  [
    "1017",
    "De waterdruk is te laag.",
    "W",
    48
  ],
  [
    "1018",
    "Het onderhoudsinterval is verstreken.",
    "W",
    48
  ],
  [
    "1019",
    "Het toestel herkent een verkeerd pomptype.",
    "W",
    48
  ],
  [
    "1021",
    "De boilerlaad- of warmwatertemperatuursensor is defect.",
    "W",
    48
  ],
  [
    "1023",
    "De maximale bedrijfsduur inclusief stand-bytijd is bereikt.",
    null,
    48
  ],
  [
    "1037",
    "De buitentemperatuursensor is defect; vervangend cv-bedrijf is actief.",
    "W",
    48
  ],
  [
    "1065",
    "De waterdruksensor is defect of niet aangesloten.",
    "W",
    48
  ],
  [
    "1068",
    "De buitentemperatuursensor of lambdasonde is defect.",
    "W",
    49
  ],
  [
    "1075",
    "Er is kortsluiting in de ketelbloktemperatuursensor.",
    "W",
    49
  ],
  [
    "1076",
    "De regeling ontvangt geen signaal van de ketelbloktemperatuursensor.",
    "W",
    49
  ],
  [
    "2085",
    "Het toestel meldt een interne storing.",
    "V",
    49
  ],
  [
    "2908",
    "Er is een installatiestoring van toestelelektronica of bedieningspaneel.",
    "V",
    49
  ],
  [
    "2910",
    "Het rookgasafvoersysteem heeft een storing.",
    "V",
    49
  ],
  [
    "2914-2916",
    "Er is een installatiestoring van de toestelelektronica.",
    "V",
    49
  ],
  [
    "2920",
    "De vlambewaking heeft een storing.",
    "V",
    49
  ],
  [
    "2923-2927",
    "Er is een installatiestoring van de toestelelektronica.",
    "V",
    49
  ],
  [
    "2928",
    "Het toestel meldt een interne storing.",
    "V",
    49
  ],
  [
    "2931",
    "Er is een installatiestoring van toestelelektronica of bedieningspaneel.",
    "V",
    49
  ],
  [
    "2940",
    "De branderautomaat heeft een installatiestoring.",
    "V",
    49
  ],
  [
    "2946",
    "Het toestel herkent een verkeerde codeerstekker.",
    "V",
    49
  ],
  [
    "2948",
    "Bij klein vermogen wordt geen vlamsignaal waargenomen.",
    "B",
    49
  ],
  [
    "2950",
    "Na de startprocedure wordt geen vlamsignaal waargenomen.",
    "B",
    49
  ],
  [
    "2951",
    "Er zijn te veel vlamonderbrekingen.",
    "V",
    49
  ],
  [
    "2952",
    "Er is een interne storing bij het testen van het ionisatiesignaal.",
    "V",
    49
  ],
  [
    "2955",
    "De warmtebron ondersteunt de ingestelde hydraulische configuratieparameters niet.",
    "B",
    50
  ],
  [
    "2956",
    "De hydraulische configuratie op de warmtebron is geactiveerd.",
    "O",
    50
  ],
  [
    "2957",
    "Er is een installatiestoring van de toestelelektronica.",
    "V",
    50
  ],
  [
    "2961 / 2962",
    "Er is geen ventilatorsignaal.",
    "V",
    50
  ],
  [
    "2963",
    "Het signaal van de aanvoer- en ketelbloktemperatuursensor ligt buiten het toegestane bereik.",
    "B",
    50
  ],
  [
    "2965",
    "De aanvoertemperatuur is te hoog.",
    "B",
    50
  ],
  [
    "2966",
    "De aanvoertemperatuur in het ketelblok stijgt te snel.",
    "B",
    50
  ],
  [
    "2968",
    "Cv-water wordt bijgevuld; dit is een statusbeschrijving, geen bijvulinstructie.",
    "O",
    50
  ],
  [
    "2969",
    "Het maximale aantal keren bijvullen is bereikt.",
    null,
    50
  ],
  [
    "2970",
    "De druk in de cv-installatie daalt te snel.",
    "B",
    50
  ],
  [
    "2971",
    "De bedrijfsdruk is te laag.",
    "B",
    50
  ],
  [
    "2972",
    "De netspanning is te laag.",
    null,
    50
  ],
  [
    "2980",
    "Na minimaal vijf vergrendelende storingen binnen vijftien minuten is het toestel om veiligheidsredenen geblokkeerd.",
    "V",
    50
  ],
  [
    "2981",
    "Het toestel is uit- en weer ingeschakeld terwijl veiligheidsblokkering 2980 al bestond.",
    "V",
    50
  ]
];
const GENERAL = "Noteer de volledige code, het exacte model en een zonder openen veilig bereikbaar artikel- of serienummer. Laat een blijvende of terugkerende melding professioneel beoordelen. Open geen gesloten onderdelen, wijzig geen instellingen en voer geen reset- of herstelprocedure uit op basis van deze installateurstabel.";
const ORDINARY = "Aan deze bedrijfsstatus alleen is geen defect of herstelhandeling te verbinden. Noteer bij klachten de volledige melding en het exacte model. Open geen gesloten onderdelen, wijzig geen instellingen en raadpleeg de toepasselijke gebruikershandleiding; laat aanhoudende klachten professioneel beoordelen.";
const SERVICE = "Noteer de volledige melding, het exacte model en een zonder openen veilig bereikbaar artikel- of serienummer. Plan professioneel onderhoud of beoordeling wanneer de melding blijft staan of terugkomt. Open geen gesloten onderdelen, vul niet bij op basis van deze tabel en wis de melding niet zonder de bijbehorende controle.";
const LOCK = "Laat deze veiligheidsblokkering alleen door een vakman of servicedienst beoordelen en opheffen na het verhelpen van de oorzaak en een aansluitende installatietest ter plaatse. Noteer de volledige code en het exacte model. Gebruik geen herhaalde resets, spanningsonderbreking of overbrugging om de blokkering te wissen; open geen gesloten onderdelen.";
const classLabels = {
  "O": "O (bedrijfsstatus)",
  "B": "B (blokkering)",
  "V": "V (vergrendeling)",
  "W": "W (servicedisplay)",
  "null": "niet vermeld in de bron"
};
const catalog = createFaultCatalog({
  id: "buderus-logamax-gb172i2",
  title: "Logamax plus GB172i.2 — BE (2026/06)",
  scope: "Alle 69 bedrijfs-, service- en storingsgroepen uit tabel 69, §10.1.2, p. 46–50 van installatie- en onderhoudshandleiding 6721852651 (2026/06), BE Nederlands: 97 numerieke meldingen. Uitsluitend de Belgische model/artikelparen uit tabel 1: GB172i.2-24 W H — 7736902473; GB172i.2-20 KDW H — 7736902472; GB172i.2-20 KDW P — 7736902479; GB172i.2-24 W P — 7736902480. O is bedrijfsstatus, B blokkering, V vergrendeling en W servicedisplay; de bron laat de klasse bij 1023, 2969 en 2972 leeg. 1010 is O maar meldt ontbrekende EMS-communicatie. Niet voor GB172i zonder .2, GB162, andere modellen of revisies. De professionele herstelkolom is geen gebruikersinstructie; 2980/2981 vereist een vakman of servicedienst na oorzaakherstel en een installatietest ter plaatse. Controleer typeplaatje, configuratie en gebruikershandleiding; firmware, controllerdekking en nieuwste editie zijn niet vastgesteld.",
  sourceLabel: "Buderus Logamax plus GB172i.2 — installatie- en onderhoudshandleiding 6721852651 (2026/06), BE Nederlands",
  sourceUrl: "https://buderus-be-fl.boschhc-documents.com/download/pdf/file/6721852651",
  sourcePages: "Tabel 69, §10.1.2, p. 46–50",
  rows: rows.map(([code, meaning]) => [code, meaning]),
});

export const gb172i2Catalogs = Object.freeze([Object.freeze({
  ...catalog,
  codes: Object.freeze(catalog.codes.map((entry, index) => {
    const [, , sourceClass, page] = rows[index];
    const userAction = ["2980", "2981"].includes(entry.code) ? LOCK
      : sourceClass === "O" && entry.code !== "1010" ? ORDINARY
      : sourceClass === "W" ? SERVICE : GENERAL;
    return Object.freeze({
      ...entry,
      sourceClass,
      userAction,
      sourcePage: `Tabel 69, p. ${page}; klasse ${classLabels[String(sourceClass)]}`,
    });
  })),
})]);
