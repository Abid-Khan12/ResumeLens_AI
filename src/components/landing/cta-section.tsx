import { motion } from "motion/react";

import { DarkPanel } from "@/components/ui/dark-panel";
import { Link } from "react-router";
import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react";

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.15, // Gap spacing timeline between elements
         delayChildren: 0.1,
      },
   },
};

// Shared smooth down-drop entry physics
const itemVariants = {
   hidden: {
      opacity: 0,
      y: 20,
   },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         type: "spring",
         stiffness: 100, // Controls the speed/tightness of the bounce
         damping: 15, // Controls how quickly the bounce comes to a rest
         mass: 0.8, // Makes the element feel lighter and snappier
      },
   },
} as const;

function CTASection() {
   return (
      <section className="mx-auto w-full max-w-310 px-3 sm:px-6">
         <DarkPanel className="rounded-4xl px-4 py-16 text-center shadow-none sm:px-12 sm:py-24 lg:px-20">
            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.4 }}
               className="flex flex-col items-center"
            >
               {/* pill */}
               <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/15 px-2 py-1.5 backdrop-blur-md sm:px-3"
               >
                  <span className="h-1 w-1 rounded-full bg-[#8FB39C]" />
                  <span className="text-[9px] font-semibold tracking-wide text-white/85 uppercase min-[375px]:text-[10.5px]">
                     Free forever for your first 3 analyses
                  </span>
               </motion.div>
               {/* pill */}
               {/* Heading */}
               <motion.h2
                  variants={itemVariants}
                  className="font-display mx-auto mt-6 max-w-3xl text-[32px] leading-[1.04] tracking-tight text-white sm:text-[52px] lg:text-[64px]"
               >
                  Stop guessing what <br className="max-sm:hidden" />
                  recruiters{" "}
                  <span
                     style={{
                        backgroundImage:
                           "linear-gradient(120deg, #B6CFC0 0%, #8FB39C 50%, #5B7C6A 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                     }}
                  >
                     actually see.
                  </span>
               </motion.h2>
               {/* Heading */}
               {/* Sub heading */}
               <motion.p
                  variants={itemVariants}
                  className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
               >
                  Upload your resume now. Get your ATS score, fixable issues, and AI rewrites in
                  under 15 seconds.
               </motion.p>
               {/* Sub heading */}
               {/* CTA Button */}
               <motion.div
                  variants={itemVariants}
                  className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row"
               >
                  <Link
                     to={"/register"}
                     className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(143,179,156,0.5)] transition-shadow hover:shadow-[0_14px_36px_-8px_rgba(143,179,156,0.7)] active:scale-[0.98]"
                     style={{
                        background:
                           "linear-gradient(135deg, #8FB39C 0%, #5B7C6A 55%, #2F4A3A 100%)",
                     }}
                  >
                     Start free ATS analysis
                     <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                     to={"#how_it_works"}
                     className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/12"
                  >
                     I already have an account
                  </Link>
               </motion.div>
               {/* CTA Button */}
               {/* Validation and Trust Metrics Row */}
               <motion.div
                  variants={itemVariants}
                  className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-[12px] text-white/50 sm:flex-nowrap"
               >
                  <span className="inline-flex items-center gap-1">
                     <ShieldCheckIcon
                        size={13}
                        className="text-[#8FB39C]"
                     />
                     No credit card required
                  </span>
                  <span className="inline-flex items-center gap-1">
                     <span className="h-1 w-1 rounded-full bg-white/30" />
                     Free ATS analysis
                  </span>
               </motion.div>
            </motion.div>
         </DarkPanel>
      </section>
   );
}

export default CTASection;
