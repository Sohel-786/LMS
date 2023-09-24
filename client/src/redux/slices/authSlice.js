import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || '',
    data : localStorage.getItem('data') || {}   
}

export const createUser = createAsyncThunk('auth/signup', async (data) => {
    try {
        const res = axiosInstance.post('/user/register', data);
        toast.promise(res, {
            loading : 'Wait! Creating your account',
            success : 'Congratulations, Your Account Got Created',
            error : 'Failed to create your account'
        })
        
        return await res;
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