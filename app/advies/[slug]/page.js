import { notFound } from "next/navigation";
import ServicePage from "@/components/service-page";
import JsonLd from "@/components/json-ld";
import { adviceGuides, getAdviceGuide } from "@/content/advice-guides.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { buildArticleSchema } from "@/libs/schema-data.mjs";

export const dynamicParams = false;
export const generateStaticParams = () => adviceGuides.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }) {
  const guide = getAdviceGuide((await params).slug);
  if (!guide) notFound();
  return buildPageMetadata(getPageDefinition(guide.path));
}

export default async function AdviceGuidePage({ params }) {
  const guide = getAdviceGuide((await params).slug);
  if (!guide) notFound();
  return <>
    <JsonLd id="article-schema" data={buildArticleSchema(guide)} />
    <ServicePage {...guide} breadcrumb={[{ name: "Advies", path: "/advies" }, { name: guide.title, path: guide.path }]} editorial={{ checkedAt: guide.checkedAt }} />
  </>;
}
