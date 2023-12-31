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

export const createCourse = createAsyncThunk(
  "/course/createCourse",
  async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("createdBy", data.createdBy);
    formData.append("thumbnail", data.thumbnail);

    try {
      const res = axiosInstance.post("/courses/", formData);
      toast.promise(res, {
        loading: "Wait! Creating Course",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Create Course",
      });

      return (await res).data;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
);

export const deleteCourse = createAsyncThunk('/course/delete' , async (id) => {
  try {
      const res = axiosInstance.delete(`/courses/${id}`);
      toast.promise(res, {
        loading : 'Wait, Deleting the selected course',
        success : (data) => {
          return data?.data?.message;
        },
        error: 'Failed to delete the course'
      });

      return (await res).data;
  } catch (e){
    toast.error(e?.response?.data?.message);
  }
});

export const updateCourse = createAsyncThunk('/course/update', async (data) => {
  
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("createdBy", data.createdBy);
  formData.append("thumbnail", data.thumbnail);

  console.log('data', data, formData);
  try {
    const res = axiosInstance.put(`/courses/${data._id}`, formData);
    toast.promise(res, {
      loading : 'Wait, Updating selected Course',
      success : (data) => {
        return data?.data?.message;
      },
      error : 'Failed to update the course'
    });

    return (await res).data;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.courseData = action?.payload;
    });
  },
});

export default courseSlice.reducer;
