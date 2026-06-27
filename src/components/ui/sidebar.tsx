import { NavLink } from "react-router";

import AILogo from "@/components/ui/ai-logo";
import {
   BarChart3Icon,
   FileTextIcon,
   HistoryIcon,
   LayersIcon,
   LayoutGridIcon,
   LogOutIcon,
   SettingsIcon,
   type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const sidebarLinks = [
   { to: "/dashboard", icon: LayoutGridIcon, label: "Dashboard" },
   { to: "/resumes", icon: FileTextIcon, label: "Resumes" },
   { to: "/insights", icon: BarChart3Icon, label: "Insights" },
   { to: "/versions", icon: LayersIcon, label: "Versions" },
   { to: "/history", icon: HistoryIcon, label: "History" },
];

function SidebarItem({ icon: Icon, label, to }: { to: string; icon: LucideIcon; label: string }) {
   return (
      <NavLink
         to={to}
         className={({ isActive }) =>
            cn(
               "flex size-11 items-center overflow-hidden rounded-2xl group-hover:w-53",
               "transition-[width,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
               isActive
                  ? "bg-forground text-background shadow-card hover:shadow-card-hover"
                  : "hover:bg-surface-2 hover:text-forground bg-surface text-forground-muted",
            )
         }
      >
         <div className=""></div>
         <span className="flex size-11 shrink-0 items-center justify-center">
            <Icon
               size={18}
               strokeWidth={2}
            />
         </span>
         <span
            className={cn(
               "-translate-x-2 text-sm font-semibold opacity-0",
               "transition-[translate,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-150",
            )}
         >
            {label}
         </span>
      </NavLink>
   );
}

function Sidebar() {
   return (
      <aside
         className={cn(
            "group rounded-card bg-surface shadow-card hover:shadow-card-hover sticky top-4 hidden flex-col justify-between overflow-hidden py-5 hover:w-60 lg:flex",
            "h-[calc(100vh-32px)] w-22",
            "transition-[width,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
         )}
      >
         <div className="flex flex-col items-center gap-6">
            {/* Sidebar header */}
            <div
               className={cn(
                  "flex size-12 items-center gap-2.5 group-hover:w-52",
                  "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
               )}
            >
               <div>
                  <AILogo />
               </div>
               <span
                  className={cn(
                     "font-display -translate-x-1 font-semibold opacity-0",
                     "transition-[translate,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-100",
                  )}
               >
                  ResumeLens
               </span>
            </div>
            {/* Sidebar header */}

            {/* Sidebar content */}
            <div className="flex w-full flex-col items-center gap-2.5">
               {sidebarLinks.map((item) => (
                  <SidebarItem
                     key={item.label}
                     {...item}
                  />
               ))}
            </div>
            {/* Sidebar content */}
         </div>

         {/* Sidebar footer */}
         <div className="flex flex-col items-center gap-4">
            <SidebarItem
               to="/settings"
               label="Settings"
               icon={SettingsIcon}
            />
            <button
               className={cn(
                  "text-forground-muted hover:bg-danger flex size-11 cursor-pointer items-center overflow-hidden rounded-2xl group-hover:w-53 hover:text-white dark:hover:bg-red-500/50",
                  "transition-[width,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
               )}
            >
               <span className="flex size-11 shrink-0 items-center justify-center">
                  <LogOutIcon
                     size={18}
                     strokeWidth={2}
                  />
               </span>
               <span
                  className={cn(
                     "-translate-x-2 text-sm font-semibold opacity-0",
                     "transition-[translate,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-150",
                  )}
               >
                  Logout
               </span>
            </button>

            <div
               className={cn(
                  "flex size-11 items-center gap-2 overflow-hidden group-hover:w-53",
                  "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
               )}
            >
               <div className="bg-accent-soft text-accent-strong ring-surface flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase ring-2">
                  A
               </div>
               <div className="flex -translate-x-1 flex-col gap-1 text-xs font-medium opacity-0 transition-[translate,opacity] group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-150">
                  <span className="font-semibold">Abid</span>
                  <span className="text-forground-muted">Abid@gmail.com</span>
               </div>
            </div>
         </div>
         {/* Sidebar footer */}
      </aside>
   );
}

export default Sidebar;
