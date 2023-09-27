"use client";
import { selectUser } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { FC } from "react";
import ListItem from "./ListItem";

interface ListProps {}

const List: FC<ListProps> = ({}) => {
  const { onlineUsers, filteredMessageList } = useAppSelector(selectUser);

  return (
    <section className=" custom-scrollbar max-h-full flex-auto overflow-auto max-md:h-screen">
      {!filteredMessageList.length ? (
        <div className=" mt-10 flex items-center justify-center text-xl text-primary">
          <span>No chat found</span>
        </div>
      ) : (
        filteredMessageList.map((data) => (
          <ListItem data={data} key={data.messageId} />
        ))
      )}
    </section>
  );
};

export default List;
