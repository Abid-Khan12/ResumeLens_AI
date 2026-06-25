import type { ReactNode } from "react";
import { motion } from "motion/react";

import BrandPanel from "@/components/auth/brand-panel";

function AuthShell({
   children,
   headline = "Headline",
   subhead = "Sub Heading",
}: {
   children: ReactNode;
   headline: ReactNode;
   subhead: string;
}) {
   return (
      <div className="mx-auto flex min-h-svh w-full max-w-325 items-center justify-center gap-0 px-3 py-4 sm:px-6 lg:gap-4">
         <div className="flex flex-1 items-center justify-center px-4 sm:px-8 xl:py-10">
            <motion.div
               initial={{ opacity: 0, y: 12 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
               className="w-full max-w-110"
            >
               {children}
            </motion.div>
         </div>

         <BrandPanel
            headline={headline}
            subhead={subhead}
         />
      </div>
   );
}

export default AuthShell;
