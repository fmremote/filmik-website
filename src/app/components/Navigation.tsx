import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

const navLinks = [
  { href: "#solutions", label: "Solutions" },
  { href: "#workflow", label: "Workflow" },
  { href: "#pricing", label: "Pricing" },
];

type NavigationProps = {
  onOpenWorkflowVideo: () => void;
  onOpenRequestAccess: () => void;
};

export function Navigation({ onOpenWorkflowVideo, onOpenRequestAccess }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className={`safari-stable fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-[#0d1621]/90 backdrop-blur-2xl border-b border-[#8ca2c2]/12 safari-blur-fix"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <a href="#top" className="flex flex-shrink-0 items-center" aria-label="Filmik home">
              <img
                src="/filmik-logo-white.svg"
                alt="Filmik"
                className="h-7 w-auto sm:h-8"
              />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenWorkflowVideo}
                data-analytics-event="cta_click"
                data-analytics-label="See Workflow"
                data-analytics-location="navigation_desktop"
                className="px-3 py-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                See Workflow
              </button>
              <button
                type="button"
                onClick={onOpenRequestAccess}
                data-analytics-event="cta_click"
                data-analytics-label="Request Access"
                data-analytics-location="navigation_desktop"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0"
              >
                Request Access
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={onOpenRequestAccess}
                data-analytics-event="cta_click"
                data-analytics-label="Request Access"
                data-analytics-location="navigation_mobile"
                className="rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
              >
                Request Access
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="safari-blur-fix absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <motion.div
            className="safari-stable absolute top-16 left-0 right-0 bg-[#111827] border-b border-[#8ca2c2]/15 px-5 py-6 space-y-1"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-4 rounded-2xl border border-primary/20 bg-primary/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                Request access
              </p>
              <p className="mt-2 text-sm text-white/75">
                Tell us who you are and which department you work in to request an invitation.
              </p>
            </div>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="flex items-center h-12 text-base font-medium text-white/70 hover:text-white transition-colors rounded-lg px-3 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                {link.label}
              </motion.a>
            ))}

            <div className="pt-4 pb-2 flex flex-col gap-3 border-t border-white/[0.06] mt-4">
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center rounded-lg text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                data-analytics-event="cta_click"
                data-analytics-label="Explore Workflow"
                data-analytics-location="navigation_drawer"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenWorkflowVideo();
                }}
              >
                Explore Workflow
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenRequestAccess();
                }}
                data-analytics-event="cta_click"
                data-analytics-label="Request Access"
                data-analytics-location="navigation_drawer"
                className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                Request Access
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {!mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#8ca2c2]/15 bg-[#0d1621]/92 px-4 py-3 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-md items-center gap-2">
            <a
              href="#pricing"
              data-analytics-event="cta_click"
              data-analytics-label="See Plans"
              data-analytics-location="sticky_mobile_bar"
              className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm font-semibold text-white/85"
            >
              See Plans
            </a>
            <button
              type="button"
              onClick={onOpenRequestAccess}
              data-analytics-event="cta_click"
              data-analytics-label="Request Access"
              data-analytics-location="sticky_mobile_bar"
              className="flex h-12 flex-[1.3] items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-lg shadow-primary/25"
            >
              Request Access
            </button>
          </div>
        </div>
      )}
    </>
  );
}
