import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import profile from "../features/profile/profileSlice"

export const store = configureStore({
  reducer: {
    auth,
    profile
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
