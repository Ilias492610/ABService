# Brondekking: oorspronkelijke masterprompt en Phase E — 10 oktober 2026

Dit is een planningsaudit, geen nieuwe implementatie, publicatie of zoekresultaatmeting. Beide oorspronkelijke teksten zijn tot EOF gelezen: masterprompt 3.752 regels en Phase E 1.338 regels. De genummerde matrix hieronder dekt **113/113 bronsecties (0–112)** en **34/34 Phase E-secties (E1–E34)**. Dat zijn aantallen gelezen en gekoppelde secties, **geen percentage voltooid SEO-werk**. Secties bevatten overlappende principes, voorwaarden, voorbeelden en veel afzonderlijke acceptatiepunten.

Bron M: `/Users/hamda/.codex/attachments/506c7544-4fbc-46aa-ad5b-1cc029d2736b/pasted-text.txt`. Bron E: `/Users/hamda/.codex/attachments/10ab4df6-5ad1-4474-9e06-ba73a2aa6078/pasted-text.txt`. Regelbereiken zijn inclusief; de scheidingsregels tot de volgende sectie horen bij het bereik. M-regels 1–31 bevatten de opdracht en context; E-regels 1–23 bevestigen het volledige grondgebied. Phase E vervangt het nauwe Antwerpse dekkingsvoorbeeld in M109, niet de bewijsregels.

Inspectie: `/Users/hamda/Documents/ABService-1`, HEAD `7a16cecd1cb23182ea8f58549d9054d44f9cac2f`. Deze audit veranderde alleen dit document. Geen nieuwe netwerk-POST, accountwijziging, campagne, contactaanvraag, commit of push. Registries werden rechtstreeks ingelezen met de gebundelde **Node v24.19.0**. Bestaande QA-verslagen zijn gedateerd bewijsmateriaal; hun observaties op de gehoste/live-site zijn hier niet opnieuw uitgevoerd.

## Statusbetekenis en bewijsgrens

- **I**: in huidige bron geïmplementeerd; relevante tests/crawl bestaan. Geen garantie over huidige indexering, ranking, veld-CWV of omzet.
- **P**: gedeeltelijk; er ontbreekt inhoud, koppeling, afzonderlijk bewijs of actuele acceptatie.
- **G**: account-, bedrijfs-, project- of meetbewijs nodig. Dit is geen reden om geldige bestaande eigenaarbevestigingen opnieuw te vragen.
- **C**: voorwaardelijke uitbreiding die bewust niet is uitgevoerd zolang voorwaarden ontbreken.
- **D**: document/beleid bestaat; externe uitvoering of resultaat is afzonderlijk.

Bewijsnamen in de matrix zijn echte repo-bestanden. `QA` betekent `SEO_QA_REPORT.md`; `status` betekent `docs/seo/2026-10-10-masterprompt-status.md`; `baseline` betekent `docs/seo/2026-10-10-search-baseline.md`; `policy` betekent `docs/seo/content-publishing-policy.md`; `evidence` betekent `docs/seo/evidence-register.md`; `external` betekent `LOCAL_SEO_EXTERNAL_ACTIONS.md`. “Vastgelegd” betekent dat het genoemde verslag de observatie meldt, niet dat deze audit hem zelfstandig opnieuw op het netwerk heeft bevestigd.

## Rechtstreeks gecontroleerde aantallen

| Begrip | Huidige bron | Wat dit niet bewijst |
|---|---:|---|
| Geregistreerde klantpagina's | 81 | Geen aantal door Google geïndexeerde pagina's |
| Gepubliceerd/sitemap-geschikt | 79 | Geen door Google gekozen canonical of ranking |
| Bereikbare routes met noindex | 2 | Airco en Berendrecht-Zandvliet-Lillo; geen drafts |
| Provincie/gewesthubs | 6 | Geen lokale vestigingen of 6 lokale reviewdatasets |
| Gemeenten | 304: 67/38/55/63/62/19 | Geen 304 landingspagina's |
| Antwerpse districten | 10 | Antwerpen verwijst naar `/`; 8 aparte gepubliceerde routes; 1 noindex |
| Gemeentekandidaten zonder eigen route | 302 | Antwerpen/Brussel hebben bestaande intentie-eigenaren |
| Gemeenten met matching project | 0 | Zes cases zeggen `Regio Antwerpen`, geen gemeente |
| Districten met matching project/review | 0/0 | Geografische context is geen uitgevoerd werk |
| Gemeenten met complete prioriteitsscore | 0 | Onbekende vraag/GSC/commercie/operatie/concurrentie blijft null |
| Gepubliceerde praktijkcases | 6 | Algemene eigenaarbevestiging is geen afzonderlijke werkbon-/foto-/toestemmingsreferentie |
| Commerciële merkpagina's / foutgidsen | 13/13 | Geen fabrikantpartnerschap of alle toestellen van ieder merk |
| Getoonde foutbronregels | 964 | Geen 964 unieke displaycodes: Bosch 242 wordt bij Junkers hergebruikt |
| Unieke geciteerde bron-URL's | 48 | HTTP-bereikbaarheid is geen inhoudelijke validatie van elke regel |
| Gepubliceerde adviesartikelen | 7 | 6 nieuwe gidsen plus drukverlies; advieshub en onderhoudstool tellen apart |

Foutregels: Vaillant 90; Bulex 43; Bosch 242; Junkers 242; Remeha 59 (17 Avanta +23 historische Calenta E +19 Su); Buderus 51; Viessmann 71; ACV 24; Intergas 11; Nefit Bosch 54; ATAG 14; Itho Daalderop 26; Ferroli 37. Remeha Ace/Ace-Matic/Quinta/Tzerra worden expliciet niet gedekt. De 48 bron-URL's, de 114 vastgelegde tests en de 113 promptsecties zijn drie verschillende grootheden. De vastgelegde crawl 81/92/110 betekent klantpagina's/interne bestemmingen/assets. De 78 social previews zijn assets, geen nieuwe klant- of SEO-pagina's.

## Sectie-voor-sectie: oorspronkelijke masterprompt

| Sectie / M-regels | Status | Wat bestaat, bewijsbestand | Afzonderlijke resterende eis / bewijsgrens |
|---|---|---|---|
| 0 / 32–85 | I/P | App Router, rendering, bestaande vormgeving, formulier/API, CTA's, assets en deployment beschreven in `SEO_MASTERPLAN.md`, `QA`, `app/layout.js` en `package.json`. | Behoud van bestaande functies is zichtbaar; actuele volledige mailontvangst en boekingsketen zijn niet gemeten. Geen volledige herbouw nodig. |
| 1 / 86–145 | I/G | `content/business.mjs`, `evidence` en `policy`; ongefundeerde prijzen, erkenningen en geschiedenis verwijderd. | Juridische identiteit/btw-nummer onderhouden; werkbon-, fotomatch-, toestemmings- en specialistbewijs ontbreken voor sterkere claims. Historische adres-/reviewobservaties zijn geen vaste waarheid. |
| 2 / 146–185 | I/P | Dienst-, merk-, advies- en gebiedsarchitectuur in `SEO_MASTERPLAN.md`. | Bekendheid via echte reviews, cases, bedrijfsvermeldingen, backlinks en organische prestaties vereist echte externe informatie en metingen. Nabijheid niet manipuleren. |
| 3 / 186–215 | I/P | SAB-directory zonder massale plaatsnaamvarianten: `content/service-areas.mjs`, `content/content-backlog.mjs`. | Lokale klantwaarde van acht districten moet inhoudelijk beoordeeld worden; officiële geografie bewijst op zichzelf geen lokale werkervaring. |
| 4 / 216–233 | I | Homepage bezit de Antwerpse intentie; geen `/loodgieter-antwerpen` in `content/site-content.mjs`. | Alleen wijzigen als echte query-/paginadata een afzonderlijke intentie aantonen. |
| 5 / 234–268 | I/G | M5.1: aparte `/onderhoud`, `/keuring`, `/herstelling`; regionale regels op deze pagina's en in `libs/maintenance-check.mjs`. | Geen bedrijfserkenning afleiden uit de wettelijke technicuseis; daadwerkelijke uitvoerder en bevoegdheid afzonderlijk verifiëren. |
| 6 / 269–290 | I | Vlaanderen: gas ≥20 kW tweejaarlijks, onder 20 kW aanbevolen onderhoud; Brussel afzonderlijk. `app/onderhoud/page.js` bevat officiële links. | Periodieke broncontrole; de onderhoudscheck geeft planningsinformatie, geen conformiteitsverklaring. |
| 7 / 291–308 | I | Gestopte gascondensatiepremie en actuele steun-/leninglinks: `app/installaties/gasketels/page.js`, `content/core-sources.mjs`. | Geen subsidie- of leningrecht beloven; regels blijven veranderlijk. |
| 8 / 309–326 | I/C | Onbewezen 2004-/20-jaarclaim afwezig uit huidige openbare copy; `evidence`. | Geschiedenis alleen toevoegen met persoons-/documentbewijs. Oude ongebruikte beeldbestanden zijn geen gepubliceerde claim. |
| 9 / 327–361 | I/G | Officiële Places API bij het verzoek, neutrale fallback, no-store en profielvalidatie: `libs/google-rating*`, `libs/google-reviews*` en relevante tests. | Laatst vastgelegde 5.0/44 is een momentopname; geen individuele reviewobjecten geleverd. Geen scraper, fictieve reviews of AggregateRating. |
| 10 / 362–415 | I/P | Diensten, gebieden, merken en bewijsclusters in registers/hubs; dertien actieve merken en zes aanvullende diensten. | Airco voorwaardelijk; lokaal bewijs en exacte prijzen onvolledig. Ontstopping is eigenaarbevestigd en actief. |
| 11 / 416–810 | I/P | Homepage en eerste twaalf service-/tariefintenties bestaan; gedetailleerde paginakoppeling hieronder. | Voorgestelde titels zijn voorbeelden. Geldige alternatieve service-URL's gebruikt; vaste prijzen, attest- en erkenningsclaims niet verzinnen. |
| 12 / 811–841 | P | `components/service-page.js`: hero, direct antwoord, scope, processen, beelden, bronnen, gerelateerde links en CTA. | Niet elke kernservice heeft eigen zichtbare FAQ, merk-/gebiedskoppelingen of bewijsblok. Geen veertien verplichte blokken of woordquota; inhoud passend verdiepen. |
| 13 / 842–996 | P/G | Zeven van tien oorspronkelijke district-/gemeentekandidaten gepubliceerd; Edegem/Mortsel/Kontich draft. `content/service-areas.mjs`. | Geen publicatiequota; Borsbeek is een extra Phase E-district. Drie gemeenten wachten op onderscheidende waarde en bewijs. |
| 14 / 997–1031 | P/G | Drafts zijn data-only en staan buiten sitemap/navigatie; `content/content-backlog.mjs`, `tests/publishing.test.mjs`. | `isDistrictPublishable` controleert prioriteitsboolean, unique-contentboolean, bronstatus en FAQ-vorm/lengte; geen werkbonnen of vraagbewijs. Acht districten hebben nul matching cases/reviews. Groen testresultaat is geen volledige inhoudelijke gate. |
| 15 / 1032–1108 | P/G | `components/district-page.js`: lokale intro/context, diensten, nabije gebieden, FAQ, bron, CTA en voorwaardelijk projectblok. | Geen lokaal bewijsbeeld/review. Lokale paragrafen gaan vooral over geografie/intake; beoordeel klantnut per district. |
| 16 / 1109–1173 | I/G | Vier gevraagde merken plus negen eigenaarbevestigde: `content/brand-services.mjs`, `app/merken/[merk]/page.js`. | Onderhoud/herstelling bevestigd, niet installatie van alle merkmodellen of dealerstatus. Cases missen genoemde merken voor aanvullende links. |
| 17 / 1174–1197 | I | `/foutcodes` linkt naar dertien brongebonden gidsen: `app/foutcodes/page.js`. | Werkelijke foutvragen en aanvragen nodig voor verdere prioritering. |
| 18 / 1198–1237 | I | Vaillant/Bulex-gidsen behouden bronnen, modelcontext, zoekfunctie en herstel-CTA: `content/fault-guides.mjs`, catalogi/tests. | Geen universele merkuitleg; afzonderlijke codepagina's blijven voorwaardelijk. |
| 19 / 1238–1257 | I/P | Bosch/Junkers-codeboek, series, subcodes, paginabereiken en modelwaarschuwingen: `content/fault-catalogs.mjs`. | 242 gedeelde bronregels per gids, geen onafhankelijke/universele codeset. Overlap met echte querydata onderzoeken; geen blinde samenvoeging. |
| 20 / 1258–1318 | C/G | Prioriteitscodes staan in modelgebonden catalogi. Geen zelfstandige `/foutcodes/merk/code` routes. | Vraag/frequentie, exacte modelzekerheid en afzonderlijke intentie vóór losse pagina. Daarna direct antwoord, veilige checks, professionele diagnose en links naar gerelateerde codes, merk en service. |
| 21 / 1319–1337 | I/G | Veiligheidswaarschuwingen; geen gevaarlijke reset-/openings-/gasafstellingsinstructies in foutgidsen, herstel, advies, tool en tests. | Geen ongedocumenteerde specialistische review of bevoegdheid claimen. |
| 22 / 1338–1361 | P/G | `/projecten` met zes geanonimiseerde cases; `content/projects.mjs`. | Inhoud eigenaarbevestigd; case-specifieke bewijsverwijzingen ontbreken. Niet als bewezen lokale merkprojecten voorstellen. |
| 23 / 1362–1391 | P/G | Titel, service, provincie, probleem, oplossing, werk, resultaat, beeld, status en goedkeuring in `content/projects.mjs`. | Geen expliciete `appliance/model`, `diagnosis`, private foto-/toestemmingsreferentie, goedgekeurde gemeente/district of werkelijk merk. Anonimiseren mag; interne traceerbaarheid blijft nodig. |
| 24 / 1392–1429 | P/G | Template toont aanleiding, uitvoering, resultaat, geanonimiseerde feiten en service-/provincielink: `app/projecten/[slug]/page.js`. | Afzonderlijke diagnose/toestel en merk-/gemeentelinks ontbreken. Het voorbeeldproject in Hoboken bewust niet verzinnen. |
| 25 / 1430–1461 | P | `PROJECT_CONTENT_GUIDE.md`: record, bewijs, beelden, privacy en publicatieworkflow. | Toekomstige invoertemplate mist afzonderlijk diagnose-/modelveld; toevoegen bij concrete bewijsworkflow. Boolean-gate vervangt geen inhoudsreview. |
| 26 / 1462–1531 | P | Dienst↔advies, merk↔foutcode, project→service/provincie en nabije districten; `content/service-intents.mjs`, pagina's en crawl. | Kernservice→relevante merken/gebieden niet overal contextueel. Project↔gemeente/merk en merk→echte cases ontbreken door ontbrekende details. Footerhub vervangt deze contextuele links niet. |
| 27 / 1532–1592 | I/P | `navigation` en `components/site-header.js`: native details/links, diensten, merken, werkgebied, advies en contact. | Volledige desktop-, mobiele en toetsenbordacceptatie per release blijft nodig. Alleen nuttige oriëntatie toevoegen; geen tien gebieden in het menu forceren. |
| 28 / 1593–1644 | I | `components/site-footer.js`: diensten, regiohubs, kennis/bedrijf en contact; geen drafts/noindexlinks. | Voorbeeldcategorieën zijn richting, niet een verplichting alle dertien merken/districten sitewide toe te voegen. |
| 29 / 1645–1675 | I/G | Afzonderlijke registerintenties: homepage Antwerpen, onderhoud, herstel, keuring, installatie en sanitair. | Werkelijke cannibalisatie volgt uit query-/paginabewijs, niet uit een titeltest. |
| 30 / 1676–1695 | I | Unieke registertitels: `tests/seo-data.test.mjs`, rendered crawl in QA. | Natuurlijk intentienut en redactionele kwaliteit blijven reviewvragen; geen gegarandeerde zoeksnippet. |
| 31 / 1696–1711 | I | Unieke beschrijvingen in register/metadatafunctie, gecontroleerd door QA-crawl. | Werkelijke CTR en herschrijving door Google onbekend. |
| 32 / 1712–1728 | I/P | Eén H1 gecontroleerd door `libs/html-audit.mjs`/crawl; hero en semantische secties. | Logische en toegankelijke H2/H3-structuur is breder dan een H1-telling. |
| 33 / 1729–1761 | I | Bestaande kern-URL's behouden; nieuwe URL's lowercase met koppeltekens: `content/site-content.mjs`. | Geen alternatieve keyword-URL naast een bestaande service-intentie. |
| 34 / 1762–1780 | I/G | HTTPS/www-canonicals in `libs/seo-data.mjs`; hostredirects in `next.config.js`, apex-308 vastgelegd. | HTTP/www/slash/queryvarianten en Google's gekozen canonical afzonderlijk controleren; actuele accountbeslissingen onbekend. |
| 35 / 1781–1801 | I | `app/robots.js`: assets/publieke routes toegestaan, `/api/` uitgesloten, canonieke sitemap. | Robots is geen noindex. Preview/staging-uitsluiting vereist ook controle van hostingheaders. |
| 36 / 1802–1829 | I | Eén `app/sitemap.js` via published register; expliciete echte wijzigingsdatums, geen bouwdatums. | 79 geschikte routes is geen accepted/indexed count. Actuele sitemapstatus in de juiste property onbekend. |
| 37 / 1830–1847 | I | Zichtbare `components/breadcrumbs.js` met `BreadcrumbList` en schematests. | Volgorde ook bij toekomstige taal-/code-/projectroutes passend houden. |
| 38 / 1848–1895 | I/P/G | Organization, WebSite, Plumber/HVACBusiness, uren, gebieden en breadcrumbs; organisatorisch Article voor advies: `libs/schema-data.mjs`. | Syntax/consistentie getest; officiële rich-result-/schemavalidatie afzonderlijk. Service/project-Article is optioneel. Geen ratings, privéadres als winkel of fictieve erkenning. |
| 39 / 1896–1929 | D/G | `external`: categorieonderzoek en historische appeal voor loodgietercategorie. | Dominante activiteit, beschikbare categorie en actuele appeal-/approvalstatus controleren in het juiste eigenaarprofiel. Websitecode verandert GBP niet. |
| 40 / 1930–1947 | D/G | SAB-/adres-/maximaal-twintig-plan: `GOOGLE_BUSINESS_SERVICE_AREA_PLAN.md`, `external`. | Werkelijke bedrijfsbasis, bezoeklocatie, routinegebieden en huidige profielvelden vaststellen. |
| 41 / 1948–1978 | D/P/G | Checklist bedrijfsvermeldingen/consistentie en historische correctieverzoeken in `external`. | Geen actuele URL-voor-URL naam-/telefoon-/adres-/statusaudit of bewezen correctie-uitkomsten. Publiek read-only onderzoek kan deels zonder login. |
| 42 / 1979–2000 | I/G | Geen bezoekadres/routekaart in `business` of globale schema; SAB-copy. | Geregistreerd/juridisch adres en wettelijke informatieplicht niet afleiden uit ontbrekend kantoorbewijs. Eigenaarsinformatie/juridisch register nodig. |
| 43 / 2001–2020 | D/P/G | Neutrale reviewworkflow zonder incentives/gating in `external`; officiële profielkoppeling. | Directe reviewverzoek-URL/QR en operationele toepassing/resultaten niet aangetoond. Geen klantberichten zonder toepasselijke autorisatie. |
| 44 / 2021–2039 | P/G | Primaire fabrikant-/overheidsbronnen, eigenaarbevestigde scope/beeldcollectie en organisatorisch advies. | Afzonderlijk eerstehands technicus-/casebewijs ontbreekt waar een specifiek resultaat, plaats of beeld wordt geclaimd. |
| 45 / 2040–2070 | I/G | Antwoord eerst, renderbare inhoud, standaard schema; geen fictief AI-schema of llms-rankingclaim. | Actuele AI-opname/performance in de juiste Google-property onbekend; geen effect op AI-citaties vastgesteld. |
| 46 / 2071–2088 | I | Direct antwoord bovenaan service/advies en directe toolresultaten. | Doorlopende inhoudsreview; geen woordquota. |
| 47 / 2089–2115 | P/C/G | Zeven gidsen en hub rond echte diensten: `content/advice-guides.mjs` plus drukverlies. | Niet alle veertien voorbeeldonderwerpen behandeld; cadence is geen quota. Huurder/verhuurder, prijzen en lekkende kraan alleen bij klantnut/vraag/bronbewijs. Ontstopping bevestigd. |
| 48 / 2116–2138 | I/P | Onderhoud, keuring en attesten voor Vlaanderen/Brussel en actuele steunbronnen: `content/core-sources.mjs`. | Niet elk toekomstig huur-, premie- of certificaatonderwerp gevalideerd. Bronbereikbaarheid is geen juridische/technische inhoudscontrole. |
| 49 / 2139–2159 | C/G | Alleen onderhouden nl-BE-inhoud; geen dunne automatische taalvarianten. | Franse operationele ondersteuning, professionele vertaling en beheer, aparte URL, self-canonical, hreflang, CTA en schema vóór uitbreiding. |
| 50 / 2160–2192 | D/G | Legitieme partners en verdiende links; geen linkpakketten: `external`. | Geen concrete actuele outreachlijst, uitgevoerde outreach of verdiende linkuitkomst bewezen. |
| 51 / 2193–2214 | D/G | GBP, GSC, Bing, Apple, advertenties, sociale media, video en AI-plan in `external`. | Accountstatus, actuele Belgische LSA-geschiktheid en extern effect onbekend. Geen campagnes of uploads uit documentatie afleiden. |
| 52 / 2215–2235 | D/G | Checklist categorie, diensten, uren, foto's, reviews, website en boekingslink. | Historische uren-/gebiedsaanvraag bewijst geen huidige goedkeuring. Actuele foto-, review- en antwoordworkflow vaststellen. |
| 53 / 2236–2276 | I/P | Audit metadata/canonical/H1/linkgraaf/assets/fragmenten/404/schema/sitemap: `scripts/seo-audit.mjs`, `libs/html-audit.mjs`, QA. | Semantische headings, inhoudelijke duplicatie, alle URL-normalisatievarianten, staging/security en volledige toegankelijkheid gaan verder dan crawlerchecks. |
| 54 / 2277–2294 | I | Native anchors/Next Link, register-/linkgraafcontrole, orphancheck en server-rendered dekking. | Clientfilter verbetert gebruik; volledige initiële HTML behouden. |
| 55 / 2295–2302 | I | App Router-server/SSG-inhoud, actuele homepage-reviewdata en vastgelegde productie-HTML. | Belangrijke nieuwe inhoud niet alleen na clienthydratie tonen. |
| 56 / 2303–2327 | I | `app/layout.js` nl-BE, Belgische termen in inhoud. | Taal-/terminologiereview voor toekomstig Frans afzonderlijk. |
| 57 / 2328–2352 | P | Doorgaans sobere copy en afgebakende intake. | `/werkgebied` bevat nog openbare SEO/redactionele uitleg; zie bevindingen hieronder. Niet claimen dat alle klantcopy afgewerkt is. |
| 58 / 2353–2380 | I/G | Telefoon, mail, WhatsApp, servicevoorinvulling, tool→contact en `components/tracked-link.js`/CTA. | Plan-afspraak-CTA gaat naar een aanvraag, geen bewezen apart boekingssysteem. Werkelijke afhandeling/ontvangst afzonderlijk. |
| 59 / 2381–2403 | I/P/G | Eén Vercel Analytics, bekende eventnamen, redactie van private URL's/eigenschappen: `libs/analytics.mjs`; privacyvoorlichting. | Dashboard-/eventontvangst niet bewezen door tien afgebroken QA-POSTs. Geen booking-start/complete zonder werkelijk boekingssysteem. Privacy/juridische review volgt de echte setup. |
| 60 / 2404–2438 | D/G | Verificatiemetadata behouden; lokale exportanalyzer en property-/sitemap-/indexing-/KPI-checklist. | Actuele query/pagina/periode/filter/indexing/CWV/enhancementstatus van juiste eigenaar ontbreekt. GSC Wizard geweigerd en uitgesloten; echte eigenaargegevens gebruiken. |
| 61 / 2439–2479 | D/P/G | KPI-framework voor zichtbaarheid, lokaal, aanvragen en inhoud in masterplan/baseline. | Geen baseline van passende aanvragen, aangenomen opdrachten, omzet of ontvangen events. Herkomst van telefoon-/WhatsAppaanvragen niet gokken. |
| 62 / 2480–2497 | I/P/G | Unieke intentie-eigenaren, metadata-/similariteitstests en backlog. | Echte query-/pagina-overlap en inhoudelijke beslissing samenvoegen/verbeteren blijven datagedreven. |
| 63 / 2498–2515 | I | Data-only drafts; openbare noindexroutes voor continuïteit; uitgesloten van sitemap, navigatie en aanbevelingen. | Geen draft publiceren om een publicatieritme te halen. |
| 64 / 2516–2541 | I/P | Herbruikbare ServicePage, DistrictPage, foutcatalogus, project, advies, FAQ, CTA, breadcrumbs en layout. | Gedeelde layout bewijst geen inhoudelijke uniciteit of echt bewijs. Geen quota van componentnamen. |
| 65 / 2542–2578 | I/P/G | WebP, dimensies, next/image, font display, SSR en minder dependencies; gedateerde Lighthouse in QA. | p75 LCP≤2.5s/INP<200ms/CLS<0.1 vereist echte velddata. Lighthouse TBT is geen INP. Geen actuele veldprestatieclaim. |
| 66 / 2579–2605 | I/P | Twaalf WebP-assets uit eigenaararchief; alt, dimensies, sizes en bestandsgroottetests: `content/media.mjs`, `components/content-image.js`. | Exacte foto-/jobmatch voor project-SEO ontbreekt; algemene archieffoto niet als specifiek lokaal bewijs gebruiken. |
| 67 / 2606–2622 | P/G | Eigenaararchief bevestigd; geen synthetisch projectbewijs toegevoegd. | Oorspronkelijke foto, metadata, rechten en jobreferentie per case ontbreken. `verified:true` is op zichzelf geen traceerbaar bewijs. |
| 68 / 2623–2647 | P/G | Case-dataset, `deriveAreaEvidence` en regionale projectquery's. | Nul matching gemeenten, districten of genoemde merken. Sterkere claims over lokale of bevoegde cases, GBP en sociale media vereisen echte werk- en toestemmingsrecords. |
| 69 / 2648–2668 | I/P/G | Telefoon-CTA, mobiele navigatie, focus, scroll en overdracht; vastgelegde 390px-checks/lab. | Volledige actuele mobiele formulierontvangst/afhandeling en veldgedrag bij layoutwijzigingen nog meten. |
| 70 / 2669–2686 | I/P/G | Echte contact-/uren-/gebieds-/bedrijfs-/reviewinformatie vroeg op homepage. | Ervaring, erkenning, actuele aantallen en specifieke jobbewijzen alleen met bewijs. Neutrale fallback bij upstreamfout. |
| 71 / 2687–2707 | I | `content/business.mjs` gebruikt zichtbaar AB Service; domein apart. | Juridische naam via officieel register onderhouden; geen willekeurige SEO-naamvarianten. |
| 72 / 2708–2724 | I | Contact, socials, uren en regio's in centrale bedrijfsconfiguratie. | Centrale opslag bewijst niet automatisch juridische juistheid van ieder veld. |
| 73 / 2725–2743 | I/G | Eigenaarbevestigde 24/7-bereikbaarheid en uren in business/schema/footer. | Geen 30-/60-minuten- of same-day-interventie beloven. Actuele goedkeuring van GBP-uren en uitzonderingen afzonderlijk. |
| 74 / 2744–2759 | C/G | Geen automatische spoedlandingpage; eerlijke bereikbaarheid. | 24/7 contact bewijst geen aparte urgente interventie- of gasnooddienst. |
| 75 / 2760–2776 | I/G | `/diensten/ontstopping`, afvoeradvies/case; eigenaarbevestigd. | Camera-, rioolmachine- of specialistische scope niet uit algemene ontstoppingsbevestiging afleiden. |
| 76 / 2777–2800 | C/G | Airco noindex, buiten navigatie/sitemap. | Actieve installatie-/onderhouds-/herstellingsscope en toepasselijk F-gas-/persoonsbewijs vóór indexeren. |
| 77 / 2801–2825 | P/G | `/tarieven` met prijsfactoren/offertecheck, geen fictieve bedragen. | Werkelijk beleid voor interventie, verplaatsing, diagnose, onderdelen en weekend ontbreekt. Een vraaglijst bevat nog geen antwoorden. |
| 78 / 2826–2848 | I/P | Zichtbare FAQ/districtvragen; geen FAQPage of rich-resultbelofte. | Sommige services missen eigen FAQ; klantvragen en beschikbaarheidsantwoorden moeten feitelijk zijn. |
| 79 / 2849–2864 | I/P/G | 78 previews buiten homepage; OG/Twitter 1200×630: `libs/social-preview.mjs`, statische route/tests en visuele QA. | Projectpreview kan een archieffoto tonen, maar bewijst geen specifieke jobmatch. Social metadata is geen verkeersresultaat. |
| 80 / 2865–2883 | I/P | Labels, skiplink, contrast, native controls, focus/fouten en ARIA-fix met tests/lab. | Volledige actuele toetsenbord-/screenreader-/WCAG-review van alle templates niet afleiden uit representatieve labscore 100. |
| 81 / 2884–2898 | I | `app/not-found.js`, globale dienstennavigatie/footer, contact/home-CTA; echte 404/noindex/geen canonical gecontroleerd. | Een ontbrekende pagina mag niet HTTP 200 geven; gedrag behouden bij nieuwe dynamische routes. |
| 82 / 2899–2916 | I/P/G | `next.config.js` hostredirects; apex-308 met pad/query vastgelegd, toegelicht in QA. | Volledige oude URL-/HTTP-/slash-ketens nog onderzoeken. Geen complete legacy-URL-lijst of nul redirectchains voor alle varianten bewezen. |
| 83 / 2917–2932 | I/P/G | Server-only keys, routevalidatie, securityheaders en vastgelegde productieaudit. | Preview/stagingheaders/indexability en security-/sourcemap-/secretreview niet volledig door SEO-crawl bewezen. Negen ontwikkelbevindingen blijven apart. |
| 84 / 2933–2946 | I/P/G | Client-/API-contactvalidatie en gedateerd transportbewijs; telefoon/WhatsApp behouden. | Oktober-QA verstuurde nul contact-POSTs. Mailgun-acceptatie in september is geen actuele daadwerkelijke mailboxontvangst. |
| 85 / 2947–2961 | D/G | Afzonderlijke advertenties-/LSA-sectie in `external`. | Actuele Belgische beschikbaarheid, geschiktheid, budget, conversies en operationele acceptatie vóór campagne. Geen spendclaim. |
| 86 / 2962–2985 | D/P/G | Bing-/Appleplan; beveiligde IndexNow met offline als standaard en rootkey. | Batch met twee URLs gaf 202: keyverificatie loopt. Geen indexing of Bing-property/Places/Apple-configuratie. Geen herhaalde cosmetische/runtime-submissions. |
| 87 / 2986–3006 | I/P/G | Entity, rendering, directe antwoorden, schema en linkprincipes aanwezig. | Eerstehands lokaal projectbewijs en gemeten Google-/AI-zichtbaarheid blijven open. Geen kunstmatige AI-SEO-sectie voor klanten. |
| 88 / 3007–3025 | I/P | Duidelijke diensten/CTA's, probleemgidsen, prijsfactoren en officiële review-API. | Werkelijk lokaal projectbewijs en eigen transparante kosten onvolledig. Geen concurrentteksten of resultaten overnemen. |
| 89 / 3026–3078 | P | `policy`, register en tests controleren technische velden, staat, uniciteit en bronstructuur. | Inhoudelijke review van intentie, lokale waarde, feiten, commercieel nut, conversie en spamrisico volgt niet uit booleans/stringlengtetests. |
| 90 / 3079–3158 | I/P | Infrastructuur A–H en primaire inhoud uitgebreid, geen volledige herbouw. | Geografisch bewijs, projectschema en accountuitkomsten gedeeltelijk. Volgorde aangepast aan echte feiten. |
| 91 / 3159–3208 | D/C | Cadence als bewijsafhankelijke roadmap, geen quota; masterplan/backlog. | Letterlijk weekschema hoeft niet bewezen; nooit indexeren om week zes te halen. |
| 92 / 3209–3275 | P | Alle zes gevraagde documenten bestaan, plus Phase E/register/status/baseline. | Historische cijfers, schema-uren en claim dat klantcopy voltooid is onderscheiden van actuele snapshot. Inventorylinks en volledigheid van bewijs verder controleren. |
| 93 / 3276–3298 | I/P | Tests/scripts voor metadata, canonical, drafts, sitemap, links, assets, JSON-LD, orphans en fragmenten. | Syntax-, schema- en veldtests bewijzen geen echte feiten of lokale waarde. Geen zware dependencies nodig. |
| 94 / 3299–3322 | I/P | QA legt 114 tests, lint/build, clean hosted installatie, audit/crawl onder Node 24 vast; runtimeconfiguratietest. | Bewijs per release/HEAD; 114 tests is niet 113 promptsecties voltooid. Geen aparte TypeScriptchecker voor JS-project zonder TS-setup; formatter/diffcheck proportioneel. |
| 95 / 3323–3363 | P | Gedateerde/live desktop- en mobiele checks van kern-, hub-, merk-, fout-, case-, contact- en toolpagina's in QA. | Geen complete nieuwe acceptatieset van minimaal elf pagina's: onderhoud, herstel, keuring, sanitair/installatie en menu/formulieren/WhatsApp/toetsenbord/console samen. |
| 96 / 3364–3384 | I/P/G | Gedateerde lab-baseline/na-metingen; live home/tool/Remeha-scores, bytes, LCP, CLS en TBT. | Verschillende releases, pagina's, lokale/live omstandigheden en runs zijn geen uniforme voor/na-vergelijking. Geen veld-CWV. |
| 97 / 3385–3399 | I | Crawler controleert productie-HTML, metadata, tekst, links, JSON-LD en H1; lokale/live gates vastgelegd. | HTML-parse bewijst geen inhoudelijke kwaliteit, veldprestaties of zoekresultaten. |
| 98 / 3400–3412 | I/G | Sitemap gelijk aan published register; status, canonical en indexability door crawler gecontroleerd. | Actuele GSC-acceptatie, indexing en gekozen canonical afzonderlijk. |
| 99 / 3413–3426 | P | Geen 304 lege routes; registers en inhoudelijke secties aanwezig. | Inhoudelijke review vooral voor districten, provincies en merkcases. Twee andere paragrafen bewijzen geen volledige bruikbaarheid. |
| 100 / 3427–3434 | I/P | Geen algemene keyword-footerblokken; bruikbare linkhubs. | `/werkgebied` bevat SEO-procesuitleg; herschrijven voor klantnut. |
| 101 / 3435–3447 | I/P | Geen verborgen keywordtekst; filter als gebruiksverbetering boven volledige initiële HTML. | CSS/redactionele review behouden. Legitieme filter/accordion is op zichzelf geen spam. |
| 102 / 3448–3459 | I/P | Geen publicatielus van honderd/304 stadsvarianten; gedeelde layout/data voor specifieke gidsen. | Iedere bestaande indexeerbare pagina vraagt inhoudelijke beoordeling van klantwaarde; aantallen/tests garanderen dit niet. |
| 103 / 3460–3482 | I | Copy over bediend gebied, geen districtvestigingsclaim. | Alleen werkelijk bemande fysieke locatie noemen met bewijs; huidige dataset bewijst dit niet. |
| 104 / 3483–3492 | I | Geen fictieve kantoor-map of route-CTA. | Officiële Google-profielkoppeling toegestaan; juridische adresvraag apart. |
| 105 / 3493–3507 | I | Geen postcodepaginafactory of keywordblokken in register. | Postcode alleen waar werkelijk nuttig; geen toekomstige schaalvariant. |
| 106 / 3508–3519 | I/P | Scope-, proces- en intakecopy doorgaans concreet en sober. | Belofte dat extra werk vooraf besproken wordt moet echt bedrijfsbeleid zijn; aanbeveling niet als garantie voorstellen. |
| 107 / 3520–3533 | P | Districtlayout, services, nabije gebieden en FAQ aanwezig. | Inhoudelijk lokaal bewijs ontbreekt; verschillende geografiecopy bewijst geen lokale ervaring. |
| 108 / 3534–3549 | P/G | Tariefpagina vraagt naar reis, materialen, btw, scope, meerwerk en planning. | Concrete interventieberekening, inbegrepen reis/materialen, prijsbekendmoment, vaste onderhoudsprijs en weekendbeleid ontbreken. Geen bedragen verzinnen. |
| 109 / 3550–3561 | I/P/G | Entity in business/schema/architectuur; Phase E vervangt het nauwe gebiedsvoorbeeld door volledige dekking. | Echt klant-/merkproject-/geografisch bewijs en commercieel resultaat niet volledig aangetoond. |
| 110 / 3562–3602 | P/G | Veel technische acceptatiepunten bestaan; afzonderlijke subcriteria hieronder. | Volledige eindacceptatie niet vastgesteld; concrete lacunes niet vermengen tot score. |
| 111 / 3603–3697 | P | Verslagen, inhoudsinventaris, changelog, externe acties en roadmap dekken veel A–K-onderdelen. | Eén samenhangend actueel rapport over URL's, bewijs, tests, performance en acties ontbreekt. Historische claims scheiden; geen alles-compleetmelding. |
| 112 / 3698–3752 | I/P/G | Bruikbare dekking, merken, advies, tool/CTA en heldere bewijsgrenzen. | Meer passende aanvragen, lokale autoriteit en vertrouwen zijn doelen, geen gemeten uitkomsten. Veilige resterende content-/technische planning kan naast bewijsafhankelijkheden voortgaan. |

## Eerste 30 pagina-intenties: werkelijk beschikbare bestemming

“Published” hieronder beschrijft de bronstatus; geen bewezen Google-indexering. Voorbeelden van de prompt zijn geen reden om naast een bestaande goede bestemming een tweede keyword-URL te bouwen. Drie ontbrekende localitypagina's zijn een bewuste kwaliteitsgate.

| Promptpagina / bron | Werkelijke route | Staat / concrete beperking |
|---|---|---|
| 1 / M424–462 | `/` | Gepubliceerde homepage met Antwerpse intentie, telefoon, WhatsApp en contact; neutrale fallback voor echte Places-data. |
| 2 / M463–509 | `/onderhoud` | Gepubliceerd; regionale regels, proces, bronnen en onderhoudstool. Geen erkenning verzinnen. Eigen FAQ, merkcontext en lokaal bewijs verdiepen waar nuttig. |
| 3 / M510–547 | `/herstelling` | Gepubliceerd; geen verwarming of warm water, storingen, druk en resetgrenzen. Symptoomuitleg en intake verder verdiepen op basis van echte vraagdata. |
| 4 / M548–584 | `/installaties/gasketels` | Gepubliceerd; dienstafbakening, offerte, steun en links over ingebruikname. De keuze tussen herstellen en vervangen wordt nog niet uitgebreid behandeld. |
| 5 / M585–612 | `/installaties/sanitair` | Gepubliceerd; afgebakend sanitairwerk met badkamer-, advies- en caselinks. Geen volledige renovatie door alle vakdisciplines claimen. |
| 6 / M613–640 | `/keuring` | Gepubliceerd; eerste gebruik of wijziging onderscheiden van periodieke keuring, met regels voor Vlaanderen en Brussel. |
| 7 / M641–666 | `/diensten/waterlek-herstellen` | Gepubliceerd alternatief; geen dubbele `/lek-herstellen-antwerpen`-pagina nodig. |
| 8 / M667–694 | `/diensten/lekdetectie` | Gepubliceerd alternatief; geen claim over thermische, akoestische of tracergasapparatuur zonder bewijs. |
| 9 / M695–720 | `/diensten/boiler` | Gepubliceerd alternatief; warmwateradvies en context. Bestaande toestellen en dienstafbakening behouden. |
| 10 / M721–744 | `/diensten/leidingen` | Gepubliceerd alternatief; geen extra zoekwoord-URL nodig. |
| 11 / M745–770 | `/diensten/badkamerrenovatie` | Gepubliceerd alternatief; loodgieters- en sanitairwerk, zonder onbewezen projectmanagement. |
| 12 / M771–810 | `/tarieven` | Gepubliceerde pagina met prijsfactoren; eigen bedragen, kosten en weekendbeleid ontbreken. |
| 13 / M859–876 | `/loodgieter-hoboken` | Gepubliceerd; geen matching lokale case of review. |
| 14 / M877–892 | `/loodgieter-wilrijk` | Gepubliceerd; geen matching lokale case of review. |
| 15 / M893–908 | `/loodgieter-deurne` | Gepubliceerd; geen matching lokale case of review. |
| 16 / M909–924 | `/loodgieter-berchem` | Gepubliceerd; geen matching lokale case of review. |
| 17 / M925–936 | `/loodgieter-merksem` | Gepubliceerd; geen matching lokale case of review. |
| 18 / M937–948 | `/loodgieter-borgerhout` | Gepubliceerd; geen matching lokale case of review. |
| 19 / M949–960 | Geen route; `edegem` areaDraft | Draft zonder route. |
| 20 / M961–972 | Geen route; `mortsel` areaDraft | Draft zonder route. |
| 21 / M973–984 | `/loodgieter-ekeren` | Gepubliceerd; geen matching lokale case of review. |
| 22 / M985–996 | Geen route; `kontich` areaDraft | Draft zonder route. |
| 23 / M1122–1137 | `/merken/vaillant` | Gepubliceerde onafhankelijke dienstverlening, zonder partnerclaim. |
| 24 / M1138–1149 | `/merken/bulex` | Gepubliceerde onafhankelijke dienstverlening, met context voor geselecteerde modellen. |
| 25 / M1150–1161 | `/merken/bosch` | Gepubliceerde onafhankelijke dienstverlening, met context voor geselecteerde modellen. |
| 26 / M1162–1173 | `/merken/junkers` | Gepubliceerde onafhankelijke dienstverlening; geen bewijs van lokale merkcases. |
| 27 / M1174–1197 | `/foutcodes` | Gepubliceerde hub met dertien gidsen en 964 getoonde bronregels. |
| 28 / M1198–1215 | `/foutcodes/vaillant` | Gepubliceerd, met bron- en modelafbakening; geen claim over alle Vaillant-modellen. |
| 29 / M1216–1237 | `/foutcodes/bulex` | Gepubliceerd, met bron- en modelafbakening; geen claim over alle Bulex-modellen. |
| 30 / M1338–1361 | `/projecten` | Gepubliceerd met zes cases; traceerbaarheid en lokale merkdetails zijn gedeeltelijk. |

De 30 oorspronkelijke intenties hebben dus **27 gepubliceerde bestemmingen en 3 drafts zonder route**; dit zegt niet dat 27 pagina's inhoudelijk volledig aan alle acceptatiepunten voldoen. Phase E voegt Borsbeek en bredere dekkingshubs toe; latere groei voegt aanvullende merken, adviezen en een tool toe.

## Sectie-voor-sectie: Phase E

| Sectie / E-regels | Status | Wat bestaat, bewijsbestand | Afzonderlijke resterende eis / bewijsgrens |
|---|---|---|---|
| Preambule / 1–23 | I | De eigenaar bevestigt het volledige grondgebied; het register bevat 285 Vlaamse en 19 Brusselse gemeenten. | Dekking bewijst geen 304 routes, vestigingen of lokale projecten. |
| E1 / 24–65 | I/P | `/werkgebied` → zes regiohubs → geselecteerde districten; 302 gebiedsdrafts. | Toekomstige gemeentepagina's vereisen aangetoonde klantwaarde en vraag. Geen gelijktijdige publicatie van 304 pagina's. |
| E2 / 66–115 | I/P | `content/service-areas.mjs` bevat regio, provincie, type, bediend gebied, prioriteit, indexeerbaarheid, intentie en bewijsvelden; districten vallen onder Antwerpen. | Niet alle velden zijn onderbouwd met werk- of vraagbewijs. De centrale koppeling van scores en bewijs is infrastructuur, geen ingevulde dataset. |
| E3 / 116–165 | I/P | Gebiedsoverzicht met groepen, dekkingsclaim en filter; alleen gepubliceerde pagina's krijgen links. | Technische SEO- en redactietaal is zichtbaar aan klanten en moet worden herschreven; zie bevindingen. Er zijn geen 304 lege gemeentelinks. |
| E4 / 166–223 | P/G | `app/werkgebied/[regio]/page.js`: zes hubs met diensten, gemeenten, grote steden, FAQ en CTA. Antwerpen toont dynamisch zes cases. | De andere hubs hebben geen lokale cases of reviews. Gedeelde structuur en korte, verschillende planningsteksten bewijzen geen volledige regionale expertise. |
| E5 / 224–303 | I | Exact 67 Antwerpse gemeenten in het centrale register en de dekkingsbron. | Dit betekent geen publicatie van 67 gemeentepagina's. |
| E6 / 304–345 | I/P/G | Tien districten, inclusief Borsbeek sinds 2025; Antwerpen gebruikt de homepage, acht aanvullende pagina's zijn indexeerbaar en B-Z-L heeft noindex. | Zoekwoord- en SERP-onderzoek naar een gezamenlijke of afzonderlijke B-Z-L-intentie ontbreekt. De andere districten hebben geen matching lokale cases of reviews. |
| E7 / 346–388 | I | Exact 38 Limburgse gemeenten. | Dekking bewijst geen lokale autoriteit of vestiging. |
| E8 / 389–448 | I | Exact 55 Oost-Vlaamse gemeenten, inclusief fusiegemeenten. | Geen automatische publicatie van 55 routes. |
| E9 / 449–516 | I | Exact 63 Vlaams-Brabantse gemeenten, inclusief Pajottegem. | Geen automatische publicatie van 63 routes. |
| E10 / 517–583 | I | Exact 62 West-Vlaamse gemeenten. | Geen automatische publicatie van 62 routes. |
| E11 / 584–623 | I | Negentien Brusselse gemeenten; `/werkgebied/brussel` draagt deze intentie. Geen dubbele `/loodgieter-brussel`-pagina. | De intentie voor stad en gewest later controleren met echte zoekopdrachten. Geen dubbele pagina om een quota te halen. |
| E12 / 624–672 | C/G | Nederlandstalige Brusselhub; geen onbevestigde claim van Franstalige dienstverlening. | Vóór een Franse sectie zijn operationele Franstalige ondersteuning, onderhouden natuurlijke vertalingen, nl-BE/fr-BE-hreflang, self-canonicals, metadata, CTA, FAQ en schema nodig. |
| E13 / 673–735 | P/G | `content/service-area-scoring.mjs`: zeven factoren met maxima 5/5/5/3/5/4/3; onbekende waarden blijven null. | Nul gemeenten hebben een volledige score. Echte vraagdata, GSC-posities 4–30, projecten, reviews, commerciële waarde, operationele haalbaarheid en concurrentie ontbreken. De GSC-analyser gebruikt 8–20 voor een andere beoordeling; dat is geen E13-score. |
| E14 / 736–776 | P/G | Kandidaten in de Antwerpse metropool hebben een voorlopig niveau in het register; districten zijn apart opgenomen. | Kwaliteit, SERP en bewijs per plaats zijn geen ingevulde prioriteringsdataset. Niet alle 28 kandidaten publiceren. |
| E15 / 777–845 | P/G | Grote steden en een onderzoekslijst met de volgende twintig kandidaten zijn opgenomen. | Zoekvraag, SERP, unieke inhoud, commerciële waarde en operationele haalbaarheid zijn nog niet per stad uitgewerkt. |
| E16 / 846–871 | I/P | Gedeelde layout, zonder 304 vergelijkbare gepubliceerde pagina's. | Individuele inhoudelijke beoordeling van onderscheidende klantwaarde blijft nodig, los van een lexicale test. |
| E17 / 872–889 | P/G | Kandidaatvoorwaarden voor vraag, GSC, werk, reviews en lokale waarde, plus een draftregister. | De huidige dataset toont geen gemeente die aantoonbaar aan alle voorwaarden voor een eigen pagina voldoet. |
| E18 / 890–920 | P | Districtpagina's hebben metadata, H1, intro, diensten, nabije gebieden, FAQ, CTA, canonical en breadcrumb; een test vergelijkt 8-grams. | Handmatige beoordeling van lokale waarde, juistheid, projectbronnen en intentie ontbreekt. Een Jaccard-score onder .2 bewijst geen inhoudelijk onderscheid. Een gateboolean is geen bewijsregister. |
| E19 / 921–948 | I/G | `/loodgieter-{district}`, Antwerpse homepage en Brusselse regiohub; geen dubbele lokale routes. | Beslissingen over zoekintentie en cannibalisatie blijven afhankelijk van echte zoekdata. |
| E20 / 949–986 | I | Geen dienst×gemeentematrix; districten linken naar centrale diensten. | Een latere combinatiepagina vereist aantoonbaar onderscheidende intentie en bewijs. Geen automatische reeks van 3.040 pagina's. |
| E21 / 987–1008 | I/P | Gewoon gemeenteoverzicht; namen zonder eigen route krijgen geen link. | Regio- en klantteksten blijven redactioneel te beoordelen. Gemeentenamen niet als zoekwoordlijsten in lopende tekst verwerken. |
| E22 / 1009–1025 | I | `libs/schema-data.mjs` gebruikt twee brede AdministrativeAreas, geen 304 afzonderlijke entries. | Serviceschema en areaServed per specifieke pagina zijn optioneel; geen fictieve geodata. |
| E23 / 1026–1051 | D/G | `GOOGLE_BUSINESS_SERVICE_AREA_PLAN.md` beschrijft maximaal twintig gebieden, de grens van circa twee uur en periodieke beoordeling van kandidaten. | Huidige eigenaar, profielbasis, adres, uren, werkelijk geselecteerde gebieden en de status van de septemberwijziging of het bezwaar zijn onbekend. |
| E24 / 1052–1069 | I/D/G | Het verschil tussen websitebereik en nabijheid in Maps is gedocumenteerd. Geen belofte van een local pack in iedere gemeente. | Echte prestaties in organisch zoeken en het local pack ontbreken. Geen prognose als bewezen resultaat presenteren. |
| E25 / 1070–1103 | I/P | Dekkingsinterface met zes groepen, aantallen, filter en toegankelijke zoekfunctie. | SEO-procestekst maakt de klantflow onnodig technisch. Het filter telt 314 gebieden, niet 304 gemeenten. |
| E26 / 1104–1124 | I/P | `components/municipality-filter.js`: label, native input, toetsenbordbediening, live aantallen, lichte JavaScript en aanvankelijk servergerenderde lijst. | Gedateerde controles voor Gent, nul resultaten en 390px zijn vastgelegd. Actuele handmatige toetsenbord- en volledige toegankelijkheidscontrole blijft een releasevoorwaarde. |
| E27 / 1125–1155 | P/G | `deriveAreaEvidence` leidt caseaantallen, reviewvelden, projectdrempels van vijf of drie, reviewdrempel van drie en scores af; de projectguide beschrijft de werkwijze. | Huidige cases matchen nul gemeenten. Er is geen volledig uitgewerkte invoer van echte velden, foto's en toestemmingsreferenties. Andere onbekende factoren houden de score null. Eén werkopdracht leidt niet automatisch tot indexeerbaarheid. |
| E28 / 1156–1181 | P/G | Districtpagina's tonen voorwaardelijk een blok met matching projecten. | Het projecttemplate mist een resolver voor gepubliceerde gebieds- en merklinks. Huidige cases bevatten geen goedgekeurde gemeente, district of merk. Wederzijdse project- en gemeentelinks zijn nog niet met actuele cases aangetoond. |
| E29 / 1182–1205 | I/P/G | Projectdetail → geverifieerde provinciehub; hub → dynamisch gevalideerde matching cases. | Alleen Antwerpen heeft zes cases; de overige provincies nul. Links bewijzen de architectuur, niet de traceerbaarheid van provinciale caserecords. |
| E30 / 1206–1229 | I | Hubs linken naar centrale dienstpagina's; geen zes gekopieerde onderhoudspagina's. | Contextuele dienst→regiolinks beoordelen op nut; geen dichte matrix met irrelevante links. |
| E31 / 1230–1263 | D/P/G | De eigenaar bevestigt het gehele bediende gebied. Antwerpse metropool → grote steden is als voorlopig niveau en onderzoekslijst vastgelegd. | Een volledig gerangschikt regionaal investeringsplan met data en bewijs ontbreekt; niveau 2 groepeert verschillende regio's. Geen echte vraagscore. |
| E32 / 1264–1287 | I/P/G | Eerlijke architectuur en entiteit voor één bedrijf in Vlaanderen en Brussel. | Begrip door zoekmachines en autoriteit op basis van merken, echt werk en reviews zijn niet gemeten. Specifiek lokaal bewijs ontbreekt. |
| E33 / 1288–1313 | I | Geen fictieve vestigingen in Gent, Hasselt of Brussel; teksten beschrijven reizen vanuit een SAB. | Een toekomstige claim over een bemande vestiging vereist echt bewijs. |
| E34 / 1314–1338 | P/G | `SERVICE_AREA_REGISTRY.md` en `PHASE_E_SERVICE_AREA_REPORT.md` documenteren 304 gemeenten, tien districten, zes hubs, acht gepubliceerde districtpagina's, 302 drafts zonder route, bewijs, links en de volgende twintig onderzoekskandidaten. | Het Phase E-rapport van 16 september met 34 indexeerbare pagina's is historisch. De huidige 79 vereisen een afzonderlijke actuele snapshot. Search Console-kansen zijn onbekend; de shortlist is onderzoek, geen publicatiebeslissing. |

## M110: afzonderlijke finale acceptatiepunten

De oorspronkelijke sectie bevat 34 bullets. Ze zijn hieronder elk gekoppeld aan bewijs en een eventuele beperking.

| Acceptatiepunt uit M3562–3602 | Huidig bewijs / resterende grens |
|---|---|
| Huidige SEO-fouten gecorrigeerd | Veel crawlerfouten opgelost; een complete actuele lijst van inhoudelijke fouten, URL-varianten en accountproblemen is niet vastgesteld. |
| Onderhoud en keuring gescheiden | Bron aanwezig, met afzonderlijke regionale regels en bronnen. |
| Premieclaims veilig en actueel | Overheidslinks en copy bijgewerkt; periodieke broncontrole blijft nodig. |
| Homepage heeft duidelijke Antwerp-intentie | Register en hero aanwezig. |
| Belangrijke services hebben duidelijke intentie | Bron aanwezig; onbevestigde airco blijft noindex. |
| Geen onnodige duplicate of cannibalisatiepagina | Intentiekaart aanwezig; werkelijke zoekcannibalisatie onbekend. |
| Unieke titels | Registertests en gedateerde crawl controleren dit. |
| Unieke en logische H1s | Eén H1 en metadata gecontroleerd; inhoudelijke beoordeling van headings blijft nodig. |
| Bruikbare metadata | Bron en unieke velden aanwezig; CTR onbekend. |
| Correcte canonicals | Generator, crawl en vastgelegde host-308; Googles keuzes onbekend. |
| Correcte sitemap | Published register stuurt generator; drafts/noindex uitgesloten. Acceptatie en indexing onbekend. |
| Correcte robots | Publieke routes toegestaan, API uitgesloten; preview/stagingheaders apart controleren. |
| Geldige structured data | JSON en entiteiten getest; geen actuele afzonderlijke externe semantische validatoruitslag. |
| Navigatie verbeterd | Services, merken, gebieden, advies en contact met gewone links. |
| Footer ondersteunt interne links | Published services, regio's en kennis; geen drafts. |
| Mobiele contactflow werkt | Voorinvullen, focus en scrollgedrag vastgelegd; ontvangst niet opnieuw vastgesteld. |
| Telefoonlinks werken | Tel-URI en bron/browserlink gecontroleerd; daadwerkelijke afhandeling onbekend. |
| Formulier werkt | Validatie/API en historische Mailgun-acceptatie; oktober verstuurde nul contact-POSTs. Huidige mailboxontvangst onbekend. |
| Reviews niet verzonnen | Officiële Places-data en neutrale fallback; geen fictieve kaarten of reviewschema. |
| Adres niet misleidend | Geen storefrontclaim; correcte geregistreerde/juridische adresinformatie blijft een afzonderlijke vraag. |
| Gebiedspagina's echt | Dekking bevestigd, geografie onderbouwd; acht districten hebben nul matching cases/reviews. Klantwaarde gedeeltelijk beoordeeld. |
| Geen doorwaypagina's | Geen 304-matrix; bestaande lokale inhoud moet afzonderlijk beoordeeld worden. |
| Geen weinig waardevolle schaalinhoud | Publicatiebeleid en geselecteerde gidsen; inhoudelijke bewijswaarde volgt niet uit testaantallen. |
| Merkpagina's correct verbonden | Merk↔foutcode/service aanwezig; echte merkcaselinks ontbreken. |
| Foutcodecluster verbeterd | Dertien afgebakende gidsen en 964 getoonde bronregels; geen dekking van alle merkmodellen. |
| Projectinfrastructuur bestaat | Model, template en gate aanwezig; gedetailleerde bewijsreferenties nog gedeeltelijk. |
| Echte projecten makkelijk toevoegen | Guide/schema aanwezig; invoer van bewijs, model, diagnose en referenties verbeteren. |
| Performance niet achteruit | Gedateerde labmetingen; actuele veld-p75 en vergelijkbare baseline onvolledig. |
| Toegankelijkheid niet achteruit | Gedateerde lab- en focuschecks/ARIA-fix; complete actuele handmatige audit niet vastgesteld. |
| Productiebuild slaagt | Specifieke releases onder Node 24 vastgelegd; geen garantie voor iedere latere HEAD. |
| Browserconsole schoon | Representatieve checks vastgelegd; geen nieuwe complete set van alle elf minimumpagina's. |
| Interne links geldig | Register/linkgraph/fragmenten/assets gecontroleerd door de vastgelegde crawler. |
| Drafts niet indexeerbaar | 302 data-only drafts; uitgesloten van navigatie/sitemap. Twee openbare noindexroutes apart. |
| Documentatie compleet | Gevraagde bestanden bestaan; historische snapshots en gedeeltelijke eisen moeten duidelijk gescheiden blijven. |

## M111: afzonderlijke rapportvereisten A–K

| Onderdeel / M3603–3697 | Reeds beschikbaar | Voor een eerlijke finale rapportage nog nodig |
|---|---|---|
| A Wat gevonden | QA-baseline: zware widget/beelden, vaste ratings, dubbele sitemaps, onveilige claims, privacy en lastmod. | Gedateerde baseline onderscheiden van actuele bevindingen. |
| B Wat gewijzigd | Changelog, masterplan en gedateerde QA. | Eén samenhangende lijst betekenisvolle wijzigingen; verlaten aanpakken niet als actuele implementatie noemen. |
| C Bestaande URL's gewijzigd | Inventory/changelog en kernpagina's. | Exacte lijst tegen relevante baseline; niet alle 81 routes als nieuw tellen. |
| D Nieuwe URL's | Register en clusterinventaris. | Per URL intentie, staat, publicatiereden en werkelijk bewijs; algemene booleans zijn geen lokaal projectbewijs. |
| E Drafts | 302 gebiedsdrafts, twee noindexroutes apart en bewijsbacklog. | Complete kandidaten-/statuslijst en exact ontbrekend bewijs. |
| F Technische SEO | Bron, crawler, schema en redirectdocumentatie. | Actueel bewijs per specifieke release en onbekende account-/validatoruitkomsten expliciet. |
| G Interne links | Service↔advies, merk↔foutcodes, provincie↔project en nabije districten. | Ontbrekende specifieke gebieds-/merkprojectlinks als gedeeltelijk benoemen. |
| H Performance | Gedateerde lokale en live Lighthouse-baseline/resultaten. | Gelijke omstandigheden voor vergelijkingen; geen INP uit TBT of veld-CWV-belofte. |
| I Tests | QA/CI-runs, 114 tests en Node 24-configuratie. | Testaantal is geen promptvoltooiing; UI, afgebroken analytics en werkelijke ontvangst scheiden. |
| J Externe acties | Externe actielijst en GBP-gebiedsplan. | Actuele juiste eigenaar-/profielstatus vóór wijzigingen; publieke citationaudit. GSC Wizard uitgesloten. |
| K Contentroadmap | Backlog, volgende twintig onderzoekskandidaten, bronideeën/toolbrief en Remeha-kandidaat. | Prioriteit koppelen aan echte klantvraag/bewijs en acceptatie; geen verzonnen volumes of automatische publicatie. |

## Concrete overschattingen en planninggaten

1. **De statusledger is geen 113-puntenacceptatie.** Hij groepeert secties en beschrijft technische checks. Dit document maakt onderliggende open vragen zichtbaar. Ook deze 147 sectierijen zijn geen resultaatpercentage.
2. **Gemengde releasesnapshot.** Masterpromptstatus heeft de oude zin “These 113 tests” onder het nieuwere 114-resultaat. Status/baseline noemen ook oude 98 tests/32 assets naast nieuwere 114/110. QA vermeldt lager “no hours” in schema, terwijl de huidige schemafunctie eigenaarbevestigde uren uitzendt. Het Phase E-rapport zegt 34 indexable en dateert van 16 september; de huidige 79 published routes moeten daarvan onderscheiden worden. Historische resultaten zijn niet fout wanneer duidelijk zo gelabeld.
3. **Claim over klantcopy te ruim.** `app/werkgebied/page.js` toont “Tien districten, zonder dubbele Antwerpen-pagina”, “hoofdlanding”, “indexeerbare pagina”, “niet-geïndexeerde onderzoeksroute” en “ook zonder JavaScript leesbaar”. Een toekomstige copywijziging kan klanten laten kiezen, dekking laten controleren en de aanvraag voorbereiden. Hiervoor is geen nieuw eigenaarfeit nodig.
4. **Gebiedsgate is beperkter dan de algemene beleidsclaim.** `isDistrictPublishable` test de slug, een prioriteitsboolean, unique-contentboolean, bronstatus HTTP 200 en FAQ-aantal/antwoordlengte. De Jaccardtest vergelijkt achtwoordgroepen en voorkomt sterke letterlijke overlap. Geen van beide bewijst actuele vraag, lokaal project-/reviewbewijs of uniek klantnut. Beoordeel de acht bestaande districten gericht; niet automatisch verwijderen of indexeren op basis van één signaal.
5. **Projectgate mist bewijsidentiteit.** Hij accepteert niet-lege `workEvidence`, `customerApproval:true` en `photo.verified:true`. Expliciete velden voor model, diagnose, private werkbon, fotoprovenance en toestemming ontbreken. Zes eigenaarbevestigde werktypes zijn geldige informatie, maar geen traceerbaar bewijs van specifieke huis-/merk-/foto-/lokale cases. Beelden worden tussen cases hergebruikt. Private bewijsreferenties kunnen bestaan zonder klantgegevens te publiceren; deze audit ontkent de eigenaarbevestiging niet.
6. **Contextuele links zijn gedeeltelijk.** Kernservices hebben niet overal relevante merk-/gebiedslinks of eigen FAQ. Het districtprojectblok heeft geen matching data. De projecttemplate linkt service/provincie maar resolveert nog geen specifieke published gemeente/merk; de benodigde feiten ontbreken ook. De provincie↔projectkoppeling werkt wel.
7. **Organisatorische auteur is geen technicusbewijs.** Advies noemt AB Service en echte broncontroledatums. Dat is nuttig, maar bewijst niet dat een individueel bevoegde technicus elke gids heeft beoordeeld. Geen reviewer of erkenning verzinnen.
8. **Commerciële meting staat open.** Actuele juiste eigenaar-GSC/GBP/analyticsdata, ontvangen mail, ontvangen events en passende/geaccepteerde aanvragen ontbreken. Afgebroken QA-POSTs, SDK HTTP 200, voorinvullen en 114 tests zijn geen leads. Ontbrekende data betekent niet nul verkeer. Septemberverificatie, 71 ontdekte URLs en profielaanvragen zijn historische observaties.
9. **Publieke profiel-/citationaudit kan zelfstandig voortgaan.** Een gedateerde read-only vergelijking van URLs, naam, telefoon, adres en uren kan starten zonder GSC-export of nieuwe projectpublicatie. Niet al dat onderzoek is accountgebonden. Wijzigingen en outreach vereisen toepasselijke scope en echte feiten; reeds gegeven autorisatie hoeft niet routinematig opnieuw gevraagd te worden.
10. **Performance/securityacceptatie blijft afzonderlijk.** Node 24 is vastgelegd als effectieve runtime naast package/CI/pin; de oude projectinstelling 22 is niet doorslaggevend. Lab 100 en nul productieadvisories zijn momentopnamen, geen veld-INP, volledige WCAG- of staging/securityaudit. Negen ontwikkelbevindingen blijven zichtbaar. `git_info_fail` is historisch, latere automatische publicatie slaagde; de oorzaak is onbekend.
11. **Voorwaardelijk niet bouwen is soms correct afgerond gedrag.** Geen onbevestigde airco, Frans, vaste prijzen, nooddienst-/vestigingsclaims of service×citymatrix publiceren is conform de prompt. “Ontbreekt” is geen toestemming voor fictie.
12. **Bronartikelen leveren ideeën, geen AB Service-feiten.** Het bronideeëndocument behandelt vier geplakte SEO-artikelen; het onderzoeksdocument toetst gekozen officiële richtlijnen. Auteursverkeer, AI-citaties, reviewvelocity, geotagging of betaalde rankinglinks zijn geen forecast of eigenaargegevens. De tweede watermeterobservatietool is een toekomstbrief, nog geen gebouwd product.

## Eigenaarsbewijs versus technische acceptatie

| Werkstroom | Kan worden voorbereid zonder nieuw eigenaarfeit | Vereist werkelijk bewijs/acceptatie vóór sterke claim |
|---|---|---|
| Klantcopy en kerninhoud | SEO-jargon verwijderen; bestaande brongebonden uitleg, FAQ en contextuele links verdiepen. | Geen prijs, erkenning of nieuwe dienstverlening als feit invullen; nieuwe URL vereist eigen intentie/klantnut. |
| Lokale cases/projectmodel | Private bewijs-ID's, model-/diagnosevelden, invoertemplate en previewgate ontwerpen; acht districten inhoudelijk beoordelen. | Werkbon, goedgekeurde gemeente/merk/datum, fotomatch en toestemming; daarna passende content/links/publicatiestaat en QA. |
| Zoekdata en uitkomsten | Exportanalyzer en privacyvriendelijke classificatie/acceptatieplan hergebruiken. | Exacte eigenaarproperty, periode, type, filters en echte query/paginaparen; indexing, veld-CWV, mail-/eventontvangst en passende opdrachten. |
| Publieke GBP/citations | Gedateerde URL-voor-URL-observaties en afwijkingstabel. | Juiste profielidentiteit, huidige approval/accountvelden en legitieme wijzigingsrechten vóór schrijven; geen ongevraagd berichtenverkeer. |
| Voorwaardelijke bedrijfsdiensten | Intakecriteria voor airco, Frans, spoed en prijslijst behouden. | Actieve scope, juiste personen/erkenningen/F-gas, onderhouden prijsbeleid en taalondersteuning. |
| Release-QA | Concrete browseracceptatie voor elf pagina's, toetsenbord, formulieren, noindex, normalisatie en schema beschrijven. | Werkelijke uitvoer, specifieke commit/productiealias/runtime, proportionele browser/labchecks; daadwerkelijke ontvangst apart. |

De volgende twintig gemeente-reviews blijven **onderzoekskandidaten**: Edegem, Mortsel, Kontich, Schoten, Brasschaat, Kapellen, Wommelgem, Wijnegem, Aartselaar, Boechout, Ranst, Lier, Mechelen, Turnhout, Geel, Vilvoorde, Zaventem, Leuven, Gent en Hasselt. Hun volgorde is voorlopig inhoudelijk oordeel, geen gemeten vraagscore of toestemming alle twintig te publiceren. GSC Wizard wordt niet aanbevolen of gebruikt.
