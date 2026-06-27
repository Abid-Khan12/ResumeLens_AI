import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: ReactNode;
   title?: string;
}

function IconButton({ children, className, title, ...props }: IconButtonProps) {
   return (
      <button
         className={cn(
            "shadow-card hover:shadow-card-hover bg-surface hover:bg-surface-2 focus-visible:focus-visible:ring-accent/30 relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full border transition-[background-color,box-shadow] focus-visible:ring-2 focus-visible:outline-none sm:size-11",
            className,
         )}
         {...props}
      >
         {children}
         <span className="sr-only">{title}</span>
      </button>
   );
}

export default IconButton;
