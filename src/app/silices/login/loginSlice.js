import { createSlice } from '@reduxjs/toolkit'
import { postLoginAsync } from './loginThunk'
import { isExpired , decodeToken } from "react-jwt";

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
                const isMyTokenExpired = isExpired(action.payload.data.jwt)

                if(isMyTokenExpired){
                    state.token = ''
                    state.id = ''
                    state.role = ''
                } else{
                    state.token = action.payload.data.jwt
                    state.id = myDecodedToken.userid
                    state.role = myDecodedToken.role
                }

                state.expiredToken = isMyTokenExpired
                state.statusMessage = 'fulfilled'
                state.loading = false
            })
            .addCase(postLoginAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejected'
                state.redirect = true
                state.loading = false
            })
    }
})

export const { setRefreshState, setRedirectLogin } = loginSlice.actions

export default loginSlice.reducer