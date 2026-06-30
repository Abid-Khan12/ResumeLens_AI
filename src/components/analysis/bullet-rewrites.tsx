import { useState, useMemo } from "react";
import { ArrowRight, Loader2, Sparkles, Wand2, Info, ArrowDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Rewrite {
   _id?: string;
   section?: string;
   original: string;
   rewritten: string;
   rationale?: string;
}

interface BulletRewritesProps {
   rewrites: Rewrite[];
   onApply?: (ids: string[]) => void;
   isApplying?: boolean;
}

function GradientNumber({ value, size = 32 }: { value: string | number; size?: number }) {
   return (
      <span
         className="font-display leading-none font-semibold tracking-tight tabular-nums"
         style={{
            fontSize: size,
            backgroundImage:
               "linear-gradient(135deg, #B6CFC0 0%, var(--accent) 45%, var(--accent-strong) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
         }}
      >
         {value}
      </span>
   );
}

export default function BulletRewrites({ rewrites, onApply, isApplying }: BulletRewritesProps) {
   const ids = useMemo(() => rewrites.map((r) => r._id).filter(Boolean), [rewrites]);
   const [selected, setSelected] = useState(() => new Set(ids));

   const allSelected = selected.size === ids.length && ids.length > 0;
   const someSelected = selected.size > 0;

   function toggle(id: string) {
      setSelected((prev) => {
         const next = new Set(prev);
         if (next.has(id)) next.delete(id);
         else next.add(id);
         return next;
      });
   }

   function toggleAll() {
      setSelected(allSelected ? new Set() : new Set(ids));
   }

   function applySelected() {
      onApply?.(Array.from(selected) as string[]);
   }

   function applyAll() {
      onApply?.([]);
   }

   if (!rewrites?.length) {
      return (
         <Card padding={"sm"}>
            <CardHeader>
               <div>
                  <CardTitle className="text-base">Suggested Rewrites</CardTitle>
                  <CardDescription className="mt-1">No rewrites suggested.</CardDescription>
               </div>
            </CardHeader>
         </Card>
      );
   }

   return (
      <Card padding={"sm"}>
         <CardHeader className="mb-3">
            <div>
               <CardTitle className="text-base">Suggested Rewrites</CardTitle>
               <CardDescription className="mt-1">
                  Pick the ones you want — applying creates a new version.
               </CardDescription>
            </div>
         </CardHeader>

         {/* Hero summary */}
         <div className="bg-surface-2 relative mb-5 overflow-hidden rounded-2xl border p-4 sm:p-5">
            {/* Decorative sage rings */}
            <svg
               className="pointer-events-none absolute -top-8 -right-8"
               width="160"
               height="160"
               viewBox="0 0 160 160"
               fill="currentColor"
               aria-hidden
            >
               <circle
                  cx="80"
                  cy="80"
                  r="68"
                  fill="none"
                  stroke="var(--accent)"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                  strokeDasharray="3 6"
               />
               <circle
                  cx="80"
                  cy="80"
                  r="48"
                  fill="none"
                  stroke="var(--accent)"
                  strokeOpacity="0.18"
                  strokeWidth="1"
               />
            </svg>

            <div className="relative flex flex-wrap items-end justify-between gap-5">
               <div className="flex items-end gap-8">
                  <div>
                     <div className="text-forground-muted text-[10px] font-semibold tracking-wider uppercase">
                        AI rewrites
                     </div>
                     <div className="mt-1.5 flex items-baseline gap-1.5">
                        <GradientNumber
                           value={rewrites.length}
                           size={44}
                        />
                        <span className="text-forground-muted ml-1 text-xs">ready</span>
                     </div>
                  </div>
                  <div className="bg-border h-10 w-px" />
                  <div>
                     <div className="text-forground-muted text-[10px] font-semibold tracking-wider uppercase">
                        Selected
                     </div>
                     <div className="mt-1.5 flex items-baseline gap-1">
                        <span className="font-display text-[26px] leading-none font-semibold tracking-tight tabular-nums">
                           {selected.size}
                        </span>
                        <span className="text-forground-muted text-sm tabular-nums">
                           / {rewrites.length}
                        </span>
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-2 max-sm:flex-wrap">
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={toggleAll}
                     className="flex-1/4"
                  >
                     {allSelected ? "Clear all" : "Select all"}
                  </Button>
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={applySelected}
                     disabled={!someSelected || isApplying}
                     className="flex-1/4"
                  >
                     {isApplying ? (
                        <Loader2
                           size={13}
                           className="animate-spin"
                        />
                     ) : (
                        <Sparkles size={13} />
                     )}
                     Apply selected
                  </Button>

                  <Button
                     variant="accent"
                     size="sm"
                     onClick={applyAll}
                     disabled={isApplying}
                     className="flex-1"
                  >
                     <Wand2 size={13} />
                     Apply all → new version
                  </Button>
               </div>
            </div>
         </div>

         <div className="space-y-3">
            {rewrites.map((r, i) => {
               const id = r._id || `idx-${i}`;
               const isSelected = selected.has(id);
               return (
                  <div
                     key={id}
                     className={cn(
                        "group relative rounded-2xl border p-5 transition-colors",
                        isSelected && "shadow-card border-accent/50 bg-surface-2",
                     )}
                  >
                     {/* Header row: number + section + selection state */}
                     <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                           <div className="flex w-9 items-center justify-center">
                              <GradientNumber
                                 value={String(i + 1).padStart(2, "0")}
                                 size={22}
                              />
                           </div>
                           {r.section && (
                              <span className="bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong inline-flex h-6 items-center rounded-full px-2 text-xs font-semibold capitalize">
                                 {r.section}
                              </span>
                           )}
                        </div>
                        <label className="flex cursor-pointer items-center gap-2 select-none">
                           <span
                              className={cn(
                                 "text-forground-muted text-xs font-medium transition-colors",
                              )}
                           >
                              {isSelected ? "Will apply" : "Skip"}
                           </span>
                           <Checkbox
                              checked={isSelected}
                              onChange={() => toggle(id)}
                           />
                        </label>
                     </div>

                     {/* Before / arrow / After */}
                     <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[1fr_36px_1fr]">
                        <div className="border-border bg-surface-2/70 relative rounded-xl border p-3 sm:p-4">
                           <div className="mb-1.5 flex items-center gap-1.5">
                              <span className="bg-forground-muted/50 h-1.5 w-1.5 rounded-full" />
                              <div className="text-forground-muted text-[11px] font-semibold tracking-wider uppercase">
                                 Original
                              </div>
                           </div>
                           <div className="text-forground-muted decoration-formutext-forground-muted/30 text-[13.5px] leading-relaxed line-through">
                              {r.original}
                           </div>
                        </div>

                        <div className="flex items-center justify-center">
                           <div className="dark:bg-accent-strong bg-accent flex h-9 w-9 items-center justify-center rounded-full text-white">
                              <ArrowRight
                                 size={14}
                                 strokeWidth={2.5}
                                 className="hidden sm:inline"
                              />
                              <ArrowDown
                                 size={14}
                                 strokeWidth={2.5}
                                 className="sm:hidden"
                              />
                           </div>
                        </div>

                        <div className="dark:bg-surface-2 relative rounded-xl border p-3 sm:p-4">
                           <div className="mb-1.5 flex items-center gap-1.5">
                              <Sparkles
                                 size={10}
                                 strokeWidth={2.5}
                                 className="text-accent-strong dark:text-accent"
                              />
                              <div className="text-accent-strong dark:text-accent text-[11px] font-semibold tracking-wider uppercase">
                                 Rewritten
                              </div>
                           </div>
                           <div className="line-clamp-3 text-xs leading-relaxed font-medium">
                              {r.rewritten}
                           </div>
                        </div>
                     </div>

                     {/* Rationale */}
                     {r.rationale && (
                        <div className="border-border bg-surface-2/60 mt-4 flex items-center gap-2 rounded-xl border p-3">
                           <span className="bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center self-start rounded-md">
                              <Info
                                 size={10}
                                 strokeWidth={2.5}
                              />
                           </span>
                           <span className="text-forground-muted text-xs leading-relaxed">
                              <strong>Why this works · </strong>
                              <br className="sm:hidden" />
                              {r.rationale}
                           </span>
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </Card>
   );
}
