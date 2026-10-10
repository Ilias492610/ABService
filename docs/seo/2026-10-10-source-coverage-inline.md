# Dekking van het aanvullende SEO-bericht

Deze bijlage is onderdeel van het volledige SEO-meesterplan. Bron is het gebruikersbericht met
de vier artikelbijlagen, de gratis-toolprompt, de posts van Rob Hallam, Mike Strives, Mehrab en
Suraj Sharma, de tien stappen voor SaaS-founders en de verwijzing naar de Founder Guide.
Dit bericht heeft geen afzonderlijk attachment met regelnummers. De herkenbare fragmenten
hieronder vormen daarom de bronankers. Een geplande actie is nog geen uitgevoerd resultaat.

Status: **B** = aanwezig in broncode, **V** = gedateerd technisch/live gecontroleerd,
**O** = open actie, **G** = gegevens/account/budget vereist, **A** = aangepast,
**N** = bewust niet overgenomen. Werkpakketnummers verwijzen naar het meesterplan.

## Verzoek en gratis hulpmiddel

| ID | Detail in het bericht | Beslissing en vervolgstap | Status en voltooiingscontrole | Pakket |
|---|---|---|---|---|
| U-001 | Maximaal relevant SEO bereik en zoveel mogelijk klanten | Optimaliseer passende aanvragen en afgesproken opdrachten, niet alleen verkeer of pagina-aantal. | O/G: echte geaggregeerde leadkwaliteit en vergelijkbare perioden vastleggen. | WP01, WP17 |
| U-002 | Langdurig werken, beschikbare usage mag op, autonoom bijwerken | Bestaande dagelijkse opvolging behouden; prioriteit op één zinvol verbeterpunt per run. Geen gebruik verbruiken zonder waarde of continu draaien claimen. | B: dagelijkse 09:00-taak; O: uitkomstenlog en stopregels bewaken. | WP17 |
| U-003 | Verschillende bronnen onderzoeken, alle SEO details meenemen | Alle aangeleverde bronnen inventariseren en advies toetsen aan actuele primaire documentatie. | V/O: bronmatrix plus expliciete aannemen/aanpassen/afwijzen-beslissing; geen ongemarkeerde ongelezen bron. | WP00 |
| U-004 | Tool voor product-URL en keyword | Vertaal product naar echte dienst en kies probleem met klantwaarde; onderhoudscheck behouden, watermetercheck onderzoeken. | B/V: onderhoudscheck; O: tweede tool na bronnen- en bruikbaarheidstest. | WP11 |
| U-005 | Geen signup, direct resultaat, schone mobiele UX | Volledige uitslag vóór contact; geen e-mailpoort, fake calculator of verplichte registratie. | B/V: bestaande check; eis geldt voor elke nieuwe tool. | WP11 |
| U-006 | Eén CTA richting product | Eén primaire passende service/contactvervolgstap; telefoon/WhatsApp blijven bruikbaar. | B/V/O: controleer per resultaat de dienst en contactcontext. | WP01, WP11 |
| U-007 | Tool title, meta, H1, links, FAQ, JSON-LD | Metadata en inhoud passend bij tool; zichtbare nuttige vragen; alleen semantisch juiste markup. FAQPage niet toevoegen als verdwenen rich-resultstrategie. | B/V: checker/metadata; O: iedere nieuwe tool door QA. | WP11, WP12 |
| U-008 | Claude/Opus bouwt gratis leadmagnet en werkt goed voor SEO | Behandel dit als productmarketing, niet als bewijs van ranking of leadwinst. Geen model/providerwissel nodig. | N: geen abonnement of modelclaim als uitvoeringseis. | WP00 |
| U-009 | Attention Playbook voor 31 oktober, video/cursus en letaido.com | Promotionele links en deadline registreren; geen aankoop, account of cursusclaim nodig voor website-SEO. | N/G: genoemde video van 4:44 en betaalde cursus niet bekeken/gekocht; niet als gelezen bron tellen. | WP00, WP16 |

## Mehrabs analyse van Search Console-exports

Bronankers: [oorspronkelijke post](https://x.com/mehrab_build/status/2103053208247742725)
en [analyseprompt](https://x.com/mehrab_build/status/2103053220272836778).
De gebruikerspaste is leesbaar; authenticiteit, bereik en een vermeend resultaat van de post
zijn niet als AB Service bewijs gebruikt.

| ID | Detail in de prompt | Beslissing en vervolgstap | Status en voltooiingscontrole | Pakket |
|---|---|---|---|---|
| U-010 | GSC Performance laatste drie maanden; Pages.csv en Queries.csv | Export uit correcte eigenaarproperty met gelijke filters en exacte datums, privé bewaren. | G: echte bestanden ontbreken; analyzer bestaat. | WP02, WP03 |
| U-011 | Tabellen zijn niet gekoppeld; match op queryonderwerp, slug en paginathema | Een vermoede koppeling expliciet inferred noemen; geen paginametrics aan queries toekennen. Gebruik echte query-page-paren waar beschikbaar. | B/V: `libs/gsc-analysis.mjs`; O: semantische redactionele beoordeling op echte exports. | WP03 |
| U-012 | Ontbrekende content met betekenisvolle impressies; themaclusters | Zoekvraag, dienstfit, huidige intentie-eigenaar en ontbrekend antwoord per cluster bepalen. | G/O: echte export plus brief, geen verzonnen keywords. | WP03, WP10 |
| U-013 | Striking distance posities 8–20 met impressies | Bewaar dit als expliciete selectie, niet als actuele vaste rank of top-5-belofte. | B/V: analyzerselectie; G: echte kandidaten en dienstfit. | WP03 |
| U-014 | Hoge impressies, CTR lager dan positie zou doen verwachten | Onderzoek snippet, intentie, apparaat, SERP en AI-blokken; geen universele verwachte CTR verzinnen. | G/O: onderbouwde hypothese per URL; CTR = echte clicks/impressions. | WP03, WP06 |
| U-015 | Vraag- en vergelijkingsqueries how/what/best/vs/alternatives | Onderzoek onderhoud versus keuring, herstellen versus vervangen en echte klantvragen; geen SaaS-alternatievenpagina om een patroon te vullen. | A/G/O: servicefit en eigen waarde aantonen. | WP03, WP10 |
| U-016 | Branded queries negeren | Non-brandselectie voor gaps; branded prestaties apart bewaren voor entiteit/vertrouwen. | B/V: merkfilter; G: echte data. | WP03 |
| U-017 | Minder dan 10 impressies negeren | Houd ondergrens 10 als analysepreset; niet als publicatieregel of bewijs van nul vraag. | B/V: analyzergrens getest. | WP03 |
| U-018 | Prioriteitentabel met cluster, impressies, gemiddelde positie, gap, actie en High/Med/Low | Lever exact deze velden, gewogen positie alleen bij geschikte dimensies; anders niet betrouwbaar aggregeren. | O/G: controleer bedragen/tellingen terug naar export. | WP03 |
| U-019 | Vijf eerste contentstukken met title, queries en één regel intentie | Maak vijf briefs uit echte kansclusters; voeg URL-eigenaarschap, bron, unieke waarde en CTA toe. | O/G: vijf gekozen briefs, niet vijf automatisch gepubliceerde pagina's. | WP03, WP10 |
| U-020 | Vijf quick wins op bestaande pagina's | Werk bestaande geschikte URL's eerst bij met één afgebakende hypothese per experiment. | O/G: vijf specifieke veranderingen met baseline en evaluatiedatum. | WP06, WP17 |
| U-021 | Alleen cijfers en keywords uit bestanden; geen zoekvolumes inventeren | Scheid GSC-impressies van marktvraag; externe volumes alleen apart met echte leverancier/land/datum. | B/V/O: missing blijft unavailable; bron per getal. | WP02, WP03 |

## Suraj technische checklist

Bronanker: [geplakte checklistpost](https://x.com/suraj_sharma14/status/2106240327569035424).
Het renderbare Next.js-project is al uitgebreid aangepast; onderstaande bestaande onderdelen
blijven release-eisen, niet 21 nieuwe pagina's of een rankinggarantie.

| ID | Detail | Beslissing en vervolgstap | Status en voltooiingscontrole | Pakket |
|---|---|---|---|---|
| U-022 | Render server-side | Kerntekst, vragen en links in eerste HTML behouden; raw versus browser vergelijken. | B/V: App Router statische/serverinhoud; elke release controleren. | WP12 |
| U-023 | Sitemap genereren | Eén sitemap uit published-registry, juiste werkelijke lastmod. | B/V: `app/sitemap.js`, registrytests/crawl. | WP12 |
| U-024 | Sitemap aan Search Console aanbieden | Controleer property en huidige sitemapstatus; alleen bij noodzakelijke update indienen. | G: juiste eigenaar en ontvangen status vastleggen. | WP02 |
| U-025 | Googlebot toelaten in robots.txt | Public content, relevante CSS/JS/beelden niet blokkeren; staging apart. | B/V/O: crawlconfig plus actuele live robotscontrole. | WP12 |
| U-026 | Noindex verwijderen | Alleen onbedoelde noindex op approved published-route; bewuste noindex/drafts niet openen. | A/B/V: publicatiestaten en noindex-tests. | WP08, WP12 |
| U-027 | Redirect chains oplossen | Één sprong naar finale canonical; bestaande redirects documenteren. | B/V/O: geautomatiseerde variant-/oudeURL-controles uitbreiden indien nodig. | WP12 |
| U-028 | 404s repareren | Gebroken links herstellen; echt ontbrekend pad blijft HTTP404 met nuttige hulp. | B/V: crawl en 404-output; geen alles-naar-home soft404. | WP12 |
| U-029 | Canonicals toevoegen | Self-canonical, www/HTTPS consistent, parameter- en slashvarianten begrenzen. | B/V: `libs/seo-data.mjs`. | WP12 |
| U-030 | Meta description per pagina | Uniek, menselijk, dienstfit en geen onbewezen snelheid/prijs. | B/V/O: technische check plus redactionele beoordeling. | WP06, WP12 |
| U-031 | Eén H1 | Eén logische hoofdheading en coherent H2/H3, niet headings als lettergrootte. | B/V: HTMLaudit. | WP12 |
| U-032 | FAQ schema | Zichtbare nuttige vragen behouden; geen FAQ-rich-resultbelofte of blind FAQPage toevoegen. | A: actuele Google-documentatie gaat boven oude tweet. | WP10, WP12 |
| U-033 | Breadcrumbs | Zichtbare breadcrumbs en passende BreadcrumbList voor echte hiërarchie. | B/V: component/schema-tests. | WP12 |
| U-034 | Orphan pages verbinden | Iedere belangrijke URL bereikbare contextuele ingang, zonder exact-matchlinkspam. | B/V/O: linkgraaf en relevante bodylinks. | WP06, WP12 |
| U-035 | Alt op iedere afbeelding | Betekenisvolle alt voor content; decoratie leeg waar correct; geen keywordstuffing. | B/V/O: beeldinventaris en toegankelijkheidscheck. | WP09, WP12 |
| U-036 | WebP | Bestaande geoptimaliseerde beelden behouden; responsive maten/kwaliteit/afmetingen controleren. | B/V: `content/media.mjs`, media-tests. | WP09, WP12 |
| U-037 | Layout shifts repareren | Reserveer ruimte voor beelden, fonts, reviews en mobiele CTAs; CLS meten. | B/V/O: labhistorie aanwezig; fieldmeting apart. | WP12 |
| U-038 | Onder twee seconden laden | Streef snelle bruikbaarheid en officiële CWV, geen harde universele 2s-belofte. | A: lab en p75field apart; netwerk/device benoemen. | WP12 |
| U-039 | Obvious AI slop verwijderen | Filler, ongedekte claims en klantzichtbaar SEO-jargon corrigeren; echte technische inhoud behouden. | O: concrete `/werkgebied`-copycleanup gevonden. | WP06, WP10 |
| U-040 | Echte auteur bio | Alleen echte eigenaar/technicus met toestemming, aantoonbare scope; geen verzonnen expert. | B: organisatieauteur; G/O: individuele bio/controleur. | WP09 |
| U-041 | Goede backlinks | Relevante verdiende vermeldingen, geen gekochte rankinglinks of bulkdirectories. | O/G: prospectlijst/drafts; geen automatische externe berichten. | WP13 |
| U-042 | Nummer één vrijdag; maak geen fouten | Geen rankingdeadline overnemen; code/content aantoonbaar controleren en beperkingen rapporteren. | N: resultaatgarantie afgewezen, QA wel verplicht. | WP12, WP17 |

## Tien stappen uit het SaaS playbook

| ID | Detail | Beslissing en vervolgstap | Status en voltooiingscontrole | Pakket |
|---|---|---|---|---|
| U-043 | Opus verbinden met DataForSEO/Ahrefs MCP | Geen specifieke provider/model verplicht; alleen bestaande toegestane data of budget-goedgekeurde toegang. | A/G: handmatige officiële exports zijn geldig alternatief. | WP02, WP03 |
| U-044 | Drie tot vijf concurrenten | Selecteer werkelijke Belgische dienst/gebiedconcurrenten van vergelijkbare orde; Maps en organisch onderscheiden. | O: namen, URLs, zoekcontext en reden per concurrent. | WP03 |
| U-045 | CSV met commerciële keywords, volume, difficulty en top drie SERP-domeinen | Exacte bron, land, taal, datum, dataproduct/eenheid bewaren; ontbrekende velden niet schatten. | G/O: geen betaalde API zonder budget; export privé. | WP03 |
| U-046 | UGC/Reddit/LinkedIn-topresultaat als parasite markeren en overslaan | Noteer SERPformat/UGC, niet automatisch spam of onwinbaar noemen; beslis op klantintentie. | A/O: per query expliciete fitbeslissing met live URLs. | WP03, WP14 |
| U-047 | Anders top drie of top vijf lezen, eventueel als Markdown | Werkelijke toegankelijke pagina's lezen, JS versus raw indien relevant; geen paywall omzeilen of teksten kopiëren. | O: brongebonden dekking/verschilnotities. | WP03 |
| U-048 | LandingpageSERP leidt tot eigen landingpage | Alleen bij distinct intent; bestaande moneyURL verbeteren vóór nieuw pad. | A/B/O: URL-eigenaarschap en publicatiegate. | WP06 |
| U-049 | BlogSERP leidt tot artikel met unieke eigen invalshoek | Kies echte klantvraag, primaire bron en eigen observatie/hulpmiddel; geen herformulering van concurrenttekst. | B: zeven adviezen; O/G: datagedreven nieuwe briefs. | WP10 |
| U-050 | Eigen kleine dataset gebruiken | Alleen echte geanonimiseerde opdrachten/metingen; geen fakebenchmark, besparings- of succespercentage. | G/O: provenance, toestemming en minimumprivacy. | WP09, WP11 |
| U-051 | People Also Ask in blogFAQ | Actuele zichtbare vragen vastleggen en beantwoorden indien nuttig; niet elk fragment aparte route. | O/G: vraagbron + passende bestaande URL. | WP03, WP10 |
| U-052 | Meteen intern linken vanuit 3–5 relevante geïndexeerde pagina's | Kies werkelijk relevante gepubliceerde bodylinks; geïndexeerde status alleen met bewijs; aantal geen harde rankingregel. | A/B/O: crawlbare ingangen, linkgraaf, geen draftlinks. | WP06, WP12 |
| U-053 | Wekelijks indexering, queries, volledigheid en nieuwe artikelkandidaten volgen | Beoordeel wekelijks echte data; de dagelijkse operationele taak mag inhoudelijke experimenten niet dagelijks omgooien. | B: opvolging; G/O: daadwerkelijke rapporten. | WP02, WP17 |
| U-054 | Eén of twee backlinks, vooral landingpage | Verdiende nuttige mention target, geen quota of koopactie; prospectstatus en liveplaatsing apart. | A/O/G: echte partnerrelatie en externe verzendopdracht. | WP13 |
| U-055 | Like/save als tiende stap | Promotionele oproep, geen technische/businessSEO-eis. | N: niet uitvoeren namens eigenaar. | WP00 |
| U-056 | Founder Guide-home bekijken | Openbare home en relevante previews opnemen, afgesloten hoofdstukken als niet gelezen markeren. | V/G: openbare dekking in course/john-bijlage; geen betaalde aankoop. | WP00 |

## Uitspraken over bereik en software

| ID | Detail | Beslissing en voltooiingscontrole | Pakket |
|---|---|---|---|
| U-057 | Views, data, reacties, Opus-superlatieven en “wild results” | Bronmetadata/marketing, geen bewijs van effect voor AB Service of vereist abonnement. Bewaar datum alleen waar werkelijk meegeleverd. | WP00 |
| U-058 | Meer klanten door alle tactics te combineren | Elke bruikbare tactic heeft een werkpakket; conflicten expliciet oplossen en bedrijfsuitkomst meten. Volledige brondekking is niet volledige uitvoering. | WP00, WP17 |

Alle U-001–U-058 hebben een beslissing, werkpakket en voltooiingscontrole. De bron is het
bericht zelf; nieuwe accounts, advertenties, externe publicaties of websitewijzigingen zijn niet
uitgevoerd door deze inventaris.
