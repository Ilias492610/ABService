# Contact en privacy in Frans en Engels

## Doel en gekozen eerste release

De eigenaar heeft op 17 oktober 2026 Franse en Engelse webinhoud gevraagd,
Engelse opvolging bevestigd en gekozen voor eerst contact en privacy. Franse
dienstverlening was al bevestigd. De eerste release maakt deze twee functies
volledig bruikbaar in de drie talen, met behoud van alle bestaande Nederlandse
URLs, diensten, tools, formulieren, telefoonkoppelingen en wettelijke gegevens.
Dit is niet de vertaling van de hele website of een bewijs van een geteste
Franse/Engelse aanvraagafhandeling. De eigenaar heeft dit geschreven ontwerp op
17 oktober 2026 goedgekeurd; het afgebakende implementatieplan volgt afzonderlijk.

## Routes en taalkeuze

| Functie | Nederlands | Français | English |
| --- | --- | --- | --- |
| Contact | `/contact` | `/fr/contact` | `/en/contact` |
| Privacy | `/privacy-policy` | `/fr/confidentialite` | `/en/privacy` |

Elke rij is één groep inhoudelijk equivalente pagina's. De taalwissel gebruikt
echte links en Nederlands, Français en English als namen. Op deze zes pagina's
blijft de bezoeker binnen dezelfde functie. Andere Nederlandse detailpagina's
krijgen uitsluitend een duidelijk benoemde Franse/Engelse contactingang, geen
knop die een niet-bestaande vertaling belooft. Er komt geen automatische
taal-/IP-doorverwijzing, `/nl`-migratie, `/fr`-/`/en`-homeclone of nieuwe gemeente-URL.
Niet ondersteunde taal-/paginapaden geven de gewone 404.

## Technische keuze

De huidige rootlayout zet documenttaal en volledige shell vast op Nederlands.
Een geneste Franse layout kan dat HTML-element niet vervangen. De aanbevolen
ondersteunde Next.js-oplossing is meerdere rootlayouts: bestaande Nederlandse
paginaroutes verhuizen URL-neutraal naar `app/(nl)/`; Franse en Engelse roots
krijgen server-gerenderde `lang="fr-BE"` en `lang="en-BE"`. De bestaande Nederlandse
root blijft `nl-BE`. Metadata-/API-/afbeeldingsroutes worden afzonderlijk behouden
en getest, niet blind mee verplaatst. Taalwisseling tussen roots mag een volledige
pagina laden; niet-verzonden formuliertekst hoeft daarbij niet bewaard te blijven.

Een requestheader/Proxy-oplossing zou minder bronpaden verplaatsen maar alle
rootpagina's request-time dynamisch maken. Dat is hier niet de voorkeursroute.
Alle bestaande bronbytes blijven na hun expliciete pad-/CSS-importaanpassing
controleerbaar. Historische testfixtures en hashes worden niet opnieuw vastgesteld
om een migratiefout te verbergen. Er komt geen nieuwe i18n-afhankelijkheid.

## Inhoud en contactgedrag

De contactpagina's behouden dezelfde betekenis en beperkingen: eerst beoordeling,
geen prijs-/afspraakbevestiging uit een submit, geen aankomstgarantie, onafhankelijke
merkservice en geen klantontvangst op het juridisch adres. Navigatie, skiplink,
footer, zwevende bediening, WhatsApp-begroeting, formuliervelden, optionele labels,
validatie, statusmeldingen en toestemmingsinformatie worden bewust vertaald.
Links naar nog Nederlandse technische pagina's worden als Nederlandstalig benoemd.

Een vaste dictionary en expliciete equivalentiegroepen leveren de vertalingen.
Ontbrekende verplichte vertaalsleutels blokkeren de controle; geen stille Nederlandse
fallback die een vertaling volledig doet lijken. Technische fabrikantnamen,
modelnummers, foutcodes en bestaande dienstwaarden veranderen niet. Er worden
geen technische reparatie-instructies of nieuwe juridische termijnen toegevoegd.

Het bestaande contactcontract blijft intact: veldnamen, lengtegrenzen, anti-spam,
toestemming, verzendvergrendeling, focus en handoff van de Nederlandse tools.
Vertaalde keuzelabels houden de bestaande machinewaarden. Alleen een vaste
taalallowlist wordt toegevoegd. Zowel JSON als native POST gebruiken passende
meldingen; 303-terugkeer kiest uitsluitend een vaste lokale contactroute, nooit
een meegestuurde willekeurige redirect. De interne mail kan de gekozen taal
vermelden; ontvanger, credentials en bezorgdienst wijzigen niet.

## Privacy en zoekmachinegegevens

De privacyvertalingen behouden de daadwerkelijk beschreven systemen en grenzen:
Mailgun, Vercel, Google Places, lokale tools en nog onbevestigde analyticsontvangst.
Een nieuw bewaarvoorstel wordt niet als ingevoerde praktijk vertaald. Contactfoto's
worden niet automatisch publicatiemateriaal. Deze release is geen juridische
conformiteitsverklaring of vervanging van de echte operationele bewaartermijn.

Elke gepubliceerde pagina krijgt één H1, eigen canonical, taalmetadata en passende
schema-/breadcrumbtaal. Alleen de bovenstaande gepubliceerde equivalenten krijgen
wederkerige, absolute `nl-BE`/`fr-BE`/`en-BE`-hreflanglinks inclusief zichzelf.
Er is geen universele homepage-tegenhanger of taalvermelding naar een draft.
Registry, sitemap, inventory, bewijsregister en changelog volgen dezelfde status.

## Kwaliteit en publicatiebesluit

De auteur en onafhankelijke reviewer controleren vertaling en functionele betekenis;
dit wordt als AI-ondersteunde controle geregistreerd, niet als een verzonnen
professionele menselijke taal- of vakmanreview. Een beschikbare menselijke reviewer
kan afzonderlijk worden toegevoegd. De technische adviesgidsen blijven Nederlands
en hun bestaande publicatie-/vakmanreviewgates veranderen niet. WP15 als geheel
blijft open voor onderhoud, echte taalafhandeling en de bredere reviewdekking.

Het expliciete eigenaarbesluit over dit ontwerp is vastgelegd. Vóór de route-/
formulierimplementatie volgt review van het afgebakende implementatieplan. Daarna
volgen de implementatietaken en één onafhankelijke gehele review;
geen externe accountactie, echte testmail, campagne, betaalde API of nieuwe grant.

Acceptatie vereist:

1. Correcte taal in het eerste HTML-antwoord en een complete vertaalde shell.
2. Ongewijzigde Nederlandse URLs, statussen, inhoud, tools, contactcontract en
   bestaande sitemapwaarden; geen onbedoelde dynamische rendering.
3. Werkende equivalentiewissel, native formulierroute en toegankelijke fout-/
   succesmeldingen in elke taal; vaste taalallowlist en veilige redirects.
4. Letterlijk behoud van operationele/privacybetekenis en geen nieuwe claims,
   erkenningen, prijzen, echte cases of bewaartermijnen.
5. Node24-tests, lint, build, productieaudit, technische crawl en proportionele
   mobiele/desktop-/toetsenbord-/no-JS-checks plus echte onbekende-routechecks.
6. Alleen na deze gates de bestaande publicatiestroom naar main/Vercel met exact
   SHA, hosted CI, provider Ready/Production/domein en livecontrole. IndexNow is
   een afzonderlijk besluit voor werkelijk nieuwe, gecontroleerde gepubliceerde URLs.

## Geraadpleegde technische basis

De geïnstalleerde Next16.3.8-gidsen voor internationalization, route groups,
rootlayouts en headers bepalen de implementatie-API. Google's
[meertalige sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
en [gelokaliseerde versies](https://developers.google.com/search/docs/specialty/international/localized-versions)
onderbouwen afzonderlijke URLs, zichtbare taal en equivalente wederkerige links;
ze geven geen rankinggarantie. Het bestaande meesterplan, publicatiebeleid en
contact-/privacycontract blijven de inhoudelijke grenzen.
