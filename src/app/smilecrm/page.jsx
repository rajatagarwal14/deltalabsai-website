import Link from "next/link";
import { cities } from "./cities";

export const metadata = {
  title: "SmileCRM — Dental Clinic CRM for Indian Cities | Delta Labs AI",
  description:
    "SmileCRM automates appointment reminders, patient recall, and Google review collection for independent dental clinics across India. Starting at Rs 2,999/month.",
  alternates: {
    canonical: "https://deltalabsai.com/smilecrm",
  },
};

export default function SmileCRMPage() {
  return (
    <main
      style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
        color: "#18181b",
        background: "#fff",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #f4f4f5",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="/"
            style={{
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: -0.5,
              textDecoration: "none",
              color: "#18181b",
            }}
          >
            Delta Labs AI
          </a>
          <a
            href="/dental"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "9px 20px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              background: "#18181b",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            See All Features
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "72px 24px 56px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 20,
            background: "#f0fdf4",
            color: "#16a34a",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          Built for Independent Dental Clinics
        </div>
        <h1
          style={{
            fontSize: "clamp(30px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            margin: "0 0 20px",
          }}
        >
          SmileCRM: Dental Clinic Automation
          <br />
          Across India
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#52525b",
            maxWidth: 600,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Appointment reminders, patient recall, and Google review automation
          for independent dental clinics. Starting at Rs 2,999/month.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/dental"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              background: "#18181b",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            View Features &amp; Pricing
          </a>
          <a
            href="/diagnostic"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              background: "transparent",
              color: "#18181b",
              border: "1.5px solid #e4e4e7",
              textDecoration: "none",
            }}
          >
            Free Diagnostic
          </a>
        </div>
      </section>

      {/* Cities We Serve */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            SmileCRM for Dental Clinics Across India
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#71717a",
              fontSize: 15,
              marginBottom: 48,
            }}
          >
            Available in {cities.length} cities. Find your city below for
            local pricing and setup details.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/smilecrm/${city.slug}`}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1px solid #e4e4e7",
                    background: "#fff",
                    color: "#18181b",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    transition: "border-color .15s",
                  }}
                >
                  SmileCRM {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #f4f4f5",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "#a1a1aa" }}>
          Delta Labs AI. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>
          neil@mail.deltalabsai.com
        </p>
      </footer>
    </main>
  );
}
