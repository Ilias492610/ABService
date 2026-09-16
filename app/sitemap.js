import { pageRegistry } from "@/content/site-content.mjs";
import { buildSitemapEntries } from "@/libs/seo-data.mjs";

export default function sitemap() {
  return buildSitemapEntries(pageRegistry);
}
