import { createSlice } from '@reduxjs/toolkit'
import { getUserAsync, putUserAsync, getAllUsersAsync } from './usuarioThunk'
import { format } from 'date-fns'

const initialState = {
    profile: {
        id: '',
        fullName: '',
        password: null,
        email: '',
        birthDay: '',
        profession: '',
        phoneNumber: '',
        dni: 0,
        genre: '',
        city: '',
        province: '',
        profileImage: '',
    },
    allUsuarios: [],
    statusMessage: '',
    loading: false
}

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        setRefreshStateUser: () => initialState,
        setProfileuUsuario: (state, action) =>{
            const data = action.payload
            state.profile = {...state.profile, ...data}
        },
        setStatusMessage: (state, action)=>{
            state.statusMessage = action.payload
        }
    },

    extraReducers: builder =>{
        builder
            .addCase(getUserAsync.pending, (state)=>{
                state.statusMessage = 'pending'
                state.loading = true
            })
            .addCase(getUserAsync.fulfilled, (state, action)=>{
                const {
                    id,
                    fullName,
                    email,
                    birthDay,
                    profession,
                    phoneNumber,
                    dni,
                    genre,
                    city,
                    province,
                    profileImage,
                } = action.payload.data.data
                const formatBirthDay = format(new Date(birthDay), 'yyyy-MM-dd')

                state.profile =  {
                    id,
                    fullName,
                    email,
                    password: null,
                    birthDay: formatBirthDay,
                    profession,
                    phoneNumber,
                    dni,
                    genre,
                    city,
                    province,
                    profileImage,
                }
                state.statusMessage = 'fulfilled'
                state.loading = false
            })
            .addCase(getUserAsync.rejected, (state)=>{
                state.statusMessage = 'rejectedLogin'
                state.loading = false
            })

            .addCase(getAllUsersAsync.pending, (state)=>{
                state.statusMessage = 'pendingAllUsersAsync'
                state.loading = true
            })
            .addCase(getAllUsersAsync.fulfilled, (state, action)=>{
                state.allUsuarios = action.payload.data.data
                state.statusMessage = 'fulfilledAllUsersAsync'
                state.loading = false
            })
            .addCase(getAllUsersAsync.rejected, (state, action)=>{
                state.statusMessage = 'rejectedAllUsersAsync'
                state.loading = false
            })

            .addCase(putUserAsync.pending, (state)=>{
                state.statusMessage = 'pending'
                state.loading = true
            })
            .addCase(putUserAsync.fulfilled, (state, action)=>{
                state.statusMessage = 'updateFulfilled'
                state.loading = false
            })
            .addCase(putUserAsync.rejected, (state, action)=>{
                state.statusMessage = 'updateRejected'
                state.loading = false
            })
    }
})

export const { setRefreshStateUser, setProfileuUsuario, setStatusMessage } = usuarioSlice.actions

export default usuarioSlice.reducer