import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { trackEvent } from "../../lib/analytics";

type Role = "coordinators" | "producers" | "performers";

const roleData: Record<
  Role,
  { label: string; description: string; plans: Plan[] }
> = {
  coordinators: {
    label: "Coordinators",
    description: "Tools built for casting and production coordinators running submissions, talent, and scene management.",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "",
        badge: null,
        description: "Get started at no cost",
        features: [
          "1 active project",
          "Public profile",
          "Member directory",
          "Basic collaboration",
          "Community access",
        ],
        cta: "Get Started",
        highlighted: false,
      },
      {
        name: "Coordinator Pro",
        price: "$29",
        period: "/mo",
        badge: "Most Popular",
        description: "Billed annually · Save 20%",
        features: [
          "Unlimited projects",
          "Submission boards",
          "Scene cards",
          "Production calendars",
          "File & media sharing",
          "Memos & notifications",
          "Priority support",
        ],
        cta: "Start Free Trial",
        highlighted: true,
      },
      {
        name: "Team",
        price: "$79",
        period: "/mo",
        badge: null,
        description: "Billed annually · Up to 10 seats",
        features: [
          "Everything in Pro",
          "10 team seats included",
          "Script breakdown (AI)",
          "Advanced analytics",
          "Custom workflows",
          "SSO & permissions",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        badge: null,
        description: "For large studios and networks",
        features: [
          "Unlimited seats",
          "Dedicated success manager",
          "Custom integrations",
          "SLA & uptime guarantee",
          "On-prem option available",
          "Legal & compliance review",
        ],
        cta: "Book a Demo",
        highlighted: false,
      },
    ],
  },
  producers: {
    label: "Producers",
    description: "Full production lifecycle management — from greenlight to wrap — for independent producers and studios.",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "",
        badge: null,
        description: "Explore core tools",
        features: [
          "1 active project",
          "Basic documents",
          "Member directory",
          "Community access",
        ],
        cta: "Get Started",
        highlighted: false,
      },
      {
        name: "Indie Producer",
        price: "$19",
        period: "/mo",
        badge: null,
        description: "Billed annually",
        features: [
          "3 active projects",
          "Script breakdown",
          "Production calendars",
          "Scene cards",
          "General documents",
          "Crew management",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Production Pro",
        price: "$59",
        period: "/mo",
        badge: "Most Popular",
        description: "Billed annually · Save 20%",
        features: [
          "Unlimited projects",
          "AI script breakdown",
          "Submission boards",
          "Full calendar suite",
          "Media & asset management",
          "Advanced reporting",
          "Priority support",
        ],
        cta: "Start Free Trial",
        highlighted: true,
      },
      {
        name: "Studio",
        price: "Custom",
        period: "",
        badge: null,
        description: "For studios with multiple productions",
        features: [
          "Multi-project dashboard",
          "Cross-production analytics",
          "Custom approval flows",
          "Dedicated account manager",
          "API & integrations",
          "Enterprise security",
        ],
        cta: "Contact Sales",
        highlighted: false,
      },
    ],
  },
  performers: {
    label: "Performers",
    description: "Professional profiles and submission tools that help performers get seen, hired, and remembered.",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "",
        badge: null,
        description: "Start building your presence",
        features: [
          "Public performer profile",
          "Shareable profile URL",
          "Basic bio & skills",
          "Photo uploads (up to 10)",
          "Member directory listing",
        ],
        cta: "Create Profile",
        highlighted: false,
      },
      {
        name: "Non-Union",
        price: "$5",
        period: "/mo",
        badge: null,
        description: "7-day free trial",
        features: [
          "Everything in Free",
          "Submission kit",
          "Unlimited media uploads",
          "Featured self-tape",
          "Hair & makeup kit",
          "Wardrobe kit",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Performer Pro",
        price: "$9",
        period: "/mo",
        badge: "Best Value",
        description: "Billed annually · Save 20%",
        features: [
          "Everything in Non-Union",
          "Priority listing in search",
          "Advanced visibility tools",
          "Multiple submission kits",
          "Analytics & profile views",
          "Coordinator direct messaging",
          "Featured placement",
        ],
        cta: "Start Free Trial",
        highlighted: true,
      },
      {
        name: "Agency",
        price: "Custom",
        period: "",
        badge: null,
        description: "For talent agencies & rosters",
        features: [
          "Managed talent profiles",
          "Bulk submission tools",
          "Agency dashboard",
          "Branded profile pages",
          "Priority coordinator access",
          "Dedicated support",
        ],
        cta: "Contact Sales",
        highlighted: false,
      },
    ],
  },
};

type Plan = {
  name: string;
  price: string;
  period: string;
  badge: string | null;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

export function Pricing() {
  const [activeRole, setActiveRole] = useState<Role>("coordinators");

  const { description, plans } = roleData[activeRole];
  const featuredPlan = plans.find((plan) => plan.highlighted) ?? plans[0];

  const roles: { key: Role; label: string }[] = [
    { key: "coordinators", label: "Coordinators" },
    { key: "producers", label: "Producers" },
    { key: "performers", label: "Performers" },
  ];

  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070d] via-[#0c0c18] to-[#07070d]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
            <Zap className="w-3 h-3" />
            Pricing
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="mb-8 grid gap-4 lg:grid-cols-[1.35fr_0.9fr]"
          initial={false}
        >
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
              <Sparkles className="h-3.5 w-3.5" />
              Free-trial funnel
            </div>
            <h3
              className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Start on the pricing wall, not in a sales queue.
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Pick your role", "Coordinator, producer, or performer pricing tuned to your workflow."],
                ["Choose the fastest path", "Jump into the recommended plan first, then compare the rest."],
                ["Start your trial", "No credit card required to begin your 7-day free trial."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/42">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
              Recommended first click
            </p>
            <h3
              className="mt-3 text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {featuredPlan.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              {featuredPlan.description}. Best starting point for teams ready to replace spreadsheets with one shared production workspace.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/30">What you unlock</p>
              <ul className="mt-3 space-y-2">
                {featuredPlan.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/75">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#pricing-cards"
              data-analytics-event="cta_click"
              data-analytics-label="Compare plans"
              data-analytics-location="pricing_intro"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/25"
            >
              Compare plans
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Role toggle */}
        <motion.div
          className="flex justify-center mb-10 sm:mb-14 px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.1 }}
        >
          <div className="safari-blur-fix inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm w-full sm:w-auto max-w-xs sm:max-w-none">
            {roles.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  trackEvent("pricing_role_change", { role: key });
                  setActiveRole(key);
                }}
                className={`relative flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeRole === key
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {activeRole === key && (
                  <motion.div
                    layoutId="pricing-pill"
                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          key={activeRole}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          id="pricing-cards"
          initial={false}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? "order-first sm:order-none border-primary/50 bg-gradient-to-b from-primary/10 to-primary/5 shadow-2xl shadow-primary/15"
                  : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12]"
              }`}
              initial={false}
              whileHover={{ y: -3 }}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg shadow-primary/30 whitespace-nowrap">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-7">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold tracking-widest uppercase text-white/40">
                      {plan.name}
                    </p>
                    {plan.highlighted && (
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="flex items-end gap-1 mb-1.5">
                    <span
                      className="text-4xl font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-white/40 text-sm mb-1.5">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/35">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? "bg-primary/20" : "bg-white/[0.06]"
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            plan.highlighted ? "text-primary" : "text-white/40"
                          }`}
                        />
                      </div>
                      <span className="text-sm text-white/65">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#top"
                  data-analytics-event="cta_click"
                  data-analytics-label={plan.cta}
                  data-analytics-location={`pricing_card_${activeRole}`}
                  className={`flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:-translate-y-px"
                      : "bg-white/[0.06] hover:bg-white/[0.10] text-white/70 hover:text-white border border-white/[0.08]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="mt-8 text-center text-sm text-white/30 sm:mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.4 }}
        >
          All paid plans start with a 7-day free trial. No credit card required to explore the workflow first.
        </motion.p>
      </div>
    </section>
  );
}
