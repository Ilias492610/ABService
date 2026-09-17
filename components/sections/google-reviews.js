import Image from "next/image";
import TrackedLink from "@/components/tracked-link";
import { business } from "@/content/business.mjs";
import { formatGoogleRating } from "@/libs/google-reviews.mjs";
import { getGoogleReviews } from "@/libs/google-reviews.server.js";

const GOOGLE_REVIEW_POLICY_URL =
  "https://support.google.com/contributionpolicy/answer/7400114";

function Stars({ rating }) {
  const fullStars = Math.round(rating);

  return (
    <span className="review-stars" aria-label={`${formatGoogleRating(rating)} van 5 sterren`}>
      <span aria-hidden="true">
        {"★".repeat(fullStars)}{"☆".repeat(5 - fullStars)}
      </span>
    </span>
  );
}

function Author({ review }) {
  const content = (
    <>
      {review.author.photoUri ? (
        <Image
          className="review-author-avatar"
          src={review.author.photoUri}
          alt=""
          width={44}
          height={44}
          unoptimized
        />
      ) : (
        <span className="review-author-fallback" aria-hidden="true">
          {review.author.displayName.slice(0, 1).toUpperCase()}
        </span>
      )}
      <span>
        <strong>{review.author.displayName}</strong>
        {review.relativePublishTimeDescription ? (
          <small>{review.relativePublishTimeDescription}</small>
        ) : null}
      </span>
    </>
  );

  return review.author.uri ? (
    <a
      className="review-author"
      href={review.author.uri}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className="review-author">{content}</div>
  );
}

function ReviewCard({ review }) {
  const translated =
    review.originalLanguageCode &&
    review.languageCode &&
    review.originalLanguageCode !== review.languageCode;

  return (
    <article className="google-review-card">
      <Author review={review} />
      <Stars rating={review.rating} />
      <blockquote>{review.text}</blockquote>
      {translated ? <p className="review-translation">Door Google vertaald.</p> : null}
      <div className="review-card-links">
        {review.googleMapsUri ? (
          <a href={review.googleMapsUri} target="_blank" rel="noopener noreferrer">
            Bekijk bron op Google Maps
          </a>
        ) : null}
        {review.flagContentUri ? (
          <a href={review.flagContentUri} target="_blank" rel="noopener noreferrer">
            Review melden
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default async function GoogleReviews() {
  const place = await getGoogleReviews();
  const profileHref = place?.googleMapsUri || business.googleReviewsHref;

  return (
    <section className="section section-muted google-reviews-section" aria-labelledby="google-reviews-title">
      <div className="shell">
        <div className="reviews-heading">
          <div>
            <p className="eyebrow">Klantervaringen</p>
            <h2 id="google-reviews-title">Beoordelingen op Google</h2>
            <p className="section-lead">
              De score en het aantal worden bij elk bezoek rechtstreeks via de officiële Google
              Places-koppeling opgehaald. AB Service bewerkt de Google-gegevens niet.
            </p>
          </div>
          <div className="google-review-summary" aria-live="polite">
            <span className="google-maps-attribution">Google Maps</span>
            {place ? (
              <>
                <strong>{formatGoogleRating(place.rating)}</strong>
                <Stars rating={place.rating} />
                <span>
                  {place.userRatingCount} Google-beoordeling
                  {place.userRatingCount === 1 ? "" : "en"}
                </span>
              </>
            ) : (
              <span>Actuele gegevens tijdelijk niet beschikbaar</span>
            )}
            <TrackedLink
              href={profileHref}
              eventName="google_profile_click"
              eventProperties={{ location: "homepage_reviews" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bekijk alle beoordelingen →
            </TrackedLink>
          </div>
        </div>

        {place?.reviews.length ? (
          <div className="google-reviews-grid">
            {place.reviews.map((review) => (
              <ReviewCard key={review.name || `${review.author.displayName}-${review.publishTime}`} review={review} />
            ))}
          </div>
        ) : (
          <div className="review-api-note">
            <p>
              Google geeft via deze koppeling momenteel geen afzonderlijke reviewteksten mee.
              De actuele score en het aantal hierboven komen wel rechtstreeks van Google; alle
              geschreven ervaringen staan op het Google-profiel.
            </p>
          </div>
        )}

        <p className="google-review-disclosure">
          Google rangschikt getoonde reviews standaard op relevantie. Reviews worden niet vooraf
          door Google geverifieerd; Google controleert en verwijdert wel content die als nep wordt
          vastgesteld. Lees het{" "}
          <a href={GOOGLE_REVIEW_POLICY_URL} target="_blank" rel="noopener noreferrer">
            Google Maps-beleid voor gebruikerscontent
          </a>
          .
        </p>
      </div>
    </section>
  );
}
