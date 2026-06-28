import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("bg-surface border shadow-card transition-all duration-300", {
   variants: {
      variant: {
         default: "hover:shadow-card-hover",
         accent:
            "bg-accent-hero text-white border-transparent bg-[image:linear-gradient(135deg,var(--accent-hero-2)_0%,var(--accent-hero)_55%,var(--accent-hero)_100%)]",
         flat: "",
      },
      radius: {
         md: "rounded-2xl",
         lg: "rounded-3xl",
      },
      padding: {
         none: "",
         sm: "p-4",
         md: "p-5",
         lg: "p-6",
      },
   },
   defaultVariants: { variant: "default", radius: "md", padding: "md" },
});

export function Card({
   className,
   variant,
   radius,
   padding,
   ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
   return (
      <div
         data-slot="card"
         className={cn(cardVariants({ variant, radius, padding }), className)}
         {...props}
      />
   );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-header"
         className={cn("mb-4 flex items-start justify-between gap-3", className)}
         {...props}
      />
   );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-title"
         className={cn("font-semibold tracking-tight", className)}
         {...props}
      />
   );
}

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         data-slot="card-description"
         className={cn("text-forground-muted text-sm leading-relaxed", className)}
         {...props}
      />
   );
}
