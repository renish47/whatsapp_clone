import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

interface PhotoLibraryProps {
  setImageUrl: (image: string) => void;
  showPhotoLibrary: Dispatch<SetStateAction<boolean>>;
}

const PhotoLibrary: FC<PhotoLibraryProps> = ({
  setImageUrl,
  showPhotoLibrary,
}) => {
  const images = [
    "/assets/avatars/1.png",
    "/assets/avatars/2.png",
    "/assets/avatars/3.png",
    "/assets/avatars/4.png",
    "/assets/avatars/5.png",
    "/assets/avatars/6.png",
    "/assets/avatars/7.png",
    "/assets/avatars/8.png",
    "/assets/avatars/9.png",
  ];
  return (
    <div className="fixed left-0 top-0 z-50 flex  h-screen w-screen items-center justify-center">
      <div className="h-max w-max gap-6 rounded-lg bg-primary p-4 ">
        <div
          onClick={() => showPhotoLibrary(false)}
          className="flex cursor-pointer items-end justify-end pe-2 pt-2 "
        >
          <IoClose className=" h-10 w-10 cursor-pointer  max-sm:h-8 max-sm:w-8" />
        </div>
        <h3 className="pt-5 text-center text-2xl font-semibold">
          Pick your Avatar
        </h3>
        <div className=" grid w-full  grid-cols-3 items-center justify-center gap-10 p-5  py-10">
          {images.map((image, i) => (
            <div
              onClick={() => {
                setImageUrl(image);
                showPhotoLibrary(false);
              }}
              className="relative h-20 w-20 cursor-pointer max-sm:h-16 max-sm:w-16"
            >
              <Image src={image} alt="avatar" fill />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLibrary;
