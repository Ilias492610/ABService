# SEO refinements — 10 October 2026

Continue the owner's already approved SEO work without another approval loop. Work on a
feature branch in the accessible Documents checkout, preserving the site design, URLs,
owner photos, contact channels and evidence gates. GSC Wizard was declined and is out of scope.

## Social previews

Published non-home pages receive a unique 1200 × 630 PNG card built from their registered
title and topic. Keep the existing homepage card and neutral fallback for noindex pages.
Generate cards at build time using Next ImageResponse, without a client bundle, remote
images, customer data, fabricated statistics or purported project photography. Unknown,
draft and noindex paths must not generate a card. Open Graph and Twitter use the same URL;
alt text describes the actual page. Cards are assets, not sitemap pages.

## Further investigation

Investigate remaining development advisories before altering dependencies; do not force an
incompatible major update. Expand Remeha only from inspected official model-specific tables,
with consumer-safe actions, explicit model limits and direct source citations.

Inspected official Calenta BE archive revision 080715–117061-08 covers 15s/25s/28c/35s/40c:
23 individual E-codes in §11.1 p.79–82 and 19 Su blocking subcodes in §11.2.2 p.83–84.
Add both as separate catalogs, retaining Avanta and explicitly excluding Ace/Ace-Matic.
Accept colon, dot and space variants when filtering, while preserving code digits/model context.

## Gates

Test metadata and real card rendering, including long titles, exclusion and PNG dimensions;
inspect actual rendered head tags and image files after a production build. Run the complete
suite, lint, dependency audit, local/live crawl and independent diff review before release.
Keep lab, indexing and qualified-lead claims separate.

## Observed runtime follow-up

Production deployment of a94b108 reports Node24.x even though project settings and CI say22;
the open-ended package engine overrides project settings and selects the newest supported major.
Pin the already-running LTS major24.x in package/lock root, .nvmrc and CI; preserve all dependency
resolutions and public behaviour. Verify the full suite/lint/build/crawl under actualNode24,
then hosted clean install and production nodeVersion. Allow managed24patch updates, not newmajors.
Primary references checked10October2026: https://nodejs.org/en/about/previous-releases and
https://vercel.com/docs/functions/runtimes/node-js/node-js-versions.
