import { createElement } from "react";
import { formatGoogleRating } from "../libs/google-reviews.mjs";

export default function ReviewStars({ rating }) {
  const fullStars = Math.round(rating);
  return createElement(
    "span",
    { className: "review-stars", role: "img", "aria-label": `${formatGoogleRating(rating)} van 5 sterren` },
    createElement("span", { "aria-hidden": true }, "★".repeat(fullStars) + "☆".repeat(5 - fullStars))
  );
}
