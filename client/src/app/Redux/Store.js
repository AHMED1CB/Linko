import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Features/Auth/AuthSlice";

export const Store = configureStore({
    reducer: {
        auth: AuthSlice.reducer
    }
})