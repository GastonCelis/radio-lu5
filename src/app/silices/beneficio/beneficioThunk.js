import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllBeneficios, postBeneficio, deleteBeneficio } from "./beneficioApi";

export const getAllBeneficiosAsync = createAsyncThunk(
    'beneficios/getAllBeneficios',
    async (args) => {
        const { token } = args
        const response = await getAllBeneficios(token);
        return response;
    }
);

export const postBeneficioAsync = createAsyncThunk(
    'beneficios/postBeneficio',
    async (args) => {
        const { token, body } = args
        const response = await postBeneficio(token, body);
        return response;
    }
);

export const deleteBeneficioAsync = createAsyncThunk(
    'beneficios/deleteBeneficio',
    async (args) => {
        const { token, idBeneficio } = args
        const response = await deleteBeneficio(token, idBeneficio);
        return response;
    }
);