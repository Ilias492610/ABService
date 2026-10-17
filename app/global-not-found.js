import RootLayout, { metadata as rootMetadata } from "./(nl)/layout";
import NotFound, { metadata as notFoundMetadata } from "./(nl)/not-found";

export const metadata = { ...rootMetadata, ...notFoundMetadata };

// Multiple root layouts have no implicit shared 404. Reuse the original Dutch
// document and help content rather than silently serving Next's generic page.
export default function GlobalNotFound() {
  return <RootLayout><NotFound /></RootLayout>;
}
