import { createSlice } from '@reduxjs/toolkit'
import { opcionesGenero, opcionesOcupacion } from '../../../utils/constantes'
import { getProvincias } from '../../../services/provincias'
import { getLocalidades } from '../../../services/localidades'

const initialState = {
    provincias: getProvincias(),
    localidades: ['Seleccione una Provincia'],
    generos: opcionesGenero,
    ocupaciones: opcionesOcupacion,
    nombreSeleccionado: '',
    emailSeleccionado: '',
    nacimientoSeleccionado: '',
    dniSeleccionado: '',
    contraseñaSeleccionada: '',
    provinciaSeleccionada: '',
    localidadSeleccionada: '',
    generoSeleccionado: '',
    ocupacionSeleccionada: '',
    loading: '',
    mensajeRespuesta: ''
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
        setNombre: (state, action) => {
            state.nombreSeleccionado = action.payload
        },
        setEmail: (state, action) => {
            state.emailSeleccionado = action.payload
        },
        setNacimiento: (state, action) => {
            state.nacimientoSeleccionado = action.payload
        },
        setDni: (state, action) => {
            state.dniSeleccionado = action.payload
        },
        setContraseña: (state, action) => {
            state.contraseñaSeleccionada = action.payload
        },
        setAllLocalidades: (state, action) => {
            const localidades = getLocalidades(action.payload)
            state.localidades = localidades
        },
        setRefreshState: (state) =>{
            return initialState
        }
    },
})

export const { setProvincia, setGenero, setOcupacion, setLocalidad, setAllLocalidades, setRefreshState, setNombre, setEmail, setNacimiento, setDni, setContraseña } = registroSlice.actions

export default registroSlice.reducer