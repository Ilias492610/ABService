import { notFound } from "next/navigation";
import ServicePage from "@/components/service-page";
import { additionalServices, getAdditionalService } from "@/content/additional-services.mjs";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const dynamicParams = false;
export const generateStaticParams = () => additionalServices.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const definition = getPageDefinition(`/diensten/${slug}`);
  return definition ? buildPageMetadata(definition) : { robots: { index: false, follow: false } };
}

export default async function AdditionalServicePage({ params }) {
  const { slug } = await params;
  const service = getAdditionalService(slug);
  if (!service) notFound();

  return (
    <ServicePage
      breadcrumb={[
        { name: "Diensten", path: "/diensten" },
        { name: service.title, path: service.path },
      ]}
      eyebrow="Loodgietersdienst"
      title={service.title}
      intro={service.intro}
      answer={service.answer}
      warning={service.warning}
      image={contentImages[service.imageKey]}
      sections={service.sections}
      steps={service.steps}
      relatedLinks={[
        { label: "Alle diensten", href: "/diensten" },
        { label: "Bekijk uitgevoerde projecten", href: "/projecten" },
        { label: "Tarieven en offertes", href: "/tarieven" },
        { label: "Contact opnemen", href: "/contact" },
      ]}
    />
  );
}
