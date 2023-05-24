import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllConcursos, getConcurso, postParticipanteConcurso, postConcurso, deleteConcurso, getConcursosWinners, patchWinnerConcurso, getConcursosOyente, getParticipantesEnConcursos } from "./concursoApi";

export const getAllConcursosAsync = createAsyncThunk(
    'concursos/getAllConcursos',
    async (args) => {
        const { token } = args
        const response = await getAllConcursos(token);
        return response;
    }
);

export const getConcursoAsync = createAsyncThunk(
    'concursos/getAllConcursos',
    async (args) => {
        const { token, idUser } = args
        const response = await getConcurso(token, idUser);
        return response;
    }
);

export const getConcursosWinnersAsync = createAsyncThunk(
    'concursos/getConcursosWinners',
    async (args) => {
        const { token } = args
        const response = await getConcursosWinners(token);
        return response;
    }
);

export const getConcursosOyenteAsync = createAsyncThunk(
    'concursos/getConcursosOyente',
    async (args) => {
        const { token, idUsuario } = args
        const response = await getConcursosOyente(token, idUsuario);
        return response;
    }
);

export const getParticipantesEnConcursosAsync = createAsyncThunk(
    'concursos/getParticipantesEnConcursos',
    async (args) => {
        const { token } = args
        const response = await getParticipantesEnConcursos(token);
        return response;
    }
);

export const postParticipanteConcursoAsync = createAsyncThunk(
    'concursos/postParticipanteConcurso',
    async (args) => {
        const { body, token } = args
        const response = await postParticipanteConcurso(body, token);
        return response;
    }
);

export const postConcursoAsync = createAsyncThunk(
    'concursos/postConcurso',
    async (args) => {
        const { body, token } = args
        const response = await postConcurso(body, token);
        return response;
    }
);

export const patchWinnerConcursoAsync = createAsyncThunk(
    'concursos/patchWinnerConcurso',
    async (args) => {
        const { body, token } = args
        const response = await patchWinnerConcurso(body, token);
        return response;
    }
);

export const deleteConcursoAsync = createAsyncThunk(
    'concursos/deleteConcurso',
    async (args) => {
        const { token, idConcurso } = args
        const response = await deleteConcurso(token, idConcurso);
        return response;
    }
);