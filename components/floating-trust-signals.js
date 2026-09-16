"use client";

import { useState } from "react";
import TrackedLink from "@/components/tracked-link";
import { business } from "@/content/business.mjs";

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#4285f4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34a853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#fbbc05" d="M11.69 28.18A13.6 13.6 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.98 21.98 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#ea4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export default function FloatingTrustSignals() {
  const [showRating, setShowRating] = useState(true);

  return (
    <>
      <TrackedLink
        href={business.whatsappHref}
        eventName="whatsapp_click"
        eventProperties={{ location: "floating_button" }}
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacteer AB Service via WhatsApp"
      >
        <WhatsAppLogo />
      </TrackedLink>

      {showRating ? (
        <div className="google-rating-popup">
          <TrackedLink
            href={business.googleReviewsHref}
            eventName="google_profile_click"
            eventProperties={{ location: "floating_rating" }}
            className="google-rating-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Bekijk AB Service ${business.googleRatingLabel}`}
          >
            <GoogleLogo />
            <span>
              <strong>AB Service</strong>
              <span className="google-rating-row">
                <b>{business.googleRating.toFixed(1).replace(".", ",")}</b>
                <span className="google-stars" aria-hidden="true">★★★★★</span>
              </span>
              <small>Google-beoordeling</small>
            </span>
          </TrackedLink>
          <button
            type="button"
            className="google-rating-close"
            onClick={() => setShowRating(false)}
            aria-label="Sluit Google-beoordeling"
          >
            ×
          </button>
        </div>
      ) : null}
    </>
  );
}
