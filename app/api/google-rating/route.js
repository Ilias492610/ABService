import { getGoogleRating } from "@/libs/google-rating.server";

export const dynamic = "force-dynamic";

export async function GET() {
  const rating = await getGoogleRating();
  return Response.json({ rating }, {
    headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" },
  });
}
