import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { loadContactModule } from "./contact-runtime.mjs";
import * as business from "../../content/business.mjs";
import * as seo from "../../libs/seo-data.mjs";
import * as site from "../../content/site-content.mjs";
import * as schema from "../../libs/schema-data.mjs";
import {beforeLocalizationReleaseHtml} from '../fixtures/localization-release-history.mjs';

// The complete real modules run through SWC and React. Only framework Link and
// inert analytics transport are adapted; no legal identity or consumer is mocked.
const Link = ({ children, ...props }) => React.createElement("a", props, children);
export const renderEvents = [];
const tracked = await loadContactModule("components/tracked-link.js", {
  "next/link": Link, "@vercel/analytics": { track: (...args) => renderEvents.push(args) },
}, {document:{cookie:`ab_service_consent=1.${Date.now()}.1.0`},window:{}});
const common = { "next/link": Link, "@/components/tracked-link": tracked, "@/content/business.mjs": business };
const hero = await loadContactModule("components/page-hero.js", common);
const jsonLd = await loadContactModule("components/json-ld.js");
const breadcrumbs = await loadContactModule("components/breadcrumbs.js", {
  "next/link": Link, "@/components/json-ld": jsonLd, "@/libs/schema-data.mjs": schema,
});
const dependencies = { ...common, "@/components/page-hero": hero, "@/components/breadcrumbs": breadcrumbs,
  "@/libs/seo-data.mjs": seo, "@/content/site-content.mjs": site };
dependencies["@/components/registered-seat"] = await loadContactModule("components/registered-seat.js", {
  "@/content/legal-identity.mjs": await import("../../content/legal-identity.mjs"),
});
const capturedAt = JSON.parse(readFileSync(new URL("../fixtures/registered-seat-facts.json", import.meta.url), "utf8")).capturedAt;
// Freeze only the footer VM clock to its actual pre-product capture time. Its
// complete real module still renders; policy dates and production Date stay real.
class CapturedFooterDate extends Date {
  constructor(...args) { super(...(args.length ? args : [capturedAt])); }
  static now() { return Date.parse(capturedAt); }
}
export const footer = await loadContactModule("components/site-footer.js", dependencies, { Date: CapturedFooterDate });
export const privacyRoute = await loadContactModule("app/privacy-policy/page.js", dependencies);
export const termsRoute = await loadContactModule("app/algemene-voorwaarden/page.js", dependencies);
export const renderFooter = () => renderToStaticMarkup(React.createElement(footer.default));
export async function renderFooterWithDate(DateConstructor) {
  const compiledFooter = await loadContactModule("components/site-footer.js", dependencies, { Date: DateConstructor });
  return renderToStaticMarkup(React.createElement(compiledFooter.default));
}
export const renderPrivacy = () => beforeLocalizationReleaseHtml(renderToStaticMarkup(React.createElement(privacyRoute.default)), '/privacy-policy');
export const renderTerms = () => renderToStaticMarkup(React.createElement(termsRoute.default));
export const renderGlobalSchema = () => renderToStaticMarkup(React.createElement(jsonLd.default, { data: schema.buildGlobalSchemaGraph() }));
