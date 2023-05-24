import { createSlice } from '@reduxjs/toolkit'
import { getAllBeneficiosAsync, postBeneficioAsync, deleteBeneficioAsync } from './beneficioThunk'

const initialState = {
    beneficios: [],
    nuevoBeneficio: {
        title: '',
        image: '',
        end_date: '',
        benefit_use: '',
        refund_cap: '',
        discount_code: ''
    },
    statusMessageBenefit: '',
    loading: '',
}

export const beneficioSlice = createSlice({
    name: 'beneficio',
    initialState,
    reducers: {
        setNuevoBeneficio: (state, action) => {
            state.nuevoBeneficio = { ...state.nuevoBeneficio, ...action.payload }
        },
        setRefreshStateBeneficio: () => initialState,
        setRefreshNuevoBeneficio: (state) => {
            state.nuevoBeneficio = {
                title: '',
                image: '',
                end_date: '',
                benefit_use: '',
                refund_cap: '',
                discount_code: ''
            }
        },
        setStatusMessageBenefit: (state, action)=>{
            state.statusMessageBenefit = action.payload
        }
    },

    extraReducers: builder => {
        builder
            .addCase(getAllBeneficiosAsync.pending, (state, action) => {
                state.statusMessageBenefit = 'pendingAllBeneficios'
                state.loading = true
            })
            .addCase(getAllBeneficiosAsync.fulfilled, (state, action) => {
                state.beneficios = action.payload.data.data
                state.statusMessageBenefit = 'fulfilledAllBeneficios'
                state.loading = false
            })
            .addCase(getAllBeneficiosAsync.rejected, (state, action) => {
                state.statusMessageBenefit = 'rejectedAllBeneficios'
                state.loading = false
            })

            .addCase(postBeneficioAsync.pending, (state, action) => {
                state.statusMessageBenefit = 'pendingCreateBeneficios'
                state.loading = true
            })
            .addCase(postBeneficioAsync.fulfilled, (state, action) => {
                state.statusMessageBenefit = 'fulfilledCreateBeneficios'
                state.loading = false
            })
            .addCase(postBeneficioAsync.rejected, (state, action) => {
                state.statusMessageBenefit = 'rejectedCreateBeneficios'
                state.loading = false
            })

            .addCase(deleteBeneficioAsync.pending, (state, action) => {
                state.statusMessageBenefit = 'pendingDeleteBeneficio'
                state.loading = true
            })
            .addCase(deleteBeneficioAsync.fulfilled, (state, action) => {
                state.statusMessageBenefit = 'fulfilledDeleteBeneficio'
                state.loading = false
            })
            .addCase(deleteBeneficioAsync.rejected, (state, action) => {
                state.statusMessageBenefit = 'rejectedDeleteBeneficio'
                state.loading = false
            })
    }
})

export const { setRefreshStateBeneficio, setNuevoBeneficio, setRefreshNuevoBeneficio, setStatusMessageBenefit } = beneficioSlice.actions

export default beneficioSlice.reducer