import { cn } from "@/utils/utils";
import { FC, MouseEventHandler, ReactNode } from "react";

interface IconWrapperProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  dataId?: string;
  disabled?: boolean;
  stayClicked?: boolean;
  className?: string;
}

const IconWrapper: FC<IconWrapperProps> = ({
  children,
  onClick = () => {},
  dataId,
  disabled = false,
  stayClicked,
  className,
}) => {
  return (
    <div
      className={cn(
        `flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xl text-panel-header-icon  ${
          disabled ? "pointer-events-none opacity-50" : "hover:bg-white/10"
        } ${stayClicked && "bg-white/10"}`,
        className
      )}
      data-id={dataId}
      onClick={(e) => onClick(e)}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
