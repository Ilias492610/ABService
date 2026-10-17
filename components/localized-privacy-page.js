import CookiePolicy from '@/components/cookie-policy';
import { COOKIE_POLICY_UPDATED } from '@/content/cookie-policy-date.mjs';
import JsonLd from '@/components/json-ld';
import LanguageSwitcher from '@/components/language-switcher';
import { LocalizedBreadcrumbs, LocalizedPageHero } from '@/components/localized-page';
import { LocalizedSeat } from '@/components/localized-shell';
import { business } from '@/content/business.mjs';
import { getPrivacyCopy } from '@/content/privacy-localization.mjs';
import { getPrivacyRoute, localizedPageCandidates } from '@/content/localization.mjs';
import { buildPageSchema } from '@/libs/schema-data.mjs';

export default function LocalizedPrivacyPage({ locale }) {
  const copy = getPrivacyCopy(locale), path = getPrivacyRoute(locale);
  const page = localizedPageCandidates.find(page => page.path === path);
  return <>
    <JsonLd data={buildPageSchema(page)} id="page-schema" />
    <LocalizedBreadcrumbs locale={locale} name={copy.name} path={path} />
    <div className="shell"><LanguageSwitcher locale={locale} path={path} /></div>
    <LocalizedPageHero locale={locale} eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
    <section className="section"><div className="shell legal-copy">
      <h2>{copy.headings[0]}</h2><p>{copy.controller.replace('{vat}',business.vatId)} <a href={`mailto:${business.email}`}>{business.email}</a>.</p><LocalizedSeat locale={locale} />
      <h2>{copy.headings[1]}</h2><p>{copy.contact}</p>
      <h2>{copy.headings[2]}</h2><p>{copy.mailgun}</p>
      <h2>{copy.headings[3]}</h2><CookiePolicy locale={locale} /><p>{copy.analytics}</p>
      <h2>{copy.headings[4]}</h2><p>{copy.googleBefore}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{copy.googleLink}</a>{copy.googleAfter}</p>
      <h2>{copy.headings[5]}</h2><p>{copy.technical}</p>
      <h2>{copy.headings[6]}</h2><p>{copy.rights}</p>
      <h2>{copy.headings[7]}</h2><p>{copy.maintenance}</p><p>{copy.water}</p><p>{copy.updated}<time dateTime={COOKIE_POLICY_UPDATED}>{copy.date}</time>{copy.changes}</p>
    </div></section>
  </>;
}
