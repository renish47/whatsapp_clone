"use client";
import { resetCurrentUserInfo, selectUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";
import IconWrapper from "../Common/IconWrapper";
import createImageUrl from "@/utils/createImageUrl";
import { ToggleOpenChatPage } from "@/redux/features/appSlice";

interface ChatHeaderProps {}

const ChatHeader: FC<ChatHeaderProps> = ({}) => {
  const {
    currentChatUserInfo: { name, image, id },
    onlineUsers,
  } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <section className="relative z-10 flex h-16 w-full items-center justify-between bg-primary/50  px-1 py-3 md:px-7 ">
      <div className="flex items-center justify-center gap-1">
        <IconWrapper
          onClick={() => {
            dispatch(resetCurrentUserInfo());
            dispatch(ToggleOpenChatPage(false));
          }}
          className="md:hidden"
        >
          <IoIosArrowBack className="cursor-pointer" title="Back to Home" />
        </IconWrapper>
        <div className="flex items-center justify-center gap-5">
          <div className="relative h-10 w-10  overflow-hidden rounded-full border border-gray-700">
            <Image
              src={
                image.includes("=cloudinary")
                  ? createImageUrl({
                      publicId: image,
                      quality: 50,
                    }).replace("=cloudinary", "")
                  : image
              }
              alt="avatar"
              fill
              className=" object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-primary-strong">{name} </span>
            <span className="text-sm text-white/40">
              {onlineUsers.includes(id) ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-4 ">
        <IconWrapper>
          <BiSearchAlt2 title="Search Chat" />
        </IconWrapper>
        <IconWrapper>
          <BsThreeDotsVertical title="Chat Options" />
        </IconWrapper>
      </div> */}
    </section>
  );
};

export default ChatHeader;
