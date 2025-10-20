import { createSlice } from "@reduxjs/toolkit";
import { GetUserProfile, UpdateUserProfile } from "./AuthServices";
import Cookie from "../../../Helpers/Cookie";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "Loading"
    },
    reducers: {

    },
    extraReducers: (b) => {
        b.addCase(GetUserProfile.fulfilled, (state, action) => {
            state.user = action.payload.data.user
        })
            .addCase(GetUserProfile.rejected, (state, action) => {
                if (action.payload.request.status === 401) {
                    Cookie.delete('authorization');
                    location.href = '/auth/login'
                } else {
                    alert('Something Went Wrong Please Try Again Later')
                    location.reload()
                }
            })

        b.addCase(UpdateUserProfile.fulfilled, (state, action) => {
            state.user = { ...state.user, ...action.payload.data.user };
            state.error = null
        })

    }

})
export default AuthSlice