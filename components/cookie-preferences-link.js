"use client";

import { getPrivacyRoute } from "@/content/localization.mjs";
import { getCookieConsentCopy } from "@/content/cookie-consent-copy.mjs";
import { requestConsentSettings } from "@/libs/cookie-consent-store.mjs";

export default function CookiePreferencesLink({locale = "nl-BE"}) {
  return <a href={getPrivacyRoute(locale) + "#cookievoorkeuren"} onClick={event => {
    if (requestConsentSettings()) event.preventDefault();
  }}>{getCookieConsentCopy(locale).settings}</a>;
}
