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

### EXP-20261011-WATER — release and canonical live supplement

Recorded **11 October 2026,02:14 UTC**. Production release
`d77bed4d3970ebee47223377369211a4451a2662` follows independent whole-branch
review and normal main push. [CI38103751546](https://github.com/Ilias492610/ABService/actions/runs/38103751546)
passes258tests/lint/productionaudit0/build170/crawl82/93/112 on Node24.21.0.
Both exact-SHA Vercel checks/Production deployments succeed; primary6989683907
status **2026-10-11T02:03:13Z**, not an exact canonical-alias activation time.

Canonical live82/93/112 and waterdesktop/mobile/no-JS gates pass.184 inspected
requests, zero attemptednonGET, rawinput stays local; result/contact focus and
optional coded handoff pass. Floating hero/tool/footer protection, restoration,
native menus/keys/history and close/focus also pass. Rating was mocked503 and
external analytics/nonGET blocked, so no actual review/event/mail receipt proven.
Direct200 canonical checks confirm newtool, actual waterguide link and attest
revision. One explicit three-URL IndexNow notification receivesHTTP200 after
preview/contentchecks; indexation/ranking not confirmed. No automatic retry.

**RELEASED /LIVE CHECKED; NOT EVALUATED.** Primary KPI, missing baseline/sample,
frozen instruction blobs, confounders, exclusions and revert criteria remain as
prespecified above. No fully post-release28/28 or30/30data, captured qualified
tool-origin enquiry or commercial result has been supplied. Release day is
partial and cannot count as a full post-release day. Older preparation/failure
records remain history, not retroactively relabelled as successful release.

## SOURCE-PRECISION-20261011 — functional/source candidate, no growth evaluation

Recorded11October2026 before publication, accepted baseline `d77bed4` and reviewed
candidate906a0ea/5d62836. WP07 scope/source/safety gates trigger immediate factual
correction, not a growth experiment waiting28days. Actual manufacturer issues:
Vaillant0020282230_00/02.05.2023; Bulex0020124551_02/27.02.2015;
Buderus6720813438(2021/07)BE. Current retrieval/sourcecheck does not imply newest
revision or fit to an individual installed device.

Exact source/model metadata, neutral F105, electrical BulexF73/F74, Buderuslocking
5C226/selection/sensorconditions/electronicguidance correct present information.
No new commercial hypothesis, baseline, inferred keyword demand or claimed
customers. Native equal-window exact-page metrics and qualified enquiry capture
remain unavailable; functional QA is the actual immediate acceptance criterion.
Wrong scope/unsafe action/search/CTA/privacy regressions require immediate scoped
correction, not a measurement window. Same-day other releases and source/season/
model traffic mix preclude causal before/after interpretation.

Fresh actualNode24.19.0/284tests/lint/productionaudit0/build170/local82/93/112,
12desktop/mobile/JS/no-JS source-guide checks pass;224GET-only browser requests.
Both independent task reviews approve. Whole-branch/hosted/live gate pending;
**CANDIDATE /NOT EVALUATED**. Known source403/development9, unconfirmed review/
custom-event/physical-device/field-CWV and commercial capture remain separate.
No IndexNow candidate submission or paid/account change. Frozen parent WATER and
REMEHA experiments retain their own original contracts and release supplements.

## SOURCE-PRECISION-20261011 — release and live supplement

Recorded **11 October 2026,02:48 UTC**. Release
`9e373274f74030a96b4b6b53c40ac7cd7ff55996` follows independent whole-branch
approval and normal main push. [CI38105783234](https://github.com/Ilias492610/ABService/actions/runs/38105783234)
passes284tests/lint/productionaudit0/build170/crawl82/93/112 onNode24.21.0.
Both exact-SHA Vercel checks/Production statuses succeed; primary6989989293
status02:38:39UTC is not an exact canonical-alias activation timestamp.

Canonical crawl82/93/112 and twelve Vaillant/Bulex/Buderus desktop/mobile/JS/no-JS
checks pass.209 inspected requests, zero attempted non-GET/errors/overflow;
actual90/43/52 explanations, scopes, alias/search/safe-action and repair handoff
confirmed. Rating503 fixture/external-write firewall excludes actual review,
mail/event receipt, physical-device/field-CWV and commercial conclusions.
One previewed substantive three-guide IndexNow batch receivesHTTP200 after live
content checking; no retry or indexation/ranking proof.

**RELEASED /LIVE CHECKED; NOT GROWTH-EVALUATED.** Earlier candidate and source
limits remain history; no new baseline, sample or causality is supplied. Parent
WATER/REMEHA KPI/inclusion/freeze/revert contracts are unchanged. The actual
next brand-intent correction is a separate functional task, not a measured lift.

## INTAKE-CONTINUITY-20261011 — functional candidate, no growth evaluation

Recorded11October2026 against accepted9e37327 and reviewed d5a3a59/9f20d50/
e03983f. Wrong default repair category on brand maintenance enquiries and delayed
query-category initialization are functional defects/opportunities, not an SEO
growth experiment requiring a waiting window. The gas control/document addition
provides bounded preparation, not recognized-technician or approval evidence.

Immediate criteria: actual public category in initial HTML with/without JavaScript,
maintenance/repair/neutral intent preservation, duplicate/private input exclusion,
queued manual-edit protection, native/API/mutex/status/tool compatibility and
source-bound control handoff. Root fresh328tests/lint/productionaudit0/build170/
local82/93/112,61browser profile checks and contact regressions pass;3257
main-browser requests are GET-only. Original harness option-parser failure stays
recorded separately from actual native option behavior and corrected full pass.

**CANDIDATE /NOT GROWTH-EVALUATED.** Whole-branch/hosted/live gates remain open.
No equal-window page/query baseline, qualified-enquiry sample, real custom-event
receipt or causal improvement is supplied. Rating fixtures and intercepted form
submissions prove neither actual reviews nor delivery. Source403/development9,
physical-device/field measurements and owner evidence gaps remain separate.
Any factual, privacy, routing or lost-edit regression merits immediate scoped
correction. Same-day releases/traffic mix confound growth attribution. Frozen
WATER/REMEHA experiments retain their own KPIs, sample/inclusions and revert rules.

## INTAKE-CONTINUITY-20261011 — release and live supplement

Recorded11October2026,03:24UTC. Whole-branch approvedc4a59f9 is normally on
main/origin after328premerge+328mergedtests. [CI38107909184](https://github.com/Ilias492610/ABService/actions/runs/38107909184)
passes328/lint/productionaudit0/build170/crawl82/93/112 underNode24.21.0.
Both Vercelchecks/Productionstatuses succeed; primary6990321199 at03:18:28UTC
is provider status time, not exact canonical-alias activation time.

Canonical82/93/112 and61live desktop/mobile/JS/no-JS brand/gas/contactchecks
pass,3325requests0nonGET/errors/overflow. Actual initial category/duplicate/
private/status/tool and native intentlink contracts hold; simulated rating and
external-write guards preserve all evidence limitations. One explicit15changed-
URL IndexNow batch receivesHTTP200 after preview/contentcheck, no retry/indexing.

**RELEASED /LIVE CHECKED; NOT GROWTH-EVALUATED.** No new baseline, qualified
enquiry sample or causal outcome. Earlier candidate/harness diagnostics remain,
known403/dev9/field/provider/business gaps stay separate. WATER/REMEHA frozen
contracts unchanged. Next regional waterprovider handoff is its own factual task.

## WATER-HANDOFF-PROJECT-INTENT-20261011 — bounded functional preparation

Recorded11October2026,03:40UTC against acceptedc4a59f9. Task28f3bb3c5 adds
regional provider routing and safe descriptive observations on the existing water
page; Task29 is a separate existing-project intent handoff using its assigned
servicePath. Neither is a new customer/job/photo match or a growth experiment.
Primary source IDs: original14-topic WP10 burst-pipe row and regional coreSources
waterLeakFlanders/waterNetworkBrussels; projectservice scope BF-F08/BF-F09 and
WP09's existing customer journey. Root brief/register records exact Task29 base.

Immediate acceptance: actual regional/unknown/nonemergency boundaries, optional
safe photos/text sufficiency, source dates/URLs/unchangedfive services; actual
sixproject category/anchor/native form selection, generic unmapped fallback,
private blank/editable controls and retained project content/meta/media. Wrong
route/category, safety/private-context regression or lost pageelements warrants
immediate scoped correction, not a ranking wait. Fulltraceable case evidence is
still absent; project boolean flags are not that evidence.

Task28 localroot336tests/lint/production0/build170/crawl82/93/112 and fourwater
desktop/mobile JS/no-JS profiles pass,543GET-onlyrequests. Whole-branch/hosted/live
and Task29 gates remain open at this timestamp. Source403/development9 are known.
**CANDIDATE /NOT GROWTH-EVALUATED.** Qualified enquiries/equal-window page-query
baseline/sample/denominator and actual custom-event receipt remain unknown, not
zero. Same-day releases/season/querymix confound causality. No primary KPI/sample
or inclusionwindow changed for frozen WATER/REMEHA parent experiments; later
acceptance is appended, not backfilled into this preparation record.

## WATER-HANDOFF-PROJECT-INTENT-20261011 — final local supplement

Recorded11October2026 after independent Task29review.2a512ea preserves assigned
project service in both native enquiry CTAs; existing content/evidence/meta/date
unchanged. Rootfresh345tests/lint/build170/crawl82/93/112 pass.24builtproject
profiles plus fourrenewedwater profiles pass desktop/mobile JS/no-JS,1481/538
GET-onlyrequests,0attemptedwrites/errors/overflow. Actual native editable category,
privateblanks/consent and fixedheaderclear anchor hold. EarlierTask28fourprofile
543request snapshot remains a different legitimate run, not silently replaced.

**LOCALLY CHECKED /NOT GROWTH-EVALUATED.** Wholebranch/hosted/canonical gate is
still open here. No new baseline, qualified-enquiry denominator, customer result,
case-photo match, provider/event/CWV receipt or causal improvement is supplied.
Parent WATER/REMEHA measurement/freeze/inclusion/revert contracts remain unchanged.
