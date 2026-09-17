import test from "node:test";
import assert from "node:assert/strict";

import { business } from "../content/business.mjs";

test("floating contact and review signals use the verified destinations", () => {
  assert.equal(
    business.whatsappHref,
    "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."
  );
  assert.equal(business.googleRating, 5);
  assert.equal(business.googlePlaceId, "ChIJ38_PKjPxw0cRMfEVYieHZDg");
  assert.equal(business.googleReviewsHref, "https://maps.google.com/?cid=4063521367014109489");
  assert.equal(business.googleRatingLabel, "5,0 op Google");
  assert.equal(business.googleRatingSourceUrl, business.googleReviewsHref);
});

test("verified rating data does not invent a review count", () => {
  assert.equal("googleReviewCount" in business, false);
});
