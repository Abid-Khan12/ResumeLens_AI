import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Layers, FileText, PenLine, ChevronRight, Search, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn, relativeTime } from "@/lib/utils";
import { mockAllVersions } from "@/mock/version";
import type { Version } from "@/types/type";

// ─── types ────────────────────────────────────────────────────────────────────

type FilterKey = "all" | "upload" | "rewrite";

// ─── constants ────────────────────────────────────────────────────────────────

const FILTERS: { key: FilterKey; label: string }[] = [
   { key: "all", label: "All versions" },
   { key: "upload", label: "Uploads" },
   { key: "rewrite", label: "Rewrites" },
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function Versions() {
   const navigate = useNavigate();

   const { totals, versions } = mockAllVersions;

   const [filter, setFilter] = useState<FilterKey>("all");
   const [query, setQuery] = useState("");

   const filtered = useMemo(() => {
      return versions.filter((v) => {
         const matchesFilter = filter === "all" || v.sourceType === filter;
         const q = query.trim().toLowerCase();
         const matchesQuery =
            !q || v.resumeTitle.toLowerCase().includes(q) || v.label.toLowerCase().includes(q);
         return matchesFilter && matchesQuery;
      });
   }, [versions, filter, query]);

   return (
      <section className="flex-1 space-y-5">
         <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Versions</h2>
            <p className="text-forground-muted text-sm leading-relaxed">
               Every iteration across every resume, in one place.
            </p>
         </div>
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <TotalCard
               label="Total versions"
               value={totals.all}
               icon={Layers}
            />
            <TotalCard
               label="Uploads"
               value={totals.uploads}
               icon={FileText}
            />
            <TotalCard
               label="Rewrites"
               value={totals.rewrites}
               icon={PenLine}
               accent
            />
         </div>

         <div className="flex flex-wrap-reverse items-center justify-between gap-3 gap-y-4">
            <div className="shadow-card bg-surface inline-flex items-center gap-1 rounded-full border p-1">
               {FILTERS.map((f) => (
                  <button
                     key={f.key}
                     onClick={() => setFilter(f.key)}
                     className={cn(
                        "relative h-8 cursor-pointer px-3.5 text-xs font-medium transition-colors",
                        filter === f.key
                           ? "text-background"
                           : "text-forground-muted hover:text-forground",
                     )}
                  >
                     <span className="relative z-10">{f.label}</span>
                     {filter === f.key && (
                        <motion.span
                           layoutId="active-filter"
                           className="bg-forground absolute inset-0 rounded-full"
                           transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
                        />
                     )}
                  </button>
               ))}
            </div>

            <div className="relative max-sm:w-full">
               <Search
                  size={14}
                  className="text-forground-muted absolute top-1/2 left-3 shrink-0 -translate-y-1/2"
               />
               <Input
                  className="w-full ps-8 sm:w-[320px]"
                  placeholder="Search resume or version label..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
               />
            </div>
         </div>

         {filtered.length === 0 ? (
            <EmptyState
               icon={Layers}
               title="No versions match"
               description={
                  versions.length === 0
                     ? "Upload a resume to start creating versions."
                     : "Try a different filter or search term."
               }
            />
         ) : (
            <div className="space-y-5">
               {filtered.map((v) => (
                  <VersionRow
                     key={v.id}
                     version={v}
                     onClick={() => navigate(`/resumes/${v.resumeId}`)}
                  />
               ))}
            </div>
         )}
      </section>
   );
}

// ─── VersionRow ───────────────────────────────────────────────────────────────

function VersionRow({ version, onClick }: { version: Version; onClick: () => void }) {
   const isUpload = version.sourceType === "upload";
   return (
      <Card
         padding={"sm"}
         variant={"flat"}
         onClick={onClick}
         className="flex cursor-pointer items-center gap-2 sm:gap-4"
      >
         <div
            className={cn(
               "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
               isUpload
                  ? "text-forground-muted bg-surface-2"
                  : "bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong",
            )}
         >
            {isUpload ? <FileText size={18} /> : <PenLine size={18} />}
         </div>

         <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
               <span className="font-display tabular text-base font-semibold">{version.label}</span>
               <span className="text-forground-muted truncate text-xs leading-relaxed sm:text-sm">
                  {version.resumeTitle}
               </span>
            </div>
            <div className="text-forground-muted mt-0.5 text-xs">
               {isUpload ? "Uploaded" : "Rewritten"} {relativeTime(version.createdAt)}
            </div>
         </div>

         {version.score != null ? (
            <div className="shrink-0 text-right">
               <div className="font-display tabular text-xl font-semibold">{version.score}</div>
               <div className="text-forground-muted text-[10px] tracking-wide uppercase">ATS</div>
            </div>
         ) : (
            <Badge tone="neutral">No score</Badge>
         )}

         <Badge
            tone={isUpload ? "neutral" : "accent"}
            className="capitalize"
         >
            {version.sourceType}
         </Badge>

         <ChevronRight
            size={16}
            className="text-forground-muted shrink-0"
         />
      </Card>
   );
}

// ─── TotalCard ────────────────────────────────────────────────────────────────

interface TotalCardProps {
   label: string;
   value: number;
   icon: LucideIcon;
   accent?: boolean;
}

function TotalCard({ label, value, icon: Icon, accent = false }: TotalCardProps) {
   return (
      <Card variant={accent ? "accent" : "default"}>
         <div className="flex items-center gap-3">
            <div
               className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
                  accent
                     ? "bg-white/15 text-white"
                     : "bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong",
               )}
            >
               <Icon size={16} />
            </div>
            <div className="flex-1">
               <div className={cn("text-xs", accent ? "text-white/70" : "text-forground-muted")}>
                  {label}
               </div>
               <div className="font-display tabular text-2xl font-semibold tracking-tight">
                  {value}
               </div>
            </div>
         </div>
      </Card>
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
