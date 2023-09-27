"use client";
import {
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: boolean;
}

const Input: FC<InputProps> = ({
  name,
  value,
  setValue,
  label = false,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor="name" className="px-1 text-lg text-white">
          {name}
        </label>
      )}
      <input
        type="text"
        name="name"
        id="name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={
          " h-10 w-full truncate rounded-lg bg-white/20 px-5 py-4 text-start font-light text-white focus:border-2 focus:border-white/40 focus:outline-none"
        }
        {...props}
      />
    </div>
  );
};

export default Input;
