"use client";
import { selectUser } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { calculateTime } from "@/utils/calculateTime";
import { FC, useEffect, useState } from "react";
import MessageStatus from "./MessageStatus";
import ImageMessage from "./ImageMessage";
import TextMessage from "./TextMessage";

interface ChatContainerProps {}

const ChatContainer: FC<ChatContainerProps> = ({}) => {
  const {
    currentChatUserInfo,
    messages,
    userInfo,
    onlineUsers,
    usersInYourChat,
  } = useAppSelector(selectUser);
  const [status, setStatus] = useState("sent");

  return (
    <section className=" relative  h-[80vh] w-full flex-grow overflow-auto ">
      <div className="fixed left-0 top-0 z-0 h-full w-full bg-chat-background bg-fixed opacity-5" />
      <div className="custom-scrollbar relative flex h-full w-full flex-col-reverse gap-1 overflow-y-auto px-5 py-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message?.senderId === currentChatUserInfo.id
                ? "justify-start"
                : "justify-end"
            }`}
          >
            {message?.type === "text" && <TextMessage message={message} />}
            {message.type === "image" &&
              (index !== 0
                ? messages[index].message !== messages[index - 1].message
                : true) && (
                <ImageMessage
                  message={message}
                  friendId={currentChatUserInfo.id}
                />
              )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChatContainer;
