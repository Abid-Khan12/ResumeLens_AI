import { cn } from "@/lib/utils";

interface AvatarProps {
   name?: string;
   src?: string | null;
   size?: number;
   className?: string;
}

function initials(name = "") {
   return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("");
}

export function Avatar({ name, src, size = 40, className }: AvatarProps): React.JSX.Element {
   return (
      <div
         className={cn(
            "text-accent-strong ring-surface bg-accent-soft relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold ring-2",
            className,
         )}
         style={{ width: size, height: size, fontSize: size * 0.36 }}
      >
         {src ? (
            <img
               src={src}
               alt={name ?? "Avatar"}
               className="h-full w-full object-cover"
            />
         ) : (
            <span>{name ? initials(name) : "?"}</span>
         )}
      </div>
   );
}
