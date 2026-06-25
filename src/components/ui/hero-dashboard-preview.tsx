import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, TrendingUp } from "lucide-react";

const RADIUS = 78;
const ARC = Math.PI * RADIUS;
const SCORE = 86;
const PCT = SCORE / 100;

export function HeroDashboardPreview() {
   return (
      // Optimized container height rules to guarantee child cards never overflow bounding box context
      <div className="relative mx-auto flex w-full flex-col gap-4 select-none sm:block sm:h-130 sm:max-w-none">
         {/* 1. Main Gauge Card */}
         <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="overflow-hidden rounded-[22px] border border-white/8 p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] sm:absolute sm:top-6 sm:left-1/2 sm:w-75 sm:-translate-x-1/2"
            style={{
               background: "linear-gradient(160deg, #1F2A24 0%, #16181D 45%, #0F1115 100%)",

               boxShadow:
                  "0 24px 60px -12px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.06)",
            }}
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

            {/* SVG Progress Gauge */}

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
                           stopColor="#8FB39C"
                        />

                        <stop
                           offset="100%"
                           stopColor="#B6CFC0"
                        />
                     </linearGradient>
                  </defs>

                  <path
                     d={`M 22 105 A ${RADIUS} ${RADIUS} 0 0 1 178 105`}
                     fill="none"
                     stroke="rgba(255,255,255,0.08)"
                     strokeWidth="10"
                     strokeLinecap="round"
                  />

                  <motion.path
                     d={`M 22 105 A ${RADIUS} ${RADIUS} 0 0 1 178 105`}
                     fill="none"
                     stroke="url(#heroArc)"
                     strokeWidth="10"
                     strokeLinecap="round"
                     strokeDasharray={ARC}
                     initial={{ strokeDashoffset: ARC }}
                     animate={{ strokeDashoffset: ARC - ARC * PCT }}
                     transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="left-0 overflow-hidden rounded-[18px] border border-white/8 p-4 backdrop-blur sm:absolute sm:bottom-10 sm:w-57.5 lg:-left-5 xl:-left-4"
            style={{
               background:
                  "linear-gradient(155deg, rgba(31,42,36,0.92) 0%, rgba(22,24,29,0.92) 50%, rgba(15,17,21,0.92) 100%)",
               boxShadow:
                  "0 24px 60px -16px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.05)",
            }}
         >
            <div className="mb-3 flex items-center gap-2">
               <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/10 text-[#D4847C]">
                  <AlertCircle size={12} />
               </div>
               <div className="text-[11px] font-semibold text-white">Top issues</div>
               <div className="ml-auto font-mono text-[10px] text-white/45">5</div>
            </div>

            {[
               { label: "Weak action verbs", tone: "high" },
               { label: "Missing keywords: React, AWS", tone: "med" },
               { label: "Inconsistent dates", tone: "low" },
            ].map((it, i) => (
               <motion.div
                  key={it.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.08, duration: 0.35 }}
                  className="flex items-center gap-2 py-1.5"
               >
                  <div
                     className="h-1.5 w-1.5 shrink-0 rounded-full"
                     style={{
                        background:
                           it.tone === "high"
                              ? "#D4847C"
                              : it.tone === "med"
                                ? "#D4A86A"
                                : "#8FB39C",
                     }}
                  />
                  <div className="truncate text-[11px] text-white/75">{it.label}</div>
               </motion.div>
            ))}
         </motion.div>

         {/* 3. Floating AI Rewrite Card */}
         <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="right-0 bottom-4 overflow-hidden rounded-[18px] border border-white/8 p-4 backdrop-blur sm:absolute sm:w-65 lg:-right-3 xl:-right-2"
            style={{
               background:
                  "linear-gradient(155deg, rgba(31,42,36,0.92) 0%, rgba(22,24,29,0.92) 50%, rgba(15,17,21,0.92) 100%)",
               boxShadow:
                  "0 24px 60px -16px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.05)",
            }}
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

         {/* 4. Floating Keyword Pills */}
         <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-2 right-6 flex flex-col items-end gap-1.5 max-sm:hidden lg:right-0 xl:right-6"
         >
            {["React", "TypeScript", "AWS"].map((k, i) => (
               <motion.div
                  key={k}
                  animate={{ y: [0, -4, 0] }}
                  style={{ willChange: "transform", transform: "translateZ(0)" }} // Hardware Acceleration fixes jitter
                  transition={{
                     duration: 3.5 + i * 0.5,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: i * 0.2,
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur-md"
               >
                  +{k}
               </motion.div>
            ))}
         </motion.div>
      </div>
   );
}
