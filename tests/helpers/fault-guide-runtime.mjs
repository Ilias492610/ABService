import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./contact-runtime.mjs";
import * as business from "../../content/business.mjs";
import * as guides from "../../content/fault-guides.mjs";
import * as registry from "../../content/site-content.mjs";
import * as seo from "../../libs/seo-data.mjs";
import * as schema from "../../libs/schema-data.mjs";

// Render complete real modules; only framework navigation/analytics are inert.
// Native navigation, focus and event isolation have separate browser gates.
const Link = ({ children, ...props }) => createElement("a", props, children);
const events = [];
const navigation = { "next/link": Link };
const tracked = await loadContactModule("components/tracked-link.js", {
  ...navigation, "@vercel/analytics": { track: (...args) => events.push(args) },
});
const shared = { ...navigation, "@/content/business.mjs": business, "@/components/tracked-link": tracked };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  ...navigation, "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema,
});
const catalog = await loadContactModule("components/fault-code-catalog.js", {
  "@/libs/fault-search.mjs": await import("../../libs/fault-search.mjs"),
});
export const faultGuideRoute = await loadContactModule("app/foutcodes/[merk]/page.js", {
  ...navigation, "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/breadcrumbs": breadcrumbs, "@/components/fault-code-catalog": catalog,
  "@/content/fault-guides.mjs": guides, "@/content/site-content.mjs": registry,
  "@/libs/seo-data.mjs": seo,
});
export const paramsFor = (slug) => ({ params: Promise.resolve({ merk: slug }) });
export const renderFaultGuide = async (slug) => renderToStaticMarkup(await faultGuideRoute.default(paramsFor(slug)));
export const faultGuideRenderEvents = events;
