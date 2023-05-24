import { createSlice } from '@reduxjs/toolkit'
import { getAllConcursosAsync, getConcursoAsync, postParticipanteConcursoAsync, postConcursoAsync, deleteConcursoAsync, getConcursosWinnersAsync, patchWinnerConcursoAsync } from './concursoThunk'

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
    ganadores: [],
    loading: '',
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

            // .addCase(getConcursoAsync.pending, (state, action)=>{
            //     state.statusMessage = 'pendingConcurso'
            //     state.loading = true
            // })
            // .addCase(getConcursoAsync.fulfilled, (state, action)=>{
            //     console.log(action.payload.data)
            //     state.statusMessage = 'fulfilledConcurso'
            //     state.loading = false
            // })
            // .addCase(getConcursoAsync.rejected, (state, action)=>{
            //     state.statusMessage = 'rejectedConcurso'
            //     state.loading = false
            // })

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