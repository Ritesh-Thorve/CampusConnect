import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, User } from "./types";
import { signUpUser, googleAuthUser } from "@/api/auth/authApi";
import { supabaseClient } from "../../../config/supabaseClient";

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

// Google login thunk
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const { data: existing, error: sessionError } =
        await supabaseClient.auth.getSession();
      if (sessionError) throw sessionError;

      if (!existing.session) {
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        return null; 
      }

      const session = existing.session;
      const user = session.user;

      const backendRes = await googleAuthUser({
        fullname: user.user_metadata.full_name || "",
        email: user.email!,
        provider: "google",
        supabaseId: user.id,
        access_token: session.access_token,
      });

      return backendRes as AuthResponse;
    } catch (e: any) {
      return rejectWithValue(e.message || "Google login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = {
        ...action.payload.user,
        provider: action.payload.user.provider || "manual",
      };
      state.token = action.payload.token;
      state.error = null;

      try {
        const payload = JSON.parse(atob(action.payload.token.split(".")[1]));
        state.expiry = payload.exp ? payload.exp * 1000 : null;
      } catch {
        state.expiry = null;
      }

      safeStorage.set("cc_token", action.payload.token);
      safeStorage.set("cc_user", JSON.stringify(state.user));
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
      } catch {
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
        s.user = {
          ...a.payload.user,
          provider: a.payload.user.provider || "manual", 
        };
        s.token = a.payload.token;

        try {
          const payload = JSON.parse(atob(a.payload.token.split(".")[1]));
          s.expiry = payload.exp ? payload.exp * 1000 : null;
        } catch {
          s.expiry = null;
        }

        safeStorage.set("cc_token", a.payload.token);
        safeStorage.set("cc_user", JSON.stringify(s.user));
        if (s.expiry) {
          safeStorage.set("cc_expiry", s.expiry.toString());
        } else {
          safeStorage.remove("cc_expiry");
        }
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = (a.payload as string) || "Something went wrong";
      })
      // 🔹 Google login handling
      .addCase(loginWithGoogle.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (s, a) => {
        s.loading = false;

        if (a.payload) {
          s.user = {
            ...a.payload.user,
            provider: a.payload.user.provider || "google",
          };
          s.token = a.payload.token;

          try {
            const payload = JSON.parse(atob(a.payload.token.split(".")[1]));
            s.expiry = payload.exp ? payload.exp * 1000 : null;
          } catch {
            s.expiry = null;
          }

          safeStorage.set("cc_token", a.payload.token);
          safeStorage.set("cc_user", JSON.stringify(s.user));
          if (s.expiry) {
            safeStorage.set("cc_expiry", s.expiry.toString());
          } else {
            safeStorage.remove("cc_expiry");
          }
        }
      })
      .addCase(loginWithGoogle.rejected, (s, a) => {
        s.loading = false;
        s.error = (a.payload as string) || "Google login failed";
      });
  },
});

export const { setCredentials, hydrateFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
