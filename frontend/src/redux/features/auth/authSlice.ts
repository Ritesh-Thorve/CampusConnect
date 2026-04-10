import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, User } from "./types";
import { signUpUser, googleAuthUser } from "@/api/auth/authApi";
import { supabaseClient } from "../../../config/supabaseClient";

// Types

interface AuthState {
  user: User | null;
  token: string | null;
  expiry: number | null;
  loading: boolean;
  error: string | null;
}

// Storage helper

const safeStorage = {
  set: (key: string, value: string) => {
    if (typeof window !== "undefined") localStorage.setItem(key, value);
  },
  get: (key: string): string | null => {
    if (typeof window !== "undefined") return localStorage.getItem(key);
    return null;
  },
  remove: (key: string) => {
    if (typeof window !== "undefined") localStorage.removeItem(key);
  },
};

// Shared utils 

/** Decode JWT expiry from payload (returns ms timestamp or null) */
const getTokenExpiry = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
};

/** Persist auth state to localStorage */
const persistAuth = (token: string, user: User, expiry: number | null) => {
  safeStorage.set("cc_token", token);
  safeStorage.set("cc_user", JSON.stringify(user));
  if (expiry) {
    safeStorage.set("cc_expiry", expiry.toString());
  } else {
    safeStorage.remove("cc_expiry");
  }
};

/** Clear all auth keys from localStorage */
const clearPersistedAuth = () => {
  safeStorage.remove("cc_token");
  safeStorage.remove("cc_user");
  safeStorage.remove("cc_expiry");
};

/** Apply a successful auth payload to the Redux state */
const applyAuthPayload = (state: AuthState, payload: AuthResponse, defaultProvider = "manual") => {
  state.user = {
    ...payload.user,
    provider: payload.user.provider || defaultProvider,
  };
  state.token = payload.token;
  state.expiry = getTokenExpiry(payload.token);
  persistAuth(state.token, state.user, state.expiry);
};

//  Initial state 

const initialState: AuthState = {
  user: null,
  token: null,
  expiry: null,
  loading: false,
  error: null,
};

//  Thunks 

/** Manual sign-up */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: { fullname: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      return await signUpUser(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Registration failed";
      return rejectWithValue((e as any)?.response?.data?.message || msg);
    }
  }
);

/**
 * Trigger Google OAuth redirect.
 * Sends user to /auth/callback (NOT /profile directly).
 */
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`, //dedicated callback
        },
      });
      if (error) throw error;
      return null;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Google login failed";
      return rejectWithValue(msg);
    }
  }
);

/**
 * Complete Google login after OAuth redirect.
 * Called from /auth/callback — exchanges Supabase session for your backend JWT.
 */
export const completeGoogleLogin = createAsyncThunk(
  "auth/completeGoogleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      if (!data.session) throw new Error("No active Google session");

      // Send only access_token — backend derives everything else
      const backendRes = await googleAuthUser(data.session.access_token);

      return backendRes as AuthResponse;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Google login failed";
      return rejectWithValue(msg);
    }
  }
);

// Slice 

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Manually set credentials (e.g. after email/password login) */
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      applyAuthPayload(state, action.payload);
      state.error = null;
    },

    /** Rehydrate auth state from localStorage on app mount */
    hydrateFromStorage: (state) => {
      try {
        const token = safeStorage.get("cc_token");
        const userRaw = safeStorage.get("cc_user");
        const expiryRaw = safeStorage.get("cc_expiry");
        const expiry = expiryRaw ? Number(expiryRaw) : null;

        // Token expired — clear everything
        if (expiry && Date.now() > expiry) {
          clearPersistedAuth();
          return; // initialState values stay (null)
        }

        state.token = token || null;
        state.user = userRaw ? JSON.parse(userRaw) : null;
        state.expiry = expiry;
      } catch {
        clearPersistedAuth();
      }
    },

    /** Log out and clear all state + storage */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiry = null;
      state.error = null;
      clearPersistedAuth();
    },
  },

  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        applyAuthPayload(state, action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Registration failed";
      })

      // Start Google login (redirect only)
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.loading = false;
        // No state change — redirect is in progress
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Google login failed";
      })

      //  Complete Google login (after callback) 
      .addCase(completeGoogleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeGoogleLogin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          applyAuthPayload(state, action.payload, "google");
        }
      })
      .addCase(completeGoogleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Google login failed";
      });
  },
});

export const { setCredentials, hydrateFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;