"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TrackedLink from "@/components/tracked-link";
import { business } from "@/content/business.mjs";
import { formatGoogleRating } from "@/libs/google-reviews.mjs";
import { getLocaleCopy, getWhatsAppHref } from "@/content/localization.mjs";

const protectedZones = "form, .warning-box, .site-footer, .maintenance-check-result, .page-hero .button-row, .faq-list, .fault-guide-reading, .fault-guide-hero, .tariff-service-context, .cookie-consent-panel";

function focusHeader() {
  document.querySelector(".site-header .brand")?.focus({ preventScroll: true });
}

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

export default function FloatingTrustSignals({ locale = "nl-BE" } = {}) {
  const copy = getLocaleCopy(locale);
  const [showRating, setShowRating] = useState(true);
  const [rating, setRating] = useState(null);
  const [clearProtectedContent, setClearProtectedContent] = useState(false);
  const [clearanceReady, setClearanceReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    const zones = new Map();
    const updateClearance = () => {
      if (!active) return;
      const clear = [...zones.values()].some(Boolean);
      if (clear && document.activeElement?.closest(".whatsapp-button, .google-rating-popup")) focusHeader();
      setClearProtectedContent(clear);
      // Initial HTML stays in normal flow until protected-zone geometry is known.
      setClearanceReady(true);
    };
    const intersectsViewport = (node) => {
      const rect = node.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
    };
    const observer = new IntersectionObserver((entries) => {
      if (!active) return;
      for (const entry of entries) {
        if (zones.has(entry.target)) zones.set(entry.target, entry.isIntersecting);
      }
      updateClearance();
    });
    const observe = (node) => {
      if (zones.has(node)) return;
      zones.set(node, intersectsViewport(node));
      observer.observe(node);
    };
    const visitZones = (node, visit) => {
      if (node.nodeType !== 1) return;
      if (node.matches(protectedZones)) visit(node);
      for (const zone of node.querySelectorAll(protectedZones)) visit(zone);
    };
    for (const zone of document.querySelectorAll(protectedZones)) observe(zone);
    updateClearance();

    // Route content and tool results can mount after the pathname effect.
    // Watch only element insertion/removal inside the persistent main region.
    const mutations = new MutationObserver((records) => {
      if (!active) return;
      for (const record of records) {
        for (const node of record.removedNodes) {
          if (node.nodeType !== 1) continue;
          // Detached descendants can no longer match an ancestor selector.
          for (const zone of zones.keys()) {
            if (node.contains(zone)) {
              observer.unobserve(zone);
              zones.delete(zone);
            }
          }
        }
        for (const node of record.addedNodes) visitZones(node, observe);
      }
      updateClearance();
    });
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    return () => {
      active = false;
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  const dismissRating = (event) => {
    if (document.activeElement === event.currentTarget) {
      const whatsapp = document.querySelector(".whatsapp-button");
      if (whatsapp?.getClientRects().length) whatsapp.focus({ preventScroll: true });
      else focusHeader();
    }
    setShowRating(false);
  };

  useEffect(() => {
    const header = document.querySelector(".site-header");
    const updateOffset = () => {
      if (header) document.documentElement.style.setProperty("--header-offset", `${header.getBoundingClientRect().height}px`);
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    if (header) observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let timeout;
    const load = async () => {
      timeout = setTimeout(() => controller.abort(), 3_500);
      try {
        const response = await fetch("/api/google-rating", { cache: "no-store", signal: controller.signal });
        const data = response.ok ? (await response.json()).rating : null;
        if (!controller.signal.aborted && data && typeof data.rating === "number" && data.rating >= 1 && data.rating <= 5) setRating(data);
      } catch {
        // Keep the neutral Google-profile link when the live score cannot be obtained.
      } finally {
        clearTimeout(timeout);
      }
    };
    const idle = "requestIdleCallback" in window
      ? window.requestIdleCallback(load, { timeout: 2_000 })
      : window.setTimeout(load, 1_000);
    return () => {
      controller.abort();
      clearTimeout(timeout);
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return (
    <>
      {!clearProtectedContent ? <TrackedLink
        href={getWhatsAppHref(locale)}
        eventName="whatsapp_click"
        eventProperties={{ location: "floating_button" }}
        className={clearanceReady ? "whatsapp-button" : "whatsapp-button floating-trust-pending"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.whatsapp}
      >
        <WhatsAppLogo />
      </TrackedLink> : null}

      {showRating && !clearProtectedContent ? (
        <div className={clearanceReady ? "google-rating-popup" : "google-rating-popup floating-trust-pending"}>
          <TrackedLink
            href={rating?.googleMapsUri || business.googleReviewsHref}
            eventName="google_profile_click"
            eventProperties={{ location: "floating_rating" }}
            className="google-rating-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoogleLogo />
            <span>
              <strong>AB Service</strong>
              {rating ? (
                <span className="google-rating-row">
                  <b>{formatGoogleRating(rating.rating)}</b>
                  <span className="google-stars" aria-hidden="true">
                    <span className="google-stars-empty">★★★★★</span>
                    <span className="google-stars-filled" style={{ width: `${rating.rating * 20}%` }}>★★★★★</span>
                  </span>
                </span>
              ) : <span className="google-profile-fallback">{copy.googleFallback}</span>}
              <small className="google-maps-attribution" translate="no">Google Maps</small>
            </span>
          </TrackedLink>
          <button
            type="button"
            className="google-rating-close"
            disabled={!clearanceReady}
            onClick={dismissRating}
            aria-label={copy.googleClose}
          >
            ×
          </button>
        </div>
      ) : null}
      <noscript>
        <style>{`
          .whatsapp-button { position: static; display: inline-grid; margin: 1rem; vertical-align: middle; }
          .google-rating-popup { position: static; display: inline-flex; min-width: 0; max-width: calc(100% - 2rem); margin: 1rem; vertical-align: middle; }
          .google-rating-close { display: none; }
        `}</style>
      </noscript>
    </>
  );
}
