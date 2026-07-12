import AnswerLayout from "../AnswerLayout";

const TITLE = "How to Automate HVAC Invoicing (Step-by-Step)";
const DESCRIPTION =
  "A practical walkthrough for HVAC and home service businesses on automating invoicing — from job completion to payment, without hiring an office admin.";
const URL = "https://deltalabsai.com/answers/hvac-invoicing-automation";

export const metadata = {
  title: `${TITLE} | Delta Labs AI`,
  description: DESCRIPTION,
  keywords: [
    "automate HVAC invoicing",
    "HVAC invoicing software",
    "HVAC billing automation",
    "automated invoicing for HVAC business",
    "HVAC business software",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Delta Labs AI",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faqs = [
  {
    q: "Do I need to switch invoicing software to automate this?",
    a: "No. Most automation sits on top of whatever you already use — QuickBooks, Zoho, or even a spreadsheet — and triggers the invoice from the job status change instead of a manual step.",
  },
  {
    q: "What if a customer disputes the invoice after it's auto-sent?",
    a: "Build in a short delay (10-15 minutes) after job completion before the invoice fires, so your technician has a window to correct the job notes or line items before anything goes out.",
  },
  {
    q: "How much does this typically cost to set up?",
    a: "For a single-technician or small crew HVAC business, the tools involved (job scheduler, invoicing software, connector) usually run $30-80/month combined. Setup is the real cost — a few hours getting the trigger and templates right.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <AnswerLayout
      eyebrow="Home Services / HVAC"
      title={TITLE}
      intro="If your technicians finish a job and invoicing happens whenever someone gets around to it at the end of the day, you're leaking cash flow. Here's how to make invoicing fire automatically the moment a job is marked done, with no extra headcount."
      jsonLd={jsonLd}
      sections={[
        {
          heading: "Why manual invoicing costs HVAC businesses more than it looks like",
          paragraphs: [
            "Most HVAC shops invoice in batches, usually at the end of the day or week, from a technician's handwritten notes or a memory of what parts were used. Two things go wrong here consistently: line items get missed (a part, a trip charge, an after-hours fee), and the delay between job and invoice stretches payment terms without anyone deciding that on purpose.",
            "A job invoiced same-day gets paid faster than one invoiced three days later, simply because the customer still remembers the work clearly and the amount is fresh in context. Automating the trigger closes that gap without you having to remember to do it.",
          ],
        },
        {
          heading: "The automation, step by step",
          list: [
            "Job scheduling tool marks the job as \"Complete\" (this should already be happening if you dispatch digitally — ServiceTitan, Housecall Pro, Jobber, or similar).",
            "That status change triggers a connector (Zapier, Make, or a native integration if your tools support it) that pulls the job's line items — labor, parts, trip charge — into a pre-built invoice template.",
            "The invoice auto-populates with the customer's saved details and sends via email and SMS with a pay-now link.",
            "A follow-up reminder fires automatically at day 3 and day 7 if unpaid, without anyone having to track who owes what.",
            "Payment received closes the loop and logs against the customer record for next time.",
          ],
        },
        {
          heading: "What to watch for before you turn it on",
          paragraphs: [
            "Get your job templates right first. If your line items are inconsistent (different techs recording parts differently), the automation will just make bad invoicing happen faster. Standardize the job-completion form before automating what comes after it.",
            "Also build in the short review delay mentioned in the FAQ below — a fully instant, no-human-check invoice is efficient but occasionally wrong, and wrong invoices sent instantly annoy customers more than slow correct ones.",
          ],
        },
      ]}
      faqs={faqs}
    />
  );
}
