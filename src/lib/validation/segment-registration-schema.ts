import { z } from "zod/v3";

// Zod schema for form validation
export const segmentRegistrationSchema = z.object({
  segmentSlug: z
    .string({ required_error: "Segment is required" })
    .min(1, "Segment is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  teamName: z.string().optional(),
  memberEmails: z
    .array(z.string().email({ message: "Invalid email address" }))
    .optional(),

  transactionMethod: z.string().optional(),
  transactionPhoneNumber: z.string().optional(),
  transactionId: z.string().optional(),

  abideByTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
  confirmDataAccuracy: z.literal(true, {
    errorMap: () => ({
      message: "You must confirm that your data is accurate",
    }),
  }),
});

// Type for the form data derived from the Zod schema
export type SegmentRegistrationFormType = z.infer<
  typeof segmentRegistrationSchema
>;
