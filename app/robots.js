import { business } from "@/content/business.mjs";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${business.canonicalOrigin}/sitemap.xml`,
    host: business.canonicalOrigin,
  };
}
