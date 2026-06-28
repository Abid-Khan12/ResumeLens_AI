import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Controller, useForm } from "react-hook-form";

import { Loader2Icon } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DropZoneField from "@/components/ui/dropzone-field";

import { Button } from "@/components/ui/button";
import { uploadResumeSchema, type UploadResumeType } from "@/schemas/resume/upload-resume-schema";
import { useNavigate } from "react-router";

function UploadResume() {
   const navigate = useNavigate();
   const {
      control,
      handleSubmit,
      watch,
      reset,
      formState: { isSubmitting },
   } = useForm<UploadResumeType>({
      resolver: zodResolver(uploadResumeSchema),
      defaultValues: {
         resumeFile: undefined,
         resumeTitle: "",
      },
      mode: "onChange",
   });

   const resumeFile = watch("resumeFile");

   const onSubmit = async (data: UploadResumeType) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Submitting:", data);
      navigate("/resume/resume_1");
      reset();
   };

   return (
      <Card>
         <CardHeader>
            <div>
               <CardTitle>Upload a resume</CardTitle>
               <CardDescription className="mt-2 text-xs">
                  PDF only. We extract the text and create version V1.
               </CardDescription>
            </div>
         </CardHeader>

         <form
            className="space-y-7"
            onSubmit={handleSubmit(onSubmit)}
         >
            <DropZoneField
               control={control}
               name="resumeFile"
               isPending={isSubmitting}
            />
            <AnimatePresence>
               {resumeFile && (
                  <Controller
                     control={control}
                     name="resumeTitle"
                     render={({ field }) => (
                        <motion.div
                           key="actions"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: 6 }}
                           transition={{ type: "tween", ease: [0.87, 0, 0.13, 1], duration: 0.35 }}
                           className="space-y-4"
                        >
                           <input
                              type="text"
                              placeholder="Resume title (optional)"
                              className="bg-surface text-forground placeholder-forground-muted focus:border-accent focus:ring-accent-soft w-full rounded-xl border px-4 py-2.5 text-sm transition-colors duration-150 outline-none focus:ring-2"
                              value={resumeFile.name.replace(/\.pdf$/i, "") || field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              name={field.name}
                           />
                           <Button
                              type="submit"
                              variant={"accent"}
                              size={"lg"}
                              className="w-full"
                              disabled={isSubmitting}
                           >
                              {isSubmitting ? (
                                 <>
                                    <Loader2Icon
                                       size={14}
                                       className="animate-spin"
                                    />
                                    Parsing…
                                 </>
                              ) : (
                                 "Upload & parse"
                              )}
                           </Button>
                        </motion.div>
                     )}
                  />
               )}
            </AnimatePresence>
         </form>
      </Card>
   );
}

export default UploadResume;
