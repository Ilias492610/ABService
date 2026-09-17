import { business } from "../content/business.mjs";

const absoluteUrl = (origin, path) => new URL(path, `${origin}/`).toString();

export const buildGlobalSchemaGraph = (origin = business.canonicalOrigin) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: business.name,
      legalName: business.legalName,
      url: origin,
      email: business.email,
      telephone: business.phoneInternational,
      vatID: business.vatId,
      logo: absoluteUrl(origin, "/icon.png"),
    },
    {
      "@type": ["Plumber", "HVACBusiness"],
      "@id": `${origin}/#business`,
      name: business.name,
      url: origin,
      email: business.email,
      telephone: business.phoneInternational,
      vatID: business.vatId,
      image: absoluteUrl(origin, "/icon.png"),
      openingHours: business.openingHours,
      areaServed: business.serviceRegions.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      parentOrganization: { "@id": `${origin}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      name: business.name,
      url: origin,
      inLanguage: business.language,
      publisher: { "@id": `${origin}/#organization` },
    },
  ],
});

export const buildBreadcrumbSchema = (
  items,
  origin = business.canonicalOrigin
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(origin, item.path),
  })),
});
