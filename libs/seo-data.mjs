import { business } from "../content/business.mjs";
import { getSocialPreviewPath, getSocialPreviewTitle } from "./social-preview.mjs";
import { getLanguageAlternates } from "../content/localization.mjs";

const canonicalFor = (path) =>
  new URL(path === "/" ? "/" : path, `${business.canonicalOrigin}/`).toString();

export const buildPageMetadata = (page, { languageAlternates = Boolean(page?.locale) } = {}) => {
  if (!page) {
    throw new Error("A page definition is required to build metadata.");
  }

  const canonical = canonicalFor(page.path);
  const indexable = page.status === "published";
  const image = `${business.canonicalOrigin}${getSocialPreviewPath(page)}`;

  return {
    title: page.title,
    description: page.description,
    ...(page.kind === "article" ? { authors: [{ name: business.name, url: `${business.canonicalOrigin}/over-ons` }] } : {}),
    alternates: { canonical, ...(languageAlternates && getLanguageAlternates(page.path) ? { languages: getLanguageAlternates(page.path) } : {}) },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: business.name,
      locale: page.locale ? page.locale.replace("-", "_") : "nl_BE",
      type: page.kind === "article" ? "article" : "website",
      ...(page.kind === "article" && page.lastModified ? { modifiedTime: page.lastModified } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: indexable && page.path !== "/" ? `${getSocialPreviewTitle(page)} — ${business.name}` : business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
};

export const buildSitemapEntries = (pages) =>
  pages
    .filter((page) => page.status === "published")
    .map((page) => ({
      url: canonicalFor(page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(page.lastModified ? { lastModified: page.lastModified } : {}),
    }));
