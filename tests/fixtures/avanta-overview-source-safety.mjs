// Independently read original primary17 cells/messages; six hand-derived corrections.
// BEFORE values/hashes are genuine accepted51c captures, not manufacturer proof.
export const avantaFacts = {
  "id": "remeha-avanta",
  "url": "https://storingswijzer.remeha.be/error-codes-products/avanta/",
  "paginationUrl": "https://storingswijzer.remeha.be/error-codes-products/avanta/page/2/",
  "label": "Remeha België Storingswijzer - Avanta",
  "sha256": "7ee9f8efca9f4111ae4705d34b5002c630ef728a5a84819b1d8b5d02212e81c9",
  "bytes": 30059,
  "paginationSha256": "d025a8faed9685c2e270f40f114ebdd2561c61b4e7f24d57001410e8fcba1989",
  "paginationBytes": 30221,
  "literalCodes": [
    "E:0",
    "E:01",
    "E:02",
    "E:03",
    "E:04",
    "E:05",
    "E:06",
    "E:07",
    "E:08",
    "E:09",
    "E:10",
    "E:11",
    "E:12",
    "E:13",
    "E:43",
    "E:44",
    "E:45"
  ],
  "literalMessages": [
    "Storing aanvoer- of retoursensor:",
    "Aanvoertemperatuur > Maximale werktemperatuur:",
    "Retourtemperatuur > Aanvoertemperatuur:",
    "Bedieningspaneel:",
    "Na maximaal 5 startpogingen geen vlamvorming:",
    "Fout in ionisatie:",
    "Ongewenste vlamvorming:",
    "Geen water in de ketel of pomp draait niet:",
    "Ventilator defect:",
    "Geen water in de ketel:",
    "Geen water in de ketel of pomp draait niet:",
    "Luchtkasttemperatuur te hoog:",
    "Warmteterugwinunit:",
    "Fout detectie",
    "Grenzen van de parameters",
    "Grenzen van de parameters",
    "Grenzen van de parameters"
  ],
  "scope": "De 17 codeverwijzingen uit het officiële Belgische Avanta-overzicht, gelezen op 12 oktober 2026. De aangekondigde tweede archiefpagina herhaalt dezelfde 17 codes. De bron geeft korte meldingen, geen herstelhandelingen of modelvarianten; dit is geen volledige merkcatalogus of toestelhandleiding. Generatie, artikelnummers, toestelbestemming, Belgische compatibiliteit, firmware en nieuwste revisie zijn hier niet vastgesteld.",
  "pages": "Online productoverzicht: 17 codeverwijzingen",
  "warning": "Kies uw toestelreeks en generatie: Avanta gebruikt 17 korte meldingen uit de Belgische Storingswijzer, gelezen op 12 oktober 2026. De tweede archiefpagina herhaalt deze lijst; exact model, generatie en revisie zijn niet vastgesteld en het overzicht geeft geen herstelhandelingen. Controleer de volledige displaycode en het veilig bereikbare typeplaatje zonder onderdelen te openen; legacy Calenta 15s/25s/28c/35s/40c volgt de E- en Su-tabellen van handleiding 117061-08. Calenta Ace-Matic 25s/35s/30c/40c volgt revisie 7871265-05-04072025. Calenta Ace-Matic 25L heeft eigen tabellen uit de afzonderlijke handleiding 7871254-04-04072025. Kies hieronder het juiste model en de component CU-GH-21 of SCB-10; SCB-10-tabellen gelden alleen als de uitbreiding en betrokken componenten aanwezig zijn. De betekenis hangt af van model, generatie en configuratie. Calenta Ace, Tzerra, Quinta en andere revisies vallen niet onder deze dekking.",
  "description": "Remeha foutcodes voor Avanta, Calenta en Ace-Matic. Vergelijk de volledige code met de juiste bron, toestelreeks en component; lees veilige eerste stappen.",
  "action": "Noteer de volledige code, het exacte model en een zonder openen veilig bereikbaar artikel- of serienummer. Dit overzicht geeft geen herstelhandeling; controleer de toepasselijke gebruikershandleiding en laat een blijvende of terugkerende melding professioneel beoordelen. Open geen gesloten onderdelen en wijzig geen instellingen.",
  "meaningChanges": {
    "E:05": "Er is een fout in de ionisatie.",
    "E:08": "De ventilator is defect.",
    "E:13": "De storingsdetectie meldt een fout.",
    "E:43": "Melding over de grenzen van de parameters; dit overzicht specificeert de afwijking niet.",
    "E:44": "Melding over de grenzen van de parameters; dit overzicht specificeert de afwijking niet.",
    "E:45": "Melding over de grenzen van de parameters; dit overzicht specificeert de afwijking niet."
  },
  "before": {
    "catalog": {
      "id": "remeha-avanta",
      "title": "Avanta",
      "scope": "Alle 17 foutcoderegels die de officiële Belgische Remeha Storingswijzer op 17 september 2026 voor de Avanta publiceerde.",
      "sourceLabel": "Remeha België Storingswijzer - Avanta",
      "sourceUrl": "https://storingswijzer.remeha.be/error-codes-products/avanta/",
      "sourcePages": "Online productoverzicht, 17 codes",
      "codes": [
        {
          "code": "E:0",
          "meaning": "Storing van de aanvoer- of retoursensor.",
          "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:0"
        },
        {
          "code": "E:01",
          "meaning": "De aanvoertemperatuur ligt boven de maximale werktemperatuur.",
          "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:01"
        },
        {
          "code": "E:02",
          "meaning": "De retourtemperatuur is hoger dan de aanvoertemperatuur.",
          "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:02"
        },
        {
          "code": "E:03",
          "meaning": "Er is een storing van het bedieningspaneel.",
          "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:03"
        },
        {
          "code": "E:04",
          "meaning": "Na maximaal vijf startpogingen is geen vlam gevormd.",
          "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:04"
        },
        {
          "code": "E:05",
          "meaning": "Er is een fout in de ionisatiemeting.",
          "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:05"
        },
        {
          "code": "E:06",
          "meaning": "Het toestel detecteert ongewenste vlamvorming.",
          "userAction": "Stop onmiddellijk bij gasgeur: bedien geen schakelaars, ventileer indien dat veilig kan, sluit de gastoevoer alleen als u weet hoe en bel van buiten de gevarenzone de bevoegde hulp. Zonder gasgeur: noteer de volledige code en reset alleen wanneer de handleiding van uw exacte toestel dat toestaat.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:06"
        },
        {
          "code": "E:07",
          "meaning": "Er is geen water in de ketel of de pomp draait niet.",
          "userAction": "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:07"
        },
        {
          "code": "E:08",
          "meaning": "De ventilator is defect of geeft geen correct signaal.",
          "userAction": "Schakel het toestel uit en laat rookgasafvoer, luchttoevoer en verbrandingsonderdelen professioneel controleren. Gebruik het toestel niet verder bij rookgasgeur, een CO-melding of zichtbare roetvorming.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:08"
        },
        {
          "code": "E:09",
          "meaning": "Het toestel detecteert geen water in de ketel.",
          "userAction": "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:09"
        },
        {
          "code": "E:10",
          "meaning": "Er is geen water in de ketel of de pomp draait niet.",
          "userAction": "Controleer uitsluitend de zichtbare installatiedruk en volg alleen de vul- of ontluchtingsinstructie uit de gebruikershandleiding van uw exacte toestel. Open de mantel niet en laat een terugkerende melding onderzoeken.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:10"
        },
        {
          "code": "E:11",
          "meaning": "De temperatuur in de luchtkast is te hoog.",
          "userAction": "Schakel het toestel uit en laat rookgasafvoer, luchttoevoer en verbrandingsonderdelen professioneel controleren. Gebruik het toestel niet verder bij rookgasgeur, een CO-melding of zichtbare roetvorming.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:11"
        },
        {
          "code": "E:12",
          "meaning": "Er is een melding van de warmteterugwinunit.",
          "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:12"
        },
        {
          "code": "E:13",
          "meaning": "De storingsdetectie meldt een interne fout.",
          "userAction": "Noteer de volledige code en het exacte toestelmodel. Open de mantel niet en werk niet aan sensoren, bekabeling, printplaat of netspanning; deze melding vraagt technische diagnose.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:13"
        },
        {
          "code": "E:43",
          "meaning": "Een ingestelde parameter bevindt zich buiten de toegestane grenzen.",
          "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:43"
        },
        {
          "code": "E:44",
          "meaning": "Een ingestelde parameter bevindt zich buiten de toegestane grenzen.",
          "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:44"
        },
        {
          "code": "E:45",
          "meaning": "Een ingestelde parameter bevindt zich buiten de toegestane grenzen.",
          "userAction": "Noteer de volledige code en het exacte model. Volg alleen handelingen die in de gebruikershandleiding voor de gebruiker zijn beschreven, reset niet herhaaldelijk en open geen gas-, rookgas- of elektrische onderdelen.",
          "sourcePage": "Online productoverzicht, 17 codes",
          "searchTerms": "E:45"
        }
      ]
    },
    "warning": "Kies uw toestelreeks en generatie: Avanta volgt de officiële Belgische Storingswijzer; legacy Calenta 15s/25s/28c/35s/40c volgt de E- en Su-tabellen van handleiding 117061-08. Calenta Ace-Matic 25s/35s/30c/40c volgt revisie 7871265-05-04072025. Calenta Ace-Matic 25L heeft eigen tabellen uit de afzonderlijke handleiding 7871254-04-04072025. Kies hieronder het juiste model en de component CU-GH-21 of SCB-10; SCB-10-tabellen gelden alleen als de uitbreiding en betrokken componenten aanwezig zijn. De betekenis hangt af van model, generatie en configuratie. Calenta Ace, Tzerra, Quinta en andere revisies vallen niet onder deze dekking.",
    "registry": {
      "path": "/foutcodes/remeha",
      "lastModified": "2026-10-11",
      "status": "published",
      "title": "Remeha foutcodes: Avanta, Calenta en Ace-Matic | AB Service",
      "description": "Zoek Remeha Avanta-, Calenta- en Calenta Ace-Matic-codes. Kies toestelreeks en component, controleer de officiële bron en lees veilige eerste stappen.",
      "changeFrequency": "monthly",
      "priority": 0.6
    },
    "entry": {
      "id": "remeha-avanta",
      "usedBy": [
        "remeha"
      ],
      "title": "Avanta",
      "modelScope": "Alle 17 foutcoderegels die de officiële Belgische Remeha Storingswijzer op 17 september 2026 voor de Avanta publiceerde.",
      "sourceLabel": "Remeha België Storingswijzer - Avanta",
      "sourceURL": "https://storingswijzer.remeha.be/error-codes-products/avanta/",
      "sourcePages": "Online productoverzicht, 17 codes",
      "explanationRowCount": 17,
      "modelFamily": "Avanta",
      "models": null,
      "articleNumbers": null,
      "documentNumber": null,
      "revision": null,
      "issueDate": null,
      "market": [
        "België"
      ],
      "language": null,
      "component": null,
      "tableIds": null,
      "primarySnapshot": null,
      "scopeSnapshotDate": "17 september 2026",
      "sourceEvidencePath": [
        "docs/seo/evidence-register.md"
      ],
      "verificationBasis": "Current declared online scope and historical evidence-register record; no retained primary Avanta body reviewed or fresh external verification in Task47.",
      "declaredScopePath": "content/additional-fault-catalogs.mjs",
      "fieldBoundary": "Structured fields are explicit current declarations or cited prior source observations; null means not established in this bounded manifest, not absence or failure. No newest-revision/universal/device-specific fit claim."
    }
  },
  "preservation": {
    "allGuides": "ee5be1c34bdc6bd07d32f97a8920e1eba6a090c9b80d27315eeef16cfdc3c9ff",
    "allRegistry": "756c63da78e65127eac4303ea3cfea5b97d31b4d2b3b6ea9832efb5987bdf4c0",
    "manifest": "f3f708d16f9c5d909577a1272eb5bb8f7eef2adafb4fed4bdee502ed4280102e",
    "oldSnapshots": "86637f75c181c10fb1e8d969fd22077a5db3f1c38eee24eb43231f63facf5337",
    "remeha": {
      "guide": "4e0af4f18ce049ffd8a5e65ef4baeb2e5fd8bb25b346cd69a1dafb754e074642",
      "codes": "ba1ab0d40e187087e11e5a0aab31eaf93d18f8ff66c4737807936ad96ea6a8fa",
      "avanta": "bdbc1f9de4976f484e68fdad4899c3c0e6806a63c9a46fa247e0d2e48002e85d",
      "html": "6db906fe591afde7f5ed5b39083fce1b591327125296e991a549690a0a3e5f98",
      "metadata": "0c22e5368f5e23ee8fb59604a58a34874bec031433a26d8d84131080fd4ebd39",
      "otherTwelveCatalogs": "6f9fd24d52d8ef2bcf5c6382e63a4efbc8d2a9276fb00e684c3220fc07e9ab20",
      "otherTwelveGuides": "111f75b7b15082b370c3879b98d7f83b97b2bf26939b37772ca599a8ec9a5687",
      "otherEntries": "cd78d62a037f83b87ee5c3319436dbac5a063fe28c267752617045851224322f",
      "otherMirrors": "52607bed6fe752d4e3795ddc0b4b8ee8b83c34fa03a2f91aa3baaea646d02b5d"
    }
  }
};
const f = avantaFacts;
export const expectedAvantaRows = f.before.catalog.codes.map((row,i) => ({...row,meaning:f.meaningChanges[row.code] || row.meaning,userAction:f.action,sourcePage:`Online lijstregel ${i+1}: ${f.literalCodes[i]}`}));
const clone = value => JSON.parse(JSON.stringify(value));
export function beforeAvantaCatalog(catalog) {
  if (catalog.id !== f.id) return catalog;
  const restored = clone(catalog); restored.scope=f.before.catalog.scope; restored.sourcePages=f.before.catalog.sourcePages;
  restored.codes=restored.codes.map(row=>{const old=f.before.catalog.codes.find(r=>r.code===row.code);if(!old)throw Error('Unknown Avanta row');return {...row,meaning:old.meaning,userAction:old.userAction,sourcePage:old.sourcePage};});return restored;
}
export function beforeAvantaGuide(guide) {
  if(guide.slug!=='remeha')return guide;const result=clone(guide);result.modelWarning=f.before.warning;result.catalogs=result.catalogs.map(beforeAvantaCatalog);
  result.codes=result.catalogs.flatMap(c=>c.codes);return result;
}
export function beforeAvantaRegistry(page) {
  if(page.path!=='/foutcodes/remeha')return page;return {...page,description:f.before.registry.description,lastModified:f.before.registry.lastModified};
}
export function beforeAvantaMetadata(metadata,slug) {
  if(slug!=='remeha')return metadata;const m=clone(metadata);m.description=f.before.registry.description;m.openGraph.description=m.description;m.twitter.description=m.description;return m;
}
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
export function beforeAvantaHtml(html,slug) {
  if(slug!=='remeha')return html;
  const marker='<section class="fault-group" aria-labelledby="remeha-avanta-title">';
  const start=html.indexOf(marker),end=html.indexOf('</section>',start)+10;
  if(start<0||end<start)throw Error('Missing exact Avanta group');
  let group=html.slice(start,end).replace(/<article class="fault-code-card">[\s\S]*?<\/article>/g,card=>{
    const code=card.match(/<code>(.*?)<\/code>/)?.[1],old=f.before.catalog.codes.find(r=>r.code===code),next=expectedAvantaRows.find(r=>r.code===code);
    if(!old||!next)throw Error('Unexpected Avanta card');
    for(const field of ['meaning','userAction','sourcePage'])card=card.replace(escape(next[field]),escape(old[field]));return card;
  });
  group=group.replace(escape(f.scope),escape(f.before.catalog.scope)).replace(escape(f.pages),escape(f.before.catalog.sourcePages));
  return (html.slice(0,start)+group+html.slice(end)).replace(escape(f.warning),escape(f.before.warning));
}
export function beforeAvantaManifestEntry(entry) {if(entry.id!==f.id)return entry;return clone(f.before.entry);}
export function beforeAvantaManifestMirror(guide) {if(guide.slug!=='remeha')return guide;return {...guide,modelWarning:f.before.warning};}
