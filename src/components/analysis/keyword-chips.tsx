import { Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type ChipTone = "present" | "missing";

function Chip({ children, tone }: { children: React.ReactNode; tone: ChipTone }) {
   if (tone === "present") {
      return (
         <span className="bg-accent-strong text-accent-soft inline-flex h-7 items-center gap-1.5 rounded-full pr-3 pl-1.5 text-[12px] font-semibold transition-transform hover:-translate-y-px">
            <span className="bg-accent-soft text-accent-strong flex h-4 w-4 items-center justify-center rounded-full">
               <Check
                  size={9}
                  strokeWidth={3.5}
               />
            </span>
            {children}
         </span>
      );
   }
   return (
      <span className="text-danger dark:bg-danger inline-flex h-7 items-center gap-1.5 rounded-full bg-[#F8E3E0]/70 pr-3 pl-1.5 text-[12px] font-semibold transition-transform hover:-translate-y-px dark:text-white">
         <span className="bg-danger/70 dark:text-danger flex h-4 w-4 items-center justify-center rounded-full text-white dark:bg-white">
            <X
               size={9}
               strokeWidth={3.5}
            />
         </span>
         {children}
      </span>
   );
}

function SectionHeader({ tone, label, count }: { tone: ChipTone; label: string; count: number }) {
   const isPresent = tone === "present";
   return (
      <div className="mb-3 flex items-center gap-2.5">
         <span
            className={
               isPresent
                  ? "bg-accent-soft text-accent-strong flex h-6 w-6 items-center justify-center rounded-lg"
                  : "text-danger flex h-6 w-6 items-center justify-center rounded-lg bg-[#F8E3E0]"
            }
         >
            {isPresent ? (
               <Check
                  size={12}
                  strokeWidth={3}
               />
            ) : (
               <X
                  size={12}
                  strokeWidth={3}
               />
            )}
         </span>
         <div className="text-[12px] font-semibold">{label}</div>
         <span className="text-forground text-[11px] tabular-nums">{count}</span>
         <div className="bg-border h-px flex-1" />
      </div>
   );
}

export function KeywordChips({
   present = [],
   missing = [],
}: {
   present?: string[];
   missing?: string[];
}) {
   const total = present.length + missing.length;
   const pct = total ? Math.round((present.length / total) * 100) : 0;

   return (
      <Card>
         <CardHeader>
            <div>
               <CardTitle className="text-base">Keywords</CardTitle>
               <CardDescription className="mt-1">What ATS sees vs what it expects</CardDescription>
            </div>
         </CardHeader>

         {/* Match-rate hero */}
         <div className="bg-surface-2 relative mb-5 overflow-hidden rounded-2xl border p-5">
            {/* Decorative dashed sage arc, top right */}
            <svg
               className="pointer-events-none absolute -top-6 -right-6"
               width="140"
               height="140"
               viewBox="0 0 140 140"
               aria-hidden
            >
               <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="var(--accent)"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  strokeDasharray="3 6"
               />
            </svg>

            <div className="relative flex items-end justify-between gap-4">
               <div>
                  <div className="text-forground text-[10px] font-semibold tracking-wider uppercase">
                     Match rate
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                     <span className="font-display text-accent-strong text-[44px] leading-none font-semibold tracking-tight tabular-nums">
                        {present.length}
                     </span>
                     <span className="text-forground-muted text-base font-medium tabular-nums">
                        / {total}
                     </span>
                     <span className="text-forground ml-1 text-xs">keywords</span>
                  </div>
               </div>
               <div className="text-right">
                  <div className="font-display dark:text-accent text-accent text-[26px] leading-none font-semibold tracking-tight tabular-nums">
                     {pct}%
                  </div>
                  <div className="text-forground mt-1 text-[10px] tracking-wider uppercase">
                     coverage
                  </div>
               </div>
            </div>

            <div className="bg-surface relative mt-4 h-1.5 w-full max-w-250 overflow-hidden rounded-full">
               <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                     width: `${pct}%`,
                     background:
                        "linear-gradient(90deg, var(--accent) 0%, var(--accent-strong) 100%)",
                  }}
               />
            </div>
         </div>

         {/* Present */}
         <div className="space-y-5">
            <div>
               <SectionHeader
                  tone="present"
                  label="Present"
                  count={present.length}
               />
               {present.length ? (
                  <div className="flex flex-wrap gap-1.5">
                     {present.map((k) => (
                        <Chip
                           key={k}
                           tone="present"
                        >
                           {k}
                        </Chip>
                     ))}
                  </div>
               ) : (
                  <p className="text-forground pl-8 text-xs">None detected.</p>
               )}
            </div>

            <div>
               <SectionHeader
                  tone="missing"
                  label="Missing"
                  count={missing.length}
               />
               {missing.length ? (
                  <div className="flex flex-wrap gap-1.5">
                     {missing.map((k) => (
                        <Chip
                           key={k}
                           tone="missing"
                        >
                           {k}
                        </Chip>
                     ))}
                  </div>
               ) : (
                  <p className="text-forground pl-8 text-xs">
                     You&apos;re hitting the major keywords. Nice.
                  </p>
               )}
            </div>
         </div>
      </Card>
   );
}
