// Pure helpers for the repeat-visitor path of POST /api/leads/capture.
// A returning visitor's new diagnostic answers are APPENDED to the existing lead (source_detail.submissions).
// Contact fields, status and score are never changed from this public endpoint. Sizes are capped because the endpoint is unauthenticated.

export const MAX_SUBMISSIONS = 10;
export const MAX_TAGS = 20;
const MAX_TAG_LEN = 40;
const MAX_FIELD_BYTES = 8000;

function clip(value) {
  if (value === undefined || value === null) return undefined;
  const text = typeof value === "string" ? value : JSON.stringify(value);
  if (text.length <= MAX_FIELD_BYTES) return value;
  return typeof value === "string" ? text.slice(0, MAX_FIELD_BYTES) : { truncated: true, preview: text.slice(0, MAX_FIELD_BYTES) };
}

export function buildSubmission({ source, source_detail, notes, metadata }, now = new Date()) {
  const s = { at: now.toISOString() };
  if (source) s.source = String(source).slice(0, 60);
  if (source_detail) s.detail = clip(source_detail);
  if (notes) s.notes = clip(notes);
  if (metadata) s.metadata = clip(metadata);
  return s;
}

// Returns the PATCH body for an existing lead. Never touches name, email, phone, company, status or score.
export function mergeIntoExisting(existing, incoming, now = new Date()) {
  const prev = existing && typeof existing.source_detail === "object" && existing.source_detail ? existing.source_detail : {};
  const submission = buildSubmission(incoming, now);
  const hasContent = Object.keys(submission).some((k) => k !== "at" && k !== "source");
  const prevSubs = Array.isArray(prev.submissions) ? prev.submissions : [];
  const submissions = hasContent || incoming.source ? [...prevSubs, submission].slice(-MAX_SUBMISSIONS) : prevSubs;
  const prevTags = Array.isArray(existing?.tags) ? existing.tags : [];
  const newTags = (Array.isArray(incoming.tags) ? incoming.tags : [])
    .filter((t) => typeof t === "string" && t.trim())
    .map((t) => t.trim().slice(0, MAX_TAG_LEN));
  const tags = [...new Set([...prevTags, ...newTags])].slice(0, MAX_TAGS);
  return { source_detail: { ...prev, submissions }, tags };
}
