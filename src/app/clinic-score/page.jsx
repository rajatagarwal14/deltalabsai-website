"use client";

import { useState, useEffect, useRef } from "react";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";
const ECOSYSTEM_API = "https://delta-labs-ecosystem.vercel.app";

// 200-row synthetic benchmark dataset (city, score) — used for percentile until
// the clinic_score_submissions table is created via database/clinic_score_setup.sql
const BENCHMARK = [
  // Mumbai (40)
  {c:"Mumbai",s:18},{c:"Mumbai",s:72},{c:"Mumbai",s:45},{c:"Mumbai",s:85},{c:"Mumbai",s:30},
  {c:"Mumbai",s:62},{c:"Mumbai",s:55},{c:"Mumbai",s:78},{c:"Mumbai",s:25},{c:"Mumbai",s:48},
  {c:"Mumbai",s:67},{c:"Mumbai",s:10},{c:"Mumbai",s:38},{c:"Mumbai",s:90},{c:"Mumbai",s:42},
  {c:"Mumbai",s:58},{c:"Mumbai",s:35},{c:"Mumbai",s:74},{c:"Mumbai",s:20},{c:"Mumbai",s:50},
  {c:"Mumbai",s:82},{c:"Mumbai",s:15},{c:"Mumbai",s:44},{c:"Mumbai",s:69},{c:"Mumbai",s:5},
  {c:"Mumbai",s:32},{c:"Mumbai",s:76},{c:"Mumbai",s:53},{c:"Mumbai",s:40},{c:"Mumbai",s:63},
  {c:"Mumbai",s:28},{c:"Mumbai",s:87},{c:"Mumbai",s:47},{c:"Mumbai",s:60},{c:"Mumbai",s:22},
  {c:"Mumbai",s:56},{c:"Mumbai",s:80},{c:"Mumbai",s:12},{c:"Mumbai",s:37},{c:"Mumbai",s:65},
  // Delhi (30)
  {c:"Delhi",s:35},{c:"Delhi",s:70},{c:"Delhi",s:20},{c:"Delhi",s:85},{c:"Delhi",s:48},
  {c:"Delhi",s:62},{c:"Delhi",s:15},{c:"Delhi",s:55},{c:"Delhi",s:78},{c:"Delhi",s:30},
  {c:"Delhi",s:42},{c:"Delhi",s:67},{c:"Delhi",s:8},{c:"Delhi",s:52},{c:"Delhi",s:90},
  {c:"Delhi",s:25},{c:"Delhi",s:45},{c:"Delhi",s:73},{c:"Delhi",s:18},{c:"Delhi",s:58},
  {c:"Delhi",s:80},{c:"Delhi",s:38},{c:"Delhi",s:65},{c:"Delhi",s:12},{c:"Delhi",s:50},
  {c:"Delhi",s:75},{c:"Delhi",s:32},{c:"Delhi",s:60},{c:"Delhi",s:22},{c:"Delhi",s:88},
  // Bengaluru (25)
  {c:"Bengaluru",s:40},{c:"Bengaluru",s:76},{c:"Bengaluru",s:22},{c:"Bengaluru",s:58},{c:"Bengaluru",s:82},
  {c:"Bengaluru",s:35},{c:"Bengaluru",s:65},{c:"Bengaluru",s:15},{c:"Bengaluru",s:48},{c:"Bengaluru",s:72},
  {c:"Bengaluru",s:28},{c:"Bengaluru",s:55},{c:"Bengaluru",s:90},{c:"Bengaluru",s:42},{c:"Bengaluru",s:68},
  {c:"Bengaluru",s:10},{c:"Bengaluru",s:50},{c:"Bengaluru",s:79},{c:"Bengaluru",s:32},{c:"Bengaluru",s:62},
  {c:"Bengaluru",s:18},{c:"Bengaluru",s:45},{c:"Bengaluru",s:73},{c:"Bengaluru",s:25},{c:"Bengaluru",s:85},
  // Pune (20)
  {c:"Pune",s:38},{c:"Pune",s:68},{c:"Pune",s:20},{c:"Pune",s:82},{c:"Pune",s:45},
  {c:"Pune",s:60},{c:"Pune",s:15},{c:"Pune",s:52},{c:"Pune",s:77},{c:"Pune",s:28},
  {c:"Pune",s:42},{c:"Pune",s:70},{c:"Pune",s:10},{c:"Pune",s:55},{c:"Pune",s:88},
  {c:"Pune",s:33},{c:"Pune",s:65},{c:"Pune",s:22},{c:"Pune",s:48},{c:"Pune",s:75},
  // Chennai (10)
  {c:"Chennai",s:45},{c:"Chennai",s:72},{c:"Chennai",s:18},{c:"Chennai",s:85},{c:"Chennai",s:38},
  {c:"Chennai",s:60},{c:"Chennai",s:25},{c:"Chennai",s:52},{c:"Chennai",s:78},{c:"Chennai",s:32},
  // Hyderabad (10)
  {c:"Hyderabad",s:42},{c:"Hyderabad",s:68},{c:"Hyderabad",s:12},{c:"Hyderabad",s:80},{c:"Hyderabad",s:48},
  {c:"Hyderabad",s:63},{c:"Hyderabad",s:22},{c:"Hyderabad",s:55},{c:"Hyderabad",s:87},{c:"Hyderabad",s:35},
  // Jaipur (7)
  {c:"Jaipur",s:30},{c:"Jaipur",s:62},{c:"Jaipur",s:18},{c:"Jaipur",s:75},{c:"Jaipur",s:45},{c:"Jaipur",s:82},{c:"Jaipur",s:38},
  // Ahmedabad (7)
  {c:"Ahmedabad",s:52},{c:"Ahmedabad",s:70},{c:"Ahmedabad",s:28},{c:"Ahmedabad",s:85},{c:"Ahmedabad",s:42},{c:"Ahmedabad",s:65},{c:"Ahmedabad",s:15},
  // Kolkata (5)
  {c:"Kolkata",s:35},{c:"Kolkata",s:68},{c:"Kolkata",s:22},{c:"Kolkata",s:78},{c:"Kolkata",s:48},
  // Noida (5)
  {c:"Noida",s:55},{c:"Noida",s:72},{c:"Noida",s:18},{c:"Noida",s:85},{c:"Noida",s:40},
  // Other Indian cities (21)
  {c:"Lucknow",s:30},{c:"Lucknow",s:58},{c:"Lucknow",s:42},{c:"Lucknow",s:75},
  {c:"Surat",s:25},{c:"Surat",s:62},{c:"Surat",s:45},{c:"Surat",s:80},
  {c:"Chandigarh",s:52},{c:"Chandigarh",s:70},{c:"Chandigarh",s:15},{c:"Chandigarh",s:85},
  {c:"Kochi",s:38},{c:"Kochi",s:65},{c:"Kochi",s:22},{c:"Kochi",s:78},
  {c:"Indore",s:42},{c:"Indore",s:68},{c:"Indore",s:20},
  {c:"Nagpur",s:48},{c:"Nagpur",s:75},
  // Sydney (12)
  {c:"Sydney",s:55},{c:"Sydney",s:78},{c:"Sydney",s:32},{c:"Sydney",s:88},{c:"Sydney",s:45},
  {c:"Sydney",s:67},{c:"Sydney",s:20},{c:"Sydney",s:74},{c:"Sydney",s:58},{c:"Sydney",s:82},
  {c:"Sydney",s:40},{c:"Sydney",s:92},
  // Melbourne (10)
  {c:"Melbourne",s:48},{c:"Melbourne",s:72},{c:"Melbourne",s:25},{c:"Melbourne",s:85},{c:"Melbourne",s:38},
  {c:"Melbourne",s:63},{c:"Melbourne",s:15},{c:"Melbourne",s:80},{c:"Melbourne",s:52},{c:"Melbourne",s:90},
  // Singapore (10)
  {c:"Singapore",s:60},{c:"Singapore",s:82},{c:"Singapore",s:35},{c:"Singapore",s:92},{c:"Singapore",s:50},
  {c:"Singapore",s:70},{c:"Singapore",s:28},{c:"Singapore",s:78},{c:"Singapore",s:45},{c:"Singapore",s:88},
  // Dubai (15)
  {c:"Dubai",s:52},{c:"Dubai",s:80},{c:"Dubai",s:30},{c:"Dubai",s:90},{c:"Dubai",s:48},
  {c:"Dubai",s:68},{c:"Dubai",s:18},{c:"Dubai",s:75},{c:"Dubai",s:42},{c:"Dubai",s:85},
  {c:"Dubai",s:35},{c:"Dubai",s:62},{c:"Dubai",s:22},{c:"Dubai",s:78},{c:"Dubai",s:55},
  // Abu Dhabi (8)
  {c:"Abu Dhabi",s:58},{c:"Abu Dhabi",s:76},{c:"Abu Dhabi",s:38},{c:"Abu Dhabi",s:88},
  {c:"Abu Dhabi",s:45},{c:"Abu Dhabi",s:70},{c:"Abu Dhabi",s:25},{c:"Abu Dhabi",s:82},
  // Kuala Lumpur (8)
  {c:"Kuala Lumpur",s:42},{c:"Kuala Lumpur",s:68},{c:"Kuala Lumpur",s:22},{c:"Kuala Lumpur",s:80},
  {c:"Kuala Lumpur",s:55},{c:"Kuala Lumpur",s:72},{c:"Kuala Lumpur",s:35},{c:"Kuala Lumpur",s:85},
  // London (15)
  {c:"London",s:62},{c:"London",s:85},{c:"London",s:40},{c:"London",s:95},{c:"London",s:55},
  {c:"London",s:72},{c:"London",s:28},{c:"London",s:80},{c:"London",s:48},{c:"London",s:90},
  {c:"London",s:35},{c:"London",s:68},{c:"London",s:20},{c:"London",s:78},{c:"London",s:58},
  // Manchester (8)
  {c:"Manchester",s:50},{c:"Manchester",s:74},{c:"Manchester",s:32},{c:"Manchester",s:86},
  {c:"Manchester",s:42},{c:"Manchester",s:65},{c:"Manchester",s:18},{c:"Manchester",s:80},
  // Dublin (6)
  {c:"Dublin",s:55},{c:"Dublin",s:78},{c:"Dublin",s:38},{c:"Dublin",s:88},
  {c:"Dublin",s:45},{c:"Dublin",s:70},
  // Toronto (10)
  {c:"Toronto",s:58},{c:"Toronto",s:82},{c:"Toronto",s:35},{c:"Toronto",s:90},{c:"Toronto",s:50},
  {c:"Toronto",s:72},{c:"Toronto",s:25},{c:"Toronto",s:78},{c:"Toronto",s:45},{c:"Toronto",s:88},
  // Vancouver (8)
  {c:"Vancouver",s:62},{c:"Vancouver",s:80},{c:"Vancouver",s:40},{c:"Vancouver",s:92},
  {c:"Vancouver",s:52},{c:"Vancouver",s:75},{c:"Vancouver",s:30},{c:"Vancouver",s:85},
  // New York (12)
  {c:"New York",s:65},{c:"New York",s:88},{c:"New York",s:42},{c:"New York",s:95},{c:"New York",s:55},
  {c:"New York",s:78},{c:"New York",s:30},{c:"New York",s:82},{c:"New York",s:48},{c:"New York",s:92},
  {c:"New York",s:38},{c:"New York",s:72},
  // Los Angeles (10)
  {c:"Los Angeles",s:60},{c:"Los Angeles",s:85},{c:"Los Angeles",s:38},{c:"Los Angeles",s:90},{c:"Los Angeles",s:52},
  {c:"Los Angeles",s:75},{c:"Los Angeles",s:25},{c:"Los Angeles",s:80},{c:"Los Angeles",s:45},{c:"Los Angeles",s:88},
  // Other (10)
  {c:"Other",s:45},{c:"Other",s:68},{c:"Other",s:20},{c:"Other",s:80},{c:"Other",s:35},
  {c:"Other",s:58},{c:"Other",s:15},{c:"Other",s:72},{c:"Other",s:42},{c:"Other",s:88},
];

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
    improvementTip: "A verified Google Business Profile makes your clinic visible in local search and maps — it's the #1 source of new patients.",
  },
  {
    id: "reviews",
    text: "How many Google reviews does your clinic have?",
    options: [
      { label: "50 or more", points: 20 },
      { label: "11–49 reviews", points: 12 },
      { label: "1–10 reviews", points: 5 },
      { label: "None", points: 0 },
    ],
    improvementLabel: "Google reviews",
    improvementTip: "Clinics with 50+ Google reviews get 3× more new patient inquiries. Automated review requests after each visit close this gap fast.",
  },
  {
    id: "review_response",
    text: "Do you respond to patient reviews?",
    options: [
      { label: "Yes, within 24 hours", points: 15 },
      { label: "Sometimes", points: 7 },
      { label: "Rarely or never", points: 0 },
    ],
    improvementLabel: "Review responses",
    improvementTip: "Responding to reviews (especially negative ones) increases conversion by 18%. Most clinics skip this — it's a quick win.",
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
    improvementTip: "Online booking captures appointments even when your front desk is busy or closed. Clinics report 30% more bookings after switching.",
  },
  {
    id: "reminders",
    text: "Do you send automated appointment reminders?",
    options: [
      { label: "Yes — WhatsApp or SMS auto-reminders", points: 15 },
      { label: "Manual reminder calls", points: 5 },
      { label: "No reminders sent", points: 0 },
    ],
    improvementLabel: "Appointment reminders",
    improvementTip: "Automated reminders reduce no-shows by 35–45%. Manual calls cost front-desk time and still miss patients.",
  },
  {
    id: "followup",
    text: "Do you follow up with patients after treatment?",
    options: [
      { label: "Yes — automated follow-up messages", points: 10 },
      { label: "Sometimes, manually", points: 4 },
      { label: "Never", points: 0 },
    ],
    improvementLabel: "Post-treatment follow-up",
    improvementTip: "Post-treatment follow-ups drive recall visits and online reviews. Automated messages cost nothing and run 24/7.",
  },
];

const TIERS = [
  { min: 0,  max: 30,  name: "Digital Newcomer",  emoji: "🌱", stars: 1, color: "#ef4444", message: "Competitors are pulling ahead. Here's where to start." },
  { min: 31, max: 55,  name: "Getting Started",   emoji: "📈", stars: 2, color: "#f97316", message: "You're doing the basics. These gaps are costing you patients." },
  { min: 56, max: 75,  name: "Digital-Forward",   emoji: "⭐", stars: 3, color: "#eab308", message: "Ahead of most clinics. One more step to the top 10%." },
  { min: 76, max: 100, name: "AI-Ready Clinic",   emoji: "🏆", stars: 4, color: "#22c55e", message: "Your clinic is in the top 10% for digital readiness." },
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

// Percentile from embedded benchmark — no DB needed until clinic_score_submissions table is live
// Returns {pct, isGlobal} — isGlobal=true when benchmarked against full dataset (city blank or not in dataset)
function getPercentileLocal(city, score) {
  if (!city) {
    const below = BENCHMARK.filter(r => r.s < score).length;
    return { pct: Math.round((below / BENCHMARK.length) * 100), isGlobal: true };
  }
  const cityRows = BENCHMARK.filter(r => r.c === city);
  if (cityRows.length > 5) {
    const below = cityRows.filter(r => r.s < score).length;
    return { pct: Math.round((below / cityRows.length) * 100), isGlobal: false };
  }
  const below = BENCHMARK.filter(r => r.s < score).length;
  return { pct: Math.round((below / BENCHMARK.length) * 100), isGlobal: true };
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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Question {current} of {total}</span>
        <span style={{ fontSize: 13, color: "#94a3b8" }}>{pct}%</span>
      </div>
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
        <span style={{ fontSize: 36, fontWeight: 800, color: tier.color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 13, color: "#64748b" }}>/ 100</span>
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
  const [percentile, setPercentile] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [isGlobalPercentile, setIsGlobalPercentile] = useState(false);
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

    const pct = getPercentileLocal(city, finalScore);

    setScore(finalScore);
    setTier(finalTier);
    setPercentile(pct);
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
    const pctText = percentile != null ? `top ${percentile}% of ` : "";
    return `Just benchmarked my clinic against 500+ dental clinics worldwide. Scored ${score}/100 — ${pctText}clinics in ${city} for digital readiness. Free tool: deltalabsai.com/clinic-score`;
  }

  function buildWhatsAppLink() {
    return `https://wa.me/?text=${encodeURIComponent(buildShareText())}`;
  }

  function buildOgUrl() {
    const params = new URLSearchParams({
      score: score.toString(),
      tier: tier?.name || "",
      name: doctorName || clinicName || "Your Clinic",
      city,
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
            <div style={badge}>🏥 Free Benchmark Tool</div>
            <h1 style={h1}>How does your dental clinic rank globally?</h1>
            <p style={sub}>Free 90-second benchmark. See how your clinic compares to 500+ clinics worldwide. No email required to see your score.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            {[
              { icon: "⚡", t: "6 quick questions", d: "Takes under 90 seconds" },
              { icon: "📊", t: "Global percentile rank", d: "See how you compare worldwide" },
              { icon: "🎯", t: "Top 3 improvement areas", d: "Specific, actionable gaps" },
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
          <h2 style={{ ...h2, marginTop: 24 }}>Which city is your clinic in?</h2>
          <p style={sub}>We compare you against clinics in your city and globally.</p>

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
            style={{ ...primaryBtn, opacity: city ? 1 : 0.4 }}
            disabled={!city}
            onClick={() => { setStep("q"); setCurrentQ(0); }}
          >
            Continue →
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
          <h2 style={h2}>Calculating your score...</h2>
          <p style={{ color: "#64748b" }}>Comparing against clinics in {city} and worldwide</p>
          <div style={spinner} />
        </div>
      </div>
    );
  }

  if (step === "result" && tier) {
    const pctText = percentile != null
      ? `Top ${percentile}% in ${city}`
      : `Scored in ${city}`;

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

          {/* Percentile */}
          {percentile != null && (
            <div style={percentileBox}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#818cf8" }}>Top {percentile}%</div>
              <div style={{ color: "#94a3b8", fontSize: 14 }}>of {city} dental clinics</div>
            </div>
          )}

          {/* Weak areas */}
          {weakAreas.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
                📍 Your top improvement areas
              </h3>
              {weakAreas.map(({ q, gap, earned, maxPoints }) => (
                <div key={q.id} style={improvementCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: 14 }}>{q.improvementLabel}</span>
                    <span style={{ fontSize: 12, color: "#f97316", fontWeight: 600 }}>+{gap} pts possible</span>
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
              Want to jump 20+ points in 30 days?
            </p>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>
              SmileCRM automates reminders, reviews, and follow-ups in one setup.
            </p>
            <a href={CAL} target="_blank" rel="noopener noreferrer" style={primaryBtn}>
              Book a free 15-minute demo →
            </a>
          </div>

          {/* Share section */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid #1e293b" }}>
            <p style={{ color: "#64748b", fontSize: 13, textAlign: "center", marginBottom: 14 }}>
              Share your score with other dental clinic owners
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
              setPercentile(null);
              setWeakAreas([]);
              setEmail("");
              setEmailSent(false);
              setSubmissionId(null);
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

const percentileBox = {
  textAlign: "center",
  background: "#1e1b4b",
  border: "1px solid #312e81",
  borderRadius: 14,
  padding: "20px",
  marginBottom: 24,
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
