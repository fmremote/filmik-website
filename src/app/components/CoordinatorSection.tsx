import { motion } from "motion/react";
import { FolderKanban, LayoutGrid, FileUp, Calendar, Clapperboard, Sparkles } from "lucide-react";

const workflows = [
  { icon: FolderKanban, label: "Managing projects", desc: "Centralized project hub", color: "text-blue-400", bg: "from-blue-500/15 to-blue-500/5" },
  { icon: LayoutGrid, label: "Submission Boards", desc: "Review talent with ease", color: "text-violet-400", bg: "from-violet-500/15 to-violet-500/5" },
  { icon: FileUp, label: "Sharing files", desc: "Secure, instant sharing", color: "text-emerald-400", bg: "from-emerald-500/15 to-emerald-500/5" },
  { icon: Calendar, label: "Assigning calendars", desc: "Team-wide scheduling", color: "text-amber-400", bg: "from-amber-500/15 to-amber-500/5" },
  { icon: Clapperboard, label: "Managing scenes", desc: "Visual scene tracking", color: "text-rose-400", bg: "from-rose-500/15 to-rose-500/5" },
  { icon: Sparkles, label: "AI Script Breakdown", desc: "Days of work in minutes", color: "text-fuchsia-400", bg: "from-fuchsia-500/15 to-fuchsia-500/5" },
];

export function CoordinatorSection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b14] to-[#07070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_50%,rgba(59,130,246,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-5 sm:mb-6">
            For Coordinators
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Purpose-Built for{" "}
            <span className="bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">
              Production
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-white/45 max-w-2xl mx-auto px-2">
            Real production workflow designed for how coordinators actually work — not how someone imagined they do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-10 sm:mb-16">
          {workflows.map((workflow, index) => {
            const Icon = workflow.icon;
            return (
              <motion.div
                key={workflow.label}
                className={`group relative rounded-xl sm:rounded-2xl border border-white/[0.07] hover:border-white/[0.12] bg-gradient-to-b ${workflow.bg} p-4 sm:p-6 transition-all duration-300`}
                initial={false}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${workflow.color}`} />
                  </div>
                  <div>
                    <h3
                      className="text-sm sm:text-base font-bold text-white mb-0.5 sm:mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {workflow.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/40">{workflow.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* App mockup */}
        <motion.div
          className="safari-stable relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          {/* Browser chrome */}
          <div className="bg-[#0f0f1c] border-b border-white/[0.06] px-3 sm:px-4 h-9 sm:h-10 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/40" />
            </div>
            <div className="flex-1 mx-2 sm:mx-4">
              <div className="h-3 sm:h-4 w-36 sm:w-44 rounded bg-white/[0.04] mx-auto flex items-center justify-center">
                <span className="text-[8px] sm:text-[9px] text-white/20 font-mono">app.filmik.io/productions/project-x</span>
              </div>
            </div>
          </div>

          {/* UI content */}
          <div className="bg-gradient-to-br from-[#0d0d1f] to-[#0a0a18] p-4 sm:p-6 lg:p-10">
            {/* Mobile: simplified stats only */}
            <div className="sm:hidden space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Scenes", val: "42", color: "text-blue-400" },
                  { label: "Submissions", val: "18", color: "text-emerald-400" },
                  { label: "Crew", val: "31", color: "text-violet-400" },
                  { label: "Shoot Days", val: "12", color: "text-amber-400" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3.5">
                    <div className={`text-2xl font-bold ${s.color} mb-1`} style={{ fontFamily: "var(--font-display)" }}>{s.val}</div>
                    <div className="text-xs text-white/30">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white/[0.025] border border-white/[0.05] rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-2 w-12 bg-white/10 rounded" />
                      <div className={`h-1.5 w-8 rounded ${i % 3 === 0 ? "bg-emerald-500/30" : i % 3 === 1 ? "bg-amber-500/30" : "bg-blue-500/30"}`} />
                    </div>
                    <div className="h-1.5 bg-white/[0.08] rounded w-full mb-1" />
                    <div className="h-1.5 bg-white/[0.05] rounded w-3/4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: full layout */}
            <div className="hidden sm:grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="h-8 bg-primary/20 rounded-lg mb-4 flex items-center px-3">
                  <div className="h-2 w-20 bg-primary/50 rounded" />
                </div>
                {["Dashboard", "Scene Cards", "Submissions", "Calendar", "Documents"].map((item, i) => (
                  <div key={item} className={`h-8 rounded-lg px-3 flex items-center ${i === 1 ? "bg-white/[0.06]" : "bg-white/[0.02]"}`}>
                    <div className="h-2 w-16 bg-white/[0.15] rounded" />
                  </div>
                ))}
              </div>
              <div className="lg:col-span-3 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="h-7 w-40 bg-white/10 rounded" />
                  <div className="h-7 w-28 bg-primary/25 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Scenes", val: "42", color: "text-blue-400" },
                    { label: "Submissions", val: "18", color: "text-emerald-400" },
                    { label: "Crew", val: "31", color: "text-violet-400" },
                    { label: "Shoot Days", val: "12", color: "text-amber-400" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4">
                      <div className={`text-xl font-bold ${s.color} mb-1`} style={{ fontFamily: "var(--font-display)" }}>{s.val}</div>
                      <div className="text-xs text-white/30">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white/[0.025] border border-white/[0.05] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-3 w-16 bg-white/10 rounded" />
                        <div className={`h-2 w-10 rounded ${i % 3 === 0 ? "bg-emerald-500/30" : i % 3 === 1 ? "bg-amber-500/30" : "bg-blue-500/30"}`} />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 bg-white/[0.08] rounded w-full" />
                        <div className="h-2 bg-white/[0.05] rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
