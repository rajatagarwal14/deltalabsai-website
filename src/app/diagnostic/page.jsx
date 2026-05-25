"use client";

import { useState, useEffect, useRef } from "react";

const SUPABASE_URL = "https://qkcafjbmqrxhqyyayrqz.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

async function saveRetargetLead(email, name, industry, score) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        name: name || "",
        email,
        industry: industry || "",
        source: "diagnostic_retarget",
        status: "warm",
        score,
        notes: "Requested results email via diagnostic retarget modal",
        created_at: new Date().toISOString(),
      }),
    });
  } catch {}
}

// A/B Test: hero CTA variants
// Variant A (control): original copy
// Variant B (treatment): benefit-led headline + urgency CTA
const AB_VARIANTS = {
  A: {
    pageTitle: "Unlock Your AI Potential: Get a Free Diagnostic & Custom Roadmap",
    ctaLabel: "Start My Free AI Diagnostic",
  },
  B: {
    pageTitle: "Unlock Your AI Potential: Get a Free Diagnostic & Custom Roadmap",
    ctaLabel: "Start My Free AI Diagnostic",
  },
};

function getAbVariant() {
  if (typeof window === "undefined") return "A";
  let v = localStorage.getItem("diag_ab_variant");
  if (!v) {
    v = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem("diag_ab_variant", v);
  }
  return v;
}

function trackAbEvent(variant, event, extra = {}) {
  try {
    fetch("https://delta-labs-ecosystem.vercel.app/api/ab-track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experiment: "diag_hero_cta", variant, event, ...extra }),
    }).catch(() => {});
  } catch {}
}

// Brand
const BRAND = { name: "Delta Labs AI", cal: "https://cal.com/ag-ventures-qbqxax/30min" };

// GA4 event helper
function trackGa4Event(name, params = {}) {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", name, params);
    }
  } catch {}
}

// Diagnostic Explainer Video — placed above the form to boost CRO
// Replace VIDEO_ID with your YouTube/Loom video ID when ready
const EXPLAINER_VIDEO_ID = ""; // TODO: set YouTube video ID (e.g. "dQw4w9WgXcQ")
const EXPLAINER_THUMBNAIL = ""; // TODO: optional custom thumbnail URL

function DiagnosticVideo() {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    trackGa4Event("video_play", { video_title: "diagnostic_explainer", method: "manual" });
  };

  if (!EXPLAINER_VIDEO_ID) return null; // Hide until video ID is set

  return (
    <div style={{
      width: "100%", maxWidth: 560, margin: "0 auto 28px",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(15,23,42,0.18)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Video badge */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px 20px 0", gap: 8,
        }}>
          <span style={{
            background: "#EF4444", color: "#fff",
            fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700,
            padding: "2px 8px", borderRadius: 4, letterSpacing: "0.06em",
          }}>▶ 30 SEC</span>
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
          }}>See how the free diagnostic works</span>
        </div>

        {/* Video embed */}
        <div style={{ position: "relative", paddingTop: "56.25%", margin: "12px 16px 16px" }}>
          {!playing ? (
            // Thumbnail + play button
            <div
              onClick={handlePlay}
              style={{
                position: "absolute", inset: 0, cursor: "pointer",
                borderRadius: 12, overflow: "hidden",
                background: EXPLAINER_THUMBNAIL ? `url(${EXPLAINER_THUMBNAIL}) center/cover` : "linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {/* Play button */}
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(255,255,255,0.95)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                transition: "transform 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#0F172A" style={{ marginLeft: 3 }}>
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              {/* Overlay text */}
              <div style={{
                position: "absolute", bottom: 14, left: 0, right: 0,
                textAlign: "center",
              }}>
                <span style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                  background: "rgba(0,0,0,0.4)", padding: "4px 14px", borderRadius: 20,
                  backdropFilter: "blur(4px)",
                }}>
                  How to get your free AI business score →
                </span>
              </div>
            </div>
          ) : (
            <iframe
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 12, border: "none" }}
              src={`https://www.youtube.com/embed/${EXPLAINER_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Delta Labs AI Diagnostic Explainer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Cal.com inline embed — renders the booking calendar directly on the page
function CalInlineEmbed() {
  const divRef = useRef(null);
  useEffect(() => {
    const tryInit = () => {
      if (typeof window !== "undefined" && window.Cal && window.Cal.ns && window.Cal.ns["30min"]) {
        window.Cal.ns["30min"]("inline", {
          elementOrSelector: divRef.current,
          calLink: "ag-ventures-qbqxax/30min",
          layout: "month_view",
        });
      } else {
        // Cal.com script not ready yet — retry in 300ms
        setTimeout(tryInit, 300);
      }
    };
    tryInit();
  }, []);
  return (
    <div ref={divRef} style={{
      width: "100%", minHeight: 600, borderRadius: "0 0 14px 14px",
      border: "1px solid #A7F3D0", overflow: "hidden", background: "#fff",
    }} />
  );
}

// Icons
const Ic = {
  Delta: () => <svg width="28" height="28" viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3"/></svg>,
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ArrowL: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Sparkle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>,
};

// 9-Dimension Questions
const dimensions = [
  {
    id: "revenue",
    dim: "Revenue Engine",
    question: "How would you describe your current revenue generation?",
    options: [
      { label: "We rely mostly on referrals and word-of-mouth", score: 2 },
      { label: "We have some outbound efforts but nothing systematic", score: 4 },
      { label: "We have a structured sales process with pipeline tracking", score: 7 },
      { label: "We have predictable, multi-channel revenue with clear metrics", score: 9 },
    ],
  },
  {
    id: "operations",
    dim: "Operations & Processes",
    question: "How standardized are your business operations?",
    options: [
      { label: "Most things are in people's heads  - no documentation", score: 2 },
      { label: "We have some SOPs but they're outdated or ignored", score: 4 },
      { label: "Key processes are documented and mostly followed", score: 7 },
      { label: "Fully documented, regularly updated, and audited processes", score: 9 },
    ],
  },
  {
    id: "technology",
    dim: "Technology & Tools",
    question: "What's your current technology stack like?",
    options: [
      { label: "Spreadsheets, WhatsApp groups, and manual tracking", score: 2 },
      { label: "We use some tools but nothing is integrated", score: 4 },
      { label: "Core systems in place (CRM, project management) with some integrations", score: 7 },
      { label: "Fully integrated tech stack with automation and data flow", score: 9 },
    ],
  },
  {
    id: "team",
    dim: "Team & Talent",
    question: "How would you rate your team's capacity and capability?",
    options: [
      { label: "Understaffed and overwhelmed  - key person dependency everywhere", score: 2 },
      { label: "Good people but unclear roles and frequent bottlenecks", score: 4 },
      { label: "Right people in right seats, some capacity constraints", score: 7 },
      { label: "Well-structured team with clear ownership and growth paths", score: 9 },
    ],
  },
  {
    id: "data",
    dim: "Data & Decision-Making",
    question: "How do you make business decisions?",
    options: [
      { label: "Mostly gut feeling and experience", score: 2 },
      { label: "We look at some numbers but it's not systematic", score: 4 },
      { label: "Regular reporting with KPIs tracked across departments", score: 7 },
      { label: "Data-driven culture with real-time dashboards and predictive analytics", score: 9 },
    ],
  },
];

const industryOptions = [
  "Marketing / Creative Agency", "Healthcare / Dental Clinic", "Fitness / Gym / Wellness",
  "Home Services (HVAC, Plumbing, etc.)", "E-commerce / D2C", "SaaS / Technology",
  "Professional Services (Legal, Accounting)", "Restaurant / F&B", "Education / EdTech",
  "Real Estate", "Manufacturing", "Retail", "Other",
];

const teamSizeOptions = ["Just me (Solo)", "2-5 people", "6-15 people", "16-50 people", "50+ people"];
const revenueOptions = ["Pre-revenue / Just starting", "Under \u20b910L / $12K per year", "\u20b910-50L / $12-60K per year", "\u20b950L-2Cr / $60-250K per year", "\u20b92Cr+ / $250K+ per year"];
const urgencyOptions = ["Exploring  - no rush", "Planning for next quarter", "Need help this month", "Urgent  - things are breaking"];

// Score Interpretation
function getScoreData(scores) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const max = dimensions.length * 9;
  const pct = Math.round((total / max) * 100);
  let level, color, message, emoji;
  if (pct < 30) { level = "Critical"; color = "#DC2626"; message = "Your business has significant operational gaps that are likely costing you revenue every month. The good news: the biggest improvements are ahead of you."; emoji = "\ud83d\udd34"; }
  else if (pct < 50) { level = "Developing"; color = "#EA580C"; message = "You've built something real, but your systems haven't kept up with your growth. This is the most common  - and most fixable  - stage."; emoji = "\ud83d\udfe0"; }
  else if (pct < 70) { level = "Established"; color = "#2563EB"; message = "Strong foundation. You're doing better than most, but there are clear optimization opportunities that could unlock your next growth phase."; emoji = "\ud83d\udd35"; }
  else { level = "Advanced"; color = "#059669"; message = "Impressive operations. You're in the top tier. We can help you go from great to exceptional with AI-powered optimization."; emoji = "\ud83d\udfe2"; }
  return { total, max, pct, level, color, message, emoji };
}

function getDimensionColor(score) {
  if (score <= 2) return "#DC2626";
  if (score <= 4) return "#EA580C";
  if (score <= 7) return "#2563EB";
  return "#059669";
}

function getDimensionLabel(score) {
  if (score <= 2) return "Critical";
  if (score <= 4) return "Needs Work";
  if (score <= 7) return "Good";
  return "Strong";
}

const quickWins = {
  revenue: { title: "Revenue Engine Quick Win", tip: "This week, list your top 5 clients and ask each one: 'Who else do you know that could benefit from what we do?' Referral requests from happy clients convert 4x better than cold outreach  - and cost nothing.", action: "Ask 5 clients for referrals this week" },
  operations: { title: "Operations Quick Win", tip: "Pick your most repeated task. Open Loom, record yourself doing it once. Share that video with your team. You just created your first SOP in under 10 minutes  - and it'll save hours of training.", action: "Record one Loom SOP this week" },
  technology: { title: "Technology Quick Win", tip: "Identify the one task where you copy-paste data between two tools. Set up a free Zapier account and automate that single transfer. One automation saves 2-5 hours per week on average.", action: "Automate one copy-paste task with Zapier" },
  team: { title: "Team Quick Win", tip: "Write down every task that ONLY YOU can do. Pick the easiest one and teach it to someone else this week. Key-person dependency is the #1 business risk for companies your size.", action: "Delegate one founder-only task this week" },
  data: { title: "Data & Decisions Quick Win", tip: "Create a simple weekly scorecard with just 5 numbers: revenue, new leads, conversion rate, cash balance, and customer satisfaction. Review it every Monday. Companies that track weekly metrics grow 30% faster.", action: "Build a 5-metric weekly scorecard" },
};

function getLowestDimension(scores) {
  let lowest = null, lowestScore = 10;
  dimensions.forEach(d => {
    const s = scores[d.id] || 10;
    if (s < lowestScore) { lowest = d; lowestScore = s; }
  });
  return lowest ? { dim: lowest, score: lowestScore, rec: quickWins[lowest.id] } : null;
}

// Radar Chart (Canvas)
function RadarChart({ scores }) {
  const canvasRef = useRef(null);
  const dims = dimensions.map(d => d.dim.split(" ")[0]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = 280, H = 280, cx = W / 2, cy = H / 2, R = 100;
    c.width = W * 2; c.height = H * 2;
    c.style.width = W + "px"; c.style.height = H + "px";
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, W, H);

    const n = dims.length;
    const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;

    // Grid
    [0.25, 0.5, 0.75, 1].forEach(r => {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = angle(i % n);
        const x = cx + R * r * Math.cos(a);
        const y = cy + R * r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#E5E7EB"; ctx.lineWidth = 0.8; ctx.stroke();
    });

    // Axis lines
    for (let i = 0; i < n; i++) {
      const a = angle(i);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = "#E5E7EB"; ctx.lineWidth = 0.5; ctx.stroke();
    }

    // Data polygon
    ctx.beginPath();
    dimensions.forEach((d, i) => {
      const s = (scores[d.id] || 0) / 9;
      const a = angle(i);
      const x = cx + R * s * Math.cos(a);
      const y = cy + R * s * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(37, 99, 235, 0.12)"; ctx.fill();
    ctx.strokeStyle = "#2563EB"; ctx.lineWidth = 2; ctx.stroke();

    // Data points
    dimensions.forEach((d, i) => {
      const s = (scores[d.id] || 0) / 9;
      const a = angle(i);
      const x = cx + R * s * Math.cos(a);
      const y = cy + R * s * Math.sin(a);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#2563EB"; ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
    });

    // Labels
    ctx.font = "500 10px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    dims.forEach((label, i) => {
      const a = angle(i);
      const x = cx + (R + 22) * Math.cos(a);
      const y = cy + (R + 22) * Math.sin(a);
      ctx.fillStyle = "#6B7280";
      ctx.fillText(label, x, y + 3);
    });
  }, [scores]);

  return <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />;
}

// Progress Bar
function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i <= step ? "#2563EB" : "#E5E7EB",
          transition: "background 0.4s ease",
        }} />
      ))}
    </div>
  );
}

// Option Button
function OptionBtn({ label, selected, onClick, index }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left",
      padding: "16px 20px", borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
      background: selected ? "#EFF6FF" : "#fff",
      border: selected ? "2px solid #2563EB" : "1.5px solid #E5E7EB",
      fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, fontWeight: selected ? 600 : 400,
      color: selected ? "#1E40AF" : "#374151",
    }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = "#93C5FD"; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = "#E5E7EB"; }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: selected ? "#2563EB" : "#F3F4F6",
        color: selected ? "#fff" : "#9CA3AF",
        fontSize: 12, fontWeight: 700,
        transition: "all 0.2s",
      }}>
        {selected ? <Ic.Check /> : String.fromCharCode(65 + index)}
      </div>
      {label}
    </button>
  );
}

// Main Form
export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({ name: "", email: "", company: "", website: "", industry: "", teamSize: "", revenue: "", urgency: "", biggestChallenge: "" });
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const containerRef = useRef(null);
  const [abVariant, setAbVariant] = useState("A");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalSubmitting, setModalSubmitting] = useState(false);

  useEffect(() => {
    const v = getAbVariant();
    setAbVariant(v);
    trackAbEvent(v, "view");
  }, []);

  const totalSteps = 3 + dimensions.length;

  useEffect(() => {
    if (step !== totalSteps) return;
    const t = setTimeout(() => setShowEmailModal(true), 4000);
    return () => clearTimeout(t);
  }, [step, totalSteps]);

  const ab = AB_VARIANTS[abVariant];

  // Google Apps Script Web App URL -replace with your deployed URL
  const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbywR6SGJxm135zNS55ZXG5AxWfIAzoqlEObCOgkF3eASaWwKEcIm0jDmGlNtIE-AM_0/exec";

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const canProceed = () => {
    if (step === 0) return info.name && info.email && info.company && info.industry;
    if (step === 1) return info.teamSize && info.revenue;
    if (step >= 2 && step < 2 + dimensions.length) return scores[dimensions[step - 2]?.id] !== undefined;
    if (step === 2 + dimensions.length) return info.biggestChallenge.length > 10;
    return true;
  };

  const goNext = () => {
    if (canProceed() && step < totalSteps) {
      if (step === 0) trackGa4Event("form_start", { form_name: "diagnostic" });
      setStep(step + 1);
    }
  };
  const goBack = () => { if (step > 0) setStep(step - 1); };

  const scoreData = getScoreData(scores);

  const renderStep = () => {
    // Step 0: Basic Info
    if (step === 0) return (
      <div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.08em" }}>Step 1 of {totalSteps}</span>
        </div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.02em" }}>Let&apos;s get to know your business</h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#6B7280", margin: "0 0 28px", lineHeight: 1.6 }}>This helps us prepare a tailored analysis before your discovery call.</p>

        <div style={{ display: "grid", gap: 18 }}>
          {[
            { key: "name", label: "Your first name", placeholder: "e.g. Alex", type: "text" },
            { key: "email", label: "Work email", placeholder: "you@company.com", type: "email" },
            { key: "company", label: "Company name", placeholder: "e.g. Acme Corp", type: "text" },
            { key: "website", label: "Website (optional)", placeholder: "https://...", type: "url" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{f.label}</label>
              <input type={f.type} value={info[f.key]} onChange={e => setInfo({ ...info, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#0F172A", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", background: "#FAFBFC" }}
                onFocus={e => e.target.style.borderColor = "#2563EB"}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              />
            </div>
          ))}
          <div>
            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Industry</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {industryOptions.map(opt => (
                <button key={opt} onClick={() => setInfo({ ...info, industry: opt })} style={{
                  padding: "8px 14px", borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
                  background: info.industry === opt ? "#EFF6FF" : "#fff",
                  border: info.industry === opt ? "1.5px solid #2563EB" : "1.5px solid #E5E7EB",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: info.industry === opt ? 600 : 400,
                  color: info.industry === opt ? "#1E40AF" : "#4B5563",
                }}>{opt}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

    // Step 1: Size & Revenue
    if (step === 1) return (
      <div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.08em" }}>Step 2 of {totalSteps}</span>
        </div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>Business scale & urgency</h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#6B7280", margin: "0 0 28px", lineHeight: 1.6 }}>This helps us match the right frameworks and pricing to your situation.</p>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 10 }}>Team size</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {teamSizeOptions.map((opt, i) => <OptionBtn key={opt} label={opt} selected={info.teamSize === opt} onClick={() => setInfo({ ...info, teamSize: opt })} index={i} />)}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 10 }}>Annual revenue range</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {revenueOptions.map((opt, i) => <OptionBtn key={opt} label={opt} selected={info.revenue === opt} onClick={() => setInfo({ ...info, revenue: opt })} index={i} />)}
          </div>
        </div>
        <div>
          <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 10 }}>How urgent is this?</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {urgencyOptions.map((opt, i) => <OptionBtn key={opt} label={opt} selected={info.urgency === opt} onClick={() => setInfo({ ...info, urgency: opt })} index={i} />)}
          </div>
        </div>
      </div>
    );

    // Steps 2-6: Dimension questions
    const dimIdx = step - 2;
    if (dimIdx >= 0 && dimIdx < dimensions.length) {
      const dim = dimensions[dimIdx];
      return (
        <div>
          <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.08em" }}>Dimension {dimIdx + 1} of {dimensions.length}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F5F3FF", padding: "2px 10px", borderRadius: 6 }}>{dim.dim}</span>
          </div>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.01em" }}>{dim.question}</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#6B7280", margin: "0 0 28px" }}>Pick the option that best describes your current situation. Be honest -this helps us help you.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {dim.options.map((opt, i) => (
              <OptionBtn key={i} label={opt.label} selected={scores[dim.id] === opt.score}
                onClick={() => setScores({ ...scores, [dim.id]: opt.score })} index={i} />
            ))}
          </div>
        </div>
      );
    }

    // Step 7: Open-ended challenge
    if (step === 2 + dimensions.length) return (
      <div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.08em" }}>Final Question</span>
        </div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>What&apos;s your biggest challenge right now?</h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#6B7280", margin: "0 0 24px", lineHeight: 1.6 }}>In your own words -what&apos;s the one thing that, if fixed, would make the biggest difference to your business?</p>

        <textarea value={info.biggestChallenge} onChange={e => setInfo({ ...info, biggestChallenge: e.target.value })}
          placeholder="e.g. We're growing fast but our processes are a mess. Every new hire makes things more chaotic instead of better. We need systems that scale..."
          rows={6}
          style={{ width: "100%", padding: "16px", borderRadius: 12, border: "1.5px solid #E5E7EB", fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#0F172A", resize: "vertical", outline: "none", boxSizing: "border-box", background: "#FAFBFC", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "#2563EB"}
          onBlur={e => e.target.style.borderColor = "#E5E7EB"}
        />
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>{info.biggestChallenge.length} characters (minimum 10)</p>
      </div>
    );

    // Results
    if (step === totalSteps) return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${scoreData.color}10`, padding: "6px 16px", borderRadius: 100, marginBottom: 16 }}>
            <span style={{ fontSize: 16 }}>{scoreData.emoji}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: scoreData.color }}>{scoreData.level} -{scoreData.pct}%</span>
          </div>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Your Preliminary Diagnostic</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#6B7280", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>{scoreData.message}</p>
        </div>

        <RadarChart scores={scores} />

        <div style={{ marginTop: 24, display: "grid", gap: 10 }}>
          {dimensions.map(d => {
            const s = scores[d.id] || 0;
            const c = getDimensionColor(s);
            return (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #E5E7EB" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 600, color: "#374151", flex: 1 }}>{d.dim}</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, color: c, background: `${c}10`, padding: "2px 10px", borderRadius: 6 }}>{getDimensionLabel(s)}</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{s}/9</span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 28, padding: 24, background: "#FEF3C7", borderRadius: 14, border: "1px solid #FDE68A" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>{"\u26a1"}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#92400E" }}>
              {(() => { const l = getLowestDimension(scores); return l ? l.rec.title : "Your Quick Win"; })()}
            </span>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#78350F", lineHeight: 1.7, margin: "0 0 12px" }}>
            {(() => { const l = getLowestDimension(scores); return l ? l.rec.tip : "Book a call and we'll identify your #1 quick win together."; })()}
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FDE68A", padding: "6px 14px", borderRadius: 8 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, color: "#92400E" }}>
              {"\u2192"} {(() => { const l = getLowestDimension(scores); return l ? l.rec.action : "Book your free discovery call"; })()}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 28, padding: 24, background: "#EFF6FF", borderRadius: 14, border: "1px solid #BFDBFE" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ color: "#2563EB" }}><Ic.Sparkle /></span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#1E40AF" }}>What happens next</span>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#374151", lineHeight: 1.7, margin: 0 }}>
            Our team will review your diagnostic results before your call. We&apos;ll come prepared with specific recommendations for <strong>{info.company}</strong> based on your scores. You&apos;ll receive a detailed breakdown of quick wins, strategic priorities, and estimated ROI -all in your 30-minute discovery call.
          </p>
        </div>

        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#6B7280", textAlign: "center", marginTop: 16 }}>
          We take on a maximum of 5 new consulting clients per month. Limited discovery call slots available.
        </p>

        {!submitted ? (
          <div>
            <button onClick={async () => {
              trackAbEvent(abVariant, "convert", { score: scoreData.pct });
              setSubmitting(true);
              setSubmitError("");
              try {
                const payload = { info, scores };
                const res = await fetch(FORM_ENDPOINT, {
                  method: "POST",
                  headers: { "Content-Type": "text/plain" },
                  body: JSON.stringify(payload),
                  mode: "no-cors",
                });
                // Sync to Delta Labs CRM (silent — won't break form if CRM is down)
                fetch("https://delta-labs-ecosystem.vercel.app/api/leads/capture", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: info.name, email: info.email, company: info.company, website: info.website, industry: info.industry, source: "diagnostic_tool", score: Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / 45) * 100), notes: "Diagnostic: " + info.urgency + ". Challenge: " + info.biggestChallenge }),
                }).catch(() => {});
                setSubmitted(true);
              } catch (err) {
                // Even with no-cors, data is sent. Mark as submitted.
                setSubmitted(true);
              } finally {
                setSubmitting(false);
              }
            }} disabled={submitting} style={{
              width: "100%", marginTop: 24, padding: "16px", borderRadius: 12, border: "none",
              background: submitting ? "#64748B" : "#0F172A", color: "#fff", fontFamily: "'DM Sans',sans-serif",
              fontSize: 16, fontWeight: 700, cursor: submitting ? "wait" : "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s",
              opacity: submitting ? 0.7 : 1,
            }}
              onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(15,23,42,0.25)"; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              {submitting ? "Submitting..." : ab.ctaLabel} {!submitting && <Ic.Arrow />}
            </button>
            {submitError && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#DC2626", textAlign: "center", marginTop: 10 }}>{submitError}</p>}
          </div>
        ) : (
          <div style={{ marginTop: 24 }}>
            {/* Success banner */}
            <div style={{ textAlign: "center", padding: "24px 28px 20px", background: "#ECFDF5", borderRadius: "14px 14px 0 0", border: "1px solid #A7F3D0", borderBottom: "none" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u2713"}</div>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 700, color: "#065F46", margin: "0 0 6px" }}>You&apos;re all set, {info.name}!</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#047857", lineHeight: 1.6, margin: 0 }}>
                Your diagnostic has been received. Book your free 30-min discovery call below \u2014 no redirect needed.
              </p>
            </div>
            {/* Inline Cal.com embed */}
            <CalInlineEmbed />
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #F8FAFC, #EEF2FF, #F0FDF4)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E5E7EB", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#0F172A", textDecoration: "none" }}>
          <Ic.Delta /><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 17 }}>Delta Labs AI</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#6B7280" }}><Ic.Clock /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500 }}>Takes 3 minutes</span></span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#6B7280" }}><Ic.Lock /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500 }}>Private & secure</span></span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#059669" }}><Ic.Sparkle /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600 }}>Join 100+ businesses diagnosed</span></span>
        </div>
      </div>

      {/* Email Retarget Modal */}
      {showEmailModal && !modalSubmitted && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: "0 16px 32px", pointerEvents: "none",
        }}>
          <div style={{
            pointerEvents: "all",
            background: "#fff", borderRadius: 18, padding: "28px 28px 24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
            border: "1px solid #E5E7EB", maxWidth: 440, width: "100%",
            animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <style>{`@keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
            <button onClick={() => setShowEmailModal(false)} style={{
              position: "absolute", top: 12, right: 14, background: "none", border: "none",
              cursor: "pointer", fontSize: 20, color: "#9CA3AF", lineHeight: 1, padding: 4,
            }} aria-label="Close">×</button>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
            <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
              Get your results by email
            </h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#6B7280", margin: "0 0 18px", lineHeight: 1.6 }}>
              We&apos;ll send you a copy of your diagnostic with tailored recommendations — free, no spam.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                value={modalEmail}
                onChange={e => setModalEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: "11px 14px", borderRadius: 10,
                  border: "1.5px solid #E5E7EB", fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14, color: "#0F172A", outline: "none", background: "#FAFBFC",
                }}
                onFocus={e => e.target.style.borderColor = "#2563EB"}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}
                onKeyDown={e => { if (e.key === "Enter") e.currentTarget.nextElementSibling?.click(); }}
              />
              <button
                disabled={!modalEmail || modalSubmitting}
                onClick={async () => {
                  if (!modalEmail) return;
                  setModalSubmitting(true);
                  await saveRetargetLead(modalEmail, info.name, info.industry, scoreData.pct);
                  setModalSubmitting(false);
                  setModalSubmitted(true);
                  setTimeout(() => setShowEmailModal(false), 2500);
                }}
                style={{
                  padding: "11px 18px", borderRadius: 10, border: "none",
                  background: !modalEmail || modalSubmitting ? "#E5E7EB" : "#0F172A",
                  color: !modalEmail || modalSubmitting ? "#9CA3AF" : "#fff",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700,
                  cursor: !modalEmail || modalSubmitting ? "default" : "pointer",
                  whiteSpace: "nowrap", transition: "all 0.2s",
                }}
              >
                {modalSubmitting ? "Sending…" : "Send it →"}
              </button>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#9CA3AF", marginTop: 10, display: "flex", alignItems: "center", gap: 4 }}>
              <Ic.Lock /> No spam. Unsubscribe any time.
            </p>
          </div>
        </div>
      )}

      {/* Modal success overlay */}
      {showEmailModal && modalSubmitted && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: "0 16px 32px", pointerEvents: "none",
        }}>
          <div style={{
            pointerEvents: "all",
            background: "#ECFDF5", borderRadius: 18, padding: "24px 28px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.14)", border: "1px solid #A7F3D0",
            maxWidth: 440, width: "100%", textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, color: "#065F46", margin: 0 }}>
              Results on their way to {modalEmail}!
            </p>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div ref={containerRef} style={{ flex: 1, display: "flex", justifyContent: "center", padding: "32px 20px 80px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          {/* Explainer video — shown above form on first step only */}
          {step === 0 && <DiagnosticVideo />}

          <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#6B7280", textAlign: "center", margin: "0 0 16px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{ab.pageTitle}</h1>
          <ProgressBar step={step} total={totalSteps + 1} />

          <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.04)", minHeight: 400 }}>
            {renderStep()}
          </div>

          {/* Navigation */}
          {step <= totalSteps && !submitted && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
              <button onClick={goBack} disabled={step === 0} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
                border: "1.5px solid #E5E7EB", background: "#fff", cursor: step === 0 ? "default" : "pointer",
                fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: step === 0 ? "#D1D5DB" : "#374151",
                opacity: step === 0 ? 0.5 : 1, transition: "all 0.15s",
              }}>
                <Ic.ArrowL /> Back
              </button>

              {step < totalSteps && (
                <button onClick={goNext} disabled={!canProceed()} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "10px 22px", borderRadius: 10,
                  border: "none", background: canProceed() ? "#0F172A" : "#E5E7EB",
                  cursor: canProceed() ? "pointer" : "default",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600,
                  color: canProceed() ? "#fff" : "#9CA3AF", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { if (canProceed()) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(15,23,42,0.2)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  {step === totalSteps - 1 ? "See My Results" : step >= 2 && step < 2 + dimensions.length ? "Next Dimension" : "Let's Continue"} <Ic.Arrow />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
