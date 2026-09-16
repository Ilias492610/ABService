# AB Service SEO QA Report

**Audit date:** 16 September 2026  
**Branch:** `codex/seo-transformation`  
**Test target:** local Next.js production server on port 3100

## Original baseline

| Page | Performance | Accessibility | Best practices | SEO | Lab LCP | Transfer |
|---|---:|---:|---:|---:|---:|---:|
| Homepage | 75 | 95 | 96 | 92 | 31 s | 8.6 MB |
| Maintenance | 93 | 94 | 96 | 92 | 3.2 s | 3.1 MB |

Original findings included a third-party review widget, 8.4 MB of homepage images, hardcoded rating/count, two sitemap systems, fabricated build-date `lastmod`, incorrect privacy text, unsafe legal/commercial claims, weak 404 canonical behaviour and no automated SEO tests.

## Final Lighthouse results

Lighthouse 13.0.1, mobile defaults, headless Chrome, local production build:

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage | 98 | 100 | 100 | 100 | 0.8 s | 2.3 s | 10 ms | 0 | 251 KiB |
| Maintenance | 98 | 100 | 100 | 100 | 0.8 s | 2.3 s | 0 ms | 0 | 251 KiB |

The homepage lab LCP improved by 28.7 seconds under comparable mobile Lighthouse conditions. Transfer fell by approximately 97%.

## Automated verification

- `npm audit --omit=dev`: zero vulnerabilities.
- `npm test`: 25 tests pass, zero fail.
- `npm run lint`: ESLint flat-config run passes with zero warnings/errors.
- `npm run build`: Next.js 16.3.5 production build passes; 29 routes generated.
- `npm run seo:audit -- http://localhost:3100`: 20 routable pages and 20 internal links pass.

The SEO crawl verifies:

- sitemap equals the central published registry;
- no fabricated `lastmod` fields;
- robots points to the canonical sitemap and protects `/api/`;
- 200 status for all registered public/noindex pages;
- no unexpected internal redirects;
- unique title and meta description for every published page;
- one H1 per page;
- production canonical origin;
- `noindex` on withheld routes;
- valid JSON-LD syntax;
- no duplicated JSON-LD payloads;
- alt attributes on rendered images;
- all internal HTTP links below 400;
- true 404 status, `noindex` and no inherited canonical.

## Schema checks

- Global graph parses as JSON and contains Organization, WebSite and a Plumber/HVACBusiness entity.
- No address, geo, hours, price range, aggregate rating, review, award or certification is emitted.
- `areaServed` contains only owner-confirmed Antwerp.
- Interior pages emit BreadcrumbList matching the visible breadcrumb.
- FAQPage schema was removed.
- Unit tests guard verified-only properties and breadcrumb ordering.

## Browser checks

Chrome desktop and 390×844 mobile viewport were inspected against the production server.

- Homepage hierarchy and responsive hero render correctly.
- Mobile navigation exposes Home, installations, five published service links, tariffs, fault codes, FAQ and contact; air conditioning is absent.
- No horizontal overflow at 390 px.
- Contact form exposes labels for all 11 controls and appropriate input types/length limits.
- Client and server reject missing, implausible, oversized and unrecognized service values.
- Telephone, email and WhatsApp links are present.
- Browser console showed no application-origin error. Observed errors were from installed Chrome extensions only.
- Bosch and pressure-loss pages were rechecked at desktop width and at a 390×844 mobile viewport; headings, tables, links, menu behaviour and illustration captions remain readable without visible horizontal overflow.
- Six legacy images are delivered with `next/image`, responsive `sizes`, descriptive neutral alt text and a visible “geen klantcase” caption. A unit test prevents these assets from being promoted to project evidence.
- A live Mailgun submission was not sent: the local environment has no `MAILGUN_API_KEY`, and a real submission would create an external message. Client/server validation is automated; delivery must be smoke-tested in the configured deployment.

## Resolved technical issues

- Replaced dual sitemap generation with one App Router sitemap.
- Removed `next-sitemap`, review widget, Framer Motion, React Hot Toast, Axios, Lucide and DaisyUI dependencies.
- Removed unused client components and synthetic-proof sections from page output.
- Upgraded Next.js 14.0 to 16.3.5 and adopted ESLint flat config.
- Removed the framework disclosure header and added nosniff, frame, referrer and browser-permission security headers.
- Removed unconfigured Plausible v4 integration because no site-specific script URL existed; privacy text now matches Vercel Analytics only.
- Vercel Analytics loads only on Vercel to avoid local 404 console noise.
- Corrected accent contrast from 4.08:1 to approximately 5.54:1 on white.
- Removed current-date sitemap modification claims.
- Retained correct `noindex` handling for air conditioning and published Bosch/Junkers only after mapping a bounded code set to official Bosch documentation.
- Added the indexable pressure-loss guide, navigation/footer links and source-aware internal links.

## Remaining operational checks

- Add and test `MAILGUN_API_KEY`, sending domain and recipient configuration in Vercel.
- Verify the Google Business Profile URL before adding the outbound profile link.
- After deployment, rerun the crawl and Lighthouse against the live canonical host.
- Validate representative schema with Google Rich Results Test and Schema.org validator after public deployment.
- Confirm Vercel Web Analytics is enabled for the production project and events appear without personal data.
- Review the legally operative terms with a Belgian legal professional before adding stricter commercial clauses.
