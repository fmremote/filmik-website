import { motion } from "motion/react";
import {
  FolderOpen,
  FileText,
  Calendar,
  Clapperboard,
  FileStack,
  Image,
  Mail,
  Bell,
  Users,
  UserCircle,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { siteContent } from "../../content/siteContent";

const featureStyles = [
  [FolderOpen, "from-blue-500/15 to-blue-500/5", "text-blue-400"], [FileText, "from-violet-500/15 to-violet-500/5", "text-violet-400"], [Calendar, "from-emerald-500/15 to-emerald-500/5", "text-emerald-400"], [Clapperboard, "from-amber-500/15 to-amber-500/5", "text-amber-400"], [FileStack, "from-rose-500/15 to-rose-500/5", "text-rose-400"], [Image, "from-sky-500/15 to-sky-500/5", "text-sky-400"], [Mail, "from-indigo-500/15 to-indigo-500/5", "text-indigo-400"], [Bell, "from-orange-500/15 to-orange-500/5", "text-orange-400"], [Users, "from-teal-500/15 to-teal-500/5", "text-teal-400"], [UserCircle, "from-pink-500/15 to-pink-500/5", "text-pink-400"], [LayoutGrid, "from-cyan-500/15 to-cyan-500/5", "text-cyan-400"], [Sparkles, "from-fuchsia-500/15 to-fuchsia-500/5", "text-fuchsia-400"],
] as const;

export function Features() {
  const features = siteContent.platformFeatures.cards.map(([title, description], index) => ({ title, description, icon: featureStyles[index][0], color: featureStyles[index][1], iconColor: featureStyles[index][2] }));
  return (
    <section id="features" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#07070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(59,130,246,0.04),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs font-semibold tracking-wider uppercase mb-6">
            {siteContent.platformFeatures.eyebrow}
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {siteContent.platformFeatures.heading[0]}
            <br />
            <span className="text-white/40">{siteContent.platformFeatures.heading[1]}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] p-6 transition-all duration-300 overflow-hidden"
                initial={false}
                whileHover={{ y: -3 }}
              >
                {/* Corner glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.color} rounded-2xl`} />

                <div className="relative flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold mb-1.5 text-white/90"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
