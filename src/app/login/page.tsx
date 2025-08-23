"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";

interface AuthError {
  code: string;
  message?: string;
}

function isAuthError(err: unknown): err is AuthError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as { code: unknown }).code === "string"
  );
}

export const dynamic = "force-dynamic"; // avoid SSR issues in Next.js App Router

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth) {
      toast.error("Firebase auth is not initialized");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      localStorage.setItem("mail", email); // store only email, not password

      setTimeout(() => {
        router.push("/mail");
      }, 1000);
    } catch (err) {
      if (isAuthError(err)) {
        switch (err.code) {
          case "auth/wrong-password":
            toast.error("Wrong password");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email format");
            break;
          case "auth/user-not-found":
            toast.error("No account found with this email");
            break;
          default:
            toast.error("Invalid email or password");
        }
      } else {
        toast.error("An unknown error occurred");
      }
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    if (!auth) {
      toast.error("Firebase auth is not initialized");
      return;
    }

    if (!email) {
      toast.error("Enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your inbox");
    } catch (err) {
      if (isAuthError(err)) {
        switch (err.code) {
          case "auth/invalid-email":
            toast.error("Invalid email format");
            break;
          case "auth/user-not-found":
            toast.error("No user found with this email");
            break;
          default:
            toast.error("Failed to send reset link. Try again later.");
        }
      } else {
        toast.error("An unknown error occurred");
      }
      console.error(err);
    }
  };

  return (
    <div className="bg-[#f0f3f8] h-[100vh] pt-40">
      <div className="flex flex-row gap-20 items-start bg-white py-20 px-10 rounded-2xl w-fit mx-auto">
        <div className="flex flex-col">
          <h5 className="text-[34px] font-thin text-[#1f1f1f]">
            Welcome back!
          </h5>
          <p className="text-[#1f1f1f] max-w-[400px]">
            Sign in with your account to continue.
          </p>
        </div>

        <div className="pt-20">
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md pl-4 py-2.5 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md pl-4 py-2.5 w-full"
            />

            <div className="flex w-full pt-3 justify-between items-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#0b57d0] hover:underline cursor-pointer font-semibold text-sm"
              >
                Forgot password?
              </button>
              <button
                type="submit"
                className="bg-blue-600 px-6 py-2 rounded-full text-white hover:bg-blue-800 cursor-pointer"
              >
                Next
              </button>
            </div>
          </form>

          <div className="flex pt-10 gap-2">
            <Link href="/signup">
              <p className="hover:underline text-blue-600 cursor-pointer">
                Create account
              </p>
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
