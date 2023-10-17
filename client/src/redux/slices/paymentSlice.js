import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

export const getRazorpayId = createAsyncThunk("/payment/getId", async () => {
  try {
    const res = await axiosInstance.get("/payments/razorpay-key");
    return res.data;
  } catch (err) {
    toast.error("Failed to load Data");
  }
});

export const purchaseCourseBundle = createAsyncThunk("/paymentpurchaseCourse",
  async () => {
    try {
      const res = axiosInstance.post("/payments/subscribe");
      toast.promise(res, {
        loading : 'Wait'
      })
      return (await res).data;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "/payment/verify",
  async (data) => {
    try {
      const res = await axiosInstance.post("/payments/verify", data);
      return res;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
);

export const cancelSubscription = createAsyncThunk('payment/cancelSubscription', async () => {
  try {
    const res = axiosInstance.get("/payments/unsubscribe");
    toast.promise(res, {
      loading : 'Wait, Canceling Subscription',
      success : (data) => {
        return data?.data?.message;
      },
      error : 'Unable to Unsubscribe'
    })

    return (await res).data;
    
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});

export const getPaymentRecords = createAsyncThunk('/payment/records', async () => {
  try {
     const res = axiosInstance.get('/payments?count=100');
     toast.promise(res, {
      loading : 'Getting Payment Records',
      success : (data) => {
        return data?.data?.message
      },
      error : 'Failed to get payment records'
     })
     
     return (await res).data;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
})

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        toast.error(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecords.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        state.finalMonths = action?.payload?.finalMonths;
      })
  },
});

export default paymentSlice.reducer;
