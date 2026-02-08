import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import { getGlobalSchemaGraph } from "@/libs/schema";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });
const schemaGraph = getGlobalSchemaGraph();

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }) {
  return (
    <html lang="nl-BE" data-theme={config.colors.theme} className={font.className}>
      <head>
        {config.domainName && (
          <PlausibleProvider domain={config.domainName} />
        )}
        <script
          id="global-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body>
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
