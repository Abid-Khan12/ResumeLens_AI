import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const AILogo = ({ className }: { className?: string }) => {
   return (
      <div
         className={cn("relative flex size-12 items-center justify-center", className)}
         aria-label="ResumeLens AI"
      >
         {/* Ambient AI Glow */}
         <motion.div
            className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)] blur-md"
            animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
         />

         {/* Lens Bezel — rotating conic ring */}
         <motion.div
            className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,var(--accent-strong),var(--accent),var(--accent-strong),var(--accent),var(--accent-strong))]"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
         />

         {/* Lens Interior */}
         <div className="bg-surface shadow-card relative flex size-10 items-center justify-center rounded-full">
            {/* Aperture blades — a breathing iris, nodding to "Lens" */}
            <motion.div
               className="bg-accent-soft/40 absolute h-9 w-2 rotate-0 rounded-full"
               animate={{ scaleY: [0.55, 0.85, 0.55], opacity: [0.25, 0.5, 0.25] }}
               transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
               className="bg-accent-soft/40 absolute h-9 w-2 rotate-60 rounded-full"
               animate={{ scaleY: [0.55, 0.85, 0.55], opacity: [0.25, 0.5, 0.25] }}
               transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
               className="bg-accent-soft/40 absolute h-9 w-2 rotate-120 rounded-full"
               animate={{ scaleY: [0.55, 0.85, 0.55], opacity: [0.25, 0.5, 0.25] }}
               transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Radar Sweep */}
            <motion.div
               className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--accent-soft)_0%,transparent_75%)]"
               animate={{ scale: [0.8, 1.2, 0.8] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Resume Document */}
            <div className="relative z-10 flex h-6 w-4.5 flex-col justify-between rounded-sm border bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface))] p-0.5">
               {/* Resume Header */}
               <div className="bg-accent-strong h-0.5 w-2 rounded-full" />

               {/* Resume Content Lines */}
               <div className="bg-accent h-[1.5px] w-3 rounded-full" />
               <div className="bg-accent h-[1.5px] w-3 rounded-full" />
               <div className="bg-accent h-[1.5px] w-3 rounded-full" />

               {/* Scanner Beam */}
               <motion.div
                  className="absolute right-0 left-0 z-20 h-0.5 bg-[linear-gradient(to_right,transparent,var(--accent-strong),transparent)] shadow-[0_0_6px_var(--accent),0_0_12px_var(--accent-soft)]"
                  animate={{ top: ["10%", "85%", "10%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
               />
            </div>

            {/* Data Extraction Nodes */}
            <motion.div
               className="bg-accent-strong absolute top-3 right-2 h-1 w-1 rounded-full"
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="absolute top-3 right-2 h-px w-2 bg-[#A8C4B3]/50" />

            <motion.div
               className="bg-forground absolute bottom-4 left-2 h-1 w-1 rounded-full"
               animate={{ opacity: [1, 0.2, 1] }}
               transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
            />
            <div className="absolute bottom-4 left-2 h-px w-2 bg-white/30" />

            {/* AI Intelligence Core */}
            <motion.div
               className="bg-accent-strong absolute h-1.5 w-1.5 rounded-full shadow-[0_0_8px_var(--accent),0_0_16px_var(--accent-soft)]"
               animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
         </div>
      </div>
   );
};

export default AILogo;
