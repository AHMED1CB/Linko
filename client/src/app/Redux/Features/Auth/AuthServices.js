import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import utils from "../../../Api/utils";
import Cookie from "../../../Helpers/Cookie";

const RegisterUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {

        const response = await axios.post(utils.server.paths.getRequestPath('register'), data);
        return response.data
    } catch (err) {
        return rejectWithValue(err)
    }

})


const LoginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {

        const response = await axios.post(utils.server.paths.getRequestPath('login'), data);
        Cookie.set('authorization', response.data.data.token, 2); // Set Auth Cookie
        return response.data
    } catch (err) {
        return rejectWithValue(err)
    }

})



const GetUserProfile = createAsyncThunk('auth/profile', async (_, { rejectWithValue }) => {
    try {

        const authToken = Cookie.get('authorization');
        const response = await axios.get(utils.server.paths.getRequestPath('profile'), {
            headers: {
                Authorization: authToken
            }
        });
        return response.data
    } catch (err) {
        return rejectWithValue(err)
    }

})




export { RegisterUser, LoginUser, GetUserProfile }