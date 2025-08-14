import axios from "axios";
import { store } from "../redux/store/store";
import { logout } from "@/redux/features/auth/authSlice";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attached token
axiosInstance.interceptors.request.use(
  (config) => {
    // Always try Redux first
    const state = store.getState();
    let token = state.auth?.token;

    // Fallback to localStorage if Redux lost token on reload
    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("cc_token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message?.toLowerCase() === "unauthorized"
    ) {
      console.warn("401 received, logging out user");
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
