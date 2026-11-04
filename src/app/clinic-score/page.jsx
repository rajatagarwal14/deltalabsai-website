"use client";

import { useState, useEffect, useRef } from "react";

const MAIL = "mailto:neil@mail.deltalabsai.com";
const ECOSYSTEM_API = "https://delta-labs-ecosystem.vercel.app";


const QUESTIONS = [
  {
    id: "gbp",
    text: "Does your clinic have a verified Google Business Profile?",
    options: [
      { label: "Yes, verified ✓", points: 20 },
      { label: "Yes, but I'm not sure if verified", points: 10 },
      { label: "No", points: 0 },
    ],
    improvementLabel: "Google Business Profile",
    improvementTip: "A verified Google Business Profile makes your clinic visible in local search and maps, where many patients look for a clinic.",
  },
  {
    id: "reviews",
    text: "How many Google reviews does your clinic have?",
    options: [
      { label: "Lots of reviews", points: 20 },
      { label: "Some reviews", points: 12 },
      { label: "Only a handful", points: 5 },
      { label: "None", points: 0 },
    ],
    improvementLabel: "Google reviews",
    improvementTip: "Asking patients for feedback after each visit is a simple place to start.",
  },
  {
    id: "review_response",
    text: "Do you respond to patient reviews?",
    options: [
      { label: "Yes, usually the same day", points: 15 },
      { label: "Sometimes", points: 7 },
      { label: "Rarely or never", points: 0 },
    ],
    improvementLabel: "Review responses",
    improvementTip: "Replying to reviews, especially negative ones, shows patients that you listen. It's a quick win.",
  },
  {
    id: "booking",
    text: "How do patients book appointments at your clinic?",
    options: [
      { label: "Online booking (website or app)", points: 20 },
      { label: "WhatsApp or phone call", points: 8 },
      { label: "Walk-in only", points: 0 },
    ],
    improvementLabel: "Online booking",
    improvementTip: "Online booking captures appointments even when your front desk is busy or closed.",
  },
  {
    id: "reminders",
    text: "Do you send automated appointment reminders?",
    options: [
      { label: "Yes, automatic reminders on WhatsApp or by text", points: 15 },
      { label: "Manual reminder calls", points: 5 },
      { label: "No reminders sent", points: 0 },
    ],
    improvementLabel: "Appointment reminders",
    improvementTip: "Automatic reminders before each visit save front-desk time. Manual calls cost time and still miss patients.",
  },
  {
    id: "followup",
    text: "Do you follow up with patients after treatment?",
    options: [
      { label: "Yes, automatic follow-up messages", points: 10 },
      { label: "Sometimes, manually", points: 4 },
      { label: "Never", points: 0 },
    ],
    improvementLabel: "Post-treatment follow-up",
    improvementTip: "A follow-up after treatment keeps patients in touch with your clinic and invites their feedback.",
  },
];

const TIERS = [
  { min: 0,  max: 30,  name: "Digital Newcomer",  emoji: "🌱", stars: 1, color: "#ef4444", message: "Here's where to start." },
  { min: 31, max: 55,  name: "Getting Started",   emoji: "📈", stars: 2, color: "#f97316", message: "You're doing the basics. Here is what to work on next." },
  { min: 56, max: 75,  name: "Digital-Forward",   emoji: "⭐", stars: 3, color: "#eab308", message: "You're doing well. A few gaps are left." },
  { min: 76, max: 100, name: "AI-Ready Clinic",   emoji: "🏆", stars: 4, color: "#22c55e", message: "Your clinic scored in the top tier of this self-check." },
];

const CITIES = [
  // India
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata",
  "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Nagpur", "Indore", "Noida",
  "Navi Mumbai", "Thane", "Chandigarh", "Kochi", "Coimbatore", "Mysuru",
  "Vadodara", "Rajkot", "Amritsar", "Dehradun", "Bhopal", "Patna",
  // UAE
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman",
  // US
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "Dallas", "San Diego", "San Jose", "Austin", "Miami",
  // UK
  "London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Edinburgh",
  // Australia
  "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast",
  // Singapore & SE Asia
  "Singapore", "Kuala Lumpur", "Jakarta", "Bangkok", "Manila",
  // Canada
  "Toronto", "Vancouver", "Calgary", "Ottawa", "Montreal",
  // Middle East
  "Riyadh", "Doha", "Kuwait City", "Muscat", "Manama",
  // Africa
  "Nairobi", "Lagos", "Johannesburg", "Cairo", "Accra",
  // Other
  "Other",
];

function getTier(score) {
  return TIERS.find(t => score >= t.min && score <= t.max) || TIERS[0];
}

function calcScore(answers) {
  return QUESTIONS.reduce((sum, q, i) => {
    const selected = answers[i];
    if (selected == null) return sum;
    return sum + (q.options[selected]?.points || 0);
  }, 0);
}

function getWeakAreas(answers) {
  return QUESTIONS
    .map((q, i) => {
      const selected = answers[i];
      const maxPoints = Math.max(...q.options.map(o => o.points));
      const earned = selected != null ? (q.options[selected]?.points || 0) : 0;
      return { q, gap: maxPoints - earned, earned, maxPoints };
    })
    .filter(a => a.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);
}

// Email capture via ecosystem leads API (requires email, no new table needed)
async function saveLead({ name, email, city, score, tier }) {
  if (!email) return;
  try {
    await fetch(`${ECOSYSTEM_API}/api/leads/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        full_name: name || "Dental Clinic Owner",
        industry: "dental",
        source_detail: { city, score, tier, tool: "clinic_score" },
        notes: `Clinic Digital Score: ${score}/100 (${tier}) — ${city}`,
        tags: ["clinic_score"],
      }),
    });
  } catch {}
}

// ProgressBar
function ProgressBar({ current, total }) {
  const pct = Math.round(((current) / total) * 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ height: 6, background: "#1e293b", borderRadius: 99 }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg, #6366f1, #818cf8)",
          borderRadius: 99,
          transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}

// ScoreRing
function ScoreRing({ score, tier }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 8px" }}>
      <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1e293b" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke={tier.color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 40, lineHeight: 1 }} aria-label={tier.name}>{tier.emoji}</span>
      </div>
    </div>
  );
}

export default function ClinicScorePage() {
  const [step, setStep] = useState("intro"); // intro | city | q0-q5 | submitting | result
  const [city, setCity] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [tier, setTier] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, currentQ]);

  function selectOption(optionIndex) {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        submitForm(newAnswers);
      }
    }, 180);
  }

  async function submitForm(finalAnswers) {
    setStep("submitting");
    const finalScore = calcScore(finalAnswers);
    const finalTier = getTier(finalScore);
    const answersJson = {};
    QUESTIONS.forEach((q, i) => {
      answersJson[q.id] = finalAnswers[i] != null ? q.options[finalAnswers[i]]?.label : null;
    });

    setScore(finalScore);
    setTier(finalTier);
    setWeakAreas(getWeakAreas(finalAnswers));
    setStep("result");
  }

  async function handleEmailCapture(e) {
    e.preventDefault();
    if (!email) return;
    setEmailSending(true);
    try {
      await saveLead({ name: doctorName || clinicName, email, city, score, tier: tier?.name });
      setEmailSent(true);
    } catch {}
    setEmailSending(false);
  }

  function buildShareText() {
    return `Just checked my clinic's digital readiness with the free Clinic Digital Score and came out as "${tier?.name}". Try it: deltalabsai.com/clinic-score`;
  }

  function buildWhatsAppLink() {
    return `https://wa.me/?text=${encodeURIComponent(buildShareText())}`;
  }

  function buildOgUrl() {
    const params = new URLSearchParams({
      score: score.toString(),
      tier: tier?.name || "",
      name: doctorName || clinicName || "Your Clinic",
      city: city || "Global",
    });
    return `https://deltalabsai.com/api/og/clinic-score?${params}`;
  }

  const filteredCities = CITIES.filter(c =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  // ─── Screens ────────────────────────────────────────────────────────────────

  if (step === "intro") {
    return (
      <div ref={topRef} style={pageWrap}>
        <div style={card}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={badge}>🏥 Free Self-Check</div>
            <h1 style={h1}>How digitally ready is your clinic?</h1>
            <p style={sub}>A short, free self-check of how patients find, book and hear from your clinic. No email required to see your result.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            {[
              { icon: "⚡", t: "A few quick questions", d: "Multiple choice, no typing" },
              { icon: "🎯", t: "Your main improvement areas", d: "Specific, actionable gaps" },
            ].map(f => (
              <div key={f.t} style={featureRow}>
                <span style={{ fontSize: 24 }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: "#f1f5f9" }}>{f.t}</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={primaryBtn} onClick={() => setStep("city")}>
            Start My Clinic Score →
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "#475569", marginTop: 12 }}>
            No account needed · Results instant
          </p>
        </div>
      </div>
    );
  }

  if (step === "city") {
    return (
      <div ref={topRef} style={pageWrap}>
        <div style={card}>
          <ProgressBar current={0} total={QUESTIONS.length} />
          <h2 style={{ ...h2, marginTop: 24 }}>Which city is your clinic in? <span style={{ color: "#475569", fontWeight: 400, fontSize: 16 }}>(optional)</span></h2>
          <p style={sub}>These details are optional and only shape your result screen.</p>

          <div style={{ position: "relative", marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Type your city (anywhere in the world)..."
              value={citySearch}
              onChange={e => { setCitySearch(e.target.value); setCity(e.target.value); setShowCityDropdown(true); }}
              onFocus={() => setShowCityDropdown(true)}
              style={inputStyle}
              autoFocus
            />
            {showCityDropdown && filteredCities.length > 0 && (
              <div style={dropdown}>
                {filteredCities.slice(0, 8).map(c => (
                  <div
                    key={c}
                    style={dropdownItem}
                    onClick={() => { setCity(c); setCitySearch(c); setShowCityDropdown(false); }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Doctor name (optional)"
            value={doctorName}
            onChange={e => setDoctorName(e.target.value)}
            style={{ ...inputStyle, marginBottom: 12 }}
          />
          <input
            type="text"
            placeholder="Clinic name (optional)"
            value={clinicName}
            onChange={e => setClinicName(e.target.value)}
            style={{ ...inputStyle, marginBottom: 24 }}
          />

          <button
            style={primaryBtn}
            onClick={() => { setStep("q"); setCurrentQ(0); }}
          >
            {city ? "Continue →" : "Skip →"}
          </button>
        </div>
      </div>
    );
  }

  if (step === "q") {
    const q = QUESTIONS[currentQ];
    return (
      <div ref={topRef} style={pageWrap}>
        <div style={card}>
          <ProgressBar current={currentQ + 1} total={QUESTIONS.length} />
          <h2 style={{ ...h2, marginTop: 24 }}>{q.text}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                style={{
                  ...optionBtn,
                  ...(answers[currentQ] === i ? optionBtnActive : {}),
                }}
                onClick={() => selectOption(i)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {currentQ > 0 && (
            <button
              style={backBtn}
              onClick={() => setCurrentQ(currentQ - 1)}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    );
  }

  if (step === "submitting") {
    return (
      <div ref={topRef} style={pageWrap}>
        <div style={{ ...card, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
          <h2 style={h2}>Working out your result...</h2>
          <p style={{ color: "#64748b" }}>Checking your answers</p>
          <div style={spinner} />
        </div>
      </div>
    );
  }

  if (step === "result" && tier) {
    return (
      <div ref={topRef} style={pageWrap}>
        <div style={card}>
          {/* Score header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={badge}>Your Clinic Digital Score</div>
            <ScoreRing score={score} tier={tier} />
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: tier.color + "22",
              border: `1px solid ${tier.color}44`,
              borderRadius: 99,
              padding: "6px 16px",
              marginBottom: 12,
            }}>
              <span style={{ fontSize: 20 }}>{tier.emoji}</span>
              <span style={{ fontWeight: 700, color: tier.color }}>{tier.name}</span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 15, margin: 0 }}>{tier.message}</p>
          </div>

          {/* Weak areas */}
          {weakAreas.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
                📍 Your main improvement areas
              </h3>
              {weakAreas.map(({ q, gap, earned, maxPoints }) => (
                <div key={q.id} style={improvementCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: 14 }}>{q.improvementLabel}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{q.improvementTip}</p>
                  <div style={{ marginTop: 8, height: 4, background: "#1e293b", borderRadius: 99 }}>
                    <div style={{
                      height: "100%",
                      width: `${(earned / maxPoints) * 100}%`,
                      background: "#6366f1",
                      borderRadius: 99,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA — demo booking */}
          <div style={ctaBox}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>🔥</div>
            <p style={{ color: "#f1f5f9", fontWeight: 600, marginBottom: 4, fontSize: 15 }}>
              Want to close these gaps?
            </p>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>
              SmileCRM books visits on WhatsApp, sends a reminder before each visit and asks patients for feedback afterwards.
            </p>
            <a href={MAIL} style={primaryBtn}>
              Send a short written enquiry →
            </a>
          </div>

          {/* Share section */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid #1e293b" }}>
            <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", marginBottom: 14 }}>
              Share this self-check with other clinic owners
            </p>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={whatsappBtn}
            >
              <span>📱</span> Share on WhatsApp
            </a>
            <button
              style={copyBtn}
              onClick={() => {
                navigator.clipboard.writeText(buildShareText()).catch(() => {});
              }}
            >
              Copy share text
            </button>
          </div>

          {/* Email capture */}
          {!emailSent ? (
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid #1e293b" }}>
              <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 14 }}>
                📧 Want your full improvement plan by email?
              </p>
              <form onSubmit={handleEmailCapture} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
                <button type="submit" style={{ ...primaryBtn, background: "#1e293b", border: "1px solid #334155" }} disabled={emailSending}>
                  {emailSending ? "Sending..." : "Email me my improvement plan"}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ marginTop: 24, padding: 16, background: "#052e16", borderRadius: 12, textAlign: "center" }}>
              <div style={{ color: "#4ade80", fontWeight: 600 }}>✓ Plan sent to {email}</div>
              <div style={{ color: "#64748b", fontSize: 13 }}>Check your inbox</div>
            </div>
          )}

          {/* Retake */}
          <button
            style={{ ...backBtn, marginTop: 24, width: "100%", textAlign: "center", justifyContent: "center" }}
            onClick={() => {
              setStep("intro");
              setAnswers([]);
              setCurrentQ(0);
              setScore(0);
              setTier(null);
              setWeakAreas([]);
              setEmail("");
              setEmailSent(false);
              setDoctorName("");
              setClinicName("");
              setCity("");
              setCitySearch("");
            }}
          >
            ↩ Retake the assessment
          </button>
        </div>

        {/* OG image preview (hidden, for debugging) */}
        {process.env.NODE_ENV === "development" && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <a href={buildOgUrl()} target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1", fontSize: 12 }}>
              Preview OG image →
            </a>
          </div>
        )}
      </div>
    );
  }

  return null;
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const pageWrap = {
  minHeight: "100vh",
  background: "#0a0f1e",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "24px 16px 48px",
};

const card = {
  width: "100%",
  maxWidth: 480,
  background: "#0f172a",
  borderRadius: 20,
  padding: "32px 24px",
  border: "1px solid #1e293b",
};

const h1 = {
  fontSize: 26,
  fontWeight: 800,
  color: "#f1f5f9",
  lineHeight: 1.25,
  margin: "12px 0 10px",
};

const h2 = {
  fontSize: 22,
  fontWeight: 700,
  color: "#f1f5f9",
  lineHeight: 1.3,
  margin: "0 0 8px",
};

const sub = {
  fontSize: 15,
  color: "#64748b",
  lineHeight: 1.6,
  margin: 0,
};

const badge = {
  display: "inline-block",
  background: "#1e1b4b",
  color: "#818cf8",
  fontSize: 12,
  fontWeight: 600,
  borderRadius: 99,
  padding: "4px 12px",
  marginBottom: 12,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
};

const featureRow = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  background: "#1e293b",
  borderRadius: 12,
  padding: "14px 16px",
};

const primaryBtn = {
  display: "block",
  width: "100%",
  padding: "16px 24px",
  background: "linear-gradient(135deg, #6366f1, #818cf8)",
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  textAlign: "center",
  textDecoration: "none",
  lineHeight: 1.4,
};

const optionBtn = {
  width: "100%",
  padding: "16px 20px",
  background: "#1e293b",
  border: "2px solid #334155",
  color: "#cbd5e1",
  fontSize: 15,
  fontWeight: 500,
  borderRadius: 12,
  cursor: "pointer",
  textAlign: "left",
  transition: "all 0.15s",
};

const optionBtnActive = {
  background: "#1e1b4b",
  borderColor: "#6366f1",
  color: "#818cf8",
};

const backBtn = {
  display: "inline-flex",
  alignItems: "center",
  marginTop: 20,
  background: "none",
  border: "none",
  color: "#475569",
  fontSize: 14,
  cursor: "pointer",
  padding: "8px 0",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: 10,
  color: "#f1f5f9",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
};

const dropdown = {
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  right: 0,
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: 10,
  zIndex: 100,
  maxHeight: 240,
  overflowY: "auto",
};

const dropdownItem = {
  padding: "12px 16px",
  color: "#cbd5e1",
  fontSize: 14,
  cursor: "pointer",
  borderBottom: "1px solid #0f172a",
};

const improvementCard = {
  background: "#1e293b",
  borderRadius: 12,
  padding: "14px 16px",
  marginBottom: 10,
};

const ctaBox = {
  background: "linear-gradient(135deg, #0f1b2d, #1e1b4b)",
  border: "1px solid #312e81",
  borderRadius: 16,
  padding: "24px",
  textAlign: "center",
  marginTop: 4,
};

const whatsappBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  width: "100%",
  padding: "15px 24px",
  background: "#16a34a",
  color: "#fff",
  fontSize: 15,
  fontWeight: 700,
  borderRadius: 12,
  textDecoration: "none",
  marginBottom: 10,
  boxSizing: "border-box",
};

const copyBtn = {
  width: "100%",
  padding: "13px 24px",
  background: "#1e293b",
  border: "1px solid #334155",
  color: "#94a3b8",
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 12,
  cursor: "pointer",
};

const spinner = {
  width: 40,
  height: 40,
  border: "3px solid #1e293b",
  borderTop: "3px solid #6366f1",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
  margin: "24px auto 0",
};
