import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseSlice from "./slices/courseSlice";
import paymentSlice from "./slices/paymentSlice";
import lectureSlice from "./slices/lectureSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseSlice,
    payment: paymentSlice,
    lectures: lectureSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
