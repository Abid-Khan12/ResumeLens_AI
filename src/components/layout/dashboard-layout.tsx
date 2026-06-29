import { motion } from "motion/react";

import { Outlet } from "react-router";

import Sidebar from "@/components/ui/sidebar";
import TopBar from "@/components/ui/topbar";
import { Suspense } from "react";

function DashboardLayout() {
   return (
      <>
         <Sidebar />
         <Suspense
            fallback={
               <div className="fixed inset-0 z-50">
                  {/* dim wash over stale content */}
                  <div className="bg-background/60 absolute inset-0 backdrop-blur-[1px]" />
                  {/* progress bar */}
                  <div className="absolute top-0 right-0 left-0 h-0.75">
                     <div className="bg-accent h-full animate-[progress_3.2s_cubic-bezier(0.87,0,0.13,1)_forwards] rounded-r-sm" />
                  </div>
               </div>
            }
         >
            <main className="mx-auto flex min-h-[calc(100svh-32px)] w-full max-w-400 flex-1 flex-col gap-5 p-4 lg:pl-32">
               <TopBar />
               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
               >
                  <Outlet />
               </motion.div>
            </main>
         </Suspense>
      </>
   );
}

export default DashboardLayout;
