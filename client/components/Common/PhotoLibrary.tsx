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
    <div className="fixed top-0 left-0 w-screen h-screen  flex justify-center items-center z-50">
      <div className="sm:h-[95%] h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div
          onClick={() => showPhotoLibrary(false)}
          className="pt-2 pe-2 cursor-pointer flex items-end justify-end "
        >
          <IoClose className=" h-10 w-10 max-sm:h-8  max-sm:w-8 cursor-pointer" />
        </div>
        <h3 className="text-center text-2xl font-semibold pt-5">
          Pick your Avatar
        </h3>
        <div className=" grid grid-cols-3  justify-center items-center gap-10 p-5 py-10  w-full">
          {images.map((image, i) => (
            <div
              onClick={() => {
                setImageUrl(image);
                showPhotoLibrary(false);
              }}
              className="h-20 w-20 max-sm:h-16 max-sm:w-16 cursor-pointer relative"
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
