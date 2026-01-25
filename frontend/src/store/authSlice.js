

import { createSlice } from "@reduxjs/toolkit"



const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        data: [],
        loading: "idle"
    },
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
        setDate(state, action) {
            state.data = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        }
    }
})

export const { setAuthenticated, setDate, setLoading } = authSlice.actions
export default authSlice.reducer