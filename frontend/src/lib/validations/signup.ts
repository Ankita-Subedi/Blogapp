import { z } from "zod";

export const fullNameValidation = z
  .string()
  .min(2, "Name is required")
  .max(20, "Name can't be more than 20 characters")
  .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Invalid username format");

export const signupSchema = z.object({
  name: fullNameValidation,
  email: z.string().email({ message: "Email is requird" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
