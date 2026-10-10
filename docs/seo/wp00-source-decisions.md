# WP00 — compacte bron → taak/waarborg/afhankelijkheid-crosswalk

Versie 10 oktober 2026. Dit document voegt een deterministische taskkoppeling toe aan vier bestaande bronmatrices; het dupliceert hun 830 regels niet. Hun bronankers, beslissing, status, reden, bewijsgrens en acceptatie blijven gezaghebbend. De oorspronkelijke matrices en het goedgekeurde plan zijn niet gewijzigd. [Bedrijfsbrief](business-brief.md) gebruikt nieuwe officiële KBO-observaties; die wijzigen geen bronstatus of product/account.

## Exacte dekkingspopulatie

| Familie | Gezaghebbende matrix | Sleutel/selectie | Rijen |
|---|---|---|---:|
| C/J/G | [Cursus, John en publieke Guide](2026-10-10-source-coverage-course-john.md) | C-001–235; J-001–101; G-001–058 | 394 |
| S/M | [Sarvesh/Machina](2026-10-10-source-coverage-sarvesh-machina.md) | S-001–142; M-001–089 | 231 |
| U | [Aanvullend bericht](2026-10-10-source-coverage-inline.md) | U-001–058 | 58 |
| MP/PE | [Masterprompt/Phase E](2026-10-10-source-coverage-master-phase-e.md) | Genummerde mastersecties 0–112; E1–E34 | 147 |

**394 + 231 + 58 + 147 = 830** bron-/sectierijen. MP-000 betekent mastersectie 0, MP-112 sectie 112; PE-01 betekent E1. Deze lokale crosswalksleutels vermijden verwarring met Machina's M-001. Masterpreambule, Phase E-preambule, 30 route-intenties, M110's 34 acceptatiebullets, M111's A–K-rapportpunten, tellingen en boilerplate zijn aanvullende context/subcriteria, geen extra atomair getelde rij. Zij blijven gekoppeld via MP-000/MP-011/MP-110/MP-111 en PE-01/PE-34; niets daarvan mag worden weggelaten uit acceptatie. C/J-boilerplate en G-betaalgrens behouden hun bronmetadata-/buiten-scopebesluit.

## Beslisregel: koppeling geeft geen uitvoeringsrecht

Voor iedere rij is de effectieve vastlegging: **bronmatrixrij + taskselector hieronder + WP-contract + bronstatus**. Elke selector verwijst naar een bestaande rij, iedere rij heeft precies één primaire WP (U behoudt zijn reeds expliciete meervoudige WPs), en iedere WP heeft hieronder een waarborg, afhankelijkheid en veilige route. Extra downstreampakketten in het plan blijven gelden. Primaire WP betekent verantwoordelijke voor het besluit, niet dat een verworpen tactic daar alsnog moet worden uitgevoerd.

- **C/J/G:** B = bruikbaar voorstel, A = aanwezige bron/hercontrole; D = uitgesteld met afhankelijkheid uit rij en WP-contract; R = afwijzing blijft afwijzing; K = auteursclaim/caveat blijft metadata/onbewezen. Gemengde codes bewaren elk onderdeel: bij `B doel, R quotum` mag alleen het doel verder, niet het quotum.
- **S/M:** `ja` is passend doel, niet automatisch voltooid; `voorw.` blijft voorwaardelijk met oorspronkelijke gegevens-/budget-/bewijsgrens; `nee` blijft metadata of afgewezen met oorspronkelijke reden. Statuscodes B/G/Q/A/C/L/T/E/P/R/O/X houden de betekenis uit die matrix, niet die van andere matrices.
- **U:** B/V/O/G/A/N behouden hun eigen matrixdefinitie; N blijft bewust niet overgenomen. U-057 blijft bronmarketingmetadata, U-008/U-009/U-055 geen product-/account-/koop-/socialtaak.
- **MP/PE:** I = aanwezig in bron, P = gedeeltelijk/open, G = bewijsafhankelijk, C = voorwaardelijk, D = documentatie. Geen broninspectie, HTTP 200, boolean of oude testuitslag zet een gedeeltelijke eis om naar operationeel voltooid.
- Voor verworpen/ongelezen/metadata-onderdelen blijft de reden in de oorspronkelijke rij staan; het WP-contract geeft een concrete veilige vervanging. Als er geen zinvolle variant is: bewaren als broncontext en geen uitvoering. Ongelezen media/betaalde hoofdstukken worden nooit als gelezen bron geteld.
- Bij een nieuwe tegenstrijdigheid: eigenaarbevestiging/primair bewijs en publicatiebeleid eerst; registreer de uitzondering met rij-ID, reden en alternatief, wijzig geen status stilzwijgend. Deze batch voert alleen WP00–WP03 uit; WP04–WP17 hieronder zijn routing/voorwaarden, geen uitvoering.

## Waarborgen en specifieke taskcontracten

Alle WPs gebruiken W0/W1; de aanvullende codes staan per WP. W0 = bestaande domein/URLs/beeldidentiteit/WhatsApp/reviewpopup/contact en eigenaarbevestigde scope/24/7 bewaren; W1 = [publicatiebeleid](content-publishing-policy.md), feitenbron/datum, publicatiestaten en geen fictieve claim. W2 = primaire gewest-/modelbron en technische veiligheid. W3 = privacy, minimale geanonimiseerde referentie, ruwe exports/klantbewijs buiten Git. W4 = echte meting en ontvangst; inferred ≠ observed, lab ≠ field, submission ≠ indexing, klik ≠ opdracht. W5 = juiste eigenaar/property, GSC Wizard uitgesloten, geen secrets/nieuwe rechten/paid calls/extern bericht uit bronadvies. W6 = eerlijk verdiende vermeldingen, geen PBN/linkkoop/gating/fakepersona. W7 = exacte wijziging/release, proportionele regressie, onafhankelijke review, livecontrole en uitkomstlog bij echte implementatie.

| WP | Specifieke task/bestaande waarborg en veilige vervanging | Extra waarborg | Open/voorwaardelijke afhankelijkheid; acceptatie |
|---|---|---|---|
| WP00 | Bedrijfsbrief/bronbesluit/geschiedenis: nieuwe feiten primair gronden, metadata bewaren; marketingclaims krijgen geen baseline | W3, W4, W5 | Onbekende eigenaar-/historie-/prijsvelden expliciet onbekend. Klaar als elke rij een bronbesluit en task/guard/dependency heeft; geen alles-voltooidscore |
| WP01 | Telefoon/WhatsApp/mail/formulier/analytics → echte ontvangst → passende aanvraag → afgesproken opdracht; bestaande events gebruiken | W3, W4, W5, W7 | Werkelijk inbox-/dashboardbewijs en privé geaggregeerde uitkomsten; zonder ontvangst/toegang blijft operationele deeltaak open |
| WP02 | Juiste Abder-GSC-property, indexing/canonical/AI-instellingen, echte exports; native/handmatige officiële export vervangt GSC Wizard | W3, W4, W5 | Bevestigd account/property/rechten en filters/periode/limieten; gedateerde waarneming→actie→bevestiging, submission niet als opname |
| WP03 | Belgische concurrenten/echte SERP/vraagmatrix; Mehrab-tabel + vijf briefs/vijf quick wins; Sarvesh maximaal twintig gaps/briefs en vier koopreistabellen; Machina vierpassenaudit voor dezelfde URL/query | W2, W3, W4, W5 | WP02 echte exports plus actuele openbare SERP en WP01 uitkomsten waar beschikbaar; ontbrekende data/sample niet opvullen. Exacte bronpresets/velden blijven afzonderlijk |
| WP04 | Juiste GBP: categorie/attributes/diensten/beschrijving/reviews/reacties/posts/foto's/rankgrid; echte passende velden vervangen quota/keywordsturing | W3, W4, W5, W6 | Eigen profiel/current UI + waargenomen concurrent/sample + authenticiteit; concept/submit/approval/live apart. Geen profielmutatie in deze batch |
| WP05 | Citation/entiteit/KBO/Bing/Apple: geregistreerde zetel versus vestiging versus bezoek; correcte NAP vervangt storefront-/knowledgepanelgarantie | W3, W4, W5, W6 | Officiële bedrijfsfeiten, eigenaar operationele basis/bezoek en juiste platformtoegang. BF-F04–07 zijn bronbevindingen, geen correctie-uitkomst |
| WP06 | Bestaande moneyURL, sober klantantwoord, metadata/CTA/contextlinks; bestaande intentie-eigenaar verbeteren in plaats van dubbele keywordURL | W2, W4, W7 | WP03 intentie/querydata voor experiment, eigenaar echte kosten/scope voor nieuwe claims; elementeninventaris en passend review-/releasebewijs |
| WP07 | Merkscope en fabrikant/foutcatalogus met toestel, revisie, letter/punt/subcode; modelbron vervangt algemene codeclaim | W2, W4, W7 | Actuele officiële handleiding en exacte modelmatch; losse codeURL ook distinct vraag/waarde; erkenning/partnerschap afzonderlijk |
| WP08 | 304-geografieregister/districten: bediend gebied bewaren, elke eigen route nuttig beoordelen; centrale diensten/hubs vervangen stad×dienstfabriek | W2, W3, W4, W7 | Echte lokale vraag + operationele haalbaarheid + uniek klantnut + matching lokaal bewijs; draft/noindex blijven apart, boolean/geografie is geen werkbewijs |
| WP09 | Echte cases/media/auteurs: archiveigenaarbevestiging geldig; specifieke job/foto/plaats/merk/toestemming traceerbaar | W2, W3, W7 | Private werk-/rechten-/toestemmingsreferenties, exacte diagnose/model waar relevant; organisatieauteur en geanonimiseerde bevestigde werktypen als veilige bestaande variant |
| WP10 | Veilige advies-/vergelijkingsinhoud en echte zichtbare vragen; onderbouwd antwoord vervangt SaaS-template/woord-/FAQquota | W2, W4, W7 | WP03 dienst-/vraagfit, officiële actuele regels/modelbronnen en eigen toevoeging; geen automatische extra routes/DIY/rich-resultbelofte |
| WP11 | Onderhoudscheck behouden; mogelijke tweede gratis tool alleen bij klantnut, bron/formule/grenzen; volledige uitslag vóór contact | W2, W3, W4, W7 | Onderbouwde usecase, bron- en bruikbaarheidstest; geen registratiepoort, fictieve calculator, besparingsclaim of toolquotum |
| WP12 | HTML/crawl/canonical/robots/sitemap/schema/metadata/links/mobile/CWV/security/dependencies; bestaande Node 24 en Next-workflow behouden | W2, W4, W5, W7 | Exacte release/risicopassende tests en browser/livebewijs; veld-CWV afzonderlijk. Geen runtime-/CMS-/domeinwissel of alle-noindex-wissen |
| WP13 | Relevante verdiende mentions/linkprospects en concrete drafts; onafhankelijke redactie vervangt rankinglinkkoop/ruil/directorybulk | W3, W4, W5, W6 | Echte relatie/relevant gelezen bron; expliciete concrete outreachopdracht voor verzenden, apart budget/disclosure indien sponsoring; prospect is geen verdiende link |
| WP14 | Observeerbare social/video/AI-zichtbaarheid met prompt/engine/context/bronURL; nuttig authentiek kanaal vervangt fakepersona/quotum/citatiegarantie | W2, W3, W4, W5, W6 | Werkelijke bronobservatie, kanaalregels, echte stem/rechten/capaciteit en autorisatie voor posts; geen verborgen fan-outlogs of providerclaim verzinnen |
| WP15 | Onderhouden Franse equivalenten op bestaand Belgisch domein, taalwissel/hreflang/self-canonical en taal-QA | W2, W4, W7 | Bevestigde Franstalige operationele hulp + professionele onderhouden vertaling; Brussel of ccTLD is geen taalbewijs, geen automatische vertaling |
| WP16 | Optionele paid tools/API/ads/LSA: afzonderlijke noodzaak/budget/beschikbaarheid; officiële exports/native tooling als standaard alternatief | W3, W4, W5, W6 | Concrete budget-/accountbevoegdheid, huidige voorwaarden en conversieproof vóór kosten; bronpromotie/credits/trial koopt niets |
| WP17 | Bestaande opvolging, stabiele experimentbrief/state/log en vergelijkbare perioden; één zinvolle hypothese en echte uitkomst in plaats van quota/rankingdeadline | W3, W4, W5, W7 | Echte baseline/sample/blootstelling + verantwoordelijke/evaluatiedatum; geen dubbele automation uit bronprompt, fouten direct herstellen, technische winst apart |

## C/J/G: complete groep-defaults met gerichte overrides

Selector `group=…` gebruikt exact de laatste kolom van de gezaghebbende C/J/G-rij. Iedere rij heeft één van deze tien groepen. Alle defaults worden eerst toegepast; daarna vervangt één override de primaire WP. Getallen zijn suffixen binnen de genoemde familie; reeksen zijn inclusief. Overrides voegen geen publicatierecht toe en wijzigen nooit R/K/D.

| Familie | Selector | Primaire WP | Regel |
|---|---|---|---|
| CJG | group=DATA | WP03 | default |
| CJG | group=TECH | WP12 | default |
| CJG | group=INTENT | WP06 | default |
| CJG | group=CONTENT | WP10 | default |
| CJG | group=LOCAL | WP04 | default |
| CJG | group=LINKS | WP13 | default |
| CJG | group=GEO | WP14 | default |
| CJG | group=SOCIAL | WP14 | default |
| CJG | group=OPS | WP17 | default |
| CJG | group=SCOPE | WP00 | default |
| C | 003,065,212 | WP02 | override |
| C | 013,222 | WP01 | override |
| C | 011,025,036,044 | WP03 | override |
| C | 042-043,046,048,061,081,107,109,171 | WP06 | override |
| C | 021,071-072,112 | WP08 | override |
| C | 049,054-055,134-135 | WP09 | override |
| C | 050,053,133 | WP11 | override |
| C | 063,076-078 | WP15 | override |
| C | 098,123,127,223 | WP16 | override |
| C | 105-106,199 | WP05 | override |
| C | 001,010,038,215,218-219,224-226,232-233 | WP00 | override |
| C | 074,079,113,115,204,216 | WP00 | override |
| J | 014,027-029,032-034,036,055-056 | WP02 | override |
| J | 026,037-039 | WP16 | override |
| J | 030 | WP05 | override |
| J | 041-043,062,064 | WP03 | override |
| J | 044,046-047,051,069 | WP06 | override |
| J | 066-068 | WP09 | override |
| J | 078 | WP05 | override |
| J | 001,094 | WP00 | override |
| G | 012,046 | WP01 | override |
| G | 015 | WP11 | override |
| G | 018 | WP08 | override |
| G | 021 | WP02 | override |
| G | 038,048,051 | WP09 | override |
| G | 040 | WP05 | override |
| G | 026,034,058 | WP00 | override |

C-004/035/052/070 blijven onder WP10/publicatiebeleid zonder schaaldoel; C-080/234 en J-048/049 onder WP06 zonder automatische pruning; C-100 onder WP04 zonder reviewkeywordsturing. C-178/182, J-101 en alle overige linkkooprijen blijven afgewezen ondanks WP13-routing. Bronmarketing en ongeverifieerde numerieke claims blijven metadata waar de rij dat bepaalt, ook als de taakgroep DATA/LOCAL/GEO heet.

## S/M: onderwerpselectoren

Onderstaande selectors zijn een disjuncte volledige partitie; de groepskolom wordt niet mechanisch als opdracht gebruikt. Samengestelde rijvelden blijven allemaal acceptatieonderdelen. Voorbeelden S-059/S-106/S-110 zijn WP03-outputcontracten, geen automatisch uitgevoerde WP10-content.

| Familie | Selector | Primaire WP | Regel |
|---|---|---|---|
| S | 001-007,011-014,141-142 | WP00 | partition |
| S | 008,057-066,101-111,136 | WP03 | partition |
| S | 009-010,015-056,082-087,121-125,134-135 | WP04 | partition |
| S | 067-076 | WP08 | partition |
| S | 077-081,137 | WP06 | partition |
| S | 088-094 | WP13 | partition |
| S | 095-100,112-115,117-120,138-139 | WP05 | partition |
| S | 116 | WP12 | partition |
| S | 126-133,140 | WP17 | partition |
| M | 001,003,010-011,016,019,027,049,051,083,089 | WP00 | partition |
| M | 002,008,063-064 | WP01 | partition |
| M | 004,020,039-042 | WP02 | partition |
| M | 030-038,043,048,050,066,085 | WP03 | partition |
| M | 058 | WP05 | partition |
| M | 012-014,065,071,081,086 | WP06 | partition |
| M | 007 | WP12 | partition |
| M | 005-006,015,021-024,061,082,084 | WP16 | partition |
| M | 009,017-018,025-026,028-029,067-068,070,072-080,087-088 | WP17 | partition |
| M | 044-047,054,069 | WP12 | partition |
| M | 052-053,055-057,059-060,062 | WP14 | partition |

M-013 hoort bij WP06 met WP12 als downstream waarborg voor behoud van het bestaande platform; M-007 hoort bij WP12. M-083 bewaart bedrijfsbrief plus WP01-ontvangst/WP02-historie als afhankelijkheden; M-066/M-085 leiden naar het gezamenlijke WP03-vierpassenauditrapport, met WP12/WP06/WP14/WP01 als uitvoerders en WP17 als evaluatie.

## U: bestaande expliciete taskkoppeling

Voor **U-001–058** is de primaire koppeling exact de kolom **Pakket** in de inline-matrix; geen nieuwe selector of remapping nodig. Ieder vermeld WP krijgt zijn contract/waarborg/afhankelijkheid hierboven. Een meervoudig pakket houdt alle genoemde taakinterfaces. U-057 heeft geen afzonderlijke statuskolom: de beslissing zelf bewaart het expliciete bronmetadata-/marketingbesluit; dat is geen ontbrekende status of uitgevoerde taak.

## MP/PE: sectiepartitie

Deze selectors maken expliciet welke specifieke WP de resterende sectiecriteria bewaakt. Reeds bestaande code blijft bestaande waarborg; gedeeltelijke criteria blijven open. MP-110 bewaart alle 34 subcriteria met verwijzing naar de passende WP-contracten; MP-111 alle A–K-rapportpunten. Secties met meerdere onderwerpen behouden hun originele subcriteria en downstream-WPs.

| Familie | Selector | Primaire WP | Regel |
|---|---|---|---|
| MP | 001,008,071-072,090-092,110-112 | WP00 | partition |
| MP | 000,058-059,069,084 | WP01 | partition |
| MP | 045,060,098 | WP02 | partition |
| MP | 029,062 | WP03 | partition |
| MP | 039-040,043,052 | WP04 | partition |
| MP | 041-042,086,103-104 | WP05 | partition |
| MP | 004,010-012,026,030-031,046,057,064,070,073-078,088,100,106,108 | WP06 | partition |
| MP | 016-021 | WP07 | partition |
| MP | 002-003,013-015,063,099,102,105,107,109 | WP08 | partition |
| MP | 009,022-025,044,066-068,079 | WP09 | partition |
| MP | 005-007,047-048 | WP10 | partition |
| MP | 027-028,032-038,053-056,065,080-083,089,093-097,101 | WP12 | partition |
| MP | 050 | WP13 | partition |
| MP | 051,087 | WP14 | partition |
| MP | 049 | WP15 | partition |
| MP | 085 | WP16 | partition |
| MP | 061 | WP17 | partition |
| PE | 01-02,04-11,13-22,31-33 | WP08 | partition |
| PE | 23 | WP04 | partition |
| PE | 24 | WP03 | partition |
| PE | 03,25,30 | WP06 | partition |
| PE | 12 | WP15 | partition |
| PE | 26 | WP12 | partition |
| PE | 27-29 | WP09 | partition |
| PE | 34 | WP00 | partition |

PE-21 blijft WP08 (namen/links zonder keywordlijst); klantcopy/filteruitleg PE-03/25 en contextuele dienstlinks PE-30 hebben WP06 als primaire taak. PE-23 bewaart WP04-eigenprofieltoegang als afhankelijkheid, PE-24 WP03/WP04-prestatiemeting, PE-27/28 WP09-jobbewijs en PE-31 WP03-vraagprioriteit. MP-076 (airco) blijft onder WP06 bewust noindex met eigenaar-/F-gasbewijs als ingang voor enige scopewijziging; de bronrij verleent geen nieuw dienstrecht.

## Taskbriefminimum en handoff

Een volgende concrete taak vermeldt: bronrij-ID(s) en bronperiode; BF-feit/hypothese waar relevant; primaire WP en downstreaminterface; effectieve status/afwijsreden/veilig alternatief; exact deliverable en bestanden; bewijsafhankelijkheid en wat zonder die data wél kan; technische én inhoudelijke acceptatie; privacy/veiligheidsgrens; passende regressie-/review-/release-/livecontrole; evaluatiedatum en zakelijke uitkomst zonder fictieve baseline. Ontbrekende data sluit een voorbereid document af, niet de afhankelijk gemarkeerde operationele taak.

WP00 kan deze voorbereiding afronden ondanks onbekende tarieven, persoonlijke ervaring of echte opdrachtwaarden. WP01–WP03 behouden hun eigen echte ontvangst-, account- en export-/onderzoekgates. Geen accountmutatie, betaalde bron, outreach, projectclaim of WP04–WP17-implementatie volgt uit deze crosswalk.
