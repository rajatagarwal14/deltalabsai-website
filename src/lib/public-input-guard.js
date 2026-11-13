// Input rules for the public write endpoints on deltalabsai.com. Pure functions, no I/O.
//
// DELA-5473: on 11 Nov 2026, 331 synthetic rows reached the production `leads` table through the public
// capture endpoints — stored XSS in full_name, LIKE-wildcard addresses ('%@gmail.com'), PostgREST parameter
// injection ('...@example.org&limit=1000') and a mailbox-enumeration run against real third-party Gmail
// addresses. Every one of them landed in status='new', the status the outreach selector draws from.
//
// This file is a port of src/lib/trial-signup-guard.ts in delta-labs-ecosystem. The rules must stay identical:
// deltalabsai.com and the ecosystem app write to the SAME leads table, so one endpoint being laxer than the
// other means the stricter one is decoration.

export const NAME_MAX = 120;
export const EMAIL_MAX = 254;
export const FIELD_MAX = { full_name: 120, name: 120, company_name: 120, phone: 30, industry: 60, notes: 1000 };

const RESERVED_DOMAINS = ["example.com", "example.org", "example.net"];
const RESERVED_TLDS = ["test", "invalid", "localhost", "example"];

export function isReservedDomain(domain) {
  const d = String(domain).toLowerCase();
  if (RESERVED_DOMAINS.some((r) => d === r || d.endsWith("." + r))) return true;
  return RESERVED_TLDS.some((t) => d === t || d.endsWith("." + t));
}

// Local part: letters, digits and . _ + ' - only. '%' is deliberately excluded — it is an ILIKE/PostgREST
// wildcard, not a mailbox character, and 78 of the probe rows used it. Domain: dotted labels, inner hyphens only.
const LOCAL_RE = /^[\p{L}\p{N}._+'-]{1,64}$/u;
const LABEL_RE = /^[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?$/u;

export function cleanEmail(input) {
  if (typeof input !== "string") return null;
  const email = input.trim().toLowerCase();
  if (!email || email.length > EMAIL_MAX) return null;
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const [local, domain] = parts;
  if (!LOCAL_RE.test(local) || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return null;
  const labels = domain.split(".");
  if (labels.length < 2 || !labels.every((l) => LABEL_RE.test(l))) return null;
  if (isReservedDomain(domain)) return null;
  return email;
}

// Angle brackets are the whole of the stored-XSS class we saw. '&' is NOT refused: "Smith & Sons Dental" is real.
export function hasMarkup(s) {
  return /[<>]/.test(s);
}

// Our own agents stamp the originating ticket into probe payloads: i4606, i4934, qa4763enum, poc4727x.
// A marker prefix followed directly by 3-5 digits, at a word start; a trailing suffix is allowed.
const PROBE_MARKER_RE = /(?:^|[^\p{L}\p{N}])(?:i|qa|qc|poc|probe|test|tst)\d{3,5}/iu;
export function isAgentProbeMarker(s) {
  return PROBE_MARKER_RE.test(s);
}

// Returns the reason a free-text value is refused, or null when it is acceptable. Refuse, never strip:
// a stripped payload still lands a row in the outreach-eligible pool, and the stored original is the evidence.
export function textFieldRefusal(value) {
  if (hasMarkup(value)) return "markup";
  if (isAgentProbeMarker(value)) return "probe_marker";
  return null;
}

// ILIKE treats % and _ as wildcards. An address must only ever match itself, or a dedup lookup turns the
// public endpoint into a way to read rows back out of the CRM.
export function escapeLikePattern(s) {
  return s.replace(/[\\%_]/g, "\\$&");
}

// Validates a lead-capture body. Returns { ok: true, value } or { ok: false, error, field }.
export function validateLeadCapture(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Email is required", field: "email" };
  }
  if (body.email === undefined || body.email === null || body.email === "") {
    return { ok: false, error: "Email is required", field: "email" };
  }
  const email = cleanEmail(body.email);
  if (!email || textFieldRefusal(email)) {
    return { ok: false, error: "Invalid email address", field: "email" };
  }

  const fields = {};
  for (const key of Object.keys(FIELD_MAX)) {
    const v = body[key];
    if (v === undefined || v === null || v === "") continue;
    if (typeof v !== "string") return { ok: false, error: `Invalid ${key}`, field: key };
    const t = v.trim();
    if (!t) continue;
    if ([...t].length > FIELD_MAX[key]) return { ok: false, error: `Invalid ${key}`, field: key };
    if (textFieldRefusal(t)) return { ok: false, error: `Invalid ${key}`, field: key };
    fields[key] = t;
  }

  const tags = Array.isArray(body.tags)
    ? body.tags.filter((t) => typeof t === "string").slice(0, 20).map((t) => [...t].slice(0, 40).join(""))
    : [];

  return { ok: true, value: { email, fields, tags } };
}
