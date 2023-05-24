import { createAsyncThunk } from "@reduxjs/toolkit"
import {getUserGoogle, getUser, putUser, getAllUsers} from './usuarioApi'

export const getUserGoogleAsync = createAsyncThunk(
    'user/getUserGoogle',
    async (args) => {
        const { token } = args
        const response = await getUserGoogle(token);
        return response;
    }
);

export const getUserAsync = createAsyncThunk(
    'user/getUser',
    async (args) => {
        const { token, idUser } = args
        const response = await getUser(token, idUser);
        return response
    }
);

export const getAllUsersAsync = createAsyncThunk(
    'user/getAllUsers',
    async (args) => {
        const { token } = args
        const response = await getAllUsers(token);
        return response
    }
);

export const putUserAsync = createAsyncThunk(
    'user/putUser',
    async (args) => {
        const { token, idUser, body } = args
        const response = await putUser(token, idUser, body);
        return response
    }
);