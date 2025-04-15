import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Description is required"),
  photo: z
    .any()
    .refine((files) => files?.length === 1, "Image is required")
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Only image files are allowed"
    ),
});

export const editPostSchema = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    photo: z.any().optional(),
    hasExistingPhoto: z.boolean(), // used only internally
  })
  .refine(
    (data) => {
      if (data.hasExistingPhoto) return true;
      if (data.photo?.length === 1) return true;
      return false;
    },
    {
      message: "Photo is required",
      path: ["photo"],
    }
  )
  .refine(
    (data) => {
      if (data.photo?.length > 0) {
        if (data.photo[0]?.type.startsWith("image/")) return true;
        return false;
      }
      if (data.hasExistingPhoto) return true;
      return false;
    },
    {
      message: "Only image files are allowed",
      path: ["photo"],
    }
  );
