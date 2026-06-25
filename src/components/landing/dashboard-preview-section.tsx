import { motion } from "motion/react";
import type { ReactNode } from "react";

import {
   AlertCircleIcon,
   ArrowDownIcon,
   ArrowRightIcon,
   CheckCircle2Icon,
   GaugeIcon,
   GitCompareIcon,
   KeyRoundIcon,
   SparklesIcon,
   TrendingUpIcon,
   type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { DarkPanel } from "@/components/ui/dark-panel";
import { SectionHeader } from "@/components/landing/feature-section";

const series = [42, 51, 58, 67, 74, 81, 86];

function DashboardPreviewSection() {
   return (
      <section
         className="mx-auto w-full max-w-310 px-3 sm:px-6"
         id="dashboard-preview"
      >
         <SectionHeader
            eyebrow="Inside the product"
            title={<>Every metric you'd ask for. None you wouldn't.</>}
            subTitle="A real glimpse at the dashboard you'll be using in two minutes."
         />

         <DarkPanel className="mt-12 rounded-4xl p-4 sm:p-8 lg:p-10">
            <div className="grid gap-4 md:grid-cols-12 lg:gap-5">
               {/* KPI row */}
               <KpiCard
                  className="col-span-12 md:col-span-3"
                  icon={GaugeIcon}
                  label="ATS Score"
                  value="86"
                  suffix="/100"
                  delta="+18%"
               />
               <KpiCard
                  className="col-span-12 md:col-span-3"
                  icon={GitCompareIcon}
                  label="Versions"
                  value="4"
                  delta="+2"
               />
               <KpiCard
                  className="col-span-12 md:col-span-3"
                  icon={AlertCircleIcon}
                  label="Issues Fixed"
                  value="11"
                  delta="+7"
               />
               <KpiCard
                  className="col-span-12 md:col-span-3"
                  icon={KeyRoundIcon}
                  label="Keywords Matched"
                  value="24"
                  suffix="/26"
                  delta="+9"
                  accent
               />

               {/* Score evolution */}
               <DarkCard className="col-span-12 lg:col-span-7">
                  <div className="mb-4 flex items-start justify-between">
                     <div>
                        <div className="text-[11px] font-semibold tracking-wide text-white/45 uppercase">
                           Score Evolution
                        </div>
                        <div className="font-display mt-1 text-base font-semibold text-white">
                           V1 → V4 over 3 weeks
                        </div>
                     </div>
                     <div className="tabular inline-flex items-center justify-center gap-1 rounded-full bg-[rgba(143,179,156,0.16)] py-0.5 text-[10px] font-semibold text-[#B6CFC0] max-sm:w-full max-sm:max-w-18 sm:px-2">
                        <TrendingUpIcon
                           size={10}
                           strokeWidth={2.5}
                        />
                        +44 pts
                     </div>
                  </div>

                  <div className="mb-3 flex items-baseline gap-2">
                     <div className="font-display tabular text-[44px] leading-none font-semibold tracking-tight text-white">
                        86
                     </div>
                     <div className="text-[12px] text-white/50">/ 100</div>
                  </div>

                  <AreaChart />
               </DarkCard>

               {/* Score breakdown */}
               <DarkCard className="col-span-12 lg:col-span-5">
                  <div className="text-[11px] font-semibold tracking-wide text-white/45 uppercase">
                     Score breakdown
                  </div>
                  <div className="font-display mt-1 mb-4 text-base font-semibold text-white">
                     Where you're winning
                  </div>
                  {[
                     { label: "Keywords", value: 88 },
                     { label: "Format & ATS parsing", value: 74 },
                     { label: "Impact statements", value: 91 },
                     { label: "Readability", value: 82 },
                     { label: "Action verbs", value: 79 },
                  ].map((b, i) => (
                     <div
                        key={b.label}
                        className="mb-3 last:mb-0"
                     >
                        <div className="mb-1 flex justify-between text-[11px] text-white/55">
                           <span>{b.label}</span>
                           <span className="tabular font-semibold text-white">{b.value}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                           <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${b.value}%` }}
                              viewport={{ once: true }}
                              transition={{
                                 duration: 0.9,
                                 delay: 0.1 + i * 0.03,
                                 ease: [0.16, 1, 0.3, 1],
                              }}
                              className="h-full rounded-full"
                              style={{
                                 background: "linear-gradient(90deg, #8FB39C 0%, #B6CFC0 100%)",
                              }}
                           />
                        </div>
                     </div>
                  ))}
               </DarkCard>

               {/* Bullet rewrite */}
               <DarkCard className="col-span-12 lg:col-span-7">
                  <div className="mb-4 flex items-center justify-between">
                     <div>
                        <div className="text-[11px] font-semibold tracking-wide text-white/45 uppercase">
                           Bullet rewrite
                        </div>
                        <div className="font-display mt-1 text-base font-semibold text-white">
                           Apply all → new version
                        </div>
                     </div>
                     <div className="inline-flex items-center justify-center gap-1 rounded-full bg-[rgba(143,179,156,0.14)] py-1 text-[10px] font-semibold text-[#B6CFC0] max-sm:w-full max-sm:max-w-22 sm:gap-1.5 sm:px-2.5">
                        <SparklesIcon size={10} /> AI rewrite
                     </div>
                  </div>

                  <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_24px_1fr]">
                     <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                        <div className="mb-1 text-[9px] font-semibold tracking-wide text-white/45 uppercase">
                           Original
                        </div>
                        <div className="text-[12.5px] leading-snug text-white/70">
                           Built dashboards for the analytics team
                        </div>
                     </div>
                     <div className="flex justify-center text-white/30">
                        <ArrowRightIcon
                           size={16}
                           className="max-sm:hidden"
                        />
                        <ArrowDownIcon
                           size={16}
                           className="sm:hidden"
                        />
                     </div>
                     <div className="rounded-xl border border-[rgba(143,179,156,0.22)] bg-[rgba(143,179,156,0.10)] p-3">
                        <div className="mb-1 text-[9px] font-semibold tracking-wide text-[#B6CFC0] uppercase">
                           Rewritten
                        </div>
                        <div className="text-[12.5px] leading-snug text-white">
                           Shipped 4 React dashboards adopted by 12k users — cut load time 38%.
                        </div>
                     </div>
                  </div>
               </DarkCard>

               {/* Issues + strengths */}
               <DarkCard className="col-span-12 lg:col-span-5">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <div className="mb-2 flex items-center gap-1.5 text-[#D4847C]">
                           <AlertCircleIcon size={12} />
                           <span className="text-[11px] font-semibold tracking-wide uppercase">
                              Issues
                           </span>
                        </div>
                        {["Weak verbs", "Missing keywords", "Inconsistent dates"].map((s) => (
                           <div
                              key={s}
                              className="border-b border-white/4 py-1 text-[11.5px] text-white/65 last:border-0"
                           >
                              {s}
                           </div>
                        ))}
                     </div>
                     <div>
                        <div className="mb-2 flex items-center gap-1.5 text-[#8FB39C]">
                           <CheckCircle2Icon size={12} />
                           <span className="text-[11px] font-semibold tracking-wide uppercase">
                              Strengths
                           </span>
                        </div>
                        {["Quantified outcomes", "Clean structure", "Strong action verbs"].map(
                           (s) => (
                              <div
                                 key={s}
                                 className="border-b border-white/4 py-1 text-[11.5px] text-white/65 last:border-0"
                              >
                                 {s}
                              </div>
                           ),
                        )}
                     </div>
                  </div>
               </DarkCard>
            </div>
         </DarkPanel>
      </section>
   );
}

export default DashboardPreviewSection;

function DarkCard({ className = "", children }: { className?: string; children: ReactNode }) {
   return (
      <div
         className={cn(
            "rounded-2xl border border-white/[0.07] bg-white/3 p-5 backdrop-blur-sm",
            className,
         )}
      >
         {children}
      </div>
   );
}

function KpiCard({
   className = "",
   icon: Icon,
   label,
   value,
   suffix,
   delta,
   accent,
}: {
   className?: string;
   accent?: boolean;
   delta?: string;
   suffix?: string;
   value?: string;
   label?: string;
   icon: LucideIcon;
}) {
   return (
      <div
         className={cn(
            `rounded-2xl border p-5`,
            accent
               ? "border-[rgba(143,179,156,0.3)] bg-linear-to-br from-[#2F4A3A] to-[#1A2B22]"
               : "border-white/[0.07] bg-white/3",
            className,
         )}
      >
         <div className="mb-3 flex items-center gap-2">
            <div
               className={cn(
                  `flex h-7 w-7 items-center justify-center rounded-full`,
                  accent ? "bg-white/15 text-white" : "bg-[rgba(143,179,156,0.14)] text-[#B6CFC0]",
               )}
            >
               <Icon size={13} />
            </div>
            <span className="text-[11px] text-white/55">{label}</span>
         </div>
         <div className="flex items-baseline gap-1">
            <span className="font-display tabular text-3xl font-semibold tracking-tight text-white">
               {value}
            </span>
            {suffix && <span className="text-[12px] text-white/45">{suffix}</span>}
         </div>
         {delta && (
            <div className="tabular mt-2 inline-flex items-center gap-1 rounded-full bg-[rgba(143,179,156,0.14)] px-2 py-0.5 text-[10px] font-semibold text-[#8FB39C]">
               {delta}
            </div>
         )}
      </div>
   );
}

function AreaChart() {
   const w = 600;
   const h = 140;
   const stepX = w / (series.length - 1);
   const path = series
      .map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - (p / 100) * h}`)
      .join(" ");
   const area = `${path} L ${w} ${h} L 0 ${h} Z`;
   return (
      <svg
         viewBox={`0 0 ${w} ${h}`}
         className="h-35 w-full"
      >
         <defs>
            <linearGradient
               id="dpAreaGrad"
               x1="0"
               y1="0"
               x2="0"
               y2="1"
            >
               <stop
                  offset="0%"
                  stopColor="#8FB39C"
                  stopOpacity="0.35"
               />
               <stop
                  offset="100%"
                  stopColor="#8FB39C"
                  stopOpacity="0"
               />
            </linearGradient>
         </defs>
         <motion.path
            d={area}
            fill="url(#dpAreaGrad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
         />
         <motion.path
            d={path}
            fill="none"
            stroke="#B6CFC0"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
         />
         {series.map((p, i) => (
            <circle
               key={i}
               cx={i * stepX}
               cy={h - (p / 100) * h}
               r="3.5"
               fill="#16181D"
               stroke="#B6CFC0"
               strokeWidth="2"
            />
         ))}
      </svg>
   );
}
