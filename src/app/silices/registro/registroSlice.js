import { createSlice } from '@reduxjs/toolkit'
import { opcionesGenero, opcionesOcupacion } from '../../../constants/index'
import { getProvincias } from '../../../services/provincias'
import { getLocalidades } from '../../../services/localidades'
import { postRegisterAsync } from './registroThunk'

const initialState = {
    provincias: getProvincias(),
    localidades: ['Seleccione una Provincia'],
    generos: opcionesGenero,
    ocupaciones: opcionesOcupacion,
    provinciaSeleccionada: '',
    localidadSeleccionada: '',
    generoSeleccionado: '',
    ocupacionSeleccionada: '',
    loading: false,
    statusMessage: ''
}

export const registroSlice = createSlice({
    name: 'registro',
    initialState,
    reducers: {
        setProvincia: (state, action) => {
            state.provinciaSeleccionada = action.payload
        },
        setGenero: (state, action) => {
            state.generoSeleccionado = action.payload
        },
        setOcupacion: (state, action) => {
            state.ocupacionSeleccionada = action.payload
        },
        setLocalidad: (state, action) => {
            state.localidadSeleccionada = action.payload
        },
        setAllLocalidades: (state, action) => {
            const localidades = getLocalidades(action.payload)
            state.localidades = localidades
        },
        setRefreshState: () => initialState
    },

    extraReducers: builder =>{
        builder
            .addCase(postRegisterAsync.pending, (state)=>{
                state.statusMessage = 'pending'
                state.loading = true
            })
            .addCase(postRegisterAsync.fulfilled, (state, action)=>{
                state.statusMessage = 'fulfilled'
                state.loading = false
            })
            .addCase(postRegisterAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejected'
                state.loading = false
            })
    }
})

export const { setProvincia, setGenero, setOcupacion, setLocalidad, setAllLocalidades, setRefreshState } = registroSlice.actions

export default registroSlice.reducer