import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  formatGoogleRating,
  normalizeGooglePlace,
} from "../libs/google-reviews.mjs";

const placeId = "ChIJ38_PKjPxw0cRMfEVYieHZDg";

test("normalizes official Google place and review attribution fields", () => {
  const place = normalizeGooglePlace(
    {
      id: placeId,
      displayName: { text: "AB SERVICE" },
      rating: 5,
      userRatingCount: 35,
      googleMapsUri: "https://maps.google.com/?cid=4063521367014109489",
      reviews: [
        {
          name: `places/${placeId}/reviews/one`,
          rating: 5,
          text: { text: "Heel tevreden.", languageCode: "nl" },
          originalText: { text: "Très satisfait.", languageCode: "fr" },
          relativePublishTimeDescription: "een maand geleden",
          publishTime: "2026-08-10T09:00:00Z",
          googleMapsUri: "https://maps.google.com/review/one",
          flagContentUri: "https://www.google.com/local/review/flag/one",
          authorAttribution: {
            displayName: "Voorbeeldklant",
            uri: "https://www.google.com/maps/contrib/example",
            photoUri: "https://lh3.googleusercontent.com/example",
          },
        },
      ],
    },
    placeId
  );

  assert.equal(place.displayName, "AB SERVICE");
  assert.equal(place.rating, 5);
  assert.equal(place.userRatingCount, 35);
  assert.equal(place.reviews.length, 1);
  assert.equal(place.reviews[0].author.displayName, "Voorbeeldklant");
  assert.equal(place.reviews[0].text, "Heel tevreden.");
  assert.equal(place.reviews[0].originalLanguageCode, "fr");
  assert.equal(formatGoogleRating(place.rating), "5,0");
});

test("rejects a mismatched place and incomplete or unsafe review data", () => {
  assert.equal(
    normalizeGooglePlace(
      {
        id: "wrong-place",
        displayName: { text: "AB SERVICE" },
        rating: 5,
        userRatingCount: 35,
        googleMapsUri: "https://maps.google.com/example",
      },
      placeId
    ),
    null
  );

  const place = normalizeGooglePlace({
    id: placeId,
    displayName: { text: "AB SERVICE" },
    rating: 5,
    userRatingCount: 35,
    googleMapsUri: "https://maps.google.com/example",
    reviews: [
      {
        rating: 5,
        text: { text: "Geen auteur" },
        authorAttribution: {},
      },
      {
        rating: 5,
        text: { text: "Veilige review" },
        googleMapsUri: "javascript:alert(1)",
        authorAttribution: { displayName: "Klant" },
      },
    ],
  });

  assert.equal(place.reviews.length, 1);
  assert.equal(place.reviews[0].googleMapsUri, "");
});

test("server integration is request-time only and keeps the API key server-side", () => {
  const source = readFileSync(
    new URL("../libs/google-reviews.server.js", import.meta.url),
    "utf8"
  );
  const component = readFileSync(
    new URL("../components/sections/google-reviews.js", import.meta.url),
    "utf8"
  );

  assert.match(source, /import "server-only"/);
  assert.match(source, /cache: "no-store"/);
  assert.match(source, /await connection\(\)/);
  assert.doesNotMatch(component, /GOOGLE_PLACES_API_KEY/);
  assert.doesNotMatch(source, /AIza[0-9A-Za-z_-]{20,}/);
});
