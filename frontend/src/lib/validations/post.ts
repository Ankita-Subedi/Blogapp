import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Description is required"),
  //   image: z.any().refine((files) => files?.length === 1, "Image is required"),
  image: z.any().optional(),
});
