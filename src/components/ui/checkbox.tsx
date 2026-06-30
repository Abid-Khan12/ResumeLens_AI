import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
   checked,
   onChange,
   className,
   label,
}: {
   checked: boolean;
   onChange: (value: boolean) => void;
   className?: string;
   label?: string;
}) {
   return (
      <button
         type="button"
         role="checkbox"
         aria-checked={checked}
         onClick={() => onChange(!checked)}
         className={cn(
            "inline-flex items-center gap-2 select-none focus-visible:outline-none",
            className,
         )}
      >
         <span
            className={cn(
               "flex h-4 w-4 items-center justify-center rounded-md border transition-colors",
               checked
                  ? "bg-accent dark:bg-accent border-transparent text-white"
                  : "border-border bg-surface-2 text-transparent",
            )}
         >
            <Check
               size={11}
               strokeWidth={3}
            />
         </span>
         {label && <span className="text-forground-muted text-xs">{label}</span>}
      </button>
   );
}
