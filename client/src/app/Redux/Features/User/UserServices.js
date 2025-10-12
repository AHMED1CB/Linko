import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import utils from "../../../Api/utils";



export const getByUsername = createAsyncThunk('user/getByName', async (username, { rejectWithValue }) => {


    try {
        const response = await axios.get(utils.server.paths.getRequestPath('user', username));

        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }

})