# Search and qualified-lead baseline — 10 October 2026

## Current WP02 account evidence — 10 October, evening check

This section supersedes the missing-account observations below for Search Console only. The
owner opened Abder's Chrome profile and enabled its page-reading option. The checked account is
the verified owner of domain property `sc-domain:abservice24.be`; the property was added on
8 February 2026. No other Google account, GSC Wizard, new OAuth grant, verification change or
paid indexation service was used. Canonical production remains `https://www.abservice24.be`.

### Native exports and comparable periods

The owner-account native CSV downloads remain private, outside this repository and public assets.
Current Web exports contain Queries, Pages, Dates, Countries, Devices, Search appearance and
Filters. Native comparison exports contain separate current/previous columns for Queries,
Pages, Countries and Devices; Search appearance is empty. Its Filters sheet uses the generic
last-three-months label, so the actual comparison dates were separately checked in the UI.

| Evidence | Period and derivation | Exact property clicks / impressions |
| --- | --- | --- |
| EX01 current | 7 July–6 October 2026, 92 consecutive daily rows | 68 / 3519 |
| EX02 comparison | Current 7 July–6 October (92 days) versus previous 7 April–6 July (91 days), no overlap | UI clicks 68 / 37; UI impression values are rounded |
| EX04 previous Dates | Inclusive 7 April–6 July selection from a native longer-window daily export | 37 / 2696 |
| EX04 current cross-check | Inclusive 7 July–6 October selection from the same daily export | 68 / 3519, matching EX01 day by day |

EX04's selected UI period is twelve months, but available data cover only 8 February–6 October
2026: 241 unique consecutive days. The previous 91-day totals are derived from those native
Dates, not a fabricated previous-only export. Other EX04 dimensions must not be relabelled as
previous-period data. Previous Queries/Pages/Countries/Devices come from EX02's real period
columns, not from that longer-window aggregate.

The final cross-check caught an off-by-one error in the draft: 6 April was initially included.
That day's 0 clicks/15 impressions explained the discrepancy with EX02. Reopening the native
comparison picker confirmed previous **7 April–6 July**, and the corrected consecutive 91-day
Dates sum is 37/2696 (CTR 1.3724%). The earlier 92-day 37/2711 selection is not EX02's period and
must not be used as its total. Current dates/totals and actual comparison-row metrics are unchanged.

Current query export: 159 rows, 38 clicks and 1318 impressions. Comparison: 232 combined query
rows, with 159 current-positive and 133 previous-positive rows; previous query columns sum to
22 clicks and 1212 impressions. These are query-table totals, not property totals. The current
page table contains ten URLs. Independent table totals and average positions are not joined
into guessed query-page metrics. The query analysis and eligibility decisions are in the
[WP03 research report](wp03-research-report.md).

Current country export has 43 rows, including Belgium 64 clicks/3290 impressions and Netherlands
2/75; comparison has 53 combined country rows, with previous Belgium 36/2495 and Netherlands
0/55. Current devices: mobile 45/2309, desktop 22/1152, tablet 1/58; previous: 29/1641, 7/1025,
1/30 respectively. These are independently aggregated dimensions, not Belgian/mobile filters
applied to all queries. An empty Search appearance table is not proof that no enhanced feature
ever appeared.

PA01 is a real exact-query-filtered native Pages export: `bulex f28 f54` →
`https://www.abservice24.be/foutcodes/bulex`, 0 clicks, 47 impressions, 0% CTR, position **10.34**
over 7 July–6 October. Filters and the native UI confirm the exact query selection. The earlier
UI rounded this to 10.3; the precise value is now from the filtered page row, not borrowed from
the standalone query row. No additional pair is established by topical similarity.

All these Web views use no country/device filter, and the report was last updated about 45
hours before the observation. No 24-hour preliminary view was used. Daily Search Console data
use Pacific Time; extraction/check timestamps here use UTC or explicitly labelled Europe/Brussels.
Native table exports have a 1000-row limit, and anonymized/internal limitations mean that a
159-row export still does not contain all search queries. See Google's
[data explanation](https://support.google.com/webmasters/answer/96568?hl=en) and
[native export guidance](https://support.google.com/webmasters/answer/12919797?hl=en).

The periods differ by one day and mix site versions and seasons. Changes made on 10 October fall after the current
period's 6 October end. Differences in clicks, CTR or position are observed differences, not
proof that this execution increased rankings, qualified customers or revenue.

### Indexing, sitemap, controls and representative inspection

| Account check | Observed state | Boundary |
| --- | --- | --- |
| Sitemap | `https://www.abservice24.be/sitemap.xml`: Success; submitted 17 September, last read 8 October, 71 discovered pages | Current site has 79 sitemap URLs; the dated account snapshot is not 79 indexed pages. No duplicate submission. |
| Page Indexing | Updated 4 October: 10 indexed, 64 not indexed; 3 redirects, 61 discovered/currently not indexed, 0 crawled/currently not indexed | The report predates the newest routes/releases. No mass validation or indexing requests. |
| Robots/crawl | Robots valid; 688 crawl requests in last 90 days | Requests do not equal unique indexed pages. |
| Generative AI inclusion | Default “Include” is already enabled | No general “accept new SEO” switch; no setting changed. |
| Manual actions / security | No issues shown for the correct property | Dated account observations, not a future guarantee. |
| Field Core Web Vitals | Updated 9 October; insufficient recent data for desktop and mobile | Unknown, not a field pass or failure; lab Lighthouse remains separate. |

`/onderhoud` is indexed. Its last recorded Google crawl was 19 September at 04:16:49 in the UI,
using smartphone Googlebot; fetch/indexing allowed, fetch successful, declared canonical and
Google canonical agree with the inspected `www` URL. The live test on 10 October at 19:37
Europe/Brussels reported available/indexable and one valid breadcrumb item. Google's rendered
HTML contained the expected H1, self-canonical, regional 20 kW distinction and phone link.
Live resource detail reported one of sixteen resources not loaded; its identity was not resolved,
so this is not an all-resources-pass claim. No indexing request was made for this already
indexed, unchanged maintenance page.

`/tools/onderhoudscheck` was unknown to Google's indexed-version view. Its live test at 19:49
Europe/Brussels reported available/indexable and one valid breadcrumb item. One manual request
around 19:51 was actually confirmed by the priority-crawl-queue message. This was a substantively
new tool route, not a daily/all-site batch. The request is not proof of indexing. Prior IndexNow
notifications were not repeated.

The live public audit before this branch release passed 81 registered pages, 92 internal
destinations and 110 assets. Local tests also distinguish canonical production from the local
fetch origin and exclude noindex/draft pages from the sitemap. These checks verify public
technical behaviour, not Google's page count or field experience.

### Lead measurement remains separate

The actual contact-test inbox receipt is now owner-confirmed; see
[WP01 receipt and measurement report](wp01-contact-receipt-report.md). Its one technical test
is excluded from commercial outcomes. Custom-event dashboard receipt remains unproved on the
current Vercel Hobby plan. Real qualified enquiries, agreed jobs, revenue, GBP actions and
business retention practices remain unknown; missing data are not zeros. A private outcome
baseline records those unknowns without customer identities. No WP04 profile edit, outreach,
advertising purchase or other work package is claimed by this account audit.

## Historical release observations

Latest refinement, locally verified: 113/113 tests, lint/build/crawl (81 customer routes, 92 internal
destinations, 110 assets) and zero production advisories. The customer registry remains 79 published
plus two noindex. The 78 page-specific previews are assets, not extra indexed pages. Remeha now has
17 Avanta +23 historical Calenta E +19 Su rows: 59 total, with per-model meanings. All thirteen guides
now display 964 source rows, including shared Bosch/Junkers content. Source audit is 47 HTTP 200
of 48 unique URLs plus the documented Sibelga 403. No search/lead metric is derived from these counts.
This refinement is live as `a94b108`, hosted CI38062088046 passed and primary CLI deployment
`dpl_8exsTLts6yYX6f16SvsLDwLJAafT` is Ready with matching commit/www. Live crawl81/92/110 and
mobile Remeha filtering passed. One IndexNow two-URL batch returned202(key verification pending),
not indexing. Live Remeha lab99/100/100/100, LCP2.149s and274454bytes is not a search/lead metric.
Subsequent runtime pinff3665b passes114 tests/lint/build/crawl under actualNode24.19 and hosted
CI38063158088 under24.21/npm11.19. Primary automatic Git retrieval failed (`git_info_fail`), while
the matching manual productiondpl_ASnBYdZXpvfa7hk37hdTb5EhJxod isReady/Node24.x/www and passed
livecrawl81/92/110/apex308. Later documentation-only7474d3c passed CI38063829560 and both
automatic Vercel checks; matching primary Git deploymentdpl_DFeyrc8q6f3o1qeoSoTHvQQv594y is
Ready/Node24.x/www. The earlier error did not recur; root cause is unknown, not an ongoing blocker
or a claimed permanent repair. No notification repeated.
The dated baseline/release observations below remain historical.

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

October local release checks passed: ESLint and a production build with **90 route outputs**, plus
a local production-server crawl of **81 routes, 92 internal destinations and 32 assets**. The current
newest source passes **98/98 tests**, lint and a zero-vulnerability production audit, including
rendered-HTML review-star accessibility and expanded citation-inventory regressions. Its fresh
build, hosted CI and publication passed for `06d8464`. Build outputs include framework endpoints
and do not equal indexable pages.

Release **`95add97`** was pushed to `main`, and both Vercel deployments succeeded. The primary
deployment **`dpl_23D51jTVozBeCpgY2v5EbSYmST39`** serves `https://www.abservice24.be`.
The root's live crawl passed for **81 routes, 92 internal destinations and 32 assets**. The browser
agent's live checks passed for tool/privacy/invalid-date/contact handoff, no overflow and zero
JavaScript errors. It sent **zero contact POSTs**, so this is not a mail-delivery or enquiry-receipt test.
Ten intercepted/aborted analytics POSTs contained no personal parameters or entered date; the
real analytics SDK returned HTTP 200. Aborted requests cannot establish production event ingestion.

The repair **`6e161cb`** is also live: both Vercel deployments succeeded, primary deployment
**`dpl_GWMDovTHqDS8qbPzGGPZfkhMexq5`** has the `www` alias ready, and its hosted Linux CI
succeeded as recorded below. Root's current live `/werkgebied` browser check at **390 px** found
314 initial areas (304 municipalities plus ten districts), one H1 and no overflow. Searching Gent
returned one real result with live status; an invented query returned zero with a warning and live
status, without overflow. This verifies filtering, not local search rankings or indexed locality pages.

The six new guides expose AB Service organizational authorship and a visible actual source-check
date of 10 October 2026, with matching Article metadata/schema. New-route sitemap modification
dates reflect checked source content; no historic first-publication date was fabricated. The tool
distinguishes regional/device/fuel/power rules and supports a validated, privacy-preserving enquiry
handoff. Fault guides now link brand/service help, and cases link their verified province hub.

The `06d8464` source-refresh inventory covered **47 unique URLs**, including core pressure and
recognition citations and two current premium/support sources replacing an outdated webinar
reference. The audit returned **46 HTTP 200 and one Sibelga HTTP 403**. These source changes
are published in `06d8464`, not attributed to the earlier repair. The previous
43-source audit returned 42 HTTP 200 and the same exception. Sibelga's official contact page was
manually validated through official-web retrieval. The automation exception remains visible;
neither run is all-green. Manual access does not guarantee future crawler availability.

September `SEO_QA_REPORT.md` records release/deployment checks, successful form transport,
live Places observations and local mobile Lighthouse. Its newest homepage lab result is 97
performance / 100 accessibility / 100 best practices / 100 SEO, LCP 2.6 seconds, CLS 0 and
300 KiB transfer. These are historical local lab observations; they establish neither current
production performance nor real-user p75 LCP/INP/CLS.

The October **live mobile Lighthouse** observations are separate, current lab evidence:

| Page and release observation | Performance / accessibility / best practices / SEO | LCP | CLS | TBT | Transfer bytes |
|---|---|---|---|---|---|
| `/tools/onderhoudscheck`, initial live check; unchanged by repair | 99 / 100 / 100 / 100 | 1.871096 s | 0.000852 | 14 ms | 274706 |
| `/`, after deployed `6e161cb` repair | 99 / 100 / 100 / 100 | 1.815859 s | 0.000880342 | 27.5 ms | 307881 |

The first October homepage run on `95add97` was **100/96/100/100**, LCP 1.64 s and 307982
transfer bytes. It exposed a review-star `aria-label` on a generic span. The deployed role correction
is covered by an actual SSR regression, and root's live ARIA/Lighthouse recheck passed as recorded
in the table. The historical 96 is not the current accessibility result. Lab scores are not real-user
field Core Web Vitals or evidence of ranking gains; normal run-to-run performance variation is not
interpreted as an SEO or commercial result.

Current live Google data returned **5.0 from 44 ratings** with no-store handling and one observed
fetch. The upstream response did not include individual review texts; the page therefore shows
an honest fallback instead of fabricating testimonials. This is a dated observation, not a fixed
future score or authenticated GBP-management result.

The first hosted workflow, [GitHub Actions run 38056237241](https://github.com/Ilias492610/ABService/actions/runs/38056237241),
failed during `npm ci` on `95add97`. npm 10.9.9 rejected missing optional `@emnapi/core@1.11.3`
and `@emnapi/runtime@1.11.3` lock entries that local npm 11 had accepted. The repaired lock adds
those entries and normalizes peer metadata without changing any existing package version,
resolved URL or integrity hash. A clean scratch install, including installation scripts, passed on
Node 22.23.3/npm 10.9.9 on macOS. Subsequently,
[GitHub Actions run 38057407278](https://github.com/Ilias492610/ABService/actions/runs/38057407278)
**succeeded on hosted Linux** for exact head `6e161cb9824042988b77bc6837e9cd72d7065bda`,
including `npm ci`, lint, tests, production audit, build and crawl. This closes the repair's CI gate;
it does not promise a future workflow result. The subsequent source refresh `06d8464` passed all
Linux gates in [run 38057894793](https://github.com/Ilias492610/ABService/actions/runs/38057894793).
Both Vercel checks succeeded; primary `dpl_73Tpn3AZ3d6VX1NWnxVGUZs79eQm` was confirmed Ready
with the `www` alias. The live 81/92/32 crawl and mobile current premium-copy/link check passed.
Next 16.3.8, sharp 0.35.5 and source-map-js 1.2.2 remain unchanged. The production dependency
audit returned zero vulnerabilities; the separate full development tree retains nine documented
findings. No blind major upgrade or CI switch to `npm install` was used to hide the failure.

## Historical missing measurement evidence — before correct-owner access

The following describes the earlier audit, not the current WP02 Search Console state above.
Unavailable commercial/GBP data still remain unavailable unless separately verified.

No matching GSC query/page export or SEO metric CSV/XLSX was found in the repository or relevant
Downloads filenames during the read-only audit. No unrelated file contents were read. This audit
did not access authenticated AB Service search data. The exact Abder account/property remains
unconfirmed. GSC Wizard was subsequently declined and is excluded from further work. Missing
account observations do not imply an absent Google property or zero traffic.

| Measure | Baseline value | Required evidence |
|---|---|---|
| Organic clicks, impressions and query CTR/position | Unavailable | Correct-owner GSC export with property, date range, search type and filters |
| Indexed pages/canonical decisions | Unavailable | Current GSC Page Indexing and representative URL Inspection |
| Municipality/brand/service search demand | Unavailable | Actual GSC observations and separately sourced demand evidence; export impressions are not search volume |
| GBP calls, website actions/category/appeal status | Unavailable | Exact business profile’s current authenticated observations |
| Phone/WhatsApp/email clicks and form events | Live payload privacy checked; ingested counts unavailable | Production analytics receipt and period/filter definition; aborted QA requests are not events received |
| Qualified enquiry, accepted-job or revenue conversion | Unavailable | Privacy-preserving internal outcome classification matched to real enquiries |
| Real-user Core Web Vitals | Unavailable | Current GSC/CrUX field observations with eligible sample/period |
| October unit/lint/build/local crawl | 98/98 tests, lint/build/crawls passed; production audit zero | Verified source refresh `06d8464`; route outputs remain distinct from indexed pages |
| October deployment/browser/Lighthouse results | Initial release and repair live; current recheck recorded above | No email receipt, analytics ingestion or commercial outcome inferred |
| Hosted CI acceptance | Repair and source refresh passed all Linux gates in runs 38057407278 and 38057894793 | These are exact-release observations, not future-run guarantees |

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
| Helpful advice and maintenance checker | Published: `/advies`, six guides and `/tools/onderhoudscheck`; local and stated live checks passed | Observe actual impressions, enquiries and intent match without a ranking promise |

The Phase E report already provides a provisional next-20 locality **research** shortlist. It is
not search-volume evidence or permission to publish all candidates. Edegem, Mortsel and Kontich
are its first three; update their order from observed search and genuine work evidence.

## Follow-up cadence

The October live release, 81-route crawl and current browser/API/lab observations are recorded
above. The review-star correction, source refresh and their hosted CI runs passed. The GitHub
Actions workflow now gates Node 24 install, lint, tests, production dependency audit, build and local
crawl; the failed first run remains historical and the repair's success is not attributed to newer code.
Once the correct-owner exports are available, save a dated baseline and compare
equal, documented periods. Review indexing and failures first; assess query/page opportunities
alongside service relevance and actual lead quality. Do not claim growth from small samples or
from query/path guesses. Monthly search/content review and quarterly business/source/field-CWV
review remain appropriate; more frequent checks may follow material errors or measured changes.

Daily 09:00 continuation is active as thread heartbeat `ab-service-seo-verder-verbeteren`; the
local computer and app must be available. It does not imply a continuously running agent or
completed Google/Bing/Apple account work.
