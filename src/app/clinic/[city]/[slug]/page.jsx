export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import Link from "next/link";
import { getReportBySlug } from "../../../../lib/reports-db";
import { ClinicHeader, ClinicFooter } from "../../BrandChrome";

// Display symbols + locale for report currency. Mirrors CURRENCY_CONFIG in
// worker/generate-clinic-reports.cjs — keep in sync if that map changes.
const CURRENCY_DISPLAY = {
  INR: { symbol: "₹", locale: "en-IN" },
  AED: { symbol: "AED ", locale: "en-AE" },
  SGD: { symbol: "S$", locale: "en-SG" },
  GBP: { symbol: "£", locale: "en-GB" },
  CAD: { symbol: "C$", locale: "en-CA" },
  AUD: { symbol: "A$", locale: "en-AU" },
};

export async function generateMetadata({ params }) {
  const { city, slug } = params;
  const report = await getReportBySlug(city, slug);
  if (!report) return { title: "Free clinic report · Delta Labs AI", robots: { index: false, follow: false } };
  return {
    title: `Free clinic report · ${report.clinic_name} · Delta Labs AI`,
    description: `A quick, free look at where ${report.clinic_name} may be leaking revenue, from Delta Labs AI.`,
    robots: { index: false, follow: false },
  };
}

export default async function ClinicReportPage({ params }) {
  const { city, slug } = params;
  const report = await getReportBySlug(city, slug);

  if (!report) notFound();
  if (report.status === "expired") notFound();

  const facts = report.source_data || [];
  const breakdown = report.estimate_breakdown || null;
  const gaps = report.gaps || [];
  const currency = report.currency || "INR";
  const currencyDisplay = CURRENCY_DISPLAY[currency] || CURRENCY_DISPLAY.INR;
  const leakAmount = report.estimated_leak ?? report.estimated_leak_inr ?? 0;

  // Vertical-specific copy. Defaults to 'dental' so existing rows (no `vertical`
  // column populated yet) keep rendering exactly as before — no regression for
  // the live dental URLs.
  const vertical = report.vertical || "dental";
  const copy =
    vertical === "salon"
      ? { listLabel: "salons", businessNounPlural: "salons" }
      : { listLabel: "clinics", businessNounPlural: "dental clinics" };

  const cityLabel = city.replace(/\b\w/g, (ch) => ch.toUpperCase());

  return (
    <>
      <ClinicHeader />
      <main style={{ minHeight: "100vh", background: "#F8FAFC", padding: "32px 16px" }}>
      <div style={{ maxWidth: 672, margin: "0 auto" }}>
        <Link
          href={`/clinic/${city}?ref=${slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            borderRadius: 4,
            fontSize: 14,
            color: "#64748B",
            textDecoration: "none",
          }}
        >
          ← {cityLabel} {copy.listLabel}
        </Link>

        <div style={{ marginTop: 20 }}>
          <span
            style={{
              display: "inline-block",
              borderRadius: 999,
              background: "#E9EFF8",
              padding: "4px 10px",
              fontSize: 12,
              fontWeight: 600,
              color: "#2563EB",
            }}
          >
            {report.city_total > 1
              ? `#${report.rank_in_city} of ${report.city_total} in ${cityLabel}`
              : "Free clinic report"}
          </span>
          <h1
            style={{
              marginTop: 12,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1E293B",
            }}
          >
            {report.clinic_name}
          </h1>
          <p style={{ marginTop: 4, fontSize: 14, color: "#64748B" }}>
            A quick look at {report.clinic_name}, {cityLabel}
          </p>
        </div>

        {/* What we found */}
        <section style={{ marginTop: 40 }}>
          <h2
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#64748B",
            }}
          >
            What we found
          </h2>
          <ul style={{ marginTop: 12, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {facts.map((f, i) => (
              <li
                key={i}
                style={{
                  borderRadius: 12,
                  border: "1px solid #E2E8F0",
                  background: "#fff",
                  padding: "12px 16px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    borderRadius: 999,
                    background: "#E9EFF8",
                    padding: "2px 8px",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#475569",
                  }}
                >
                  {f.source}
                </span>
                <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6, color: "#1E293B" }}>
                  {f.fact}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Estimated leak */}
        <section
          style={{
            marginTop: 32,
            borderRadius: 16,
            border: "1px solid #FDE9C8",
            background: "linear-gradient(to bottom right, #FFFBF0, #FEF3DC)",
            padding: "20px 28px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
            <span
              style={{
                borderRadius: 999,
                background: "rgba(245,158,11,0.15)",
                padding: "4px 10px",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#92400E",
              }}
            >
              Estimated
            </span>
            <span style={{ fontSize: 12, color: "#78716C" }}>monthly revenue leak</span>
          </div>
          <p
            style={{
              marginTop: 12,
              fontFamily: "monospace",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1E293B",
            }}
          >
            {currencyDisplay.symbol}
            {leakAmount.toLocaleString(currencyDisplay.locale)}
          </p>
          {breakdown && Array.isArray(breakdown.steps) && breakdown.steps.length > 0 && (
            <details style={{ marginTop: 16, fontSize: 14, color: "#475569" }}>
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 500,
                  color: "#334155",
                }}
              >
                How we calculated this
              </summary>
              <div style={{ marginTop: 12, borderRadius: 8, background: "rgba(255,255,255,0.6)", padding: 12 }}>
                <p style={{ color: "#475569" }}>Formula: {breakdown.formula}</p>
                <ol style={{ marginLeft: 16, color: "#334155" }}>
                  {breakdown.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                <p style={{ marginTop: 8, fontSize: 12, fontStyle: "italic", color: "#64748B" }}>
                  {breakdown.disclaimer}
                </p>
              </div>
            </details>
          )}
        </section>

        {/* Gaps */}
        {gaps.length > 0 && (
          <section style={{ marginTop: 32 }}>
            <h2
              style={{
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#64748B",
              }}
            >
              Gaps
            </h2>
            <ul style={{ marginTop: 12, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {gaps.map((g, i) => (
                <li
                  key={i}
                  style={{
                    borderRadius: 12,
                    border: "1px solid #E2E8F0",
                    background: "#fff",
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "#1E293B",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  {g}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            borderRadius: 16,
            border: "1px solid #1E293B",
            background: "#0F172A",
            padding: 24,
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <p style={{ marginBottom: 16, fontSize: 14, color: "#CBD5E1" }}>
            Fix this in your first month, free
          </p>
          <Link
            href={`/clinic/claim/${slug}`}
            style={{
              display: "inline-flex",
              minHeight: 44,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "#EA580C",
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            Claim this report. First month free, cancel anytime
          </Link>
        </div>

      </div>
      </main>
      <ClinicFooter />
    </>
  );
}
