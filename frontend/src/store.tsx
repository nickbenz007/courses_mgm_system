import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import coursesReducer from "./slices/courseSlice";
import teachersReducer from "./slices/teachersSlice";
import { apiSlice } from "./slices/apiSlice";
import { coursesApiSlice } from "./slices/coursesApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    teachers: teachersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [coursesApiSlice.reducerPath]: coursesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      coursesApiSlice.middleware,
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
