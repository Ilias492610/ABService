# AB Service SEO Masterplan

## Objective

Build local search visibility and qualified enquiries through useful, verifiable pages rather than page volume. The primary entity is AB Service, a plumbing, sanitary and heating service business serving Antwerp. The canonical website is `https://www.abservice24.be`.

## Architecture

- `content/business.mjs` is the source of truth for verified public identity and contact facts.
- `content/site-content.mjs` controls route metadata, publication state, navigation and sitemap eligibility.
- `content/fault-guides.mjs` separates manufacturer-backed guides from withheld brand content.
- `content/content-backlog.mjs` records locality, commercial-brand and unsupported-service drafts.
- `content/projects.mjs` defines a strict evidence gate for future case studies.
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
| Repair | cv-ketel herstelling; geen warm water; drukverlies | `/herstelling` |
| Inspection | keuring eerste ingebruikname; gewijzigde cv-installatie | `/keuring` |
| Installation | verwarming en sanitair installeren | `/installaties` |
| Gas boiler | gasketel plaatsen/vervangen Antwerpen | `/installaties/gasketels` |
| Sanitary | sanitaire installatie; loodgieterswerk Antwerpen | `/installaties/sanitair` |
| Pricing | loodgieter tarieven; offertefactoren | `/tarieven` |
| Contact | AB Service contacteren | `/contact` |
| Questions | onderhoud, keuring, herstel, prijs | `/faq` |
| Fault guidance | cv-ketel foutcodes | `/foutcodes` |
| Manufacturer guidance | Vaillant/Bulex foutcode | `/foutcodes/vaillant`, `/foutcodes/bulex` |

## Priority and current status

### Priority 1 — complete

- Rewrite core commercial pages in Belgian Dutch.
- Remove unsupported availability, response-time, review, certification, price, premium, brand, region, team and history claims.
- Separate maintenance, first-use inspection, repair and installation language.
- Publish truthful `/tarieven` without invented prices.
- Centralize metadata, canonicals, schema, sitemap, navigation and business facts.
- Remove heavy review widget and unnecessary client animation code.
- Upgrade to Next.js 16.3.5 and a zero-production-advisory dependency tree.
- Add automated content policy, validation, schema and crawl tests.

### Priority 2 — owner evidence required

- Confirm the exact Google Business Profile URL and add a lightweight outbound link.
- Confirm technician recognition numbers and scope before publishing them.
- Confirm business hours, service-area municipalities and whether customers are served at a physical address.
- Confirm active brands and air-conditioning/F-gas capability.
- Confirm an actual pricing policy before publishing amounts.
- Supply authentic completed-project evidence and consented photography.

### Priority 3 — publish only after evidence gates pass

- First real project/case study and projects hub.
- One unique locality page at a time, starting with the strongest evidenced municipality.
- Commercial brand-service pages for brands supported by work evidence.
- Additional service pages where operational scope is confirmed.
- Helpful advisory articles based on real customer questions and technician expertise.

## Internal-link architecture

- Home routes users to the five confirmed services and pricing.
- Maintenance links to inspection, repair and tariffs.
- Inspection links to maintenance and installation.
- Installation hub links to gas boilers, sanitary work and tariffs.
- Fault-code hub links only to manufacturer-backed guides; detail guides link to repair/contact.
- FAQ links back to the relevant service explanation.
- Footer provides a compact service and knowledge hub on every page.

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
- Before publishing a project, locality, brand or new service: rerun the evidence and content quality gates.

## Next actions

Follow `LOCAL_SEO_EXTERNAL_ACTIONS.md` for account-level work. Follow `PROJECT_CONTENT_GUIDE.md` for genuine project collection. Keep draft candidates in `docs/seo/content-gap-backlog.md` until the listed evidence is available.
