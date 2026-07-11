// Shared brand chrome for /clinic/* leak-report pages — mirrors the official
// deltalabsai.com header/footer tokens (logo mark, wordmark, colors, DM Sans)
// so a prospect landing on a report link immediately recognizes the real
// Delta Labs AI brand. Kept deliberately lighter than the marketing nav/footer
// (no scroll listener, no mobile menu, no partner badges) so the report itself
// stays the focus on a phone screen opened from WhatsApp.

function DeltaMark({ s = 24 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function ClinicHeader() {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 672,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            color: "#0F172A",
            textDecoration: "none",
          }}
        >
          <DeltaMark s={22} />
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
            Delta Labs AI
          </span>
        </a>
        <a
          href="/diagnostic"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#2563EB",
            textDecoration: "none",
            padding: "6px 4px",
          }}
        >
          Free Diagnostic →
        </a>
      </div>
    </header>
  );
}

export function ClinicFooter() {
  return (
    <footer style={{ background: "#0F172A", padding: "28px 16px" }}>
      <div style={{ maxWidth: 672, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            color: "#fff",
            marginBottom: 6,
          }}
        >
          <DeltaMark s={18} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>Delta Labs AI</span>
        </div>
        <p style={{ fontSize: 12, color: "#94A3B8", margin: "0 0 12px" }}>
          AI-powered business consulting for growing clinics.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "center", marginBottom: 10 }}>
          <a href="/privacy" style={{ fontSize: 11, color: "#64748B", textDecoration: "none" }}>
            Privacy Policy
          </a>
          <span style={{ color: "#475569", fontSize: 11 }}>·</span>
          <a href="/terms" style={{ fontSize: 11, color: "#64748B", textDecoration: "none" }}>
            Terms of Service
          </a>
        </div>
        <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>
          &copy; {new Date().getFullYear()} Delta Labs AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
