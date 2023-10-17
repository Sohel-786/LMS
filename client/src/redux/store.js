import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseSlice from "./slices/courseSlice";
import paymentSlice from "./slices/paymentSlice";
import lectureSlice from "./slices/lectureSlice";
import statsSlice from "./slices/statsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseSlice,
    payment: paymentSlice,
    lectures: lectureSlice,
    stat: statsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
