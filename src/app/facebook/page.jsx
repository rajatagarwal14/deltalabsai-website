"use client";

import { useEffect } from "react";

export default function FacebookRedirect() {
  useEffect(() => {
    // Fire GA event for tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "social_redirect", {
        event_category: "Social Media",
        event_label: "Facebook",
        transport_type: "beacon",
      });
    }
    // Redirect after a brief moment to ensure GA fires
    setTimeout(() => {
      window.location.href =
        "https://www.facebook.com/profile.php?id=61588293766138&ref=1";
    }, 150);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0F172A",
        color: "#94A3B8",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <p>Redirecting to our Facebook page...</p>
    </div>
  );
}
