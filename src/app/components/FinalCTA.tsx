import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden" id="trial">
      <div className="absolute inset-0 bg-[#07070d]" />

      {/* Dramatic center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(59,130,246,0.12),transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/8 blur-[160px] rounded-full pointer-events-none" />

      {/* Horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Zap className="w-3 h-3" />
          Get Started Today
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-white">Spend Less Time</span>
          <br />
          <span className="text-white">Managing Production.</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-sky-400 to-accent bg-clip-text text-transparent">
            More Time Making It.
          </span>
        </motion.h2>

        <motion.p
          className="text-lg text-white/40 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.2 }}
        >
          Join 2,400+ production professionals already using Filmik to run
          faster, tighter, more organized productions. Pricing is upfront and
          your free trial starts in a few taps.
        </motion.p>

        <motion.div
          className="mb-12 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/42"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.24 }}
        >
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
            Compare plans by role
          </span>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
            Start free without a card
          </span>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5">
            Upgrade when your team is ready
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="#pricing"
            data-analytics-event="cta_click"
            data-analytics-label="Start Free Trial"
            data-analytics-location="final_cta"
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#workflow"
            data-analytics-event="cta_click"
            data-analytics-label="Review Workflow"
            data-analytics-location="final_cta"
            className="rounded-xl border border-white/[0.09] bg-white/[0.04] px-8 py-4 text-base font-semibold text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
          >
            Review Workflow
          </a>
        </motion.div>

        <motion.p
          className="mt-6 text-sm text-white/25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.45 }}
        >
          No credit card required · 7-day free trial · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
