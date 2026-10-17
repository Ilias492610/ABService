"use client";

import { useSyncExternalStore } from "react";
import { subscribeConsent, getConsentSnapshot, getServerConsentSnapshot } from "@/libs/cookie-consent-store.mjs";

export function useCookieConsent() {
  return useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
}
