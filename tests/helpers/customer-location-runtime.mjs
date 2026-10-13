import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadContactModule } from "./contact-runtime.mjs";
import * as business from "../../content/business.mjs";
import * as media from "../../content/media.mjs";
import * as seo from "../../libs/seo-data.mjs";
import * as site from "../../content/site-content.mjs";
import * as schema from "../../libs/schema-data.mjs";
import * as reviewFormatting from "../../libs/google-reviews.mjs";

// Real page/widget/form modules. Framework URL/image adapters are inert;
// only the external Google server-data boundary returns unavailable data.
const Link = ({ children, ...props }) => React.createElement("a", props, children);
const Image = ({ priority: _priority, unoptimized: _unoptimized, ...props }) => React.createElement("img", props);
export const renderEvents = [];
const tracked = await loadContactModule("components/tracked-link.js", {
  "next/link": Link, "@vercel/analytics": { track: (...args) => renderEvents.push(args) },
});
const common = { "next/link": Link, "@/components/tracked-link": tracked, "@/content/business.mjs": business };
const hero = await loadContactModule("components/page-hero.js", common);
const cta = await loadContactModule("components/contact-cta.js", common);
const image = await loadContactModule("components/content-image.js", { "next/image": Image });
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  "next/link": Link, "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema,
});
const form = await loadContactModule("components/sections/contact-form.js", {
  "next/link": Link, "@vercel/analytics": { track: (...args) => renderEvents.push(args) },
});
const reviews = await loadContactModule("components/sections/google-reviews.js", {
  ...common, "next/image": Image, "@/components/review-stars.mjs": await import("../../components/review-stars.mjs"),
  "@/libs/google-reviews.mjs": reviewFormatting,
  "@/libs/google-reviews.server.js": { getGoogleReviews: async () => null },
});
const pages = {
  ...common, "@/components/page-hero": hero, "@/components/contact-cta": cta,
  "@/components/content-image": image, "@/components/sections/google-reviews": reviews,
  "@/components/breadcrumbs": breadcrumbs, "@/components/sections/contact-form": form,
  "@/content/media.mjs": media, "@/libs/seo-data.mjs": seo, "@/content/site-content.mjs": site,
};
export const homeRoute = await loadContactModule("app/page.js", pages);
export const contactRoute = await loadContactModule("app/contact/page.js", pages);

// Static React cannot await this server component: resolve its actual returned
// tree, leaving every synchronous component for the real React renderer.
async function resolveReviews(node) {
  if (!React.isValidElement(node)) return node;
  if (node.type === reviews.default) return resolveReviews(await node.type(node.props));
  if (node.props.children === undefined) return node;
  const children = await Promise.all(React.Children.toArray(node.props.children).map(resolveReviews));
  return React.cloneElement(node, {}, ...children);
}
export const renderHome = async () => renderToStaticMarkup(await resolveReviews(homeRoute.default()));
export const renderContact = async (params = {}) => renderToStaticMarkup(await contactRoute.default({ searchParams: Promise.resolve(params) }));
