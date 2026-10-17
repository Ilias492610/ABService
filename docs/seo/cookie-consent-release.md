# Cookieconsent voor AB Service

De eigen cookievoorziening is lokaal geïmplementeerd en geverifieerd. Publicatie
wacht nog op de controles van de exacte commit,
hosted CI, bestaande Vercel-productiedeployment en livewerking.

## Keuzes en behoud van functies

NL, FR en EN bieden gelijkwaardige knoppen voor statistieken toestaan en alleen
noodzakelijk. Google-auteurfoto’s hebben een afzonderlijke optionele keuze.
Instellingen zijn bereikbaar via de footer en de privacytekst. Beide keuzes
kunnen worden ingetrokken. Contact, telefoon, WhatsApp, hulpmiddelen, officiële
reviewteksten, score, auteursnaam, bron- en meldlinks blijven beschikbaar.

De hostgebonden cookie `ab_service_consent` bevat alleen versie, keuzetijd en twee
booleans. Hij gebruikt `/`, `SameSite=Lax`, `Secure` en maximaal 180 dagen.
Ontbrekende, dubbele, ongeldige, verlopen of onleesbare waarden geven geen
toestemming. Een mislukte opslag kan een oude opt-in niet opnieuw activeren in
het huidige document; de foutmelding bevestigt geen permanente opslag.

Alle directe events en de SDK-callback lezen de actuele keuze. De geladen SDK
blijft na intrekken aanwezig, maar start bij de geteste nieuwe acties geen
aanvragen of opslagtoegang. Alleen het bekende attributieveld wordt verwijderd.
Eerder gestarte transacties en ontvangen gegevens zijn niet terug te nemen.

## Browserbewijs

De lokale productiebuild gebruikte de echte SDK met afwijkende intakepaden.
Een uitsluitend op loopback bereikbare testproxy hield de intake lokaal en
registreerde echte netwerk- en opslagacties. Herkenbaar synthetische Places-data
leverden één auteurfoto van een eigen openbaar icoon; geen Google API-aanroep of
echte klantgegevens. De testinfrastructuur wordt niet door de app geïmporteerd.

De actuele openbare SDK had SHA-256
`050e35bf7e6e96590f2a9de114c14ff792806ed28457b3248762944350c0ba4c`.
De positieve controle bewijst dat de runtime werkelijk draaide: een toegestane
paginaweergave en onderhoudsactie bereikten zowel het view- als eventpad.
De volgende aantallen zijn cumulatief binnen dezelfde proef.

| Toestand | SDK-opslagacties | Analyticsaanvragen | Lokale intake | Fotoloads |
| --- | ---: | ---: | ---: | ---: |
| Geen keuze, weigeren en hulpmiddel gebruiken | 0 | 0 | 0 | 0 |
| Alleen foto’s | 0 | 0 | 0 | 1 |
| Alleen statistieken en daarna hulpmiddel | 3 | 3 | 3 | 1 |
| Beide keuzes, vóór intrekken | 4 | 4 | 4 | 2 |
| Na intrekken, nieuwe route en hulpmiddel | 4 | 4 | 4 | 2 |
| Oude opt-in vóór geblokkeerde opslag | 5 | 5 | 5 | 2 |
| Mislukte opslag, nieuwe route en formuliervalidatie | 5 | 5 | 5 | 2 |
| Vóór en na leesfout met nieuwe route en hulpmiddel | 6 → 6 | 6 → 6 | 6 → 6 | 2 → 2 |
| Vóór en na echt timerverval met hulpmiddel | 7 → 7 | 7 → 7 | 7 → 7 | 2 → 2 |
| Vóór en na voorkeurwijziging met gecontroleerd focus-event | 8 → 8 | 8 → 8 | 8 → 8 | 2 → 2 |

Vijf expliciete verwijderingen van het attributieveld zijn apart van SDK-toegang
geregistreerd. Er waren geen externe SDK-aanvragen of proxyfouten. Eén extra
HTTP-aanvraag bewaarde de SDK-bron voor controle; die is geen browserconsentload.
De tabterugkeerproef gebruikt een gecontroleerd host-event, geen claim over een
volledige OS-achtergrondcyclus. Ook native HTTP/SSR en een echte JS-uit-browserproef
blijven verschillende bewijzen.

320, 390 en 1280 px, native dialoog, Enter, Space, Escape, terugkeerfocus en behoud
van ingevulde formuliertekst zijn gecontroleerd. Geen horizontale overflow;
de banner staat in de gewone documentstroom en zwevende knoppen blijven vrij.
Eén lokale geïnstrumenteerde nieuwe-paginameting duurde 480,5 ms en registreerde
0,02395 layoutverschuiving vóór viewportwijzigingen. Dit is geen veldmeting of
verbeteringsclaim tegenover een niet gemeten uitgangssituatie.

## Technische controles en publicatiegrenzen

Eén onafhankelijke hele-releasebeoordeling vond één belangrijke inconsistentie:
een mislukte opslag kon na een geslaagde keuze via een andere knop nog als fout
worden aangekondigd. Root herstelde dit met twee eerst falende regressies voor
beide richtingen, meerdere foto's en later verval. Alle dertien afgezonderde
reviewgrenzen afzonderlijk beoordeeld; geen tweede review of ruimere bewijsclaim.

Node24: 833 tests, lint 0, productieaudit 0, gewone build 178 uitvoerpunten,
technische crawl 86 pagina’s / 97 interne links / 117 assets en taalaudit
6 equivalenten / 2 groepen / 5 noindex404s. De bestaande metadataBase-waarschuwingen
blijven zichtbaar. De verse volledige audit blijft 9 ontwikkelrecords
(7 hoog, 2 matig), twee unieke advisories. Geen veilige compatibele patch,
forcefix, major-migratie, package- of lockwijziging uitgevoerd.

Alle 137 oorspronkelijke meesterplancheckboxes, vier integrale bronbijlagen,
oudere fixtures en de vijf Task2-broncaptures zijn behouden. Exacte nieuwe
inverses gelden alleen op historische vergelijkingen; huidige gedragscontroles
voeren de echte productiecode uit. Onbekende bron-, HTML-, data- en datumafwijkingen
blijven zichtbaar.

Alleen de drie privacyteksten hebben inhoudelijk nieuwe cookie-informatie en
zichtbaar 17 oktober als beleidsdatum. Alleen de Nederlandse registrydatum
verandert van 13 naar 17 oktober; FR/EN stonden daar al op 17 oktober. Geen nieuwe
URLs, prijs-, erkennings-, case- of lokale claims. De algemene JS-uit-, menselijke
vakman-/juridische review-, account-, meet- en eigenaar-uitgestelde gates sluiten
niet door deze release. Geen nieuwe IndexNow-melding in deze lokale fase.

## Bronnen en controlebestanden

Het [goedgekeurde ontwerp](../superpowers/specs/2026-10-17-cookie-consent-design.md)
en [uitvoeringsplan](../superpowers/plans/2026-10-17-cookie-consent.md) bepalen de
scope. [GBA](https://www.gegevensbeschermingsautoriteit.be/burger/thema-s/internet/cookies),
[Vercel](https://vercel.com/docs/analytics/package) en
[Google Places](https://developers.google.com/maps/documentation/places/web-service/policies)
zijn de primaire beleids- en productbronnen. Geen algemene juridische
conformiteitsverklaring.

De bewaarde uitvoeringsledger staat onder
`.superpowers/sdd/2026-10-17-cookie-consent/`: RED/GREEN-logs, gewone en fixturebuild,
17 checkpoints, onderliggende observaties, actuele SDK-bron/hash, screenshots en
`check-evidence.mjs`. Die laatste verifieert de positieve controle, alle vijf
intrekkings-/fout-/vervalparen en de historische behoudsgrenzen opnieuw.
