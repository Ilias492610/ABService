const safeHttpsUrl = (value) => {
  if (typeof value !== "string" || value.length > 2_048) return "";

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
};

const localizedText = (value) =>
  typeof value?.text === "string" ? value.text.trim() : "";

const normalizedRating = (value) => {
  const rating = Number(value);
  return Number.isFinite(rating) && rating >= 1 && rating <= 5 ? rating : null;
};

const normalizeReview = (review) => {
  if (!review || typeof review !== "object") return null;

  const authorName =
    typeof review.authorAttribution?.displayName === "string"
      ? review.authorAttribution.displayName.trim()
      : "";
  const text = localizedText(review.text) || localizedText(review.originalText);
  const rating = normalizedRating(review.rating);

  if (!authorName || !text || rating === null) return null;

  return {
    name: typeof review.name === "string" ? review.name : "",
    rating,
    text,
    originalText: localizedText(review.originalText),
    languageCode:
      typeof review.text?.languageCode === "string" ? review.text.languageCode : "",
    originalLanguageCode:
      typeof review.originalText?.languageCode === "string"
        ? review.originalText.languageCode
        : "",
    relativePublishTimeDescription:
      typeof review.relativePublishTimeDescription === "string"
        ? review.relativePublishTimeDescription.trim()
        : "",
    publishTime:
      typeof review.publishTime === "string" ? review.publishTime : "",
    googleMapsUri: safeHttpsUrl(review.googleMapsUri),
    flagContentUri: safeHttpsUrl(review.flagContentUri),
    author: {
      displayName: authorName,
      uri: safeHttpsUrl(review.authorAttribution?.uri),
      photoUri: safeHttpsUrl(review.authorAttribution?.photoUri),
    },
  };
};

export const normalizeGooglePlace = (place, expectedPlaceId = "") => {
  if (!place || typeof place !== "object") return null;
  if (typeof place.id !== "string" || !place.id) return null;
  if (expectedPlaceId && place.id !== expectedPlaceId) return null;

  const rating = normalizedRating(place.rating);
  const userRatingCount = Number(place.userRatingCount);
  const displayName = localizedText(place.displayName);
  const googleMapsUri = safeHttpsUrl(place.googleMapsUri);

  if (
    !displayName ||
    rating === null ||
    !Number.isInteger(userRatingCount) ||
    userRatingCount < 0 ||
    !googleMapsUri
  ) {
    return null;
  }

  return {
    id: place.id,
    displayName,
    rating,
    userRatingCount,
    googleMapsUri,
    reviews: Array.isArray(place.reviews)
      ? place.reviews.map(normalizeReview).filter(Boolean).slice(0, 5)
      : [],
  };
};

export const formatGoogleRating = (rating) =>
  new Intl.NumberFormat("nl-BE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);
