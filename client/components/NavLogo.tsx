import Image from "next/image";
import { FC } from "react";

interface NavLogoProps {}

const NavLogo: FC<NavLogoProps> = ({}) => {
  return (
    <div className="fixed flex  items-center  justify-center gap-2 px-5 py-4 sm:px-10">
      <Image
        priority
        width="50"
        height="50"
        src="https://res.cloudinary.com/dcbkjtgon/image/upload/v1695828589/whatsappLogoColord_olkxtu.png"
        alt="whatsapp-logo"
        quality={100}
        className="max-sm:h-10 max-sm:w-10"
      />
      <span className=" text-2xl font-semibold text-white sm:text-3xl">
        WhatsApp
      </span>
    </div>
  );
};

export default NavLogo;
