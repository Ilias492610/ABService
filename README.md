# AB Service website

Production website for AB Service, built with Next.js App Router. The site uses an evidence-first publication model: unsupported services, locations, brand relationships, reviews, prices and credentials must stay out of indexable output.

## Local setup

Use Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Environment

The contact form uses Mailgun. Configure these values in the deployment environment:

```env
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
MAILGUN_FROM=
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=ChIJ38_PKjPxw0cRMfEVYieHZDg
CONTACT_FORM_TO=
```

`CONTACT_FORM_TO` may contain a comma-separated recipient list. `GOOGLE_PLACES_API_KEY` must stay server-only and should be restricted to Places API (New); the public Place ID is the verified AB SERVICE profile. Never commit credentials. Vercel Analytics is rendered only in the Vercel environment.

## Verification

```bash
npm audit --omit=dev
npm test
npm run lint
npm run build
npm run start -- -p 3100
npm run seo:audit -- http://localhost:3100
```

The SEO audit crawls the built site and checks the sitemap, robots rules, metadata, canonicals, H1s, JSON-LD, image alternatives, internal links, draft/noindex boundaries and 404 behaviour.

## Content sources

- `content/business.mjs`: verified public business facts.
- `content/site-content.mjs`: route metadata and publication state.
- `content/fault-guides.mjs`: manufacturer-backed fault guidance.
- `content/content-backlog.mjs`: evidence-gated draft topics.
- `content/projects.mjs`: publication gate for real project cases.

See `SEO_MASTERPLAN.md`, `SEO_CONTENT_INVENTORY.md`, `LOCAL_SEO_EXTERNAL_ACTIONS.md`, `SEO_QA_REPORT.md`, `SEO_CHANGELOG.md` and `PROJECT_CONTENT_GUIDE.md` before publishing new SEO content.
