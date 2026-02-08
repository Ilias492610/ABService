import { toAbsoluteUrl } from "@/libs/site";
import { foutcodesBrands } from "@/libs/foutcodes-data";

const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/onderhoud", changeFrequency: "weekly", priority: 0.8 },
  { path: "/herstelling", changeFrequency: "weekly", priority: 0.8 },
  { path: "/keuring", changeFrequency: "weekly", priority: 0.8 },
  { path: "/installaties", changeFrequency: "weekly", priority: 0.8 },
  { path: "/installaties/gasketels", changeFrequency: "weekly", priority: 0.7 },
  { path: "/installaties/sanitair", changeFrequency: "weekly", priority: 0.7 },
  { path: "/installaties/airconditioning", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "weekly", priority: 0.8 },
  { path: "/foutcodes", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/over-ons", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/algemene-voorwaarden", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap() {
  const now = new Date();
  const brandRoutes = foutcodesBrands.map((brand) => ({
    url: toAbsoluteUrl(`/foutcodes/${brand.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: toAbsoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...brandRoutes,
  ];
}
