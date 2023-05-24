import { createSlice } from '@reduxjs/toolkit'
import { postLoginAsync } from './loginThunk'
import { decodeToken } from "react-jwt";
import getHours from 'date-fns/getHours'
import differenceInHours from 'date-fns/differenceInHours'

const initialState = {
    token: '',
    id: '',
    expiredToken: '',
    role: '',
    redirect: true,
    statusMessage: '',
    loading: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setRefreshState: () => initialState,
        setRedirectLogin: (state, action) =>{
            state.redirect = action.payload
        },
        setToken: (state, action)=>{
            state.token = action.payload
        },
        setExpiredToken: (state, action)=>{
            state.expiredToken = action.payload
        },
        setId: (state, action)=>{
            state.id = action.payload
        },
        setStatusMessageLogin: (state, action)=>{
            state.statusMessage = action.payload
        }
    },

    extraReducers: builder =>{
        builder
            .addCase(postLoginAsync.pending, (state)=>{
                state.statusMessage = 'pending'
                state.loading = true
            })
            .addCase(postLoginAsync.fulfilled, (state, action)=>{
                const myDecodedToken = decodeToken(action.payload.data.jwt)
                const isMyTokenExpired = getHours(new Date())

                state.token = action.payload.data.jwt
                state.id = myDecodedToken.userid
                state.role = myDecodedToken.role
                state.expiredToken = isMyTokenExpired
                state.statusMessage = 'fulfilled'
                state.loading = false
            })
            .addCase(postLoginAsync.rejected, (state, action)=>{
                const vencimientoToken = differenceInHours(state.expiredToken, new Date())
                if(vencimientoToken === 6){
                    state.statusMessage = 'rejectedToken'
                }else{
                    state.statusMessage = 'rejected'
                }
                state.redirect = true
                state.loading = false
            })
    }
})

export const { setRefreshState, setRedirectLogin, setStatusMessageLogin } = loginSlice.actions

export default loginSlice.reducer