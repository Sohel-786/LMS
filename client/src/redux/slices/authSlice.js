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

export const login = createAsyncThunk('auth/signin', async (data) => {
    try {
        const res = axiosInstance.post('/user/login', data);
        toast.promise(res, {
            loading : 'Wait! Authenticating Your Account',
            success : 'You are successfully Logged In',
            error : 'Login Failed'
        })
        
        return await res;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const res = axiosInstance.get('/user/logout');
        toast.promise(res, {
            loading : 'Wait! Logging Out Your Account',
            success : 'You are successfully Logged Out',
            error : 'Failed to logout your account'
        })
        
        return await res;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.data?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.data?.user?.role);
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.user?.role;
            state.data = action?.payload?.data?.user;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.role = '';
            state.data = {};
        })
    }
});

export default authSlice.reducer;