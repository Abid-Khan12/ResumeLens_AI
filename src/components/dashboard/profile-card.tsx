import { useNavigate } from "react-router";
import { Upload, BarChart3, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProfileStats, User } from "@/pages/dashboard-page";

function memberSince(date: Date) {
   if (!date) return null;
   const d = new Date(date);
   return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

export default function ProfileCard({ user, stats }: { user: User; stats: ProfileStats }) {
   const nav = useNavigate();
   const since = memberSince(user.createdAt);

   return (
      <Card
         className="flex h-full flex-col items-center text-center"
         variant={"flat"}
      >
         <div className="relative">
            <Avatar
               name={user.name}
               size={72}
               className="ring-4"
            />
            <span className="bg-accent ring-surface absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ring-4">
               ✓
            </span>
         </div>

         <div className="mt-3">
            <div className="font-display text-lg font-semibold tracking-tight">
               {user.name || "User"}
            </div>
            <div className="text-forground-muted mt-0.5 text-xs">
               {user.email || "User@example.com"}
            </div>
            <Badge
               tone="accent"
               className="mt-2 shrink-0"
            >
               Pro plan
            </Badge>
         </div>

         <div className="mt-5 grid w-full grid-cols-3 gap-3 border-t pt-5">
            {stats.map((s) => (
               <div key={s.label}>
                  <div className="text-forground-muted text-[10px] tracking-wide uppercase">
                     {s.label}
                  </div>
                  <div className="font-display tabular mt-0.5 text-xl font-semibold">{s.value}</div>
               </div>
            ))}
         </div>

         {/* Quick actions + member since */}
         <div className="mt-auto w-full space-y-3 pt-5">
            <div className="grid w-full grid-cols-2 gap-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => nav("/resumes")}
                  className="w-full"
               >
                  <Upload size={13} /> Upload
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => nav("/insights")}
                  className="w-full"
               >
                  <BarChart3 size={13} /> Insights
               </Button>
            </div>
            {since && (
               <div className="text-forground-muted flex items-center justify-center gap-1.5 text-[10px]">
                  <Calendar size={10} />
                  Member since {since}
               </div>
            )}
         </div>
      </Card>
   );
}
