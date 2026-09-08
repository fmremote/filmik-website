import { motion } from "motion/react";
import { siteContent } from "../../content/siteContent";

export function LogoCloud() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 border-y border-white/[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070d] via-transparent to-[#07070d] pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
        <motion.p
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-white/25 mb-10"
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
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/45 transition-colors duration-300 hover:text-white/70"
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
