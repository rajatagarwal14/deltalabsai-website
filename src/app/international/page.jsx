import { Source_Serif_4, Inter } from "next/font/google";

// Page for people who receive a direct note from Delta Labs AI from the UK, Ireland or the UAE.
// Rule for every line below: it must be true today. No client counts by industry, no result
// statistics, no named clients, no products we are not offering abroad. Change a claim only when
// there is evidence for it. The before/after drawing is labelled as an illustration, not a result.
//
// Design notes (ui-ux-pro-max): spacious minimalism, one accent, semantic before/after colours used
// only in the drawing, serif headings for trust and sans body for reading, 48px targets, visible focus
// rings, native <details> for the FAQ, motion limited to a short hero fade and always reduced-motion safe.
// Fonts are self-hosted by next/font at build time, so visitors make no request to Google (UK/EU privacy).

const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], display: "swap", variable: "--intl-serif" });
const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--intl-sans" });

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";
const EMAIL = "neil@mail.deltalabsai.com";

const Icon = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

const EXAMPLES = [
  { t: "Typed twice", d: "The same details go into your CRM and then again into a proposal, an invoice or a booking tool.", i: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></> },
  { t: "Chasing documents", d: "Client documents are chased by email, and a spreadsheet tracks who has sent what.", i: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 14l2 2 4-4" /></> },
  { t: "A report built by hand", d: "Someone assembles it every morning from two or three systems.", i: <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M2 20h20" /></> },
  { t: "Enquiries that wait", d: "They arrive by phone or email and wait for someone to put them in the right place.", i: <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1z" /></> },
  { t: "A tracker in one file", d: "A deadline tracker lives in one person's Excel file.", i: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18" /><path d="M8 2v4" /><path d="M16 2v4" /><path d="M8 14h3" /></> },
];

const STEPS = [
  { h: "A call", b: "Thirty minutes. You describe the task and show us where it happens. We tell you what we see and whether it looks like a two-week job. The outline confirms it." },
  { h: "A one-page outline", b: "What we will build, what done looks like, the price and the payment terms. Nothing starts until you have agreed it in writing." },
  { h: "The build", b: "We build it inside the tools you already use. You keep access to everything." },
  { h: "A hand-over document", b: "A short written guide to how it works and what to do if something stops." },
  { h: "A training call", b: "One session with the people who will use it." },
];

const NEED = [
  "Access to the tools involved, which you can withdraw at any time.",
  "One person who can answer questions during the two weeks.",
  "A decision on the outline before the work starts.",
];

const NOT_DO = [
  "Anything that files returns or submits documents to a tax authority or regulator.",
  "Anything that stores passports or other identity documents.",
  "Anything that handles health records.",
  "Sending marketing messages on your behalf.",
];

const FAQ = [
  { q: "Do you need WhatsApp or another messaging app?", a: "No. This service does not depend on any messaging app. We work in the tools you already use, such as spreadsheets, your CRM, your accounting or booking software, and email." },
  { q: "What if the task is bigger than two weeks?", a: "We say so on the call or in the outline, and we do not start. We would rather agree a smaller first piece with you than promise something we cannot finish." },
  { q: "How is the price set?", a: "It is written in the outline, before any work starts, together with the payment terms. You agree it before we begin." },
  { q: "Can you work with the tools we already use?", a: "Tell us which ones. We will say honestly, on the call, whether we can work with them. If we cannot, we will say so and not start." },
  { q: "Where are you based, and who is behind this?", a: "We are a small studio in India. Delta Labs AI is run by A.G. Ventures, India." },
];

const CSS = `
.intl{--ink:#0b1220;--ink2:#334155;--muted:#5b6678;--line:#e2e8f0;--soft:#f6f8fb;--accent:#4338ca;--accent-hover:#3730a3;--before:#b45309;--after:#0f766e;
  font-family:var(--intl-sans),-apple-system,'Segoe UI',sans-serif;color:var(--ink2);background:#fff;line-height:1.65;-webkit-font-smoothing:antialiased}
.intl *{box-sizing:border-box}
.intl a{color:inherit}
.intl .wrap{max-width:1080px;margin:0 auto;padding:0 24px}
.intl .narrow{max-width:720px}
.intl h1,.intl h2,.intl h3{font-family:var(--intl-serif),Georgia,serif;color:var(--ink);font-weight:600;letter-spacing:-0.02em;margin:0}
.intl h1{font-size:clamp(2.4rem,5.6vw,4rem)!important;line-height:1.06!important}
.intl h2{font-size:clamp(1.6rem,3vw,2.15rem)!important;line-height:1.18!important;margin-bottom:18px!important}
.intl h3{font-size:1.15rem!important;line-height:1.3!important}
.intl p{margin:0 0 16px}
.intl .skip{position:absolute;left:-9999px;top:8px;background:var(--ink);color:#fff;padding:10px 16px;border-radius:8px;z-index:100}
.intl .skip:focus{left:16px}
.intl :focus-visible{outline:3px solid #818cf8;outline-offset:3px;border-radius:6px}
.intl nav.top{border-bottom:1px solid var(--line)}
.intl nav.top .wrap{max-width:1080px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;min-height:64px;gap:4px 16px}
.intl .brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);font-weight:700;letter-spacing:-0.02em}
.intl .brand .mark{color:var(--accent);font-size:20px}
.intl .mail{font-size:14px;color:var(--muted);text-decoration:none;padding:12px 0}
.intl .mail:hover{color:var(--ink);text-decoration:underline}
.intl .hero{padding:72px 0 56px}
.intl .hero-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:56px;align-items:center}
.intl .eyebrow{font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin:0 0 16px}
.intl .lede{font-size:1.2rem;color:var(--ink2);max-width:34em;margin:22px 0 0}
.intl .cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px}
.intl .btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 24px;border-radius:10px;font-weight:600;font-size:16px;text-decoration:none;cursor:pointer;transition:background-color .18s ease,border-color .18s ease,color .18s ease,box-shadow .18s ease}
.intl .btn-primary{background:var(--accent);color:#fff}
.intl .btn-primary:hover{background:var(--accent-hover)}
.intl .btn-ghost{border:1px solid #cbd5e1;color:var(--ink);background:#fff}
.intl .btn-ghost:hover{border-color:var(--ink);}
.intl .fade{animation:intl-fade .32s ease-out both}
.intl .fade.d1{animation-delay:.06s}.intl .fade.d2{animation-delay:.12s}.intl .fade.d3{animation-delay:.18s}
@keyframes intl-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.intl .flowcard{border:1px solid var(--line);border-radius:16px;background:var(--soft);padding:24px}
.intl .flowrow+.flowrow{margin-top:22px;padding-top:22px;border-top:1px solid var(--line)}
.intl .flowtag{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:12px}
.intl .tag-before{color:var(--before)}.intl .tag-after{color:var(--after)}
.intl .chips{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.intl .chip{background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:8px 12px;font-size:14px;font-weight:600;color:var(--ink);line-height:1.2}
.intl .arrow{display:inline-flex;flex-direction:column;align-items:center;font-size:12px;line-height:1.2;color:var(--muted);min-width:56px;text-align:center}
.intl .arrow svg{display:block}
.intl .arrow .av{display:none}
.intl .arrow.b{color:var(--before)}.intl .arrow.a{color:var(--after)}
.intl .fan{display:flex;flex-direction:column;gap:8px}
.intl .flowcap{font-size:13px;color:var(--muted);margin:18px 0 0}
.intl section.block{padding:56px 0;border-top:1px solid var(--line)}
.intl .kinds{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:28px 32px;margin-top:28px}
.intl .kind{display:grid;grid-template-columns:44px 1fr;gap:14px}
.intl .kind .ic{width:44px;height:44px;border-radius:10px;background:var(--soft);border:1px solid var(--line);display:inline-flex;align-items:center;justify-content:center;color:var(--accent)}
.intl .kind h3{margin-bottom:4px}
.intl .kind p{margin:0;font-size:16px;color:var(--ink2)}
.intl ol.steps{list-style:none;margin:28px 0 0;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:24px;counter-reset:s}
.intl ol.steps li{position:relative;padding-top:18px;border-top:2px solid var(--ink)}
.intl ol.steps li:before{counter-increment:s;content:counter(s);display:block;font-family:var(--intl-serif),Georgia,serif;font-size:1.6rem;font-weight:600;color:var(--ink);margin-bottom:6px}
.intl ol.steps h3{margin-bottom:6px}
.intl ol.steps p{font-size:15.5px;margin:0}
.intl .two{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:40px}
.intl ul.ticks{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.intl ul.ticks li{display:grid;grid-template-columns:22px 1fr;gap:12px;align-items:start}
.intl ul.ticks svg{margin-top:3px}
.intl .ok{color:var(--after)}.intl .no{color:#64748b}
.intl .today{background:var(--soft);border:1px solid var(--line);border-radius:16px;padding:32px}
.intl .today p{font-family:var(--intl-serif),Georgia,serif;font-size:1.3rem;line-height:1.55;color:var(--ink);margin:0}
.intl details{border-top:1px solid var(--line)}
.intl details:last-of-type{border-bottom:1px solid var(--line)}
.intl summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:56px;padding:12px 0;font-weight:600;color:var(--ink);font-size:17px}
.intl summary::-webkit-details-marker{display:none}
.intl summary svg{flex:none;transition:transform .2s ease;color:var(--muted)}
.intl details[open] summary svg{transform:rotate(180deg)}
.intl details p{padding:0 0 18px;margin:0;max-width:640px}
.intl .endcta{background:var(--ink);color:#e2e8f0;padding:64px 0}
.intl .endcta h2{color:#fff}
.intl .endcta p{color:#cbd5e1}
.intl .endcta .btn-primary{background:#fff;color:var(--ink)}
.intl .endcta .btn-primary:hover{background:#e2e8f0}
.intl .endcta .btn-ghost{background:transparent;color:#fff;border-color:#64748b}
.intl .endcta .btn-ghost:hover{border-color:#fff}
.intl footer.foot{padding:24px 0 40px;font-size:14px;color:var(--muted)}
.intl footer.foot .wrap{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.intl footer.foot a{text-decoration:underline;padding:12px 4px}
@media (max-width:980px){
  .intl .hero{padding:48px 0 40px}
  .intl .hero-grid{grid-template-columns:1fr;gap:36px}
  .intl ol.steps{grid-template-columns:1fr;gap:22px}
  .intl ol.steps li{display:grid;grid-template-columns:36px 1fr;column-gap:12px;padding-top:16px}
  .intl ol.steps li:before{margin:0;grid-row:1 / span 2}
}
@media (max-width:640px){
  .intl .chips{flex-direction:column;align-items:flex-start;gap:6px}
  .intl .arrow{flex-direction:row;gap:10px;min-width:0;margin-left:22px}
  .intl .arrow .ah{display:none}
  .intl .arrow .av{display:block}
}
@media (max-width:768px){
  .intl .arrow,.intl .chip,.intl .flowcap,.intl .flowtag,.intl .eyebrow,.intl .mail{font-size:inherit}
  .intl .flowtag{font-size:12px!important}
  .intl p,.intl li{font-size:inherit}
  .intl .lede{font-size:1.1rem!important}
  .intl .today{padding:24px}
  .intl .today p{font-size:1.15rem!important}
  .intl .cta .btn{flex:1 1 100%}
}
@media (prefers-reduced-motion:reduce){
  .intl .fade{animation:none}
  .intl .btn,.intl summary svg{transition:none}
}
`;

const Arrow = ({ tone, label }) => (
  <span className={`arrow ${tone}`}>
    <svg className="ah" width="40" height="14" viewBox="0 0 40 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M2 7h34" /><path d="M30 2l6 5-6 5" /></svg>
    <svg className="av" width="14" height="28" viewBox="0 0 14 28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M7 2v22" /><path d="M2 18l5 6 5-6" /></svg>
    <span>{label}</span>
  </span>
);

export default function InternationalPage() {
  return (
    <main className={`intl ${serif.variable} ${sans.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <a className="skip" href="#content">Skip to content</a>

      <nav className="top" aria-label="Main">
        <div className="wrap">
          <a href="/" className="brand"><span className="mark" aria-hidden="true">{"Δ"}</span>Delta Labs AI</a>
          <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </nav>

      <div id="content">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow fade">A small studio in India</p>
              <h1 className="fade d1">We fix one manual task at a time.</h1>
              <p className="lede fade d2">
                Pick one repeated task that costs your team time. If it fits a two-week scope, we fix it for a fixed price, inside the tools you already use. Then you decide whether you want us to do anything else.
              </p>
              <div className="cta fade d3">
                <a className="btn btn-primary" href={CAL} target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>
                <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>Write to us</a>
              </div>
            </div>

            <figure className="flowcard fade d3" style={{ margin: 0 }} aria-label="Drawing of one common task before and after the fix">
              <div className="flowrow">
                <span className="flowtag tag-before">Before</span>
                <div className="chips">
                  <span className="chip">CRM</span>
                  <Arrow tone="b" label="typed again" />
                  <span className="chip">Proposal</span>
                  <Arrow tone="b" label="typed again" />
                  <span className="chip">Invoice</span>
                </div>
              </div>
              <div className="flowrow">
                <span className="flowtag tag-after">After</span>
                <div className="chips">
                  <span className="chip">CRM</span>
                  <Arrow tone="a" label="fills in" />
                  <span className="fan"><span className="chip">Proposal</span><span className="chip">Invoice</span></span>
                </div>
              </div>
              <figcaption className="flowcap">One common task, drawn simply. An illustration, not a client result.</figcaption>
            </figure>
          </div>
        </section>

        <section className="block" aria-labelledby="kinds-h">
          <div className="wrap">
            <h2 id="kinds-h">The kind of task we mean</h2>
            <div className="kinds">
              {EXAMPLES.map((x) => (
                <div className="kind" key={x.t}>
                  <span className="ic"><Icon>{x.i}</Icon></span>
                  <div>
                    <h3>{x.t}</h3>
                    <p>{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 28, color: "var(--muted)" }}>These are examples, not promises about your business. We check on the call whether your task is a two-week job.</p>
          </div>
        </section>

        <section className="block" aria-labelledby="how-h">
          <div className="wrap">
            <h2 id="how-h">How it works</h2>
            <ol className="steps">
              {STEPS.map((s) => (
                <li key={s.h}>
                  <h3>{s.h}</h3>
                  <p>{s.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="block" aria-label="What we need and what we do not do">
          <div className="wrap two">
            <div>
              <h2>What we need from you</h2>
              <ul className="ticks">
                {NEED.map((x) => (
                  <li key={x}>
                    <svg className="ok" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>What this service does not cover</h2>
              <ul className="ticks">
                {NOT_DO.map((x) => (
                  <li key={x}>
                    <svg className="no" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M6 12h12" /></svg>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="block" aria-labelledby="today-h">
          <div className="wrap narrow" style={{ maxWidth: 1080 }}>
            <h2 id="today-h">Where we are today</h2>
            <div className="today">
              <p>
                We have two clients so far, both in India. We are new to the UK, Ireland and the UAE and have no case studies there yet. That is why we start small: you judge one piece of work before you decide anything bigger, and nothing is built before you have agreed the outline and the price in writing.
              </p>
            </div>
          </div>
        </section>

        <section className="block" aria-labelledby="faq-h">
          <div className="wrap narrow">
            <h2 id="faq-h">Questions</h2>
            <div>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>
                    <span>{f.q}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="endcta" aria-labelledby="end-h">
          <div className="wrap">
            <h2 id="end-h">Tell us the task</h2>
            <p>Describe it in a few lines, or book a call and show us.</p>
            <div className="cta">
              <a className="btn btn-primary" href={CAL} target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>
              <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </section>
      </div>

      <footer className="foot">
        <div className="wrap">
          <span>Delta Labs AI is run by A.G. Ventures, India.</span>
          <span><a href="/privacy">Privacy</a> <a href="/terms">Terms</a></span>
        </div>
      </footer>
    </main>
  );
}
