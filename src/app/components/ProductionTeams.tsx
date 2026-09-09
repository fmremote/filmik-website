import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Clapperboard, FolderKanban, LayoutGrid, X } from "lucide-react";
import { siteContent } from "../../content/siteContent";

type ModuleDetail = {
  eyebrow: string;
  title: string;
  intro: string;
  points: Array<{ title: string; copy: string }>;
};

const moduleStyles = [
  { icon: FolderKanban, color: "text-blue-300", bg: "from-blue-500/20 to-blue-500/5", border: "hover:border-blue-400/40" },
  { icon: Clapperboard, color: "text-violet-300", bg: "from-violet-500/20 to-violet-500/5", border: "hover:border-violet-400/40" },
  { icon: LayoutGrid, color: "text-emerald-300", bg: "from-emerald-500/20 to-emerald-500/5", border: "hover:border-emerald-400/40" },
  { icon: CalendarDays, color: "text-amber-300", bg: "from-amber-500/20 to-amber-500/5", border: "hover:border-amber-400/40" },
] as const;

export const moduleDetails: ModuleDetail[] = [
  {
    eyebrow: "Filmik Overall",
    title: "Your Department, In One Place",
    intro: "Filmik is built on a simple, powerful promise: one platform, one location, always current. Every file, document, and crew detail has a permanent, secure home.",
    points: [
      { title: "Intelligent File Architecture", copy: "Files live once in secure storage and appear across folders through smart references, so updates apply everywhere instantly." },
      { title: "Dual Storage for Preservation", copy: "Original files remain in full quality while platform-optimized versions keep viewing, sharing, and indexing fast on set." },
      { title: "Dynamic Visibility & Smart Access", copy: "Each person sees a workspace built for their role. If they do not have access to a file, the folder simply does not appear." },
      { title: "Final Presentation Folders", copy: "Package final assets, media, equipment lists, budget details, and safety documentation into polished cross-department reviews." },
    ],
  },
  {
    eyebrow: "Scene Cards",
    title: "Turn scripts into collaborative action plans.",
    intro: "Filmik redefines how departments break down and prepare scripts by transforming static text into actionable, collaborative data sheets.",
    points: [
      { title: "Automated Script Breakdown", copy: "Automatically identify relevant action information and use it to pre-populate Scene Cards, giving the department an organized starting point to review and expand." },
      { title: "Shared Scene Information", copy: "Keep characters, action notes, equipment, and safety details together in one card that the appropriate team members can access." },
      { title: "Ready for Department Review", copy: "Refine stunt sequences, equipment, performer details, and notes together as the scene develops, without scattering the work across documents." },
      { title: "Standardized Scene Numbering", copy: "Use combined season-episode-scene numbering for block shoots, avoiding duplicate scene numbers across scripts." },
    ],
  },
  {
    eyebrow: "Submission Board",
    title: "Make every submission feel considered.",
    intro: "The Looks Submission Module gives department heads a cinematic digital presentation for performer and asset options.",
    points: [
      { title: "Professional Portfolio Presentation", copy: "Replace email attachments and cluttered PDFs with a photography-portfolio-style showcase on an elegant black canvas." },
      { title: "Two-Level Submission Kits", copy: "Performers keep a general media kit, then tailor photos, video, reels, and self-tapes for a specific role without changing their public profile." },
      { title: "Frictionless Review & Selection", copy: "Decision-makers can compare 1 to 15 candidates, review media, add private comments, like favorites, and select candidates or backups." },
      { title: "Automated Team Onboarding", copy: "Selections are archived with a timestamp. Chosen performers are notified and imported directly to the project team board." },
    ],
  },
  {
    eyebrow: "Calendars & Scheduling",
    title: "Keep large teams in sync, wherever they work.",
    intro: "Schedule your team, organize production dates, and keep everyone aligned as the schedule changes across departments.",
    points: [
      { title: "Multi-View Team Board", copy: "Filter crews by daily schedules, weekly calendars, departments, roles, or episodes to make large team coordination easier." },
      { title: "Reuse Schedule Details", copy: "Move shoots, fittings, and rehearsals to new dates without rebuilding the details your team already needs." },
      { title: "Smart Time Zone Architecture", copy: "Location shifts automatically adjust notification timing and display clear zone conversions so nobody misses a call time." },
      { title: "Week Lock Protection", copy: "Protect locked performer schedules with explicit warnings and admin overrides to help prevent costly cancellation penalties." },
    ],
  },
];

type ModuleDetailModalProps = {
  activeModule: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
};

export function ModuleDetailModal({ activeModule, onClose, onSelect }: ModuleDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [activeModule]);

  if (activeModule === null) return null;
  const activeDetail = moduleDetails[activeModule];
  const previous = (activeModule + moduleDetails.length - 1) % moduleDetails.length;
  const next = (activeModule + 1) % moduleDetails.length;

  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-2 backdrop-blur-md sm:p-5" role="dialog" aria-modal="true" aria-labelledby="module-detail-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.div initial={{ opacity: 0, scale: 0.98, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="flex h-[96dvh] w-full max-w-none flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#09111b] shadow-2xl sm:h-[92dvh] sm:w-[96vw] sm:rounded-3xl">
      <header className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{activeDetail.eyebrow}</p><button type="button" onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Close module details"><X className="h-5 w-5" /></button></header>
      <div ref={contentRef} className="relative min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(ellipse_80%_100%_at_100%_0%,rgba(59,130,246,0.2),transparent_55%),radial-gradient(ellipse_70%_90%_at_0%_100%,rgba(14,165,233,0.13),transparent_60%),linear-gradient(135deg,rgba(17,24,39,0.98),rgba(8,15,27,0.96))] px-5 py-9 sm:px-10 sm:py-12 lg:px-16"><div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto max-w-[90rem]"><h3 id="module-detail-title" className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>{activeDetail.title}</h3><p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">{activeDetail.intro}</p><div className="mt-10 grid gap-4 sm:grid-cols-2">{activeDetail.points.map((point, index) => <article key={point.title} className="rounded-2xl border border-white/[0.12] bg-[#07111f]/55 p-5 backdrop-blur-sm"><div className="mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">0{index + 1}</div><h4 className="font-semibold text-white">{point.title}</h4><p className="mt-2 text-sm leading-relaxed text-white/60">{point.copy}</p></article>)}</div></div>
      </div>
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] px-5 py-4 sm:px-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">{activeModule + 1} / {moduleDetails.length}</p><div className="flex items-center gap-2"><button type="button" onClick={() => onSelect(previous)} className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white">Previous</button><div className="hidden gap-1 sm:flex">{moduleDetails.map((module, index) => <button key={module.eyebrow} type="button" onClick={() => onSelect(index)} aria-label={`Open ${module.eyebrow}`} className={`h-2 w-2 rounded-full transition ${index === activeModule ? "w-6 bg-primary" : "bg-white/25 hover:bg-white/50"}`} />)}</div><button type="button" onClick={() => onSelect(next)} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90">Next</button></div></footer>
    </motion.div>
  </div>;
}

export function ProductionTeams() {
  const { solutions } = siteContent;
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <section id="solutions" className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070d] to-[#0b0b14]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div className="mb-10 text-center sm:mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">{solutions.eyebrow}</div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>{solutions.heading[0]} <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{solutions.heading[1]}</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {solutions.cards.map((module, index) => {
            const style = moduleStyles[index];
            const Icon = style.icon;
            return <motion.button key={module.title} type="button" onClick={() => setActiveModule(index)} data-analytics-event="module_detail_open" data-analytics-label={module.title} data-analytics-location="stunt_departments" className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] ${style.border} bg-white/[0.02] p-7 text-left transition-all duration-300`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} viewport={{ once: true }}>
              <div className={`absolute inset-0 bg-gradient-to-b ${style.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative"><div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${style.bg}`}><Icon className={`h-6 w-6 ${style.color}`} /></div><h3 className="mb-2 text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{module.title}</h3><p className="mb-6 text-sm leading-relaxed text-white/45">{module.tagline}</p><ul className="mb-6 space-y-2">{module.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-white/55"><span className={`h-1 w-1 rounded-full ${style.color.replace("text-", "bg-")}`} />{feature}</li>)}</ul><span className={`flex items-center gap-1.5 text-xs font-semibold ${style.color}`}>Explore module <ArrowRight className="h-3.5 w-3.5" /></span></div>
            </motion.button>;
          })}
        </div>
      </div>

      <ModuleDetailModal activeModule={activeModule} onClose={() => setActiveModule(null)} onSelect={setActiveModule} />
    </section>
  );
}
