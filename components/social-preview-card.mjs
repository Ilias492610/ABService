import { createElement as h } from "react";
import { getSocialPreviewTitle } from "../libs/social-preview.mjs";

const topics = [
  ["/projecten", "Praktijkcase"],
  ["/foutcodes", "Cv-ketel · foutcodes"],
  ["/merken", "Onderhoud en herstelling"],
  ["/advies", "Advies"],
  ["/tools", "Gratis onderhoudscheck"],
  ["/werkgebied", "Werkgebied"],
];

export const SocialPreviewCard = ({ page }) => {
  const title = getSocialPreviewTitle(page);
  const topic = topics.find(([path]) => page.path === path || page.path.startsWith(`${path}/`))?.[1]
    || "Loodgieter · verwarming · sanitair";
  return h("div", {
    style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "64px 76px", background: "linear-gradient(135deg, #092431 0%, #103447 65%, #168b91 100%)", color: "white", fontFamily: "sans-serif" },
  },
  h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" } },
    h("div", { style: { fontSize: 32, fontWeight: 700 } }, "AB Service"),
    h("div", { style: { color: "#8ee3df", fontSize: 24 } }, topic)),
  h("div", { style: { width: 120, height: 8, marginTop: 38, background: "#f5b72e", borderRadius: 4 } }),
  h("div", { style: { display: "flex", alignItems: "center", flexGrow: 1, fontSize: title.length > 75 ? 58 : 68, lineHeight: 1.14, fontWeight: 700, letterSpacing: -1.6, maxWidth: 1048 } }, title),
  h("div", { style: { display: "flex", fontSize: 24, color: "#bce1e5", marginTop: 24 } }, "www.abservice24.be"));
};
