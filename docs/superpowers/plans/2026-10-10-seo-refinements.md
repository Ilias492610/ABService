# SEO refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve source-bounded SEO details without waiting on authenticated Google data.
**Architecture:** Build-time registry-driven social cards; isolated dependency and manufacturer investigations.
**Tech Stack:** Next.js 16.3.8, React 19, ImageResponse, node:test.
**Spec:** `docs/superpowers/specs/2026-10-10-seo-refinements.md`

## Global Constraints

- No GSC Wizard, invented business facts, new paid services or mass locality pages.
- Preserve existing URLs, owner media, design and contact functionality.
- Cards are 1200 × 630 PNG assets, generated only for published pages.
- Use the existing Documents checkout on a feature branch; root implements, agents investigate/review.

## Review Focus

- Parent file-based metadata must not replace a page's unique preview: inspect the built head.
- Unknown, draft and noindex card requests must return 404, not reflect supplied text.
- Long page titles must remain legible without clipping: inspect representative PNGs.
- Preview assets must not enter sitemap or add page-load image/JavaScript requests.
- Model expansion and dependency changes require their own evidence, not optimistic assumptions.

### Task 1: Page-specific social cards

**Files:** `libs/social-preview.mjs`, `components/social-preview-card.mjs`, `app/social/[...slug]/route.js`,
`libs/seo-data.mjs`, `tests/seo-data.test.mjs`, `tests/social-preview.test.mjs`.
**Interfaces:** Metadata consumes registered pages; `getSocialPreviewPath(page)` returns an asset
path, `getSocialPreviewPage(slug)` returns only a published definition, `SocialPreviewCard({page})`
returns a React element; route awaits params and emits ImageResponse.

- [x] Add metadata test: `/projecten/gasketel-vervangen` uses `/social/projecten/gasketel-vervangen`,
  Twitter matches; homepage/noindex retain `/opengraph-image`; published paths are unique.
- [x] Run `node --test tests/seo-data.test.mjs`; expected failure: generic project image.
- [x] Implement registry-safe card path and page lookup; add real rendering tests for project,
  advice, long title, unknown and noindex paths. Expected missing implementation first, then pass.
- [x] Build static card handler; run `npm test`, `npm run lint`, `npm run build`.
  Expected all green; request actual card and built head, inspect PNG dimensions/appearance.
- [x] Independent review, update evidence/inventory/QA/changelog, commit and publish tested changes.
  Verify exact GitHub/Vercel release and live crawl before claiming completion.

### Investigation follow-ups

Add independently testable tasks only when actual dependency/source evidence establishes the remedy.
Do not publish speculative catalog rows or upgrade blindly.

### Task 2: Calenta source-bounded catalog and forgiving code input

**Files:** `content/additional-fault-catalogs.mjs`, `content/fault-guides.mjs`,
`content/site-content.mjs`, `libs/fault-search.mjs`, `components/fault-code-catalog.js`,
`tests/fault-guides.test.mjs`, `tests/fault-search.test.mjs`.
**Interfaces:** Existing createFaultCatalog consumes rows/code/meaning/action/source; existing
FaultCodeCatalog consumes catalogs; `filterFaultCatalogs(catalogs, query, catalogId)` returns
non-empty groups while preserving each model's meaning.

- [x] Add failing exact independent fixtures: Calenta E00–12,14,16,17,34–40 (23); Su0,1,2,7–11,13–22,25 (19).
  E02 is the shorted flow sensor, not Avanta's temperature relation; preserve Avanta17.
- [x] `node --test tests/fault-guides.test.mjs` expected missing Calenta catalog, then implement
  the two cited tables with no installer repair instructions and update true lastModified.
- [x] Add filter tests: `E02`, `E:02` and `E.02` all find their model-specific records, Su14 works,
  selecting Avanta never returns Calenta, unknown input returns no rows. Watch missing behavior,
  then use the tested helper in the actual component; keep all digits and prefixes intact.
- [x] Run full tests/lint/build/crawl and desktop/mobile real filtering checks. Inspect SSR rows
  and source links. Expected green, visible59Remeha explanations, no horizontal overflow.
- [x] Include both tasks in final independent review and tested release documentation/publication.

Dependency investigation: nine dev-tree findings confirmed, zero production findings. Removing
Tailwind alone changes the applied Preflight reset; a full safe fix does not have a compatible
published patch. Keep the styling pipeline this release; track unresolved developer-only risk.

### Task 3: Pin the actual production LTS major and align CI

**Files:** `package.json`, package-lock root engines, `.nvmrc`, `.github/workflows/seo-quality.yml`,
`tests/runtime-config.test.mjs` and dated release records.
**Observed defect:** Vercel effective24.x vs CI22 with loose >=20.9.0; do not change dependency graph.

- [x] Add runtime contract regression and run under actual bundledNode24; expect loose-engine failure.
- [x] Set engine/lock to24.x, CI/node-version hint to24; run actualNode24 suite/lint/build/localcrawl.
- [ ] Independent scoped review, publish, verify hosted clean install and productionnodeVersion24.x.
  Record a94b108's separate live crawl/202IndexNow receipt; no repeated notification for runtime-only edits.
