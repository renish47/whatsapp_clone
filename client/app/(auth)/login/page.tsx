import SignInButton from "@/components/SignInButton";
import Image from "next/image";
export default function LoginPage() {
  return (
    <div className=" BgGradient  flex h-screen w-screen flex-col items-center justify-center gap-6">
      <div className=" flex items-center justify-center gap-4 text-white max-sm:flex-col max-sm:gap-10">
        <Image
          width="210"
          height="210"
          src="https://res.cloudinary.com/dcbkjtgon/image/upload/v1695828589/whatsappLogoColord_olkxtu.png"
          alt="whatsapp-logo"
          quality={100}
          className="max-sm:h-52 max-sm:w-52"
        />
        <div className="flex flex-col gap-5 max-sm:gap-10">
          <span className="text-6xl font-semibold max-sm:text-5xl">
            WhatsApp
          </span>
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
