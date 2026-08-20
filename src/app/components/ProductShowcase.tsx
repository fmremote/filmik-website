import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const showcases = [
  {
    eyebrow: "Command Center",
    title: "Dashboard",
    description: "A bird's-eye view of all active projects, upcoming deadlines, and team activity. Know exactly where your production stands at any moment.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&h=550&fit=crop&auto=format",
    reverse: false,
    accent: "from-blue-500/20 to-sky-500/10",
    tag: "Live sync",
    count: 8,
  },
  {
    eyebrow: "Scene Management",
    title: "Scene Cards",
    description: "Visual scene management that coordinators love. Track every detail — location, talent, props, and notes — in beautifully organized cards.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&h=550&fit=crop&auto=format",
    reverse: true,
    accent: "from-violet-500/20 to-purple-500/10",
    tag: "42 scenes",
    count: 6,
  },
  {
    eyebrow: "Talent Review",
    title: "Submission Board",
    description: "Review talent submissions with ease. Side-by-side comparisons, collaborative notes, and streamlined decision-making — all in one place.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&h=550&fit=crop&auto=format",
    reverse: false,
    accent: "from-emerald-500/20 to-teal-500/10",
    tag: "18 pending",
    count: 8,
  },
  {
    eyebrow: "Time Management",
    title: "Calendars & Scheduling",
    description: "Production calendars that sync across your entire team. From shoot days to production meetings — keep everyone on the same schedule.",
    image: "https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?w=900&h=550&fit=crop&auto=format",
    reverse: true,
    accent: "from-amber-500/20 to-orange-500/10",
    tag: "Synced",
    count: 6,
  },
];

export function ProductShowcase() {
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
              <a href="#pricing" className="group flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                Explore {showcase.title}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Mockup */}
            <div className="flex-1 w-full">
              <motion.div
                className={`safari-stable relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.5)] bg-gradient-to-br ${showcase.accent}`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.35 }}
              >
                {/* Browser bar */}
                <div className="safari-blur-fix flex items-center gap-2 px-3 sm:px-4 h-8 sm:h-9 bg-[#0f0f1c]/80 border-b border-white/[0.05] backdrop-blur-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/40" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <div className="flex-1 mx-2 sm:mx-3">
                    <div className="h-3 sm:h-4 w-28 sm:w-40 rounded bg-white/[0.04] mx-auto flex items-center justify-center">
                      <span className="text-[8px] sm:text-[9px] text-white/20 font-mono">filmik.io</span>
                    </div>
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-semibold text-emerald-400/70 bg-emerald-400/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-400/20 whitespace-nowrap">
                    {showcase.tag}
                  </div>
                </div>

                {/* Image with overlay */}
                <div className="relative aspect-[4/3] sm:aspect-[16/9]">
                  <img
                    src={showcase.image}
                    alt={showcase.title}
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c] via-[#0f0f1c]/60 to-transparent" />

                  {/* UI overlay */}
                  <div className="absolute inset-0 p-3 sm:p-5 lg:p-7">
                    <div className="h-full flex flex-col gap-2 sm:gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="h-4 sm:h-5 w-20 sm:w-36 bg-white/10 rounded" />
                          <div className="h-4 sm:h-5 w-10 sm:w-16 bg-primary/30 rounded" />
                        </div>
                        <div className="h-4 sm:h-5 w-14 sm:w-20 bg-white/[0.06] rounded" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 flex-1">
                        {Array.from({ length: showcase.count }).map((_, i) => (
                          <div
                            key={i}
                            className="safari-blur-fix bg-white/[0.04] border border-white/[0.06] rounded-lg p-2 sm:p-3 backdrop-blur-sm"
                          >
                            <div className="h-2 sm:h-3 w-8 sm:w-12 bg-white/10 rounded mb-1 sm:mb-2" />
                            <div className="h-1.5 sm:h-2 w-12 sm:w-16 bg-white/[0.06] rounded mb-1" />
                            <div className="h-1.5 sm:h-2 w-8 sm:w-10 bg-white/[0.04] rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
