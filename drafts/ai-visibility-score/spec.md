# AI Visibility Score — Free Tool Functional Spec (v1, NOT published)

> DRAFT — internal review only. Not built, not deployed. See [DELA-3924](/DELA/issues/DELA-3924).

## Input
Business name, city, category (dentist / gym / salon / restaurant / etc.), optional competitor name.

## Process (pilot, manual, $0 cost)
Operator runs 3 fixed prompts per AI engine, once per business, via each engine's free chat UI — no paid API calls:
1. "Best [category] in [city]"
2. "Top-rated [category] near [neighborhood/city]"
3. "[category] recommendations in [city]"

Engines checked: ChatGPT (free tier), Perplexity (free), Gemini (free). Record whether the business appears in the top 5, top 10, or not at all.

## SCORING (0-100)
Each engine contributes up to 33.3 points. Top-3 mention = full 33.3 pts. Top-10 mention = 16.5 pts. Any mention = 8 pts. No mention = 0 pts. Sum across 3 engines, round, cap at 100.

## Output
Verdict bands — 0-30 "Invisible to AI," 31-65 "Barely Visible," 66-100 "AI-Recommended." Shareable 1080x1080 PNG score card (business name, city, score, verdict, watermark, link). Full report behind email capture: which engines miss them, which competitor AI mentioned instead, 3 concrete fixes.

## v2 (future, needs separate budget approval — NOT in this cycle)
Automate via OpenAI/Perplexity/Gemini APIs for instant self-serve results. Est. cost ~$20-40/mo at low volume.
