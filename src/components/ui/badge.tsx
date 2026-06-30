import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type React from "react";

export const badgeVariants = cva(
   "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-tight tabular",
   {
      variants: {
         tone: {
            neutral: "bg-surface-2 text-forground-muted border",
            accent: "bg-accent-soft text-accent-strong dark:text-forground dark:bg-accent-strong",
            success: "bg-accent-soft text-success",
            warning: "bg-warning text-white",
            danger: "bg-danger text-white",
            forground: "bg-forground text-background",
         },
      },
      defaultVariants: { tone: "neutral" },
   },
);

export function Badge({
   className,
   tone,
   ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
   return (
      <span
         className={cn(badgeVariants({ tone }), className)}
         {...props}
      />
   );
}
