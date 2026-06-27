import { BellIcon, SearchIcon } from "lucide-react";

import CommandPalette from "@/components/ui/command-palette";
import ToggleTheme from "@/components/ui/toggle-theme";
import IconButton from "@/components/ui/icon-button";

function TopBar() {
   return (
      <header className="flex items-start justify-between">
         <div>
            <h1 className="font-display text-[clamp(28px,3vw,38px)] leading-tight font-semibold">
               Hello, Abid.
            </h1>
            <p className="text-forground-muted mt-1 text-xs leading-relaxed font-medium text-balance sm:text-sm">
               Sharpen your resume with calm, focused AI insights.
            </p>
         </div>
         <div className="flex items-center gap-1.5 sm:gap-3">
            <CommandPalette />
            <IconButton
               title="search"
               className="lg:hidden"
            >
               <SearchIcon size={16} />
            </IconButton>
            <ToggleTheme />
            <IconButton>
               <BellIcon size={16} />
            </IconButton>
         </div>
      </header>
   );
}

export default TopBar;
