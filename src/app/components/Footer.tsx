import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Solutions", href: "#solutions" },
      { label: "Workflow", href: "#workflow" },
      { label: "Pricing", href: "#pricing" },
      { label: "Free Trial", href: "#trial" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Platform Features", href: "#features" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Community", href: "#news" },
      { label: "Contact", href: "mailto:hello@filmik.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Filmik", href: "#top" },
      { label: "Pricing Plans", href: "#pricing" },
      { label: "Start Trial", href: "#trial" },
      { label: "Privacy", href: "mailto:hello@filmik.com?subject=Privacy%20Request" },
    ],
  },
];

const socialLinks = [
  { Icon: Twitter, label: "Twitter", href: "https://x.com/filmiknation" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/filmiknation/" },
  { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@filmiknation" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/filmikio" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-[#07070d]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <a href="#top" className="mb-5 inline-flex items-center" aria-label="Filmik home">
              <img
                src="/filmik-logo-white.svg"
                alt="Filmik"
                className="h-8 w-auto sm:h-9"
              />
            </a>
            <p className="text-sm text-white/40 mb-6 max-w-xs leading-relaxed">
              The operating system for film and television production. Built for modern productions, trusted by industry professionals worldwide.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  data-analytics-event="social_click"
                  data-analytics-label={label}
                  data-analytics-location="footer"
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-white/[0.14] flex items-center justify-center transition-all group"
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white/80 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/[0.06] pt-8 sm:pt-10 mb-8 sm:mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h4
                className="text-sm font-semibold text-white mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Stay updated
              </h4>
              <p className="text-sm text-white/35">
                New features, industry news, and updates — no spam.
              </p>
            </div>
            <div className="flex gap-2 sm:flex-shrink-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-52 px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
              />
              <button
                data-analytics-event="newsletter_subscribe_click"
                data-analytics-label="Subscribe"
                data-analytics-location="footer"
                className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Filmik, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">Terms</a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
