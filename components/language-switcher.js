import { getLanguagePaths, getLocaleCopy, LANGUAGE_NAMES } from "@/content/localization.mjs";

export default function LanguageSwitcher({ path, locale = "nl-BE" }) {
  const copy = getLocaleCopy(locale);
  const equivalents = getLanguagePaths(path);
  if (!equivalents) return (
    <nav className="language-entry-links" aria-label={copy.otherContacts}>
      <a href="/fr/contact" hrefLang="fr-BE" lang="fr">{copy.contactFR}</a>
      <a href="/en/contact" hrefLang="en-BE" lang="en">{copy.contactEN}</a>
    </nav>
  );
  return (
    <nav className="language-switcher" aria-label={copy.language}>
      {Object.entries(equivalents).map(([language, href]) => (
        <a key={language} href={href} hrefLang={language} lang={language.split("-")[0]} aria-current={language === locale ? "page" : undefined}>{LANGUAGE_NAMES[language]}</a>
      ))}
    </nav>
  );
}
