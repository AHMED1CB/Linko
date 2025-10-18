import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import utils from "../../../Api/utils";
import Cookie from "../../../Helpers/Cookie";


export const sendRequest = createAsyncThunk('user/sendFriendRequest', async (targetUser, { rejectWithValue }) => {

    try {

        const response = await axios.post(utils.server.paths.getRequestPath('requests', targetUser, 'send'), {}, {
            headers: {
                Authorization: Cookie.get('authorization')
            }
        })

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }

})


