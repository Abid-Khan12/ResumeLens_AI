import {
   ResponsiveContainer,
   AreaChart,
   Area,
   XAxis,
   YAxis,
   Tooltip,
   CartesianGrid,
} from "recharts";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ScoreEvolutionChartProps = {
   currentScore: number;
   delta: number;
   data: { label: string; score: number }[];
};

function CustomTooltip({
   active,
   payload,
   label,
}: {
   active?: boolean;
   label?: string;
   payload?: { value: string | number }[];
}) {
   if (!active || !payload?.length) return null;
   return (
      <div className="shadow-hover bg-surface rounded-xl border px-3 py-2 text-xs">
         <div className="text-forground-muted">{label}</div>
         <div className="font-display tabular mt-0.5 text-base font-semibold">
            {payload[0].value}
         </div>
      </div>
   );
}

export default function ScoreEvolutionChart({
   data,
   currentScore,
   delta,
}: ScoreEvolutionChartProps) {
   return (
      <Card className="h-full">
         <CardHeader>
            <div>
               <CardTitle className="text-base">Score Evolution</CardTitle>
               <CardDescription className="mt-1 max-[375px]:text-xs">
                  How your ATS score trended across versions
               </CardDescription>
            </div>
            <Badge
               tone="success"
               className="shrink-0 gap-1"
            >
               <span className="bg-success h-1.5 w-1.5 animate-pulse rounded-full" /> On track
            </Badge>
         </CardHeader>

         <div className="mb-4 flex items-end justify-between gap-6">
            <div>
               <div className="text-forground-muted text-xs">Current</div>
               <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display tabular text-4xl font-semibold tracking-tight">
                     {currentScore}
                  </span>
                  <span className="text-forground-muted text-sm">/ 100</span>
               </div>
            </div>
            <div className="text-right">
               <div className="text-forground-muted text-xs">Change vs V1</div>
               <Badge
                  tone={delta >= 0 ? "success" : "danger"}
                  className="mt-1 shrink-0"
               >
                  {delta >= 0 ? "+" : ""}
                  {delta} pts
               </Badge>
            </div>
         </div>

         <div className="-mx-2 h-45">
            <ResponsiveContainer
               width="100%"
               height="100%"
            >
               <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
               >
                  <defs>
                     <linearGradient
                        id="scoreFill"
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
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                     type="monotone"
                     dataKey="score"
                     stroke="var(--accent)"
                     strokeWidth={2.5}
                     fill="url(#scoreFill)"
                     dot={{
                        r: 4,
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
   );
}
