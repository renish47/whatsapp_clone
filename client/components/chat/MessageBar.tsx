"use client";
import {
  addMessage,
  fetchMessageList,
  selectUser,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ADD_MESSAGE_ROUTE, GET_SIGNATURE_ROUTE } from "@/utils/apiRoutes";
import axios from "axios";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { FC, useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { RiImageAddLine } from "react-icons/ri";
// import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import IconWrapper from "../Common/IconWrapper";
import PhotoPicker from "../Common/PhotoPicker";
import uniqid from "uniqid";
import { toast } from "react-hot-toast";
import ReactTextareaAutosize from "react-textarea-autosize";
interface MessageBarProps {}

const MessageBar: FC<MessageBarProps> = ({}) => {
  const {
    currentChatUserInfo: { id: to },
    userInfo: { id: from },
    socket,
    usersInYourChat,
    onlineUsers,
  } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const emojiModalHandler = () => {
    setShowEmojiPicker((prev) => !prev);
  };
  const emojiClickHandler = (emoji: { emoji: string }) => {
    setMessage((prev) => (prev += emoji.emoji));
  };

  const sendMessageHandler = async () => {
    const id = uniqid();
    dispatch(
      addMessage({
        id,
        createdAt: new Date().toISOString(),
        message: message.trim(),
        messageStatus: "sending",
        receiverId: to,
        senderId: from,
        type: "text",
      })
    );
    setMessage("");
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        from,
        to,
        message: message.trim(),
        type: "text",
        id,
      });
      socket.current.emit("send-msg", {
        from,
        to,
        message: data.message,
      });
      dispatch(
        addMessage({
          ...data.message,
          messageStatus: usersInYourChat.includes(to)
            ? "read"
            : onlineUsers.includes(to)
            ? "delivered"
            : data.message.messageStatus,
        })
      );
      // if (!messageListIds.includes(to)) dispatch(fetchMessageList(from));
    } catch (error) {
      console.log(error);
    }
  };

  async function photoPickerChange(event: any) {
    try {
      const id = uniqid();
      const maxImageSizeInMB = 10;
      const file = event.target.files[0];
      if (file.size / 1000000 > maxImageSizeInMB) {
        return toast.error(
          `Image size is too Big \n(Can't exceed ${maxImageSizeInMB} megabytes)`
        );
      }
      const signatureResponse = await axios.get(GET_SIGNATURE_ROUTE);
      const reader = new FileReader();
      const imgBase64 = document.createElement("img");
      reader.onload = function (event) {
        imgBase64.src = event.target?.result as string;
        imgBase64.setAttribute("data-src", event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setTimeout(() => {
        dispatch(
          addMessage({
            id,
            createdAt: new Date().toISOString(),
            message: imgBase64.src,
            messageStatus: "sending",
            receiverId: to,
            senderId: from,
            type: "image",
          })
        );
      }, 100);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", "234776597441875");
      formData.append("signature", signatureResponse.data.signature);
      formData.append("timestamp", signatureResponse.data.timestamp);

      const CloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dcbkjtgon/auto/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        id,
        from,
        to,
        message: CloudinaryResponse.data.public_id,
        type: "image",
      });
      socket.current.emit("send-msg", {
        from,
        to,
        message: data.message,
      });
      dispatch(addMessage(data.message));
      imgBase64.remove();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    imageInputRef.current?.click();
    const body = document.body as HTMLElement;
    body.onfocus = () => setTimeout(() => setGrabPhoto(false), 1000);
  }, [grabPhoto]);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        (event.target as HTMLElement).getAttribute("data-id") !== "emoji-opener"
      ) {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target as Node)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <section className="relative z-10 flex items-center gap-3 bg-primary/50 px-2 py-4 md:gap-6 md:px-4">
      <div className="flex gap-1 md:gap-2">
        <IconWrapper dataId="emoji-opener" onClick={emojiModalHandler}>
          <BsEmojiSmile title="Emoji" data-id="emoji-opener" />
        </IconWrapper>
        {showEmojiPicker && (
          <div
            className="absolute bottom-[105%] left-1 z-[100] w-fit sm:w-[400px]"
            ref={emojiPickerRef}
          >
            <EmojiPicker
              onEmojiClick={emojiClickHandler}
              theme={Theme.DARK}
              height={400}
              emojiStyle={EmojiStyle.NATIVE}
              emojiVersion={"2.0"}
            />
          </div>
        )}
        <IconWrapper
          onClick={() => setGrabPhoto(true)}
          className={`${message !== "" ? "max-md:hidden" : ""}`}
        >
          {/* <ImAttachment title="Attach File" /> */}
          <RiImageAddLine
            title="Send Image"
            className={`text-2xl opacity-90 ${
              message !== "" ? "max-md:hidden" : ""
            }`}
          />
        </IconWrapper>
      </div>
      <div className=" flex h-fit w-full items-center rounded-lg ">
        <ReactTextareaAutosize
          ref={textareaRef}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessageHandler();
            }
          }}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Type a message`}
          className="min-h-10 custom-scrollbar max-h-28 w-full resize-none overflow-y-auto rounded-lg bg-input  px-2 py-3 text-sm text-white focus:outline-none md:px-5"
        />
      </div>
      <div className="flex w-10 items-center justify-center">
        <IconWrapper
          onClick={message.length ? sendMessageHandler : undefined}
          disabled={!message.length}
        >
          <MdSend title="Send Message" />
        </IconWrapper>
      </div>
      {grabPhoto && (
        <PhotoPicker onChangeHandler={photoPickerChange} ref={imageInputRef} />
      )}
    </section>
  );
};

export default MessageBar;
