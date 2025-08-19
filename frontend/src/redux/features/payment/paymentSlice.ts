import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaymentStatus } from "../../../api/paymentApi";

interface PaymentState {
  hasPaid: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  hasPaid: false,  // default unpaid
  loading: false,
  error: null,
};

// Async thunk to fetch payment status
export const fetchPaymentStatus = createAsyncThunk<boolean>(
  "payment/fetchStatus",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getPaymentStatus();
      return result.hasPaid; // always boolean
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch payment status");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    markPaid: (state) => {
      state.hasPaid = true; // manually mark paid after Razorpay success
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
        state.hasPaid = false; // fallback to unpaid
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { markPaid } = paymentSlice.actions;
export default paymentSlice.reducer;
