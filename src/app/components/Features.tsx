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

const features = [
  { icon: FolderOpen, title: "Projects", description: "Organize productions with comprehensive project management and real-time team visibility.", color: "from-blue-500/15 to-blue-500/5", iconColor: "text-blue-400" },
  { icon: FileText, title: "Script Breakdown", description: "Detailed scene-by-scene analysis, categorization, and automated element extraction.", color: "from-violet-500/15 to-violet-500/5", iconColor: "text-violet-400" },
  { icon: Calendar, title: "Calendars", description: "Production schedules and timeline coordination across your entire team.", color: "from-emerald-500/15 to-emerald-500/5", iconColor: "text-emerald-400" },
  { icon: Clapperboard, title: "Scene Cards", description: "Visual scene management with location, talent, and equipment at a glance.", color: "from-amber-500/15 to-amber-500/5", iconColor: "text-amber-400" },
  { icon: FileStack, title: "General Documents", description: "Centralized document management, version control, and secure sharing.", color: "from-rose-500/15 to-rose-500/5", iconColor: "text-rose-400" },
  { icon: Image, title: "Media", description: "Asset management for all production media, organized by scene and department.", color: "from-sky-500/15 to-sky-500/5", iconColor: "text-sky-400" },
  { icon: Mail, title: "Memos", description: "Internal production communication with read receipts and threaded replies.", color: "from-indigo-500/15 to-indigo-500/5", iconColor: "text-indigo-400" },
  { icon: Bell, title: "Notifications", description: "Stay updated on every production change with intelligent alerts.", color: "from-orange-500/15 to-orange-500/5", iconColor: "text-orange-400" },
  { icon: Users, title: "Member Directory", description: "Searchable crew and talent directory with roles, availability, and contact info.", color: "from-teal-500/15 to-teal-500/5", iconColor: "text-teal-400" },
  { icon: UserCircle, title: "Public Profiles", description: "Professional performer profiles and portfolios discoverable by coordinators.", color: "from-pink-500/15 to-pink-500/5", iconColor: "text-pink-400" },
  { icon: LayoutGrid, title: "Submission Boards", description: "Talent submission management, side-by-side review, and collaborative decisions.", color: "from-cyan-500/15 to-cyan-500/5", iconColor: "text-cyan-400" },
  { icon: Sparkles, title: "AI", description: "AI-powered script breakdown — what took days now takes minutes.", color: "from-fuchsia-500/15 to-fuchsia-500/5", iconColor: "text-fuchsia-400" },
];

export function Features() {
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
            Platform Features
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Everything You Need.
            <br />
            <span className="text-white/40">Nothing You Don&apos;t.</span>
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
