

import { createSlice } from "@reduxjs/toolkit"
import { apiClient } from "../api"

export const status = {
    IDLE: "idle",
    LOADING: "loading",
    ERROR: "error"
}
Object.freeze(status)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        data: [],
        status: status.IDLE,
        token: "",
        error: null,

    },
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
        setData(state, action) {
            state.data = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload));

        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        logoutUser(state) {
            state.isAuthenticated = false;
            state.data = [];
            state.token = "";
            localStorage.removeItem("token");
        }

    }
})

export const { setAuthenticated, setData, setStatus, setToken, setError } = authSlice.actions
export default authSlice.reducer

// Thunks here
// Register User Thunk
export function registerUser(userData) {
    return async function registerUserThunk(dispatch) {
        dispatch(setStatus(status.LOADING))

        if (!userData.userEmail || !userData.userPassword || !userData.username) {
            dispatch(setError("All fields are required"))
            dispatch(setStatus(status.ERROR))
            return
        }

        try {
            const response = await apiClient.post("register", userData)
            if (response.status === 201) {
                dispatch(setStatus(status.IDLE))
                dispatch(setData(response.data))
                console.log("Success")
            } else {
                dispatch(setError("Registration failed"))
                dispatch(setStatus(status.ERROR))
            }
        } catch (error) {
            dispatch(setError("Something went wrong during registration"))
            dispatch(setStatus(status.ERROR))
            return
        }
    }
}

// Login User Thunk
export function loginUser(userData) {
    return async function loginUserThunk(dispatch) {
        dispatch(setStatus(status.LOADING))
        if (!userData.userEmail || !userData.userPassword) {
            dispatch(setError("Email and Password are required"))
            dispatch(setStatus(status.ERROR))
            return
        }
        try {
            const response = await apiClient.post("login", userData)
            if (response.status === 201) {
                const token = response.data.data
                localStorage.setItem("token", token)
                dispatch(setToken(token))
                dispatch(setAuthenticated(true))
                dispatch(setStatus(status.IDLE))

            } else {
                dispatch(setError("Login failed"))
                dispatch(setStatus(status.ERROR))
            }
        } catch (error) {
            dispatch(setError("Something went wrong during login"))
            dispatch(setStatus(status.ERROR))
            return
        }
    }
}