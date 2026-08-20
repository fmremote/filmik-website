import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, X, Play } from "lucide-react";

type HeroProps = {
  isWorkflowVideoOpen: boolean;
  onOpenWorkflowVideo: () => void;
  onCloseWorkflowVideo: () => void;
  onOpenRequestAccess: () => void;
};

export function Hero({
  isWorkflowVideoOpen,
  onOpenWorkflowVideo,
  onCloseWorkflowVideo,
  onOpenRequestAccess,
}: HeroProps) {

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseWorkflowVideo();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onCloseWorkflowVideo]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden" id="top">
      <div id="workflow" className="absolute top-0" />
      <div className="absolute inset-0 bg-[#02060b]" />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/media/home-loop-poster.jpg"
      >
        <source src="/media/home-loop.webm" type="video/webm" />
        <source src="/media/home-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(60,130,246,0.22),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,11,0.56)_0%,rgba(2,6,11,0.3)_30%,rgba(2,6,11,0.72)_100%)]" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Eyebrow badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/60 text-xs font-medium tracking-wide mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Now with AI Script Breakdown
            <ArrowRight className="w-3.5 h-3.5 text-primary" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-5 sm:mb-7 leading-[1.08]"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
              The Operating System
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-[#8CA2C2] to-secondary bg-clip-text text-transparent">
              for Film &amp; TV Production
            </span>
          </motion.h1>

          {/* CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              type="button"
              onClick={onOpenRequestAccess}
              data-analytics-event="cta_click"
              data-analytics-label="Request Access"
              data-analytics-location="hero"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 sm:w-auto"
            >
              Request Access
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={onOpenWorkflowVideo}
              data-analytics-event="cta_click"
              data-analytics-label="Explore Workflow"
              data-analytics-location="hero"
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-red-300/40 bg-red-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-red-950/50 transition-all hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-2xl hover:shadow-red-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1621] sm:w-auto"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              Explore Workflow
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/40 sm:mt-10 sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span>2,400+ production professionals</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Private access for film &amp; TV teams</span>
          </motion.div>
        </div>
      </div>

      {isWorkflowVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="workflow-video-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onCloseWorkflowVideo();
          }}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#101722] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
              <h2 id="workflow-video-title" className="text-base font-semibold text-white">
                Explore the Filmik workflow
              </h2>
              <button
                type="button"
                onClick={onCloseWorkflowVideo}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close workflow video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Fl5FyQX8md4?autoplay=1"
                title="Filmik workflow video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
