# AB Service SEO Masterplan

## Current authorized batch — WP00–WP03

The owner-authorized first batch is being executed on `codex/seo-wp00-wp03`.
WP00's source decisions/business brief and WP02's correct-owner Search Console baseline are
verified. WP01's real inbox test and local contact hardening pass; dashboard event ingestion,
commercial outcomes and actual business retention remain open. WP03's native-data gap table,
four presets, five briefs/quick-win reviews, journey tables, actual top-ten research and combined
audit are delivered; unavailable genuine customer-question data remain an explicit dependency.
No other package or whole-masterprompt completion percentage is inferred.

Evidence: [business brief](docs/seo/business-brief.md), [receipt report](docs/seo/wp01-contact-receipt-report.md),
[current account baseline](docs/seo/2026-10-10-search-baseline.md),
[research report](docs/seo/wp03-research-report.md) and [first-five briefs](docs/seo/briefs/wp03-first-five.md).
Publication and exact live checks are recorded separately in the QA report/changelog.

## Complete source-based follow-up plan

The current exhaustive follow-up is [Volledig SEO meesterplan voor AB Service](docs/superpowers/plans/2026-10-10-complete-source-seo-masterplan.md),
with four integral detail appendices covering the original masterprompt, Phase E, all four pasted
articles, the additional user message and the publicly readable Founder Guide previews. It separates
existing implementation, verified release behaviour, open work, evidence/account conditions and
explicitly rejected advice. This architecture overview is not a claim that every article detail has
already been executed. Full paid chapters and missing endings were not read or reconstructed.

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
- `content/advice-guides.mjs` holds six source-bound customer guides; `/advies` links all seven advice articles.
- `content/core-sources.mjs` shares pressure, technician-recognition and current support citations with consumer pages.
- `/tools/onderhoudscheck` gives an account-free regional maintenance planning result and optional contact handoff.
- `libs/seo-data.mjs` builds metadata and sitemap entries.
- `libs/social-preview.mjs` and `/social/[...slug]` produce page-specific, static 1200×630 previews
  for the 78 published non-home routes; assets are noindex and excluded from the sitemap.
- `libs/schema-data.mjs` builds verified global, breadcrumb and organizational-author Article schema.
- `libs/contact-validation.mjs` validates form data on client and server.
- `libs/analytics.mjs` limits event names and strips personal data.
- `scripts/seo-audit.mjs` crawls rendered production output and fails on technical SEO regressions.
- `scripts/source-audit.mjs` checks the shared 48-URL primary-source inventory; documented access exceptions remain visible.
- `scripts/gsc-analysis.mjs` analyzes actual local exports without manufacturing query/page joins.
- `scripts/indexnow.mjs` previews explicit published URLs offline and sends only with `--send`,
  after checking the public root proof. Use it for genuine released changes, not all-site historical
  submissions, cosmetic edits or indexing promises. It does not configure a Google/Bing account.
- `.github/workflows/seo-quality.yml` runs repeatable tests, lint, build, production dependency and rendered-crawl checks.
- Node24.x LTS is pinned in package/lock root, CI and `.nvmrc`, avoiding implicit production
  major upgrades. Actual bundled24.19 suite114/lint/build/crawl, hosted24.21 CI38063158088 and
  matching manual productionNode24.x passed forff3665b. Exact-release evidence is in theQA report.

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
| Problem advice | cold radiator, missing hot water, water meter, boiler discharge, blocked drain and maintenance attest | six additional `/advies/{slug}` articles |
| Maintenance planning | when is maintenance needed in Flanders/Brussels | `/tools/onderhoudscheck` |
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

### Priority 1 — implemented architecture, ongoing verification

- Rewrite core commercial pages in Belgian Dutch.
- Remove unsupported response-time, certification, price, premium, partnership, team and history claims; retain owner-confirmed 24/7 availability.
- Separate maintenance, first-use inspection, repair and installation language.
- Publish truthful `/tarieven` without invented prices.
- Centralize metadata, canonicals, schema, sitemap, navigation and business facts.
- Remove heavy review widget and unnecessary client animation code.
- Upgrade to Next.js 16.3.8; 10 October audit reports zero production advisories and nine development-tree findings without a compatible patch (not a permanent zero-vulnerability promise).
- Add automated content policy, validation, schema and crawl tests.
- Publish source-bounded Bosch/Junkers guidance from official Bosch documentation.
- Publish a technically conservative pressure-loss guide with a manufacturer source.
- Reuse owner-confirmed images as lightweight WebP assets with descriptive alternative text.
- Publish the owner-confirmed brand-service cluster, six additional service pages and six anonymized practice cases.
- Publish the source-bound advice hub, six additional articles and region-aware maintenance check.
- Replace the popup's stale hardcoded review score with request-time data or a neutral profile fallback.
- Strip analytics URL query/fragment data and use only predefined event codes.
- Expand the Remeha guide from Avanta to the separately scoped historical Calenta 15s/25s/28c/35s/40c
  tables; preserve different meanings and distinguish E faults from Su blocking states.
- Normalize fault-search punctuation without merging model meanings or removing code digits.

### Priority 2 — remaining owner facts required

- Keep the verified Google Business Profile destination and request-time Places integration operational.
- Confirm technician recognition numbers and scope before publishing them.
- Owner confirmed 24/7 hours; verify the current GBP approval, routine GBP service areas and whether customers are served at a physical address.
- Confirm air-conditioning/F-gas capability before indexing that service.
- Confirm an actual pricing policy before publishing amounts.
- Obtain job-specific private evidence/photo/permission references and current correct-account search/lead observations.

### Priority 3 — future expansion only after evidence gates pass

- One additional municipality page at a time, starting with the strongest evidenced/search-backed opportunity.
- Further advisory articles based on real customer questions and technician expertise.

## Internal-link architecture

- Home routes users to core and additional services, projects, brands and pricing.
- Maintenance links to inspection, repair and tariffs.
- Inspection links to maintenance and installation.
- Installation hub links to gas boilers, sanitary work and tariffs.
- Fault-code hub links only to manufacturer-backed guides; detail guides link to corresponding independent brand service, repair, maintenance and useful advice.
- Repair, maintenance and fault-code pages link to the pressure-loss decision guide.
- FAQ links back to the relevant service explanation.
- Footer provides compact service, project, brand and knowledge links on every page.
- `/diensten` distributes authority to eleven active service pages.
- `/merken` links to thirteen independent-service pages and each brand page links to its fault guide.
- `/projecten` links to six cases; detail pages return to relevant services, the known province and contact without inventing a locality.
- Advice guides connect symptoms to relevant services; contextual CTAs preselect the service in the contact form.
- Navigation and footer link the advice hub and maintenance checker; the checker transfers only an optional coded preparation summary through a consumed URL fragment.
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

## October evidence and continued work

See `docs/seo/2026-10-10-masterprompt-status.md` for requirement-level partial/account-gated work,
`docs/seo/2026-10-10-search-baseline.md` for missing metrics and export analysis, and the QA report
for dated release observations. Do not represent the previous 90/100 estimate as a counted checklist
or claim every requirement is complete. Published route count is not Google's indexed count.
The owner requested ongoing improvement; a daily 09:00 thread follow-up is registered in the app.
Local scheduled runs require the computer and app to remain available.
- Before publishing a locality, additional project, brand or service: rerun the evidence and content quality gates.

## Next actions

The current source-bound releases are integrated; improvement remains ongoing rather than a
finished SEO score. Advance independently on useful source-backed content/runtime quality and the
correct-owner account work in `LOCAL_SEO_EXTERNAL_ACTIONS.md`. Next manufacturer candidate:
Calenta Ace-Matic permanent E table, using the current Belgian product page/manual rather than
merging the legacy or online overview; root source validation and fresh acceptance are still required.
The primary Vercel Git-provider `git_info_fail` onff3665b is a recorded incident, not a current
publication blocker: subsequent7474d3c passed both automatic Vercel checks and serveswww from a
matching Git deployment. Its cause was not established. Monitor each future exact-commit result;
never spoof status or silently change account permissions to hide an error.
Use `PROJECT_CONTENT_GUIDE.md` for future cases and keep locality/air-conditioning candidates in
`docs/seo/content-gap-backlog.md` until their evidence is available. No new campaign or all-site
IndexNow notification is authorized merely by this backlog.
