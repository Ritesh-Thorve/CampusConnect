import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import profile from "../features/profile/profileSlice"
import trendsReducer from '../features/trends/trendsSlice';
import updatesReducer from '../features/updates/updatesSlice';
import profilesReducer from "../features/profile/studentsProfilesSlice";
import paymentReducer from "../features/payment/paymentSlice";

export const store = configureStore({
  reducer: {
    auth,
    profile,
    allStudentsProfiles: profilesReducer,
    trends: trendsReducer,
    updates: updatesReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
