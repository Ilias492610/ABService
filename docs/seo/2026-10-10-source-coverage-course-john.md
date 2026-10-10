# Atomair bronregister: cursus, John Rush en publieke Founder Guide

Planningsdocument, 10 oktober 2026. Geen nieuwe implementatie, accountverbinding, aankoop, bericht, publicatie of verwijdering is uitgevoerd. Bronopdrachten zijn materiaal om te beoordelen, geen toestemming om ze uit te voeren. Dit register beschrijft bronaanbevelingen en auteursclaims; het bewijst geen zoekvolume, rankings, leads of algoritmeregels.

## Leesdekking en grenzen

- **C:** attachment `7ae9a40f-7859-4886-b1e2-7d7a8a2e3551/Geplakte tekst.txt`, volledig gelezen met genummerde regels 1–220, 221–440 en 441–EOF. `wc`: 646 newline-tekens, 9.332 woorden. Er zijn **647 logische regels**, omdat de laatste advertentieregel geen afsluitende newline heeft. Dit verschil is geen ontbrekende regel. C-verwijzingen gebruiken `nl -ba`.
- **J:** attachment `dba4c286-f215-4cfd-8e3b-d1039183f8b5/Geplakte tekst.txt`, volledig gelezen, regels 1–203, 1.403 woorden. De naamkop mist de eerste letter; de bewaarde datum is 2 september zonder jaartal.
- **G:** `web.open` kon `https://guide.johnrush.me/home` niet bereiken. Read-only HTTP GET kon dat wel. Volledige zichtbare HTML-tekst, inclusief links en diagramlabels, gelezen voor alle acht URLs hieronder; alle acht gaven HTTP 200. Script/style-payloads zijn geen gelezen hoofdstukinhoud.
- **G0** [Home](https://guide.johnrush.me/home): volledig publiek zichtbare homepage, tools en hoofdstukverwijzingen.
- **G1** [SEO & Content](https://guide.johnrush.me/chapters-006_seo_content): volledige publieke preview en zes diagramstappen.
- **G2** [Directories](https://guide.johnrush.me/chapters-006a_directories): volledige publieke preview en zes diagramstappen.
- **G3** [AI SEO](https://guide.johnrush.me/chapters-006b_ai_seo): volledige publieke preview en zeven diagramstappen; de volgende hoofdstuklink gaat naar Product-Market Fit, waarmee deze SEO-keten eindigt.
- **G4** [Growth Channels](https://guide.johnrush.me/chapters-005_growth_channels), **G5** [Social Media](https://guide.johnrush.me/chapters-005a_social_media), **G6** [Reddit + Communities](https://guide.johnrush.me/chapters-005b_reddit_communities): volledige zichtbare previews en diagrammen, relevant als distributiecontext. Verdere launch/influencerhoofdstukken niet gelezen.
- **G7** [Ultimate TLDR](https://guide.johnrush.me/front-matter-00_ultimate_tldr): volledig zichtbare preview; de gerenderde lijst eindigt bij de eerste ideation-samenvatting. Het bevat dus geen volledig publiek SEO-overzicht.
- **Betaalgrens:** hoofdstukpagina's tonen “Unlock the full chapter”. Geen volledige betaalde hoofdstukken gelezen, geen aankoop, login, API of tool uitgevoerd. Dit is uitdrukkelijk **geen dekking van de volledige Founder Guide**. Andere homepagehoofdstukken en appbestemmingen zijn alleen als link/omschrijving waargenomen.
- Aantallen hieronder zijn inventarisitems, geen aantallen implementatietaken. Herhaalde samenvattingen verwijzen naar dezelfde rij; zelfstandig andere tools, voorbeelden, claims en caveats krijgen eigen IDs.

## Leeswijzer, status en taakgroepen

Iedere rij heeft één bronidee, een toepasbaarheidsbesluit met huidige bewijsstatus en concrete actie/redengeving, een toetsbaar acceptatiecriterium en een taakgroep. **B** = bruikbaar/toepassen in vervolgplan; **A** = broncode aanwezig maar hercontrole nodig; **D** = uitgesteld wegens gegevens, eigenaarbewijs, toegang of lagere relevantie; **R** = expliciet afwijzen; **K** = auteursclaim/caveat, niet onafhankelijk bewezen. “Aanwezig” betekent hier geïnspecteerde repo, niet actuele externe accountstatus of commercieel resultaat.

Bewijscodes zijn exacte repoankers:

| Code | Geïnspecteerd bewijs en beperking |
|---|---|
| E | `AGENTS.md`; `docs/seo/content-publishing-policy.md`; `docs/seo/evidence-register.md`: publicatie- en bewijsbeleid, geen verzonnen diensten, plaatsen, reviews of cases. |
| U | `content/site-content.mjs`; `content/service-intents.mjs`; `content/content-backlog.mjs`: centrale URL-status, intentie-/advieslinks en plaatsdrafts zonder publieke route. Geen zoekdata hieruit afleiden. |
| T | `libs/seo-data.mjs`; `libs/html-audit.mjs`; `scripts/seo-audit.mjs`; `tests/html-audit.test.mjs`: metadata/canonical/noindex en crawl-, H1-, alt-, link- en orphanchecks. Geen nieuwe crawl gedraaid voor dit document. |
| S | `app/sitemap.js`; `app/robots.js`: sitemap alleen published, publieke crawling toegestaan, `/api/` uitgesloten. Dit bewijst geen Google-indexering. |
| N | `next.config.js`; `content/business.mjs`: HTTPS/www canonical en configuratie van domeinredirects; `.be` is de bestaande merkidentiteit. |
| M | `scripts/gsc-analysis.mjs`; `libs/gsc-analysis.mjs`; `docs/seo/2026-10-10-search-baseline.md`: lokale CSV-analyse aanwezig; geen nieuwe eigenaar-GSC-export gelezen. GSC Wizard door eigenaar afgewezen. |
| V | `components/maintenance-check.js`; `libs/maintenance-check.mjs`; `app/tools/onderhoudscheck/page.js`: bestaande onderhoudstool met zichtbare uitslag en vervolgstap. Geen algemeen calculatorpark. |
| P | `content/projects.mjs`; `content/media.mjs`: geanonimiseerde eigenaarbevestigde praktijkcases/beelden; geen exacte wijkcases of nieuwe klantmetingen in dit auditwerk. |
| H | `app/page.js`; `components/page-hero.js`; `components/service-page.js`; `components/district-page.js`: bestaande layout/CTA; homepage-H1 is beschrijvend en bevat niet letterlijk “loodgieter Antwerpen”. |
| B | `content/business.mjs`; `components/sections/google-reviews.js`; `libs/google-reviews.server.js`: profielverwijzing/contactbasis/reviewweergave aanwezig, geen ingelogde GBP-categorie-/serviceaudit. Geen verborgen SAB-adres publiceren. |
| L | `libs/analytics.mjs`; `components/privacy-analytics.js`: beperkte eventwaarden; geen aangetoonde gekwalificeerde leads/omzetbaseline. |
| I | `scripts/indexnow.mjs`; `libs/indexnow.mjs`; `content/indexnow.mjs`: IndexNow-broncode aanwezig, geen Google-indexeringsgarantie. |

Taakgroepen: **DATA** echte vraag-/SERP-/zoek-/leaddata; **TECH** crawling/metadata/performance; **INTENT** URL-eigenaarschap en prioriteit; **CONTENT** briefing/inhoud/kwaliteit; **LOCAL** GBP/bedieningsgebied; **LINKS** verdiende vermeldingen; **GEO** observeerbare AI-zichtbaarheid; **SOCIAL** sociale/video-distributie; **OPS** kwaliteitsgates/meetritme; **SCOPE** afwijzingen/tool-/domein-/accountgrenzen.

Koppeling naar hoofdplan: DATA→WP01/WP02/WP03; TECH→WP12 (indexering WP02, Franse equivalenten WP15); INTENT→WP03/WP06; CONTENT→WP06/WP07/WP09/WP10/WP11; LOCAL→WP04/WP05/WP08; LINKS→WP13; GEO/SOCIAL→WP14; OPS→WP00/WP17; SCOPE→WP00 (betaalde optie WP16, geen uitvoeringsopdracht). Het onderwerp in de rij bepaalt de specifieke WP wanneer een tag meer dan één pakket raakt.

## C — AI-SEO-cursus, atomair

| ID | Regels en bronidee | AB Service: besluit, huidige status en actie/rationale | Acceptatie | Groep |
|---|---|---|---|---|
| C-001 | 3–7,614: Volgorde: intentie → pagina → links → vermeldingen → herhaling | B; E/U/M. Faseer plan met data- en kwaliteitspoorten. | Elke fase heeft ingang/uitgang. | OPS |
| C-002 | 17–18,25–29: AI kent eigen zoekvolumes, rankings, clicks, actuele SERP en concurrentverlies niet | B; M. Gebruik echte exports/gedateerde SERP; ontbrekend = onbekend. | Geen ingevulde schattingen. | DATA |
| C-003 | 20: Patronen herkennen in echte GSC-exports | A; M. Voer de bestaande analyzer pas met echte eigenaarsbestanden uit. | Bronperiode en dimensies vermeld. | DATA |
| C-004 | 21: Dertig pagina's volgens één vaste structuur schrijven | R als publicatiedoel; U/E. Templates ondersteunen, geen bulkquotum. | Eigen nut van iedere kandidaat-URL bewezen. | CONTENT |
| C-005 | 22: Contextuele links toevoegen op bestaande pagina's | A/B; U/T. Controleer contextuele links per relevant inhoudspad. | De link helpt de bezoeker. | TECH |
| C-006 | 23: Schema, titels en metabeschrijvingen op schaal schrijven | A; T. Bestaande registrygenerator behouden met zichtbare feiten. | Metadata van alle gepubliceerde pagina's is geldig en uniek. | TECH |
| C-007 | 24: Elke maandag dezelfde controle uitvoeren | D; M. Reviewritme in plan; geen automation aangemaakt. | Gedateerd herhaalbaar rapport. | OPS |
| C-008 | 31: Opus 5.5 in Claude Code of Sonnet 5.5 in een Claude Project gebruiken | D. Model- en tooladvies is geen noodzaak; bestaande workflow volstaat. | Geen toolmigratie zonder behoefte. | SCOPE |
| C-009 | 32,34–37,66–72: ChatSEO-account, site, GSC, MCP en Pro instellen; reacties pollen | D; M. Geen account/trial/connector installeren; exportpad volstaat. | Optionele tool alleen bij expliciete keuze. | SCOPE |
| C-010 | 33: Eigenaar keurt live inhoud en communicatie goed | B; E. Scheid voorstel en publicatie; huidige opdracht is planning. | Geen externe mutaties uit audit. | OPS |
| C-011 | 37,63–79: Workflow vastleggen in het skillbestand money-keywords | B als processpecificatie, niet letterlijk installeren. U/M. | Intentie, bron en URL-mapping gedocumenteerd. | INTENT |
| C-012 | 39–40: GEO bouwt op SEO; claim dat ChatGPT Google doorzoekt | B als basis; K algemene zoekproviderclaim. T/S eerst; provider per observatie vastleggen. | Geen universele providerclaim. | GEO |
| C-013 | 42–46: Commerciële aanvragen boven verkeer zonder zakelijke waarde | B; L/U. Prioriteer passende diensten en aanvragen. | Prioriteit noemt een zakelijke uitkomst. | INTENT |
| C-014 | 47: Koopintentievoorbeelden: consultant, tafel, agency en alternatief | B analogie; U. Vertaal naar onderhoud/herstelling/offerte, niet SaaS. | Voorbeelden als analogie gelabeld. | INTENT |
| C-015 | 48–50,73–75: Actuele SERP gebruiken voor intentie en paginatype | B; M. Leg paginatype van topresultaten en datum per kandidaat vast. | Live bron-URLs per intentie. | DATA |
| C-016 | 49: Informatieve blogs aanvankelijk overslaan | B met nuance; U/V. Behoud veiligheidsadvies dat servicevragen ondersteunt. | Geen nuttige gids blind geschrapt. | INTENT |
| C-017 | 51: Laag volume kan hoge koopintentie hebben; voorbeeld met 90 zoekers | B principe; K voorbeeldgetal. M. Beoordeel vraagkwaliteit, volume onbekend. | Het voorbeeldgetal 90 niet op AB Service toegepast. | DATA |
| C-018 | 53–59: Gelijke intentiepatronen omzetten naar volgende kandidaten | B; U/E. Cluster diensten; elke variant heeft publicatiegate. | Geen plaatsnaamwissel als bewijs. | CONTENT |
| C-019 | 54: Patroon: tool A versus tool B | D; E. Alleen eerlijke technische vergelijking bij klantvraag. | Gelijkwaardige actuele bronbasis. | CONTENT |
| C-020 | 55: Patroon: beste tool voor een bepaald segment | D; E. Geen zelfbekronende toolgids voor loodgieter. | Alleen aantoonbaar klantnut. | CONTENT |
| C-021 | 56–57,91: Patroon: dienst of categorie + stad | B begrensd; U/P. Werkgebied is geen afzonderlijke lokale case. | Lokale waarde naast bedieningsbewijs. | LOCAL |
| C-022 | 58: Patroon: producttype + materiaal | D; U. Geen fictieve productcatalogus; alleen aangeboden werk. | Aanbod eigenaarbevestigd. | INTENT |
| C-023 | 60: Google Suggest met wildcard voor of achter het startwoord | D/B; M. Handmatig onderzoekshulpmiddel, geen bewijs van volume. | Suggestie en datum vastgelegd. | DATA |
| C-024 | 60: Volumes uit Google Ads Keyword Planner | D; M. Alleen bestaande toegankelijke data; geen accountwijziging. | Bron/land/periode bij volume. | DATA |
| C-025 | 68–71: Kansen sorteren naar haalbaarheid bij de huidige autoriteit | B; M. Gebruik daadwerkelijke SERP/concurrentkwaliteit, scores indicatief. | Motivering per prioriteit. | INTENT |
| C-026 | 76–79: keywords.md: patroon, query, volume, paginatype, bestaande URL; ontbrekend = n/a | B; U/M. Voeg een traceerbare vraagmatrix aan het plan toe. | Elke query heeft URL en expliciete onbekenden. | DATA |
| C-027 | 82: SaaS-alternatieven eerst: alternatief, gratis of goedkoper | D, ander bedrijfstype; U. Geen leveranciersalternatieven zonder eigen vergelijkingsnut. | Geen SaaS-paginafabriek. | SCOPE |
| C-028 | 83: Vergelijkingen moeten eerlijk zijn over punten waarop je verliest | B bij toekomstige toestelkeuze; E. Geen verzonnen vergelijkingsrijen. | Nadelen met bewijs zichtbaar. | CONTENT |
| C-029 | 84: Integratiepagina's gebruiken het zoekvolume van andere merken | D; U. Merkdienstpagina's zijn geen software-integraties. | Geen integraties geclaimd. | SCOPE |
| C-030 | 85: Pagina's voor voorwaarden alleen als het aanbod eraan voldoet | B; E. “Gratis”, zonder abonnement, erkend enzovoort alleen met bewijs. | Elke genoemde voorwaarde onderbouwd. | CONTENT |
| C-031 | 86: Prijspagina's pas na opbouw van autoriteit | D als universele volgorde; U. Tarievenpagina bestaat; offertefactoren zijn nu nuttig. | Geen prijs verzonnen. | INTENT |
| C-032 | 87: Pagina's voor de taak die de klant wil uitvoeren | B; U. Onderhoud, herstelling en installatie ondersteunen echte klanttaken. | Dienst en volgende stap duidelijk. | CONTENT |
| C-033 | 88: Probleemvragen hebben lagere intentie en later rendement | B; U. Bestaande fout- en adviesgidsen koppelen aan hulp. | Geen belofte voor maand zes. | CONTENT |
| C-034 | 89: Featurepagina's alleen bij aantoonbaar leiderschap | B; E. Geen onbewezen superlatieven/innovatieclaims. | Claim onderbouwen of neutraler formuleren. | CONTENT |
| C-035 | 90: Pagina's voor bedrijfsgrootte zijn vaak bijna-duplicaten | R generieke doelgroepvarianten; U/E. | Geen pagina die slechts drie woorden wisselt. | CONTENT |
| C-036 | 95–97: Haalbare commerciële niches en voorsteden vóór brede hoofdtermen | B; U/M. Onderbouw dienst- en regiovraag; geen gemeentevolume raden. | Echte SERP en passend aanbod. | INTENT |
| C-037 | 95: Eigen strategie: versuspagina's eerder dan Semrush-alternatieven | K bedrijfsspecifiek; geen bewijs van AB-concurrentie. | Geen overgenomen kanspercentage. | DATA |
| C-038 | 99–104: Generatorstartup rankte nooit; nieuw merk en massapublicatie | K anekdote; E. Kwaliteitscontrole is nuttig, oorzaak is niet bewezen. | Geen crawlbudgetdiagnose zonder logs. | OPS |
| C-039 | 107–114: Bestaande query-URL eerst; cannibalisatievoorbeeld van positie 7/8 naar 3 | B; U/M. Controleer gekoppelde GSC-query/pagina's, niet elk dubbel woord. | Bewezen eigenaarschap per intentie. | INTENT |
| C-040 | 112: Claim: impressies betekenen een positie in de top 10 | R gevolgtrekking; M. Impressies bewijzen geen top 10. | Positie uit export, apart genoteerd. | DATA |
| C-041 | 115: Andere top-5-queries van de nummer-1-URL clusteren | D/B; M. Alleen betrouwbare actuele gegevens per URL en query. | Geclusterde intentie geverifieerd. | DATA |
| C-042 | 117: Titel bevat primaire en secundaire query; overige ruimte voor de klik | A/B; T. Test een leesbare titel zonder keywordstuffing. | Relevante titel en preview. | TECH |
| C-043 | 118: Metabeschrijving verkoopt de klik; weinig direct rankingeffect | B/K; T. Schrijf feitelijke aantrekkelijke samenvatting. | Meta klopt met pagina. | CONTENT |
| C-044 | 120–135: page-brief: live top 10, top-3-secties en keuze nieuw of verbeteren | B; U/M. Brief vóór code, met echte URLs en intentie. | Brief noemt de bedoelde URL en bronnen. | CONTENT |
| C-045 | 131–132: Clicks of impressies op een bestaande URL blokkeren een nieuwe pagina | B met nuance; M. Onderzoek intentieverschil vóór een nieuw voorstel. | Cannibalisatiebesluit gemotiveerd. | INTENT |
| C-046 | 133–135: Primaire query in titel, SERP-preview en opgeslagen briefslug | B; T. Nu alleen planning; toekomstige brief en opslag benoemen. | Traceerbare opgeslagen brief. | CONTENT |
| C-047 | 136: Anekdote over een onverwachte canonical op de Lyon-pagina | B controle; T. Canonical inspecteren, geen AB-fout aannemen. | Canonical vergelijken met verwachte URL. | TECH |
| C-048 | 138–139: Top 3 analyseren op keuze, kosten, proces en resultaattermijn | B; H/U/E. Beschrijf scope en offerte; geen resultaattermijn beloven. | Alle echte beslisvragen beantwoord. | CONTENT |
| C-049 | 140: Het gezicht van de echte dienstverlener tonen | D; P/E. Alleen met bewijs van identiteit en toestemming. | Geen synthetische medewerker. | CONTENT |
| C-050 | 140,146: Quiz met drie vragen als onderscheid | A/B; V. Bestaande tool bruikbaar; aantal is geen SEO-eis. | Uitslag helpt klant zonder poort. | CONTENT |
| C-051 | 142–144: Scaled-contentbeleid geldt voor AI en mensen; kwaliteit telt | B; E. Publicatiebeleid toepassen; bron is geen juridische vrijbrief. | Unieke nuttige inhoud per URL. | CONTENT |
| C-052 | 145,151: Op iedere pagina minstens één origineel onderdeel | B doel, R mechanisch quotum; E. Werkelijke extra waarde toetsen. | Waarde beschreven, geen gimmick. | CONTENT |
| C-053 | 147: Calculator of simulator als eigen toevoeging | A/B; V. Onderhoudscheck bestaat; Nieuwe tool alleen wanneer die een echte beslissing helpt. | Formule/grenzen/bron zichtbaar. | CONTENT |
| C-054 | 148: Eigen data of tabel met werkelijk opgehaalde cijfers | D; P/M. Geen volumes, besparingen of klantcijfers fabriceren. | Bronbestand en berekening aanwezig. | CONTENT |
| C-055 | 149: Echte foto's van werk, team of plaats | A; P. Hergebruik alleen passend, geen lokale case afleiden. | Herkomst/toestemming/context klopt. | CONTENT |
| C-056 | 150: Video als eigen toevoeging | D; P. Optioneel echte uitleg, niet vereist op elke route. | Echte opname met toestemming. | SOCIAL |
| C-057 | 153: Eén H1 met primaire query; passende H2/H3-structuur | A/B; T/H. Semantische headings controleren; geen geforceerde exacte query. | Eén beschrijvende H1. | TECH |
| C-058 | 154,175: Schema laten passen bij live URL, datum, auteur en zichtbare inhoud | A; T/E. Bestaande graph inspecteren; geen publicatiedatum gokken. | Markup correspondeert met zichtbare feiten. | TECH |
| C-059 | 155: Minimaal vijf inkomende links uit de tekst van verwante pagina's | B relevantie; R vast minimum. U/T. Link vanuit zinvolle verwante pagina's. | Geen orphanpagina; links zijn nuttig. | TECH |
| C-060 | 156: Claim: een menulink vertelt Google niets | R absolute claim; T. Menu en contextlinks beiden bruikbaar. | Bereikbare navigatie plus context. | TECH |
| C-061 | 160–166: Bestaande pagina als ontwerp-, CTA-, FAQ- en interactieve template | A; H/V. Bestaande componenten bewaren; HTML-kopie niet nodig. | Templatevarianten behouden functie. | CONTENT |
| C-062 | 167–173: Procesbestand voor elke pagina; exacte ankerteksten | A/B; E/U. Beleid en checklist aanvullen in plan; natuurlijke ankerteksten. | Reviewer volgt dezelfde controles. | OPS |
| C-063 | 174: Naar het Frans vertalen en koppelen met hreflang | D; N/E. Geen Frans aanbod of vertaling zonder eigenaar- en kwaliteitsbewijs. | Equivalenten/taal-QA vóór publicatie. | TECH |
| C-064 | 176,180–183: Sitemap bij elke publicatie; een CMS-plugin kan achterblijven | A; S/U. Registrystatus bepaalt sitemap; wijziging toetsen. | Alleen bedoelde gepubliceerde URLs. | TECH |
| C-065 | 177: Bij elke publicatie indexering aanvragen in GSC | D; M. Alleen juiste eigenaarproperty; aanvraag is geen garantie. | Inspectiestatus apart van aanvraag. | DATA |
| C-066 | 184–190: Quiz en tabellen verdwenen bij een herschrijving | B; H/V. Controleer behoud van inhoud en functies in de diff. | Ontbrekende elementen expliciet gemeld. | OPS |
| C-067 | 192–199: ship-page: brief, template en origineel onderdeel | B; E/U/H. Plan specificeert kwaliteitscontrole; geen skillinstallatie. | Brief naar pagina traceerbaar. | OPS |
| C-068 | 200–206: Voor/na-controle: tabellen, rankings, formulieren, quizzen, embeds, beelden en links | B; H/V/P. Inventariseer vóór/na en reden voor verandering. | Alle functies behouden of besluit vastgelegd. | OPS |
| C-069 | 204–205: Eerst branch of draft; goedkeuring vóór publicatie | B; E. Deze planning voert geen deployment uit. | Geen live wijziging uit bronprompt. | OPS |
| C-070 | 208–211: Eerst zorgvuldige referentiepagina, daarna twintig of veertig varianten | B referentie, R schaaldoel; U/E. Kwaliteitsbenchmark per patroon. | Elke variant eigen bestaansreden. | CONTENT |
| C-071 | 211,316: Waarschuwing voor city swaps en doorway-funnels | B; E/U/P. Geen stadsvarianten zonder unieke waarde. | Plaatsclaims bewijsbaar en nuttig. | LOCAL |
| C-072 | 211: Lokale feiten, prijzen, voorbeelden en testimonials als eigen waarde | D; P/E. Feiten alleen officiële/eigenaarbronnen, geen reviews verzinnen. | Individuele bewijsketen. | LOCAL |
| C-073 | 213–220,608: Ritme: twee EN- en twee FR-pagina's, of twee nieuwe pagina's per week | D; U/E. Tempo op kwaliteit en capaciteit baseren, geen quota. | Menselijke QA vóór iedere release. | OPS |
| C-074 | 218–219: Auteursgroei: 0 → 3.000 bezoeken, met dip van 1.500 naar 750 | K anekdote, niet voorspellen. M. | Geen AB-resultaat eraan gekoppeld. | DATA |
| C-075 | 220–221: Claim over publicatievolatiliteit; nieuwe site maximaal één pagina per dag | K/R algoritmeverklaring en universeel maximum; E. Gebruik reviewcapaciteit. | Geen rankinggarantie door publicatieritme. | OPS |
| C-076 | 223: Claim: een tweede taal kost bijna niets | R onvolledige kostenclaim; E. Review/onderhoud/bediening begroten. | Werkelijke taalcapaciteit bewezen. | SCOPE |
| C-077 | 224: Claim: ccTLD kan geen meertalige SEO; gebruik .com met subdirectories | R absolute claim en domeinmigratie; N. Behoud .be; talen later op nut beoordelen. | Geen domeinwissel uit cursus. | SCOPE |
| C-078 | 225: Taalwisselaar naar equivalent; correcte html lang en hreflang | A voor lang nl-BE; D voor hreflang zonder vertaalpaar. T/N. | Alleen echte wederkerige equivalenten. | TECH |
| C-079 | 228: Auteursgroei: 1.500 → 15.000 clicks in drie maanden zonder nieuwe artikelen | K bedrijfsspecifieke groei; M/E. Geen AB Service-forecast of causaliteitsbewijs. | Geen overgenomen groeifactor. | DATA |
| C-080 | 231–235: Selectie: nul clicks en minder dan 50 impressies in 90 dagen; sluit jonger dan drie maanden uit; delete/merge/rewrite | D; M/E. Kandidaten met echte data, gebruikersnut en leeftijd onderzoeken. | Individueel beargumenteerd besluit. | INTENT |
| C-081 | 238–244: Werkelijke query verwerken in H1, meta, eerste 100 woorden en inhoud | B; M/T. Intentie controleren, het volledige antwoord aanpassen. | Query past bij echte dienst. | CONTENT |
| C-082 | 245–247: Positie 8–15 onderscheiden van positie 1–3 met lage CTR/AI Overview | B diagnose; K waarschijnlijkheid. M. Actuele SERP controleren. | Oorzaak onderbouwd vóór wijziging. | DATA |
| C-083 | 248–251: Beoogde versus werkelijke query, positie en CTR naast voorstel | D/B; M. Exports met URL/queryparen nodig. | Werkelijke data naast voorstel. | DATA |
| C-084 | 252–255: Themahubs en clusterlinks; snoeien → heroriënteren → hergroeperen | A voor hubs, U; B herstructureren pas bij bewezen nut. | Gebruikerspad en URL-mapping behouden. | INTENT |
| C-085 | 257–259: Jev SEO/Agrici: verwijderveto vanaf 600 woorden | B veto; R woordgrens als kwaliteitsbewijs. E. Menselijk besluit over verwijdering. | Geen verwijdering op modeladvies alleen. | OPS |
| C-086 | 261–263: Claim: lokale top 3 in Maps; plaats 4 is pagina 2 en niemand scrolt | B GBP-prioriteit; R absolute gedragclaim. B/M. | Profiel- en websitewerk apart. | LOCAL |
| C-087 | 264–267: Lokale factoren: nabijheid, relevantie en autoriteit | B; B/E. Echte informatie/reviews, geen adresmisrepresentatie. | Geen afstandmanipulatie. | LOCAL |
| C-088 | 268: Claim: concurrenten verwaarlozen hun profiel | K; B. Niet aannemen; actuele publieke audit uitvoeren. | Waarneming met profiel-URL en datum. | LOCAL |
| C-089 | 270: Rankmap van 13 × 13; kleur voor posities 1–3 en 4–10 | D; M. Alleen echte export met grid, radius, query en periode. | Reproduceerbaar meetrooster. | LOCAL |
| C-090 | 271,273–280: Top-3% = punten in top 3 / gemeten punten; zwakke zones en posities 4–6 apart | D; M. Percentage uit echte export; zwakke zones en punten op positie 4–6 rapporteren. | Teller, noemer en ontbrekende punten zichtbaar. | LOCAL |
| C-091 | 284: Maximaal tien categorieën; minimaal twee tot vier | D/R quota; B/E. Actuele categorieën kiezen die bij echte diensten passen. | Geen fictieve categorie. | LOCAL |
| C-092 | 285: Minimaal twintig services; dertig tot veertig in een concurrerende stad | R quota; B/U. Alleen echte servicecatalogus, geen redundante uitbreiding. | Iedere service werkelijk aangeboden. | LOCAL |
| C-093 | 286: Profielbeschrijving van 750 tekens | D; B. Feitelijk beschrijven binnen actuele platformlimiet. | Leesbaar en juiste scope. | LOCAL |
| C-094 | 286: Minimaal twintig foto's | R quota; P/B. Kwaliteit/toestemming boven aantal. | Alleen echte relevante beelden. | LOCAL |
| C-095 | 286: Alle profielattributen aanvinken | R; E/B. Alleen daadwerkelijk geldende attributen. | Geen onjuiste toegankelijkheidsclaim. | LOCAL |
| C-096 | 286: Elke week een GBP-post | D; B. Kalender voorstellen, geen accountposts nu. | Feitelijke inhoud en eigenaarcapaciteit. | LOCAL |
| C-097 | 287–288: Model kan niet-bestaande categorieën verzinnen | B; B. Actuele officiële keuze of waarneming vereist. | Exacte naam uit echte lijst. | LOCAL |
| C-098 | 288: GMB Everywhere voor categorieën van concurrenten | D optioneel; B. Geen installatie of betaalde call. | Tooldata met bron, datum en geschiktheid. | SCOPE |
| C-099 | 290–296: Eén primaire en twee tot negen secundaire categorieën uit echte lijst; geen niet-aangeboden diensten | B correctheid; R quota. E/B. | Iedere keuze feitelijk gemotiveerd. | LOCAL |
| C-100 | 298: Reviewtekst over dienst/stad is rijker dan “great”; vraag welk werk werd uitgevoerd | D/B; B/E. Neutrale echte feedback, geen scripts of keyworddruk. | Geen incentive, reviewgating of ingevulde review. | LOCAL |
| C-101 | 299–302: GBP verwijst meestal naar homepage; categorie + stad in titel/H1 | A titel; H1 verschilt, H. B intentieaudit, geen blind exacte match. | Homepage klopt met servicegebied. | LOCAL |
| C-102 | 303: Google Maps-embed van het echte profiel | D; B/H. Nut, privacy en performance toetsen; profielkoppeling bestaat. | Juiste SAB-profiel, geen schijnadres. | LOCAL |
| C-103 | 304: Secundaire categorieën als H2 | B met nuance; H/U. Dienstrubrieken in klanttaal. | H2s weerspiegelen echt aanbod. | LOCAL |
| C-104 | 305: Widget met echte Google-reviews | A; B. Eerlijke weergave van upstreamgegevens of neutrale fallback. | Geen verzonnen individuele reviews. | LOCAL |
| C-105 | 306: Adres exact zoals op het profiel | R bij verborgen SAB-adres; B/E. Alleen toegestaan echt adres publiceren. | Geen privé-adres of misrepresentatie. | LOCAL |
| C-106 | 307: Telefoon exact zoals op het profiel | B; B. Consistent nummer; presentatieformaat kan verschillen. | Hetzelfde bereikbare internationale nummer. | LOCAL |
| C-107 | 308: Een generieke “Home”-titel verbeteren | A; U. Titel is al specifiek, geen fictieve fout aannemen. | Huidige feitelijke titel gecontroleerd. | TECH |
| C-108 | 309–311: Core 30: website spiegelt categorieën en services van het profiel | R quotum van dertig; A U. Passend aanbod inventariseren, geen doel van dertig pagina's. | Elke URL heeft unieke intentie. | LOCAL |
| C-109 | 311: Contextuele links naar onderliggende pagina's; schrijfvolgorde op volume | A/B; U. D; M voor volumes. Zakelijke waarde gebruiken zolang vraag onbekend is. | Natuurlijke links en bron bij volume. | INTENT |
| C-110 | 313: Rankmap na dertig dagen en concurrenten vergelijken; leider als plafond, drempel van 25–50% | D meetidee; R bewezen plafond of drempel. M. | Eigen meetplan zonder vaste belofte. | LOCAL |
| C-111 | 314: Onder de drempel: pagina's met echte klantvragen | A; U/V. B echte klantvragen en nut, geen expertise-scoreclaim. | Vraag en passende vervolgservice. | CONTENT |
| C-112 | 315–316: In gele zones: buurten, landmarks, woningen, problemen en werkelijke routes | D; U/P/E. Geen woning-/routeanekdotes verzinnen. | Plaatsspecifiek bewijs vóór route. | LOCAL |
| C-113 | 318–319: Claims: zwak domein op positie 40; zes maanden geen erkenning | R vaste ranking of termijn; M. Werkelijke indexering en positie observeren. | Geen sandboxgarantie. | DATA |
| C-114 | 320: Ahrefs DR/Semrush AS zijn schattingen; GSC-clicks op zakelijke queries belangrijker | B; M/L. Scores indicatief; gekwalificeerde leads belangrijker. | DR niet als Googlemaatstaf. | DATA |
| C-115 | 323: Auteursgroei: DR onder 10 naar ongeveer 55 | K; geen AB-benchmark. | Geen doel-DR hieruit. | DATA |
| C-116 | 324–326: Dertien linkroutes van gratis naar betaald; niet beginnen met een link van €50 | B verdiende vermeldingen; R rankinglinkkoop. E. | Backlog begint bij echte relaties. | LINKS |
| C-117 | 329: Ongekoppelde vermeldingen in roundups, nieuwsbrieven, forums, podcasts en tooloverzichten | D/B; B. Echte AB-vermeldingen zoeken; contact als voorstel. | Bron-URL en feitelijke vermelding. | LINKS |
| C-118 | 330: Links naar verdwenen nichesites vervangen | D; E. Alleen nuttige vervangende bron; geen automatische scraperoutreach. | Dode link en equivalent gecontroleerd. | LINKS |
| C-119 | 331–334: Axels ervaring als ontvanger; ChatSEO-prompt voor gratis backlinks | K/D toolroute; geen contact uitgevoerd. | Geen ongelezen backlinkinventaris. | LINKS |
| C-120 | 337–341: Rankingwebsites benaderen via echt contact; vraag om een aanvullende link | D; E. Concrete shortlist en concepten bij toestemming; geen mail nu. | Echt publiek contact en relevantie. | LINKS |
| C-121 | 341: Voorbeelden: fotografen, lokale bedrijven, gemeentehuis en département | B lokale partner- en gemeentebronkans; geen recht op een link. | Relatie en redactioneel nut aantoonbaar. | LINKS |
| C-122 | 343–347: Roundupfilters: top 20, update binnen twaalf maanden, minstens één concurrent vermeld | B heuristiek; M. Relevantie en actualiteit vastleggen; geen harde grens als bewijs. | Actuele pagina gelezen. | LINKS |
| C-123 | 348–351: Pitch met gratis account zonder creditcard | D SaaS-script past niet. AB-dienst niet als gratis trial aanbieden. | Geen fictieve accountaanbieding. | SCOPE |
| C-124 | 352: Een vermelding zonder link kan GEO ondersteunen | B als observatiehypothese; GEO geeft geen garantie. | Vermelding feitelijk vastgelegd. | GEO |
| C-125 | 353–358: Drie vergelijkbare concurrenten, gezamenlijke linkbronnen en contacttabel | D/B; M. Alleen echte publiek geverifieerde namen en e-mailadressen. | Geen verzonnen e-mailadressen. | LINKS |
| C-126 | 360: Prospects uit rankings, concurrentlinks en eigen vermeldingen | D; M. Eerst een read-only shortlist. | Iedere prospect heeft bron en reden. | LINKS |
| C-127 | 361: Instantly, lookalike-domein en ongeveer twintig dagen warm-up | R als auditactie; spam, reputatierisico en nieuw account niet nodig. | Geen lookalike-domein of e-mailaccountsetup. | SCOPE |
| C-128 | 362: Eén e-mail en twee opvolgberichten | D, geen verzendrecht. Eventueel een beleefde beperkte contactstrategie. | Geen automatische berichtenreeks. | LINKS |
| C-129 | 363: AI leest reacties, maakt concepten; eigenaar keurt goed | D, geen mailboxtoegang. | Geen private mailboxgegevens verwerkt. | OPS |
| C-130 | 364–365: Vijf e-mails per dag, tien per uur of vijfhonderd in drie dagen; snel reageren | R quota en machine; B tijdig reageren op echte aanvragen. | Geen bulkoutreach. | LINKS |
| C-131 | 368–370: Eigen listicles met concurrenten gebruiken voor wederzijdse vermelding | D eerlijke gids; R rankingdeal als doel. E. | Redactionele keuze zonder tegenprestatie. | LINKS |
| C-132 | 371–372: Excessieve linkruil is spam; zou je de ander zonder tegenprestatie opnemen? | B; E. Relevante onafhankelijke verwijzingen, geen linkring. | Wederkerigheid geen voorwaarde. | LINKS |
| C-133 | 374–376: Citeerbare gratis tool; claims dat homepage niet citeerbaar is en kloon binnen een week | A; V. R absolute claim en kloontermijn. Tool als nuttige bron gebruiken. | Onderbouwde bruikbare uitslag. | LINKS |
| C-134 | 377: Infographic met eigen statistiek | D; E/P. Geen statistiekdecoratie; officiële data mag met bron. | Dataherkomst en context zichtbaar. | CONTENT |
| C-135 | 378: Eigen data publiceren vóór opbouw van publiek | D; P/L. Alleen echte geanonimiseerde data en meetmethode. | Toestemming, privacy en geen verzonnen cijfers. | CONTENT |
| C-136 | 380: Reddit, YouTube, Medium en LinkedIn-artikelen op autoriteitsdomeinen | D/B; SOCIAL. Kies waar de lokale doelgroep werkelijk zit. | Geen plaatsingsclaim zonder publicatie. | SOCIAL |
| C-137 | 381,544: Eén reviewplatform: GBP voor lokaal, Trustpilot voor SaaS | A; B. B focus op echte Google-feedback. | Geen extra fictieve reviewprofielen. | LOCAL |
| C-138 | 382: Evenementen en regionale pers; homepagelinks versus links naar specifieke pagina's | D. Alleen echte evenementen en nieuws, geen PR-fabricatie. | Werkelijke gebeurtenis en bron. | LINKS |
| C-139 | 383: Bylines bij Les Echos/Journal du Net; afhankelijkheid van één redacteur | B caveat; D echte deskundige bijdrage. | Publicatie en relatie authentiek. | LINKS |
| C-140 | 384: Gesponsord Medium-artikel, Reddit en review als verklaring voor DR | K; causaliteit en AB-recept niet bewezen. | Geen ROI-belofte. | LINKS |
| C-141 | 385–386: Nieuwswaardig product als basis; vermenigvuldigen met nul helpt niet | B; E/V/P. Nuttige dienst, tool of echt werk boven publiciteitstruc. | Publicatie heeft een echt verhaal. | CONTENT |
| C-142 | 388–392: Betaalde rankinglinks schenden beleid; sponsored/nofollow, korting en zwakke resultaten | R rankinglinkkoop; B transparante advertentie indien later gekozen. | Geen dofollowkoop of rankinggarantie. | LINKS |
| C-143 | 393: Advies om buiten de linkhandel te kopen | R als rankingadvies. Sponsoring alleen voor echte advertentiewaarde. | Geen verborgen betaalde SEO-deal. | LINKS |
| C-144 | 395: Verkeersontwikkeling over twaalf maanden beoordelen | D onderzoekscriterium, geen kooptoestemming. | Verifieerbare gegevens, geen garantie. | LINKS |
| C-145 | 396: Echt verkeer over relevante onderwerpen | B relevantiecriterium voor verdiende bron. | Thematische aansluiting gelezen. | LINKS |
| C-146 | 397: Pagina versus domein: DR 70 met nul paginabezoeken | B paginakwaliteit; K claim over linkwaarde. | Geen selectie alleen op autoriteitsscore. | LINKS |
| C-147 | 398: Homepage met betaalde featured slots in ongerelateerde categorieën | B spamwaarschuwing. | Irrelevante plaatsingssite afwijzen. | LINKS |
| C-148 | 399: Claim: link van €50 is honderdmaal verkocht | K prijs is geen bewijs; E. Geen koop. | Geen veiligheidsclaim op basis van prijs. | LINKS |
| C-149 | 400–401: Linkprofielpatroon: top 3 heeft twee tot vier links, jij twintig | K/R numerieke grens; M. Geen linkquotum nabootsen. | Geen SERP-backlinkdiagnose zonder data. | LINKS |
| C-150 | 403: Externe 100% exacte anchors als afwijking; intern exacte anchors toegestaan | B natuurlijke ankerteksten; R “beste links exact” als truc. | Ankertekst legt bestemming duidelijk uit. | LINKS |
| C-151 | 404: Eén TLD; tweetalige .com-site kwam pas verder met .fr/.org-links | K/R TLD-diversiteitsquota. Belgische bronnen op relevantie beoordelen. | Geen kunstmatig TLD-pakket. | LINKS |
| C-152 | 405: 100% WordPress als vermeend verkoopsitepatroon | K; CMS bewijst geen spam. | Kwaliteit en context zelfstandig beoordelen. | LINKS |
| C-153 | 406–407: Geen nofollow-links; een te “schoon” profiel als afwijking | K/R opzettelijk spam of nofollow-links werven. | Geen gefabriceerd natuurlijk profiel. | LINKS |
| C-154 | 409–411: Historisch 4.000 backlinks/787 domeinen versus live 1.400/651; circa twee derde verdwenen | K/B onderhoudscaveat. Waardevolle bestaande vermeldingen periodiek controleren. | Dode of verloren bron aantoonbaar. | LINKS |
| C-155 | 413–415: Paul in AI-antwoord met bron van een derde | K case; B protocol voor bronobservatie. | Geciteerde URL en datum vastgelegd. | GEO |
| C-156 | 416–418: Zoekquery achter de prompt; onderzoek met één miljoen prompts per maand/vijf miljoen antwoorden | B hypothese; K onderzoeksomvang. Geen scrapingonderzoek uitgevoerd. | Prompt en werkelijk zichtbare bron apart. | GEO |
| C-157 | 420: Claim: bronvermelding betekent websearch, geen bron betekent training | R binaire universele gevolgtrekking. | Alleen geobserveerde bronophaling claimen. | GEO |
| C-158 | 421: Claim: trainingsachterstand van achttien maanden; nieuw merk kan er niet in zitten | R vaste achterstand en absolute claim. | Geen modeltrainingsdatum verzonnen. | GEO |
| C-159 | 422: Claim: ChatGPT gebruikt Google en volgt rankings nauw | K, niet universeel bewezen. | Provider en antwoord per sessie vastgelegd. | GEO |
| C-160 | 423: Claim: vijftig roulerende bronnen, tien tot vijftien per antwoord, maandelijkse wissel | K specifieke onderzoeksclaim. | Geen AB-citatiequota. | GEO |
| C-161 | 424–425: Voorbeeld: vijf verwijzende domeinen/tweehonderd citaties versus tweehonderd domeinen/geen citaties | K anekdote; B relevantie eerst. | Geen garantie dat autoriteit irrelevant is. | GEO |
| C-162 | 427–429: Twee tot vijf fan-out-queries; judo-rugpijnprompt wordt matrasquery voor 2026 | B queryhypothese; K aantal en voorbeeld. Geen medisch advies overnemen. | Fan-out niet als echte logs presenteren. | GEO |
| C-163 | 431: Querypatroon: “best + money keyword + year + country” | B testfamilie, geen queryfabriek. | Echt antwoord en bron per test. | GEO |
| C-164 | 432: Franse prompt wordt in Frans en Engels gezocht | K/B taalhypothese; AB-testcontext NL/BE. | Geen automatische Franse content. | GEO |
| C-165 | 433: Merkreviews en alternatieven voor concurrenten | B reputatiequery; D alternatiefquery voor loodgieter. | Relevante lokale klantprompt. | GEO |
| C-166 | 434: Fan-out met site:-filter voor overheid en Wikipedia | K; B officiële bronnen als kennisbasis, geen verzonnen citatie. | Citatie feitelijk geobserveerd. | GEO |
| C-167 | 435–452: geo-queries: tien commerciële queries, twee talen, drie concurrenten, tabel en geen gegokte rankings | D/B; M. Beperkte testmatrix met onbekenden en echte bron-URLs. | Geen verzonnen volume of ranking. | GEO |
| C-168 | 453: Rankinglisticles als prospectlijst | B hypothetische shortlist; geen citatiegarantie. | Werkelijk gelezen bron en relevantie. | GEO |
| C-169 | 455–456: Geen extra AI-bestanden/markup of llms.txt-sprint; actuele crawlbare tekst | B; T/S/E. Geen llms.txt-sprint als voorwaarde. | Technische en inhoudelijke basis aantoonbaar. | TECH |
| C-170 | 458–468: Zelf op nummer 1: werkte vroeger, model discount en vertrouwensafweging | K mechanisme; B eerlijkheid. Geen AB-zelfranking waargenomen. | Geen gefingeerde “beste AB”-lijst. | GEO |
| C-171 | 470–481: self-rank-audit: best/top/year, clicks over 90 dagen, merits, één pagina en diffcontrole | D/B; U/M. Auditkandidaat is niet automatisch fout; zakelijke waarde behouden. | URL, rangreden, data en besluit. | CONTENT |
| C-172 | 482: Geen omzet op het spel zetten voor een mogelijke citatie | B; L/M. Eerst passende zakelijke uitkomst meten. | Geen blind herschrijfbudget. | OPS |
| C-173 | 484–485: Derdenranking tienmaal meer waard dan eigen ranking; restaurantanalogie | B onafhankelijke bewijswaarde; K factor tien. | Geen 10×-citatiebelofte. | GEO |
| C-174 | 487–489: Convertix-rankingruil en uitgelogde citatie in podcast | K case; R afgesproken aanbevelingen als SEOmachine. | Onafhankelijke eerlijkheid zonder deal. | LINKS |
| C-175 | 491: Jaarlijks actualiseren en nieuw jaar in titel | B inhoudscontrole; R cosmetische jaaraanpassing. | Inhoud werkelijk geactualiseerd. | CONTENT |
| C-176 | 492: Minstens twintig queries zouden een rankingruil waard zijn | R quotum en ruildoel; M/E. | Geen twintig afgesproken rankings. | LINKS |
| C-177 | 493: Eigen ranking via briefing publiceren; niet de eigen categorie | D; E. Geen irrelevante partnerroundup voor wederdienst. | Echt lezersnut en transparantie. | CONTENT |
| C-178 | 496: Netwerklink van €7 met één maand vermeend GEO-rendement | R PBN, rankinglinkkoop en betaalde citatie. | Geen budget of aankoop. | LINKS |
| C-179 | 497: Gastartikel bij echt bedrijf, niet een verkoper van zichtbaarheid | D/B nuttige deskundige bijdrage; geen betaalde rankinglink. | Onafhankelijke redactie en disclosure. | LINKS |
| C-180 | 498: Nichemedia voor digitale PR vóór grote landelijke media | D; P/E. Echte relevante nieuwswaardige bijdrage. | Geen verzonnen PR-project. | LINKS |
| C-181 | 499: Auteur worden op een vertrouwd domein | D; E. Alleen echte expertise en identiteit. | Auteurschap en byline verifieerbaar. | LINKS |
| C-182 | 502–504: Citatie van €1.000–2.000 versus €10–20, één tot drie maanden; PBNs gebagatelliseerd | R koopadvies; K prijs- en rotatieresultaten. | Geen citatiegarantie of betaald netwerk. | LINKS |
| C-183 | 505: Dezelfde outreachmachine: vijf e-mails per dag | R automatische outreach; E. | Geen externe mails verzonden. | SCOPE |
| C-184 | 507–509: Redditpercentages: Perplexity 46,7%, Gemini 3%, Frans ChatGPT 30 → 9 → 5% | K bron-, engine- en tijdgebonden. Geen AB-kanaalkeuze op getal alleen. | Claim als ongeverifieerd gelabeld. | GEO |
| C-185 | 511–514: Vijftig vragen in klanttaal bedenken en tien selecteren | B; U. AB-klantvragen uit echte diensten; voorbeelden zijn hypothesen. | Geen gefingeerd klantonderzoek. | GEO |
| C-186 | 515–516: Uitgelogd testen voor het antwoord van een onbekende gebruiker | B beperkte standaardisatie; taal, locatie en datum blijven verschillen. | Testcontext volledig vastgelegd. | GEO |
| C-187 | 517–519: Geciteerde bronnen lezen; meestal vier/vijf threads, concurrent in drie | B echte bronnen lezen; K vaste aantallen. | URL en citatiecontext werkelijk geobserveerd. | GEO |
| C-188 | 520–521: Fan-out-deelvragen als minder omstreden zoekkans | D/B testhypothese; geen claim over echte verborgen queries. | Afgeleide vraag als hypothese. | GEO |
| C-189 | 522–524: Eigen belang benoemen en uitleggen wanneer je aanbod de verkeerde keuze is | B; E. Authentieke behulpzame uitleg, geen fictieve persona. | Identiteit en belang helder. | SOCIAL |
| C-190 | 525: Eén thread per twee/drie dagen, niet tien tegelijk | D ritme is geen toestemming. Relevant reageren bij echt nut. | Geen quota of spam. | SOCIAL |
| C-191 | 527–530: Subreddits kiezen die al op tien beste verkeersqueries ranken | D; M. Actuele relevante Belgische communities onderzoeken. | Publieke URL en regels gelezen. | SOCIAL |
| C-192 | 531: Tien karma, vijf comments per dag, drie dagen warm-up; regels lezen | B regels; R kunstmatige karma-warm-up. | Geen accountmanipulatieplan. | SOCIAL |
| C-193 | 532–536: Claim: domein twee slots, merk zes; prioriteit op niet-websiteformats in SERP | R maxima; B zichtbare SERP-formats als kanaalkans. | Geen gegarandeerd schermbezit. | GEO |
| C-194 | 538: Eén YouTube-video per query, tweemaal indexeren, reviewtitel met jaar, 200 woorden en antwoord in eerste twee regels | D video-idee; R quota en dubbele-indexeringsgarantie. E. | Echte hulp, juiste titel en beschrijving. | SOCIAL |
| C-195 | 539: Drie Shorts voor verschillende queries, TikTok-caption; case 99,3% search en 0% For You | D hergebruik; K case en verhouding. | Eigen kanaalgegevens expliciet onbekend. | SOCIAL |
| C-196 | 540: Listicle op LinkedIn/X met exacte query in de eerste regel | D natuurlijke nuttige post, geen keywordstuffing. | Publicatie helpt de doelgroep. | SOCIAL |
| C-197 | 541: Reageren met disclosure in een thread die je niet kunt outranken | D/B; E. Geen promotionele standaardreactie. | Helpend antwoord en regels gevolgd. | SOCIAL |
| C-198 | 543: Drie/vier kanalen per sector: food op Instagram, B2B op LinkedIn, software op GitHub | B focus; D netwerkkeuze op echte lokale doelgroep. | Kanaalfit en capaciteit uitgelegd. | SOCIAL |
| C-199 | 545: Wikipedia-verzoek afgewezen; encyclopedische relevantie elders opbouwen | D; geen acquisitieplatform voor AB. | Geen fictief profiel of gefabriceerde encyclopedische relevantie. | SCOPE |
| C-200 | 546: Concurrent eerlijk beoordelen, inclusief eigen verliezen, vóór de pitch | B transparante inhoud; D vergelijking indien nuttig. | Geen advertentie als neutrale review. | CONTENT |
| C-201 | 548–551: GEO rouleert, SEO werkt trager; claim van opzettelijke vertraging | K verklaring; B langer meetvenster. | Geen causaliteitsclaim zonder data. | OPS |
| C-202 | 552,570,612: Dip normaal; zestig dagen niet wijzigen | R blind wachten bij fouten; B wijzigingslog en stabiliteit. E/M. | Bugs direct oplossen; SEOeffect op passend venster. | OPS |
| C-203 | 553,571–572: Goede pagina na negentig dagen: betaalde of andere linkkandidaten | R koopfase; B verdiende bronkansen na inhoudskwaliteit. | Wachten is geen koopautorisatie. | LINKS |
| C-204 | 554: Nieuw domein: zes maanden; daarna nieuwe pagina's direct top 5 en versnellen | K/R garantie en termijn; M. | Geen vast rankingmoment in plan. | DATA |
| C-205 | 557–563: weekly-seo: laatste 28 versus vorige 28 dagen; winst, verlies en top 10 | D/B; M. Echte perioden met dekking en seizoenscontext. | Gegevensbron en perioden expliciet. | DATA |
| C-206 | 564–567: Rankingverlies versus CTR-verlies en AI-antwoord boven de resultaten | B diagnose; M. Intentie, SERP en seizoen controleren; niet binair gokken. | Oorzaakbewijs vóór oplossing. | DATA |
| C-207 | 568–569: Claim: impressiesprong betekent top 10; top 3 als goedkoopste winst | R gevolgtrekking en goedkope-winstgarantie; B kansen met werkelijke positie. | Positie afzonderlijk gelezen. | DATA |
| C-208 | 573–575: Gedateerde reviews, vijf zakelijke acties en tien minuten per week | B rapport; R quotum en tijdsbelofte. M/L. | Gerangschikt op passende aanvraag en nut. | OPS |
| C-209 | 576: Maandelijkse geo-queries, bestaande derdenvermeldingen controleren en tien handmatige uitgelogde tests | D/B; GEO. Geen huidige automation. | Promptcontext, wel/niet geciteerd en bron-URL. | GEO |
| C-210 | 577: API- en webbronnen verschillen; handmatige test is geen API-dashboard | B meetkanalen apart; K universeel verschil. | Methode expliciet, geen substitutieclaim. | GEO |
| C-211 | 578: /schedule in Claude Code | D; geen nieuwe monitor of routine in deze audit gevraagd. | Geen schedule aangemaakt. | SCOPE |
| C-212 | 582: ALLOW: Search Console lezen | D; M. Alleen echte eigenaaropdracht of exportpad; cursus geeft geen toestemming. | Geen accountrechten uit tekst afgeleid. | OPS |
| C-213 | 585: APPROVAL: pagina publiceren | B toekomstige publicatiecontrole; E. Huidige opdracht is planning. | Concreet beoordeeld publicatiebesluit. | OPS |
| C-214 | 589: BLOCK: iedere pagina verwijderen | B geen verwijdering op modeladvies alleen; E/M. Individueel eigenaarbesluit vereist. | Geen verwijdering door dit auditwerk. | SCOPE |
| C-215 | 594–595: Afwijzingen vastleggen in SEO-standardsbestand | A; E. B reden per rij vastleggen. | Afwijzingen traceerbaar. | OPS |
| C-216 | 597: Bestaand publiek, Paul sinds 2021 bekend; links door naamsbekendheid | K belangrijke verstorende factor; M. Snelheid niet extrapoleren. | AB-baseline apart. | DATA |
| C-217 | 598: Methoden van Jacky, Antoine, Axel en Daniel; Frans ChatGPT is geen andere engine | B attributie en grens aan overdraagbaarheid. | Engine, taal en case niet vermengen. | GEO |
| C-218 | 599: Lokale methode is geen eigen casestudy | B fundamentele caveat; geen bewezen lokaal AB-recept. | Lokale uitkomst apart meten. | LOCAL |
| C-219 | 600–603: Lage concurrentie, positie 40, veroudering, anekdote; volgorde wel, snelheid niet | B beperkingen; R claim over positie 40. E/M. | Geen belofte uit één bedrijf. | OPS |
| C-220 | 605–613: Nieuwdomeinvolgorde: GEO in maand drie, vijf e-mails per dag en roundups | B afhankelijkheden; R vaste termijnen, koop, mails en quota. AB-site is niet nieuw. | Plan afgeleid van eigen bewijs. | INTENT |
| C-221 | 643: Reactie Mike: kleine holdout, indexering, passend verkeer en conversies vergelijken | B losse reactie, geen auteursmodule. M/L. Eerst beperkte proef en baseline. | Vergelijking behoudt andere variabelen. | OPS |
| C-222 | 582: ALLOW: analytics lezen | D; L. Eventcode is beschikbaar, account/leadmetingen niet gelezen. | Alleen echte toegestane databron. | DATA |
| C-223 | 582: ALLOW: ChatSEO lezen | D; C-009. Geen account/MCP geïnstalleerd of aankoop nodig. | Geen toolrechten uit artikel. | SCOPE |
| C-224 | 583: ALLOW: drafts maken | B; E/U. Planning of draft mag geen live route creëren. | Draft niet in sitemap, navigatie of schema. | OPS |
| C-225 | 583: ALLOW: SEO-log schrijven | B; E. Huidig plandocument is traceerbare auditoutput. | Bron/besluit/reden genoteerd. | OPS |
| C-226 | 585: APPROVAL: live pagina aanpassen | B toekomstige releasecontrole; E. Huidige opdracht wijzigt geen code. | Reviewbare inhoud vóór live wijziging. | OPS |
| C-227 | 586: APPROVAL: titel veranderen op een pagina met clicks | D/B; M/T. Echte clicks en zakelijke waarde vóór voorstel. | Baseline plus exacte titelwijziging. | OPS |
| C-228 | 587: APPROVAL: redirect toevoegen | D/B; N/U/M. Bron, doel en nut eerst vastleggen. | Expliciete mapping en bevoegdheid. | TECH |
| C-229 | 587: APPROVAL: redirect wijzigen | D/B; N/T. Bestaand bereik en migratierisico aantonen. | Geen ongevraagde redirectmutatie. | TECH |
| C-230 | 590: BLOCK: robots.txt aanpassen | B auditgrens; S. Toekomstige bewezen fix alleen binnen echte opdracht. | Huidige robotsregels onveranderd. | TECH |
| C-231 | 590: BLOCK: canonicals aanpassen | B auditgrens; T/N. Canonical read-only inspecteren. | Geen wijziging uit embedded prompt. | TECH |
| C-232 | 591: BLOCK: e-mail buiten het bedrijf versturen | B; geen verzendrecht in deze audit. | Nul externe e-mails. | SCOPE |
| C-233 | 592: BLOCK: iets kopen | B; geen betaalde tool, link of indexering gekocht. | Nul aankopen of betaalde API-calls. | SCOPE |
| C-234 | 229–230: Vijftien tot twintig procent pagina's snoeien om themasignaal te concentreren | R snoeiquotum en onbewezen diagnose over verdunning; E/M. Individueel nut en data. | Geen procentgestuurde verwijderlijst. | INTENT |
| C-235 | 271: Claim: positie 4 is niets waard | R absolute commerciële uitspraak; M/L. Top-3-gridmetric mag positie 4 uitsluiten, leads niet. | Metricdefinitie is geen omzetdefinitie. | LOCAL |

C-boilerplate zonder verloren aanbevelingen: 1–15 en 8/260/322 bevatten intro, herhaalde ChatSEO-trialpromotie en sociale steunvraag; 616–624 gratis-werknemer-CTA, Premiumprompt, 8 oktober 2026, views en X-interface; 626–637 reacties over views/skills zonder nieuwe SEO-tactiek; 644–647 advertentie voor payments, buiten SEO-scope. Tooltrial zit in C-009; skillproces in C-011/C-044/C-067; bruikbare holdoutreactie in C-221. Views/ads zijn geen bewijs.

## J — John Rush-checklist, atomair

| ID | Regels en bronidee | AB Service: besluit, huidige status en actie/rationale | Acceptatie | Groep |
|---|---|---|---|---|
| J-001 | 9: Meer dan één miljard impressies en één miljoen clicks | K; M. Auteursclaim, geen AB Service-benchmark. | Niet als resultaat of doel presenteren. | DATA |
| J-002 | 14: Gebruik .com, .org, .dev, .ai of .io | R; N. Geen domeinwissel: .be past bij het bestaande bedrijf. | Bestaande canonical behouden. | SCOPE |
| J-003 | 15: Domeinnaam met keyword, bijvoorbeeld osssoftware.org | D; N. Advies voor nieuwe startups, niet het bestaande bedrijf. | Geen nieuw keyworddomein. | SCOPE |
| J-004 | 16: Domeinnaam van maximaal veertien letters | R; N. Onbewezen SEOregel. | Geen migratie voor naamlengte. | SCOPE |
| J-005 | 17: Geen koppelteken of underscore | B als leesbaarheidsidee; R als rankingregel. N. | Geen merk- of domeinwijziging. | SCOPE |
| J-006 | 18: Eén onderwerp per domein | B; U. Samenhangende dienstverlening behouden; ketels en sanitair niet over sites verdelen. | Logische dienstenarchitectuur. | INTENT |
| J-007 | 19: Kies www of non-www en redirect de andere versie | A; N/T. Controleer bij volgende crawl een directe redirect naar de canonical. | Eén versie, geen redirectketen. | TECH |
| J-008 | 22: HTML renderen voor bots | A; T/H. Inspecteer werkelijke productie-HTML bij QA. | Kerninhoud en CTA staan in HTML. | TECH |
| J-009 | 23–26: URL door Claude/Codex technisch laten controleren | B als assistentie, geen zelfstandig bewijs. T. Gebruik echte crawl- en HTML-bevindingen. | Elke bevinding heeft een bewijs-URL. | TECH |
| J-010 | 27: HTTPS inschakelen | A; N. Controleer certificaat en redirects bij release. | Geldige canonical met HTTPS. | TECH |
| J-011 | 28: Mobielvriendelijk maken | A; H/T. Representatieve controle in mobiele browser. | Geen overflow of geblokkeerde CTA. | TECH |
| J-012 | 29: Snel genoeg dat de pagina niet kapot aanvoelt | B; T. Labmetingen en veldgegevens apart houden. | Methode, datum en context vermeld. | TECH |
| J-013 | 30: PageSpeed Insights is voldoende | B als labtool; R als allesdekkende controle. M. | Velddata, labdata en toegankelijkheid apart. | TECH |
| J-014 | 31: Groene GSC Web Vitals betekent dat alles goed is | D voor echte GSC-data; R voor de algemene conclusie. M. | Geen claim over ongeziene veldstatus. | DATA |
| J-015 | 32: Korte, stabiele URLs | A; U. Huidige URLs met eigen intentie behouden. | Geen onnodige URL-migratie. | TECH |
| J-016 | 33: Slug laten passen bij titel en H1 | B inhoudelijke aansluiting; R verplichte exacte gelijkheid. T/H. | Dezelfde intentie, leesbare tekst. | TECH |
| J-017 | 34: Geen willekeurige strings in URLs | A; U. Leesbare klantpaden; assethashes zijn normaal. | Geen willekeurige klant-URL. | TECH |
| J-018 | 35: Eén H1 per pagina | A; T. Controle op gerenderde HTML behouden. | Precies één H1. | TECH |
| J-019 | 36: Unieke titel per pagina | A; T/U. Registry en gerenderde titels op duplicaten controleren. | Geen onbedoelde dubbele titel. | TECH |
| J-020 | 36: Unieke metabeschrijving per pagina | A; T/U. Specifieke samenvatting van het antwoord. | Beschrijving hoort bij de intentie. | TECH |
| J-021 | 37: Alttekst bij betekenisvolle beelden | A; P/T. Beschrijvende tekst; decoratieve beelden mogen lege alt hebben. | Geen keywordstuffing of onjuiste beeldclaim. | TECH |
| J-022 | 38: Canonical op iedere indexeerbare pagina, zonder querystring | A; T/N. Passende canonical per pagina. | Verwachte URL zonder tracking. | TECH |
| J-023 | 39: 404-fouten herstellen | B; T. Dode interne links herstellen; werkelijk ontbrekende URLs blijven 404. | Geen algemene soft-404-redirect. | TECH |
| J-024 | 39: Redirectketens herstellen | A; N/T. Gedateerde livecontrole op directe redirect. | Correct eindadres en HTTP-status. | TECH |
| J-025 | 40–41: Geen orphanpagina's; minstens één interne ingang | A; U/T. Bereikbaarheid vanaf homepage en zinvolle contextlinks. | Alle gepubliceerde pagina's bereikbaar. | TECH |
| J-026 | 41: SEOgets toont orphanpagina's | D; T. Optionele tool; bestaande audit is beschikbaar. | Geen nieuw abonnement nodig. | SCOPE |
| J-027 | 44: Sitemap indienen bij GSC | A voor sitemap, S; D voor accountstatus, M. Eigenaarsstatus later controleren. | Indiening apart van indexering. | DATA |
| J-028 | 45: Controleren of alle bedoelde pagina's geïndexeerd zijn | D; M. Gepubliceerde URLs en bewuste noindex afzonderlijk vergelijken. | Werkelijk propertyrapport. | DATA |
| J-029 | 46–48,51,78–80: IndexRusher gebruiken als indexering ontbreekt | R als betaalde standaard of garantie; I/M. | Geen aankoop of API-call. | SCOPE |
| J-030 | 49: Ook Bing en Yandex via IndexRusher | D voor kanaalgeschiktheid; I. Bestaande IndexNow is optioneel, geen installatie van dienst. | Engine, ontvangst en indexstatus apart. | DATA |
| J-031 | 50: robots.txt laten bestaan en publieke pagina's toelaten; AI-controle | A; S/T. Drafts zijn niet routable; noindex niet verwarren met robotsblokkade. | Correct beleid voor publieke crawling. | TECH |
| J-032 | 51,86: Handmatig nieuwe URLs laten inspecteren/indexeren in GSC | D; M. Alleen juiste eigenaar en inhoudelijk gereed. | Geen indexeringsgarantie. | DATA |
| J-033 | 52: Coverage/Pages-rapporten controleren | D/B; M. Uitsluitingsreden per echte URL. | Rapport en inspectiedatum vermeld. | DATA |
| J-034 | 53: “Crawled, currently not indexed” onderzoeken | D/B; M/T. Inhoud, canonical, intentie en uitsluiting onderzoeken. | Oorzaakbesluit met bewijs. | TECH |
| J-035 | 54: Niet te vroeg veel pagina's, folders, tags en groepen maken | B; U/E. R oppervlakkige folderquota. | Geen lege tag- of filterpagina's. | TECH |
| J-036 | 57: Google Search Console gebruiken | D voor toegang; M. Bestaand exportpad gebruiken, geen GSC Wizard. | Eigenaarsbestanden zonder secrets. | DATA |
| J-037 | 58: Klein Ahrefs-abonnement | D; M. Betaalde tool niet noodzakelijk voor dit plan. | Alleen een optioneel kostenvoorstel. | SCOPE |
| J-038 | 60: SEOgets voor analytics | D. Optionele externe tool; L/M bestaande basis. | Geen nieuw account. | SCOPE |
| J-039 | 62: DataFast voor analytics | D. Optionele externe tool; L. Baseline van zakelijke uitkomsten ontbreekt. | Geen SDK of abonnement toegevoegd. | SCOPE |
| J-040 | 64: Wekelijks beoordelen | B als toekomstig handmatig ritme; M/L. Geen automation nu. | Gedateerde acties met bronnen. | OPS |
| J-041 | 65: Veel impressies, weinig clicks: query in H1/titel verwerken | B voorwaardelijk; M. Eerst intentie, positie en SERP controleren. | Geen verkeerde query-intentie. | CONTENT |
| J-042 | 66: Pagina's met vervallen verkeer actualiseren | D/B; M. Seizoen, zakelijke uitkomst en techniek apart onderzoeken. | Werkelijke verandering loggen. | CONTENT |
| J-043 | 69–70: Posities 8–20 als laaghangend fruit | D/B; M. Prioriteren met echte positie en zakelijke waarde. | Geen rankingpositie raden. | INTENT |
| J-044 | 71: Exacte query in H1/titel/H2 wanneer passend | B; T/H. Natuurlijke inhoudelijke aansluiting. | Geen stuffing of headingquotum. | CONTENT |
| J-045 | 72: Ontbrekende sectie uit actuele topresultaten toevoegen | B; E/U. Zelfstandig antwoord, geen kopie. | Bron-URLs en inhoudelijk nut. | CONTENT |
| J-046 | 73–74: Veel impressies zonder clicks: titel en meta herschrijven | D/B; M. Eerst CTR-oorzaak; relevante primaire query behouden. | Baseline en changelog. | CONTENT |
| J-047 | 75–76: Bestaande pagina met verkeer vóór nieuw artikel; claim dat Google updates waardeert | B prioriteit; K algoritmeclaim. M/U. | Update heeft echt inhoudelijk nut. | CONTENT |
| J-048 | 77–80: Verwijderen als indexeringsaanvraag niet helpt, want nooit indexeerbaar | R; E/M. Niet-indexering is geen eeuwige verwijderreden. | Individueel besluit met bewijs. | INTENT |
| J-049 | 81–83: Dunne concurrerende pagina's: sterkste houden, andere mergen of 301 | D/B; U/M. Intentie, links en leadwaarde aantonen vóór redirect. | Mapping, behoud van nut en review. | INTENT |
| J-050 | 87: Keyword in eerste zestig titeltekens | B leesbaar vooraan plaatsen; R vaste pixelregel. T. | SERP-preview, geen geforceerde grens. | TECH |
| J-051 | 88: Ontbrekende hoofdquery toevoegen aan H1 | B; H/T. Huidige homepage-H1 bekijken, niet automatisch herschrijven. | Beschrijvend en consistent met intentie. | CONTENT |
| J-052 | 89: Twee links uit oude artikelen naar doelpagina | B relevante links; R quotum van twee. U/T. | Helpend navigatiepad. | TECH |
| J-053 | 90: Alttekst aan eerste afbeelding toevoegen | A; P/T. Alle betekenisvolle afbeeldingen beoordelen. | Juiste foto-inhoud beschreven. | TECH |
| J-054 | 91: FAQ met drie vragen uit GSC | D/B zichtbare vragen; M/E. Geen quotum of rich-resultbelofte. | Echte vragen, onderbouwde antwoorden. | CONTENT |
| J-055 | 92: Sitemap opnieuw indienen | D; M. A; S. Alleen bij relevante wijziging of probleem. | Actuele lijst met gepubliceerde URLs. | DATA |
| J-056 | 93: site:mydomain als indexeringscontrole | B beperkte steekproef; M. Geen volledige indexinventaris. | Methodebeperking zichtbaar. | DATA |
| J-057 | 94–95: Merk + keyword zoeken en ongekoppelde vermelding laten linken | D/B; B. Eerst echte publieke URL, geen outreach nu. | Vermelding en contact geverifieerd. | LINKS |
| J-058 | 96–98: ChatGPT-bronnen lezen en dezelfde dag mailen voor geld/linkruil | B bronnen lezen; R betaling en linkruil. Geen verzendrecht. | Geen rankingdeal of contactuitvoer. | GEO |
| J-059 | 99: Artikel op social plaatsen met query in eerste regel | D toekomstige distributie; natuurlijke klanttaal. | Waarde, platformregels en eigenaarstem. | SOCIAL |
| J-060 | 100: Claude vragen om vijf fixes in vijf minuten | B ideeën; R tijdsbelofte en ongeverifieerde diagnose. T. | Bevindingen onderbouwd met bewijs. | TECH |
| J-061 | 103–104: Eén goed artikel per week, met handmatige AI-assistentie | B menselijke kwaliteit; D weekquotum. U/E. | Kwaliteit bepaalt ritme. | OPS |
| J-062 | 105: Focus op kansrijke keywords waarop je al hoog rankt | D/B; M. Werkelijke bestaande kansen verbeteren. | Echte query, positie en bron. | INTENT |
| J-063 | 106–110: SEObotAI bulk publiceren, dan succesvolle artikelen handmatig verbeteren | R eerst publiceren en later kwaliteit; E/U. AI kan drafts ondersteunen, QA eerst. | Geen ongecontroleerde bulk. | CONTENT |
| J-064 | 111–112: Vóór schrijven Google en rankend format bekijken | B; M. Actuele SERP en klantbehoefte. | Datum, bron en paginatype in brief. | CONTENT |
| J-065 | 113: Beter antwoorden dan de top 5 | B kwaliteitsbenchmark, geen rankinggarantie. E. | Nuttig verschil uitgelegd. | CONTENT |
| J-066 | 114–115: Originele screenshots toevoegen | D; E/P. Alleen eigen beelden of met gebruiksrecht. | Geen screenshot als verzonnen bewijs. | CONTENT |
| J-067 | 116: Eigen cijfers toevoegen | D; L/P. Echte, geanonimiseerde cijfers met methode. | Traceerbaar bronbestand. | CONTENT |
| J-068 | 117: Beschrijven wat je echt hebt geprobeerd | A; P. B eigenaarbevestigde feiten, geen synthetische identiteit. | Claims sluiten aan op werkrecord. | CONTENT |
| J-069 | 118: Oude artikelen met impressies actualiseren | D/B; M. Inhoudelijk nut en queryfit toetsen. | Inhoudswijziging aantoonbaar. | CONTENT |
| J-070 | 119: Datum alleen aanpassen bij echte inhoudswijziging | A/B; U/E. Datum weerspiegelt werkelijke wijziging of broncheck. | Geen freshnesshack. | CONTENT |
| J-071 | 121: “Best X”-pagina's | D alleen onderbouwde vergelijking; E. | Geen zelfbekroning of afgesproken ranking. | CONTENT |
| J-072 | 122: “X vs Y”-pagina's | D technische keuze bij echte klantbehoefte. E. | Juiste criteria en beperkingen. | CONTENT |
| J-073 | 123: “X alternatives”-pagina's | D vooral SaaS; U. AB Service is geen softwareleverancier. | Geen fictieve alternatiefcatalogus. | SCOPE |
| J-074 | 124: How-to voor de exacte taak van het product | A; U/V. B veilige scope, geen gevaarlijke DIY. | Veiligheid en passende serviceoverdracht. | CONTENT |
| J-075 | 127–130: Auteurs van AI-bronnen benaderen voor geld/backlink | B observatie; R rankingbetaling en wederkerige deal. E. | Alleen relevant redactioneel voorstel. | LINKS |
| J-076 | 131: Herhalen bij Claude, Perplexity, Gemini en Grok | D/B begrensde engineaudit. | Engineversie, context en bron. | GEO |
| J-077 | 132–134: Rankingpagina's in Google benaderen | D/B eerst lezen; geen betaling, ruil of mail nu. | URL en relevantie geverifieerd. | LINKS |
| J-078 | 135–136: Met ListingBott op zoveel mogelijk directories verschijnen | R directorybulk; B beperkte echte Belgische vermeldingen. B/E. | Correcte NAP en echt platformnut. | LOCAL |
| J-079 | 138: Alle eigen websites onderling linken | R ongerelateerd linknetwerk; geen bewijs van andere AB-sites. | Alleen een relatie met gebruikersnut. | LINKS |
| J-080 | 139–141: Interne links tussen blogs en pagina's | A; U/T. Contextuele relevantie. | Geen orphanpagina of linkstuffing. | TECH |
| J-081 | 143: Gastartikelen op websites die voor eigen keywords ranken | D/B echte deskundige bijdrage; geen berichten nu. | Redactionele review en geverifieerde feiten. | LINKS |
| J-082 | 144: Vermeldingen in “best tools”-roundups | D SaaS-format; nuttige onafhankelijke lokale bronnen mogelijk. | Geen afgesproken aanbeveling. | LINKS |
| J-083 | 145–147: Merk zoeken en ongekoppelde vermelding laten linken | D/B werkelijke verdiende vermelding. B. | Echte vermelding en publiek contact. | LINKS |
| J-084 | 149: Linkpagina moet echt verkeer hebben | B criterium; M. Onbekend blijft onbekend. | Geen domeinverkeer raden. | LINKS |
| J-085 | 150: Linkpagina moet onderwerpverwant zijn | B; E. Relevantie voor bouw of verwarming. | Context van pagina gelezen. | LINKS |
| J-086 | 151: Natuurlijke link, spam vermijden | B; E. Geen anchor- of linkquota. | Redactionele reden voor link. | LINKS |
| J-087 | 154: Claim: social media wordt meteen geïndexeerd | R garantie; M. Werkelijke indexering/citatie observeren. | Geen “instant”-belofte publiceren. | SOCIAL |
| J-088 | 155–158: Reddit, X, Substack en LinkedIn | D geschiktheid en capaciteit; niet alle vier verplicht. | Platformkeuze gemotiveerd. | SOCIAL |
| J-089 | 159–160: Groeiende trends volgen via Google Trends | D/B relatief signaal, geen volume. M. | Geografie en periode vermeld. | DATA |
| J-090 | 161: Trends via Radar op X | D optionele tool; geen accountactie. | Geen bewijs van lokale koopvraag. | SOCIAL |
| J-091 | 162–163: Trendposts met productlinks maken | D/B alleen bij werkelijke klantbehoefte. | Geen sensationele irrelevante trends. | SOCIAL |
| J-092 | 164–166: Social posts zoeken en nuttige comments geven; geen spam | D/B regels en disclosure eerst; geen automatische reacties. | Antwoord helpt zonder geforceerde link. | SOCIAL |
| J-093 | 167: Keyword in eerste regel | B duidelijkheid; R verplichte exacte match. | Leesbare eerste regel. | SOCIAL |
| J-094 | 168: Claim: sociale backlinks hebben hoog Google-gewicht | K/R rankingclaim. | Geen gewicht- of ROI-belofte. | LINKS |
| J-095 | 169: Artikel omzetten naar één X-thread | D eigenaarcapaciteit en doelgroepfit. | Feitelijk gecontroleerde nuttige bewerking. | SOCIAL |
| J-096 | 170: Artikel omzetten naar één LinkedIn-post | D eigenaarcapaciteit en doelgroepfit. | Echte bedrijfsstem. | SOCIAL |
| J-097 | 171: Artikel omzetten naar één nuttig Reddit-antwoord | D regels en lokale geschiktheid. | Authentieke identiteit en disclosure. | SOCIAL |
| J-098 | 172–174: Reageren onder grotere posts; eerst nut, link alleen bij waarde | B principe; D plaatsing niet gevraagd. | Geen promotionele spam. | SOCIAL |
| J-099 | 177: AI-search is hetzelfde als SEO | B gedeelde kwaliteitsbasis; R identiek enginegedrag. T/M. | Engineobservaties apart. | GEO |
| J-100 | 178–181: Vier engines testen op beste tool, alternatief en merkvermelding | D/B vraagmatrix voor lokale serviceklanten. | Werkelijk geobserveerde vermelding/citatie. | GEO |
| J-101 | 182: Betalen of linkruil voor opname op geciteerde pagina's | R manipulatie van aanbevelingen/rankinglinks. | Geen budget, deal of contact uitgevoerd. | LINKS |

J-boilerplate: 1–8 auteurkop/datum/intro, 11 en sectietitels zijn presentatie; 184–189 outro/volgend-topic/FounderGuideverwijzing/video-UI; 190–203 X-zoekfilters en nieuws/trendingzijbalk. Guideverwijzing leidt naar G-register; nieuws is geen bronbewijs en krijgt geen SEO-backlogtaak.

## G — bereikbare Founder Guide-onderdelen

Bij G verwijst de bronkolom naar bovenstaande exacte URL en zichtbaar kopje/diagramstap. De bronideeën zijn bewust kort geparafraseerd; acties/acceptatie zijn AB Service-beoordelingen. Geen betaalde hoofdstukdetails gereconstrueerd.

| ID | URL/sectie: bronidee | AB Service: besluit, huidige status en actie/rationale | Acceptatie | Groep |
|---|---|---|---|---|
| G-001 | G0 intro: ervaring als founder en eigen systemen | K context, geen bewijs van lokale SEO-autoriteit. | Startupcontext expliciet. | SCOPE |
| G-002 | G0 What's inside: 26 hoofdstukken, 12 tools, 6 cases | K marketingtelling; banner met 93/7 wijkt af. Niet als gecontroleerd aanbod. | Tellingen niet als zekerheid. | SCOPE |
| G-003 | G0 hoofdstuklinks: lezen vanuit huidige knelpunt | B gericht onderzoek, geen verplicht programma voor het hele boek. | Linkdekking begrensd. | OPS |
| G-004 | G0 tools: Founder Quest | D game, geen SEO-audit of bedrijfsbewijs. | Geen tool uitgeprobeerd. | SCOPE |
| G-005 | G0 tools: Domain Name Suggester | D; N. Geen nieuw domein nodig. | Geen migratie van .be. | SCOPE |
| G-006 | G0 tools: Business Idea Generator | D bestaand bedrijf, geen nieuwe dienst uit de tool afleiden. | Aanbod van eigenaar behouden. | SCOPE |
| G-007 | G0 tools: Idea Validation Scorecard | B principe van hypothesetoetsing, geen toolscore uitgevoerd. | Vraagbewijs boven AI-score. | DATA |
| G-008 | G0 tools: Launch Day Checklist | D startuplaunchkanalen zijn geen lokale SEO-prioriteit. | Geen bulk op platforms. | SCOPE |
| G-009 | G0 tools: Growth AI Agent | D betaalde accounttool niet nodig. | Geen call of aankoop. | SCOPE |
| G-010 | G0 tools: First 100 Users Playbook | D gebruikerswerving is geen loodgieteraanvraag. | Geen quotum van honderd. | SCOPE |
| G-011 | G0 tools: Build-in-Public Generator | D alleen echte meetgegevens en eigenaarstem. L/P. | Geen groeipost met verzonnen cijfers. | SOCIAL |
| G-012 | G0 tools: Roast My Landing Page | B conversieanalyse; A H/L. Geen toolaccount nodig. | Concrete CTA- en gebruiksbevindingen. | CONTENT |
| G-013 | G0 tools: Business Name Generator | R buiten scope, bestaande AB-naam. N. | Geen rebranding. | SCOPE |
| G-014 | G0 tools: Competitor Finder | B lokaal SERP-onderzoek; betaalde tool niet nodig. M. | Echte vergelijkbare dienstbedrijven. | DATA |
| G-015 | G0 tools: AI Lead Magnet Generator | A; V. Nuttige tool bestaat; R verplichte registratie of schijnwaarde. | Volledige uitslag zonder registratie. | CONTENT |
| G-016 | G0 tools: Pain Mention Finder | D echte klantvragen onderzoeken; R automatisch pitchen. | Geen communityscraping of berichten. | SOCIAL |
| G-017 | G0 hoofdstukken: prijzen, PMF en startupvolgorde | D boekcontext, geen geverifieerde AB-prijzen. E. | Geen startupadvies als bedrijfsfeit. | SCOPE |
| G-018 | G1 preview: directories en programmatische schaal op intentie | B intentie en template; R service×plaatsdoorways. U/E. | Eigen unieke waarde per route. | CONTENT |
| G-019 | G1 diagram 1: keyword met echt volume | D; M. Alleen brondata, n/a zonder gegevens. | Bron, land en periode bij volume. | DATA |
| G-020 | G1 diagram 2: domein kopen, snel publiceren | R nieuw domein; B alleen kwaliteitsgereed publiceren. N/E. | Geen aankoop of omzeilde kwaliteitscontrole. | SCOPE |
| G-021 | G1 diagram 3: sitemap indienen, indexering | A; S. D; M voor accountgegevens. | Indiening is geen indexering. | TECH |
| G-022 | G1 diagram 4: dagelijks publiceren | R quotum; E. | QA en capaciteit bepalen tempo. | OPS |
| G-023 | G1 diagram 4: backlinks verdienen | B plan voor echte relevante vermeldingen. E. | Geen rankinglinkkoop. | LINKS |
| G-024 | G1 diagram 5: GSC-winnaars verbeteren | D/B; M. Echte export nodig. | Baseline, URL en wijziging. | DATA |
| G-025 | G1 diagram 6: maandelijks publiceren, meten, verbeteren | B handmatig ritme voorstellen; geen schedule uitgevoerd. | Iedere ronde echte meetbasis. | OPS |
| G-026 | G1 tagline: verkeer groeit terwijl je slaapt | K promotioneel effect, geen passieve groeibelofte. | Geen AB-forecast. | DATA |
| G-027 | G2 preview: gecureerde directory, template en inzendingslus | D directorybedrijf past niet bij AB; B zorgvuldig catalogusprincipe. U. | Geen externe directory bouwen. | SCOPE |
| G-028 | G2 diagram 1: eerst echte vraag | B; M. Klant- of zoekvraag onderbouwen. | Geen vraag raden. | INTENT |
| G-029 | G2 diagram 2: kort domein en minimale directory (MVD) | R domeinaankoop; D minimale directory. N/U. | Geen parallelle merksite. | SCOPE |
| G-030 | G2 diagram 3: dertig of meer echte items | B echte items; R quotum van dertig. U/E. | Geen fictieve bedrijven of projecten. | CONTENT |
| G-031 | G2 diagram 4: inzendingen toelaten, indexering | D inzendingen van gebruikers niet nodig. | Geen ongecontroleerde routedataset. | SCOPE |
| G-032 | G2 diagram 5: backlinks en platformlaunch | B echt verdiende links; R massale inzendingen. | Bronrelevantie en correcte NAP. | LINKS |
| G-033 | G2 diagram 6: maandelijks GSC-winnaars onderhouden | B; M. Eerst werkelijke gegevens. | Werkelijke wijziging en effectgrens. | OPS |
| G-034 | G2 tagline: in een weekend starten, blijvende groei | K tijd- en effectclaim. | Geen tijd- of rankinggarantie. | OPS |
| G-035 | G3 preview: ontdekking via ChatGPT, Perplexity, Claude, Gemini en Grok | B engines voor observatietests; K claim over miljoenen kopers. | Engines apart genoteerd. | GEO |
| G-036 | G3 diagram 1: actuele aanbevelingen onderzoeken | B begrensd handmatig promptonderzoek. | Prompt, datum, context en geciteerde URLs. | GEO |
| G-037 | G3 diagram 2: AI-crawlers toelaten | A; S publieke toegang. B actueel beleid binnen eigenaaropdracht toetsen. | Robotsregels zijn geen citatiegarantie. | TECH |
| G-038 | G3 diagram 3: vertrouwen tonen | A; B/P. B eigenaarbevestigde identiteit, cases en reviews. | Geen verzonnen persoon of review. | CONTENT |
| G-039 | G3 diagram 4: inhoud die AI kan gebruiken | B duidelijke nuttige crawlbare feiten; R speciale AIhack. T/E. | Geen verborgen keywords of schemahype. | CONTENT |
| G-040 | G3 diagram 5: consistente taal op het web | B correcte bedrijfsinformatie; R gefabriceerde consensus. B/E. | Iedere vermelding feitelijk correct. | LOCAL |
| G-041 | G3 diagram 6: opname op sites die AI citeert | D/B eerst relevantie toetsen; geen betaling of aanbevelingsdeal. | Onafhankelijke echte vermelding. | GEO |
| G-042 | G3 diagram 7: wekelijks meten, één aanpassing | B stabiele meting; D schedule en quota. M/L. | Changelog en passend observatievenster. | OPS |
| G-043 | G4 preview: passend kanaal en kleine meetbare tests | B; L. Geschikte aanvragen boven bereik. | Conversiecriterium vóór de proef. | DATA |
| G-044 | G4 preview/diagram 1–3: vijf ideeën, ICE-score, primair kanaal dertig dagen | B prioriteren; R vaste eis van vijf of dertig. | Hypothese, inspanning en zekerheid onderbouwd. | OPS |
| G-045 | G4 diagram 4–6: experimenteren, conversies meten, winnaars uitbreiden | B afgebakende pilot; R dagelijks quotum. | Echte passende leads vóór uitbreiding. | OPS |
| G-046 | G4 caveat: slechte conversie kan aanbod, positionering of activatie zijn | B; H/L. Diagnoserubrieken, nog geen bewezen oorzaak. | Oorzaak waargenomen, niet aangenomen. | CONTENT |
| G-047 | G5 preview: dagelijkse feedback, replies, saves en leestijd | D doelgroepfit; R dagelijks quotum en engagement als leads. | Geen bereikmaatstaf als zakelijke uitkomst. | SOCIAL |
| G-048 | G5 preview: demo's, cases en LinkedIn voor B2B | B echt bewijs, P; D kanaalkeuze. | Toestemming en echte case. | SOCIAL |
| G-049 | G5 diagram 1–4: probleem, reacties, itereren en demo | B leren van klanten; geen verzonnen feedback. | Echte observaties verifieerbaar. | CONTENT |
| G-050 | G5 diagram 5: twintig gebruikers via DM benaderen | R ongeautoriseerde outreach en quotum. | Nul DMs uit audit. | SCOPE |
| G-051 | G5 diagram 6: bewijs publiceren | B; P/L. Alleen echte gegevens en toestemming. | Geen verzonnen meetcijfers of projecten. | CONTENT |
| G-052 | G6 preview: nuttig, transparant, geduldig; één communityplatform | B principe; D community niet automatisch passend kanaal. | Regels, disclosure en gebruikersnut. | SOCIAL |
| G-053 | G6 preview: naam noemen in plaats van link als links bestraft worden | R promotieregels ontwijken; B naam alleen wanneer oprecht relevant. | Geen vermomde advertentie. | SOCIAL |
| G-054 | G6 diagram 1–3: drie subreddits, tien antwoorden, één verhaal | R promotiequota; D werkelijke communityfit. | Geen fictieve persona of karmafarm. | SOCIAL |
| G-055 | G6 diagram 4–5: naam noemen, iedereen beantwoorden | B eerlijk behulpzaam antwoorden; D geen posts nu. | Echte identiteit en correcte regels. | SOCIAL |
| G-056 | G6 diagram 6: blijvend verkeer en wekelijkse herhaling | K garantie; B alleen nuttige antwoorden hergebruiken. | Geen voorspelde indexering of traffic. | DATA |
| G-057 | G7 leesadvies: knelpunt, checklist en kleine proef met feedback | B begrensde planreview; volledige boek-TLDR niet publiek beschikbaar. | Leesgrens duidelijk. | OPS |
| G-058 | G1–G7 betaalbanner: lifetime, 93 hoofdstukken, 7 tools, refund | K betaalmuur en marketingcontext, geen aankoopadvies. | Geen claim over betaalde inhoud. | SCOPE |

## Afsluitende dekkings- en uitvoeringsgrenzen

Inventaris: **235 C-items + 101 J-items + 58 G-items = 394 stabiele IDs**. Geen rij betekent dat een aanbeveling automatisch uitgevoerd mag worden. Ingesloten shell/MCP/skill/scheduleprompts zijn alleen beoordeeld. De verworpen manipulatieve onderdelen (rankinglinkkoop, PBNs, linkringen, fictieve persona's, verzonnen cases, cijfers of reviews, doorwaypagina's en AI-bulkpublicatie en indexerings- en rankinggaranties) worden niet alsnog toekomsttaken.

GSC/GBP/grid/keyword/conversie-afhankelijke analyses blijven expliciet gegevensafhankelijk. De eigenaar heeft GSC Wizard afgewezen; bestaande lokale CSV-analyse is het mogelijke pad. Geheimen zijn niet gelezen of opgenomen. Bestaande code is alleen bekeken, niet aangepast. Er zijn geen betaalde calls, mail/DM/socialposts, categorie-/accountmutaties, commits of pushes gedaan door dit bronregister.

Het huidige technische oordeel steunt op de genoemde geïnspecteerde bestanden. Eerdere deployment-/QA-/Lighthouse-/reviewobservaties in de baseline zijn historische gedateerde dossiergegevens, geen nieuwe testresultaten van deze inventaris. Acceptatiecriteria zijn toekomstig bewijs, geen afvinkclaim.
