import { SearchIcon } from "lucide-react";

function CommandPalette() {
   const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform);
   return (
      <button
         type="button"
         className="shadow-card hover:shadow-card-hover bg-surface hidden h-11 w-90 items-center gap-3 rounded-full border px-3 text-left transition-shadow lg:flex"
      >
         <SearchIcon
            size={16}
            className="shrink-0"
         />
         <span className="text-forground-muted flex-1 truncate text-sm">
            Search resumes, keywords, rewrites...
         </span>
         <kbd className="text-forground-muted bg-surface-2 inline-flex h-7 items-center gap-0.5 rounded-full border px-2 text-[10px] font-semibold">
            {isMac ? "⌘" : "Ctrl"} K
         </kbd>
      </button>
   );
}

export default CommandPalette;
