import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    beneficios: [],
    nuevoBeneficio: null,
    loading: '',
    mensajeRespuesta: ''
}

export const beneficioSlice = createSlice({
    name: 'beneficio',
    initialState,
    reducers: {
        setNuevoBeneficio: (state, action) =>{
            state.nuevoBeneficio = action.payload
        },
        setRefreshState: (state) =>{
            return initialState
        }
    },
})

export const { setRefreshState, setNuevoBeneficio } = beneficioSlice.actions

export default beneficioSlice.reducer