import { motion } from "motion/react";

const logos = [
  "Warner Bros",
  "Netflix",
  "HBO",
  "Amazon Studios",
  "Disney+",
  "Paramount",
  "Apple TV+",
  "Sony Pictures",
];

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
          Trusted by production professionals worldwide
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              className="text-sm font-bold text-white/15 hover:text-white/40 transition-colors duration-300 tracking-wider uppercase"
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
