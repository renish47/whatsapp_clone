"use client";
import { FC, useEffect, useRef, useState } from "react";
import Chatlist from "./chatlist/Chatlist";
import Empty from "./Empty";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Message,
  addMessage,
  addSocket,
  addUsersInYourChat,
  fetchFriendsList,
  fetchMessageList,
  fetchMessages,
  fetchUserInfo,
  resetMessage,
  selectUser,
  setCurrentChatUserInfo,
  setOnlineUsers,
  updateUsersInYourChat,
} from "@/redux/features/userSlice";
import { useSession } from "next-auth/react";
import Chat from "./chat/Chat";
import { io } from "socket.io-client";
import { HOST } from "@/utils/apiRoutes";
import MainLoading from "./Common/MainLoading";
import Profile from "./Profile";
import { ToggleOpenChatPage, selectApp } from "@/redux/features/appSlice";
import toast from "react-hot-toast";
import Notification from "./Notification";

interface MainProps {}

const Main: FC<MainProps> = ({}) => {
  const [socketEvent, setSocketEvent] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const {
    currentChatUserInfo: { id: friendId },
    userInfo: { id: userId },
    isMessageListLoading,
    messageList,
    ungroupedFriendsList,
  } = useAppSelector(selectUser);

  const { openProfilePage, openChatPage, showEmptyPage, OpenContactPage } =
    useAppSelector(selectApp);

  const socket: any = useRef();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(fetchUserInfo(session.user?.email as string));
      dispatch(fetchFriendsList(session.user?.email as string));
    }
  }, [status]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMessageList(userId));
      socket.current = io(HOST);
      socket.current.emit("add-user", userId);
      dispatch(addSocket(socket));
      let friendId = window.localStorage.getItem("currentChatUser");
      if (friendId && friendId !== "") {
        dispatch(setCurrentChatUserInfo(friendId));
        dispatch(resetMessage(friendId));
      }
    }
  }, [userId]);

  useEffect(() => {
    let friendId = window.localStorage.getItem("currentChatUser");
    if (friendId && friendId !== "" && ungroupedFriendsList.length) {
      dispatch(setCurrentChatUserInfo(friendId));
      dispatch(resetMessage(friendId));
      dispatch(ToggleOpenChatPage(true));
    }
  }, [ungroupedFriendsList.length]);

  useEffect(() => {
    if (userId !== "" && friendId !== "") {
      dispatch(fetchMessages({ from: userId, to: friendId }));
    }
  }, [userId, friendId]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on(
        "msg-receive",
        (data: { message: Message; from: string }) => {
          dispatch(addMessage(data.message));
          const toastId = toast.custom(
            (t) => <Notification t={t} data={data} />,
            {
              duration: 3000,
              position: "top-center",
            }
          );
        }
      );
      socket.current.on("in-chat", (data: { userId: string }) => {
        dispatch(addUsersInYourChat(data.userId));
      });
      socket.current.on("out-chat", (data: { arr: string[] }) => {
        dispatch(updateUsersInYourChat(data.arr));
      });

      socket.current.on(
        "online-users",
        ({ onlineUsers }: { onlineUsers: string[] }) => {
          dispatch(setOnlineUsers(onlineUsers));
        }
      );
      setSocketEvent(true);
    }
  }, [socket.current]);

  return (
    <>
      {isMessageListLoading && messageList.length <= 0 ? (
        <MainLoading />
      ) : (
        <div className=" h-screen max-h-screen w-screen max-w-full overflow-hidden md:grid md:grid-cols-md lg:grid-cols-lg xl:grid-cols-xl">
          <Chatlist className={`${!showEmptyPage && "max-md:hidden"}`} />
          {openProfilePage && (
            <Profile className={`${showEmptyPage && "max-md:hidden"}`} />
          )}
          {showEmptyPage && (
            <Empty className={`${showEmptyPage && "max-md:hidden"}`} />
          )}
          {openChatPage && (
            <Chat className={`${showEmptyPage && "max-md:hidden"}`} />
          )}
        </div>
      )}
    </>
  );
};

export default Main;
