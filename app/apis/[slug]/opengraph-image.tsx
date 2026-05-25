import { ImageResponse } from "next/og";
import { getApiBySlug, APIS } from "@/data/apis";
import { CATEGORIES } from "@/data/categories";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AUTH_LABELS: Record<string, string> = {
  none:   "No Auth",
  apiKey: "API Key",
  bearer: "Bearer",
  oauth2: "OAuth 2.0",
};

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const api = getApiBySlug(slug);
  if (!api) return new Response("Not found", { status: 404 });

  const category = CATEGORIES.find((c) => c.slug === api.category);

  const badges = [
    category?.label,
    AUTH_LABELS[api.authType],
    api.freeTier ? "Free tier" : null,
  ].filter(Boolean) as string[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000",
          padding: "64px 80px",
          position: "relative",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "auto" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>dev</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: 18 }}>dex</span>
        </div>

        {/* Center content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          {/* Badges */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            {badges.map((b) => (
              <div
                key={b}
                style={{
                  padding: "5px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 13,
                  fontWeight: 500,
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                {b}
              </div>
            ))}
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: -2,
              marginBottom: 20,
            }}
          >
            {api.name}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.45)",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            {api.tagline}
          </div>
        </div>

        {/* Base URL at bottom */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            color: "rgba(255,255,255,0.2)",
            marginTop: 40,
          }}
        >
          {api.baseUrl}
        </div>
      </div>
    ),
    { ...size }
  );
}
