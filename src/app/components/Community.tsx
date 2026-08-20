import { motion } from "motion/react";
import { Newspaper, Calendar as CalendarIcon, Megaphone, Trophy, FileText, ArrowRight } from "lucide-react";

const items = [
  {
    icon: Newspaper,
    title: "Industry News",
    description: "Stay current with the latest from film & TV — casting trends, studio news, and production updates.",
    color: "text-blue-400",
    bg: "from-blue-500/15 to-blue-500/5",
    border: "hover:border-blue-500/25",
  },
  {
    icon: CalendarIcon,
    title: "Events",
    description: "Production workshops, networking events, and community meetups for film professionals.",
    color: "text-violet-400",
    bg: "from-violet-500/15 to-violet-500/5",
    border: "hover:border-violet-500/25",
  },
  {
    icon: Megaphone,
    title: "Product Updates",
    description: "Be the first to know about new features, improvements, and releases across Filmik.",
    color: "text-emerald-400",
    bg: "from-emerald-500/15 to-emerald-500/5",
    border: "hover:border-emerald-500/25",
  },
  {
    icon: Trophy,
    title: "Stunt Previz Showdown",
    description: "Annual community competition showcasing the best stunt previsualization work from our members.",
    color: "text-amber-400",
    bg: "from-amber-500/15 to-amber-500/5",
    border: "hover:border-amber-500/25",
  },
  {
    icon: FileText,
    title: "Release Notes",
    description: "Detailed changelog with every fix, improvement, and addition to the Filmik platform.",
    color: "text-rose-400",
    bg: "from-rose-500/15 to-rose-500/5",
    border: "hover:border-rose-500/25",
  },
];

export function Community() {
  return (
    <section id="news" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070d] to-[#0b0b14]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs font-semibold tracking-wider uppercase mb-6">
            Community
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-lg text-white/45 max-w-xl mx-auto">
            Stay connected with production professionals worldwide. Learn, share, and grow together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === items.length - 1;
            return (
              <motion.div
                key={item.title}
                className={`group relative rounded-2xl border border-white/[0.07] ${item.border} bg-gradient-to-b ${item.bg} p-7 cursor-pointer transition-all duration-300 ${
                  isLast ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
                initial={false}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3
                  className="text-xl font-bold mb-2.5 text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed mb-5">{item.description}</p>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
