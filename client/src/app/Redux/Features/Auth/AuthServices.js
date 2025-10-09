import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import utils from "../../../Api/utils";
const RegisterUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {

        const response = await axios.post(utils.server.paths.getRequestPath('register'), data);
        return response.data
    } catch (err) {
        return rejectWithValue(err)
    }

})


export { RegisterUser }