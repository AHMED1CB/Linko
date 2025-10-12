import { createSlice } from "@reduxjs/toolkit";
import { getByUsername } from "./UserServices";

const UserSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: 0
    },
    reducers: {

    },
    extraReducers: (b) => {
        b.addCase(getByUsername.rejected, (state) => {
            state.status = 400
            state. user= null
        }).addCase(getByUsername.fulfilled, (state, action) => {
            state.user = action.payload.data.user
            state.status = 200
        })
    }

})
export default UserSlice