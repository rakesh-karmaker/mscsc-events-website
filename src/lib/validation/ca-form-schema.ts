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
export const caFormSchema = z.object({
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
  photo: z
    .custom<FileFromForm>((fileList) => fileList instanceof FileList, {
      message: "Please upload a valid file",
    })
    .refine(
      (files) =>
        files.length > 0 &&
        files[0].size <= MAX_FILE_SIZE &&
        ACCEPTED_IMAGE_TYPES.includes(
          files[0].type as (typeof ACCEPTED_IMAGE_TYPES)[number]
        ),
      (files) => ({
        message:
          files.length === 0
            ? "Image is required"
            : files[0].size > MAX_FILE_SIZE
              ? `Max image size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`
              : "Only JPG, JPEG, PNG, and WebP formats are supported.",
      })
    ),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, "Address must be at least 5 characters"),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
  }),

  institution: z
    .string({ required_error: "Institution name is required" })
    .min(2, "Institution name must be at least 2 characters"),
  grade: z
    .string({ required_error: "Grade is required" })
    .min(1, "Grade must be at least 1 character"),

  havePreviousExperience: z.enum(["yes", "no"], {
    required_error: "This field is required",
  }),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
});

// Type for the form data derived from the Zod schema
export type CAFormSchemaType = z.infer<typeof caFormSchema>;
