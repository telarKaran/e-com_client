"use client";

import { useState } from "react";
import { signInUser } from "@/services/authServices";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { message, user } = await signInUser(email, password);
      console.log("Sign in successful:", message, user);

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full
                  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                  rounded-t-md focus:outline-none focus:ring-primary
                  focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full
                  px-3 py-2 border border-gray-300 placeholder-gray-500
                  text-gray-900 rounded-b-md focus:outline-none
                  focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4
                border border-transparent text-sm font-medium
                rounded-md text-white bg-primary
                hover:bg-orange-600 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-primary"
            >
              Sign In
            </button>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-primary hover:text-orange-600"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
