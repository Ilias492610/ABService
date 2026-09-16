import { business } from "../content/business.mjs";

const canonicalFor = (path) =>
  new URL(path === "/" ? "/" : path, `${business.canonicalOrigin}/`).toString();

export const buildPageMetadata = (page) => {
  if (!page) {
    throw new Error("A page definition is required to build metadata.");
  }

  const canonical = canonicalFor(page.path);
  const indexable = page.status === "published";
  const image = `${business.canonicalOrigin}/opengraph-image`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
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
      locale: "nl_BE",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: business.name }],
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
    }));
