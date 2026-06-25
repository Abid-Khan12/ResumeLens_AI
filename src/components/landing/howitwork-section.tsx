import { motion } from "motion/react";

import { SectionHeader } from "@/components/landing/feature-section";
import {
   ArrowDownIcon,
   ArrowRightIcon,
   CheckIcon,
   CpuIcon,
   FileDown,
   FileDownIcon,
   SparklesIcon,
   UploadIcon,
} from "lucide-react";

const steps = [
   {
      n: "01",
      icon: UploadIcon,
      title: "Upload your resume",
      desc: "Drop a PDF or DOCX. We parse it in seconds — no signup wall, no nonsense.",
      Visual: UploadVisual,
   },
   {
      n: "02",
      icon: CpuIcon,
      title: "AI analyzes & roasts",
      desc: "Gemini scores against ATS rubrics, surfaces 5 issues + 5 strengths, and drafts rewrites.",
      Visual: AnalyzeVisual,
   },
   {
      n: "03",
      icon: FileDown,
      title: "Download optimized PDF",
      desc: "Apply rewrites, save a new version, and export a clean ATS-friendly PDF.",
      Visual: DownloadVisual,
   },
];

function HowItWorkSection() {
   return (
      <section
         className="mx-auto w-full max-w-310 px-3 sm:px-6"
         id="how_it_works"
      >
         <SectionHeader
            eyebrow="How it works"
            title={
               <>
                  From upload to interview-ready <br className="hidden md:block" /> in 3 steps.
               </>
            }
            subTitle="No prompt engineering. No ten-step funnels. Drop, analyze, ship."
         />

         <div className="relative mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {steps.map((step, i) => {
               const Icon = step.icon;
               const Visual = step.Visual;

               return (
                  <motion.div
                     key={step.title}
                     initial={{ opacity: 0, y: 14 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.4 }}
                     transition={{ duration: 0.5, delay: i * 0.05 }}
                     className="shadow-card hover:shadow-card-hover rounded-card bg-surface relative border p-5 transition-shadow duration-300 sm:p-7"
                  >
                     <div
                        className="absolute inset-x-7 top-0 h-px"
                        style={{
                           background:
                              "linear-gradient(90deg, transparent, var(--accent) 50%, transparent)",
                           opacity: 0.5,
                        }}
                     />
                     <div
                        className="font-display pointer-events-none absolute -top-2 right-3 text-[140px] leading-none font-bold tracking-tighter select-none"
                        style={{
                           backgroundImage:
                              "linear-gradient(180deg, var(--accent-soft) 0%, transparent 75%)",
                           WebkitBackgroundClip: "text",
                           backgroundClip: "text",
                           color: "transparent",
                           WebkitTextFillColor: "transparent",
                        }}
                        aria-hidden
                     >
                        {step.n}
                     </div>

                     <div className="mt-6 flex items-center gap-1.5">
                        <span className="text-accent-strong bg-accent-soft h-6 content-center rounded-full px-2.5 text-xs font-semibold tracking-wider uppercase">
                           step {step.n}
                        </span>
                        <div className="relative overflow-hidden rounded-2xl">
                           <div className="bg-accent-soft absolute -inset-2 rounded-3xl opacity-70 blur-lg" />
                           <div className="shadow-card from-accent to-accent-strong dark:bg-accent-soft dark:text-accent-strong relative flex size-12 items-center justify-center rounded-2xl bg-linear-to-br text-white dark:bg-none">
                              <Icon
                                 size={22}
                                 strokeWidth={2}
                              />
                           </div>
                        </div>
                     </div>

                     <h3 className="font-display mt-6 text-xl leading-tight font-medium tracking-tight">
                        {step.title}
                     </h3>
                     <p className="text-forground-muted mt-2 text-xs leading-relaxed font-medium">
                        {step.desc}
                     </p>
                     <div className="relative mt-7">
                        <Visual />
                     </div>

                     {i < steps.length - 1 && (
                        <div
                           className="shadow-card from-accent to-accent-strong dark:bg-forground/95 dark:text-background absolute z-10 flex size-8 items-center justify-center rounded-full bg-linear-to-br text-white max-lg:-bottom-4 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:top-28 lg:-right-3.5 dark:bg-none"
                           aria-hidden
                        >
                           <ArrowRightIcon
                              size={14}
                              strokeWidth={2.5}
                              className="max-lg:hidden"
                           />
                           <ArrowDownIcon
                              size={14}
                              strokeWidth={2.5}
                              className="lg:hidden"
                           />
                        </div>
                     )}
                  </motion.div>
               );
            })}
         </div>
      </section>
   );
}

export default HowItWorkSection;

function UploadVisual() {
   return (
      <div className="from-surface-2/60 to-surface relative rounded-2xl border bg-linear-to-br p-4">
         <div className="flex items-center gap-3">
            <div className="relative shrink-0">
               <div className="bg-accent-soft absolute -inset-1 rounded-2xl opacity-70 blur-md" />
               <div className="shadow-card bg-surface relative flex h-11 w-11 items-center justify-center rounded-2xl border">
                  <div
                     className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
                     style={{
                        background:
                           "linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%)",
                     }}
                  >
                     <UploadIcon
                        size={13}
                        strokeWidth={2.4}
                     />
                  </div>
               </div>
            </div>
            <div className="min-w-0 flex-1 text-left">
               <div className="text-forground truncate text-[12px] font-semibold">
                  resume_v3.pdf
               </div>
               <div className="text-forground-muted mt-0.5 text-[10px] tabular-nums">
                  412 KB · parsing…
               </div>
            </div>
            <div className="bg-accent-soft text-accent-strong inline-flex h-5 items-center gap-1 rounded-full px-2 text-[9px] font-semibold">
               <span className="bg-accent h-1 w-1 animate-pulse rounded-full" />
               live
            </div>
         </div>
         <div className="bg-surface-2 mt-3 h-1 w-full overflow-hidden rounded-full">
            <motion.div
               animate={{ x: ["-100%", "100%"] }}
               transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
               className="h-full w-1/2 rounded-full"
               style={{
                  background:
                     "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
               }}
            />
         </div>
      </div>
   );
}

function AnalyzeVisual() {
   const items = [
      { label: "Structure parsed", done: true },
      { label: "ATS rules checked", done: true },
      { label: "Generating rewrites…", done: false },
   ];
   return (
      <div className="from-surface-2/60 to-surface relative rounded-2xl border bg-linear-to-br p-4">
         <div className="mb-3 flex items-center gap-2">
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="border-accent h-4 w-4 rounded-full border-2 border-r-transparent"
            />
            <div className="text-forground text-[11px] font-semibold">Analyzing</div>
            <div className="text-forground-muted bg-surface-2 ml-auto inline-flex h-5 items-center gap-1 rounded-full px-2 text-[9px] font-semibold tabular-nums">
               8 / 12
            </div>
         </div>
         <div className="space-y-1.5">
            {items.map((item, i) => (
               <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2"
               >
                  <div
                     className={`flex h-4 w-4 items-center justify-center rounded-full ${
                        item.done ? "bg-accent-soft text-accent-strong" : "border-accent/40 border"
                     }`}
                  >
                     {item.done && (
                        <CheckIcon
                           size={9}
                           strokeWidth={3.5}
                        />
                     )}
                  </div>
                  <div className="text-forground-muted text-[11px]">{item.label}</div>
               </motion.div>
            ))}
         </div>
         <div className="mt-3 flex items-center justify-between border-t pt-3">
            <div className="text-forground-muted text-[10px]">Predicted score</div>
            <div className="text-accent-strong inline-flex items-center gap-1 text-[11px] font-bold tabular-nums">
               <SparklesIcon
                  size={10}
                  strokeWidth={2.5}
               />
               82 / 100
            </div>
         </div>
      </div>
   );
}

function DownloadVisual() {
   return (
      <div className="from-surface-2/60 to-surface relative rounded-2xl border bg-linear-to-br p-4">
         <div className="flex items-center gap-3">
            <div className="relative shrink-0">
               <div className="shadow-card bg-surface flex h-12 w-9 flex-col gap-0.5 rounded-md border p-1.5">
                  <div className="bg-forground-muted/40 h-0.5 w-3/4 rounded" />
                  <div className="bgforgroubg-forground-muted/25 h-0.5 w-full rounded" />
                  <div className="bg-forground-muted/25 h-0.5 w-5/6 rounded" />
                  <div className="bg-forground-muted/25 h-0.5 w-2/3 rounded" />
                  <div className="bg-accent-soft mt-auto h-1.25 w-full rounded-[1px]" />
               </div>
               <div
                  className="absolute -right-1.5 -bottom-1.5 flex h-5 items-center rounded-md px-1.5 text-[8px] font-bold text-white"
                  style={{
                     background:
                        "linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%)",
                  }}
               >
                  PDF
               </div>
            </div>
            <div className="min-w-0 flex-1 text-left">
               <div className="text-forground truncate text-[12px] font-semibold">
                  resume_v3_optimized.pdf
               </div>
               <div className="text-forground-muted mt-0.5 text-[10px]">ATS-ready · 1 page</div>
            </div>
            <button className="bg-forground text-background flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5">
               <FileDownIcon size={13} />
            </button>
         </div>
         <div className="mt-3 flex items-center justify-between border-t pt-3">
            <div className="bg-accent-soft text-success inline-flex h-5 items-center gap-1 rounded-full px-2 text-[10px] font-semibold tabular-nums">
               ATS 86
            </div>
            <div className="text-forground-muted text-[10px] tabular-nums">
               <span className="text-success font-semibold">+24 pts</span> from V1
            </div>
         </div>
      </div>
   );
}
