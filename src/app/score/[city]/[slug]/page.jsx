export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import Link from "next/link";
import { getReputationReportBySlug } from "../../../../lib/reports-db";
import { ClinicHeader, ClinicFooter } from "../../../clinic/BrandChrome";
import ReputationViewTracker from "../../ReputationViewTracker";

// Display symbols + locale for report currency. Mirrors CURRENCY_CONFIG in
// worker/generate-reputation-reports.cjs — keep in sync if that map changes.
const CURRENCY_DISPLAY = {
  INR: { symbol: "₹", locale: "en-IN" },
  AED: { symbol: "AED ", locale: "en-AE" },
  SGD: { symbol: "S$", locale: "en-SG" },
  GBP: { symbol: "£", locale: "en-GB" },
  CAD: { symbol: "C$", locale: "en-CA" },
  AUD: { symbol: "A$", locale: "en-AU" },
};

export async function generateMetadata({ params }) {
  let { city, slug } = params;
  city = decodeURIComponent(city);
  const report = await getReputationReportBySlug(city, slug);
  if (!report) return { title: "Free Reputation Score · Delta Labs AI", robots: { index: false, follow: false } };
  return {
    title: `Reputation Score · ${report.business_name} · Delta Labs AI`,
    description: `A quick, free look at how ${report.business_name}'s Google reviews stack up locally, from Delta Labs AI.`,
    robots: { index: false, follow: false },
  };
}

export default async function ReputationReportPage({ params }) {
  let { city, slug } = params;
  city = decodeURIComponent(city);
  const report = await getReputationReportBySlug(city, slug);

  if (!report) notFound();

  const facts = report.source_data?.facts || [];
  const currency = report.currency || "INR";
  const currencyDisplay = CURRENCY_DISPLAY[currency] || CURRENCY_DISPLAY.INR;
  const lossAmount = report.estimated_loss ?? 0;
  const breakdown = report.source_data?.estimate_breakdown || null;
  const cityLabel = city.replace(/\b\w/g, (ch) => ch.toUpperCase());
  const niche = report.niche || "business";

  return (
    <>
      <ReputationViewTracker slug={slug} />
      <ClinicHeader />
      <main style={{ minHeight: "100vh", background: "#F8FAFC", padding: "32px 16px" }}>
      <div style={{ maxWidth: 672, margin: "0 auto" }}>
        <Link
          href={`/score/${city}?ref=${slug}`}
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
          ← {cityLabel} {niche}
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
              ? `#${report.rank_in_city} of ${report.city_total} ${niche} in ${cityLabel}`
              : "Free Reputation Score report"}
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
            {report.business_name}
          </h1>
          <p style={{ marginTop: 4, fontSize: 14, color: "#64748B" }}>
            A quick look at {report.business_name}&apos;s Google reviews, {cityLabel}
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
            {report.star_rating != null && (
              <li style={factCardStyle}>
                <span style={tagStyle}>Google</span>
                <p style={factTextStyle}>Google rating: {report.star_rating}★ from {report.review_count ?? 0} reviews</p>
              </li>
            )}
            {report.city_total > 1 && (
              <li style={factCardStyle}>
                <span style={tagStyle}>Google</span>
                <p style={factTextStyle}>
                  Ranked #{report.rank_in_city} of {report.city_total} {niche} in {cityLabel} by review volume and rating
                </p>
              </li>
            )}
            {report.unanswered_count != null && (
              <li style={factCardStyle}>
                <span style={tagStyle}>Google</span>
                <p style={factTextStyle}>{report.unanswered_count} recent reviews with no business reply</p>
              </li>
            )}
            {facts.map((f, i) => (
              <li key={i} style={factCardStyle}>
                <span style={tagStyle}>{f.source}</span>
                <p style={factTextStyle}>{f.fact}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Estimated loss */}
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
            <span style={{ fontSize: 12, color: "#78716C" }}>monthly revenue lost to reputation</span>
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
            {lossAmount.toLocaleString(currencyDisplay.locale)}
          </p>
          {breakdown && Array.isArray(breakdown.steps) && breakdown.steps.length > 0 && (
            <details style={{ marginTop: 16, fontSize: 14, color: "#475569" }}>
              <summary style={{ cursor: "pointer", fontWeight: 500, color: "#334155" }}>
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
            Want help fixing this? Delta Labs AI can help you get more reviews and reply to the ones you have.
          </p>
          <a
            href="/diagnostic"
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
            Get a free diagnostic
          </a>
        </div>

      </div>
      </main>
      <ClinicFooter />
    </>
  );
}

const factCardStyle = {
  borderRadius: 12,
  border: "1px solid #E2E8F0",
  background: "#fff",
  padding: "12px 16px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

const tagStyle = {
  display: "inline-block",
  borderRadius: 999,
  background: "#E9EFF8",
  padding: "2px 8px",
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#475569",
};

const factTextStyle = { marginTop: 6, fontSize: 14, lineHeight: 1.6, color: "#1E293B" };
