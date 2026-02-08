import config from "@/config";

export default function manifest() {
  return {
    name: config.appName,
    short_name: "AB Service",
    description: config.appDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: config.colors.main,
    lang: "nl-BE",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  };
}
