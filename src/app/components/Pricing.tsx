import { Check, CircleDashed, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

type Plan = {
  name: string;
  audience: string;
  description: string;
  price: string;
  period?: string;
  badge?: string;
  features: string[];
  coming?: string[];
  cta: string;
  featured?: boolean;
};

const plans: Plan[] = [
  { name: "Basic", audience: "For Talent", description: "Great for talent wanting basic exposure.", price: "$0", period: "/ month", features: ["Access to Basic level", "Talent data and profile", "Talent Kits", "Basic level media"], cta: "Request Access" },
  { name: "Pro", audience: "For Talent", description: "Great for talent wanting to be considered for production submissions and networking.", price: "$9", period: "/ month", badge: "Most Popular", featured: true, features: ["Premium Visual Branding", "Prioritized Search Results", "Enhanced Media Integration", "Professional Connectivity", "Enhanced Photo Management", "Dedicated Looks and Submissions"], coming: ["Advanced Skill Ratings", "Access to Hustle Features", "Profile Analytics", "Availability Calendar", "Job Board", "Public Facing Profile"], cta: "Request Access" },
  { name: "Department Heads", audience: "For Coordinators", description: "Great for managing all aspects of feature and episodic productions.", price: "Custom", period: "Pricing", features: ["Access to Production Suite", "Feature and Episodic Projects", "Team Management", "Team Calendar", "Production Memos", "Script Breakdown", "Scene Cards and Notes", "Private Previz", "Document Repository", "Enhanced Workflow Security", "Localization for Main Markets", "Multi-role for Users", "Access to Archives"], coming: ["Budget Assistant", "Risk Assessments", "Team Management enhancements"], cta: "Request Access" },
  { name: "Enterprise", audience: "For Production Companies", description: "Great for production companies that need to organize and grant access to production teams.", price: "Custom", period: "Pricing", features: ["All Department Head features", "Production Hubs", "User Groups", "Access Controls"], coming: ["Reporting and Analytics", "Promotional Codes", "Dedicated Account Manager", "Custom Integrations", "Priority Support"], cta: "Request Access" },
];

type PricingProps = {
  onOpenRequestAccess: () => void;
};

export function Pricing({ onOpenRequestAccess }: PricingProps) {
  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b14] via-[#080b12] to-[#07070d]" />
      <div className="absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div className="mx-auto mb-12 max-w-3xl text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-6 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">Choose Your Plan</div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>Plans for talent, department heads, and production teams.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50">Start with the access that fits your role today. Upgrade when your work and team need more.</p>
        </motion.div>

        <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <motion.article key={plan.name} className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${plan.featured ? "border-primary/50 bg-primary/[0.08] shadow-2xl shadow-primary/10" : "border-white/[0.08] bg-white/[0.025]"}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}>
              {plan.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/30 bg-[#111b2a] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">{plan.badge}</span>}
              <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{plan.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary/90">{plan.audience}</p>
              <p className="mt-5 min-h-16 text-sm leading-relaxed text-white/55">{plan.description}</p>
              <div className="mt-7 flex items-end gap-1"><span className="text-3xl font-bold text-white">{plan.price}</span>{plan.period && <span className="mb-1 text-sm font-semibold text-white/60">{plan.period}</span>}</div>
              {plan.price !== "Custom" && <p className="mt-1 text-xs text-white/35">Billed yearly</p>}
              <button type="button" onClick={onOpenRequestAccess} data-analytics-event="cta_click" data-analytics-label={plan.cta} data-analytics-location={`pricing_${plan.name.toLowerCase().replaceAll(" ", "_")}`} className={`mt-5 flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition ${plan.featured ? "bg-primary text-white hover:bg-primary/90" : "border border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/[0.1]"}`}>{plan.cta}</button>
              <div className="mt-7 border-t border-white/[0.07] pt-6"><p className="text-xs font-semibold text-white/70">Key Features</p><ul className="mt-4 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-xs leading-relaxed text-white/60"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />{feature}</li>)}</ul></div>
              {plan.coming && <div className="mt-7 border-t border-white/[0.07] pt-6"><p className="text-xs font-semibold text-white/70">Coming to Filmik</p><ul className="mt-4 space-y-3">{plan.coming.map((feature) => <li key={feature} className="flex gap-2 text-xs leading-relaxed text-white/42"><CircleDashed className="mt-0.5 h-3.5 w-3.5 shrink-0" />{feature}</li>)}</ul></div>}
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center sm:p-8"><h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Compare Plans</h3><p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/50">Filmik offers flexible membership tiers for every stage of production. Basic provides essential access to talent profiles and media. Pro for Talent adds professional tools for stronger presentation and connection. Department Heads gain production-management capabilities, while Enterprise adds the controls and support needed for larger teams.</p><button type="button" onClick={onOpenRequestAccess} data-analytics-event="cta_click" data-analytics-label="Request help choosing a plan" data-analytics-location="pricing_compare" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">Request help choosing a plan <ArrowRight className="h-4 w-4" /></button><p className="mt-6 text-xs text-white/30">* Coming features.</p></div>
      </div>
    </section>
  );
}
