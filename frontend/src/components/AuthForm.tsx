import React from "react";

export default function AuthForm() {
  return (
    <div className="min-h-screen flex justify-center items-center px-10 bg-gray-100">
      <div className="border border-gray-300 rounded-lg px p-8 w-full sm:w-[90%] md:w-[50%] lg:w-[35%] bg-white shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form action="">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-md w-full py-2 px-3"
              type="email"
              id="email"
              name="email"
              placeholder="Type your email here"
              required
            />
          </div>

          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              className="border border-gray-300 rounded-md w-full py-2 px-3"
              type="password"
              id="password"
              name="password"
              placeholder="Type your password here"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
