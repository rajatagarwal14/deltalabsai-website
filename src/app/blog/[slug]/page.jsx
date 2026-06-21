import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "../posts";
import BlogPostClient from "./client";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({
    slug,
  }));
}

// Parse date string like "February 18, 2026" to ISO format
function parseDate(dateStr) {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

// Estimate word count from sections
function estimateWordCount(sections) {
  let text = "";
  for (const s of sections) {
    if (s.heading) text += s.heading + " ";
    if (s.body) text += s.body + " ";
  }
  return text.split(/\s+/).filter(Boolean).length;
}

// Extract Q&A pairs from FAQ section bodies
// Expects format: **Q: question text?**\n\nanswer text
function extractFaqPairs(sections) {
  const pairs = [];
  for (const s of sections) {
    if (!s.heading || !s.heading.startsWith("FAQ:")) continue;
    const matches = [...s.body.matchAll(/\*\*Q:\s*(.+?)\*\*\s*\n+([\s\S]+?)(?=\n+\*\*Q:|$)/g)];
    for (const m of matches) {
      pairs.push({ question: m[1].trim(), answer: m[2].trim() });
    }
  }
  return pairs;
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `https://deltalabsai.com/blog/${post.slug}`;
  const publishedTime = parseDate(post.date);

  return {
    title: `${post.title} | Delta Labs AI`,
    description: post.description || post.subtitle,
    keywords: post.keywords || [],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description || post.subtitle,
      url,
      siteName: "Delta Labs AI",
      type: "article",
      locale: "en_US",
      publishedTime,
      modifiedTime: publishedTime,
      authors: ["Delta Labs AI"],
      section: post.category,
      tags: post.keywords || [],
      images: [
        {
          url: post.ogImage || "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.subtitle,
      images: [post.ogImage || "/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);
  const publishedTime = parseDate(post.date);
  const wordCount = estimateWordCount(post.sections);
  const faqPairs = extractFaqPairs(post.sections);
  const faqJsonLd = faqPairs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPairs.map((p) => ({
      "@type": "Question",
      name: p.question,
      acceptedAnswer: { "@type": "Answer", text: p.answer },
    })),
  } : null;

  // BlogPosting JSON-LD
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.subtitle,
    image: post.ogImage ? `https://deltalabsai.com${post.ogImage}` : "https://deltalabsai.com/og-image.png",
    datePublished: publishedTime,
    dateModified: publishedTime,
    wordCount,
    articleSection: post.category,
    keywords: (post.keywords || []).join(", "),
    author: {
      "@type": "Organization",
      name: "Delta Labs AI",
      url: "https://deltalabsai.com",
      logo: "https://deltalabsai.com/logo.png",
    },
    publisher: {
      "@type": "Organization",
      name: "Delta Labs AI",
      url: "https://deltalabsai.com",
      logo: {
        "@type": "ImageObject",
        url: "https://deltalabsai.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://deltalabsai.com/blog/${post.slug}`,
    },
    url: `https://deltalabsai.com/blog/${post.slug}`,
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://deltalabsai.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://deltalabsai.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://deltalabsai.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      )}
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
