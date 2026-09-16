# AB Service Project Content Guide

Project pages are proof, not filler. Do not create `/projecten` or a case-study URL until at least one real record passes the publication gate in `content/projects.mjs`.

## Required record

```js
{
  title: "Gasketel vervangen in Hoboken",
  status: "published",
  service: "Gasketelinstallatie",
  city: "Hoboken",
  approximateDate: "2026-08",
  situation: "Feitelijke beginsituatie zonder klantidentificatie.",
  workPerformed: ["Concrete stap 1", "Concrete stap 2"],
  outcome: "Feitelijk resultaat zonder prestatiegarantie.",
  authenticPhotos: [
    { src: "/projecten/bestandsnaam.webp", verified: true }
  ],
  customerApproval: true,
  workEvidence: "Interne verwijzing naar werkbon/factuur, niet publiek tonen."
}
```

## Evidence checklist

- Work order, invoice or equivalent proves AB Service performed the work.
- Municipality is accurate; no precise address is published.
- Date is approved and may be shown at month/year granularity.
- Service, initial situation, work and outcome match the evidence.
- Every photo is original to this job and its provenance is recorded.
- Written permission covers publication of the approved text and images.
- Faces, number plates, house numbers, documents, screens and identifying interiors are removed or explicitly approved.
- Brand/product references are visible or documented; no partnership is implied.
- Recognition or compliance claims are backed by the required document and person.

## Photo capture

Capture horizontal and vertical originals before, during and after the work. Include useful technical context, but never show unsafe behaviour. Keep original files outside the web repository. Export web copies with descriptive names, suitable dimensions and metadata removed where privacy requires it.

Do not use AI-generated, stock or unrelated imagery as a completed-project photograph. Neutral illustration is acceptable only when clearly labelled and not part of the proof section.

The existing files registered in `content/media.mjs` are owner-confirmed website assets, but they are classified as `role: "illustration"` and `projectEvidence: false`. They may support service or advice pages with their supplied caption. They cannot unlock a project page, prove a technician, certify a location or serve as before/after evidence.

## Writing structure

1. One-sentence answer: what was done and in which approved municipality.
2. The customer situation, anonymized.
3. Constraints found during assessment.
4. Work performed in factual sequence.
5. Materials/product only where verified.
6. Outcome and handover documents without guarantees beyond evidence.
7. Authentic photo captions.
8. Links to the relevant service, municipality page if published, and contact.

## Project-to-area evidence workflow

For every completed project, record municipality, Antwerp district where applicable, service,
brand, problem, solution, authentic photos and approved review/testimonial status. Once a validated
case is published:

1. set `hasProjectEvidence: true` on the matching service-area record;
2. link the project to the relevant central service page;
3. link the project to the municipality/district page if one is published;
4. link it to the matching province/Brussels hub;
5. add a reciprocal project link from the area page only when it is genuinely relevant;
6. reassess—but do not automatically publish—the municipality page.

A single project strengthens geographic evidence but does not prove a branch, review score,
permanent local presence or guaranteed availability.

## SEO rules

- URL: `/projecten/descriptive-service-city-slug`.
- Unique title, description and H1.
- Canonical to itself only after publication.
- `Article` or `BlogPosting` schema only when semantically accurate; never add Review or rating markup.
- Include the project in the sitemap only after it returns 200, passes content review and becomes `published`.
- A project does not automatically justify a locality page. The locality gate also requires service coverage and useful local information.

## Editorial workflow

1. Technician/content editor completes the record and evidence checklist.
2. Owner verifies operational facts and permission.
3. Developer adds optimized media and a `draft` record.
4. Reviewer runs `validateProjectForPublication` and checks privacy.
5. Page is previewed with `noindex` outside production or kept non-routable.
6. After approval, change status to `published`, add internal links and run test/lint/build/crawl/browser QA.
7. Record publication in `SEO_CHANGELOG.md` and inventory.
