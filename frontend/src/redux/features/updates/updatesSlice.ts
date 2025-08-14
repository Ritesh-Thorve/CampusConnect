// src/features/updates/updatesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Update, createUpdateApi, getAllUpdatesApi, getUserUpdatesApi } from '../../../api/updatesApi';

// Async thunks
export const createUpdate = createAsyncThunk('updates/create', async (data: Omit<Update, 'id' | 'userId' | 'createdAt'>) => {
  return await createUpdateApi(data);
});

export const fetchAllUpdates = createAsyncThunk('updates/fetchAll', async () => {
  return await getAllUpdatesApi();
});

export const fetchUserUpdates = createAsyncThunk('updates/fetchUser', async () => {
  return await getUserUpdatesApi();
});

// Slice state type
interface UpdatesState {
  updates: Update[];
  userUpdates: Update[];
  loading: boolean;
  error: string | null;
}

const initialState: UpdatesState = {
  updates: [],
  userUpdates: [],
  loading: false,
  error: null,
};

const updatesSlice = createSlice({
  name: 'updates',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create update
    builder.addCase(createUpdate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUpdate.fulfilled, (state, action: PayloadAction<Update>) => {
      state.loading = false;
      state.userUpdates.unshift(action.payload);
      state.updates.unshift(action.payload);
    });
    builder.addCase(createUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create update';
    });

    // Fetch all updates
    builder.addCase(fetchAllUpdates.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUpdates.fulfilled, (state, action: PayloadAction<Update[]>) => {
      state.loading = false;
      state.updates = action.payload;
    });
    builder.addCase(fetchAllUpdates.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch updates';
    });

    // Fetch user updates
    builder.addCase(fetchUserUpdates.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserUpdates.fulfilled, (state, action: PayloadAction<Update[]>) => {
      state.loading = false;
      state.userUpdates = action.payload;
    });
    builder.addCase(fetchUserUpdates.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch your updates';
    });
  },
});

export const { clearError } = updatesSlice.actions;
export default updatesSlice.reducer;
