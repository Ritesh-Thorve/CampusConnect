import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaymentStatus } from "../../../api/paymentApi";

interface PaymentState {
  hasPaid: boolean;
  status: "paid" | "created" | "unpaid";
  amount: number | null;
  createdAt: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  hasPaid: false,   
  status: "unpaid",
  amount: null,
  createdAt: null,
  loading: false,
  error: null,
};

// Async thunk to fetch payment status
export const fetchPaymentStatus = createAsyncThunk<
  { hasPaid: boolean; status: "paid" | "created" | "unpaid"; amount?: number; createdAt?: string }
>(
  "payment/fetchStatus",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getPaymentStatus();
      return result; // full object from API
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
      state.hasPaid = true;
      state.status = "paid";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.hasPaid = action.payload.hasPaid;
        state.status = action.payload.status;
        state.amount = action.payload.amount ?? null;
        state.createdAt = action.payload.createdAt ?? null;
        state.loading = false;
      })
      .addCase(fetchPaymentStatus.rejected, (state, action) => {
        state.hasPaid = false;
        state.status = "unpaid";
        state.amount = null;
        state.createdAt = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { markPaid } = paymentSlice.actions;
export default paymentSlice.reducer;
