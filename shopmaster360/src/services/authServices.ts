import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/types";
import { redirect } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface SignUpResponse {
  message: string;
  user: User;
}

export interface SignInResponse {
  message: string;
  user: User;
}

export async function signUpUser(
  name: string,
  email: string,
  password: string
): Promise<SignUpResponse> {
  const response = await fetch("http://localhost:8000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message || "Failed to sign up";
    throw new Error(errorMessage);
  }

  return (await response.json()) as SignUpResponse;
}

export async function signInUser(
  email: string,
  password: string
): Promise<SignInResponse> {
  const response = await fetch("http://localhost:8000/api/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message || "Failed to sign in";
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as SignInResponse;
  return data;
}

export async function requireAdmin() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  if (!token) {
    redirect("/(auth)/sign-in");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "thisismykey"
    ) as DecodedToken;
    if (decoded.role !== "admin") {
      redirect("/(site)");
    }
  } catch (error) {
    redirect("/(auth)/sign-in");
  }
}
