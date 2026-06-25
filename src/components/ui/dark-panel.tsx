import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type React from "react";

export function DarkPanel({
   className = "",
   children,
   glow = true,
}: {
   children: React.ReactNode;
   className?: string;
   glow?: boolean;
}) {
   return (
      <div
         className={cn(
            "relative overflow-hidden",
            "shadow-xl shadow-black/40 backdrop-blur-md",
            className,
         )}
      >
         <div
            className="absolute inset-0"
            style={{
               background:
                  "linear-gradient(140deg, #18271F 0%, #2F4A3A 38%, #1A2B22 72%, #0E1812 100%)",
            }}
         />
         {/* Sweeping Accent Glow Layer */}
         {glow && (
            <motion.div
               className="pointer-events-none absolute top-0 bottom-0 w-[60%] opacity-40 mix-blend-screen select-none"
               style={{
                  // Sharp emerald-mint core leaking out to transparent edges
                  background:
                     "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.08) 50%, transparent 100%)",
                  willChange: "transform",
               }}
               animate={{
                  // Moves completely across the visual layout context box
                  x: ["-100%", "200%"],
               }}
               transition={{
                  duration: 3, // Time taken to travel from left to right
                  repeat: Infinity, // Continuous loops
                  repeatDelay: 1, // The rest/delay time in seconds before running the loop again
                  ease: [0.25, 1, 0.5, 1], // Custom quad ease-out variant for variable momentum
               }}
            />
         )}

         {/* Content Wrapper */}
         <div className="relative z-10 h-full w-full">{children}</div>
      </div>
   );
}
