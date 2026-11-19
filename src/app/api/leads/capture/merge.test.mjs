// Run: node --test src/app/api/leads/capture/merge.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { mergeIntoExisting, MAX_SUBMISSIONS, MAX_TAGS } from "./merge.mjs";

const NOW = new Date("2026-11-20T10:00:00Z");
const first = { id: "L1", full_name: "A", email: "a@x.com", status: "contacted", tags: ["diagnostic"], source_detail: { detail: "diag", notes: "first answers", metadata: { diagnostic_answers: { q1: "a" } } } };

test("repeat visitor: new answers are appended, original submission kept untouched", () => {
  const out = mergeIntoExisting(first, { source: "website_form", notes: "second answers", metadata: { diagnostic_answers: { q1: "b" } }, tags: ["diagnostic", "retake"] }, NOW);
  assert.equal(out.source_detail.notes, "first answers");                                  // original top-level keys preserved
  assert.deepEqual(out.source_detail.metadata, { diagnostic_answers: { q1: "a" } });
  assert.equal(out.source_detail.submissions.length, 1);
  assert.equal(out.source_detail.submissions[0].notes, "second answers");
  assert.deepEqual(out.source_detail.submissions[0].metadata, { diagnostic_answers: { q1: "b" } });
  assert.equal(out.source_detail.submissions[0].at, "2026-11-20T10:00:00.000Z");
  assert.deepEqual(out.tags, ["diagnostic", "retake"]);                                    // union, no duplicates
});

test("patch body never carries contact, status or score fields", () => {
  const out = mergeIntoExisting(first, { notes: "x", full_name: "Evil", phone: "1", status: "won", score: 99, email: "z@z.com" }, NOW);
  assert.deepEqual(Object.keys(out).sort(), ["source_detail", "tags"]);
});

test("null or missing source_detail and tags on the existing lead are handled", () => {
  const out = mergeIntoExisting({ id: "L2", source_detail: null, tags: null }, { notes: "n" }, NOW);
  assert.equal(out.source_detail.submissions.length, 1);
  assert.deepEqual(out.tags, []);
});

test("submissions and tags are capped; oversized fields are clipped (public endpoint)", () => {
  let lead = { id: "L3", source_detail: {}, tags: [] };
  for (let i = 0; i < MAX_SUBMISSIONS + 5; i++) lead = { ...lead, ...mergeIntoExisting(lead, { notes: `n${i}` }, NOW) };
  assert.equal(lead.source_detail.submissions.length, MAX_SUBMISSIONS);
  assert.equal(lead.source_detail.submissions.at(-1).notes, `n${MAX_SUBMISSIONS + 4}`);   // newest kept
  const many = Array.from({ length: 60 }, (_, i) => `t${i}`);
  assert.equal(mergeIntoExisting(first, { tags: many }, NOW).tags.length, MAX_TAGS);
  const big = mergeIntoExisting(first, { notes: "x".repeat(50000) }, NOW).source_detail.submissions[0].notes;
  assert.ok(big.length <= 8000);
});

test("an empty repeat submission adds nothing", () => {
  const out = mergeIntoExisting(first, {}, NOW);
  assert.equal(out.source_detail.submissions.length, 0);
  assert.deepEqual(out.tags, ["diagnostic"]);
});
