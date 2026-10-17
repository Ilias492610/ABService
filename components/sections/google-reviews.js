import ConsentedAuthorPhoto from "@/components/consented-author-photo";
import TrackedLink from "@/components/tracked-link";
import Stars from "@/components/review-stars.mjs";
import { business } from "@/content/business.mjs";
import { formatGoogleRating } from "@/libs/google-reviews.mjs";
import { getGoogleReviews } from "@/libs/google-reviews.server.js";

const GOOGLE_REVIEW_POLICY_URL =
  "https://support.google.com/contributionpolicy/answer/7400114";

function Author({ review }) {
  const content = (
    <>
      <span>
        <strong>{review.author.displayName}</strong>
        {review.relativePublishTimeDescription ? (
          <small>{review.relativePublishTimeDescription}</small>
        ) : null}
      </span>
    </>
  );

  const name = review.author.uri ? (
    <a
      href={review.author.uri}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    content
  );
  return <div className="review-author"><ConsentedAuthorPhoto photoUri={review.author.photoUri} displayName={review.author.displayName} />{name}</div>;
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
            <span className="google-maps-attribution" translate="no">Google Maps</span>
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
              {place
                ? "Google geeft via deze koppeling momenteel geen afzonderlijke reviewteksten mee. De score en het aantal hierboven komen rechtstreeks van Google."
                : "De Google-koppeling is momenteel niet beschikbaar."}{" "}
              Bekijk de actuele score en geschreven ervaringen op het Google-profiel.
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
