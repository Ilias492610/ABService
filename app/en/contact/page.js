import LocalizedContactPage from '@/components/localized-contact-page';
import { localizedPageCandidates } from '@/content/localization.mjs';
import { buildPageMetadata } from '@/libs/seo-data.mjs';
export const metadata = buildPageMetadata(localizedPageCandidates.find(page => page.path === '/en/contact'));
export default function ContactPage({ searchParams }) { return LocalizedContactPage({ locale:'en-BE', searchParams }); }
