# AB Service SEO Changelog

## 17 September 2026 — officiële Google Places-beoordelingen

- Verifieerde het officiële AB SERVICE-profiel op naam, telefoonnummer en adres en registreerde
  Place ID `ChIJ38_PKjPxw0cRMfEVYieHZDg`.
- Schakelde Places API (New) in binnen het afzonderlijke Google Cloud-project van AB Service en
  beperkte de serverkey tot uitsluitend die API.
- Verving de algemene homepage-reviewtekst door een request-time Google-sectie met de actuele
  score, het actuele aantal en maximaal vijf volledig toegeschreven reviews zodra Google die
  reviewobjecten beschikbaar stelt.
- Google retourneert momenteel wel 5,0 en 35 beoordelingen, maar geen afzonderlijke
  reviewteksten. Daarom toont de site geen gekopieerde of verzonnen reviewcards en linkt zij naar
  het officiële Google Maps-profiel.
- De API-response wordt niet vooraf opgehaald, gecachet of opgeslagen. De sleutel blijft
  server-only in Vercel; privacybeleid, voorwaarden en tests zijn op de Places-integratie
  afgestemd.
- `AggregateRating` en `Review` blijven bewust afwezig uit JSON-LD.

## 16 September 2026 — contactformulier en zwevende contactelementen

- Herstelde het originele ronde WhatsApp-logo als lichte zwevende snelkoppeling met een
  vooraf ingevulde begroeting.
- Herstelde een sluitbare Google-beoordelingspopup met de bestaande profielbestemming en
  de extern bevestigde score van 5,0, zonder een mogelijk verouderd reviewaantal te tonen.
- Hield `AggregateRating` en reviewmarkup uit JSON-LD; de visuele beoordeling linkt rechtstreeks
  naar Google en wordt als klik gemeten zonder persoonsgegevens.
- Stelde `MAILGUN_API_KEY` als versleutelde Vercel-secret in voor Production, Preview en
  Development van beide gekoppelde projecten. De sleutel staat niet in de repository.
- Voegde regressietests toe voor beide contactbestemmingen, scoreweergave en de afwezigheid van
  een onbewezen reviewaantal.

## 16 September 2026 — Phase E geographic architecture

- Added a source-of-truth registry for 285 Flemish and 19 Brussels municipalities.
- Added all ten Antwerp districts; retained the homepage as the sole Antwerpen intent owner.
- Published `/werkgebied`, six regional hubs and eight unique indexable district pages; retained
  Berendrecht-Zandvliet-Lillo as a noindex research route.
- Kept 302 municipality candidates non-routable to prevent scaled doorway content.
- Added an accessible municipality filter while retaining every name in server-rendered HTML.
- Added broad truthful schema coverage for Flanders and Brussels without 304-name stuffing.
- Added navigation, homepage, footer, hub, service and nearby-district internal links.
- Added project-to-area evidence workflow and a separate Google Business Profile service-area plan.
- Expanded automated policy coverage beyond the 25-test baseline, including directory search,
  similarity, score-bound and project-to-area derivation tests.

## 16 September 2026 — Phase E production release

- Merged GitHub pull request `#4` into `main` at commit `73f468e` after both Vercel preview checks passed.
- Completed both connected Vercel production deployments successfully; the primary `ab-service`
  project continues to serve `www.abservice24.be`.
- Passed the post-deploy production crawl for 36 pages and 36 internal links.
- Rechecked all four official geographic sources successfully after deployment.
- Confirmed live 200 responses for the directory, representative hubs, district pages, sitemap
  and robots.
- Confirmed the live sitemap includes all six hubs and the indexable Wilrijk page, excludes the
  noindex Berendrecht-Zandvliet-Lillo route, and that both routes emit the intended robots and
  canonical metadata.

## 16 September 2026 — production release

- Merged GitHub pull request `#2` into `main` at commit `4209f8d`.
- Completed both existing Vercel production builds successfully; the primary `ab-service` deployment serves `www.abservice24.be`.
- Passed the post-deploy production crawl for 20 pages and 20 internal links.
- Verified the public pressure-loss and Bosch pages in Chrome after release.
- Recorded the duplicate `ab-service-n4av` Vercel project for owner review without changing its configuration.

## 16 September 2026 — evidence-first transformation

### Architecture

- Added central business, route, fault-guide, content-backlog and project registries.
- Added explicit `published`, `noindex` and `draft` states.
- Added publication tests preventing draft/noindex leakage into navigation and sitemap.
- Rebuilt the shared layout as a server-first header, footer, breadcrumb and CTA system.

### Content

- Rewrote `/`, `/onderhoud`, `/herstelling`, `/keuring`, `/installaties`, `/installaties/gasketels`, `/installaties/sanitair`, `/contact`, `/faq`, `/over-ons` and the fault-code cluster.
- Added `/tarieven` without invented prices.
- Separated periodic maintenance from first-use inspection.
- Replaced unsafe premium language with current-measures guidance.
- Added conservative gas, CO, water/electrical and reset guidance.
- Removed unsupported 24/7, 60-minute, same-day, certification, review, team, history, brand, location, price, warranty and partnership claims.
- Reduced Vaillant/Bulex codes to a manufacturer-backed set with model warnings and official sources.
- Published Bosch/Junkers guides for a narrowly named Serie -4 scope using the official Bosch codebook and model-documentation links.
- Added `/advies/drukverlies-cv-ketel` with safe checks, model-dependent pressure guidance and an official Bosch source.
- Reintroduced six owner-supplied legacy images through `next/image`, with neutral alt text and visible captions stating they are illustrations rather than customer cases.

### Technical SEO

- Added conservative browser security headers and disabled the framework disclosure header.
- Added unique titles, descriptions, canonicals, Open Graph and Twitter metadata from one registry.
- Added generated Open Graph image output.
- Replaced conflicting `next-sitemap` output with one App Router sitemap.
- Removed fabricated current-date `lastmod` values and non-page sitemap entries.
- Centralized robots rules and canonical host.
- Added verified-only global JSON-LD and visible/schema breadcrumbs.
- Removed AggregateRating, Review and FAQPage schema.
- Corrected 404 metadata and canonical behaviour.

### Local SEO

- Confirmed Antwerp only from the owner prompt; surrounding municipality pages remain drafts.
- Added external-action documentation for Google Business Profile, Search Console, Bing, Apple, citations, reviews, ads/LSA and backlinks.
- Added legitimate review-request and service-area policies.

### Conversion and privacy

- Preserved phone, email, WhatsApp and contact form.
- Added labelled fields, accessible validation, duplicate-submit prevention and truthful status messages.
- Added privacy-safe click/form events; personal fields are filtered from analytics properties.
- Rewrote privacy text to match Mailgun, Vercel hosting and Vercel Analytics.
- Removed unconfigured Plausible and incorrect Google Analytics/Ads claims.

### Performance and accessibility

- Removed the Trust.Reviews widget, animation library and unused client components.
- Replaced the image-heavy homepage with a lightweight CSS-led design while retaining the navy/teal/gold identity.
- Added skip navigation, visible focus, semantic headings, reduced-motion support and compliant touch targets.
- Corrected teal-on-white contrast.
- Reduced homepage Lighthouse transfer from 8.6 MB to 251 KiB and LCP from 31 s to 2.3 s.

### Dependencies and QA

- Upgraded Next.js to 16.3.5 and React/React DOM to 19.3.0.
- Migrated to ESLint flat config and direct ESLint CLI.
- Removed Axios, Framer Motion, Lucide, React Hot Toast, DaisyUI, next-sitemap and next-plausible.
- Updated Mailgun, form-data, PostCSS, Tailwind and Autoprefixer.
- Reduced production audit from 16 advisories, including two critical, to zero.
- Added 25 unit/policy tests, including media-provenance and Bosch/Junkers source guards, plus a rendered production SEO crawler.
- Added desktop/mobile browser QA and repeatable Lighthouse comparisons.
