# Contact, Media and Brand Catalogs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair the contact-page form CTA, publish source-bounded fault-code pages for nine additional heating brands, and add optimized owner-supplied marketing illustrations without regressing performance or truthfulness.

**Architecture:** Keep `PageHero` reusable through an explicit CTA destination. Keep all fault-code pages on the existing server-data/client-filter architecture, but split additional manufacturer snapshots into a separate catalog module so the original catalog remains maintainable. Register all media centrally with explicit evidence roles and serve resized WebP files through `next/image` below the critical rendering path.

**Tech Stack:** Next.js 16 App Router, React 19, Node test runner, `next/image`, Pillow WebP conversion, Playwright/Chromium browser QA.

**Spec:** `docs/superpowers/specs/2026-09-16-ab-service-seo-transformation-design.md` plus the owner-approved 17 September 2026 contact/media/brand expansion in this task.

## Global Constraints

- Never invent a code, cause, model scope, certification, service capability, employee, vehicle or customer case.
- Every fault-code catalog must name an official manufacturer URL and exact model/tool scope.
- Installer repair procedures must be reduced to conservative consumer-safe first steps.
- Supplied ChatGPT-named images are marketing illustrations, never documentary proof.
- New raster files must be WebP, maximum 1,448 x 1,086, and target less than 250 KiB each.
- Homepage critical transfer and LCP must not materially regress; new homepage media stays below the primary content and lazy-loads.
- Existing URLs, visual identity, contact channels and analytics behavior remain intact.

---

### Task 1: Contact form anchor regression

**Files:**
- Modify: `tests/html-audit.test.mjs`
- Modify: `libs/html-audit.mjs`
- Modify: `components/page-hero.js`
- Modify: `app/contact/page.js`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `PageHero({ eyebrow, title, intro, ctaLabel })`
- Produces: `PageHero({ ..., ctaHref = "/contact" })` and a valid `#aanvraagformulier` target.

- [x] **Step 1: Write the failing anchor audit test**

Add a fixture with `<a href="#aanvraagformulier">` but no matching ID and assert `auditHtml()` reports `anker #aanvraagformulier ontbreekt`.

- [x] **Step 2: Verify the test fails for the missing behavior**

Run: `node --test tests/html-audit.test.mjs`
Expected: FAIL because the missing fragment target is not reported.

- [x] **Step 3: Implement fragment validation and the minimal CTA fix**

Preserve fragments long enough for `auditHtml()` to validate same-document targets, add `ctaHref` to `PageHero`, pass `#aanvraagformulier` from `/contact`, add the target ID to the form column and use `scroll-margin-top` in CSS.

- [x] **Step 4: Verify unit and one-off browser regression tests**

Run: `node --test tests/html-audit.test.mjs`, then click the CTA in Chromium at 1,440 x 900 and 390 x 844 and assert a non-zero scroll position, `#aanvraagformulier`, and target visibility.

### Task 2: Performance-safe media pipeline

**Files:**
- Modify: `tests/media.test.mjs`
- Create: `public/media/*.webp`
- Modify: `content/media.mjs`
- Modify: `components/content-image.js`
- Modify: `app/page.js`
- Modify: `app/contact/page.js`
- Modify: `app/over-ons/page.js`
- Modify: `app/keuring/page.js`
- Modify: selected service routes only when a new image is more relevant than the existing illustration
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `ContentImage({ image, priority })` and `contentImages` records.
- Produces: WebP-only image records with `ownerConfirmed`, `role`, `projectEvidence`, `disclosure` and responsive dimensions.

- [x] **Step 1: Write failing media-policy tests**

Require every registered content image to use `/media/*.webp`, carry `projectEvidence: false`, and keep each generated file below 250 KiB. Require generated marketing scenes to disclose `geen echte medewerker of klantcase`.

- [x] **Step 2: Verify the media tests fail against PNG assets**

Run: `node --test tests/media.test.mjs`
Expected: FAIL because existing registry paths end in `.png` and new WebP files do not exist.

- [x] **Step 3: Convert a curated, deduplicated selection**

Use Pillow with aspect-ratio preservation and WebP quality tuned between 68 and 78. Convert the six currently used legacy illustrations plus old `Keuring.png`; convert the supplied boiler, sanitary, consultation, arrival and diagnostic scenes; skip the duplicate arrival file and do not publish the synthetic two-person team or branded-fleet scenes as real proof.

- [x] **Step 4: Register and place images honestly**

Use `next/image`, explicit width/height and responsive `sizes`. Keep the homepage scene after the services section, place contact/over-ons media below primary copy, add the optimized legacy inspection image to `/keuring`, and retain visible disclosure captions.

- [x] **Step 5: Verify file budgets and responsive rendering**

Run media tests and inspect desktop/mobile screenshots. Assert no overflow, no missing alt text, and no eager loading except a deliberately selected LCP image (none in this release).

### Task 3: Nine official, model-scoped manufacturer catalogs

**Files:**
- Modify: `tests/fault-guides.test.mjs`
- Modify: `content/fault-catalogs.mjs` to export the shared catalog builder
- Create: `content/additional-fault-catalogs.mjs`
- Modify: `content/fault-guides.mjs`
- Modify: `content/site-content.mjs`

**Interfaces:**
- Consumes: `createFaultCatalog({ id, title, scope, sourceLabel, sourceUrl, sourcePages, rows })`.
- Produces: `additionalFaultCatalogs` keyed by `remeha`, `buderus`, `viessmann`, `acv`, `intergas`, `nefit-bosch`, `atag`, `itho-daalderop`, `ferroli`.

- [x] **Step 1: Write failing guide-presence and source-policy tests**

Expect thirteen guide slugs in the approved order, at least one non-empty official catalog per new brand, unique codes within each model table, HTTPS manufacturer sources, explicit model caveats, and consumer-safe actions.

- [x] **Step 2: Verify the tests fail because the nine guides are absent**

Run: `node --test tests/fault-guides.test.mjs`
Expected: FAIL on the guide slug list.

- [x] **Step 3: Add source-bounded catalogs from official manufacturer material**

Snapshot only rows verified in these official sources: Remeha Storingswijzer; Buderus Belgium manuals/ProWork documentation; Viessmann ViBooks manuals; ACV Prestige/HeatMaster manuals; Intergas consumer page and installation manuals; Nefit Bosch manuals; ATAGwarmte manuals and official code overview; Itho Daalderop product manuals; Ferroli Netherlands manuals. Keep each table separate by model or source and preserve combined codes exactly as published.

- [x] **Step 4: Add guide metadata and indexable registry entries**

Create unique Dutch titles/descriptions for all nine routes, update the hub description, and rely on existing `generateStaticParams()` and sitemap generation.

- [x] **Step 5: Verify catalog counts, search aliases and static generation**

Run guide tests and the production build. In Chromium, open every new page, verify initial counts, exercise one representative code query and model filter, and assert no console/page errors or overflow.

### Task 4: Documentation, crawl and release verification

**Files:**
- Modify: `SEO_CONTENT_INVENTORY.md`
- Modify: `SEO_CHANGELOG.md`
- Modify: `SEO_QA_REPORT.md`
- Modify: `docs/seo/evidence-register.md`
- Modify: `PROJECT_CONTENT_GUIDE.md` only if the image disclosure wording needs clarification

**Interfaces:**
- Consumes: verified test/build/browser results.
- Produces: auditable source scopes, counts, image policy and deployment evidence.

- [x] **Step 1: Update documentation with exact scopes and counts**

List every new route, official source family, model limitation, image role, compressed byte total and disclosure policy.

- [x] **Step 2: Run final verification**

Run: `npm test -- --runInBand`, `npm run lint`, `npm run build`, `git diff --check`, local `npm run seo:audit`, desktop/mobile Chromium checks and a secret scan.

- [x] **Step 3: Compare performance and transfer**

Measure homepage image requests and transferred bytes in Chromium; keep the primary content responsive and record the result without claiming lab Lighthouse values that were not measured.

- [ ] **Step 4: Commit, push and verify production**

Push normal commits to `main` without force, wait for Vercel `Ready`, repeat the public crawl and representative contact/image/fault-search browser checks, and record the deployment ID.
