import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

import { EyeIcon, EyeOffIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps<T extends FieldValues> {
   name: Path<T>;
   control: Control<T>;
   label?: string;
   placeholder?: string;
   maxLength?: number;
}

export function AuthField<T extends FieldValues>({
   control,
   name,
   label,
   placeholder,
   maxLength,
   icon: Icon,
}: InputProps<T> & { icon?: LucideIcon }) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field, fieldState }) => (
            <div className="relative flex flex-col gap-1">
               <label
                  htmlFor={name}
                  className="text-sm font-medium"
               >
                  {label}
               </label>
               <div className="relative">
                  <input
                     id={name}
                     type="text"
                     placeholder={placeholder}
                     maxLength={maxLength}
                     className={cn(
                        `peer bg-surface placeholder:text-forground-muted/60 focus:border-accent/40 focus:ring-accent/10 h-12 w-full rounded-xl border px-4 text-[15px] transition-normal duration-300 outline-none focus:ring-4`,
                        Icon && "pr-4 pl-9",
                     )}
                     {...field}
                  />
                  {Icon && (
                     <div className="text-forground-muted/55 peer-focus:text-accent-strong peer-not-placeholder-shown:text-accent-strong pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transition-colors">
                        <Icon
                           size={16}
                           strokeWidth={2}
                        />
                     </div>
                  )}
               </div>
               <AnimatePresence>
                  {fieldState.invalid && fieldState.error && (
                     <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                           duration: 0.2,
                        }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-danger absolute -bottom-5 left-0 text-xs font-semibold"
                     >
                        {fieldState.error.message}
                     </motion.p>
                  )}
               </AnimatePresence>
            </div>
         )}
      />
   );
}

export function AuthPasswordField<T extends FieldValues>({
   control,
   name,
   label,
   placeholder,
   maxLength,
   icon: Icon,
}: InputProps<T> & { icon?: LucideIcon }) {
   const [showPassword, setShowPassword] = useState(false);
   return (
      <Controller
         control={control}
         name={name}
         render={({ field, fieldState }) => (
            <div className="relative flex flex-col gap-1">
               <label
                  htmlFor={name}
                  className="text-sm font-medium"
               >
                  {label}
               </label>
               <div className="relative">
                  <input
                     id={name}
                     type={showPassword ? "text" : "password"}
                     placeholder={placeholder}
                     maxLength={maxLength}
                     className={cn(
                        `peer bg-surface placeholder:text-forground-muted/60 focus:border-accent/40 focus:ring-accent/10 h-12 w-full rounded-xl border px-4 text-[15px] transition-normal duration-300 outline-none focus:ring-4`,
                        Icon && "pr-7 pl-9",
                     )}
                     {...field}
                  />
                  {Icon && (
                     <div className="text-forground-muted/55 peer-focus:text-accent-strong peer-not-placeholder-shown:text-accent-strong pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transition-colors">
                        <Icon
                           size={16}
                           strokeWidth={2}
                        />
                     </div>
                  )}
                  <button
                     type="button"
                     className="absolute top-1/2 right-2.5 z-10 -translate-y-1/2 cursor-pointer"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     {showPassword ? (
                        <EyeIcon
                           size={16}
                           strokeWidth={2}
                        />
                     ) : (
                        <EyeOffIcon
                           size={16}
                           strokeWidth={2}
                        />
                     )}
                  </button>
               </div>

               <AnimatePresence>
                  {fieldState.invalid && fieldState.error && (
                     <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                           duration: 0.2,
                        }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-danger absolute -bottom-5 left-0 text-xs font-semibold"
                     >
                        {fieldState.error.message}
                     </motion.p>
                  )}
               </AnimatePresence>
            </div>
         )}
      />
   );
}
