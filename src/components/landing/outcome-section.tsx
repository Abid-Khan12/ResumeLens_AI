import { motion } from "motion/react";

import { PhoneCallIcon, SearchIcon, ShieldCheckIcon, SparklesIcon, ZapIcon } from "lucide-react";

import { SectionHeader } from "@/components/landing/feature-section";
import { cn } from "@/lib/utils";

const outcomes = [
   {
      icon: PhoneCallIcon,
      title: "3.2× more callbacks",
      desc: "Users hit interview rates that matched their target roles, not their fears.",
   },
   {
      icon: ShieldCheckIcon,
      title: "Parsed by every ATS",
      desc: "Greenhouse, Lever, Workday — your resume now reads cleanly to all of them.",
   },
   {
      icon: SparklesIcon,
      title: "Bullets that brag, not bore",
      desc: "Quantified outcomes, strong verbs, and your voice — never the AI's.",
   },
   {
      icon: ZapIcon,
      title: "Apply in minutes, not weeks",
      desc: "Tailor your resume to a JD in under 60 seconds. Then apply to 20 jobs by lunch.",
   },
   {
      icon: SearchIcon,
      title: "Match the right keywords",
      desc: "Stop guessing what recruiters search for. We surface the exact terms missing.",
   },
];

function OutComeSection() {
   return (
      <section className="mx-auto w-full max-w-310 px-3 sm:px-6">
         <SectionHeader
            eyebrow="Outcomes"
            title={<>The point isn't a better resume. It's a better offer.</>}
            subTitle="What our users actually report after their second analysis."
         />

         <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
            {outcomes.map((b, i) => (
               <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={cn(
                     `shadow-card hover:shadow-card-hover bg-surface rounded-card border p-5 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 sm:p-6`,
                     i === 0 ? "lg:col-span-3" : i === 1 ? "lg:col-span-3" : "lg:col-span-2",
                  )}
               >
                  <div className="bg-accent-soft text-accent-strong mb-4 flex h-10 w-10 items-center justify-center rounded-2xl">
                     <b.icon
                        size={16}
                        strokeWidth={2.25}
                     />
                  </div>
                  <h3 className="font-display text-[17px] font-semibold tracking-tight">
                     {b.title}
                  </h3>
                  <p className="text-forground-muted mt-1.5 text-[13px] leading-relaxed">
                     {b.desc}
                  </p>
               </motion.div>
            ))}
         </div>
      </section>
   );
}

export default OutComeSection;
