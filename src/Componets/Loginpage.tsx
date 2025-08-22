import React from "react";
import Image from "next/image";
import googleimg from "../assests/images/google-icon.svg";
import Link from "next/link";
 export default function Loginpage() {
  return (
    <div className="bg-[#f0f3f8] h-[100vh]  pt-40">
      <div className="flex flex-row gap-20 items-start bg-white py-20 pt-10 w-fit justify-self-center px-10 rounded-2xl self-center">
        <div className="flex flex-col">
          <Image className="w-12 pb-10" src={googleimg} alt="" />
          <h5 className="text-[34px] font-thin text-[#1f1f1f]">Sign up</h5>
          <p className="text-[#1f1f1f] max-w-[400px]">
            with your Google Account. This account will be available to other
            Google apps in the browser.
          </p>
        </div>
        <div className="pt-20">
          <div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Email or Phone"
                className="border rounded-md pl-4 py-2.5 w-full"
                name=""
                id=""
              />
              <a className="text-[#0b57d0] hover:underline cursor-pointer font-semibold text-sm mt-2">
                Forgot email?
              </a>
            </div>
            <p className="text-sm text-[#444746] max-w-[400px] pt-10">
              Not your computer? Use Guest mode to sign in privately.
              <span className="text-[#0b57d0] hover:underline cursor-pointer font-semibold">
                Learn more about using Guest mode
              </span>
            </p>
          </div>
          <div className="flex gap-8 justify-end pt-10">
            <button className="text-blue-500 text-sm font-medium">
              Already have an account?
            </button>
            <Link href="/password">
              <button className="bg-[#0b57d0] px-6 py-2 cursor-pointer hover:bg-blue-700 rounded-full text-sm font-semibold text-white">
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
