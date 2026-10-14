import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./contact-runtime.mjs";
import * as business from "../../content/business.mjs";
import * as registry from "../../content/site-content.mjs";
import * as seo from "../../libs/seo-data.mjs";
import * as schema from "../../libs/schema-data.mjs";
import * as sources from "../../content/core-sources.mjs";

const tracked = await loadContactModule("components/tracked-link.js", {
  "@vercel/analytics": { track() { throw new Error("Analytics is not expected during FAQ SSR"); } },
});
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": tracked };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema,
});
export const faqRoute = await loadContactModule("app/faq/page.js", {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/breadcrumbs": breadcrumbs, "@/content/site-content.mjs": registry,
  "@/content/core-sources.mjs": sources, "@/libs/seo-data.mjs": seo,
});
export const renderFaq = () => renderToStaticMarkup(faqRoute.default());
