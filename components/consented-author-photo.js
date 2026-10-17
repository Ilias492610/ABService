"use client";

import Image from "next/image";
import { useState } from "react";
import { useCookieConsent } from "@/components/use-cookie-consent";
import { readConsent, saveConsent } from "@/libs/cookie-consent-store.mjs";
import { getCookieConsentCopy } from "@/content/cookie-consent-copy.mjs";

export default function ConsentedAuthorPhoto({photoUri,displayName,locale = "nl-BE"}) {
  const consent = useCookieConsent();
  const [error,setError] = useState(false);
  const copy = getCookieConsentCopy(locale);
  const allowed = consent === "googlePhotos" || consent === "both";
  return <span className="consented-author-photo">
    {photoUri && allowed ? <Image className="review-author-avatar" src={photoUri} alt="" width={44} height={44} unoptimized />
      : <span className="review-author-fallback" aria-hidden="true">{displayName.slice(0,1).toUpperCase()}</span>}
    {photoUri && !allowed ? <><span className="cookie-photo-note">{copy.photoNote}</span><button type="button" className="cookie-photo-button" disabled={consent === "loading"} onClick={() => {
      const current = readConsent();
      setError(!saveConsent({analytics:current?.analytics === true,googlePhotos:true}));
    }}>{copy.photoAction}</button></> : null}
    {error ? <span role="alert">{copy.failed}</span> : null}
  </span>;
}
