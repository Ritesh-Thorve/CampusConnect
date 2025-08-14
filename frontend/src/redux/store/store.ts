import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import profile from "../features/profile/profileSlice"
import trendsReducer from '../features/trends/trendsSlice';

export const store = configureStore({
  reducer: {
    auth,
    profile,
    trends: trendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
