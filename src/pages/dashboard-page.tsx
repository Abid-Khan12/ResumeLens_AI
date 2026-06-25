import { motion } from "motion/react";
import {
   FileText,
   Sparkles,
   BarChart2,
   Bell,
   Clock,
   ChevronRight,
   type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import AILogo from "@/components/ui/ai-logo";
import { Link } from "react-router";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Skeleton shimmer block ── */
interface SkeletonProps {
   className?: string;
   style?: CSSProperties;
}

function Skeleton({ className = "", style = {} }: SkeletonProps) {
   return (
      <motion.div
         className={`rounded-lg ${className}`}
         style={{
            background: "var(--border)",
            ...style,
         }}
         animate={{ opacity: [0.4, 0.75, 0.4] }}
         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
   );
}

/* ── Ghost stat card ── */
interface StatCardProps {
   icon: LucideIcon;
   label: string;
   delay: number;
}

function StatCard({ icon: Icon, label, delay }: StatCardProps) {
   return (
      <motion.div
         initial={{ opacity: 0, y: 14 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay, duration: 0.55, ease }}
         className="flex flex-col gap-3 rounded-2xl p-5"
         style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-card)",
         }}
      >
         <div className="flex items-center justify-between">
            <div
               className="flex h-8 w-8 items-center justify-center rounded-lg"
               style={{ background: "var(--accent-soft)" }}
            >
               <Icon
                  size={15}
                  style={{ color: "var(--accent)" }}
                  strokeWidth={1.8}
               />
            </div>
            <Skeleton style={{ width: 48, height: 10, borderRadius: 6 }} />
         </div>
         <Skeleton style={{ width: 64, height: 22, borderRadius: 6 }} />
         <p
            className="text-xs"
            style={{ color: "var(--forground-muted)" }}
         >
            {label}
         </p>
      </motion.div>
   );
}

/* ── Ghost resume row ── */
interface ResumeRowProps {
   delay: number;
}

function ResumeRow({ delay }: ResumeRowProps) {
   return (
      <motion.div
         initial={{ opacity: 0, x: -8 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay, duration: 0.45, ease }}
         className="flex items-center gap-4 px-1 py-3.5"
         style={{ borderBottom: "1px solid var(--border)" }}
      >
         <div
            className="h-10 w-8 shrink-0 rounded-md"
            style={{ background: "var(--accent-soft)" }}
         />
         <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton style={{ width: "55%", height: 10, borderRadius: 5 }} />
            <Skeleton style={{ width: "30%", height: 8, borderRadius: 5 }} />
         </div>
         <Skeleton style={{ width: 40, height: 22, borderRadius: 20 }} />
         <ChevronRight
            size={14}
            style={{ color: "var(--border)", flexShrink: 0 }}
         />
      </motion.div>
   );
}

/* ── Notification dot ── */
function PulseDot() {
   return (
      <span className="relative flex h-2 w-2">
         <motion.span
            className="absolute inline-flex h-full w-full rounded-full"
            style={{ background: "var(--accent)", opacity: 0.5 }}
            animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         />
         <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: "var(--accent)" }}
         />
      </span>
   );
}

export default function DashboardPage() {
   return (
      <div
         className="min-h-screen"
         style={{ background: "var(--background)" }}
      >
         {/* ── Top nav ghost ── */}
         <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="bg-surface sticky top-0 z-20 border-b px-6 py-4 backdrop-blur-md"
         >
            <nav className="mx-auto flex w-full max-w-5xl items-center justify-between">
               <Link
                  to={"/"}
                  className="flex items-center gap-2.5"
               >
                  <AILogo />
                  <span
                     className="text-sm font-semibold tracking-tight"
                     style={{ color: "var(--forground)", letterSpacing: "-0.02em" }}
                  >
                     ResumeLens AI
                  </span>
               </Link>

               <div className="flex items-center gap-3">
                  <div className="relative">
                     <Bell
                        size={17}
                        style={{ color: "var(--forground-muted)" }}
                        strokeWidth={1.6}
                     />
                     <span className="absolute -top-0.5 -right-0.5">
                        <PulseDot />
                     </span>
                  </div>
                  <div
                     className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium"
                     style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent-strong)",
                     }}
                  >
                     Y
                  </div>
               </div>
            </nav>
         </motion.header>

         <div className="mx-auto max-w-5xl px-5 py-6">
            {/* ── Coming soon announcement ── */}
            <motion.div
               initial={{ opacity: 0, y: 20, scale: 0.98 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ delay: 0.15, duration: 0.65, ease }}
               className="bg-accent-strong shadow-card-hover relative mb-8 overflow-hidden rounded-2xl p-6 sm:p-8"
            >
               {/* Background texture rings */}
               <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full border-30 border-white opacity-10 max-sm:hidden" />
               <div className="absolute -right-4 -bottom-14 h-36 w-36 rounded-full border-20 border-white opacity-5 max-sm:hidden" />

               <div className="relative z-10">
                  <div>
                     <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.45, ease }}
                        className="mb-3 flex items-center gap-2"
                     >
                        <Sparkles
                           size={13}
                           color="rgba(255,255,255,0.7)"
                           strokeWidth={1.8}
                        />
                        <span
                           className="text-xs font-medium tracking-widest uppercase"
                           style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em" }}
                        >
                           Coming soon
                        </span>
                     </motion.div>

                     <motion.h1
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.38, duration: 0.5, ease }}
                        className="mb-2 text-xl leading-snug font-semibold tracking-[-0.03em] text-white sm:text-2xl"
                     >
                        Your workspace is taking shape
                     </motion.h1>

                     <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="max-w-xs text-sm leading-relaxed sm:max-w-md"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                     >
                        Resumes, AI suggestions, application tracking — all in one place. We're
                        putting the final touches on it.
                     </motion.p>
                  </div>

                  <motion.div
                     initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                     animate={{ opacity: 1, scale: 1, rotate: 0 }}
                     transition={{
                        delay: 0.45,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                     }}
                     className="absolute -top-5 right-0 flex size-12 shrink-0 items-center justify-center rounded-2xl sm:top-0 sm:size-14"
                     style={{ background: "rgba(255,255,255,0.12)" }}
                  >
                     <FileText
                        size={26}
                        color="rgba(255,255,255,0.9)"
                        strokeWidth={1.4}
                     />
                  </motion.div>
               </div>

               {/* Progress bar */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
               >
                  <div className="mb-2 flex items-center justify-between">
                     <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                     >
                        Build progress
                     </span>
                     <span
                        className="text-xs font-medium"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                     >
                        78%
                     </span>
                  </div>
                  <div
                     className="h-1.5 overflow-hidden rounded-full"
                     style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                     <motion.div
                        className="h-full rounded-full"
                        style={{ background: "rgba(255,255,255,0.85)" }}
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ delay: 0.75, duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
                     />
                  </div>
               </motion.div>
            </motion.div>

            {/* ── Ghost stat cards ── */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
               <StatCard
                  icon={FileText}
                  label="Resumes created"
                  delay={0.3}
               />
               <StatCard
                  icon={BarChart2}
                  label="Applications sent"
                  delay={0.38}
               />
               <StatCard
                  icon={Sparkles}
                  label="AI suggestions used"
                  delay={0.46}
               />
               <StatCard
                  icon={Clock}
                  label="Hours saved"
                  delay={0.54}
               />
            </div>

            {/* ── Recent resumes ghost list ── */}
            <motion.div
               initial={{ opacity: 0, y: 14 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.55, ease }}
               className="overflow-hidden rounded-2xl"
               style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
               }}
            >
               <div
                  className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: "1px solid var(--border)" }}
               >
                  <span
                     className="text-sm font-medium"
                     style={{ color: "var(--forground)", letterSpacing: "-0.01em" }}
                  >
                     Recent resumes
                  </span>
                  <span
                     className="rounded-full px-2.5 py-1 text-xs"
                     style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        fontWeight: 500,
                     }}
                  >
                     Preview
                  </span>
               </div>

               <div className="px-5">
                  <ResumeRow delay={0.55} />
                  <ResumeRow delay={0.62} />
                  <ResumeRow delay={0.69} />
               </div>

               {/* Empty state hint */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-2 px-5 py-4"
               >
                  <Sparkles
                     size={13}
                     style={{ color: "var(--accent)" }}
                     strokeWidth={1.8}
                  />
                  <p
                     className="text-xs"
                     style={{ color: "var(--forground-muted)" }}
                  >
                     Your resumes will appear here once the dashboard is live.
                  </p>
               </motion.div>
            </motion.div>

            {/* ── Footer note ── */}
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.05, duration: 0.6 }}
               className="mt-8 text-center text-xs"
               style={{ color: "var(--forground-muted)", opacity: 0.5 }}
            >
               We'll notify you the moment it's ready · ResumeForge
            </motion.p>
         </div>
      </div>
   );
}
