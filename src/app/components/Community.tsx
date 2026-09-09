import { motion } from "motion/react";
import { Newspaper, Calendar as CalendarIcon, Megaphone, Trophy, FileText, ArrowRight } from "lucide-react";
import { siteContent } from "../../content/siteContent";

const itemStyles = [
  {
    icon: Newspaper,
    color: "text-blue-400",
    bg: "from-blue-500/15 to-blue-500/5",
    border: "hover:border-blue-500/25", href: "https://www.linkedin.com/company/filmikio",
  },
  {
    icon: CalendarIcon,
    color: "text-violet-400",
    bg: "from-violet-500/15 to-violet-500/5",
    border: "hover:border-violet-500/25", href: "https://www.instagram.com/filmiknation/",
  },
  {
    icon: Megaphone,
    color: "text-emerald-400",
    bg: "from-emerald-500/15 to-emerald-500/5",
    border: "hover:border-emerald-500/25", href: "https://x.com/filmiknation",
  },
  {
    icon: Trophy,
    color: "text-amber-400",
    bg: "from-amber-500/15 to-amber-500/5",
    border: "hover:border-amber-500/25", href: "https://www.youtube.com/@filmiknation",
  },
  {
    icon: FileText,
    color: "text-rose-400",
    bg: "from-rose-500/15 to-rose-500/5",
    border: "hover:border-rose-500/25", href: "https://www.linkedin.com/company/filmikio",
  },
];

export function Community() {
  const items = siteContent.community.cards.map(([title, description], index) => ({ ...itemStyles[index], title, description }));
  const { community } = siteContent;
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
            {community.eyebrow}
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {community.heading[0]}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {community.heading[1]}
            </span>
          </h2>
          <p className="text-lg text-white/45 max-w-xl mx-auto">
            {community.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === items.length - 1;
            return (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                data-analytics-event="community_link_open"
                data-analytics-label={item.title}
                data-analytics-location="community"
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
                  {community.exploreCta} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
