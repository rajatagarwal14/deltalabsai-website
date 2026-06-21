"use client";

import { useState, useRef, useEffect } from "react";

const SUPABASE_URL = "https://qkcafjbmqrxhqyyayrqz.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

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
  return (
    <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `all 0.65s ease ${d}s`, ...style }}>
      {children}
    </div>
  );
}

const AGE_BRACKETS = ["18–24", "25–30", "31–36", "37–44", "45+"];

const CHALLENGES = [
  "I don't know how to start conversations",
  "I freeze up on first dates",
  "I come across as too eager / too distant",
  "I can't get past the talking stage",
  "I keep matching but get no replies",
  "I struggle with confidence and self-worth",
  "I don't know how to be vulnerable without oversharing",
  "Other",
];

const SOCIAL_PROOF = [
  { initials: "A", name: "Aryan, 26", quote: "I'd been on the apps for 2 years with no real dates. Would love a coach that actually gets the Indian dating scene." },
  { initials: "P", name: "Priya, 29", quote: "My friends keep saying just be yourself but that advice is useless. I need someone who can actually tell me what I'm doing wrong." },
  { initials: "R", name: "Rahul, 31", quote: "I'm decent at my job but completely clueless when it comes to dating. An AI coach available at 11pm when I'm overthinking? Yes please." },
];

async function saveWaitlistLead(data) {
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
        name: data.name,
        email: data.email,
        industry: "ai_coach",
        source: "dating_coach_waitlist",
        status: "warm",
        notes: `Dating Coach waitlist. Age bracket: ${data.ageBracket}. Challenge: ${data.challenge}. City: ${data.city || "not provided"}.`,
        created_at: new Date().toISOString(),
      }),
    });
  } catch (_) {
    // silent — don't block UX
  }
}

export default function AIDatingCoachPage() {
  const [form, setForm] = useState({ name: "", email: "", ageBracket: "", challenge: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.ageBracket || !form.challenge) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    await saveWaitlistLead(form);
    setLoading(false);
    setDone(true);
  }

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #e4e4e7",
    fontSize: 15, color: "#18181b", background: "#fff", outline: "none", boxSizing: "border-box",
    appearance: "none",
  };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: "#52525b", marginBottom: 6, display: "block" };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#fff", minHeight: "100vh", color: "#18181b" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #f4f4f5", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1100, margin: "0 auto" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#18181b" }}>
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
            <polygon points="20,5 35,33 5,33" stroke="#18181b" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
            <circle cx="20" cy="22" r="3.5" fill="#18181b" opacity="0.3" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 15 }}>AI Dating Coach</span>
        </a>
        <span style={{ fontSize: 12, background: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>Early Access</span>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "72px 24px 56px", textAlign: "center" }}>
        <F>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
            AI Dating Coach · Early Access
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" }}>
            Stop overthinking.<br />Start connecting.
          </h1>
          <p style={{ fontSize: 18, color: "#52525b", lineHeight: 1.7, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>
            An AI coach that helps you build genuine confidence in dating — available at 11 PM when you're overthinking that last message, not just during 9-to-5 therapy hours.
          </p>
          <a href="#waitlist" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 10, background: "#18181b", color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none", transition: "opacity .2s" }}>
            Join the waitlist — it's free
          </a>
          <p style={{ fontSize: 13, color: "#a1a1aa", marginTop: 12 }}>No credit card. No spam. Early access when we launch.</p>
        </F>
      </section>

      {/* Pain points */}
      <section style={{ background: "#fafafa", padding: "56px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Sound familiar?</h2></F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { icon: "💬", text: "You match but the conversation dies in 3 messages" },
              { icon: "😬", text: "First dates feel like interviews — awkward silences" },
              { icon: "📱", text: "You overthink every text for 20 minutes before sending" },
              { icon: "🔁", text: "You keep repeating the same patterns and can't figure out why" },
              { icon: "🙈", text: "Your friends say 'just be yourself' — useless advice" },
              { icon: "⏰", text: "You need help at 11 PM, not during 9-5 therapy hours" },
            ].map((p, i) => (
              <F key={i} d={i * 0.06}>
                <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 12, padding: "20px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22 }}>{p.icon}</span>
                  <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6, margin: 0 }}>{p.text}</p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "72px 24px" }}>
        <F><h2 style={{ fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>How it works</h2></F>
        <F d={0.05}><p style={{ textAlign: "center", color: "#71717a", marginBottom: 48, fontSize: 15 }}>Your personal dating coach. Available 24/7. No judgment.</p></F>
        <div style={{ display: "grid", gap: 28 }}>
          {[
            { step: "01", title: "Tell the coach your situation", desc: "Share what's happening — a conversation that stalled, a date coming up, or a pattern you keep repeating. Text or voice, your choice." },
            { step: "02", title: "Get specific, honest feedback", desc: "Not generic tips. Real analysis of your specific situation — what's working, what's not, and exactly what to say or do differently." },
            { step: "03", title: "Practice with AI roleplay", desc: "Practice conversations before they happen. Get comfortable with difficult topics. Build confidence that carries into real interactions." },
            { step: "04", title: "Track your growth", desc: "See patterns, celebrate wins, and watch your confidence grow week over week. Your coach remembers everything." },
          ].map((s, i) => (
            <F key={i} d={i * 0.07}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#a1a1aa", minWidth: 28, paddingTop: 3 }}>{s.step}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section style={{ background: "#fafafa", padding: "56px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>From people just like you</h2></F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {SOCIAL_PROOF.map((s, i) => (
              <F key={i} d={i * 0.08}>
                <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 12, padding: "24px 20px" }}>
                  <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>"{s.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{s.initials}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#71717a" }}>{s.name}</span>
                  </div>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section style={{ maxWidth: 560, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
        <F>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Affordable by design</h2>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7, marginBottom: 32 }}>
            AI coaching from <strong>₹1,500/month</strong> — less than one traditional therapy session. Optional human add-on available for deeper support.
          </p>
          <div style={{ background: "#f4f4f5", borderRadius: 12, padding: "20px 24px", fontSize: 14, color: "#71717a" }}>
            Early access members will get launch pricing locked in. Join the waitlist to secure your spot.
          </div>
        </F>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" style={{ background: "#18181b", padding: "72px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          {done ? (
            <div style={{ textAlign: "center", color: "#fff" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>You're on the list!</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                We'll email you as soon as early access opens. You'll be among the first 100 members to get in.
              </p>
            </div>
          ) : (
            <>
              <F>
                <h2 style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 8, textAlign: "center" }}>Join the early access waitlist</h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", textAlign: "center", marginBottom: 36, lineHeight: 1.6 }}>
                  Be among the first 100 people to access the AI Dating Coach. No spam, ever.
                </p>
              </F>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ ...labelStyle, color: "rgba(255,255,255,0.7)" }}>Your name *</label>
                  <input value={form.name} onChange={set("name")} placeholder="Aryan Sharma" style={{ ...inputStyle }} required />
                </div>
                <div>
                  <label style={{ ...labelStyle, color: "rgba(255,255,255,0.7)" }}>Email address *</label>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="aryan@gmail.com" style={{ ...inputStyle }} required />
                </div>
                <div>
                  <label style={{ ...labelStyle, color: "rgba(255,255,255,0.7)" }}>Your age bracket *</label>
                  <select value={form.ageBracket} onChange={set("ageBracket")} style={{ ...inputStyle }} required>
                    <option value="">Select age range</option>
                    {AGE_BRACKETS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ ...labelStyle, color: "rgba(255,255,255,0.7)" }}>Biggest dating challenge *</label>
                  <select value={form.challenge} onChange={set("challenge")} style={{ ...inputStyle }} required>
                    <option value="">Select your biggest challenge</option>
                    {CHALLENGES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ ...labelStyle, color: "rgba(255,255,255,0.7)" }}>City (optional)</label>
                  <input value={form.city} onChange={set("city")} placeholder="Mumbai, Bangalore, Delhi..." style={{ ...inputStyle }} />
                </div>
                {error && <p style={{ fontSize: 13, color: "#f87171", marginTop: -8 }}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ padding: "14px 24px", borderRadius: 10, background: loading ? "#52525b" : "#6366f1", color: "#fff", fontSize: 16, fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "background .2s", marginTop: 4 }}
                >
                  {loading ? "Saving your spot…" : "Join the waitlist →"}
                </button>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>No credit card. No spam. Unsubscribe anytime.</p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f4f4f5", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#a1a1aa" }}>AI Dating Coach — Internal Preview</p>
      </footer>
    </div>
  );
}
