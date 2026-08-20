import { motion } from "motion/react";
import { FolderKanban, User, Users, Briefcase, ArrowRight } from "lucide-react";

const teams = [
  {
    icon: FolderKanban,
    title: "Coordinators",
    tagline: "Run every submission, scene, and schedule from one place.",
    features: ["Projects", "Submission Boards", "Calendars", "Scene Cards", "Communication"],
    color: "from-blue-500/20 to-blue-600/10",
    border: "hover:border-blue-500/30",
    iconColor: "text-blue-400",
    iconBg: "from-blue-500/20 to-blue-500/10",
  },
  {
    icon: User,
    title: "Performers",
    tagline: "One professional profile. One link. Ready for coordinators.",
    features: ["Public Profiles", "Submission Kits", "Self-Tapes", "Media Kits", "Visibility"],
    color: "from-violet-500/20 to-violet-600/10",
    border: "hover:border-violet-500/30",
    iconColor: "text-violet-400",
    iconBg: "from-violet-500/20 to-violet-500/10",
  },
  {
    icon: Users,
    title: "Production Teams",
    tagline: "Every department in sync, from pre-production to wrap.",
    features: ["Documents", "Media", "Crew", "Schedules", "Approvals"],
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "hover:border-emerald-500/30",
    iconColor: "text-emerald-400",
    iconBg: "from-emerald-500/20 to-emerald-500/10",
  },
  {
    icon: Briefcase,
    title: "Independent Productions",
    tagline: "Everything needed to run production without spreadsheets.",
    features: ["All core tools", "No IT required", "Start in minutes", "Scales with you"],
    color: "from-amber-500/20 to-amber-600/10",
    border: "hover:border-amber-500/30",
    iconColor: "text-amber-400",
    iconBg: "from-amber-500/20 to-amber-500/10",
  },
];

export function ProductionTeams() {
  return (
    <section id="solutions" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070d] to-[#0b0b14]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs font-semibold tracking-wider uppercase mb-6">
            Built for everyone on set
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built For Every{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Production Team
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {teams.map((team, index) => {
            const Icon = team.icon;
            return (
              <motion.div
                key={team.title}
                className={`group relative flex flex-col rounded-2xl border border-white/[0.07] ${team.border} bg-white/[0.02] p-7 transition-all duration-300 cursor-pointer overflow-hidden`}
                initial={false}
                whileHover={{ y: -4 }}
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${team.color}`} />

                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${team.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${team.iconColor}`} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2 text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {team.title}
                  </h3>
                  <p className="text-sm text-white/40 mb-6 leading-relaxed">{team.tagline}</p>
                  <ul className="space-y-2 mb-6">
                    {team.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/50">
                        <span className={`w-1 h-1 rounded-full ${team.iconColor.replace("text-", "bg-")}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${team.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
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
