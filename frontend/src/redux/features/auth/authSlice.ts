import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUpUser, loginUser, googleAuthUser } from "../../../api/auth/authApi";
import { AuthState, SignUpData, AuthResponse } from "./types";

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Thunks
export const registerUser = createAsyncThunk<AuthResponse, SignUpData>(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      return await signUpUser(formData);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Signup failed");
    }
  }
);

export const loginUserThunk = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginUser(email, password);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Login failed");
    }
  }
);

export const googleLoginThunk = createAsyncThunk<AuthResponse, string>(
  "auth/googleLoginUser",
  async (supabaseToken, { rejectWithValue }) => {
    try {
      return await googleAuthUser(supabaseToken);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Google Auth failed");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
