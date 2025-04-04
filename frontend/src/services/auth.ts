import instance from "@/lib/axios/instance";
import { loginSchema } from "@/lib/validations/login";
import { signupSchema } from "@/lib/validations/signup";
import { z } from "zod";

export const signup = async (data: z.infer<typeof signupSchema>) => {
  const res = await instance.post("/auth/signup", data);
  return res.data;
};

export const login = async (data: z.infer<typeof loginSchema>) => {
  const res = await instance.post("/auth/login", data);
  return res.data;
};
