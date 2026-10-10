import { normalizeGoogleRating } from "./google-reviews.mjs";

// This limits one warm server instance. It does not cap a distributed deployment's API bill.
// Only simultaneous callers share an in-flight response; Places content is never cached.
export const createRatingLoader = ({
  apiKey, placeId, fetcher = fetch, now = Date.now,
  maxRequests = 12, windowMs = 60_000,
}) => {
  let inFlight = null;
  let windowStarted = now();
  let requests = 0;

  return async () => {
    if (!apiKey || !placeId) return null;
    if (inFlight) return inFlight;
    if (now() - windowStarted >= windowMs) {
      windowStarted = now();
      requests = 0;
    }
    if (requests >= maxRequests) return null;
    requests += 1;

    inFlight = (async () => {
      try {
        const response = await fetcher(
          `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=nl&regionCode=BE`,
          {
            headers: {
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,googleMapsUri",
            },
            cache: "no-store",
            signal: AbortSignal.timeout(2_500),
          }
        );
        return response.ok ? normalizeGoogleRating(await response.json(), placeId) : null;
      } catch {
        return null;
      }
    })();

    try {
      return await inFlight;
    } finally {
      inFlight = null;
    }
  };
};
