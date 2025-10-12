import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Features/Auth/AuthSlice";
import UserSlice from "./Features/User/UserSlice";

export const Store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        users: UserSlice.reducer
    }
})