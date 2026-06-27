import { motion } from "motion/react";

import { Outlet } from "react-router";

import Sidebar from "@/components/ui/sidebar";
import TopBar from "@/components/ui/topbar";

function DashboardLayout() {
   return (
      <div className="justify-between gap-6 p-4 lg:flex">
         <div className="shrink-0">
            <Sidebar />
         </div>
         <main className="mx-auto flex min-h-[calc(100svh-32px)] w-full max-w-400 flex-1 flex-col gap-5">
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
      </div>
   );
}

export default DashboardLayout;
