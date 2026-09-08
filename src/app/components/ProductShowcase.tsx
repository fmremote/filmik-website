import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { ModuleDetailModal } from "./ProductionTeams";
import { BrowserFrame } from "./BrowserFrame";

const showcaseStyles = [
  {
    image: "/images/command-center.webp",
    reverse: false,
  },
  {
    image: "/images/scene-cards.webp",
    reverse: true,
  },
  {
    image: "/images/submission-boards.webp",
    reverse: false,
  },
  {
    image: "/images/calendar.webp",
    reverse: true,
  },
];

export function ProductShowcase() {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const showcases = siteContent.workflow.cards.map(([eyebrow, title, description, tag], index) => ({ ...showcaseStyles[index], eyebrow, title, description, tag }));
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden" id="workflow">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070d] to-[#0b0b14]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 space-y-20 sm:space-y-28 lg:space-y-36">
        {showcases.map((showcase, index) => (
          <motion.div
            key={showcase.title}
            className={`safari-stable flex flex-col ${showcase.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 sm:gap-12 lg:gap-20 items-center`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Content */}
            <div className="flex-1 w-full lg:max-w-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-5">
                {showcase.eyebrow}
              </div>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {showcase.title}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                {showcase.description}
              </p>
              <button type="button" onClick={() => setActiveModule(index)} data-analytics-event="workflow_detail_open" data-analytics-label={showcase.title} data-analytics-location="workflow_showcase" className="group flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                {siteContent.workflow.explorePrefix} {showcase.title}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mockup */}
            <div className="flex-1 w-full">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.35 }}
              >
                <BrowserFrame src={showcase.image} alt={`${showcase.title} in Filmik`} status={showcase.tag} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      <ModuleDetailModal activeModule={activeModule} onClose={() => setActiveModule(null)} onSelect={setActiveModule} />
    </section>
  );
}
