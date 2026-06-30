import type { ReactNode } from "react";
import { motion } from "motion/react";

import {
   //  CheckCircle2,
   FileDown,
   Gauge,
   GitCompare,
   KeyRound,
   Layers,
   LineChart,
   Sparkles,
   //  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
   {
      icon: Gauge,
      title: "ATS Score Analysis",
      desc: "Section-level scoring against the same parsers Greenhouse and Lever run.",
      preview: <ScoreBarsPreview />,
      span: "lg:col-span-2",
   },
   {
      icon: Sparkles,
      title: "AI Resume Rewrite",
      desc: "Bullets rewritten in your voice, with quantified outcomes — not generic fluff.",
      preview: <RewritePreview />,
   },
   {
      icon: KeyRound,
      title: "Keyword Optimization",
      desc: "Auto-matches your resume against any job description, surfaces what's missing.",
      preview: <KeywordsPreview />,
   },
   {
      icon: Layers,
      title: "Version History",
      desc: "Every iteration scored, dated, and one click away.",
      preview: <VersionsPreview />,
   },
   {
      icon: GitCompare,
      title: "Diff Comparison",
      desc: "See exactly what changed between V1 and V3 — line by line.",
      preview: <DiffPreview />,
   },
   {
      icon: LineChart,
      title: "Analytics Dashboard",
      desc: "Track score evolution, keywords matched, and issues resolved over time.",
      preview: <ChartPreview />,
      span: "lg:col-span-2",
   },
   {
      icon: FileDown,
      title: "PDF Export",
      desc: "Rebuilt with a clean ATS-friendly template — never trust your old layout again.",
      preview: <PdfPreview />,
   },
   //  {
   //     icon: CheckCircle2,
   //     title: "Semantic Schema Parsing",
   //     desc: "Guaranteed JSON structured syntax validation protecting against hidden character breaks.",
   //     preview: <AccuracyPreview />,
   //     span: "lg:col-span-2",
   //  },
   //  {
   //     icon: Zap,
   //     title: "Instant AI Feedback",
   //     desc: "Sub-15 second analysis powered by Gemini with structured output.",
   //     preview: <SpeedPreview />,
   //  },
];

function FeatureSection() {
   return (
      <section
         className="mx-auto w-full max-w-310 px-3 sm:px-6"
         id="features"
      >
         <SectionHeader
            eyebrow="Features"
            title={
               <>
                  Everything your resume needs to{" "}
                  <span
                     style={{
                        backgroundImage:
                           "linear-gradient(120deg, #0f7278 0%, #0a484c 60%, #0f7278 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                     }}
                  >
                     actually land.
                  </span>
               </>
            }
            subTitle="Eight surgical tools built around one workflow: upload, analyze, rewrite, ship."
         />

         <motion.div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, ...item }, i) => (
               <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  key={item.title}
                  className={cn(
                     "group shadow-card rounded-card relative w-full space-y-5 overflow-hidden border bg-linear-to-b from-[#FFFFFF] from-0% to-[#FBFBF7] to-100% p-5 transition-shadow duration-300 sm:p-6 dark:bg-none",
                     item.span,
                  )}
               >
                  {/* Inset light */}
                  <div
                     aria-hidden
                     className="pointer-events-none absolute inset-x-0 top-0 h-px"
                     style={{
                        background:
                           "linear-gradient(90deg, transparent, rgba(91,124,106,0.25), transparent)",
                     }}
                  />
                  {/* Inset light */}

                  {/* Corner hover effect */}
                  <div
                     aria-hidden
                     className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                     style={{
                        background:
                           "radial-gradient(circle, rgba(143,179,156,0.28) 0%, rgba(143,179,156,0) 65%)",
                        filter: "blur(20px)",
                     }}
                  />
                  {/* Corner hover effect */}

                  <div className="flex items-start gap-3">
                     <div className="dark:bg-accent-soft bg-accent-soft text-accent-strong flex size-10 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 dark:shadow-none">
                        <Icon
                           size={17}
                           strokeWidth={2.5}
                        />
                     </div>
                     <div>
                        <h4 className="font-display text-lg font-semibold tracking-tight">
                           {item.title}
                        </h4>
                        <p className="text-forground-muted mt-1 text-sm leading-relaxed">
                           {item.desc}
                        </p>
                     </div>
                  </div>
                  {item.preview}
               </motion.div>
            ))}
         </motion.div>
      </section>
   );
}

export default FeatureSection;

export const SectionHeader = ({
   title,
   subTitle,
   eyebrow,
}: {
   title: ReactNode;
   subTitle: string;
   eyebrow: string;
}) => {
   return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
         {/* Section Chip */}
         <span className="bg-accent-soft text-accent-strong dark:text-forground rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
            {eyebrow}
         </span>
         {/* Section Chip */}
         {/* Section heading */}
         <h2 className="font-display text-forground text-[32px] leading-tight tracking-tight max-[426]:text-[28px] min-[375px]:text-balance sm:text-[44px] lg:text-[52px]">
            {title}
         </h2>
         {/* Section heading */}
         {/* Section sub heading */}
         <p className="text-forground-muted text-sm leading-relaxed sm:text-base">{subTitle}</p>
         {/* Section sub heading */}
      </div>
   );
};

function ScoreBarsPreview() {
   const bars = [
      { label: "Keywords", value: 88 },
      { label: "Format", value: 74 },
      { label: "Impact", value: 91 },
      { label: "Readability", value: 82 },
   ];
   return (
      <div className="bg-surface-2 rounded-2xl border p-4">
         <div className="mb-3 flex items-end justify-between">
            <div>
               <div className="text-forground-muted text-[10px] font-semibold tracking-wide uppercase">
                  Score breakdown
               </div>
               <div className="font-display tabular text-[26px] font-semibold tracking-tight">
                  86<span className="text-forground-muted text-sm">/100</span>
               </div>
            </div>
            <div className="tabular bg-accent-soft text-success rounded-full px-2 py-0.5 text-[10px] font-semibold">
               +18 pts
            </div>
         </div>
         <div className="space-y-2.5">
            {bars.map((b, i) => (
               <div key={b.label}>
                  <div className="text-forground-muted mb-1 flex justify-between text-[11px]">
                     <span>{b.label}</span>
                     <span className="tabular text-forground font-semibold">{b.value}</span>
                  </div>
                  <div className="bg-surface h-1.5 overflow-hidden rounded-full">
                     <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${b.value}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{
                           duration: 0.9,
                           delay: 0.1 + i * 0.08,
                           ease: [0.16, 1, 0.3, 1],
                        }}
                        className="from-accent to-accent-strong h-full rounded-full bg-linear-to-r"
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

function RewritePreview() {
   return (
      <div className="bg-surface-2 space-y-2 rounded-2xl border p-4">
         <div className="bg-surface rounded-xl border p-3">
            <div className="text-forground-muted mb-1 text-[9px] font-semibold tracking-wide uppercase">
               Before
            </div>
            <div className="text-forground-muted text-[12px] leading-snug line-through">
               Worked on backend stuff
            </div>
         </div>
         <div className="bg-accent-soft rounded-xl p-3">
            <div className="text-accent-strong mb-1 text-[9px] font-semibold tracking-wide uppercase">
               After
            </div>
            <div className="text-forground text-[12px] leading-snug">
               Built 6 Node services handling 4.2M req/day at p99 &lt;120ms.
            </div>
         </div>
      </div>
   );
}

function KeywordsPreview() {
   const matched = ["React", "TypeScript", "Node.js"];
   const missing = ["GraphQL", "Docker"];
   return (
      <div className="bg-surface-2 rounded-2xl border p-4">
         <div className="text-forground-muted mb-2 text-[10px] font-semibold tracking-wide uppercase">
            Job: Senior Frontend @ Stripe
         </div>
         <div className="mb-2.5 flex flex-wrap gap-1.5">
            {matched.map((k) => (
               <span
                  key={k}
                  className="bg-accent-soft rounded-full px-2 py-0.5 text-[10px] font-semibold"
               >
                  ✓ {k}
               </span>
            ))}
         </div>
         <div className="flex flex-wrap gap-1.5">
            {missing.map((k) => (
               <span
                  key={k}
                  className="text-danger rounded-full bg-[#F8E3E0] px-2 py-0.5 text-[10px] font-semibold"
               >
                  + {k}
               </span>
            ))}
         </div>
      </div>
   );
}

function VersionsPreview() {
   const versions = [
      { label: "V1", score: 62 },
      { label: "V2", score: 78 },
      { label: "V3", score: 86 },
   ];
   return (
      <div className="bg-surface-2 flex items-center gap-2 rounded-2xl border p-4">
         {versions.map((v, i) => (
            <div
               key={v.label}
               className={`flex-1 rounded-xl p-2.5 ${
                  i === versions.length - 1
                     ? "bg-accent-soft border-accent/30 border"
                     : "bg-surface border"
               }`}
            >
               <div className="text-forground-muted text-[9px] font-semibold tracking-wide uppercase">
                  {v.label}
               </div>
               <div className="font-display tabular mt-0.5 text-[20px] font-semibold tracking-tight">
                  {v.score}
               </div>
            </div>
         ))}
      </div>
   );
}

function DiffPreview() {
   return (
      <div className="bg-surface-2 space-y-1 rounded-2xl border p-3 font-mono text-[11px]">
         <div className="flex gap-2 rounded-md bg-[#F8E3E0]/50 px-2 py-1">
            <span className="text-danger w-3 font-bold">−</span>
            <span className="text-forground-muted line-through">helped team</span>
         </div>
         <div className="bg-accent-soft/60 flex gap-2 rounded-md px-2 py-1">
            <span className="text-success w-3 font-bold">+</span>
            <span className="text-forground">led 4-person frontend pod</span>
         </div>
         <div className="bg-accent-soft/60 flex gap-2 rounded-md px-2 py-1">
            <span className="text-success w-3 font-bold">+</span>
            <span className="text-forground">shipped 12 features in Q3</span>
         </div>
      </div>
   );
}

function ChartPreview() {
   const pts = [42, 58, 51, 67, 74, 81, 86];
   const max = 100;
   const w = 320;
   const h = 90;
   const stepX = w / (pts.length - 1);
   const path = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - (p / max) * h}`)
      .join(" ");
   const area = `${path} L ${w} ${h} L 0 ${h} Z`;
   return (
      <div className="bg-surface-2 rounded-2xl border p-4">
         <div className="mb-2 flex items-end justify-between">
            <div>
               <div className="text-forground-muted text-[10px] font-semibold tracking-wide uppercase">
                  Score over 7 iterations
               </div>
               <div className="font-display tabular text-[26px] font-semibold tracking-tight">
                  86
               </div>
            </div>
            <div className="tabular bg-accent-soft text-success rounded-full px-2 py-0.5 text-[10px] font-semibold">
               +44 since V1
            </div>
         </div>
         <svg
            viewBox={`0 0 ${w} ${h}`}
            className="h-22.5 w-full"
         >
            <defs>
               <linearGradient
                  id="featAreaGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
               >
                  <stop
                     offset="0%"
                     stopColor="var(--accent)"
                     stopOpacity="0.3"
                  />
                  <stop
                     offset="100%"
                     stopColor="var(--accent)"
                     stopOpacity="0"
                  />
               </linearGradient>
            </defs>
            <path
               d={area}
               fill="url(#featAreaGrad)"
            />
            <path
               d={path}
               fill="none"
               stroke="var(--accent)"
               strokeWidth="2.5"
               strokeLinecap="round"
            />
         </svg>
      </div>
   );
}

function PdfPreview() {
   return (
      <div className="bg-surface-2 flex items-center justify-center rounded-2xl border p-4">
         <div className="shadow-card bg-surface h-35 w-30 -rotate-3 space-y-1.5 rounded-lg border p-2">
            <div className="bg-forground h-1.5 w-12 rounded-full" />
            <div className="bg-border h-1 w-16 rounded-full" />
            <div className="space-y-1 pt-1">
               {[10, 14, 12, 16, 11].map((w, i) => (
                  <div
                     key={i}
                     className="bg-border h-0.5 rounded-full"
                     style={{ width: `${w * 5}px` }}
                  />
               ))}
            </div>
            <div className="bg-accent h-1 w-10 rounded-full pt-1.5" />
            <div className="space-y-1">
               {[15, 11, 13].map((w, i) => (
                  <div
                     key={i}
                     className="bg-border h-0.5 rounded-full"
                     style={{ width: `${w * 5}px` }}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}

// function SpeedPreview() {
//    return (
//       <div className="bg-surface-2 rounded-2xl border p-4">
//          <div className="flex items-center gap-3">
//             <div className="font-display tabular text-forground text-[34px] font-semibold tracking-tight">
//                12s
//             </div>
//             <div className="text-forground-muted text-[11px] leading-snug">
//                avg. analysis time
//                <br />
//                <span className="text-accent-strong font-semibold">Gemini · structured output</span>
//             </div>
//          </div>
//          <div className="bg-surface mt-3 h-1.5 overflow-hidden rounded-full">
//             <motion.div
//                initial={{ width: 0 }}
//                whileInView={{ width: "92%" }}
//                viewport={{ once: true }}
//                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
//                className="from-accent to-accent-strong h-full rounded-full bg-linear-to-r"
//             />
//          </div>
//       </div>
//    );
// }

// function AccuracyPreview() {
//    return (
//       <div className="bg-surface-2 rounded-2xl border p-4">
//          <div className="flex items-center gap-3">
//             {/* Bold metric mirroring your 12s layout */}
//             <div className="font-display tabular text-forground text-[34px] font-semibold tracking-tight">
//                99.4%
//             </div>

//             {/* Dual line label configuration */}
//             <div className="text-forground-muted text-[11px] leading-snug">
//                JSON schema validation
//                <br />
//                <span className="text-accent-strong inline-flex items-center gap-1 font-semibold">
//                   {/* Small animated structural pulse */}
//                   <span className="relative flex h-1.5 w-1.5">
//                      <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
//                      <span className="bg-accent relative inline-flex h-1.5 w-1.5 rounded-full" />
//                   </span>
//                   Zero-shot parsed accuracy
//                </span>
//             </div>
//          </div>

//          {/* Matching fluid structural load indicator bar */}
//          <div className="bg-surface mt-3 h-1.5 overflow-hidden rounded-full">
//             <motion.div
//                initial={{ width: 0 }}
//                whileInView={{ width: "99.4%" }}
//                viewport={{ once: true }}
//                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
//                className="from-accent to-accent-strong h-full rounded-full bg-linear-to-r"
//             />
//          </div>
//       </div>
//    );
// }
