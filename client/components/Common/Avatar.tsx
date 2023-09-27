"use client";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaCamera } from "react-icons/fa";
import { GrFormEdit } from "react-icons/gr";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";

interface AvatarProps {
  type: "lg" | "sm" | "xxl";
  image: string;
  setImage: (image: string) => void;
  setImageFile: (image: any) => void;
}

const Avatar: FC<AvatarProps> = ({ type, image, setImage, setImageFile }) => {
  const [hover, setHover] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);

  useEffect(() => {
    imageInputRef.current?.click();
    const body = document.body as HTMLElement;
    body.onfocus = () => setTimeout(() => setGrabPhoto(false), 1000);
  }, [grabPhoto]);

  const showContext: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
  };

  const sizeClass =
    type === "sm"
      ? "h-10 w-10"
      : type === "lg"
      ? "h-14 w-14"
      : type === "xxl"
      ? " w-44 h-44"
      : "";

  const contextMenuOptions: { name: string; callBack: () => void }[] = [
    // { name: "Take photo", callBack: () => {} },
    {
      name: "Choose from library",
      callBack: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Upload photo",
      callBack: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "Remove photo",
      callBack: () => {
        setImage("/assets/default_avatar.png");
      },
    },
  ];

  async function photoPickerChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      const data = document.createElement("img");
      reader.onload = function (event) {
        data.src = event.target?.result as string;
        data.setAttribute("data-src", event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setTimeout(() => {
        setImage(data.src);
        setImageFile(file);
      }, 100);
    }
  }

  return (
    <>
      <div
        className={`relative mt-2 flex cursor-pointer items-center justify-center rounded-full border-2 border-gray-200/50 ${sizeClass}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={showContext}
        data-id="context-opener"
      >
        <GrFormEdit className=" absolute left-[120px] top-[145px] z-50 rounded-full bg-gray-200 text-3xl text-black " />
        <div
          className={`z-10 flex h-full w-full items-center justify-center gap-3 rounded-full bg-photopicker-overlay transition-opacity duration-300 ${
            isContextMenuVisible ? "opacity-90" : "opacity-0"
          } ${
            hover || isContextMenuVisible ? "sm:opacity-90" : "sm:opacity-0"
          }`}
          data-id="context-opener"
        >
          <FaCamera className=" text-xl" data-id="context-opener" />
          <span className="text-sm">Change your Photo</span>
        </div>
        <Image
          src={image}
          alt="avatar"
          className="z-0 rounded-full object-cover"
          fill
          priority
          data-id="context-opener"
        />
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
      {grabPhoto && (
        <PhotoPicker onChangeHandler={photoPickerChange} ref={imageInputRef} />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary
          setImageUrl={setImage}
          showPhotoLibrary={setShowPhotoLibrary}
        />
      )}
    </>
  );
};

export default Avatar;
