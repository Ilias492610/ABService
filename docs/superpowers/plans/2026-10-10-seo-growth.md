# AB Service SEO growth implementation plan

> For agentic workers: execute the focused tasks below, keep file ownership explicit and run an
> independent release review before publishing. The owner has authorized execution/publication.

**Goal:** Grow useful search coverage and qualified enquiries with a regional maintenance tool,
original advice, stronger internal links and verified technical fixes.

**Architecture:** Extend existing registries and server-rendered page patterns. Keep pure tool and
measurement logic in small modules, with limited client interactions. Reuse existing contact flow.

**Tech stack:** Existing Next.js/React, Node native tests, current CSS and Vercel hosting.

**Spec:** `docs/superpowers/specs/2026-10-10-seo-growth-design.md`

## Constraints and review focus

Use the spec's evidence, regional, privacy and date rules. Preserve contact/review/image features,
existing URLs and draft gates. Review unknown/malicious inputs, regional power thresholds, date
boundaries, stale API data, client handoff, sticky navigation, source scope and production state.

## Task 1 — technical fixes (technical agent)

- [x] Fix manifest icon, sticky offsets and failed-validation focus; verify in actual Chromium.
- [x] Sanitize Analytics URL query/hash and enforce safe coded event values with regression tests.
- [x] Replace hardcoded rating with actual API data and a factual profile fallback. Coalesce in-flight
      calls, keep secrets on the server, preserve static page delivery and actual review section.
- [x] Fix Google attribution and extend crawl/asset/source audits with meaningful regression tests.
- [x] Return changed-file list and verification; do not commit/push independently.

## Task 2 — source-bounded advice (content agent)

- [x] Create `content/advice-guides.mjs` for the six spec topics using verified primary sources.
- [x] Give each its own practical observations, intake checklist, clear limits and service link.
- [x] Include actual checked date, organization authorship and precise direct source URLs.
- [x] Test distinct paths, source coverage and relevant internal links; do not fabricate facts.

## Task 3 — maintenance checker (root)

- [x] Write tests for `getMaintenanceResult(input,today)` including every branch/date boundary;
      run and confirm failing assertions before implementation.
- [x] Implement pure rule/date logic and run targeted tests.
- [x] Create client checker and static `/tools/onderhoudscheck` page with rule table, sources,
      complete accessible result, guidance notes and privacy-safe enquiry handoff.
- [x] Verify multiple device/region combinations in Chromium, including changing inputs.

## Task 4 — integration and qualified contact (root)

- [x] Add advice hub/detail renderer, route metadata, organizational Article schema and visible dates.
- [x] Add truthful modification dates only for changed content; no fake historic publish dates.
- [x] Connect primary service/brand/fault/advice/project paths with helpful contextual links.
- [x] Replace customer-visible editorial/process language; add Brussels explanations to service pages.
- [x] Add service/context prefill for enquiries without propagating user information into tracking.
- [x] Verify existing URLs and contact API validation.

## Task 5 — evidence and repeatable measurement (audit agent/root)

- [x] Record actual source research and masterprompt requirement statuses, replacing '90/100' claims.
- [x] Add local GSC CSV analyzer preserving query/page matching uncertainty and real metric values.
- [x] Produce factual current baseline, intent map, missing-data status and follow-up cadence.
- [x] Update inventory, masterplan, evidence register, changelog and QA with current evidence.

## Task 6 — release

- [x] Run tests, lint, production build, source/crawl/asset/link checks and desktop/mobile browsing.
- [x] Run mobile Lighthouse on homepage and new tool; investigate material regression.
- [x] Independent whole-diff review; resolve important findings and repeat affected checks.
- [x] Commit, fast-forward main, push GitHub, verify Vercel checks and live pages.
- [x] Set up requested continued SEO work with the thread automation; record exact account/data
      dependencies without claiming unperformed authentication or invented ranking improvement.
