import { ImageResponse } from "next/og";
import { pageRegistry } from "@/content/site-content.mjs";
import { getSocialPreviewPage } from "@/libs/social-preview.mjs";
import { SocialPreviewCard } from "@/components/social-preview-card.mjs";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => pageRegistry
  .filter((page) => page.status === "published" && page.path !== "/")
  .map((page) => ({ slug: page.path.slice(1).split("/") }));

export async function GET(_request, { params }) {
  const { slug } = await params;
  const page = getSocialPreviewPage(slug);
  if (!page) return new Response(null, { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  return new ImageResponse(SocialPreviewCard({ page }), {
    width: 1200,
    height: 630,
    headers: { "X-Robots-Tag": "noindex" },
  });
}
