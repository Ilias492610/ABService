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
