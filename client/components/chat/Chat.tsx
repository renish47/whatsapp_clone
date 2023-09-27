"use client";
import { FC } from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/userSlice";
import { ClassValue } from "clsx";
import { cn } from "@/utils/utils";

interface chatProps {
  className?: ClassValue;
}

const Chat: FC<chatProps> = ({ className }) => {
  const {
    currentChatUserInfo: { id },
  } = useAppSelector(selectUser);
  return (
    <section
      className={cn(
        " border-1 relative flex h-screen w-full flex-col border-conversation-border bg-conversation-panel ",
        className
      )}
    >
      <ChatHeader />
      <ChatContainer />
      <MessageBar key={id} />
    </section>
  );
};

export default Chat;
