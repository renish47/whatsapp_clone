"use client";
import { ToggleOpenContactPage, selectApp } from "@/redux/features/appSlice";
import { filterFriendsList, selectUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FC, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import SearchBar from "./SearchBar";
import IconWrapper from "../Common/IconWrapper";
import FriendsListItem from "./FriendsListItem";

interface ContactListProps {}

const ContactList: FC<ContactListProps> = ({}) => {
  const { friendsList, filteredFriendsList } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [searchInFocus, setSearchInFocus] = useState(false);

  const searchFunctionHandler = (keyword: string) => {
    setSearchInFocus(keyword !== "");
    dispatch(filterFriendsList(keyword));
  };

  return (
    <section className="flex h-full flex-col max-md:h-screen">
      <div className="flex items-center gap-5 p-5 pb-1 text-xl text-white">
        <IconWrapper onClick={() => dispatch(ToggleOpenContactPage(false))}>
          <BiArrowBack className="cursor-pointer" title="Back to Home" />
        </IconWrapper>
        <span className="font-semibold">New Chat</span>
      </div>
      <SearchBar
        placeholder="Search Friends"
        searchFunction={searchFunctionHandler}
      />
      <div className="custom-scrollbar overflow-auto ">
        {filteredFriendsList.length && searchInFocus ? (
          filteredFriendsList.map((contact) => (
            <FriendsListItem data={contact} key={contact.id} />
          ))
        ) : !filteredFriendsList.length && searchInFocus ? (
          <div className=" mt-10 flex items-center justify-center text-xl text-primary">
            <span>No Friends found</span>
          </div>
        ) : (
          Object.entries(friendsList).map(([initialLetter, userList]) => {
            return (
              <div key={initialLetter}>
                <div className=" py-5 pl-10 text-xl font-semibold text-teal-light">
                  {initialLetter}
                </div>
                {userList.map((contact) => (
                  <FriendsListItem data={contact} key={contact.id} />
                ))}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default ContactList;
