import { createSlice } from '@reduxjs/toolkit'
import { postClaveAsync, postClaveEmailAsync, postVerificacionAsync } from './claveThunk'

const initialState = {
    statusMessageClave: '',
    loadingClave: false
}

export const claveSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setRefreshState: () => initialState,
        setStatusMessageClave: (state, action)=>{
            state.statusMessageClave = action.payload
        },
        setLoadingClave: (state, action)=>{
            state.loadingClave = action.payload
        }
    },

    extraReducers: builder =>{
        builder
            .addCase(postClaveAsync.pending, (state)=>{
                state.statusMessageClave = 'pendingClave'
                state.loadingClave = true
            })
            .addCase(postClaveAsync.fulfilled, (state)=>{
                state.statusMessageClave = 'fulfilledClave'
                state.loadingClave = false
            })
            .addCase(postClaveAsync.rejected, (state)=>{
                state.statusMessageClave = 'rejectedClave'
                state.loadingClave = false
            })

            .addCase(postClaveEmailAsync.pending, (state)=>{
                state.statusMessageClave = 'pendingEmail'
                state.loadingClave = true
            })
            .addCase(postClaveEmailAsync.fulfilled, (state, action)=>{
                state.statusMessageClave = 'fulfilledEmail'
                state.loadingClave = false
            })
            .addCase(postClaveEmailAsync.rejected, (state, action)=>{
                state.statusMessageClave = 'rejectedEmail'
                state.loadingClave = false
            })

            .addCase(postVerificacionAsync.pending, (state)=>{
                state.statusMessageClave = 'pendingVerificacion'
                state.loadingClave = true
            })
            .addCase(postVerificacionAsync.fulfilled, (state)=>{
                state.statusMessageClave = 'fulfilledVerificacion'
                state.loadingClave = false
            })
            .addCase(postVerificacionAsync.rejected, (state)=>{
                state.statusMessageClave = 'rejectedVerificacion'
                state.loadingClave = false
            })
    }
})

export const { setRefreshState, setStatusMessageClave, setLoadingClave } = claveSlice.actions

export default claveSlice.reducer