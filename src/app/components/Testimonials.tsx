import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Filmik has completely transformed how we manage our productions. The submission board alone has saved us countless hours every single casting cycle.",
    author: "Sarah Chen",
    role: "Production Coordinator",
    company: "HBO",
    avatar: "SC",
    gradient: "from-blue-500 to-cyan-500",
    stars: 5,
  },
  {
    quote: "As a performer, having a professional profile I can share instantly has been a game-changer. Coordinators love how clean and complete it is.",
    author: "Marcus Johnson",
    role: "Actor & Stunt Performer",
    company: "SAG-AFTRA",
    avatar: "MJ",
    gradient: "from-violet-500 to-purple-600",
    stars: 5,
  },
  {
    quote: "The AI script breakdown is incredible. What used to take days now takes minutes, and it's more accurate than manual breakdown every time.",
    author: "Emily Rodriguez",
    role: "Script Supervisor",
    company: "Warner Bros",
    avatar: "ER",
    gradient: "from-rose-500 to-pink-600",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden" id="testimonials">
      <div className="absolute inset-0 bg-[#07070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(59,130,246,0.04),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs font-semibold tracking-wider uppercase mb-6">
            Testimonials
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Production Teams
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] p-8 transition-all duration-300 flex flex-col"
              initial={false}
              whileHover={{ y: -4 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-white/65 leading-relaxed mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06]">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                >
                  <span className="text-white text-xs font-bold">{t.avatar}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-white/40">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
