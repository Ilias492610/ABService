# Volledig SEO-meesterplan voor AB Service

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Voer afgebakende werkpakketten uit met onafhankelijke review en echte verificatie. De checkboxes zijn vervolgwerk, geen reeds uitgevoerd resultaat.

**Goal:** Meer passende aanvragen en opdrachten uit organisch, lokaal en ondersteund AI-zoekverkeer, met een herleidbare beslissing voor ieder detail uit de oorspronkelijke prompt en alle aangeleverde SEO-bronnen.

**Architecture:** Verbeter de bestaande Next.js-website in plaats van haar opnieuw te bouwen. Houd bedrijfsfeiten, content, publicatiestatus en meetbewijs centraal. Nieuwe pagina's en tools moeten aantoonbare klantwaarde hebben. Dit plan bestaat uit de uitvoering hieronder **én de vier integrale bronbijlagen**. Hun afzonderlijke bronregels, voorbeelden, getallen, toolnamen, beperkingen en beslissingen horen allemaal bij dit meesterplan.

**Tech Stack:** Bestaande Next.js 16.3.8, React 19.3.0, Node 24 LTS, native Node-tests, Vercel, Mailgun-contacttransport, officiële Google Places-integratie en bestaande analytics. Geen verplichte nieuwe SaaS, CMS, modelprovider of domein.

**Spec:** Het expliciete gebruikersverzoek om een volledig plan; oorspronkelijke masterprompt secties 0–112; Phase E, E1–E34; vier volledige geplakte artikelen; aanvullend gebruikersbericht; publiek beschikbare relevante Founder Guide-previews. Bronlocaties en leesgrenzen staan hieronder. Deze ronde levert een plan, geen extra website- of accountimplementatie.

## 1. Doel en huidige stand

Niet alle adviezen uit de artikelen zijn uitgevoerd. De eerdere bronanalyse was een thematische samenvatting, geen volledig uitvoeringsregister. Dit plan onderscheidt **brondekking**, **technische uitvoering**, **live werking** en **zakelijk effect**.

Geïnspecteerde bronversie: commit `7a16cecd1cb23182ea8f58549d9054d44f9cac2f`. Op 10 oktober opnieuw read-only gecontroleerd: [hosted CI 38064265153](https://github.com/Ilias492610/ABService/actions/runs/38064265153) is succesvol voor exact deze SHA, onder Node 24.21.0; lint, tests, productieaudit, build en crawl zijn geslaagd. Beide Git-providerstatussen voor Vercel zijn succesvol, waaronder de [primaire deployment](https://vercel.com/ilias492610s-projects/ab-service/6bEuN8rktFw5LC34zTquZtbVuHpD). De eerdere voortzettingscontrole stelde deze deployment vast als Ready, effectieve Node 24.x en gekoppeld aan het canonical www-domein. Oudere QA-observaties voor `ff3665b` en `7474d3c` blijven afzonderlijke historische snapshots, niet ongemerkt bewijs voor iedere latere wijziging.

| Onderdeel | Bestaande stand | Nog niet bewezen of afgerond |
|---|---|---|
| Technische basis | 114 tests; lint, build en hosted crawl geslaagd voor de hierboven genoemde release | Geen percentage van de masterprompt en geen ranking- of leadresultaat |
| Klantpagina's | 79 published, 2 noindex; 81 gecrawlde klantpagina's, 92 interne bestemmingen en 110 assets | Google's geïndexeerde aantal en gekozen canonicals |
| Geografie | 304 gemeenten, tien Antwerpse districten, zes hubs; acht aparte districtpagina's published; 302 gemeentekandidaten draft | Geen bijpassende gemeente-/districtprojecten of lokale reviews in de huidige dataset |
| Merken en codes | Dertien commerciële merkpagina's en dertien brongebonden gidsen; 964 getoonde bronregels | Niet alle toestellen, revisies of codes; 242 Bosch-regels worden ook bij Junkers getoond |
| Remeha | 17 Avanta-, 23 historische Calenta E- en 19 Calenta Su-verklaringen; zoekpunctuatie getest | Actuele Calenta Ace-Matic en andere Ace-, Quinta- en Tzerra-modellen |
| Advies en tools | Zeven adviesartikelen, advieshub, gratis onderhoudscheck zonder registratie en contactdoorstap | Tweede tool, echt klantvraagregister en uitkomstanalyse |
| Foto's en cases | Geoptimaliseerde, door de eigenaar bevestigde beeldcollectie; zes geanonimiseerde cases | Case-specifieke werk-, foto- en toestemmingsreferenties; model, diagnose en goedgekeurde gemeente/merk |
| Reviews | Officiële data-integratie, neutrale fallback en echte profielkoppeling | Niet iedere upstreamrespons bevat reviewteksten; actuele GBP-beheerstatus |
| Social previews | 78 statische, paginaspecifieke previews | Assets zijn geen extra indexeerbare pagina's |
| IndexNow | Eén werkelijke batch voor twee gewijzigde foutcode-URLs gaf HTTP 202 | Key-verificatie en indexering niet bevestigd; geen herhaling voor ongewijzigde pagina's |
| Performance | Laatste mobiele Remeha-labscore 99/100/100/100; LCP circa 2,15 s | Real-user p75 LCP/INP/CLS; Lighthouse is geen veldbewijs |
| Dependencies | Gedateerde productieaudit: nul advisories; negen ontwikkelbevindingen | Onderhoudsstrategie voor ontwikkeltooling; geen blinde geforceerde majorupgrade |
| Accounts en resultaten | Historische externe acties en dagelijkse 09:00-opvolging gedocumenteerd | Actuele juiste-eigenaar GSC/GBP, ontvangen events, leadkwaliteit en Bing/Apple-resultaten |

Nieuwe inhoudelijke bevindingen: openbare `/werkgebied`-copy bevat SEO- en redactiejargon. De districtgate controleert booleans, bronstatus en FAQ-vorm, maar bewijst niet zelfstandig vraag of opdrachten. Sommige kerndiensten missen eigen FAQ's of contextuele merk-/gebiedslinks. Projectvelden en publicatiegate zijn nog onvoldoende voor case-specifieke traceerbaarheid. Groene bestaande tests sluiten deze punten niet af.

## 2. Integrale bronbijlagen en herleidbaarheid

Deze vier bijlagen zijn het detailniveau van het plan, niet optionele achtergrondlectuur:

1. [Masterprompt en Phase E](../../seo/2026-10-10-source-coverage-master-phase-e.md): alle 113 secties 0–112 en 34 secties E1–E34; eerste dertig pagina-intenties; afzonderlijke eindacceptatie en rapport A–K; huidige tekortkomingen.
2. [Sarvesh en Machina](../../seo/2026-10-10-source-coverage-sarvesh-machina.md): S-001–S-142 en M-001–M-089; beide versies van de twintig prompts, tabellen/filters, vierpassenaudit, experimenten, meetbeperkingen en sponsoring.
3. [Cursus, John Rush en publieke gids](../../seo/2026-10-10-source-coverage-course-john.md): C-001–C-235, J-001–J-101 en G-001–G-058; twintig modules, dertien linkroutes, zes embedded workflows, individuele autorisatieregels en alle publieke gidsdetails.
4. [Aanvullend gebruikersbericht](../../seo/2026-10-10-source-coverage-inline.md): U-001–U-058; gratis-toolbrief, Mehrabs exacte exportanalyse, Surajs technische checklist, tien SaaS-stappen en marketingclaims.

Samen zijn dit **830 afzonderlijke bron-/sectieregels**, met verdere deelcriteria waar nodig. Dat is een dekkingsregister, geen teller van 830 geïmplementeerde SEO-taken of een percentage van bedrijfsresultaten.

Iedere aanbeveling krijgt: **toepassen**, **aanpassen**, **uitstellen met concrete voorwaarde**, **bestaande waarborg onderhouden**, **afwijzen met reden** of **uitsluitend bronmetadata**. Dubbel advies mag dezelfde uitvoeringstaak gebruiken, maar behoudt zijn eigen bronverwijzing. Afgewezen spam is behandeld, niet uitgevoerd. Een ongelezen betaald hoofdstuk is een leesgrens, geen afgewerkte taak.

### Bronmanifest

Alle zes attachmentbestanden zijn opnieuw doorgelezen tot hun aanwezige EOF. Regelverwijzingen wijzen naar de originele bestanden, niet naar automatische samenvattingen.

| Bron | Attachment-ID en bestand | Newlines / woorden | SHA256 |
|---|---|---:|---|
| Masterprompt | `506c7544-4fbc-46aa-ad5b-1cc029d2736b/pasted-text.txt` | 3752 / 10096 | `a5887536dc7e6442a1e93eafbda0c63c0beee2c711b3789e655b2464accd3abb` |
| Phase E | `10ab4df6-5ad1-4474-9e06-ba73a2aa6078/pasted-text.txt` | 1338 / 3036 | `3f4923eca4cc3ef2ce8f46002ed88ecec7f2e53602574d72ed8ecb14745961b6` |
| Sarvesh | `dbbe7950-4fc0-4d0e-8309-604a1d1ce71e/Geplakte tekst.txt` | 225 / 9767 | `209365295c326e802434f88fd86ac250110b2b92d97536fd2b300b91f170c5a5` |
| Cursus | `7ae9a40f-7859-4886-b1e2-7d7a8a2e3551/Geplakte tekst.txt` | 646 / 9332 | `716ac4070fa581556ed013d6eb97253823796c8c57c822870a8791cafc4d10c6` |
| Machina | `62e14bc4-8807-469c-bb5c-f3b7abe4f010/Geplakte tekst.txt` | 166 / 3522 | `6b5f520b58debdc810adc97d358c2e83921c40e0b10caa614d5dd97c9fbc4c0f` |
| John Rush | `dba4c286-f215-4cfd-8e3b-d1039183f8b5/Geplakte tekst.txt` | 203 / 1403 | `18415bfe6c4a2205d0bf5b8da69425420e3d7ac144e03bc7164cc1c1096180f7` |

Basislocatie: `/Users/hamda/.codex/attachments/`. Sommige bestanden missen een laatste newline: `wc -l` verschilt dan van het logische regelaantal. Sarvesh, Machina en sommige advertentiefragmenten eindigen deels midden in een zin. Niet-aanwezig vervolg, video's, niet toegankelijke tweets en betaalde hoofdstukken worden niet gereconstrueerd.

Van de [Founder Guide](https://guide.johnrush.me/home) zijn de publieke home en zichtbare previews van SEO & Content, Directories, AI SEO, Growth Channels, Social Media, Reddit + Communities en Ultimate TLDR gelezen. Zeven hoofdstukpreviews tonen een betaalde unlock. Andere hoofdstukken en appbestemmingen zijn hoogstens als link gezien. Het volledige betaalde boek is niet gelezen of gekocht.

### Bijlagetags naar uitvoering

| Bijlagetag | Werkpakketten |
|---|---|
| measurement / DATA | WP01–WP03, WP17 |
| technical / TECH | WP02, WP07, WP11, WP12, WP15 |
| content / CONTENT | WP06, WP07, WP09–WP11, WP15 |
| local / LOCAL | WP04–WP06, WP08, WP09 |
| links / LINKS | WP06, WP13 |
| conversion | WP01, WP06, WP11, WP16 |
| AIsearch / GEO | WP02, WP12, WP14, WP17 |
| automation / OPS | WP00, WP12, WP17 |
| paid | WP03, WP16; aparte budgetvoorwaarde |
| experiments | WP03, WP04, WP06, WP17 |
| INTENT | WP03, WP06–WP08, WP10, WP11 |
| SOCIAL | WP04, WP14 |
| SCOPE | WP00 en de expliciete keuzes in sectie 4 |

### Zes workflows uit de cursus

Geen verplichte installatie van een nieuw agentsysteem: hergebruik deze inhoudelijke contracten in bestaande taskbriefs.

| Bronworkflow | Werkpakketten | Verplichte output |
|---|---|---|
| `money-keywords` | WP03 | Echte vraagclusters, herleidbare metrics, bedrijfsfit en prioriteit |
| `page-brief` | WP03, WP06, WP10 | Bestaande/nieuwe URL, hoofd- en nevenvragen, gelezen SERP-bronnen, secties, eigen toevoeging, H1, meta, template, links en CTA |
| `ship-page` | WP06–WP12 | Brongebonden implementatie, behoud van bestaande elementen, tests, review, juiste release en live controle |
| `geo-queries` | WP02, WP08, WP14 | Lokale/AI-queryhypotheses en waarnemingen met beperkingen; geen fictieve vraagdata |
| `self-rank-audit` | WP03, WP14 | Echte eigen/ranked pagina's en mentions onderzoeken; geen zelfgeschreven nummer-1-lijst |
| `weekly-seo` | WP17 | Vast meetrapport, één hoofdactie, log en gecontroleerde evaluatie |

## 3. Global Constraints

- Behoud `https://www.abservice24.be`, nuttige URLs, visuele identiteit, originele WhatsApp-logo, Google-ratingpopup, officiële reviews, contactkanalen en gekozen beelden. Eigenaarsbevestiging van de foto's blijft geldig; koppeling aan een specifieke case vraagt afzonderlijke matching.
- Behoud bevestigde 24/7-bereikbaarheid en Vlaanderen/Brussel als dienstgebied. Leid daar geen aankomsttijd, same-day-garantie, feestdagregeling, erkenning, apparaatdekking of vaste prijs uit af.
- Verzin geen project, klant, toestemming, medewerker, review, score, adres, ervaring, partnership, zoekvolume, difficulty, rank, omzet of conversie.
- Houd `published`, `draft` en `noindex` apart. Drafts zijn uitsluitend data, niet routable in productie, zonder navigatie-, schema-, interne hub- of sitemapvermelding. Geen 304-gemeentenmatrix, service×stad-matrix, nepvestiging, keywordfooter of verborgen tekst.
- Gebruik Abders juiste bedrijfsaccount/property. **GSC Wizard is afgewezen en uitgesloten.** Geen andere persoonlijke profielen, secrets in output, betaalde API's, proefabonnementen of nieuwe accountrechten als gemaksoverweging.
- Dit plan voert niets uit. Bestaande geteste websitepublicatie valt onder de eigenaarinstructie. Nieuwe budgetten, concrete externe outreach en betaalde/ongelezen bronnen houden hun eigen voorwaarde. Geen automatische destructieve content pruning.
- Bewaar klantdocumenten en echte exports buiten publieke assets en Git. Openbare registries krijgen alleen minimale geanonimiseerde bewijsreferenties, geen werkbonnen of identificeerbare toestemmingen.
- Gebruik werkelijk Node 24.x, niet de globale Node 25 als testbewijs. Lees lokale Next-documentatie bij frameworkgedrag. Geen runtime-, project- of domeinwissel als workaround.
- Gas-, elektriciteits-, verbrandings-, reset- en lekveiligheid gaan voor bereik. Regels per Vlaanderen/Brussel; handleidingen per model/revisie; geen onveilige DIY.
- Iedere verandering krijgt hypothese, bron-ID, regressietest, passende onafhankelijke review, exacte release, livecontrole en uitkomstlog. Technisch succes is geen commerciële winst.

## 4. Tegenstrijdige adviezen en vaste beslissingen

| Bronidee | Beslissing voor AB Service |
|---|---|
| Iedere service×stad een pagina; alleen de naam wisselen | Afgewezen. Een gemeente moet eigen klantwaarde hebben; de centrale dienst blijft autoriteit. |
| Wissel naar `.com`, maximaal veertien letters; ccTLD kan niet meertalig | Niet overgenomen. Behoud Belgisch domein; Franse Belgische versies kunnen op eigen URLs. [Google taal-/regiogids](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites). |
| Alle noindex wissen | Alleen onbedoelde uitsluiting op goedgekeurde pagina's corrigeren; drafts/noindex bewust behouden. |
| FAQ-schema levert Google-features | Echte zichtbare vragen blijven nuttig. FAQ-rich-results stopten op 7 mei 2026; documentatie verwijderd op 15 juni. Geen FAQ-schema als groeihack. [Wijzigingslog](https://developers.google.com/search/updates#may-2026). |
| Vaste aantallen categorieën/services/foto's of +50% fotovelocity | Brongetallen blijven traceerbaar, maar zijn geen Google-eis. Waarheid, scope, klantnut en echte data bepalen selectie. [Profielrichtlijnen](https://support.google.com/business/answer/3038177). |
| Posts verdwijnen na zeven dagen; posten bewijst ranking | Achterhaald/onbewezen. Google noemt archivering na zes maanden tenzij datumbereik; schrijf voor klanten. [Postdocumentatie](https://support.google.com/business/answer/7342169). |
| Reviewscripts sturen keywords/plaats, alleen tevreden klanten, incentives | Neutraal verzoek aan echte klanten; geen uitkomststuring of reviewgating. Reacties gebruiken echte context zonder privédata. [Reviewrichtlijn](https://support.google.com/business/answer/3474122?hl=en-en). |
| Geotags, fake Maps/office, 304 GBP-gebieden | Geen nep-GPS/locatie. GBP-selectie staat los van websitedekking: maximaal twintig gebieden, richtlijn circa twee uur vanaf de basis. [SAB-richtlijn](https://support.google.com/business/answer/9157481). |
| 600-woorden-deletieguard; zero clicks/under 50 automatisch verwijderen | Geen automatische verwijdering, ook niet mét data. Onderzoek functie, leeftijd, leads, links en indexering; beoordeel keep/rewrite/merge/retire afzonderlijk. |
| Titel 60/meta 155, vijf bodylinks, 500 woorden of één widget per pagina | Preview/checklist, geen universele rankingvoorwaarde. Intentie, toegankelijkheid en relevantie bepalen lengte en elementen. |
| Dofollowlinks kopen, PBNs, rankingruil, directorybulk, lookalike-mailspam | Afgewezen. Verdiende mentions; echte sponsoring alleen transparant en correct gemarkeerd, niet als verborgen rankingkoop. [Spambeleid](https://developers.google.com/search/docs/essentials/spam-policies). |
| llms.txt, speciale AI-schema, chunking of best+year-varianten leveren AI-rank | Geen Google-rankingproject van maken. Gewone technische kwaliteit en nuttige eigen inhoud; AI-queries zijn onderzoekhypotheses. [Google AI-gids](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). |
| Vaste sandbox van zes maanden, top 1 vrijdag, top 5 binnen negentig dagen | Geen belofte. Auteurscases, Franse/SaaS-data en modelrotatie zijn geen AB Service-forecast. |
| Paid indexing of HTTP 202 bewijst opname | Passende GSC/Bingcontrole en begrensde IndexNowmelding; geen gegarandeerde indexering. |
| Alles behandelen betekent alle vendors kopen | Beoordeel iedere tool afzonderlijk; native code en officiële exports zijn standaard. |

## 5. Review Focus

1. Losse query-/pagetabellen: aan een vermoedelijke match nooit exacte paarmetrics hangen.
2. Geldige booleans/HTTP 200 zonder job-, foto- of toestemmingsmatch: objectvorm is geen publicatiebewijs.
3. Codes met leestekens of dezelfde code in andere modellen: behoud prefix, cijfers, revisie en verschillende betekenissen.
4. Groene submit/click zonder ontvangen mail, event of opdracht: bewijs iedere stap apart.
5. Rewrite die quiz, formulier, media, tabel, link of wettelijk onderscheid verliest: maak vooraf een elementenlijst en beoordeel ieder verlies.

## 6. Uitvoeringsvolgorde en werkpakketten

Begin met WP00 en WP01. Daarnaast kunnen veilige WP06/WP12-correcties en de publieke WP05-audit doorgaan. Verzamel juiste accountdata in WP02/WP04 waar beschikbaar, zonder onafhankelijk werk te blokkeren. Volg daarna met WP03-prioritering, WP07-modeldekking, WP09-bewijs en WP10/WP11-content/tools. WP08 volgt lokale waarde en bewijs. WP13–WP16 zijn voorwaardelijke trajecten; WP17 loopt door het geheel.

Vóór uitvoering krijgt elk pakket een afgebakend taskbrief: bron-IDs, exacte bestanden, testfixture, RED→GREEN-stappen en acceptatie. Account-/onderzoekstaken gebruiken gedateerde waarneming→actie→bevestiging. Een beschreven ontbrekende afhankelijkheid kan de voorbereiding afsluiten, maar **niet** de operationele taak. Voltooiing geldt per deliverable, niet per verstreken week.

### Eerste afgebakende implementatietaak — klantcopy op `/werkgebied`

Dit is de eerste zelfstandig reviewbare eenheid binnen WP06. Andere werkpakketten worden vóór uitvoering op dezelfde manier opgesplitst; dit meesterplan is geen toestemming om achttien subsystemen in één ongeteste wijziging te verbouwen.

**Files:** create `tests/work-area-copy.test.mjs`; modify `app/werkgebied/page.js`; bestaande `tests/service-areas.test.mjs` en `tests/publishing.test.mjs` blijven regressiecontrole. Werk na publicatie ook QA/changelog bij.

**Interface:** geen wijziging aan `buildCoverageDirectoryGroups()`, `getDistrictPublicHref(district)`, registries of filterprops. Alleen klantzichtbare JSX-copy verandert. De 304 gemeenten, tien districten, zes hubs, gepubliceerde links en overige gewone tekst blijven behouden.

- [x] **Stap 1 — voeg deze falende bronregressie toe** in het nieuwe testbestand:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("work-area customer copy explains coverage without editorial SEO jargon", () => {
  const source = readFileSync(
    new URL("../app/werkgebied/page.js", import.meta.url), "utf8"
  );
  for (const phrase of [
    "zonder dubbele Antwerpen-pagina", "hoofdlanding",
    "indexeerbare pagina", "onderzoeksroute", "zonder JavaScript leesbaar"
  ]) {
    assert.ok(!source.includes(phrase), `customer copy contains: ${phrase}`);
  }
  assert.match(source, /304 gemeenten/);
  assert.ok(source.includes("MunicipalityFilter groups={directoryGroups}"));
});
```

- [x] **Stap 2 — bewijs RED:** `node --test tests/work-area-copy.test.mjs` onder de gebundelde Node 24. Verwacht een assertion failure op de huidige klantcopy, niet een import- of runtimefout.
- [x] **Stap 3 — wijzig alleen uitleg/koppen:** “Hulp in de tien Antwerpse districten”; leg uit dat dienst, locatie en planning vóór een afspraak worden beoordeeld. De zoekuitleg zegt dat de klant zijn gemeente of district kan zoeken. Geen indexerings-/JS-uitleg, nieuwe beschikbaarheidsgarantie of wijziging van publicatiestatus.
- [x] **Stap 4 — bewijs GREEN:** `node --test tests/work-area-copy.test.mjs tests/service-areas.test.mjs tests/publishing.test.mjs`; alle tests moeten slagen. Daarna de volledige WP12-productgate en browsercontrole van filter, keyboard, links en CTA op desktop/mobiel.
- [x] **Stap 5 — onafhankelijke review en gerichte commit:** controleer de diff op verloren elementen/claims; voeg uitsluitend taakbestanden en de bijbehorende QA/changelog toe. Commit pas na groene verificatie, publiceer volgens de bestaande workflow en controleer de exacte live release. Een bronassertie vervangt deze browsercontrole niet. Afgesloten voor138674e: onafhankelijke whole-branchreview, exact CI38092940463/beide Vercelchecks, live81/92/110 en desktop/mobile/no-JavaScriptdirectoryQA; API403 blijft benoemd.

### WP00 — Bronregister en actuele bedrijfsbrief

**Files:** planbijlagen; `SEO_MASTERPLAN.md`, `docs/seo/evidence-register.md`, `docs/seo/content-publishing-policy.md`, `content/business.mjs`, `PROJECT_CONTENT_GUIDE.md`. Nieuw: `docs/seo/business-brief.md`.

**Interfaces:** iedere bronregel → actuele bedrijfsfeiten, klantdoel, onbekende gegevens, criteria en standaardtaskbrief.

- [x] Leg naam/contact/website/GBP, juridische versus bezoeklocatie, 24/7-scope, diensten/merken/talen, beste klanttype, echte opdrachtwaarde indien beschikbaar, vijf doelhypotheses en eerdere werkzaamheden vast.
- [x] Geef feiten bron, datum, openbare/interne status en verversvoorwaarde. Geen nieuwe prijzen of erkenningen afleiden uit artikelen.
- [x] Koppel iedere bronregel aan een specifieke taak of bestaande waarborg; uitgesteld krijgt een afhankelijkheid, afgewezen een reden en alternatief.
- [x] Scheid huidige van historische documentatie zonder eerdere tests of fouten te wissen. Geen gemengde “100%-SEO-score”.

**Done:** alle bronfamilies zijn gekoppeld; geen lege beslissing, status of bewijsgrens; geen fictieve baseline.

Afgevinkt op 10 oktober 2026 na onafhankelijke goedkeuring van bedrijfsbrief, bronbesluiten en KBO-onderscheid. Alle 830 bronregels, 18 werkpakketten en 25 lokale verwijzingen gecontroleerd. Onbekende opdrachtwaarden, prijsregels en uitvoerings-/bezoeklocatie blijven expliciet onbekend; zie `docs/seo/business-brief.md` en `docs/seo/wp00-source-decisions.md`.

### WP01 — Contact, echte ontvangst en passende aanvragen

**Files:** `components/sections/contact-form.js`, `app/contact/page.js`, `app/api/contact/route.js`, `libs/contact-validation.mjs`, `libs/contact-context.mjs`, `libs/analytics.mjs`, `components/privacy-analytics.js`, `tests/contact-*.test.mjs`, `tests/analytics.test.mjs`. Klantdata/aggregatierapport privé.

**Interfaces:** bestaande `validateContactInput`, contactcontext en `buildAnalyticsEvent`; afzonderlijk ontvangst- en leadbewijs.

- [x] Gebruik huidige events: `phone_click`, `email_click`, `whatsapp_click`, `contact_form_start`, `contact_form_success`, `contact_form_failure`, `service_cta_click`, `google_profile_click`, `maintenance_check_complete`, `tool_enquiry_click`. Geen dubbele installatie voor andere tweetnamen.
- [x] Test browser→API→Mailgun→daadwerkelijke inbox met herkenbare testaanvraag. Controleer desktop/mobiel, pending/dubbelklik, validatie, foutfocus, transportfout, fragmentvoorinvulling en `#aanvraagformulier`-scrollmarge. Geen bestaande klantidentiteit.
- [ ] Bevestig een werkelijk ontvangen event in dashboard/export. Een onderschepte QA-POST of SDK 200 is geen ontvangstbewijs. Geen naam, e-mail, telefoon, adres, bericht, datum of ruwe query/hash in analytics.
- [ ] Meet geaggregeerd dienst, gebied, bereikbaar contact, passend/niet-passend en afgesproken opdracht. Omzet alleen wanneer echt beschikbaar. Klik of API-succes is geen klant.
- [ ] Onderzoek bookingfunctie vóór booking-start/complete-events. Een aanvraag is geen bevestigde afspraak. Toets consent, privacy en retentie aan wat werkelijk draait.

**Tests:** echte eventspecificatie, failure ≠ success, geen vrije-tekstproperties; mailboxontvangst apart live controleren. **Done:** ontvangst en eventingestion bewezen; eerste outcome-baseline met periode/sample waar beschikbaar. Zonder ontvangst/toegang blijft die deeltaak open, ook als de auditnotitie gereed is.

10 oktober: echte test op productie `7a16cec`, API200/oktrue, Mailgun EU delivered en door eigenaar bevestigd: “Ja, ontvangen”. Hardened `126e9ab` apart getest op desktop/mobiel en native POST. Alle tien events behouden; 137 unitchecks en lokale productie-build/crawl/browserchecks slagen. **WP01 blijft gedeeltelijk open:** Vercel Hobby vraagt Pro voor custom events; geen dashboardingestie bewezen en geen betaald abonnement gestart. Commerciële uitkomsten en echte inboxbewaarpraktijk ontbreken; onbekend is niet nul. Bookingfunctie ontbreekt, intake is geen afspraak. Privacy/consent/retentie zijn onderzocht maar niet volledig operationeel bevestigd. Zie `docs/seo/wp01-contact-receipt-report.md`.

### WP02 — Correcte Search Console en zoekmachineopname

**Files:** `docs/seo/2026-10-10-search-baseline.md`, `LOCAL_SEO_EXTERNAL_ACTIONS.md`; bestaande verificatie in layout/DNS behouden. Exports privé.

- [x] Bevestig juiste Abder-account, property, canonical domein en rechten. Geen GSC Wizard.
- [x] Controleer sitemapontvangst, Pages/indexing, representatieve URLs, Google's versus opgegeven canonical, rendering, robots/noindex en manual/securityacties. Noteer datum en schermwaarde; indiening is geen opname.
- [x] Controleer huidige instelling voor Search generative AI inclusion. Er is geen aparte algemene knop die “nieuwe SEO accepteert”.
- [x] Bekijk [Generative AI performance](https://support.google.com/webmasters/answer/16984139?hl=en-GW), gewone Search Performance, CWV en relevante meldingen. Een ontbrekend rapport bewijst geen nulverkeer.
- [x] Exporteer drie maanden plus vergelijkbare vorige periode: Queries, Pages, Dates, country/device/search appearance en echte query-paginaparen indien mogelijk. Noteer timezone, filters, rijlimieten, voorlopige dagen en exportdatum.
- [x] URL Inspection alleen voor werkelijk gewijzigde belangrijke URLs; geen dagelijkse massa of betaald indexeringsproduct.

**Done:** actuele property-/indexing-/instellingswaarneming en echte exports. Ontbrekende toegang staat als afhankelijkheid; een beschreven accountgate is geen voltooide zoekbaseline.

Afgevinkt 10 oktober: correcte geverifieerde Abder-property, echte huidige/vergelijkings-/AI-exports. Huidig 7 juli–6 oktober: 68/3519 over 92 dagen; vorig 7 april–6 juli: 37/2696 over 91 dagen. Native datepicker opnieuw gecontroleerd na één-dagverschil in de draft; periodeverschil en correctie zijn vastgelegd. Vorige dagtotalen zijn een herleidbare selectie uit native langere Dates, geen verzonnen previous-only-export. Eén exact-query-gefilterde native Pages-export bevestigt het Bulex-paar. Sitemap71 en index10/64 zijn gedateerde snapshots, CWV is onvoldoende data. Maintenance live render heeft één onopgeloste resource-uitzondering; geen all-green-claim. Eén nieuwe-tool-indexeringsaanvraag bevestigd, niet geïndexeerd verklaard. Zie `docs/seo/2026-10-10-search-baseline.md`.

### WP03 — Concurrenten, vraagclusters en volledige gaprapporten

**Files:** `libs/gsc-analysis.mjs`, `scripts/gsc-analysis.mjs`, `tests/gsc-analysis.test.mjs`, `docs/seo/content-gap-backlog.md`; toekomstige geanonimiseerde briefs in `docs/seo/briefs/`. Ruwe observaties privé.

**Interfaces:** CSV-analyzer levert echte kandidaten, waargenomen paren en expliciet vermoedelijke matches; geen verplichte betaalde API.

- [x] Kies 3–5 vergelijkbare Belgische concurrenten. Leg Maps versus organische SERP, datum, locatie, taal, apparaat en personalisatiegrens apart vast.
- [x] Lees echte top 3/top 5; top 10 voor een geselecteerde uitgebreide brief. Onderzoek format, vragen, proces, zichtbare prijzen, ontbrekende antwoorden, eigen toevoeging en links als alternatieve verklaring. Niet kopiëren of causaliteit uit positie afleiden.
- [ ] Vergelijk commerciële/nevenqueries, PAA, autocomplete, Trends en echte klantvragen. Volume/KD alleen met bron, land en periode; suggesties zijn geen volumes.
- [x] Bewaar afzonderlijke presets: posities 8–20, 4–15, 11–20 en Phase E 4–30; minimaal tien impressies. “100/maand” vereist echte maanddata. Bronvoorbeelden volume 100–2000/KD <40 en contentvolume 50–500 blijven losse hypotheses. Intentmapping gebruikt als bronpreset zoekvolume ≥20 per maand, uitsluitend met echte tooldata. Geen gecombineerde afvalfilter voor kleine Belgische vragen; impressies zijn geen zoekvolume.
- [x] Lever Mehrabs exacte tabel: cluster/query, echte totale impressies, geschikte gemiddelde positie, gaptype, actie, High/Med/Low en matchzekerheid. Daarna top vijf contentbriefs en top vijf quick wins.
- [x] Lever ook Sarveshs afzonderlijke volledige kandidaatoutputs (S-059/S-106/S-110): maximaal twintig keywordgaps, vier buyerjourney-tabellen en maximaal twintig contentbriefs. Bij onvoldoende echte kandidaten: minder rijen en de reden, nooit opvullen.
- [x] Onderscheid missing content, striking distance, lage CTR bij zichtbaarheid en vraag-/vergelijkingsintentie. Branded queries apart houden; onder tien impressies uit de gevraagde selectie. Geen fictieve expected-CTR-curve.
- [x] Briefcontract: bestaande/nieuwe URL; primaire/secundaire queries; gelezen SERP-bronnen; gedeelde relevante secties; eigen toevoeging; H1, title, meta, template, bodylinks, FAQ, CTA, bewijs- en veiligheidsgrenzen.
- [x] Buyerjourney: probleem herkennen→oorzaak begrijpen→herstellen/vervangen/aanbieder vergelijken→hulp aanvragen. Niet alle informatie of UGC-SERPs automatisch schrappen.
- [x] Maak Machina's **één gezamenlijk vierpassenauditrapport voor dezelfde URL en hoofdquery**: technische bereikbaarheid/snelheid, concurrentie/zoekintentie, observeerbare AI-bronnen en conversie/leadfit. Voeg bronbewijs, keep/conditional/drop-besluit, één eerste wijziging en evaluatiecriteria toe. Uitvoering loopt via WP01/WP06/WP12/WP14, experiment via WP17.

**Tests:** vermoedelijke match krijgt geen paarmetrics; branded/onder-tienfilters, grensposities 8/20, malformed CSV, duplicaten, negatieve/ontbrekende waarden en herleidbare presets. **Done:** echte data, alle gevraagde kandidaat-/briefoutputs en gecombineerd auditrapport; geen verzonnen volume, rank of opbrengst.

10 oktober: vijf servicesample-aanbieders en één afzonderlijke echte top tien gelezen; native data geven 22 relevante ≥10-queries/683 impressies in acht clusters, vier aparte presets, vijf briefs/quick-winreviews en vier journey-tabellen. Eén echt Bulex-paar; overige matches blijven hypotheses. Autocomplete en Belgische Trends zijn daadwerkelijk bekeken, met sparse/ambiguïteitsgrenzen, geen volumes of bewezen seizoenspatroon. Onafhankelijke review verifieert rekenwerk en bronafbakening; geen Critical/Important. **De derde checkbox blijft deels open voor echte klantvragen:** die gegevens ontbreken, net als volume/KD-tooldata en commerciële uitkomsten. Die lege bronnen worden niet met fictieve rijen gevuld. Researchoutputs staan in `docs/seo/wp03-research-report.md`, `docs/seo/content-gap-backlog.md` en `docs/seo/briefs/wp03-first-five.md`; niet alle WP00–WP03-gates zijn gesloten.

### WP04 — Volledige Google Business Profile-audit

**Files:** `LOCAL_SEO_EXTERNAL_ACTIONS.md`, `GOOGLE_BUSINESS_SERVICE_AREA_PLAN.md`; nieuw `docs/seo/gbp-audit-and-calendar.md`. Concepten zijn geen live profielwijzigingen.

- [ ] Controleer primaire/relevante secundaire categorieën in de beschikbare Belgische lijst. Concurrentoverlap 3/3, 2/3 of 1/3 is onderzoek, geen verplicht bedrijfstype. Leg verificatie, appeal en approval apart vast.
- [x] Attributenmatrix voor eigen profiel/drie concurrenten: zichtbaar ja/nee/onbekend. Toets offerte, betaling, online afspraak, toegankelijkheid/bezoeklocatie, ownershipvoorbeelden en 24/7 op echte toepasbaarheid.
- [ ] Reviewsample: laatste vijftig voor recency/diensten en laatste honderd voor sentiment, waar beschikbaar. Bekijk 30/60/90 dagen, score/totaal, top vijf diensten/gebieden en klachten. Onvolledige sample expliciet begrenzen.
- [x] Lever S-083–S-085 expliciet: eigen versus concurrenten, vijfsterren versus driesterren; maximaal twintig emotiewoorden, tien gewenste uitkomsten, vijf zorgen en drie proof-concepten. Alleen werkelijk waargenomen thema's, geen opvulling.
- [x] Audit laatste dertig reacties: aandeel, reactietijd indien bekend, toon, lengte, context en klachtenafhandeling. Twaalf menselijke conceptvarianten voor 5, 4, 3 en 1–2 sterren; 40–80 woorden is flexibel bronvoorbeeld. Geen reactie zonder echte context publiceren.
- [x] Gebruik officiële neutrale reviewlink/QR na echte opdrachten. Geen korting, vijfsterrenverzoek, ontevreden-klantfilter of private werkdetails.
- [ ] Vergelijk servicegroepen/beschrijvingen met website: alleen-site, alleen-profiel, ontbrekend en zwak. Alleen echte diensten; 2–3 zinnen/40–60 woorden is een voorbeeld, huidige UI-limiet gaat voor.
- [x] Beschrijving tot 750 tekens: conversie, vertrouwen en dienstfit; drie concepten, inclusief balanced/trust-verschil. Geen keywordstuffing; test alleen bij voldoende data.
- [ ] Postaudit van negentig dagen en beschikbare historie: datum/tijd/weekdag/type/tekstlengte/beeld/CTA/onderwerp/plaats/aanbod/hashtag/engagement; onbekend blijft onbekend. Geen causaal “beste tijdstip” uit concurrentpatronen.
- [x] Achtweekse optionele kalender: weken 1–4 volledige concepten, 5–8 outlines. Bronritme 2–3 posts/week, 100–150 woorden is een capaciteitstest. Seizoen, echte cases/reviews/personen en educatie; bron/media/CTA per item.
- [ ] Fotoaudit: type, kwaliteit, authenticiteit, rechten, aantallen en zichtbare recency 30/90 dagen. Shotlist voor echte werken; geen nep-GPS, staged storefront, +50%-quotum of onbewezen uplift.
- [x] Indien echte rankgridexport beschikbaar: top-3-aandeel = top-3-punten / geldige gemeten punten. Noteer ontbrekende punten, query, locaties en datum. 13×13 en 25–50%-leiderdrempel zijn geen vereisten.
- [ ] Controleer profielbestemming samen met WP06: title/H1-intentie, dienst-H2's, echte reviews, consistent contact en Maps-embed alleen bij nut/privacy/performance. Geen verborgen SAB-adres openbaar maken.

**Done:** gedateerde audit van alle twintig promptrubrieken, concrete concepten met feiten/rechten en afzonderlijk bevestigde profielmutaties. Een website-deployment telt niet als GBP-update.

**10 oktober, late avond — gedeeltelijk uitgevoerd.** Alle twintig bronprompts hebben een expliciete route in `docs/seo/gbp-audit-and-calendar.md`. Alle 44 eigen Google-reviewartikelen en reacties zijn gelezen; elf teksten vereisten uitklappen. Nieuwste dertig: 30/30 met antwoord. De drie beschrijvingen, twaalf antwoordconcepten en achtweekse kalender zijn geen live publicaties. De officiële reviewlink/QR en neutrale werkwijze zijn vastgesteld; er is geen uitnodiging verstuurd. Het afgevinkte rankgridpunt is een **conditioneel uitstel**, niet een uitgevoerde meting: er is geen echte export beschikbaar en geen betaald hulpmiddel gestart.

Zes bevestigde loodgietersdiensten met beschrijvingen van 220–240 tekens zijn werkelijk opgeslagen en herlezen binnen de actuele 300-tekenlimiet; Google-beoordeling blijft pending. Alleen de ongefundeerde twintigjaarbadge is verwijderd nadat een exacte privé-kopie was bewaard; afwezigheid in beheer is bevestigd, publieke Maps-verversing nog niet. De actuele categorie Loodgieter, 24/7-uren en contact zijn gelezen; geen nieuwe appeal of gebiedswijziging. Op 11 oktober bevestigt de eigenaar uitsluitend diensten bij klanten: adresweergave uitgezet/opgeslagen; beheer zegt `Geen locatie. Alleen leveringen en diensten aan huis`, beoordeling nog open. Juridisch website-/KBO-adres blijft staan. Eco's volledige 100 Google-rows en Tony's 48 officieel gekoppelde rows zijn apart gelezen; DP's exacte profiel, Tony's huidige locatie, posthistorie en fotocontext blijven onbekend. De volledige WP06-landingspaginacontrole blijft open. Accountacties en prestatieperiode staan in `docs/seo/account-status-register.md`; profielklikken zijn geen klanten. **WP04 is niet integraal voltooid.**

### WP05 — Citations, bedrijfsentiteit, Bing en Apple

**Files:** `LOCAL_SEO_EXTERNAL_ACTIONS.md`, `docs/seo/evidence-register.md`; nieuw `docs/seo/citation-audit.md` en accountstatusregister.

- [x] Controleer KBO/My Enterprise, juridische naam/contact en geregistreerd versus bezoekadres. Wettelijke footerinformatie staat los van SAB-adreshiding.
- [ ] Audit echte listings: GBP, Bing Places, Apple Maps/Business Connect, Trustlocal, Gouden Gids, Cylex, leveranciers/verenigingen/socials en vakdirectories. Amerikaanse bronvoorbeelden alleen bij aantoonbare Belgische waarde; niets automatisch aanmaken.
- [x] Per listing: exacte naam/adres/unit/telefoon/website/beschrijving, duplicaten, relevante reviews, bron-URL/datum, conflict, correctieprocedure, ingediende status en bevestigde uitkomst. Oude adresobservaties zijn geen huidige juridische waarheid.
- [x] Onderzoek merk-/ownersearch en echte company/suppliermentions; correct `sameAs`. Geen fictief Wikipedia-, Wikidata- of Crunchbaseprofiel; geen Knowledge Panel-garantie.
- [ ] Verifieer juiste Bing Webmaster-property, sitemap/indexing en beschikbaar AI-rapport. Bing Places-claim apart. Controleer Apple's ondersteunde bedrijfsmodel zonder nepklantlocatie.
- [x] Yandex: uitgesteld wegens onbewezen Belgische doelgroepwaarde; geen account of product installeren. Maandelijkse citationcontrole bewaart open verzoeken en resultaten, geen directorybulk.

**Done:** concrete conflictmatrix en bevestigde resultaten per uitgevoerd kanaal. Publieke vergelijking hoeft niet op iedere login te wachten.

**10 oktober, late avond — gedeeltelijk uitgevoerd.** Negen concrete publieke profielen zijn onderzocht en krijgen velden, bron, conflict, correctiepad en afzonderlijke ingediend/bevestigd-status in `docs/seo/citation-audit.md`. KBO-zetel en geregistreerde vestiging zijn verschillende huidige rollen; een oude profielobservatie bewijst geen verouderde wettelijke vestiging. Merk-/entiteitsonderzoek is begrensd en levert geen fictieve socialprofielen, nieuwe `sameAs`-claims of garantie op een Knowledge Panel. Yandex is expliciet uitgesteld; de maandelijkse controle is een handmatige werkwijze, geen aangemaakte automation.

Op 11 oktober is de expliciet toegestane Bing-Googlekoppeling voor naam/foto/e-mail afgerond met Abder. Na geteste138674e-publicatie/liveXML200 bevestigt native User management **verified administrator**. Sitemap eenmaal ontvangen als **Processing**, nul fouten/waarschuwingen; homepage native geïndexeerd. AI-rapport gelezen maar zonder bruikbare rijen; de nieuwe property is geen volwassen nulmeting. Geen DNS/GSC-importmachtiging of nieuwe indexing request. Bestaande Bing Places-/Microsoft- en Apple Business-aanmelding ontbreken; listingclaim en Apple Maps-geschiktheid blijven open. Geen accountafwezigheid uit een loginpagina afgeleid en geen nieuw directorycorrectiebericht verstuurd; historische septemberverzoeken hebben geen nieuw bevestigd resultaat. Zie `docs/seo/account-status-register.md`. **WP05 is niet integraal voltooid.**

- [x] Bing Webmaster: juiste eigenaar/property en providerverificatie, eenmalige sitemapontvangst, homepage-indexstatus en beschikbaar AI-rapport daadwerkelijk gelezen.
- [ ] Bing Webmaster: latere sitemapverwerking/ontdekte URLs en bruikbare AI-baseline; Bing Places en Apple blijven afzonderlijke toegang-/geschiktheidsgates.

### WP06 — Kernpagina's, klantcopy en interne links

**Latere acceptatie 11 oktober:** de onderstaande tarieven-/Limburgkandidaten
zijn geaccepteerd in `eb0bf76` na onafhankelijke cohortreview, exacte CI
38119528024 / 401 tests, beide werkelijke Production-statussen, canonical
82/93/112 en acht browserprofielen. Echte prijzen en brede WP06 blijven open;
dit vervangt geen eerdere kandidaatfase of commerciële uitkomstmeting.

**11 oktober — lokale kandidaatvoorbereiding:** `9789422` voegt binnen de bestaande
offertecheck op `/tarieven` één vraag toe over mogelijke tijdstip-/weekendkosten.
Geen toeslag, bedrag, gratis dienst of interventietijd wordt beweerd. Vier echte
render-/metadata-/sitemaptests slagen; alle zes oude vragen/cards/contacten en
overige output blijven behouden. De daadwerkelijke datum geldt alleen deze
pagina. Samen met Limburg: 401 volledige tests; cohortreview/liveacceptatie
blijven apart. Echte prijsregels en volledige WP06 blijven open.

**Files:** bestaande kernroutes in `app/`, `content/service-intents.mjs`, `content/brand-services.mjs`, `content/site-content.mjs`, `components/service-page.js`, header/footer/CTA, `app/werkgebied/page.js`, `tests/publishing.test.mjs`, `tests/seo-data.test.mjs` en crawler.

- [x] Verwijder klantzichtbaar procesjargon op `/werkgebied`; geef gebieds-, afspraak- en contactinformatie. Schrijf eerst de regressietest.
- [x] Controleer dertig oorspronkelijke pagina-intenties tegen huidige URLs. Geen dubbele keywordroutes; home houdt Antwerp-intentie, onderhoud/herstelling/keuring/installatie/sanitair blijven onderscheiden.
- [ ] Bovenaan: voor wie, welk probleem, scope, gebied en volgende actie. Daarna proces, inclusies/uitsluitingen, voorbereiding, modelinfo, relevante merken, echte proof, eigen FAQ en bekende tarieffactoren.
- [ ] Vul contextuele links aan: home→dienst/merk/project/tarieven; dienst→merk/advies/regio/case; gebied→dienst/nabij gebied/proof; merk→onderhoud/herstel/fout/case; fout→merk/herstel/verwante code; case→dienst/merk/plaats/provincie; advies→dienst.
- [ ] Geen vijf of 3–5 links als quota. Iedere belangrijke bestemming heeft een relevante ingang; mobiel menu/footer compact, geen sitewide exact-matchspam.
- [ ] Controleer GBP-landingspagina volgens WP04 en C-101–C-106; Maps-embed is conditioneel, geen verplicht contact- of rankingelement.
- [x] Inventariseer vóór rewrite formulieren/quizzes/tabellen/media/embeds/bronnen/links/claims. Beoordeel ieder verlies; verwijder geen zakelijke functie om een labscore te verhogen.
- [ ] Prijsvragen: interventie, diagnose, verplaatsing, materialen, arbeid, overleg, onderhoudsprijs, avond/weekend en offerte. Alleen echte beleidsdata, geen bedragen of voordeel verzinnen.

**Tests:** klantcopy, publicatie-/linkchecks, één H1/canonical, mobiele CTA/keyboard/focus en elementenbehoud. **Done:** beoordeelde kernpagina's en relevante linkstructuur. CTR-verbetering wordt later afzonderlijk gemeten.

**11 oktober — eerste afgebakende eenheid:** regressie RED op oud jargon, GREEN11/11 gericht;
139/139 volledige tests, lint/build/audit0 en localcrawl81/92/110. Onafhankelijke review akkoord;
desktop/mobile/no-JavaScript bevestigen alle314 directoryentries, zoeken/keyboard/zero/reset,
bronnen/draftlinkgrens en formulieranker zonder overflow. De dertig oorspronkelijke intenties
zijn gemapt:27 gepubliceerde bestemmingen, Edegem/Mortsel/Kontich blijven data-only drafts.
Voorafgaande elementeninventaris behoudt formulieren/tool/tabellen/media/bronnen/links. Verdere
contextuele dienst-/merklinks, eigen FAQ en bewijsafhankelijke prijs/casevelden blijven open;
deze checklist is **geen volledige WP06-voltooiing of live-publicatiebewijs**.

**11 oktober — volgende afgebakende eenheid:** optionele native SSR-FAQ en contextlinks,
drie onderhoudsvragen, onderhoud/diagnose/vervangingskeuze, merkintake en wederzijdse
lekonderzoek/herstellinks. Onafhankelijke taakreview akkoord; aanvullende safety-bodytest
opgenomen. Fresh147/147/lint/build/audit0/local81/92/110 en vijf-route desktop/mobile/no-JavaScript
QA slagen. De eenheid zit inmiddels in gepubliceerd1b42030: exacte CI38094780958
148tests/productionaudit0/build/crawl/nativeNode24actions, beide Vercelchecks en
primarydeployment6988269870 slagen. Fresh live81/92/110 en vijfroute desktop/mobile/noJS
QA slagen. Brede kernpagina-/linkcheck en echte prijs-/casevelden blijven open; geen rankingclaim.

**11 oktober — merkintake en installatieoverdracht, lokale kandidaat:** onafhankelijk
gereviewd d5a3a59 onderscheidt onderhoud/storing op alle dertien merkpagina's en
houdt algemene acties neutraal.9f20d50 vraagt wie controle organiseert, welke
persoonlijke erkenning past en welke documenten/ontvangers worden afgesproken;
twee gelezen officiële gewestbronnen en contextlinks, geen goedkeuringsbelofte.
Fresh328tests/lint/production0/build170/crawl82/93/112 en52merk/viergasprofielchecks
slagen met/zonder JavaScript op desktop/mobiel. Alleen inhoudelijk gewijzigde
gasketelpagina krijgt11October lastmod. Hosted/live/whole-branch gate blijft apart;
echte prijzen, caseproof en bredere WP06 blijven open.

**Latere acceptatie c4a59f9:** whole-branch review en normale main-publicatie,
exactCI38107909184/328tests/build170/82/93/112/beideVercelProduction en canonical
crawl/61desktop-mobile-JS/no-JSchecks slagen.3325GET-onlybrowserrequests; één
previewed15gewijzigde-URL IndexNowHTTP200melding na livecheck, geen indexatie/
groei. De lokale kandidaatnotitie is geschiedenis; bredere WP06 blijft open.

### WP07 — Merken en modelgebonden foutcodegroei

**Task56 lokaal kandidaat:** Ferroli DRS9100v9 augustus2015/S12S13 persoonlijk
gelezen,37groepen38codes/16A22F voor historischeBlueSense3/4/5 en toevoegingen
12/22/32.15bronbetekenissen/37lokale A/F/druk/sensor-acties; geen nieuw codegat/
route/alias/sharedengine/Belgischefirmwarefit.24PDFcatalogi/11PDF/tweeWeb/zes
declaraties;31andere records/12old snapshots/12mirrors exact. RED9fail1pass→10/
481/lint0/productie0/standaard170/localcrawl82/93/112/native4profielen269GET364queries8contacts.
Review/exactrelease blijven gates; bredereWP07 en eigenaarbewijs niet gesloten.

**Tasks54–55 werkelijk geaccepteerd:**ab6ecdda/solefreshreview/471/exactCI38167406373
success19:18:43UTC; actualmatchingProduction7000493190/7000482531/canonical82/93/112.
Nefitnative193GET392queries8contacts52beelden; éénNefitIndexNowHTTP200 receipt,
geenindexatie. Onderstaande kandidaatfases zijn geschiedenis. rEzoekambiguïteit
blijft afzonderlijk Task57, geen nieuwe reset-foutregel of globale zoekbeperking.

**Task54 lokaal kandidaat:** gelezen historischeNefit6720646227/04-2013/NL,
HRC24/CW3,24/CW4,30/CW5;95fysieke tabelregels/78geselecteerde meldingen in54
bestaande uitleggruppen. Padlock is geen3-subcode:9Y gecorrigeerd. Negentien
begrensde betekenissen/acties beschermen8Cmanufacturer-unlock en C0/2L/sensor/
controllergrenzen. Scope/label/warning/meta/echteNefitdatum; geen universele/
actueleBelgischefit. Inventaris23PDFcatalogi/10PDF/tweeWeb/zeven declaraties;
11oudesnapshots/12andere gidsmirrors/tellingen exact, Intergas scopeverduidelijking
alleen20totaal versus12in drie groepen. Fresh471/lint/productie0/build170/
standardlocal82/93/112/Nefit4native266GET/392queries/achtcontacts pass;
hero v2 lokalecontrole geslaagd, onafhankelijke review/exactrelease blijven gates.

**Task52 werkelijk geaccepteerd:**1f10e883/solefreshreview/455/exactCI38161989180
success18:01:21UTC; actual matching namedProduction6999521558/6999522369/
canonical82/93/112/Intergasnative4profielen185GET112queries8contacts.
EénIntergasIndexNowHTTP200 na validproof/live, geenindexatie. Onderstaande
kandidaatnotities zijn historische voorbereiding, bredereWP07 blijft open.

**Task52 lokaal kandidaat, 11 oktober:** Intergas Prestige A CW6 uit werkelijke
56pagina-PDF88136803/SHA28996b1b8237b8dd778d860321b1fea2b08a106b2712a9176594f000eaf66d7a.
§8.1p42:11groepen/20nummers/drie gegroepeerde cellen; knipperende storingsled en
temperatuurdisplay onderscheiden van normale servicedisplaystates. Alleen scope/
waarschuwing/bronlabel/code2betekenis/meta/echteIntergasdatum wijzigen; alle11acties/
andere10betekenissen/aliases/IDs/volgorde/12gidsen behouden. NL-context is geen
actueleBelgischeSKU/firmware/nieuwste-editieclaim; revisie/datum onbekend.
Echte441baseline/RED13fail1pass→GREEN14/fresh455/lint/productie0/build170 slagen;
localcrawl82/93/112/vierIntergasnative189GET/112zoekchecks/achtcontactflows slagen;
review/hosted/live nog aparte gates. Inventaris22PDF-gelinkt/9PDF/
2web/8declaraties; andere31records/10snapshots/12mirrors/tellingen exact.

**Task50 werkelijk geaccepteerd:**64d7f56e/solefreshreview/fresh441/exact
CI38158155937success17:05:55UTC; werkelijkematching namedProduction6998848792/
6998848254success17:05:31/17:05:28UTC, canonical82/93/112/viernative185GET/
48zoekcases/achtcontactflows. EénACVIndexNowHTTP200ontvangen na proof/live,
geenindexatie. Onderstaande Task50kandidaatnotitie is historische voorbereiding;
Task46readingMinor/WP07eigenaar/model/accountgates niet daarmee gesloten.

**Task50 lokaal geverifieerd, release pending:** officiëleACV664Y4200 H/03/2011,
44pagina's/SHAeda557c6086ab17148973eafea4127ce4fda38147ac9569f0b3b188dbf9b61b3.
Solo/Excellence18/32MkIII/ESYS;23E+NTC op42–43, E03samengevoegd; geen universele/
nieuwste/SKU/firmware/BE-only claim. Scope/waarschuwing/bronlabel/meta/echteACVdatum,
éénE37betekenis en vier eersteacties gecorrigeerd, geen bijvuldiagnose bijsensor/
temperatuurverschil. Andere23betekenissen/24IDs/twaalfgidsen exact. Echte435baseline/
RED4fail→GREEN6/fresh441/lint/productie0/build170/local82/93/112/viernative269GET/
48zoekcases/achtcontactflows slagen; sole review/hosted/live blijven gates.
Inventaris21PDF-gelinkte catalogi/8PDFs/2web/9declaraties,32/38/1596/1354/18 gelijk.

**Task49 werkelijk geaccepteerd:**64e93669/sole review/fresh435/exactCI38154824053
success16:18:12UTC; werkelijkematchingProduction6998266147/6998271150
success16:17:37/16:18:01UTC, canonical82/93/112/achtnative416GET/64zoekcases/
16contactflows. Eén twee-URLIndexNowHTTP200ontvangen na proof/live, geenindexatie.
Task46widgetMinor uitgesteld; bredereWP07/eigenaar/accountgates blijven open.

**Task49 lokale kandidaat, 11 oktober:** oorspronkelijke Nederlandse professionele
Bosch/Junkers-codeboekbron werkelijk gelezen op hoofdstuk-/contextniveau,
268pagina's/SHA442ccaafddd34a27a6e2a26e37a5c062414140cc19c20e19fb83c7b4776278c3.
Hoofdonderzoeker leest gehele afgebakende preflight en23 relevante paginabeelden;
geen nieuwe volledige242regel-/268pagina-audit. Zes scopes/twee waarschuwingen/
twee zoekbeschrijvingen begrenzen geselecteerde hoofdstukken; -4/2013 blijft
onderscheiden van2015HMI, grafische -3-regels niet verzonnen, Aero/Modul conditioneel.
Editie/revisie/SKU/firmware/precieze markt blijven onbekend. Alle242codeobjecten
per merk/11andere gidsen/80overige registryrecords exact; alleen beide gewijzigde
URLs krijgen11October lastmod. EchteRED5/5→GREEN6/6/fresh435/lint/productie0/
build170/local82/93/112/acht native desktop-mobile-JS/noJS-profielen536GET/
24modelkeuzes/64zoekcases/16pointer+Enter/éénTabnaam slagen. Inventariscontext
20PDF-gelinkte catalogi/7PDFs/2web/10declaraties, tellingen32/38/1596/1354/18
ongewijzigd. Sole review/exact hosted/live blijven gates; WP07 niet volledig af.

**Task48 werkelijk geaccepteerd:** `e71fbf69`, sole review/fresh429/
exactCI38149952837 success15:08:04UTC; werkelijke matching-SHAProduction
6997413426/6997421316 success15:07:57/15:08:39UTC; canonical82/93/112/
acht nativeprofielen376GET/16contactflows/éénTabnaam slagen. Eén gewijzigde
BulexURL IndexNowHTTP200 ontvangen na geldige proof/live, geen indexatiebewijs.
Task46minor mobiele widgetoverlap blijft uitgesteld; overige bron-/eigenaar-
en accountgates blijven open. Oudere kandidaatnotities hieronder zijn historie.

**Task48 lokale kandidaat, 11 oktober:** één historische Bulex A/B-bron,
werkelijke footer0020109430_06/06/13,31 genummerde regels p33–34 voor acht
exacte modellen, BE/LU-aardgas/BE-propaanbeperking. Vier streepjes/één lege
codecel blijven zonder verzonnen nummer; F54/F67-afwezigheid alleen deze tabel.
Oorspronkelijke43regels/12andere gidsen/intakehulp behouden. Bulex74/3groepen/
4opties; alledertien1596uitlegregels/38toewijzingen/32catalogi/1354zonderhergebruik.
Echte RED0/6→GREEN6/6/fresh429/lint/productie0/build170/local82/93/112 slagen.
Zes gelijke lokale labs: mediaanP97→99,LCP2618.131→2117.083ms,TBT3.5→4.5,
bytes274268→277739,CLS0/A/BP/SEO100; geen causale/veld-/klantwinstclaim.
Acht nativeprofielen426GETonly/16pointer+Enter/éénTabzichtbare naam slagen;
sole review/exacte release blijven gates; bredere WP07 niet af.

**Task46–47 werkelijk geaccepteerd:** `b32084e5` sole review/fresh423/
exactCI38145234247 success13:58:14UTC; werkelijkeProduction6996568173/
6996572141 success13:57:50/13:58:10UTC; canonical82/93/112/achtliveprofielen/
375GET/16pointer+Enter/éénTabnaam, geen blocked/errors/overflow. Eén minor
mobiele widgetoverlap blijft uitgesteld; gewoon scrollen toont volledige hulp.
Geen IndexNow voor die copy/documentatieslice, geen bredere gate gesloten.

**Task45 werkelijk geaccepteerd, Task46–47 lokale kandidaat, 11 oktober:**
`5a8d7c0` heeft sole onafhankelijke review,415fresh/exactCI38127116203,
beide werkelijke Productionstatuses6993368945/6993369322, canonical82/93/112
en acht liveprofielen/197GET/0blocked/errors/overflow. Eén gewijzigdeRemehaURL
IndexNow200 ontvangen na live/proof; geen indexatiebewijs of herhaalde batch.
Task46 voegt alleen Bulex-model-onbekend/niet-genoemd-hulp toe vóór de catalogus,
met veilige identiteit/klacht en bestaande native contact/handleidinglinks.
Alle43code/scopes/metadata/registry en overige12volledige renders behouden;
genuinecorrectedRED3/6→GREEN6/6, initial421tests/lint/productie0/build170 slagen.
Task47 [inventariseert alle31catalogi](../../seo/fault-code-model-coverage.md)
met bron/revisie/model/product/component/pagina/count/bewijsbasis en expliciete
onbekende nulls; hoofdonderzoeker leest elke record en hasht zeven bronbestanden.
Dit is geen nieuwe inhoudelijke bronheraudit/nieuwsterevisie of geheleWP07-gate.
Werkelijke browser-RED voor onzichtbare linkonderscheid wordt vóór productfix
ook renderer-RED; uitsluitend beide nieuwe links krijgen bestaande underline.
Final423/build170/local82/93/112/acht nativeprofielen/465GET/16pointer+Enter
flows met vaste-header-clearance/éénTabzichtbare naam slagen. Alle eerste
diagnostics blijven apart bewaard; wholecohortreview/exactepublicatie volgt.

- [x] Bestaande dertien gidsen/32 afzonderlijke catalogi inventariseren met letterlijke scope, bewijstype en expliciet onbekende velden; één Task48-bron nieuw gelezen, geen volledige bron-/modeldekking afleiden.

**Task45 — aparte 25L-kandidaat, 11 oktober:** echte Belgische handleiding
7871254-04-04072025, NL tabellen224–228 p346–369 volledig gelezen; onafhankelijke
vergelijking van alle300codes/volgorde/beschrijvings-/installateurkolommen is exact
gelijk aan de bestaande viermodeltabellen. Geen configuratie-/generatiecompatibiliteit
afgeleid. Vijf afzonderlijke25Lcatalogi met eigen IDs/revisie/bron/pagina's en CU/SCB-
beperkingen hergebruiken alleen gecontroleerde veilige uitleg. Bronambiguïteiten en
H03.254 blijven expliciet; oorspronkelijke acht groepen en overige merken behouden.
Remeha659/dertienguides1565uitlegregels, niet unieke codes/allemodellen. Echte RED→GREEN,
415tests/lint/productieaudit0/build170/local82/93/112 en acht native browserprofielen
slagen. Zes gelijk ingestelde lokale Remeha-labruns: medianeLCP2618.416→2698.9245ms,
performance97→96, CLS0, toegankelijkheid/BP/SEO100; beschrijvend, geen snelheidswinst
of veld-/klantresultaat. Sole final review/exacte productieacceptatie volgen apart.
Geen nieuwe route/datum/dependency/IndexNowmelding of geheleWP07-afvinking.

**Files:** `content/fault-guides.mjs`, `content/fault-catalogs.mjs`, `content/additional-fault-catalogs.mjs`, `content/brand-services.mjs`, `libs/fault-search.mjs`, `components/fault-code-catalog.js`, source-/fault-tests en publicatieregister.

- [ ] Dekking per Vaillant, Bulex, Bosch, Junkers, Remeha, Buderus, Viessmann, ACV, Intergas, Nefit Bosch, ATAG, Itho Daalderop en Ferroli: toestel/model/productcode, markttaal, revisie, pagina's, codefamilie en niet-gedekte modellen.
- [x] Eerst actuele Belgische Calenta Ace-Matic-productpagina/handleiding lezen en revisie vaststellen. Historische Calenta/Su apart; permanente E, tijdelijke H, waarschuwing A en uitbreidingsprint niet tot één diagnose samenvoegen.
- [ ] Iedere gelezen relevante tabelregel zorgvuldig verwerken. Geen “alle codes van het merk” zonder modelscope. Behoud prefixes/nullen/subcodes; E04.50 ≠ E04.250; dezelfde code kan per model iets anders betekenen.
- [ ] Betekenis, scope, veilige observatie, wat niet zelf te doen, wanneer hulp en relevante servicedoorstap. Geen gasafstelling, gesloten-componentwerk, veiligheidsbypass of eindeloze resets.
- [ ] Afzonderlijke Vaillant F22/F28/F29/F75, Bulex F24/F28/F29/F72/F75 en Bosch/Junkers EA-pagina alleen bij echte vraag en extra waarde. Eerst het bestaande antwoord verbeteren.
- [ ] Test zoeknotaties, filterwissel, onbekende code, nulresultaat en toegankelijke status tegen fabrikantfixtures. Normalisatie mag betekenissen niet samenvoegen.

**Tests:** exacte model/revisie/code-inventaris, verwachte families, verschillende betekenissen, veiligheid, bronhandtekeningen, desktop/mobiel en performance. **Done:** gelezen fabrikantbron per uitbreiding, inhoudsreview en eerlijke dekking; geen dealerstatus afleiden.

**11 oktober — brongebonden implementatie en zoektest af, releasecontrole loopt:** productpagina koppelt het echte PDF;
werkelijke footerrevisie7871265-05-04072025, niet -04 URL-naam. Alleen25s/35s/30c/40c en
Belgische/Luxemburgse toepassing gelezen. Twee extractors bevestigen CU A18/H41/E47 en
SCB A60/H134 =300.25L heeft een aparte ongelezen handleiding. Tegenstrijdige SCB-kolommen
blijven expliciet; geen doe-het-zelf herstel uit technische instructies.300regels geïmplementeerd
in vijf CU/SCB-tabellen; Remeha359 inclusief ongewijzigde legacy59. Exacte volledige codes,
nullen, verschillende subcodes/componenten, EA-familie en NTC-beschrijvingen getest. Review
vond NTC-regressie, actual RED→GREEN herstelt die.165tests/lint/build/auditproduction0/localcrawl
pass; browser/live/wholebranchrelease blijft gate. Niet de gehele dertienmerken-WP07 voltooid.

**Latere acceptatie11oktober:** final review vond ook TS3/TA210/EA1/T1/S1-regressies.
Algemene volledige beschrijvingsidentifiers hersteld, aliasvoorrang en negatieve tests
behouden; één scoped herreview akkoord. Release6557c45 is op main, exactCI38098059114
slaagt172 tests/auditproduction0/build/crawl, beide Vercelchecks/deployments succes.
Fresh live81/92/110 en desktop/mobile/noJS13guides1264rows slagen. Alleen deze
model-/zoekuitbreiding is geaccepteerd; andere modellen en bredere WP07-gates open.

**11 oktober — verdere WP07-bronprecisie lokaal geaccepteerd:** Vaillant/Bulex
906a0ea behoudt90/43regels met negen exacte Belgische model/articleparen en
FAS65/0010010389/BEnl/revisieafbakening; F105 neutraal en F73/F74 elektrisch.
Buderus5d62836 voegt ontbrekende vergrendelende5C226 toe:52 uitlegregels/74
exacte combinaties uit88bronrijen,14gewone/test/resetstatussen uitgesloten,
Swiss-componentvoorwaarde en twaalf specifieke electronicadiagnoseacties.
Beide taakreviews akkoord; fresh284tests/lint/productionaudit0/build170/local
82/93/112 en12desktop/mobiel/JS/no-JSchecks slagen.224browserrequests/0nonGET/
errors/overflow. Bron55HTTP200/403 en development9/ESLint9 blijven; wholebranch/
hosted/live gate nog open. Dit voltooit niet alle dertienmerken/modeluitbreidingen.

**Latere bronprecisieacceptatie11oktober:** whole-branch review keurt9e37327 goed;
normale main-publicatie, exacteCI38105783234 met284tests/productionaudit0/build170/
crawl82/93/112 en beide Vercelchecks/Production statuses slagen. Canonical live
82/93/112 en12desktop/mobiel/JS/no-JSchecks bevestigen90/43/52uitlegregels,
bronafbakening/zoekfunctie/veiligheid/contactselectie.209browserrequests/0nonGET/
errors/overflow. Eén echte drie-guide IndexNow-meldingHTTP200 na preview/livecheck
is geen indexatiebewijs. Bron403/development9 en bredere WP07-dekking blijven open.

### WP08 — Geografische groei met lokale klantwaarde

**Latere begrensde acceptatie d605b8b:** sole onafhankelijke whole-cohortreview,
fresh409premerge/merged, exactCI38122061458/Node24.21.0/lint/productie0/build170/
hosted82/93/112 en beide daadwerkelijke Productionstatuses slagen. Canonical82/93/112
en acht aangescherpte nativeprofielen bevestigen allevierBrusselsunderlines, native
FAQ/tool/formulierdoorstap/focus;214browserGET+1sitemap en0writes/external/pageerrors/
overflow. Geen nieuw Lighthouse/IndexNow of menselijke lokale-waarde-/caseacceptatie.
Dit sluit uitsluitend de twee copy/linkvoorstellen hieronder, niet geheelWP08.

**Verdere begrensde uitvoering 11 oktober:** Limburg is geaccepteerd in
`eb0bf76`; de overige twee bestaande voorstellen zijn nu lokale kandidaten.
Borgerhout krijgt een expliciet voorwaardelijke hero-intro; Brussel een directe
native onderhoudschecklink vanuit de actuele EPB-planningsparagraaf. Geen nieuwe
regels, Franse belofte, lokale bewijsclaim of route. Pre-edit volledige
behoudfixtures, RED 3/7→GREEN 30/30 gecombineerd, volledige 408 tests/lint/
productieaudit 0/build 170 slagen; oorspronkelijke hashes blijven behouden met
alleen exacte toegestane normalisatie. Visuele QA vond de nieuwe link niet
herkenbaar: afzonderlijke echte renderer/computed-style RED, één underline-
utility, definitieve GREEN 31/31/volledige 409 tests/lint/audit 0/rebuild 170/
local 82/93/112 en acht native browserprofielen slagen. Bestaande paragraafstijl,
toolnavigatie en formulierfocus blijven; sole review/exacte release volgen apart.
Alle drie kleine voorstellen zijn aangepakt, niet de menselijke unieke-waarde-
beoordeling, echte lokale vraag/case/review of 302 draft-publicatiegates.

**Files:** `content/service-areas.mjs`, `content/service-area-scoring.mjs`, `content/content-backlog.mjs`, `components/district-page.js`, `components/municipality-filter.js`, gebiedshubs, `tests/service-areas.test.mjs`, `PHASE_E_SERVICE_AREA_REPORT.md`, `SERVICE_AREA_REGISTRY.md`, `SEO_CONTENT_INVENTORY.md`, bewijsregister en changelog.

**Redactionele tussenstand11oktober:** [14bestaande pagina's beoordeeld](../../seo/local-page-value-review.md)
op concrete leeswaarde/volgende stap en resterende overlap. Zes hubs hebben
coverage-/navigatienut, Borsbeek een eigen overgangsvraag; de overige district-
voorbereiding blijft grotendeels overdraagbaar. Drie beperkte voorstellen zijn
vastgelegd; alleen Limburg is later lokaal uitgevoerd in `c506f47`, met eigen
tests en nog open cohortreview/liveacceptatie. Borgerhout en Brussel blijven
voorstellen. Geen eigenaar-/menselijke eindgoedkeuring,
nieuwe lokale vraag/case/review of automatisch noindex-besluit afgeleid.

- [ ] Behoud volledige namenlijst: 67/38/55/63/62/19 = 304; actuele fusies en tien districten inclusief Borsbeek. Antwerpen→home; Brussel één intentie-eigenaar. Onderzoek eerst URL-/querykeuze voor Berendrecht-Zandvliet-Lillo.
- [ ] Namen staan in initiële HTML/filter met labels, toetsenbord en nulresultaatfeedback. Niet-gepubliceerde bestemmingen gewone tekst; 302 drafts blijven data-only, niet routable en zonder nav/schema/hublink/sitemap. Geen 304 lege anchors of schema-gebieden.
- [ ] Beoordeel acht bestaande districten op echte klantwaarde. Bij ontbrekende lokale case/review is een onderbouwde alternatieve unieke waarde plus menselijke beoordeling nodig; herhaalde intakecopy is geen lokale autoriteit.
- [ ] Zeven scores met bewijs/datum: demand 0–5, GSC 0–5, projects 0–5, reviews 0–3, commercial 0–5, operational 0–4, competition opportunity 0–3. Onbekend blijft `null`; score bepaalt volgorde, niet publicatietoestemming.
- [ ] Onderzoek Antwerpse metrokandidaten en Edegem/Mortsel/Kontich; vervolgens de overige E14/E15/E31-steden/regio's. Alle bronnamen blijven in de bijlage, geen automatische indexering.
- [ ] Versterk gate: datum/reviewer, dienstfit, eigen intentie/URL, inhoudelijke uniciteit, lokale reden, bronnen, eventuele project-/reviewmatch en QA. HTTP 200 plus booleans is onvoldoende.
- [ ] Link goedgekeurde case↔plaats/provincie/dienst/merk; provinciehub toont echte gekoppelde cases dynamisch. Geen zes kopieën van centrale diensten.
- [ ] Bij statuswijziging altijd centraal register, inventory, evidence register, gebiedsrapport en changelog bijwerken. Rapporteer volgende twintig als onderzoeksshortlist met scores/onbekenden/bewijs/status.

**Tests:** exacte namen, fusies/duplicaten/districten, onbekende score, onbewezen booleans, afwezigheid van draftroutes/links/sitemap en echte genormaliseerde casematch. **Done:** iedere lokale published URL heeft een vastgelegde inhoudelijke reden en QA; overige blijven drafts. Geen Maps-dominantie of 304 vestigingen claimen.

### WP09 — Echte cases, media en expertise

**Latere afgebakende releaseacceptatie869ee4f:** whole-branch review, normale
main-publicatie, exact CI345tests/build170/82/93/112 en beide VercelProduction
slagen. Canonicalcrawl en24project plus vierwater JS/no-JS profielen bevestigen
beide toegewezen-dienstknoppen en behoud van bestaande inhoud. Dit sluit alleen
de Task29-intakedoorstap, niet de private case-/foto-/toestemmings-/datumgate.

**Afgebakende lokale aanvulling11oktober:** Task29 `2a512ea` bewaart de toegewezen
dienst van alle zes bestaande projectpagina's in beide originele formulierlinks.
Onafhankelijke taakreview en fresh345tests/lint/build170/crawl82/93/112 pass;
24desktop/mobile JS/no-JS projectprofielen bevestigen echte klikken, wijzigbare
dienst, lege privévelden, formanker boven vasteheader en behoud van inhoud/media/
metadata.1481GET-onlyrequests; geen nieuw geval, toestemming of fotomatch. Final
whole-branch/hosted/live blijft apart en volledige herleidbare-casegate blijft open.

**Files:** `content/projects.mjs`, projecthub/detailrenderer, `content/media.mjs`, `PROJECT_CONTENT_GUIDE.md`, bewijsregister, `tests/project-publication.test.mjs`, `tests/media.test.mjs`; Article-schema indien passend.

**Documentaire aanvulling11oktober:** de [lege private intake](../../seo/project-case-intake-template.md)
maakt model/generatie/diagnose en afzonderlijke werk/foto/plaats/datum/toestemming/
reviewreferenties expliciet, met unknown/not_applicable en pending/draft als
beginstaat. De guide bevat geen ingevulde voorbeeldgemeente/datum meer. Dit is
intake-infrastructuur, geen nieuwe runtimevelden, werkmatch of publicatiebesluit;
alle echte-casevoorwaarden hieronder blijven open tot de bronrecords bestaan.

- [ ] Leg private werk-, fotomatch-, toestemming- en reviewreferentie plus goedkeuringsdatum vast. Openbaar alleen ondoorzichtige minimale IDs. Eigen foto ≠ automatisch bewijs voor een specifieke beschreven klus.
- [ ] Input: titel, gemeente/district/provincie, dienst/merk/model, aanleiding/probleem, diagnose, werken/oplossing/resultaat, goedgekeurde maand/jaar, 1–3 matching originele foto's/alt, toestemming/anoniem en gerelateerde dienst/gebied/merk/review.
- [ ] Controleer zes huidige cases afzonderlijk. Geen nieuwe locatie, datum, model of resultaat omdat het realistisch klinkt. Anonimiseren mag; interne traceerbaarheid blijft.
- [ ] Voeg conditionele velden en linkresolvers toe. Publicatie vraagt inhoudelijke goedkeuring, niet alleen nonempty strings en `verified`.
- [ ] Houd echte organisatorische auteur. Persoonlijke expertise/erkenningsnummer/reviewer alleen bewezen en toegestaan; persoonlijke ervaring niet verwarren met leeftijd van rechtspersoon.
- [ ] Media: rechten/personentoestemming, context, privacy van huisnummer/document/geotag, beschrijvende filename/alt, WebP/AVIF, responsive sizes, afmetingen/aspect/crop; alleen echte hero vroeg, onder de vouw lazy. Geen onnodige verwijdering.

**Tests:** onvolledige/onbewezen cases niet publiceren; toestemming toetsen aan haar werkelijke beperkingen, niet een verzonnen vervaldatum; juiste foto-/jobmatch, geen private data en geldige conditionele links. **Done:** eerste volledig herleidbare case, daarna dezelfde norm per overige case.

### WP10 — Advies, officiële regels en contentbriefs

**Latere releaseacceptatie869ee4f:** Task28-doorverwijs-/intakeaanvulling is
whole-branch reviewed, normaal gepubliceerd en exact hosted/canonical getest;
CI345tests/build170/crawl82/93/112, beide VercelProduction en vierwater/24project
profielen slagen. [QA](../../../SEO_QA_REPORT.md) bewaart bron-/meetgrenzen.
Geen volledige technische gesprongen-leidingdekking of WP10-afsluiting.

**Latere lokale aanvulling11oktober:** Task28f3bb3c5 verbetert de bestaande
waterherstelbestemming met afzonderlijke Vlaamse/Brusselse providerdoorverwijzing,
veilig bekende observaties en twee daadwerkelijk gelezen officiële bronnen.
Onafhankelijke taakreview, fresh336tests/fullproductgate en vier desktop/mobile/
JS/no-JS profielen pass,543GET-onlyrequests; andere vijf dienstrecords behouden.
Alleen gewijzigde watercontent krijgt11October lastmod. Whole-branch/hosted/live
gate blijft apart; echte vraag/technicus-/oorzaak-/vorstbewijs en volledige WP10
zijn hiermee niet afgerond. Geen nieuwe URL of technische DIY-/verzekeringsclaim.

**Files:** `content/advice-guides.mjs`, `content/core-sources.mjs`, adviesrenderer, broninventaris, `tests/advice-guides.test.mjs`, `tests/external-sources.test.mjs`, gapbacklog en briefs.

- [ ] Behoud veertien oorspronkelijke onderwerpen: loodgieterprijs; onderhoudprijs; verplicht onderhoud; frequentie; huurder/verhuurder; onderhoud versus keuring; attesten; geen warm water; drukverlies; herstellen versus vervangen; waterlek herkennen; gesprongen waterleiding; lekkende kraan; rioolgeur. Verbeter bestaande antwoorden waar passend, geen veertien verplichte nieuwe URLs.
- [ ] Gebruik echte query/PAA/reviewthema's, telefoonavragen en technicuskennis. Antwoord eerst, veilige observaties/grenzen, broncontroledatum, bewezen auteur/reviewer, passende CTA en links.
- [ ] Lees regionale officiële bronnen voor onderhoud/keuring/EPB/attest/erkenning/premie en huurverantwoordelijkheid; fabrikant voor techniek. Geen juridisch oordeel uit een SEO-artikel.
- [ ] Brief levert eigen waarde: intakebeslisboom, apparaatcontext, technisch gecontroleerde observatie, echte case, nuttige tool of echte data. Geen verplichte quiz/video per pagina.
- [ ] Onderzoek verval met echte data; alleen inhoudelijke update rechtvaardigt `lastmod`. Geen jaartaltruc of automatische pruning, ook mét data; keep/rewrite/merge/retire individueel beoordelen.
- [ ] Startcapaciteit circa twee goede artikelen/maand. Bronritmes 1/week, 2/week, tweetalig 4/week en max 1/day blijven alternatieven; vraag, review en beheercapaciteit bepalen opschaling.

**Tests:** bronnen/datum/scope, eigen intentie, veiligheid, werkelijke wijzigingsdatum en elementenbehoud. **Done:** geprioriteerde volledige briefs en inhoudelijk gecontroleerde publicatie per cyclus, geen blogquotum.

**11 oktober — WP10 afgebakende voortzetting:**1cd1ed3 voegt praktische attestoverdracht
toe met officiële regionale bronnen en scheidt broncontrole van inhoudswijziging.
Onafhankelijke taakreview akkoord; fresh182tests/lint/auditproduction0/build168/
localcrawl81/92/110 en desktop/mobile/no-JS gids-/formulierchecks slagen.
5ee88a6 levert de [veertien-intentiekaart](../../seo/wp10-topic-coverage.md) en
[eerste bestaande-attestbrief](../../seo/briefs/wp10-first-cycle.md), afzonderlijk
goedgekeurd. Dit zijn lokale implementatie-/documentchecks: volledige release/live
en commerciële evaluatie staan apart. Sanitairvragen/technicusreview blijven
benoemde grenzen; geen volledige WP10-afvinking of veertien nieuwe URLs.

### WP11 — Gratis hulpmiddelen met direct klantnut

**Files:** bestaande onderhoudscheck; na ontwerpgate mogelijk nieuw `libs/water-meter-check.mjs`, `components/water-meter-check.js`, `app/tools/watermetercheck/page.js`, `tests/water-meter-check.test.mjs`; register/metadata/analytics/contactcontext.

**Interfacevoorstel:** `getWaterMeterObservation(input) → {status, differenceLitres, litresPerHour, limitations, nextService}`. Status: `observation/unknown/unsafe/invalid`. Rekenkundige observatie, geen lekdiagnose, besparing of specialistische-techniekclaim.

- [ ] Houd onderhoudscheckregels voor regio/toestel/brandstof/vermogen/datum/keuring actueel. Ongeldige input geeft geen geruststellende uitslag; test handoff bij rewrites.
- [ ] Watermeterpilot: eigen/gedeelde meter, automatisch verbruik, standen/eenheid/tijdsduur en veilige toegang. Gelijkstand is een geldige nulobservatie; positief verschil/tijd is berekenbaar. Dalende/onbekende standen niet hard duiden. Stilstand sluit niet ieder lek uit.
- [ ] Stop bij water nabij elektriciteit of onveilige toegang. Lees eerst officiële watermaatschappijbron; geen gas-/elektrawerk of modelonafhankelijke diagnose.
- [ ] Geen account/e-mailgate; direct resultaat, mobiel, labels, toetsenbord, status/focus/reset en één passende CTA met optionele gecodeerde context. Geen private input in analytics.
- [ ] Meet gebruik, passende doorstap/aanvraag en misinterpretaties. Andere tools alleen bij extra klantnut, niet als productkopie voor linkbait.

**Tests:** gelijk/dalend/leeg/extreem, decimalen/eenheden/tijd/nul, gedeelde meter, onveilig/onvolledig, privacy/voorinvulling en server-HTML. **Done:** bronbegrensde pilot plus usability- en releasecontrole; commerciële opbrengst apart meten.

**11 oktober — watermeterpilot lokaal geaccepteerd:** kernel566e4eb en interface
def4efe zijn onafhankelijk gereviewd;05589ad corrigeert de werkelijk gevonden
oversized-resultfocus achter de vaste header. Fresh252tests/lint/productionaudit0/
build170/crawl82/93/112 en echte Chrome desktop/mobiel/no-JS gates pass. Positieve,
nul-, onvolledige, gedeelde, automatische-verbruiks-, dalende en onveilige invoer
behouden grenzen; privéstanden blijven lokaal en gecodeerde contactcontext wordt
opgeschoond. Geen account/e-mailgate of lekdiagnose. Release/live gate blijft open;
daadwerkelijke eventontvangst, passende aanvragen en evaluatie zijn niet gemeten.

### WP12 — Technische SEO, CWV, toegankelijkheid en security

**Task55 werkelijk geaccepteerd:**ab6ecdda/solefreshreview/471/CI38167406373/
beideactualProduction7000493190/7000482531/canonical82/93/112. Ongewijzigde
nativev2 achtprofielen339GET174cases18ownedfocus126beelden; echte same-guide
clearance/restoration/default/noJS. Originelefout/diagnose bewaard; controlled
center geen automatischoutline-/allsite-/AT-/provider-/veldclaim. Kandidaten
hieronder zijn historische voorbereiding; Task51development/lifecycle blijft open.

**Task55 lokaal kandidaat:** false-default PageHeroflag/marker uitsluitend voor
13foutcodeheroes plus één bestaande observatorselector. Heelhero beschermd,
sticky/native telefoon/contact behouden; floatingcontrols minder beschikbaar
ook desktop. Defaultanderepagina's exact. Unit/13SSR/full471/lint/productie0/
standaardbuild/localcrawl slagen. Originele390fout bewaard: één diagnose
reproduceert0.421875px end-uitlijningsoverloop terwijl telefoon focused/hittable
blijft. V2 gebruikt gecontroleerde native center-uitlijning zonder tolerantie
te versoepelen; geen automatische volledige focusoutlineclaim. Eén standaardrun
achtprofielen349GET/174cases/18ownedfocus/126beelden geslaagd, echte same-guide
restoration/protectedhero/default/noJSflow. Review/exactrelease blijven gates.
Geen algemene site-/AT-/veld-/providerclaim.

**Task53 werkelijk geaccepteerd:**1f10e883/solefreshreview/455/exactCI38161989180/
beideactualnamedProduction/canonical82/93/112/sixnative231GET108cases18ownedfocus
72beelden. Bounded readingclearance, geenalgemenehero-/allsiteclaim. Task55
behandelt apart de uitgesteldeheroMinor; Task51security/lifecyclegates open.

**Task53 lokaal kandidaat:** één marker op bestaande foutcodeleessection en
één extra protectedZonesselector. Beide floatingcontrols verdwijnen zolang
enig deel zichtbaar is, ook desktop; stickytelefoon/nativeCTA/bronnen/originele
logo/reviewfuncties blijven. Kosten: geen floatingcontrols tijdens langecatalogs.
Generieke eindCTA blijft buiten deze marker. Pending/focus/meerderezones/dynamische
route/dismissal/stale-callbackunitchecks en13volledigeSSRpreservation slagen;
455/lint/productie0/build170/local82/93/112. Zes echte390/320/1440-browserprofielen
slagen243GET/108cases/18ownedfocus/72beelden: reading bottomalignedvrij/restoration/
nativefocus/dismissal exact. Hoofdonderzoeker leest volledigeharness/results en
werkelijkepixels. ReadingMinor lokaal begrensd opgelost; review/exactlive nog gate.
Rating503/synthetische2004.7/123/18homepageRSC204 zijn fixtures, geenproviderbewijs;
Intergas12homepageprefetches sluiten serverPlacescalls niet uit. Hero intro overlap
bijrestoration blijft uitgesteldMinor; generieke eindCTA/onmarkeerdeprose buiten
deze reparatie. Geen algehele leesbaarheids-/AT-/field-/performanceclaim.

**Task51 onderzoek afgerond, bevindingen niet opgelost:** één freshfullaudit
9geraaktepackage/ancestorrecords(7high/2moderate),twee advisories,alle10paden dev.
Primaireadvisories/registry/installedconsumers tonen geen compatibleminimale
braces/parserwhole-treepatch; geenforcefix/Tailwindmajor/Nextdowngrade/config-
oflockwijziging. ESLint9EOL6augustus is afzonderlijke lifecycleachterstand;
React/import/a11ypeers sluiten10uit. Productieaudit0 is geen algeheleveiligheid.
Reachability-/vendored-/veld-/accountgrenzen blijven, securitycriterium niet afgevinkt.
Bronnen en exacte grenzen: [bewijsregister](../../seo/evidence-register.md).

**Files:** `libs/seo-data.mjs`, `libs/schema-data.mjs`, `libs/html-audit.mjs`, `libs/seo-audit-targets.mjs`, `scripts/seo-audit.mjs`, `scripts/source-audit.mjs`, robots/sitemap/not-found/social routes, Next-config/fonts/images, package/lock/CI en relevante tests.

- [ ] Server-HTML/links, unieke title/meta/H1 en logische koppen, nl-BE/viewport, self-canonical/HTTPS/host/slash/queryvarianten, echte 404/redirectketens, orphans/anchors/assets, sitemap alleen published met echte `lastmod`, robots en noindexheaders.
- [ ] Zichtbare breadcrumbs en matching JSON-LD, één bedrijfsentiteit, passende Business/Service/Article, waarheid in logo/telefoon/uren/gebied/`sameAs`. Externe semantische/rich-resultvalidatie apart van JSON-syntax; geen nep-reviews of erkenning.
- [ ] OG/Twitter: paginaspecifieke titel/beschrijving/alt/1200×630; casebeeld alleen passend goedgekeurd. 78 statische cards blijven noindex-assets, geen sitemapbloat.
- [ ] Test desktop/mobiel: home, onderhoud, herstelling, keuring, sanitair, gasketels, merk, foutcode, gebied, project, contact, tool en advies. Menu/keyboard/taptargets/stickies/popups/footer/leesbaarheid/formfouten/hydration/console; behoud functies.
- [ ] Performance: hero, fonts, JS, derden/widgets, cache, sizes en noodzakelijke preconnect; code splitting en gereserveerde ruimte. Vergelijk lab onder gelijke omstandigheden. Real-user p75: LCP ≤2,5 s, INP <200 ms, CLS <0,1 apart; TBT is geen INP.
- [ ] Security: preview/staging/secondaire deployments, server-only keys, validatie/bodylimits/abuse, geen PII/secrets/source-maplek. Geen ongerelateerde accountconfiguratie wijzigen.
- [ ] Werkelijke Node 24, clean install, lock/CI; productie-/ontwikkelaudit apart. Negen devbevindingen onderzoeken op scope, compatibele patch en ESLint 9-support. Geen geforceerde major die styling breekt.
- [ ] Sibelga 403 uit bron-audit zichtbaar houden naast handmatig bewijs. Bereikbaar ≠ inhoudelijk juist; geen gemaskeerde failures of nieuw Vercel-project als workaround.

**Fresh verification commands:** onder echte Node 24-PATH: `npm ci`, `npm run lint`, `npm test`, `npm audit --omit=dev`, `npm run build`, `npm run seo:audit -- <local-production-url>`, `npm run sources:audit`; live `node scripts/seo-audit.mjs https://www.abservice24.be`. Gebundelde Node: `/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`. Browser, Lighthouse en inhoudscontrole aanvullend. Een documentatiewijziging vraagt documentcontrole; een productrelease de volledige gate.

**Done:** exacte releasechecks en benoemde/opgeloste issues. Een 100-score vervangt geen functionaliteit of velddata.

**11 oktober — afgebakend CI-onderhoud:** huidige officiële checkout7.0.1 en setup-node7.1.0
native Node24-manifests gelezen en release-SHAs onafhankelijk geverifieerd. Alleen twee
workflowrefs vervangen; bestaande triggers/readpermissions/cache/gates behouden. RED→GREEN,
taakreview akkoord en fresh148tests pass. Publicatie1b42030/exacthostedrun38094780958 bevestigt
nieuwe nativeNode24actions/cache/cleanups en afwezigheid van oude Node20-actionwaarschuwingen.
ESLint9-deprecation blijft; full dev9 onderzocht, twee advisories/geen bewezen drop-inESLint10.
Bracespatch ontbreekt; parsermajorfix vraagt aparte compatibilityQA. Fresh bronaudit47HTTP200/
één Sibelga403; fout blijft zichtbaar.
Dit is geen volledige WP12-, veld-CWV- of securityvoltooiing.

**11 oktober — interacties lokaal geaccepteerd:** gereviewdac40af1 sluit bestaande
native disclosuremenu's na bestemming/padwijziging. Beide originele trustcontrols
maken tijdelijk ruimte voor form/warning/footer/toolresult, herstellen daarna en
behouden logos/livefetch/neutralefallback. Echte desktop/mobiele causalChromechecks
bevestigen44×44 close, focusoverdracht en dat de eerdere tool-/footertaps niet langer
Google/WhatsApp openen. Headless lokaal, geen certificaat voor fysieke apparaten of
veldCWV; hosted/livepublicatie en bredere representatieve controle blijven apart.
Huidige kandidaat heeft79 non-home socialcards naast de historische78snapshot.

**11 oktober — aanvullende echte hero-overlap gecorrigeerd:** onafhankelijke
45-route/profile audit van05589ad bewaart structurele45/45checks en een herhaalde
mobiele telefoon→Google-interceptie als aparte P2. Gereviewd2164026 beschermt ook
de bestaande hero-actierij en ruimt detached zones op. Root fresh258tests/lint/
productionaudit0/build170/crawl82/93/112 en desktop/mobiele causalchecks slagen;
exact193.71875/765.203125 ontvangt nu tel, controls herstellen op veilige plekken.
Water/privacy/no-JS regressiegates slagen eveneens. Dit is lokale acceptatie,
niet de nog uit te voeren hosted/live/whole-branch gate of volledige WP12/CWV.

**11 oktober — voorgaande WP10/11/12-release geaccepteerd:** onafhankelijk
whole-branch gereviewd d77bed4 staat op main/origin; exacteCI38103751546 slaagt
258tests/lint/productionaudit0/build170/crawl82/93/112 onderNode24.21.0. Beide
Vercelchecks/Productionstatuses en freshcanonical82/93/112 slagen. Waterdesktop/
mobiel/no-JS en beide responsiveinteractiongates bevestigen echte focus, hero
tel/tool/footerdoelen, nativehistory/keys en veiligepopuprestoration.184waterGET-
requests/0nonGET; rating503fixture/noactualanalytics/mail/physicaldevice/CWVproof.
Drie inhoudelijk gewijzigde liveURLs eenmaal IndexNowHTTP200 na preview; geen
indexering/ranking. Oudere kandidatuur/geometryfailures blijven geschiedenis.
Dit sluit de genoemde releasegates, niet alle WP10/11/12- of externe/commerciële
metingen. WP07 exact Vaillant/Bulex-modelbronprecisie is de volgende producttaak.

**11 oktober — initiële contactcategorie, lokale kandidaat:** e03983f seedt één
exact toegelaten dienst in echte server-HTML. Dubbele/onbekende querywaarden blijven
leeg; persoonsvelden krijgen geen querydata, toolcontext blijft client-only en
gequeueëde voorinvulling behoudt bewuste dienst/berichtwijzigingen. Onafhankelijke
taakreview akkoord; fresh328tests/fullproductgate en61desktop/mobile/JS/no-JS
profielchecks slagen, waaronder vier groepen initiëledocument-/formulierchecks.
Native POST blijft bruikbaar; aparte contactregressie onderschept verzendingen en
bevestigt pendingmutex/validatie/foutfocus/retry/status/fragment. Geen nieuwe echte
mail, eventontvangst, veldmeting of commerciële uitkomst. Whole-branch/hosted/live
blijft een volgende gate; dev9/ESLint9 en bronaudit403 zijn niet opgelost.

**Latere acceptatie c4a59f9:** exacteCI38107909184 en beideVercelProduction slagen;
canonical82/93/112 en61responsive/JS/no-JSchecks bevestigen initiële categorieën,
dubbel-queryafwijzing, privacy, statussen, clientfragment en header-clear anker.
328tests/build170,3325GET-onlylivebrowserrequests, geen echte nieuwe verzending/
event/rating/fieldmeting. Dit sluit de genoemde releasegate, niet geheel WP12.

**11 oktober — FAQ-clearance lokale kandidaat045d515:** bestaande containerobserver
beschermt nu ook nativeFAQ; alleen no-JS gebruikt gewone flowlinks en verbergt de
inerte close. Originele kanalen/logos/idlefetch/events/dismissal blijven. Onafhankelijke
taakreview Approved, portableRED21/27→GREEN27/27, root376tests/lint/production0/
build170/local82/93/112 en24echte desktop/mobielprofielen slagen: normale
rand-pointer/Enter/Space/focus, no-JScomputedCSS, native dismissal/navigation en
herstel. [QA](../../../SEO_QA_REPORT.md) bewaart harnessdiagnose en grenzen.
Whole-branch/hosted/live is nog apart; noscript lost scripting-enabled
prehydration niet op, en dit sluit geen volledige WP12/veld-CWV/assistive af.

**Latere acceptatie6b1f5a6:** onafhankelijke whole-branch review,376lokale en
hosted tests, exactCI38114067540, beide VercelProduction en canonical82/93/112
slagen.24echte liveFAQ-rand/Enter/Space/strictstatic/close/herstel/routeprofielen
slagen,496GET-onlyrequests/geen writes/pageerrors/overflow. Zes matched Borsbeek
mobiele labruns99/100/100/100, medianeLCP ongeveer2.023s; geen causale winst of
veld-CWV. Geen route/status/date/bronwijziging ofIndexNow. JS-enabledprehydration,
physical/assistive/field en echte provider/event/casevoorwaarden blijven open.

**11 oktober — aanvullende WP12-kandidaat voor uitgestelde scripts:** een echte
JavaScript-enabled browserdiagnose toont mobiele FAQ-/formulierinterceptie vóór
hydration, niet de frequentie in echte bezoeken. De bestaande contactlinks staan
nu eerst in normale flow; pas na de initiële geometriecontrole mogen ze zweven.
De inerte close is vooraf verborgen/disabled. Originele kanalen, logos, hrefs,
events, ratingeffect, noscript, focus en dismissal blijven. Echte RED→GREEN,
379 tests/lint/productieaudit 0/build 170/local 82/93/112 en vier uitgesteld-script-
plus 24 bestaande JS/no-JS-profielen slagen lokaal. Whole-branch, hosted/live en
matched lab blijven apart. Geen route/status/datum/bronwijziging of IndexNow;
geen volledige WP12-, fysieke/assistieve/veld-CWV- of zakelijke acceptatie.

**Latere acceptatie `1eb074d`:** onafhankelijke whole-branch review, 379 tests,
exacte CI 38116829497 en beide Vercel Production-statussen slagen. Canonical
82/93/112, vier uitgesteld-script- en 24 bestaande FAQ-profielen slagen; de
afgebakende prehydration-correctie is live bevestigd. Zes matched Borsbeek-labruns
blijven 99/100/100/100, mediane LCP ongeveer 2,01 s; geen causale of veldclaim.
De volgende QA-only kandidaat bewaart bron-URLs en keurt onverwachte console-
diagnostiek af. Dertien guardtests en 392 volledige tests/lint slagen; vier
strikte browserprofielen slagen, één doelbewuste consolefout wordt afgekeurd.
Review/publicatie van die QA-only slice blijven apart. Product runtime, routes,
states, datums, bronnen en afhankelijkheden veranderen daardoor niet; geen
IndexNow. Echte bedrijf-/veld-/accountvoorwaarden blijven open.

### WP13 — Verdiende links en lokale partners

**Eigenaarantwoord 11 oktober:** geen bestaande samenwerking/lidmaatschap bij
Syncura, Techlink/Embuild of Vaillant. De drie relatie-afhankelijke routes zijn
daarom deferred; geen partnerclaim, nieuwe aansluiting of herhaalde vraag naar
een niet-bestaand document. Publieke listing-/linkstatus is niet opnieuw
gecontroleerd. Een originele technisch nagekeken vakobservatie voor P13-02
blijft een mogelijke afzonderlijke bewijsstap, geen outreach of verdiende link.

**Files:** `LOCAL_SEO_EXTERNAL_ACTIONS.md`; nieuw `docs/seo/earned-link-opportunities.md`. Contactgegevens privé; alleen concepten in repo.

- [ ] Onderzoek unlinked mentions, nuttige vervanging van kapotte bronnen, leveranciers/vakverenigingen, echte aannemers/syndici/vastgoed/architecten/tegels/keukens/vaklui, lokale sponsoring/events/pers en vakbijdragen.
- [ ] Linkgap van drie passende concurrenten; overlap als onderzoekprioriteit. Dofollow/DR ≥20/traffic ≥100/nonsitewide is een bronpreset, geen Google-kwaliteitsscore; relevante nofollowmentions kunnen waarde hebben.
- [ ] Prospect: exacte URL/bron/datum/type/onderwerp/klantrelevantie, bestaande link, echte contactmethode, verdiende kans, reden, effort en status. Geen verzonnen e-mail of rankingruil als redactionele eis.
- [ ] Vrijwillige drafts en negentigdagenschema 5 easy/5 medium/5 authority alleen als voorbeeld met echte prospects. Geen 5/day, 500 in drie dagen, lookalike-warmup of Gmailmachine.
- [ ] Alle dertien cursuslinkroutes behouden hun afzonderlijke beslissing in de bijlage. Eigen hulpmiddel, echte geanonimiseerde observatie, video of informatie is citeerbaar; infographic alleen met echte statistiek. Geen fictieve top-lijst met jezelf op 1.
- [ ] Concrete verzending, sponsoring/deal of externe publicatie vraagt eigen opdracht. Concept ≠ verzonden; plaatsing ≠ geïndexeerd of ranked; geen massaspam.

**Done:** concrete nuttige prospects en goedgekeurde drafts; verdiende live mention/link pas met plaatsingsbewijs. Koop-/PBNroutes blijven afgewezen.

**11 oktober — register voorbereid en taakreview akkoord:**
[vier voorwaardelijke prospects en dertien aparte linkroutes](../../seo/earned-link-opportunities.md)
uitf3021a0 onderscheiden bestaande mention/link, bronextractonzekerheid en beperkte
drie-concurrentenplatformoverlap. Dat is geen volledige backlinkgap, goedgekeurde
pitch, partnership, verstuurde outreach of verdiende nieuwe plaatsing. Bestaande
relatie/lidmaatschap, originele deskundige bijdrage, actuele broncheck, volledige
URL-leveldataset en concrete externe-publicatieopdracht blijven eigen gates.

### WP14 — Distributie, video en observeerbare AI-zichtbaarheid

**Files:** nieuw `docs/seo/distribution-and-ai-observations.md`; echte content/mediareferenties en bestaande metadata.

- [ ] Test maximaal 3–4 passende kanalen, bijvoorbeeld GBP/YouTube/Belgische community. X/LinkedIn/Reddit/Substack/Medium/Instagram/TikTok alleen bij doelgroepwaarde. Guide: vijf kanaalideeën/ICE, één hoofdkanalenpilot van dertig dagen; geen accountquotum.
- [ ] Hergebruik nuttige gids in passende post/thread/communityantwoord, met identiteit en regels zichtbaar. Keyword in eerste zin is copyoptie, geen rankingbewijs; link alleen wanneer direct nuttig.
- [ ] Videopilot: bewezen expertise/toestemming, echte observatie, natuurlijke titel/antwoord, captions/tekst/transcript/thumbnail. 200 woorden/3 Shorts/3 queries zijn alternatieven, geen eis. Geen privégezicht/adres of reclame als objectieve review.
- [ ] Maandelijks tien echte klantvragen; optioneel vijftig brainstormvragen→tien geselecteerde. Registreer land, taal, device, model, web/API, login, datum en geciteerde URLs. Open bronnen; één gepersonaliseerde respons is geen marktdekking.
- [ ] Fanout/best+year/country/reviews/alternatives/NL/EN zijn hypotheses, geen honderden pagina's of verzonnen verborgen queries. Geen universele claims over Google als ChatGPT-bron, achttienmaandentraininglag of vaste domain/brand-slots.
- [ ] Audit eventuele eigen best/top/rank/year-pagina's op bias en echte clicks. Geen nummer-1-tabel voor jezelf. Earned mentions, geen placementruil of netwerklinkkoop.
- [ ] Gebruik Google AI-rapport en Bing-citations/intents/topics/share/compare indien toegankelijk. Bing is geen totaalmeting voor alle AI-diensten en geen causale SEO-score. [Bing-bron](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/).
- [ ] De bronquota van twintig DMs en drie subreddits/tien threads/één verhaal zijn afgewezen, conform G-050/G-054. Eventuele toekomstige outreach vraagt een afzonderlijke concrete opdracht en echte relevantie, zonder bronquotum. Dagelijks posten of iedere reactie beantwoorden is geen verplichting; capaciteit en kanaalregels gaan voor. Wekelijkse AI-check kan tijdelijk bij een experiment; maandelijks is standaard.

**Done:** herhaalbare kleine observatiedataset en brongebonden content; externe publicatie alleen met opdracht/bewijs. Geen gegarandeerd sociaal linkgewicht of AI-citatie.

**11 oktober — documentair contract gereviewd:**dca0ff6 bewaart
[drie voorwaardelijke kanalen, één voorgestelde GBP-pilot en tien vaste vragen](../../seo/distribution-and-ai-observations.md).
Acht gelezen primaire beleidsbronnen, twee afzonderlijke workerobservaties en
Q4's echte native Bulex-queryfamilie blijven onderscheiden. Het private context-/
citatieschema is leeg: geen post, video, AI-antwoordmeting of commerciële uitkomst
uitgevoerd. Moderatie, capaciteit, media/deskundigheid, concrete publicatieopdracht
en daadwerkelijke capture blijven nodig; dit is geen volledige WP14-afronding.

### WP15 — Franse Belgische lokalisatie

**Eigenaarantwoord 11 oktober:** “Wel Franse dienstverlening, nog geen
tekstcontroleur”. De operationele taalvoorwaarde is bevestigd, niet de
technische tekstreview, onderhouden vertaalworkflow of geteste contactflow.
Geen Franse route, hreflang of hele-siteclone gepubliceerd. WP15 is daardoor
niet afgesloten; deze actuele aanvulling vervangt geen historische bronmatrix.

**Files:** pas na operationele bevestiging: Franse routes/content/switcher/metadata/hreflang/tests. Bestaande nl-BE-URLs behouden.

- [ ] Bevestig echte Franse service, telefoon/mail, technische uitleg, reviewer en beheerder. Geen automatische vertaling om een concurrent te volgen.
- [ ] Pilot Brussel of beste bewezen intentie, bijvoorbeeld `/fr/plombier-bruxelles`; geen hele-siteclone of dubbele Nederlandse intentie.
- [ ] Natuurlijk Frans, vertaalde nav/CTA/FAQ en passende privacy/regels; self-canonical, reciproque nl-BE/fr-BE-hreflang en switcher naar equivalente pagina. Geen IP-redirect of home als universele tegenhanger.
- [ ] Regionale bronregels behouden, professionele taalreview, `.be` behouden; echte Franse aanvraagafhandeling meten.

**Done:** operationele capaciteit/beheerafspraak, technische taalchecks en Franse contactflow bewezen. Zonder capaciteit uitgesteld, niet “afgerond”.

### WP16 — Advertenties en betaalde hulpmiddelen apart

**Files:** betaalde sectie `LOCAL_SEO_EXTERNAL_ACTIONS.md`; toekomstig `docs/seo/paid-acquisition-brief.md`.

- [ ] Verifieer Belgische Local Services Ads-beschikbaarheid/eligibility bij officiële bron. Een Amerikaans loodgietervoorbeeld bewijst niets voor België.
- [ ] Bij concrete opdracht eerst budget/dag/maand, gebied, diensten, uren, negatives, matchtypes, landing, call/formmeting, privacy en billingowner vastleggen.
- [ ] High-intent Search Ads of branded protection alleen met businessreden; niet als organische winst tellen. Geen betaalde links/reviews/indexering.
- [ ] Iedere vendor in de bijlagen krijgt keuze/voorwaarde, niet automatisch installatie: officiële Google/Bing-tools; Ahrefs/SEMrush/DataForSEO; ChatSEO/Viktor/Firecrawl/Parallel/PostHog; SEOgets/DataFast/SEO bot/ListingBott/IndexRusher/Instantly/**GMB Everywhere**/JevSEO; Claude/Cowork/Code/Slack/Teams/WordPress/Webflow; Attention Playbook/letaido.
- [ ] Founder Guide-appnamen en marketingdetails staan afzonderlijk in **G-004–G-016**; ook die zijn behandeld, geen gebruik of prestatiebevestiging. De afgesloten inhoud achter publieke previews blijft ongelezen zonder toegang.
- [ ] Standaard native code/officiële exports. Sandboxfixtures nooit echte volumes noemen. Nieuwe OAuth met minimale rechten, private keys en spendcap alleen bij concrete noodzaak/goedkeuring; een free trial kan billing vragen.

**Done:** gedateerde eligibility-, budget- en toolkeuzebesluiten. Geen euro uitgegeven of campagne gestart zonder expliciet budget.

**11 oktober — voorbereidingsbesluiten gereviewd:**d276709 levert de
[gedateerde betaalde-acquisitiebrief](../../seo/paid-acquisition-brief.md).
Officiële Belgische loodgieterscategorie is bevestigd; bedrijf/postcodeapproval,
private verificatiebewijzen, echte budgetten/billing/capaciteit/privacy en
gekwalificeerde capture blijven onbekend. Alle vendor-/G-004–G-016-besluiten
blijven traceerbaar, native exports eerst, GSC Wizard uitgesloten.
**RESEARCH_PREPARED / EXECUTION_DEFERRED**: geen campagne, spend, badge,
accountgrant of volledige WP16-afronding.

### WP17 — Meetritme, experimenten en blijvende opvolging

**Files:** `SEO_CHANGELOG.md`, `SEO_QA_REPORT.md`, zoekbaseline; nieuw `docs/seo/experiment-log.md`, `docs/seo/reviews/YYYY-MM-DD.md` en blijvende standaarden. Bestaande dagelijkse threadheartbeat behouden, geen duplicaat.

- [ ] Iedere taak leest bedrijfsbrief, baseline en append-onlylog. Versie van agentinstructies tijdens experiment vastleggen; geldende afwijzingen bewaren.
- [ ] Dagelijks bereikbaarheid/functie/bronnen/security en één echte verbetering indien nuttig. Niet steeds dezelfde pagina aanpassen; geen claim van continu draaien zonder beschikbare app/computer.
- [ ] Wekelijks laatste 28 versus vorige 28; bron-30-versus-30 apart. Queries/pagina's/clicks/impressies/CTR/positie/leadfit, winnaars/verliezers/top-10-instroom, verval/regressie en vijf businessacties. Ranking- versus CTR-daling apart.
- [ ] Lever S-127–S-130 expliciet: vijf gevraagde rapporttabellen plus beschikbaarheidsregister voor niet observeerbare gegevens. Exacte kolommen/filters staan in de bijlage; geen ontbrekende dataset reconstrueren.
- [ ] Experiment: bron-IDs, URL, release/datum, variant, echte baseline/noemer/sample, primaire KPI, verstorende factoren, minimumvenster, revertcriteria en uitkomst. Bronwachttijden van 60/90 dagen, twee/drie/zes maanden zijn voorbeelden, geen natuurwet. Feitelijke/functionele/securityfouten direct herstellen.
- [ ] Maandrapport op één pagina: drie echte wins, drie problemen, één hoofdactie, gemeten GBP-calls, nonbrand/lokaal, commerciële landingen, reviews/citations, ontvangst en AI-check. Geen data betekent geen verzonnen wins.
- [ ] Per kwartaal feiten/uren/scope/erkenning/bronnen/regels/CWV/dependencies/privacy. Volledige QA per productrelease; geen irrelevant verbruik om budget op te maken.
- [ ] IndexNow alleen voor expliciet substantieel gewijzigde published URLs na live inhoudscontrole; dry run standaard. Geen automatische retry, hele historische site, runtime- of documentcosmetica. Ontvangst, indexering en ranking blijven apart.

**11 oktober — documentair meetcontract voorbereid:** [append-only experimentlog](../../seo/experiment-log.md)
legt echte kandidaatcommits, bevroren instructies, hypothese en herstelcriteria vast. Het
[gedateerde reviewrecord](../../seo/reviews/2026-10-11.md) bevat vijf lege NOT COLLECTED-tabellen
en beschikbaarheidsregisters voor4GSC/7GBP/4analytics outputs. Geen nieuwe gelijke/monthly
exports, gekwalificeerde leads of gemeten evaluatie; release/live blijft aparte gate.
Dit voltooit deze documentaireslice, niet de volledige rapportage- of WP17-uitkomst.

**Done:** controleerbaar ritme en een echte hypothese-evaluatie zodra voldoende data bestaan. Labscore of citatietrend is geen leadresultaat.

## 7. Praktische fasering zonder rankingbelofte

| Fase | Deliverables | Voorwaarden |
|---|---|---|
| Eerstvolgende uitvoering | Bedrijfsbrief; echte ontvangst/events; klantcopy en kernlinkgaps; gerichte QA | Veilige copy/techniek kan zonder nieuw accountbewijs; ontvangst waar bereikbaar |
| Eerste meetcyclus | Juiste GSC-property/exports; GBP-baseline; publieke citationaudit; volledige kandidaatrapporten en eerste vijf kansen | Juiste accounts en echte identiteit/data; ontbrekend blijft open |
| Eerste inhoudspilot | Eén actuele modelcatalogus, één traceerbare case, beste adviesbrief, watermeterpilot | Gelezen bronnen, toestemming waar nodig, ontwerp/test/review |
| Daarna lokale groei | Beste onderbouwde gemeente, project-/provincie-/merklinks en review van bestaande gebieden | Eigen klantwaarde; geen 304-paginaquotum |
| 30–90 dagen ontwikkeling | Gemeten kernpagina-experiment, partnerprospects, achtweekse GBP-conceptkalender en passende videopilot | Data, capaciteit en concrete outreachopdracht; geen resultaatgarantie |
| Voorwaardelijke uitbreiding | Franse pilot, betaalde acquisitie, meer modellen/tools/lokale URLs | Echte operationele capaciteit, beheer, budget, eigen intentie en QA |
| Doorlopend | Wekelijks/maandelijks/kwartaalritme; zinvolle dagelijkse opvolging | App/computer beschikbaar; bewijs boven paginaaantal of verbruik |

De oorspronkelijke veertienweekse pagina-roadmap, Sarveshs twaalfweekse ritme, Machina's vierweekse ritme en cursus-/gidsritmes blijven volledig traceerbaar in de bijlagen. Vertaal ze naar de bestaande site: geen gemaakte pagina opnieuw bouwen, geen deadline boven waarheid of kwaliteit.

## 8. Acceptance en voortgang zonder misleidend percentage

**11 oktober — FAQ-release6b1f5a6 geaccepteerd:** whole-branch review, exacte
CI38114067540/376tests, beide VercelProduction, canonical82/93/112 en24native
livebrowserprofielen slagen. Borsbeek-lab blijft99/100/100/100 en ongeveer2.023s
LCP onder dezelfde instellingen. Dit sluit de FAQ-randcorrectie hieronder af,
niet scripting-enabledprehydration, alle34acceptatiepunten of alle18WPs.

**11 oktober — WP08-release6015224 geaccepteerd:** onafhankelijke whole-branch
review,370premerge/merged tests, exacteCI38111748226, beide VercelProduction
statuses, canonical82/93/112 en32desktop/mobiel JS/no-JS profielen slagen.
Zes vergelijkbare Borsbeek-mobiele labruns scoren99/100/100/100; medianeLCP
2.026→2.022s is beschrijvend, geen causale winst/veldCWV. Eén6URLIndexNow200
is ontvangst, niet indexatie. [QA](../../../SEO_QA_REPORT.md) bewaart details;
de FAQ-overlap aan de viewportkant is de volgende begrensde WP12-correctie.
Menselijke lokale-waardecheck, echte districtcase/review en302concepten blijven
open; oudere kandidaatnotities hieronder zijn historische fasen.

**11 oktober — begrensde WP08-kandidaat80a6fa9/3cda5da:** Borsbeek heeft
afzonderlijke officiële districtscontext; vijf andere paragrafen vragen bekende
individuele gegevens zonder geografische technische gevolgtrekking. Zes echte
wijzigingsdatums, overige feiten/brondata/routes/states behouden. Beide taskreviews
Approved, root370tests/lint/production0/build170/local82/93/112 en32 responsive
JS/no-JS districtprofielen slagen. [QA](../../../SEO_QA_REPORT.md) houdt exacte
release/live/Lighthouse, bronfallback en popup-overlapobservatie apart. Dit sluit
niet WP08, echte gemeente-/districtbewijzen of menselijke unieke-waardecheck af;
302 gemeenteconcepten blijven niet-routable. M111/E34-overzicht volgt afzonderlijk.

Een taak is alleen **afgerond** als deliverable én vereiste test/account/broncontrole bewezen zijn. Gebruik bron-ID, beslissing, status, verantwoordelijke, afhankelijkheid, bewijsplaats, laatste check, release-SHA indien code en volgende stap. Houd implementatie, live verificatie, externe bevestiging en zakelijk effect apart.

- [x] Controleer alle 34 M110-acceptatiebullets afzonderlijk: [beoordelingsmatrix](../../seo/2026-10-11-masterprompt-acceptance-34.md) bewaart de exacte volgorde, geleverd bewijs en resterende inhoudelijke/externe grens.34beoordeeld is niet34afgerond of alle18WPs; onderliggende onvoltooide voorwaarden blijven open.
- [x] Lever M111 A–K: [actuele tussenrapportage](../../seo/2026-10-11-masterprompt-a-k-report.md), onafhankelijk documentreview Approved; alle A–K-onderdelen met18behouden/64nieuwe URLs, bewijs, grenzen, echte release/labresultaten en volgende acties. Dit is rapportageacceptatie, niet alle34M110-bullets of alle18WPs.
- [x] Lever E34: hetzelfde rapport bevat304gemeenten/tien districten/zes hubs, alle302niet-routable concepten,80published/tweenoindex, bewijs/indexability/links/GSC-onbekenden en twintig onderzoekskandidaten. Nul complete gemeten prioriteitsscores of matching lokale cases blijven onbekend/ontbrekend; geen publicatiebesluit afgeleid.
- [ ] Geen verweesd bronvereiste: C-twintig modules, S-twintig prompts, M-vier passes, J-thema's, G-publieke previews en U58 gekoppeld. Benoem ongelezen/betaald/afgebroken materiaal precies.
- [ ] Productrelease: RED→GREEN, passende onafhankelijke bron-/kwaliteit-/code-/elementenreview, echte Node 24, lokale/hosted QA, juiste GitHub/Vercel-SHA/www, kritieke live flows en QA/changelog. Geen gefaalde gate wegpoetsen.
- [ ] Alleen een apart gedefinieerde deliverabletelling mag als voortgangsteller dienen. Nooit 114 tests/113 secties, 79 URLs/304 gemeenten of Lighthouse 100 als SEO-percentage. Brondekking en afgewezen adviezen zijn geen nieuwe klanten.

## 9. Planhandoff

Plancontrole op 10 oktober 2026: de hoofdschrijver heeft dekking, stappen, interfaces, vijf reviewrisico's en omvang zelf beoordeeld. Daarnaast zijn de drie bronstromen onafhankelijk tegen het hoofdplan gecontroleerd. De gevonden fouten in verwijzingen, bewijsstatus, presets en quota zijn verwerkt. Mechanisch gecontroleerd: 830 bron-/sectieregels, achttien werkpakketten, dertig pagina-intenties, 34 acceptatiepunten, A–K, tabelstructuur, lokale documentlinks en hashes van de zes originelen. Deze controles bewijzen het plan, niet toekomstige uitvoering of SEO-resultaat.

Dit document plus de vier detailbijlagen is het gezamenlijke meesterplan. `SEO_MASTERPLAN.md` blijft de architectuurkaart; dit document is het actuele uitvoerings- en traceerbaarheidsplan.

Eerste veilige uitvoeringseenheid: **WP06 klantcopy en relevante kernlinks**, naast **WP01 echte ontvangst- en meetcontrole**, voorafgegaan door WP00. Daarna bepalen echte zoekdata, fabrikantbronnen en beschikbaar projectbewijs de volgende stap. Tijdens het schrijven zijn alleen plandocumenten gewijzigd: geen externe mutatie, campagne, aankoop of nieuwe websitefunctionaliteit.
