import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import utils from "../../../Api/utils";
import Cookie from "../../../Helpers/Cookie";


export const getFriendDetails = createAsyncThunk('friend/getDetails', async (id, { rejectWithValue }) => {

    try {

        const response = await axios.get(utils.server.paths.getRequestPath('friend', id), {
            headers: {
                Authorization: Cookie.get('authorization')
            }
        });


        return response.data;
    } catch (error) {
        return rejectWithValue(error)
    }

})