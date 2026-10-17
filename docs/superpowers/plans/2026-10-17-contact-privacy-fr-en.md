# Contact en privacy FR EN Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Root implements inline under the existing owner instruction. One fresh whole-branch review; preserve both this plan's ledger and the parent masterplan recovery directory.

**Goal:** Publish complete French and English equivalents of contact and privacy, without changing existing Dutch URLs or inventing operational evidence.

**Architecture:** Explicit locale dictionaries and two equivalence groups; multiple native Next rootlayouts with URL-preserving Dutch route-group moves. Shared form behavior retains the Dutch contract and adds only allowlisted locale presentation/return paths. Four new published pages, not a site clone.

**Tech Stack:** Installed Next16.3.8/React19.3, native ESM, existing CSS/analytics/Mailgun interfaces and actual Node24. No dependency install or package/lock changes.

**Spec:** `docs/superpowers/specs/2026-10-17-contact-privacy-fr-en-design.md`, explicitly owner-approved17October. Plan status: owner approved17October2026; inline execution started. Task137 bounded release is accepted at `12bb624c5c8c8e5387ee56a4957db4ab1780c683`.

## Global Constraints

- Keep unprefixed Dutch URLs; no `/nl` migration, automatic IP/language redirect, new domain/project/account/OAuth/DNS, real mail, outreach or spend.
- Exact equivalent groups: `/contact`,`/fr/contact`,`/en/contact`; `/privacy-policy`,`/fr/confidentialite`,`/en/privacy`. No `/fr` or `/en` homepage in this release.
- Language identifiers `nl-BE`,`fr-BE`,`en-BE`; real first-response HTML language; no client-only document-language repair or request-header solution that makes all roots dynamic.
- Complete labels/nav/CTA/status/privacy translations; Dutch technical destinations labelled as Dutch. Model/code strings and Dutch CONTACT_SERVICES machine values unchanged.
- Prices, accountwork, WP16 deferred; proposal retention is not current practice. Case facts, personal recognition, physical/technical review, real receipt and commercial outcomes never invented.
- AI-assisted author/reviewer language checks are labelled honestly. This pilot does not close whole WP15 or establish a human professional reviewer.
- Preserve source annexes and parent137checkbox lines, all historical fixtures/hash literals and unrelated source bytes; explicit path/content transitions only.

## Review Focus

1. English or French labels with Dutch errors/native redirect/privacy or WhatsApp must not create a false complete-language experience.
2. A root-layout migration must not change Dutch URL status, canonical, content, tool handoff, image/metadata/API routes, error handling or ordinary404 behavior.
3. A user-supplied locale or return value must never become an arbitrary redirect, bypass validation/consent, change recipient configuration or leak contact data into analytics.
4. Language alternates must be self-inclusive and reciprocal only within the two true published equivalent groups; a home or nonexistent route is not a substitute.
5. A translated privacy statement, successful HTTP response or AI review must not turn unknown retention, real delivery, recognition or human review into established facts.

---

## Verification commands

Every command uses `/bin/sh`, `login:false`, working directory `/Users/hamda/Documents/ABService-1` and the real Node24 binary below. Prepend its `bin` directory to PATH for child scripts. Never install dependencies automatically.

```sh
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/localization-routing.test.mjs
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/localization-metadata.test.mjs tests/localization-shell.test.mjs
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/localization-contact.test.mjs tests/localization-privacy.test.mjs
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /opt/homebrew/lib/node_modules/npm/bin/npm-cli.js test
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /opt/homebrew/lib/node_modules/npm/bin/npm-cli.js run lint
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /opt/homebrew/lib/node_modules/npm/bin/npm-cli.js run build
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /opt/homebrew/lib/node_modules/npm/bin/npm-cli.js audit --omit=dev
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/seo-audit.mjs http://127.0.0.1:3195
/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/localization-audit.mjs http://127.0.0.1:3195
```

Use only an available own port for the actual production server and pass that port to both audit commands. GREEN means exit0/no failed tests, all existing Dutch published paths/canonicals retained, four new locale page200s and both exact equivalent groups. Full audit's known9dev findings remain separate from production zero. Save genuine RED output before code, and save each run without overwriting prior proof.

## Task 1: Root routing and Dutch preservation

**Files:** move existing `app/**/page.js` plus `app/layout.js`,`app/error.js`,`app/not-found.js` under `app/(nl)/` with the same relative suffix. Exact current roots: advies (index,drukverlies-cv-ketel,[slug]),algemene-voorwaarden,contact,diensten(index,[slug]),faq,foutcodes(index,[merk]),herstelling,installaties(index,airconditioning,gasketels,sanitair),keuring,loodgieter-berchem,loodgieter-berendrecht-zandvliet-lillo,loodgieter-borgerhout,loodgieter-borsbeek,loodgieter-deurne,loodgieter-ekeren,loodgieter-hoboken,loodgieter-merksem,loodgieter-wilrijk,merken(index,[merk]),onderhoud,over-ons,privacy-policy,projecten(index,[slug]),tarieven,tools(onderhoudscheck,watermetercheck),werkgebied(index,[regio]),androotpage. Leave `app/api`, `app/social`, metadata/robots/sitemap/manifest/globalCSS and image assets at their original paths. Create `tests/helpers/route-source-path.mjs`, `tests/localization-routing.test.mjs` and a captured public Dutch route manifest fixture. Adapt only affected existing test source loaders/explicit paths; no global fs monkeypatch or changed historical fixtures. Locale roots/shared shell follow in Task2; real French/English route200 integration follows in Task3, not an impossible early assertion against absent pages.

**Consumes:** spec route list; existing root shell and current published registry; committed Task137 base. **Produces:** unchanged Dutch first-response `nl-BE`, explicit `resolveRouteSourcePath(oldPath)`→original non-route path or exact `app/(nl)/...` path, unchanged Dutch public route set. Keep the Dutch root source intact except its exact relative CSS import; shared-shell extraction is a later explicit transition.

- [x] Capture all current tracked file hashes, complete NL root/contact/privacy outputs, published80URLs/canonicals/XML and ordinary404 response. Start from actual green baseline and owner-approved plan; task-start/read brief.
- [x] Write and run RED source-path tests `route_source_map_is_explicit`: `app/contact/page.js` resolves only to `app/(nl)/contact/page.js`, while `app/api/contact/route.js`, social/robots/sitemap/globalCSS remain unchanged. Pin captured Dutch route/status/canonical values before migration; existing loader failures after an isolated test-path move must be real missing-path failures, not syntax failures.
- [x] Make URL-neutral moves and minimal CSS-relative-import fix, retaining all original source bodies for inverse/path verification. Add the explicit resolver and apply it only at affected test source-read boundaries. No locale-prefix catchall. Read installed rootlayout/routegroups/internationalization/not-found guides before code.
- [x] Characterize global404 with the actual build. If multiple roots require it, explicitly use documented `app/global-not-found.js` and `experimental.globalNotFound:true`, reusing the existing Dutch404 document without changing user-facing meaning; record this installed experimental API choice. No generic200 fallback, no invented unsupported layout trick. Test unknown `/fr/missing`, `/en/missing`, `/de/contact` and unknown Dutch paths404/noindex.
- [x] Run routing integration, existing suite/lint/build and baseline output checks. All Dutch route bodies preserved except explicitly reviewed shell/language-control transitions; metadata/API/social/image routes remain reachable. Commit this coherent migration only if the whole tree builds; no push before whole release review.

## Task 2: Explicit locale data metadata and navigation

**Files:** new `content/localization.mjs`,`components/language-switcher.js`,`components/localized-root.js`,`app/fr/layout.js`,`app/en/layout.js`; modify `app/(nl)/layout.js`, `content/site-content.mjs`,`libs/seo-data.mjs`,`libs/schema-data.mjs`, `components/site-header.js`,`components/site-footer.js`,`components/floating-trust-signals.js`; test `tests/localization-metadata.test.mjs`,`tests/localization-shell.test.mjs` and affected existing source-preservation consumers.

**Consumes:** Task1 Dutch route group. **Produces:** `getLocaleCopy(locale)` (unsupported locale throws), `getLanguageAlternates(path)` (undefined for non-equivalents; exact absolute object for one of the six mapped pages), fixed contact/privacy route helpers, `LocalizedRoot({locale='nl-BE', children})` server document and shell component props defaulting to unchangedNL. Literal FR/EN layout wrappers pass their fixed locale. Shared Inter/CSS/schema/analytics/metadata behavior remains equivalent after this explicit shell extraction.

- [ ] Write RED tests with literal expected mapping for all three members of both groups: `nl-BE=https://www.abservice24.be/contact`, `fr-BE=.../fr/contact`, `en-BE=.../en/contact`; privacy uses the three exact paths above. `/herstelling` has no language alternates or fake home fallback. Test no draft/nonexistent target, correct selfcanonical/OG/page-schema language.
- [ ] Implement fixed dictionaries and explicit equivalent lookup. Add four candidate page definitions only for this accepted release; keep all existing registry values/dates intact. Missing required translations fail validation, not silentNL fallback. Keep entity identity shared, page language explicit.
- [ ] Write and run RED actual shell tests: the `LocalizedRoot` initial rendered document has `lang='nl-BE'/'fr-BE'/'en-BE'`; assert Français/English/active language, phone/email/WhatsApp number, legal seat/no reception and language-labelled Dutch destinations. Language switches use real anchors and full navigation between roots, no unsent-data persistence promise.
- [ ] Implement locale props/switcher with defaultNL compatibility, preserve current native menu/Escape/destination behavior. No rolemenu/focus trap or global language state. Verify whole suite and manual before/after shell samples, preserving old business elements/media/reviews.
- [ ] Commit the coherent data/shell change locally; do not claim public language routes or deploy yet.

## Task 3: Localized form validation and native API return paths

**Files:** `components/sections/contact-form.js`,`libs/contact-validation.mjs`,`app/api/contact/route.js`, locale contact dictionaries; new `app/fr/contact/page.js`,`app/en/contact/page.js`; reuse existing `app/(nl)/contact/page.js`, page hero/breadcrumb interfaces with optional localized labels. Tests `tests/localization-contact.test.mjs` plus existing contact-form/API/validation/context suites.

**Consumes:** Task2 fixed dictionaries/routes; existing CONTACT_SERVICES and contact fields. **Produces:** `normalizeContactLocale(value)`→one of three allowlisted locales (defaultNL for unsupported), fixed `getContactRoute(locale)`; `validateContactInput(input, {locale}={})` returns existing `{ok,data}` / `{ok:false,errors}` shape with translated errors and unchanged cleaned machine data; ContactForm optional locale defaultsNL.

- [ ] Add RED tests using the real validator/form/API loader: French/English blank-name/invalid-email/missingconsent/length errors translate; option values remain the exact existing12Dutch service values; defaultNL output and all validation limits unchanged.
- [ ] Add real API boundary tests with stubbed mail transport only: nativeFrench valid success→303 `/fr/contact?contact=success#aanvraagformulier`, nativeEnglish invalid→303 `/en/contact?contact=error#aanvraagformulier`, unknown locale→fixedNL. Malformed body fallback deliberatelyNL; no user-controlled return URL. JSON error/success status shape retained, language never bypasses consent, recipient configuration and escaping unchanged. No genuine mail sent.
- [ ] Implement locale-aware copy, hidden native locale (only where needed), localized visible option labels/errors/statuses and privacy path. Preserve pending lock, first invalid focus, server-error focus, start/success/failure event codes and filtered props, existing tool-handoff anchors and edited-prefill safeguards. Keep validator.data shape unchanged; carry locale separately in client/API context. Add internal preferred-language row only for a nonNL preference.
- [ ] Add and run RED production-response checks: `/fr/contact` and `/en/contact` return200 with initial `html lang` `fr-BE`/`en-BE`, one translatedH1 and selfcanonical; the pre-implementation404 response is the expected failure. Implement localized contact pages with the same meaning/limitations/fields and status/prefill contract. JSON and native return paths stay in the chosen locale. Translate PageHero/aside/Breadcrumb accessible copy as required without changing defaultNL behavior.
- [ ] Run all contact/regression suites and real local invalid-only browser/nativeHTTP probes; no send, realreceipt or booking claim. Commit coherent form/API/page change locally.

## Task 4: Faithful privacy translations and complete release acceptance

**Files:** create `app/fr/confidentialite/page.js`,`app/en/privacy/page.js`; translations in `content/localization.mjs`; adjust public registry/inventory/evidence/changelog/QA/masterplan status and `scripts/seo-audit.mjs` only as needed for genuine locale checks; new `tests/localization-privacy.test.mjs` and `scripts/localization-audit.mjs`.

**Consumes:** Tasks1–3. **Produces:** four complete candidate pages and two reciprocal equivalence groups, faithful privacy content and auditable multilingual release.

- [ ] Add RED rendered privacy tests for both languages: same controller/contact/seat/no reception, Mailgun/Vercel/Google/localtool behavior, unconfirmed analytics receipt and retention criteria, rights and exact counterpartlinks; no adopted30day policy or invented transfer/retention/legal compliance. Check oneH1, working local links and page language.
- [ ] Write natural faithful complete privacy translations and finish every visible shell/form string. AI-assisted author+independent reviewer verify functional meaning; no humanprofessionalreview claim. Existing technical guides and rules remainNL and no extra translation/home/local-page claims appear.
- [ ] Run actualNode24 fulltests/lint/build/prodaudit, fulltechnicalcrawl and localization-audit against production output. Check all oldNLroutes/canonicals/XML fields, four new route200s and correct initialHTMLlanguage, six selfcanonicals/reciprocal links, no dead/default-home language targets, stable metadata/API/OGassets and ordinary404. Real desktop/mobile/nativekeyboard language-switch/menu/validation/status/link checks, plus native POST HTTPcontract without real mail. Perform an actual JS-disabled browser check if the available documented browser controls support it; otherwise record that specific browser gate pending, never substitute HTTP or source review for it. Neither test proves actual received language enquiry.
- [ ] Freeze the whole candidate cohort and obtain one fresh independent highest-capability whole-branch review; root rules on all declined scope and fixes Important/Critical in one TDD pass. No claim of fullWP15/whole-site translation or operational receipt. Owner-price/account/WP16 and case/personal/physical/fieldgates unchanged.
- [ ] Publish only reviewed exact hashes to existingmain/Vercel under standing instruction; verify exactSHA/hostedCI/actualproviderReadyProductionwww/canonical and live functionality. IndexNow only the genuinely new substantial published URLs after valid public key and actuallive checks; do not resubmit unchangedNL URLs or docs/runtimeonly. Record bounded acceptance/backfills in both plan ledgers; preserve recovery and stop only owned test resources.

## Self review and handoff

Self-review against the complete spec: routes/rootHTML/404→Tasks1–3; full shell/language equivalents/SEO→Task2; existing field/consent/length/focus/native/JSON contract→Task3; faithful privacy/no invented evidence/source preservation and independent exact release→Task4. All five Review Focus conditions have explicit assertions in their owning tasks. Root routing precedes root shell; real locale route200 checks are deliberately Task3 when page files exist. No task requires an unavailable previous interface. No direct source bodies are retyped in the plan.

Root's existing inline method is retained. The owner approved this written implementation plan on17October2026. Task137 release is accepted; execution progress is recorded in this plan's own SDD ledger and crosslinked from the parent masterplan.
