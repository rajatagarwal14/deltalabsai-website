"use client";

import { useState, useEffect } from "react";
import { posts } from "./posts";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";

// Icons
const Ic = {
  Delta: ({ s = 28 }) => <svg width={s} height={s} viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3"/></svg>,
  Arr: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  LI: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  Mail: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  FB: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
};

export default function BlogIndexPage() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: "'DM Sans', sans-serif", color: "#0F172A" }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: sc ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E7EB", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#0F172A", textDecoration: "none" }}>
            <Ic.Delta /><span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 500, color: "#4B5563", textDecoration: "none" }}>Home</a>
            <a href="/diagnostic" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 10,
              background: "#0F172A", color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(15,23,42,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >Free Diagnostic <Ic.Arr /></a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ paddingTop: 120, paddingBottom: 60, background: "linear-gradient(155deg, #FAFBFF 0%, #EEF2FF 50%, #F0FDF4 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundImage: "radial-gradient(#CBD5E1 0.7px, transparent 0.7px)", backgroundSize: "26px 26px" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 16px", color: "#0F172A" }}>
            Delta Labs AI Blog
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "#4B5563", lineHeight: 1.6, margin: "0 0 20px" }}>
            Practical AI automation guides for small businesses. No jargon, just results.
          </p>
          <a href="/diagnostic" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10,
            background: "#0F172A", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(15,23,42,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >Take the Free Diagnostic <Ic.Arr /></a>
        </div>
      </header>

      {/* Featured Post */}
      {(() => {
        const featured = posts.find(p => p.slug === "manual-processes-costing-money");
        if (!featured) return null;
        return (
          <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ background: "#FEF3C7", color: "#92400E", padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Most Read</span>
              <span style={{ fontSize: 13, color: "#6B7280" }}>0% bounce rate · top organic post</span>
            </div>
            <a href={`/blog/${featured.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <article style={{
                borderRadius: 20,
                border: "1.5px solid #BFDBFE",
                padding: "40px 44px",
                background: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)",
                transition: "all 0.25s",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(37,99,235,0.14)"; e.currentTarget.style.borderColor = "#2563EB"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#BFDBFE"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
                  <span style={{ background: "#EFF6FF", color: "#2563EB", padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{featured.category}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#6B7280", fontSize: 12 }}><Ic.Clock /> {featured.readTime}</span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{featured.date}</span>
                </div>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, lineHeight: 1.2, color: "#0F172A", margin: "0 0 14px", letterSpacing: "-0.02em", maxWidth: 700 }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "#374151", margin: "0 0 24px", maxWidth: 680 }}>
                  {featured.description || featured.subtitle}
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: "#2563EB", color: "#fff", fontWeight: 700, fontSize: 14, alignSelf: "flex-start" }}>
                  Read article <Ic.Arr />
                </div>
              </article>
            </a>
          </section>
        );
      })()}

      {/* Blog Grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 32 }}>
          {posts.filter(p => p.slug !== "manual-processes-costing-money").map((post) => (
            <article key={post.slug} style={{
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              padding: "28px",
              background: "#fff",
              transition: "all 0.25s",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              cursor: "pointer"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#2563EB";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ background: "#EFF6FF", color: "#2563EB", padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {post.category}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#6B7280", fontSize: 12 }}>
                  <Ic.Clock /> {post.readTime}
                </span>
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.35, color: "#0F172A", margin: "0 0 10px" }}>
                {post.title}
              </h3>

              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#4B5563", margin: "0 0 16px", flex: 1 }}>
                {post.description || post.subtitle}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #F3F4F6" }}>
                <span style={{ fontSize: 13, color: "#6B7280" }}>
                  {post.date}
                </span>
                <a href={`/blog/${post.slug}`} style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#2563EB",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "gap 0.2s"
                }}
                  onMouseEnter={e => e.currentTarget.style.gap = "10px"}
                  onMouseLeave={e => e.currentTarget.style.gap = "6px"}
                >
                  Read article <Ic.Arr />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)", padding: "60px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "5%", right: "3%", opacity: 0.02, fontSize: 280, fontWeight: 900, color: "#fff", fontFamily: "Georgia,serif" }}>{"\u0394"}</div>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 16px" }}>
            Ready to transform your business?
          </h2>
          <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 28px" }}>
            Start with our free 3-minute diagnostic. Get your 9-dimension score and a specific quick win you can implement this week.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/diagnostic" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 10,
              background: "#fff", color: "#0F172A", fontWeight: 700, fontSize: 15, textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >Start Free Diagnostic <Ic.Arr /></a>
            <a href="#cal-book" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 10,
              background: "transparent", color: "#94A3B8", border: "1.5px solid #334155", fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "all 0.2s",
            }}>Book a Free Call</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0F172A", borderTop: "1px solid #1E293B", padding: "36px 24px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#fff", marginBottom: 4 }}><Ic.Delta s={22} /><span style={{ fontWeight: 700, fontSize: 15 }}>Delta Labs AI</span></div>
            <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>AI-powered business consulting for growing companies.</p>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <a href="#cal-book" style={{ color: "#64748B", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}><Ic.Mail /></a>
            <a href="/linkedin" aria-label="LinkedIn" style={{ color: "#64748B", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}><Ic.LI /></a>
            <a href="/facebook" aria-label="Facebook" style={{ color: "#64748B", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}><Ic.FB /></a>
          </div>
        </div>
        <div style={{ maxWidth: 1040, margin: "16px auto 0", paddingTop: 16, borderTop: "1px solid #1E293B", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#475569", margin: "0 0 8px" }}>&copy; {new Date().getFullYear()} Delta Labs AI. All rights reserved.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "center" }}>
            <a href="/privacy" style={{ fontSize: 11, color: "#64748B", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>Privacy Policy</a>
            <span style={{ color: "#475569", fontSize: 11 }}>·</span>
            <a href="/terms" style={{ fontSize: 11, color: "#64748B", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
