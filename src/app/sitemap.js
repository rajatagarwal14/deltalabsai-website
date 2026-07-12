import { getAllPosts } from "./blog/posts";
import { cities } from "./smilecrm/cities";

export default function sitemap() {
  const allPosts = getAllPosts();

  const cityPages = cities
    .filter((city) => city.tier === 1)
    .map((city) => ({
      url: `https://deltalabsai.com/smilecrm/${city.slug}`,
      lastModified: new Date("2026-04-29"),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const blogPosts = allPosts.map((post) => {
    // Parse the post date string to a proper Date
    const postDate = new Date(post.date);
    const lastMod = isNaN(postDate.getTime()) ? new Date() : postDate;

    return {
      url: `https://deltalabsai.com/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [
    {
      url: "https://deltalabsai.com",
      lastModified: new Date("2026-06-29"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://deltalabsai.com/diagnostic",
      lastModified: new Date("2026-06-29"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://deltalabsai.com/dental",
      lastModified: new Date("2026-03-24"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://deltalabsai.com/fitness",
      lastModified: new Date("2026-03-24"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://deltalabsai.com/home-services",
      lastModified: new Date("2026-03-24"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://deltalabsai.com/ai-bdr",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://deltalabsai.com/solutions",
      lastModified: new Date("2026-05-31"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://deltalabsai.com/voice-receptionist",
      lastModified: new Date("2026-05-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://deltalabsai.com/dental/no-show-calculator",
      lastModified: new Date("2026-05-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://deltalabsai.com/store",
      lastModified: new Date("2026-04-03"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://deltalabsai.com/blog",
      lastModified: new Date("2026-02-18"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://deltalabsai.com/smilecrm",
      lastModified: new Date("2026-04-29"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://deltalabsai.com/about",
      lastModified: new Date("2026-07-13"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://deltalabsai.com/answers/hvac-invoicing-automation",
      lastModified: new Date("2026-07-13"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://deltalabsai.com/answers/reduce-gym-member-churn",
      lastModified: new Date("2026-07-13"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: "https://deltalabsai.com/answers/appointment-scheduling-non-technical-owners",
      lastModified: new Date("2026-07-13"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...cityPages,
    ...blogPosts,
  ];
}
