import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Description is required"),
  photo: z
    .any()
    .refine((files) => files?.length === 1, "Image is required") // Ensure only one file is selected
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Only image files are allowed"
    ), // Ensure it's an image
});
