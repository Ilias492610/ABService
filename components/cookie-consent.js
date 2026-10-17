"use client";

import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/components/use-cookie-consent";
import { getCookieConsentCopy } from "@/content/cookie-consent-copy.mjs";
import { getPrivacyRoute } from "@/content/localization.mjs";
import { getConsentSnapshot, readConsent, saveConsent, subscribeConsent } from "@/libs/cookie-consent-store.mjs";

export default function CookieConsent({locale = "nl-BE"}) {
  const consent = useCookieConsent();
  const copy = getCookieConsentCopy(locale);
  const [analytics, setAnalytics] = useState(false);
  const [googlePhotos, setGooglePhotos] = useState(false);
  const [error, setError] = useState("");
  const dialog = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => subscribeConsent(() => {
    if (getConsentSnapshot() !== "unknown") setError("");
  }), []);

  useEffect(() => {
    const open = event => {
      const current = readConsent();
      setAnalytics(current?.analytics === true);
      setGooglePhotos(current?.googlePhotos === true);
      returnFocus.current = document.activeElement;
      const panel = dialog.current;
      if (!panel?.showModal) return;
      try {
        if (!panel.open) panel.showModal();
        event.preventDefault();
      } catch { /* Keep the ordinary privacy link available if dialog opening fails. */ }
    };
    window.addEventListener("abservice:open-cookie-preferences", open);
    return () => window.removeEventListener("abservice:open-cookie-preferences", open);
  }, []);

  const close = () => dialog.current?.close();
  const openSettings = event => {
    const current = readConsent();
    setAnalytics(current?.analytics === true);
    setGooglePhotos(current?.googlePhotos === true);
    returnFocus.current = event.currentTarget;
    dialog.current?.showModal();
  };
  const save = preference => {
    if (!saveConsent(preference)) { setError(copy.failed); return; }
    setError("");
    if (dialog.current?.open) close();
  };
  const privacyHref = getPrivacyRoute(locale);
  return <>
    <noscript><p className="shell"><a href={privacyHref + "#cookievoorkeuren"}>{copy.noscript}</a></p></noscript>
    {consent === "unknown" ? <section className="cookie-consent-panel cookie-banner shell" data-consent-banner="" aria-labelledby="cookie-banner-title">
      <h2 id="cookie-banner-title">{copy.title}</h2><p>{copy.intro}</p>
      <div className="cookie-actions">
        <button type="button" className="button button-secondary" onClick={() => save({analytics:true,googlePhotos:false})}>{copy.allow}</button>
        <button type="button" className="button button-secondary" onClick={() => save({analytics:false,googlePhotos:false})}>{copy.deny}</button>
        <button type="button" className="cookie-text-button" onClick={openSettings}>{copy.settings}</button>
        <a href={privacyHref}>{copy.privacy}</a>
      </div>
      {error ? <p role="alert">{error}</p> : null}
    </section> : null}
    <dialog className="cookie-consent-panel cookie-dialog" ref={dialog} aria-labelledby="cookie-dialog-title"
      onCancel={event => {event.preventDefault();close();}}
      onClose={() => returnFocus.current?.focus({preventScroll:true})}>
      <h2 id="cookie-dialog-title">{copy.settings}</h2><p>{copy.necessary}</p>
      <label className="cookie-option"><input type="checkbox" name="analytics" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /><span><strong>{copy.analytics}</strong><span>{copy.analyticsHelp}</span></span></label>
      <label className="cookie-option"><input type="checkbox" name="googlePhotos" checked={googlePhotos} onChange={event => setGooglePhotos(event.target.checked)} /><span><strong>{copy.googlePhotos}</strong><span>{copy.photosHelp}</span></span></label>
      {error ? <p role="alert">{error}</p> : null}
      <div className="cookie-actions">
        <button type="button" className="button button-secondary" onClick={() => save({analytics,googlePhotos})}>{copy.save}</button>
        <button type="button" className="button button-secondary" onClick={() => save({analytics:false,googlePhotos:false})}>{copy.withdraw}</button>
        <button type="button" className="cookie-text-button" onClick={close}>{copy.close}</button>
        <a href={privacyHref}>{copy.privacy}</a>
      </div>
    </dialog>
  </>;
}
