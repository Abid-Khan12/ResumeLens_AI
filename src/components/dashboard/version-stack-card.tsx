import { Fragment, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";
import {
   ArrowRight,
   ArrowUpRight,
   FileText,
   PenLine,
   TrendingUp,
   TrendingDown,
   Minus,
   type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LatestResume, VersionStack } from "@/types/type";

function deltaIcon(delta: number): LucideIcon {
   if (delta > 0) return TrendingUp;
   if (delta < 0) return TrendingDown;
   return Minus;
}

function tierFor(score: number): { label: string; next: { label: string; at: number } | null } {
   if (score >= 85) return { label: "Excellent", next: null };
   if (score >= 70) return { label: "Strong", next: { label: "Excellent", at: 85 } };
   if (score >= 55) return { label: "Fair", next: { label: "Strong", at: 70 } };
   return { label: "Needs work", next: { label: "Fair", at: 55 } };
}

function VersionPill({
   version,
   delta = 0,
   isLatest,
}: {
   version: {
      id: string;
      label: string;
      title: string;
      score: number;
   };
   delta: number;
   isLatest: boolean;
}) {
   const isUpload = (version.title || "").toLowerCase().includes("upload");
   const Icon = isUpload ? FileText : PenLine;
   const DeltaIcon = deltaIcon(delta);

   return (
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
         className={cn(
            "min-w-30 flex-1 rounded-2xl border p-4 transition-shadow",
            isLatest ? "shadow-card bg-accent-soft" : "bg-surface-2",
         )}
      >
         <div className="mb-3 flex items-center justify-between">
            <div
               className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-xl",
                  isUpload
                     ? "bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong"
                     : "bg-accent from-accent dark:text-forground dark:bg-accent-strong text-white",
               )}
            >
               <Icon size={13} />
            </div>
            <Badge tone={isLatest ? "forground" : "neutral"}>{version.label}</Badge>
         </div>

         <div className="flex items-baseline gap-1">
            <span className="font-display tabular text-[34px] leading-none font-semibold tracking-tight">
               {version.score}
            </span>
            <span className="text-forground-muted text-[11px]">/100</span>
         </div>

         <div className="text-forground-muted mt-1 text-[10px] font-semibold tracking-wide uppercase">
            {isUpload ? "Upload" : "Rewrite pass"}
         </div>

         {delta != null && (
            <div
               className={cn(
                  "tabular mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  delta > 0 && "bg-accent-soft text-success",
                  delta < 0 && "text-danger bg-[#F8E3E0]",
                  delta === 0 && "text-forground-muted bg-surface",
                  isLatest && delta > 0 && "text-accent-soft bg-accent",
               )}
            >
               <DeltaIcon
                  size={10}
                  strokeWidth={2.5}
               />
               {delta > 0 ? "+" : ""}
               {delta} pts
            </div>
         )}
      </motion.div>
   );
}

function TierBar({ score }: { score: number }) {
   const tier = tierFor(score);
   const ticks = [
      { at: 55, label: "Fair" },
      { at: 70, label: "Strong" },
      { at: 85, label: "Excellent" },
   ];
   return (
      <div>
         <div className="mb-2 flex items-center justify-between">
            <div className="text-forground-muted text-[10px] font-semibold tracking-wide uppercase">
               Tier progress
            </div>
            <div className="tabular text-forground-muted text-[10px]">
               {tier.next
                  ? `${tier.next.at - score} pts to ${tier.next.label}`
                  : "Max tier reached"}
            </div>
         </div>
         <div className="bg-surface-2 relative h-2.5 overflow-hidden rounded-full">
            <motion.div
               initial={{ width: 0 }}
               animate={{ width: `${Math.max(0, Math.min(100, score))}%` }}
               transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
               className="from-accent to-accent-strong absolute inset-y-0 left-0 rounded-full bg-linear-to-r"
            />
            {ticks.map((t) => (
               <div
                  key={t.at}
                  className="absolute top-0 bottom-0 w-px bg-white/60"
                  style={{ left: `${t.at}%` }}
               />
            ))}
         </div>
         <div className="tabular text-forground-muted relative mt-1.5 h-4 text-[9px]">
            <span className="absolute left-0">0</span>
            {ticks.map((t) => (
               <span
                  key={t.at}
                  className="absolute"
                  style={{ left: `${t.at}%`, transform: "translateX(-50%)" }}
               >
                  {t.at}
               </span>
            ))}
            <span className="absolute right-0">100</span>
         </div>
      </div>
   );
}

function TrajectoryChart({ versions }: { versions: VersionStack }) {
   const data = versions.map((v) => ({ label: v.label, score: v.score }));
   return (
      <div>
         <div className="mb-2 flex items-center justify-between">
            <div className="text-forground-muted text-[10px] font-semibold tracking-wide uppercase">
               Score trajectory
            </div>
            <div className="text-forground-muted text-[10px]">
               {versions[0].label} → {versions[versions.length - 1].label}
            </div>
         </div>
         <div className="-mx-1 h-27.5">
            <ResponsiveContainer
               width="100%"
               height="100%"
            >
               <AreaChart
                  data={data}
                  margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
               >
                  <defs>
                     <linearGradient
                        id="vsTrajGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                     >
                        <stop
                           offset="0%"
                           stopColor="var(--accent)"
                           stopOpacity={0.3}
                        />
                        <stop
                           offset="100%"
                           stopColor="var(--accent)"
                           stopOpacity={0}
                        />
                     </linearGradient>
                  </defs>
                  <XAxis
                     dataKey="label"
                     tick={{ fontSize: 10, fill: "var(--forground-muted)" }}
                     axisLine={false}
                     tickLine={false}
                  />
                  <YAxis
                     hide
                     domain={[0, 100]}
                  />
                  <Area
                     type="monotone"
                     dataKey="score"
                     stroke="var(--accent)"
                     strokeWidth={2.5}
                     fill="url(#vsTrajGrad)"
                     dot={{ r: 4, stroke: "var(--accent)", fill: "var(--surface)", strokeWidth: 2 }}
                     activeDot={{ r: 5 }}
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
   );
}

export default function VersionStack({
   versions,
   latestResume: { _id, title },
}: {
   versions: VersionStack;
   latestResume: LatestResume;
}) {
   const nav = useNavigate();
   if (!versions?.length) return null;

   const visible = useMemo(() => versions.slice(-3), [versions]);

   const { latest, first, totalDelta, TotalDeltaIcon } = useMemo(() => {
      const latest = visible.at(-1);
      const first = visible.at(0);
      const totalDelta = (latest?.score ?? 0) - (first?.score ?? 0);
      return { latest, first, totalDelta, TotalDeltaIcon: deltaIcon(totalDelta) };
   }, [visible]);

   return (
      <Card
         className="flex h-full flex-col truncate"
         variant={"flat"}
      >
         <CardHeader>
            <div>
               <CardTitle className="text-base">Resume Versions</CardTitle>
               <CardDescription className="mt-1">Your iteration journey, scored</CardDescription>
            </div>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => nav("/versions")}
               className="-mr-2"
            >
               View all <ArrowUpRight size={14} />
            </Button>
         </CardHeader>

         <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[1fr_220px]">
            {/* Version progression */}
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
               {visible.map((v, i) => {
                  const prev = visible[i - 1];
                  const delta = prev ? v.score - prev.score : 0;
                  const isLatest = v.id === latest?.id;
                  return (
                     <Fragment key={v.id}>
                        {i > 0 && (
                           <ArrowRight
                              size={14}
                              className="text-forground-muted hidden shrink-0 sm:inline"
                           />
                        )}
                        <VersionPill
                           version={v}
                           delta={delta}
                           isLatest={isLatest}
                        />
                     </Fragment>
                  );
               })}
            </div>

            {/* Latest summary */}
            <div className="flex flex-col justify-between gap-4 border-t pt-5 xl:border-l xl:pl-5">
               <div>
                  <div className="text-forground-muted text-[10px] font-semibold tracking-wide uppercase">
                     Latest
                  </div>
                  <div className="font-display mt-1 truncate text-lg font-semibold tracking-tight">
                     {title || latest?.title || latest?.label}
                  </div>
                  <div className="text-forground-muted mt-0.5 text-xs">
                     {latest?.label} · {visible.length} version
                     {visible.length > 1 ? "s" : ""}
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="text-forground-muted text-[10px] font-semibold tracking-wide uppercase">
                     Since {first?.label}
                  </div>
                  <div
                     className={cn(
                        "tabular inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                        totalDelta > 0 && "bg-accent-soft text-success",
                        totalDelta < 0 && "text-danger bg-[#F8E3E0]",
                        totalDelta === 0 && "text-forground-muted bg-surface-2",
                     )}
                  >
                     <TotalDeltaIcon
                        size={12}
                        strokeWidth={2.5}
                     />
                     {totalDelta > 0 ? "+" : ""}
                     {totalDelta} pts overall
                  </div>
               </div>

               <Button
                  variant="accent"
                  size="sm"
                  disabled={!_id}
                  onClick={() => _id && nav(`/resume/${_id}`)}
                  className="w-full"
               >
                  Open Resume <ArrowUpRight size={13} />
               </Button>
            </div>
         </div>

         {/* Trajectory + Tier progress (fills the bottom with useful context) */}
         <div className="mt-6 flex-1 space-y-5 border-t pt-5">
            <TrajectoryChart versions={visible} />
            <TierBar score={latest?.score!} />
         </div>
      </Card>
   );
}
