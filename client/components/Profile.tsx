"use client";
import { FC, useState } from "react";
import Avatar from "@/components/Common/Avatar";
import Input from "@/components/Common/Input";
import { RiLoaderLine } from "react-icons/ri";
import { GET_SIGNATURE_ROUTE, UPDATE_USER_ROUTE } from "@/utils/apiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addUserInfo, selectUser } from "@/redux/features/userSlice";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import IconWrapper from "./Common/IconWrapper";
import { ToggleOpenProfilePage } from "@/redux/features/appSlice";
import createImageUrl from "@/utils/createImageUrl";
import { ClassValue } from "clsx";
import { cn } from "@/utils/utils";

interface ProfileProps {
  className?: ClassValue;
}

const Profile: FC<ProfileProps> = ({ className }) => {
  //utils
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    userInfo: { name: Name, image: Image, email: Email, about: About },
    onlineUsers,
  } = useAppSelector(selectUser);

  //util functions

  const validateDetails = () => {
    if (name.length < 3) {
      toast.error("Name Needs to be atleast 3 characters long");
      return false;
    }
    if (about.length <= 0) {
      toast.error("About can't be empty");
      return false;
    }
    return true;
  };

  //states
  const [image, setImage] = useState(
    Image.includes("=cloudinary")
      ? createImageUrl({
          publicId: Image,
          quality: 50,
        }).replace("=cloudinary", "")
      : Image || "/assets/default_avatar.png"
  );
  const [imageFile, setImageFile] = useState<any>(null);
  const [name, setName] = useState(Name);
  const [email, setEmail] = useState(Email);
  const [about, setAbout] = useState(About);
  const [isLoading, setIsLoading] = useState(false);

  //handlers
  const handleImageSubmit = (image: string) => {
    setImage(
      image.includes("=cloudinary")
        ? createImageUrl({
            publicId: image,
            quality: 50,
          }).replace("=cloudinary", "")
        : image
    );
  };
  const onboardHandler = async () => {
    let publicId = "";
    if (validateDetails()) {
      setIsLoading(true);
      try {
        if (image.includes("base64")) {
          const maxImageSizeInMB = 10;
          if (imageFile?.size / 1000000 > maxImageSizeInMB) {
            setIsLoading(false);
            return toast.error(
              `Image size is too Big \n(Can't exceed ${maxImageSizeInMB} megabytes)`
            );
          }
          const signatureResponse = await axios.get(GET_SIGNATURE_ROUTE);
          const formData = new FormData();
          formData.append("file", imageFile);
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
          publicId = CloudinaryResponse.data.public_id + "=cloudinary";
        }
        const { data } = await axios.put(UPDATE_USER_ROUTE, {
          email,
          name: name.trim().charAt(0).toUpperCase() + name.slice(1),
          about: about.trim(),
          image: image.includes("base64") ? publicId : image,
        });
        dispatch(addUserInfo({ id: data.user.id, name, email, about, image }));
        setIsLoading(false);
        toast.success("Profile Updated");
      } catch (error) {
        toast.error("Error Updating! Try Again Later");
        console.log(error);
        setIsLoading(false);
      }
    }
  };
  return (
    <main className={cn("relative h-screen w-full bg-secondary", className)}>
      <IconWrapper
        onClick={() => dispatch(ToggleOpenProfilePage(false))}
        className="absolute left-10 top-5 md:top-10 lg:left-20"
      >
        <BiArrowBack className="cursor-pointer" title="Back" />
      </IconWrapper>
      <div className=" flex h-full w-full items-center justify-center  gap-5 ">
        <div className=" flex h-screen w-full flex-col items-center justify-center gap-5 text-white sm:gap-10 ">
          <h2 className=" text-center text-3xl font-semibold max-sm:mt-5 ">
            <span className="block"> Edit profile</span>
            <span className="text-base font-light text-gray-500">{email}</span>
          </h2>

          <div className="flex w-[85%] items-center justify-center gap-7 max-lg:w-[65%] max-lg:flex-col max-md:w-[70%] max-sm:w-[85%]  lg:items-start lg:gap-16  ">
            <Avatar
              type="xxl"
              image={image}
              setImage={handleImageSubmit}
              setImageFile={setImageFile}
            />
            <div className="flex w-[55%] flex-col items-center justify-center gap-6 max-lg:w-[65%]  max-md:w-[70%] max-sm:w-[85%]">
              <Input
                name="Display Name"
                value={name}
                setValue={setName}
                label={true}
              />
              <Input
                name="About"
                value={about}
                setValue={setAbout}
                label={true}
              />

              <button
                className="transition-color h-[50px] w-[160px] rounded-lg bg-[#0b0b0b] duration-200 hover:bg-[#0b0b0b]/70 disabled:pointer-events-none disabled:opacity-50 sm:mt-3"
                disabled={isLoading}
                onClick={onboardHandler}
              >
                {isLoading ? (
                  <span className="text-base">
                    <RiLoaderLine className="me-2 inline animate-spin text-xl" />
                    Updating...
                  </span>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
