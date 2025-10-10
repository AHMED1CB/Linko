import { createSlice } from "@reduxjs/toolkit";
import { GetUserProfile } from "./AuthServices";
import Cookie from "../../../Helpers/Cookie";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
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
                }else{
                    alert('Something Went Wrong Please Try Again Later')
                    location.reload()
                }
            })

    }

})
export default AuthSlice