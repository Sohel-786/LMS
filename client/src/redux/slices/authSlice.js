import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || '',
    data : localStorage.getItem('data') || {}   
}

export const createUser = createAsyncThunk('auth/register', async (data) => {
    try {
        const res = await axiosInstance.post('/user/register', data);
        console.log(res);
        if(res?.data?.success){
            toast.success('Congratulation, Your Account Got created Successfully');
        }
       
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {}
});

export default authSlice.reducer;