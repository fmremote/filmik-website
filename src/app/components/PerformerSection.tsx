import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Award,
  Image,
  Video,
  FileText,
  Camera,
  Palette,
  Shirt,
  Link2,
  CheckCircle2,
} from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { BrowserFrame } from "./BrowserFrame";

const features = [
  { icon: User, label: "Bio & Skills", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Image, label: "Photo Gallery", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: Video, label: "Video Reel", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Camera, label: "Self-Tape", color: "text-rose-400", bg: "bg-rose-500/10" },
  { icon: FileText, label: "Submission Kit", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: Palette, label: "Hair & Makeup", color: "text-pink-400", bg: "bg-pink-500/10" },
  { icon: Shirt, label: "Wardrobe Kit", color: "text-sky-400", bg: "bg-sky-500/10" },
  { icon: Award, label: "Credits", color: "text-orange-400", bg: "bg-orange-500/10" },
  { icon: Link2, label: "Shareable URL", color: "text-teal-400", bg: "bg-teal-500/10" },
];

export function PerformerSection() {
  const { performers } = siteContent;
  const [profileCopied, setProfileCopied] = useState(false);
  return (
    <section id="performers" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#07070d]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_50%,rgba(139,92,246,0.06),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-12 sm:gap-16">
          {/* Profile mockup follows the performer story on every viewport. */}
          <motion.div
            className="order-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-4 bg-violet-500/10 blur-3xl rounded-3xl opacity-60" />
              <a href={performers.profile.url} target="_blank" rel="noreferrer" data-analytics-event="profile_link_open" data-analytics-label="Filmik public profile" data-analytics-location="performer_profile" className="relative block transition-transform hover:scale-[1.01]">
                <BrowserFrame src="/images/performer-profile.webp" alt="Filmik performer profile" status="Profile ready" />
              </a>
              <div className="hidden">
              <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl bg-[#0f0f1c]">
                {/* Cover */}
                <div className="relative h-32 sm:h-44 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=700&h=220&fit=crop&auto=format"
                    alt="Profile cover"
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-600/30 to-[#0f0f1c]" />
                </div>

                {/* Avatar */}
                <div className="absolute top-16 sm:top-24 left-5 sm:left-7">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-[#0f0f1c] bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-2xl">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-white/80" />
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 sm:px-7 pt-12 sm:pt-16 pb-5 sm:pb-7">
                  <div className="mb-4 sm:mb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-5 sm:h-6 w-32 sm:w-40 bg-white/10 rounded" />
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    </div>
                    <div className="h-3 w-44 sm:w-52 bg-white/[0.06] rounded" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    {performers.profile.stats.map(([label, val]) => ({ label, val })).map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                          {s.val}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-white/35">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Media thumbnails */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {[
                      "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=200&h=200&fit=crop&auto=format",
                      "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=200&h=200&fit=crop&auto=format",
                      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=200&fit=crop&auto=format",
                      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop&auto=format",
                      "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=200&h=200&fit=crop&auto=format",
                      "https://images.unsplash.com/photo-1627508028672-83a3e7b55370?w=200&h=200&fit=crop&auto=format",
                    ].map((src, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden bg-white/[0.04]">
                        <img src={src} alt="" className="w-full h-full object-cover opacity-60" />
                      </div>
                    ))}
                  </div>

                  {/* Share link */}
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <Link2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <a href={performers.profile.url} target="_blank" rel="noreferrer" data-analytics-event="profile_link_open" data-analytics-label="Filmik public profile" data-analytics-location="performer_profile" className="truncate font-mono text-[10px] text-primary/80 transition hover:text-primary hover:underline sm:text-xs">{performers.profile.url}</a>
                    <button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard?.writeText(performers.profile.url);
                        setProfileCopied(true);
                      }}
                      data-analytics-event="profile_link_copy"
                      data-analytics-label="Filmik profile URL"
                      data-analytics-location="performer_profile"
                      className="ml-auto flex-shrink-0 text-[10px] font-semibold text-primary hover:text-primary/80 sm:text-xs"
                    >
                      {profileCopied ? "Copied" : performers.profile.copyCta}
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 mx-auto max-w-3xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold tracking-wider uppercase mb-5 sm:mb-6">
              {performers.eyebrow}
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {performers.heading[0]}
              <br />
              {performers.heading[1]}
            </h2>
            <p className="text-sm sm:text-base text-white/50 mb-8 sm:mb-10 leading-relaxed">
              {performers.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.label}
                    className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.10] transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${feature.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${feature.color}`} />
                    </div>
                    <span className="text-xs font-medium text-white/60">{feature.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-violet-500/20">
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {performers.closing[0]}
                </p>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-display)" }}>
                  {performers.closing[1]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
