import config from "@/config";

const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

const productionSiteUrl = trimTrailingSlash(
  process.env.SITE_URL || config.siteUrl || `https://${config.domainName}`
);

export const getSiteUrl = () =>
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : productionSiteUrl;

export const toAbsoluteUrl = (pathname = "/") => {
  const baseUrl = `${getSiteUrl()}/`;
  return new URL(pathname, baseUrl).toString();
};

export const businessProfile = {
  name: config.appName,
  legalName: config.appName,
  email: config.mailgun?.supportEmail || "info@abservice24.be",
  phoneDisplay: "0484 906 966",
  phoneInternational: "+32484906966",
  vatId: "BE0792.534.639",
  city: "Antwerpen",
  region: "Antwerpen",
  countryCode: "BE",
  areaServed: [
    "Antwerpen",
    "Berchem",
    "Deurne",
    "Merksem",
    "Wilrijk",
    "Hoboken",
    "Borgerhout",
    "Edegem",
    "Kontich",
    "Brasschaat",
    "Schoten",
  ],
};
