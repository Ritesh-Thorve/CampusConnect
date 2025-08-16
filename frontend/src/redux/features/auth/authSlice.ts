import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, User } from "./types";
import { signUpUser } from "@/api/auth/authApi";

interface AuthState {
  user: User | null;
  token: string | null;
  expiry: number | null; 
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  expiry: null,
  loading: false,
  error: null,
};

const safeStorage = {
  set: (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
  get: (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },
  remove: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    data: { fullname: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await signUpUser(data);
      return res;
    } catch (e: any) {
      return rejectWithValue(
        e?.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      try {
        const payload = JSON.parse(atob(action.payload.token.split(".")[1]));
        state.expiry = payload.exp ? payload.exp * 1000 : null;
      } catch {
        state.expiry = null;
      }

      safeStorage.set("cc_token", action.payload.token);
      safeStorage.set("cc_user", JSON.stringify(action.payload.user));
      if (state.expiry) {
        safeStorage.set("cc_expiry", state.expiry.toString());
      } else {
        safeStorage.remove("cc_expiry");
      }
    },
    hydrateFromStorage: (state) => {
      try {
        const token = safeStorage.get("cc_token");
        const userRaw = safeStorage.get("cc_user");
        const expiryRaw = safeStorage.get("cc_expiry");

        const expiry = expiryRaw ? Number(expiryRaw) : null;

        if (expiry && Date.now() > expiry) {
          console.warn("Token expired during hydrateFromStorage");
          safeStorage.remove("cc_token");
          safeStorage.remove("cc_user");
          safeStorage.remove("cc_expiry");
          state.user = null;
          state.token = null;
          state.expiry = null;
          return;
        }

        state.token = token || null;
        state.user = userRaw ? JSON.parse(userRaw) : null;
        state.expiry = expiry;
      } catch (err) {
        console.error("Failed to hydrate auth state", err);
        state.user = null;
        state.token = null;
        state.expiry = null;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiry = null;
      safeStorage.remove("cc_token");
      safeStorage.remove("cc_user");
      safeStorage.remove("cc_expiry");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;

        try {
          const payload = JSON.parse(atob(a.payload.token.split(".")[1]));
          s.expiry = payload.exp ? payload.exp * 1000 : null;
        } catch {
          s.expiry = null;
        }

        safeStorage.set("cc_token", a.payload.token);
        safeStorage.set("cc_user", JSON.stringify(a.payload.user));
        if (s.expiry) {
          safeStorage.set("cc_expiry", s.expiry.toString());
        } else {
          safeStorage.remove("cc_expiry");
        }
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = (a.payload as string) || "Something went wrong";
      });
  },
});

export const { setCredentials, hydrateFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
