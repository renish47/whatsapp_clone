import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appSlice from "./features/appSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["user.socket.current"],
        ignoredActions: ["user/addSocket"],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatchForApi = (action: Action) => {
  store.dispatch(action);
};
