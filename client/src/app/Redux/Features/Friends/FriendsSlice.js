import { createSlice } from "@reduxjs/toolkit";
import { getFriendDetails, searchForFriends } from "./FriendsServices";

const FriendsSlice = createSlice({
    name: "friends",
    initialState: {
        friendData: null,
        status: "Loading",
        results: []
    },
    reducers: {

    },

    extraReducers: (b) => {


        b.addCase(getFriendDetails.pending, (s, a) => {
            s.status = 'Loading'
        }).addCase(getFriendDetails.rejected, (s, a) => {
            s.status = 'Fail'
        }).addCase(getFriendDetails.fulfilled, (s, a) => {
            s.user = a.payload.data.friend ?? null
            s.status = 'Success';
        })
        b.addCase(searchForFriends.fulfilled, (s, a) => {
            s.results = a.payload.data.users;
        })


    }

})
export default FriendsSlice