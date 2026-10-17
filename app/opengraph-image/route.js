import OpenGraphImage from "@/components/default-social-image";

export const dynamic = "force-static";

export function GET() {
  return OpenGraphImage();
}
