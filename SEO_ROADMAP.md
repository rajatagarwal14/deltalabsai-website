# SEO_ROADMAP.md — deltalabsai.com
**2026-08-29. Built on VERIFIED Semrush + GSC data. No invented volumes, CPCs or competitors.**
Baseline: 7 clicks / 3,314 impressions / avg pos 30.9 / **Authority Score 6**.

---

## THE STRATEGIC INVERSION

We have been targeting `ai automation for small business` — **KD 38, position 43, 46% of all site impressions, ZERO clicks**.

Meanwhile, terms we can actually win sit untouched:

| Keyword | Volume | CPC | **KD** | Status |
|---|---|---|---|---|
| **business process automation consulting** | **590** | **$19.94** | **8** | not ranking |
| business process automation consultants | 90 | $14.14 | **7** | not ranking |
| **ai business solution** | 210 | **$24.04** | **8** | not ranking |
| smart business automation | 90 | $10.18 | **9** | not ranking |
| **crm migration service** | 40 | $13.91 | **10** | not ranking |
| ai consulting for small business | 110 | $8.41 | **11** | not ranking |
| data migration crm / crm migration tool | 170 / 140 | $14.32 / $18.20 | **11** | not ranking |
| **crm data migration tool** | 140 | **$19.82** | **4** | not ranking |
| **crm data migration utility** | 70 | **$19.82** | **1** | not ranking |
| **dynamics 365 migration consulting services** | 30 | **$18.73** | **0** | not ranking |
| ai agents for small business | 90 | $10.78 | **14** | not ranking |
| business process automation experts | 70 | $14.80 | **14** | not ranking |
| **crm migration** | **480** | **$14.32** | **17** | not ranking |
| what is process automation | 720 | $3.78 | **12** | not ranking |
| **automate business processes** | **1,000** | **$22.30** | 19 | not ranking |
| **process automation solutions** | **1,000** | **$16.54** | 19 | not ranking |
| billing loss | 590 | $0 | **6** | **pos 61** |
| ai transformation roadmap tools | 70 | $0 | 16 | **pos 20** |

**~7,700 monthly searches at KD ≤ 25 with CPC $4–24, none of which we target.**

**Rule going forward: at Authority Score 6, target KD ≤ 20. Ignore KD > 30 entirely.**

---

## AUTHORITY REALITY — sets the timeline

| Domain | Authority | Referring domains |
|---|---|---|
| **deltalabsai.com** | **6** | **92** |
| syncmatters.com | 32 | 1,059 |
| fayedigital.com | 31 | 1,140 |
| clearout.io | 42 | 3,308 |

**A 10–36× referring-domain gap.** KD ≤ 12 is reachable in weeks–months. KD 17–20 in months. KD 27+ needs authority work first. **Nothing here is a September win.**

---

## PRIORITISED BACKLOG

| P | Change | Why (evidence) | Target intent | Business value | Effort | Status |
|---|---|---|---|---|---|---|
| **P0** | Fix `/about` 404 | VERIFIED broken — was untracked, never deployed | — | Crawl hygiene | 15min | ✅ 0686591 |
| **P0** | Fix `/solutions` H1 word-join | VERIFIED (extraction artifact, not user-visible) | — | Crawler parsing | 5min | ✅ 0686591 |
| **P0** | **Mark GA4 key events in the admin UI** (`diagnostic_complete`, `form_submit`, `book_call_click`) | **CORRECTION: the events already fire in code** — verified in `diagnostic/page.jsx`, `layout.jsx`, `page.jsx`. keyEvents=0 is a **GA4 dashboard toggle**, not a code gap. **CEO action — Claude has no GA4 admin access** | — | Measurement | 10min | ☐ |
| **P0** | ~~Retarget `/blog/crm-service-businesses`~~ **DONE — commit 9a6bd2b** (metadata only; content restructure still pending) | Page ranked pos 4–11 for 22 variants worth **$0.00 CPC** | Commercial | **High** | 3h | ✅ metadata |
| **P1** | **New pillar: Business Process Automation Consulting** → `business process automation consulting` (590, $19.94, **KD 8**) + consultants (KD 7) + experts (KD 14) + agency (KD 16) | Lowest-difficulty, highest-value cluster matching what we actually sell | Commercial | **Highest** | 2d | ☐ |
| **P1** | **NEW PAGE — `/blog/crm-data-migration-tools`** "7 CRM Data Migration Tools Compared (2026)" → `crm data migration utility` (**KD 1**, $19.82), `crm data migration tool` (**KD 4**, $19.82), `crm migration tool` (KD 11, $18.20) | **Fable: fastest win on the board — ship first.** Tool/software intent is distinct from the guide's hire/learn intent, so no cannibalisation. Ranks in **4–8 weeks** at KD 1–4. Interlink both ways with exact-match anchors | Commercial | **Highest** | 1d | ✅ **DONE — commit below** |
| **P1** | **Content restructure of the retargeted guide** — process → checklist (downloadable) → tools comparison → failure modes → "when to hire a migration service" CTA | Fable: guide-shaped, service-cored. Only 1 of 12 page-1 results is a service page. Checklist is the link/citation bait | Commercial-investigation | High | 2d | ☐ |
| **P1** | Retarget `/blog/healthcare-billing-errors-revenue-loss` → `billing loss` (590 vol, **KD 6**, currently pos 61) | KD 6 and we're on page 7 — pure execution gap | Informational | Medium | 2h | ☐ |
| **P1** | `/solutions` → `ai business solution` (210, **$24.04**, KD 8) + `smart business automation` (KD 9) | Existing commercial page, no target | Commercial | High | 3h | ☐ |
| **P2** | Retarget `/blog/digital-transformation-roadmap` → `ai transformation roadmap tools` (KD 16, **currently pos 20**) | Striking distance | Informational | Medium | 2h | ☐ |
| **P2** | `what is process automation` (720, KD 12) as cluster entry point | Top-of-funnel feeder into the BPA pillar | Informational | Medium | 1d | ☐ |
| **P2** | Internal linking: every CRM/BPA post → pillar; pillar → /diagnostic | No cluster architecture exists today | — | Authority flow | 4h | ☐ |
| **P2** | Brand entity: `delta labs` KD 12 at pos 34; brand queries land on `/blog` not `/` | Can't rank for own name at KD 12 | Navigational | Medium | 3h | ☐ |
| **P3** | **Decide fate of** `/blog/ai-automations-small-business` — 46% of impressions, pos 41, KD 38, zero clicks | Unwinnable at authority 6. Options: retarget to KD≤20 terms, or accept as sunk | — | Removes drag | 3h | ☐ |
| **P3** | Linkable asset for authority (CRM migration checklist / calculator) | 92 ref domains vs 950–3,308 — required before KD 27+ | — | Long-term | 1w | ☐ |
| **P3** | Core Web Vitals measurement | **UNVERIFIED — never measured** | — | Unknown | 4h | ☐ |

---

## WHAT WE ARE DELIBERATELY NOT DOING

- **Not chasing `ai automation for small business`** (KD 38) or `revenue leakage` (KD 34). Unwinnable at authority 6.
- **Not optimising CTR on the zero-click page-1 queries.** All have **CPC $0.00** and half don't exist in Semrush's database — strong evidence they are LLM-generated, not human. Optimising them yields nothing.
- **Not building programmatic pages.** No evidence any would have unique intent.
- **Not buying links.**

---

## MEASUREMENT

Baseline frozen 2026-08-29: **7 clicks, 3,314 impr, pos 30.9, Authority 6, 13 US keywords in Semrush, none top-20.**

Review at 30/60/90 days on: clicks, impressions on *targeted* keywords only, position on the named targets, authority score, referring domains. **Not** total impressions — they rose 516 last period while clicks fell.

**No claim that any change "will rank."** Every item is a hypothesis with a measurement date.

---

## SEMRUSH USAGE LOG

| Operation | Bought |
|---|---|
| `phrase_these` ×5 | Difficulty + CPC across our queries and 3 clusters — **the entire strategy** |
| `phrase_organic` ×2 | SERP composition (guides, not service pages) + real competitor identity |
| `phrase_related` ×4 (KD/CPC-filtered) | **The winnable keyword set above** |
| `resource_organic` | We hold 13 US keywords, none top-20 |
| `backlinks_comparison` | **Authority 6 vs 31–42** — sets the timeline |
| Discovery/schema calls | Free — toolkit mapping |

**~13 billed calls.** Skipped as non-decision-changing: broad keyword exploration (GSC gives 186 real queries free), position tracking (nothing shipped yet), paid-search reports, site audit.

**Remaining justified spend:** `domain_domains` keyword gap vs SyncMatters/Faye/SingleStone · `backlinks_refdomains` on one competitor before the linkable-asset work.

---

## FABLE REVIEW — corrections applied 2026-08-29

Consulted on the retarget decision. Four changes to the plan:

**1. Retarget, do not create a second CRM page.** At Authority 6 there is no equity to split. Google has *already* classified the existing page into the migration neighbourhood — that classification is the only asset we hold. Two pages on one topic at this authority = both rank nowhere. URL kept, no 301.

**2. Losing the 22 long-tail positions is real and irrelevant** — zero clicks, $0.00 CPC, half absent from Semrush. *But do not fully write off the LLM signal:* those fanout queries suggest AI assistants pull this page into grounding. **Zero clicks from AI-fanout is expected — the click goes to the AI answer.** So the rewrite must preserve **citability**: clear entity statements ("Delta Labs AI is a CRM migration service that…"), concrete numbers. That value is real and GSC cannot measure it.

**3. Why KD 17 is winnable at Authority 6:** Reddit and Facebook ranking page 1 means Google is **backfilling with UGC because the results are thin** — a soft SERP. That is the actual reason this cluster is reachable, not optimism.

**4. TWO pages total, not four.** Guide (KD 17/11 head terms + checklist) + tools-comparison page (KD 1–4). `crm migration service` (KD 10) = a CTA section, **not a page**. `data migration checklist` = a section with a downloadable asset, **not a page**. Everything else stays a section.

**Timeline (Fable):** tools page **4–8 weeks**; guide **2–4 months** plus pointing a handful of our 92 referring domains at it, using the checklist as the outreach hook.

### ⚠️ Separate flag worth its own decision
**This cluster is the strongest paid-search arbitrage signal on the site: $14–20 CPC at KD 1–4.** People pay ~$20/click for `crm data migration utility`. A small exact-match search-ads test would validate whether this traffic converts to migration-service leads **before** committing 2–4 months to the organic climb. Consistent with `distribution-is-the-constraint` in memory. **Not actioned — flagged for CEO decision.**
