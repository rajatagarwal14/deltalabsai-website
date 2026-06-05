"use client";
import { useState, useEffect, useRef } from "react";
import { useRegionPricing } from "../lib/useRegion";

const WAITLIST = "https://tally.so/r/voice-smilecrm";

const C = {
  bg: "#0F172A",
  card: "#1E293B",
  border: "#334155",
  text: "#F8FAFC",
  textSec: "#CBD5E1",
  textMuted: "#94A3B8",
  accent: "#38BDF8",
  accentBg: "rgba(56,189,248,0.08)",
  accentBorder: "rgba(56,189,248,0.2)",
  green: "#4ADE80",
  greenBg: "rgba(74,222,128,0.08)",
  greenBorder: "rgba(74,222,128,0.2)",
};

function useFade() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

function F({ children, d = 0, style = {} }) {
  const [ref, vis] = useFade();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ${d}s, transform 0.5s ${d}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ href, children, variant = "primary", style = {} }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 28px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 15,
    textDecoration: "none",
    transition: "all 0.2s",
    cursor: "pointer",
    border: "none",
    ...style,
  };
  const variants = {
    primary: { background: C.accent, color: "#0F172A", ...base },
    outline: {
      background: "transparent",
      color: C.text,
      border: `1.5px solid ${C.border}`,
      ...base,
    },
  };
  return (
    <a href={href} style={variants[variant]}>
      {children}
    </a>
  );
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

function StickyBar() {
  const [visible, dismiss] = useTriggeredCTA("cta_voicerx");
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
      background: C.card, borderTop: `1px solid ${C.accentBorder}`,
      padding: "16px 24px", display: "flex", alignItems: "center",
      justifyContent: "center", gap: 20, flexWrap: "wrap",
      boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
      animation: "slideUp 0.4s ease",
    }}>
      <p style={{ margin: 0, fontSize: 14, color: C.textSec }}>
        Your clinic&apos;s phone is ringing. Is anyone there?
      </p>
      <a href={WAITLIST} onClick={dismiss} style={{
        background: C.accent, color: "#0F172A", padding: "10px 24px",
        borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", flexShrink: 0,
      }}>Join the Waitlist →</a>
      <button onClick={dismiss} style={{
        background: "none", border: "none", color: C.textMuted, cursor: "pointer",
        fontSize: 20, lineHeight: 1, padding: 4, position: "absolute", right: 16,
      }}>×</button>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

const Ic = {
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44a2 2 0 0 1 1.77-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l1.73-1.73a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  bot: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M12 2a3 3 0 0 1 3 3v2H9V5a3 3 0 0 1 3-3z" />
      <line x1="8" y1="21" x2="8" y2="17" />
      <line x1="16" y1="21" x2="16" y2="17" />
    </svg>
  ),
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  lang: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  mic: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  zap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

const STEPS = [
  {
    icon: Ic.phone,
    n: "01",
    title: "Patient calls your clinic",
    desc: "Your existing number — no change for patients. The AI picks up on the first ring, every time, including nights and weekends.",
  },
  {
    icon: Ic.bot,
    n: "02",
    title: "AI answers in Hindi or English",
    desc: "Introduces itself as your clinic's virtual receptionist, understands the patient's need, and handles bookings or reschedules naturally.",
  },
  {
    icon: Ic.calendar,
    n: "03",
    title: "Practo updated automatically",
    desc: "Appointment confirmed, slot blocked, patient gets an SMS confirmation. Zero manual work for your front desk staff.",
  },
];

const FEATURES = [
  { icon: Ic.lang, title: "Hindi + English", desc: "Seamlessly switches language mid-call. Patients speak in whatever they're comfortable with." },
  { icon: Ic.clock, title: "24/7 availability", desc: "Handles calls at 11 PM and 6 AM — no overtime, no missed Sunday appointments." },
  { icon: Ic.calendar, title: "Practo 2-way sync", desc: "Live availability check before confirming. No double-bookings, ever." },
  { icon: Ic.phone, title: "Reschedule & cancel", desc: "Full appointment lifecycle — not just new bookings. Patients don't need to call back." },
  { icon: Ic.shield, title: "Sounds professional", desc: "Introduces itself as your clinic's virtual receptionist. Patients appreciate 24/7 availability." },
  { icon: Ic.zap, title: "Zero setup for patients", desc: "Same phone number they already have. Works on any mobile, landline, or VOIP line." },
];

const FAQS = [
  {
    q: "Will my patients know it's AI?",
    a: "Yes — the AI introduces itself clearly as your clinic's virtual receptionist. This builds trust and sets expectations. Patients appreciate 24/7 availability far more than the AI question.",
  },
  {
    q: "What happens if the AI can't handle a query?",
    a: "Complex queries (insurance, medical advice) are gracefully escalated — the AI offers to take a message or asks the patient to call back during clinic hours. No lead is ever dropped.",
  },
  {
    q: "Does it work with my existing phone number?",
    a: "Yes. We configure call forwarding to the AI. No number change, no new hardware required for your clinic.",
  },
  {
    q: "What if Practo goes down?",
    a: "The AI takes the patient's details and flags it for your staff to confirm manually. The call is never wasted.",
  },
  {
    q: "How long does setup take?",
    a: "3–5 business days for waitlist pilots. We configure Practo access, run test calls with your team, and go live.",
  },
  {
    q: "Is ₹2,999/mo the final price?",
    a: "That's the waitlist pilot price — locked in for 12 months when you join now. Pricing increases after the pilot phase ends.",
  },
];

export default function VoiceReceptionist() {
  const [open, setOpen] = useState(null);
  const { price, isIntl } = useRegionPricing();
  // International visitors see no ₹ amounts: prices become "Custom — book a call"
  // and the price-anchored FAQ is swapped for a market-neutral version.
  const faqList = FAQS.map((f) =>
    isIntl && /final price/i.test(f.q)
      ? {
          q: "How is pricing handled?",
          a: "Waitlist pilot members lock in preferred pricing for 12 months. Book a call and we'll quote pricing for your market.",
        }
      : f
  );
  const waitlistCta = isIntl
    ? "Join the Waitlist — book a call"
    : "Join the Waitlist — ₹2,999/mo";

  return (
    <main
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(15,23,42,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
          }}
        >
          <a
            href="/"
            style={{ color: C.text, textDecoration: "none", fontWeight: 700, fontSize: 17 }}
          >
            <span style={{ color: C.accent }}>Delta</span> Labs AI
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a
              href="/dental"
              style={{ color: C.textMuted, textDecoration: "none", fontSize: 14 }}
            >
              SmileCRM
            </a>
            <Btn href={WAITLIST} style={{ padding: "8px 18px", fontSize: 14 }}>
              Join Waitlist
            </Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <F d={0}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: C.greenBg,
                border: `1px solid ${C.greenBorder}`,
                borderRadius: 20,
                padding: "6px 14px",
                marginBottom: 28,
                fontSize: 13,
                color: C.green,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.green,
                  animation: "pulse 2s infinite",
                  flexShrink: 0,
                }}
              />
              Live pilot — Delhi dental clinic, 15 days
            </div>
          </F>
          <F d={0.05}>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 54px)",
                fontWeight: 800,
                lineHeight: 1.12,
                margin: "0 0 20px",
                letterSpacing: "-0.02em",
              }}
            >
              AI Receptionist for Your Clinic
              <br />
              <span style={{ color: C.accent }}>24/7, Hindi + English</span>
            </h1>
          </F>
          <F d={0.1}>
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 19px)",
                color: C.textSec,
                lineHeight: 1.65,
                marginBottom: 36,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Never miss a patient call. Books, reschedules and cancels Practo
              appointments automatically — while your staff focuses on care.
            </p>
          </F>
          <F d={0.15}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <Btn href={WAITLIST}>
                {Ic.arrow}&nbsp;{waitlistCta}
              </Btn>
              <Btn href="/dental" variant="outline">
                See SmileCRM →
              </Btn>
            </div>
          </F>
          <F d={0.2}>
            <p style={{ marginTop: 20, fontSize: 13, color: C.textMuted }}>
              No credit card required · Waitlist spots limited · Price locked for 12 months
            </p>
          </F>
        </div>
      </section>

      {/* Pain stats */}
      <section
        style={{
          background: C.card,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "36px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 28,
            textAlign: "center",
          }}
        >
          {[
            { n: "3–5", label: "calls missed per day by the average clinic" },
            { n: isIntl ? "$$$" : "₹800+", label: "revenue lost per missed appointment" },
            { n: "68%", label: "of patients won't call back after no answer" },
          ].map(({ n, label }) => (
            <F key={n}>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  color: C.accent,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {n}
              </div>
              <div style={{ fontSize: 14, color: C.textMuted, marginTop: 6 }}>
                {label}
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <F>
            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: C.accent,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              How it works
            </p>
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                marginBottom: 52,
                letterSpacing: "-0.01em",
              }}
            >
              Patient calls. AI handles it. Done.
            </h2>
          </F>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {STEPS.map(({ icon, n, title, desc }, i) => (
              <F key={n} d={i * 0.08}>
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: 28,
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 18,
                    }}
                  >
                    <div
                      style={{
                        background: C.accentBg,
                        border: `1px solid ${C.accentBorder}`,
                        borderRadius: 10,
                        padding: 10,
                        color: C.accent,
                        lineHeight: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.textMuted,
                        letterSpacing: "0.06em",
                      }}
                    >
                      STEP {n}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: C.textSec,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          background: C.card,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F>
            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: C.accent,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Features
            </p>
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                marginBottom: 48,
                letterSpacing: "-0.01em",
              }}
            >
              Everything your front desk does — automated
            </h2>
          </F>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0 32px",
            }}
          >
            {FEATURES.map(({ icon, title, desc }, i) => (
              <F key={title} d={i * 0.06}>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "22px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{ color: C.accent, flexShrink: 0, marginTop: 2, lineHeight: 0 }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                      {title}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: C.textSec,
                        lineHeight: 1.55,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <F>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: C.accent,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Pricing
            </p>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                marginBottom: 12,
                letterSpacing: "-0.01em",
              }}
            >
              Simple waitlist pricing
            </h2>
            <p style={{ color: C.textSec, fontSize: 15, marginBottom: 40 }}>
              Join now — price locked for 12 months when you go live.
            </p>
          </F>
          <F d={0.1}>
            <div
              style={{
                background: C.card,
                border: `2px solid ${C.accent}`,
                borderRadius: 20,
                padding: "40px 32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: C.accent,
                  color: "#0F172A",
                  fontWeight: 700,
                  fontSize: 12,
                  padding: "4px 16px",
                  borderRadius: 20,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.04em",
                }}
              >
                WAITLIST PRICE
              </div>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: 4,
                  lineHeight: 1,
                }}
              >
                {price("₹2,999")}
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: C.textMuted,
                  }}
                >
                  {isIntl ? "— book a call" : "/mo"}
                </span>
              </div>
              <p
                style={{
                  color: C.textMuted,
                  fontSize: 14,
                  marginBottom: 28,
                  marginTop: 8,
                }}
              >
                Billed monthly · Cancel anytime
              </p>
              <ul
                style={{
                  textAlign: "left",
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {[
                  "AI voice receptionist, 24/7",
                  "Hindi + English language support",
                  "Practo 2-way sync",
                  "Unlimited calls included",
                  "Call recordings & transcripts",
                  "Dedicated setup support",
                  "Price locked for 12 months",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      fontSize: 14,
                    }}
                  >
                    <span
                      style={{
                        color: C.green,
                        flexShrink: 0,
                        marginTop: 1,
                        lineHeight: 0,
                      }}
                    >
                      {Ic.check}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Btn
                href={WAITLIST}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Join the Waitlist {Ic.arrow}
              </Btn>
            </div>
          </F>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          background: C.card,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <F>
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 700,
                marginBottom: 48,
                letterSpacing: "-0.01em",
              }}
            >
              Common questions
            </h2>
          </F>
          {faqList.map(({ q, a }, i) => (
            <F key={q} d={i * 0.04}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid ${C.border}`,
                  padding: "20px 0",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{ fontSize: 16, fontWeight: 600, color: C.text }}
                >
                  {q}
                </span>
                <span
                  style={{
                    color: C.accent,
                    fontSize: 22,
                    fontWeight: 300,
                    transform: open === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    padding: "16px 0 20px",
                    color: C.textSec,
                    fontSize: 15,
                    lineHeight: 1.65,
                  }}
                >
                  {a}
                </div>
              )}
            </F>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <F>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 42px)",
                fontWeight: 800,
                marginBottom: 16,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Your phone should be working
              <br />
              even when you&apos;re not
            </h2>
            <p
              style={{
                color: C.textSec,
                fontSize: 16,
                marginBottom: 36,
                lineHeight: 1.65,
              }}
            >
              Join the waitlist. We&apos;ll reach out within 48 hours to schedule your
              pilot setup call.
            </p>
            <Btn
              href={WAITLIST}
              style={{ fontSize: 17, padding: "16px 36px" }}
            >
              {Ic.arrow}&nbsp;{waitlistCta}
            </Btn>
            <p style={{ marginTop: 18, fontSize: 13, color: C.textMuted }}>
              Currently in 15-day pilot with a Delhi dental clinic
            </p>
          </F>
        </div>
      </section>

      {/* Diagnostic CTA */}
      <section style={{ padding: "64px 24px", background: C.card, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <F>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <p style={{ fontSize: 18, color: C.textSec, marginBottom: 28, lineHeight: 1.65 }}>
              Not sure which solution fits your business? Take the free 5-minute AI diagnostic and find out.
            </p>
            <Btn href="/diagnostic" style={{ fontSize: 15, padding: "14px 32px" }}>Start Free Diagnostic →</Btn>
          </div>
        </F>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: "28px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            fontSize: 13,
            color: C.textMuted,
          }}
        >
          <span>© 2026 Delta Labs AI</span>
          <div style={{ display: "flex", gap: 24 }}>
            <a
              href="/dental"
              style={{ color: C.textMuted, textDecoration: "none" }}
            >
              SmileCRM
            </a>
            <a
              href="/privacy"
              style={{ color: C.textMuted, textDecoration: "none" }}
            >
              Privacy
            </a>
            <a
              href="mailto:neil@mail.deltalabsai.com"
              style={{ color: C.textMuted, textDecoration: "none" }}
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 640px) {
          nav a:not([href="${WAITLIST}"]):not([href="/"]) { display: none; }
        }
      `}</style>

      <StickyBar />
    </main>
  );
}
