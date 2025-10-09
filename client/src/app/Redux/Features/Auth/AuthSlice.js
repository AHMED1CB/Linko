import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        authorizationToken: "",
    },
    reducers: {

    },
    extraReducers: (builder) => {

    }
})
export default AuthSlice