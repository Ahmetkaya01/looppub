import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const alt = "Loop Pub — Premium pub & bar in Tokat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0a0a0c 0%, #1a1520 50%, #0a0a0c 100%)",
          color: "#f4efe6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.35em",
            color: "#d4af37",
            marginBottom: 16,
          }}
        >
          TOKAT
        </div>
        <div style={{ fontSize: 72, fontWeight: 600 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 32, marginTop: 20, color: "#d4af37" }}>
          Stay in Loop
        </div>
        <div
          style={{
            fontSize: 22,
            marginTop: 28,
            color: "rgba(244, 239, 230, 0.85)",
            maxWidth: 700,
            textAlign: "center",
          }}
        >
          Music · Craft beer · Signature cocktails
        </div>
      </div>
    ),
    { ...size },
  );
}
