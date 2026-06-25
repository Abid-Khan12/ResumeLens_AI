import z from "zod";

export const registerSchema = z.object({
   fullName: z
      .string()
      .min(3, "Minimum 3 characters long")
      .max(20, "Maximum 20 characters allowed"),
   email: z.email("Please enter a valid email address."),
   password: z
      .string()
      .min(8, "Minimum 8 characters long")
      .max(20, "Maximum 20 characters allowed"),
});

export type RegisterDataTypes = z.infer<typeof registerSchema>;
