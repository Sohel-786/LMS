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
});

export const addCourseLecture = createAsyncThunk('/course/addlecture', async (data) =>{
    try {   
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('lecture', data.lecture);

            const res = axiosInstance.post(`/courses/${data.id}`, formData);
            toast.promise(res, {
                loading : 'Wait, Adding Lecture to Course',
                success : (data) => {
                    return data?.data?.message;
                },
                error : 'Failed to Add Lecture'
            })
            return (await res).data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
});

export const deleteCourseLecture = createAsyncThunk('/course/deleteLecture', async (data) => {
    try {
        const res = axiosInstance.post(`/courses/deleteLecture/${data.courseId}/${data.lectureId}`);
        toast.promise(res, {
            loading : 'Wait, Deleting selected lecture',
            success : (data) => {
                return data?.data?.message;
            },
            error : 'Enable to delete Lecture'
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
        builder
        .addCase(getCourseLectures.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
        })
        .addCase(deleteCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })
    }
})

export default lectures.reducer;