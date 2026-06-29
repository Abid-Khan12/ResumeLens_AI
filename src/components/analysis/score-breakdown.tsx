import {
   ResponsiveContainer,
   RadarChart,
   Radar,
   PolarGrid,
   PolarAngleAxis,
   PolarRadiusAxis,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ScoreBreakdown({
   breakdown,
}: {
   breakdown: {
      label: string;
      value: number;
   }[];
}) {
   if (!breakdown) return null;
   const data = [
      { axis: "Keywords", v: breakdown[0].value, full: 100 },
      { axis: "Formatting", v: breakdown[1].value, full: 100 },
      { axis: "Impact", v: breakdown[2].value, full: 100 },
      { axis: "Clarity", v: breakdown[3].value, full: 100 },
   ];

   return (
      <Card
         className="h-full"
         variant={"flat"}
      >
         <CardHeader>
            <div>
               <CardTitle className="text-base">Score Breakdown</CardTitle>
               <CardDescription className="mt-1">Each axis scored out of 25</CardDescription>
            </div>
         </CardHeader>
         <div className="-mx-2 h-57.5">
            <ResponsiveContainer>
               <RadarChart
                  data={data}
                  outerRadius="75%"
               >
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                     dataKey="axis"
                     tick={{ fontSize: 11, fill: "var(--forground-muted)" }}
                  />
                  <PolarRadiusAxis
                     domain={[0, 25]}
                     tick={false}
                     axisLine={false}
                  />
                  <Radar
                     dataKey="v"
                     stroke="var(--accent)"
                     fill="var(--accent)"
                     fillOpacity={0.18}
                     strokeWidth={2}
                  />
               </RadarChart>
            </ResponsiveContainer>
         </div>
         <div className="mt-3 grid grid-cols-4 gap-2 border-t pt-3">
            {data.map((d) => (
               <div
                  key={d.axis}
                  className="text-center"
               >
                  <div className="text-forground-muted text-[10px] tracking-wide uppercase">
                     {d.axis}
                  </div>
                  <div className="font-display tabular mt-0.5 text-lg font-semibold">
                     {d.v}
                     <span className="text-forground-muted ml-0.5 text-xs font-normal">/100</span>
                  </div>
               </div>
            ))}
         </div>
      </Card>
   );
}
