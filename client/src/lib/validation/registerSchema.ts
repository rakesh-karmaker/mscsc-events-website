import { z } from "zod/v3";

// Zod schema for form validation
export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  phoneNumber: z
    .string({ required_error: "Provide your contact number" })
    .min(10, "Contact number must be at least 10 characters"),
  facebookUrl: z
    .string({ required_error: "Facebook URL is required" })
    .min(2, "Facebook URL must be at least 2 characters"),

  institution: z
    .string({ required_error: "Institution name is required" })
    .min(2, "Institution name must be at least 2 characters"),
  grade: z
    .string({ required_error: "Grade is required" })
    .min(1, "Grade must be at least 1 character"),

  transactionMethod: z
    .string({ required_error: "Transaction method is required" })
    .min(2, "Transaction method must be at least 2 characters"),
  transactionPhoneNumber: z
    .string({ required_error: "Transaction phone number is required" })
    .min(10, "Transaction phone number must be at least 10 characters"),
  transactionId: z
    .string({ required_error: "Transaction ID is required" })
    .min(2, "Transaction ID must be at least 2 characters"),

  reference: z
    .string({ required_error: "Reference is required" })
    .min(2, "Reference must be at least 2 characters"),
});

// Type for the form data derived from the Zod schema
export type RegisterSchemaType = z.infer<typeof registerSchema>;
