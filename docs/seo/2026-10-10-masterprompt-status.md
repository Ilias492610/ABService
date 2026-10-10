# Masterprompt requirement status — 10 October 2026

## Scope and interpretation

Latest refinement status: 113/113 tests, lint/build, local crawl 81/92/110 and production audit zero
pass. Seventy-eight static social cards replace the generic preview on published non-home pages,
including projects; no customer route count is added. Remeha has 59 separately model-scoped rows,
and a guarded offline-default IndexNow CLI is ready for the actual released fault-guide changes.
Independent review passed; live CI/deployment/proof/notification are separately recorded after release.
These 113 tests are unrelated to the masterprompt's 113 numbered sections and are not a completion score.

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
- **Live verified:** the stated production check passed for the identified release; not proof of
  indexing, ranking, field performance, analytics receipt or lead outcomes.
- **In progress:** remaining publication/verification of newer source changes or evidence work.
- **Conditional:** intentionally not expanded because the prompt requires evidence first.

September QA/deployment records are dated historical evidence. October local verification has
passed: ESLint, a production build producing **90 route outputs**, and the root's local crawl of
**81 registered routes, 92 internal destinations and 32 assets**. The newest local source
passes **98/98 tests**, lint and a zero-vulnerability production dependency audit. These include
the actual rendered-HTML review-star ARIA regression and an expanded cited-source inventory test.
Its build (90 outputs), local/live crawls and publication are verified for `06d8464`, separately
from earlier releases. Registry inspection
confirms **79 published routes and 2 noindex routes**; build outputs are not indexable-page counts.
The eight added pages are the advice hub, six guides and maintenance checker. Coverage stays at
304 municipalities.

Release **`95add97`** was pushed to `main`; both Vercel deployments succeeded. The primary
deployment is **`dpl_23D51jTVozBeCpgY2v5EbSYmST39`**, serving `https://www.abservice24.be`.
The root's live crawl passed for **81 routes, 92 internal destinations and 32 assets**. Live browser
checks passed for tool/privacy/invalid-date/contact handoff, no overflow and zero JavaScript
errors; no contact POST was sent. Ten intercepted/aborted analytics POSTs contained no personal
parameters or entered date, and the real analytics SDK returned HTTP 200. This verifies payload
construction and SDK loading, not event ingestion or email receipt.

The follow-up **`6e161cb`** repair is deployed: both Vercel deployments succeeded, and primary
**`dpl_GWMDovTHqDS8qbPzGGPZfkhMexq5`** has the `www` alias ready. Hosted Linux GitHub run
**38057407278** succeeded on exact head **`6e161cb9824042988b77bc6837e9cd72d7065bda`**, including
`npm ci`, lint, tests, production audit, build and crawl. The initial `95add97` run failed at `npm ci`
because two optional `@emnapi` lock entries were missing; the successful repair run closes that
release's CI gate. The subsequent source refresh `06d8464` passed every hosted Linux gate in
run **38057894793** and both Vercel checks; primary **`dpl_73Tpn3AZ3d6VX1NWnxVGUZs79eQm`**
was confirmed Ready with the `www` alias. Its live crawl passed 81/92/32, and mobile gasketel
rendering confirmed the current premium sources and scoped copy without overflow.

Current live mobile Lighthouse scores are tool **99/100/100/100** and repaired homepage
**99/100/100/100** (performance/accessibility/best practices/SEO). The first homepage run was
**100/96/100/100** and found an improperly named review-star span; after the role fix, live ARIA
checks and accessibility passed. Root also tested `/werkgebied` at 390 px: 314 initial areas,
one H1, Gent returning one real result, and an invented query returning zero with a warning and
live status, without overflow. No search or qualified-lead improvement is established by these checks.

The newest **local** cited-source audit covers **47 unique URLs: 46 HTTP 200 and one Sibelga
HTTP 403**. It includes core pressure/recognition citations and two current premium/support
sources replacing an outdated webinar reference. Those updates are now published in `06d8464`.
The earlier 43-source inventory returned 42 HTTP 200. Sibelga's official contact page
was manually validated using official-web retrieval; that documented automatic-fetch exception
remains visible, not an all-green source audit.

## Original masterprompt

| Sections | Requirement cluster | Status at this audit | Evidence and remaining work |
|---|---|---|---|
| 0 | Inspect existing stack and preserve business features | Implemented; stated live checks passed | Next.js App Router, existing visual system, contact API, WhatsApp, phone/email and registries retained. October tool/contact-flow, mobile overflow and JavaScript checks passed; no contact POST or email-delivery test was performed. |
| 1–4 | Truthful entity, local relevance, SAB strategy and no duplicate Antwerp intent | Implemented in source; ongoing evidence gate | `content/business.mjs`, evidence policy, served-area registry; homepage owns Antwerp. No second `/loodgieter-antwerpen`. Claims still require source review. |
| 5–7 | Maintenance vs inspection, legal frequency and premiums | Regional content and source refresh published; stated checks passed | `/onderhoud`, `/keuring`, `/herstelling` retain separate intents. The checker distinguishes Flanders/Brussels, central boilers/separate water heaters, fuel, power and installation changes. Live invalid-date/contact-handoff checks passed; current premium links and scoped copy are live-verified in `06d8464`. Continue official-rule monitoring. |
| 8–9 | Experience and review accuracy | Implemented; live data and accessibility repair verified | Unsupported experience claims stay absent. Hardcoded global score/five-star fallback removed; live API returned Google 5.0 from 44 ratings with no-store handling and a single observed fetch. Individual review texts were not returned upstream, so the page uses an honest fallback. Regression tests cover mismatch, upstream failure and request limits. Review-star role correction passes the SSR regression and live accessibility recheck. |
| 10–12 | Service architecture, priority pages and substantial service content | Implemented in source; ongoing quality review | Core services, six additional service pages, tariffs and contact exist. Fixed-price details remain gated. Shared layouts require meaningful service-specific copy. |
| 13–15 | Locality pages and evidence/publication gates | Partial | Eight district pages contain official geography and different intake text, but all have zero matching local projects/reviews. Municipality candidates remain draft. Unique wording alone does not prove distinct customer value. |
| 16–20 | Brand and fault-code clusters; selective individual-code strategy | Partial | Thirteen commercial brand pages and thirteen named-source guides exist. Most brands cover selected models only. Individual-code pages are conditional on actual intent/demand and source confidence, not a page quota. |
| 21 | Gas/heating safety | Implemented in source; specialist claims gated | Consumer-safe boundaries, model warnings and manufacturer sources exist. Do not invent technician review, recognition or diagnostic certainty. |
| 22–25 | Real project hub, case records and future input model | Partial; job-specific evidence-gated | Six anonymized cases and a gate exist. Generic owner-confirmation text/booleans do not provide an independently auditable job/photo/permission match. Add private evidence references without publishing customer details. |
| 26–28 | Contextual linking, navigation and footer hubs | Implemented and live-crawled for available facts; locality/brand case links evidence-gated | New advice/tool routes are integrated with navigation, homepage, footer and service links. Fault guides link commercial brand/service pages; each case links its verified province hub. Cases have no approved municipality/district or named brand to support those more specific links. Local and live crawls pass. |
| 29–38 | Distinct intent, metadata, URLs, canonical, robots, sitemap, breadcrumbs and schema | Implemented; local and live crawl verified | New routes pass registry/sitemap/metadata/link checks. Six guides expose organizational Article authorship and actual checked dates; modification dates are emitted for the eight new routes without inventing original publication dates. Actual Google indexing/canonical decisions remain account-gated. |
| 39–43 | GBP, SAB address/category rules, citations and genuine review workflow | Account/evidence-gated with documented historical actions | September external-actions document reports verification/submissions/appeal/citation requests. Current approval/category/address state and correction outcomes require exact-owner account checks. No invented reviews or local premises. |
| 44–48 | Authentic expertise, answer-first writing, useful advice and official regulations | Advice published and live-crawled; first-hand expertise evidence-gated | Six source-bounded guides, advice hub and regional maintenance checker are integrated alongside the existing pressure-loss article. Guides visibly identify AB Service as organizational author and record source-check dates. No invented technician identity/review/recognition. Two articles/month remains conditional guidance, not a quota. |
| 49–52 | Languages, backlinks, external visibility and GBP content | Conditional/account-gated | No automatic translation or fake backlink/publication claim. Language capability, maintained translations, profile updates, real partnerships and earned mentions need evidence/access. |
| 53–57 | Technical audit, crawlability, rendering, Belgian Dutch and useful copy | Implemented; stated local/live/hosted release checks passed | Server-rendered content, `nl-BE`, broader asset/fragment/link-graph checks and registry agreement pass locally and in the live crawl. Customer copy replaces SEO-process language. Representative browser checks, repair release's hosted Linux CI and live review-star recheck passed. Newer source refresh has a separate publication gate. |
| 58–61 | Contact CTAs, privacy-safe analytics, GSC and measured lead KPIs | Live payload/contact-flow checks passed; receipt and search/outcome data gated | Click/form events and validation exist. Browser checks inspected ten aborted analytics POSTs without personal/date parameters; SDK loaded with HTTP 200 and zero contact POSTs were sent. This is not verified analytics ingestion or email receipt. Export analyzer exists, but no real search export or conversion baseline is available. No lead or growth result claimed. |
| 62–64 | Cannibalization, draft states and reusable content components | Implemented in source; search-backed review gated | Registries exclude drafts/noindex routes appropriately; lexical locality similarity tests exist. Query/landing-page evidence is needed to establish actual cannibalization. |
| 65–69 | Performance, truthful image use, genuine project dataset and mobile conversion | Current live lab/browser checks passed; field/job evidence gated | Optimized owner-confirmed WebP variants retained; local/live asset crawls pass. Sticky offsets, form error focus and safe tool/contact handoff have logic tests and live browser checks. Current mobile Lighthouse results are recorded above and in the baseline; they do not establish field CWV. Job-specific photo evidence remains separate. |
| 70–73 | Trust, consistent entity/contact facts and accurate hours | Implemented; current live review data observed | Owner-confirmed contact/24-hour availability retained, fixed score removed and no arrival promise added. Live score/count was 5.0/44; unavailable individual texts are not invented. Credentials, history, public-office eligibility and fixed pricing remain evidence-gated. |
| 74–78 | Urgency, drain services, air-conditioning, pricing and useful FAQs | Implemented or conditional | Owner-confirmed plumbing/drain scope is published conservatively. Air-conditioning stays noindex. No invented prices, urgent arrival guarantees or unsupported FAQ rich-result promise. |
| 79–84 | Social previews, accessibility, 404, redirects, security and working business features | Current refinements locally verified; prior live checks passed | Canonical/404/asset checks pass; analytics strips private values, form errors focus correctly and maintenance handoff uses approved choices. No contact POST in browser QA. Homepage accessibility is 100 in the stated prior live lab. All 78 non-home published pages now have distinct, independently inspected static previews, including six cases; assets stay noindex/out of sitemap. Production audit zero; nine documented dev findings remain without a compatible complete fix. New preview release requires its separate live gate. |
| 85–88 | Paid search/Bing/Apple/AI clarity and competitor lessons | Documented; account/evidence-gated | External plan exists. No paid campaign, spend, backlink, Bing/Apple configuration or AI visibility uplift is inferred. Official eligibility/current service/account context needed before action. |
| 89–91 | Quality gate, phased execution and conditional publication cadence | Implemented as policy; ongoing | Publication policy and backlog exist. Service coverage does not imply a required indexed locality URL. Preserve evidence gates instead of publishing to meet weekly quotas. |
| 92 | Repository documentation | Release observations reconciled; ongoing | Masterplan, inventory, QA, changelog, project guide and external/Phase E documents exist. This ledger and baseline distinguish initial release, successful repair and published source refresh. Dated historical evidence stays identifiable. |
| 93–98 | Automated tests, build/lint, browser/Lighthouse, rendered HTML and sitemap verification | Stated local/live/hosted checks passed | Latest suite 98/98, lint/build/crawls and production audit zero. Hosted Linux runs 38057407278 and 38057894793 passed all gates on their exact commits. Both Vercel source-refresh deployments and live crawl/mobile check passed; repaired homepage accessibility is 100. Lab results do not establish field CWV. |
| 99–107 | No empty/hidden/scaled SEO text, fake locations/maps or keyword stuffing | Implemented as policy; editorial review ongoing | No 304-page/service×city publication. Review district/brand pages for actual usefulness rather than trusting different wording or boolean flags. |
| 108–109 | Actual pricing answers and clear business entity | Partial/business-evidence-gated | Conservative quote-factor page exists. Accurate fees, travel/material/weekend policies require owner-approved maintained terms. Phase E broad coverage supersedes the original narrow-territory example. |
| 110–112 | Full acceptance, evidence-backed final report and qualified leads | Partial; authenticated outcomes and business evidence open | October advice/tool, repair and source-refresh releases are live and passed their stated checks. Full masterprompt completion is not established. Search/lead growth cannot be claimed before correct-account observations and qualified-lead evidence exist. |

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
| E25–E26 | Coverage UI and municipality search | Implemented; current live browser check passed | Root tested /werkgebied at 390 px: 314 initial areas, one H1, Gent returning one actual result with live status, and an invented query returning zero with warning/status; no overflow. The 314 UI areas are 304 municipalities plus ten districts, not 314 indexed locality pages. |
| E27 | Project-driven local evidence/priority update | Partial/job-evidence-gated | `deriveAreaEvidence` updates matches and bounded inputs, but current six cases have no municipality/district match; full score remains null until other research is evidenced. |
| E28–E30 | Reciprocal project/area/province links and central service authority | Province reciprocity implemented; specific locality/brand evidence-gated | Hubs surface matching cases and central services; case detail pages now link their verified province hub and service. Approved municipality/district and named brand facts are absent, so those links are not invented. No duplicated service×province matrix. |
| E31–E33 | Rational expansion, true territory and no fake branches | Implemented as policy; data-driven expansion gated | Territory is owner confirmed; priorities reflect provisional editorial judgement. No automatic local presence, arrival, ranking or office claim. |
| E34 | Full coverage/draft/evidence/next-20 report | Implemented historical report; ongoing data updates | `SERVICE_AREA_REGISTRY.md` and `PHASE_E_SERVICE_AREA_REPORT.md` include the full registry and next-20 research shortlist. Search Console opportunity remains unavailable. |

## What can advance without new business facts

The stale-rating fix, customer copy, contextual links, visible organizational authorship, source-check
dates, regional tool, six guides and expanded automated checks are published and integrated.
Hosted CI, live review-star follow-up and the newest source refresh passed their exact-release checks.
No current correct-owner Google property data was established. GSC Wizard was declined and is
excluded from further work. Analyze genuine owner exports when available; missing account
observations are not evidence of zero search traffic.
Keep specialist review claims, new locality pages and project-specific facts gated by genuine evidence.
The stated release checks passed; neither those nor local checks establish full masterprompt
completion or commercial impact.

## What remains gated

Correct-owner GSC/GBP/analytics access; actual query/page/date/filter observations; verified lead
outcomes; technician recognition and scope; maintained prices/policies; job/photo/permission
references; genuine project-specific reviews; additional language or F-gas scope; approved external
profile/citation/partnership changes. Existing owner confirmations remain valid authority; this
ledger does not request routine reapproval of already authorized work.
