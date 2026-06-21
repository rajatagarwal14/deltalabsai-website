"use client";

import { useState, useEffect } from "react";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";

// Icons
const Ic = {
  Delta: ({ s = 28 }) => <svg width={s} height={s} viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3"/></svg>,
  Arr: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  LI: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  Mail: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Chk: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Quote: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.15"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>,
  FB: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
};

// Rich text renderer -handles **bold**, *italic*, and inline formatting
function RichText({ text, style = {} }) {
  if (!text) return null;
  // Split by **bold** and *italic* markers
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <span style={style}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} style={{ fontWeight: 700, color: "#0F172A" }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i} style={{ fontStyle: "italic" }}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

// Render a bullet list block
function BulletList({ items }) {
  return (
    <div style={{ margin: "16px 0 20px", display: "grid", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ color: "#2563EB", flexShrink: 0, marginTop: 3 }}><Ic.Chk /></span>
          <span style={{ fontSize: 15.5, lineHeight: 1.7, color: "#374151" }}>
            <RichText text={item.replace(/^[-•]\s*/, "")} />
          </span>
        </div>
      ))}
    </div>
  );
}

// Render a numbered list block
function NumberedList({ items }) {
  return (
    <div style={{ margin: "16px 0 20px", display: "grid", gap: 12 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{
            minWidth: 28, height: 28, borderRadius: 8, background: "#EFF6FF", color: "#2563EB",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2
          }}>{i + 1}</span>
          <span style={{ fontSize: 15.5, lineHeight: 1.7, color: "#374151" }}>
            <RichText text={item.replace(/^\d+\.\s*/, "")} />
          </span>
        </div>
      ))}
    </div>
  );
}

// Render a score guide (lines like "- 1-3: ...", "- 4-6: ..." etc)
function ScoreGuide({ items }) {
  return (
    <div style={{ margin: "16px 0 20px", display: "grid", gap: 8 }}>
      {items.map((item, i) => {
        const clean = item.replace(/^[-•]\s*/, "");
        const scoreMatch = clean.match(/^(\d+-\d+):\s*(.*)/);
        if (scoreMatch) {
          const [, range, desc] = scoreMatch;
          const color = range.startsWith("1") || range.startsWith("2") || range.startsWith("3") ? "#DC2626" :
                        range.startsWith("4") || range.startsWith("5") || range.startsWith("6") ? "#D97706" :
                        range.startsWith("7") || range.startsWith("8") ? "#059669" : "#2563EB";
          return (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", background: "#F8FAFC", borderRadius: 10, borderLeft: `3px solid ${color}` }}>
              <span style={{ minWidth: 36, fontWeight: 800, fontSize: 14, color, flexShrink: 0 }}>{range}</span>
              <span style={{ fontSize: 14.5, lineHeight: 1.65, color: "#374151" }}><RichText text={desc} /></span>
            </div>
          );
        }
        return (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ color: "#2563EB", flexShrink: 0, marginTop: 3 }}><Ic.Chk /></span>
            <span style={{ fontSize: 15.5, lineHeight: 1.7, color: "#374151" }}><RichText text={clean} /></span>
          </div>
        );
      })}
    </div>
  );
}

// Smart paragraph renderer -handles mixed content (text + lists in same block)
function RenderParagraph({ text, isFirst }) {
  // Raw HTML blocks: render directly (for embedded dashboards, widgets)
  if (text.trim().startsWith("<") && (text.trim().startsWith("<div") || text.trim().startsWith("<iframe") || text.trim().startsWith("<table") || text.trim().startsWith("<p ") || text.trim().startsWith("<img") || text.trim().startsWith("<section") || text.trim().startsWith("<style"))) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  }

  // Stat callout: lines starting with "> STAT:"
  if (text.startsWith("> STAT:")) {
    const content = text.replace("> STAT:", "").trim();
    return (
      <div style={{ margin: "32px 0", padding: "28px 32px", background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)", borderRadius: 16, borderLeft: "4px solid #2563EB", position: "relative" }}>
        <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          <RichText text={content} />
        </div>
      </div>
    );
  }

  // Pull quote: lines starting with "> "
  if (text.startsWith("> ")) {
    const content = text.replace(/^>\s*/, "").trim();
    return (
      <blockquote style={{ margin: "32px 0", padding: "24px 28px 24px 32px", background: "#F8FAFC", borderLeft: "4px solid #2563EB", borderRadius: "0 12px 12px 0", position: "relative" }}>
        <div style={{ position: "absolute", top: 16, left: 28, opacity: 0.08 }}><Ic.Quote /></div>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "#1E293B", fontWeight: 500, fontStyle: "italic", margin: 0, position: "relative", zIndex: 1 }}>
          <RichText text={content} />
        </p>
      </blockquote>
    );
  }

  // Key takeaway box: lines starting with "KEY:"
  if (text.startsWith("KEY:")) {
    const content = text.replace("KEY:", "").trim();
    return (
      <div style={{ margin: "28px 0", padding: "24px 28px", background: "#ECFDF5", borderRadius: 14, border: "1px solid #A7F3D0" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: "#059669", flexShrink: 0, marginTop: 2, fontSize: 18 }}>💡</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#065F46", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Key Takeaway</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#065F46", margin: 0, fontWeight: 500 }}>
              <RichText text={content} />
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mixed content detection -split text into segments (text vs bullet lists vs numbered lists)
  const lines = text.split("\n");
  const hasListLines = lines.some(l => /^[-•]\s/.test(l) || /^\d+\.\s/.test(l));

  if (hasListLines) {
    // Parse into segments: groups of text, bullet items, numbered items
    const segments = [];
    let currentType = null;
    let currentItems = [];

    const flush = () => {
      if (currentItems.length > 0) {
        segments.push({ type: currentType, items: [...currentItems] });
        currentItems = [];
      }
      currentType = null;
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const isBullet = /^[-•]\s/.test(trimmed);
      const isNumbered = /^\d+\.\s/.test(trimmed);
      // Detect score ranges like "- 1-3: ..." or "- 9-10: ..."
      const isScore = isBullet && /^[-•]\s*\d+-\d+:/.test(trimmed);

      if (isScore) {
        if (currentType !== "score") { flush(); currentType = "score"; }
        currentItems.push(trimmed);
      } else if (isBullet) {
        if (currentType !== "bullet") { flush(); currentType = "bullet"; }
        currentItems.push(trimmed);
      } else if (isNumbered) {
        if (currentType !== "numbered") { flush(); currentType = "numbered"; }
        currentItems.push(trimmed);
      } else {
        if (currentType !== "text") { flush(); currentType = "text"; }
        currentItems.push(trimmed);
      }
    }
    flush();

    return (
      <div style={{ margin: "0 0 20px" }}>
        {segments.map((seg, i) => {
          if (seg.type === "score") return <ScoreGuide key={i} items={seg.items} />;
          if (seg.type === "bullet") return <BulletList key={i} items={seg.items} />;
          if (seg.type === "numbered") return <NumberedList key={i} items={seg.items} />;
          // Text segment -could be a label like "What this measures:" or regular text
          return seg.items.map((t, j) => {
            const isLabel = t.endsWith(":") && t.length < 80;
            return (
              <p key={`${i}-${j}`} style={{
                fontSize: isLabel ? 15 : 16.5,
                lineHeight: 1.85,
                color: isLabel ? "#0F172A" : "#374151",
                fontWeight: isLabel ? 700 : 400,
                margin: isLabel ? "20px 0 4px" : "0 0 12px",
                letterSpacing: isLabel ? "0.01em" : "0.005em",
              }}>
                <RichText text={t} />
              </p>
            );
          });
        })}
      </div>
    );
  }

  // Regular paragraph
  return (
    <p style={{
      fontSize: 16.5, lineHeight: 1.85, color: "#374151", margin: "0 0 20px",
      letterSpacing: "0.005em",
    }}>
      <RichText text={text} />
    </p>
  );
}

// Section divider
function SectionDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "40px 0 36px" }}>
      <div style={{ width: 40, height: 1, background: "#E5E7EB" }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#CBD5E1" }} />
      <div style={{ width: 40, height: 1, background: "#E5E7EB" }} />
    </div>
  );
}

// Table of contents
function TOC({ sections }) {
  const headings = sections.filter(s => s.heading).map(s => s.heading);
  if (headings.length < 3) return null;
  return (
    <div style={{ margin: "0 0 48px", padding: "28px 32px", background: "#F8FAFC", borderRadius: 16, border: "1px solid #E5E7EB" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>In this article</div>
      <div style={{ display: "grid", gap: 10 }}>
        {headings.map((h, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{
              minWidth: 22, height: 22, borderRadius: 6, background: "#EFF6FF", color: "#2563EB",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700
            }}>{i + 1}</span>
            <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogPostClient({ post, relatedPosts = [] }) {
  const [sc, setSc] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const h = () => {
      setSc(window.scrollY > 40);
      // Reading progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, (window.scrollY / docHeight) * 100));
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  let isFirstParagraph = true;

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: "'DM Sans', sans-serif", color: "#0F172A", paddingBottom: bannerDismissed ? 0 : 64 }}>
      {/* Reading progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, width: `${progress}%`, height: 3, background: "linear-gradient(90deg, #2563EB, #7C3AED)", zIndex: 200, transition: "width 0.1s" }} />

      {/* Nav */}
      <nav style={{ position: "fixed", top: 3, left: 0, right: 0, zIndex: 100, background: sc ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E7EB", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#0F172A", textDecoration: "none" }}>
            <Ic.Delta /><span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="/blog" style={{ fontSize: 14, fontWeight: 500, color: "#4B5563", textDecoration: "none" }}>All Articles</a>
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
      <header style={{ paddingTop: 120, paddingBottom: 48, background: "linear-gradient(155deg, #FAFBFF 0%, #EEF2FF 50%, #F0FDF4 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundImage: "radial-gradient(#CBD5E1 0.7px, transparent 0.7px)", backgroundSize: "26px 26px" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ background: "#EFF6FF", color: "#2563EB", padding: "5px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{post.category}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#6B7280", fontSize: 13 }}><Ic.Clock /> {post.readTime}</span>
          </div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.03em", margin: "0 0 16px", color: "#0F172A" }}>
            {post.title}
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#4B5563", lineHeight: 1.65, margin: "0 0 28px", maxWidth: 620 }}>
            {post.subtitle}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <Ic.Delta s={20} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Delta Labs AI</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>{post.date}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Table of Contents */}
        <TOC sections={post.sections} />

        {post.sections.map((section, i) => (
          <div key={i}>
            {i > 0 && section.heading && <SectionDivider />}
            {section.heading && (
              <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 20px", lineHeight: 1.25 }}>
                {section.heading}
              </h2>
            )}
            {section.body.split("\n\n").map((para, j) => {
              const result = <RenderParagraph key={`${i}-${j}`} text={para} isFirst={isFirstParagraph} />;
              if (isFirstParagraph && !para.startsWith(">") && !para.startsWith("-") && !para.startsWith("•") && !para.startsWith("KEY:") && !/^\d+\.\s/.test(para)) {
                isFirstParagraph = false;
              }
              return result;
            })}
          </div>
        ))}

        {/* CTA Box */}
        <div style={{ marginTop: 56, padding: "40px 36px", background: "linear-gradient(135deg, #0F172A, #1E293B)", borderRadius: 20, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "5%", right: "5%", opacity: 0.03, fontSize: 200, fontWeight: 900, color: "#fff", fontFamily: "Georgia,serif" }}>{"\u0394"}</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Find out where your business is leaking money
            </h3>
            <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>
              Take our free 3-minute diagnostic. Get your 9-dimension score, a radar chart, and one specific quick win you can implement this week.
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
            <p style={{ fontSize: 12, color: "#475569", marginTop: 16 }}>
              We take on a maximum of 5 new clients per month.
            </p>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 32px", textAlign: "center" }}>
            Related Articles
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {relatedPosts.map((rp) => (
              <a key={rp.slug} href={`/blog/${rp.slug}`} style={{
                borderRadius: 14, border: "1px solid #E5E7EB", padding: "24px", background: "#fff",
                textDecoration: "none", color: "inherit", transition: "all 0.25s", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <span style={{ background: "#EFF6FF", color: "#2563EB", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", alignSelf: "flex-start", marginBottom: 12 }}>
                  {rp.category}
                </span>
                <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.35, color: "#0F172A", margin: "0 0 8px" }}>{rp.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#6B7280", margin: 0, flex: 1 }}>{rp.subtitle}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 14, color: "#2563EB", fontSize: 13, fontWeight: 600 }}>
                  Read article <Ic.Arr />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Diagnostic CTA Banner */}
      {!bannerDismissed && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 150,
          background: "linear-gradient(90deg, #1E3A8A, #1D4ED8)",
          boxShadow: "0 -4px 24px rgba(37,99,235,0.25)",
          padding: "14px 20px",
          maxHeight: "20vh",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            maxWidth: 900, width: "100%", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 16, flexWrap: "wrap",
          }}>
            <p style={{
              margin: 0, fontSize: "clamp(13px, 2vw, 15px)", fontWeight: 600,
              color: "#fff", lineHeight: 1.4, flex: 1, minWidth: 200,
            }}>
              Find out exactly where your business is losing money — Free AI Diagnostic
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <a href="/diagnostic" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "10px 20px", borderRadius: 9,
                background: "#fff", color: "#1E3A8A",
                fontWeight: 700, fontSize: 14, textDecoration: "none",
                whiteSpace: "nowrap", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,255,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >Run My Free Diagnostic <Ic.Arr /></a>
              <button
                onClick={() => setBannerDismissed(true)}
                aria-label="Dismiss banner"
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.7)", padding: 8, display: "flex",
                  alignItems: "center", justifyContent: "center", borderRadius: 6,
                  transition: "color 0.2s", flexShrink: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "#0F172A", borderTop: "1px solid #1E293B", padding: "36px 24px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#fff", marginBottom: 4 }}><Ic.Delta s={22} /><span style={{ fontWeight: 700, fontSize: 15 }}>Delta Labs AI</span></div>
            <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>AI-powered business consulting for growing companies.</p>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <a href="/blog" style={{ fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>Blog</a>
            <a href="/diagnostic" style={{ fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>Diagnostic</a>
            <a href="#cal-book" aria-label="Book a call" style={{ color: "#94A3B8", transition: "color 0.2s", padding: "12px", display: "inline-flex", minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}><Ic.Mail /></a>
            <a href="/linkedin" aria-label="LinkedIn" style={{ color: "#94A3B8", transition: "color 0.2s", padding: "12px", display: "inline-flex", minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}><Ic.LI /></a>
            <a href="/facebook" aria-label="Facebook" style={{ color: "#94A3B8", transition: "color 0.2s", padding: "12px", display: "inline-flex", minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}><Ic.FB /></a>
          </div>
        </div>
        <div style={{ maxWidth: 1040, margin: "16px auto 0", paddingTop: 16, borderTop: "1px solid #1E293B", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#94A3B8", margin: "0 0 8px" }}>&copy; {new Date().getFullYear()} Delta Labs AI. All rights reserved.</p>
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
