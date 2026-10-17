"use client";

import { Analytics } from "@vercel/analytics/next";
import { beforeSendWithConsent } from "@/libs/consented-analytics.mjs";
import { useCookieConsent } from "@/components/use-cookie-consent";

export default function PrivacyAnalytics() {
  const consent = useCookieConsent();
  if (consent !== "analytics" && consent !== "both") return null;
  return <Analytics beforeSend={beforeSendWithConsent} />;
}
