# Masterprompt requirement status — 10 October 2026

## Scope and interpretation

This ledger reconciles the owner’s original SEO masterprompt (sections **0–112**, 113 numbered
sections) and Phase E (**E1–E34**, 34 numbered sections) with the repository inspected at
`cb4d938` and the October growth implementation. The prompts contain overlapping principles,
conditional requirements, examples, sub-bullets and reporting instructions. Their section counts
are not a denominator for an SEO score or a count of independent tasks. The earlier **90/100**
assessment was an estimate; no counted 100-item acceptance ledger supports it.

Status terms:

- **Implemented in source:** the relevant architecture/content exists; not a claim of current
  production behaviour, indexing, ranking or commercial impact.
- **Partial:** infrastructure or content exists but a substantive requirement remains open.
- **Account/evidence-gated:** requires the correct authenticated account or authoritative business,
  job, customer-permission or measurement evidence.
- **Locally verified:** implementation has passed the stated local checks; production deployment
  and authenticated search/lead measurements remain separate requirements.
- **In progress:** remaining browser, release, production or evidence work.
- **Conditional:** intentionally not expanded because the prompt requires evidence first.

September QA/deployment records are dated historical evidence. October local verification has
now passed: **96/96 tests**, ESLint, a production build producing **90 route outputs**, and the
root's local crawl of **81 registered routes, 92 internal links and 32 assets**. Registry inspection
confirms **79 published routes and 2 noindex routes**; build outputs are not indexable-page counts.
The eight added pages are the advice hub, six guides and maintenance checker. Coverage stays at
304 municipalities. **Production deployment/live verification is still pending.** No search or
qualified-lead improvement is established by these checks.

The source run returned automated HTTP 200 for **42 of 43 unique sources**. Sibelga's official
contact page returned **403** to the automated fetch; the implementing agent manually validated
it using official-web retrieval. This is a documented exception, not an all-green automatic source
audit. The exception must remain visible in release evidence.

## Original masterprompt

| Sections | Requirement cluster | Status at this audit | Evidence and remaining work |
|---|---|---|---|
| 0 | Inspect existing stack and preserve business features | Implemented in source; fresh verification pending | Next.js App Router, existing visual system, contact API, WhatsApp, phone/email and registries retained. October desktop/mobile/API checks remain part of release acceptance. |
| 1–4 | Truthful entity, local relevance, SAB strategy and no duplicate Antwerp intent | Implemented in source; ongoing evidence gate | `content/business.mjs`, evidence policy, served-area registry; homepage owns Antwerp. No second `/loodgieter-antwerpen`. Claims still require source review. |
| 5–7 | Maintenance vs inspection, legal frequency and premiums | Regional content implemented; locally verified | `/onderhoud`, `/keuring`, `/herstelling` retain separate intents. The checker distinguishes Flanders/Brussels, central boilers/separate water heaters, fuel, power and installation changes; source checks and rule/date tests are recorded. Continue official-rule monitoring and production QA. |
| 8–9 | Experience and review accuracy | Implemented; locally tested; live verification pending | Unsupported experience claims stay absent. Hardcoded global score/five-star fallback removed; floating score uses validated current API data or a factual profile link. Regression tests cover mismatch, upstream failure and request limits. |
| 10–12 | Service architecture, priority pages and substantial service content | Implemented in source; ongoing quality review | Core services, six additional service pages, tariffs and contact exist. Fixed-price details remain gated. Shared layouts require meaningful service-specific copy. |
| 13–15 | Locality pages and evidence/publication gates | Partial | Eight district pages contain official geography and different intake text, but all have zero matching local projects/reviews. Municipality candidates remain draft. Unique wording alone does not prove distinct customer value. |
| 16–20 | Brand and fault-code clusters; selective individual-code strategy | Partial | Thirteen commercial brand pages and thirteen named-source guides exist. Most brands cover selected models only. Individual-code pages are conditional on actual intent/demand and source confidence, not a page quota. |
| 21 | Gas/heating safety | Implemented in source; specialist claims gated | Consumer-safe boundaries, model warnings and manufacturer sources exist. Do not invent technician review, recognition or diagnostic certainty. |
| 22–25 | Real project hub, case records and future input model | Partial; job-specific evidence-gated | Six anonymized cases and a gate exist. Generic owner-confirmation text/booleans do not provide an independently auditable job/photo/permission match. Add private evidence references without publishing customer details. |
| 26–28 | Contextual linking, navigation and footer hubs | Implemented for available facts; locality/brand case links evidence-gated | New advice/tool routes are integrated with navigation, homepage, footer and service links. Fault guides link commercial brand/service pages; each case links its verified province hub. Cases have no approved municipality/district or named brand to support those more specific links. Local crawl passes. |
| 29–38 | Distinct intent, metadata, URLs, canonical, robots, sitemap, breadcrumbs and schema | Implemented; locally verified; production pending | New routes pass registry/sitemap/metadata/link checks. Six guides expose organizational Article authorship and actual checked dates; modification dates are emitted for the eight new routes without inventing original publication dates. |
| 39–43 | GBP, SAB address/category rules, citations and genuine review workflow | Account/evidence-gated with documented historical actions | September external-actions document reports verification/submissions/appeal/citation requests. Current approval/category/address state and correction outcomes require exact-owner account checks. No invented reviews or local premises. |
| 44–48 | Authentic expertise, answer-first writing, useful advice and official regulations | Advice implemented and locally verified; first-hand expertise evidence-gated | Six source-bounded guides, advice hub and regional maintenance checker are integrated alongside the existing pressure-loss article. Guides visibly identify AB Service as organizational author and record source-check dates. No invented technician identity/review/recognition. Two articles/month remains conditional guidance, not a quota. |
| 49–52 | Languages, backlinks, external visibility and GBP content | Conditional/account-gated | No automatic translation or fake backlink/publication claim. Language capability, maintained translations, profile updates, real partnerships and earned mentions need evidence/access. |
| 53–57 | Technical audit, crawlability, rendering, Belgian Dutch and useful copy | Implemented and locally verified; production pending | Server-rendered content, `nl-BE`, broader asset/fragment/link-graph checks and registry agreement pass locally. Customer copy replaces SEO-process language; current production crawl/browser verification still required. |
| 58–61 | Contact CTAs, privacy-safe analytics, GSC and measured lead KPIs | Partial; account/data-gated | Click/form events and validation exist. Export analyzer added in October, but no real search export or verified event receipt/conversion baseline is available here. No lead or growth result claimed. |
| 62–64 | Cannibalization, draft states and reusable content components | Implemented in source; search-backed review gated | Registries exclude drafts/noindex routes appropriately; lexical locality similarity tests exist. Query/landing-page evidence is needed to establish actual cannibalization. |
| 65–69 | Performance, truthful image use, genuine project dataset and mobile conversion | Partial; browser/field/job evidence gated | Optimized owner-confirmed WebP variants retained; current local asset crawl passes. Sticky offsets, form error focus and safe tool/contact handoff are implemented with logic tests. Browser/Lighthouse/field checks and job-specific photo evidence are separate requirements. |
| 70–73 | Trust, consistent entity/contact facts and accurate hours | Implemented; live review verification pending | Owner-confirmed contact/24-hour availability retained, fixed score removed and no arrival promise added. Credentials, history, public-office eligibility and fixed pricing remain evidence-gated. |
| 74–78 | Urgency, drain services, air-conditioning, pricing and useful FAQs | Implemented or conditional | Owner-confirmed plumbing/drain scope is published conservatively. Air-conditioning stays noindex. No invented prices, urgent arrival guarantees or unsupported FAQ rich-result promise. |
| 79–84 | Social previews, accessibility, 404, redirects, security and working business features | Partial; locally verified logic/crawl; browser/API/production pending | Canonical/404/asset checks pass; analytics strips query/hash/private values, form validation focuses errors, and maintenance handoff uses approved fragment choices. Project OG metadata still uses the generic global image. Production API/browser checks remain required. Production dependency audit is zero; full dev-tree audit retains nine documented findings with no compatible published fix. |
| 85–88 | Paid search/Bing/Apple/AI clarity and competitor lessons | Documented; account/evidence-gated | External plan exists. No paid campaign, spend, backlink, Bing/Apple configuration or AI visibility uplift is inferred. Official eligibility/current service/account context needed before action. |
| 89–91 | Quality gate, phased execution and conditional publication cadence | Implemented as policy; ongoing | Publication policy and backlog exist. Service coverage does not imply a required indexed locality URL. Preserve evidence gates instead of publishing to meet weekly quotas. |
| 92 | Repository documentation | Partial; reconciliation in progress | Masterplan, inventory, QA, changelog, project guide and external/Phase E documents exist. Current facts, counts, evidence and remaining work must agree; dated historical evidence stays identifiable. |
| 93–98 | Automated tests, build/lint, browser/Lighthouse, rendered HTML and sitemap verification | Local automated checks passed; browser/production pending | 96/96 local tests and lint pass; root build produces 90 outputs, local crawl validates 81 routes/92 links/32 assets. GitHub Actions workflow implements Node 22 install/lint/tests/production-audit/build/local-crawl gates; actual hosted CI run remains unverified. Current browser/Lighthouse/live checks are separate; lab results do not establish field CWV. |
| 99–107 | No empty/hidden/scaled SEO text, fake locations/maps or keyword stuffing | Implemented as policy; editorial review ongoing | No 304-page/service×city publication. Review district/brand pages for actual usefulness rather than trusting different wording or boolean flags. |
| 108–109 | Actual pricing answers and clear business entity | Partial/business-evidence-gated | Conservative quote-factor page exists. Accurate fees, travel/material/weekend policies require owner-approved maintained terms. Phase E broad coverage supersedes the original narrow-territory example. |
| 110–112 | Full acceptance, evidence-backed final report and qualified leads | In progress | This release is not complete until current QA/publication checks pass. Search/lead growth cannot be claimed before correct-account observations and qualified-lead evidence exist. |

## Phase E

| Sections | Requirement cluster | Status | Evidence and remaining work |
|---|---|---|---|
| E1–E3 | Tiered coverage, central data and `/werkgebied` | Implemented in source | Exactly 304 served municipality records, ten districts, published-link-only directory and accessible filtering. |
| E4 | Six substantial, unique province/regional hubs | Customer copy improved; local evidence partial | Six hubs now include customer-oriented regional services/preparation instead of editorial research-status text. Only Antwerp surfaces cases; genuinely distinct regional experience/reviews remain evidence-gated. Local crawl passes. |
| E5–E11 | Complete municipalities and Antwerp districts | Implemented in source | Registry: Antwerpen 67, Limburg 38, Oost-Vlaanderen 55, Vlaams-Brabant 63, West-Vlaanderen 62, Brussels 19; ten Antwerp districts. Official geographic sources recorded. |
| E12 | Brussels language opportunity | Conditional/business-evidence-gated | Dutch hub exists. A French site/claim requires genuine operational support and maintained quality translations. |
| E13–E15 | Seven-factor prioritization, metro and major-city opportunities | Partial/data-gated | Bounded scorer exists. Unresearched inputs/scores stay `null`; no search volumes or competition scores are fabricated. Candidates are provisional research priorities. |
| E16–E21 | No mass publication, quality gates, URLs and useful geographic hubs | Implemented policy; locality quality partial | 302 municipality candidates remain non-routable drafts; eight districts published, one district noindex, Antwerp resolves to `/`. Lexical checks do not replace substantive local value review. |
| E22–E24 | Broad schema, GBP separation and local-pack limits | Implemented in source/documentation; GBP account-gated | Schema uses broad Flanders/Brussels areas rather than 304 entries. Website territory does not prove local-pack reach or 304 offices. Current GBP approvals must be checked separately. |
| E25–E26 | Coverage UI and municipality search | Implemented in source; current browser check pending | Server-rendered directory and client filter exist; September browser report is historical. |
| E27 | Project-driven local evidence/priority update | Partial/job-evidence-gated | `deriveAreaEvidence` updates matches and bounded inputs, but current six cases have no municipality/district match; full score remains null until other research is evidenced. |
| E28–E30 | Reciprocal project/area/province links and central service authority | Province reciprocity implemented; specific locality/brand evidence-gated | Hubs surface matching cases and central services; case detail pages now link their verified province hub and service. Approved municipality/district and named brand facts are absent, so those links are not invented. No duplicated service×province matrix. |
| E31–E33 | Rational expansion, true territory and no fake branches | Implemented as policy; data-driven expansion gated | Territory is owner confirmed; priorities reflect provisional editorial judgement. No automatic local presence, arrival, ranking or office claim. |
| E34 | Full coverage/draft/evidence/next-20 report | Implemented historical report; ongoing data updates | `SERVICE_AREA_REGISTRY.md` and `PHASE_E_SERVICE_AREA_REPORT.md` include the full registry and next-20 research shortlist. Search Console opportunity remains unavailable. |

## What can advance without new business facts

The stale-rating fix, customer copy, contextual links, visible organizational authorship, source-check
dates, regional tool, six guides and expanded automated checks are implemented and integrated.
Complete browser/release/live verification and analyze real exports when supplied. Keep specialist
review claims, new locality pages and project-specific facts gated by genuine evidence. Record
publication evidence after the actual release; passing local checks is not full masterprompt completion.

## What remains gated

Correct-owner GSC/GBP/analytics access; actual query/page/date/filter observations; verified lead
outcomes; technician recognition and scope; maintained prices/policies; job/photo/permission
references; genuine project-specific reviews; additional language or F-gas scope; approved external
profile/citation/partnership changes. Existing owner confirmations remain valid authority; this
ledger does not request routine reapproval of already authorized work.
