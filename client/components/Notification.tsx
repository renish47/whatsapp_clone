import { ToggleOpenChatPage, selectApp } from "@/redux/features/appSlice";
import { UserInfo } from "@/redux/features/types/userSlice";
import {
  ChangeCurrentChatUserInfo,
  Message,
  resetMessage,
  selectUser,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import createImageUrl from "@/utils/createImageUrl";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { FaCamera } from "react-icons/fa";
import { useMediaQuery } from "usehooks-ts";

interface NotificationProps {
  data: {
    message: Message;
    from: string;
  };
  t: Toast;
}

const Notification: FC<NotificationProps> = ({ data, t }) => {
  const mediaQueryConditon = useMediaQuery("(min-width: 768px)");
  const dispatch = useAppDispatch();
  const {
    ungroupedFriendsList,
    currentChatUserInfo: { id },
  } = useAppSelector(selectUser);
  const { OpenContactPage, openChatPage, openProfilePage } =
    useAppSelector(selectApp);
  const [friend, setFriend] = useState<UserInfo>();
  useEffect(() => {
    if (data.from) {
      const friendInfo = ungroupedFriendsList.filter(
        (friend) => friend.id === data.from
      )[0];
      setFriend({ ...friendInfo });
    }
  }, [data.from]);
  useEffect(() => {
    if (
      data.from === id ||
      mediaQueryConditon ||
      (id === "" && !(OpenContactPage || openChatPage || openProfilePage))
    )
      toast.remove(t.id);
  }, []);

  function onClickHandler() {
    dispatch(resetMessage(data.from));
    dispatch(ToggleOpenChatPage(true));
    dispatch(
      ChangeCurrentChatUserInfo({
        name: friend?.name || "",
        about: friend?.about || "",
        image: friend?.image || "",
        email: friend?.email || "",
        id: data.from,
      })
    );
    toast.remove(t.id);
  }

  return (
    <>
      <div
        onClick={onClickHandler}
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto flex w-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-md:max-w-[350px] max-sm:max-w-[70vw]`}
      >
        <div className="w-full flex-1 p-1">
          <div className="flex w-full items-center">
            <div className="flex-shrink-0 pt-0.5">
              <div className=" min-w-fit">
                <div className="relative h-14 w-14 cursor-pointer overflow-hidden rounded-full">
                  <Image
                    src={
                      friend?.image.includes("=cloudinary")
                        ? createImageUrl({
                            publicId: friend?.image,
                            quality: 50,
                          }).replace("=cloudinary", "")
                        : friend?.image || "/assets/default_avatar.png"
                    }
                    alt="avatar"
                    fill
                    className=" object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-base font-medium text-black">{friend?.name}</p>
              {data.message.type === "text" && (
                <p className="truncate text-sm text-gray-800 max-md:w-[230px] max-sm:w-[50vw]">
                  {/* 1 New Message */}
                  {data.message?.message}
                </p>
              )}
              {data.message.type === "image" && (
                <span className="flex items-center gap-1 text-sm text-gray-700 max-md:w-[230px] max-sm:w-[50vw]">
                  <FaCamera className=" text-sm " />
                  Image
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
