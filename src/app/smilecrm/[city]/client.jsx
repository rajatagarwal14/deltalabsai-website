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
  { title: "Automated Appointment Reminders", desc: "WhatsApp and SMS reminders sent 24 hours and 2 hours before every appointment. Built to cut no-shows." },
  { title: "Patient Recall System", desc: "Automatically identify patients overdue for checkups and send personalized recall messages. Recover revenue lost to missed recalls." },
  { title: "Google Review Automation", desc: "After every visit, patients automatically receive a review request — designed to grow your Google reviews." },
  { title: "Simple Appointment Dashboard", desc: "See your entire schedule, patient history, and revenue at a glance. No complex training required." },
  { title: "WhatsApp Follow-ups", desc: "Post-treatment care instructions, feedback requests, and appointment confirmations sent automatically via WhatsApp." },
  { title: "Patient Records at Your Fingertips", desc: "Quick access to patient history, treatment plans, and notes. Everything in one place, accessible from any device." },
];

const plans = [
  { name: "Starter", price: "2,999", period: "/month", features: ["Appointment reminders (SMS)", "Basic patient dashboard", "Up to 200 patients", "Email support"], cta: "Start Free Trial" },
  { name: "Professional", price: "4,999", period: "/month", popular: true, features: ["Everything in Starter", "WhatsApp reminders + follow-ups", "Google review automation", "Patient recall system", "Up to 1,000 patients", "Priority support"], cta: "Start Free Trial" },
  { name: "Premium", price: "6,999", period: "/month", features: ["Everything in Professional", "Multi-location support", "Unlimited patients", "Custom integrations", "Dedicated account manager", "Analytics dashboard"], cta: "Contact Us" },
];

const stats = [
  { num: "24/7", label: "Automated reminders" },
  { num: "Auto", label: "Google review requests" },
  { num: "Auto", label: "Patient recall" },
  { num: "Auto", label: "Admin work off your plate" },
];

export default function SmileCRMCityClient({ city }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: `Is SmileCRM available for dental clinics in ${city.name}?`, a: `Yes! SmileCRM is available for dental clinics across India, including ${city.name}, ${city.state}. We handle remote setup and onboarding — most clinics in ${city.name} are live within 48 hours.` },
    { q: "Is SmileCRM difficult to set up?", a: "Not at all. We handle the entire setup for you. Most clinics are up and running within 48 hours. No technical skills required." },
    { q: "Will my staff need training?", a: "SmileCRM is designed to be intuitive. We provide a 30-minute walkthrough and most staff members are comfortable within a day." },
    { q: "What if I already use another software?", a: "SmileCRM integrates with most existing systems. We can import your patient data and run alongside your current tools." },
    { q: "Is there a free trial?", a: "Yes, we offer a 14-day free trial on all plans. No credit card required. See the results before you commit." },
    { q: "Can I use SmileCRM for multiple locations?", a: `Yes, the Premium plan supports multiple locations under one dashboard — ideal if you have more than one clinic in ${city.name} or across ${city.state}.` },
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
            <Btn href="#cal-book" v="primary" style={{ padding: "9px 20px", fontSize: 13 }}>Book a Call</Btn>
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
            Automate appointment reminders, patient recall, and Google review collection for your {city.name} dental clinic. Simple setup. Affordable pricing. Real results from day one.
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

      {/* Problem */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            The problem every independent clinic in {city.name} faces
          </h2>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7 }}>
            You built your practice in {city.name} on trust and quality care. But behind the scenes, missed appointments drain your revenue, patients overdue for checkups never come back, and your Google reviews do not reflect the exceptional work you do every day.
          </p>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7, marginTop: 16 }}>
            Large dental chains have entire teams handling patient communication, follow-ups, and marketing. As an independent clinic in {city.name}, you do not need a team. You need the right system. That is exactly what SmileCRM was built for.
          </p>
        </F>
      </section>

      {/* Features */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>Everything your {city.name} clinic needs. Nothing it does not.</h2></F>
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
        <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Simple, transparent pricing for {city.name} clinics</h2></F>
        <F d={0.1}><p style={{ textAlign: "center", color: "#71717a", marginBottom: 40, fontSize: 15 }}>14-day free trial on all plans. No credit card required.</p></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {plans.map((p, i) => (
            <F key={i} d={i * 0.1}>
              <div style={{ borderRadius: 14, padding: 32, border: p.popular ? "2px solid #18181b" : "1px solid #e4e4e7", position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
                {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#18181b", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 14px", borderRadius: 20 }}>Most Popular</div>}
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 800 }}>Rs {p.price}</span>
                  <span style={{ color: "#71717a", fontSize: 14 }}>{p.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                  {p.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#52525b", marginBottom: 10 }}>
                      <Ic.Chk /> {f}
                    </li>
                  ))}
                </ul>
                <Btn href="#cal-book" v={p.popular ? "primary" : "secondary"} style={{ justifyContent: "center", width: "100%" }}>{p.cta}</Btn>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            Ready to transform your {city.name} clinic?
          </h2>
          <p style={{ fontSize: 16, color: "#52525b", marginBottom: 32, lineHeight: 1.6 }}>
            Join independent dental clinics across {city.state} and India that are recovering revenue, reducing no-shows, and growing their online reputation with SmileCRM.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href="#cal-book">Book a Free Demo <Ic.Arr /></Btn>
            <Btn href={FORM} v="secondary">Take Free Diagnostic</Btn>
          </div>
        </F>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f4f4f5", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#a1a1aa" }}>
          <a href="/dental" style={{ color: "#a1a1aa", textDecoration: "none" }}>SmileCRM</a> by Delta Labs AI. Serving dental clinics in {city.name}, {city.state} and across India.
        </p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>neil@mail.deltalabsai.com</p>
      </footer>
    </div>
  );
}
