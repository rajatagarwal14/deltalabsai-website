import "./globals.css";
import WhatsAppFloat from "./WhatsAppFloat";

export const metadata = {
  title: "Delta Labs AI — Stop Losing Revenue to Broken Operations",
  description:
    "Small business drowning in chaos? Delta Labs AI is your automation co-pilot. Start with our free 3-minute diagnostic.",
  keywords: [
    "AI business consulting",
    "digital transformation consulting",
    "business operations consulting",
    "AI automation for small business",
    "business diagnostic tool",
    "operations optimization",
    "SME consulting",
    "revenue leak analysis",
    "workflow automation",
    "CRM setup consulting",
    "AI agents for business",
    "business process automation",
    "small business AI tools",
  ],
  metadataBase: new URL("https://deltalabsai.com"),
  alternates: {
    canonical: "https://deltalabsai.com",
  },
  openGraph: {
    title: "Delta Labs AI — Stop Losing Revenue to Broken Operations",
    description:
      "Small business drowning in chaos? Delta Labs AI is your automation co-pilot. Start with our free 3-minute diagnostic.",
    url: "https://deltalabsai.com",
    siteName: "Delta Labs AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Labs AI — AI-Powered Business Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delta Labs AI — Stop Losing Revenue to Broken Operations",
    description:
      "Small business drowning in chaos? Delta Labs AI is your automation co-pilot. Start with our free 3-minute diagnostic.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  other: {
    "theme-color": "#0F172A",
    "color-scheme": "light",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  verification: {},
  category: "Business Consulting",
};

// Enhanced JSON-LD with Organization + ProfessionalService + FAQPage for LLM/Perplexity visibility
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://deltalabsai.com/#organization",
  name: "Delta Labs AI",
  alternateName: "Delta Labs AI Consulting",
  description:
    "AI-powered business consulting for growing companies. We diagnose revenue leaks across 9 business dimensions, fix operations, implement CRM systems, and build AI automation for small and mid-sized businesses.",
  url: "https://deltalabsai.com",
  logo: {
    "@type": "ImageObject",
    url: "https://deltalabsai.com/logo.png",
    width: 512,
    height: 512,
  },
  image: "https://deltalabsai.com/og-image.png",
  priceRange: "$$",
  sameAs: [
    "https://www.linkedin.com/company/delta-labs-ai-consulting",
    "https://www.facebook.com/profile.php?id=61588293766138",
  ],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  serviceType: [
    "AI Consulting",
    "Digital Transformation Consulting",
    "Business Process Automation",
    "CRM Setup and Implementation",
    "Revenue Optimization",
    "Operations Consulting",
    "Business Diagnostic Assessment",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Business Process Automation",
    "Digital Transformation",
    "CRM Implementation",
    "Revenue Optimization",
    "Small Business Operations",
    "AI Agents",
    "Workflow Automation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Consulting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free 9-Dimension Business Diagnostic",
          description:
            "A free 3-minute assessment that scores your business across 9 dimensions including revenue, operations, technology, and team. Generates a radar chart with specific quick-win recommendations.",
          url: "https://deltalabsai.com/diagnostic",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Diagnostic Kit",
          description:
            "Self-serve Notion template for comprehensive business assessment with scoring framework",
        },
        price: "49",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free Discovery Call",
          description:
            "30-minute consultation to review your diagnostic results and discuss specific recommendations for your business",
          url: "https://cal.com/ag-ventures-qbqxax/30min",
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    url: "https://cal.com/ag-ventures-qbqxax/30min",
    availableLanguage: ["English"],
  },
};

// FAQPage schema for LLM/search visibility
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Delta Labs AI Business Diagnostic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Delta Labs AI Business Diagnostic is a free, 3-minute online assessment that scores your business across 9 dimensions: revenue engine, operations, technology, team, data practices, marketing, customer experience, financial health, and growth readiness. You receive a visual radar chart showing your strengths and gaps, plus a specific quick-win recommendation you can implement immediately.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Delta Labs AI consulting cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Delta Labs AI offers a free 9-dimension business diagnostic and a free 30-minute discovery call. The self-serve Business Diagnostic Kit is $49. Custom consulting engagements for AI automation, CRM setup, and digital transformation are priced based on scope and complexity.",
      },
    },
    {
      "@type": "Question",
      name: "What industries does Delta Labs AI serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Delta Labs AI serves small and mid-sized businesses across multiple industries including healthcare (dental, medical practices), field services (HVAC, plumbing), fitness and gyms, e-commerce, professional services (consulting firms, agencies), real estate and property management, and more. We operate in the US, India, UK, UAE, and Australia.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI automation help small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI automation helps small businesses by eliminating repetitive manual tasks like data entry, appointment scheduling, lead qualification, invoice processing, and report generation. The average SME loses 15-30% of potential revenue to operational inefficiency. AI automation can recover this lost revenue by streamlining operations, reducing errors, and freeing team members to focus on revenue-generating work.",
      },
    },
  ],
};

// Organization schema for broad search visibility
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Delta Labs AI",
  "url": "https://deltalabsai.com",
  "logo": "https://deltalabsai.com/logo.png",
  "description": "AI-powered operations partner for growing service businesses",
  "sameAs": ["https://www.linkedin.com/company/delta-labs-ai-consulting/"],
};

// Service schema for homepage
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI Business Consulting",
  "provider": {
    "@type": "Organization",
    "name": "Delta Labs AI",
    "url": "https://deltalabsai.com",
  },
  "name": "AI Automation & Business Consulting",
  "description": "AI-powered business consulting for small and mid-sized businesses. We diagnose revenue leaks, fix broken operations, and build AI automation that runs while you sleep.",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Delta Labs AI Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free 9-Dimension Business Diagnostic",
          "description": "A free 3-minute assessment scoring your business across 9 dimensions with radar chart and quick-win recommendations.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Automation Implementation",
          "description": "Custom AI agents, CRM setup, workflow automation, and process redesign for growing service businesses.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SmileCRM for Dental Clinics",
          "description": "Purpose-built CRM for dental clinics with appointment automation, patient recall, review management, and WhatsApp follow-ups.",
        },
      },
    ],
  },
};

// BreadcrumbList schema for homepage
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://deltalabsai.com",
    },
  ],
};

// WebSite schema for sitelinks search box
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Delta Labs AI",
  url: "https://deltalabsai.com",
  description:
    "AI-powered business consulting for growing companies. Free 9-dimension diagnostic, expert blog, and consulting services.",
  publisher: {
    "@type": "Organization",
    name: "Delta Labs AI",
    url: "https://deltalabsai.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0F172A" />
        {/* RB2B Visitor Identification */}
        <script dangerouslySetInnerHTML={{ __html: `!function () {var reb2b = window.reb2b = window.reb2b || [];if (reb2b.invoked) return;reb2b.invoked = true;reb2b.methods = ["identify"];reb2b.factory = function (method) {return function () {var args = Array.prototype.slice.call(arguments);args.unshift(method);reb2b.push(args);return reb2b;};};for (var i = 0; i < reb2b.methods.length; i++) {var key = reb2b.methods[i];reb2b[key] = reb2b.factory(key);}reb2b.load = function (key) {var script = document.createElement("script");script.type = "text/javascript";script.async = true;script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";var first = document.getElementsByTagName("script")[0];first.parentNode.insertBefore(script, first);};reb2b.SNIPPET_VERSION = "1.0.1";reb2b.load("Q6J2RH2QJP6D");}();` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                var s = document.createElement('script');
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-E8311XDVDX';
                s.async = true;
                document.head.appendChild(s);
                s.onload = function() {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-E8311XDVDX');
                };
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* Cal.com Embed — popup + inline support site-wide */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function (C, A, L) {
            var p = function (a, ar) { a.q.push(ar); };
            var d = C.document;
            C.Cal = C.Cal || function () {
              var cal = C.Cal; var ar = arguments;
              if (!cal.loaded) {
                cal.ns = {}; cal.q = cal.q || [];
                var s = d.createElement("script"); s.src = A; s.async = true;
                d.head.appendChild(s);
                cal.loaded = true;
              }
              if (ar[0] === L) {
                var api = function () { p(api, arguments); };
                var ns = ar[1]; api.q = api.q || [];
                if (typeof ns === "string") { cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], ar); p(cal, [L, ns, ar[2]]); }
                else p(cal, ar);
                return;
              }
              p(cal, ar);
            };
          })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "30min", { origin: "https://cal.com" });
          Cal.ns["30min"]("ui", {
            styles: { branding: { brandColor: "#059669" } },
            hideEventTypeDetails: false,
            layout: "month_view"
          });

          // Global interceptor — catch ANY click on a cal.com link and open as popup instead
          function openCalPopup() {
            if (window.Cal && window.Cal.ns && window.Cal.ns["30min"]) {
              window.Cal.ns["30min"]("modal", { calLink: "ag-ventures-qbqxax/30min" });
            }
          }
          window.openCalPopup = openCalPopup;
          document.addEventListener("click", function(e) {
            var el = e.target.closest('a[href*="cal.com/ag-ventures"], a[href="#cal-book"], [data-cal-link]');
            if (el) {
              e.preventDefault();
              e.stopPropagation();
              openCalPopup();
            }
          }, true);
        `}} />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'DM Sans', sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}

        <WhatsAppFloat />

        {/* Exit-Intent Popup + Chat Widget */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            // ===== GLOBAL EMAIL CAPTURE =====
            // Captures ANY email entered anywhere on the website
            var capturedEmails = {};
            document.addEventListener('blur', function(e) {
              if (e.target && e.target.type === 'email' && e.target.value) {
                var email = e.target.value.trim();
                if (email.includes('@') && !capturedEmails[email]) {
                  capturedEmails[email] = true;
                  var name = '';
                  var company = '';
                  // Try to find name/company fields nearby
                  var form = e.target.closest('form');
                  if (form) {
                    var nameInput = form.querySelector('input[name="name"], input[placeholder*="Name"], input[placeholder*="name"]');
                    var compInput = form.querySelector('input[name="company"], input[placeholder*="Company"], input[placeholder*="company"]');
                    if (nameInput) name = nameInput.value;
                    if (compInput) company = compInput.value;
                  }
                  // Silently capture to CRM
                  fetch('https://delta-labs-ecosystem.vercel.app/api/leads/capture', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name || email.split('@')[0], email: email, company: company || '', source: 'website_popup', notes: 'Auto-captured from email input on page: ' + window.location.pathname })
                  }).catch(function(){});
                }
              }
            }, true);

            // ===== LINKEDIN CLICK TRACKING =====
            document.addEventListener('click', function(e) {
              var link = e.target.closest('a[href*="linkedin.com"]');
              if (link) {
                fetch('https://delta-labs-ecosystem.vercel.app/api/leads/capture', {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: 'LinkedIn Visitor', email: '', source: 'website_popup', notes: 'Clicked LinkedIn link: ' + link.href + ' from page: ' + window.location.pathname })
                }).catch(function(){});
              }
            }, true);

            // ===== RETRY FAILED LEADS FROM LOCALSTORAGE =====
            try {
              var fails = JSON.parse(localStorage.getItem('dla_failed_leads') || '[]');
              if (fails.length > 0) {
                fails.forEach(function(data) {
                  fetch('https://delta-labs-ecosystem.vercel.app/api/leads/capture', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  }).then(function(r) { if (r.ok) localStorage.setItem('dla_failed_leads', '[]'); });
                });
              }
            } catch(x){}

            // ===== EXIT-INTENT POPUP =====
            var popupShown = false;
            var popupHTML = '<div id="dla-popup-overlay" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:99999;justify-content:center;align-items:center"><div style="background:#fff;border-radius:16px;padding:40px;max-width:440px;width:90%;text-align:center;position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.3)"><button onclick="document.getElementById(\\'dla-popup-overlay\\').style.display=\\'none\\'" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:24px;cursor:pointer;color:#999">×</button><div style="font-size:40px;margin-bottom:12px">🎯</div><h2 style="font-family:DM Sans,sans-serif;font-size:22px;font-weight:800;color:#0F172A;margin:0 0 8px">Wait! Get Your FREE AI Score</h2><p style="font-family:DM Sans,sans-serif;font-size:14px;color:#64748B;margin:0 0 20px;line-height:1.5">See how AI can save your business 15-30% in lost revenue. Takes 3 minutes.</p><form id="dla-popup-form" style="display:flex;flex-direction:column;gap:10px"><input name="name" placeholder="Your Name" required style="padding:12px 16px;border:1.5px solid #E2E8F0;border-radius:10px;font-size:14px;font-family:DM Sans,sans-serif;outline:none" /><input name="email" type="email" placeholder="Work Email" required style="padding:12px 16px;border:1.5px solid #E2E8F0;border-radius:10px;font-size:14px;font-family:DM Sans,sans-serif;outline:none" /><input name="company" placeholder="Company Name" style="padding:12px 16px;border:1.5px solid #E2E8F0;border-radius:10px;font-size:14px;font-family:DM Sans,sans-serif;outline:none" /><button type="submit" style="padding:14px;background:#0F172A;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:DM Sans,sans-serif;cursor:pointer">Get My Free AI Score →</button></form><p style="font-family:DM Sans,sans-serif;font-size:11px;color:#94A3B8;margin:12px 0 0">No spam. Just your personalized AI readiness report.</p></div></div>';
            document.body.insertAdjacentHTML('beforeend', popupHTML);

            document.addEventListener('mouseout', function(e) {
              if (e.clientY < 10 && !popupShown && !sessionStorage.getItem('dla_popup')) {
                popupShown = true;
                sessionStorage.setItem('dla_popup', '1');
                document.getElementById('dla-popup-overlay').style.display = 'flex';
              }
            });

            // Also show after 30 seconds on page
            setTimeout(function() {
              if (!popupShown && !sessionStorage.getItem('dla_popup')) {
                popupShown = true;
                sessionStorage.setItem('dla_popup', '1');
                document.getElementById('dla-popup-overlay').style.display = 'flex';
              }
            }, 30000);

            // Show when user switches tab or minimizes browser
            document.addEventListener('visibilitychange', function() {
              if (document.visibilityState === 'hidden' && !popupShown && !sessionStorage.getItem('dla_popup')) {
                popupShown = true;
                sessionStorage.setItem('dla_popup', '1');
                document.getElementById('dla-popup-overlay').style.display = 'flex';
              }
            });

            // Show on back button / navigate away
            window.addEventListener('beforeunload', function(e) {
              if (!popupShown && !sessionStorage.getItem('dla_popup')) {
                popupShown = true;
                sessionStorage.setItem('dla_popup', '1');
                document.getElementById('dla-popup-overlay').style.display = 'flex';
                e.preventDefault();
                e.returnValue = '';
              }
            });

            // Push state for back button detection
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', window.location.href);
              window.addEventListener('popstate', function() {
                if (!popupShown && !sessionStorage.getItem('dla_popup')) {
                  popupShown = true;
                  sessionStorage.setItem('dla_popup', '1');
                  document.getElementById('dla-popup-overlay').style.display = 'flex';
                  window.history.pushState(null, '', window.location.href);
                }
              });
            }

            // Handle popup form submission
            document.addEventListener('submit', function(e) {
              if (e.target.id === 'dla-popup-form') {
                e.preventDefault();
                var fd = new FormData(e.target);
                var data = { name: fd.get('name'), email: fd.get('email'), company: fd.get('company'), source: 'exit_popup' };
                // DOUBLE CAPTURE: Send to BOTH CRM and Google Sheet
                // 1. CRM capture
                fetch('https://delta-labs-ecosystem.vercel.app/api/leads/capture', {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                }).then(function(r) {
                  if (!r.ok) {
                    // ALERT on failure - never fail silently
                    fetch('https://api.telegram.org/bot8680426384:AAHqWHX13qD83KrozwQ3LPH-Mn1bPlLRk3o/sendMessage', {
                      method: 'POST', headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ chat_id: '1166752894', text: 'ALERT: Popup form FAILED for ' + data.name + ' (' + data.email + '). CRM returned ' + r.status + '. Check immediately.' })
                    });
                    // FALLBACK: store in localStorage for retry
                    try { var fails = JSON.parse(localStorage.getItem('dla_failed_leads') || '[]'); fails.push(data); localStorage.setItem('dla_failed_leads', JSON.stringify(fails)); } catch(x){}
                  }
                }).catch(function(err) {
                  // Network error - alert + fallback
                  fetch('https://api.telegram.org/bot8680426384:AAHqWHX13qD83KrozwQ3LPH-Mn1bPlLRk3o/sendMessage', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: '1166752894', text: 'ALERT: Popup form NETWORK ERROR for ' + data.name + ' (' + data.email + '). Error: ' + err.message })
                  });
                  try { var fails = JSON.parse(localStorage.getItem('dla_failed_leads') || '[]'); fails.push(data); localStorage.setItem('dla_failed_leads', JSON.stringify(fails)); } catch(x){}
                });
                // 2. Google Sheet backup capture
                fetch('https://script.google.com/macros/s/AKfycbywR6SGJxm135zNS55ZXG5AxWfIAzoqlEObCOgkF3eASaWwKEcIm0jDmGlNtIE-AM_0/exec', {
                  method: 'POST', headers: { 'Content-Type': 'text/plain' },
                  body: JSON.stringify({ info: { name: data.name, email: data.email, company: data.company, industry: 'Unknown', teamSize: 'Unknown', revenue: 'Unknown', urgency: 'Unknown', biggestChallenge: 'Submitted via popup' }, scores: { revenue: 0, operations: 0, technology: 0, team: 0, data: 0 } }),
                  mode: 'no-cors'
                }).catch(function(){});
                // Redirect to diagnostic
                window.location.href = '/diagnostic';
              }
            });

            // ===== CHAT WIDGET =====
            var chatHTML = '<div id="dla-chat-btn" onclick="document.getElementById(\\'dla-chat-box\\').style.display=document.getElementById(\\'dla-chat-box\\').style.display===\\'none\\'?\\'flex\\':\\'none\\'" style="position:fixed;bottom:20px;right:20px;width:56px;height:56px;background:#0F172A;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:99998;box-shadow:0 4px 20px rgba(0,0,0,0.3)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div id="dla-chat-box" style="display:none;position:fixed;bottom:88px;right:20px;width:340px;max-height:460px;background:#fff;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.2);z-index:99998;flex-direction:column;overflow:hidden"><div style="background:#0F172A;padding:16px 20px;color:#fff"><div style="font-family:DM Sans,sans-serif;font-weight:700;font-size:15px">Delta Labs AI</div><div style="font-family:DM Sans,sans-serif;font-size:12px;opacity:0.7">AI Business Assistant • Online</div></div><div id="dla-chat-msgs" style="padding:16px;flex:1;overflow-y:auto;max-height:280px"><div style="background:#F1F5F9;padding:12px;border-radius:12px;font-family:DM Sans,sans-serif;font-size:13px;color:#334155;line-height:1.5;margin-bottom:8px">👋 Hi! I\\'m the Delta Labs AI assistant. How can I help your business today?<br><br>Try asking:<br>• How can AI help my clinic?<br>• What\\'s a business diagnostic?<br>• Book a free call</div></div><form id="dla-chat-form" style="display:flex;border-top:1px solid #E2E8F0;padding:8px"><input id="dla-chat-input" placeholder="Type a message..." style="flex:1;border:none;padding:10px 12px;font-size:13px;font-family:DM Sans,sans-serif;outline:none" /><button type="submit" style="background:#0F172A;color:#fff;border:none;padding:10px 16px;font-weight:700;font-size:13px;cursor:pointer;border-radius:0 0 16px 0">Send</button></form></div>';
            document.body.insertAdjacentHTML('beforeend', chatHTML);

            // Handle chat form
            document.addEventListener('submit', function(e) {
              if (e.target.id === 'dla-chat-form') {
                e.preventDefault();
                var input = document.getElementById('dla-chat-input');
                var msg = input.value.trim();
                if (!msg) return;
                var msgs = document.getElementById('dla-chat-msgs');
                msgs.innerHTML += '<div style="background:#0F172A;color:#fff;padding:10px 14px;border-radius:12px;font-family:DM Sans,sans-serif;font-size:13px;margin-bottom:8px;text-align:right">' + msg + '</div>';
                input.value = '';

                // Check for common queries
                var lower = msg.toLowerCase();
                var reply = '';
                if (lower.includes('book') || lower.includes('call') || lower.includes('schedule')) {
                  reply = '📅 Great! Book a free 30-min call here:<br><a href="#cal-book" style="color:#2563EB">Book Discovery Call →</a>';
                } else if (lower.includes('diagnostic') || lower.includes('score') || lower.includes('assessment')) {
                  reply = '🎯 Take our free 3-min diagnostic:<br><a href="/diagnostic" style="color:#2563EB">Start Diagnostic →</a><br>It scores your business across 9 dimensions.';
                } else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
                  reply = '💰 We offer:<br>• Free diagnostic + discovery call<br>• SmileCRM for dental: from ₹2,999/mo<br>• Custom AI automation: project-based<br><br><a href="#cal-book" style="color:#2563EB">Discuss pricing →</a>';
                } else if (lower.includes('dental') || lower.includes('clinic') || lower.includes('dentist')) {
                  reply = '🦷 We built SmileCRM specifically for dental clinics!<br>• Appointment automation<br>• Patient recall<br>• WhatsApp follow-ups<br>• Review management<br><br><a href="#cal-book" style="color:#2563EB">Book a demo →</a>';
                } else {
                  reply = '🤖 Thanks for your message! For personalized help:<br><br>1. <a href="/diagnostic" style="color:#2563EB">Take free diagnostic</a> (3 min)<br>2. <a href="#cal-book" style="color:#2563EB">Book free call</a> (30 min)<br><br>Our team will review your business and suggest specific improvements.';
                }

                // Send lead data to CRM silently
                fetch('https://delta-labs-ecosystem.vercel.app/api/leads/capture', {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ source: 'chatbot', notes: 'Chat message: ' + msg })
                }).catch(function(){});

                setTimeout(function() {
                  msgs.innerHTML += '<div style="background:#F1F5F9;padding:12px;border-radius:12px;font-family:DM Sans,sans-serif;font-size:13px;color:#334155;line-height:1.5;margin-bottom:8px">' + reply + '</div>';
                  msgs.scrollTop = msgs.scrollHeight;
                }, 800);
              }
            });
          })();
        `}} />
      </body>
    </html>
  );
}
