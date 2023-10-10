import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseSlice from "./slices/courseSlice";
import paymentSlice from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseSlice,
    payment : paymentSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
