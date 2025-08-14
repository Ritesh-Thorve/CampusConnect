// src/redux/features/profiles/profilesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllProfiles } from "@/api/profileApi";
import type { ProfileData } from "@/api/profileApi";

// Type for paginated profiles
export type ProfilesPaginated = {
  total: number;
  page: number;
  totalPages: number;
  profiles: ProfileData[];
};

type ProfilesState = {
  data: ProfilesPaginated | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProfilesState = {
  data: null,
  loading: false,
  error: null
};

// Async thunk to fetch all profiles
export const fetchAllProfiles = createAsyncThunk<
  ProfilesPaginated,
  { page?: number; limit?: number; collegeName?: string; graduationYear?: number },
  { rejectValue: string }
>(
  "profiles/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getAllProfiles(params.page, params.limit, params.collegeName, params.graduationYear);
      return res;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.error || e?.message || "Failed to fetch profiles");
    }
  }
);

const profilesSlice = createSlice({
  name: "allProfiles",
  initialState,
  reducers: {
    clearProfiles: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProfiles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProfiles.fulfilled, (state, action: PayloadAction<ProfilesPaginated>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllProfiles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch profiles";
    });
  }
});

export const { clearProfiles } = profilesSlice.actions;
export default profilesSlice.reducer;
