import { ImageResponse } from "next/og";
import { APIS } from "@/data/apis";
import { CATEGORIES } from "@/data/categories";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const featured = APIS.filter((a) => a.featured);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#000",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 48 }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 22, letterSpacing: -0.5 }}>api</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: 22 }}>vault</span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 24,
          }}
        >
          Discover APIs
        </div>

        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 56,
            fontWeight: 400,
          }}
        >
          {APIS.length}+ APIs across {CATEGORIES.length} categories
        </div>

        {/* Sample API pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {featured.slice(0, 6).map((api) => (
            <div
              key={api.slug}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 15,
                fontWeight: 500,
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {api.name}
            </div>
          ))}
          <div
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.3)",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            +{APIS.length - 6} more
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
