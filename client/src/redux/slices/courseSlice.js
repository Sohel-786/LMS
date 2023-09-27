import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk(
  "/course/getAllCourses",
  async () => {
    try {
      const res = axiosInstance.get("/courses/");
      toast.promise(res, {
        loading: "Wait! Fetching all courses",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to load courses",
      });

      return (await res).data.courses;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.courseData = action.payload;
    });
  },
});

export default courseSlice.reducer;
