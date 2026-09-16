"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { buildAnalyticsEvent } from "@/libs/analytics.mjs";

export default function TrackedLink({
  href,
  eventName,
  eventProperties,
  children,
  ...props
}) {
  const handleClick = () => {
    const event = buildAnalyticsEvent(eventName, eventProperties);
    track(event.name, event.props);
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
