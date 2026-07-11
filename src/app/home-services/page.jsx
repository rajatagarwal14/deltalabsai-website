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

const services = [
  "Cleaning Services", "Pest Control", "Plumbing", "Electrical", "HVAC & AC Repair", "Painting", "Landscaping", "Handyman Services"
];

const problems = [
  { title: "Missed calls = missed revenue", desc: "When you are on a job, you cannot answer the phone. Every missed call is a potential customer who goes to your competitor instead." },
  { title: "No follow-up system", desc: "You finish a job, move to the next one, and never follow up. That customer needed you again 6 months later but called someone else because they forgot your name." },
  { title: "Scheduling chaos", desc: "Double bookings, forgotten appointments, and last-minute cancellations. Your calendar lives in your head or on sticky notes." },
  { title: "Zero online presence", desc: "You have 5 Google reviews. The company that started last year has 50. New customers choose them every time." },
];

const solutions = [
  { title: "24/7 Online Booking", desc: "Customers book appointments through your website or a simple link, any time of day. No missed calls. No phone tag. Jobs fill your calendar while you work." },
  { title: "Automated Confirmations", desc: "The moment someone books, they get a WhatsApp or SMS confirmation with date, time, and your contact details. Professional and instant." },
  { title: "Job Reminders", desc: "Customers get reminded 24 hours before their appointment. You get reminded too. Built to cut no-shows. No more wasted trips." },
  { title: "Follow-up Automation", desc: "After every job, customers automatically receive a thank-you message, a feedback request, and a Google review link. Build repeat business on autopilot." },
  { title: "Customer CRM", desc: "Every customer, every job, every note in one simple dashboard. When Mrs. Sharma calls again, you know her address, her AC model, and what you fixed last time." },
  { title: "Review Collection", desc: "Happy customers get a gentle review request at the perfect moment. Grow your Google reviews without awkwardly asking." },
];

const stats = [
  { num: "24/7", label: "Automated booking & reminders" },
  { num: "Auto", label: "Confirmations on every job" },
  { num: "Auto", label: "Follow-up & review requests" },
  { num: "Live", label: "Customer CRM dashboard" },
];

const faqs = [
  { q: "I am not tech-savvy. Can I still use this?", a: "Absolutely. We set everything up for you. If you can use WhatsApp, you can use our tools. No technical skills needed." },
  { q: "How much does it cost?", a: "Plans start at Rs 2,999/month (or $49/month for international businesses). 14-day free trial, no credit card required." },
  { q: "Will my customers actually book online?", a: "Yes. We have seen 70%+ of customers prefer online booking when given the option. It is faster for them and easier for you." },
  { q: "How quickly can I get started?", a: "Most businesses are set up within 48 hours. We handle the configuration, import your customer data, and train you on the dashboard." },
  { q: "Does this work for businesses outside India?", a: "Yes. We work with home service businesses globally, including UAE, UK, USA, and Australia. Pricing adapts to your market." },
];

export default function HomeServicesPage() {
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
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "#fefce8", color: "#ca8a04", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>Built for Home Service Businesses</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, margin: "0 0 20px" }}>
            Never miss a booking.<br />Never lose a customer.
          </h1>
          <p style={{ fontSize: 18, color: "#52525b", maxWidth: 600, margin: "0 auto 24px", lineHeight: 1.6 }}>
            Automated booking, reminders, follow-ups, and reviews for cleaning, pest control, plumbing, HVAC, and every home service business. Built for small teams.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            {services.map((s, i) => (
              <span key={i} style={{ padding: "4px 12px", borderRadius: 16, background: "#f4f4f5", fontSize: 12, color: "#52525b" }}>{s}</span>
            ))}
          </div>
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

      {/* Problems */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px" }}>
        <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: "center" }}>Running a home service business is hard enough</h2></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {problems.map((p, i) => (
            <F key={i} d={i * 0.08}>
              <div style={{ padding: 24, borderRadius: 12, border: "1px solid #fef3c7", background: "#fffbeb" }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#b45309" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>Let automation handle the admin. You handle the work.</h2></F>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Ready to grow your business?</h2>
          <p style={{ fontSize: 16, color: "#52525b", marginBottom: 32, lineHeight: 1.6, maxWidth: 500, margin: "0 auto 32px" }}>
            Home service businesses across India, Dubai, UK, and USA are automating their operations. Start your 14-day free trial today.
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
