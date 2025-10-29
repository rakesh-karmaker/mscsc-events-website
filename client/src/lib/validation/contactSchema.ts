import { z } from "zod/v3";

// Zod schema for form validation
export const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  phoneNumber: z
    .string({ required_error: "Provide your contact number" })
    .min(10, "Contact number must be at least 10 characters"),
  subject: z
    .string({ required_error: "Subject is required" })
    .min(2, "Subject must be at least 2 characters"),
  message: z
    .string({ required_error: "Message is required" })
    .min(2, "Message must be at least 2 characters"),
});

// Type for the form data derived from the Zod schema
export type ContactSchemaType = z.infer<typeof contactSchema>;
