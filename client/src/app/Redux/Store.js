import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Features/Auth/AuthSlice";
import UserSlice from "./Features/User/UserSlice";
import FriendsSlice from "./Features/Friends/FriendsSlice";

export const Store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        users: UserSlice.reducer,
        friends: FriendsSlice.reducer
    }
})