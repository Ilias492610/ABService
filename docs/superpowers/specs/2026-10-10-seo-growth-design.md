# AB Service SEO growth — 10 October 2026

## Intent and authority

The owner requests extensive research, implementation, verification and publication to grow
qualified plumbing/heating enquiries. Existing authorization covers in-place website edits,
GitHub/Vercel publication and continued work. It does not supply an advertising/API budget,
customer records, technician credentials or permission to message unrelated third parties.
Work on a feature branch in the existing accessible Documents checkout; preserve existing URLs,
design, WhatsApp contact, live Google reviews and the contact form.

## Outcome

1. Fix verified mobile navigation/form issues, stale rating fallback, manifest asset and analytics
   URL privacy. Extend crawl QA beyond valid HTML to assets, link graph and sitemap agreement.
2. Publish a no-account `/tools/onderhoudscheck` with a complete result before the enquiry CTA.
   Calculate region/device/fuel/power rules from official sources, not a universal maintenance rule.
3. Publish `/advies` and six original, source-bounded guides: water meter movement, cold radiator,
   no hot water, boiler safety-group discharge, blocked drain and maintenance documents.
4. Improve contextual links from fault guides to their commercial brand pages, useful service
   advice links, province links from cases, regional service explanations and customer-facing copy.
5. Add visible organizational authorship, actual checked dates, appropriate Article schema,
   personalized but privacy-preserving contact preparation, and truthful sitemap modification dates.
6. Establish an auditable requirement/status ledger and a repeatable GSC export analysis. Distinguish
   observed data, missing data and editorial hypotheses; do not invent traffic/search volume.
7. Run current unit/lint/build/crawl/browser/Lighthouse/review checks, publish and verify the live
   release. Arrange subsequent measured follow-ups through a thread automation if available.

## Maintenance checker contract

Pure function `getMaintenanceResult(input, today)` in `libs/maintenance-check.mjs`.
Input uses region `vlaanderen|brussel|other|unknown`, device `central|gas-water-heater|electric|unknown`,
fuel `gas|liquid|solid|unknown`, power `below20|atleast20|unknown`, lastDate ISO `YYYY-MM-DD` or empty,
and changed `yes|no|unknown`. `today` is an ISO date; do not make tests depend on the host clock.

Return `{kind, title, summary, intervalYears, planningDate, source, notes, service}`. Kind is
`periodic|recommended|unknown|outside-scope|inspection|invalid`. `source` is an official URL;
no deadline/date when the rule or supplied date is uncertain. `service` is an existing form label.

Vlaanderen: central gas/liquid >=20 kW -> 2/1 years; central solid -> 1 year independent of power;
central gas/liquid below20 -> maintenance recommended without a mandatory interval under this rule.
Separate water heaters do not inherit the central-heating rule. Brussels: central gas boilers and
separate gas water heaters -> 2 years; central liquid/solid boilers -> 1 year, without a 20 kW gate.
Unknown region/device/fuel/necessary power -> explain what to check. Electric devices/heat pumps
are outside this combustion-boiler calculation. Changes prioritize the separate inspection process.

Reject impossible/future dates; anniversary after 29 February clamps to the last valid day of February.
Show calculated dates as planning guidance, not a conformity decision or a legal-overdue verdict.
Explain Flemish maximum three-month extension and original schedule/attest priority. Do not offer
unconfirmed liquid/solid-fuel commercial service; informational rules may refer to an appropriate
recognized performer rather than imply AB Service accepts those works.

## Content interface

`content/advice-guides.mjs` exports `adviceGuides` and `getAdviceGuide(slug)`.
Each guide has `slug,path,title,description,eyebrow,intro,answer,warning,sections,steps,relatedLinks,
sourceLinks,checkedAt,category,contactService`. Sections follow existing ServicePage props.
`checkedAt` is `2026-10-10` only for content actually checked in this release.
No fictional author, technical review/recognition, case history, fixed price or arrival guarantee.
Authorship is AB Service organization, linking to `/over-ons`; sources remain directly visible.

## UX and metadata

Fast statically rendered text surrounds small client-only tool/form interactions. New pages reuse
the established visual system. A tool result is accessible with keyboard and live announcement.
Changing inputs invalidates the previous result. Error focus points to the field needing correction.
Contact prefill is limited to predefined service/context choices; user-entered values must not enter
URL analytics or external tracking. A fragment can carry a tool handoff and is consumed/removed
client-side. No automatic submit, local storage or signup is needed.

Article markup reflects visible organizational author, headline, sources and checked date. No FAQ
rich-result promise: Google's FAQ feature was deprecated in May 2026. No mass municipality pages,
ranking guarantee, special AI-schema promise or paid backlinks.

## Verification focus

- Exact 20 kW boundary, unknown power and distinct regional/device rules.
- Invalid/future dates, leap-year anniversary, changed installations and unrecognized inputs.
- Tool/form handoff, validation focus, sticky header offsets and mobile overflow.
- Google API unavailable or changed score; popup must never invent a score/count or delay the page.
- Query/fragment/personal values in analytics, server API secrets, duplicate metadata/canonicals.
- Advice pages discoverable from useful body links; old URLs, draft gates and live forms preserved.

## Measurement limits

September QA is historical. Current indexed counts, CTR/rankings, field CWV and lead conversion
rates require the correct owner's GSC/analytics access. '90/100' was an estimate, not a counted
masterprompt result. The new evidence ledger must name completed, partial and account/evidence-gated
requirements rather than imply an official SEO score.
