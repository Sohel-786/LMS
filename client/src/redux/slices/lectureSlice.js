import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lectures : []
}

export const getCourseLectures = createAsyncThunk('/course/lecture/get', async (cid) =>{
    try {
        const res = axiosInstance.get(`/courses/${cid}`);
        toast.promise(res, {
            loading : 'Wait, Fetching All Lectures',
            success : (data) => {
                return data?.data?.message;
            },
            error : 'Enable to Fetch Lectures'
        })

        return (await res).data;

    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})

const lectures = createSlice({
    name : 'lectures',
    initialState : initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })
    }
})

export default lectures.reducer;