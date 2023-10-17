import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  allUserCount: 0,
  subscriberCount: 0,
};

export const getStatsData = createAsyncThunk("stats/get", async () => {
  try {
    const res = axiosInstance.get("/admin/stats/users");
    toast.promise(res, {
      loading: "Getting the stats...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load data stats",
    });

    return (await res).data;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "stats",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUserCount = action?.payload?.allUsersCount;
      state.subscriberCount = action?.payload?.subscribedUsers;
    });
  },
});

export default statSlice.reducer;
