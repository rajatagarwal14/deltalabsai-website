"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DiagnosticBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const excluded =
    pathname === "/diagnostic" || pathname?.startsWith("/diagnostic");

  useEffect(() => {
    if (excluded) return;
    if (sessionStorage.getItem("dla_diag_banner_v2")) return;
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, [excluded]);

  if (!visible || excluded) return null;

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("dla_diag_banner_v2", "1");
  };

  const trackClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "diagnostic_banner_click", {
        event_category: "CRO",
        event_label: "sticky_banner",
        page_path: pathname,
      });
    }
  };

  return (
    <>
      <style>{`
        @keyframes dla-banner-in {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes dla-cta-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50%     { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
        }
        #dla-diag-banner a:hover { background: #059669 !important; }
        @media (max-width: 600px) {
          #dla-diag-banner .dla-tagline { display: none; }
          #dla-diag-banner { padding: 10px 12px !important; gap: 10px !important; }
        }
      `}</style>
      <div
        id="dla-diag-banner"
        role="complementary"
        aria-label="Free AI Diagnostic offer"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9998,
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          borderTop: "2px solid #10B981",
          boxShadow: "0 -4px 28px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          padding: "13px 20px",
          fontFamily: "'DM Sans', -apple-system, sans-serif",
          animation: "dla-banner-in 0.45s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <span style={{ fontSize: 20, flexShrink: 0 }} aria-hidden="true">🎯</span>

        <div style={{ flex: 1, minWidth: 0, maxWidth: 560 }}>
          <p style={{
            margin: 0,
            color: "#F8FAFC",
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            Find where your business is leaking revenue —{" "}
            <span style={{ color: "#10B981" }}>free in 3 minutes</span>
          </p>
          <p className="dla-tagline" style={{
            margin: "2px 0 0",
            color: "#64748B",
            fontSize: 11,
            lineHeight: 1.3,
          }}>
            AI Diagnostic scores your business across 9 dimensions. No signup needed.
          </p>
        </div>

        <a
          href="/diagnostic"
          onClick={trackClick}
          style={{
            display: "inline-block",
            background: "#10B981",
            color: "#fff",
            padding: "9px 18px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 800,
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "background 0.2s",
            animation: "dla-cta-glow 2.5s ease-in-out infinite",
          }}
        >
          Get Free Score →
        </a>

        <button
          onClick={dismiss}
          aria-label="Dismiss diagnostic banner"
          style={{
            background: "none",
            border: "none",
            color: "#475569",
            fontSize: 22,
            lineHeight: 1,
            cursor: "pointer",
            padding: "2px 6px",
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>
    </>
  );
}
