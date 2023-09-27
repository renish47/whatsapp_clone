"use client";
import { FcGoogle } from "react-icons/fc";
import { RiLoaderLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      signIn("google", { callbackUrl: "/onboarding" });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      className=" transition-color flex items-center justify-center gap-5  rounded-lg   bg-[#0b0b0b] py-3 duration-200 hover:bg-[#0b0b0b]/70 disabled:pointer-events-none disabled:opacity-50"
      disabled={isLoading}
      onClick={handleLogin}
    >
      {isLoading ? (
        <RiLoaderLine className="animate-spin text-2xl " />
      ) : (
        <FcGoogle className=" text-2xl" />
      )}
      <span className="text-base text-white">Signin with Google</span>
    </button>
  );
};
export default SignInButton;
