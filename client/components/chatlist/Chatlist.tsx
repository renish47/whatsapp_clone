"use client";
import { FC, useEffect, useState } from "react";
import ChatlistHeader from "./ChatlistHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectApp } from "@/redux/features/appSlice";
import FriendsList from "./FriendsList";
import { filterMessageList, selectUser } from "@/redux/features/userSlice";
import { cn } from "@/utils/utils";
import { ClassValue } from "clsx";

interface ChatlistProps {
  className?: ClassValue;
}

enum SidePageContent {
  default = "Default",
  friendsList = " FriendsList",
}

const Chatlist: FC<ChatlistProps> = ({ className }) => {
  const [sidePageContent, setSidePageContent] =
    useState<keyof typeof SidePageContent>("default");
  const dispatch = useAppDispatch();

  const { OpenContactPage } = useAppSelector(selectApp);
  useEffect(() => {
    if (OpenContactPage) setSidePageContent("friendsList");
    else setSidePageContent("default");
  }, [OpenContactPage]);

  const searchFunctionHandler = (keyword: string) => {
    dispatch(filterMessageList(keyword));
  };

  return (
    <div
      className={cn(
        "z-20 flex max-h-screen flex-col border-e border-conversation-border bg-secondary",
        className
      )}
    >
      {sidePageContent === "default" && (
        <>
          <ChatlistHeader />
          <SearchBar
            searchFunction={searchFunctionHandler}
            placeholder="Search or start a new chat"
          />
          <List />
        </>
      )}
      {sidePageContent === "friendsList" && (
        <>
          <FriendsList />
        </>
      )}
    </div>
  );
};

export default Chatlist;
