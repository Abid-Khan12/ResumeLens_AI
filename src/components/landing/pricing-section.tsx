import { SectionHeader } from "@/components/landing/feature-section";

import { useState } from "react";
import { Sparkles, Zap, Crown, CheckIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
   {
      id: "starter",
      name: "Starter",
      icon: Sparkles,
      tagline: "See where your resume stands",
      monthly: 0,
      yearly: 0,
      featured: false,
      cta: "Start for free",
      note: "No credit card needed",
      features: [
         "2 resume scans / month",
         "Basic ATS compatibility check",
         "Generic improvement tips",
         "Email support",
      ],
   },
   {
      id: "pro",
      name: "Career Pro",
      icon: Zap,
      tagline: "For people actively job hunting",
      monthly: 19,
      yearly: 15,
      featured: true,
      badge: "Most popular",
      cta: "Get Career Pro",
      note: "Cancel anytime",
      features: [
         "Unlimited resume scans",
         "Keyword match against any job post",
         "Line-by-line AI rewrite suggestions",
         "Tailored cover letter generator",
         "Priority email support",
      ],
   },
   {
      id: "executive",
      name: "Executive",
      icon: Crown,
      tagline: "For senior roles & career pivots",
      monthly: 49,
      yearly: 39,
      featured: false,
      cta: "Go Executive",
      note: "Cancel anytime",
      features: [
         "Everything in Career Pro",
         "2 expert resume reviews / month",
         "LinkedIn profile optimization",
         "AI mock interview practice",
         "24h dedicated support",
      ],
   },
];

function PricingSection() {
   return (
      <section
         className="mx-auto w-full max-w-310 px-3 sm:px-6"
         id="pricing"
      >
         <SectionHeader
            eyebrow="Pricing"
            title={<>All the premium features. None of the hidden costs.</>}
            subTitle="Get full access to all our core features and infrastructure with a plan that fits your workload."
         />
         <Pricing />
      </section>
   );
}

export default PricingSection;

function Pricing() {
   const [billing, setBilling] = useState("monthly");
   return (
      <>
         <div className="mt-12 text-center">
            <div className="bg-surface-2 inline-flex rounded-full border p-1">
               <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={cn(
                     "text-forground-muted focus-visible:outline-accent relative cursor-pointer rounded-full border-none bg-transparent px-4.5 py-2 text-[0.85rem] font-semibold transition-[background,color,box-shadow] duration-250 ease-[ease] focus-visible:outline-2 focus-visible:outline-offset-2",
                     billing === "monthly" && "bg-accent-hero shadow-card text-white",
                  )}
               >
                  Monthly
               </button>
               <button
                  type="button"
                  onClick={() => setBilling("yearly")}
                  className={cn(
                     "text-forground-muted focus-visible:outline-accent relative cursor-pointer rounded-full border-none bg-transparent px-4.5 py-2 text-[0.85rem] font-semibold transition-[background,color,box-shadow] duration-250 ease-[ease] focus-visible:outline-2 focus-visible:outline-offset-2",
                     billing === "yearly" && "bg-accent-hero shadow-card text-white",
                  )}
               >
                  Yearly
                  <span className="ml-1.75 rounded-full px-1.75 py-px text-[0.65rem] font-bold">
                     Save 20%
                  </span>
               </button>
            </div>
         </div>
         <div className="mt-12 grid grid-cols-1 items-stretch gap-4 gap-y-8 max-sm:gap-y-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((plan) => {
               const Icon = plan.icon;
               const price = billing === "yearly" ? plan.yearly : plan.monthly;
               const isFree = plan.monthly === 0;

               return (
                  <div
                     key={plan.id}
                     className={`group relative flex h-full flex-col transition-all duration-350 ease-out motion-reduce:transition-none ${
                        plan.featured
                           ? "lg:-translate-y-2 lg:scale-[1.02] lg:hover:-translate-y-3 lg:hover:scale-[1.03]"
                           : "hover:-translate-y-1"
                     }`}
                  >
                     {/* Popular Badge (Positioned safely outside the overflow-hidden inner shell) */}
                     {plan.badge && (
                        <span className="from-accent-hero to-accent-hero-2 absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 animate-[badgePulse_2.6s_ease-in-out_infinite] rounded-full bg-linear-to-br px-4 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-[0_4px_14px_rgba(47,74,58,0.35)] motion-reduce:animate-none">
                           {plan.badge}
                        </span>
                     )}

                     {/* Inner Card Shell (Handles borders, background, and absolute sheen) */}
                     <div
                        style={{
                           backgroundColor: "var(--surface)",
                           borderColor: plan.featured ? "var(--accent)" : "var(--border)",
                           boxShadow: plan.featured
                              ? "0 10px 30px rgba(47,74,58,0.12)"
                              : "var(--shadow-card)",
                        }}
                        className={`relative flex h-full flex-1 flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-350 ease-out motion-reduce:transition-none ${!plan.featured ? "hover:border-[rgba(91,124,106,0.25)]" : ""}`}
                     >
                        {/* Scan Sheen Micro-Interaction */}
                        <div
                           className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[rgba(91,124,106,0.16)] to-transparent opacity-0 transition-all duration-900 ease-in-out group-hover:translate-x-full group-hover:opacity-100 motion-reduce:hidden"
                           aria-hidden="true"
                        />

                        {/* Icon + Name Header */}
                        <div className="flex items-center gap-3">
                           <div
                              style={{
                                 background: plan.featured
                                    ? "linear-gradient(135deg, var(--accent-hero), var(--accent-hero-2))"
                                    : "var(--accent-soft)",
                                 color: plan.featured ? "#fff" : "var(--accent-strong)",
                              }}
                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                           >
                              <Icon className="h-5 w-5" />
                           </div>
                           <div className="text-left">
                              <h3
                                 style={{ color: "var(--forground)" }}
                                 className="text-lg font-semibold"
                              >
                                 {plan.name}
                              </h3>
                              <p
                                 style={{ color: "var(--forground-muted)" }}
                                 className="text-xs"
                              >
                                 {plan.tagline}
                              </p>
                           </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="mt-6 flex items-end gap-1.5">
                           <span
                              key={`${plan.id}-${billing}`}
                              style={{ color: "var(--forground)" }}
                              className="animate-[priceIn_0.35s_ease] text-[44px] leading-none font-bold tracking-tight motion-reduce:animate-none"
                           >
                              {isFree ? "Free" : `$${price}`}
                           </span>
                           {!isFree && (
                              <span
                                 style={{ color: "var(--forground-muted)" }}
                                 className="mb-1.5 text-sm"
                              >
                                 /mo
                              </span>
                           )}
                        </div>
                        <p
                           style={{ color: "var(--forground-muted)" }}
                           className="mt-1 text-left text-xs"
                        >
                           {isFree
                              ? "Free forever"
                              : billing === "yearly"
                                ? `billed $${price * 12} / year`
                                : "billed monthly"}
                        </p>

                        {/* Divider */}
                        <div
                           style={{ borderTop: "1px solid var(--border)" }}
                           className="my-6"
                        />

                        {/* Features Checklist */}
                        <ul
                           style={{ color: "var(--forground)" }}
                           className="flex-1 space-y-3 text-left text-sm"
                        >
                           {plan.features.map((feature, idx) => (
                              <li
                                 key={feature}
                                 style={{ animationDelay: `${idx * 70 + 120}ms` }}
                                 className="flex animate-[featureIn_0.4s_ease_forwards] items-start gap-2.5 opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
                              >
                                 <span
                                    style={{
                                       backgroundColor: "var(--accent-soft)",
                                       color: "var(--accent-strong)",
                                    }}
                                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                                 >
                                    <CheckIcon
                                       className="h-3 w-3"
                                       strokeWidth={3}
                                    />
                                 </span>
                                 {feature}
                              </li>
                           ))}
                        </ul>

                        {/* Call To Action Button */}
                        <button
                           type="button"
                           className={cn(
                              "focus-visible:outline-accent ease mt-5 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[14px] border border-transparent px-5 py-[0.85rem] text-[0.95rem] font-semibold transition-[translate,box-shadow,background-color,border-color] duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.97]",
                              plan.featured
                                 ? "to-accent-hero-2 from-accent-hero bg-linear-to-br text-white shadow-[0_8px_20px_rgba(10,72,76,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(10,72,76,0.45)]"
                                 : "text-accent-strong bg-surface hover:border-accent hover:bg-accent-soft",
                           )}
                        >
                           {plan.cta}

                           <ArrowRightIcon className="transition-transform duration-250 ease-[ease] group-hover:translate-x-0.75" />
                        </button>

                        <p
                           style={{ color: "var(--forground-muted)" }}
                           className="mt-3 text-center text-xs"
                        >
                           {plan.note}
                        </p>
                     </div>
                  </div>
               );
            })}
         </div>
      </>
   );
}
