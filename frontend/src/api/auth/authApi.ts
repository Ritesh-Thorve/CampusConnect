import { axiosInstance } from "../axiosConfig";
import { SignUpData, AuthResponse } from "../../redux/features/auth/types";

// Helper for safer error extraction
const extractErrorMsg = (error: any, fallback: string) =>
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;

// Register new user
export const signUpUser = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data;
  } catch (error: any) {
    throw new Error(extractErrorMsg(error, "Registration failed"));
  }
};

// Login with email/password
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    return res.data;
  } catch (error: any) {
    console.error("loginUser error:", error?.response?.data || error);
    throw error;
  }
};

// Login with Google
export const googleAuthUser = async (payload: {
  fullname: string;
  email: string;
  provider: string;
  supabaseId: string;
  access_token: string;
}) => {

  const backendPayload = {
    fullname: payload.fullname,
    email: payload.email,
    provider: payload.provider,
    supabaseId: payload.supabaseId,
    access_token: payload.access_token,
  };

  const { data } = await axiosInstance.post("/auth/google", backendPayload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};




