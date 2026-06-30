import { cn } from "@/lib/utils";
import type React from "react";

// Hoisted — never recreated between renders
const BG_STYLE = {
   background: "linear-gradient(140deg, #0e2e32 0%, #0a484c 38%, #0c2a2e 72%, #081e22 100%)",
} as const;

export function DarkPanel({
   className = "",
   children,
}: {
   children: React.ReactNode;
   className?: string;
   glow?: boolean; // kept for API compat, unused
}) {
   return (
      // Removed backdrop-blur-md from the panel itself — it forces a
      // separate compositing layer on the entire hero section (expensive).
      // Individual floating cards already apply backdrop-blur where needed.
      <div className={cn("shadow-card relative overflow-hidden", className)}>
         <div
            className="absolute inset-0"
            style={BG_STYLE}
         />
         <div className="relative z-10 h-full w-full">{children}</div>
      </div>
   );
}
