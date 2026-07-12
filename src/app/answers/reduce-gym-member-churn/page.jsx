import AnswerLayout from "../AnswerLayout";

const TITLE = "How to Reduce Gym Member Churn With Automation";
const DESCRIPTION =
  "A practical guide for small gyms and studios on using automation — not more staff — to catch at-risk members before they cancel and win back the ones who already have.";
const URL = "https://deltalabsai.com/answers/reduce-gym-member-churn";

export const metadata = {
  title: `${TITLE} | Delta Labs AI`,
  description: DESCRIPTION,
  keywords: [
    "reduce gym member churn",
    "gym churn automation",
    "gym member retention software",
    "fitness studio automation",
    "gym membership cancellation prevention",
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
    q: "What counts as an 'at-risk' member?",
    a: "The single strongest signal for small gyms is visit frequency dropping — someone who came 3x/week for a month and drops to zero for two weeks is far more likely to cancel than someone who was always a once-a-week visitor. Track the drop, not the absolute number.",
  },
  {
    q: "Isn't a phone call more effective than an automated message?",
    a: "A call is more effective per member, but automation lets you reach every at-risk member instead of the few your front desk has time to call. Use automation as the first touch and reserve manual calls for members who don't respond or who your team already knows personally.",
  },
  {
    q: "Will an automated check-in message feel impersonal?",
    a: "Only if it's generic. A message referencing their actual class history (\"haven't seen you in HIIT since the 12th\") reads as attentive, not automated, even though it's triggered by a rule rather than typed by a person.",
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
      eyebrow="Fitness / Wellness"
      title={TITLE}
      intro="By the time a member cancels, it's too late — the decision was made weeks earlier when they quietly stopped showing up. Automation's job here isn't to save the member who already left, it's to flag the drop-off early enough that someone can still do something about it."
      jsonLd={jsonLd}
      sections={[
        {
          heading: "The real churn signal: attendance drop, not membership length",
          paragraphs: [
            "Most gyms track churn as a lagging indicator — how many people cancelled this month. That's useless for prevention because the decision already happened. The leading indicator is attendance frequency compared to a member's own baseline. A member who visits less than half their usual rate for 10-14 days is at meaningfully higher risk than one whose visits stayed steady.",
            "This is easy to track automatically if your check-in system (class booking app, front-desk scanner, or access control) logs visits with a timestamp — most already do. The automation layer just needs to compare recent frequency against the member's trailing average and flag the drop.",
          ],
        },
        {
          heading: "The automation sequence that actually moves the needle",
          list: [
            "Day 10-14 of reduced attendance: automated WhatsApp/SMS check-in referencing their usual class or trainer by name — not a generic \"we miss you.\"",
            "No response after 3 days: a personal-feeling message from their usual trainer or coach (can be auto-drafted, but sent by a human, not fully automated) with a specific offer — a free session, a schedule change suggestion.",
            "If they do cancel: an automated win-back sequence at 30 and 90 days post-cancellation, timed to when people are most likely to reconsider (post-holidays, start of a new month), not a blanket weekly nag.",
            "Ongoing: automated milestone messages (10th visit, 3-month streak) that reinforce the habit before it breaks, which prevents the drop-off from happening in the first place.",
          ],
        },
        {
          heading: "Where small gyms get this wrong",
          paragraphs: [
            "The most common mistake is only automating the win-back after cancellation, which is the hardest and lowest-yield point to intervene. By then the member has already mentally exited. The higher-leverage automation is catching the attendance drop 2-3 weeks before they'd think to cancel, when a well-timed nudge still works.",
            "The second mistake is generic messaging. \"We miss you!\" blasts get ignored because they carry no information the member doesn't already have. Reference their actual class, trainer, or streak — this is what makes an automated message read as attentive rather than a mail-merge.",
          ],
        },
      ]}
      faqs={faqs}
    />
  );
}
