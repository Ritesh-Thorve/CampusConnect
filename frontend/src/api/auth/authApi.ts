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
interface GoogleAuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    fullname: string;
    provider: string;
    avatar: string | null;
  };
}

export const googleAuthUser = async (access_token: string): Promise<GoogleAuthResponse> => {
  const { data } = await axiosInstance.post<GoogleAuthResponse>("/auth/google", {
    access_token,
  });
  return data;
};




