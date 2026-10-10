"use client";

import { Analytics } from "@vercel/analytics/next";
import { sanitizeAnalyticsEvent } from "@/libs/analytics.mjs";

export default function PrivacyAnalytics() {
  return <Analytics beforeSend={sanitizeAnalyticsEvent} />;
}
