"use client";
import { FC, MouseEventHandler, useEffect, useRef } from "react";

interface ContextMenuProps {
  options: { name: string; callBack: () => void }[];
  coordinates: { x: number; y: number };
  setContextMenu(val: boolean): void;
  contextMenu: boolean;
}

const ContextMenu: FC<ContextMenuProps> = ({
  options,
  coordinates,
  contextMenu,
  setContextMenu,
}) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const handleClick = (callBack: () => void) => {
    setContextMenu(false);
    callBack();
  };

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        (event.target as HTMLElement).getAttribute("data-id") !==
        "context-opener"
      ) {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target as Node)
        ) {
          setContextMenu(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      style={{ top: coordinates.y, left: coordinates.x }}
      className={`fixed z-50 rounded-md bg-dropdown py-2 text-white shadow-xl`}
      ref={contextMenuRef}
    >
      <ul>
        {options.map(({ name, callBack }) => (
          <li
            key={name}
            className=" cursor-pointer px-5 py-2 text-base hover:bg-dropdown-hover max-sm:text-lg "
            onClick={(e) => handleClick(callBack)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
