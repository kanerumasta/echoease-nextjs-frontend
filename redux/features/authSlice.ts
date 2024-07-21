import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

interface AuthState {
    user: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState = {
    user : null,
    isAuthenticated: false,
    isLoading: false,
} as AuthState;

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAuth: (state) => {
            state.isAuthenticated = true;
        },
        finishInitialLoad: (state) => {
            state.isLoading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;
