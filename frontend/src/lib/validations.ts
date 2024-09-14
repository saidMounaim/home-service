import * as z from "zod";

const validImageFile = z
  .custom<File | undefined>()
  .refine((file) => file, "Image is required")
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "Icon must be less than 2MB");

export const CreateBusinessSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: validImageFile,
  contactPerson: z.string().min(2, {
    message: "Contact person name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  category: z.enum(
    ["Cleaning", "Repair", "Painting", "Shifting", "Plumbing", "Electric"],
    {
      required_error: "Please select a category.",
    }
  ),
});
