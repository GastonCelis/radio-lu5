import { createAsyncThunk } from "@reduxjs/toolkit"
import { postLogin } from "./loginApi";

export const postLoginAsync = createAsyncThunk(
    'login/postLogin',
    async (args) => {
        const {email, password} = args
        const response = await postLogin(email, password);
        return response
    }
);