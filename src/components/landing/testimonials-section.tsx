import { motion } from "motion/react";

import { StarIcon } from "lucide-react";

import { SectionHeader } from "@/components/landing/feature-section";

const testimonials = [
   {
      quote: "I'd been ghosted by 40+ companies. Ran my resume through Roaster, fixed 6 issues, and landed 3 onsites in two weeks.",
      name: "Priya Raman",
      role: "Senior Frontend Engineer",
      company: "Stripe",
      initials: "PR",
   },
   {
      quote: "The rewrites actually sound like me. No 'leveraged' or 'spearheaded' garbage. My ATS score jumped from 58 to 89.",
      name: "Marcus Chen",
      role: "Backend Engineer",
      company: "Vercel",
      initials: "MC",
   },
   {
      quote: "As a new grad, I had no idea recruiters were filtering me out before a human saw the resume. Brutal — but fixable in one afternoon.",
      name: "Sofia Ruiz",
      role: "CS Senior, UIUC",
      company: "intern @ Linear",
      initials: "SR",
   },
   {
      quote: "I wish this existed when I switched from full-stack to ML. Keyword optimization alone was worth the signup.",
      name: "Daniel Park",
      role: "ML Engineer",
      company: "Anthropic",
      initials: "DP",
   },
   {
      quote: "The diff view is what sold me. I could see exactly what changed and why — not some black-box rewrite.",
      name: "Aisha Hassan",
      role: "Product Designer",
      company: "Figma",
      initials: "AH",
   },
   {
      quote: "Used it the night before applying to FAANG. Got my first response in 36 hours. Sample size of one, but I'll take it.",
      name: "Jordan Blake",
      role: "Full-Stack Developer",
      company: "freelance",
      initials: "JB",
   },
];

const containerVariant = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.15,
         delayChildren: 0.1,
      },
   },
} as const;

const itemVariants = {
   hidden: {
      opacity: 0,
      y: 30,
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

function TestimonialSection() {
   return (
      <section className="mx-auto w-full max-w-310 px-3 sm:px-6">
         <SectionHeader
            eyebrow="Testimonials"
            title={<>Loved by engineers who've been there.</>}
            subTitle="From new grads sweating their first SWE role to senior ICs switching domains."
         />

         <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
         >
            {testimonials.map((item) => (
               <motion.div
                  variants={itemVariants}
                  key={item.name}
                  className="rounded-card bg-surface shadow-card hover:shadow-card-hover border p-5 transition-shadow duration-300 sm:p-6"
               >
                  <div className="text-accent mb-3 flex gap-0.5">
                     {Array.from({ length: 5 }).map((_, k) => (
                        <StarIcon
                           key={k}
                           size={13}
                           fill="currentColor"
                           strokeWidth={0}
                        />
                     ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed font-medium tracking-tight">
                     "{item.quote}"
                  </p>
                  <div className="mt-5 border-t pt-4">
                     <div className="flex items-center gap-2.5">
                        <div className="font-display bg-accent-strong text-background flex size-10 items-center justify-center rounded-full text-sm tracking-tight uppercase">
                           {item.initials}
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-sm font-semibold">{item.name}</span>
                           <span className="text-forground-muted truncate text-xs">
                              {item.role} · {item.company}
                           </span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </motion.div>
      </section>
   );
}

export default TestimonialSection;
