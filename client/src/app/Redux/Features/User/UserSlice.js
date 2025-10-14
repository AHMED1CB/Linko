import { createSlice } from "@reduxjs/toolkit";
import { getByUsername } from "./UserServices";

const UserSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        status: "Loading"
    },
    reducers: {

    },
    extraReducers: (b) => {
        b.addCase(getByUsername.pending, (state, action) => {
            state.status = "Loading"
        })
        b.addCase(getByUsername.fulfilled, (state, action) => {
            state.user = action?.payload?.data?.user || null
            state.status = "Success"
        })
        b.addCase(getByUsername.rejected, (state) => {
            state.status = "Fail"
            state.user = null
        })
    }

})
export default UserSlice