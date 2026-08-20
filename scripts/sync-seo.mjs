import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../seo.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const indexPath = path.join(rootDir, "index.html");

const absoluteUrl = (inputPath = "/") =>
  new URL(inputPath, siteConfig.siteUrl.endsWith("/") ? siteConfig.siteUrl : `${siteConfig.siteUrl}/`).toString();

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.siteUrl}#organization`,
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
      email: siteConfig.contact.email,
      logo: absoluteUrl("/filmik-logo-white.svg"),
      sameAs: [
        siteConfig.social.xUrl,
        siteConfig.social.instagramUrl,
        siteConfig.social.youtubeUrl,
        siteConfig.social.linkedinUrl,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}#website`,
      url: siteConfig.siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en-US",
      publisher: {
        "@id": `${siteConfig.siteUrl}#organization`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.siteUrl}#application`,
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: siteConfig.description,
      url: siteConfig.siteUrl,
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "7-day free trial and free starting tier.",
        },
      ],
      audience: siteConfig.appTargets.map((audienceType) => ({
        "@type": "Audience",
        audienceType,
      })),
      publisher: {
        "@id": `${siteConfig.siteUrl}#organization`,
      },
    },
  ],
};

const llms = `# Filmik

> Filmik is the operating system for film and television production.

Filmik helps coordinators, producers, and performers manage submissions, calendars, scene cards, documents, and trial signups in one workspace.

## Canonical site
- ${siteConfig.siteUrl}

## Primary audience
- Coordinators managing submissions and scene cards
- Producers running projects, calendars, and approvals
- Performers sharing profiles, reels, and submission kits

## Key pages
${siteConfig.navigationPages.map(({ path: pagePath }) => `- ${absoluteUrl(pagePath)}`).join("\n")}

## Contact
- ${siteConfig.contact.email}
`;

const manifest = {
  name: siteConfig.name,
  short_name: siteConfig.name,
  description: siteConfig.description,
  start_url: "/",
  display: "standalone",
  background_color: siteConfig.themeColor,
  theme_color: siteConfig.themeColor,
  icons: [
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any",
    },
  ],
};

const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${siteConfig.navigationPages
  .map(
    ({ path: pagePath, priority, changefreq }) => `  <url>
    <loc>${absoluteUrl(pagePath)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#07070d"/>
  <rect x="64" y="64" width="1072" height="502" rx="36" fill="url(#panel)" stroke="rgba(255,255,255,0.08)"/>
  <circle cx="1020" cy="162" r="180" fill="url(#glow)" fill-opacity="0.95"/>
  <circle cx="208" cy="488" r="148" fill="url(#glow2)" fill-opacity="0.6"/>
  <rect x="112" y="118" width="182" height="182" rx="40" fill="url(#logo)"/>
  <path d="M184.778 177H225.223V195.338H210.946V251H198.946V195.338H184.778V177Z" fill="white"/>
  <path d="M150 177H180.147L200.771 210.393V251H188.771V214.055L168.5 181.151H150V177Z" fill="white" fill-opacity="0.88"/>
  <text x="112" y="372" fill="white" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="600" opacity="0.68">Film &amp; TV Production Management Platform</text>
  <text x="112" y="440" fill="white" font-family="Outfit, Inter, Arial, sans-serif" font-size="72" font-weight="800">Filmik</text>
  <text x="112" y="506" fill="white" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="500" opacity="0.8">Run submissions, calendars, scene cards, and approvals in one workspace.</text>
  <text x="112" y="548" fill="#7DD3FC" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600">Start your 7-day free trial without a sales queue.</text>
  <defs>
    <linearGradient id="panel" x1="112" y1="92" x2="1041" y2="566" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0F172A"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="logo" x1="112" y1="118" x2="294" y2="300" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6"/>
      <stop offset="1" stop-color="#0EA5E9"/>
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1020 162) rotate(90) scale(180)">
      <stop stop-color="#2563EB"/>
      <stop offset="1" stop-color="#2563EB" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(208 488) rotate(90) scale(148)">
      <stop stop-color="#0EA5E9"/>
      <stop offset="1" stop-color="#0EA5E9" stop-opacity="0"/>
    </radialGradient>
  </defs>
</svg>
`;

const faviconSvg = `<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="56" fill="url(#bg)"/>
  <path d="M69 72H187V93.5H144.5V183H111.5V93.5H69V72Z" fill="white"/>
  <path d="M83 72H112L139 117.5V183H106V126L83 87.5V72Z" fill="white" fill-opacity="0.88"/>
  <defs>
    <linearGradient id="bg" x1="22" y1="20" x2="220" y2="232" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B82F6"/>
      <stop offset="1" stop-color="#0EA5E9"/>
    </linearGradient>
  </defs>
</svg>
`;

const seoHead = `
    <!-- SEO:START -->
    <title>${escapeHtml(siteConfig.title)}</title>
    <meta name="description" content="${escapeHtml(siteConfig.description)}" />
    <meta name="keywords" content="${escapeHtml(siteConfig.keywords.join(", "))}" />
    <meta name="author" content="${escapeHtml(siteConfig.legalName)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="${siteConfig.themeColor}" />
    <meta name="application-name" content="${escapeHtml(siteConfig.name)}" />
    <meta name="apple-mobile-web-app-title" content="${escapeHtml(siteConfig.name)}" />
    <meta name="format-detection" content="telephone=no" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(siteConfig.title)}" />
    <meta property="og:description" content="${escapeHtml(siteConfig.description)}" />
    <meta property="og:url" content="${siteConfig.siteUrl}" />
    <meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />
    <meta property="og:locale" content="${siteConfig.locale}" />
    <meta property="og:image" content="${absoluteUrl("/og-image.svg")}" />
    <meta property="og:image:alt" content="${escapeHtml(siteConfig.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(siteConfig.title)}" />
    <meta name="twitter:description" content="${escapeHtml(siteConfig.description)}" />
    <meta name="twitter:image" content="${absoluteUrl("/og-image.svg")}" />
    <meta name="twitter:site" content="${escapeHtml(siteConfig.social.twitter)}" />
    <link rel="canonical" href="${siteConfig.siteUrl}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
    <!-- SEO:END -->`;

const gtmHead = `
    <!-- GTM:START -->
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${siteConfig.gtmId}');</script>
    <!-- End Google Tag Manager -->
    <!-- GTM:END -->`;

const gtmBody = `
    <!-- GTM-BODY:START -->
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!-- GTM-BODY:END -->`;

const upsertSeoHead = (html) => {
  const blockPattern = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;
  if (blockPattern.test(html)) {
    return html.replace(blockPattern, seoHead.trimEnd());
  }

  return html.replace("</head>", `${seoHead}\n  </head>`);
};

const upsertGtmHead = (html) => {
  const blockPattern = /<!-- GTM:START -->[\s\S]*?<!-- GTM:END -->/;
  if (blockPattern.test(html)) {
    return html.replace(blockPattern, gtmHead.trimEnd());
  }

  return html.replace("</head>", `${gtmHead}\n  </head>`);
};

const upsertGtmBody = (html) => {
  const blockPattern = /<!-- GTM-BODY:START -->[\s\S]*?<!-- GTM-BODY:END -->/;
  if (blockPattern.test(html)) {
    return html.replace(blockPattern, gtmBody.trimEnd());
  }

  return html.replace("<body>", `<body>\n${gtmBody}`);
};

await fs.mkdir(publicDir, { recursive: true });
await Promise.all([
  fs.writeFile(path.join(publicDir, "robots.txt"), robots),
  fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemap),
  fs.writeFile(path.join(publicDir, "llms.txt"), llms),
  fs.writeFile(path.join(publicDir, "manifest.webmanifest"), JSON.stringify(manifest, null, 2)),
  fs.writeFile(path.join(publicDir, "og-image.svg"), ogSvg),
  fs.writeFile(path.join(publicDir, "favicon.svg"), faviconSvg),
]);

const currentIndex = await fs.readFile(indexPath, "utf8");
const updatedIndex = upsertGtmBody(upsertGtmHead(upsertSeoHead(currentIndex)))
  .replace(/<html lang="[^"]*">/, `<html lang="en">`)
  .replace(/<meta name="viewport" content="[^"]*"\s*\/>/, '<meta name="viewport" content="width=device-width, initial-scale=1.0" />');

await fs.writeFile(indexPath, updatedIndex);
