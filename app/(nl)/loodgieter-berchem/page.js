import DistrictPage from "@/components/district-page";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";
export const metadata = buildPageMetadata(getPageDefinition("/loodgieter-berchem"));
export default function Page() { return <DistrictPage slug="berchem" />; }
