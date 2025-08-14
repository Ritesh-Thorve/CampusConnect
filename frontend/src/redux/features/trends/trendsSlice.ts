import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as trendsApi from '@/api/trendsApi';

interface Trend {
  id: string;
  title: string;
  description: string;
  tag: string;
}

interface TrendsState {
  trends: Trend[];
  loading: boolean;
  error: string | null;
}

const initialState: TrendsState = {
  trends: [],
  loading: false,
  error: null,
};

// Fetch trends
export const getTrends = createAsyncThunk(
  'trends/getTrends',
  async (_, { rejectWithValue }) => {
    try {
      return await trendsApi.fetchTrends();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add new trend
export const addTrend = createAsyncThunk(
  'trends/addTrend',
  async (trendData: { title: string; description: string; tag: string }, { rejectWithValue }) => {
    try {
      return await trendsApi.createTrend(trendData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const trendsSlice = createSlice({
  name: 'trends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch trends
      .addCase(getTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.trends = action.payload;
      })
      .addCase(getTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add trend
      .addCase(addTrend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.trends.push(action.payload.trend);
      })
      .addCase(addTrend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default trendsSlice.reducer;
