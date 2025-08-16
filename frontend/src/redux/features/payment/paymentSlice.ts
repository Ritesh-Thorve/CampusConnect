import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaymentStatus } from "@/api/paymentApi";

interface PaymentState {
  hasPaid: boolean;
  loading: boolean;
}

const initialState: PaymentState = {
  hasPaid: false,
  loading: true,
};

// Fetch payment status from backend
export const fetchPaymentStatus = createAsyncThunk(
  "payment/fetchStatus",
  async () => {
    const res = await getPaymentStatus();
    return res?.status === "paid"; 
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    markPaid: (state) => {
      state.hasPaid = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.hasPaid = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaymentStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { markPaid } = paymentSlice.actions;
export default paymentSlice.reducer;
