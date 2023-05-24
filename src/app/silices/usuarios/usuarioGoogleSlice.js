import { createSlice } from '@reduxjs/toolkit'
import { getUserGoogleAsync } from './usuarioThunk'

const initialState = {
    profileGoogle:{
        idGoogle: '',
        email: '', 
        name: '', 
        picture: ''
    },
    statusMessage: '',
    redirect: true,
    loading: false
}

export const usuarioGoogleSlice = createSlice({
    name: 'usuarioGoogle',
    initialState,
    reducers: {
        setRefreshStateGoogle: () => initialState,
        setProfileGoogle: (state, action) =>{
            const data = action.payload
            state.profileGoogle = {...state.profileGoogle, data}
        },
        setRedirectGoogle: (state, action) =>{
            state.redirect = action.payload
        }
    },

    extraReducers: builder =>{
        builder
            .addCase(getUserGoogleAsync.pending, (state)=>{
                state.statusMessage = 'pending'
                state.loading = true
            })
            .addCase(getUserGoogleAsync.fulfilled, (state, action)=>{
                const { email, name, picture, id} = action.payload.data
                state.profileGoogle.idGoogle= id
                state.profileGoogle.email = email
                state.profileGoogle.name = name
                state.profileGoogle.picture = picture
                state.statusMessage = 'fulfilled'
                state.redirect = true
                state.loading = false
            })
            .addCase(getUserGoogleAsync.rejected, (state)=>{
                state.statusMessage = 'rejected'
                state.redirect = true
                state.loading = false
            })
    }
})

export const { setRefreshStateGoogle, setProfileGoogle, setRedirectGoogle } = usuarioGoogleSlice.actions

export default usuarioGoogleSlice.reducer