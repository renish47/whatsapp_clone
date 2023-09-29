import { Message, selectUser } from "@/redux/features/userSlice";
import { calculateTime } from "@/utils/calculateTime";
import Image from "next/image";
import { FC } from "react";
import MessageStatus from "./MessageStatus";
import createImageUrl from "@/utils/createImageUrl";
import { BiLoaderAlt } from "react-icons/bi";
import { useAppSelector } from "@/redux/hooks";

interface ImageMessageProps {
  message: Message;
  friendId: string;
}

const ImageMessage: FC<ImageMessageProps> = ({ message, friendId }) => {
  const { onlineUsers, usersInYourChat } = useAppSelector(selectUser);

  return (
    <div
      className={`rounded-lg p-1 ${
        message.senderId === friendId ? "bg-incoming" : "bg-outgoing"
      }`}
    >
      <div className="relative ">
        <div className="flex items-center justify-center">
          {message.messageStatus === "sending" && (
            <BiLoaderAlt className="absolute  z-[100] animate-spin text-4xl text-white/80 delay-500" />
          )}
          <Image
            key={message.id}
            src={
              message.message.includes("base64")
                ? message.message
                : createImageUrl({
                    publicId: message.message,
                    quality: 80,
                  })
            }
            alt="asset"
            height={300}
            width={300}
            className={` max-w-[180px] rounded-lg xs:max-w-[220px]  md:max-w-[280px] lg:max-w-[300px]  ${
              message.messageStatus === "sending" ? "opacity-60 blur-sm" : ""
            }`}
          />
        </div>
        <div className="flex min-w-fit items-center justify-end gap-2 pt-1 text-[10px] text-bubble-meta/40">
          <span className=" font-semibold ">
            {calculateTime(message.createdAt)}
          </span>
          <span>
            {message.senderId !== friendId && (
              <MessageStatus
                key={message.id}
                status={
                  (message.messageStatus === "read" ||
                    usersInYourChat.includes(friendId)) &&
                  message.messageStatus !== "sending"
                    ? "read"
                    : message.messageStatus === "delivered" ||
                      (onlineUsers.includes(friendId) &&
                        message.messageStatus !== "sending")
                    ? "delivered"
                    : message.messageStatus
                }
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageMessage;
