# AB Service SEO QA Report

**Audit date:** 17 September 2026
**Release:** `main` commit `7d0cdd8`; Vercel production `dpl_9kCQetdutyeWYYYzUzW78DkBSyGi`
**Test targets:** lokale Next.js-productieserver op poort 3000 en `https://www.abservice24.be`

## Contactanker, beeldherstel en negen extra foutcodemerken

- De knop `Ga naar het formulier` verwijst nu naar `#aanvraagformulier`; het doel is
  programmatisch focusbaar en heeft 6,5 rem scrollmarge voor de vaste navigatie.
- Een echte Chromium-kliktest bevestigde op 1440×1000 en 390×844 dat de link bestaat, de URL-hash
  wijzigt, het formulier op 104 pixels van de bovenrand landt en geen horizontale overflow ontstaat.
- De foutcodehub bevat nu dertien merkgidsen en 922 brongebonden regels. Nieuw zijn Remeha 17,
  Buderus 51, Viessmann 71, ACV 24, Intergas 11, Nefit Bosch 54, ATAG 14, Itho Daalderop 26 en
  Ferroli 37: samen 305 nieuwe bronregels.
- De catalogi zijn per genoemd model, handleiding of officieel online overzicht afgebakend. Ze
  claimen geen universele merkdekking, dealerstatus of commerciële dienstscope.
- `npm run sources:audit` bevestigde HTTP 200 voor de negen nieuwe officiële fabrikantbronnen en
  de vier bestaande gebiedsbronnen.
- Zeven bestaande illustraties en vijf aangeleverde, AI-gegenereerde marketingbeelden zijn als
  metadata-vrije WebP opgeslagen. Alle twaalf bestanden blijven onder 102 KiB; de tests bewaken
  een harde bovengrens van 250 KiB en verbieden projectbewijs voor deze beelden.
- De gegenereerde beelden dragen zichtbaar het bijschrift dat het illustraties zijn en geen echte
  medewerker, klantcase of projectbewijs. Team- en wagenbeelden zijn niet gebruikt.
- `npm test`: 44 van 44 tests geslaagd. `npm run lint`, `npm run build`, `git diff --check` en de
  lokale SEO-crawl zijn geslaagd; Next.js genereerde 54 routes en de crawl controleerde 45 pagina's
  en 45 interne links.
- Chromium vond op desktop exact één Remeha-resultaat voor `E:10` en op 390×844 exact één
  Ferroli-resultaat voor `F66`; beide pagina's hadden de juiste H1 en geen horizontale overflow.
- Mobiele Lighthouse op de homepage bleef 98/100/100/100 voor performance, toegankelijkheid,
  best practices en SEO. LCP bleef 2,3 s, TBT 0 ms, CLS 0 en totale overdracht 298 KiB.
- De publieke deployment is gecontroleerd: `npm run seo:audit -- https://www.abservice24.be`
  slaagde met 45 pagina's en 45 interne links. Alle negen nieuwe merkpagina's, `/contact`,
  sitemap en robots gaven HTTP 200; de live contact-HTML bevat precies één CTA-fragment en één
  formulierdoel-ID. Alle negen nieuwe gidsen staan in de live sitemap.

## Vorige foutcodecatalogusrelease (9d9dd61)

- De gepubliceerde catalogus bevat 90 Vaillant-, 43 Bulex- en 242 Bosch/Junkers-
  codeverklaringen. Aantallen zijn bronregels, niet noodzakelijk unieke displaycodes over alle
  modellen heen: dezelfde code blijft bewust apart staan wanneer de betekenis per reeks verschilt.
- Vaillant is afgebakend tot het officiële Belgische consumentenoverzicht en ecoTEC plus
  CS/1-5-handleiding `0020282230_00`; Bulex tot het consumentenoverzicht en THEMA Condens
  `0020124551_02`.
- Bosch/Junkers volgt de keteldelen van het officiële 268 pagina's tellende codeboek voor Serie
  7000i, Serie 9000i, Cerapur Maxx, Serie -4, Serie -3 en Serie -2. Gewone bedrijfscodes zijn niet
  als fout gepresenteerd.
- Iedere groep toont toestelreeks, officiële bron en paginabereik. De pagina waarschuwt dat merk,
  model, bouwjaar en eventuele subcode samen gecontroleerd moeten worden.
- `tests/fault-guides.test.mjs` bewaakt brondomeinen, aantallen per tabel, duplicaten, bronlocaties,
  veilige eerste stappen, representatieve actuele en historische codes en de zoekaliassen voor
  gegroepeerde bereiken.
- `npm test`: 42 van 42 tests geslaagd; `npm run lint`, `npm run build` en `git diff --check`
  geslaagd. Next.js bouwde alle vier merkpagina's statisch binnen een totaal van 45 pagina's.
- De productie-crawl controleerde 36 routes en 36 interne links zonder fout. Chromium controleerde
  Bosch en Junkers op desktop en Vaillant en Bulex op 390×844: geen browserfouten of horizontale
  overflow. De zoekproeven `F0 244`, `b4`, `F.028` en `F.77` gaven de juiste modelgebonden regels.
- GitHub `main` en Vercel-productiedeployment `dpl_4zebXoBsWFzqYTETt9vkMYQR2ToY` zijn gereed.
  De publieke controle op `www.abservice24.be` bevestigde op 1440×1000 en 390×844 opnieuw 242
  Bosch-regels en één correcte treffer voor `F0 244`, zonder browserfouten of overflow. De publieke
  SEO-crawl controleerde 36 pagina's en 36 interne links zonder fout.

## Officiële Google Places-beoordelingen

- Places API (New) antwoordde voor Place ID `ChIJ38_PKjPxw0cRMfEVYieHZDg` met naam
  `AB SERVICE`, telefoon 0484 90 69 66, Voorzorgstraat 12A, score 5,0 en 35
  beoordelingen.
- Dezelfde Place Details-response bevatte nul afzonderlijke reviewobjecten. De homepage toont
  daarom de officiële live score en het officiële live aantal, plus een directe Google Maps-link,
  maar geen overgenomen of verzonnen reviewteksten.
- De API-key is beperkt tot Places API (New), blijft server-only en staat als Vercel Secret in
  Production, Preview en Development van beide gekoppelde projecten. Een ingetrokken
  aanmaaksleutel is nergens actief.
- De fetch gebruikt `cache: "no-store"`, `connection()` en een time-out van vijf seconden. Zonder
  geldige response blijft de profielkoppeling beschikbaar zonder score- of aantalclaim.
- `npm test`: 39 geslaagd; `npm run lint`, `npm run build`, `git diff --check` en de secret-scan
  slagen. De build markeert de homepage correct als dynamische route.
- De lokale productie-crawl controleerde opnieuw 36 routes en 36 interne links zonder fout.
- Chromium desktop (1280 px) en mobiel (390×844) tonen 5,0 en 35 beoordelingen, één H1, geen
  horizontale overflow, geen Next.js-overlay en geen browserfouten. De Google-sectie en fallback
  blijven leesbaar op beide breedtes.
- Privacybeleid en voorwaarden verwijzen naar Google Privacy en Google Maps Platform Terms;
  reviewdata wordt niet vooraf opgehaald, gecachet of opgeslagen.
- `AggregateRating` en `Review` blijven afwezig uit JSON-LD.
- Beide productiechecks slaagden: primaire deployment `DN7n2ttXesZnU8cevhQPKHQ6NyXp` en
  secundaire deployment `GiUun3cLBtgP24RVhm7je8n228fZ`. De publieke desktop- en mobiele
  hercontrole op `www.abservice24.be` gaf dezelfde live 5,0/35-data; de publieke SEO-crawl
  controleerde opnieuw 36 routes en 36 interne links zonder fout en de recente productielogs
  bevatten geen error-events.

## Contactformulier en zwevende contactelementen

- Productielogs lokaliseerden de formulierfout bij de ontbrekende `MAILGUN_API_KEY`; validatie,
  browserpayload en de Next.js-route werkten tot aan die externe grens.
- Een nieuwe Mailgun-key is uitsluitend als Vercel Secret ingesteld voor Production, Preview en
  Development van beide gekoppelde projecten; geen sleutel staat in Git of documentatie.
- Een echte POST naar de beschermde primaire preview doorliep de volledige route en antwoordde
  met HTTP 200 en `{\"ok\":true}`. De Vercel-runtime logde daarna een geaccepteerde Mailgun message-ID.
- De desktop- en 390×844-controle bevestigde het WhatsApp-logo, de juiste vooraf ingevulde link,
  de Google 5,0-popup, de juiste profiel-ID en de werkende sluitknop.
- De gerichte axe WCAG 2 A/AA-controle rapporteerde nul overtredingen.

## Phase E release verification

- Registered exactly 304 municipalities: 67 Antwerpen, 38 Limburg, 55 Oost-Vlaanderen,
  63 Vlaams-Brabant, 62 West-Vlaanderen and 19 Brussels.
- Registered all ten Antwerp districts; eight district URLs are indexable, one is noindex and Antwerpen remains `/`.
- Added six unique, indexable regional hubs and one complete `/werkgebied` directory.
- Build currently generates 45 static pages/routes; the registry contains 34 indexable pages and
  two routable `noindex` pages.
- `npm test`: 34 pass, zero fail.
- `npm run lint`: passes.
- `npm run build`: Next.js 16.3.5 production build passes.
- `npm run sources:audit`: four official geographic sources return HTTP 200.
- `npm run seo:audit -- http://localhost:3100`: 36 routable pages and 36 internal links pass.
- Chrome desktop and 390×844 mobile checks pass for `/werkgebied` and `/loodgieter-wilrijk`.
- The municipality filter returned one result for “Gent”; 314 searchable area elements were
  present in the initial rendered DOM: all 304 municipalities plus ten Antwerp districts.
- Mobile width matched document width (390 px), with one H1 and no Next.js error overlay.
- Mobile navigation expanded correctly and included the new Werkgebied destination.
- Observed console errors originated from installed Chrome extensions; no application-origin
  error was recorded.
- Both connected Vercel projects completed the production build successfully. Primary project
  `ab-service` completed deployment `3rAk7QryKnvC6mQdvFbDqaC3LpTt`; secondary project
  `ab-service-n4av` completed deployment `8kv27WgHA49t1v9tbwDHQ7kBddAw`.
- `npm run seo:audit -- https://www.abservice24.be`: 36 public/noindex pages and 36 internal
  links pass after deployment.
- Live HTTP checks returned 200 for the homepage, directory, representative hubs, Wilrijk,
  Berendrecht-Zandvliet-Lillo, sitemap and robots.
- The live sitemap contains `/werkgebied`, all six hubs and Wilrijk; it excludes the noindex
  Berendrecht-Zandvliet-Lillo route. The latter emits `noindex, follow` and its canonical, while
  Wilrijk remains indexable with its correct canonical.

## Previous production release verification (before Phase E)

- Pull request [#2](https://github.com/Ilias492610/ABService/pull/2) was merged into `main` as commit `4209f8d`.
- The primary Vercel project `ab-service` completed deployment `2eTDodM2Q` with status **Ready** and serves `www.abservice24.be`.
- A full crawl against `https://www.abservice24.be` passed for 20 registered pages and 20 internal links after deployment.
- The new pressure-loss route and Bosch guide were loaded from the public production domain in Chrome; content, navigation, image delivery and source links render correctly.
- No application-origin browser errors were observed. The Vercel deployment log view contained no displayed runtime error entries during the verification window.
- The repository is connected to a second Vercel project, `ab-service-n4av`, which also built successfully. It is not the project shown as serving `www.abservice24.be`; remove it only after the owner confirms it is obsolete.

## Original baseline

| Page | Performance | Accessibility | Best practices | SEO | Lab LCP | Transfer |
|---|---:|---:|---:|---:|---:|---:|
| Homepage | 75 | 95 | 96 | 92 | 31 s | 8.6 MB |
| Maintenance | 93 | 94 | 96 | 92 | 3.2 s | 3.1 MB |

Original findings included a third-party review widget, 8.4 MB of homepage images, hardcoded rating/count, two sitemap systems, fabricated build-date `lastmod`, incorrect privacy text, unsafe legal/commercial claims, weak 404 canonical behaviour and no automated SEO tests.

## Final Lighthouse results

Lighthouse 13.0.1, mobile defaults, headless Chrome, local production build:

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage | 98 | 100 | 100 | 100 | 0.8 s | 2.3 s | 10 ms | 0 | 251 KiB |
| Maintenance | 98 | 100 | 100 | 100 | 0.8 s | 2.3 s | 0 ms | 0 | 251 KiB |

The homepage lab LCP improved by 28.7 seconds under comparable mobile Lighthouse conditions. Transfer fell by approximately 97%.

## Automated verification

- `npm audit --omit=dev`: zero vulnerabilities.
- Baseline release: `npm test` had 25 tests; the Phase E release has 34 passing tests.
- `npm run lint`: ESLint flat-config run passes with zero warnings/errors.
- `npm run build`: Next.js 16.3.5 production build passes; 45 routes generated.
- `npm run seo:audit -- http://localhost:3100`: 36 routable pages and 36 internal links pass.
- `npm run seo:audit -- https://www.abservice24.be`: 36 live pages and 36 internal links pass.

The SEO crawl verifies:

- sitemap equals the central published registry;
- no fabricated `lastmod` fields;
- robots points to the canonical sitemap and protects `/api/`;
- 200 status for all registered public/noindex pages;
- no unexpected internal redirects;
- unique title and meta description for every published page;
- one H1 per page;
- production canonical origin;
- `noindex` on withheld routes;
- valid JSON-LD syntax;
- no duplicated JSON-LD payloads;
- alt attributes on rendered images;
- all internal HTTP links below 400;
- true 404 status, `noindex` and no inherited canonical.

## Schema checks

- Global graph parses as JSON and contains Organization, WebSite and a Plumber/HVACBusiness entity.
- No address, geo, hours, price range, aggregate rating, review, award or certification is emitted.
- `areaServed` contains the owner-confirmed `Vlaams Gewest` and `Brussels Hoofdstedelijk Gewest`, not 304 keyword entries.
- Interior pages emit BreadcrumbList matching the visible breadcrumb.
- FAQPage schema was removed.
- Unit tests guard verified-only properties and breadcrumb ordering.

## Browser checks

Chrome desktop and 390×844 mobile viewport were inspected against the production server.

- Homepage hierarchy and responsive hero render correctly.
- Mobile navigation exposes Home, installations, five published service links, tariffs, fault codes, FAQ and contact; air conditioning is absent.
- No horizontal overflow at 390 px.
- Contact form exposes labels for all 11 controls and appropriate input types/length limits.
- Client and server reject missing, implausible, oversized and unrecognized service values.
- Telephone, email and WhatsApp links are present.
- Browser console showed no application-origin error. Observed errors were from installed Chrome extensions only.
- Bosch and pressure-loss pages were rechecked at desktop width and at a 390×844 mobile viewport; headings, tables, links, menu behaviour and illustration captions remain readable without visible horizontal overflow.
- Six legacy images are delivered with `next/image`, responsive `sizes`, descriptive neutral alt text and a visible “geen klantcase” caption. A unit test prevents these assets from being promoted to project evidence.
- A live Mailgun submission was not sent: the local environment has no `MAILGUN_API_KEY`, and a real submission would create an external message. Client/server validation is automated; delivery must be smoke-tested in the configured deployment.

## Resolved technical issues

- Replaced dual sitemap generation with one App Router sitemap.
- Removed `next-sitemap`, review widget, Framer Motion, React Hot Toast, Axios, Lucide and DaisyUI dependencies.
- Removed unused client components and synthetic-proof sections from page output.
- Upgraded Next.js 14.0 to 16.3.5 and adopted ESLint flat config.
- Removed the framework disclosure header and added nosniff, frame, referrer and browser-permission security headers.
- Removed unconfigured Plausible v4 integration because no site-specific script URL existed; privacy text now matches Vercel Analytics only.
- Vercel Analytics loads only on Vercel to avoid local 404 console noise.
- Corrected accent contrast from 4.08:1 to approximately 5.54:1 on white.
- Removed current-date sitemap modification claims.
- Retained correct `noindex` handling for air conditioning and published Bosch/Junkers only after mapping a bounded code set to official Bosch documentation.
- Added the indexable pressure-loss guide, navigation/footer links and source-aware internal links.

## Remaining operational checks

- Add and test `MAILGUN_API_KEY`, sending domain and recipient configuration in Vercel.
- Controleer de Google-score periodiek op de officiële profielbestemming; de zwevende link gebruikt
  de bestaande profiel-ID en toont bewust geen vast reviewaantal.
- Rerun Lighthouse against the live canonical host after sufficient CDN warm-up and whenever the visual shell or critical images change.
- Validate representative schema with Google Rich Results Test and Schema.org validator after public deployment.
- Confirm Vercel Web Analytics is enabled for the production project and events appear without personal data.
- Review the legally operative terms with a Belgian legal professional before adding stricter commercial clauses.
