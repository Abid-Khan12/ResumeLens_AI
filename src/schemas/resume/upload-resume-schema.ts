import z from "zod";

const MAX_FILE_SIZE = 5242880;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const uploadResumeSchema = z.object({
   resumeFile: z
      .instanceof(File, { message: "Please upload a valid file." })
      .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Only .pdf files are accepted."),
   resumeTitle: z
      .string()
      .max(40, "Maximum 40 characters long")
      .optional(),
});

export type UploadResumeType = z.infer<typeof uploadResumeSchema>;
