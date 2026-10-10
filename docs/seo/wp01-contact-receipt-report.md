# WP01 contactontvangst en meetstatus

Op 10 oktober 2026 is één herkenbare technische testaanvraag via de publieke website aanvaard, door Mailgun bezorgd en door de eigenaar in de zakelijke inbox bevestigd. De geharde contactcode heeft afzonderlijk de lokale desktop- en mobiele controles doorstaan. WP01 blijft open voor aantoonbare eventingestie en een commerciële uitkomstenbaseline; ontvangst van deze test bewijst geen klant, opdracht of omzet.

Dit is de actuele WP01-aanvulling op het [uitvoeringsplan](../superpowers/plans/2026-10-10-complete-source-seo-masterplan.md) en de [zoek- en leadbaseline van 10 oktober](2026-10-10-search-baseline.md). Eerdere releasewaarnemingen in de baseline behouden hun historische betekenis.

## Status per bewijsvereiste

| Vereiste | Waarneming op 10 oktober 2026 | Status |
| --- | --- | --- |
| Werkelijke e-mailontvangst | Eén productietest, providerbezorging en eigenaarbevestiging | Bewezen voor de beschreven test op `7a16cec` |
| Geharde contactflow | Node 24 tests, onafhankelijke review en lokale desktop- en mobiele browsercontrole | Lokaal gecontroleerd op de wijzigingen van `126e9ab` |
| Werkelijk ontvangen custom event | Hobby-dashboard toont geen toegankelijk eventbewijs en vraagt Pro | Open |
| Passende aanvragen, opdrachten en omzet | Geen historische klant- of opdrachtgegevens beschikbaar voor deze baseline | Open en onbekend, niet nul |

## Productietest en inboxontvangst

De enige echte contact-POST in deze ontvangstcontrole ging op **2026-10-10 om 17:45:54.712 UTC** naar de publieke website. De toenmalige productieversie was `7a16cec`; de contacthardening van `126e9ab` maakte nog geen deel uit van deze productietest. De API antwoordde HTTP 200 met `ok: true`; de pagina toonde het succesbericht met het voorbehoud dat een afspraak of timing rechtstreeks moet worden bevestigd.

De aanvraag gebruikte uitsluitend publieke bedrijfsgegevens: naam `AB Service WP01 website test`, telefoon `+32484906966`, e-mail `info@abservice24.be` en dienst `Andere vraag`. Het bericht droeg marker `AB-WP01-20261010-1747Z` en vermeldde duidelijk dat het een TEST was, zonder echte klantaanvraag, booking of offerte. De marker is een herkenningscode; het verzendtijdstip hierboven is de gemeten aanvraagtijd.

Het door de eigenaar geautoriseerde zakelijke Mailgun-dashboard, op het juiste EU-domein, toonde `accepted` om **17:45:54 UTC** en `delivered` om **17:45:55 UTC**. De ontvangende mailserver was `mx.zoho.eu`, met SMTP `250` en enhanced status `2.0.0`; TLS en certificaatcontrole stonden op true. De providerinterface toonde dezelfde gebeurtenissen als 13:45:54 en 13:45:55 in US/Eastern. Dit providerbewijs werd aangevuld met de meest recente expliciete eigenaarbevestiging van het gevraagde zakelijke bericht: **“Ja, ontvangen”**. Daarmee is inboxontvangst voor deze test bevestigd.

Deze ene steekproef hoort uitsluitend bij de technische ontvangstcontrole en wordt uitgesloten van echte lead-, opdracht- en omzetcijfers. Het ontvangstbewijs van de oudere productieversie is geen live-bevestiging van de geharde versie; de publicatie en daaropvolgende livecontrole moeten aan hun eigen exacte release worden gekoppeld.

## Controle van de geharde contactcode

De actuele lokale verificatie bevestigde **137 van 137 tests** onder werkelijke Node **24.19.0**, inclusief de contactregressies en de afzonderlijke GSC-tests. De eerdere onafhankelijke codereview vond geen belangrijke bevindingen. De lokale [browsercontrole](../../tests/contact-browser-qa.mjs) slaagde op desktop **1440 × 1000** en mobiel **390 × 844**.

De controles omvatten native POST zonder JavaScript, veilige servergerenderde success- en errorfeedback, schone redirect-URLs met uitsluitend een toegestane status en `#aanvraagformulier`, verplichte velden en privacyakkoord, foutfocus en pending-status. Twee gelijktijdige submitacties veroorzaakten één request tijdens pending. Ontbrekende of false `ok`, niet-JSON, HTTP-fout en netwerkfout leidden elk tot veilige failurefeedback, focus en een mogelijke bewuste retry. Fragmentvoorinvulling accepteerde echte kalenderdata inclusief schrikkeldagen; het formulieranker bleef onder de header zichtbaar, zonder horizontale overflow.

De [formuliertests](../../tests/contact-form.test.mjs), [API-tests](../../tests/contact-api.test.mjs), [validatietests](../../tests/contact-validation.test.mjs) en [contexttests](../../tests/contact-context.test.mjs) beschermen deze grenzen. De clientguard voorkomt gelijktijdige verzending vanuit de wachtende handler. Er is geen algemene serverdeduplicatie of garantie van precies één bezorging bij elke retry.

## Analytics en uitkomsten

Alle tien bestaande events blijven behouden: `phone_click`, `email_click`, `whatsapp_click`, `contact_form_start`, `contact_form_success`, `contact_form_failure`, `service_cta_click`, `google_profile_click`, `maintenance_check_complete` en `tool_enquiry_click`. Er is geen bookingfunctie en er zijn geen booking-start- of booking-complete-events toegevoegd. Een formulieraanvraag is geen bevestigde afspraak.

De [analyticscode](../../libs/analytics.mjs) beperkt eigenschappen tot toegestane contextwaarden en verwijdert URL-query en fragment; de [privacywrapper](../../components/privacy-analytics.js) past deze filter toe. [Regressietests](../../tests/analytics.test.mjs) bevestigen deze filters. De geteste eventuitvoer en de onderschepte, afgebroken QA-verzoeken bevatten geen naam, e-mail, telefoon, adres, berichtinhoud, onderhoudsdatum of ruwe query/hash als analyticsgegevens. Dit is bewijs van de geteste payloadgrenzen. Een SDK-call, HTTP 200 of afgebroken QA-request bewijst geen ontvangen dashboardevent.

Het werkelijke Vercel Hobby-dashboard toonde voor de voorafgaande 24 uur bij custom events “No custom events” en “Upgrade Pro to access”. Volgens de [officiële custom-eventdocumentatie](https://vercel.com/docs/analytics/custom-events) en [planvergelijking](https://vercel.com/docs/analytics/limits-and-pricing) zijn custom events beschikbaar op Pro en Enterprise, niet Hobby. Er is geen betaalde upgrade of proefperiode geautoriseerd. Eventingestie blijft daarom **open**; deze observatie wordt niet omgezet in een bewezen eventaantal van nul.

Voor echte aanvragen ontbreekt een gedocumenteerde periode en steekproef met dienst, gebied, bereikbaarheid, passend/niet-passend en afgesproken opdracht. Ook werkelijke omzet is niet beschikbaar. Deze waarden blijven onbekend. Een eerste commerciële baseline vraagt geanonimiseerde interne uitkomstregistratie, afzonderlijk van technische testaanvragen; klantidentiteiten en echte exports blijven buiten publieke assets en Git.

## Privacy en bewaartermijnen

Het [huidige privacybeleid](../../app/privacy-policy/page.js) beschrijft contactverwerking, Mailgun, Vercel en Google en waarschuwt tegen gevoelige vrije tekst. Het contactakkoord en de geteste gegevensfilters bewijzen niet dat alle privacyverplichtingen zijn afgedekt; ook een ontbrekende cookie is daarvoor geen bewijs.

In het actuele Mailgun-account werd **één dag logretentie** waargenomen. Dit is een accountinstelling op het controlemoment, geen bevestiging van de bewaartermijn van de zakelijke inbox of alle leveranciersgegevens. De feitelijke zakelijke bewaar- en verwijderpraktijk en de toepasselijke leveranciers-DPA's zijn nog niet vastgesteld. WP01 mag daarom niet als volledig afgerond of algemeen privacyconform worden aangeduid.
