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

export const getRazorpayId = createAsyncThunk('/payment/getId', async () => {
    try{
        const res = await axiosInstance.get('/payments/razorpay-key')
        return res.data;
    }catch(err){
        toast.error('Failed to load Data');
    }
});

export const purchaseCourseBundle = createAsyncThunk('/paymentpurchaseCourse', async () =>{
    try {
        const res = await axiosInstance.post('/payments/subscribe');
        return res.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
});


const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>{
        builder
        .addCase(getRazorpayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled, (state,action) =>{
            state.subscription_id = action?.payload?.subscription_id;
        })
  } 
});

export default paymentSlice.reducer;
