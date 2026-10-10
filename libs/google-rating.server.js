import "server-only";
import { business } from "@/content/business.mjs";
import { createRatingLoader } from "@/libs/google-rating.mjs";

const configuredPlace = process.env.GOOGLE_PLACE_ID || business.googlePlaceId;

export const getGoogleRating = createRatingLoader({
  apiKey: process.env.GOOGLE_PLACES_API_KEY,
  placeId: configuredPlace === business.googlePlaceId ? configuredPlace : "",
});
