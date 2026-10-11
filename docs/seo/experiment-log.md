# WP17 — append-only experimentlog

Vastgelegd op 11 oktober 2026. Dit log bewaart voorbereiding en later werkelijk gemeten
uitkomsten. Het is geen releasebewijs of afgeronde hypothese-evaluatie. Lees bij iedere taak de
[bedrijfsbrief](business-brief.md), [zoekbaseline](2026-10-10-search-baseline.md), dit log en de
[publicatiepolicy](content-publishing-policy.md). Het bestaande goedgekeurde
[uitvoeringsplan, WP17](../superpowers/plans/2026-10-10-complete-source-seo-masterplan.md)
blijft leidend; bronvereisten S-126–S-132 staan in de
[rapportagecrosswalk](2026-10-10-source-coverage-sarvesh-machina.md).

## Schrijf- en meetcontract

- Voeg nieuwe records onderaan toe met experiment-ID, registratiedatum, status, bron-ID's,
  URL, versie, releasebewijs en meetvensters. Laat eerdere hypotheses, cijfers, afwijzingen
  en onzekerheden staan. Corrigeer fouten met een gedateerd aanvullingsrecord dat het
  vervangen veld en de reden noemt; herschrijf geen eerdere uitkomst.
- Leg vooraf variant, primaire KPI, echte baseline, noemer, steekproef, toelatingsregels,
  verstorende factoren, minimumvenster en herstelcriteria vast. Onbekend is niet nul.
  Label voorbereiding, lokaal gecontroleerd, gepubliceerd, live gecontroleerd en geëvalueerd
  afzonderlijk. Een commitdatum is geen productiereleasedatum.
- Bevries agentinstructies en goedgekeurd plan per fase met pad, versie en Git-blob of
  hash plus reviewbase. Noteer een instructiewijziging als nieuwe aanvulling/fase voordat
  de vergelijking verandert; wijzig niet achteraf de gekozen KPI of toelatingsregels.
- Bewaar echte exports, klantidentiteiten, mailboxinhoud en private uitkomstregistratie
  buiten Git en publieke assets. Dit log bevat alleen herleidbare bewijs-ID's en veilige
  aggregaten. Een klik, filterresultaat, bronrij of technische test is geen klant.
- Voeg gemeten resultaten pas toe met beide beschikbare vensters, dezelfde filters,
  native aggregaties, sample/noemer en beperkingen. Ontbrekende of geanonimiseerde rijen
  krijgen geen nulwaarde. Geen afzonderlijke query- en paginatabellen samenvoegen tot
  verzonnen query-paginametrics. Geen betrouwbaarheid van 95% of minimumsample verzinnen.
- Dagelijkse functie-/bron-/securitycontrole alleen wanneer app/computer beschikbaar zijn;
  verbeter bij aantoonbaar nut. Wekelijks laatste 28 volledig beschikbare dagen tegenover
  de voorgaande 28; maandrapport 30 tegenover 30 afzonderlijk. Kwartaalcontrole van feiten,
  scope, bronnen, regels, veld-CWV, dependencies en privacy. Productrelease-QA blijft apart.
  Bestaande opvolging blijft behouden; dit document maakt geen automation aan en bewijst
  geen continu draaiende agent. IndexNow vraagt substantieel gewijzigde published URL,
  live inhoudscontrole en afzonderlijk ontvangstbewijs; geen documentcosmetica of blinde retry.

## EXP-20261011-REMEHA — voorbereiding, niet geconcludeerd

Registratiedatum: **11 oktober 2026**. Status: **VOORBEREID / kandidaat lokaal in broncode;
root-release en eigen livecontrole nog open in deze momentopname**.

| Veld | Vooraf vastgelegd |
| --- | --- |
| Canonieke pagina | `https://www.abservice24.be/foutcodes/remeha`; bestaande URL/zoekintentie |
| Bron-/taakkoppeling | WP07; masterbron M18–M20 (regels 1198–1318), [bronmatrix](2026-10-10-source-coverage-master-phase-e.md); BF-H03 uit bedrijfsbrief; S-126–S-132 voor rapportage |
| Fabrikantbewijs | Belgische Calenta Ace-Matic-handleiding, echte revisie `7871265-05-04072025`, [vastgelegde bronmetadata](../../content/remeha-calenta-ace-matic.mjs); bestandnaam `-04` is niet de footerrevisie |
| Eerdere uitgebrachte baseline | `1b420303d74b194817d7cfa8d5e626a3d7f3386c`: 59 historische Remeha-bronrijen (Avanta 17, legacy Calenta E 23 en Su 19); releasebewijs in [QA](../../SEO_QA_REPORT.md) en [bewijsregister](evidence-register.md) |
| Kandidaatcatalogus | `1d4da96602db2af9144518980e98708835e65927`: 300 extra component-/tabelrijen, samen 359; vier modellen **25s/35s/30c/40c**, niet 25L; CU-GH-21 en aanwezige SCB-10 met betrokken componenten afzonderlijk |
| Kandidaatzoekfunctie | `9564e860eea4355272cd00a2ce62c5a4b02dfe30` en `c5b8eca60d2210574fc20bb1ba11bf7948abdc0f`: volledige codealiases zonder prefixlek, met behoud van genummerde beschrijvingszoekvragen |
| Kandidaatmetadata / reviewbase | `b8c8e6cbb496e996bda77489ca88c759fab80656`: echte Ace-Matic-metadata en inhoudsdatum 2026-10-11; dit is de reviewbase, geen uitgebrachte productie-SHA |
| Definitieve release en starttijd | Nog niet vastgesteld; root voegt na release het echte volledige SHA, productie-/livebewijs en werkelijk starttijdstip met tijdzone toe. Geen datum of live-pass afleiden uit bovenstaande commits |
| Hypothese | Exacte model-/component-/codeantwoorden helpen bezoekers hun toestel beter herkennen en geven relevantere herstelintake. Geen ranking- of klantgroeigarantie |
| Primaire commerciële KPI | Aantal werkelijk ontvangen, gekwalificeerde foutcode-aanvragen met aantoonbare Remeha-paginaherkomst per gelijk venster, zodra echte capture bestaat; passend bij bevestigde dienst/gebied en bruikbaar toestel-/model-/symptoomcontext. Kwalificatieregel en herkomstmethode vooraf privé vastleggen; onzekere herkomst apart |
| Commerciële baseline/noemer/sample | **Niet beschikbaar**: geen echte commerciële capture of kwalificatiesample. Vensterlengte en alle ontvangen echte aanvragen met vastgelegde herkomst vormen de rapportnoemers zodra beschikbaar. QA-ontvangst uitgesloten; geen nul of conversieratio invullen |
| Diagnostische KPI's | Native GSC Web-paginarij voor de exacte canonieke Remeha-URL: klikken, impressies, gewogen CTR en native gemiddelde positie, met gelijk ingestelde filters. Querymetrics alleen uit eigen native rijen; exacte query-paginametrics alleen uit werkelijk gekoppelde native export |
| Diagnostische baseline | Bestaande propertysnapshot is niet de gemeten Remeha-experimentbaseline. Een passende native paginavergelijking ontbreekt in deze voorbereiding; geen propertytotalen of losse querypositie toewijzen aan deze URL |
| Varianten en veiligheid | Bestaande historische modellen blijven onderscheiden; uitbreiding beperkt tot vier genoemde modellen/revisie. Ambigue fabrikantkolommen en ontbrekende specifieke diagnose blijven zichtbaar. Geen universele merkdekking, dealerstatus of onveilige doe-het-zelfinstructies |
| Minimumvenster en toelating | Doel: eerste 28 volledig beschikbare dagen na bewezen release tegenover de voorafgaande 28, alleen wanneer beide werkelijk beschikbaar zijn. Geen gegarandeerde evaluatiedatum. Bij ontbrekende capture, te kleine/ontbrekende sample of ongelijk filter: **onvoldoende data**; vooraf samplecriteria vastleggen zonder nu een drempel te verzinnen |
| Maandritme | Afzonderlijke 30-versus-30-vergelijking; niet hetzelfde rapport als 28-versus-28 en niet vervangen door bestaande ongelijke 92/91-dagenexport |
| Verstorende factoren | Seizoen, indexatie/crawllag, veranderde query-/modelmix, accountmoderatie, gelijktijdige kernpagina-/CI-release en overige content-/contactwijzigingen. Een voor/na-verschil alleen bewijst geen causaliteit |
| Onmiddellijke herstel-/revertcriteria | Verkeerde model-/componentcode of bronbetekenis, onveilige instructie, formulierregressie of zoekregressie: direct corrigeren of betrokken wijziging terugnemen en oorzaak/bewijs loggen. Geen wachten op meetvenster bij feit-/functie-/securityfout |
| Latere inhoudsbeslissing | Behouden, verbeteren, samenvoegen of terugnemen na bron-/klantnutreview en passende data; geen blind verwijderen op nul klikken, geen vaste 60/90-dagenregel |
| Uitkomst | **NIET GEËVALUEERD**. 359 rijvermeldingen en werkende technische filters bewijzen geen extra bezoekers, klanten, omzet of organische groei |

### Bevroren instructies voor deze voorbereidingsfase

Plan: `docs/superpowers/plans/2026-10-10-complete-source-seo-masterplan.md`, versie
**10 oktober 2026**, bestaand goedgekeurd WP17. Reviewbase
`b8c8e6cbb496e996bda77489ca88c759fab80656`; planblob in die versie
`e1a61af4225f66b0acedde5c3b2c11e51d2ff5a6`. [AGENTS.md](../../AGENTS.md) in diezelfde
reviewbase: blob `ab441ba0ed31957d9f412f3c033935566f803f08`.
Begrensde opdracht: `.superpowers/sdd/2026-10-10-complete-source-seo-masterplan/task-14-wp17-measurement-brief.md`,
versie **11 oktober 2026**, SHA-256
`99a38dd7cdb6db11943ad7afe7d443941f2a6b9e91abd554d77ff59d4a20dcc0`.
De brief is een genegeerd intern werkbestand; de Git-blobs pinnen de versie ondanks
gelijktijdige rootdocumentatie. Dit record verandert het goedgekeurde plan niet.

Geldende afwijzingen: GSC Wizard uitgesloten; geen ruwe exports in Git, nieuwe accounts/OAuth,
betaalde analyticsupgrade, outreach, advertentiebudget, nieuwe automation, massa-indexverzoek,
synthetische maanddata of rankinggarantie. Technische QA-ontvangst blijft uitgesloten van leads.

Volgende aanvulling: eerst daadwerkelijke release/livecontrole, daarna native gelijke vensters
en private kwalificatiecapture; voeg de gemeten hypothese-evaluatie pas onderaan toe wanneer
haar bewijs bestaat. Het [reviewrecord van 11 oktober](reviews/2026-10-11.md) bewaart de huidige
beschikbaarheid en lege rapporttemplates. WP17 en overige werkpakketten zijn hiermee niet
integraal afgerond.

## EXP-20261011-REMEHA — release and live acceptance

Recorded on **11 October 2026, 00:24:59 UTC /02:24:59 Europe/Brussels**. This
supplements the earlier preparation snapshot without changing its KPI, sample
rules, missing commercial baseline or frozen instructions.

| Field | Observed release evidence |
| --- | --- |
| Production SHA | `6557c45fb8997940eb70c26c3202cc7c3f4af42a`, normally pushed to main after independent whole-branch review and one approved scoped fix review |
| Final filter correction | Actual complete selected aliases take precedence; complete numbered meaning identifiers restore TS3/TA210/EA1/T1/S1 as well as NTC. Producer and legacy digests unchanged |
| Hosted verification | [CI38098059114](https://github.com/Ilias492610/ABService/actions/runs/38098059114):172 tests, lint, production audit0, build and81/92/110 crawl succeed; development9 remains |
| Provider acceptance | Both exact-SHA Vercel checks and production deployments succeed; primary6988792191 status timestamp **2026-10-11T00:20:47Z**, [deployment](https://ab-service-19d84xrdx-ilias492610s-projects.vercel.app). This is not an exact canonical-alias activation timestamp |
| Canonical live acceptance | `https://www.abservice24.be/foutcodes/remeha`:359 rows, exact subcodes/components/metadata and contact handoff observed. Site crawl81/92/110 and desktop/mobile/no-JS13 guides1264 rows pass before this record time; no POST/email |
| Transfer observation | Same-origin CDP load+300ms samples: before261689 desktop/243451 mobile bytes, after247325/253625. Not Lighthouse/CWV, causal speed or business outcome |
| Evaluation eligibility | Release occurred during11October; use complete post-release days only when actual native data and capture exist. No partly released day as a full before/after day, guaranteed evaluation date or fabricated sample |
| Outcome status | **RELEASED /LIVE CHECKED; NOT EVALUATED.** Commercial baseline, qualified enquiries, exact diagnostic page baseline and equal-window observations remain unavailable, not zero |

Native-popup keyboard selection, wider floating controls, other complete-model
source validation, Sibelga403 and development maintenance remain separate. The
original hypothesis/revert criteria still apply; a passing technical gate is not
evidence of ranking, customers or revenue. No IndexNow batch was sent for this
record. Next record requires actual equal-window and qualification evidence.

## EXP-20261011-WATER — preparation before release

Recorded **11 October 2026, 01:23 UTC**. **CANDIDATE / NOT RELEASED OR EVALUATED**.
This is a second useful tool, not an email gate, diagnosis, savings calculator or
claim of commercial gain. Current instruction freeze uses base
`ac40af154724f9d79e52791661c54adfe93e7945`: plan blob
`ef454672c941cb42ef81c17a731109206b371fd7`, AGENTS blob
`ab441ba0ed31957d9f412f3c033935566f803f08`, business-brief blob
`9b37b72212d601ff4c68df065a494d28230688b2`. Subsequent instruction or release
changes require supplements, not replacement of this record.

| Field | Prespecified contract and current evidence |
| --- | --- |
| URL / variant | New `https://www.abservice24.be/tools/watermetercheck`; candidate kernel566e4eb/interfacedef4efe/focus05589ad. Existing water-guide link is a genuine related content change. No deployment time inferred |
| Source IDs / scope | WP11, BF-H04; master/Phase E M21 safety, M46 direct answers, M58 optional contact and original course C-133 useful tool link route. Official Farys test/meter/digital-meter and Vlaanderen leak guidance; no universal safety or leak diagnosis |
| Hypothesis | An optional safe local observation and clear limitations help visitors distinguish observed consumption from a suspected leak and provide a more appropriate enquiry |
| Primary commercial KPI | Actually received, qualified water/lekdetectie enquiries with evidenced tool origin over equal windows, once private intake qualification and actual origin capture exist; exclude QA and uncertain origin |
| Baseline / denominator / sample | **Unavailable, not zero**. New route has no previous tool cohort. Prior service enquiries cannot be assigned tool origin. Window length and all genuinely captured tool-origin enquiries will be denominators; no invented target or conversion rate |
| Secondary observations | Only coded completion status and optional contact event in current analytics contract; raw readings/time/units stay local. Actual provider ingestion unproven; a browser handler is not an analytics receipt or completed job |
| Diagnostic search | Native exact-page GSC metrics with real equal filters/fully available days once indexed and data exist; no invented query-page joins, keyword volume or position |
| Safety and privacy | Unsafe access/electricity stops; shared/possible-use/descending/incomplete observations do not show rates or contact pressure. Equal readings do not exclude all leaks. Fragment uses service/context/result only and is consumed/cleaned by contact |
| Minimum window / inclusion | First28 fully available post-release days is proposed observation window, not guaranteed evaluation date or sufficient statistical sample. Without actual capture/filter/sample adequacy record insufficient data. Monthly30-versus30 stays separate |
| Confounders | New-page discovery, season, concurrent attest/advice/privacy/navigation changes, popup clearance, traffic/service mix and missing event ingestion; before/after alone is not causality |
| Immediate stop / correction | Unsafe/reassuring misinterpretation, arithmetic/input/privacy leak, broken handoff/result focus or contact regression: fix or revert the scoped change immediately; do not wait for a measurement window |
| Current failure and correction | Root actual long-result focus hid its title behind sticky header;05589ad fixes deliberate alignment after real RED. Fresh physical-browser acceptance remains pending at registration |
| Final release / outcome | Pending exact reviewed SHA, hosted provider and canonical live checks. **NOT EVALUATED**; no ranking, customer, revenue or continuous-run guarantee |

Standing exclusions remain: GSC Wizard, private exports in Git, new OAuth, paid
APIs/trials, advertisements without budget, outreach/public posts without concrete
instruction, fabricated cases and cosmetic IndexNow submissions. Existing approved
heartbeat may continue when app/computer are available; this record creates none.

### EXP-20261011-WATER — local corrective acceptance supplement

Recorded **11 October 2026, 01:54 UTC**; still **NOT RELEASED / NOT EVALUATED**.
Fresh product2164026 has258tests/lint/auditproduction0/build170/localcrawl82/93/112
and root desktop/mobile/no-JS water acceptance. Result tops142.45/142.23px and
contact142.17/143.05px clear the126.59px sticky header;193 inspected requests,
zero attempted non-GET and no raw-input storage/network leak.

The broader original05589ad audit reproduced a second real problem: Google
intercepted part of a mobile hero telephone CTA. Reviewed2164026 adds hero-action
clearance and detached-zone cleanup; the exact193.71875/765.203125 phonepoint now
receives tel. Both controls restore at safe positions. This is a functional
correction and concurrent conversion confounder, not measured commercial lift.
No experimental KPI, baseline, inclusion window or instruction freeze changed.
Hosted/provider/live acceptance and actual commercial capture remain pending.
