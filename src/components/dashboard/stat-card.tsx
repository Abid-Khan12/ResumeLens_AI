import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ChartProps = {
   data: { v: number }[];
   color?: string;
};

type StatCardProps = {
   label: string;
   value: number;
   delta?: number | null;
   chart: "line" | "bars";
   data: { v: number }[];
   suffix?: string | null;
   icon: LucideIcon;
   accent?: boolean;
};

function MiniLine({ data, color }: ChartProps) {
   return (
      <ResponsiveContainer
         width="100%"
         height={42}
      >
         <LineChart
            data={data}
            margin={{ top: 6, right: 0, bottom: 0, left: 0 }}
         >
            <Line
               type="monotone"
               dataKey="v"
               stroke={color}
               strokeWidth={2}
               dot={false}
               isAnimationActive={false}
            />
         </LineChart>
      </ResponsiveContainer>
   );
}

function MiniBars({ data, color }: ChartProps) {
   return (
      <ResponsiveContainer
         width="100%"
         height={42}
      >
         <BarChart
            data={data}
            margin={{ top: 6, right: 0, bottom: 0, left: 0 }}
         >
            <Bar
               dataKey="v"
               fill={color}
               radius={[3, 3, 0, 0]}
               barSize={6}
            />
         </BarChart>
      </ResponsiveContainer>
   );
}

function StatCard({
   label,
   value,
   suffix = null,
   delta = null,
   chart = "line",
   data = [],
   icon: Icon,
   accent = false,
}: StatCardProps) {
   const positive = delta == null ? null : delta >= 0;
   const color = accent ? "#FFFFFF" : "var(--accent)";
   const ChartCmp = chart === "bars" ? MiniBars : MiniLine;
   const displayValue = value === null ? "—" : value;
   const hasData = Array.isArray(data) && data.length > 0;

   return (
      <Card
         variant={accent ? "accent" : "flat"}
         className={cn("max-sm: relative overflow-hidden max-sm:p-4")}
      >
         <div className="flex h-full items-start justify-between gap-2">
            <div className="flex flex-1 flex-col items-start gap-2.5">
               <div className="flex items-center gap-2">
                  <span
                     className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full",
                        accent
                           ? "bg-white/15 text-white"
                           : "bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong",
                     )}
                  >
                     <Icon
                        size={15}
                        strokeWidth={2}
                     />
                  </span>
                  <span
                     className={cn("text-xs", accent ? "text-white/70" : "text-forground-muted")}
                  >
                     {label}
                  </span>
               </div>
               <div className="flex items-baseline gap-1">
                  <span className="font-display tabular text-3xl font-semibold tracking-tight">
                     {displayValue}
                  </span>
                  {suffix && (
                     <span
                        className={cn(
                           "text-sm font-medium",
                           accent ? "text-white/70" : "text-forground-muted",
                        )}
                     >
                        {suffix}
                     </span>
                  )}
               </div>
               {delta !== null && (
                  <Badge
                     tone={accent ? "forground" : positive ? "success" : "danger"}
                     className={cn(accent && "bg-white/15 text-white")}
                  >
                     {positive ? "+" : ""}
                     {delta}%
                  </Badge>
               )}
            </div>
            {hasData && (
               <div className="w-27.5 shrink-0 self-end opacity-90">
                  <ChartCmp
                     data={data}
                     color={color}
                  />
               </div>
            )}
         </div>
      </Card>
   );
}

export default StatCard;
