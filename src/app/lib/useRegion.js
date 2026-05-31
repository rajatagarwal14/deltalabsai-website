"use client";
import { useState, useEffect } from "react";

// Region detection via visitor timezone — free, no API call, no GDPR cookie banner.
// India visitors (Asia/Kolkata or Asia/Calcutta) → "in": keep ₹ pricing.
// Everyone else → "intl": premium positioning, show "Custom — book a call" instead
// of a rupee amount (no cheap ₹ anchor in mature markets; quote per-deal in USD/AED).
// Defaults to "in" before hydration so India (the common case) never flashes.
export function useRegion() {
  const [region, setRegion] = useState("in"); // "in" | "intl"
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      setRegion(tz === "Asia/Kolkata" || tz === "Asia/Calcutta" ? "in" : "intl");
    } catch {
      setRegion("in");
    }
  }, []);
  return region;
}

// Convenience: returns { region, isIntl, price, period }
// price(raw) → raw in India, "Custom" abroad.
// period(raw) → raw in India, "— book a call" abroad.
export function useRegionPricing() {
  const region = useRegion();
  const isIntl = region === "intl";
  return {
    region,
    isIntl,
    price: (raw) => (isIntl ? "Custom" : raw),
    period: (raw) => (isIntl ? "— book a call" : raw),
  };
}
