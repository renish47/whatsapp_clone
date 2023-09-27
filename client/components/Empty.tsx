import { cn } from "@/utils/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { FC } from "react";

interface EmptyProps {
  className?: ClassValue;
}

const Empty: FC<EmptyProps> = ({ className }) => {
  return (
    <div
      className={cn(
        " flex h-screen w-full items-center justify-center  gap-3 bg-secondary",
        className
      )}
    >
      {/* <div className="fixed left-0 top-0 z-0 h-full w-full bg-chat-background bg-fixed opacity-5" /> */}
      <Image
        src="/assets/whatsappLogo.png"
        alt="whatsappLogo"
        height={50}
        width={50}
        className="opacity-70"
      />
      <p className="text-xl text-white opacity-70">Select a chat to open</p>
    </div>
  );
};

export default Empty;
