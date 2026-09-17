# AB Service SEO Masterplan

## Objective

Build local search visibility and qualified enquiries through useful, verifiable pages rather than page volume. The primary entity is AB Service, an Antwerp-market plumbing, sanitary and heating service business with owner-confirmed coverage throughout Flanders and Brussels. The canonical website is `https://www.abservice24.be`.

## Architecture

- `content/business.mjs` is the source of truth for verified public identity and contact facts.
- `content/site-content.mjs` controls route metadata, publication state, navigation and sitemap eligibility.
- `content/fault-guides.mjs` separates manufacturer-backed guides from withheld brand content.
- `content/content-backlog.mjs` records locality drafts and future unsupported content.
- `content/additional-services.mjs` is the source of truth for six owner-confirmed plumbing services.
- `content/brand-services.mjs` is the source of truth for thirteen owner-confirmed serviced boiler brands.
- `content/projects.mjs` contains the publication gate and six owner-confirmed, anonymized practice cases.
- `content/service-area-scoring.mjs` validates the bounded seven-factor priority score.
- `content/service-areas.mjs` is the source of truth for 304 municipalities, ten Antwerp districts and six regional hubs.
- `content/media.mjs` records the owner-confirmed image archive and optimized web variants.
- `libs/seo-data.mjs` builds metadata and sitemap entries.
- `libs/schema-data.mjs` builds verified global and breadcrumb schema.
- `libs/contact-validation.mjs` validates form data on client and server.
- `libs/analytics.mjs` limits event names and strips personal data.
- `scripts/seo-audit.mjs` crawls rendered production output and fails on technical SEO regressions.

## Publication model

- `published`: indexable, sitemap-eligible and linkable.
- `noindex`: routable for continuity, followed by crawlers, excluded from sitemap and navigation.
- `draft`: data only; no public route, navigation link or sitemap entry.

The policy is enforced in tests. A content idea does not become indexable merely because a route or template exists.

## Search-intent map

| Cluster | Primary intent | Published destination |
|---|---|---|
| Local entity | loodgieter Antwerpen; verwarming Antwerpen | `/` |
| Maintenance | onderhoud cv-ketel; wettelijke frequentie | `/onderhoud` |
| Repair | cv-ketel herstelling; geen warm water | `/herstelling` |
| Pressure guidance | drukverlies cv-ketel; cv druk daalt | `/advies/drukverlies-cv-ketel` |
| Inspection | keuring eerste ingebruikname; gewijzigde cv-installatie | `/keuring` |
| Installation | verwarming en sanitair installeren | `/installaties` |
| Gas boiler | gasketel plaatsen/vervangen Antwerpen | `/installaties/gasketels` |
| Sanitary | sanitaire installatie; loodgieterswerk Antwerpen | `/installaties/sanitair` |
| Service hub | loodgietersdiensten; verwarmingsdiensten | `/diensten` |
| Additional plumbing | lekdetectie, waterlek, ontstopping, boiler, leidingen, badkamerrenovatie | six `/diensten/{slug}` pages |
| Brand service | onderhoud en herstelling per ketelmerk | `/merken` and thirteen `/merken/{merk}` pages |
| Projects | uitgevoerd loodgieters- en verwarmingswerk | `/projecten` and six anonymized cases |
| Pricing | loodgieter tarieven; offertefactoren | `/tarieven` |
| Contact | AB Service contacteren | `/contact` |
| Questions | onderhoud, keuring, herstel, prijs | `/faq` |
| Fault guidance | cv-ketel foutcodes | `/foutcodes` |
| Manufacturer guidance | Vaillant/Bulex/Bosch/Junkers foutcode | `/foutcodes/vaillant`, `/foutcodes/bulex`, `/foutcodes/bosch`, `/foutcodes/junkers` |
| Complete coverage | municipality lookup and service territory | `/werkgebied` |
| Regional coverage | province/region orientation | six `/werkgebied/{regio}` hubs |
| Antwerp districts | district-specific plumbing intent | `/` for Antwerpen; eight indexable district pages; Berendrecht-Zandvliet-Lillo noindex |

## Geographic architecture

- All 304 municipalities are registered as served, but only useful destinations are links.
- `/werkgebied` provides the customer-facing, filterable directory.
- Six hubs explain geographic planning and link back to authoritative central service pages.
- The homepage retains the “loodgieter Antwerpen” intent; no duplicate district-Antwerpen URL exists.
- Eight other Antwerp districts have unique, indexable pages grounded in official geographic
  context. Berendrecht-Zandvliet-Lillo remains noindex pending URL/search-intent research.
- 302 municipality candidates remain non-routable drafts pending evidence/search opportunity.
- Global schema uses only the broad `Vlaams Gewest` and `Brussels Hoofdstedelijk Gewest` areas.
- Website coverage is not copied into Google Business Profile; see `GOOGLE_BUSINESS_SERVICE_AREA_PLAN.md`.

## Priority and current status

### Priority 1 — complete

- Rewrite core commercial pages in Belgian Dutch.
- Remove unsupported availability, response-time, certification, price, premium, partnership, team and history claims.
- Separate maintenance, first-use inspection, repair and installation language.
- Publish truthful `/tarieven` without invented prices.
- Centralize metadata, canonicals, schema, sitemap, navigation and business facts.
- Remove heavy review widget and unnecessary client animation code.
- Upgrade to Next.js 16.3.5 and a zero-production-advisory dependency tree.
- Add automated content policy, validation, schema and crawl tests.
- Publish source-bounded Bosch/Junkers guidance from official Bosch documentation.
- Publish a technically conservative pressure-loss guide with a manufacturer source.
- Reuse owner-confirmed images as lightweight WebP assets with descriptive alternative text.
- Publish the owner-confirmed brand-service cluster, six additional service pages and six anonymized practice cases.

### Priority 2 — remaining owner facts required

- Keep the verified Google Business Profile destination and request-time Places integration operational.
- Confirm technician recognition numbers and scope before publishing them.
- Confirm business hours, routine GBP service areas and whether customers are served at a physical address.
- Confirm air-conditioning/F-gas capability before indexing that service.
- Confirm an actual pricing policy before publishing amounts.

### Priority 3 — future expansion only after evidence gates pass

- One additional municipality page at a time, starting with the strongest evidenced/search-backed opportunity.
- Further advisory articles based on real customer questions and technician expertise.

## Internal-link architecture

- Home routes users to core and additional services, projects, brands and pricing.
- Maintenance links to inspection, repair and tariffs.
- Inspection links to maintenance and installation.
- Installation hub links to gas boilers, sanitary work and tariffs.
- Fault-code hub links only to manufacturer-backed guides; detail guides link to repair/contact.
- Repair, maintenance and fault-code pages link to the pressure-loss decision guide.
- FAQ links back to the relevant service explanation.
- Footer provides compact service, project, brand and knowledge links on every page.
- `/diensten` distributes authority to eleven active service pages.
- `/merken` links to thirteen independent-service pages and each brand page links to its fault guide.
- `/projecten` links to six cases and each case returns to contact.
- Navigation, homepage and footer lead to `/werkgebied`; hubs lead to services and districts.
- District pages lead to nearby districts, the Antwerp hub, tariffs and central service authorities.

## Content quality gate

Before publication, verify intent, unique value, factual accuracy, commercial relevance, internal links, CTA, metadata, canonical, schema, evidence and spam risk. Reject pages that rely on swapped municipality names, unsupported brand affiliation, fake project detail or repeated generic text.

## Measurement framework

### Visibility

- Search Console impressions, clicks, CTR and average position by non-brand query and landing page.
- Indexed canonical pages versus submitted sitemap pages.
- Queries containing maintenance, repair, inspection, installation, sanitary and pricing intent.

### Local

- Google Business Profile discovery searches, calls, website clicks and direction requests when applicable.
- Visibility for genuine service-plus-location queries.
- Citation consistency and review acquisition rate without incentives or gating.

### Leads

- Telephone, email and WhatsApp clicks.
- Contact-form starts, successful submissions and failures.
- Lead quality by service type; never send personal data to analytics.

### Content

- Entrance pages and assisted conversions by cluster.
- Fault-guide engagement leading to repair contact.
- Future project and locality traffic only after those pages pass evidence gates.

## Review cadence

- Monthly: Search Console coverage, queries, broken links, form delivery and analytics events.
- Quarterly: service facts, official legal guidance, privacy implementation, dependencies and content gaps.
- After each release: tests, lint, build, production crawl, schema parse, desktop/mobile inspection and representative Lighthouse runs.
- Before publishing a locality, additional project, brand or service: rerun the evidence and content quality gates.

## Next actions

The on-site expansion is complete. The next phase is the account-level work in `LOCAL_SEO_EXTERNAL_ACTIONS.md`. Use `PROJECT_CONTENT_GUIDE.md` when adding future cases and keep locality or air-conditioning candidates in `docs/seo/content-gap-backlog.md` until their evidence is available.
