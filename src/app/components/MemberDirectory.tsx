import { ArrowRight, BriefcaseBusiness, Search, UserRoundPlus } from "lucide-react";
import { motion } from "motion/react";

const audiences = [
  {
    icon: Search,
    title: "For coordinators and department heads",
    lead: "Find the right talent without chasing down information.",
    points: ["Search people, skills, credits, and project-ready materials", "Review the information you need in one place", "Add the right people to a project with the right access"],
  },
  {
    icon: UserRoundPlus,
    title: "For performers",
    lead: "Put your work in front of the people who need it.",
    points: ["Build one professional Filmik profile", "Share your work, media, and relevant details clearly", "Be easier to discover when a department is building its team"],
  },
];

export function MemberDirectory() {
  return (
    <section id="directory" className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-[#0b0b14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div className="mx-auto mb-12 max-w-3xl text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <BriefcaseBusiness className="h-3.5 w-3.5" /> The Filmik Directory
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            The right people, <span className="bg-gradient-to-r from-primary to-sky-300 bg-clip-text text-transparent">ready when you need them.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">For coordinators and department heads, Filmik makes it easier to find talent, review the information that matters, and bring the right people onto a project. For performers, it is a professional place to present their work to the people doing the hiring.</p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          {audiences.map(({ icon: Icon, title, lead, points }) => (
            <motion.article key={title} className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 sm:p-9" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary"><Icon className="h-6 w-6" /></div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="mt-3 text-base text-white/60">{lead}</p>
              <ul className="mt-6 space-y-3">{points.map((point) => <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/55"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{point}</li>)}</ul>
            </motion.article>
          ))}
        </div>
        <p className="mx-auto mt-9 max-w-2xl text-center text-base text-white/55">One directory that works both ways: better access for departments, better visibility for performers.</p>
        <a href="#pricing" className="mx-auto mt-7 flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">Explore the Directory <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}
