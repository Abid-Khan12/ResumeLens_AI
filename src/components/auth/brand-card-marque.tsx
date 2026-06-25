import { motion } from "motion/react";
import { TrendingUp, Sparkles, AlertCircle, ArrowRight, Check, X } from "lucide-react";
import AILogo from "@/components/ui/ai-logo";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const CARDS = [
   AtsScoreCard,
   ScoreEvolutionCard,
   TopIssuesCard,
   RewriteCard,
   KeywordsCard,
   StrengthsCard,
];

export function BrandCardMarquee() {
   const tilts = [-2, 1.5, -1, 2, -1.5, 1];

   return (
      <div
         className="relative w-full overflow-hidden"
         style={{
            maskImage:
               "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
               "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
         }}
      >
         <motion.div
            className="flex gap-5 py-4"
            animate={{ x: ["0%", "-400%"] }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
         >
            {[...CARDS, ...CARDS].map((Card, i) => (
               <div
                  key={i}
                  className="shrink-0"
                  style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
               >
                  <Card />
               </div>
            ))}
         </motion.div>
      </div>
   );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Reusable shell — pure white card with consistent shadow + padding
 * ───────────────────────────────────────────────────────────────────────── */
function PreviewCard({ children, width = 300 }: { children: ReactNode; width?: number }) {
   return (
      <div
         className="rounded-3xl bg-white p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
         style={{ width }}
      >
         {children}
      </div>
   );
}

function Label({ children }: { children: ReactNode }) {
   return (
      <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
         {children}
      </div>
   );
}

function Footer({ subtitle, version }: { subtitle?: string; version?: string }) {
   return (
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
         <div className="flex items-center gap-2">
            <AILogo />
            <span className="text-[11px] font-medium text-gray-700">
               {subtitle || "ResumeLens AI"}
            </span>
         </div>
         {version && <span className="tabular text-[10px] text-gray-400">{version}</span>}
      </div>
   );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Card 1 — ATS Readiness score
 * ───────────────────────────────────────────────────────────────────────── */
function AtsScoreCard() {
   return (
      <PreviewCard width={300}>
         <div className="mb-4 flex items-start justify-between">
            <div>
               <Label>ATS Readiness</Label>
               <div className="mt-1.5 flex items-baseline gap-1">
                  <span
                     className="text-[42px] leading-none font-semibold text-gray-900"
                     style={{
                        fontFamily: '"Geist", "Inter", sans-serif',
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                     }}
                  >
                     82
                  </span>
                  <span className="text-sm font-medium text-gray-400">/ 100</span>
               </div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#E6EFE8] px-2 py-1 text-[10px] font-semibold text-[#2F4A3A]">
               <TrendingUp
                  size={10}
                  strokeWidth={2.5}
               />
               +12 pts
            </div>
         </div>

         <div className="relative h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
               className="absolute inset-y-0 left-0 rounded-full"
               style={{
                  width: "82%",
                  background: "linear-gradient(90deg, #5B7C6A 0%, #2F4A3A 100%)",
               }}
            />
         </div>

         <Footer
            subtitle="Resume Roaster"
            version="V3 of 3"
         />
      </PreviewCard>
   );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Card 2 — Score Evolution mini chart
 * ───────────────────────────────────────────────────────────────────────── */
function ScoreEvolutionCard() {
   // points along a 240×60 viewBox
   const points = "0,48 60,36 120,24 180,12 240,4";
   const area = "0,60 0,48 60,36 120,24 180,12 240,4 240,60";

   return (
      <PreviewCard width={300}>
         <div className="mb-3 flex items-start justify-between">
            <div>
               <Label>Score Evolution</Label>
               <div className="mt-1.5 flex items-baseline gap-1">
                  <span
                     className="text-[28px] leading-none font-semibold text-gray-900"
                     style={{
                        fontFamily: '"Geist", "Inter", sans-serif',
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                     }}
                  >
                     +24
                  </span>
                  <span className="text-xs text-gray-400">pts overall</span>
               </div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#E6EFE8] px-2 py-1 text-[10px] font-semibold text-[#2F4A3A]">
               V1 → V3
            </div>
         </div>

         <svg
            viewBox="0 0 240 60"
            className="h-15 w-full"
            preserveAspectRatio="none"
         >
            <defs>
               <linearGradient
                  id="ev-fill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
               >
                  <stop
                     offset="0%"
                     stopColor="#5B7C6A"
                     stopOpacity="0.3"
                  />
                  <stop
                     offset="100%"
                     stopColor="#5B7C6A"
                     stopOpacity="0"
                  />
               </linearGradient>
            </defs>
            <polygon
               points={area}
               fill="url(#ev-fill)"
            />
            <polyline
               points={points}
               stroke="#2F4A3A"
               strokeWidth="2"
               fill="none"
               strokeLinecap="round"
            />
            {[
               [0, 48],
               [60, 36],
               [120, 24],
               [180, 12],
               [240, 4],
            ].map(([x, y], i) => (
               <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="white"
                  stroke="#2F4A3A"
                  strokeWidth="1.5"
               />
            ))}
         </svg>

         <div className="tabular mt-1 flex items-center justify-between text-[10px] text-gray-400">
            <span>58</span>
            <span>66</span>
            <span>72</span>
            <span>78</span>
            <span className="font-semibold text-gray-900">82</span>
         </div>

         <Footer subtitle="Trend across versions" />
      </PreviewCard>
   );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Card 3 — Top Issues
 * ───────────────────────────────────────────────────────────────────────── */
const issues = [
   { title: "Missing quantified impact", sev: "high" },
   { title: "Generic action verbs", sev: "medium" },
   { title: "No keyword density", sev: "high" },
] as const;
const TONE = {
   high: "bg-[#F8E3E0] text-[#B5564E]",
   medium: "bg-[#FBF1E2] text-[#C28A3A]",
   low: "bg-gray-100 text-gray-500",
};
function TopIssuesCard() {
   return (
      <PreviewCard width={320}>
         <div className="mb-4 flex items-start justify-between">
            <Label>Critical Issues</Label>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#F8E3E0] px-2 py-1 text-[10px] font-semibold text-[#B5564E]">
               5 found
            </div>
         </div>

         <div className="space-y-2.5">
            {issues.map((iss, i) => (
               <div
                  key={i}
                  className="flex items-center gap-3"
               >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                     <AlertCircle size={13} />
                  </div>
                  <div className="min-w-0 flex-1">
                     <div className="truncate text-[13px] font-medium text-gray-900">
                        {iss.title}
                     </div>
                  </div>
                  <span
                     className={cn(
                        `rounded-full px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase`,
                        TONE[iss.sev],
                     )}
                  >
                     {iss.sev}
                  </span>
               </div>
            ))}
         </div>

         <Footer subtitle="Apply fixes" />
      </PreviewCard>
   );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Card 4 — Bullet Rewrite
 * ───────────────────────────────────────────────────────────────────────── */
function RewriteCard() {
   return (
      <PreviewCard width={340}>
         <div className="mb-3 flex items-start justify-between">
            <Label>AI Rewrite</Label>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#E6EFE8] px-2 py-1 text-[10px] font-semibold text-[#2F4A3A]">
               <Sparkles
                  size={10}
                  strokeWidth={2.5}
               />
               Suggested
            </div>
         </div>

         <div className="space-y-2">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
               <div className="mb-1 text-[9px] font-semibold tracking-wide text-gray-400 uppercase">
                  Original
               </div>
               <div className="text-[12.5px] leading-snug text-gray-500 line-through decoration-gray-300">
                  Worked with the team to deliver projects.
               </div>
            </div>

            <div className="flex justify-center text-gray-300">
               <ArrowRight size={14} />
            </div>

            <div className="rounded-2xl bg-[#E6EFE8] p-3">
               <div className="mb-1 text-[9px] font-semibold tracking-wide text-[#2F4A3A] uppercase">
                  Rewritten
               </div>
               <div className="text-[12.5px] leading-snug text-gray-900">
                  Led 5 engineers to ship 3 features, driving a 30% lift in monthly retention.
               </div>
            </div>
         </div>

         <Footer subtitle="Bullet improved" />
      </PreviewCard>
   );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Card 5 — Keywords
 * ───────────────────────────────────────────────────────────────────────── */
function KeywordsCard() {
   const present = ["React", "TypeScript", "Node.js", "GraphQL", "AWS"];
   const missing = ["Kubernetes", "gRPC"];

   return (
      <PreviewCard width={320}>
         <div className="mb-3 flex items-start justify-between">
            <div>
               <Label>Keyword Match</Label>
               <div className="mt-1.5 flex items-baseline gap-1">
                  <span
                     className="text-[28px] leading-none font-semibold text-gray-900"
                     style={{
                        fontFamily: '"Geist", "Inter", sans-serif',
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                     }}
                  >
                     24
                  </span>
                  <span className="text-sm text-gray-400">/ 30 matched</span>
               </div>
            </div>
         </div>

         <div className="space-y-2.5">
            <div className="flex flex-wrap gap-1.5">
               {present.map((k) => (
                  <span
                     key={k}
                     className="inline-flex items-center gap-1 rounded-full bg-[#E6EFE8] px-2 py-0.5 text-[11px] font-medium text-[#2F4A3A]"
                  >
                     <Check
                        size={9}
                        strokeWidth={3}
                     />
                     {k}
                  </span>
               ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
               {missing.map((k) => (
                  <span
                     key={k}
                     className="inline-flex items-center gap-1 rounded-full bg-[#F8E3E0] px-2 py-0.5 text-[11px] font-medium text-[#B5564E]"
                  >
                     <X
                        size={9}
                        strokeWidth={3}
                     />
                     {k}
                  </span>
               ))}
            </div>
         </div>

         <Footer subtitle="ATS scan" />
      </PreviewCard>
   );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Card 6 — Standout Strengths
 * ───────────────────────────────────────────────────────────────────────── */
function StrengthsCard() {
   const strengths = [
      { title: "Quantified leadership impact" },
      { title: "Strong technical depth signals" },
      { title: "Clean, scannable structure" },
   ];
   return (
      <PreviewCard width={310}>
         <div className="mb-4 flex items-start justify-between">
            <Label>Standout Strengths</Label>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#E6EFE8] px-2 py-1 text-[10px] font-semibold text-[#2F4A3A]">
               5 total
            </div>
         </div>

         <div className="space-y-2.5">
            {strengths.map((s, i) => (
               <div
                  key={i}
                  className="flex items-start gap-3"
               >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E6EFE8] text-[#2F4A3A]">
                     <Sparkles size={13} />
                  </div>
                  <div className="min-w-0 flex-1">
                     <div className="text-[13px] font-medium text-gray-900">{s.title}</div>
                  </div>
               </div>
            ))}
         </div>

         <Footer subtitle="What's working" />
      </PreviewCard>
   );
}
