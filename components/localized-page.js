import Link from 'next/link';
import JsonLd from '@/components/json-ld';
import TrackedLink from '@/components/tracked-link';
import { business } from '@/content/business.mjs';
import { getContactPageCopy } from '@/content/contact-page-localization.mjs';
import { getContactRoute } from '@/content/localization.mjs';
import { buildBreadcrumbSchema } from '@/libs/schema-data.mjs';

export function LocalizedBreadcrumbs({ locale, name, path }) {
  const copy = getContactPageCopy(locale);
  const items = [{ name: copy.home, path: '/' }, { name, path }];
  return <><nav className="breadcrumbs shell" aria-label={copy.breadcrumbs}><ol><li><Link href="/">{copy.home}</Link></li><li><span aria-current="page">{name}</span></li></ol></nav><JsonLd data={{...buildBreadcrumbSchema(items), inLanguage: locale}} id="breadcrumb-schema" /></>;
}

export function LocalizedPageHero({ locale, eyebrow, title, intro, ctaLabel, ctaHref }) {
  const copy = getContactPageCopy(locale);
  return <section className="page-hero"><div className="shell hero-grid"><div>
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-intro">{intro}</p>
    <div className="button-row"><Link href={ctaHref || `${getContactRoute(locale)}#aanvraagformulier`} className="button">{ctaLabel || copy.defaultCta}</Link>
      <TrackedLink href={business.phoneHref} eventName="phone_click" eventProperties={{location:'hero'}} className="button button-secondary">{`${copy.call} ${business.phoneDisplay}`}</TrackedLink></div>
    </div><aside className="hero-aside" aria-label={copy.heroAsideLabel}><strong>{copy.heroAsideHeading}</strong><p>{copy.heroAside}</p><Link href="/tarieven">{copy.tariffs}</Link></aside>
  </div></section>;
}
