import {getCookiePolicy} from "@/content/cookie-policy.mjs";
import CookiePreferencesLink from "@/components/cookie-preferences-link";

export default function CookiePolicy({locale = "nl-BE"}) {
  const copy = getCookiePolicy(locale);
  return <div className="cookie-policy" id="cookievoorkeuren">
    <h3>{copy.title}</h3>
    <p>{copy.necessary}</p><p>{copy.analytics}</p><p>{copy.photos}</p><p>{copy.withdrawal}</p><p>{copy.providers}</p>
    <p><CookiePreferencesLink locale={locale} /></p>
  </div>;
}
