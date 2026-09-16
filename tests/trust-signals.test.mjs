import test from "node:test";
import assert from "node:assert/strict";

import { business } from "../content/business.mjs";

test("floating contact and review signals use the verified destinations", () => {
  assert.equal(
    business.whatsappHref,
    "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag."
  );
  assert.equal(business.googleRating, 5);
  assert.match(business.googleReviewsHref, /^https:\/\/www\.google\.com\/search\?/);
  assert.match(business.googleReviewsHref, /rldimm=4063521367014109489/);
  assert.equal(business.googleRatingLabel, "5,0 op Google");
  assert.equal(business.googleRatingSourceUrl, "https://vakmanindebuurt.be/ab-service/");
});

test("verified rating data does not invent a review count", () => {
  assert.equal("googleReviewCount" in business, false);
});
