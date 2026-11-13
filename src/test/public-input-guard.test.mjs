// DELA-5473. Run: node --test src/test/public-input-guard.test.mjs  (from the repo's src/ directory)
// Every payload here is a real value that reached the production `leads` table on 11 Nov 2026.
import test from "node:test";
import assert from "node:assert";
import { validateLeadCapture, cleanEmail, textFieldRefusal, escapeLikePattern, isAgentProbeMarker } from "../lib/public-input-guard.js";

const PROBE_EMAILS = [
  "poc4727x@example.org&org_id=neq.00000000-0000-0000-0000-000000000000",
  "poc4727x@example.org&limit=1000",
  "%@gmail.com",
  "*@gmail.com",
  "innerstrengt%@gmail.com",
  "qa4763enum@gmail.com",
  "x' OR 1=1--@gmail.com",
  "a@b",
  "someone@clinic.invalid",
  "back`tick@gmail.com",
];

test("every observed probe address is refused", () => {
  for (const email of PROBE_EMAILS) {
    assert.strictEqual(validateLeadCapture({ email }).ok, false, email);
  }
});

test("markup and run markers are refused in every stored text field", () => {
  for (const field of ["full_name", "name", "company_name", "industry", "notes"]) {
    const r = validateLeadCapture({ email: "real@clinic.co.uk", [field]: "i4934<img src=x onerror=alert(1)>" });
    assert.strictEqual(r.ok, false, field);
    assert.strictEqual(r.field, field);
  }
  assert.strictEqual(validateLeadCapture({ email: "real@clinic.co.uk", full_name: "qa4763enum" }).ok, false);
  assert.strictEqual(validateLeadCapture({ email: "real@clinic.co.uk", full_name: "A".repeat(121) }).ok, false);
  assert.strictEqual(validateLeadCapture({ email: "real@clinic.co.uk", full_name: { a: 1 } }).ok, false);
});

test("a real diagnostic submission still passes, trimmed and bounded", () => {
  const r = validateLeadCapture({
    email: " Info@IndependentPhysio.co.uk ",
    name: " Síle O'Brien ",
    company_name: "Smith & Sons Dental",
    industry: "Dental",
    phone: "+44 7700 900123",
    notes: "Diagnostic: urgent.",
    tags: ["diagnostic", 42, "x".repeat(50)],
  });
  assert.ok(r.ok);
  assert.strictEqual(r.value.email, "info@independentphysio.co.uk");
  assert.strictEqual(r.value.fields.name, "Síle O'Brien");
  assert.strictEqual(r.value.fields.company_name, "Smith & Sons Dental");
  assert.deepStrictEqual(r.value.tags, ["diagnostic", "x".repeat(40)]);
});

test("missing and malformed bodies are refused, not defaulted", () => {
  for (const b of [null, undefined, [], {}, { email: "" }, "nope"]) {
    assert.strictEqual(validateLeadCapture(b).ok, false, JSON.stringify(b));
  }
});

test("dedup pattern escaping keeps an address matching only itself", () => {
  assert.strictEqual(escapeLikePattern("a_b@clinic.in"), "a\\_b@clinic.in");
  assert.strictEqual(escapeLikePattern("plain@clinic.in"), "plain@clinic.in");
});

test("the rules match the ecosystem guard: same accepts, same refusals", () => {
  assert.strictEqual(cleanEmail("%@gmail.com"), null);
  assert.strictEqual(cleanEmail("first.last+tag@clinic.co.uk"), "first.last+tag@clinic.co.uk");
  assert.strictEqual(cleanEmail("jörg@müller-zahn.de"), "jörg@müller-zahn.de");
  assert.strictEqual(textFieldRefusal("Smith & Sons"), null);
  assert.strictEqual(textFieldRefusal("<b>x</b>"), "markup");
  assert.strictEqual(textFieldRefusal("i4606"), "probe_marker");
  assert.strictEqual(isAgentProbeMarker("info2024"), false);
  assert.strictEqual(isAgentProbeMarker("iCare Dental"), false);
});
