# Cookieconsent voor AB Service

## Doel en gekozen richting

Bezoekers krijgen in het Nederlands, Frans en Engels een echte keuze voordat
optionele statistieken of externe Google-auteurfoto's actief worden. Contact,
telefoon, WhatsApp, hulpmiddelen, de officiële reviewteksten en score blijven
zonder toestemming beschikbaar. Er komen geen advertenties, betaald platform,
nieuwe accounts of extra analyseproducten bij.

De eigenaar keurde op 17 oktober de eigen gratis voorziening, standaard uitgeschakelde
analytics, een gelijkwaardige weigermogelijkheid, een keuze van maximaal zes maanden
en heropenen/intrekken via de footer goed. Dit ontwerp concretiseert dat besluit.
De aparte keuze voor externe auteurfoto's voorkomt dat statistiekentoestemming
ook toestemming voor een ander doel wordt. Het ontwerp wordt vóór implementatie
aan de eigenaar voorgelegd.

## Bezoekerskeuze

Een niet-modale banner biedt op dezelfde laag even opvallende knoppen voor
statistieken toestaan en alleen noodzakelijk, plus instellingen en een link naar
het privacybeleid. De statistiekenknop schakelt alleen statistieken in; externe
auteurfoto's blijven uit totdat de bezoeker daar afzonderlijk voor kiest.
Geen vooraf aangevinkte optionele keuze, cookiewall, toestemming door scrollen,
banner sluiten of acceptatie van het contactformulier.

Instellingen bevatten twee afzonderlijke optionele doelen: Vercel-statistieken
en externe Google-auteurfoto's. Elke optie kan afzonderlijk worden opgeslagen.
Alleen noodzakelijk zet beide uit. De footer opent steeds opnieuw dezelfde
instellingen; daar kan de bezoeker ook beide toestemmingen met één actie intrekken.
Een knop bij de auteursafbeeldingen kan uitsluitend de fotokeuze inschakelen.

De banner steelt bij het laden geen focus. Het instellingendialoog gebruikt
native modale bediening, een naam, zichtbare focus, Escape en terugkeer naar de
aanroepende link. Sluiten wijzigt de bestaande keuze niet. Op smalle schermen
blijven alle acties bereikbaar; de banner mag de vaste contactknoppen, invoer en
foutfocus niet bedekken. De bestaande afscherming van zwevende bediening wordt
uitgebreid voor het zichtbare consentvenster.

## Bewaren van de voorkeur

Eén noodzakelijke, hostgebonden voorkeurscookie onthoudt alleen versienummer,
keuzetijd en de twee toestemmingswaarden. Geen identificatienummer of klantgegevens.
Naam: `ab_service_consent`; pad `/`; `SameSite=Lax`; `Secure`; maximaal 180 dagen.
De browser krijgt een echte vervaltijd, geen onbeperkte localStorage-bewaring.
Een ongeldige, ontbrekende, verlopen of niet leesbare voorkeur betekent beide uit.
Bij een gewijzigde toestemmingsversie wordt opnieuw gevraagd.

Na opslaan wordt gecontroleerd of de browser de keuze werkelijk kon bewaren.
Mislukt dat, dan blijft alles optioneel uit en volgt een begrijpelijke melding.
Bij terugkeer naar een tab wordt de voorkeur opnieuw gelezen. Iedere meetaanroep
controleert daarnaast de actuele geldige voorkeur, niet alleen React-status.
Dit staat los van de nog onbevestigde bewaartermijn van echte klantaanvragen.

## Analytics en intrekken

De bestaande Vercel-component wordt alleen na statistiekentoestemming gemount.
Alle directe `track`-aanroepen in links, formulier en hulpmiddelen gaan door één
toestemmingspoort. Afgewezen acties worden weggegooid en later niet ingehaald.
De bestaande lijst toegestane events, vaste contextwaarden en URL-sanitatie blijven.
Formulierinhoud, meterstanden en onderhoudsdatums blijven buiten events.

Een actuele voorkeurcontrole wordt ook vóór de bestaande `beforeSend`-sanitatie
uitgevoerd. Intrekken sluit onmiddellijk beide toegangspunten en ontkoppelt de
React-component. De SDK heeft geen gedocumenteerde stopfunctie en het verwijderen
van zijn component verwijdert het geladen script niet. Daarom is het criterium
dat vanaf intrekken geen nieuwe meetactie of opslagtoegang wordt gestart, niet
dat eerder uitgevoerde code of verzonden gegevens ongedaan worden gemaakt.
Een al gestarte netwerktransactie kan niet achteraf worden teruggenomen.
Het bekende lokale SDK-attributieveld wordt bij intrekken verwijderd; geen andere
browsergegevens worden gewist. De site roept geen identify, group of enableCookie aan.

De Next-integratie behoudt de officiële configuratie, inclusief eventuele
dynamische Vercel-intakepaden. Testen mogen dus niet alleen op een vaste URL filteren.
De privacyteksten blijven onderscheid maken tussen configuratie, netwerkverkeer
en niet bewezen ontvangst van custom events in de rapportage.

## Google en behoud van functies

Server-side Places-opvragingen, officiële teksten, score, auteursnaam,
bron-/meldlinks en Google Maps-attributie blijven intact. De browser laadt
externe auteurfoto's pas na de eigen fototoestemming. Tot dan verschijnt de
bestaande initialenweergave met uitleg en de fotoknop. Geen externe afbeeldings-URL
in `src`, `srcset` of preload vóór toestemming; het doorgeven als data is geen
laadverzoek. Intrekken verbergt de foto's weer en verhindert nieuwe aanvragen.
Reeds ontvangen beeldbytes of Google-opslag kunnen niet op afstand worden gewist.
Geen nieuwe Google-cache of proxy, geen wijziging aan API-rechten of budget.

Eigen foto's, het WhatsApp-logo en de overige zakelijke functies veranderen niet.
Uitgaande Google- en WhatsApp-links blijven gewone links; bezoek aan hun site
valt onder hun eigen voorwaarden. Hosting- en beveiligingsverkeer wordt niet als
optionele statistiek gepresenteerd.

## Grenzen en verificatie

De bestaande Nederlandse URLs blijven gelijk. NL/FR/EN krijgen equivalente
consentbediening en bijgewerkte privacy-informatie over de feitelijke uitvoering,
cookielevensduur en ontvangers. Geen algemene juridische conformiteitsgarantie.
Zonder JavaScript laden analytics en externe auteurfoto's niet; de site en native
contactroute blijven beschikbaar, met een leesbare privacyverwijzing.

Verplicht vóór publicatie: echte RED/GREEN-regressies; ongewijzigde teksten en
functies buiten de benoemde privacywijzigingen; Node24-suite, lint, build,
productieaudit en technische crawl; echte mobiele/desktop- en toetsenbordproeven;
netwerk- en opslagcontrole vóór keuze, na weigeren, per losse toestemming, na
intrekken, na verval en bij geblokkeerde opslag. Google-photofixtures bewijzen de
bediening, niet dat de productieprovider altijd losse reviews levert.

Eén onafhankelijke volledige review, gevolgd door exacte main-SHA, hosted CI,
bestaande Vercel-productiedeployment en livecontrole. Een push is geen deployment-
of indexeringsbewijs. Geen IndexNow voor uitsluitend runtime/consentbediening;
een eventuele substantiële privacytekstwijziging wordt afzonderlijk beoordeeld.

## Onderbouwing

De [GBA-uitleg](https://www.gegevensbeschermingsautoriteit.be/burger/thema-s/internet/cookies)
en [checklist](https://www.gegevensbeschermingsautoriteit.be/publications/cookie-checklist.pdf)
onderbouwen voorafgaande, specifieke en intrekbare toestemming, een eenvoudige
weigering en beperkte voorkeursbewaring. Dit ontwerp gebruikt daarvoor 180 dagen.

[Vercels package-documentatie](https://vercel.com/docs/analytics/package)
beschrijft `beforeSend` en annulering met `null`;
[Vercels privacydocumentatie](https://vercel.com/docs/analytics/privacy-policy)
beschrijft onder meer de dynamische intakepaden van SDK2. De geïnstalleerde SDK2.0.1
registreert bij mount injectie/pagina-events zonder unmount-opruiming. Het op
17 oktober publiek opgehaalde script bevat toegang tot `__va_attribution` in
localStorage; er is geen vrijstelling afgeleid uit de term cookie-free.

[Google Places-beleid](https://developers.google.com/maps/documentation/places/web-service/policies)
blijft leidend voor bronvermelding. De conservatieve fotokeuze is een ontwerpbesluit,
geen bewering dat iedere afbeeldingsaanvraag op zichzelf een trackingcookie plaatst.
