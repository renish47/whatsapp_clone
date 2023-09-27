"use client";
import { StateProvider } from "@/scrap/context/StateContext";
import reducer, { initialState } from "@/scrap/context/StateReducer";
import { FC, ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {children}
    </StateProvider>
  );
};

export default ContextProvider;
