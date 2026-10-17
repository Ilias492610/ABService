import { Inter } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import JsonLd from "@/components/json-ld";
import FloatingTrustSignals from "@/components/floating-trust-signals";
import PrivacyAnalytics from "@/components/privacy-analytics";
import CookieConsent from "@/components/cookie-consent";
import { buildGlobalSchemaGraph } from "@/libs/schema-data.mjs";
import { getLocaleCopy } from "@/content/localization.mjs";
import "../app/globals.css";

const inter = Inter({subsets:["latin"],display:"swap"});
export default function LocalizedRoot({locale="nl-BE",children}) {
  const copy = getLocaleCopy(locale);
  return <html lang={locale} className={inter.className}><body className={locale === "nl-BE" ? undefined : "localized-shell"}>
    <JsonLd data={buildGlobalSchemaGraph()} id="global-schema" />
    <a className="skip-link" href="#main-content">{copy.skip}</a>
    <SiteHeader locale={locale} /><main id="main-content"><CookieConsent locale={locale} />{children}</main><SiteFooter locale={locale} /><FloatingTrustSignals locale={locale} />
    {process.env.VERCEL ? <PrivacyAnalytics /> : null}
  </body></html>;
}
