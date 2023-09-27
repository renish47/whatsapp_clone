import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface State {
  OpenContactPage: boolean;
  openProfilePage: boolean;
  openChatPage: boolean;
  showEmptyPage: boolean;
}

const initialState: State = {
  OpenContactPage: false,
  openProfilePage: false,
  openChatPage: false,
  showEmptyPage: true,
};

const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ToggleOpenContactPage: (state: State, action: PayloadAction<boolean>) => {
      state.OpenContactPage = action.payload;
    },
    ToggleOpenProfilePage: (state: State, action: PayloadAction<boolean>) => {
      state.openProfilePage = action.payload;
      state.OpenContactPage = false;
      state.openChatPage = false;
      state.showEmptyPage = !action.payload;
    },
    ToggleOpenChatPage: (state: State, action: PayloadAction<boolean>) => {
      state.openChatPage = action.payload;
      state.OpenContactPage = false;
      state.openProfilePage = false;
      state.showEmptyPage = !action.payload;
    },
  },
});

export const {
  ToggleOpenContactPage,
  ToggleOpenProfilePage,
  ToggleOpenChatPage,
} = appSlice.actions;

export const selectApp = (state: RootState) => state.app;

export default appSlice;
