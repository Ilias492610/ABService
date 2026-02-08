import config from "@/config";
import { businessProfile, getSiteUrl, toAbsoluteUrl } from "@/libs/site";

const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${getSiteUrl()}/#organization`,
  name: businessProfile.name,
  legalName: businessProfile.legalName,
  url: getSiteUrl(),
  logo: toAbsoluteUrl("/icon.png"),
  image: toAbsoluteUrl("/LogoZ.png"),
  email: businessProfile.email,
  telephone: businessProfile.phoneInternational,
  vatID: businessProfile.vatId,
});

const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${getSiteUrl()}/#website`,
  name: config.appName,
  url: getSiteUrl(),
  inLanguage: "nl-BE",
});

const buildLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": `${getSiteUrl()}/#localbusiness`,
  name: businessProfile.name,
  url: getSiteUrl(),
  image: toAbsoluteUrl("/LogoZ.png"),
  logo: toAbsoluteUrl("/icon.png"),
  email: businessProfile.email,
  telephone: businessProfile.phoneInternational,
  areaServed: businessProfile.areaServed.map((cityName) => ({
    "@type": "City",
    name: cityName,
  })),
  address: {
    "@type": "PostalAddress",
    addressLocality: businessProfile.city,
    addressRegion: businessProfile.region,
    addressCountry: businessProfile.countryCode,
  },
  priceRange: "EUR",
});

export const getGlobalSchemaGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [buildOrganizationSchema(), buildWebsiteSchema(), buildLocalBusinessSchema()],
});
