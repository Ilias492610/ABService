import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import JsonLd from "@/components/json-ld";
import FloatingTrustSignals from "@/components/floating-trust-signals";
import { business } from "@/content/business.mjs";
import { buildGlobalSchemaGraph } from "@/libs/schema-data.mjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport = {
  themeColor: "#103447",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(business.canonicalOrigin),
  title: {
    default: "AB Service | Loodgieter en verwarming in Antwerpen",
    template: "%s",
  },
  description:
    "AB Service helpt in Antwerpen met loodgieterswerk, sanitair, verwarming, onderhoud, herstellingen, keuringen en gasketelinstallaties.",
  applicationName: business.name,
  creator: business.name,
  publisher: business.name,
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl-BE" className={inter.className}>
      <head>
        <JsonLd data={buildGlobalSchemaGraph()} id="global-schema" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Ga naar de inhoud
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <FloatingTrustSignals />
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
