import { useTheme } from "@/providers/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import IconButton from "@/components/ui/icon-button";

function ToggleTheme() {
   const { setTheme, theme } = useTheme();
   return (
      <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
         <MoonIcon
            size={16}
            className="absolute scale-100 rotate-0 bg-transparent! opacity-100 transition-all dark:scale-0 dark:-rotate-90 dark:opacity-0"
         />

         <SunIcon
            size={16}
            className="scale-0 rotate-90 opacity-0 transition-all dark:scale-100 dark:rotate-0 dark:opacity-100"
         />

         <span className="sr-only">Toggle Theme</span>
      </IconButton>
   );
}

export default ToggleTheme;
