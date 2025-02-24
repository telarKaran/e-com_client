// services/authServices.ts

//
// 1) Define your User interface
//
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

//
// 2) Define the shapes of your success responses
//
interface SignUpResponse {
  message: string;
  user: User;
}

export interface SignInResponse {
  message: string;
  user: User;
}

//
// 3) signUpUser - client-friendly function (no "use server" here)
//    Makes a POST request to your backend to register a new user.
//
//    If you want to call this directly from a client component,
//    import { signUpUser } from "@/services/authServices" in your client component
//    and then call signUpUser(...) in a useEffect or event handler.
//
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
    credentials: "include", // Include cookies if the server sets them
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    // Optionally parse error details from JSON:
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
    credentials: "include", // Includes cookies if server sets them
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message || "Failed to sign in";
    throw new Error(errorMessage);
  }

  // Expected response format:
  // {
  //   "message": "Login successful",
  //   "user": {
  //     "id": "some-id",
  //     "name": "John Doe",
  //     "email": "john@example.com",
  //     "role": "customer"
  //   }
  // }
  const data = (await response.json()) as SignInResponse;
  return data;
}
