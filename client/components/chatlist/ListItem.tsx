"use client";
import {
  ChangeCurrentChatUserInfo,
  MessageList,
  UserInfo,
  resetMessage,
  selectUser,
} from "@/redux/features/userSlice";
import { FC } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ToggleOpenChatPage, selectApp } from "@/redux/features/appSlice";
import createImageUrl from "@/utils/createImageUrl";
import { calculateTime } from "@/utils/calculateTime";
import MessageStatus from "../chat/MessageStatus";
import { FaCamera } from "react-icons/fa";

interface ListItemProps {
  data: MessageList;
}

const ListItem: FC<ListItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { userInfo, currentChatUserInfo, onlineUsers, usersInYourChat } =
    useAppSelector(selectUser);
  const { openChatPage } = useAppSelector(selectApp);
  const handleContactClick = () => {
    const { name, about, image, email, receiverId, senderId } =
      data as MessageList;

    dispatch(resetMessage(userInfo.id === senderId ? receiverId : senderId));
    dispatch(ToggleOpenChatPage(true));
    dispatch(
      ChangeCurrentChatUserInfo({
        name,
        about,
        image,
        email,
        id: userInfo.id === senderId ? receiverId : senderId,
      })
    );
  };

  return (
    <div
      className={` mx-3 my-1 flex cursor-pointer items-center rounded-lg transition-all duration-200 hover:bg-default-hover ${
        data.email === currentChatUserInfo.email && openChatPage
          ? "bg-default-hover/70 hover:bg-default-hover"
          : " hover:bg-default-hover/30"
      }`}
      onClick={handleContactClick}
    >
      <div className=" min-w-fit px-5 pb-1 pt-3">
        <div className="relative h-14 w-14 cursor-pointer overflow-hidden rounded-full border border-gray-700">
          <Image
            src={
              data.image.includes("=cloudinary")
                ? createImageUrl({
                    publicId: data.image,
                    quality: 50,
                  }).replace("=cloudinary", "")
                : data.image
            }
            alt="avatar"
            fill
            className=" object-cover"
          />
        </div>
      </div>
      <div className="mt-3 flex min-h-full w-full flex-col justify-center  pr-2">
        <div className="flex justify-between">
          <span className="text-white">{data.name}</span>
          <span
            className={`text-sm ${
              data.totalUnreadMesages && data.senderId !== userInfo.id
                ? "text-icon-green"
                : "text-icon-lighter/60"
            }`}
          >
            {calculateTime(data.createdAt)}
          </span>
        </div>
        <div className="flex  pb-2 pr-2 pt-1">
          <div className="flex w-full justify-between xl:gap-3">
            <div className=" flex max-w-[120px] items-center gap-1 text-bubble-meta/40 xs:max-w-[180px] sm:max-w-[350px] md:max-w-[170px] lg:max-w-[200px] xl:max-w-[200px]">
              {data.senderId === userInfo.id && (
                <span>
                  <MessageStatus
                    status={
                      data.messageStatus === "read" ||
                      usersInYourChat.includes(
                        userInfo.id === data.senderId
                          ? data.receiverId
                          : data.senderId
                      )
                        ? "read"
                        : data.messageStatus === "delivered" ||
                          onlineUsers.includes(
                            userInfo.id === data.senderId
                              ? data.receiverId
                              : data.senderId
                          )
                        ? "delivered"
                        : data.messageStatus
                    }
                  />
                </span>
              )}
              {data.type === "text" && (
                <span className="truncate text-gray-400">{data.message}</span>
              )}
              {data.type === "image" && (
                <span className="flex items-center gap-1 text-bubble-meta">
                  <FaCamera className=" text-sm " />
                  Image
                </span>
              )}
            </div>
            {data.totalUnreadMesages > 0 && data.senderId !== userInfo.id && (
              <span className="flex h-6 w-fit items-center justify-center rounded-full bg-icon-green px-[8px] text-sm">
                {data.totalUnreadMesages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
