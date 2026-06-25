import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";

import { ArrowRight, MenuIcon, XIcon } from "lucide-react";
import AILogo from "@/components/ui/ai-logo";

import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const navLinks = [
   {
      label: "Dashboard",
      href: "#dashboard-preview",
   },
   {
      label: "Features",
      href: "#features",
   },
   {
      label: "How it works",
      href: "#how_it_works",
   },
   {
      label: "Pricing",
      href: "#pricing",
   },
];

const mobileMenuVariant = {
   hidden: {
      height: 0,
      opacity: 0,
      transition: {
         duration: 0.3,
      },
   },
   visible: {
      height: "auto",
      opacity: 1,
      transition: {
         duration: 0.3,
      },
   },
} as const;

function Navbar() {
   const isScrolled = useScroll(8);
   const [isOpen, setIsOpen] = useState(false);
   return (
      <motion.header
         initial={{ y: -40, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{
            type: "spring",
            stiffness: 200, // Controls the speed/tightness of the bounce
            damping: 20, // Controls how quickly the bounce comes to a rest
            mass: 0.8, // Makes the element feel lighter and snappier
         }}
         className={"fixed inset-x-0 top-3 z-50 mx-3 sm:mx-6"}
      >
         <nav
            className={cn(
               "bg-surface mx-auto w-full max-w-310 rounded-xl border border-transparent backdrop-blur-md transition-all duration-300 md:rounded-full",
               { "border-border shadow-card bg-surface/85 backdrop-blur-xl": isScrolled },
            )}
         >
            <div className="flex w-full items-center justify-between gap-1 px-3 py-3 md:py-2">
               <a
                  href="#"
                  className="flex items-center gap-2"
               >
                  <AILogo />
                  <span className="font-display hidden text-sm font-semibold tracking-tight md:inline lg:text-base">
                     ResumeLens AI
                  </span>
               </a>
               <div className="hidden items-center gap-1 md:flex">
                  {navLinks.map((item) => (
                     <a
                        key={item.label}
                        href={item.href}
                        className="text-forground-muted hover:text-forground hover:bg-surface-2 rounded-full px-2.5 py-1.5 text-sm transition-colors duration-200 md:text-xs lg:px-3.5 lg:text-sm"
                     >
                        {item.label}
                     </a>
                  ))}
               </div>
               <div className="flex items-center gap-2">
                  <Link
                     to={"/login"}
                     className="hover:bg-surface-2 hidden h-10 content-center rounded-full px-3.5 text-sm font-semibold transition-colors sm:inline md:px-2.5 md:text-xs lg:px-3.5 lg:text-sm"
                  >
                     Sign In
                  </Link>
                  <Link
                     to={"/register"}
                     className="group bg-forground text-background hover:bg-forground/90 inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors active:scale-98 md:px-2.5 md:text-xs lg:px-4 lg:text-sm"
                  >
                     Get Started
                     <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <button
                     onClick={() => setIsOpen(!isOpen)}
                     className="text-forground hover:bg-surface-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors md:hidden"
                  >
                     {isOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
                  </button>
               </div>
            </div>
            <AnimatePresence>
               {isOpen && (
                  <motion.div
                     variants={mobileMenuVariant}
                     initial="hidden"
                     animate="visible"
                     exit="hidden"
                     className="border-border space-y-1.5 overflow-hidden border-t-2 p-3 md:hidden"
                  >
                     {navLinks.map((item) => (
                        <Link
                           key={item.label}
                           to={item.href}
                           className="text-forground block py-2 font-medium"
                        >
                           {item.label}
                        </Link>
                     ))}
                     <Link
                        to={"/login"}
                        className="text-forground block py-2 font-semibold sm:hidden"
                     >
                        Sign In
                     </Link>
                  </motion.div>
               )}
            </AnimatePresence>
         </nav>
      </motion.header>
   );
}

export default Navbar;
