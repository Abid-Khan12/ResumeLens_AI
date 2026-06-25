import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function PageLoader() {
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      const startTime = Date.now();
      const duration = 1000; // Fast premium load curve

      const updateProgress = () => {
         const elapsedTime = Date.now() - startTime;
         const timeRatio = Math.min(elapsedTime / duration, 1);
         const easeOutRatio = 1 - Math.pow(1 - timeRatio, 4); // Quartic curve for rapid startup snap

         const nextProgress = easeOutRatio * 100;

         if (nextProgress >= 99.5) {
            setProgress(99);
            clearInterval(interval);
         } else {
            setProgress(nextProgress);
         }
      };

      const interval = setInterval(updateProgress, 16);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="bg-background fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none">
         {/* Layered high-end ambient lighting */}
         <div className="bg-accent-soft pointer-events-none absolute top-1/2 left-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[140px]" />
         <div className="bg-success pointer-events-none absolute top-1/4 left-1/3 h-32 w-32 rounded-full opacity-10 blur-[80px]" />

         <div className="relative z-10 flex w-full max-w-100 flex-col items-center gap-2 px-8">
            {/* Massive Stylized Counter Header */}
            <div className="relative flex items-baseline justify-center select-none">
               <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-forground font-sans text-[7rem] leading-none font-black tracking-tighter tabular-nums sm:text-[9rem]"
               >
                  {Math.floor(progress)}
               </motion.h1>

               {/* Clean, bold uppercase accent indicator */}
               <span className="text-accent mb-4 ml-2 animate-pulse text-sm font-black tracking-[0.3em] uppercase sm:mb-6">
                  %
               </span>
            </div>

            {/* Premium Multi-Layer Progress Track */}
            <div className="bg-border relative h-0.75 w-full overflow-hidden rounded-full backdrop-blur-sm">
               {/* Glow effect attached behind the progress bar */}
               <motion.div
                  className="bg-accent-strong absolute h-full rounded-full opacity-50 blur-[2px]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.01 }}
               />

               {/* Primary Accent Progress Line */}
               <motion.div
                  className="bg-accent relative h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.01 }}
               >
                  {/* Leading edge light point */}
                  <div className="absolute top-1/2 right-0 h-0.75 w-4 -translate-y-1/2 bg-white opacity-80 shadow-[0_0_8px_var(--accent)] blur-[1px]" />
               </motion.div>

               {/* Fluid premium scanning line shimmer */}
               <motion.div
                  className="via-surface absolute inset-0 h-full w-1/3 bg-linear-to-r from-transparent to-transparent opacity-40"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{
                     repeat: Infinity,
                     duration: 1.5,
                     ease: "linear",
                  }}
               />
            </div>

            {/* Micro layout label */}
            <div className="flex w-full justify-between px-1 pt-2">
               <span className="text-forground-muted text-[9px] font-bold tracking-[0.25em] uppercase">
                  System.Initialize()
               </span>
               <span className="text-accent-hero-2 animate-pulse text-[9px] font-bold tracking-[0.25em] uppercase">
                  Ready
               </span>
            </div>
         </div>
      </div>
   );
}
