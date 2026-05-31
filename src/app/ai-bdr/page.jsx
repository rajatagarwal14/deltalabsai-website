"use client";

import { useState, useEffect, useRef } from "react";
import { useRegionPricing } from "../lib/useRegion";

const FORM = "https://tally.so/r/ai-bdr";

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
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  Mail: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2 7 12 13 22 7" /></svg>,
  Refresh: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>,
  Handoff: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  Bot: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><line x1="12" y1="7" x2="12" y2="11" /><line x1="8" y1="15" x2="8" y2="15" /><line x1="16" y1="15" x2="16" y2="15" /></svg>,
};

function Btn({ children, href, v = "primary", ...p }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .2s", textDecoration: "none", border: "none" };
  const styles = v === "primary"
    ? { ...base, background: "#18181b", color: "#fff" }
    : { ...base, background: "transparent", color: "#18181b", border: "1.5px solid #e4e4e7" };
  return <a href={href} style={styles} {...p}>{children}</a>;
}

function useTriggeredCTA(key) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) return;
    let shown = false;
    const show = () => { if (!shown) { shown = true; setVisible(true); } };
    const onScroll = () => {
      if ((window.scrollY + window.innerHeight) / document.body.scrollHeight >= 0.6) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(show, 45000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, [key]);
  const dismiss = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(key, "1");
  };
  return [visible, dismiss];
}

function StickyBar({ href, label, subtext }) {
  const [visible, dismiss] = useTriggeredCTA("cta_aibdr");
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
      background: "#18181b", color: "#fff", padding: "16px 24px",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
      boxShadow: "0 -4px 24px rgba(0,0,0,0.18)",
      animation: "slideUp 0.4s ease",
      flexWrap: "wrap",
    }}>
      <p style={{ margin: 0, fontSize: 14, color: "#d4d4d8" }}>{subtext}</p>
      <a href={href} onClick={dismiss} style={{
        background: "#fff", color: "#18181b", padding: "10px 24px", borderRadius: 8,
        fontWeight: 700, fontSize: 14, textDecoration: "none", flexShrink: 0,
      }}>{label}</a>
      <button onClick={dismiss} style={{
        background: "none", border: "none", color: "#71717a", cursor: "pointer",
        fontSize: 20, lineHeight: 1, padding: 4, position: "absolute", right: 16,
      }}>×</button>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

const steps = [
  { icon: <Ic.Search />, step: "01", title: "Lead Research", desc: "Our AI scans your target market, qualifies prospects against your ICP, and builds a list of decision-makers with verified contact data — every week." },
  { icon: <Ic.Mail />, step: "02", title: "Personalised Email", desc: "Each prospect gets a uniquely written email using live context from their LinkedIn, website, and news. Not a template — actual personalisation at scale." },
  { icon: <Ic.Refresh />, step: "03", title: "Smart Follow-up", desc: "AI monitors who opened, clicked, or went cold and sends the right follow-up at the right time. No manual chasing on your side." },
  { icon: <Ic.Handoff />, step: "04", title: "Warm Handoff", desc: "When a prospect replies with intent, we flag it immediately and route the conversation to you — all context included. You walk in ready to close." },
];

const included = [
  { title: "ICP Definition & Targeting", desc: "We map your ideal customer profile and identify exactly the right decision-makers — title, company size, industry, intent signals." },
  { title: "Verified Contact Data", desc: "Every contact is verified before outreach. No bounces eating your sender reputation. Email + LinkedIn as backup." },
  { title: "AI-Written Sequences", desc: "Multi-touch sequences (email + optional LinkedIn) written by AI with human-level personalisation. Tested for deliverability." },
  { title: "Open & Reply Tracking", desc: "Real-time visibility into who opened, clicked, and replied. Full activity feed in your shared dashboard." },
  { title: "Bounce & Unsubscribe Handling", desc: "Automatic bounce processing, unsubscribe compliance, and sender health monitoring — so your domain stays clean." },
  { title: "Monthly Performance Report", desc: "Delivered to your inbox: sequences sent, open rate, reply rate, meetings booked, and recommendations for next month." },
];

const stats = [
  { num: "200", label: "Outreach sequences / mo" },
  { num: "35-50%", label: "Average open rate" },
  { num: "48 hrs", label: "Setup to first send" },
  { num: "100%", label: "Done-for-you" },
];

const faqs = [
  { q: "Who is this service for?", a: "Any SMB or founder who needs a consistent pipeline of warm leads but doesn't have a sales team to do outreach. If you close deals well but hate prospecting — this is for you." },
  { q: "How is this different from hiring a BDR?", a: "A human BDR costs ₹40,000–80,000/month and can send 30-50 emails/day. Our AI sends 200 personalised sequences per month at ₹15,000 — and works 24/7 without sick days or ramp time." },
  { q: "What industries do you serve?", a: "We've run outreach for dental clinics, SaaS companies, e-commerce brands, professional services, fitness studios, and home service businesses. If your customer has an email address, we can reach them." },
  { q: "How quickly can you start?", a: "Typically within 48 hours of onboarding. We gather your ICP brief, set up your sending infrastructure, and launch the first batch. You see results in the first week." },
  { q: "What happens when someone replies?", a: "We flag the reply in your dashboard and send you an instant notification with full context — who they are, what they said, and suggested next steps. You take it from there." },
  { q: "Is my domain safe?", a: "Yes. We send from a dedicated subdomain or sending domain we set up for you, following email best practices (SPF, DKIM, DMARC). Your primary domain is never at risk." },
];

export default function AIBDRPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const { price, isIntl } = useRegionPricing();
  // International visitors don't see ₹ figures — swap the price-comparison FAQ for a
  // market-neutral version that points to a call for local pricing.
  const faqList = faqs.map((f, i) =>
    i === 1 && isIntl
      ? { ...f, a: "A human BDR costs a full salary plus benefits and sends only 30-50 emails/day. Our AI sends 200 personalised sequences every month at a flat fee — and works 24/7 without sick days or ramp time. Book a call for pricing in your market." }
      : f
  );

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: "#18181b", background: "#fff" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f4f4f5", padding: "14px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#18181b" }}>
            <Ic.Delta /><span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.5 }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="/diagnostic" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Free Diagnostic</a>
            <Btn href={FORM} style={{ padding: "10px 20px", fontSize: 14 }}>Get a Free Quote <Ic.Arr /></Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center", background: "linear-gradient(180deg, #fafafa 0%, #fff 100%)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <F d={0.05}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f4f4f5", border: "1px solid #e4e4e7", borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#52525b", marginBottom: 28 }}>
              <Ic.Bot /> AI Business Development Representative
            </div>
          </F>
          <F d={0.1}>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 20, color: "#18181b" }}>
              AI Does Your Business Development —<br />
              <span style={{ color: "#2563EB" }}>You Close Deals</span>
            </h1>
          </F>
          <F d={0.18}>
            <p style={{ fontSize: 19, color: "#52525b", lineHeight: 1.65, marginBottom: 36, maxWidth: 600, margin: "0 auto 36px" }}>
              Our AI agents prospect, research, personalise and send outreach. You get warm leads delivered to your inbox — ready to close.
            </p>
          </F>
          <F d={0.24}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn href={FORM}>Get a Free Quote <Ic.Arr /></Btn>
              <Btn href="/diagnostic" v="ghost">See How It Works</Btn>
            </div>
          </F>
          <F d={0.3}>
            <p style={{ marginTop: 28, fontSize: 13, color: "#71717a" }}>
              Powered by the same outreach system that runs Delta Labs AI pipeline · No setup fees · Cancel anytime
            </p>
          </F>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ padding: "36px 24px", borderTop: "1px solid #f4f4f5", borderBottom: "1px solid #f4f4f5", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {stats.map((s, i) => (
            <F key={i} d={i * 0.07}>
              <div style={{ fontWeight: 800, fontSize: 28, letterSpacing: -1, color: "#18181b" }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#71717a", marginTop: 4 }}>{s.label}</div>
            </F>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <F>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, color: "#2563EB", textTransform: "uppercase", marginBottom: 12 }}>The Process</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: -1, marginBottom: 12 }}>Four steps. Fully automated.</h2>
              <p style={{ fontSize: 16, color: "#52525b", maxWidth: 500, margin: "0 auto" }}>From finding the right prospect to routing a warm reply to your inbox — the AI handles every step.</p>
            </div>
          </F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {steps.map((s, i) => (
              <F key={i} d={i * 0.08}>
                <div style={{ border: "1.5px solid #e4e4e7", borderRadius: 14, padding: "28px 24px", height: "100%", background: "#fff", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 16, right: 18, fontSize: 13, fontWeight: 700, color: "#d4d4d8" }}>{s.step}</div>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: "#2563EB" }}>{s.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section style={{ padding: "80px 24px", background: "#fafafa", borderTop: "1px solid #f4f4f5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <F>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, color: "#2563EB", textTransform: "uppercase", marginBottom: 12 }}>Everything Included</p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: -1 }}>Done-for-you, end to end</h2>
            </div>
          </F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {included.map((item, i) => (
              <F key={i} d={i * 0.06}>
                <div style={{ background: "#fff", border: "1.5px solid #e4e4e7", borderRadius: 12, padding: "22px 20px", display: "flex", gap: 14 }}>
                  <div style={{ color: "#059669", flexShrink: 0, marginTop: 2 }}><Ic.Chk /></div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 5 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <F>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, color: "#2563EB", textTransform: "uppercase", marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: -1, marginBottom: 12 }}>Simple, flat pricing</h2>
            <p style={{ fontSize: 16, color: "#52525b", marginBottom: 40 }}>No per-lead fees. No long-term contracts. Just results.</p>
          </F>
          <F d={0.1}>
            <div style={{ border: "2px solid #18181b", borderRadius: 18, padding: "36px 32px", background: "#fff", textAlign: "left", boxShadow: "0 8px 40px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "inline-block", background: "#18181b", color: "#fff", borderRadius: 6, fontSize: 12, fontWeight: 700, padding: "4px 12px", marginBottom: 20, letterSpacing: 0.5 }}>STANDARD PLAN</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>{price("₹15,000")}</span>
                <span style={{ fontSize: 16, color: "#71717a", paddingBottom: 6 }}>{isIntl ? "— book a call" : "/month"}</span>
              </div>
              <p style={{ fontSize: 14, color: "#52525b", marginBottom: 28 }}>200 qualified outreach sequences per month</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  "200 personalised outreach sequences",
                  "ICP definition & prospect research",
                  "AI-written emails — not templates",
                  "Multi-touch follow-up sequences",
                  "Warm reply routing & notifications",
                  "Monthly performance report",
                  "Dedicated sending domain setup",
                  "Cancel anytime — no lock-in",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }}>
                    <span style={{ color: "#059669", flexShrink: 0, marginTop: 1 }}><Ic.Chk /></span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Btn href={FORM} style={{ width: "100%", justifyContent: "center", padding: "14px 28px", fontSize: 16 }}>
                Get a Free Quote <Ic.Arr />
              </Btn>
              <p style={{ marginTop: 14, fontSize: 12, color: "#a1a1aa", textAlign: "center" }}>We'll review your target market and confirm fit before you pay anything.</p>
            </div>
          </F>
        </div>
      </section>

      {/* Trust */}
      <section style={{ padding: "60px 24px", background: "#18181b", textAlign: "center" }}>
        <F>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", borderRadius: 999, padding: "6px 16px", fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>
              <Ic.Bot /> Built on battle-tested infrastructure
            </div>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 16 }}>
              Powered by the same system that runs Delta Labs AI's own outreach
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 32 }}>
              We don't sell software — we run your outreach using the exact pipeline we built for ourselves. 222+ emails sent, open rates tracked, bounces handled automatically. You're getting a proven system, not a promise.
            </p>
            <Btn href={FORM} style={{ background: "#fff", color: "#18181b", padding: "13px 28px" }}>
              Get a Free Quote <Ic.Arr />
            </Btn>
          </div>
        </F>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <F>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, letterSpacing: -0.5, textAlign: "center", marginBottom: 44 }}>Frequently asked questions</h2>
          </F>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqList.map((faq, i) => (
              <F key={i} d={i * 0.05}>
                <div style={{ borderBottom: "1px solid #f4f4f5" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", textAlign: "left", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#18181b" }}>{faq.q}</span>
                    <span style={{ color: "#71717a", fontSize: 20, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ paddingBottom: 20, fontSize: 14, color: "#52525b", lineHeight: 1.7 }}>{faq.a}</div>
                  )}
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "80px 24px", background: "#fafafa", borderTop: "1px solid #f4f4f5", textAlign: "center" }}>
        <F>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: -1, marginBottom: 14 }}>Stop waiting for inbound.<br />Start closing warm leads.</h2>
            <p style={{ fontSize: 16, color: "#52525b", marginBottom: 32, lineHeight: 1.65 }}>
              Tell us your ideal customer. We'll research, write, and send — and hand you replies from interested prospects.
            </p>
            <Btn href={FORM} style={{ padding: "15px 36px", fontSize: 16 }}>Get a Free Quote <Ic.Arr /></Btn>
            <p style={{ marginTop: 16, fontSize: 13, color: "#a1a1aa" }}>No commitment. We'll confirm fit before you pay anything.</p>
          </div>
        </F>
      </section>

      {/* Footer */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid #f4f4f5", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 16, textDecoration: "none", color: "#18181b" }}>
            <Ic.Delta s={22} />
            <span style={{ fontSize: 15, fontWeight: 700 }}>Delta Labs AI</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, fontSize: 13, color: "#71717a", flexWrap: "wrap", marginBottom: 16 }}>
            <a href="/" style={{ color: "#71717a", textDecoration: "none" }}>Home</a>
            <a href="/diagnostic" style={{ color: "#71717a", textDecoration: "none" }}>Diagnostic</a>
            <a href="/smilecrm" style={{ color: "#71717a", textDecoration: "none" }}>SmileCRM</a>
            <a href="/blog" style={{ color: "#71717a", textDecoration: "none" }}>Blog</a>
            <a href="/privacy" style={{ color: "#71717a", textDecoration: "none" }}>Privacy</a>
          </div>
          <p style={{ fontSize: 12, color: "#a1a1aa", margin: 0 }}>© {new Date().getFullYear()} Delta Labs AI. All rights reserved.</p>
        </div>
      </footer>

      <StickyBar
        href={FORM}
        label="Get a Free Quote →"
        subtext="Still evaluating? Let us show you what AI-powered outreach can do."
      />
    </div>
  );
}
