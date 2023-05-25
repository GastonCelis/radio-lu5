import { createAsyncThunk } from "@reduxjs/toolkit"
import { postClave, postClaveEmail, postVerificacion } from "./claveApi";

export const postClaveAsync = createAsyncThunk(
    'clave/postClave',
    async (args) => {
        const { body } = args
        const response = await postClave(body);
        return response;
    }
);

export const postClaveEmailAsync = createAsyncThunk(
    'clave/postClaveEmail',
    async (args) => {
        const { email } = args
        const response = await postClaveEmail(email);
        return response;
    }
);

export const postVerificacionAsync = createAsyncThunk(
    'clave/postVerificacion',
    async (args) => {
        const { body } = args
        const response = await postVerificacion(body);
        return response;
    }
);