import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: ComponentProps<"input">) {
   return (
      <input
         data-slot="input"
         type={type}
         className={cn(
            "bg-surface text-forground focus:border-accent/50 focus:ring-accent/15 placeholder:text-forground-muted h-10 w-full rounded-full border px-4 text-sm transition-colors outline-none focus:ring-2 disabled:opacity-50",
            className,
         )}
         {...props}
      />
   );
}

export { Input };
