import instance from "@/lib/axios/authInstance";
import { loginSchema } from "@/lib/validations/login";
import { signupSchema } from "@/lib/validations/signup";
import { ILoginResponse } from "@/Types/types";
import { z } from "zod";

export const signup = async (data: z.infer<typeof signupSchema>) => {
  const res = await instance.post("/auth/signup", data);
  return res.data;
};

export const login = async (data: z.infer<typeof loginSchema>) => {
  const res = await instance.post<ILoginResponse>("/auth/login", data);
  return res.data;
};
