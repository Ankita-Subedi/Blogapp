"use client";
import { loginSchema } from "@/lib/validations/login";
import { login } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // onSubmit function without the event parameter
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log("Form submitted with data:", data);
    login(data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        router.push("/home");
        toast.success("Login successful!");
      })
      .catch((err) => {
        console.log(err);
        const message = err?.response?.data?.message || "Something went wrong!";
        toast.error(message);
      })
      .finally(() => {
        console.log("success");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-10 bg-gray-100">
      <div className="border border-gray-300 rounded-lg px-8 py-8 w-full sm:w-[90%] md:w-[50%] lg:w-[35%] bg-white shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-md w-full py-2 px-3"
              type="email"
              id="email"
              placeholder="Type your email here"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password input */}
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              className="border border-gray-300 rounded-md w-full py-2 px-3"
              type="password"
              id="password"
              placeholder="Type your password here"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/login">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
}
