"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import googleimg from "../../assests/images/google-icon.svg";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handlesignup = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("signup successfully");
      toast.success("login successfully!");
      localStorage.setItem("mail", email);
      localStorage.setItem("password", password);
      setInterval(() => {
        router.push("/mail");
      }, 1000);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        toast.error("Wrong password");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Couldnot found any email, kindly sign up");
      } else if (err.code === "auth/user-not-found") {
        toast.error(
          "Couldnot found any account with this email, kindly sign up"
        );
      } else {
        toast.error("Couldnot found any account with this email and password");
      }
      console.log(err, "error");
    }
  };

  const forgotemail = async () => {
    if (!email) {
      toast.error("Add email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset link has been sent,kindly check your inbox");
      toast.success("password reset link has been sent");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        toast.error("Invalid email format");
      } else if (err.code === "auth/user-not-found") {
        toast.error("No user found with this email");
      } else {
        toast.error("Failed to send reset link. Try again later.");
      }
      console.log(err, "error");
    }
  };

  return (
    <div>
      {/* <form className="flex flex-col w-fit" action="" onSubmit={handlesignup}>
        <input className="border" type="email" placeholder="email" />
        <input type="password" className="border" />
   </form> */}
      <div className="bg-[#f0f3f8] h-[100vh]  pt-40">
        <div className="flex flex-row gap-20 items-start bg-white py-20 pt-10 w-fit justify-self-center px-10 rounded-2xl self-center">
          <div className="flex flex-col">
            <Image className="w-12 pb-10" src={googleimg} alt="" />
            <h5 className="text-[34px] font-thin text-[#1f1f1f]">
              Welcome back!
            </h5>
            <p className="text-[#1f1f1f] max-w-[400px]">
              with your Google Account. This account will be available to other
              Google apps in the browser.
            </p>
          </div>
          <div className="pt-20">
            <div>
              <div className="flex flex-col gap-1">
                <form onSubmit={handlesignup}>
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
                    placeholder="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-md mt-3 pl-4 py-2.5 w-full"
                  />
                  <div className="flex w-full pt-3 justify-between">
                    <a
                      className="text-[#0b57d0] hover:underline cursor-pointer font-semibold text-sm mt-2"
                      onClick={forgotemail}
                    >
                      Forgot email?
                    </a>
                    <button
                      type="submit"
                      className="bg-blue-600 px-4 py-1.5 rounded-full text-white mt-2 justify-end hover:bg-blue-800 cursor-pointer"
                    >
                      Next{" "}
                    </button>
                  </div>
                </form>
              </div>
              {/* <p className="text-sm text-[#444746] max-w-[400px] pt-10">
                Not your computer? Use Guest mode to sign in privately.
                <span className="text-[#0b57d0] hover:underline cursor-pointer font-semibold">
                  Learn more about using Guest mode
                </span>
              </p> */}
            </div>
            <div className="flex pt-10 gap-2">
              <Link href="/signup">
                <p className="hover:underline text-blue-600 cursor-pointer">
                  Create account{" "}
                </p>
              </Link>

              {/* <button
                type="submit"
                className="bg-blue-500 text-white px-4  rounded-full py-1 mt-1"
              >
                Next
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
