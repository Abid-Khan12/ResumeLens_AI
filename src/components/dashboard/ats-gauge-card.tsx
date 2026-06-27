import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const RADIUS = 130;
const ARC_LENGTH = Math.PI * RADIUS; // length of a half circle

export type Tone = "success" | "warning" | "danger" | "neutral" | "accent";

function statusFor(score: number): { label: string; tone: Tone } {
   if (score >= 85) return { label: "Excellent", tone: "success" };
   if (score >= 70) return { label: "Strong", tone: "success" };
   if (score >= 55) return { label: "Fair", tone: "warning" };
   if (score > 0) return { label: "Needs work", tone: "danger" };
   return { label: "No score", tone: "neutral" };
}

function useCountUp(target: number | null | undefined, duration: number = 1100): number {
   const [value, setValue] = useState<number>(0);

   useEffect(() => {
      if (target == null) return;

      const start = performance.now();
      let raf: number;

      const tick = (now: number) => {
         const t = Math.min(1, (now - start) / duration);
         const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart

         setValue(Math.round(target * eased));

         if (t < 1) {
            raf = requestAnimationFrame(tick);
         }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
   }, [target, duration]);

   return value;
}

export default function AtsGauge({ score = 0, delta = 0 }) {
   const safeScore = Math.max(0, Math.min(100, score || 0));
   const pct = safeScore / 100;
   const dashLength = ARC_LENGTH * pct;
   const status = statusFor(safeScore);
   const animated = useCountUp(safeScore);

   const DeltaIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;

   return (
      <Card className="flex h-full flex-col">
         <CardHeader>
            <div>
               <CardTitle className="lg:text-sm xl:text-base">ATS Readiness</CardTitle>
               <CardDescription className="mt-1 leading-relaxed max-[375px]:text-xs lg:text-xs">
                  How well your resume parses for ATS
               </CardDescription>
            </div>
            <Badge tone={status.tone}>{status.label}</Badge>
         </CardHeader>

         <div className="flex flex-1 flex-col items-center justify-between gap-5 py-2 pb-0">
            <div className="relative w-full max-w-90">
               <svg
                  viewBox="0 0 300 170"
                  className="block h-auto w-full"
                  preserveAspectRatio="xMidYMid meet"
               >
                  <defs>
                     <linearGradient
                        id="atsGrad"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                     >
                        <stop
                           offset="0%"
                           stopColor="var(--accent)"
                        />
                        <stop
                           offset="100%"
                           stopColor="var(--accent-strong)"
                        />
                     </linearGradient>
                  </defs>

                  {/* Track */}
                  <path
                     d={`M 20 155 A ${RADIUS} ${RADIUS} 0 0 1 280 155`}
                     fill="none"
                     stroke="var(--surface-2)"
                     strokeWidth="14"
                     strokeLinecap="round"
                  />

                  {/* Value arc */}
                  <motion.path
                     d={`M 20 155 A ${RADIUS} ${RADIUS} 0 0 1 280 155`}
                     fill="none"
                     stroke="url(#atsGrad)"
                     strokeWidth="14"
                     strokeLinecap="round"
                     strokeDasharray={ARC_LENGTH}
                     initial={{ strokeDashoffset: ARC_LENGTH }}
                     animate={{ strokeDashoffset: ARC_LENGTH - dashLength }}
                     transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
               </svg>

               {/* Score sitting inside the bowl */}
               <div className="pointer-events-none absolute inset-x-0 top-[46%] flex flex-col items-center">
                  <div className="text-forground-muted text-[10px] font-semibold tracking-[0.16em] uppercase">
                     ATS Score
                  </div>
                  <div className="font-display tabular mt-1.5 text-[32px] leading-none font-semibold tracking-tight min-[375px]:text-[60px]">
                     {animated}
                  </div>
                  <div className="text-forground-muted mt-1 text-[11px]">out of 100</div>
               </div>
            </div>

            {/* Delta pill — below the gauge */}
            <div
               className={cn(
                  "tabular inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  delta > 0 && "bg-accent-soft text-success",
                  delta < 0 && "text-danger bg-[#F8E3E0]",
                  delta === 0 && "text-forground-muted bg-surface-2",
               )}
            >
               <DeltaIcon
                  size={11}
                  strokeWidth={2.5}
               />
               {delta > 0 ? "+" : ""}
               {delta} vs last analysis
            </div>
         </div>
      </Card>
   );
}
