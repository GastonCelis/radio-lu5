import { createSlice } from '@reduxjs/toolkit'
import { opcionesGenero, opcionesOcupacion } from '../../../utils/constantes'
import { getProvincias } from '../../../services/provincias'
import { getLocalidades } from '../../../services/localidades'

const initialState = {
    provincias: getProvincias(),
    localidades: ['Seleccione una Provincia'],
    generos: opcionesGenero,
    ocupaciones: opcionesOcupacion,
    provinciaSeleccionada: '',
    localidadSeleccionada: '',
    generoSeleccionado: '',
    ocupacionSeleccionada: ''
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
        }
    },
})

export const { setProvincia, setGenero, setOcupacion, setLocalidad, setAllLocalidades } = registroSlice.actions

export default registroSlice.reducer