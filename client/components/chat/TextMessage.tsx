import { Message, selectUser } from "@/redux/features/userSlice";
import { calculateTime } from "@/utils/calculateTime";
import { FC } from "react";
import MessageStatus from "./MessageStatus";
import { useAppSelector } from "@/redux/hooks";

interface TextMessageProps {
  message: Message;
}

const TextMessage: FC<TextMessageProps> = ({ message }) => {
  const { currentChatUserInfo, userInfo, onlineUsers, usersInYourChat } =
    useAppSelector(selectUser);

  return (
    <div
      className={`flex  max-w-[85%] items-end gap-2 rounded-md px-2 py-[5px] pe-1 text-base text-white  ${
        message.senderId === currentChatUserInfo.id
          ? "bg-incoming"
          : "bg-outgoing"
      }`}
    >
      <span className="whitespace-pre-wrap">{message.message}</span>
      <div className="flex  min-w-fit items-center justify-end  gap-1 pt-1 text-[10px] text-bubble-meta/40">
        <span className="">{calculateTime(message.createdAt)}</span>
        <span>
          {message.senderId === userInfo.id && (
            <MessageStatus
              key={message.id}
              status={
                message.messageStatus === "read" ||
                usersInYourChat.includes(currentChatUserInfo.id)
                  ? "read"
                  : message.messageStatus === "delivered" ||
                    onlineUsers.includes(currentChatUserInfo.id)
                  ? "delivered"
                  : message.messageStatus
              }
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default TextMessage;
