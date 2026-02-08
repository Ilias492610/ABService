import { getSiteUrl, toAbsoluteUrl } from "@/libs/site";

const siteUrl = getSiteUrl();

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/404"],
      },
    ],
    sitemap: toAbsoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
