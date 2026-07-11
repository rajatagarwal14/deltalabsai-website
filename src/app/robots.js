export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/clinic/",
    },
    sitemap: "https://deltalabsai.com/sitemap.xml",
  };
}
