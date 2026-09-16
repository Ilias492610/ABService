# AB Service SEO Content Inventory

## Published routes

| URL | Title | H1 | Primary intent | Indexability | Main internal links | Evidence basis |
|---|---|---|---|---|---|---|
| `/` | Loodgieter en verwarmingsservice in Antwerpen \| AB Service | Verwarming en sanitair, helder aangepakt | Local entity and service discovery | Index | Core services, tariffs, contact | Owner-confirmed Antwerp market and core scope |
| `/onderhoud` | Onderhoud van uw cv-ketel in Antwerpen \| AB Service | Onderhoud van uw cv-ketel in Antwerpen | Maintenance duty and request | Index | Inspection, repair, tariffs | Owner scope plus Vlaanderen guidance |
| `/herstelling` | Herstelling van verwarming en cv-ketel \| AB Service | Herstelling van cv-ketel en verwarming | Repair and safe triage | Index | Fault codes, pressure loss, maintenance, tariffs | Owner scope; conservative safety guidance |
| `/keuring` | Keuring van een cv-installatie in Antwerpen \| AB Service | Keuring van een nieuwe of gewijzigde cv-installatie | First-use inspection | Index | Maintenance, gas boilers, contact | Owner scope plus Vlaanderen guidance |
| `/installaties` | Installaties voor verwarming en sanitair \| AB Service | Verwarming en sanitair installeren met een duidelijke scope | Installation overview | Index | Gas boilers, sanitary, contact | Owner-confirmed core scope |
| `/installaties/gasketels` | Gasketel laten installeren in Antwerpen \| AB Service | Een gasketel laten plaatsen of vervangen in Antwerpen | Gas-boiler installation | Index | Installation, inspection, tariffs | Owner scope; current premium caution |
| `/installaties/sanitair` | Sanitaire installatie en loodgieterswerk \| AB Service | Sanitaire installatie en loodgieterswerk in Antwerpen | Sanitary/plumbing installation | Index | Installation, tariffs, contact | Owner-confirmed plumbing/sanitary scope |
| `/tarieven` | Tarieven en offertes voor loodgieterswerk \| AB Service | Tarieven zonder lokprijs of verrassende belofte | Pricing and quote process | Index | Contact, services | No amounts claimed; process-only content |
| `/contact` | Contact opnemen met AB Service | Leg uw vraag voor aan AB Service | Contact and lead capture | Index | Privacy, tariffs | Verified phone, email and VAT from repository |
| `/faq` | Veelgestelde vragen over verwarming en sanitair \| AB Service | Heldere antwoorden over verwarming en sanitair | Cross-service questions | Index | Maintenance, inspection, repair, tariffs | Rewritten from verified page facts |
| `/over-ons` | Over AB Service \| Loodgieter en verwarming Antwerpen | Eén duidelijk aanspreekpunt voor verwarming en sanitair | Entity explanation | Index | Contact | Legal/contact identity and owner-confirmed scope |
| `/foutcodes` | Foutcodes van cv-ketels: veilige eerste stappen \| AB Service | Gebruik een foutcode als aanwijzing, niet als diagnose | Fault-code hub | Index | Vaillant, Bulex, Bosch, Junkers, pressure loss, contact | Manufacturer-link publication policy |
| `/foutcodes/vaillant` | Vaillant foutcodes: betekenis en veilig handelen \| AB Service | Vaillant foutcodes: betekenis en veilige eerste stap | Vaillant fault guidance | Index | Hub, contact | Official Vaillant Belgium fault-code page |
| `/foutcodes/bulex` | Bulex foutcodes: betekenis en veilig handelen \| AB Service | Bulex foutcodes: betekenis en veilige eerste stap | Bulex fault guidance | Index | Hub, contact | Official Bulex Belgium fault-code page |
| `/foutcodes/bosch` | Bosch foutcodes: officiële bron en veilige stappen \| AB Service | Bosch foutcodes: betekenis en veilige eerste stap | Bosch fault guidance | Index | Hub, contact, official documentation | Official Bosch codebook; limited to named Serie -4 scope |
| `/foutcodes/junkers` | Junkers foutcodes: officiële bron en veilige stappen \| AB Service | Junkers foutcodes: betekenis en veilige eerste stap | Junkers fault guidance | Index | Hub, contact, official documentation | Official Bosch codebook and older-device documentation; limited to named Serie -4 scope |
| `/advies/drukverlies-cv-ketel` | Drukverlies bij uw cv-ketel: oorzaken en veilige controle \| AB Service | Drukverlies bij uw cv-ketel: wat kunt u veilig controleren? | Pressure-loss information and safe triage | Index | Repair, fault codes, maintenance | Official Bosch user guidance; model-dependent pressure warning |
| `/privacy-policy` | Privacybeleid \| AB Service | Hoe AB Service website- en contactgegevens verwerkt | Privacy information | Index | Contact/legal | Matches Mailgun, Vercel hosting and Vercel Analytics code |
| `/algemene-voorwaarden` | Algemene voorwaarden \| AB Service | Afspraken horen bij de concrete offerte of opdracht | General commercial framework | Index | Contact/legal | Conservative framework; no invented price/warranty clauses |

## Routable but withheld from index

| URL | H1 | Status | Reason | Sitemap/nav |
|---|---|---|---|---|
| `/installaties/airconditioning` | Airconditioning is niet opgenomen in het actieve websiteaanbod | `noindex, follow` | Active service and F-gas/certification evidence missing | Excluded |

## Draft, non-routable candidates

### Locality pages

Hoboken, Wilrijk, Deurne, Berchem, Merksem, Borgerhout, Edegem, Mortsel, Ekeren and Kontich. Each needs owner-confirmed coverage, genuine local work evidence and unique local value.

### Commercial brand pages

Vaillant, Bulex, Bosch, Junkers, Buderus and Viessmann service pages. Fault-code guides do not prove that AB Service is an authorized partner or actively services every brand.

### Additional service pages

Leak detection, water-leak repair, drain unblocking, boiler work, pipework and bathroom renovation. Each needs confirmation of current operational scope and authentic work evidence.

### Projects

`/projecten` and detail pages remain unbuilt/non-indexable until at least one complete case passes `validateProjectForPublication` and the checks in `PROJECT_CONTENT_GUIDE.md`.

## Removed SEO risks

- No location-doorway pages.
- No commercial brand pages inferred from logos or fault-code content.
- No FAQPage schema.
- No review score/count or AggregateRating.
- No air-conditioning navigation or sitemap entry.
- No synthetic staff, fleet or project imagery presented as proof.
- Owner-supplied legacy images are labelled as illustrations and centrally marked `projectEvidence: false`.
- No sitemap entries for icons, manifest, robots or sitemap files.
