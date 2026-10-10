# Search and qualified-lead baseline — 10 October 2026

## What is observed

The initial source audit inspected clean `main` at `cb4d938` in the Documents checkout. Node
registry inspection returned **73 registered public routes: 71 published and 2 noindex**, six
regional hubs, eight published district pages, 304 municipality records and six anonymized project
records. All district project counts were zero; no municipality had a matching project. The six
cases use “Regio Antwerpen”, not approved individual municipalities/districts.

The thirteen fault guides contain **922 displayed source rows**, with 242 Bosch rows reused on
the Junkers page. The number is not 922 distinct codes or evidence of universal model coverage.
For example, Remeha is Avanta-scoped, ACV Prestige MKIII-scoped and Itho Daalderop Base
Cube-scoped. Manufacturer model limitations remain necessary.

The inventory above is the pre-integration comparison point. Current registry inspection now
returns **81 registered public routes: 79 published and 2 noindex**. The eight additions are
`/advies`, `/tools/onderhoudscheck` and six source-bounded advice guides. Served coverage stays
at 304 municipalities, and the existing case records still provide no individual municipality or
district evidence. Neither route count is Google's indexed count.

Current local checks pass: **96/96 tests**, ESLint and `git diff --check`. Root reports a successful
production build with **90 route outputs**, plus a local production-server crawl of **81 routes,
92 internal links and 32 assets**. Build outputs include framework endpoints and do not equal
indexable pages. These are local results; **production deployment/live verification remains pending**.

The six new guides expose AB Service organizational authorship and a visible actual source-check
date of 10 October 2026, with matching Article metadata/schema. New-route sitemap modification
dates reflect checked source content; no historic first-publication date was fabricated. The tool
distinguishes regional/device/fuel/power rules and supports a validated, privacy-preserving enquiry
handoff. Fault guides now link brand/service help, and cases link their verified province hub.

Source verification records **42/43 automatic HTTP 200** results. Sibelga’s official contact page
returned **403** to the automated fetch and was manually validated by the implementing agent
through official-web retrieval. The automation exception remains visible; this is not a clean
43/43 source run. Manual access does not guarantee future crawler availability.

September `SEO_QA_REPORT.md` records release/deployment checks, successful form transport,
live Places observations and local mobile Lighthouse. Its newest homepage lab result is 97
performance / 100 accessibility / 100 best practices / 100 SEO, LCP 2.6 seconds, CLS 0 and
300 KiB transfer. These are historical local lab observations; they establish neither current
production performance nor real-user p75 LCP/INP/CLS.

## Missing measurement evidence

No matching GSC query/page export or SEO metric CSV/XLSX was found in the repository or relevant
Downloads filenames during the read-only audit. No unrelated file contents were read. This audit
did not access an authenticated Google account.

| Measure | Baseline value | Required evidence |
|---|---|---|
| Organic clicks, impressions and query CTR/position | Unavailable | Correct-owner GSC export with property, date range, search type and filters |
| Indexed pages/canonical decisions | Unavailable | Current GSC Page Indexing and representative URL Inspection |
| Municipality/brand/service search demand | Unavailable | Actual GSC observations and separately sourced demand evidence; export impressions are not search volume |
| GBP calls, website actions/category/appeal status | Unavailable | Exact business profile’s current authenticated observations |
| Phone/WhatsApp/email clicks and form events | Code exists; actual counts unavailable | Production analytics receipt and period/filter definition |
| Qualified enquiry, accepted-job or revenue conversion | Unavailable | Privacy-preserving internal outcome classification matched to real enquiries |
| Real-user Core Web Vitals | Unavailable | Current GSC/CrUX field observations with eligible sample/period |
| October unit/lint/build/local crawl | Verified locally as stated above | Root release log; separate from actual hosted GitHub CI or production |
| October deployment/browser/Lighthouse results | Production pending; current browser/lab results not recorded here | Fresh root QA and verified live release |

No keyword volumes, difficulty scores, expected-CTR curve, forecast traffic, current rankings or
growth percentage has been invented. Lack of an export is not evidence that search traffic is zero.

## Repeatable local GSC analysis

`libs/gsc-analysis.mjs` and `scripts/gsc-analysis.mjs` implement dependency-free local CSV
analysis. They do not log in, query Google, upload an export, spend a budget or modify the website.
Keep real exports and query-level reports outside the public web assets/source repository.

Export **Queries** and **Pages** from the same GSC performance view and filters. Record:

- Domain/property and exact owner account used.
- Start/end date, Web/Image/Video/etc. search type, country/device/search-appearance filters.
- Whether the data is provisional, row-limited or includes an API extraction.
- Export date and the comparable previous period; avoid overlapping intervals when testing growth.
- Meaningful rollout date so before/after comparisons do not mix releases unnoticed.

The CLI accepts standard comma-delimited GSC tables, English/Dutch column names, UTF-8 BOM,
quoted commas/newlines/escaped quotes, integer thousands separators and Dutch decimal commas.
Required metrics are clicks, impressions, CTR and position. Query tables require a query column;
page tables require an absolute HTTP(S) page URL. Negative/impossible values, missing columns,
duplicate dimensions, malformed CSV and invalid URLs are rejected rather than guessed.

```sh
node scripts/gsc-analysis.mjs --queries /absolute/export/Queries.csv --pages /absolute/export/Pages.csv
node scripts/gsc-analysis.mjs --queries /absolute/export/Queries.csv --pages /absolute/export/Pages.csv --pairs /absolute/export/query-page.csv --output /absolute/reports/gsc-analysis.json
```

`--output` creates a **new** JSON report and refuses to overwrite an existing file. Without that
option, JSON is printed to stdout. `--help` prints usage. Missing/invalid arguments or data produce
a nonzero exit status. The optional paired file must actually contain **both query and page in each
row** with their paired metrics; separate standard UI tabs cannot be joined to manufacture it.
Prefer a genuine same-filter GSC API extraction by those two dimensions when authorized/available.

### Output interpretation

- `queryCandidates`: non-brand queries with at least 10 observed impressions, sorted by an
  explicit editorial priority heuristic. Brand exclusions recognize `ab service`, `abservice`,
  `abservice24` case-insensitively with boundaries, including common whitespace/hyphen variants.
- `highImpressionQueries`: the same eligible queries sorted by actual impressions. “High” is
  relative to this supplied export; it is not a claim of market search volume.
- `strikingDistance`: observed average position 8–20 inclusive. Average position is not a fixed
  current rank, guaranteed opportunity or forecast.
- `observedCtr`: clicks divided by impressions; `exportedCtr` is preserved separately because
  GSC percentages can be rounded. A bare CTR from 0–1 is parsed as a ratio; >1–100 as a percentage.
- `priorityHeuristic`: impressions × (1 − observed CTR), doubled for positions 8–20. This is a
  review ordering rule using observed metrics, **not** recoverable clicks, expected CTR, revenue
  or ranking improvement. The factor of two is an explicit editorial choice.
- `pageCandidates`: separate landing-page totals, never reassigned to a query.
- `pairedCandidates`: only valid supplied query/page rows, marked `observed-pair`, retaining
  their own clicks/impressions/position. Linkage is exact within the supplied export; the exporter
  still must establish its genuine source and filters.
- `inferredMatches`: lexical overlaps between query words and exported page paths. Marked
  `inferred`, with **no metrics** attached; linkage remains uncertain. Homepage/unmatched queries
  may have no match. Use actual query/page evidence before acting on a guessed destination.

The analyzer intentionally does not force query and page totals to reconcile. GSC anonymization,
export limits and differing dimensions can prevent reconciliation even with aligned filters.

## Initial intent map and review decisions

| Intent | Current authority or October work | Review question when real data arrives |
|---|---|---|
| Loodgieter Antwerpen | `/` | Non-brand local impressions and qualified contact outcomes; retain one primary intent owner |
| Cv-ketel maintenance/inspection/repair | `/onderhoud`, `/keuring`, `/herstelling` | Which distinct questions and service pages receive impressions and relevant enquiries? |
| Plumbing/leak/drain/boiler/pipe/bathroom | Existing `/diensten/{slug}` | Which real service intent needs clearer preparation, scope or answer content? |
| Brand service and fault guidance | `/merken/{merk}`, `/foutcodes/{merk}` | Is model-specific information leading users to relevant repair help? Which genuine model/code questions recur? |
| Regional coverage and districts | `/werkgebied`, six hubs, eight district pages | Is there observed local query opportunity plus genuinely unique local value? Avoid new URLs solely for a place name |
| Projects | `/projecten` and six cases | Obtain auditable job/photo/permission references and approved municipality before treating them as local proof |
| Helpful advice and maintenance checker | Integrated: `/advies`, six guides and `/tools/onderhoudscheck`; local automated checks passed | Finish browser/live verification; then observe impressions, enquiries and intent match without a ranking promise |

The Phase E report already provides a provisional next-20 locality **research** shortlist. It is
not search-volume evidence or permission to publish all candidates. Edegem, Mortsel and Kontich
are its first three; update their order from observed search and genuine work evidence.

## Follow-up cadence

After live release, confirm the 81 registered routes against the actual live crawl and record current
browser/API checks and lab measurements. The new GitHub Actions workflow runs Node 22 install,
lint, tests, production dependency audit, build and local crawl; no actual hosted workflow result is
claimed yet. Once the correct-owner exports are available, save a dated baseline and compare
equal, documented periods. Review indexing and failures first; assess query/page opportunities
alongside service relevance and actual lead quality. Do not claim growth from small samples or
from query/path guesses. Monthly search/content review and quarterly business/source/field-CWV
review remain appropriate; more frequent checks may follow material errors or measured changes.

Root handles any owner-requested automation through the supported thread mechanism. This file
does not claim a monitor is scheduled or that external account work has been completed.
