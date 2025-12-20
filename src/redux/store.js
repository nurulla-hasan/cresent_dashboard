import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./feature/baseApi";
import authReducer from "./feature/auth/authSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});