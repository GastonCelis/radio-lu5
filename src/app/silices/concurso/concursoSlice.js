import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    concursos: [],
    nuevoConcurso: null,
    loading: '',
    mensajeRespuesta: ''
}

export const concursoSlice = createSlice({
    name: 'concurso',
    initialState,
    reducers: {
        setNuevoConcurso: (state, action) =>{
            state.nuevoConcurso = action.payload
        },
        setRefreshState: (state) =>{
            return initialState
        }
    },
})

export const { setRefreshState, setNuevoConcurso } = concursoSlice.actions

export default concursoSlice.reducer