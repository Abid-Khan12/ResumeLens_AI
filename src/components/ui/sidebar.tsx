import { AnimatePresence, motion } from "motion/react";
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
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

const sidebarLinks = [
   { to: "/dashboard", icon: LayoutGridIcon, label: "Dashboard" },
   { to: "/resumes", icon: FileTextIcon, label: "Resumes" },
   { to: "/insights", icon: BarChart3Icon, label: "Insights" },
   { to: "/versions", icon: LayersIcon, label: "Versions" },
   { to: "/history", icon: HistoryIcon, label: "History" },
];

interface SidebarContextType {
   isOpen: boolean;
   openSidebar: () => void;
   closeSidebar: () => void;
   toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
   const openSidebar = useCallback(() => setIsOpen(true), []);
   const closeSidebar = useCallback(() => setIsOpen(false), []);

   return (
      <SidebarContext.Provider value={{ isOpen, toggleSidebar, openSidebar, closeSidebar }}>
         {children}
      </SidebarContext.Provider>
   );
};

export const useSidebarContext = () => {
   const context = useContext(SidebarContext);
   if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider");
   }
   return context;
};

export function Sidebar() {
   return (
      <aside
         className={cn(
            "group rounded-card bg-surface shadow-card hover:shadow-card-hover fixed top-4 left-4 z-30 hidden flex-col justify-between py-5 hover:w-60 lg:flex",
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
                     "overflow-hidden transition-[translate,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-100",
                  )}
               >
                  ResumeLens
               </span>
            </div>
            {/* Sidebar header */}

            {/* Sidebar content */}
            <div className="flex flex-col items-center gap-2.5">
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
            <NavLink
               to={"/login"}
               replace
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
            </NavLink>

            <div
               className={cn(
                  "flex size-11 items-center gap-2 overflow-hidden group-hover:w-53",
                  "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
               )}
            >
               <div className="bg-accent-soft text-accent-strong ring-surface dark:text-forground dark:bg-accent-strong flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase ring-2">
                  U
               </div>
               <div className="flex -translate-x-1 flex-col gap-1 text-xs font-medium opacity-0 transition-[translate,opacity] group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-150">
                  <span className="font-semibold">User</span>
                  <span className="text-forground-muted">User@gmail.com</span>
               </div>
            </div>
         </div>
         {/* Sidebar footer */}
      </aside>
   );
}

function SidebarItem({ icon: Icon, label, to }: { to: string; icon: LucideIcon; label: string }) {
   return (
      <NavLink
         to={to}
         className={({ isActive }) =>
            cn(
               "relative flex size-11 items-center rounded-2xl group-hover:w-53",
               "transition-[width,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
               isActive
                  ? "text-background"
                  : "hover:bg-surface-2 hover:text-forground bg-surface text-forground-muted",
            )
         }
      >
         {({ isActive }) => (
            <>
               {isActive && (
                  <motion.span
                     layoutId="active-link"
                     className="bg-forground absolute inset-0 z-10 rounded-2xl"
                     transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
                  />
               )}

               {/* content always above the pill */}
               <span className="z-10 flex size-11 shrink-0 items-center justify-center">
                  <Icon
                     size={18}
                     strokeWidth={2}
                  />
               </span>
               <span
                  className={cn(
                     "z-10 -translate-x-2 overflow-hidden text-sm font-semibold opacity-0",
                     "transition-[translate,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-150",
                  )}
               >
                  {label}
               </span>
            </>
         )}
      </NavLink>
   );
}

export function MobileSidebar() {
   const { isOpen, closeSidebar } = useSidebarContext();
   return (
      <AnimatePresence>
         {isOpen && (
            <>
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                     duration: 0.2,
                  }}
                  onClick={closeSidebar}
                  className="bg-forground/30 fixed inset-0 z-20 backdrop-blur-sm dark:bg-black/20"
               />
               <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                     duration: 0.3,
                  }}
                  className={cn(
                     "rounded-card bg-surface shadow-card hover:shadow-card-hover fixed top-4 left-4 z-30 flex flex-col justify-between px-3 py-5 lg:hidden",
                     "h-[calc(100vh-32px)] w-60",
                  )}
               >
                  <div className="space-y-6">
                     {/* Sidebar header */}
                     <div className={cn("flex w-full items-center gap-2.5")}>
                        <div className="size-12">
                           <AILogo />
                        </div>
                        <span className={cn("font-display font-semibold")}>ResumeLens</span>
                     </div>
                     {/* Sidebar header */}

                     {/* Sidebar content */}
                     <div className="flex w-full flex-col gap-2.5">
                        {sidebarLinks.map((item) => (
                           <MobileSidebarItem
                              key={item.label}
                              {...item}
                              onClick={closeSidebar}
                           />
                        ))}
                     </div>
                     {/* Sidebar content */}
                  </div>

                  {/* Sidebar footer */}
                  <div className="space-y-4">
                     <MobileSidebarItem
                        to="/settings"
                        label="Settings"
                        icon={SettingsIcon}
                        onClick={closeSidebar}
                     />
                     <NavLink
                        to={"/login"}
                        replace
                        className={cn(
                           "bg-danger flex h-11 cursor-pointer items-center gap-2 rounded-2xl px-3 text-white dark:bg-red-500/50",
                        )}
                     >
                        <span className="flex h-11 shrink-0 items-center justify-center">
                           <LogOutIcon
                              size={18}
                              strokeWidth={2}
                           />
                        </span>
                        <span className={cn("text-sm font-semibold")}>Logout</span>
                     </NavLink>

                     <div className={cn("flex size-11 items-center gap-2")}>
                        <div className="bg-accent-soft text-accent-strong ring-surface dark:text-forground dark:bg-accent-strong flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase ring-2">
                           U
                        </div>
                        <div className="flex flex-col gap-1 text-xs font-medium">
                           <span className="font-semibold">User</span>
                           <span className="text-forground-muted">User@gmail.com</span>
                        </div>
                     </div>
                  </div>
                  {/* Sidebar footer */}
               </motion.aside>
            </>
         )}
      </AnimatePresence>
   );
}

function MobileSidebarItem({
   icon: Icon,
   label,
   to,
   onClick,
}: {
   to: string;
   icon: LucideIcon;
   label: string;
   onClick: () => void;
}) {
   const handleClick = useCallback(() => setTimeout(() => onClick(), 500), []);

   return (
      <NavLink
         to={to}
         onClick={handleClick}
         className={({ isActive }) =>
            cn(
               "relative flex h-11 items-center gap-2 rounded-2xl px-3",
               isActive ? "text-background" : "bg-surface text-forground-muted",
            )
         }
      >
         {({ isActive }) => (
            <>
               {isActive && (
                  <motion.span
                     layoutId="active-mobile-link"
                     className="bg-forground absolute inset-0 z-10 rounded-2xl"
                     transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
                  />
               )}

               {/* content always above the pill */}
               <span className="z-10 flex h-11 shrink-0 items-center justify-center">
                  <Icon
                     size={18}
                     strokeWidth={2}
                  />
               </span>
               <span className={cn("z-10 text-sm font-semibold")}>{label}</span>
            </>
         )}
      </NavLink>
   );
}
