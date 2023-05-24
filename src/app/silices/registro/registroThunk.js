import { createAsyncThunk } from "@reduxjs/toolkit"
import { postRegister } from "./registroApi";

export const postRegisterAsync = createAsyncThunk(
    'register/postRegister',
    async (args) => {
        const response = await postRegister(args);
        return response
    }
);