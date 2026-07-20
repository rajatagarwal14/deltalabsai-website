"use client";

import { useState, useEffect, useRef } from "react";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";
const WA = "https://wa.me/917011402167?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20the%20Repeat-Visit%20Engine";

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
};

function Btn({ children, href, v = "primary", ...p }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .2s", textDecoration: "none", border: "none" };
  const styles = v === "primary"
    ? { ...base, background: "#18181b", color: "#fff" }
    : { ...base, background: "transparent", color: "#18181b", border: "1.5px solid #e4e4e7" };
  return <a href={href} style={styles} {...p}>{children}</a>;
}

const mechanisms = [
  { title: "Recall", desc: "Every patient whose last-visit-date plus treatment interval is due (typically botox around 90 days, filler around 180 days, laser per its own protocol) gets a WhatsApp message before the window opens." },
  { title: "No-Show Re-Engagement", desc: "Every no-show or cancellation automatically triggers a WhatsApp re-booking message. No admin has to remember to follow up." },
  { title: "Review Capture", desc: "Every completed visit gets a WhatsApp review request 24 hours later, while the result is still fresh." },
];

const steps = [
  { title: "Upload your patient list", desc: "A simple CSV or manual entry: name, WhatsApp number, last-visit-date, treatment type. No EMR or booking-system integration required." },
  { title: "The automated WhatsApp sequence runs", desc: "Recall, no-show re-engagement, and review requests go out on schedule, on their own, every day." },
  { title: "Track results", desc: "See who was messaged, who rebooked, and how many reviews came in. Update visit dates as they happen." },
];

const faqs = [
  { q: "Do I need to connect my EMR or booking software?", a: "No. The Repeat-Visit Engine runs standalone off a simple patient list. You upload a CSV or enter patients manually: name, WhatsApp number, last-visit-date, treatment type." },
  { q: "Does that mean I have to update visit dates myself?", a: "Yes, to be upfront about it. There is no live sync with your booking system yet, so visit dates are entered manually as patients come in. It takes a couple of minutes a day for most clinics." },
  { q: "What exactly happens if I sign up?", a: "We set up your three automations: recall messages timed to each treatment's interval, no-show re-booking prompts, and 24-hour post-visit review requests. Nothing beyond those three." },
  { q: "What is the guarantee?", a: "We go live within 7 days or you pay nothing. And if you see no measurable lift in repeat bookings within 30 days, you get a full refund." },
  { q: "Which treatments does the recall timing cover?", a: "Typically botox around 90 days, filler around 180 days, and laser on its own protocol interval. These are common defaults, not medical advice, and you set the exact timing per treatment type when you upload your list." },
  { q: "Is this only for medspas?", a: "It's built for independent aesthetic and skin clinics in Dubai and Sharjah: medspas, cosmetic dermatology clinics, and skin clinics that rely on repeat visits." },
  { q: "Will this take over our WhatsApp number?", a: "No. The automated messages run on a separate, dedicated WhatsApp number we set up for your clinic, not your existing patient-facing line. Your main number stays 100% yours, with your staff replying to patients as always. If a patient replies to the automation number, we forward that to you so nothing gets missed." },
];

export default function RepeatVisitEnginePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: "#18181b", background: "#fff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f4f4f5", padding: "14px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#18181b" }}>
            <Ic.Delta /><span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.5 }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="/blog" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Blog</a>
            <Btn href={WA} v="primary" style={{ padding: "9px 20px", fontSize: 13 }}>WhatsApp Us</Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <F>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "#f0fdf4", color: "#16a34a", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>Built for Independent Aesthetic Clinics in Dubai &amp; Sharjah</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, margin: "0 0 20px" }}>
            The Repeat-Visit Engine<br />for Medspas and Skin Clinics
          </h1>
          <p style={{ fontSize: 18, color: "#52525b", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Three automated WhatsApp sequences that bring patients back on schedule, recover no-shows, and collect reviews. Live in 7 days or you pay nothing.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={WA}>Message Us on WhatsApp <Ic.Arr /></Btn>
            <Btn href={CAL} v="secondary">Book a Demo</Btn>
          </div>
        </F>
      </section>

      {/* Guarantee strip */}
      <section style={{ background: "#fafafa", padding: "32px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, textAlign: "center" }}>
          <F>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>Live in 7 days</div>
            <div style={{ fontSize: 14, color: "#71717a", marginTop: 4 }}>or you pay nothing</div>
          </F>
          <F d={0.1}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>No lift in 30 days</div>
            <div style={{ fontSize: 14, color: "#71717a", marginTop: 4 }}>full refund, no questions</div>
          </F>
        </div>
      </section>

      {/* Problem */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Your patients are worth more than one visit</h2>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7 }}>
            Most independent aesthetic clinics do the treatment well and then lose the patient anyway. Nobody follows up when a botox patient's 90 days are up. Nobody chases a no-show. Nobody asks for a review while the result still looks great.
          </p>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7, marginTop: 16 }}>
            You do not need a bigger front desk team or a new booking system. You need three messages sent at the right time, every time. That is the whole product.
          </p>
        </F>
      </section>

      {/* 3 Mechanisms */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>Exactly three mechanisms. Nothing more.</h2></F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {mechanisms.map((f, i) => (
              <F key={i} d={i * 0.08}>
                <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #f4f4f5", height: "100%" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#a1a1aa", marginBottom: 8 }}>{i + 1}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 24px" }}>
        <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>How it works</h2></F>
        <F d={0.1}><p style={{ textAlign: "center", color: "#71717a", marginBottom: 40, fontSize: 15 }}>No EMR integration. No booking-system sync. Just a patient list and WhatsApp.</p></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {steps.map((s, i) => (
            <F key={i} d={i * 0.1}>
              <div style={{ borderRadius: 14, padding: 32, border: "1px solid #e4e4e7", height: "100%" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#18181b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>{i + 1}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </F>
          ))}
        </div>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Ready to bring patients back on schedule?</h2>
          <p style={{ fontSize: 16, color: "#52525b", marginBottom: 32, lineHeight: 1.6 }}>
            Send us your patient list and we go live within 7 days. If it doesn't lift your repeat bookings in 30 days, you get every dirham back.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={WA}>Message Us on WhatsApp <Ic.Arr /></Btn>
            <Btn href={CAL} v="secondary">Book a Demo</Btn>
          </div>
        </F>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f4f4f5", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#a1a1aa" }}>Delta Labs AI. All rights reserved.</p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>neil@mail.deltalabsai.com</p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 10, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>We only handle the appointment and contact details you share with us, never clinical or medical records. See our <a href="/privacy" style={{ color: "#71717a", textDecoration: "underline" }}>Privacy Policy</a>.</p>
      </footer>
    </div>
  );
}
