import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaymentStatus } from "@/api/paymentApi";

// Async thunk to fetch payment status
export const fetchPaymentStatus = createAsyncThunk(
  "payment/fetchStatus",
  async () => {
    const res = await getPaymentStatus();
    return res.status; // "paid" | "unpaid" | "guest"
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    hasPaid: false,
    loading: false,
    status: "guest" as "guest" | "paid" | "unpaid",
  },
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
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
        state.hasPaid = action.payload === "paid";
      })
      .addCase(fetchPaymentStatus.rejected, (state) => {
        state.loading = false;
        state.status = "unpaid"; // fallback
        state.hasPaid = false;
      });
  },
});

export const { markPaid } = paymentSlice.actions;
export default paymentSlice.reducer;
