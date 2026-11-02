import { motion } from "motion/react";
import { siteContent } from "../../content/siteContent";

export function LogoCloud() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 border-y border-white/[0.05]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#07070d] via-transparent to-[#07070d]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <motion.p
          className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-white/25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {siteContent.trustedBy.heading}
        </motion.p>

        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
          {siteContent.trustedBy.companies.map((logo, index) => (
            <motion.div
              key={logo}
              className="rounded-xl border border-white/[0.1] bg-white/[0.025] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/65 transition-colors duration-300 hover:text-white/70 sm:border-white/[0.07] sm:text-white/45"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.07 }}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
