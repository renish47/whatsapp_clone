"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

export default function SignOutButton() {
  const router = useRouter();
  const signoutHandler = async () => {
    signOut({ callbackUrl: "/login" });
  };
  return (
    <button
      className=" absolute bottom-4 left-7 z-50  rounded-full bg-icon-green p-4 text-black shadow-lg"
      onClick={signoutHandler}
    >
      {/* <span>signout</span> */}
      <BiLogOut
        title="Signout"
        className="text-xl"
        //  className="inline ms-2"
      />
    </button>
  );
}
