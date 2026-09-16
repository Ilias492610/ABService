# AB Service SEO Transformation Design

**Date:** 2026-09-16  
**Repository:** `https://github.com/Ilias492610/ABService.git`  
**Branch:** `codex/seo-transformation`  
**Status:** Approved direction, written-design review checkpoint

## 1. Purpose

Transform the existing AB Service Next.js website into a fast, technically sound, evidence-first local SEO platform without changing its established URLs or visual identity unnecessarily. The transformation must improve search usefulness and lead generation while removing unsupported claims, unsafe legal language, misleading proof, and fragile third-party code.

The work is an in-place upgrade. Existing contact channels and valid routes remain available. New pages become public only when their underlying business facts and content are supported by evidence.

## 2. Governing Principles

1. **Evidence before publication.** A business claim is public only when it is supported by repository evidence, an owner-supplied source, or an authoritative external source.
2. **No invented local SEO assets.** Do not fabricate addresses, service areas, reviews, projects, brands, prices, certifications, opening hours, response times, guarantees, years of experience, team members, awards, partnerships, or accreditations.
3. **User safety before conversion.** Gas, carbon monoxide, water, and electrical emergency guidance must be concise, conservative, and operationally safe.
4. **Search usefulness before page volume.** Thin doorway pages, duplicate locality pages, and lightly rewritten brand pages remain drafts.
5. **Server-first implementation.** Render important copy, headings, navigation, metadata, structured data, and internal links in the initial HTML.
6. **One source of truth.** Central registries control business facts, route publication state, navigation, metadata, schema, sitemap inclusion, and draft gates.
7. **Preserve what is already useful.** Keep valid URLs, recognizable brand styling, working forms, telephone/email/WhatsApp entry points, and useful service explanations.
8. **Belgian Dutch.** Public copy uses natural Dutch for a Belgian audience and avoids keyword stuffing.

## 3. Verified and Unverified Fact Policy

The initial repository audit supports the following facts for reuse, subject to a final consistency check:

- Brand name: AB Service.
- Canonical host: `https://www.abservice24.be`.
- The telephone number, email address, VAT number, and social/profile URLs already present in the repository may be retained only after they are centralized and checked for consistency.
- The owner-supplied master prompt confirms Antwerp as the primary market and confirms the core service scope: plumbing/sanitary work, heating maintenance, heating repair, heating inspection, and gas-boiler installation. The homepage may therefore target “loodgieter Antwerpen” naturally, while individual surrounding municipalities remain gated until separately confirmed.

The following claims are not treated as verified and must be removed, neutralized, or draft-gated unless the owner supplies evidence:

- 24/7 availability, same-day service, or intervention within 60 minutes.
- A physical customer-facing address, exact opening hours, or a staffed office.
- Named surrounding municipalities or a broad radius beyond the owner-confirmed Antwerp market.
- Official recognition, certificates, F-gas status, manufacturer authorization, or other accreditation.
- Review score, review count, testimonials, and aggregate-rating markup.
- Specific brands serviced or installed.
- Fixed prices, call-out charges, discounts, premiums, financing eligibility, or payment methods.
- Company age, founding year, staff size, team structure, partnerships, or project history.
- Warranty lengths or service guarantees beyond applicable law and an accepted written quote.
- Photographs presented as authentic staff, vehicles, customers, installations, reports, or completed projects when authenticity is not proven.

Unsupported claims are never inferred from filenames, stock imagery, old marketing copy, generated images, route names, or metadata.

## 4. Content-State Architecture

Every service, locality, brand, project, and guide entry has one explicit state:

- `published`: routable, indexable where appropriate, linked in navigation or clusters, and eligible for the sitemap.
- `noindex`: routable for continuity or user utility, excluded from the sitemap, and emitted with `noindex, follow` unless a stronger directive is justified.
- `draft`: not linked, not included in the sitemap, and not emitted as an indexable public page. Draft data may support future work but cannot silently become public.

The state lives in a central content registry rather than being duplicated inside components. Build-time checks fail when a draft route enters navigation or the sitemap, when a published page lacks required metadata, or when a registry entry points to an unavailable route.

Proposed source-of-truth modules:

- `lib/business.js`: verified name, host, contact channels, VAT number, profiles, and evidence notes.
- `content/services.js`: service definitions, publication state, route, metadata, related services, and allowed schema fields.
- `content/areas.js`: locality candidates and evidence status.
- `content/brands.js`: brand candidates and proof status.
- `content/projects.js`: genuine project records and media provenance.
- `content/guides.js`: fault-code and informational content state.

The exact filenames may be adjusted to fit the existing repository conventions, but the single-source-of-truth boundary must remain.

## 5. Initial Publication Matrix

### Public and indexable after rewrite

- `/`
- `/onderhoud`
- `/herstelling`
- `/keuring`
- `/installaties`
- `/installaties/gasketels`
- `/installaties/sanitair`
- `/tarieven`
- `/contact`
- `/faq`
- `/over-ons`
- `/foutcodes`
- `/foutcodes/vaillant`
- `/foutcodes/bulex`
- Legal pages that are accurate and required for users

The Vaillant and Bulex fault-code pages remain public only after model-dependence and safety limitations are made clear and their factual content passes review.

### Routable but temporarily `noindex`

- `/installaties/airconditioning`: retained for URL continuity, removed from primary navigation and sitemap, and stripped of unsupported F-gas/certification claims until genuine service and certification evidence exists.
- `/foutcodes/bosch` and `/foutcodes/junkers`: public only as useful, non-duplicative guides. If the present content remains thin or cannot be verified, preserve the URLs with `noindex, follow` rather than publishing empty code ranges.

### Draft and non-routable until supported

- Municipality/service-area landing pages.
- Brand-specific commercial service pages.
- Leak detection, leak repair, boiler, pipework, bathroom-renovation, or other new service pages not proven by owner evidence.
- `/projecten` and individual case studies until genuine project facts, location granularity, dates, scope, and authentic media are available.

Draft infrastructure will make later publication straightforward without exposing thin pages now.

## 6. Page and Copy Design

### Homepage

The homepage opens with a direct explanation of the verified services and clear contact choices. It must not claim round-the-clock service, a guaranteed response time, an unverified region, review metrics, or certifications. The page should route users into three primary intents: maintenance, repair, and inspection/installation. Trust comes from clarity, process, legal identity, and transparent limitations rather than invented social proof.

### Maintenance

The page must distinguish legal obligations from recommendations. For central-heating appliances using gaseous fuel in Flanders, mandatory periodic maintenance generally applies from 20 kW and is generally required every two years; lower-power systems can still benefit from maintenance without presenting it as a universal legal requirement. The copy must link to current Flemish guidance and avoid presenting AB Service itself as a recognized technician unless evidence is supplied. Any required recognition attaches to the individual technician.

Authoritative source: [Vlaanderen — verplicht onderhoud van uw cv-installatie](https://www.vlaanderen.be/verplicht-onderhoud-van-uw-cv-installatie-centrale-verwarming).

### Inspection

The inspection page must explain that first-use inspection is separate from periodic maintenance. It applies in specified circumstances such as a new, replaced, modified, or moved installation. It must describe what the customer should prepare without promising approval or misrepresenting recognition.

Authoritative source: [Vlaanderen — verplichte keuring van een nieuwe of gewijzigde cv-installatie](https://www.vlaanderen.be/verplichte-keuring-van-een-nieuwe-of-gewijzigde-cv-installatie).

### Repair

The repair page must explain symptoms, diagnostic flow, what information to provide, and when to stop using an appliance. It must not promise immediate attendance, stock availability, a first-visit fix, or manufacturer-specific authorization. Pricing language must explain that diagnosis, parts, access, urgency, and scope affect a quote.

### Gas safety

High-risk guidance must be short and conservative:

- Suspected gas leak: avoid flames and electrical switches, ventilate only if safe, leave the area, and contact the official emergency/distribution channel from a safe place.
- Suspected carbon monoxide: move into fresh air, seek emergency assistance, and do not re-enter or restart the installation until professionals declare it safe.
- Water near electrical components: avoid contact and isolate supplies only when this can be done safely.

The implementation must verify current Belgian emergency wording before publication and cannot substitute website content for emergency services.

### Installations

Installation pages explain assessment, sizing, options, quote scope, placement, commissioning, handover, and aftercare without presenting unverified brands or fixed packages. Boiler-renovation premium claims must be removed. Copy may say that measures change and customers should verify current eligibility directly with the relevant authority before deciding.

Authoritative source: [Vlaanderen/VEKA — current premiums and financing changes](https://www.vlaanderen.be/veka/webinar-over-premies-leningen-kortingen-en-warmtepompklaar-op-23-januari-2025).

### Sanitary/plumbing work

Describe only supported plumbing and sanitary work. Do not expand this route into complete bathroom renovation, emergency leak detection, or broad construction claims without evidence.

### Tariffs

Create `/tarieven` as an indexable transparency page without invented price points. It should explain the quote process, common cost drivers, what information improves an estimate, whether parts/materials and VAT are itemized in a written proposal, and that a binding scope is established in the accepted quote. It must not imply free diagnosis, fixed call-out rates, or universal guarantees.

### Contact

Show the centralized contact channels, expected information to provide, privacy notice, and a clear distinction between normal inquiries and dangerous situations. Preserve telephone, email, WhatsApp, and the contact form if each destination is valid. Do not display a map or customer-facing address without evidence.

### FAQ

Answer genuine user questions in visible HTML, grouped by service intent. FAQ structured data will not be used because commercial service sites are not generally eligible for Google FAQ rich results. Questions must not repeat unsupported promises.

### About

Describe the company through verifiable legal identity, the type of work it accepts, and its service process. Remove unverified origin stories, founding dates, team profiles, fleet claims, or trade relationships.

### Fault-code guides

Fault codes are model-dependent. Each guide must tell users to consult their exact appliance manual, avoid repeated unsafe resets, and stop if there is a gas smell, combustion concern, water/electrical risk, or recurring lockout. Codes are informational clues, not remote diagnoses. Official manufacturer documentation is preferred; unsupported code lists must be removed or draft-gated.

## 7. Navigation and Internal Linking

Primary navigation remains compact and intent-based:

- Services overview
- Maintenance
- Repair
- Inspection
- Installations
- Tariffs
- FAQ
- Contact

Air conditioning, local-area pages, project pages, and unverified brand pages are excluded. The footer repeats verified contact/legal information and links to core services, tariff guidance, FAQ, privacy, and terms where applicable.

Contextual links create coherent clusters:

- Maintenance ↔ inspection ↔ repair
- Installation overview ↔ gas boilers ↔ sanitary work ↔ tariffs
- Fault-code hub ↔ verified brand guides ↔ repair
- FAQ ↔ relevant service pages rather than generic calls to action

Breadcrumbs are visible on all appropriate interior pages and match BreadcrumbList schema.

## 8. Metadata, Canonicals, Sitemap, Robots, and 404

- Use one authoritative App Router sitemap implementation.
- Remove `next-sitemap` generation and all conflicting generated sitemap files.
- Include only canonical, indexable, successful URLs.
- Exclude robots, manifests, icons, images, redirects, 404s, `noindex` pages, drafts, and the sitemap itself.
- Do not fabricate `lastModified`. Emit it only when tied to a real content revision; otherwise omit it.
- Use `https://www.abservice24.be` consistently as the canonical origin.
- Supply unique Dutch titles and descriptions aligned with visible page content.
- Use page-specific Open Graph data and optimized, honest media. Do not present synthetic team/project scenes as documentary proof.
- Emit correct robots directives per content state.
- Ensure the custom 404 returns HTTP 404, uses `noindex`, provides useful navigation, and does not inherit the homepage canonical.
- Preserve current public URLs. Add permanent redirects only if implementation discovers a true duplicate that must be consolidated.

Keyword meta tags are not an SEO requirement and will not be used as a substitute for useful page content.

## 9. Structured Data

Structured data is emitted as a consistent `@graph` and mirrors visible, verified content:

- `Organization` with verified legal/contact properties.
- The most specific valid local service type supported by the evidence, such as `Plumber` and/or `HVACBusiness`, without an invented storefront address.
- `WebSite` with the canonical URL and name.
- `WebPage` or service-specific page entities where useful.
- `Service` for published services, using accurate provider and area only when verified.
- `BreadcrumbList` on interior pages with visible breadcrumbs.

The site must not emit:

- AggregateRating or Review markup from first-party or unverified review data.
- OpeningHours, address, geo coordinates, price ranges, certifications, service areas, awards, or `sameAs` URLs not supported by evidence.
- FAQPage markup merely to pursue rich results.
- Conflicting duplicate business entities from multiple components.

JSON-LD must parse as valid JSON and pass automated shape checks. Rich Results testing and Schema.org validation are recorded during QA, with the understanding that valid markup does not guarantee a search feature.

## 10. Reviews, Images, and Proof

Remove the slow Trust.Reviews widget, hardcoded `5.0`, hardcoded `15 reviews`, and any corresponding schema. Replace them with a lightweight text link to the verified Google Business Profile if the profile URL is confirmed. The site may invite users to read independent reviews without reproducing a score or count that can become stale.

Image policy:

- Retain neutral illustrations or decorative images only when they are clearly not offered as proof.
- Remove or reframe synthetic-looking staff, vehicle, inspection, installation, and project scenes that could mislead users.
- Do not add fake alt text that asserts a person, municipality, brand, project, or event not visible and verified.
- Give informative images concise Dutch alt text; use empty alt text for decorative images.
- Resize and recompress oversized files, use Next Image correctly, provide dimensions, and prioritize only the true LCP image.
- Establish an owner handoff guide for authentic project photography and metadata.

## 11. Forms, Tracking, and Privacy

Preserve the contact form and valid direct-contact channels. Strengthen validation on both client and server, retain accessible labels and error summaries, prevent duplicate submission, and provide a truthful success/failure state. Do not log sensitive message content or contact details into analytics.

Tracking must use only the analytics systems actually installed and intentionally retained. The current site loads Plausible and Vercel Analytics; the privacy page must describe the final implementation accurately and remove inaccurate Google Analytics/Google Ads claims unless those products are genuinely configured during the project.

Measured events should be limited and meaningful:

- Telephone click
- Email click
- WhatsApp click
- Contact form start
- Contact form success
- Contact form failure
- Primary service CTA click
- Outbound Google Business Profile click

There must be no invented booking/purchase events and no duplicate page-view tracking. Consent requirements are evaluated against the final tool configuration and documented. Tracking failures must never block contact actions.

## 12. Performance and Accessibility

The homepage performance budget is addressed first because the baseline transfer is approximately 8.6 MB and the measured mobile lab LCP is approximately 31 seconds.

Implementation priorities:

- Remove the third-party review widget and unnecessary client-side JavaScript.
- Remove Framer Motion if equivalent presentation can be achieved with minimal CSS and reduced-motion support.
- Remove unused packages and components, including unused Axios/toast code if confirmed by repository search.
- Replace oversized logo, hero, and service media with correctly sized compressed assets.
- Avoid lazy-loading the LCP image while lazy-loading below-the-fold imagery.
- Keep important content as server components; isolate only interactive form/menu behavior.
- Use semantic landmarks and a single descriptive H1 per page.
- Correct heading order, accessible names, visible keyboard focus, form labels, error association, color contrast, and touch-target sizing.
- Respect `prefers-reduced-motion`.
- Prevent layout shifts with explicit media dimensions and stable component shells.

Targets for representative production builds:

- No console errors on tested routes.
- No broken internal links, missing assets, or avoidable 4xx/5xx responses.
- Lighthouse mobile performance materially better than baseline, with homepage LCP reduced to a practical single-digit lab value under the same test conditions.
- Lighthouse SEO and accessibility at least 95 on the representative routes unless a documented tool limitation applies.
- Core page HTML remains useful with JavaScript disabled.

## 13. Dependency and Build Modernization

The current Next.js 14.0 dependency line has production advisories. The implementation will use a supported, tested patch line with the smallest reasonable migration surface:

- Next.js `15.5.25`
- React `19.3.0`
- React DOM `19.3.0`
- Matching `eslint-config-next` `15.5.25`
- Tailwind CSS `3.4.19`
- PostCSS `8.5.6` or a later compatible secure patch available at implementation time

Versions are validated against the package registry and application build before merge. If a listed version becomes unavailable or incompatible, use the nearest supported secure patch without crossing into a larger framework migration unless necessary.

Remove `next-sitemap`, the Trust.Reviews integration, and unused dependencies such as Axios, React Hot Toast, or Framer Motion when repository-wide usage checks confirm they are unnecessary. The result must pass production dependency audit review. Residual advisories, if any, are documented with package path, exploitability, and mitigation rather than hidden.

## 14. Test and QA Architecture

Feature work follows test-first development. Prefer small deterministic tests and repository-native tooling over a heavy test stack.

Automated checks cover:

- Business facts are centralized and legacy unsupported literals are absent from production source.
- Publication-state rules for navigation, sitemap, and routes.
- Every published page has a unique title, description, canonical, H1, and indexable robots policy.
- Every `noindex` page is excluded from the sitemap.
- Canonical URLs use the `www` HTTPS origin and return 200.
- Sitemap contains no non-page assets, self-reference, redirects, errors, or fabricated modification dates.
- JSON-LD parses and contains only allowed verified fields.
- Breadcrumb UI and schema agree.
- Internal links resolve in a production crawl.
- Forms validate required fields, reject malformed input, handle transport failure, and preserve accessible feedback.
- Tracking helpers emit expected event names without personal data.
- The 404 route returns 404, `noindex`, and no incorrect canonical.
- Public route copy excludes banned unsupported claims.
- Draft registries do not leak into public navigation or generated output.

Required verification commands include:

- Dependency install using the committed lockfile.
- Unit/content-policy test suite.
- Lint.
- Production build.
- Local production-server crawl.
- Schema parse/shape checks.
- Desktop and mobile browser inspection.
- Lighthouse runs under comparable settings for the homepage and representative service pages.
- Production dependency audit.

Manual browser QA covers at minimum the homepage, maintenance, repair, inspection, installation overview, gas boilers, sanitary work, tariffs, FAQ, contact, fault-code hub, one verified fault-code detail page, privacy, and 404 on both desktop and mobile widths. It checks menus, focus order, headings, CTAs, telephone/email/WhatsApp links, form states, privacy text, canonical output, responsive media, and console/network errors.

## 15. Documentation Deliverables

The repository will include the master prompt’s requested top-level documents:

- `SEO_MASTERPLAN.md`: architecture, search intents, page priorities, publication status, KPI framework, cadence, and next steps.
- `SEO_CONTENT_INVENTORY.md`: URL, title, H1, primary intent, indexability, status, internal links, evidence, and gaps.
- `LOCAL_SEO_EXTERNAL_ACTIONS.md`: Google Business Profile, category, service areas, reviews, citations, Search Console, Bing, Apple, advertising eligibility, and backlink actions.
- `SEO_QA_REPORT.md`: baseline, resolved and remaining findings, crawl, metadata, schema, browser, accessibility, Lighthouse, Core Web Vitals observations, and broken-link evidence.
- `SEO_CHANGELOG.md`: every material code, content, route, metadata, schema, tracking, and dependency change.
- `PROJECT_CONTENT_GUIDE.md`: the structured input format, authentic evidence, media requirements, and editing workflow for turning real jobs into project pages.

Supporting policy documents may live under `docs/seo/` for the evidence register, publication rules, and content-gap backlog, but they do not replace the six named deliverables above.

The final delivery report follows the master prompt’s requested A–K structure: executive summary, verified facts, inventory, implementation details, content decisions, technical SEO, local SEO, performance/accessibility, analytics/privacy, testing evidence, remaining owner actions, and risks/next steps.

## 16. External Local SEO and Account Work

Browser/account access can be used to inspect current configuration and collect evidence. Public or account-level mutations require an action-time confirmation immediately before submission, even though the repository transformation itself is approved.

External checks and recommendations include:

- Google Business Profile ownership, canonical name, primary category, services, website URL, phone, hours, photos, review link, and service-area configuration.
- Hide the address if customers are not served at that location; do not create a false storefront.
- Keep service areas accurate and limited to genuinely served locations rather than keyword coverage.
- Search Console ownership, domain variants, sitemap submission, indexing/canonical reports, Core Web Vitals, and query/page performance.
- Bing Webmaster Tools and Apple Business Connect consistency.
- Citation consistency across genuine directories.
- A compliant process for asking real customers for honest reviews without gating or incentives.
- Paid search/Local Services eligibility only after the relevant services, licenses, insurance, and operational claims are verified.
- Backlink opportunities based on genuine suppliers, memberships, community work, or published expertise; no purchased or fabricated links.

Guidance references:

- [Google Business Profile service-area guidance](https://support.google.com/business/answer/9157481?hl=en)
- [Google Business Profile address guidance](https://support.google.com/business/answer/2853879?hl=en)
- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google LocalBusiness structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google review rich-results policy](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful)

## 17. Migration and Rollback

- Work occurs on `codex/seo-transformation`.
- The unavailable iCloud-placeholder workspace has been moved intact to `/Users/hamda/Desktop/losse files/ABService-1-icloud-backup-20260916`.
- The active workspace is a fresh clone of the configured GitHub repository.
- Existing user changes are not overwritten.
- Public route changes are minimized; content-state gates handle unsupported sections without mass deletion.
- Each logical implementation phase is committed separately so it can be reviewed or reverted.
- Environment variables and mail delivery are checked without printing secrets.
- No deployment or public account mutation occurs without a final production-readiness review and action-time confirmation.

## 18. Acceptance Criteria

The transformation is complete only when:

1. All required master-prompt deliverables exist and are internally consistent.
2. Production pages contain no known unsupported claims or misleading proof.
3. Maintenance, first-use inspection, repair, and installation language is clearly separated and legally cautious.
4. Core pages are rewritten with useful, non-duplicative Belgian Dutch copy and clear contact paths.
5. `/tarieven` is live without invented prices.
6. Area, brand, project, and unsupported-service pages cannot leak from draft state into indexable output.
7. Reviews are linked without a stale or unverified score/count, and no review schema is emitted.
8. Air conditioning remains excluded from indexation and primary navigation until evidence supports publication.
9. One valid sitemap exists, robots/canonicals agree, and 404 behavior is correct.
10. Structured data contains only visible, verified facts and passes automated parse/shape checks.
11. Navigation, breadcrumbs, and internal links form coherent service and guide clusters.
12. Forms and contact channels work, validation is accessible, tracking is privacy-conscious, and privacy copy matches the code.
13. Images are optimized and synthetic assets are not presented as real-world evidence.
14. Lint, tests, production build, production crawl, schema checks, and browser QA pass.
15. Lighthouse comparisons show a material homepage improvement under comparable conditions.
16. Production dependency advisories are eliminated where a supported fix exists; any remainder is explicitly assessed.
17. External local SEO actions are recorded with exact owner inputs and confirmations still required.
18. The final A–K report includes evidence, limitations, remaining risks, and no unqualified success claims.

## 19. Out of Scope Until Evidence Exists

- Publishing new locality landing pages.
- Publishing commercial brand-service pages.
- Publishing project/case-study pages.
- Claiming air-conditioning certification or actively marketing that service.
- Adding review snippets, ratings, or testimonials.
- Publishing a street address, opening hours, precise coverage radius, price list, accreditation, team biography, or guarantee not supported by evidence.
- Translating the site into additional languages.
- Replacing the current contact operation with a booking or e-commerce system.

These items are not discarded; they remain documented content opportunities with explicit evidence gates.
