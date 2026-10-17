# Cookieconsent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Root voert zelf uit; inputworkers zijn read-only en er is één onafhankelijke hele-releasebeoordeling.

**Goal:** Een echte NL/FR/EN-keuze vóór statistieken en externe Google-auteurfoto's, met eenvoudig weigeren en intrekken zonder verlies van contactfuncties.

**Architecture:** Een kleine cookieparser en browserstore vormen de enige toestemmingsbron. Een gedeelde React-hook voedt de banner, instellingen, analytics en auteurfoto's; meetaanroepen controleren daarnaast synchroon de actuele keuze. Server-side reviews en alle bestaande routes blijven behouden.

**Tech Stack:** Bestaande Next16.3.8/React19.3, Node24, native cookie/dialog/Event-API's, Vercel Analytics2.0.1 en bestaande Node/SWC-testharnassen; geen nieuwe packages.

**Spec:** `docs/superpowers/specs/2026-10-17-cookie-consent-design.md`, geschreven ontwerp door eigenaar goedgekeurd op 17 oktober 2026.

## Global Constraints

- Voorkeurscookie `ab_service_consent`; hostgebonden, pad `/`, `SameSite=Lax`, `Secure`, maximaal180dagen (`15552000`seconden), geen identificatienummer of klantgegevens.
- Twee onafhankelijke optionele doelen: `analytics` en `googlePhotos`. Ontbrekend, ongeldig, verlopen of onleesbaar betekent beide uit; SSR start zonder optionele requests.
- Geen advertenties, betaald platform, nieuwe accounts, aanvullende API-rechten, Google-cache/proxy voor echte content, extra analyseproducten of dependency-upgrades.
- Behoud officiële reviewteksten/score/auteursnaam/bron-/meldlinks/Google Maps-attributie, eigen foto's, WhatsApp-logo,24/7, contactformulieren en beide hulpmiddelen.
- Intrekken verhindert nieuwe meetacties/opslagtoegang; eerder gestarte transacties, ontvangen beelden of verzonden gegevens kunnen niet achteraf ongedaan worden gemaakt. Unmount is geen SDK-stopbewijs.
- Hergebruik `/Users/hamda/Documents/ABService-1`, `/bin/sh`, `login:false` en Node `/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`. Geen reset, tweede schrijver, automatische installatie of nieuwe worktree.
- Bewaar vier lokale Task139-acceptatiebackfills, alle bestaande fixtures/hashliterals,137oorspronkelijke meesterplancheckboxes, vier integrale bronnen en beide recoveryledgers.
- Geen algemene juridische/AT/WCAG-/indexeringsclaim.9dev/ESLint en eigenaar-uitgestelde accounts/Maps/prijzen/WP16 blijven afzonderlijk open.

## Review Focus

1. Cookie schrijven mislukt terwijl een oude opt-in leesbaar blijft: optionele verwerking blijft in dit document uit en de foutmelding zegt dat bewaren niet lukte; geen valse bevestiging van permanente opslag.
2. Verval, andere-tabwijziging of een terugkerende achtergrondtab: geen nieuwe verwerking op basis van verouderde React-status.
3. Instellingen openen met een half ingevuld formulier: geen paginanavigatie, gegevensverlies, automatische verzending of ongewenste focusverplaatsing.
4. SDK al geladen, uitgestelde verwerking of gewijzigde/dynamische intakeconfiguratie: echte netwerk-/opslagproef bewijst de grens, niet alleen een nul tellende mock of afwezig vast URL-patroon.
5. 320px, toetsenbord, terugkeerfocus en fotoverzoeken vóór keuze: alle noodzakelijke bediening blijft bereikbaar, zonder cookiewall of verborgen afbeeldingspreloads.

## Werkverdeling en herstel

Task1 → Task2 → Task3 → Task4. Alleen Task4 publiceert; eerdere commits zijn lokaal.
Gebruik een eigen cookie-uitvoeringsledger onder `.superpowers/sdd/2026-10-17-cookie-consent/`, met verwijzingen naar de bestaande ouder- en taalreleaseledgers; geen eerdere artifacts vervangen. Leg vóór edits exacte source-/data-/HTML-/registry-/sitemapbasis van35ef4a9 vast, inclusief de vier lokale backfills. Lees de geïnstalleerde Next-documentatie over client/server, scripts en de daadwerkelijk gebruikte API's vóór implementatie.

### Task 1: Voorkeur betrouwbaar lezen en bewaren

**Files:** Create `libs/cookie-consent.mjs`, `libs/cookie-consent-store.mjs`, `tests/cookie-consent.test.mjs`; testhulp alleen onder `tests/helpers/`.

**Interfaces:**

- Pure module: `parseConsentCookie(cookieHeader, now = Date.now()) -> Consent|null`, `serializeConsentCookie({analytics,googlePhotos}, now = Date.now()) -> string`.
- `Consent = {version:1,decidedAt:number,analytics:boolean,googlePhotos:boolean}`. Cookievalue bestaat uit exact `1.<epochmilliseconden>.<0|1>.<0|1>`; serialize geeft de volledige cookie met180dagen-Max-Age en de genoemde attributen. Onveilige/niet-integer/future/verlopen tijden, onbekende versie, verkeerde booleans en dubbele eigen cookienamen zijn ongeldig.
- Browserstore: `readConsent() -> Consent|null`, `hasConsent(purpose) -> boolean`, `saveConsent({analytics,googlePhotos}) -> boolean`, `subscribeConsent(listener) -> unsubscribe`, `getConsentSnapshot() -> ConsentStatus`, `getServerConsentSnapshot() -> 'loading'`, `requestConsentSettings() -> boolean`.
- `ConsentStatus = 'loading'|'unknown'|'necessary'|'analytics'|'googlePhotos'|'both'`; snapshots zijn stabiele primitieve waarden, geen telkens nieuw object. Een onbekend doel is nooit toegestaan.
- `requestConsentSettings` verstuurt een cancelable `abservice:open-cookie-preferences`-event; `true` betekent dat de dialooghandler het event heeft afgehandeld/geannuleerd. Zonder handler blijft een gewone privacylink bruikbaar.

- [x] **Stap 1 — RED:** schrijf echte parser-/storetests met een gecontroleerde browsercookie-adapter. Handmatige vaste tijd `1800000000000`; `1.1800000000000.1.0` staat alleen analytics toe, `.0.1` alleen foto's, `.0.0` geen van beide. Assert ontbrekend/malformed/duplicaat/verkeerdeversie/future/precies180dagenoud/throwinggetter → geen toestemming. Assert de exacte naam,15552000,Path,SameSite,Secure en afwezigheid van identificatievelden.

  ```js
  test('analytics-only preference expires at exactly 180 days', () => {
    const cookie = 'ab_service_consent=1.1800000000000.1.0';
    assert.deepEqual(parseConsentCookie(cookie, 1800000000000),
      {version:1, decidedAt:1800000000000, analytics:true, googlePhotos:false});
    assert.equal(parseConsentCookie(cookie, 1815552000000), null);
  });
  ```

- [x] **Stap 2 — observeer RED:** `NODE --test tests/cookie-consent.test.mjs`; verwacht ontbrekende nieuwe exports of ontbrekende afwijzing, geen harness-/syntaxfout als bewijs aanvaarden.
- [x] **Stap 3 — implementeer de genoemde interfaces:** browser- en SSR-fouten fail-closed. `saveConsent` zet een tijdelijke deny vóór schrijven, leest de cookie terug en accepteert uitsluitend de exacte nieuwe keuze/tijd. Mislukte write/read-back mag een oude allow niet opnieuw activeren binnen dit document. Een succesvolle volgende save kan de tijdelijke deny opheffen.
- [x] **Stap 4 — voeg liveness toe:** focus/visibilityhercontrole en een op de echte vervaltijd afgestemde timer met veilige lange-timersegmenten; opruimen na laatste subscriber. Synchrone `hasConsent` leest altijd de huidige geldige voorkeur en respecteert tijdelijke deny. Bij echte analytics-intrekking/verval verwijder uitsluitend het bekende `__va_attribution`-veld nadat deny geldt; storagefouten blijven veilig. Geen tracking via voorkeuren of listeners.
- [x] **Stap 5 — GREEN:** test ook oudeallow+writeerror, normaliserende/afwijkende read-back, verval zonder herladen, andere-tabcookie+focus en dubbele subscribe/unsubscribe. Verwacht0niet-toegestane acties en geen listener/timerlek. Voer daarna `npm test` onder de echte Node24 uit.
- [x] **Stap 6 — commit:** uitsluitend de genoemde implementatie/tests en bijgewerkte private voortgang; `feat: add fail-closed cookie preference state`. Nog geen push.

### Task 2: Alle statistieken achter dezelfde keuze

**Files:** Create `components/use-cookie-consent.js`, `libs/consented-analytics.mjs`, `tests/consented-analytics.test.mjs`, `tests/fixtures/cookie-consent-history.json`, `tests/fixtures/cookie-consent-history.mjs`, `tests/cookie-consent-history.test.mjs`; modify `components/privacy-analytics.js`, `components/tracked-link.js`, `components/sections/contact-form.js`, `components/maintenance-check.js`, `components/water-meter-check.js`. Bestaande positieve harnassen: `tests/helpers/contact-runtime.mjs`, `tests/helpers/wp12-runtime.mjs`, `tests/water-meter-page.test.mjs`, `tests/maintenance-readiness.test.mjs`, `tests/maintenance-submit-focus.test.mjs`, `tests/maintenance-reset.test.mjs`. Historische bronreads ook in `tests/registered-seat.test.mjs` en `tests/localization-contact.test.mjs`.

**Interfaces:**

- Consumes alle Task1-storefuncties. `useCookieConsent() -> ConsentStatus` gebruikt `useSyncExternalStore` met de echte client/server-snapshotfuncties.
- `trackWithConsent(name, properties = {}) -> boolean`: `false` betekent weggegooid, nooit gebufferd; `true` betekent uitsluitend aangeboden aan het SDK-transport, niet bewezen dashboardontvangst. Behoud de bestaande `buildAnalyticsEvent`-filtering.
- `beforeSendWithConsent(event) -> sanitizedEvent|null`: controleert eerst de actuele analyticskeuze en gebruikt daarna bestaande `sanitizeAnalyticsEvent`.
- `PrivacyAnalytics()` behoudt officiële Next-SDK-configuratie en rendert alleen bij analytics/both. De twee bestaande `process.env.VERCEL`-mountvoorwaarden blijven intact.
- `beforeCookieConsentSource(source,path)` herstelt uitsluitend exact vastgelegde Task2-hunks vóór de bestaande historische inverses. Task2-rows worden na commit niet herschreven; Task3 voegt zijn eigen rows toe. Huidige runtime wordt nooit door een historische inverse uitgevoerd.

- [x] **Stap 1 — RED:** test echte gate+SDK-transportspy: absent/deny/photos-only/expired/readerror/failedsave →0calls; geldig analytics → exact toegelaten naam/eigenschappen, zonder query/hash/PII. Kies daarna deny en trigger route-/klik-/formulier-/toolacties:0nieuwe calls en geen inhaalwachtrij bij hernieuwde toestemming.

  ```js
  test('absent consent never reaches the SDK', async () => {
    const calls = [];
    const gate = await loadContactModule('libs/consented-analytics.mjs',
      {'@vercel/analytics': {track: (...args) => calls.push(args)}},
      {document: {get cookie() { return ''; }}});
    assert.equal(gate.trackWithConsent('phone_click', {location:'footer'}), false);
    assert.deepEqual(calls, []);
  });
  ```

- [x] **Stap 2 — observeer RED:** `NODE --test tests/consented-analytics.test.mjs`; bewijs ook dat de bestaande component vóór deze wijziging de SDK zonder keuze mountte.
- [x] **Stap 3 — implementeer hook/gate en vervang vier directe `track`-imports:** bestaande businesshandlers, gevalideerde formulierdata, keuze-/resultaatwaarden en hrefs blijven gelijk. Alleen `libs/consented-analytics.mjs` importeert het gewone SDK-transport; de Next-component blijft in `PrivacyAnalytics`. Geen identify/group/enableCookie of nieuwe events.
- [x] **Stap 4 — behoud bestaande positieve eventtests:** geef bestaande runtimeharnassen een expliciete geldige analyticscookie waar ze eventsemantiek testen. Houd de nieuwe gate echt; vervang hem nergens globaal door onvoorwaardelijk doorsturen. Voeg dezelfde echte businessacties met deny toe en assert ongewijzigd formulier-/toolresultaat bij0events. Het bestaande recursieve SWC-harnas krijgt een per-test-modulegraphcache: dezelfde echte browserstore-instantie voor hook/save/gate, geen globale cache tussen tests. Browserafhankelijke nieuwe aliasimports moeten onder dezelfde meegegeven cookie-/windowglobals worden uitgevoerd; pure relatieve parserimports mogen echte Node-modules blijven.
- [x] **Stap 5 — historisch behoud:** leg alleen bedoelde Task2-bronhunks eenmalig vast in de nieuwe cookiehistory. Breng `beforeCookieConsentSource` aan op de genoemde oude source-readgrenzen en laat extra bytes/onbekende paden zichtbaar; behoud alle oudere fixture/hashliterals. Zo hoeft een groene volledige suite niet op de latere Task4 te wachten.
- [x] **Stap 6 — GREEN:** gerichte nieuwe tests plus bestaande contact-/maintenance-/water-/floatingtests en volledige `npm test`; alle slagen. De storecontrole blijft synchroon, onafhankelijk van React-rerender of unmount.
- [x] **Stap 7 — commit:** `feat: gate analytics requests and interaction events on consent`; nog geen push.

### Task 3: Keuze bedienen en officiële reviews behouden

**Files:** Create `content/cookie-consent-copy.mjs`, `content/cookie-policy.mjs`, `components/cookie-consent.js`, `components/cookie-preferences-link.js`, `components/consented-author-photo.js`, `components/cookie-policy.js`, `tests/cookie-consent-ui.test.mjs`, `tests/consented-author-photo.test.mjs`; modify `app/(nl)/layout.js`, `components/localized-root.js`, `components/site-footer.js`, `components/localized-shell.js`, `components/floating-trust-signals.js`, `components/sections/google-reviews.js`, `app/globals.css`, `app/(nl)/privacy-policy/page.js`, `components/localized-privacy-page.js`, `content/privacy-localization.mjs`, `content/site-content.mjs`, `content/localization.mjs`.

Historische adapters/reads in deze taak: uitbreiden van de drie Task2-cookiehistoryfiles; `tests/registered-seat.test.mjs`, `tests/localization-routing.test.mjs`, `tests/localization-shell.test.mjs`, `tests/localization-privacy.test.mjs`, `tests/localization-completeness.test.mjs`, `tests/tariffs-entry-links.test.mjs`, `tests/footer-facts-layout-history.test.mjs`, `tests/customer-location.test.mjs`, `tests/maintenance-submit-focus.test.mjs`, `tests/maintenance-reset.test.mjs`, `tests/faq-recognition.test.mjs`, `tests/sanitary-referral.test.mjs`, `tests/district-claim-correction.test.mjs`, `tests/seo-data.test.mjs` en `tests/helpers/registered-seat-runtime.mjs`. Huidige privacygedragstests in `tests/water-meter-page.test.mjs` behouden hun inhoudelijke grenzen.

**Interfaces:**

- Consumes Task1-store en Task2-hook. `CookieConsent({locale='nl-BE'})` is één clientinstantie binnen `main`, vóór de paginacontent; banner in normale documentstroom, geen vaste overlay. Dialoog blijft dezelfde component en gebruikt native `showModal`/`close`.
- `CookiePreferencesLink({locale='nl-BE'})` is een echte link naar `getPrivacyRoute(locale)+'#cookievoorkeuren'`; alleen bij succesvol afgehandeld settings-event wordt navigatie voorkomen. De dialoghandler vult actuele keuzes in, opent en annuleert het event.
- `ConsentedAuthorPhoto({photoUri,displayName,locale='nl-BE'})` behoudt originele44×44-afbeelding na fotokeuze; anders de oorspronkelijke initiaal plus een herkenbare knop die alleen foto's toestaat. Een geldige bestaande analyticskeuze blijft bij die actie gelijk.
- `getCookieConsentCopy(locale)` uit UI-copy; `CookiePolicy({locale='nl-BE'})` gebruikt uitsluitend de servercopy uit `content/cookie-policy.mjs`. Geen privacyproza in het clientbundle importeren.
- `COOKIE_POLICY_UPDATED` is een vaste, bij release gekozen echte publicatiedatum in Europe/Brussels, geen runtime-`new Date()` voor inhoudsdatums. Alleen de drie privacyrecords en hun zichtbare beleidstijd volgen die werkelijke wijziging; geen contact-/dienst-/lokale datums opschuiven.
- Uitbreiding geschiedenisinterfaces: `beforeCookieConsentHtml(html,path)`, `beforeCookieConsentRegistry(registry)`, `beforeCookieConsentCopy(copy,locale)`. Exacte veld-/waarde-/padcontrole; onbekende of gewijzigde invoer blijft staan. De eerste is voor goedgekeurde HTML-toevoegingen/vervangingen, de tweede alleen de drie volledige privacyrecords/datums, de derde alleen de gewijzigde privacyvelden voor historische datahashes.

- [x] **Stap 1 — RED:** test alle drie talen met echte componenten/hook: onbekend toont gelijkwaardige statistieken/alleennoodzakelijk/instellingen/privacy; geen optionele checkbox vooraf aangevinkt. Statistics-only, photos-only, beide, weigeren, opslaan-fout, heropenen, annuleren en intrekken hebben elk de vastgelegde toestand en begrijpelijke tekst.
- [x] **Stap 2 — observeer RED:** `NODE --test tests/cookie-consent-ui.test.mjs tests/consented-author-photo.test.mjs`. Fotohoudende echte fixture: vóór keuze geen externe src/srcset/preload, tekst/score/auteur/bronnen/attributie onveranderd; na alleen fotokeuze wel foto,0analytics; na intrekken weer geen fotoverzoekende markup.

  ```js
  test('server-rendered author keeps attribution without requesting its photo', async () => {
    const {default: Photo} = await loadContactModule('components/consented-author-photo.js');
    const html = renderToStaticMarkup(React.createElement(Photo,
      {photoUri:'https://lh3.googleusercontent.com/test-only', displayName:'Fixture'}));
    assert.match(html, /class="review-author-fallback"[^>]*>F<\/span>/);
    assert.doesNotMatch(html, /<img\b|rel="preload"/);
  });
  ```

- [x] **Stap 3 — implementeer UI/copy:** in loading geen interactieve banner; statische noscript-privacyverwijzing blijft. Native dialog met naam, afzonderlijke niet-verplichte opties, opslaan, allesintrekken en sluiten; Escape/annuleren bewaart de oude keuze. Instellingen openen vanuit footer behoudt ingevoerde formulierwaarden en geeft na sluiten focus terug. Leesfouten/opslaan-fout activeren niets en zeggen expliciet dat bewaren niet lukte.
- [x] **Stap 4 — integreer roots/footer/foto's:** beschermzone `.cookie-consent-panel` voor zichtbaar banner/dialog. Plaatsing binnen main is noodzakelijk: bestaande floating-MutationObserver volgt alleen main; alleen een nieuwe selector op een buiten-main banner volstaat niet. Geen brede observatorherbouw. Google-opvraging/score/teksten/auteurslinks blijven server-side ongewijzigd; gate alleen de auteurafbeelding.
- [x] **Stap 5 — privacy:** voeg binnen bestaande sectie4 een `h3`/uitleg met id`cookievoorkeuren` toe, behoud acht hoofdsecties. Beschrijf noodzakelijke voorkeur180dagen, Vercelkeuze, aparte Google-fotokeuze, gegevens/ontvangers, intrekken en feitelijke SDK-opslaggrens. Actualiseer bestaande analyse-/fotoparagrafen en beleidstijd, niet bewaarbeleid van echte aanvragen. Houd onzekerheid over eventrapportage en alle bestaande lokale-tool-/Mailgun-/bedrijfsgegevens.
- [x] **Stap 6 — historisch behoud:** leg de bedoelde Task3-bron-/HTML-/registry-/privacyveldwijzigingen exact vast en pas de genoemde historische read boundaries aan vóór de oude inverses; Task2-captures en alle oudere JSON/hashliterals blijven gelijk. In de nieuwe volledigheidstest blijven alle drie oude datahashes; alleen de waarden voor de historische privacyhash krijgen de exacte cookie-inverse. `loadCopy` en alle incomplete-copygevallen blijven de huidige productie-initialisatie testen. Extra bytes, duplicate controls, verkeerde datum/recordeigenschappen en ander proza mogen niet verdwijnen. Werk bewuste actuele privacywoord-/datumverwachtingen apart bij.
- [x] **Stap 7 — GREEN:** alle UI/foto-/locale-/privacytests, volledige suite en lint.320/390/1280: banner bedekt niets, instellingen bedienen met Tab/ShiftTab/Enter/Space/Escape, focus terug, geen formulierverlies of horizontale overflow; bestaande telefoon/WhatsApp/tools blijven bruikbaar zonder opt-in. Registreer de gemeten layout-/snelheidsimpact; geen ongecontroleerde performanceclaim.
- [x] **Stap 8 — commit:** `feat: add accessible consent choices and optional author photos`; nog geen push.

### Task 4: Historisch behoud, echte browserproeven en publicatie

**Files:** Create `tests/helpers/cookie-consent-probe-server.mjs`, `tests/helpers/cookie-consent-probe-preload.mjs`, `tests/fixtures/cookie-consent-places.mjs`, `tests/cookie-consent-probe.test.mjs`, `docs/seo/cookie-consent-release.md`; modify `SEO_CHANGELOG.md`, `SEO_QA_REPORT.md`, `SEO_CONTENT_INVENTORY.md`, `docs/seo/evidence-register.md`, meesterplan, dit uitvoeringsplan en private cookieledger. De benodigde historische inverses en actuele privacytests zijn al binnen Task2/3 groen gemaakt.

**Interfaces:**

- Consumes de vier al geteste Task2/3-geschiedenisinterfaces en de volledige Task1–3-site. Geen nieuwe versoepeling om een browser- of productprobleem te verbergen.
- Testproxy: `NODE tests/helpers/cookie-consent-probe-server.mjs --upstream http://localhost:PORT --port PROBEPORT --evidence PRIVATE_DIR`. Alleen loopback, port0 voor eigen geautomatiseerde tests toegestaan; stdout meldt de echte luisterorigin. Logt netwerkmethoden/paden en opslagoperatie+sleutel, nooit formulierwaarden/identifiers. Laadt één gecontroleerde kopie van het actuele openbare Vercel-script voor deze testorigin; vangt test-intake lokaal af, geen testevents/fixturepayloads naar analytics-/Google-/MailgunAPI's.
- Fotohoudende browserfixture zonder productie-testflags: start uitsluitend de eigen lokale Next-testserver met `NODE_OPTIONS=--import=<absoluut-pad-naar-cookie-consent-probe-preload.mjs>` en `GOOGLE_PLACES_API_KEY=consent-probe-not-a-real-key`. De preloader onderschept alleen `https://places.googleapis.com/v1/places/` in dat lokale proces en geeft expliciet synthetische genormaliseerbare Places-data terug; andere fetches blijven echt. Gebruik het juiste verwachte PlaceID, fictieve als-test-gelabelde teksten en voor `photoUri` een bekend eigen openbaar HTTPS-beeld met vaste niet-persoonlijke testquery. Geen echte API-call of wijziging van `getGoogleReviews` voor fixtures. De proxy voegt alleen op zijn eigen testorigin meetinstrumentatie toe vóór app-scripts en registreert ook echte browser-resource-observaties voor afbeeldingsloads. Testdata/preload/instrumentatie komen niet in de productie-app.

- [x] **Stap 1 — controleer samenhang:** bestaande bron-/HTML-/registry-/datumtests en nieuwe driftasserties zijn groen tegen de complete site; geen blanket locale-/privacyfilter. Werkelijke output vóór/na verschilt uitsluitend op de goedgekeurde consentbediening, foto-/privacykeuze en drie privacydatums.
- [x] **Stap 2 — RED/GREEN testprobe:** `NODE --test tests/cookie-consent-probe.test.mjs`. Eerst geen werkende probe; daarna uitsluitend loopbackbinding/upstream, logs zonder gevoelige waarden en lokaal afgevangen intake bewijzen met gecontroleerde HTTP-fixtures. Niet-loopbackupstream faalt expliciet met exit1/`loopback`, niet toevallig met een ontbrekend bestand. De command-line-interface en bewijsbestanden blijven test-only.

  ```js
  test('probe refuses an external upstream before serving traffic', () => {
    const result = spawnSync(process.execPath,
      ['tests/helpers/cookie-consent-probe-server.mjs',
       '--upstream','https://external.invalid','--port','0',
       '--evidence','.superpowers/sdd/2026-10-17-cookie-consent/probe']);
    assert.equal(result.status, 1);
    assert.match(result.stderr.toString(), /loopback/);
  });
  ```

- [x] **Stap 3 — instrumenteerde echte browserproef:** productiebuild met bestaande Vercel-mount ingeschakeld, uitsluitend via testproxy bezoeken met CUA. Probe registreert werkelijk aangeroepen SDK-opslagfuncties en alle intakepaden, niet alleen `/_vercel/insights`. Sla vooraf bronhash/scriptconfig op. Vóór keuze/weigering/foto-only:0analyticsrequests en0SDK-storageaccess; analytics-only: wel toegelaten gefilterde events, geen Googlefoto's; foto-only: foto's,0analytics. Na intrekken nieuwe klik-/route-/toolacties:0nieuwe analyticsrequests/SDK-storageaccess en geen nieuwe externe fotoloads. Bekende attributiewisactie na intrekken wordt afzonderlijk van verboden SDK-lezingen geregistreerd.
- [x] **Stap 4 — uitzonderingen echt toetsen:** test oudeallow+writefailure, readerror, verval en tabterugkeer met gecontroleerde test-only hostcondities; testuitbreidingen blijven buiten productie-app en aanraking van andere origin-opslag. Alleen CUA bedient de browser; geen ongedocumenteerde browser-API, ruwe CDP of veiligheidsbypass. Ontbrekende verplichte netwerk-/opslagwaarneming blijft een publicatiegate, geen verzonnen PASS. SSR/nativeHTTP en echte JS-off-browserproef blijven onderscheiden.
- [x] **Stap 5 — volledige gates:** echte Node24 `npm test`, `npm run lint`, `npm audit --omit=dev`, `npm run build`, `node scripts/seo-audit.mjs LOCAL_ORIGIN`, `node scripts/localization-audit.mjs LOCAL_ORIGIN`; verwacht0failures, lint0/prod0,86 bestaande routes/84published/2noindex en6equivalenten/2groepen/5noindex404. Leg werkelijke link-/asset-/buildaantallen en eventuele waarschuwingen vast, geen oude aantallen als fictief resultaat. Een verse volledige dev-audit blijft afzonderlijk gerapporteerd.
- [ ] **Stap 6 — één eindreview:** freeze bron/data/output, onafhankelijke hele-releasebeoordeling, root beoordeelt elke afgezonderde gedraging. Kritieke/belangrijke bevindingen eerst oplossen en relevante gates opnieuw draaien; geen tweede gelijktijdige schrijver of stilzwijgend verbrede scope.
- [ ] **Stap 7 — gecontroleerd publiceren:** alleen na review/pass naar bestaande main/Vercel onder standing instruction. Controleer volledige remoteSHA, exacte hostedCI, werkelijke primaire Ready/Production/fullSHA/www en live taal/consent/contact/reviewgedrag. Productiedata of echte mail niet als fixture versturen; geen dashboardontvangst/indexering afleiden uit request/push.
- [ ] **Stap 8 — afronden:** bron/actie/verificatie/volgende taak/open gates in planstatus/changelog/QA/evidence. Geen IndexNow voor de runtimewijziging. Beoordeel uitsluitend de daadwerkelijk substantieel gewijzigde privacy-URLs afzonderlijk, pas na livecontrole/geldig publiek bewijs, nooit onveranderde al gemelde URLs opnieuw. Sluit alleen eigen tabs/servers, herstel viewport en bewaar alle recovery. Volledige WPs niet als afgerond markeren op basis van alleen deze release.

## Commandoafspraak

`NODE` betekent exact `/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`; npm loopt via `NODE /opt/homebrew/lib/node_modules/npm/bin/npm-cli.js` met die Node-map vooraan PATH. Iedere gate krijgt een eigen append-only bewijslog; vóór commit/push stopt de commandoreeks bij een mislukte gate.

## Planreview en uitvoering

De eigenaar keurde het geschreven ontwerp en dit uitvoeringsplan op 17 oktober 2026 goed. Tasks 1–3 en de lokale proef-/kwaliteitsgates zijn uitgevoerd; review en exacte publicatieacceptatie blijven open. De eerder gekozen native werkwijze blijft behouden: root implementeert de vier taken in deze chat, één schrijver, één onafhankelijke eindreview. Geen nieuwe algemene SEO-planronde of installatie nodig.
