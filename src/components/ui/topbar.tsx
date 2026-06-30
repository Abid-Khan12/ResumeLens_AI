import { SearchIcon, SidebarIcon, XIcon } from "lucide-react";

import ToggleTheme from "@/components/ui/toggle-theme";
import IconButton from "@/components/ui/icon-button";
import { CommandPaletteTrigger, useCommandPalette } from "@/components/ui/command-palette";
import { useSidebarContext } from "./sidebar";
import { cn } from "@/lib/utils";

function TopBar() {
   const { togglePalette } = useCommandPalette();
   const { toggleSidebar, isOpen: isSidebarOpen } = useSidebarContext();

   return (
      <header className="flex items-start justify-between">
         <div>
            <h1 className="font-display text-[clamp(28px,3vw,38px)] leading-tight font-semibold">
               Hello, User.
            </h1>
            <p className="text-forground-muted mt-1 text-xs leading-relaxed font-medium text-balance sm:text-sm">
               Sharpen your resume with calm, focused AI insights.
            </p>
         </div>
         <div className="flex items-center gap-1.5 sm:gap-3">
            <CommandPaletteTrigger onClick={togglePalette} />
            <IconButton
               onClick={toggleSidebar}
               title="sidebar"
               className="lg:hidden"
            >
               <SidebarIcon
                  size={16}
                  className={cn(
                     "absolute scale-0 -rotate-90 opacity-0 transition-all",
                     !isSidebarOpen && "scale-100 rotate-0 opacity-100",
                  )}
               />
               <XIcon
                  size={16}
                  className={cn(
                     "scale-0 rotate-90 opacity-0 transition-all",
                     isSidebarOpen && "scale-100 rotate-0 opacity-100",
                  )}
               />
            </IconButton>
            <IconButton
               onClick={togglePalette}
               title="search"
               className="lg:hidden"
            >
               <SearchIcon size={16} />
            </IconButton>
            <ToggleTheme />
         </div>
      </header>
   );
}

export default TopBar;
