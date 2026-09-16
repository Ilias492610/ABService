import { ImageResponse } from "next/og";

export const alt = "AB Service — loodgieter, verwarming en sanitair in Antwerpen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "82px", background: "linear-gradient(135deg, #092431 0%, #103447 58%, #168b91 100%)", color: "white", fontFamily: "Arial, sans-serif" }}>
      <div style={{ color: "#8ee3df", fontSize: 28, fontWeight: 700, letterSpacing: 5 }}>ANTWERPEN</div>
      <div style={{ marginTop: 26, fontSize: 82, fontWeight: 800, letterSpacing: -3 }}>AB Service</div>
      <div style={{ marginTop: 20, maxWidth: 900, fontSize: 40, lineHeight: 1.25 }}>Loodgieter, verwarming en sanitair</div>
      <div style={{ marginTop: 54, width: 180, height: 12, borderRadius: 8, background: "#f5b72e" }} />
    </div>,
    size
  );
}
