import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, TrendingUp } from "lucide-react";

const RADIUS = 78;
const ARC = Math.PI * RADIUS;
const SCORE = 86;
const PCT = SCORE / 100;

// Hoisted outside component — zero object recreation per render
const CARD_STYLE = {
   background: "linear-gradient(160deg, #0e1e20 0%, #081618 45%, #040e10 100%)",
   boxShadow: "0 24px 60px -12px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(42,184,192,0.07)",
} as const;

const FLOAT_STYLE = {
   background:
      "linear-gradient(155deg, rgba(14,30,32,0.92) 0%, rgba(8,22,24,0.92) 50%, rgba(4,14,16,0.92) 100%)",
   boxShadow: "0 24px 60px -16px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(42,184,192,0.05)",
} as const;

// Hoisted static JSX arrays — avoids re-creating on render
const ISSUES = [
   { label: "Weak action verbs", tone: "high" },
   { label: "Missing keywords: React, AWS", tone: "med" },
   { label: "Inconsistent dates", tone: "low" },
] as const;

const KEYWORDS = ["React", "TypeScript", "AWS"] as const;

const TONE_COLORS = {
   high: "#e05852", // --danger dark
   med: "#d0a460", // --warning dark
   low: "#2ab8c0", // --accent dark
} as const;

// Shared easing — hoisted constant
const SPRING = [0.16, 1, 0.3, 1] as const;

export function HeroDashboardPreview() {
   // Respects OS-level "Reduce Motion" — kills all animations instantly,
   // massively reducing jank on low-power devices
   const prefersReduced = useReducedMotion();

   return (
      <div className="relative mx-auto flex w-full flex-col gap-4 select-none sm:block sm:h-130 sm:max-w-none">
         {/* 1. Main Gauge Card */}
         <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SPRING, delay: 0.15 }}
            className="overflow-hidden rounded-[22px] border border-white/8 p-5 sm:absolute sm:top-6 sm:left-1/2 sm:w-75 sm:-translate-x-1/2"
            style={CARD_STYLE}
         >
            <div className="mb-3 flex items-center justify-between">
               <div>
                  <div className="text-[10px] font-semibold tracking-[0.16em] text-white/45 uppercase">
                     ATS Readiness
                  </div>
                  <div className="mt-0.5 max-w-35 truncate text-[11px] text-white/55">
                     Senior_Frontend.pdf
                  </div>
               </div>
               <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#8FB39C]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8FB39C]" />
                  Strong
               </div>
            </div>

            {/* SVG arc — animate a wrapper div opacity/transform instead of
                SVG path directly; avoids triggering stroke recalculation on
                every frame. The dashoffset animation is kept but isolated. */}
            <div className="relative mx-auto w-48 sm:w-50">
               <svg
                  viewBox="0 0 200 120"
                  className="block h-auto w-full"
               >
                  <defs>
                     <linearGradient
                        id="heroArc"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                     >
                        <stop
                           offset="0%"
                           stopColor="#0a484c"
                        />
                        <stop
                           offset="100%"
                           stopColor="#2ab8c0"
                        />
                     </linearGradient>
                  </defs>

                  {/* Track */}
                  <path
                     d={`M 22 105 A ${RADIUS} ${RADIUS} 0 0 1 178 105`}
                     fill="none"
                     stroke="rgba(42,184,192,0.12)"
                     strokeWidth="10"
                     strokeLinecap="round"
                  />

                  {/* Fill */}
                  <motion.path
                     d={`M 22 105 A ${RADIUS} ${RADIUS} 0 0 1 178 105`}
                     fill="none"
                     stroke="url(#heroArc)"
                     strokeWidth="10"
                     strokeLinecap="round"
                     strokeDasharray={ARC}
                     initial={{ strokeDashoffset: prefersReduced ? ARC * (1 - PCT) : ARC }}
                     animate={{ strokeDashoffset: ARC - ARC * PCT }}
                     transition={{ duration: 1.4, delay: 0.5, ease: SPRING }}
                     style={{ willChange: "stroke-dashoffset" }}
                  />
               </svg>
               <div className="absolute inset-x-0 top-[46%] flex flex-col items-center">
                  <div className="font-mono text-4xl font-semibold tracking-tight text-white">
                     {SCORE}
                  </div>
                  <div className="mt-0.5 text-[10px] text-white/45">out of 100</div>
               </div>
            </div>

            <div className="mt-3 flex items-center justify-center">
               <div className="inline-flex items-center gap-1 rounded-full bg-[#143122] px-2 py-1 text-[10px] font-semibold text-[#B6CFC0]">
                  <TrendingUp
                     size={10}
                     strokeWidth={2.5}
                  />
                  +18 vs V1
               </div>
            </div>
         </motion.div>

         {/* 2. Floating Issues Card */}
         <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: SPRING }}
            className="left-0 overflow-hidden rounded-[18px] border border-white/8 p-4 sm:absolute sm:bottom-10 sm:w-57.5 lg:-left-5 xl:-left-4"
            style={FLOAT_STYLE}
         >
            <div className="mb-3 flex items-center gap-2">
               <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/10 text-[#D4847C]">
                  <AlertCircle size={12} />
               </div>
               <div className="text-[11px] font-semibold text-white">Top issues</div>
               <div className="ml-auto font-mono text-[10px] text-white/45">5</div>
            </div>

            {ISSUES.map((it, i) => (
               <motion.div
                  key={it.label}
                  initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.08, duration: 0.35 }}
                  className="flex items-center gap-2 py-1.5"
               >
                  <div
                     className="h-1.5 w-1.5 shrink-0 rounded-full"
                     style={{ background: TONE_COLORS[it.tone] }}
                  />
                  <div className="truncate text-[11px] text-white/75">{it.label}</div>
               </motion.div>
            ))}
         </motion.div>

         {/* 3. Floating AI Rewrite Card */}
         <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: SPRING }}
            className="right-0 bottom-4 overflow-hidden rounded-[18px] border border-white/8 p-4 sm:absolute sm:w-65 lg:-right-3 xl:-right-2"
            style={FLOAT_STYLE}
         >
            <div className="mb-3 flex items-center gap-2">
               <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-[#B6CFC0]">
                  <Sparkles size={12} />
               </div>
               <div className="text-[11px] font-semibold text-white">AI rewrite</div>
               <div className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-[#B6CFC0]">
                  <CheckCircle2 size={9} /> improved
               </div>
            </div>
            <div className="mb-1 text-[10px] font-semibold tracking-wide text-white/40 uppercase">
               Before
            </div>
            <div className="text-[11px] leading-snug text-white/55 line-through">
               Worked on dashboards for the team
            </div>
            <div className="my-2 flex items-center gap-1.5 text-white/30">
               <ArrowRight size={11} />
               <span className="text-[9px] font-semibold tracking-wide text-[#B6CFC0] uppercase">
                  After
               </span>
            </div>
            <div className="text-[11px] leading-snug text-white">
               Shipped 4 React analytics dashboards used by 12k+ users, cutting load time 38%.
            </div>
         </motion.div>

         {/* 4. Keyword Pills — infinite animation is the heaviest part.
             Using CSS animation instead of Framer Motion removes it from
             the JS animation loop entirely. */}
         {!prefersReduced && (
            <div className="absolute top-2 right-6 flex flex-col items-end gap-1.5 max-sm:hidden lg:right-0 xl:right-6">
               {KEYWORDS.map((k, i) => (
                  <div
                     key={k}
                     className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur-md"
                     style={{
                        animation: `pillarFloat ${3.5 + i * 0.5}s ease-in-out ${i * 0.2}s infinite`,
                        willChange: "transform",
                     }}
                  >
                     +{k}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
