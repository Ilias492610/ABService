import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./contact-runtime.mjs";
import * as business from "../../content/business.mjs";
import * as registry from "../../content/site-content.mjs";
import * as seo from "../../libs/seo-data.mjs";
import * as schema from "../../libs/schema-data.mjs";
import * as sources from "../../content/core-sources.mjs";
import * as media from "../../content/media.mjs";
import * as intents from "../../content/service-intents.mjs";

const tracked = await loadContactModule("components/tracked-link.js", {
  "@vercel/analytics": { track() { throw new Error("Analytics is not expected during sanitary SSR"); } },
});
const shared = { "@/content/business.mjs": business, "@/components/tracked-link": tracked };
const hero = await loadContactModule("components/page-hero.js", shared);
const cta = await loadContactModule("components/contact-cta.js", shared);
const image = await loadContactModule("components/content-image.js", {
  "next/image": ({ priority, sizes, ...props }) => React.createElement("img", props),
});
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema,
});
const renderer = await loadContactModule("components/service-page.js", {
  "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/content-image": image, "@/components/breadcrumbs": breadcrumbs,
  "@/content/service-intents.mjs": intents,
});
export const sanitaryRoute = await loadContactModule("app/installaties/sanitair/page.js", {
  "@/components/service-page": renderer, "@/content/core-sources.mjs": sources,
  "@/content/media.mjs": media, "@/libs/seo-data.mjs": seo, "@/content/site-content.mjs": registry,
});
export const renderSanitary = () => renderToStaticMarkup(sanitaryRoute.default());
