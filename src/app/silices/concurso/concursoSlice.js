import { createSlice } from '@reduxjs/toolkit'
import { getAllConcursosAsync, postParticipanteConcursoAsync, postConcursoAsync, deleteConcursoAsync, getConcursosWinnersAsync, patchWinnerConcursoAsync, getConcursosOyenteAsync, getParticipantesEnConcursosAsync } from './concursoThunk'

const initialState = {
    concursos: [],
    nuevoConcurso: {
        title: '',
        description: '',
        image: '',
        end_date: '',
        advertiser: '',
        program: '',
        banner_image: '',
        aditional_information: ''
    },
    cantidadParticipantes: [],
    ganadores: [],
    concursosOyente: [],
    loading: false,
    statusMessage: ''
}

export const concursoSlice = createSlice({
    name: 'concurso',
    initialState,
    reducers: {
        setNuevoConcurso: (state, action) =>{
            state.nuevoConcurso = {...state.nuevoConcurso, ...action.payload}
        },
        setRefreshState: () => initialState,
        setRefreshNuevoConcurso: (state, action)=>{
            state.nuevoConcurso = {
                title: '',
                description: '',
                image: '',
                end_date: '',
                advertiser: '',
                program: '',
                banner_image: '',
                aditional_information: ''
            }
        },
        setStatusMessage: (state, action) =>{
            state.statusMessage = action.payload
        }
    },

    extraReducers: builder =>{
        builder
            .addCase(getAllConcursosAsync.pending, (state, action)=>{
                state.statusMessage = 'pendingAllConcursos'
                state.loading = true
            })
            .addCase(getAllConcursosAsync.fulfilled, (state, action)=>{
                state.concursos = action.payload.data.data
                state.statusMessage = 'fulfilledAllConcursos'
                state.loading = false
            })
            .addCase(getAllConcursosAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedAllConcursos'
                state.loading = false
            })

            .addCase(getConcursosWinnersAsync.pending, (state, action)=>{
                state.statusMessage = 'pendingConcursosWinners'
                state.loading = true
            })
            .addCase(getConcursosWinnersAsync.fulfilled, (state, action)=>{
                state.ganadores = action.payload.data.data
                state.statusMessage = 'fulfilledConcursosWinners'
                state.loading = false
            })
            .addCase(getConcursosWinnersAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedConcursosWinners'
                state.loading = false
            })

            .addCase(getConcursosOyenteAsync.pending, (state, action)=>{
                state.statusMessage = 'pendingConcursosOyente'
                state.loading = true
            })
            .addCase(getConcursosOyenteAsync.fulfilled, (state, action)=>{
                state.concursosOyente = action.payload.data.data
                state.statusMessage = 'fulfilledConcursosOyente'
                state.loading = false
            })
            .addCase(getConcursosOyenteAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedConcursosOyente'
                state.loading = false
            })

            .addCase(getParticipantesEnConcursosAsync.pending, (state, action)=>{
                state.statusMessage = 'pendingCantidadParticipantes'
                state.loading = true
            })
            .addCase(getParticipantesEnConcursosAsync.fulfilled, (state, action)=>{
                state.cantidadParticipantes = action.payload.data.data
                state.statusMessage = 'fulfilledCantidadParticipantes'
                state.loading = false
            })
            .addCase(getParticipantesEnConcursosAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedCantidadParticipantes'
                state.loading = false
            })

            .addCase(postParticipanteConcursoAsync.pending, (state, action)=>{
                state.statusMessage = 'pendingParticipanteConcurso'
                state.loading = true
            })
            .addCase(postParticipanteConcursoAsync.fulfilled, (state, action)=>{
                state.statusMessage = 'fulfilledParticipanteConcurso'
                state.loading = false
            })
            .addCase(postParticipanteConcursoAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedParticipanteConcurso'
                state.loading = false
            })

            .addCase(postConcursoAsync.pending, (state, action)=>{
                state.statusMessage = 'pendingPostConcurso'
                state.loading = true
            })
            .addCase(postConcursoAsync.fulfilled, (state, action)=>{
                state.statusMessage = 'fulfilledPostConcurso'
                state.loading = false
            })
            .addCase(postConcursoAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedPostConcurso'
                state.loading = false
            })

            .addCase(patchWinnerConcursoAsync.pending, (state, action)=>{
                state.statusMessage = 'pendingPatchWinner'
                state.loading = true
            })
            .addCase(patchWinnerConcursoAsync.fulfilled, (state, action)=>{
                state.statusMessage = 'fulfilledPatchWinner'
                state.loading = false
            })
            .addCase(patchWinnerConcursoAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedPatchWinner'
                state.loading = false
            })

            .addCase(deleteConcursoAsync.pending, (state, action)=>{
                state.statusMessage = 'pendingDeleteConcurso'
                state.loading = true
            })
            .addCase(deleteConcursoAsync.fulfilled, (state, action)=>{
                state.statusMessage = 'fulfilledDeleteConcurso'
                state.loading = false
            })
            .addCase(deleteConcursoAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedDeleteConcurso'
                state.loading = false
            })
    }
})

export const { setRefreshState, setNuevoConcurso, setRefreshNuevoConcurso, setStatusMessage } = concursoSlice.actions

export default concursoSlice.reducer