"use client";

import { useState, useEffect, useRef } from "react";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";
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
};

function Btn({ children, href, v = "primary", ...p }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .2s", textDecoration: "none", border: "none" };
  const styles = v === "primary"
    ? { ...base, background: "#18181b", color: "#fff" }
    : { ...base, background: "transparent", color: "#18181b", border: "1.5px solid #e4e4e7" };
  return <a href={href} style={styles} {...p}>{children}</a>;
}

const painPoints = [
  { title: "Members ghost after month one", desc: "50% of new members cancel within 90 days. Without automated engagement, they quietly disappear and you only notice when revenue drops." },
  { title: "Scheduling is a full-time job", desc: "WhatsApp messages, phone calls, walk-ins. Managing class bookings manually eats 10+ hours per week that should go toward training clients." },
  { title: "Empty slots from no-shows", desc: "Members book classes but do not show up. The spot goes wasted. The waitlisted member never gets notified. Revenue lost, twice." },
  { title: "Reviews do not match your quality", desc: "Your studio delivers great results but has 12 Google reviews. The franchise gym down the road has 200. Guess who new members find first." },
];

const solutions = [
  { title: "24/7 Class Booking", desc: "Members book, cancel, and join waitlists online. No calls, no WhatsApp back-and-forth. Your schedule updates everywhere automatically." },
  { title: "Smart Reminders", desc: "Automated WhatsApp and SMS reminders 24 hours and 2 hours before class. Cut no-shows by up to 40% without sending a single message yourself." },
  { title: "Retention Autopilot", desc: "When a regular member misses their usual class, they get a personalized nudge. Milestone celebrations at 10, 25, 50 classes keep motivation high." },
  { title: "Review Engine", desc: "After their 10th class, members automatically receive a Google review request. Double your reviews in 3 months without asking awkwardly." },
  { title: "Member Dashboard", desc: "See attendance trends, at-risk members, revenue, and class popularity at a glance. Make decisions with data, not gut feeling." },
  { title: "WhatsApp Follow-ups", desc: "Post-class tips, workout plans, and check-ins sent automatically. Keep members engaged between sessions without manual effort." },
];

const stats = [
  { num: "40%", label: "Fewer no-shows" },
  { num: "50%", label: "Members lost in 90 days (without automation)" },
  { num: "2x", label: "More Google reviews" },
  { num: "10+ hrs", label: "Saved per week" },
];

const faqs = [
  { q: "Does this work for yoga studios, gyms, and personal trainers?", a: "Yes. Our tools are designed for any independent fitness business, whether you run group classes, one-on-one training, or both." },
  { q: "How long does setup take?", a: "Most studios are fully set up within 48 hours. We handle the configuration and import your existing member data." },
  { q: "What if my members are not tech-savvy?", a: "The booking system works through a simple link. If someone can use WhatsApp, they can book a class. No app download required." },
  { q: "How much does it cost?", a: "Plans start at Rs 2,999/month for small studios. Custom pricing available for larger facilities. 14-day free trial on all plans." },
  { q: "Can I try it before committing?", a: "Absolutely. We offer a 14-day free trial with no credit card required. See the results before you pay anything." },
];

export default function FitnessPage() {
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
            <a href="/diagnostic" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Diagnostic</a>
            <Btn href="#cal-book" v="primary" style={{ padding: "9px 20px", fontSize: 13 }}>Book a Call</Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <F>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "#eff6ff", color: "#2563eb", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>Built for Independent Gyms, Yoga Studios & Trainers</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, margin: "0 0 20px" }}>
            Gym & Yoga Studio Automation<br />for Scheduling, Retention & Reviews
          </h1>
          <p style={{ fontSize: 18, color: "#52525b", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Class scheduling, member retention, and review collection on autopilot. Built for independent fitness businesses that want to grow without burning out.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href="#cal-book">Book a Free Demo <Ic.Arr /></Btn>
            <Btn href={FORM} v="secondary">Take Free Diagnostic</Btn>
          </div>
        </F>
      </section>

      {/* Stats */}
      <section style={{ background: "#fafafa", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
          {stats.map((s, i) => (
            <F key={i} d={i * 0.1}>
              <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{s.num}</div>
              <div style={{ fontSize: 14, color: "#71717a", marginTop: 4 }}>{s.label}</div>
            </F>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px" }}>
        <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: "center" }}>Sound familiar?</h2></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {painPoints.map((p, i) => (
            <F key={i} d={i * 0.08}>
              <div style={{ padding: 24, borderRadius: 12, border: "1px solid #fecaca", background: "#fef2f2" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#dc2626" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>The fix is simpler than you think</h2></F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {solutions.map((f, i) => (
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

      {/* FAQ */}
      <section style={{ padding: "72px 24px" }}>
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
      <section style={{ background: "#fafafa", padding: "72px 24px", textAlign: "center" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Ready to grow your studio?</h2>
          <p style={{ fontSize: 16, color: "#52525b", marginBottom: 32, lineHeight: 1.6, maxWidth: 500, margin: "0 auto 32px" }}>
            Independent fitness businesses across India and worldwide are automating their operations. Start your 14-day free trial today.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href="#cal-book">Book a Free Demo <Ic.Arr /></Btn>
            <Btn href={FORM} v="secondary">Take Free Diagnostic</Btn>
          </div>
        </F>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f4f4f5", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#a1a1aa" }}>Delta Labs AI. All rights reserved.</p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>neil@mail.deltalabsai.com</p>
      </footer>
    </div>
  );
}
