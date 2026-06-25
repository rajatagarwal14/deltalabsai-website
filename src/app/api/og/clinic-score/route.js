import { ImageResponse } from "next/og";

export const runtime = "edge";

const TIERS = {
  "Digital Newcomer":  { color: "#ef4444", emoji: "🌱", stars: 1 },
  "Getting Started":   { color: "#f97316", emoji: "📈", stars: 2 },
  "Digital-Forward":   { color: "#eab308", emoji: "⭐", stars: 3 },
  "AI-Ready Clinic":   { color: "#22c55e", emoji: "🏆", stars: 4 },
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const score = Math.min(100, Math.max(0, parseInt(searchParams.get("score") || "68", 10)));
  const tierName = searchParams.get("tier") || "Digital-Forward";
  const name = (searchParams.get("name") || "Your Clinic").slice(0, 40);
  const city = (searchParams.get("city") || "Global").slice(0, 30);

  const tier = TIERS[tierName] || TIERS["Digital-Forward"];
  const stars = "★".repeat(tier.stars) + "☆".repeat(4 - tier.stars);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1080,
          background: "#0a0f1e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 60,
          background: "#1e293b",
          borderRadius: 20,
          padding: "16px 32px",
        }}>
          <span style={{ fontSize: 36 }}>🏥</span>
          <span style={{ color: "#818cf8", fontSize: 24, fontWeight: 700, letterSpacing: 1 }}>
            Clinic Digital Score™
          </span>
        </div>

        {/* Clinic info */}
        <div style={{ color: "#94a3b8", fontSize: 28, marginBottom: 8, textAlign: "center" }}>
          {name}
        </div>
        <div style={{ color: "#475569", fontSize: 22, marginBottom: 64 }}>
          {city}
        </div>

        {/* Score circle */}
        <div style={{
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: `16px solid ${tier.color}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 48,
          background: tier.color + "15",
        }}>
          <span style={{ fontSize: 96, fontWeight: 900, color: tier.color, lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ fontSize: 28, color: "#475569" }}>/ 100</span>
        </div>

        {/* Tier badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: tier.color + "22",
          border: `2px solid ${tier.color}55`,
          borderRadius: 999,
          padding: "14px 36px",
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 32 }}>{tier.emoji}</span>
          <span style={{ color: tier.color, fontSize: 30, fontWeight: 800 }}>{tierName}</span>
        </div>

        {/* Stars */}
        <div style={{ color: tier.color, fontSize: 36, marginBottom: 64, letterSpacing: 4 }}>
          {stars}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          borderTop: "1px solid #1e293b",
          paddingTop: 40,
          width: "100%",
        }}>
          <span style={{ color: "#475569", fontSize: 22 }}>Get yours free:</span>
          <span style={{ color: "#818cf8", fontSize: 28, fontWeight: 700 }}>
            deltalabsai.com/clinic-score
          </span>
          <span style={{ color: "#1e293b", fontSize: 18 }}>Delta Labs AI</span>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}
