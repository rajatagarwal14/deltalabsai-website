import Link from "next/link";
import { cities } from "./cities";

export const metadata = {
  title: "SmileCRM: Clinic CRM with WhatsApp Booking | Delta Labs AI",
  description:
    "SmileCRM for independent clinics and doctors, dental and other specialities: patients book on WhatsApp, get a reminder before each visit, and are asked for feedback afterwards. Pricing by quote.",
  keywords: [
    "clinic crm",
    "clinic software",
    "clinic whatsapp booking",
    "dental clinic software",
    "dental crm",
    "dental clinic management software",
    "dental practice management software",
    "dental software india",
  ],
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
            Dental clinics
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
          Built for Independent Clinics
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
          SmileCRM: WhatsApp Booking
          <br />
          for Independent Clinics
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
          Patients book on WhatsApp, get reminded before their visit, and your
          front desk stops chasing confirmations. For independent clinics and
          doctors, dental and other specialities. Built and run by Delta Labs AI.
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
            href="mailto:neil@mail.deltalabsai.com"
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
            Send a short written enquiry
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

      {/* What it does today */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 64px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>
          What it does today
        </h2>
        <p style={{ textAlign: "center", color: "#71717a", fontSize: 15, marginBottom: 32 }}>
          If something is not on this list, it is not part of SmileCRM. Dental
          is where it is most complete today; see the{" "}
          <a href="/dental" style={{ color: "#18181b" }}>dental clinic page</a>.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, color: "#52525b", fontSize: 15, lineHeight: 1.7 }}>
          {[
            "Booking on WhatsApp, with open times taken from each doctor's working hours, leave and booked slots.",
            "Reminders on WhatsApp before each visit.",
            "Patient records: registration form, medical history, dated consent and uploaded reports.",
            "A doctor calendar with working hours, leave and an email invite for each visit.",
            "Billing at the desk, with a receipt and the balance sent to the patient on WhatsApp.",
            "Feedback after a visit.",
            "Tagged WhatsApp links and a QR code, so you can see which source brought each new patient.",
            "A dashboard for appointments, the day's queue, patients, reports and analytics.",
          ].map((t) => (
            <li key={t} style={{ marginBottom: 8 }}>{t}</li>
          ))}
        </ul>
        <p style={{ color: "#52525b", fontSize: 15, lineHeight: 1.7, marginTop: 24 }}>
          Pricing is by quote. Send us a short written enquiry about your clinic
          and we reply in writing with what is included and the price. Nothing
          starts until you have agreed the quote.
        </p>
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
            SmileCRM for dental clinics, by city
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#71717a",
              fontSize: 15,
              marginBottom: 48,
            }}
          >
            Find your city below for setup details.
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
          Delta Labs AI is operated by A.G. Ventures, India. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>
          neil@mail.deltalabsai.com
        </p>
      </footer>
    </main>
  );
}
