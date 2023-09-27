"use client";
import { FC, useEffect, useState } from "react";
import Avatar from "@/components/Common/Avatar";
import Input from "@/components/Common/Input";
import { RiLoaderLine } from "react-icons/ri";
import { GET_SIGNATURE_ROUTE, UPDATE_USER_ROUTE } from "@/utils/apiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { addUserInfo } from "@/redux/features/userSlice";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";

interface OnboardPageContentProps {
  session: Session;
}

const OnboardPageContent: FC<OnboardPageContentProps> = ({
  session: { user },
}) => {
  //utils
  const router = useRouter();
  const dispatch = useAppDispatch();

  //util functions
  const getHiQualityImage = (image: string) =>
    image.replaceAll("s96-c", "s400-c") || "";

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
    getHiQualityImage(user?.image as string) || "/assets/default_avatar.png"
  );
  const [imageFile, setImageFile] = useState<any>(null);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [about, setAbout] = useState("Hi there! I'm New to WhatsApp");
  const [isLoading, setIsLoading] = useState(false);

  //handlers
  const handleImageSubmit = (image: string) => {
    setImage(getHiQualityImage(image));
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
        router.push("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="BgGradient flex h-screen w-screen flex-col items-center justify-center gap-5 text-white sm:gap-10 ">
      <h2 className=" text-3xl font-semibold max-sm:mt-5 max-sm:text-xl">
        Create your profile
      </h2>

      <div className="flex w-[55%] items-start justify-center gap-7 max-lg:w-[65%] max-md:w-[70%] max-sm:w-[85%]  max-sm:flex-col sm:gap-16  ">
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
          <Input name="About" value={about} setValue={setAbout} label={true} />
          <button
            className="transition-color h-[50px] w-[160px] rounded-lg bg-[#0b0b0b] duration-200 hover:bg-[#0b0b0b]/70 disabled:pointer-events-none disabled:opacity-50 sm:mt-3"
            disabled={isLoading}
            onClick={onboardHandler}
          >
            {isLoading ? (
              <span className="text-base">
                <RiLoaderLine className="me-2 inline animate-spin text-xl" />
                Creating...
              </span>
            ) : (
              "Create profile"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardPageContent;
