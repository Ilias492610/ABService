# Klantwaarde van bestaande gebieden en districten

Beoordeling 11 oktober 2026 van de acht bestaande published districtpagina's en
zes gebiedshubs op release6b1f5a6. De provincie-/gewesthubs helpen bezoekers hun
gemeente en vervolgdienst te vinden. Borsbeek beantwoordt daarnaast een concrete
vraag over de districtsovergang. Op de overige districten is de praktische nadruk
verschillend, maar veel voorbereiding is ook buiten dat district nuttig.

Deze redactionele beoordeling is geen eigenaargoedkeuring, nieuwe zoekdata,
doorwayclassificatie of bewijs van rankingproblemen. Geen indexstatus verandert.
De eerdere zeven noindex-aanbevelingen zijn niet overgenomen. Het
[publicatiebeleid](content-publishing-policy.md) blijft van toepassing.

## Wat de gepubliceerde inhoud werkelijk ondersteunt

De eigenaar bevestigt brede dienstverlening in Vlaanderen en Brussel. Officiële
geografie ondersteunt namen en gebiedsindeling, niet plaatselijke woningtypen,
leidingverloop, technische ervaring of uitgevoerde opdrachten. Alle zes huidige
cases hebben alleen de brede regio Antwerpen, zonder district, specifieke
gemeentematch of goedgekeurde reviewtekst. Alleen de Antwerpse provinciehub
toont die zes brede cases; de andere hubs tonen aanvraagvoorbereiding.

De districttemplate rendert intro, lokale context, voorbereiding en twee FAQs,
naast bestaande dienst-/tarief-/nabijheidslinks en contact. De regionale template
rendert `regionalCopy`, `hub.planningTip`, plaats-/gemeentelijsten en gegenereerde
praktische vragen. `hub.details` en `hub.faq` verschijnen niet in die hubbody;
`hub.summary` verschijnt wel op de bovenliggende werkgebiedcards. Een ongebruikte
tekst is daarom niet als zichtbaar paginaprobleem beoordeeld.

## Bestaande bestemmingen en hun bruikbare onderscheid

Bronnen bij deze peildatum: `content/service-areas.mjs` per benoemd district/hub,
`components/district-page.js`, `app/werkgebied/[regio]/page.js` en
`content/projects.mjs`. Alle bestemmingen behouden hun bestaande contact- en
dienstlinks; deze inhoudsreview voert geen nieuwe browsertest uit.

| Bestaande bestemming | Concrete bruikbare inhoud en volgende stap | Resterende inhoudelijke grens |
|---|---|---|
| `/loodgieter-berchem` | Individuele/gedeelde installatie, technische toegang, verdieping/lift/parking. Bewoner kan vooraf nagaan wie toegang geeft en dat bij de bestaande aanvraag melden. | Sterke overlap met Merksem/Vlaams-Brabant en algemeen appartementenadvies; buurtnamen bewijzen geen technische lokale kennis. |
| `/loodgieter-borgerhout` | Overzicht/typeplaat/zichtbare code/aansluiting veilig fotograferen zonder panelen te openen; gedeelde hoofdkraan/toegang melden. | Intro verbindt lokale geografie met compacte gebouwen. Dat is een vermijdbare suggestie; de gecorrigeerde context zelf maakt die gevolgtrekking niet meer. Geen lokale casematch. |
| `/loodgieter-borsbeek` | Specifieke districtsovergang vanaf1januari2025 en blijvend bevestigd werkgebied; locatie/vraag indienen zonder automatische afspraak. | Overgang herhaalt zich in intro/context/FAQ; administratief onderscheid bewijst geen lokaal werk of bijzondere technische kennis. |
| `/loodgieter-deurne` | Merk/model/code/zichtbare druk en uitval van verwarming versus warm water beschrijven; passende herstelvraag indienen. | Nuttigste details zitten in FAQ en herhalen centrale herstellingsintake; districtgrootte bewijst geen installatieverschil. |
| `/loodgieter-ekeren` | Sanitair overzicht/detailbeelden, aansluitingen/afvoer/schade en maten bij vervanging; passende sanitaire aanvraag. | Vervangingschecklist is algemeen toepasbaar en vooral in FAQ uitgewerkt. Geen specifiek lokale vraag/klus geregistreerd. |
| `/loodgieter-hoboken` | Waarom één foto scope/prijs niet altijd bepaalt: materiaal, routing, toegang en vervolgdiagnose; tariefuitleg en meerdere beelden. | Duidelijke offertevoorbereiding, maar ook bruikbaar op centrale tarieven/sanitair; geen numerieke lokale prijsregel. |
| `/loodgieter-merksem` | Gedeelde tellers/ruimtes/afsluiters en eventueel syndicus/gebouwbeheerder; bekende toegangsafspraken melden. | Dicht bij Berchem; conditioneel advies bewijst geen Merksems gebouwenbestand of afzonderlijke lokale behoefte. |
| `/loodgieter-wilrijk` | Productgegevens/maten/bestaande aansluitingen/gewenst resultaat voorbereiden; sanitair/gasketel/tariefinformatie kiezen. | Algemene installatie-/offertescope; geen specifieke lokale opdracht of onvoorwaardelijke rookgas-/renovatiebelofte afleiden. |
| `/werkgebied/antwerpen` |67gemeenten controleren; provincie, stad en tien districten onderscheiden; bestaande district/home-/dienstbestemming en zes regionale voorbeelden vinden. | Regionale voorbeelden bewijzen niet elk vermeld district of elke gemeente. Praktische navigatiewaarde is geen bewezen queryscheiding. |
| `/werkgebied/limburg` |38gemeenten controleren en adres/toestel/toegang voor werk/verplaatsing melden. De volledige gemeentelijst is een eigen directorypayload. | Zichtbare planningtip veronderstelt langere verplaatsing en vermijding van onvolledige afspraken zonder concreet adres; conditioneler formuleren. |
| `/werkgebied/oost-vlaanderen` |55gemeenten controleren; constante versus cyclusgebonden klacht omschrijven en passende dienst kiezen. | Symptoomtiming is algemeen nuttig; eigen waarde vooral gemeentelijst/oriëntatie. Geen regionale casematch. |
| `/werkgebied/vlaams-brabant` |63gemeenten controleren; toegang/parking/gedeelde technische ruimte voor een aanvraag afstemmen. | Appartementadvies overlapt Berchem/Merksem/Brussel; geen regionale gebouwverdeling afleiden. |
| `/werkgebied/west-vlaanderen` |62gemeenten controleren; betrokken toestel/leiding en reeds bekende waarneming beschrijven, daarna dienst/verplaatsing bespreken. | Algemene voorbereiding naast eigen lijst; vraag naar eerdere waarneming mag geen onveilige controle-opdracht worden. |
| `/werkgebied/brussel` |19gemeenten en installatiegewest onderscheiden; documenten/toegang voorbereiden en de bestaande regionale onderhoudscheck vinden. | EPB-signaal kan een directere vervolglink gebruiken. Geen extra interval, erkenning of Franstalige dienst uit dit signaal afleiden. |

## Drie begrensde verbetermogelijkheden

1. Borgerhout: maak het gebouwtype voorwaardelijk in de intro, zonder uit
   intra/extra-muros een technische gebouwenclaim af te leiden. Behoud de bestaande
   veilige fotografie en toegangscheck.
2. Limburg: vraag concrete adres-/toestel-/toegangsgegevens voordat verplaatsing
   en werkzaamheden worden bevestigd, zonder langere reistijd of voorkomen van
   onvolledige afspraken te beloven.
3. Brussel: verbind het bestaande regionale regelsignaal direct aan
   `/tools/onderhoudscheck`, zonder nieuwe juridische uitleg. De bestemming staat
   al in de dienstkaart en ondersteunt Vlaanderen/Brussel.

Dit zijn voorstellen, niet reeds geïmplementeerde productwijzigingen. Ze vragen
hun eigen bounded tests/review/release en echte wijzigingsdatums. Een tekstverbetering
maakt generiek advies niet tot bewijs van lokale opdrachten of unieke expertise.

**Latere implementatiestand 11 oktober:** alleen voorstel 2 is lokaal uitgevoerd
in kandidaat `c506f47`. De daadwerkelijke gedeelde Limburg-planningtip vraagt nu
adres, probleem, eventuele toestelgegevens, veilige foto's zonder panelen te
openen en toegang; werk/verplaatsing worden vóór afspraakbevestiging besproken.
Geen langere reistijd of gegarandeerd voorbereidingseffect. Alleen Limburg
krijgt de werkelijke inhoudsdatum; de registry geeft die conditioneel door.
Vijf echte record-/renderer-/metadata-/sitemaptests en behoud van alle zes hubs
slagen; oorspronkelijke sitemapbehoudhash is niet vernieuwd. Onafhankelijke
cohortreview en exacte productieacceptatie zijn nog volgende gates. Voorstellen
1 en 3 blijven open. Dit wijzigt geen lokale publicatiestatus of bewijsacceptatie.

## Betekenis voor de open lokale acceptatie

De zes hubs hebben een concreet coverage-/navigatiedoel met verschillende lijsten;
Borsbeek heeft een eigen administratieve vraag. De andere zeven districten tonen
verschillende praktische nadruk en bevestigde dekking, maar nog geen sterk
gedocumenteerde plaatsgebonden vraag, case of review. Werkelijke klantwaarde en
zoekintentie vragen verdere inhoudelijke/eigenaarbeoordeling en passende data.

Similariteit alleen bewijst geen schadelijke duplicatie of Google-cannibalisatie.
Deze review certificeert daarom niet alle lokale pagina's als genuine, alle
inhoud als hoogwaardig of de afwezigheid van doorways. M11006/21/22/23 en de
WP08-publicatiegate blijven begrensd zoals in de [34-puntenmatrix](2026-10-11-masterprompt-acceptance-34.md).
Geen nieuwe bestemmingen, scores, sourcechecks, cases, publicatiestaten of
bedrijfsfeiten zijn uit deze beoordeling toegevoegd.
