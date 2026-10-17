import ContentImage from '@/components/content-image';
import ContactForm from '@/components/sections/contact-form';
import TrackedLink from '@/components/tracked-link';
import JsonLd from '@/components/json-ld';
import LanguageSwitcher from '@/components/language-switcher';
import { LocalizedBreadcrumbs, LocalizedPageHero } from '@/components/localized-page';
import { business } from '@/content/business.mjs';
import { contentImages } from '@/content/media.mjs';
import { getContactPageCopy } from '@/content/contact-page-localization.mjs';
import { getContactRoute, getLocaleCopy, getWhatsAppHref, localizedPageCandidates } from '@/content/localization.mjs';
import { CONTACT_SERVICES } from '@/libs/contact-validation.mjs';
import { buildPageSchema } from '@/libs/schema-data.mjs';

export default async function LocalizedContactPage({ locale, searchParams }) {
  const params = await searchParams;
  const nativeStatus = params?.contact === 'success' || params?.contact === 'error' ? params.contact : undefined;
  const initialService = typeof params?.dienst === 'string' && CONTACT_SERVICES.includes(params.dienst) ? params.dienst : '';
  const copy = getContactPageCopy(locale), shell = getLocaleCopy(locale), path = getContactRoute(locale);
  const page = localizedPageCandidates.find(page => page.path === path);
  return <>
    <JsonLd data={buildPageSchema(page)} id="page-schema" />
    <LocalizedBreadcrumbs locale={locale} name={copy.contact} path={path} />
    <div className="shell"><LanguageSwitcher locale={locale} path={path} /></div>
    <LocalizedPageHero locale={locale} eyebrow={copy.contact} title={copy.title} intro={copy.intro} ctaLabel={copy.cta} ctaHref="#aanvraagformulier" />
    <section className="section"><div className="shell contact-layout"><div id="aanvraagformulier" className="contact-form-panel" tabIndex={-1}>
      <p className="eyebrow">{copy.form}</p><h2>{copy.formHeading}</h2><ContactForm locale={locale} nativeStatus={nativeStatus} initialService={initialService} />
      <ContentImage image={{...contentImages.customerAdviceMarketing, alt:copy.imageAlt}} />
    </div><aside className="contact-aside"><h2>{copy.direct}</h2><dl>
      <div><dt>{shell.phone}</dt><dd><TrackedLink href={business.phoneHref} eventName="phone_click" eventProperties={{location:'contact_aside'}}>{business.phoneDisplay}</TrackedLink></dd></div>
      <div><dt>{shell.email}</dt><dd><TrackedLink href={`mailto:${business.email}`} eventName="email_click" eventProperties={{location:'contact_aside'}}>{business.email}</TrackedLink></dd></div>
      <div><dt>WhatsApp</dt><dd><TrackedLink href={getWhatsAppHref(locale)} eventName="whatsapp_click" eventProperties={{location:'contact_aside'}} target="_blank" rel="noreferrer">{copy.conversation}</TrackedLink></dd></div>
      <div><dt>{shell.availability}</dt><dd>{shell.hours}</dd></div><div><dt>{copy.company}</dt><dd>{business.vatId}</dd></div>
    </dl><div className="warning-box"><strong>{copy.warning}</strong><p>{copy.danger}</p></div></aside></div></section>
  </>;
}
