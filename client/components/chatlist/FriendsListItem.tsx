"use client";
import {
  ChangeCurrentChatUserInfo,
  UserInfo,
  resetMessage,
} from "@/redux/features/userSlice";
import { FC } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  ToggleOpenChatPage,
  ToggleOpenContactPage,
} from "@/redux/features/appSlice";
import createImageUrl from "@/utils/createImageUrl";

interface ChatListItemProps {
  data: UserInfo;
}

const ChatListItem: FC<ChatListItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const handleContactClick = () => {
    dispatch(resetMessage(data.id));
    dispatch(ChangeCurrentChatUserInfo(data));
    dispatch(ToggleOpenContactPage(false));
    dispatch(ToggleOpenChatPage(true));
  };
  return (
    <div
      className={` mx-3 my-1 flex cursor-pointer items-center rounded-lg transition-all duration-200 hover:bg-default-hover`}
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
        </div>
        <div className="flex  pb-2 pr-2 pt-1">
          <div className="flex w-full justify-between">
            <span className="line-clamp-1 text-sm text-white/60">
              {data.about || "\u00A0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
