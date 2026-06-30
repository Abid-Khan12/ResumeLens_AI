import type { Tone } from "@/components/dashboard/ats-gauge-card";

import { Upload, Sparkles, PenLine, CheckCircle2, FileDown, type LucideIcon } from "lucide-react";

import { relativeTime } from "@/lib/utils";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Activity } from "@/types/type";

const ICONS: {
   upload: LucideIcon;
   analyze: LucideIcon;
   rewrite: LucideIcon;
   complete: LucideIcon;
   export: LucideIcon;
} = {
   upload: Upload,
   analyze: Sparkles,
   rewrite: PenLine,
   complete: CheckCircle2,
   export: FileDown,
};

const TONES: { upload: Tone; analyze: Tone; rewrite: Tone; complete: Tone; export: Tone } = {
   upload: "neutral",
   analyze: "accent",
   rewrite: "warning",
   complete: "success",
   export: "neutral",
};

export default function ActivityFeed({ items }: { items: Activity }) {
   return (
      <Card
         className="flex h-full flex-col"
         variant={"flat"}
      >
         <CardHeader>
            <div>
               <CardTitle className="text-base">Activity</CardTitle>
               <CardDescription className="mt-1">Recent moves across your resumes</CardDescription>
            </div>
            <Badge tone="neutral">{items.length}</Badge>
         </CardHeader>

         <div className="flex-1 space-y-3">
            {items.map((item) => {
               const type = item.type;
               const Icon = ICONS[type as keyof typeof ICONS];
               return (
                  <div
                     key={item.id}
                     className="flex items-start gap-3"
                  >
                     <div className="bg-surface-2 text-forground-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                        {Icon && <Icon size={15} />}
                     </div>
                     <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{item.title}</div>
                        <div className="text-forground-muted mt-0.5 text-xs">{item.subtitle}</div>
                     </div>
                     <div className="shrink-0 text-right">
                        <Badge tone={TONES[item.type as keyof typeof TONES] || "neutral"}>
                           {item.label}
                        </Badge>
                        <div className="text-forground-muted mt-1 text-[10px]">
                           {relativeTime(item.at)}
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </Card>
   );
}
