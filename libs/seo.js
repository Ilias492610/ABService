import config from "@/config";
import { getSiteUrl, toAbsoluteUrl } from "@/libs/site";

const defaultOgImage = {
  url: toAbsoluteUrl("/LogoZ.png"),
  width: 1200,
  height: 630,
  alt: `${config.appName} logo`,
};

const normalizeImages = (images) => {
  if (!images) {
    return [defaultOgImage];
  }

  const imageList = Array.isArray(images) ? images : [images];

  return imageList.map((image) => {
    if (typeof image === "string") {
      return { url: image };
    }

    if (image && image.url) {
      return image;
    }

    return defaultOgImage;
  });
};

// Shared SEO defaults used by page-level metadata declarations.
export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
} = {}) => {
  const siteUrl = getSiteUrl();
  const canonicalRelative = canonicalUrlRelative || "/";
  const canonicalUrl = toAbsoluteUrl(canonicalRelative);
  const normalizedImages = normalizeImages(
    openGraph?.images || openGraph?.image || defaultOgImage
  );

  const verification = process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined;

  return {
    title: title || config.appName,
    description: description || config.appDescription,
    keywords: keywords || [config.appName],
    applicationName: config.appName,
    creator: config.appName,
    publisher: config.appName,
    category: "Heating and plumbing services",
    metadataBase: new URL(siteUrl),
    manifest: "/manifest.webmanifest",
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", sizes: "48x48", type: "image/png" },
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico"],
    },
    alternates: {
      canonical: canonicalRelative,
    },
    openGraph: {
      title: openGraph?.title || title || config.appName,
      description: openGraph?.description || description || config.appDescription,
      url: openGraph?.url || canonicalUrl,
      siteName: config.appName,
      images: normalizedImages,
      locale: "nl_BE",
      type: "website",
    },
    twitter: {
      title: openGraph?.title || title || config.appName,
      description: openGraph?.description || description || config.appDescription,
      card: "summary_large_image",
      images: normalizedImages.map((image) => image.url),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(verification && { verification }),
    ...extraTags,
  };
};
