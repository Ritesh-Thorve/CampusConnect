import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaymentStatus } from "@/api/paymentApi";

interface PaymentState {
  hasPaid: boolean | null; // null = unknown
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  hasPaid: null,
  loading: false,
  error: null,
};

// Async thunk to fetch payment status
export const fetchPaymentStatus = createAsyncThunk(
  "payment/fetchStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPaymentStatus();
      return res?.status === "paid";
    } catch (err: any) {
      return rejectWithValue(err.message || "Error fetching payment status");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    markPaid: (state) => {
      state.hasPaid = true;
    },
    resetPayment: (state) => {
      state.hasPaid = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.hasPaid = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.hasPaid = false;
        state.error = action.payload as string;
      });
  },
});

export const { markPaid, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
