import { pageRegistry } from "../content/site-content.mjs";

export const getSocialPreviewPath = (page) =>
  page.status === "published" && page.path !== "/"
    ? `/social${page.path}`
    : "/opengraph-image";

export const getSocialPreviewTitle = (page) => page.title.replace(/ \| AB Service$/, "");

export const getSocialPreviewPage = (slug) => {
  if (!Array.isArray(slug) || slug.length === 0 || slug.some((segment) => typeof segment !== "string" || !/^[a-z0-9-]+$/.test(segment))) return null;
  const path = `/${slug.join("/")}`;
  return pageRegistry.find((page) => page.path === path && page.status === "published") || null;
};
