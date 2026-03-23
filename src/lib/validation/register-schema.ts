import { z } from "zod/v3";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

type FileFromForm = FileList;

// Zod schema for form validation
export const registrationFormSchema = z.object({
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
    .url({ message: "Invalid URL format" })
    .min(2, "Facebook URL must be at least 2 characters"),
  photo: z
    .custom<FileFromForm>((fileList) => fileList instanceof FileList, {
      message: "Please upload a valid file",
    })
    .refine(
      (files) =>
        files.length > 0 &&
        files[0].size <= MAX_FILE_SIZE &&
        ACCEPTED_IMAGE_TYPES.includes(
          files[0].type as (typeof ACCEPTED_IMAGE_TYPES)[number],
        ),
      (files) => ({
        message:
          files.length === 0
            ? "Image is required"
            : files[0].size > MAX_FILE_SIZE
              ? `Max image size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`
              : "Only JPG, JPEG, PNG, and WebP formats are supported.",
      }),
    ),

  institution: z
    .string({ required_error: "Institution name is required" })
    .min(2, "Institution name must be at least 2 characters"),
  grade: z
    .string({ required_error: "Grade is required" })
    .min(1, "Invalid grade selection"),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Invalid category selection"),

  segments: z
    .array(z.string(), {
      required_error: "At least one segment must be selected",
    })
    .min(1, "At least one segment must be selected"),

  transactionMethod: z
    .string({ required_error: "Transaction method is required" })
    .min(2, "Transaction method must be at least 2 characters"),
  transactionPhoneNumber: z
    .string({ required_error: "Transaction phone number is required" })
    .min(10, "Transaction phone number must be at least 10 characters"),
  transactionId: z
    .string({ required_error: "Transaction ID is required" })
    .min(2, "Transaction ID must be at least 2 characters"),

  reference: z.string().optional(),
  clubReference: z.string().optional(),

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
export type RegistrationFormType = z.infer<typeof registrationFormSchema>;
