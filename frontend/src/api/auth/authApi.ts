import { axiosInstance } from "../axiosConfig";
import { SignUpData, AuthResponse } from "../../redux/features/auth/types";

export const signUpUser = async (data: SignUpData): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/signup", {
    fullname: data.fullname,
    email: data.email,
    password: data.password,
  });
  return res.data;
};
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data;
};

// Google Auth request
export const googleAuthUser = async (supabaseToken: string): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/google", { token: supabaseToken });
  return res.data;
};
