"use client";
import { FC, MouseEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetCurrentUserInfo, selectUser } from "@/redux/features/userSlice";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  ToggleOpenContactPage,
  ToggleOpenProfilePage,
  selectApp,
} from "@/redux/features/appSlice";
import IconWrapper from "../Common/IconWrapper";
import { signOut } from "next-auth/react";
import ContextMenu from "../Common/ContextMenu";

interface ChatlistHeaderProps {}

const ChatlistHeader: FC<ChatlistHeaderProps> = () => {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const dispatch = useAppDispatch();
  const {
    socket,
    userInfo: { id },
  } = useAppSelector(selectUser);
  const openContactPageHandler = () => {
    dispatch(ToggleOpenContactPage(true));
  };

  const contextMenuOptions: { name: string; callBack: () => void }[] = [
    {
      name: "Edit Profile",
      callBack: () => {
        dispatch(resetCurrentUserInfo());
        dispatch(ToggleOpenProfilePage(true));
      },
    },
    // { name: "Add New Friend", callBack: () => {} },
    {
      name: "Logout",
      callBack: () => {
        socket.current.emit("signout", id);
        signOut({ callbackUrl: "/login" });
      },
    },
  ];

  const showContext: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCoordinates({ x: e.pageX - 120, y: 35 });
  };
  return (
    <>
      <div className=" flex h-16 items-center justify-between px-4 py-3 ">
        {/* <div className="relative cursor-pointer h-10 w-10 rounded-full overflow-hidden">
        <Image src={user?.userInfo?.image} alt="avatar" fill />
      </div> */}
        <span className="text-2xl font-semibold text-white">WhatsApp</span>
        <div className="flex gap-2 ">
          <IconWrapper onClick={openContactPageHandler}>
            <BsFillChatLeftTextFill title="New Chat" />
          </IconWrapper>
          <IconWrapper stayClicked={isContextMenuVisible} onClick={showContext}>
            <BsThreeDotsVertical title="Menu" />
          </IconWrapper>
        </div>
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
    </>
  );
};

export default ChatlistHeader;
