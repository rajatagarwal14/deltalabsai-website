"use client";

import { useState, useEffect, useRef } from "react";

const MAIL = "mailto:neil@mail.deltalabsai.com";
const FORM = "/diagnostic";

function useFade() {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return [r, v];
}
function F({ children, d = 0, style = {} }) {
  const [r, v] = useFade();
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `all 0.65s ease ${d}s`, ...style }}>{children}</div>;
}

const Ic = {
  Delta: ({ s = 28 }) => <svg width={s} height={s} viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" /><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3" /></svg>,
  Chk: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Arr: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Home: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
};

function Btn({ children, href, v = "primary", style = {}, ...p }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .2s", textDecoration: "none", border: "none" };
  const styles = v === "primary"
    ? { ...base, background: "#18181b", color: "#fff", ...style }
    : { ...base, background: "transparent", color: "#18181b", border: "1.5px solid #e4e4e7", ...style };
  return <a href={href} style={styles} {...p}>{children}</a>;
}

const features = [
  { title: "Booking on WhatsApp", desc: "A patient messages your clinic. The assistant offers open times from each doctor's working hours, skips leave and booked slots, and books the visit." },
  { title: "Tap-to-reply buttons", desc: "Patients tap instead of typing." },
  { title: "Reminders before each visit", desc: "Sent on WhatsApp." },
  { title: "English, Hindi and Hinglish", desc: "The assistant replies in the language your patients use." },
  { title: "Consent handled properly", desc: "Your clinic only messages patients who wrote to you or agreed at the desk, and anyone who replies STOP is not messaged again." },
  { title: "No fees in patient chats", desc: "The assistant never quotes a price. If a patient asks, it says the doctor will advise after the check-up and shares your clinic's contact details." },
  { title: "Patient records", desc: "Registration form, medical history, dated consent, and uploads of X-rays and reports, including large panoramic images." },
  { title: "Doctor calendar", desc: "Working hours and leave for each doctor. Doctors get an email invite for each visit and can accept or decline. A declined visit moves to a free doctor without bothering the patient." },
  { title: "Billing at the desk", desc: "Bill a visit, take an advance or a part payment, record how it was paid, and send the patient a receipt with the balance on WhatsApp." },
  { title: "Feedback after a visit", desc: "Patients are asked how their visit went." },
  { title: "Where patients came from", desc: "Tagged WhatsApp links and a QR code for Google Maps, Instagram, Facebook, ads, your website and print, so Analytics shows which source brought each new patient." },
  { title: "A dashboard", desc: "Appointments, the day's queue, patients, reports and analytics." },
];

const notIncluded = [
  "No text messages. Messages go on WhatsApp.",
  "No automatic campaigns to bring back lapsed patients, and no promotional broadcasts to your patients.",
  "No integration with Practo or other clinic software.",
  "No Google Calendar sync. Doctors get email calendar invites instead.",
  "No import of your existing patient list as standard.",
  "No multi-location dashboard, custom integrations or dedicated account manager.",
  "No phone calls by the assistant. It works in WhatsApp chat only.",
  "Anything custom is quoted separately, in writing, before any work starts.",
];

export default function SmileCRMCityClient({ city }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: `Can a dental clinic in ${city.name} use SmileCRM?`, a: `Yes. Setup is done remotely, with written step by step instructions, so it works for clinics in ${city.name}, ${city.state}.` },
    { q: "Will patients see prices on WhatsApp?", a: "No. The assistant never quotes a fee. A receipt you send after a visit shows what was paid and what is left, because that is a bill, not a chat." },
    { q: "Does it work with Practo?", a: "No. SmileCRM does not connect to Practo or other clinic software." },
    { q: "How is the price set?", a: "By written quote, after you tell us about your clinic. You agree it before anything starts." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: "#18181b", background: "#fff" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f4f4f5", padding: "14px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#18181b" }}>
            <Ic.Delta /><span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.5 }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="/blog" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Blog</a>
            <a href="/diagnostic" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Diagnostic</a>
            <Btn href={MAIL} v="primary" style={{ padding: "9px 20px", fontSize: 13 }}>Write to us</Btn>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 24px 0" }}>
        <nav aria-label="breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#71717a" }}>
          <a href="/" style={{ color: "#71717a", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}><Ic.Home /> Home</a>
          <span>›</span>
          <a href="/dental" style={{ color: "#71717a", textDecoration: "none" }}>SmileCRM</a>
          <span>›</span>
          <span style={{ color: "#18181b", fontWeight: 500 }}>{city.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px 56px", textAlign: "center" }}>
        <F>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "#f0fdf4", color: "#16a34a", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Built for Independent Dental Clinics in {city.name}
          </div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, margin: "0 0 20px" }}>
            SmileCRM for Dental Clinics<br />in {city.name}
          </h1>
          <p style={{ fontSize: 18, color: "#52525b", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.65 }}>
            Patients book on WhatsApp, get reminded before their visit, and your front desk stops chasing confirmations. Built and run by Delta Labs AI for independent clinics in {city.name}.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={MAIL}>Send a short written enquiry <Ic.Arr /></Btn>
            <Btn href={FORM} v="secondary">Take Free Diagnostic</Btn>
          </div>
        </F>
      </section>

      {/* Problem */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            The problem every independent clinic in {city.name} faces
          </h2>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7 }}>
            You built your practice in {city.name} on trust and quality care. But behind the scenes, missed appointments drain your revenue and your front desk spends its day chasing confirmations.
          </p>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7, marginTop: 16 }}>
            Large dental chains have entire teams handling patient communication, follow-ups, and marketing. As an independent clinic in {city.name}, you do not need a team. You need the right system. That is exactly what SmileCRM was built for.
          </p>
        </F>
      </section>

      {/* Features */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>What it does today</h2></F>
          <F d={0.05}><p style={{ textAlign: "center", color: "#71717a", marginTop: -28, marginBottom: 40, fontSize: 15 }}>If something is not on this list, it is not part of SmileCRM.</p></F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <F key={i} d={i * 0.08}>
                <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #f4f4f5", height: "100%" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 24px" }}>
        <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Pricing for {city.name} clinics</h2></F>
        <F d={0.1}><p style={{ textAlign: "center", color: "#52525b", maxWidth: 620, margin: "0 auto 24px", fontSize: 15, lineHeight: 1.7 }}>Pricing is by quote. Send us a short written enquiry about your clinic and we reply in writing with what is included and the price. Nothing starts until you have agreed the quote.</p></F>
        <F d={0.15}><div style={{ textAlign: "center", marginBottom: 48 }}><Btn href={MAIL}>Send a short written enquiry <Ic.Arr /></Btn></div></F>
        <F d={0.2}>
          <div style={{ maxWidth: 700, margin: "0 auto", borderRadius: 14, padding: 32, border: "1px solid #e4e4e7" }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>What is not included</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {notIncluded.map((f, j) => (
                <li key={j} style={{ fontSize: 14, color: "#52525b", marginBottom: 10, lineHeight: 1.6 }}>{f}</li>
              ))}
            </ul>
          </div>
        </F>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: "center" }}>Frequently asked questions</h2></F>
          {faqs.map((f, i) => (
            <F key={i} d={i * 0.05}>
              <div style={{ borderBottom: "1px solid #e4e4e7", padding: "20px 0" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: 16, fontWeight: 600, color: "#18181b", textAlign: "left" }}>
                  {f.q}
                  <span style={{ fontSize: 20, transition: "transform .2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.7, marginTop: 12 }}>{f.a}</p>}
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            Ready to transform your {city.name} clinic?
          </h2>
          <p style={{ fontSize: 16, color: "#52525b", marginBottom: 32, lineHeight: 1.6 }}>
            Built for independent dental clinics in {city.state} that want fewer missed visits and a front desk that is not chasing confirmations.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={MAIL}>Send a short written enquiry <Ic.Arr /></Btn>
            <Btn href={FORM} v="secondary">Take Free Diagnostic</Btn>
          </div>
        </F>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f4f4f5", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#a1a1aa" }}>
          <a href="/dental" style={{ color: "#a1a1aa", textDecoration: "none" }}>SmileCRM</a> by Delta Labs AI. Built for dental clinics in {city.name}, {city.state}. Delta Labs AI is operated by A.G. Ventures, India.
        </p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>neil@mail.deltalabsai.com</p>
      </footer>
    </div>
  );
}
