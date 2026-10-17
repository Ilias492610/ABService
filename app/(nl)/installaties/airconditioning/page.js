import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import PageHero from "@/components/page-hero";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/installaties/airconditioning"));

export default function AirConditioningPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Installaties", path: "/installaties" }, { name: "Airconditioning", path: "/installaties/airconditioning" }]} />
      <PageHero eyebrow="Tijdelijk niet actief" title="Airconditioning is niet opgenomen in het actieve websiteaanbod" intro="Deze URL blijft bereikbaar voor bestaande links, maar is uitgesloten van navigatie, sitemap en zoekindex totdat dienstverlening en eventueel vereiste certificering met actuele evidence zijn bevestigd." />
      <section className="section"><div className="shell narrow"><p className="answer-box">Voor de nu bevestigde diensten kunt u terecht bij <Link href="/installaties">verwarming en sanitair</Link>. Neem contact op als u wilt vragen welke mogelijkheden momenteel daadwerkelijk beschikbaar zijn.</p></div></section>
    </>
  );
}
