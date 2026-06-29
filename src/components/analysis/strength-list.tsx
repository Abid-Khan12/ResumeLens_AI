import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StrengthsList({ strengths }: { strengths: { title: string; note: string }[] }) {
   return (
      <Card padding={"sm"}>
         <CardHeader>
            <div>
               <CardTitle className="text-base">Strengths</CardTitle>
               <CardDescription className="mt-1">What's already working for you</CardDescription>
            </div>
            <Badge tone="success">{strengths.length}</Badge>
         </CardHeader>
         <div className="space-y-7">
            {strengths.map((s, i) => (
               <div
                  key={i}
                  className="flex items-start gap-3"
               >
                  <div className="flex w-8 shrink-0 items-start justify-center pt-0.5">
                     <span
                        className="font-display text-[18px] leading-none font-semibold tracking-tight tabular-nums"
                        style={{
                           backgroundImage:
                              "linear-gradient(135deg, #B6CFC0 0%, var(--accent) 45%, var(--accent-strong) 100%)",
                           WebkitBackgroundClip: "text",
                           backgroundClip: "text",
                           color: "transparent",
                           WebkitTextFillColor: "transparent",
                        }}
                        aria-hidden
                     >
                        {String(i + 1).padStart(2, "0")}
                     </span>
                  </div>
                  <div className="min-w-0 flex-1">
                     <div className="text-sm font-medium">{s.title}</div>
                     {/* <div className="text-forground-muted mt-0.5 text-xs">{s.evidence}</div> */}
                  </div>
               </div>
            ))}
         </div>
      </Card>
   );
}
