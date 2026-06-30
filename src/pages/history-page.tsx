import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { History as HistoryIcon, Upload, Sparkles, PenLine, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, relativeTime } from "@/lib/utils";
import type { EventType, FilterKey, HistoryEvent } from "@/types/type";
import { mockHistory } from "@/mock/history";
import { dayKey } from "@/mock/helper";

// ─── types ────────────────────────────────────────────────────────────────────

// ─── constants ────────────────────────────────────────────────────────────────

const FILTERS: { key: FilterKey; label: string; icon: LucideIcon }[] = [
   { key: "all", label: "All", icon: HistoryIcon },
   { key: "upload", label: "Uploads", icon: Upload },
   { key: "analyze", label: "Analyses", icon: Sparkles },
   { key: "rewrite", label: "Rewrites", icon: PenLine },
];

const ICONS: Record<EventType, LucideIcon> = {
   upload: Upload,
   analyze: Sparkles,
   rewrite: PenLine,
};

const TONES = {
   upload: "neutral",
   analyze: "accent",
   rewrite: "warning",
} as const;

export default function History() {
   const navigate = useNavigate();

   const { totals, events } = mockHistory;

   const [filter, setFilter] = useState<FilterKey>("all");

   const filtered = useMemo(
      () => (filter === "all" ? events : events.filter((e) => e.type === filter)),
      [events, filter],
   );

   const grouped = useMemo<[string, HistoryEvent[]][]>(() => {
      const map = new Map<string, HistoryEvent[]>();
      for (const e of filtered) {
         const key = dayKey(e.at);
         if (!map.has(key)) map.set(key, []);
         map.get(key)!.push(e);
      }
      return Array.from(map.entries());
   }, [filtered]);

   return (
      <section className="flex-1 space-y-5">
         <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">History</h2>
            <p className="text-forground-muted text-sm leading-relaxed">
               Everything you've done across your resumes, in time order.
            </p>
         </div>

         <div className="shadow-card bg-surface inline-flex items-center gap-1 rounded-full border p-1">
            {FILTERS.map(({ key, label, icon: Icon }) => {
               const isActive = filter === key;
               return (
                  <button
                     key={key}
                     onClick={() => setFilter(key)}
                     className={cn(
                        "relative inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-2 text-[10px] font-medium transition-colors sm:px-3.5 sm:text-xs",
                        isActive ? "text-background" : "text-forground-muted hover:text-forground",
                     )}
                  >
                     <Icon className="z-10 size-3" />
                     <span className="z-10">{label}</span>
                     <span
                        className={cn(
                           "tabular z-10 hidden rounded-full px-1.5 py-0.5 text-[10px] transition-colors sm:inline",
                           isActive
                              ? "text-forground bg-surface-2"
                              : "text-forground-muted bg-background dark:bg-white/20",
                        )}
                     >
                        {totals[key] ?? events.length}
                     </span>
                     {isActive && (
                        <motion.span
                           layoutId="active-filter"
                           className="bg-forground absolute inset-0 rounded-full"
                           transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
                        />
                     )}
                  </button>
               );
            })}
         </div>

         {grouped.length === 0 ? (
            <EmptyState
               icon={HistoryIcon}
               title="No activity yet"
               description={
                  filter === "all"
                     ? "Once you upload, analyze, or rewrite a resume, events show up here."
                     : "No events match this filter — try a different one."
               }
            />
         ) : (
            <div className="space-y-7">
               {grouped.map(([day, items]) => (
                  <div key={day}>
                     <div className="mb-3 flex items-center gap-3">
                        <h3 className="text-forground-muted text-xs font-semibold tracking-wide uppercase">
                           {day}
                        </h3>
                        <div className="bg-border h-px flex-1" />
                        <span className="tabular text-forground-muted text-[10px]">
                           {items.length}
                        </span>
                     </div>
                     <Card className="overflow-hidden p-0">
                        {items.map((e, idx) => {
                           const Icon = ICONS[e.type] ?? HistoryIcon;
                           return (
                              <button
                                 key={e.id}
                                 onClick={() => navigate(`/resumes/${e.resumeId}`)}
                                 className={cn(
                                    "hover:bg-surface-2 flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors",
                                    idx > 0 && "border-t",
                                 )}
                              >
                                 <div className="bg-surface-2 text-forground-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                                    <Icon size={15} />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-medium">{e.title}</div>
                                    <div className="text-forground-muted mt-0.5 text-xs">
                                       {e.subtitle}
                                    </div>
                                 </div>
                                 <div className="shrink-0 text-right">
                                    <Badge tone={TONES[e.type]}>{e.label}</Badge>
                                    <div className="text-forground-muted mt-1 text-[10px]">
                                       {relativeTime(e.at)}
                                    </div>
                                 </div>
                              </button>
                           );
                        })}
                     </Card>
                  </div>
               ))}
            </div>
         )}
      </section>
   );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

interface EmptyStateProps {
   icon: LucideIcon;
   title: string;
   description: string;
}

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
   return (
      <div className="bg-surface-2 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed py-16 text-center">
         <div className="bg-accent-soft text-accent-strong flex size-12 items-center justify-center rounded-2xl">
            <Icon size={20} />
         </div>
         <div className="space-y-1">
            <p className="text-forground text-sm font-semibold">{title}</p>
            <p className="text-forground-muted text-xs">{description}</p>
         </div>
      </div>
   );
}
