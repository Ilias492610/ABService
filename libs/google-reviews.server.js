import "server-only";

import { connection } from "next/server";
import { business } from "@/content/business.mjs";
import { normalizeGooglePlace } from "@/libs/google-reviews.mjs";

const PLACE_FIELDS = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews",
].join(",");

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || business.googlePlaceId;

  if (!apiKey || !placeId) return null;

  await connection();

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=nl&regionCode=BE`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": PLACE_FIELDS,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(5_000),
      }
    );

    if (!response.ok) return null;

    return normalizeGooglePlace(await response.json(), placeId);
  } catch {
    return null;
  }
}
