import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloudIcon, FileText, X } from "lucide-react";
import {
   Controller,
   type Control,
   type FieldValues,
   type Path,
   type PathValue,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { Button } from "./button";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
   if (bytes === 0) return "0 B";
   const k = 1024;
   const sizes = ["B", "KB", "MB"];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// ─── inner drag-zone (pure UI, no RHF) ─────────────────────────────────────

interface ZoneProps {
   onChange: (file: File | null) => void;
   isInvalid: boolean;
}

function DragZone({ onChange, isInvalid }: ZoneProps) {
   const inputRef = useRef<HTMLInputElement>(null);
   const [isDragging, setIsDragging] = useState(false);

   const dragCounter = useRef(0);

   const accept = useCallback(
      (file: File | null) => {
         if (!file) return;

         onChange(file);
      },
      [onChange],
   );

   const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current += 1;
      if (dragCounter.current === 1) setIsDragging(true);
   };

   const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current -= 1;
      if (dragCounter.current === 0) setIsDragging(false);
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();

      dragCounter.current = 0;
      setIsDragging(false);
      const file = e.dataTransfer.files[0] ?? null;
      accept(file);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      accept(e.target.files?.[0] ?? null);
      // reset so the same file can be re-selected after removal
      e.target.value = "";
   };

   return (
      <motion.div
         onDragEnter={handleDragEnter}
         onDragOver={(e) => e.preventDefault()}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
         onClick={() => inputRef.current?.click()}
         animate={isDragging ? "dragging" : "idle"}
         variants={{
            idle: {
               borderColor: "var(--border)",
               backgroundColor: "var(--surface-2)",
            },
            dragging: {
               borderColor: "var(--accent)",
               backgroundColor: "var(--accent-soft)",
            },
         }}
         transition={{ type: "tween", ease: [0.87, 0, 0.13, 1], duration: 0.35 }}
         className={cn(
            "hover:border-accent-soft hover:bg-accent-soft/40 size-full cursor-pointer rounded-3xl border border-dashed p-10 transition-shadow duration-200 outline-none",
            isInvalid && "ring-danger ring-1",
         )}
         role="button"
         tabIndex={0}
         aria-label="Upload resume PDF"
         onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
         <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleInputChange}
         />

         <div className="pointer-events-none flex flex-col items-center gap-3 text-center">
            {/* icon container */}
            <div
               className={cn(
                  "bg-accent-soft text-accent-strong flex size-14 translate-y-0 items-center justify-center rounded-2xl transition-[translate,background-color,color]",
                  isDragging && "bg-accent -translate-y-2 text-white",
                  isInvalid && "bg-danger/70 text-white",
               )}
            >
               <UploadCloudIcon size={22} />
            </div>

            {/* copy */}
            <div className="space-y-1">
               <h4
                  className={cn(
                     "font-display text-forground font-semibold tracking-tight",
                     isInvalid && "text-danger",
                  )}
               >
                  {isDragging ? "Drop it here" : "Drop your resume PDF"}
               </h4>
               <p className={cn("text-forground-muted text-xs", isInvalid && "text-danger")}>
                  or click to browse · max 5 MB · PDF only
               </p>
            </div>
         </div>
      </motion.div>
   );
}

// ─── file preview card ──────────────────────────────────────────────────────

interface FileCardProps {
   file: File;
   onRemove: () => void;
   isPending?: boolean;
}

function FileCard({ file, onRemove, isPending }: FileCardProps) {
   return (
      <Card
         padding={"sm"}
         variant={"flat"}
      >
         <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ type: "tween", ease: [0.87, 0, 0.13, 1], duration: 0.35 }}
            className="flex items-center gap-2.5"
         >
            <div className="bg-accent-soft text-accent-strong flex size-10 shrink-0 items-center justify-center rounded-2xl">
               <FileText size={16} />
            </div>

            <div className="min-w-0 flex-1">
               <p className="text-forground truncate text-sm font-medium">{file.name}</p>
               <p className="text-forground-muted text-xs">{formatBytes(file.size)}</p>
            </div>

            <Button
               type="button"
               onClick={onRemove}
               disabled={isPending}
               className="hover:bg-surface-2 text-forground-muted hover:text-danger rounded-full bg-transparent transition-colors duration-150"
               size={"icon"}
               aria-label="Remove file"
            >
               <X size={14} />
            </Button>
         </motion.div>
      </Card>
   );
}

// ─── public component ───────────────────────────────────────────────────────

interface DropZoneFieldProps<T extends FieldValues> {
   name: Path<T>;
   control: Control<T>;
   isPending?: boolean;
}

function DropZoneField<T extends FieldValues>({ control, name, isPending }: DropZoneFieldProps<T>) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field, fieldState }) => {
            const file: File | null = field.value ?? null;

            const handleChange = (f: File | null) => {
               field.onChange(f as PathValue<T, Path<T>>);
            };

            return (
               <div className="relative space-y-3">
                  <AnimatePresence mode="wait">
                     {!fieldState.invalid && file ? (
                        <FileCard
                           key="card"
                           file={file}
                           onRemove={() => handleChange(null)}
                           isPending={isPending}
                        />
                     ) : (
                        <DragZone
                           onChange={handleChange}
                           isInvalid={fieldState.invalid}
                        />
                     )}
                  </AnimatePresence>

                  <AnimatePresence>
                     {fieldState.invalid && fieldState.error && (
                        <motion.p
                           initial={{ opacity: 0, y: 4 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: 4 }}
                           className="text-danger absolute -bottom-5 left-0 text-xs font-medium"
                        >
                           {fieldState.error.message}
                        </motion.p>
                     )}
                  </AnimatePresence>
               </div>
            );
         }}
      />
   );
}

export default DropZoneField;
