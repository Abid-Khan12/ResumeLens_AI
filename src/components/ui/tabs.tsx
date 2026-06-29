import { createContext, useContext } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ─── context ─────────────────────────────────────────────────────────────────

interface TabsCtxValue {
   value: string;
   onValueChange: (value: string) => void;
}

const TabsCtx = createContext<TabsCtxValue | null>(null);

function useTabsCtx(): TabsCtxValue {
   const ctx = useContext(TabsCtx);
   if (!ctx) throw new Error("Tabs compound components must be used inside <Tabs>");
   return ctx;
}

// ─── components ──────────────────────────────────────────────────────────────

interface TabsProps {
   value: string;
   onValueChange: (value: string) => void;
   children: React.ReactNode;
   className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
   return (
      <TabsCtx.Provider value={{ value, onValueChange }}>
         <div className={cn("w-full overflow-x-auto", className)}>{children}</div>
      </TabsCtx.Provider>
   );
}

interface TabsListProps {
   children: React.ReactNode;
   className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
   return (
      <div
         className={cn(
            "bg-surface-2 inline-flex items-center gap-1 rounded-full border p-1",
            className,
         )}
      >
         {children}
      </div>
   );
}

interface TabsTriggerProps {
   value: string;
   children: React.ReactNode;
   className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
   const ctx = useTabsCtx();
   const active = ctx.value === value;

   return (
      <button
         onClick={() => ctx.onValueChange(value)}
         className={cn(
            "relative h-8 cursor-pointer rounded-full px-2 text-xs font-medium transition-colors min-[321px]:px-3.5",
            active ? "text-background" : "hover:text-forgroubg-forground text-forground-muted",
            className,
         )}
      >
         {active && (
            <motion.span
               layoutId="tab-active"
               className="bg-forground absolute inset-0 rounded-full"
               transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            />
         )}
         <span className="relative z-10">{children}</span>
      </button>
   );
}

interface TabsContentProps {
   value: string;
   children: React.ReactNode;
   className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
   const ctx = useTabsCtx();
   if (ctx.value !== value) return null;
   return <div className={cn("w-full", className)}>{children}</div>;
}
