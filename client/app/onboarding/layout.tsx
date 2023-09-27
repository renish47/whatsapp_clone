import NavLogo from "@/components/NavLogo";
import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavLogo />
      {children}
    </>
  );
}
