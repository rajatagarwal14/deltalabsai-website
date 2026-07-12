import AnswerLayout from "../AnswerLayout";

const TITLE = "Appointment Scheduling Automation for Non-Technical Business Owners";
const DESCRIPTION =
  "You don't need to be technical to automate appointment scheduling. A plain-language walkthrough for solo owners and small teams — no code, no IT person required.";
const URL = "https://deltalabsai.com/answers/appointment-scheduling-non-technical-owners";

export const metadata = {
  title: `${TITLE} | Delta Labs AI`,
  description: DESCRIPTION,
  keywords: [
    "appointment scheduling automation non-technical",
    "easy appointment scheduling software",
    "no-code scheduling automation",
    "automated booking for small business owners",
    "simple appointment automation",
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
    q: "I'm not technical at all — how long does this actually take to set up?",
    a: "For a single-location business with one calendar, expect 1-2 hours the first time you do it, most of which is deciding your available hours and writing your confirmation message. There's no code involved in any of the tools below.",
  },
  {
    q: "What if my customers still call instead of using the link?",
    a: "That's normal and fine — the automation doesn't replace the phone, it removes the back-and-forth for the customers who'd rather self-serve. You can still book manually into the same calendar when someone calls.",
  },
  {
    q: "Do I need a website to use a booking link?",
    a: "No. The booking link works standalone — you can put it in a WhatsApp Business auto-reply, an Instagram bio, a Google Business Profile, or a text message. A website makes it more discoverable but isn't required to start.",
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
      eyebrow="For Small Business Owners"
      title={TITLE}
      intro="If the phrase 'automation' makes you picture code, servers, or an IT budget you don't have — that's not what this is. Appointment scheduling automation for a small business is closer to filling out a form once than building anything. Here's exactly what it looks like."
      jsonLd={jsonLd}
      sections={[
        {
          heading: "What 'automated scheduling' actually means in practice",
          paragraphs: [
            "It means a customer sees your open time slots and books one themselves, without either of you sending a single email or text to coordinate the time. The calendar updates itself, a confirmation goes out automatically, and a reminder fires the day before — none of it requires you to be at a computer when it happens.",
            "You are not writing any code. You are filling in a setup screen once: your working hours, how long each appointment takes, and what message to send when someone books. The tool does the rest going forward.",
          ],
        },
        {
          heading: "The setup, in plain steps",
          list: [
            "Pick a scheduling tool with a free or cheap starting tier — Cal.com, Calendly, or a booking feature built into whatever CRM you already use.",
            "Connect it to the calendar you already check (Google Calendar or Outlook). This is usually a single 'Sign in with Google' click, not a technical integration.",
            "Set your available hours and appointment length once — this is a form, not code.",
            "Copy the booking link it generates and put it in your WhatsApp Business auto-reply, Instagram bio, email signature, and Google Business Profile.",
            "Turn on automatic confirmation and reminder messages (most tools have this as a checkbox, not a setting you build).",
          ],
        },
        {
          heading: "What breaks when non-technical owners try to do too much at once",
          paragraphs: [
            "The most common failure isn't technical difficulty — it's trying to automate five things simultaneously (booking, payments, reminders, follow-ups, reviews) in the first sitting and giving up halfway through. Set up booking and reminders first. That alone eliminates most of the back-and-forth. Add payment collection or review requests as a second pass once the first piece is working and you trust it.",
            "If at any point a step asks you to write code, edit an API key, or use a term like 'webhook' without explaining it in plain language, you're using the wrong tool for your situation — there are simpler options that don't require that.",
          ],
        },
      ]}
      faqs={faqs}
    />
  );
}
