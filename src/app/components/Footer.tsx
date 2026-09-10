import { useState } from "react";
import { CheckCircle2, Instagram, Youtube, Linkedin } from "lucide-react";
import { trackEvent } from "../../lib/analytics";
import { siteContent } from "../../content/siteContent";

type SocialLink = {
  Icon?: typeof Instagram;
  label: string;
  href: string;
  isX?: boolean;
};

function XLogo({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor"><path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-6.4L6.45 22H3.34l7.25-8.29L2.94 2h6.4l4.43 5.86L18.9 2Zm-1.1 18h1.72L8.4 3.9H6.55L17.8 20Z" /></svg>;
}

const socialLinks: SocialLink[] = [
  { label: "X", href: "https://x.com/filmiknation", isX: true },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/filmiknation/" },
  { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@filmiknation" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/filmikio" },
];

type FooterProps = {
  onOpenRequestAccess: () => void;
};

export function Footer({ onOpenRequestAccess }: FooterProps) {
  const { footer } = siteContent;
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const footerSections = footer.linkGroups.map((section) => ({
    ...section,
    links: section.links.map(([label, href]) => ({ label, href })),
  }));
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
              {footer.description}
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ Icon, label, href, isX }) => (
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
                  {isX ? <XLogo className="h-4 w-4 text-white/40 transition-colors group-hover:text-white/70" /> : Icon && <Icon className="h-4 w-4 text-white/40 transition-colors group-hover:text-white/70" />}
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
                    {link.label === "Request Access" ? <button type="button" onClick={onOpenRequestAccess} data-analytics-event="cta_click" data-analytics-label="Request Access" data-analytics-location="footer" className="text-sm text-white/45 transition-colors duration-200 hover:text-white/80">{link.label}</button> : <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className={`text-sm transition-colors duration-200 ${link.label === "Filmik for iOS" || link.label === "Filmik for Android" ? "font-semibold text-red-300 hover:text-red-200" : "text-white/45 hover:text-white/80"}`}>{link.label}</a>}
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
                {footer.newsletter.heading}
              </h4>
              <p className="text-sm text-white/35">
                {footer.newsletter.description}
              </p>
            </div>
            {newsletterStatus === "submitted" ? (
              <div className="flex max-w-sm items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 sm:flex-shrink-0" role="status">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-white">Thanks - check your inbox.</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">Use the confirmation email from Mailchimp to finish subscribing.</p>
                </div>
              </div>
            ) : (
            <form
              className="flex flex-wrap gap-2 sm:flex-shrink-0"
              onSubmit={async (event) => {
                event.preventDefault();
                setNewsletterStatus("submitting");
                setNewsletterError("");
                trackEvent("newsletter_subscription_intent", { location: "footer" });

                try {
                  const response = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: newsletterEmail,
                      company: (event.currentTarget.elements.namedItem("company") as HTMLInputElement)?.value || "",
                      pageUrl: window.location.href,
                      referrer: document.referrer,
                    }),
                  });
                  const payload = await response.json().catch(() => ({}));

                  if (!response.ok) throw new Error(payload.error || "Unable to subscribe right now.");

                  setNewsletterStatus("submitted");
                  setNewsletterEmail("");
                  trackEvent("newsletter_subscribe_submit", { location: "footer" });
                  trackEvent("sign_up", { method: "newsletter", location: "footer" });
                } catch (submissionError) {
                  setNewsletterError(submissionError instanceof Error ? submissionError.message : "Unable to subscribe right now.");
                  setNewsletterStatus("error");
                }
              }}
            >
              <input name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => { setNewsletterEmail(event.target.value); setNewsletterStatus("idle"); }}
                required
                placeholder={footer.newsletter.placeholder}
                className="flex-1 sm:w-52 px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
              />
              <button type="submit"
                disabled={newsletterStatus === "submitting"}
                data-analytics-event="newsletter_subscribe_click"
                data-analytics-label="Subscribe"
                data-analytics-location="footer"
                className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
              >
                {newsletterStatus === "submitting" ? "Sending..." : footer.newsletter.cta}
              </button>
              {newsletterStatus === "error" && <p role="alert" className="w-full text-sm text-rose-300">{newsletterError}</p>}
            </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Filmik, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=2a58c3f5-4008-4ef9-b878-9c494ecd5598" target="_blank" rel="noreferrer" className="text-xs text-white/25 hover:text-white/50 transition-colors">Privacy</a>
            <a href="https://app.termly.io/document/terms-of-service/05984678-8f92-45f7-ba8e-ad68bc99f94b" target="_blank" rel="noreferrer" className="text-xs text-white/25 hover:text-white/50 transition-colors">Terms</a>
            <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=2a58c3f5-4008-4ef9-b878-9c494ecd5598#cookies" target="_blank" rel="noreferrer" className="text-xs text-white/25 hover:text-white/50 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
