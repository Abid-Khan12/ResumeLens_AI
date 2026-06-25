import { ArrowLeftIcon } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingLeaf({ style }: { style: Leaves }) {
   return (
      <motion.div
         className="absolute h-1.5 w-1.5 rounded-full opacity-30"
         style={{ background: "var(--accent)", ...style }}
         animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.35, 0.15],
         }}
         transition={{
            duration: style.duration,
            repeat: Infinity,
            delay: style.delay,
            ease: "easeInOut",
         }}
      />
   );
}

type Leaves = { top: string; left?: string; right?: string; duration: number; delay: number };

const leaves: Leaves[] = [
   { top: "18%", left: "12%", duration: 4.2, delay: 0 },
   { top: "65%", left: "8%", duration: 5.1, delay: 0.8 },
   { top: "30%", right: "10%", duration: 3.8, delay: 1.2 },
   { top: "72%", right: "14%", duration: 4.7, delay: 0.3 },
   { top: "50%", left: "22%", duration: 6.0, delay: 2.1 },
   { top: "20%", right: "22%", duration: 5.5, delay: 1.7 },
];

export default function NotFoundPage() {
   const navigate = useNavigate();

   return (
      <div
         className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
         style={{ background: "var(--background)" }}
      >
         {/* Ambient orb */}
         <div
            className="pointer-events-none absolute inset-0"
            style={{
               background:
                  "radial-gradient(ellipse 60% 50% at 50% 40%, var(--accent-soft) 0%, transparent 70%)",
            }}
         />

         {/* Floating particles */}
         {leaves.map((s, i) => (
            <FloatingLeaf
               key={i}
               style={s}
            />
         ))}

         {/* Card */}
         <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            className="relative z-10 w-full max-w-md text-center"
         >
            {/* Glyph */}
            <motion.div
               initial={{ opacity: 0, scale: 0.6 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.15, duration: 0.6, ease }}
               className="mb-8 flex justify-center"
            >
               <div
                  className="relative flex h-28 w-28 items-center justify-center rounded-3xl"
                  style={{
                     background: "var(--accent-soft)",
                     border: "1.5px solid var(--border)",
                     boxShadow: "var(--shadow-card)",
                  }}
               >
                  {/* Inner icon */}
                  <svg
                     width="52"
                     height="52"
                     viewBox="0 0 52 52"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <circle
                        cx="26"
                        cy="26"
                        r="24"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        opacity="0.5"
                     />
                     <path
                        d="M16 26h8m0 0l-3-3m3 3l-3 3"
                        stroke="var(--accent)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M36 26h-8m0 0l3-3m-3 3l3 3"
                        stroke="var(--accent)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <motion.circle
                        cx="26"
                        cy="26"
                        r="3.5"
                        fill="var(--accent)"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                     />
                  </svg>

                  {/* Badge */}
                  <motion.div
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 16 }}
                     className="absolute -top-2.5 -right-2.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                     style={{
                        background: "var(--accent-strong)",
                        color: "#fff",
                        fontSize: "11px",
                        letterSpacing: "-0.01em",
                     }}
                  >
                     404
                  </motion.div>
               </div>
            </motion.div>

            {/* Headline */}
            <motion.div
               initial={{ opacity: 0, y: 12 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.55, ease }}
            >
               <p
                  className="mb-3 text-xs font-medium tracking-widest uppercase"
                  style={{ color: "var(--accent)", letterSpacing: "0.14em" }}
               >
                  Page not found
               </p>
               <h1
                  className="mb-3 text-3xl leading-tight font-semibold"
                  style={{ color: "var(--forground)", letterSpacing: "-0.025em" }}
               >
                  Lost in the void
               </h1>
               <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--forground-muted)" }}
               >
                  The page you're looking for doesn't exist or has been moved. Let's get you back
                  somewhere useful.
               </p>
            </motion.div>

            {/* Divider */}
            <motion.div
               initial={{ scaleX: 0, opacity: 0 }}
               animate={{ scaleX: 1, opacity: 1 }}
               transition={{ delay: 0.55, duration: 0.5, ease }}
               className="my-8 h-px"
               style={{ background: "var(--border)", transformOrigin: "center" }}
            />

            {/* Buttons */}
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.5, ease }}
               className="flex flex-col justify-center gap-3 sm:flex-row"
            >
               <motion.button
                  whileHover={{ scale: 1.025, boxShadow: "var(--shadow-hover)" }}
                  whileTap={{ scale: 0.975 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => navigate("/", { replace: true })}
                  className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium"
                  style={{
                     background: "var(--accent-strong)",
                     color: "#fff",
                     border: "none",
                     cursor: "pointer",
                     letterSpacing: "-0.01em",
                  }}
               >
                  <ArrowLeftIcon size={15} />
                  Go home
               </motion.button>

               <motion.button
                  whileHover={{
                     scale: 1.025,
                     background: "var(--accent-soft)",
                  }}
                  whileTap={{ scale: 0.975 }}
                  transition={{ duration: 0.18, ease }}
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium"
                  style={{
                     background: "var(--surface)",
                     color: "var(--accent-strong)",
                     border: "1.5px solid var(--border)",
                     cursor: "pointer",
                     letterSpacing: "-0.01em",
                     boxShadow: "var(--shadow-card)",
                  }}
               >
                  <ArrowLeftIcon size={15} />
                  Go back
               </motion.button>
            </motion.div>

            {/* Footer hint */}
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.85, duration: 0.6, ease }}
               className="mt-8 text-xs"
               style={{ color: "var(--forground-muted)", opacity: 0.55 }}
            >
               Error 404 · ResumeLens AI
            </motion.p>
         </motion.div>
      </div>
   );
}
