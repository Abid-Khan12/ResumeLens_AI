import { motion } from "motion/react";

import { SparklesIcon } from "lucide-react";

import { BrandCardMarquee } from "@/components/auth/brand-card-marque";
import type { ReactNode } from "react";

function BrandPanel({ headline, subhead }: { headline: ReactNode; subhead: string }) {
   return (
      <div className="relative isolate hidden flex-1 overflow-hidden rounded-[28px] lg:block">
         {/* Base dark gradient */}
         <div
            className="absolute inset-0"
            style={{
               background:
                  "linear-gradient(140deg, #0e2e32 0%, #0a484c 38%, #0c2a2e 72%, #081e22 100%)",
            }}
         />

         {/* Content */}
         <div className="relative z-10 flex h-160 flex-col gap-10 pt-10 xl:h-180 xl:justify-between xl:pt-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="px-10"
            >
               <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 backdrop-blur-md">
                  <SparklesIcon
                     size={12}
                     className="text-white/80"
                  />
                  <span className="text-[11px] font-semibold tracking-wide text-white/80 uppercase">
                     ResumeLens AI
                  </span>
               </div>

               <h2 className="mt-8 max-w-140 font-serif text-[44px] leading-[1.02] font-medium tracking-[-0.01em] text-white italic xl:text-[50px]">
                  {headline}
               </h2>

               <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 xl:text-lg">
                  {subhead}
               </p>
            </motion.div>

            <BrandCardMarquee />
         </div>
      </div>
   );
}

export default BrandPanel;
