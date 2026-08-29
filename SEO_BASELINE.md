# SEO_BASELINE.md — deltalabsai.com
**Compiled 2026-08-29. Data window 2026-07-29 → 2026-08-26 (GSC, 28d).**
**Semrush units spent producing this document: ZERO.** All findings below come from Google Search Console (free, service-account) and direct inspection of the live site + repo.

Every claim is labelled **VERIFIED** (measured this session), **INFERRED**, or **UNVERIFIED**.

---

## 1. CURRENT ORGANIC FOOTPRINT — VERIFIED

| Metric | Current 28d | Previous 28d | Delta |
|---|---|---|---|
| Clicks | **7** | 10 | **−3** |
| Impressions | **3,314** | 2,798 | **+516** |
| CTR | **0.21%** | 0.36% | −0.15pp |
| Avg position | **30.9** | 26.3 | **−4.6 (worse)** |
| Queries with impressions | **186** | — | — |
| Queries with ≥1 click | **2** | — | — |

**Reading:** impressions are growing while position and clicks fall. That is the signature of adding pages that rank poorly, dragging the average down. Growth in impressions here is **not** progress.

Longer arc (VERIFIED from prior audits): Jun 11 baseline 5 clicks / 1,510 impr / pos 34.6 → Jul 9: 10 clicks / 3,587 impr / pos 21.3 → **now 7 clicks / 3,314 impr / pos 30.9**. Position gains from the June fixes have partly reversed.

---

## 2. THE SINGLE BIGGEST FINDING — page-1 rankings earning zero clicks

**460 impressions sit at position ≤10 and produce ZERO clicks. VERIFIED.**

| Pos | Impr | Query | Landing page |
|---|---|---|---|
| 8.8 | **322** | local business ai automation quick wins same week revenue | /blog/ai-automations-small-business |
| 4.4 | 23 | best crm migration company for moving off a messy spreadsheet | /blog/crm-service-businesses |
| 5.3 | 16 | best crm for a team moving off spreadsheets | /blog/crm-service-businesses |
| 8.8 | 16 | identify a us-based ai consultant for industrial automation | /blog/how-to-choose-ai-consultant |
| 9.9 | 15 | how to migrate customer, order, and pricing data from spreadsheets | /blog/crm-service-businesses |
| 7.9 | 14 | 10 signs your business could benefit from an ai process consultant | /blog/how-to-choose-ai-consultant |
| 4.7 | 6 | como vice-presidente de vendas, qual é o melhor crm para empresas | /blog/crm-service-businesses |

**This is the highest-leverage problem on the site.** The site already ranks on page 1 for 13+ queries and converts none of them.

### ⚠️ CRITICAL UNVERIFIED CAVEAT — read before acting on any of this
These queries do not read like human searches. *"como vice-presidente de vendas, qual é o melhor crm para empresas"*, *"most trusted desktop database tools by operations managers"*, *"identify a us-based ai consultant for industrial automation"* — these read like **LLM-generated prompts**.

**Hypothesis (UNVERIFIED): a large share of these impressions are AI-assistant / AI-Overview surfaces, not human search demand.** If true, zero CTR is expected and optimising titles will not fix it — the correct play would be citation-optimisation (GEO), not CTR optimisation.

**This is the most important unknown on the site and must be resolved before spending effort on CTR work.** Resolvable free via GSC `searchAppearance` dimension and GA4 landing-page sessions.

---

## 3. THE HEAD-TERM ANCHOR — VERIFIED

`/blog/ai-automations-small-business` = **1,517 impressions (46% of all site impressions), position 41.2, ZERO clicks.**
Query `ai automation for small business` = **522 impressions at position 49.0, zero clicks.**

Prior audit recorded this page at 57% of impressions / pos 51. It has improved slightly and still returns nothing. **It is the single largest drag on site-average position.**

Note the page is doing two incompatible jobs: pos 41 for the head term *and* pos 8.8 for a long conversational query (322 impr).

---

## 4. STRONGEST COHERENT ASSET — the CRM-migration cluster — VERIFIED

**22 queries, 144 impressions, 0 clicks, most at position 4–11, nearly all landing on ONE page** (`/blog/crm-service-businesses`, 192 impr, pos 9.8).

Sample: best crm migration company for moving off a messy spreadsheet (4.4) · best crm for a team moving off spreadsheets (5.3) · recommend a crm for a growing sales team moving off spreadsheets (6.4) · what should a freight company look for in a crm (7.0) · most trusted desktop database tools by operations managers (8.6) · how to migrate customer/order/pricing data from spreadsheets (9.9) · industry-standard process for a crm migration (10.8) · Portuguese variant (4.7).

**This is genuine topical authority on a commercially relevant problem, and there is no commercial destination page for it.** All demand lands on a blog post.

Secondary clusters (VERIFIED): digital transformation roadmap (`dx roadmap` 8.4, `digital transformation roadmap software` 18.2, `what is a digital enterprise transformation roadmap` 19.8 → /blog/digital-transformation-roadmap, 234 impr pos 26.7) · ecommerce revenue leakage (14.3, 19.8 → /blog/ecommerce-revenue-leakage-fix, 105 impr pos 15.1).

**52 queries total sit in striking distance (pos 4–20). VERIFIED.**

---

## 5. TECHNICAL SEO BASELINE — VERIFIED

**Healthy:**
- robots.txt correct, `Allow: /`, sitemap declared
- sitemap.xml 200, **61 URLs, 60 return 200**
- Canonicals present and self-referential on every page checked
- Titles present on all pages checked, 66–93 chars, keyword-led, brand-suffixed
- Meta descriptions present, 149–192 chars
- H1 present on every page checked
- **Schema is rich** — Organization, WebSite, BreadcrumbList, BlogPosting, FAQPage, Service, ProfessionalService, OfferCatalog, Person, ImageObject
- 38 app routes; 5–14 H2s per page

**Defects found:**
1. **`/about` returns 404 but is listed in sitemap.xml and exists as a route in the codebase.** VERIFIED. Only broken sitemap URL.
2. **`/solutions` H1 reads `"AI automation forevery small business"` — missing space.** VERIFIED. User-visible and crawler-visible.
3. Only **1 markdown file** in `/blog` source dir vs many live blog routes — content pipeline is split across sources. INFERRED, worth confirming before any content work.

**Not yet measured (UNVERIFIED):** Core Web Vitals / LCP / CLS / INP, JS bundle size, image optimisation, mobile rendering, redirect chains, www/non-www consistency beyond the 200 check.

---

## 6. BRAND ENTITY — VERIFIED

`delta labs` = position 12.7 (39 impr, 0 clicks). `delta labs ai` = 6.9 (10 impr, 0 clicks, landing on /blog rather than homepage). `delta lab dubai` = 5.1.

**The site cannot rank page-1 for its own name, and brand queries land on /blog instead of the homepage.** Prior audit recorded "delta labs" at pos 21 — improved, still failing.

---

## 7. CONVERSION / MEASUREMENT ALIGNMENT

**GA4 keyEvents = 0** (from prior audit, 2026-06). No conversion tracking configured — diagnostic starts/completions and CTA clicks are not GA4 key events. **We cannot currently measure whether any organic visitor converts.** UNVERIFIED whether this has since been fixed.

Homepage is the only page earning clicks: 259 impr, 4 clicks, pos 9.9 — **1.5% CTR at position ~10, which is itself far below a normal ~10–15% for that position.** Consistent with the AI-surface hypothesis in §2.

---

## 8. HIGHEST-PRIORITY OPPORTUNITIES (evidence-ranked, not yet a roadmap)

| # | Opportunity | Evidence | Confidence |
|---|---|---|---|
| 1 | **Resolve the AI-surface question** — are the 460 zero-click page-1 impressions human or machine? | §2 | Blocks everything else |
| 2 | **CRM-migration cluster → commercial destination + cluster build** | 22 queries, pos 4–11, no service page | VERIFIED demand, INFERRED value |
| 3 | **Fix /about 404 and /solutions H1** | VERIFIED defects | Certain, trivial effort |
| 4 | **Decide the fate of /blog/ai-automations-small-business** — 46% of impressions, pos 41, zero clicks | VERIFIED | High |
| 5 | **Brand entity** — own "delta labs ai", route brand queries to homepage | VERIFIED | Medium |
| 6 | **Restore conversion tracking** — otherwise no SEO work is measurable | Prior audit | Certain |
| 7 | Digital-transformation-roadmap and ecommerce-revenue-leakage clusters | VERIFIED striking distance | Medium |

---

## 9. SEMRUSH USAGE PLAN — what data would change a decision

| Semrush operation | Decision it would change | Priority |
|---|---|---|
| Organic competitors for deltalabsai.com | Who actually competes for the CRM-migration cluster — we do not know this | **P0** |
| Keyword Gap vs 3 confirmed competitors, filtered to CRM-migration + AI-consulting | Whether the cluster has commercial head terms we are missing | **P1** |
| SERP analysis on 5–8 cluster keywords | Whether Google wants a service page or a guide — determines page type | **P1** |
| Domain overview / authority indicators of competitors | Whether the cluster is winnable at our authority | P2 |
| Backlink gap | Only after a linkable asset is chosen | P3 |
| Keyword Magic broad exploration | **Not justified** — we already have 186 real queries of our own | **SKIP** |
| Position tracking | Not until changes are live | SKIP for now |

**Discipline:** GSC gives us real ranking data for our own site free. Semrush is only needed for what GSC cannot see — **competitors and SERP composition.**

---

## 10. REMAINING UNKNOWNS

1. **Whether page-1 impressions are human or AI-surface.** Highest priority. Free to resolve.
2. Whether GA4 conversion tracking was ever fixed.
3. Core Web Vitals / performance — unmeasured.
4. Who the actual organic competitors are — requires Semrush.
5. Whether Google wants a service page or a guide for the CRM cluster — requires SERP inspection.
6. Why blog content exists in two places (1 md file vs many live routes).
7. Whether the striking-distance queries carry any commercial intent, or are informational-only.

---

## 11. WHAT I HAVE NOT DONE

No page modified. No content written. No Semrush unit spent. No competitor named without evidence. No traffic, ranking or CPC figure invented.
