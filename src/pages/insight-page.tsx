import { useNavigate } from "react-router";
import {
   ResponsiveContainer,
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
} from "recharts";
import {
   TrendingUp,
   Trophy,
   Sparkles,
   AlertCircle,
   ChevronRight,
   type LucideIcon,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockInsights } from "@/mock/insight";

const SEV_TONE = { low: "neutral", medium: "warning", high: "danger" } as const;

// ─── component ────────────────────────────────────────────────────────────────

export default function Insights() {
   const navigate = useNavigate();
   const data = mockInsights;

   const trend = data.scoreTrend.map((p, i) => ({
      label: `#${i + 1}`,
      score: p.score,
      at: p.at,
      resumeTitle: p.resumeTitle,
   }));

   return (
      <section className="flex-1 space-y-5">
         <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Insights</h2>
            <p className="text-forground-muted text-sm leading-relaxed">
               Patterns across all your resumes and analyses.
            </p>
         </div>
         {/* KPI row */}
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Kpi
               label="Average ATS Score"
               value={data.averageScore}
               suffix="/ 100"
               icon={TrendingUp}
            />
            <Kpi
               label="Best Score"
               value={data.bestScore.value}
               suffix="/ 100"
               sub={data.bestScore.resumeTitle}
               icon={Trophy}
               accent
            />
            <Kpi
               label="Total Analyses"
               value={data.totalAnalyses}
               icon={Sparkles}
            />
         </div>

         {/* Trend chart */}
         <Card padding={"sm"}>
            <CardHeader>
               <div>
                  <CardTitle className="text-base">Score Trend</CardTitle>
                  <CardDescription className="mt-1">
                     Every analysis you've run, chronologically
                  </CardDescription>
               </div>
            </CardHeader>
            <div className="-mx-2 h-60">
               <ResponsiveContainer
                  width="100%"
                  height="100%"
               >
                  <AreaChart
                     data={trend}
                     margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                     <defs>
                        <linearGradient
                           id="iScoreFill"
                           x1="0"
                           y1="0"
                           x2="0"
                           y2="1"
                        >
                           <stop
                              offset="0%"
                              stopColor="var(--accent)"
                              stopOpacity={0.25}
                           />
                           <stop
                              offset="100%"
                              stopColor="var(--accent)"
                              stopOpacity={0}
                           />
                        </linearGradient>
                     </defs>
                     <CartesianGrid
                        stroke="var(--border)"
                        vertical={false}
                        strokeDasharray="3 4"
                     />
                     <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: "var(--forground-muted)" }}
                        axisLine={false}
                        tickLine={false}
                     />
                     <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fill: "var(--forground-muted)" }}
                        axisLine={false}
                        tickLine={false}
                        width={28}
                     />
                     <Tooltip
                        content={({ active, payload }) =>
                           active && payload?.length ? (
                              <div className="shadow-hover bg-surface rounded-xl border px-3 py-2 text-xs">
                                 <div className="text-forground">
                                    {payload[0].payload.resumeTitle}
                                 </div>
                                 <div className="font-display tabular mt-0.5 text-base font-semibold">
                                    {payload[0].value} / 100
                                 </div>
                              </div>
                           ) : null
                        }
                     />
                     <Area
                        type="monotone"
                        dataKey="score"
                        stroke="var(--accent)"
                        strokeWidth={2.5}
                        fill="url(#iScoreFill)"
                        dot={{
                           r: 3.5,
                           stroke: "var(--accent)",
                           fill: "var(--surface)",
                           strokeWidth: 2,
                        }}
                        activeDot={{ r: 6 }}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* Issues + Missing Keywords */}
         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card padding={"sm"}>
               <CardHeader>
                  <div>
                     <CardTitle className="text-base">Recurring Issues</CardTitle>
                     <CardDescription className="mt-1">
                        What comes up most often across your analyses
                     </CardDescription>
                  </div>
               </CardHeader>
               {data.topIssues.length === 0 ? (
                  <p className="text-forground-muted text-sm">No issues recorded yet.</p>
               ) : (
                  <div className="space-y-3">
                     {data.topIssues.map((issue, i) => (
                        <div
                           key={i}
                           className="flex items-start gap-3"
                        >
                           <div className="bg-surface-2 text-forground-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-xl">
                              <AlertCircle size={14} />
                           </div>
                           <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium">{issue.title}</div>
                              <div className="mt-1 flex items-center gap-2">
                                 <Badge tone={SEV_TONE[issue.severity]}>{issue.severity}</Badge>
                                 <span className="text-forground-muted text-xs">
                                    {issue.count}× across analyses
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </Card>

            <Card padding={"sm"}>
               <CardHeader>
                  <div>
                     <CardTitle className="text-base">Most-Missed Keywords</CardTitle>
                     <CardDescription className="mt-1">
                        Words ATS expected but didn't see
                     </CardDescription>
                  </div>
               </CardHeader>
               {data.topMissingKeywords.length === 0 ? (
                  <p className="text-forground-muted text-sm">
                     Nothing missing across your analyses — nice.
                  </p>
               ) : (
                  <div className="flex flex-wrap gap-2">
                     {data.topMissingKeywords.map((k, i) => (
                        <span
                           key={i}
                           className="dark:bg-danger/60 bg-danger inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white"
                        >
                           {k.keyword}
                           <span className="tabular text-[10px] opacity-70">×{k.count}</span>
                        </span>
                     ))}
                  </div>
               )}
            </Card>
         </div>

         {/* Most-present keywords */}
         {data.topPresentKeywords.length > 0 && (
            <Card padding={"sm"}>
               <CardHeader>
                  <div>
                     <CardTitle className="text-base">Your Keyword Anchors</CardTitle>
                     <CardDescription className="mt-1">
                        Words ATS consistently sees on your resumes
                     </CardDescription>
                  </div>
               </CardHeader>
               <div className="flex flex-wrap gap-2">
                  {data.topPresentKeywords.map((k, i) => (
                     <span
                        key={i}
                        className="bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                     >
                        {k.keyword}
                        <span className="tabular text-[10px] opacity-70">×{k.count}</span>
                     </span>
                  ))}
               </div>
            </Card>
         )}

         {/* Per-resume table */}
         <Card padding={"sm"}>
            <CardHeader>
               <div>
                  <CardTitle className="text-base">By Resume</CardTitle>
                  <CardDescription className="mt-1">
                     How each of your resumes is performing
                  </CardDescription>
               </div>
            </CardHeader>
            <div className="-mx-2 overflow-x-auto">
               <table className="w-full text-sm">
                  <thead>
                     <tr className="text-forground-muted border-b text-left text-[10px] tracking-wide uppercase">
                        <th className="px-2 py-2 font-medium">Resume</th>
                        <th className="px-2 py-2 text-right font-medium">Latest</th>
                        <th className="px-2 py-2 text-right font-medium">Best</th>
                        <th className="px-2 py-2 text-right font-medium">Improvement</th>
                        <th className="px-2 py-2 text-right font-medium">Analyses</th>
                        <th className="w-8 px-2 py-2" />
                     </tr>
                  </thead>
                  <tbody>
                     {data.resumePerformance.map((r) => (
                        <tr
                           key={r.resumeId}
                           onClick={() => navigate(`/resumes/${r.resumeId}`)}
                           className="hover:bg-surface-2 cursor-pointer border-b transition-colors"
                        >
                           <td className="max-w-65 truncate px-2 py-3 font-medium">{r.title}</td>
                           <td className="tabular font-display px-2 py-3 text-right font-semibold">
                              {r.latestScore}
                           </td>
                           <td className="tabular text-forground-muted px-2 py-3 text-right">
                              {r.bestScore}
                           </td>
                           <td className="px-2 py-3 text-right">
                              <Badge tone={r.improvement >= 0 ? "success" : "danger"}>
                                 {r.improvement >= 0 ? "+" : ""}
                                 {r.improvement}
                              </Badge>
                           </td>
                           <td className="tabular text-forground-muted px-2 py-3 text-right">
                              {r.analysesCount}
                           </td>
                           <td className="text-forground-muted px-2 py-3">
                              <ChevronRight size={14} />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>
      </section>
   );
}

// ─── Kpi ──────────────────────────────────────────────────────────────────────

interface KpiProps {
   label: string;
   value: number;
   suffix?: string;
   sub?: string;
   icon: LucideIcon;
   accent?: boolean;
}

function Kpi({ label, value, suffix, sub, icon: Icon, accent = false }: KpiProps) {
   return (
      <Card
         variant={accent ? "accent" : "default"}
         padding={"sm"}
      >
         <div className="flex items-start justify-between">
            <div className="min-w-0 space-y-1.5">
               <div className="flex items-center gap-2">
                  <div
                     className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        accent
                           ? "bg-white/15 text-white"
                           : "bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong"
                     }`}
                  >
                     <Icon size={14} />
                  </div>
                  <span className={`text-xs ${accent ? "text-white/70" : "text-forground-muted"}`}>
                     {label}
                  </span>
               </div>
               <div className="flex items-baseline gap-1">
                  <span className="font-display tabular text-3xl font-semibold tracking-tight">
                     {value}
                  </span>
                  {suffix && (
                     <span
                        className={`text-sm ${accent ? "text-white/70" : "text-forground-muted"}`}
                     >
                        {suffix}
                     </span>
                  )}
               </div>
               {sub && (
                  <div
                     className={`truncate text-xs ${accent ? "text-white/80" : "text-forground-muted"}`}
                  >
                     {sub}
                  </div>
               )}
            </div>
         </div>
      </Card>
   );
}
