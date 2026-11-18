
import AnswerLayout from "../AnswerLayout";

const TITLE = "Moving Off Spreadsheets to a CRM: What Goes Wrong and How to Plan It";
const DESCRIPTION =
  "Problems that can occur in a spreadsheet-to-CRM migration, a checklist to run before you pick a tool, and data-ownership questions to ask a migration partner.";
const URL = "https://deltalabsai.com/answers/moving-off-spreadsheets-to-crm";

export const metadata = {
  title: `${TITLE} | Delta Labs AI`,
  description: DESCRIPTION,
  keywords: [
    "spreadsheet to CRM migration",
    "CRM migration checklist",
    "best CRM for a team moving off spreadsheets",
    "what goes wrong in CRM migrations",
    "CRM data migration",
    "CRM data ownership and portability",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Delta Labs AI",
    type: "article",
    locale: "en_GB",
    images: [
      {
        url: "https://deltalabsai.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Labs AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// FAQ questions are the queries the site already ranks for. Answers are kept factual and hedged.
const faqs = [
  {
    q: "What goes wrong in CRM migrations?",
    a: "Common problems include columns whose meaning changed over time, duplicates that were deliberate, formula columns that arrive as fixed values, dates stored as text, and notes or attachments that get left behind. Writing down what each field means before the import helps you spot them.",
  },
  {
    q: "What's the best CRM for a team moving off spreadsheets?",
    a: "There is no single answer. Write down your pipeline stages, your required fields and the reports you need, then test each candidate against that list with the people who will use it daily.",
  },
  {
    q: "Do we have to clean the data before migrating?",
    a: "Cleaning before the import is usually easier than fixing records afterwards. At minimum, look at duplicates, the fields you plan to filter or report on, and what each status value means. Keep an untouched backup of the original.",
  },
  {
    q: "Can we keep using the spreadsheet while the migration happens?",
    a: "You can, but decide which system is authoritative for each record type and write the rule down. Two live copies with no stated source of truth can drift apart.",
  },
  {
    q: "What does CRM data migration for a regulated business involve?",
    a: "Rules depend on the sector and the country, so check with your own adviser. It helps to record where each field came from, who can see it, how long it is kept and how it is deleted on request, and to agree those points before mapping fields.",
  },
  {
    q: "What should we look for in a CRM migration tool with strong data ownership and portability?",
    a: "Check whether you can export every field you create, including custom fields, notes and attachments, in a documented format and without a support request. Also ask whether there is a published API, where the data is hosted, and who is named as its owner in the contract.",
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
      eyebrow="CRM Migration"
      title={TITLE}
      intro="A spreadsheet-to-CRM migration is easier to check when the meaning of each field, the source of truth and the reports you need are written down before any data moves. This page is a checklist, a list of problems that can occur, and questions to ask any vendor about your data."
      jsonLd={jsonLd}
      sections={[
        {
          heading: "A checklist to run before you pick a tool",
          paragraphs: [
            "Work through this first. It is tool-agnostic on purpose.",
          ],
          list: [
            "Export a full backup of the spreadsheet as-is, keep it untouched, and check that it opens and is complete before changing anything.",
            "List every field you use and write one sentence defining each. Flag the ones nobody can define and ask the people who use them; keep them in the backup and decide separately what to do with them.",
            "Write down your pipeline stages as they are, not as you wish they were.",
            "Name the reports the business will actually look at every week.",
            "Decide the deduplication rule for people and for companies, and have someone who knows the accounts check it against a sample.",
            "Pick the authoritative system for each record type and the date the spreadsheet goes read-only.",
            "Test the import on a sample that includes the awkward records, using de-identified or synthetic data in a protected test environment (keep any copy that holds real records inside your own approved systems), and compare field values and relationships as well as record counts before the full run.",
            "Confirm you can export everything back out of the new tool before you commit to it.",
          ],
        },
        {
          heading: "Problems that can occur",
          paragraphs: [
            "These are examples, not a complete list:",
          ],
          list: [
            "Undocumented meaning. A \"status\" column where \"pending\" meant two different things in two different years. An import can preserve the word and lose the distinction.",
            "Duplicates that were intentional. Two rows for one customer because they bought through different channels. Removing them blindly can break the history.",
            "Formula columns imported as values. A calculated number can arrive as a fixed value that no longer updates.",
            "Dates that are text. Mixed formats across regions can make reports look plausible and be wrong.",
            "Attachments and notes left behind. Deal context that lives in a comment thread or a linked folder can be dropped in the move.",
            "No owner for the switch. Without a named person deciding when the spreadsheet becomes read-only, the two copies can drift.",
          ],
        },
        {
          heading: "Data ownership and portability: questions to ask",
          paragraphs: [
            "Ask these before you sign: can you export every field you create, including custom fields, notes and attachments, in a documented format, yourself, without a support request? Is there a published API, or only a UI? Where is the data hosted, and who is named as its owner in the contract?",
          ],
        },
      ]}
      faqs={faqs}
    />
  );
}
