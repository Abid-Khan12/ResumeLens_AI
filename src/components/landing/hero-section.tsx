import { motion } from "motion/react";
import { Link } from "react-router";

import { ArrowRight, PlayIcon, ShieldCheckIcon, SparkleIcon } from "lucide-react";

import { DarkPanel } from "@/components/ui/dark-panel";
import { HeroDashboardPreview } from "@/components/ui/hero-dashboard-preview";

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.05, // Gap spacing timeline between elements
         delayChildren: 0.1,
      },
   },
};

// Shared smooth down-drop entry physics
const itemVariants = {
   hidden: { opacity: 0, y: 15 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
      },
   },
} as const;

function HeroSection() {
   return (
      <section className="relative w-full">
         <DarkPanel className="min-h-190 w-full rounded-b-[40px] px-3 sm:rounded-b-[60px] sm:px-6">
            <div className="mx-auto grid w-full max-w-310 grid-cols-1 gap-10 pt-34 pb-10 text-white lg:grid-cols-2 lg:pb-15">
               <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-start gap-7"
               >
                  {/* pill */}
                  <motion.div
                     variants={itemVariants}
                     className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/10 px-2 py-1.5 backdrop-blur-md sm:px-3"
                  >
                     <SparkleIcon className="size-3" />
                     <span className="text-[11px] font-semibold tracking-wide text-white/85 uppercase">
                        Now scoring against ATS 2026 criteria
                     </span>
                  </motion.div>
                  {/* pill */}
                  {/* Heading */}
                  <motion.h1
                     variants={itemVariants}
                     className="font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
                  >
                     Beat the ATS.
                     <br />
                     <span className="text-white/60">Land more</span>{" "}
                     <span
                        style={{
                           backgroundImage:
                              "linear-gradient(120deg, #a8e2e6 0%, #2ab8c0 55%, #0a484c 100%)",
                           WebkitBackgroundClip: "text",
                           backgroundClip: "text",
                           WebkitTextFillColor: "transparent",
                           color: "transparent",
                        }}
                     >
                        interviews.
                     </span>
                  </motion.h1>
                  {/* Heading */}
                  {/* Sub heading */}
                  <motion.p
                     variants={itemVariants}
                     className="max-w-135 text-sm leading-relaxed text-white/70 sm:text-lg lg:text-xl"
                  >
                     Upload your resume. Get an instant ATS score, fixable issues, and AI-rewritten
                     bullets that actually sound like you — built for engineers, by engineers.
                  </motion.p>
                  {/* Sub heading */}
                  {/* CTA Button */}
                  <motion.div
                     variants={itemVariants}
                     className="flex flex-wrap items-center gap-3"
                  >
                     <Link
                        to={"/register"}
                        className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(42,184,192,0.45)] transition-shadow hover:shadow-[0_14px_36px_-8px_rgba(42,184,192,0.65)] active:scale-[0.98]"
                        style={{
                           background:
                              "linear-gradient(135deg, #2ab8c0 0%, #0f7278 55%, #0a484c 100%)",
                        }}
                     >
                        Upload your resume
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                     </Link>
                     <a
                        href={"#how_it_works"}
                        className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/12"
                     >
                        <PlayIcon className="size-4 fill-white" />
                        See how it works
                     </a>
                  </motion.div>
                  {/* CTA Button */}
                  {/* Validation and Trust Metrics Row */}
                  <motion.div
                     variants={itemVariants}
                     className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55"
                  >
                     <span className="inline-flex items-center gap-1.5">
                        <ShieldCheckIcon
                           size={13}
                           className="text-[#8FB39C]"
                        />
                        No credit card required
                     </span>
                     <span className="inline-flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        Free ATS analysis
                     </span>
                     <span className="inline-flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        47,300+ resumes analyzed
                     </span>
                  </motion.div>
                  {/* Validation and Trust Metrics Row */}
               </motion.div>
               <div className="relative">
                  <HeroDashboardPreview />
               </div>
            </div>
         </DarkPanel>
      </section>
   );
}

export default HeroSection;
