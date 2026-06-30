import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SEV_TONE = { low: "neutral", medium: "warning", high: "danger" } as const;

function IssueItem({ issue }: { issue: { title: string; severity: string; fix: string } }) {
   const [open, setOpen] = useState(false);
   return (
      <button
         onClick={() => setOpen((v) => !v)}
         className="bg-surface-2 hover:bg-surface-2/80 w-full rounded-2xl border p-4 text-left transition-colors"
      >
         <div className="flex items-center gap-3">
            <div className="bg-surface text-forground-muted flex size-7 shrink-0 items-center justify-center self-start rounded-xl">
               <AlertCircle size={12} />
            </div>
            <div className="min-w-0 flex-1">
               <div className="mb-2 flex items-center justify-between gap-1.5 min-[426px]:gap-3">
                  <div className="text-xs font-medium min-[426px]:text-sm">{issue.title}</div>
                  <div className="flex shrink-0 items-center gap-2">
                     <Badge tone={SEV_TONE[issue.severity as keyof typeof SEV_TONE] || "neutral"}>
                        {issue.severity}
                     </Badge>
                     <ChevronDown
                        size={14}
                        className={cn(
                           "text-forground-muted transition-transform",
                           open && "rotate-180",
                        )}
                     />
                  </div>
               </div>

               <AnimatePresence initial={false}>
                  {open && (
                     <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                     >
                        {issue.fix && (
                           <div className="bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong rounded-xl px-3 py-2 text-xs">
                              <strong className="font-semibold">Fix:</strong> {issue.fix}
                           </div>
                        )}
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </button>
   );
}

export function IssuesList({
   issues,
}: {
   issues: { title: string; severity: string; fix: string }[];
}) {
   return (
      <Card padding={"sm"}>
         <CardHeader>
            <div>
               <CardTitle className="text-base">Top Issues</CardTitle>
               <CardDescription className="mt-1">
                  What to fix first, ranked by impact
               </CardDescription>
            </div>
            <Badge tone="neutral">{issues.length}</Badge>
         </CardHeader>
         <div className="space-y-2">
            {issues.map((issue, i) => (
               <IssueItem
                  key={i}
                  issue={issue}
               />
            ))}
         </div>
      </Card>
   );
}
