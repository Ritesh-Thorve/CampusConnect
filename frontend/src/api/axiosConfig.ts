import axios from "axios";
import { store } from "../redux/store/store";
import { logout } from "@/redux/features/auth/authSlice";

const baseURL = `${import.meta.env.VITE_BACKEND_API_URL}/api`;

export const axiosInstance = axios.create({
  baseURL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    let token = state.auth?.token;

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
