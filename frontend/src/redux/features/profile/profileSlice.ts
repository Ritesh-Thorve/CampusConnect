import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProfile, saveProfile } from "@/api/profileApi";

// Type for server profile data (adjust to match your backend)
export type Profile = {
  id?: string;
  userId?: string;
  fullname?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Type for sending profile updates (could be partial)
import type { ProfileData } from "@/api/profileApi";
export type ProfilePayload = Partial<ProfileData>;

type ProfileState = {
  data: Profile | null;
  loading: { fetch: boolean; save: boolean };
  error: { fetch: string | null; save: string | null };
};

const initialState: ProfileState = {
  data: null,
  loading: { fetch: false, save: false },
  error: { fetch: null, save: null }
};

// Fetch profile
export const fetchProfile = createAsyncThunk<Profile, void, { rejectValue: string }>(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfile();
    } catch (e: any) {
      return rejectWithValue(
        e?.response?.data?.error || e?.message || "Failed to fetch profile"
      );
    }
  }
);

export const saveOrUpdateProfile = createAsyncThunk<Profile, ProfilePayload, { rejectValue: string }>(
  "profile/saveOrUpdate",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await saveProfile(payload as ProfileData);
      return res;
    } catch (e: any) {
      return rejectWithValue(
        e?.response?.data?.error || e?.message || "Failed to save profile"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = { fetch: null, save: null };
    }
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading.fetch = true;
      state.error.fetch = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
      state.loading.fetch = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading.fetch = false;
      state.error.fetch = action.payload || "Failed to fetch profile";
    });

    // Save profile
    builder.addCase(saveOrUpdateProfile.pending, (state) => {
      state.loading.save = true;
      state.error.save = null;
    });
    builder.addCase(saveOrUpdateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
      state.loading.save = false;
      // Merge in case backend returns only updated fields
      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(saveOrUpdateProfile.rejected, (state, action) => {
      state.loading.save = false;
      state.error.save = action.payload || "Failed to save profile";
    });
  }
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
