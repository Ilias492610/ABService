import LocalizedPrivacyPage from '@/components/localized-privacy-page';
import { localizedPageCandidates } from '@/content/localization.mjs';
import { buildPageMetadata } from '@/libs/seo-data.mjs';
export const metadata = buildPageMetadata(localizedPageCandidates.find(page => page.path === '/en/privacy'));
export default function PrivacyPage() { return <LocalizedPrivacyPage locale="en-BE" />; }
